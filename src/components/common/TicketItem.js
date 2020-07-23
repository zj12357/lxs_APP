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
            <Text style={style.openNumber}>{item.number}</Text>
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
          <Text style={style.label}>{item.openText}</Text>
          <Text style={style.label}>{item.openCrown}</Text>
          <Text style={style.label}>{item.openSize}</Text>
          <Text style={style.label}>{item.openOddEven}</Text>
          <View style={style.bottomRight}>
            <Text style={style.tip}>距离下期开奖</Text>
            <Text style={style.tip}>
              {formatTime(item.nextOpenTime, 'mm:ss')}
            </Text>
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
    fontSize: transformSize(30),
    color: '#333',
    fontWeight: 'bold',
    marginRight: transformSize(10),
  },
  openNumber: {
    fontSize: transformSize(24),
    color: '#666',
  },

  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  colorNumWrap: {
    height: transformSize(86),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: transformSize(16),
    paddingHorizontal: transformSize(18),
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: transformSize(1),
  },
  colorNum: {
    width: transformSize(46),
    height: transformSize(44),
  },
  bottomWrap: {
    height: transformSize(56),

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
  tip: {
    fontSize: transformSize(26),
    color: '#DA1B2A',
    marginLeft: transformSize(10),
  },
});
