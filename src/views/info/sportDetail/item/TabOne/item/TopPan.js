import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon} from 'ui';
import {IconText} from 'common';
import * as Progress from 'react-native-progress';
import {connect} from 'react-redux';
import {getSportInfoList, getSportGuess} from '@/store/actions';
const mapStateToProps = state => {
  return {
    sportGuess: state.info.sportGuess,
    sportDetail: state.info.sportDetail,
  };
};

const mapDispatchToProps = {};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class TopPan extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let top = this.props.sportGuess;
    let topOther = this.props.sportDetail;
    let pieArr = (top.outcome && top.outcome.split(';')) || ['0', '0', '0'];

    return (
      <View style={style.topWrap}>
        <View style={style.topTitleWrap}>
          <View style={style.topTitleLeft}>
            <View style={style.leftTeamTipsWrap}>
              <Text style={style.tipsText}>主</Text>
            </View>

            <Text style={style.leftTeam}>
              {top.homeTeamName || topOther.homeTeamName}
            </Text>
          </View>
          <View style={style.topTitleRight}>
            <Text style={style.leftTeam}>
              {top.visitingTeamName || topOther.homeTeamName}
            </Text>
            <View style={style.rightTeamTipsWrap}>
              <Text style={style.tipsText}>客</Text>
            </View>
          </View>
        </View>
        <View style={style.pieWrap}>
          {pieArr &&
            pieArr.map((item, index) => {
              let percent = item.replace('%', '') / 100;

              let stragetyTitle = {
                0: '主胜',
                1: '平局',
                2: '客胜',
              };
              let stragetyRecommend = {
                0: '1',
                1: 'X',
                2: '2',
              };
              return (
                <View style={style.pieItem} key={index}>
                  <Text style={style.pieTitle}>{stragetyTitle[index]}</Text>
                  <Progress.Circle
                    style={style.rightRate}
                    animated={false}
                    showsText
                    borderWidth={0}
                    color="#FF770D"
                    progress={percent}
                    unfilledColor="#ccc"
                    thickness={6}
                    size={45}
                    textStyle={{fontSize: transformSize(20)}}
                    indeterminate={false}
                  />
                  {top.tips && top.tips.includes(stragetyRecommend[index]) ? (
                    <Icon
                      name="zo"
                      color="#DA1B2A"
                      size={18}
                      style={style.pieRecomend}
                    />
                  ) : null}
                </View>
              );
            })}
        </View>
      </View>
    );
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({
  wrap: {},
  topWrap: {
    margin: transformSize(20),
    backgroundColor: '#fff',
    borderRadius: transformSize(4),
  },
  topTitleWrap: {
    flexDirection: 'row',
    paddingHorizontal: transformSize(16),
    justifyContent: 'space-between',
    marginTop: transformSize(20),
  },
  topTitleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftTeamTipsWrap: {
    backgroundColor: '#DA1B2A',

    width: transformSize(36),
    height: transformSize(36),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: transformSize(6),
  },
  leftTeam: {
    fontSize: transformSize(30),
    color: '#1A1A1A',
    fontWeight: 'bold',
    marginHorizontal: transformSize(20),
  },
  tipsText: {
    fontSize: transformSize(24),
    color: '#fff',
    fontWeight: 'bold',
  },
  topTitleRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightTeamTipsWrap: {
    backgroundColor: '#256EFF',

    width: transformSize(36),
    height: transformSize(36),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: transformSize(6),
  },
  pieWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: transformSize(28),
  },
  pieItem: {
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    paddingBottom: transformSize(64),
  },
  pieTitle: {
    fontSize: transformSize(24),
    color: '#999999',
    fontWeight: 'bold',
    marginBottom: transformSize(6),
  },
  pieRecomend: {
    position: 'absolute',
    bottom: 10,
  },
});
