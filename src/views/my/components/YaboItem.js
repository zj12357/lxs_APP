import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle, SCREEN_WIDTH} from '@/utils';
import {Touchable, Icon} from 'ui';
export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={style.wrap}>
        <View style={style.topWrap}>
          <Text style={style.title}>
            我是报表多久啊我水库附近哦危机发生的看法短发
          </Text>
          <Text style={style.num}>+ 3521</Text>
        </View>
        <View style={style.tipsWrap}>
          <Text style={style.time}>2020/05/03</Text>
          <Text style={style.status}>已到账</Text>
        </View>
      </View>
    );
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({
  wrap: {
    height: transformSize(176),
    marginBottom: transformSize(16),
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingHorizontal: transformSize(30),
    width: SCREEN_WIDTH,
  },
  topWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: transformSize(32),
    lineHeight: transformSize(44),
    color: '#203046',
    fontWeight: 'bold',
    overflow: 'hidden',
    flex: 1,
  },
  num: {
    fontSize: transformSize(32),
    color: '#3BA72F',
    fontWeight: 'bold',
  },
  tipsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: transformSize(32),
    color: '#999999',
  },
  status: {
    fontSize: transformSize(32),
    color: '#203046',
  },
});
