import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Button, FlowList} from 'ui';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {TabBarTwo} from '../components';
import {TabOne, TabTwo, TabThree} from './item';
import _ from 'lodash';
import {connect} from 'react-redux';
import {getSportFilter} from '@/store/actions';

const mapStateToProps = state => {
  return {
    sportFilter: state.info.sportFilter,
  };
};

const mapDispatchToProps = {
  getSportFilter,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = ({navigation, screenProps}) => ({
    title: '赛事筛选',
  });
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollableTabView
          renderTabBar={() => <TabBarTwo style={style.tabBar} />}>
          <TabOne tabLabel="全部赛事" />
          <TabTwo tabLabel="一级赛事" />
          <TabThree tabLabel="热门赛事" />
        </ScrollableTabView>
      </SafeAreaView>
    );
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({
  wrap: {},
  tabBar: {
    backgroundColor: '#f5f5f5',
    borderBottomColor: '#DBDBDB',
    borderBottomWidth: transformSize(1),
  },
  flatlistWrap: {
    flex: 1,
  },
  tab_0: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: transformSize(26),
  },
  tab_1: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: transformSize(26),
  },
  tab_2: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: transformSize(26),
  },
  bottomBtnWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: transformSize(88),
    alignItems: 'center',
  },
  btnWrap: {
    flex: 1,
    height: transformSize(88),
  },
  confirm: {
    backgroundColor: '#DA1B2A',
  },
  btn: {
    fontSize: transformSize(30),
    color: '#203046',
    fontWeight: 'bold',
  },
  confirmBtn: {
    color: '#fff',
  },
});
