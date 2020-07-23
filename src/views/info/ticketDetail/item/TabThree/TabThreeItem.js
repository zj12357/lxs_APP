import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle, formatTime} from '@/utils';
import {Touchable, Icon} from 'ui';
import {ColorNum} from 'common';
export default class TabThreeItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {item, category} = this.props;
    let number = item.openNumber && item.openNumber.split(',');
    let big = number.map(n => {
      return Number(n) % 2 ? '单' : '双';
    });

    return (
      <View style={style.wrap}>
        <Text style={style.time}>{formatTime(item.openDateTime, 'HH:mm')}</Text>
        <Text style={style.qishu}>{item.surplusTotal}</Text>
        {category === '号码' ? (
          <ColorNum
            style={style.colorNumWrap}
            conStyle={style.colorNum}
            data={item.openNumber}
          />
        ) : (
          <View style={style.bigWrap}>
            {big.map(i => {
              return (
                <View style={[style.conWrap, i === '双' ? style.shuang : null]}>
                  <Text style={[style.text]}>{i}</Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
    );
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: transformSize(88),
    borderBottomWidth: transformSize(1),
    borderBottomColor: '#DBDBDB',
  },
  time: {
    width: transformSize(115),
    textAlign: 'center',
  },
  qishu: {
    width: transformSize(115),
    textAlign: 'center',
  },

  colorNumWrap: {
    flex: 1,
    marginHorizontal: transformSize(20),
  },
  colorNum: {
    width: transformSize(42),
    height: transformSize(40),
  },
  bigWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: transformSize(20),
  },
  conWrap: {
    width: transformSize(42),
    height: transformSize(40),
    backgroundColor: '#ACACAC',
    borderRadius: transformSize(6),
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: transformSize(24),
    fontWeight: 'bold',
    color: '#fff',
  },
  shuang: {
    backgroundColor: '#FF770D',
  },
});
