import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, Dimensions} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Marquee, Icon} from 'ui';
import Title from '../../../components/common/Title';
import RecordItem from '../components/RecordItem';
import Swiper from 'react-native-swiper';

import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {
  getHomeRecordSport,
  getHomeRecordTicket,
  getHomeNotice,
} from '@/store/actions';
import {withNavigation} from 'react-navigation';
const mapStateToProps = state => {
  return {
    homeRecordSport: state.home.homeRecordSport,
    homeRecordTicket: state.home.homeRecordTicket,
    homeNotice: state.home.homeNotice,
  };
};

const mapDispatchToProps = {
  getHomeRecordSport,
  getHomeRecordTicket,
  getHomeNotice,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@withNavigation
export default class HomeRecord extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {homeRecordSport, homeRecordTicket, homeNotice} = this.props;

    let notice = homeNotice.map(item => {
      return {
        ...item,
        value: item.title,
      };
    });
    return (
      <View style={style.wrap}>
        <LinearGradient colors={['#fff', '#f0f0f0']} style={style.homeRecord}>
          <View style={style.noticeWrap}>
            <Icon name="ac1" size={12} />
            <Marquee
              textList={notice}
              speed={60}
              width={transformSize(650)}
              height={30}
              direction={'left'}
              reverse={false}
              textStyle={{fontSize: 14, color: '#333'}}
              onTextClick={this.onTextClick}
            />
          </View>

          {/* <View style={style.noticeWrap}>
            <Icon name="ac1" size={12} />
            <Text style={style.notice}>我是公告信息我司公告个信息</Text>
          </View> */}
          <View style={style.recordWrap}>
            <Title title="昨日战绩" right={false} />
            <View>
              <RecordItem
                type="sport"
                data={homeRecordSport}
                style={{marginBottom: transformSize(34)}}
              />
              {/* <RecordItem
                type="ticket"
                data={homeRecordTicket}
                style={{marginBottom: transformSize(34)}}
              /> */}
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
  componentDidMount = async () => {
    let platformId = Platform.select({
      ios: '2',
      android: '1',
    });
    let paramsNotice = {
      platformById: platformId,
    };
    this.props.getHomeRecordSport();
    this.props.getHomeRecordTicket();
    this.props.getHomeNotice(paramsNotice);
  };
  onTextClick = item => {
    this.props.navigation.navigate('webview', {url: item.redirectAddress});
  };
}
const style = StyleSheet.create({
  wrap: {
    // backgroundColor: '#999',

    position: 'relative',
    bottom: transformSize(40),
  },
  homeRecord: {
    backgroundColor: '#999',
    paddingHorizontal: transformSize(30),
    borderTopLeftRadius: transformSize(40),
    borderTopRightRadius: transformSize(40),
  },
  noticeWrap: {
    height: transformSize(100),

    alignItems: 'center',
    flexDirection: 'row',
  },
  notice: {
    color: '#203046',
    fontSize: transformSize(24),
    marginLeft: transformSize(20),
  },
});
