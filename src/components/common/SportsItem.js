import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {transformSize, commonStyle, modal, formatTime} from '@/utils';
import {Touchable, Icon, Button} from 'ui';
import {IconText, Star} from 'common';
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
      1: item.duration + '`',
      2: item.duration + '`',
      3: item.duration + '`',
      4: '完',
    };
    let liveMethodStragety = {
      视频直播: <Button icon="zb" iconSize={16} iconColor="#DA1B2A" />,
      动画直播: <Button icon="dh" iconSize={16} iconColor="#FF770D" />,
    };
    let isVideo = false;
    let isH5 = false;
    if (item.liveMethod) {
      let method =
        typeof item.liveMethod === 'string'
          ? JSON.parse(item.liveMethod)
          : item.liveMethod;
      isVideo = method.some(item => item.method === '视频直播');
      isH5 = !isVideo && method.some(item => item.method === '动画直播');
    }

    return (
      <Touchable
        style={[style.itemWrap, this.props.style]}
        onPress={this.goToSportsDetail}>
        <View style={[style.topWrap, this.props.topWrap]}>
          <View style={style.topLeft}>
            <Text style={style.name}>{item.leagueByName}</Text>
            <Text style={style.time}>{formatTime(item.gameDate, 'HH:mm')}</Text>
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
          <Star
            type={2}
            from={this.props.from}
            data={item}
            handleStar={this.props.handleStar}
            style={style.starWrap}
          />

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

          {item.liveMethod ? (
            isVideo ? (
              <Button
                icon="zb"
                iconSize={16}
                iconColor="#DA1B2A"
                style={style.liveWrap}
              />
            ) : isH5 ? (
              <Button
                icon="dh"
                iconSize={16}
                iconColor="#FF770D"
                style={style.liveWrap}
              />
            ) : null
          ) : null}
        </View>

        <View style={style.bottomWrap}>
          <View style={style.btLeftWrap}>
            <Text style={style.btLeft}>半：{item.midfielderScore}</Text>
            <Text style={style.btLeft}>角：{item.cornerKick}</Text>
            {/* <Text style={style.btLeft}>
              <Icon name="hp" color="#FFA50D" />：{item.yellowCard}
            </Text> */}
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
        {item.predictionStatus ? (
          <Image
            style={style.image}
            source={require('@/assets/images/info/z.png')}
          />
        ) : null}
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
    let {item, from} = this.props;
    let id = from === 'collect' || from === 'focus' ? item.newsById : item.id;
    this.props.navigation.navigate('sportsDetail', {id: id});
  };
}
const style = StyleSheet.create({
  itemWrap: {
    height: transformSize(192),
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
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '40%',
  },

  name: {
    fontSize: transformSize(26),
    color: '#333',
    marginRight: transformSize(30),
  },
  time: {
    fontSize: transformSize(26),
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
    position: 'relative',
  },
  starWrap: {
    position: 'absolute',
    left: 0,
    zIndex: 100,
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
    right: '58%',
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
    fontSize: transformSize(26),
    fontWeight: 'bold',
    color: '#1A1A1A',
    maxWidth: transformSize(220),
  },
  conCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  score: {
    width: '20%',
    textAlign: 'center',
    fontSize: transformSize(24),
    fontWeight: 'bold',
    color: '#FF0707',
  },
  conRight: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: '58%',
    // width: '40%',
  },
  rightTeam: {
    marginRight: transformSize(10),
    fontSize: transformSize(26),
    fontWeight: 'bold',
    color: '#1A1A1A',
    maxWidth: transformSize(220),
  },
  liveWrap: {
    position: 'absolute',
    right: 0,
  },
  bottomWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
