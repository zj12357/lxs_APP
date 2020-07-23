import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  AppState,
  Platform,
} from 'react-native';
import {transformSize, tximSetup} from '@/utils';
import AppNavigator from './router';
import {connect} from 'react-redux';
import {getUserInfo, getInitServer} from '@/store/actions';
import {MeiqiaInit, MeiqiaShow} from 'meiqia-react-native';
import JPush from 'jpush-react-native';

const mapStateToProps = state => {
  return {userInfo: state.user.userInfo};
};

const mapDispatchToProps = {
  getUserInfo,
  getInitServer,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
    };
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          translucent={true} //指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
        />
        <AppNavigator
          onNavigationStateChange={this.onNavigationStateChange}
          ref="navigator"
        />
      </View>
    );
  }
  componentDidMount = async () => {
    this.props.getInitServer();

    MeiqiaInit({appKey: '2a6f438d0a4436846a354feb7a371acb'}).then(config => {
      console.log('config info:', config);
      // {"code:": 0, "clientId": "xxxxx", "message": 'success'}
    });
    this.getJpush();

    AppState.addEventListener('change', this._handleAppStateChange);

    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
    }

    console.log(this.props, 'this.props');
    await this.props.getUserInfo();
    if (this.props.userInfo.name) {
      tximSetup(this.props.userInfo);
    }
  };

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // this._clearMessage();
    }
    this.setState({appState: nextAppState});
  };
  onNavigationStateChange = (prevState, currentState) => {
    const currentScreen = getActiveRouteName(currentState);
    const prevScreen = getActiveRouteName(prevState);

    let statusBarPage = [
      'sportsDetail',
      'my',
      'login',

      'home',
      'expert',
      'welfareDetail',
    ];
    if (statusBarPage.includes(currentScreen)) {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('transparent');
      }
    } else {
      StatusBar.setBarStyle('dark-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#fff');
      }
    }
    if (Platform.OS === 'android') {
      let statusBarAndroid = [
        'info',
        'home',
        'login',
        'message',
        'sportsDetail',
        'my',
        'expert',
        'welfareDetail',
        'focus',
        'collect',
      ];
      if (statusBarAndroid.includes(currentScreen)) {
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor('transparent');
      } else {
        StatusBar.setTranslucent(false);
      }
    }
  };
  getJpush = () => {
    JPush.init();

    JPush.getRegistrationID(res => {
      // this.onRegister(res);
      console.log(res, 'jpush');
    });

    JPush.addNotificationListener(res => {
      console.log(res, 'jpush');
      if (this.state.appState.match(/active/)) {
        // this._clearMessage();
      }
    });
  };
}
const style = StyleSheet.create({});
function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}
