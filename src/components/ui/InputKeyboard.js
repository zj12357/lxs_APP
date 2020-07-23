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
import {Touchable} from 'ui';
import {transformSize, commonStyle} from '@/utils';
import {connect} from 'react-redux';
let keyboardVerticalOffset = Platform.select({
  ios: transformSize(160),
  android: -transformSize(500),
});

class InputKeyboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertFlag: true,

      inputContent: '',
      inputHeight: transformSize(120),
      inputHolder: '回复',
    };
  }

  render() {
    return this.state.alertFlag ? (
      <View style={s.wrapper}>
        <TouchableOpacity
          style={[
            s.alertBg,
            commonStyle.colorTheme.dark
              ? {backgroundColor: 'rgba(100, 100, 100, 0.7)'}
              : {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
          ]}
          onPress={() => this.alertDismiss()}
        />
        {this.renderAlert()}
      </View>
    ) : null;
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

  renderAlert = () => {
    let alertText = [s.alertText, {color: commonStyle.colorTheme.tag}];
    let {inputContent} = this.state;

    let validComment =
      inputContent.trim().length >= 1 && inputContent.trim().length <= 100;
    if (validComment) {
      alertText.push(s.activeAlertText);
    }
    return (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={[s.alertWrap, {backgroundColor: commonStyle.colorTheme.pageBg}]}>
        <TextInput
          style={[
            s.alertInput,
            {
              height: this.state.inputHeight,
              backgroundColor: commonStyle.colorTheme.inputBg,
              color: commonStyle.colorTheme.title,
            },
          ]}
          underlineColorAndroid="transparent"
          multiline
          placeholderTextColor={commonStyle.colorTheme.tag}
          placeholder={this.state.inputHolder}
          onChangeText={inputContent => {
            this.setState({inputContent});
            if (this.props.onChangeText) {
              this.props.onChangeText(inputContent);
            }
          }}
          onContentSizeChange={this.onContentSizeChange}
          value={this.state.inputContent}
          ref={ref => (this._alertInput = ref)}
          onFocus={this.handleCommentFocus}
          onBlur={this.handleCommentBlur}
        />
        <Touchable
          disabled={!validComment}
          onPress={() => this.alertSubmit(this.state.inputContent)}
          transparent
          style={s.alertTextWrap}>
          <Text style={alertText}>发布</Text>
        </Touchable>
      </KeyboardAvoidingView>
    );
  };
  handleCommentFocus = async () => {
    this.setState({focused: true});
  };
  handleCommentBlur = () => {
    let {inputContent} = this.state;
    if (inputContent.length <= 0) {
      this.setState({inputHolder: '添加评论或您的反馈意见', focused: false});
    } else {
      this.setState({focused: false});
    }
  };
  focusCommentInput = item => {
    this.targetCommentItem = item;
    this.setState(
      {
        alertFlag: true,
        inputHolder: `回复 ${item.nickName}`,
      },
      () => {
        this._alertInput.focus();
      },
    );
  };
  onContentSizeChange = event => {
    let height = event.nativeEvent.contentSize.height;
    if (height >= transformSize(120)) {
      this.setState({inputHeight: height});
    }
  };
  open = item => {
    let inputHolder = '评论';

    if (item) {
      inputHolder = `回复${item.fullName}`;
    }
    this.setState({alertFlag: true, inputHolder: inputHolder}, () => {
      this._alertInput.focus();
    });
  };

  alertDismiss = () => {
    // keyboard.dismiss();
    this.setState({
      alertFlag: false,
      inputContent: '',
    });
  };

  alertSubmit = inputContent => {
    this.setState({
      alertFlag: false,
      inputContent: '',
    });
    this.props.alertSubmit(inputContent);
  };
}

const s = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  alertBg: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertWrap: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: transformSize(30),

    borderTopLeftRadius: transformSize(10),
    borderTopRightRadius: transformSize(10),
    width: transformSize(750),

    flexDirection: 'row',
    // height: transformSize(100),
    opacity: 1,
  },
  alertInput: {
    flex: 1,
    fontSize: transformSize(28),
    color: '#000',
    lineHeight: transformSize(40),
    borderRadius: transformSize(8),
    backgroundColor: '#f1f1f1',
    marginTop: transformSize(16),
    marginRight: transformSize(10),
    paddingHorizontal: transformSize(20),
    // flexWrap: 'wrap',
    textAlignVertical: 'top',
  },
  alertTextWrap: {
    alignSelf: 'center',
    paddingTop: transformSize(20),
    paddingBottom: transformSize(28),
  },
  alertText: {
    // width: transformSize(80),
    paddingVertical: transformSize(40),

    fontSize: transformSize(30),
  },
  activeAlertText: {color: commonStyle.color_theme},
});
export default InputKeyboard;
