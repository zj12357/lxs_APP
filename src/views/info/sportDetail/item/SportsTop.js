import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import {transformSize, commonStyle, SCREEN_WIDTH, ymodal} from '@/utils';
import {Icon, Button} from 'ui';
import {Star, Webview, Video, Share} from 'common';
import LinearGradient from 'react-native-linear-gradient';
import {withNavigation} from 'react-navigation';
import $api from '@/config/api';
@withNavigation
export default class SportsTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 0,
    };
    // eslint-disable-next-line no-undef
    this.socket = new WebSocket('ws://159.138.3.116:8103/ws/race');

    this.socket.onopen = this.onOpenSocket.bind(this);

    this.socket.onmessage = this.onReceivedMessage.bind(this);
  }

  render() {
    let {show} = this.state;
    let {detail} = this.props;
    let score = detail.score;
    let live = {};
    if (detail.liveMethod) {
      let webview = detail.liveMethod.filter(item => {
        return item.method === '动画直播';
      });
      let video = detail.liveMethod.filter(item => {
        return item.method === '视频直播';
      });
      live = {
        webview: (webview[0] && webview[0].url) || '',
        video: (video[0] && video[0].url) || '',
      };
    }

    let statusStragety = {
      0: '未',
      1: detail.duration + '`',
      2: detail.duration + '`',
      3: detail.duration + '`',
      4: '完',
    };
    return (
      <View style={style.wrap}>
        {show === 2 ? (
          <Webview
            url={live.webview}
            style={style.wrap}
            goBack={() => this.setState({show: 0})}
          />
        ) : show === 1 ? (
          <Video
            url={live.video}
            style={style.wrap}
            goBack={() => this.setState({show: 0})}
          />
        ) : (
          <ImageBackground
            source={require('@/assets/images/info/zuqiu.png')}
            style={style.wrap}>
            <LinearGradient
              colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']}
              style={style.linear}>
              <View style={style.topWrap}>
                <Button
                  icon="back"
                  iconSize={16}
                  iconColor="#fff"
                  style={style.topBack}
                  onPress={() => this.props.navigation.goBack()}
                />

                <View style={style.topConWrap}>
                  <Text style={style.topName}>{detail.name}联赛</Text>
                  <Text style={style.topTime}>比赛时间：{detail.gameDate}</Text>
                </View>
                <View style={style.topIconWrap}>
                  {/* <Button
                    icon="shoucangdianjiqian"
                    iconColor={detail.isInterested ? '#FF770D' : '#fff'}
                    iconSize={18}
                    style={style.btnWrap}
                    onPress={this.handleCollect}
                  /> */}
                  <Star
                    style={style.btnWrap}
                    type={2}
                    data={detail}
                    handleStar={this.props.handleStar}
                  />
                  <Button
                    icon="zhuanfa"
                    iconColor="#fff"
                    iconSize={20}
                    style={style.btnWrap}
                    onPress={this.handleShare}
                  />
                </View>
              </View>
              <View style={style.conWrap}>
                <Text style={style.during}>
                  {statusStragety[detail.gameStatus]}
                </Text>
                <View style={style.teamWrap}>
                  <View style={style.leftTeamWrap}>
                    <Image
                      style={style.imageLogo}
                      source={
                        detail.homeTeamLogo
                          ? {uri: this.checkImg(detail.homeTeamLogo)}
                          : require('@/assets/images/info/avatar.png')
                      }
                    />
                    {/* <Icon name="jg" size={50} color="#FF770D" /> */}
                    <Text style={style.teamName}>{detail.homeTeamName}</Text>
                  </View>
                  <Text style={style.score}>
                    {score && score.split('-')[0]} -
                    {score && score.split('-')[1]}
                  </Text>
                  <View style={style.rightTeamWrap}>
                    <Image
                      style={style.imageLogo}
                      source={
                        detail.visitingTeamLogo
                          ? {uri: this.checkImg(detail.visitingTeamLogo)}
                          : require('@/assets/images/info/avatar.png')
                      }
                    />
                    {/* <Icon name="jg" size={50} color="#FF770D" /> */}
                    <Text style={style.teamName}>
                      {detail.visitingTeamName}
                    </Text>
                  </View>
                </View>
                <View style={style.iconTextWrap}>
                  {live.video ? (
                    <View style={style.iconItemWrap}>
                      <Button
                        style={style.iconText}
                        textStyle={style.text}
                        icon="zb_b"
                        iconSize={16}
                        iconColor="#fff"
                        title="视频直播"
                        onPress={() => {
                          this.setState({show: 1});
                        }}
                      />
                    </View>
                  ) : null}
                  {live.webview ? (
                    <View style={style.iconItemWrap}>
                      <Button
                        style={style.iconText}
                        textStyle={style.text}
                        icon="dh_b"
                        iconSize={16}
                        iconColor="#fff"
                        title="动画直播"
                        onPress={() => {
                          this.setState({show: 2});
                        }}
                      />
                    </View>
                  ) : null}
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        )}
      </View>
    );
  }

  componentDidMount = async () => {};
  componentWillUnmount = async () => {
    this.socket.close();
  };
  onOpenSocket = mes => {
    console.log('socketOpen', mes);
  };
  onReceivedMessage = mes => {
    let detail = this.props.detail;
    let data = JSON.parse(mes.data);
    // console.log(mes, data, 'socket1');
    let selectData = data.filter(item => {
      return item.data_id === detail.id;
    });

    let finalData = {};

    if (selectData.length) {
      finalData = {
        ...detail,
        cornerKick: selectData[0].corner,
        midfielderScore: selectData[0].half_score,
        redCard: selectData[0].master_red,
        score: selectData[0].score,
        yellowCard: selectData[0].master_yellow,
      };
      this.props.commitSportDetail && this.props.commitSportDetail(finalData);
    }

    // console.log('socketSportDetail', mes.data, selectData, finalData);
  };
  handleCollect = () => {
    this.props.handleCollect && this.props.handleCollect();
  };
  handleShare = () => {
    ymodal.show(<Share />);
  };
  checkImg = img => {
    return img.replace('/leisu', 'https://cdn.leisu.com');
  };
}

