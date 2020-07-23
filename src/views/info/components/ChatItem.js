import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon, Button} from 'ui';
export default class ChatItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let {data} = this.props;
    return (
      <View style={style.chatItem}>
        {/* <Button
          icon="notice"
          iconColor="#fff"
          style={style.iconWrap}
          iconSize={transformSize(22)}
        />
        <Button
          title={'Lv' + data.user.grade}
          style={style.lv}
          textStyle={style.lvText}
        /> */}
        <Text style={style.name}>{data.user.name}</Text>
        <Text style={style.mes}>{data.text}</Text>
      </View>
    );
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({
  chatItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: transformSize(40),
    marginLeft: transformSize(40),
  },
  iconWrap: {
    padding: transformSize(4),
    backgroundColor: '#7F8AD5',
    marginRight: transformSize(6),
    borderRadius: transformSize(6),
  },
  lv: {
    width: transformSize(56),
    height: transformSize(34),
    backgroundColor: '#7F8AD5',
    marginRight: transformSize(6),
    borderRadius: transformSize(6),
  },
  lvText: {
    fontSize: transformSize(20),
    color: '#fff',
  },
  name: {
    fontSize: transformSize(26),
    color: '#65BEEA',
    marginRight: transformSize(6),
  },
  mes: {
    fontSize: transformSize(26),
    color: '#333333',
  },
});
