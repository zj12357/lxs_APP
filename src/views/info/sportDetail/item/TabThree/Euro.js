import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon, Button, FlowList} from 'ui';
import EuroItem from './item/EuroItem';
import {connect} from 'react-redux';
import {getSportPankouTwo} from '@/store/actions';
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    sportPankouTwo: state.info.sportPankouTwo,
  };
};

const mapDispatchToProps = {
  getSportPankouTwo,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class TabThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabLabel: ['让球', '欧指', '进球数'],
      active: 0,
      statistics: [],
      isDetail: false,
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
    let {tabLabel, active} = this.state;

    let {id, sportPankouTwo} = this.props;
    let params = {competitionById: id};
    return (
      <View style={style.wrap}>
        <FlowList
          style={style.flatlist}
          request={this.props.getSportPankouTwo}
          params={params}
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderHeader}
          contentContainerStyle={style.flatlist}
          keyExtractor={(item, index) => index.toString()}
          onFetchedData={(data, res) => this.fetchData(data, res)}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
  componentDidMount = async () => {};
  renderHeader = () => {
    let {statistics} = this.state;
    return (
      <View style={style.euroHeader}>
        {statistics.map(item => {
          let nameStragety = {
            max: '最大值',
            min: '最小值',
            avg: '平均值',
          };
          return <EuroItem title={nameStragety[item.name]} item={item} />;
        })}

        <View style={style.headerWrap}>
          <Text style={style.headerCom}>公司</Text>
          <View style={style.headerConWrap}>
            <Text style={style.headerText}>主胜</Text>
            <Text style={style.headerText}>平局</Text>
            <Text style={style.headerText}>客胜</Text>
          </View>
        </View>
      </View>
    );
  };
  renderItem = ({item, index}) => {
    return (
      <View style={style.itemWrap}>
        <EuroItem item={item} getDetail={this.props.getDetail} />
      </View>
    );
  };
  fetchData = (data, res) => {
    if (res.statistics) {
      this.setState({
        statistics: res.statistics,
      });
    }
  };
}
const style = StyleSheet.create({
  wrap: {
    flex: 1,
    marginHorizontal: transformSize(20),
  },
  flatlist: {},
  euroHeader: {
    marginTop: transformSize(24),
  },
  headerWrap: {
    marginBottom: transformSize(20),
    marginTop: transformSize(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerCom: {
    width: transformSize(168),
    textAlign: 'center',
    color: '#999',
    fontSize: transformSize(24),
  },
  headerConWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginRight: transformSize(56),
    width: transformSize(370),
  },
  headerText: {
    // flex: 1,
    textAlign: 'center',
    color: '#999',
    fontSize: transformSize(24),
  },
  itemWrap: {
    marginBottom: transformSize(20),
  },
});
