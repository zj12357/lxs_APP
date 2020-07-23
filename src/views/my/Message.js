import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {transformSize} from '@/utils';

import SafeAreaView from 'react-native-safe-area-view';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {FlowList} from 'ui';
import {TabBar} from 'common';
import {MessageItem} from './components';

import {connect} from 'react-redux';
import {getMessageAll, getMessageRead, getMessageUnread} from '@/store/actions';
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = {
  getMessageAll,
  getMessageRead,
  getMessageUnread,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all: [],
      haveRead: [],
      unread: [],
    };
  }
  static navigationOptions = ({navigation, screenProps}) => ({
    header: null,
  });
  render() {
    return (
      <ScrollableTabView
        renderTabBar={() => (
          <TabBar
            style={style.tabBar}
            leftIcon
            clickLeftIcon={() => this.props.navigation.goBack()}
          />
        )}>
        <FlowList
          tabLabel="全部"
          style={style.flatlistWrap}
          request={this.props.getMessageAll}
          contentContainerStyle={style.flatlist}
          renderItem={({item}) => <MessageItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
        <FlowList
          tabLabel="已读"
          style={style.flatlistWrap}
          request={this.props.getMessageRead}
          params={{isRead: true}}
          contentContainerStyle={style.flatlist}
          renderItem={({item, index}) => <MessageItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
        <FlowList
          tabLabel="未读"
          style={style.flatlistWrap}
          request={this.props.getMessageUnread}
          params={{isRead: false}}
          contentContainerStyle={style.flatlist}
          renderItem={({item, index}) => <MessageItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollableTabView>
    );
  }
  componentDidMount = async () => {
    let messageItem = {
      imgUrl: require('@/assets/images/my/message/logo.png'),
      time: '2020/05/12',
      unread: true,
      con:
        '我是消息内容我是消息，内容我是消息内容我是消息内容，我是消息内容我是消息，内容我是消息内容我是消息内容我是消息内容。',
    };

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13];
    let message = arr.map(it => {
      return messageItem;
    });

    this.setState({
      all: message,
      haveRead: message,
      unread: message,
    });
  };
}
const style = StyleSheet.create({
  flatlistWrap: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  flatlist: {
    paddingHorizontal: transformSize(34),
    paddingTop: transformSize(36),
    backgroundColor: '#f0f0f0',
  },
  tabBar: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
});
