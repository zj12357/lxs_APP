import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle, regex, modal} from '@/utils';
import {Loading, Button} from 'ui';
import {SecurityInput} from 'common';
import LinearGradient from 'react-native-linear-gradient';
import $api from '@/config/api';
export default class UpdatePwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      code: '',
      pwd: '',
      pwdConfirm: '',
      step: 0,
    };
  }
  static navigationOptions = ({navigation, screenProps}) => ({
    title: '重置密码',
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
    let {step} = this.state;
    return step === 0 ? (
      <View style={style.wrap}>
        <SecurityInput
          placeholder="请输入绑定的手机号"
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
            title="下一步"
            onPress={this.next}
          />
        </LinearGradient>
      </View>
    ) : (
      <View style={style.wrap}>
        <SecurityInput
          placeholder="请输入新密码"
          imgUrl={require('@/assets/images/my/security/pwd.png')}
          style={style.input}
          value={this.state.pwd}
          changeText={text => {
            this.setState({pwd: text});
          }}
        />
        <SecurityInput
          placeholder="请再次输入新密码"
          imgUrl={require('@/assets/images/my/security/pwd.png')}
          style={style.input}
          value={this.state.pwdConfirm}
          changeText={text => {
            this.setState({pwdConfirm: text});
          }}
          haveCode
        />

        <LinearGradient
          colors={['#475C78', '#203046']}
          style={[style.linear, style.confirmLinear]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Button
            style={style.btnWrap}
            textStyle={style.btn}
            title="确认"
            onPress={this.submit}
          />
        </LinearGradient>
      </View>
    );
  }
  componentDidMount = async () => {};
  getCode = () => {
    let {phone} = this.state;
    if (!regex.tel.test(phone)) {
      modal.showToast('手机号格式不对');
      return;
    }
    return {phone, type: '2'};
  };
  next = async () => {
    let {phone, code} = this.state;

    let params = {
      mobile: phone,
      code: Number(code),
    };
    modal.show(<Loading />, 'loading');
    try {
      let res = await $api['user/findPwd'](params);

      if (res.resultData) {
        this.setState({
          step: 1,
        });
        modal.showToast('手机号验证成功，请输入新密码');
      } else {
        modal.showToast(res.message);
      }
    } catch (err) {
      modal.showToast(err.message);
    }
  };
  submit = async () => {
    let {phone, code, pwdConfirm, pwd} = this.state;

    let params = {
      mobile: phone,
      code: code,
      newPassword: pwd,
      newPassword2: pwdConfirm,
    };
    modal.show(<Loading />, 'loading');
    try {
      let res = await $api['user/updatePwd'](params);
      if (res.resultData) {
        modal.showToast('新密码设置成功，请重新登录');
        this.props.navigation.navigate('login');
      } else {
        modal.showToast(res.message);
      }
    } catch (err) {
      modal.showToast(err.message);
    }
  };
}
const style = StyleSheet.create({
  wrap: {
    paddingHorizontal: transformSize(32),
  },
  input: {
    marginTop: transformSize(16),
    marginBottom: transformSize(10),
  },
  linear: {
    marginTop: transformSize(72),
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
