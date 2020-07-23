import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon} from 'ui';
export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {item} = this.props;
    return (
      <View style={style.wrap}>
        <Image
          source={
            item.avatar
              ? {uri: item.avatar}
              : require('@/assets/images/info/avatar.png')
          }
          style={style.img}
        />
        <View style={style.conWrap}>
          <View style={style.topWrap}>
            <Text style={style.name}>{item.userByName || '没有名字'}</Text>
            <Text style={style.time}>{item.createTime}</Text>
          </View>
          <Text style={style.con}>{item.content}</Text>
        </View>
      </View>
    );
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({
  wrap: {
    flexDirection: 'row',

    marginTop: transformSize(30),
  },
  img: {
    width: transformSize(68),
    height: transformSize(68),
    borderRadius: transformSize(34),
    marginRight: transformSize(18),
    marginLeft: transformSize(36),
  },
  conWrap: {
    flex: 1,
    marginRight: transformSize(22),
  },
  topWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: transformSize(12),
  },
  name: {
    color: '#2D5197',
    fontSize: transformSize(32),
  },
  time: {
    color: '#666',
    fontSize: transformSize(24),
  },
  con: {
    color: '#333',
    fontSize: transformSize(32),

    lineHeight: transformSize(44),
  },
});
