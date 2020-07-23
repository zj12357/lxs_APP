import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Keyboard} from 'react-native';
import {transformSize, commonStyle, $api, modal} from '@/utils';
import {Loading, Icon, Button} from 'ui';
import LinearGradient from 'react-native-linear-gradient';
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
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      count: 0,
      limit: 200,
    };
  }
  static navigationOptions = ({navigation, screenProps}) => ({
    title: '在线反馈',
  });
  render() {
    let {limit, count} = this.state;
    return (
      <View style={style.wrap}>
        <View style={style.container}>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            style={style.textInput}
            placeholder={'请输入反馈内容...'}
            placeholderTextColor={'gray'}
            multiline={true}
            numbersOfLines={3}
            blurOnSubmit={true}
            onChangeText={text => {
              this._onChangeText(text);
            }}
            underlineColorAndroid="transparent"
            value={this.state.text}
          />
          <Text style={[style.count, limit === count ? style.limit : null]}>
            {this.state.count + ' / ' + this.state.limit}
          </Text>
        </View>

        <View style={style.labelWrap}>
          <Icon style={style.labelIcon} name="jg" color="#FFA43D" size={12} />
          <Text style={style.label}>
            同一用户或设备当日最高提交三次 ,同一IP 当日最高提交10次 ,
            有效的反馈可获得经验值或料币奖励。
          </Text>
        </View>
        <LinearGradient
          colors={['#475C78', '#203046']}
          style={style.linear}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Button
            style={style.btnWrap}
            textStyle={style.btn}
            title="提交反馈"
            onPress={this.submit}
          />
        </LinearGradient>
      </View>
    );
  }
  componentDidMount = async () => {};
  _onChangeText(text) {
    let inputText = text.replace('\n', '');
    if (text.length > this.state.limit) {
      this.setState({
        text: inputText.substr(0, this.state.limit),
      });
    } else {
      this.setState({
        text: inputText,
        count: inputText.length,
      });
    }
  }
  submit = async () => {
    if (!this.state.text) {
      modal.showToast('请输入内容');
    }
    Keyboard.dismiss();
    let params = {
      content: this.state.text,
      userById: this.props.userInfo.id,
    };
    modal.show(<Loading />, 'loading');
    let res = await $api['my/feedback'](params);
    if (res.resultData) {
      modal.showToast('提交成功', () => {
        this.setState({text: ''});
      });
    } else {
      modal.showToast(res.message);
    }
  };
}
const style = StyleSheet.create({
  wrap: {
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  container: {
    marginTop: transformSize(16),
    height: transformSize(726),
    backgroundColor: '#fff',
    padding: transformSize(32),
    position: 'relative',
  },
  textInput: {
    height: '100%',
    paddingVertical: 0,
    textAlignVertical: 'top',
  },
  placeholder: {
    fontSize: transformSize(32),
    fontWeight: 'bold',
    color: '#999',
  },
  count: {
    position: 'absolute',
    bottom: transformSize(20),
    right: transformSize(24),
    fontSize: transformSize(32),
    color: '#333',
    fontWeight: 'bold',
  },
  limit: {
    color: 'red',
  },
  labelWrap: {
    marginHorizontal: transformSize(20),
    flexDirection: 'row',

    marginTop: transformSize(32),
  },
  labelIcon: {
    marginRight: transformSize(8),
  },
  label: {
    fontSize: transformSize(24),
    color: '#666',
    lineHeight: transformSize(34),
  },
  linear: {
    marginTop: transformSize(112),
    width: transformSize(688),
    height: transformSize(100),
    marginLeft: transformSize(32),
    borderRadius: transformSize(4),
  },
  btnWrap: {
    width: transformSize(644),
    height: transformSize(100),
  },
  btn: {
    fontSize: transformSize(28),
    color: '#fff',
    fontWeight: 'bold',
  },
});
