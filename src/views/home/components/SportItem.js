import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {transformSize, commonStyle, modal, formatTime} from '@/utils';
import {Touchable, Icon, Button} from 'ui';
import {IconText} from 'common';
import {withNavigation} from 'react-navigation';
@withNavigation
export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {item, from} = this.props;

    let homeYellow = item.yellowCard && item.yellowCard.split('-')[0];
    let visitYellow = item.yellowCard && item.yellowCard.split('-')[1];
    let statusStragety = {
      0: '未',
      1: item.duration,
      2: item.duration,
      3: item.duration,
      4: '完',
    };
    return (
      <Touchable
        style={[style.itemWrap, this.props.style]}
        onPress={this.goToSportsDetail}>
        <View style={[style.topWrap, this.props.topWrap]}>
          <View style={style.topLeft}>
            <Text style={style.name}>{item.leagueByName}</Text>
            {/* <Text style={style.time}>{formatTime(item.gameDate, 'HH:mm')}</Text> */}
          </View>
          <View style={style.topCenter}>
            <Text style={style.status}>{statusStragety[item.gameStatus]}</Text>
            {/* <Text style={style.playTime}>{item.playTime}</Text> */}
          </View>
          <View style={style.topRight}>
            <Icon name="renqizhi" size={12} color="#999" />
            <Text style={style.tip}>{item.popularity}</Text>
          </View>
        </View>
        <View style={[style.conWrap, this.props.conWrap]}>
          <View style={style.conCenterWrap}>
            <Button
              title={item.homeTeamName}
              style={style.conLeft}
              renderIcon={() => this.renderIcon(homeYellow)}
              textStyle={style.leftTeam}
              icon="jg"
              iconSize={12}
            />
            <Text style={style.score}>{item.score}</Text>

            <Button
              title={item.visitingTeamName}
              style={style.conRight}
              renderIcon={() => this.renderIcon(visitYellow)}
              textStyle={style.rightTeam}
              isIconRight
              icon="jg"
              iconSize={12}
            />
          </View>
        </View>

        <View style={style.bottomWrap}>
          <View style={style.btLeftWrap}>
            <Text style={style.btLeft}>
              半：{item.midfielderScore || '0-0'}
            </Text>
            <Text style={style.btLeft}>角：{item.cornerKick}</Text>
            <Text style={style.btLeft}>
              <Icon name="hp" color="#FFA50D" />：{item.yellowCard}
            </Text>
            <Text style={style.btLeft}>
              <Icon name="hp" color="#DA1B2A" />：{item.redCard}
            </Text>
          </View>
          {item.isInfo ? (
            <IconText
              icon="qb_x"
              title="情报"
              iconColor="#DA1B2A"
              textStyle={style.btTextStyle}
            />
          ) : null}
        </View>
      </Touchable>
    );
  }
  componentDidMount = async () => {};
  renderIcon = data => {
    if (data && data !== '0') {
      return (
        <View style={style.conIconWrap}>
          <Text style={style.conIcon}>{data}</Text>
        </View>
      );
    } else {
      return null;
    }
  };
  goToSportsDetail = () => {
    let {item} = this.props;
    this.props.navigation.navigate('sportsDetail', {id: item.id});
  };
  handleStar = () => {
    let MyComponent = (
      <View style={style.modalWrap}>
        <Text style={style.modalTitle}>
          关注：
          <Text style={style.modalLabel}>
            添加到先关注栏中的同时赛事结果会通过APP进行推送
          </Text>
        </Text>
        <Text style={style.modalTitle}>
          收藏：
          <Text style={style.modalLabel}>仅显示在收藏栏中，无任何消息推送</Text>
        </Text>

        <View style={style.modalBtnWrap}>
          <Button
            style={style.btnWrap}
            textStyle={style.btn}
            onPress={this.cancel}
            title="收藏"
          />
          <Button
            style={style.btnWrap}
            textStyle={style.btn}
            onPress={this.contactConfirm}
            title="关注"
          />
        </View>
      </View>
    );
    modal.show(MyComponent, 'center');
  };
}
const style = StyleSheet.create({
  itemWrap: {
    backgroundColor: '#fff',
    marginBottom: transformSize(24),
    paddingHorizontal: transformSize(30),
    flexDirection: 'column',
    justifyContent: 'space-around',
    position: 'relative',
  },
  topWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderBottomColor: '#E6E6E6',
    borderBottomWidth: transformSize(1),
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    flexWrap: 'wrap',
    width: '40%',
  },

  name: {
    // width: transformSize(200),
    fontSize: transformSize(24),
    color: '#333',
    marginRight: transformSize(10),
    marginVertical: transformSize(10),
  },
  time: {
    fontSize: transformSize(24),
    color: '#333',
  },
  topCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  },
  status: {
    fontSize: transformSize(24),
    color: '#FF3B3B',
    // marginRight: transformSize(18),
  },
  playTime: {
    fontSize: transformSize(24),
    color: '#FF3B3B',
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '40%',
  },
  tip: {
    fontSize: transformSize(24),
    color: '#999',
    marginLeft: transformSize(10),
  },
  conWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: transformSize(44),
  },

  conCenterWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
  },
  conLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: '60%',
    // width: '40%',
  },
  conIconWrap: {
    width: transformSize(24),
    height: transformSize(30),
    backgroundColor: '#FFA50D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  conIcon: {
    fontSize: transformSize(20),
    color: '#fff',
  },
  leftTeam: {
    marginLeft: transformSize(10),
    fontSize: transformSize(24),
    fontWeight: 'bold',
  },
  conCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  score: {
    textAlign: 'center',
    fontSize: transformSize(24),
    fontWeight: 'bold',
    color: '#FF0707',
  },
  conRight: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: '60%',
    // width: '40%',
  },
  rightTeam: {
    marginRight: transformSize(10),
    fontSize: transformSize(24),
    fontWeight: 'bold',
  },
  bottomWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: transformSize(14),
  },
  btLeftWrap: {
    flexDirection: 'row',
  },
  btLeft: {
    fontSize: transformSize(24),
    color: '#333',
    marginRight: transformSize(20),
  },

  btTextStyle: {
    color: '#DA1B2A',
  },
  image: {
    position: 'absolute',
    right: transformSize(34),
    bottom: transformSize(12),
    width: transformSize(105),
    height: transformSize(91),
  },

  modalWrap: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: transformSize(524),
    paddingHorizontal: transformSize(36),
    borderRadius: transformSize(8),
  },
  modalTitle: {
    fontSize: transformSize(28),
    color: '#203046',
    fontWeight: 'bold',
    marginTop: transformSize(32),
  },
  modalLabel: {
    fontSize: transformSize(28),
    color: '#203046',
    fontWeight: 'normal',
    marginTop: transformSize(32),
  },
  modalInputWrap: {
    marginTop: transformSize(48),
    width: transformSize(452),
    height: transformSize(92),
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: transformSize(34),
    marginBottom: transformSize(58),
  },
  modalInput: {},
  modalBtnWrap: {
    marginBottom: transformSize(38),
    marginTop: transformSize(34),
    width: transformSize(454),
    height: transformSize(64),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  btnWrap: {
    width: transformSize(218),
    height: transformSize(64),
    borderRadius: transformSize(8),
    backgroundColor: '#DA1B2A',
  },
  btn: {
    fontSize: transformSize(32),
    color: '#fff',
    fontWeight: 'bold',
  },
});
