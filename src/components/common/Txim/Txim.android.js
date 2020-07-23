import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon} from 'ui';
import $api from '@/config/api';

import {NativeModules, NativeEventEmitter} from 'react-native';
const tximBridge = NativeModules.TXIMBridge;
const tximEmitter = new NativeEventEmitter(tximBridge);
export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <View style={style.wrap} />;
  }
  componentDidMount = async () => {
    this.groupId = '@TGS#32QZIQSGS';
    await this.getSign();

    this.setup();
    this.listener = tximEmitter.addListener('onRecvGroupTextMessage', data => {
      console.log(data, 'data');
      if (data) {
        data.userInfo = data.V2TIMGroupMemberInfo;
        this.props.handleData && this.props.handleData(data);
      }
    });
  };
  componentWillUnmount = () => {
    this.listener.remove();
  };
  setup = async () => {
    let {userInfo} = this.props;
    try {
      const login = await tximBridge.login(userInfo.id.toString(), this.sign);
      try {
        await tximBridge.joinGroup(this.groupId, '申请入群');
      } catch (e) {
        console.log(e);
      }

      // const member = await tximBridge.getGroupMemberList(
      //   this.groupId,
      //   '0',
      //   '0',
      // );

      console.log('events', tximBridge, tximEmitter, login);
    } catch (e) {
      console.log('error', e);
    }
  };

  getSign = async () => {
    let {userInfo} = this.props;
    if (userInfo.id) {
      let params = {
        userId: userInfo.id,
      };
      let res = await $api['common/txSign'](params);
      this.sign = res.resultData;
    }
  };
  onSend = async mes => {
    let {userInfo} = this.props;
    let params = {
      groupId: this.groupId,
      random: Math.round(Math.random() * 10000000),
      // from_Account: userInfo.id,
      msgBody: [
        {
          msgType: 'TIMTextElem',
          msgContent: {
            text: mes.text,
          },
        },
      ],
    };
    let res = await $api['common/txSendTextMessage'](params);
    console.log(res, 'res');

    // tximBridge.sendGroupTextMessage(mes.text, this.groupId);
    // console.log(123, mes);
  };
}
const style = StyleSheet.create({
  wrap: {},
});
