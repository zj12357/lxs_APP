import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {transformSize, commonStyle, modal} from '@/utils';
import {Touchable, Icon, Button, DatePicker} from 'ui';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {TabBarTwo, ChatRoom} from '../components';
import {TicketTop, TabThree, TabTwo} from './item';
import {connect} from 'react-redux';
import {getTicketDetail} from '@/store/actions';
const mapStateToProps = state => {
  return {
    ticketDetail: state.info.ticketDetail,
  };
};

const mapDispatchToProps = {
  getTicketDetail,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class TicketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = ({navigation, screenProps}) => {
    console.log('navigation', navigation.state.params.title);
    return {
      title: navigation.state.params.title,
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
    };
  };
  render() {
    let {id} = this.props.navigation.state.params;
    let roomId = this.props.ticketDetail.chatRoom;
    return (
      <View style={style.wrap}>
        <TicketTop
          data={this.props.ticketDetail}
          handleStar={this.handleStar}
        />
        <ScrollableTabView
          contentProps={{
            keyboardShouldPersistTaps: 'always',
          }}
          renderTabBar={() => <TabBarTwo style={style.tabBar} />}>
          <ChatRoom id={roomId} tabLabel="聊天室" />
          <TabTwo id={id} tabLabel="专家推荐" />
          <TabThree id={id} tabLabel="历史开奖" />
        </ScrollableTabView>
      </View>
    );
  }
  componentDidMount = async () => {
    this.params = {
      id: this.props.navigation.state.params.id,
    };
    await this.props.getTicketDetail(this.params);
    console.log(this.props.ticketDetail, 'this.props.ticket');
    this.props.navigation.setParams({
      title: this.props.ticketDetail.lotteryCategoryByName,
    });
  };
  handleStar = async () => {
    await this.props.getTicketDetail(this.params);
    modal.close();
  };
}
const style = StyleSheet.create({
  wrap: {
    backgroundColor: '#f0f0f0',
    flex: 1,
  },

  tabBar: {},
  timeWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: transformSize(66),
    alignItems: 'center',
  },
  calendar: {
    width: transformSize(200),
    alignItems: 'center',
  },
  time: {
    fontSize: transformSize(26),
    color: '#666',
    fontWeight: 'bold',
  },
  timeActive: {
    color: '#DA1B2A',
  },
  catWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: transformSize(80),
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#DBDBDB',
    borderBottomWidth: transformSize(2),
  },
  category: {
    fontSize: transformSize(24),
    color: '#203046',
    fontWeight: 'bold',
  },
  catItemWrap: {
    paddingHorizontal: transformSize(16),
    paddingVertical: transformSize(6),
    borderRadius: transformSize(4),
  },
  catActiveWrap: {
    backgroundColor: '#FF770D',
  },
  catActive: {
    color: '#fff',
  },
  tab_1: {
    marginTop: transformSize(20),
  },
  tab_2: {
    backgroundColor: '#fff',
  },
});
