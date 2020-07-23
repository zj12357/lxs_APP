import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon, Button} from 'ui';
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        company: 'BET365',
        chu: ['0.9', '-1.0', '0.9'],
        jishi: ['1.67', '0.0', '0.45'],
      },
    };
  }

  render() {
    let {item} = this.props;
    let delayed = (item && item.delayed && item.delayed.split(';')) || [];
    let real = (item && item.real && item.real.split(';')) || [];
    return (
      <Touchable
        style={style.itemWrap}
        onPress={() => this.props.getDetail(item.name)}>
        <View style={style.companyWrap}>
          <Text style={style.company}>{item.name}</Text>
        </View>
        <View style={style.chuWrap}>
          {delayed.map((chu, index) => {
            return (
              <Text style={style.chu} key={index}>
                {chu}
              </Text>
            );
          })}
        </View>
        <View style={style.jishiWrap}>
          {real.map((jishi, index) => {
            return (
              <Text
                style={[style.jishi, index === 2 ? style.green : null]}
                key={index}>
                {jishi}
              </Text>
            );
          })}
        </View>
        <Button style={style.iconWrap} iconColor="#999" icon="jt" />
      </Touchable>
    );
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({
  wrap: {},
  itemWrap: {
    marginBottom: transformSize(20),
    paddingVertical: transformSize(20),

    borderColor: '#dbdbdb',
    borderWidth: transformSize(1),
    borderRadius: transformSize(6),
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  companyWrap: {
    width: transformSize(168),
    borderRightColor: '#ccc',
    borderRightWidth: transformSize(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  company: {
    fontSize: transformSize(26),
    color: '#333',
  },
  chuWrap: {
    width: transformSize(240),
    borderRightColor: '#ccc',
    borderRightWidth: transformSize(2),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  chu: {
    fontSize: transformSize(26),
    color: '#333',
  },
  jishiWrap: {
    width: transformSize(240),
    borderRightColor: '#ccc',
    borderRightWidth: transformSize(2),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  jishi: {
    fontSize: transformSize(26),
    color: '#DA1B2A',
  },
  green: {
    color: '#3BA72F',
  },
  iconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: transformSize(56),
  },
});
