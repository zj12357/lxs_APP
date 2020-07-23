import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Button, Icon} from 'ui';
import * as Progress from 'react-native-progress';
import {withNavigation} from 'react-navigation';
@withNavigation
export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {data, type} = this.props;
    let Stragety = {
      sport: '体育战绩',
      ticket: '彩票战绩',
    };
    return (
      <View style={[style.recordItem, this.props.style]}>
        <View style={style.topWrap}>
          <Text style={style.topLeft}>{data.type || '彩票'}</Text>
          <ImageBackground
            style={style.topCenterWrap}
            source={require('@/assets/images/home/record-bg.png')}>
            <View style={style.topCenter}>
              <Text style={style.topCenterText}>{Stragety[type]}</Text>
            </View>
          </ImageBackground>
          <Button
            title="查看更多"
            style={style.topRight}
            textStyle={style.topRightText}
            isIconRight
            icon="jt"
            iconColor="#203046"
            iconSize={12}
            onPress={() => this.goToPage()}
          />
        </View>
        <View style={style.bottomWrap}>
          <View style={style.btLeftWrap}>
            <View style={style.btLine}>
              <Image
                source={require('@/assets/images/home/tj.png')}
                style={style.img}
              />
              <Text style={style.label}>昨日推荐</Text>
              <Text style={style.numTop}>{data.referralsCount}</Text>
              <Text style={style.label}>场</Text>
            </View>
            <Image
              source={require('@/assets/images/home/line.png')}
              style={style.line}
            />
            <View style={style.btLine}>
              <Icon
                name="hd"
                size={16}
                color={commonStyle.colorTheme.color_theme}
              />

              <Text style={style.label}>昨日红单</Text>
              <Text style={style.numBottom}>{data.hitCount}</Text>
              <Text style={style.label}>场</Text>
            </View>
          </View>
          <View style={style.rightWrap}>
            <Text style={style.rightCon}>红单率</Text>

            <Progress.Circle
              style={style.rightRate}
              animated={false}
              showsText
              borderWidth={0}
              color="#FF0335"
              progress={data.hitRate}
              unfilledColor="#F0F0F0"
              size={38}
              textStyle={{fontSize: transformSize(20)}}
              indeterminate={false}
            />
          </View>
        </View>
      </View>
    );
  }
  componentDidMount = async () => {};
  goToPage() {
    let {type} = this.props;
    this.props.navigation.navigate('info', {to: type});
  }
}
const style = StyleSheet.create({
  recordItem: {
    borderTopColor: '#203046',
    borderTopWidth: transformSize(10),
    borderRadius: transformSize(4),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    position: 'relative',
  },
  topWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    height: transformSize(90),
    alignItems: 'center',
    paddingHorizontal: transformSize(26),
  },
  topLeft: {
    fontSize: transformSize(24),
    paddingHorizontal: transformSize(16),
    paddingVertical: transformSize(4),
    color: '#203046',
    borderColor: '#203046',
    borderWidth: transformSize(2),
    borderRadius: transformSize(20),
  },
  topCenterWrap: {
    position: 'absolute',
    top: -transformSize(10),
    height: transformSize(50),
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topCenter: {
    width: transformSize(300),
    height: transformSize(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  topCenterText: {
    color: '#fff',
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRightText: {
    color: '#203046',
    fontSize: transformSize(24),
  },
  bottomWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: transformSize(126),
    alignItems: 'center',
  },
  btLeftWrap: {
    height: transformSize(126),
    justifyContent: 'space-evenly',
    flex: 1,
  },
  btLine: {
    flexDirection: 'row',
    marginLeft: transformSize(26),
    width: transformSize(240),
    justifyContent: 'space-between',
  },
  line: {
    width: '100%',
  },
  label: {
    fontSize: transformSize(26),
    color: '#666',
  },
  numTop: {
    fontSize: transformSize(26),
    color: '#1296DB',
    fontWeight: 'bold',
  },
  numBottom: {
    fontSize: transformSize(26),
    color: '#DA1B2A',
    fontWeight: 'bold',
  },
  rightWrap: {
    flexDirection: 'row',
    marginRight: transformSize(20),
    alignItems: 'center',
  },
  rightCon: {
    color: '#DA1B2A',
    marginRight: transformSize(10),
  },
  rightRate: {},
  img: {
    width: transformSize(30),
    height: transformSize(30),
    marginRight: transformSize(20),
  },
});
