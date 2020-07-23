import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {transformSize, handleScore} from '@/utils';
import {FlowList, Icon} from 'ui';
import {IconText, Title} from 'common';
import * as Progress from 'react-native-progress';
import {connect} from 'react-redux';
import {getSportLiveText} from '@/store/actions';
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    sportLiveText: state.info.sportLiveText,
  };
};

const mapDispatchToProps = {
  getSportLiveText,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class TabFour extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.data = [];
    // eslint-disable-next-line no-undef
    this.socket = new WebSocket('ws://159.138.3.116:8101/ws/textlive');

    this.socket.onopen = this.onOpenSocket.bind(this);

    this.socket.onmessage = this.onReceivedMessage.bind(this);
  }
  render() {
    let params = {competitionById: this.props.id};
    return (
      <View style={style.wrap}>
        {/* {this.renderTop()}
        {this.renderBottom()} */}
        <FlowList
          style={style.flatlistWrap}
          contentContainerStyle={style.flatlist}
          ref={r => (this.flowlist = r)}
          request={this.props.getSportLiveText}
          params={params}
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderHeader}
          keyExtractor={(item, index) => index.toString()}
          onFetchedData={data => this.fetchData(data)}
        />
      </View>
    );
  }
  componentDidMount = async () => {};
  componentWillUnmount = async () => {
    this.socket.close();
  };
  renderHeader = () => {
    let {detail} = this.props;
    let data = [
      {
        category: '进攻',
        leftScore: handleScore(detail.offensive).left,
        rightScore: handleScore(detail.offensive).right,
        percent: handleScore(detail.offensive).percent,
      },
      {
        category: '危险进攻',
        leftScore: handleScore(detail.scathingOffensive).left,
        rightScore: handleScore(detail.scathingOffensive).right,
        percent: handleScore(detail.scathingOffensive).percent,
      },
      {
        category: '控球率',
        leftScore: handleScore(detail.possession).left,
        rightScore: handleScore(detail.possession).right,
        percent: handleScore(detail.possession).percent,
      },
    ];
    return (
      <View style={style.topWrap}>
        <View style={style.tTitleWrap}>
          <IconText
            title="主队"
            textStyle={style.tTitle}
            icon="bt"
            iconSize={13}
            iconColor="#FF770D"
          />
          <IconText
            title="客队"
            textStyle={style.tTitle}
            icon="bt"
            iconSize={13}
            iconColor="#256EFF"
            right
          />
        </View>
        <View style={style.tMainWrap}>
          <View style={style.tPieWrap}>
            {data.map((item, index) => {
              return (
                <View key={index} style={style.tPieItem}>
                  <Text style={style.tCategory}>{item.category}</Text>
                  <View style={style.tScoreWrap}>
                    <Text style={style.tLeftScore}>{item.leftScore}</Text>
                    <Progress.Circle
                      thickness={5}
                      style={style.tSore}
                      animated={false}
                      showsText
                      borderWidth={0}
                      color="#FF770D"
                      progress={item.percent}
                      unfilledColor="#F0F0F0"
                      size={38}
                      textStyle={{fontSize: transformSize(20)}}
                      indeterminate={false}
                    />
                    <Text style={style.tRightScore}>{item.rightScore}</Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={style.tConWrap}>
            <View style={style.tLineOneWrap}>
              <Icon
                name="jiaoqiu"
                color="#DA1B2A"
                style={{width: transformSize(26)}}
              />
              <Icon
                name="hp"
                color="#DA1B2A"
                style={{width: transformSize(26)}}
              />
              <Icon
                name="hp"
                color="#FFE91C"
                style={{width: transformSize(26)}}
              />
              <Text style={style.tLeftLine}>
                {handleScore(detail.shotsGoal).left}
              </Text>
              <View style={style.progress} />
              <Text style={style.progressText}>射正球门</Text>
              <Text style={style.tRightLine}>
                {handleScore(detail.shotsGoal).right}
              </Text>
              <Icon
                name="hp"
                color="#FFE91C"
                style={{width: transformSize(26)}}
              />
              <Icon
                name="hp"
                color="#DA1B2A"
                style={{width: transformSize(26)}}
              />
              <Icon
                name="jiaoqiu"
                color="#DA1B2A"
                style={{width: transformSize(26)}}
              />
            </View>
            <View style={style.tLineTwoWrap}>
              <Text style={style.tLeftLine}>
                {handleScore(detail.cornerKick).left}
              </Text>
              <Text style={style.tLeftLine}>
                {handleScore(detail.redCard).left}
              </Text>
              <Text style={style.tLeftLine}>
                {handleScore(detail.yellowCard).left}
              </Text>
              <Text style={style.tLeftLine}>
                {handleScore(detail.asideGoal).left}
              </Text>
              <View style={style.progress} />
              <Text style={style.progressText}>射偏球门</Text>
              <Text style={style.tRightLine}>
                {handleScore(detail.asideGoal).right}
              </Text>
              <Text style={style.tRightLine}>
                {handleScore(detail.yellowCard).right}
              </Text>
              <Text style={style.tRightLine}>
                {handleScore(detail.redCard).right}
              </Text>
              <Text style={style.tRightLine}>
                {handleScore(detail.cornerKick).right}
              </Text>
            </View>
          </View>
        </View>
        <Title
          title="文字直播"
          style={style.bWrap}
          textStyle={style.bTitle}
          iconSize={16}
          iconColor="#FF770D"
        />
      </View>
    );
  };
  renderItem = ({item}) => {
    let stragety = {
      0: (
        <Image
          source={require('@/assets/images/info/0.png')}
          style={style.bIcon}
        />
      ),
      1: (
        <Image
          source={require('@/assets/images/info/1.png')}
          style={style.bIcon}
        />
      ),
      2: (
        <Image
          source={require('@/assets/images/info/2.png')}
          style={style.bIcon}
        />
      ),
      3: (
        <Image
          source={require('@/assets/images/info/3.png')}
          style={style.bIcon}
        />
      ),
      4: (
        <Image
          source={require('@/assets/images/info/4.png')}
          style={style.bIcon}
        />
      ),
      9: (
        <Image
          source={require('@/assets/images/info/9.png')}
          style={style.bIcon}
        />
      ),
      10: (
        <Image
          source={require('@/assets/images/info/10.png')}
          style={style.bIcon}
        />
      ),
      11: (
        <View style={style.bIconWrap}>
          <Text style={style.bIconText}>HT</Text>
        </View>
      ),
      12: (
        <View style={style.bIconWrap}>
          <Text style={style.bIconText}>FT</Text>
        </View>
      ),
      16: (
        <Image
          source={require('@/assets/images/info/16.png')}
          style={style.bIcon}
        />
      ),
    };

    return (
      <View style={style.bConWrap}>
        {stragety[item.type]}
        <View style={style.bItemWrap}>
          <Text style={style.bItem}>{item.content}</Text>
        </View>
      </View>
    );
  };
  fetchData = data => {
    this.data = data;
  };
  onOpenSocket = mes => {
    console.log('socketOpenText', mes);
  };
  onReceivedMessage = mes => {
    let id = this.props.id;

    let data = JSON.parse(mes.data);
    console.log('socketText', mes, data);
    let index = data.findIndex(item => {
      return (item._id = id);
    });
    console.log('socketText', data);
    if (index !== -1) {
      let text = {
        content: data[0].log_text.text,
        type: data[0].log_text.Type,
        time: data[0].log_text.time,
      };

      this.data = [text, ...this.data];
    }
    this.flowlist && this.flowlist.handleOtherData(this.data);
  };
}
const style = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  flatlistWrap: {
    flex: 1,
  },
  flatlist: {
    paddingHorizontal: transformSize(30),
  },
  topWrap: {
    // paddingHorizontal: transformSize(30),
  },
  tTitleWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tTitle: {
    color: '#203046',
    fontSize: transformSize(26),
    marginVertical: transformSize(20),
  },
  tMainWrap: {
    backgroundColor: '#fff',
  },
  tPieWrap: {
    flexDirection: 'row',
    borderBottomWidth: transformSize(2),
    borderBottomColor: '#DBDBDB',
  },
  tPieItem: {
    flex: 1,
    borderRightWidth: transformSize(2),
    borderRightColor: '#dbdbdb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tCategory: {
    color: '#203046',
    fontSize: transformSize(26),
    marginVertical: transformSize(20),
    fontWeight: 'bold',
  },
  tScoreWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: transformSize(28),
  },
  tLeftScore: {
    color: '#203046',
    fontSize: transformSize(26),
  },
  tSore: {
    fontSize: transformSize(86),
    color: '#FF770D',
    marginHorizontal: transformSize(10),
  },
  tRightScore: {
    color: '#203046',
    fontSize: transformSize(26),
  },
  tConWrap: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: transformSize(172),
    paddingHorizontal: transformSize(14),
  },
  tLineOneWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  tLeftLine: {
    color: '#203046',
    fontSize: transformSize(26),
    fontWeight: 'bold',
    width: transformSize(26),
  },
  progress: {
    width: transformSize(310),
    height: transformSize(10),
    backgroundColor: '#FF770D',
  },
  progressText: {
    position: 'absolute',
    top: -transformSize(25),
    left: '50%',
    transform: [
      {
        translateX: -transformSize(48),
      },
    ],
  },
  tRightLine: {
    color: '#203046',
    fontSize: transformSize(26),
    fontWeight: 'bold',
    width: transformSize(26),
  },
  tLineTwoWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },

  bWrap: {
    marginTop: transformSize(40),
  },
  bTitle: {
    color: '#203046',
    fontSize: transformSize(36),
    fontWeight: 'bold',
  },
  bConWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: transformSize(30),
  },
  bIconWrap: {
    width: transformSize(60),
    height: transformSize(60),
    backgroundColor: '#ccc',
    borderRadius: transformSize(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: transformSize(20),
  },
  bIconText: {
    fontSize: transformSize(30),
  },
  bIcon: {
    marginRight: transformSize(20),
    width: transformSize(40),
    height: transformSize(40),
  },
  bItemWrap: {
    flex: 1,

    paddingVertical: transformSize(26),
    paddingHorizontal: transformSize(50),
    backgroundColor: '#fff',
    borderColor: '#DBDBDB',
    borderWidth: transformSize(2),
    borderRadius: transformSize(12),
  },
  bItem: {
    color: '#333',
    fontSize: transformSize(24),
    lineHeight: transformSize(36),
  },
});
