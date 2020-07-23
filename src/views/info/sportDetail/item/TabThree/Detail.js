import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {transformSize, commonStyle, moment} from '@/utils';
import {Touchable, Icon, Button, FlowList} from 'ui';
import $api from '@/config/api';

import {connect} from 'react-redux';
import {
  getSportDetail,
  getSportPankouCompanyOne,
  getSportPankouCompanyTwo,
  getSportPankouCompanyThree,
} from '@/store/actions';
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    sportDetail: state.info.sportDetail,
  };
};

const mapDispatchToProps = {
  getSportDetail,
  getSportPankouCompanyOne,
  getSportPankouCompanyTwo,
  getSportPankouCompanyThree,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class TabThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftData: ['BET365', 'BET365', 'BET365', 'BET365'],
      rightData: [
        {
          bifen: '2:1',
          zhudui: '1.1',
          pankou: '0.0',
          kedui: '0.7',
          riqi: '06/06 14:59',
        },
        {
          bifen: '2:1',
          zhudui: '1.1',
          pankou: '0.0',
          kedui: '0.7',
          riqi: '06/06 14:59',
        },
        {
          bifen: '2:1',
          zhudui: '1.1',
          pankou: '0.0',
          kedui: '0.7',
          riqi: '06/06 14:59',
        },
        {
          bifen: '2:1',
          zhudui: '1.1',
          pankou: '0.0',
          kedui: '0.7',
          riqi: '06/06 14:59',
        },
        {
          bifen: '2:1',
          zhudui: '1.1',
          pankou: '0.0',
          kedui: '0.7',
          riqi: '06/06 14:59',
        },
      ],
    };
  }
  render() {
    let {tabLabel, active} = this.state;
    let {name, from} = this.props.detailParams;
    let {
      id,
      getSportPankouCompanyOne,
      getSportPankouCompanyTwo,
      getSportPankouCompanyThree,
    } = this.props;
    console.log(332, name);
    let params = {
      name: name,
      competitionById: id,
    };
    let stragety = {
      '1': getSportPankouCompanyOne,
      '2': getSportPankouCompanyTwo,
      '3': getSportPankouCompanyThree,
    };
    console.log(stragety[from], params, 'detailFlow');
    return (
      <View style={style.wrap}>
        <Touchable style={style.backWrap} onPress={this.props.goBack}>
          <Icon style={style.btnWrap} name="back" color="#333" size={12} />
          <Text style={style.title}>{name}</Text>
        </Touchable>
        <View style={style.labelWrap}>
          {/* <Text style={[style.label, style.company]}>公司</Text> */}
          <View style={style.labelConWrap}>
            <Text style={style.label}>比分</Text>
            <Text style={style.label}>主队</Text>
            <Text style={style.label}>盘口</Text>
            <Text style={style.label}>客队</Text>
          </View>
          <Text style={[style.label, style.date]}>日期</Text>
        </View>
        <View style={style.conWrap}>
          <FlowList
            request={stragety[from]}
            params={params}
            renderItem={this.renderRightItem}
            style={style.rightFlatlistWrap}
            contentContainerStyle={style.rightFlatlist}
            keyExtractor={({item, index}) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
  componentDidMount = async () => {};

  renderRightItem = ({item, index}) => {
    return (
      <View style={[style.rightItem, index % 2 ? style.jishu : null]}>
        <View style={style.rightConWrap}>
          <Text style={style.label}>{item.score}</Text>
          <Text style={style.label}>{item.homeBet}</Text>
          <Text style={style.label}>{item.handicaBet}</Text>
          <Text style={style.label}>{item.visitBet}</Text>
        </View>

        <Text style={[style.label, style.date]}>
          {moment(item.createTime).format('MM/DD hh:mm')}
        </Text>
      </View>
    );
  };
}
const style = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  backWrap: {
    marginTop: transformSize(20),
    height: transformSize(68),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  btnWrap: {
    position: 'absolute',
    left: 10,
  },
  title: {
    fontSize: transformSize(28),
    color: '#333',
  },
  labelWrap: {
    flexDirection: 'row',
    height: transformSize(62),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelConWrap: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  label: {
    fontSize: transformSize(24),
    color: '#999',
  },
  company: {
    width: transformSize(160),
    textAlign: 'center',
  },
  date: {
    width: transformSize(160),
    textAlign: 'center',
  },
  conWrap: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  leftFlatlistWrap: {
    width: transformSize(160),
    backgroundColor: '#fff',
    borderRightWidth: transformSize(2),
    borderRightColor: '#DBDBDB',
  },
  leftFlatlist: {
    width: transformSize(160),
  },
  leftItem: {
    flexDirection: 'row',
    height: transformSize(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftText: {
    fontSize: transformSize(26),
    fontWeight: 'bold',
    color: '#666',
  },
  rightFlatlistWrap: {
    // flex: 1,
    width: transformSize(590),
    backgroundColor: '#fff',
  },
  rightFlatlist: {
    // flex: 1,
  },
  jishu: {
    backgroundColor: '#f8f8f8',
  },
  rightItem: {
    flexDirection: 'row',
    height: transformSize(100),
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  rightConWrap: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
