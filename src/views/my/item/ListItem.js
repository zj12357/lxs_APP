import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon} from 'ui';
import {withNavigation} from 'react-navigation';
@withNavigation
export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {item} = this.props;
    return (
      <Touchable
        style={[style.wrap, this.props.style]}
        onPress={this.props.clickList}>
        <View style={style.leftWrap}>
          <Image source={item.imgUrl} style={style.leftImage} />
          <Text style={style.leftLabel}>{item.label}</Text>
        </View>
        <View style={style.rightWrap}>
          <Text style={style.rightText}>{item.tips}</Text>
          <Icon style={style.rightIcon} name="jt" size={12} />
        </View>
      </Touchable>
    );
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: transformSize(120),
    alignItems: 'center',
  },
  leftWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftImage: {
    width: transformSize(48),
    height: transformSize(48),
    marginRight: transformSize(16),
  },
  leftLabel: {
    fontSize: transformSize(32),
    fontWeight: '500',
    color: '#333',
  },
  rightWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightText: {
    fontSize: transformSize(24),

    color: '#666',
    marginRight: transformSize(10),
  },
  rightIcon: {},
});