const style = StyleSheet.create({
  wrap: {
    width: SCREEN_WIDTH,
    height: transformSize(564),
  },
  linear: {
    height: transformSize(564),
  },
  topWrap: {
    marginTop: transformSize(80),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  topBack: {
    position: 'absolute',
    left: 0,
    width: transformSize(80),
    height: transformSize(60),
    justifyContent: 'center',
    alignItems: 'center',
    top: transformSize(10),
  },
  topConWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topName: {
    fontSize: transformSize(24),
    color: '#fff',
    marginBottom: transformSize(10),
  },
  topTime: {
    fontSize: transformSize(24),
    color: '#fff',
  },
  topIconWrap: {
    position: 'absolute',
    width: transformSize(160),
    right: 0,
    top: transformSize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnWrap: {
    width: transformSize(80),
    height: transformSize(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  conWrap: {
    marginTop: transformSize(80),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  during: {
    fontSize: transformSize(24),
    color: '#fff',
  },
  teamWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftTeamWrap: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: transformSize(240),
  },

  score: {
    fontSize: transformSize(48),
    color: '#fff',
    fontWeight: 'bold',
  },
  rightTeamWrap: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: transformSize(240),
  },
  imageLogo: {
    width: transformSize(100),
    height: transformSize(100),
    borderRadius: transformSize(50),
  },
  teamName: {
    marginTop: transformSize(10),
    fontSize: transformSize(30),
    color: '#fff',
    fontWeight: 'bold',
  },
  iconTextWrap: {
    width: transformSize(400),
    marginTop: transformSize(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconItemWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    paddingHorizontal: transformSize(16),
    height: transformSize(46),
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: transformSize(23),
  },
  text: {
    color: '#fff',
    fontSize: transformSize(20),
    marginLeft: transformSize(10),
  },
});
