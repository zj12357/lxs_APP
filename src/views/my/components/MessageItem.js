import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {transformSize, commonStyle, formatTime} from '@/utils';
import {Touchable, Icon} from 'ui';
export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {item} = this.props;
    return (
      <View style={style.wrap}>
        <View style={style.imgWrap}>
          <Image
            style={style.img}
            source={require('@/assets/images/my/message/logo.png')}
          />
        </View>

        <View style={style.conWrap}>
          <Text style={style.time}>
            {formatTime(item.createTime, 'YYYY/MM/DD')}
          </Text>
          <Text style={style.con}>{item.content}</Text>
          {!item.isRead ? <Icon name="jg" style={style.unread} /> : null}
        </View>
      </View>
    );
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    marginBottom: transformSize(32),
  },
  imgWrap: {
    width: transformSize(70),
    height: transformSize(70),
    borderRadius: transformSize(35),
    borderColor: '#DA1B2A',
    borderWidth: transformSize(2),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: transformSize(23),
    marginTop: transformSize(10),
  },
  img: {
    width: transformSize(66),
    height: transformSize(60),
  },
  conWrap: {
    width: transformSize(589),
    backgroundColor: '#fff',
    paddingHorizontal: transformSize(28),
    position: 'relative',
    borderRadius: transformSize(20),
  },
  time: {
    marginTop: transformSize(20),
    fontSize: transformSize(26),
    color: '#999',
  },
  con: {
    marginTop: transformSize(16),
    fontSize: transformSize(32),
    color: '#333',
    lineHeight: transformSize(44),
    marginBottom: transformSize(30),
  },
  unread: {
    position: 'absolute',
    right: transformSize(32),
    top: transformSize(32),
  },
});
