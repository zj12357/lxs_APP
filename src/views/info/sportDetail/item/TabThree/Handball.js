import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon, Button, FlowList} from 'ui';
import NormalItem from './item/NormalItem';
import {connect} from 'react-redux';
import {getSportPankouOne} from '@/store/actions';
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    sportPankouOne: state.info.sportPankouOne,
  };
};

const mapDispatchToProps = {
  getSportPankouOne,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class TabThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          company: 'BET365',
          chu: ['0.9', '-1.0', '0.9'],
          jishi: ['1.67', '0.0', '0.45'],
        },
        {
          company: 'BET365',
          chu: ['0.9', '-1.0', '0.9'],
          jishi: ['1.67', '0.0', '0.45'],
        },
        {
          company: 'BET365',
          chu: ['0.9', '-1.0', '0.9'],
          jishi: ['1.67', '0.0', '0.45'],
        },
        {
          company: 'BET365',
          chu: ['0.9', '-1.0', '0.9'],
          jishi: ['1.67', '0.0', '0.45'],
        },
        {
          company: 'BET365',
          chu: ['0.9', '-1.0', '0.9'],
          jishi: ['1.67', '0.0', '0.45'],
        },
        {
          company: 'BET365',
          chu: ['0.9', '-1.0', '0.9'],
          jishi: ['1.67', '0.0', '0.45'],
        },
      ],
    };
  }
  render() {
    let params = {competitionById: this.props.id};
    return (
      <View style={style.wrap}>
        <FlowList
          request={this.props.getSportPankouOne}
          params={params}
          renderItem={({item}) => (
            <NormalItem item={item} getDetail={this.props.getDetail} />
          )}
          ListHeaderComponent={this.renderHeader}
          contentContainerStyle={style.flatlist}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
  componentDidMount = async () => {};
  renderHeader = () => {
    let {sportPankouOne} = this.props;
    return sportPankouOne.length ? (
      <View style={style.headerWrap}>
        <Text style={style.headerCom}>公司</Text>
        <Text style={style.headerChu}>初盘</Text>
        <Text style={style.headerJishi}>即时盘</Text>
      </View>
    ) : null;
  };
}
const style = StyleSheet.create({
  wrap: {
    flex: 1,
    marginHorizontal: transformSize(20),
  },
  flatlist: {},

  headerWrap: {
    marginBottom: transformSize(20),
    marginTop: transformSize(30),
    flexDirection: 'row',
  },
  headerCom: {
    width: transformSize(168),
    textAlign: 'center',
    color: '#999',
    fontSize: transformSize(24),
  },
  headerChu: {
    width: transformSize(240),
    textAlign: 'center',
    color: '#999',
    fontSize: transformSize(24),
  },
  headerJishi: {
    width: transformSize(240),
    textAlign: 'center',
    color: '#999',
    fontSize: transformSize(24),
  },
});
