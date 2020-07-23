import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TextInput, Keyboard} from 'react-native';
import {transformSize, commonStyle, modal} from '@/utils';
import {Button, Icon, Loading} from 'ui';
import $api from '@/config/api';
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendCoding: false,
      second: 0,
    };
  }
  static defaultProps = {
    value: '',
    placeholder: '请输入',
    textContentType: 'none',
    secureTextEntry: false,
    haveCode: false,
    imgUrl: require('@/assets/images/my/security/yanzheng.png'),
  };
  render() {
    let {sendCoding, second} = this.state;
    return (
      <View style={[style.wrap, this.props.style]}>
        <Image style={style.img} source={this.props.imgUrl} />
        <TextInput
          placeholderTextColor={'rgba(32,48,70,.3)'}
          placeholder={this.props.placeholder}
          textContentType={this.props.textContentType}
          secureTextEntry={this.props.secureTextEntry}
          style={[style.input]}
          value={this.props.value}
          onChangeText={text => {
            this.props.changeText(text);
          }}
          returnKeyType="done"
        />
        {this.props.haveCode ? (
          <Button
            style={[style.codeWrap, sendCoding ? style.disableBtnWrap : null]}
            onPress={() => this.getCode()}
            textStyle={[style.codeText, sendCoding ? style.disableBtn : null]}
            title={sendCoding ? '重新获取' + second + 's' : '获取验证码'}
          />
        ) : null}
      </View>
    );
  }
  componentDidMount = async () => {};
  getCode = async () => {
    if (this.state.sendCoding) {
      console.log(21);
      return;
    }
    let {phone, type} = this.props.getCode && this.props.getCode();
    if (!phone) {
      return;
    }
    console.log('phone', phone);
    modal.show(<Loading />, 'loading');
    let params = {
      mobile: phone,
      templateConfigCode: type,
    };
    try {
      let res = await $api['user/getCode'](params);
      if (res.resultCode === 1) {
        modal.showToast(res.message);
        this.setState({
          sendCoding: true,
          second: 60,
        });
        this.getCount();
      } else {
        modal.showToast(res.message);
      }
    } catch (err) {
      modal.showToast(err.message);
    }
  };
  getCount = () => {
    this.timer = setInterval(() => {
      if (this.state.second <= 0) {
        this.setState({
          sendCoding: false,
          second: 60,
        });
        clearInterval(this.timer);

        return;
      }
      this.setState((prevState, props) => ({
        second: prevState.second - 1,
      }));
    }, 1000);
  };
}
const style = StyleSheet.create({
  wrap: {
    borderBottomWidth: transformSize(1),
    borderBottomColor: '#203046',
    flexDirection: 'row',
    alignItems: 'center',
    height: transformSize(80),
  },
  img: {
    marginRight: transformSize(10),
    width: transformSize(40),
    height: transformSize(40),
  },
  input: {
    flex: 1,
    fontSize: transformSize(30),
  },
  codeWrap: {
    paddingVertical: transformSize(10),
    paddingHorizontal: transformSize(20),
    // height: transformSize(46),
    borderRadius: transformSize(23),
    borderColor: '#203046',
    borderWidth: transformSize(1),
  },
  disableBtnWrap: {
    borderColor: '#999',
    borderWidth: transformSize(1),
  },
  disableBtn: {
    color: '#999',
  },
  codeText: {
    fontSize: transformSize(28),
    color: '#203046',
  },
});
