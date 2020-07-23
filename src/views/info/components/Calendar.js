import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import {
  transformSize,
  SCREEN_WIDTH,
  dateDuring,
  moment,
  commonStyle,
} from '@/utils';
import SafeAreaView from 'react-native-safe-area-view';
import {Touchable, Icon, DatePicker} from 'ui';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {SportsItem, TabBarTwo} from '../components';

const tabWidth = transformSize(150);
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      date: '',
      saicheng: [],
      saiguo: [],
    };
  }
  render() {
    let {from} = this.props;
    let now = moment().format('YYYY-MM-DD');
    let minData = from === 'saicheng' ? now : '2000-01-01';
    let maxDate = from === 'saicheng' ? '2030-12-31' : now;
    return (
      <View style={style.headerWrap}>
        {this.renderTop()}
        <DatePicker
          locale="zh-Hans"
          style={style.calendar}
          date={this.state.date}
          hideText
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate={minData}
          maxDate={maxDate}
          confirmBtnText="确定"
          cancelBtnText="取消"
          customStyles={{}}
          onDateChange={date => {
            this.dateChange(date);
          }}
        />
      </View>
    );
  }
  componentDidMount = async () => {
    let {from} = this.props;
    let saicheng = dateDuring('saicheng');
    let saiguo = dateDuring('saiguo');
    let activeTab = from === 'saicheng' ? 0 : 6;

    this.setState(
      {
        saicheng,
        saiguo,
        activeTab,
      },
      () => {
        setTimeout(() => {
          console.log(this.scrollView);
          this.scrollView.scrollTo({
            x: tabWidth * this.state.activeTab,
            y: 0,
            animated: true,
          });
        }, 0);
      },
    );

    console.log('saicheng', saicheng, saiguo);
  };
  renderTop = () => {
    let {from} = this.props;
    let {saicheng, saiguo} = this.state;
    let data = from === 'saicheng' ? saicheng : saiguo;
    return (
      <ScrollView
        horizontal={true}
        style={style.scrollView}
        showsHorizontalScrollIndicator={false}
        ref={ref => (this.scrollView = ref)}>
        <View style={style.conWrap}>
          {data.map((item, i) => {
            return (
              <Touchable
                style={style.itemWrap}
                key={i}
                onPress={() => this.clickItem(i)}>
                {item.now ? (
                  <View style={style.todayWrap}>
                    <Text
                      style={[
                        style.todayText,
                        this.state.activeTab === i ? style.activeText : null,
                      ]}>
                      今天
                    </Text>
                  </View>
                ) : (
                  <View style={style.btnWrap}>
                    <Text
                      style={[
                        style.btnTopText,
                        this.state.activeTab === i ? style.activeText : null,
                      ]}>
                      {item.date}
                    </Text>
                    <Text
                      style={[
                        style.btnBottomText,
                        this.state.activeTab === i ? style.activeText : null,
                      ]}>
                      {item.week}
                    </Text>
                  </View>
                )}

                {this.state.activeTab === i ? (
                  <View style={style.active} />
                ) : null}
              </Touchable>
            );
          })}
        </View>
      </ScrollView>
    );
  };
  clickItem = i => {
    this.setState({
      activeTab: i,
    });
    let offsetX = 0;
    if (i < 2) {
      offsetX = 0;
    } else {
      offsetX = tabWidth * (i - 2);
    }
    let date = this.state[this.props.from][i].origin;

    this.scrollView.scrollTo({x: offsetX, y: 0, animated: true});
    this.props.clickItem && this.props.clickItem(date);
  };
  dateChange(date) {
    let {from} = this.props;
    let originArr = [];
    let stragety = {
      0: '周日',
      1: '周一',
      2: '周二',
      3: '周三',
      4: '周四',
      5: '周五',
      6: '周六',
    };
    if (from === 'saicheng') {
      originArr = [].concat(this.state.saicheng);
    } else {
      originArr = [].concat(this.state.saiguo);
    }
    let index = originArr.findIndex(item => {
      console.log(item.origin, date);
      return item.origin === date;
    });
    if (index !== -1) {
      this.clickItem(index);
    } else {
      let newItem = {
        week: stragety[moment(date).day()],
        date: moment(date).format('MM-DD'),
      };
      console.log(newItem, 'newItem');
      if (from === 'saicheng') {
        originArr.push(newItem);
        this.setState(
          {
            saicheng: originArr,
          },
          () => {
            console.log(this.state.saicheng);
            setTimeout(() => {
              this.clickItem(this.state.saicheng.length - 1);
            }, 0);
          },
        );
      } else {
        originArr.unshift(newItem);
        this.setState(
          {
            saiguo: originArr,
          },
          () => {
            setTimeout(() => {
              this.clickItem(0);
            }, 0);
          },
        );
      }
    }
  }
}
const style = StyleSheet.create({
  safearea: {flex: 1, backgroundColor: '#fff'},
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
  itemWrap: {
    marginRight: transformSize(68),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnWrap: {
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayText: {
    color: '#203046',
    fontSize: transformSize(32),
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
  activeText: {
    fontWeight: 'bold',
    color: commonStyle.colorTheme.color_theme,
  },
  active: {
    position: 'absolute',
    left: '50%',
    transform: [
      {
        translateX: -transformSize(19),
      },
    ],
    bottom: -transformSize(12),
    width: transformSize(38),
    height: transformSize(6),
    backgroundColor: '#DA1B2A',
  },
});
