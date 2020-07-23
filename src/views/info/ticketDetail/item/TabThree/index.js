import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon, Button, DatePicker, FlowList} from 'ui';

import TabThreeItem from './TabThreeItem';
import {connect} from 'react-redux';
import {getTicketHistoryList} from '@/store/actions';
const mapStateToProps = state => {
  return {
    ticketHistoryList: state.info.ticketHistoryList,
  };
};

const mapDispatchToProps = {
  getTicketHistoryList,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class TicketTabTHree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab_2: [],
      tabTwoTime: '',
      tabTwoCategory: '号码',
      date: '2020/05/27',
      chooseDate: false,
    };
  }

  render() {
    let {tabTwoTime, tabTwoCategory} = this.state;
    const time = ['今天', '昨天', '前天'];
    const category = ['时间', '期数', '号码', '大小', '单双', '冠亚/龙虎'];
    let params = {lotteryCategoryById: this.props.id};
    console.log(this.props, 'this.propsss');
    return (
      <View style={style.wrap}>
        <View style={style.timeWrap}>
          {time.map((timeItem, timeIndex) => {
            return (
              <Button
                key={timeIndex}
                title={timeItem}
                onPress={() => {
                  this.setState({
                    chooseDate: false,
                    tabTwoTime: timeItem,
                  });
                }}
                textStyle={[
                  style.time,
                  tabTwoTime === timeItem ? style.timeActive : null,
                ]}
              />
            );
          })}

          <DatePicker
            style={style.calendar}
            date={this.state.date}
            mode="date"
            iconComponent={
              <Icon
                name="xl"
                size={8}
                color={this.state.chooseDate ? '#DA1B2A' : '#666'}
              />
            }
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2000-01-01"
            maxDate="2030-12-31"
            confirmBtnText="确定"
            cancelBtnText="取消"
            customStyles={{
              dateText: this.state.chooseDate ? style.timeActive : null,
              dateInput: {borderWidth: 0, alignItems: 'flex-end'},
            }}
            onDateChange={date => {
              this.setState({date, chooseDate: true, tabTwoTime: ''});
            }}
          />
        </View>
        <View style={style.catWrap}>
          {category.map((catItem, catIndex) => {
            return (
              <Button
                key={catIndex}
                title={catItem}
                textStyle={[
                  style.category,
                  tabTwoCategory === catItem ? style.catActive : null,
                ]}
                style={[
                  style.catItemWrap,
                  tabTwoCategory === catItem ? style.catActiveWrap : null,
                ]}
                onPress={() => this.handleCategory(catIndex)}
              />
            );
          })}
        </View>
        <FlowList
          style={style.tab_2}
          request={this.props.getTicketHistoryList}
          params={params}
          renderItem={({item}) => (
            <TabThreeItem
              category={this.state.tabTwoCategory}
              time={this.state.tabTwoTime}
              item={item}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  componentDidMount = async () => {
    let tab_2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5].map(() => {
      return {
        time: '21:51',
        qishu: '745313',
        big: '单双单双单双单单单双',
      };
    });

    this.setState({
      tab_2,
    });
  };
  handleCategory = catIndex => {
    const category = ['时间', '期数', '号码', '大小', '单双', '冠亚/龙虎'];
    if (catIndex === 0 || catIndex === 1) {
      return;
    }
    this.setState({
      tabTwoCategory: category[catIndex],
    });
  };
}
const style = StyleSheet.create({
  wrap: {
    backgroundColor: '#f0f0f0',
    flex: 1,
  },

  tabBar: {},
  timeWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: transformSize(66),
    alignItems: 'center',
  },
  calendar: {
    width: transformSize(200),
    alignItems: 'center',
  },
  time: {
    fontSize: transformSize(26),
    color: '#666',
    fontWeight: 'bold',
  },
  timeActive: {
    color: '#DA1B2A',
  },
  catWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: transformSize(80),
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#DBDBDB',
    borderBottomWidth: transformSize(2),
  },
  category: {
    fontSize: transformSize(24),
    color: '#203046',
    fontWeight: 'bold',
  },
  catItemWrap: {
    paddingHorizontal: transformSize(20),
    paddingVertical: transformSize(16),
    borderRadius: transformSize(4),
  },
  catActiveWrap: {
    backgroundColor: '#FF770D',
  },
  catActive: {
    color: '#fff',
  },
  tab_1: {
    marginTop: transformSize(20),
  },
  tab_2: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
