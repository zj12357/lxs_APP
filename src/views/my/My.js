import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Alert} from 'react-native';
import {transformSize, moment} from '@/utils';
import SafeAreaView from 'react-native-safe-area-view';
import * as CacheManager from 'react-native-mhttpcache';
import {Icon, Touchable, Button} from 'ui';
import {ListItem} from './item';
import {connect} from 'react-redux';
import {commitUserInfo, commitToken} from '@/store/actions';
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = {
  commitUserInfo,
  commitToken,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 0,
    };
  }
  static navigationOptions = ({navigation, screenProps}) => ({
    header: null,
  });
  render() {
    return (
      <ScrollView style={style.scrollView} bounces={false}>
        <View style={style.wrap}>
          {this.renderTop()}
          {this.renderCenter()}
          {this.renderBottom()}
        </View>
      </ScrollView>
    );
  }
  componentDidMount = async () => {
    this.getCacheSize();
  };
  renderTop = () => {
    let {userInfo} = this.props;

    return (
      <View style={style.topWrap}>
        <Text style={style.topHeader}>个人中心</Text>
        {userInfo.name ? (
          <Touchable
            onPress={() => this.props.navigation.navigate('mySet')}
            style={style.topConWrap}>
            <Image
              style={style.topAvatar}
              source={
                userInfo.img
                  ? {uri: userInfo.img}
                  : require('@/assets/images/my/avatar-nologin.png')
              }
            />
            <View style={style.topCon}>
              <View style={style.topNameWrap}>
                <Text style={style.topName}>{userInfo.name}</Text>
                {userInfo.gender ? (
                  <Image
                    style={style.topTip}
                    source={require('@/assets/images/my/male.png')}
                  />
                ) : (
                  <Image
                    style={style.topTip}
                    source={require('@/assets/images/my/female.png')}
                  />
                )}

                <Image
                  style={style.topVip}
                  source={require('@/assets/images/my/vip.png')}
                />
              </View>
              <Text style={style.topLabel}>
                已加入{this.getDate(userInfo.registerTime)}天
              </Text>
            </View>
          </Touchable>
        ) : (
          <View style={style.topConWrap}>
            <Image
              style={style.topAvatar}
              source={require('@/assets/images/my/avatar-nologin.png')}
            />
            <Button
              title="立即登录"
              style={style.loginWrap}
              textStyle={style.login}
              onPress={() => this.props.navigation.navigate('login')}
            />
          </View>
        )}
      </View>
    );
  };
  renderCenter = () => {
    let tabData = [
      {
        imgUrl: require('@/assets/images/my/tab_1.png'),
        label: '安全中心',
        route: 'security',
      },
      {
        imgUrl: require('@/assets/images/my/tab_2.png'),
        label: '我的关注',
        route: 'focus',
      },
      {
        imgUrl: require('@/assets/images/my/tab_3.png'),
        label: '我的收藏',
        route: 'collect',
      },
      {
        imgUrl: require('@/assets/images/my/tab_4.png'),
        label: '我的消息',
        route: 'message',
      },
    ];
    return (
      <View style={style.centerWrap}>
        <Text style={style.centerTitle}>个人服务</Text>
        <View style={style.centerConWrap}>
          {tabData.map((tab, index) => {
            return (
              <Touchable
                key={index}
                style={style.centerTabWrap}
                onPress={() => this.clickTab(tab)}>
                <Image style={style.centerImage} source={tab.imgUrl} />
                <Text style={style.centerLabel}>{tab.label}</Text>
              </Touchable>
            );
          })}
        </View>
      </View>
    );
  };
  renderBottom = () => {
    let listData = [
      {
        imgUrl: require('@/assets/images/my/list_1.png'),
        label: '关联亚博',
        tips: '暂未关联',
        route: 'aboutYabo',
        needLogin: true,
      },
      {
        imgUrl: require('@/assets/images/my/list_2.png'),
        label: '清理缓存',
        tips: this.state.size + 'M',

        handle: 'clearCache',
        needLogin: false,
      },
      {
        imgUrl: require('@/assets/images/my/list_3.png'),
        label: '在线反馈',
        tips: '',
        route: 'feedback',
        needLogin: true,
      },
      {
        imgUrl: require('@/assets/images/my/list_4.png'),
        label: '关于我们',
        tips: '',
        route: 'about',
        needLogin: false,
      },
      {
        imgUrl: require('@/assets/images/my/list_5.png'),
        label: '退出',
        tips: '',
        route: '',
        handle: 'logout',
        needLogin: true,
      },
    ];
    return (
      <View style={style.bottomWrap}>
        {listData.map(item => {
          return (
            <ListItem
              style={style.listItem}
              item={item}
              clickList={() => this.clickList(item)}
            />
          );
        })}
      </View>
    );
  };
  clickTab(tab) {
    let {userInfo} = this.props;
    if (userInfo.name) {
      this.props.navigation.navigate(tab.route);
    } else {
      this.props.navigation.navigate('login');
    }
  }
  clickList(item) {
    let {userInfo} = this.props;
    if (userInfo.name) {
      if (item.route) {
        this.props.navigation.navigate(item.route);
      } else if (item.handle) {
        this[item.handle]();
      }
    } else {
      if (item.needLogin) {
        this.props.navigation.navigate('login');
      } else if (item.route) {
        this.props.navigation.navigate(item.route);
      } else if (item.handle) {
        this[item.handle]();
      }
    }
  }
  clearCache = async () => {
    Alert.alert(
      '',
      '确定清理缓存？',
      [
        {
          text: '取消',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: '确定',
          onPress: () => {
            CacheManager.clearCache();
            this.getCacheSize();
          },
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };
  getCacheSize = async () => {
    console.log('size', CacheManager);
    let size = await CacheManager.getCacheSize();
    size = (size / 1024 / 1024).toFixed(2);
    this.setState({
      size: size,
    });
  };
  logout() {
    Alert.alert(
      '',
      '确定退出？',
      [
        {
          text: '取消',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: '确定',
          onPress: () => {
            this.props.commitUserInfo({});
            this.props.commitToken('');
          },
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }
  getDate(date) {
    let date1 = moment(date);
    let date2 = moment();
    let date3 = date2.diff(date1, 'days');
    return date3;
  }
}
const style = StyleSheet.create({
  scrollView: {
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  wrap: {},
  topWrap: {
    height: transformSize(432),
    backgroundColor: '#203046',
  },
  topHeader: {
    marginTop: transformSize(80),
    textAlign: 'center',
    color: '#fff',
    fontSize: transformSize(34),
    fontWeight: 'bold',
  },
  topConWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: transformSize(38),
    marginTop: transformSize(40),
  },
  topAvatar: {
    width: transformSize(100),
    height: transformSize(100),
    borderRadius: transformSize(50),
  },
  topCon: {
    justifyContent: 'space-around',
    marginLeft: transformSize(20),
  },
  topNameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topName: {
    color: '#fff',
    fontSize: transformSize(36),
    fontWeight: 'bold',
    marginRight: transformSize(20),
  },
  topTip: {
    width: transformSize(40),
    height: transformSize(38),
    marginRight: transformSize(20),
  },
  topVip: {
    width: transformSize(66),
    height: transformSize(38),
  },
  topLabel: {
    color: '#fff',
    fontSize: transformSize(26),
  },
  loginWrap: {
    width: transformSize(210),
    height: transformSize(60),
    marginLeft: transformSize(38),
    borderColor: '#fff',
    borderWidth: transformSize(2),
    borderRadius: transformSize(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: transformSize(30),
  },
  centerWrap: {
    marginHorizontal: transformSize(30),
    // height: transformSize(288),
    backgroundColor: '#fff',
    position: 'relative',
    bottom: transformSize(96),
    borderRadius: transformSize(20),
  },
  centerTitle: {
    color: '#333',
    fontSize: transformSize(36),
    fontWeight: 'bold',
    marginTop: transformSize(26),
    marginLeft: transformSize(34),
    marginBottom: transformSize(28),
  },
  centerConWrap: {
    flexDirection: 'row',
  },
  centerTabWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerImage: {
    width: transformSize(82),
    height: transformSize(82),
    marginBottom: transformSize(20),
  },
  centerLabel: {
    color: '#333',
    fontSize: transformSize(24),
    marginBottom: transformSize(62),
  },
  bottomWrap: {
    marginHorizontal: transformSize(30),
    backgroundColor: '#fff',
    position: 'relative',
    bottom: transformSize(72),
    paddingHorizontal: transformSize(20),
    borderRadius: transformSize(20),
  },
  listItem: {},
});
