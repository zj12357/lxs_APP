import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {transformSize, modal} from '@/utils';

import SafeAreaView from 'react-native-safe-area-view';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {FlowList} from 'ui';
import {SportsItem, NewsItem, TabBar} from 'common';

import {connect} from 'react-redux';
import {
  getSportCollectList,
  getVideoCollectList,
  getNewsCollectList,
} from '@/store/actions';
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = {
  getSportCollectList,
  getVideoCollectList,
  getNewsCollectList,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sports: [],
      article: [],
      video: [],
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
          tabLabel="体育"
          ref={r => (this.flowlist_0 = r)}
          request={this.props.getSportCollectList}
          style={style.sportFlatlist}
          renderItem={({item}) => (
            <SportsItem
              from="collect"
              item={item}
              handleStar={this.handleStar}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <FlowList
          request={this.props.getNewsCollectList}
          params={{type: 0}}
          contentContainerStyle={style.newsFlatlist}
          tabLabel="文章"
          renderItem={({item, index}) => (
            <NewsItem isH={true} item={item} from="collect" />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <FlowList
          tabLabel="视频"
          request={this.props.getVideoCollectList}
          params={{type: 3}}
          contentContainerStyle={style.videoFlatlist}
          renderItem={({item, index}) => (
            <NewsItem isH={false} item={item} from="collect" />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
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
  sportFlatlist: {
    backgroundColor: '#f0f0f0',
  },
  newsFlatlist: {
    paddingHorizontal: transformSize(26),
    marginTop: transformSize(24),
    backgroundColor: '#fff',
  },
  videoFlatlist: {
    paddingHorizontal: transformSize(26),
    marginTop: transformSize(24),
    backgroundColor: '#fff',
  },
});
