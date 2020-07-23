import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon} from 'ui';
import {ColorNum} from 'common';
import {withNavigation} from 'react-navigation';
@withNavigation
export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {item} = this.props;
    return (
      <Touchable style={style.wrap} onPress={() => this.goToExpert()}>
        <View style={style.topWrap}>
          <Text style={style.name}>{item.userByName}</Text>

          <ColorNum
            style={style.colorNumWrap}
            conStyle={style.colorNum}
            data={item.recommendNumber}
          />

          <Icon name="jt" style={style.icon} />
        </View>
        <View style={style.conWrap}>
          <View style={[style.textWrap, style.numWrap]}>
            <Text style={style.label}>码数</Text>

            <Text style={style.num}>{item.pointNumber}</Text>
          </View>
          <View style={style.con}>
            <View style={[style.textWrap, style.percentMargin]}>
              <Text style={style.label}>红单率</Text>
              <Text style={style.percent}>
                {this.getPercent(item.accuracy)}
              </Text>
            </View>
            <View style={style.textWrap}>
              <Text style={style.label}>连中数</Text>
              <Text style={style.target}>{item.straightHit}</Text>
            </View>
            <Text style={style.label}>{item.playMethod}</Text>
          </View>
        </View>
      </Touchable>
    );
  }
  componentDidMount = async () => {};
  goToExpert = () => {
    let {item} = this.props;
    this.props.navigation.navigate('expert', {id: item.id, name: item.name});
  };
  getPercent = percent => {
    if (!percent) {
      return '';
    } else {
      return Math.round(percent * 100) + '%';
    }
  };
}
const style = StyleSheet.create({
  wrap: {
    height: transformSize(180),
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    borderBottomColor: '#DBDBDB',
    borderBottomWidth: transformSize(2),
  },
  topWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginRight: transformSize(20),
    marginLeft: transformSize(16),
    width: transformSize(150),
    fontSize: transformSize(26),
    fontWeight: 'bold',
    color: '#203046',
  },
  colorNumWrap: {
    flex: 1,
  },
  colorNum: {
    height: transformSize(36),
  },
  icon: {
    marginLeft: transformSize(50),
    color: '#999999',
    marginRight: transformSize(16),
  },
  conWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: transformSize(16),
  },
  label: {
    fontSize: transformSize(30),
    fontWeight: 'bold',
    color: '#203046',
  },
  numWrap: {
    // width: transformSize(120),
    marginRight: transformSize(50),
  },
  num: {
    fontSize: transformSize(26),
    fontWeight: 'bold',
    color: '#FF770D',
    marginLeft: transformSize(16),
  },
  con: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textWrap: {
    flexDirection: 'row',
  },
  percentMargin: {},
  percent: {
    fontSize: transformSize(26),
    fontWeight: 'bold',
    color: '#FF770D',
    marginLeft: transformSize(16),
  },
  targetNum: {
    fontSize: transformSize(30),
    fontWeight: 'bold',
    color: '#203046',
  },
  target: {
    fontSize: transformSize(26),
    fontWeight: 'bold',
    color: '#FF770D',
    marginLeft: transformSize(16),
  },
});
