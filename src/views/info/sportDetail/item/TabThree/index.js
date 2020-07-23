import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon, Button} from 'ui';
import {BorderTabBar} from '../../../components';
import Detail from './Detail';
import Euro from './Euro';
import Goals from './Goals';
import Handball from './Handball';
import {connect} from 'react-redux';
import {getSportPankouCompany} from '@/store/actions';
const mapStateToProps = state => {
  return {
    sportPankouCompany: state.info.sportPankouCompany,
  };
};

const mapDispatchToProps = {
  getSportPankouCompany,
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
      isDetail: false,
    };
  }
  render() {
    let {tabLabel, active, isDetail} = this.state;
    let stragety = {
      0: <Handball id={this.props.id} getDetail={this.getHandballDetail} />,
      1: <Euro id={this.props.id} getDetail={this.getEuroDetail} />,
      2: <Goals id={this.props.id} getDetail={this.getGoalsDetail} />,
    };
    return (
      <View style={style.wrap}>
        <BorderTabBar
          tabLabel={tabLabel}
          active={active}
          changeTab={this.changeTab}
        />
        {isDetail ? (
          <Detail
            id={this.props.id}
            goBack={this.goBack}
            detailParams={this.detailParams}
          />
        ) : (
          stragety[active]
        )}
      </View>
    );
  }
  componentDidMount = async () => {
    let id = this.props.id;
    let params = {competitionById: id};
    // this.props.getSportPankouCompany(params);
  };

  changeTab = index => {
    this.setState({
      active: index,
      isDetail: false,
    });
  };
  getHandballDetail = name => {
    this.detailParams = {name: name, from: '1'};

    this.setState({
      isDetail: true,
    });
  };
  getEuroDetail = name => {
    this.detailParams = {name: name, from: '2'};
    this.setState({
      isDetail: true,
    });
  };
  getGoalsDetail = name => {
    this.detailParams = {name: name, from: '3'};
    this.setState({
      isDetail: true,
    });
  };
  goBack = () => {
    this.setState({
      isDetail: false,
    });
  };
}
const style = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  flatlist: {
    paddingHorizontal: transformSize(20),
  },

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
  itemWrap: {
    marginBottom: transformSize(20),
    paddingVertical: transformSize(20),

    borderColor: '#dbdbdb',
    borderWidth: transformSize(1),
    borderRadius: transformSize(6),
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  companyWrap: {
    width: transformSize(168),
    borderRightColor: '#ccc',
    borderRightWidth: transformSize(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  company: {
    fontSize: transformSize(26),
    color: '#333',
  },
  chuWrap: {
    width: transformSize(240),
    borderRightColor: '#ccc',
    borderRightWidth: transformSize(2),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  chu: {
    fontSize: transformSize(26),
    color: '#333',
  },
  jishiWrap: {
    width: transformSize(240),
    borderRightColor: '#ccc',
    borderRightWidth: transformSize(2),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  jishi: {
    fontSize: transformSize(26),
    color: '#DA1B2A',
  },
  green: {
    color: '#3BA72F',
  },
  iconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: transformSize(56),
  },
});
