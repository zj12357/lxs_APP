import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {withNavigation} from 'react-navigation';
import {transformSize, commonStyle, formatTime} from '@/utils';
import {Touchable, Icon} from 'ui';
import {ColorNum} from 'common';
@withNavigation
export default class TicketItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let {item, from} = this.props;

    return (
      <Touchable
        style={[style.itemWrap, this.props.style]}
        onPress={this.goToDetail}>
        <View style={style.topWrap}>
          <View style={style.topLeft}>
            <Text style={style.name}>{item.lotteryCategoryByName}</Text>
            <Text style={style.openNumber}>{item.number}期</Text>
          </View>

          <View style={style.topRight}>
            <Icon name="renqizhi" size={12} color="#999" />
            <Text style={style.tip}>{item.attentionAmt}</Text>
          </View>
        </View>

        <ColorNum
          data={item.openNumber}
          style={style.colorNumWrap}
          conStyle={style.colorNum}
        />

        <View style={style.bottomWrap}>
          <Text style={style.label}>距离下次开奖</Text>

          <View style={style.bottomRight}>
            <Text style={style.minute}>
              {formatTime(item.nextOpenTime, 'mm')}
            </Text>
            <Text style={style.label}>分</Text>
            <Text style={style.minute}>
              {' '}
              {formatTime(item.nextOpenTime, 'ss')}
            </Text>
            <Text style={style.label}>秒</Text>
          </View>
        </View>
      </Touchable>
    );
  }
  componentDidMount = async () => {};
  goToDetail = () => {
    let {item} = this.props;
    this.props.navigation.navigate('ticketDetail', {
      id: item.id,
      roomId: item.chatRoom,
    });
  };
}
const style = StyleSheet.create({
  itemWrap: {
    backgroundColor: '#fff',
    marginBottom: transformSize(24),
  },
  topWrap: {
    flexDirection: 'row',
    marginHorizontal: transformSize(16),
    justifyContent: 'space-between',
    height: transformSize(60),
    alignItems: 'center',
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: transformSize(1),
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  name: {
    fontSize: transformSize(28),
    fontWeight: 'bold',
    color: '#333',
    marginRight: transformSize(10),
  },
  openNumber: {
    fontSize: transformSize(24),
    color: '#333',
  },

  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tip: {
    fontSize: transformSize(24),
    color: '#999',
    marginLeft: transformSize(10),
  },

  colorNumWrap: {
    height: transformSize(124),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: transformSize(16),
    paddingHorizontal: transformSize(18),
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: transformSize(1),
  },
  colorNum: {
    width: transformSize(36),
    height: transformSize(44),
  },
  bottomWrap: {
    height: transformSize(80),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: transformSize(16),
  },
  label: {
    color: '#333',
    fontSize: transformSize(26),
  },
  bottomRight: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  minute: {
    backgroundColor: '#E1E3E4',
    marginHorizontal: transformSize(16),
    borderRadius: transformSize(6),
    paddingHorizontal: transformSize(6),
    color: '#333',
    fontSize: transformSize(26),
  },
});
