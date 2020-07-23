import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle, regex, modal} from '@/utils';
import {Touchable, Button} from 'ui';
import {SecurityInput} from 'common';
import LinearGradient from 'react-native-linear-gradient';
import $api from '@/config/api';
export default class UpdatePwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      pwd: '',
      phone: '',
      code: '',
    };
  }
  static navigationOptions = ({navigation, screenProps}) => ({
    title: '注册',
    headerStyle: {
      borderBottomWidth: 0,
      elevation: 0,
    },
    headerTitleStyle: {
      borderBottomWidth: 0,
      color: '#333',
      flex: 1,
      textAlign: 'center',
      fontWeight: '600',
      lineHeight: transformSize(90),
      fontSize: transformSize(36),
    },
  });
  render() {
    return (
      <View style={style.wrap}>
        <SecurityInput
          placeholder="请输入账号"
          imgUrl={require('@/assets/images/my/security/account.png')}
          style={style.input}
          value={this.state.account}
          changeText={text => {
            this.setState({account: text});
          }}
        />
        <SecurityInput
          placeholder="请输入密码"
          imgUrl={require('@/assets/images/my/security/yanzheng.png')}
          style={style.input}
          value={this.state.pwd}
          changeText={text => {
            this.setState({pwd: text});
          }}
        />
        <SecurityInput
          placeholder="请输入手机号"
          imgUrl={require('@/assets/images/my/security/phone.png')}
          style={style.input}
          value={this.state.phone}
          changeText={text => {
            this.setState({phone: text});
          }}
        />
        <SecurityInput
          placeholder="请输入验证码"
          imgUrl={require('@/assets/images/my/security/yanzheng.png')}
          style={style.input}
          value={this.state.code}
          changeText={text => {
            this.setState({code: text});
          }}
          haveCode
          getCode={this.getCode}
        />

        <LinearGradient
          colors={['#475C78', '#203046']}
          style={style.linear}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Button
            style={style.btnWrap}
            textStyle={style.btn}
            title="确认注册"
            onPress={this.register}
          />
        </LinearGradient>
      </View>
    );
  }
  componentDidMount = async () => {};
  register = async () => {
    let {account, pwd, phone, code} = this.state;
    let params = {
      name: account,
      password: pwd,
      mobile: phone,
      code: code,
    };
    let res = await $api['user/register'](params);
    if (res.resultData) {
      modal.showToast('注册成功', () => {
        this.props.navigation.navigate('login');
      });
    } else {
      modal.showToast(res.message);
    }
  };
  getCode = () => {
    let {phone} = this.state;
    if (!regex.tel.test(phone)) {
      modal.showToast('手机号格式不对');
      return;
    }
    return {phone, type: '10'};
  };
}
const style = StyleSheet.create({
  wrap: {
    paddingHorizontal: transformSize(32),
  },
  input: {
    marginTop: transformSize(16),
    marginBottom: transformSize(10),
    marginHorizontal: transformSize(10),
    paddingLeft: transformSize(10),
  },
  tipsWrap: {
    marginTop: transformSize(50),
    justifyContent: 'flex-end',
  },
  tips: {
    fontSize: transformSize(26),
    color: '#3169B5',
  },
  linear: {
    marginTop: transformSize(60),
    width: transformSize(688),
    height: transformSize(100),
    borderRadius: transformSize(4),
  },
  btnWrap: {
    width: transformSize(688),
    height: transformSize(100),
    borderRadius: transformSize(4),
  },
  btn: {
    color: '#fff',
    fontSize: transformSize(28),
    fontWeight: 'bold',
  },
});
