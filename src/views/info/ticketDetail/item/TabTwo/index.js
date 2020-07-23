import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon, Button, ActionSheet, FlowList} from 'ui';
import TabTwoItem from './TabTwoItem';
import axios from '@/config/axios';
import {Select} from 'common';
import {connect} from 'react-redux';
import {getTicketRecommendList, getTicketPlayMethod} from '@/store/actions';
const mapStateToProps = state => {
  return {
    ticketRecommendList: state.info.ticketRecommendList,
    ticketPlayMethod: state.info.ticketPlayMethod,
    ticketDetail: state.info.ticketDetail,
  };
};

const mapDispatchToProps = {
  getTicketRecommendList,
  getTicketPlayMethod,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class TicketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionOptions: [],
      label: '冠军定码',
      params: {
        lotteryById: props.id,
      },
    };
  }

  render() {
    return (
      <View style={style.wrap}>
        <FlowList
          style={style.tab_1}
          ref={r => (this.flowlist = r)}
          request={this.props.getTicketRecommendList}
          params={this.state.params}
          renderItem={({item}) => <TabTwoItem item={item} />}
          ListHeaderComponent={this.renderHeader}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
  componentDidMount = async () => {
    let params = {
      lotteryCategoryById: this.props.ticketDetail.lotteryCategoryById,
      pageIndex: 1,
      pageSize: 100,
    };

    await this.props.getTicketPlayMethod(params);
    let data2 = this.props.ticketPlayMethod.map(item => {
      return item.playMethod;
    });

    data2.unshift('冠军定码');

    console.log(data2, 'datadata');
    this.setState({
      actionOptions: data2,
    });
  };
  renderHeader = () => {
    return (
      <View style={style.headerWrap}>
        <Text style={style.text_1}>专家</Text>
        <Text style={style.text_2}>推荐号码</Text>
        <Select
          style={style.select}
          btnStyle={style.btnStyle}
          label={this.state.label}
          actionTitle={'请设置冠军定码'}
          actionOptions={this.state.actionOptions}
          actionConfirm={this.actionConfirm}
        />
      </View>
    );
  };
  actionConfirm = data => {
    this.setState(
      {
        label: data,
        params: {
          lotteryById: this.props.id,
          playMethod: data,
        },
      },
      () => {
        this.flowlist && this.flowlist.refreshData();
      },
    );
  };
}
const style = StyleSheet.create({
  wrap: {
    backgroundColor: '#f0f0f0',
    flex: 1,
  },

  tab_1: {
    marginTop: transformSize(20),
  },
  headerWrap: {
    flexDirection: 'row',
    paddingHorizontal: transformSize(16),
    backgroundColor: '#fff',
    height: transformSize(80),
    borderBottomColor: '#DBDBDB',
    borderBottomWidth: transformSize(2),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text_1: {
    width: transformSize(120),
    textAlign: 'center',
  },
  text_2: {
    width: transformSize(300),
    textAlign: 'center',
  },
  select: {
    flex: 1,
  },
  btnStyle: {
    justifyContent: 'flex-end',
  },
});
