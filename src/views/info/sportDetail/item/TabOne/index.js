import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Message, FlowList} from 'ui';
import {IconText} from 'common';
import {BorderTabBar} from '../../../components';

import TopPan from './item/TopPan';
import {connect} from 'react-redux';
import {getSportInfoList, getSportGuess} from '@/store/actions';
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    sportInfoList: state.info.sportInfoList,
  };
};

const mapDispatchToProps = {
  getSportInfoList,
  getSportGuess,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class TabOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabLabel: ['有利情报', '中立情报', '不利情报'],
      active: 0,
    };
  }
  render() {
    let {active, tabLabel} = this.state;
    let {sportInfoList} = this.props;
    return (
      <ScrollView style={style.wrap}>
        <TopPan />
        <BorderTabBar
          tabLabel={tabLabel}
          active={active}
          changeTab={this.changeTab}
        />
        {sportInfoList.length ? (
          <FlatList
            ref={r => (this.flowlist = r)}
            style={style.flatlistWrap}
            contentContainerStyle={style.flatlist}
            data={this.props.sportInfoList}
            renderItem={this.renderItem}
            // ListHeaderComponent={this.renderHeader}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Message preset="no-data" />
        )}
      </ScrollView>
    );
  }
  componentDidMount = async () => {
    // console.log(123);
    this.id = this.props.id;
    this.params = {
      competitionById: this.id,
      type: '有利情报',
      pageIndex: 1,
      pageSize: 100,
    };
    this.paramsGuess = {competitionById: 767};

    console.log(this.props, 'tt123');
    this.props.getSportInfoList(this.params);
    this.props.getSportGuess(this.paramsGuess);
  };
  renderHeader = () => {
    let {active, tabLabel} = this.state;
    return (
      <View style={style.tabAllWrap}>
        <BorderTabBar
          tabLabel={tabLabel}
          active={active}
          changeTab={this.changeTab}
        />
      </View>
    );
  };
  renderItem = ({item, index}) => {
    return item.isTop ? (
      <View style={style.conWrap}>
        <IconText
          title={item.teamName}
          textStyle={style.iconText}
          iconSize={15}
          icon="bt"
          iconColor="#256EFF"
        />
        <View style={style.conItemWrap}>
          <Text style={style.con}>{item.content}</Text>
        </View>
      </View>
    ) : (
      <View style={style.conItemWrap}>
        <Text style={style.con}>{item.content}</Text>
      </View>
    );
  };
  changeTab = index => {
    let {tabLabel} = this.state;
    this.params.type = tabLabel[index];
    this.setState(
      {
        active: index,
      },
      () => {
        this.props.getSportInfoList(this.params);
      },
    );
  };
}
const style = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  flatlistWrap: {
    flex: 1,
  },
  flatlist: {
    paddingHorizontal: transformSize(30),
    marginBottom: transformSize(100),
  },
  tabAllWrap: {
    marginBottom: transformSize(100),
  },
  conWrap: {
    marginTop: transformSize(28),
  },
  conItemWrap: {
    marginTop: transformSize(30),
    paddingVertical: transformSize(26),
    paddingHorizontal: transformSize(50),
    backgroundColor: '#fff',
    borderColor: '#DBDBDB',
    borderWidth: transformSize(2),
    borderRadius: transformSize(12),
  },
  iconText: {
    color: '#203046',
    fontSize: transformSize(26),
    fontWeight: 'bold',
  },
  con: {
    color: '#333',
    fontSize: transformSize(24),
    lineHeight: transformSize(36),
  },
});
