import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon} from 'ui';
export default class Title extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {title} = this.props;
    return (
      <View style={style.wrap}>
        <View style={style.leftLine} />
        <Text style={style.title}>{title}</Text>
        <View style={style.rightLine} />
      </View>
    );
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  leftLine: {
    width: transformSize(146),
    height: transformSize(2),
    backgroundColor: '#DA1B2A',
  },
  title: {
    fontSize: transformSize(32),
    color: '#DA1B2A',
    fontWeight: 'bold',
  },
  rightLine: {
    width: transformSize(146),
    height: transformSize(2),
    backgroundColor: '#DA1B2A',
  },
});
