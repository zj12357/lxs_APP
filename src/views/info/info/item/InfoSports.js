import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  DeviceEventEmitter,
} from 'react-native';

import {transformSize, SCREEN_WIDTH, moment} from '@/utils';
import SafeAreaView from 'react-native-safe-area-view';
import {Touchable, Icon, FlowList} from 'ui';
import {SportsItem} from 'common';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import {TabBarTwo, Calendar} from '../../components';

import {connect} from 'react-redux';
import {getSportList} from '@/store/actions';
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    sportList: state.info.sportList,
  };
};

const mapDispatchToProps = {
  getSportList,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class InfoSports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    };
    this.data_0 = [];
    this.data_1 = [];

    this.params_0 = {status: 0};
    this.params_1 = {status: 1};
    this.params_2 = {
      status: 2,
      gameDate: moment(),
    };
    this.params_3 = {
      status: 2,
      gameDate: moment(),
    };
    // eslint-disable-next-line no-undef
    this.socket = new WebSocket('ws://159.138.3.116:8103/ws/race');

    this.socket.onopen = this.onOpenSocket.bind(this);

    this.socket.onmessage = this.onReceivedMessage.bind(this);
  }
  render() {
    return (
      <ScrollableTabView
        style={{backgroundColor: '#f0f0f0'}}
        onChangeTab={i => this.changeTab(i)}
        renderTabBar={() => <TabBarTwo />}>
        <FlowList
          ref={r => (this.flowList_0 = r)}
          contentContainerStyle={style.tab_0}
          tabLabel="全部"
          request={this.props.getSportList}
          params={this.params_0}
          renderItem={({item}) => <SportsItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
          onFetchedData={data => this.fetchData_0(data)}
        />
        <FlowList
          ref={r => (this.flowList_1 = r)}
          contentContainerStyle={style.tab_1}
          tabLabel="进行中"
          request={this.props.getSportList}
          params={this.params_1}
          renderItem={({item}) => <SportsItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
          onFetchedData={data => this.fetchData_1(data)}
        />
        <View tabLabel="赛程" style={style.calWrap}>
          <Calendar from="saicheng" clickItem={this.dateChangeSaicheng} />
          <FlowList
            ref={r => (this.flowList_2 = r)}
            contentContainerStyle={style.tab_2}
            request={this.props.getSportList}
            params={this.params_2}
            renderItem={({item}) => <SportsItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View tabLabel="赛果" style={style.calWrap}>
          <Calendar from="saiguo" clickItem={this.dateChangeSaiguo} />
          <FlowList
            ref={r => (this.flowList_3 = r)}
            contentContainerStyle={style.tab_3}
            request={this.props.getSportList}
            params={this.params_3}
            renderItem={({item}) => <SportsItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollableTabView>
    );
  }
  componentDidMount = async () => {
    this.listener = DeviceEventEmitter.addListener('filterSport', data =>
      this.handleFilter(data),
    );
  };
  componentWillUnmount = async () => {
    this.socket.close();
  };
  onOpenSocket = mes => {
    console.log('socketOpen', mes);
  };
  onReceivedMessage = mes => {
    let data = JSON.parse(mes.data);
    // console.log(mes, data, 'socket1');
    let selectData_0 = data.filter(item => {
      return this.data_0.some(dt => {
        return dt.id === item.data_id;
      });
    });
    let selectData_1 = data.filter(item => {
      return this.data_1.some(dt => {
        return dt.id === item.data_id;
      });
    });
    let finalData_0 = [];
    let finalData_1 = [];
    if (selectData_0.length) {
      finalData_0 = this.data_0.map(item => {
        let index = selectData_0.findIndex(se => {
          return se.data_id === item.id;
        });

        return {
          ...item,
          cornerKick: selectData_0[index].corner,
          midfielderScore: selectData_0[index].half_score,
          redCard: selectData_0[index].master_red,
          score: selectData_0[index].score,
          yellowCard: selectData_0[index].master_yellow,
        };
      });
      this.flowList_0 && this.flowList_0.handleOtherData(finalData_0);
    }
    if (selectData_1.length) {
      finalData_1 = this.data_1.map(item => {
        let index = selectData_1.findIndex(se => {
          return se.data_id === item.id;
        });
        return {
          ...item,
          cornerKick: selectData_1[index].corner,
          midfielderScore: selectData_1[index].half_score,
          redCard: selectData_1[index].master_red,
          score: selectData_1[index].score,
          yellowCard: selectData_1[index].master_yellow,
        };
      });
      this.flowList_1 && this.flowList_1.handleOtherData(finalData_1);
    }

    // console.log(selectData_0, selectData_1, finalData_0, finalData_1, 'socket');
  };
  handleFilter(data) {
    console.log(this, '1');
    let {page} = this.state;
    this[`params_${page}`].leagueById = data;
    this[`flowList_${page}`] && this[`flowList_${page}`].refreshData();
  }
  fetchData_0 = data => {
    this.data_0 = data;
  };
  fetchData_1 = data => {
    this.data_1 = data;
  };
  dateChangeSaicheng = date => {
    this.params_2.gameDate = date;
    this.flowList_2 && this.flowList_2.refreshData();
  };
  dateChangeSaiguo = date => {
    this.params_3.gameDate = date;
    this.flowList_3 && this.flowList_3.refreshData();
  };

  changeTab({i}) {
    this.setState({
      page: i,
    });
  }
}
const style = StyleSheet.create({
  safearea: {flex: 1, backgroundColor: '#fff'},
  calWrap: {
    flex: 1,
  },
  tab_0: {
    marginTop: transformSize(24),
  },
  tab_1: {
    marginTop: transformSize(24),
  },
  tab_2: {},
  tab_3: {},
  headerWrap: {
    height: transformSize(90),
    position: 'relative',
  },
  scrollView: {
    width: SCREEN_WIDTH - transformSize(84),
    paddingLeft: transformSize(50),
  },
  conWrap: {
    flexDirection: 'row',

    // width: SCREEN_WIDTH - transformSize(84),
  },
  btnWrap: {
    marginRight: transformSize(68),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTopText: {
    color: '#203046',
    fontSize: transformSize(26),
    marginBottom: transformSize(4),
  },
  btnBottomText: {
    color: '#203046',
    fontSize: transformSize(26),
  },
  todayWrap: {
    marginRight: transformSize(68),
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayText: {
    color: '#203046',
    fontSize: transformSize(32),
    fontWeight: 'bold',
  },
  calendar: {
    backgroundColor: '#f0f0f0',
    position: 'absolute',
    top: transformSize(15),
    right: 0,
    width: transformSize(84),
    height: transformSize(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftColor: '#ccc',
    borderLeftWidth: transformSize(1),
  },
});
