import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle, modal, regex} from '@/utils';
import {Loading, Button} from 'ui';
import {SecurityInput} from 'common';
import LinearGradient from 'react-native-linear-gradient';
import $api from '@/config/api';
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
export default class UpdatePwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old_pwd: '',
      pwd: '',
      pwd_confirm: '',
    };
  }
  static navigationOptions = ({navigation, screenProps}) => ({
    title: '修改密码',
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
          placeholder="请输入旧密码"
          imgUrl={require('@/assets/images/my/security/pwd.png')}
          style={style.input}
          value={this.state.old_pwd}
          changeText={text => {
            this.setState({old_pwd: text});
          }}
        />
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
          value={this.state.pwd_confirm}
          changeText={text => {
            this.setState({pwd_confirm: text});
          }}
        />
        <LinearGradient
          colors={['#475C78', '#203046']}
          style={style.linear}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Button
            style={style.btnWrap}
            textStyle={style.btn}
            title="确认修改"
            onPress={this.submit}
          />
        </LinearGradient>
      </View>
    );
  }
  componentDidMount = async () => {};
  submit = async () => {
    let {old_pwd, pwd, pwd_confirm} = this.state;
    if (!regex.loginPwd.test(old_pwd)) {
      modal.showToast('密码必须为6-16位');
      return;
    }

    if (!regex.loginPwd.test(pwd)) {
      modal.showToast('密码必须为6-16位');
      return;
    }
    if (pwd !== pwd_confirm) {
      modal.showToast('两次密码不一致');
      return;
    }

    let params = {
      oldPassword: this.state.old_pwd,
      newPassword: this.state.pwd,
      newPassword2: this.state.pwd_confirm,
    };
    modal.show(<Loading />, 'loading');
    try {
      let res = await $api['user/updatePwd2'](params);
      if (res.resultData) {
        modal.showToast('修改成功', () => {
          this.props.navigation.goBack();
        });
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
