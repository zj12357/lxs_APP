import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle, regex, modal} from '@/utils';
import {Touchable, Button} from 'ui';
import {SecurityInput} from 'common';
import LinearGradient from 'react-native-linear-gradient';
export default class UpdatePwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      code: '',
    };
  }
  static navigationOptions = ({navigation, screenProps}) => ({
    title: '更换绑定手机号',
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
          placeholder="请输入要绑定的新手机号"
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
        <Button
          style={style.tipsWrap}
          textStyle={style.tips}
          title="原手机号无法接受短信？"
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
    return {phone, type: '5'};
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
