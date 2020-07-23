import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {transformSize} from '@/utils';
import SafeAreaView from 'react-native-safe-area-view';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {TabBarTwo} from '../../components';
import {NewsItem} from 'common';
import {FlowList} from 'ui';

import {connect} from 'react-redux';
import {getHappyNewsList, getHappyVideoList} from '@/store/actions';
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    happyNewsList: state.info.happyNewsList,
    happyVideoList: state.info.happyVideoList,
  };
};

const mapDispatchToProps = {
  getHappyNewsList,
  getHappyVideoList,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ScrollableTabView
        style={{backgroundColor: '#f0f0f0'}}
        renderTabBar={() => <TabBarTwo style={style.tabbar} />}>
        <FlowList
          style={style.flatlistWrap}
          contentContainerStyle={style.flatlist}
          tabLabel="热门资讯"
          request={this.props.getHappyNewsList}
          renderItem={({item, index}) => <NewsItem isH={true} item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
        <FlowList
          style={style.flatlistWrap}
          contentContainerStyle={style.flatlist}
          tabLabel="热门视频"
          request={this.props.getHappyVideoList}
          renderItem={({item, index}) => <NewsItem isH={false} item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollableTabView>
    );
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({
  tabbar: {
    justifyContent: 'space-evenly',
  },
  flatlistWrap: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  flatlist: {
    paddingHorizontal: transformSize(26),
    marginTop: transformSize(24),
    backgroundColor: '#fff',
  },
});
