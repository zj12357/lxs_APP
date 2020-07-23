import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {transformSize, commonStyle, modal} from '@/utils';
import {Touchable, Icon, Button, DatePicker, EndTip} from 'ui';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {TabBarTwo, ChatRoom} from '../components';
import {TabOne, SportsTop, TabThree, TabFour} from './item';
import $api from '@/config/api';
import {connect} from 'react-redux';
import {getSportDetail, commitSportDetail} from '@/store/actions';
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    sportDetail: state.info.sportDetail,
  };
};

const mapDispatchToProps = {
  getSportDetail,
  commitSportDetail,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class TicketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    let {id} = this.props.navigation.state.params;
    let {sportDetail} = this.props;
    return !this.state.loading ? (
      <View style={style.wrap}>
        <SportsTop
          detail={this.props.sportDetail}
          handleStar={this.handleStar}
          commitSportDetail={data => this.props.commitSportDetail(data)}
        />
        <ScrollableTabView
          contentProps={{
            keyboardShouldPersistTaps: 'always',
          }}
          renderTabBar={() => <TabBarTwo style={style.tabBar} />}>
          <TabOne id={id} tabLabel="情报" />
          <ChatRoom roomId={sportDetail.chatRoom} tabLabel="聊天" />
          <TabThree id={id} tabLabel="指数" />
          <TabFour id={id} detail={this.props.sportDetail} tabLabel="直播" />
        </ScrollableTabView>
      </View>
    ) : (
      <EndTip />
    );
  }
  componentDidMount = async () => {
    let id = this.props.navigation.state.params.id;
    this.params = {
      id: id,
    };
    this.setState({
      loading: true,
    });
    await this.props.getSportDetail(this.params);
    this.setState({
      loading: false,
    });
  };
  handleStar = async () => {
    await this.props.getSportDetail(this.params);
    modal.close();
  };
}
const style = StyleSheet.create({
  wrap: {
    backgroundColor: '#f0f0f0',
    flex: 1,
    // backgroundColor: 'red',
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
});
