import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {
  transformSize,
  commonStyle,
  modal,
  diffTime,
  percentTime,
} from '@/utils';
import {Touchable, Icon, Button} from 'ui';
import {ColorNum, Webview, Star} from 'common';
import * as Progress from 'react-native-progress';
import {withNavigation} from 'react-navigation';
@withNavigation
export default class TicketTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        name: '极品赛车',
        time: '20200527101期',
        tip: '365',
        con: [8, 9, 6, 2, 10, 3, 4, 7, 1, 5],
        label: '距离下期开奖仅有',
      },
    };
  }

  render() {
    let {item} = this.state;
    let data = this.props.data || {};
    console.log(data, 'this.props.data');
    return (
      <View style={style.wrap}>
        <View style={style.topWrap}>
          <Text style={style.name}>{data.number}期开奖</Text>
          <Text style={style.time}>已开{data.surplusTotal}期</Text>
          <Text style={style.time}>剩余{data.total}期</Text>
          <Star
            style={style.starWrap}
            type={1}
            noCollect
            iconSize={20}
            data={data}
            handleStar={this.props.handleStar}
          />
        </View>
        <ColorNum
          style={style.conWrap}
          conStyle={style.colorNum}
          conText={style.conText}
          data={data.openNumber}
        />
        <View style={style.tipWrap}>
          <Text style={style.label}>{data.openText}</Text>
          <Text style={style.label}>{data.openCrown}</Text>
          <Text style={style.label}>{data.openSize}</Text>
          <Text style={style.label}>{data.openOddEven}</Text>
        </View>
        <View style={style.bottomWrap}>
          <Text style={style.label}>{item.label}</Text>
          <View style={style.proWrap}>
            <Progress.Bar
              height={4}
              progress={percentTime(data.openDateTime, data.nextOpenDateTime)}
              color="#DA1B2A"
              unfilledColor="#F0F0F0"
              width={115}
            />
            <Text style={style.minute}>{diffTime(data.nextOpenDateTime)}</Text>
          </View>

          <Button
            title="视频"
            icon="zb_b"
            iconColor="#fff"
            iconSize={14}
            style={style.btnWrap}
            textStyle={style.btn}
            onPress={this.goToWeb}
          />
        </View>
      </View>
    );
  }
  componentDidMount = async () => {};

  goToWeb = () => {
    let data = this.props.data || {};
    if (data.liveMethod) {
      modal.show(
        <View style={style.webviewWrap}>
          <Webview url={data.liveMethod} />
        </View>,
        'center',
      );
    }
  };
}

const style = StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    marginBottom: transformSize(24),
  },
  topWrap: {
    flexDirection: 'row',
    marginHorizontal: transformSize(16),

    height: transformSize(60),
    alignItems: 'center',
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: transformSize(1),
    position: 'relative',
  },

  name: {
    fontSize: transformSize(30),
    color: '#333',
    fontWeight: 'bold',
    marginRight: transformSize(10),
  },
  time: {
    fontSize: transformSize(26),
    color: '#666',
    marginRight: transformSize(10),
  },
  starWrap: {
    position: 'absolute',
    right: 10,
  },
  conWrap: {
    height: transformSize(124),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: transformSize(16),
    paddingHorizontal: transformSize(18),
  },
  colorNum: {
    width: transformSize(46),
    height: transformSize(56),
  },
  conText: {
    fontSize: transformSize(30),
    fontWeight: 'bold',
  },
  tipWrap: {
    marginHorizontal: transformSize(16),
    flexDirection: 'row',
  },
  tip: {
    color: '#666',
    fontSize: transformSize(24),
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
  proWrap: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  minute: {
    marginLeft: transformSize(10),
    color: '#DA1B2A',
    fontSize: transformSize(30),
  },
  btnWrap: {
    backgroundColor: '#FF770D',
    width: transformSize(132),
    height: transformSize(52),
    borderRadius: transformSize(8),
    justifyContent: 'space-evenly',
  },
  btn: {
    color: '#fff',
    fontSize: transformSize(30),
  },
  webviewWrap: {
    width: transformSize(600),
    height: transformSize(400),
  },
});
