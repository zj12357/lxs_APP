import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Keyboard,
  Platform,
  Alert,
} from 'react-native';
import {transformSize, regex, modal, tximSetup} from '@/utils';
import SafeAreaView from 'react-native-safe-area-view';
import {SecurityInput} from 'common';
import {Button, Loading, Touchable} from 'ui';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import {SCREEN_HEIGHT} from '@/utils/variable';
import $api from '@/config/api';
import store from '@/store/store';

import {getUserInfo, commitToken} from '@/store/actions';
import {connect} from 'react-redux';
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = {
  getUserInfo,
  commitToken,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      account: '',
      pwd: '',
      phone: '',
      yanzheng: '',
      check: true,
    };
  }
  static navigationOptions = ({navigation}) => ({
    title: '料先生',
    headerStyle: {
      paddingTop: 40,
      borderBottomWidth: 0,
      backgroundColor: '#203046',
      elevation: 0,
      height: transformSize(130),
    },
    headerTitleStyle: {
      borderBottomWidth: 0,
      color: '#fff',
      flex: 1,
      textAlign: 'center',
      fontWeight: '600',

      lineHeight: transformSize(130),
      fontSize: transformSize(36),
    },
    headerLeft: (
      <Button
        icon="back"
        iconColor={'#fff'}
        iconSize={16}
        onPress={() => {
          navigation.goBack();
        }}
        style={{marginLeft: 15}}
      />
    ),
  });
  render() {
    let {active} = this.state;
    return (
      <ScrollView
        contentContainerStyle={style.loginWrap}
        keyboardShouldPersistTaps="always"
        bounces={false}>
        <View style={style.conWrap}>
          <Image
            style={style.logo}
            source={require('@/assets/images/my/message/logo.png')}
          />
          <View style={style.tabWrap}>
            <Button
              style={[style.tab, active ? null : style.tabActive]}
              textStyle={[style.tabText, active ? null : style.tabTextActive]}
              title="账号登录"
              onPress={() => {
                this.setState({active: 0});
              }}
            />
            <Button
              style={[style.tab, active ? style.tabActive : null]}
              textStyle={[style.tabText, active ? style.tabTextActive : null]}
              title="验证码登录"
              onPress={() => {
                this.setState({active: 1});
              }}
            />
          </View>
          {!active ? (
            <View style={style.tabLeftWrap}>
              <SecurityInput
                imgUrl={require('@/assets/images/my/security/account.png')}
                style={style.account}
                value={this.state.account}
                changeText={text => {
                  this.setState({account: text});
                }}
              />
              <SecurityInput
                imgUrl={require('@/assets/images/my/security/pwd.png')}
                style={style.pwd}
                value={this.state.pwd}
                changeText={text => {
                  this.setState({pwd: text});
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
                  title="登录"
                  onPress={this.loginAccount}
                />
              </LinearGradient>
            </View>
          ) : (
            <View style={style.tabRightWrap}>
              <SecurityInput
                imgUrl={require('@/assets/images/my/security/phone.png')}
                style={style.phone}
                value={this.state.phone}
                changeText={text => {
                  this.setState({phone: text});
                }}
              />
              <SecurityInput
                imgUrl={require('@/assets/images/my/security/yanzheng.png')}
                style={style.code}
                haveCode
                value={this.state.yanzheng}
                getCode={this.getCode}
                changeText={text => {
                  this.setState({yanzheng: text});
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
                  title="登录"
                  onPress={this.loginPhone}
                />
              </LinearGradient>
            </View>
          )}
          <View style={style.tipsWrap}>
            <Text
              style={style.tipsRegister}
              onPress={() => this.props.navigation.navigate('register')}>
              没有账号？立即注册
            </Text>
            <Text
              style={style.tipsPwd}
              onPress={() => this.props.navigation.navigate('password')}>
              忘记密码？
            </Text>
          </View>
          <View style={style.loginTipsWrap}>
            <View style={style.line} />
            <Text style={style.loginTips}>其他登录方式</Text>
            <View style={style.line} />
          </View>
          <View style={style.otherLoginWrap}>
            <Touchable style={style.wechatWrap}>
              <Image
                style={style.wechat}
                source={require('@/assets/images/my/message/logo.png')}
              />
            </Touchable>
          </View>
        </View>
        <View style={style.agreeWrap}>
          <CheckBox
            style={style.checkBox}
            boxType="square"
            value={this.state.check}
            onValueChange={() => this.changeBox()}
          />
          <Text style={style.agree}>阅读并同意料先生</Text>
          <Text style={style.agree}>《用户协议》</Text>
        </View>
      </ScrollView>
    );
  }
  componentDidMount = async () => {
    // WeChat.registerApp('wxb5a655ec17c35e0b');
  };
  changeBox() {
    this.setState({
      check: !this.state.check,
    });
  }
  // getWechat = () => {
  //   //微信登录示例

  //   let scope = 'snsapi_userinfo';
  //   let state = 'wechat_sdk_demo';
  //   //判断微信是否安装
  //   WeChat.isWXAppInstalled().then(isInstalled => {
  //     if (isInstalled) {
  //       //发送授权请求
  //       WeChat.sendAuthRequest(scope, state)
  //         .then(responseCode => {
  //           //返回code码，通过code获取access_token
  //           Alert.alert('responseCode', responseCode);
  //           console.log('responseCode,', responseCode);
  //           console.log(43);
  //           // this.getAccessToken(responseCode.code);
  //         })
  //         .catch(err => {
  //           console.log(43);
  //           Alert.alert('登录授权发生错误：', err.message, [{text: '确定'}]);
  //         });
  //       console.log(123);
  //     } else {
  //     }
  //   });
  // };
  loginAccount = () => {
    Keyboard.dismiss();
    let facility = Platform.select({
      ios: 5,
      android: 4,
    });
    let {account, pwd} = this.state;
    let params = {
      username: account,
      password: pwd,
      facility,
    };

    this.login('user/login', params);
  };
  getCode = () => {
    let {phone} = this.state;
    if (!regex.tel.test(phone)) {
      modal.showToast('手机号格式不对');
      return;
    }
    return {phone, type: '5'};
  };
  loginPhone = () => {
    Keyboard.dismiss();
    let facility = Platform.select({
      ios: 5,
      android: 4,
    });
    let {phone, yanzheng} = this.state;

    let params = {
      mobile: phone,
      code: Number(yanzheng),
      facility,
    };
    this.login('user/login2', params);
  };
  login = async (url, params) => {
    modal.show(<Loading />, 'loading');
    try {
      let res = await $api[url](params);

      console.log(res, 'resres');
      if (res.resultData && res.resultData.accessToken) {
        this.props.commitToken(res.resultData.accessToken);

        let user = await this.props.getUserInfo();
        console.log(3, 'resres');
        modal.showToast('登录成功', () => {
          this.props.navigation.goBack();

          if (this.props.userInfo.name) {
            tximSetup(this.props.userInfo);
          }
        });
        return res;
      } else {
        if (res.message) {
          modal.showToast(res.message);
          return res;
        }

        modal.showToast('登录失败');
      }
    } catch (err) {
      if (err.response.data && err.response.data.message) {
        modal.showToast(err.response.data.message);
      } else {
        modal.showToast('登录失败');
      }
    }
  };
}
const style = StyleSheet.create({
  loginWrap: {
    flex: 1,
    backgroundColor: '#203046',
    paddingHorizontal: transformSize(80),
    alignItems: 'center',
  },

  conWrap: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.7,
    marginTop: transformSize(56),
    justifyContent: 'space-between',
    backgroundColor: '#fff',

    alignItems: 'center',
  },
  logo: {
    width: transformSize(116),
    height: transformSize(100),
    marginTop: transformSize(66),
  },
  tabWrap: {
    flexDirection: 'row',
  },
  tab: {
    width: transformSize(230),
    height: transformSize(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'rgba(32,48,70,.5)',
    borderBottomWidth: transformSize(4),

    // marginTop: transformSize(64),
  },
  tabActive: {
    borderBottomColor: '#203046',
  },
  tabText: {
    color: 'rgba(32,48,70,.5)',
  },
  tabTextActive: {
    color: '#203046',
  },
  tabLeftWrap: {
    width: transformSize(488),
    // marginTop: transformSize(40),
  },
  account: {
    marginTop: transformSize(16),
    marginBottom: transformSize(10),
  },
  pwd: {
    marginTop: transformSize(16),
    marginBottom: transformSize(10),
  },
  tabRightWrap: {
    width: transformSize(488),
    // marginTop: transformSize(40),
  },
  phone: {
    marginTop: transformSize(16),
    marginBottom: transformSize(10),
  },
  code: {
    marginTop: transformSize(16),
    marginBottom: transformSize(10),
  },
  linear: {
    marginTop: transformSize(88),
    width: transformSize(488),
    height: transformSize(80),
    borderRadius: transformSize(4),
  },
  btnWrap: {
    width: transformSize(488),
    height: transformSize(80),
    borderRadius: transformSize(4),
  },
  btn: {
    color: '#fff',
    fontSize: transformSize(28),
    fontWeight: 'bold',
  },
  tipsWrap: {
    // marginTop: transformSize(42),
    width: transformSize(488),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tipsRegister: {
    fontSize: transformSize(24),
    color: '#4B87E0',
  },
  tipsPwd: {
    fontSize: transformSize(24),
    color: '#666',
  },
  loginTipsWrap: {
    // marginTop: transformSize(114),
    width: transformSize(488),
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    width: transformSize(150),
    backgroundColor: '#B3B8D3',
    height: transformSize(2),
  },
  loginTips: {
    fontSize: transformSize(24),
    color: '#999',
  },
  otherLoginWrap: {
    // marginTop: transformSize(64),
    marginBottom: transformSize(80),
  },
  wechatWrap: {},
  wechat: {
    width: transformSize(60),
    height: transformSize(60),
  },
  agreeWrap: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    width: transformSize(26),
    height: transformSize(26),
    marginRight: transformSize(30),
  },
  agree: {
    color: '#fff',
    marginLeft: transformSize(10),
  },
});
