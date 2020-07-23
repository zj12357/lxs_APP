import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Share} from 'common';
import {Loading, Button} from 'ui';
import {transformSize, commonStyle, ymodal, modal} from '@/utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {withNavigation} from 'react-navigation';
import $api from '@/config/api';
let keyboardVerticalOffset = Platform.select({
  ios: transformSize(125),
  android: -transformSize(500),
});
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = {};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@withNavigation
export default class InputKeyboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputContent: '',

      inputHolder: '回复',

      isCollect: false,
      isShare: false,
    };
  }

  render() {
    let alertText = [s.alertText, {color: commonStyle.colorTheme.tag}];
    let {inputContent, isCollect, isShare} = this.state;

    let validComment =
      inputContent.trim().length >= 1 && inputContent.trim().length <= 100;
    if (validComment) {
      alertText.push(s.activeAlertText);
    }

    let {userInfo, data, type} = this.props;

    this.isStar = type === 0 ? data.isCollection : data.isInterested;
    let MyWrap = Platform.OS === 'ios' ? KeyboardAvoidingView : View;

    return (
      <MyWrap
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <View
          style={[
            s.alertWrap,
            {backgroundColor: commonStyle.colorTheme.pageBg},
          ]}>
          <TextInput
            style={[s.alertInput]}
            underlineColorAndroid="transparent"
            multiline
            placeholderTextColor={commonStyle.colorTheme.tag}
            placeholder={this.state.inputHolder}
            onChangeText={this.changeText}
            value={this.state.inputContent}
            ref={ref => (this._alertInput = ref)}
            onFocus={this.handleCommentFocus}
            onBlur={this.handleCommentBlur}
          />
          <Button
            icon={this.isStar ? 'like' : 'gz'}
            iconColor={this.isStar ? '#FF770D' : '#666'}
            iconSize={22}
            onPress={this.handleCollect}
          />
          <Button
            icon={isShare ? 'zhuanfa' : 'zf'}
            iconColor={isShare ? '#FF770D' : '#666'}
            iconSize={22}
            onPress={this.handleShare}
          />
          {!userInfo.name ? (
            <Button
              style={[s.alertTextWrap]}
              textStyle={s.alertText}
              title="登录"
              onPress={() => this.props.navigation.navigate('login')}
            />
          ) : (
            <Button
              disabled={!validComment}
              style={[s.alertTextWrap, validComment ? null : s.disabledWrap]}
              textStyle={s.alertText}
              title="发送"
              onPress={() => this.alertSubmit(this.state.inputContent)}
            />
          )}
          {/* <Touchable
          disabled={!validComment}
          onPress={() => this.alertSubmit(this.state.inputContent)}
          transparent
          style={s.alertTextWrap}>
          <Text style={alertText}>发布</Text>
        </Touchable> */}
        </View>
      </MyWrap>
    );
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
    let {userInfo} = this.props;
    if (!userInfo.name) {
      this.setState({inputHolder: '登陆后可评论'});
    }
  }
  _keyboardDidShow = () => {
    // this.setState({
    // 	alertFlag: true,
    // });
  };

  _keyboardDidHide = () => {
    // this.setState({
    // 	alertFlag: false,
    // });
  };
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  changeText = inputContent => {
    let {userInfo} = this.props;
    if (!userInfo.name) {
      return;
    }
    this.setState({inputContent});
    if (this.props.onChangeText) {
      this.props.onChangeText(inputContent);
    }
  };
  handleCommentFocus = async () => {
    this.setState({focused: true});
  };
  handleCommentBlur = () => {
    let {inputContent} = this.state;
    if (inputContent.length <= 0) {
      this.setState({inputHolder: '回复', focused: false});
    } else {
      this.setState({focused: false});
    }
  };

  alertSubmit = inputContent => {
    console.log(123);
    Keyboard.dismiss();
    this.setState({
      inputContent: '',
    });
    this.props.alertSubmit && this.props.alertSubmit(inputContent);
  };
  handleCollect = async () => {
    let {data, type, userInfo} = this.props;
    if (!userInfo.name) {
      this.props.navigation.navigate('login');
      return;
    }
    let params = {
      type: type,
      newsById: data.id,
    };
    let url = '';
    if (this.isStar) {
      url = 'my/delCollect';
    } else {
      url = 'my/addCollect';
    }

    modal.show(<Loading />, 'loading');
    await $api[url](params);
    this.props.handleStar && this.props.handleStar();
  };
  handleShare = () => {
    ymodal.show(<Share />);
    this.setState({
      isShare: !this.state.isShare,
    });
  };
}

const s = StyleSheet.create({
  alertWrap: {
    zIndex: 1000,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: transformSize(30),

    borderTopLeftRadius: transformSize(10),
    borderTopRightRadius: transformSize(10),
    width: transformSize(750),
    height: transformSize(88),
    borderTopColor: '#DBDBDB',
    borderTopWidth: transformSize(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // height: transformSize(100),
  },
  alertInput: {
    width: transformSize(410),
    height: transformSize(54),
    paddingVertical: 0,
    fontSize: transformSize(28),
    color: '#000',
    // lineHeight: transformSize(40),
    borderRadius: transformSize(27),
    backgroundColor: '#f0f0f0',

    marginRight: transformSize(10),
    paddingHorizontal: transformSize(20),
    // flexWrap: 'wrap',
    textAlignVertical: 'center',
  },
  alertTextWrap: {
    alignSelf: 'center',
    backgroundColor: '#DA1B2A',
    width: transformSize(120),
    height: transformSize(54),
    borderRadius: transformSize(28),
  },
  disabledWrap: {
    backgroundColor: '#999',
  },
  alertText: {
    color: '#fff',
    fontSize: transformSize(26),
  },
  activeAlertText: {color: commonStyle.color_theme},
});
