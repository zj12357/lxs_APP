import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {transformSize, modal} from '@/utils';

import SafeAreaView from 'react-native-safe-area-view';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Icon, FlowList} from 'ui';
import {SportsItem, TicketItem, TabBar} from 'common';

import {connect} from 'react-redux';
import {getSportAttentionList, getTicketAttentionList} from '@/store/actions';
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = {
  getSportAttentionList,
  getTicketAttentionList,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class Focus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sports: [],
      tickets: [],
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
            leftIcon
            clickLeftIcon={() => this.props.navigation.goBack()}
          />
        )}>
        <FlowList
          ref={r => (this.flowlist_0 = r)}
          style={style.flatlistWrap}
          tabLabel="体育"
          request={this.props.getSportAttentionList}
          contentContainerStyle={style.flatlist}
          renderItem={({item}) => (
            <SportsItem from="focus" item={item} handleStar={this.handleStar} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        {/* <FlowList
          ref={r => (this.flowlist = r)}
          style={style.flatlistWrap}
          tabLabel="彩票"
          request={this.props.getTicketAttentionList}
          contentContainerStyle={style.flatlist}
          renderItem={({item}) => <TicketItem from="focus" item={item} />}
          keyExtractor={(item, index) => index.toString()}
        /> */}
      </ScrollableTabView>
    );
  }
  componentDidMount = async () => {};
  handleStar = () => {
    this.flowlist_0 && this.flowlist_0.refreshData();
    modal.close();
  };
}
const style = StyleSheet.create({
  flatlistWrap: {
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  flatlist: {},
});
