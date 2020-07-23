import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  DeviceEventEmitter,
} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon, Button} from 'ui';
import {Txim} from 'common';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import {ChatItem} from './';
import $api from '@/config/api';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {getRoom} from '@/store/actions';

const mapStateToProps = state => {
  return {
    room: state.info.room,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = {
  getRoom,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@withNavigation
export default class TicketChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }
  render() {
    let {userInfo, roomId} = this.props;
    return (
      <View style={{flex: 1}}>
        <GiftedChat
          alwaysShowSend
          placeholder={
            userInfo.name ? '跟大家聊聊（5级以上会员可发言）' : '登陆后可发言'
          }
          renderMessage={this.renderMessage}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          renderSend={this.renderSend}
          user={{
            _id: userInfo.id,
            name: userInfo.name,
          }}
        />
        <Txim
          userInfo={userInfo}
          ref={r => (this.txim = r)}
          handleData={message => this.handleData(message)}
        />
      </View>
    );
  }
  componentDidMount = async () => {
    let {userInfo, roomId} = this.props;
    console.log('haha');

    let roomParams = {
      id: roomId,
    };
    this.props.getRoom(roomParams);
  };
  componentWillUnmount() {}
  renderSend = props => {
    let {userInfo} = this.props;
    return (
      <Send {...props} containerStyle={style.sendContainer}>
        {userInfo.name ? (
          <Button style={style.btnWrap} textStyle={style.btn} title="发送" />
        ) : (
          <Button
            style={style.btnWrap}
            textStyle={style.btn}
            title="登录/注册"
            onPress={() => this.props.navigation.navigate('login')}
          />
        )}
      </Send>
    );
  };

  renderMessage = tt => {
    return <ChatItem data={tt.currentMessage} />;
  };
  onSend(messages = []) {
    console.log(messages, 'message');
    Keyboard.dismiss();
    this.txim.onSend(messages[0]);
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages),
    // }));
  }
  handleData(message) {
    console.log('recive', message);
    let item = {
      _id: message.msgID,
      text: message.text,

      user: {
        _id: message.userInfo && message.userInfo.userID,
        name:
          (message.userInfo && message.userInfo.nickName) ||
          message.userInfo.userID,
      },
    };
    let messages = this.state.messages;
    messages.unshift(item);
    console.log('message', messages);
    this.setState({
      messages: messages,
    });
  }
}
const style = StyleSheet.create({
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 15,
  },
  btnWrap: {
    backgroundColor: '#DA1B2A',
    // width: transformSize(120),
    paddingHorizontal: transformSize(20),
    height: transformSize(54),
    borderRadius: transformSize(28),
  },
  btn: {
    color: '#fff',
    fontSize: transformSize(26),
  },
  mes: {
    fontSize: transformSize(26),
    color: '#333333',
  },
});
