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
    let {title, item} = this.props;
    let delayed = (item && item.delayed && item.delayed.split(';')) || [];
    let real = (item && item.real && item.real.split(';')) || [];
    return (
      <Touchable
        style={style.itemWrap}
        onPress={() => this.getDetail(item.name)}>
        <View style={style.companyWrap}>
          {title ? (
            <Text style={style.titleText}>{title}</Text>
          ) : (
            <Text style={style.company}>{item.name}</Text>
          )}
        </View>
        <View style={style.conWrap}>
          <View style={style.conLineWrap}>
            <Text style={style.label}>初盘</Text>
            <View style={style.conMainWrap}>
              {delayed.map((chu, index) => {
                return (
                  <Text style={style.chu} key={index}>
                    {chu}
                  </Text>
                );
              })}
            </View>
          </View>
          <View style={style.conLineWrap}>
            <Text style={style.label}>即盘</Text>
            <View style={style.conMainWrap}>
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
          </View>
        </View>

        {title ? (
          <View style={style.iconWrap} />
        ) : (
          <Button style={style.iconWrap} iconColor="#999" icon="jt" />
        )}
      </Touchable>
    );
  }
  componentDidMount = async () => {};
  getDetail = name => {
    this.props.getDetail && this.props.getDetail(name);
  };
}
const style = StyleSheet.create({
  wrap: {},
  itemWrap: {
    borderColor: '#dbdbdb',
    borderWidth: transformSize(1),
    borderRadius: transformSize(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: transformSize(30),
    fontWeight: 'bold',
    color: '#333',
  },
  companyWrap: {
    width: transformSize(168),

    justifyContent: 'center',
    alignItems: 'center',
  },
  company: {
    fontSize: transformSize(26),
    color: '#333',
  },
  conWrap: {
    flex: 1,

    height: transformSize(112),
    justifyContent: 'space-evenly',
  },
  conLineWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    flex: 1,
    textAlign: 'center',
    fontSize: transformSize(26),
    color: '#999',
  },
  conMainWrap: {
    width: transformSize(370),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  chu: {
    fontSize: transformSize(26),
    color: '#333',
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
