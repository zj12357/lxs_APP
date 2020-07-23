import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {transformSize, $api} from '@/utils';
import SafeAreaView from 'react-native-safe-area-view';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {ScrollTabBar, TicketItem} from 'common';
import {FlowList, EndTip} from 'ui';
import {connect} from 'react-redux';
import {getTicketTab, getTicketList} from '@/store/actions';
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    ticketTab: state.info.ticketTab,
  };
};

const mapDispatchToProps = {
  getTicketTab,
  getTicketList,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class InfoTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: ['全部', '赛车', '时时彩', '快乐', '香港彩', '秒速'],
      tab_0: [],
      tab_1: [],
      tab_2: [],
      tab_3: [],
      tab_4: [],
      tab_5: [],
    };
  }
  render() {
    console.log('tt', this.props.ticketTab);
    let ticketTab = this.props.ticketTab;
    return ticketTab.length ? (
      <ScrollableTabView
        style={style.wrap}
        onChangeTab={this.changeTab}
        renderTabBar={() => (
          <ScrollTabBar
            style={style.tabs}
            activeTextColor="#203046"
            underlineStyle={style.underline}
            underLineOffset={transformSize(19)}
          />
        )}>
        {ticketTab.map((tab, i) => {
          return (
            <FlowList
              key={i}
              contentContainerStyle={style.flatlist}
              tabLabel={tab.name}
              request={this.props.getTicketList}
              params={{lotteryTypeById: tab.id}}
              renderItem={({item}) => <TicketItem item={item} />}
              keyExtractor={(item, index) => index.toString()}
            />
          );
        })}
      </ScrollableTabView>
    ) : (
      <EndTip />
    );
  }
  componentDidMount = async () => {
    let item = {
      name: '极品赛车',
      time: '20200527101期',
      tip: '365',
      con: [8, 9, 6, 2, 10, 3, 4, 7, 1, 5],
      label: '距离下期开奖',
      minute: '16',
      second: '02',
    };
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13];
    let arrData = arr.map(it => {
      return item;
    });
    this.setState({
      tab_0: arrData,
      tab_1: arrData,
      tab_2: arrData,
      tab_3: arrData,
      tab_4: arrData,
      tab_5: arrData,
    });
    await this.props.getTicketTab({pageIndex: 1, pageSize: 10});
  };
  changeTab = ({i}) => {};
  getData = params => {
    // return new Promise((resolve, reject) => {
    //   $api['info/ticketCategoryList'](params).then(res=>{
    //     resolve(res)
    //   })
    // });
  };
}
const style = StyleSheet.create({
  wrap: {
    backgroundColor: '#f0f0f0',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
  underline: {
    width: transformSize(38),
    height: transformSize(6),
    backgroundColor: '#DA1B2A',
  },
  flatlist: {backgroundColor: '#f0f0f0', marginTop: transformSize(24)},
});
