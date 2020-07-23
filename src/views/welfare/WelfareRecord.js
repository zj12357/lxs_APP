import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {transformSize, commonStyle, formatTime, moment} from '@/utils';
import {Touchable, Button, ActionSheet, DatePicker, Icon, FlowList} from 'ui';
import {Select} from 'common';
import {WelfareItem} from './item';
import {connect} from 'react-redux';
import {getWelfareApplyList} from '@/store/actions';
const mapStateToProps = state => {
  return {
    welfareApplyList: state.welfare.welfareApplyList,
    welfareType: state.welfare.welfareType,
  };
};

const mapDispatchToProps = {
  getWelfareApplyList,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryOptions: [],
      statusOptions: ['全部状态', '审核中', '申请成功', '申请失败', '已发放'],
      category: '全部分类',

      status: '全部状态',
      date: '',
      params: {
        promotionTypeID: 0,
        promotionAuditType: 0,
        date: '',
      },
    };
  }
  static navigationOptions = ({navigation, screenProps}) => ({
    title: '申请记录',
    headerStyle: {
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      borderBottomWidth: 0,
    },
  });
  render() {
    console.log(3);
    let date = moment(new Date());
    let maxDate = date.format('YYYY-MM-DD');
    let minDate = date.subtract(30, 'days').format('YYYY-MM-DD');
    return (
      <View style={style.wrap}>
        <View style={style.categoryWrap}>
          <Select
            style={style.select}
            label={this.state.category}
            actionTitle={'请选择分类'}
            destructive={1}
            actionOptions={this.state.categoryOptions}
            actionConfirm={this.categoryConfirm}
          />
          <Select
            style={style.select}
            label={this.state.status}
            actionTitle={'请选择分类'}
            destructive={1}
            actionOptions={this.state.statusOptions}
            actionConfirm={this.statusConfirm}
          />

          <DatePicker
            style={style.calendar}
            date={this.state.date}
            iconComponent={<Icon name="xl" size={8} color={'#203046'} />}
            mode="date"
            placeholder="申请时间"
            format="YYYY-MM-DD"
            minDate={minDate}
            maxDate={maxDate}
            confirmBtnText="确定"
            cancelBtnText="取消"
            customStyles={{
              dateInput: {borderWidth: 0, flex: 0},
              dateIcon: {marginLeft: 1},
              placeholderText: style.iconText,
              dateText: style.iconText,
            }}
            onDateChange={date => {
              this.setState({date});
            }}
          />
        </View>
        <FlowList
          ref={r => (this.flowlist = r)}
          style={style.flatlistWrap}
          contentContainerStyle={style.flatlist}
          request={this.props.getWelfareApplyList}
          params={this.state.params}
          renderItem={({item}) => <WelfareItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
  componentDidMount = async () => {
    let data = this.props.welfareType.map(item => {
      return item.name;
    });

    data.unshift('全部分类');

    console.log(data, 'datadata');
    this.setState({
      categoryOptions: data,
    });
  };

  handleTime = () => {};
  categoryConfirm = (data, v) => {
    let type = this.props.welfareType;
    let params = this.state.params;
    params.promotionTypeID = type[v].id;
    this.setState(
      {
        category: data,
        params: params,
      },
      () => {
        this.flowlist && this.flowlist.refreshData();
      },
    );
  };
  statusConfirm = data => {
    let Stragety = {
      审核中: '0',
      审核通过: '1',
      待审核: '2',
      已发放: '4',
      拒绝审核: '-1',
    };
    let params = this.state.params;
    params.PromotionAuditType = Stragety[data];
    this.setState(
      {
        status: data,
        params: params,
      },
      () => {
        this.flowlist && this.flowlist.refreshData();
      },
    );
  };
}
const style = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  categoryWrap: {
    flexDirection: 'row',
  },
  select: {
    flex: 1,
  },
  iconText: {
    color: '#203046',
    fontSize: transformSize(28),
    fontWeight: 'bold',
  },
  flatlistWrap: {
    // flex: 1,
  },
  flatlist: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  calendar: {
    width: transformSize(200),
    alignItems: 'center',
    borderWidth: 0,
  },
});
