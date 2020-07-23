import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon} from 'ui';
import {ColorNum} from 'common';
export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({navigation, screenProps}) => ({
    title: '在线反馈',
  });
  render() {
    return (
      <View style={style.wrap}>
        <View style={style.topWrap}>
          <View style={style.topLeftWrap}>
            <Text style={style.topLeftTitle}>赛车</Text>
            <Text style={style.topLeftLabel}>第311313期</Text>
          </View>
          <View style={style.topRightWrap}>
            <Text style={style.topRight}>冠军定码</Text>
          </View>
        </View>
        <View style={style.conWrap}>
          <View style={style.conRowWrap}>
            <Text style={style.conLabel}>开奖号码</Text>
            <ColorNum style={style.colorNumWrap} conStyle={style.colorNum} />
          </View>
          <View style={style.conRowWrap}>
            <Text style={style.conLabel}>预测号码</Text>
            <ColorNum style={style.colorNumWrap} conStyle={style.colorNum} />
          </View>
        </View>
      </View>
    );
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    marginBottom: transformSize(16),
  },
  topWrap: {
    flexDirection: 'row',
    height: transformSize(50),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: transformSize(20),
    borderBottomColor: '#DBDBDB',
    borderBottomWidth: transformSize(2),
  },
  topLeftWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topLeftTitle: {
    fontSize: transformSize(30),
    fontWeight: 'bold',
    color: '#203046',
  },
  topLeftLabel: {
    fontSize: transformSize(28),
    fontWeight: 'bold',
    color: '#203046',
    marginLeft: transformSize(16),
  },
  topRightWrap: {},
  topRight: {
    fontSize: transformSize(30),
    fontWeight: 'bold',
    color: '#203046',
  },
  conWrap: {
    height: transformSize(122),
    justifyContent: 'space-around',
    paddingHorizontal: transformSize(20),
  },
  conRowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conLabel: {
    fontSize: transformSize(26),
    fontWeight: 'bold',
    color: '#203046',
  },

  colorNumWrap: {
    width: transformSize(422),
    marginHorizontal: transformSize(20),
  },
  colorNum: {
    width: transformSize(38),
    height: transformSize(36),
  },
});
