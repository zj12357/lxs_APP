/** @format */

import React, {Component} from 'react';
import {
  createAppContainer,
  getActiveChildNavigationOptions,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import {Icon, Touchable, Button} from 'ui';
import {StyleSheet, Platform, View} from 'react-native';

import {transformSize, commonStyle} from '@/utils';

import home from './home';
import info from './info';
import welfare from './welfare';

import my from './my';

import login from './login';
import common from './common';

let tabNavRouteConfig = {
  home: {
    screen: home.home.screen,
    navigationOptions: ({screenProps}) => ({
      tabBarLabel: '首页',

      tabBarIcon: ({tintColor, focused}) => (
        <Icon color={tintColor} name={'sy_p'} size={25} />
      ),
    }),
  },
  info: {
    screen: info.info.screen,
    navigationOptions: ({screenProps}) => ({
      tabBarLabel: '情报',

      tabBarIcon: ({tintColor, focused}) => (
        <Icon color={tintColor} name={'qb_x'} size={25} />
      ),
    }),
  },
  welfare: {
    screen: welfare.welfare.screen,
    navigationOptions: ({screenProps}) => ({
      tabBarLabel: '福利',

      tabBarIcon: ({tintColor, focused}) => (
        <Icon color={tintColor} name={'ziliaoku'} size={25} />
      ),
    }),
  },
  my: {
    screen: my.my.screen,
    navigationOptions: ({screenProps}) => ({
      tabBarLabel: '我的',

      tabBarIcon: ({tintColor, focused}) => (
        <Icon color={tintColor} name={'gerenzhongxin'} size={25} />
      ),
    }),
  },
};

const TabNav = createBottomTabNavigator(tabNavRouteConfig, {
  animationEnabled: false,
  defaultNavigationOptions: ({navigation, screenProps}) => {
    return {
      headerShown: false,
      tabBarOptions: {
        style: {
          backgroundColor: '#fff',
          height: transformSize(110),
        },
        showIcon: true,
        activeTintColor: commonStyle.colorTheme.color_theme,
        inactiveTintColor: '#666',
        labelStyle: {
          fontSize: transformSize(24),
        },
      },
    };
  },

  swipeEnabled: false,
  lazy: true,
  tabBarPosition: 'bottom',
});

TabNav.navigationOptions = ({navigation, screenProps}) => {
  return getActiveChildNavigationOptions(navigation, screenProps);
};
// const AppContainer = createAppContainer(TabNav);
const AppNavigator = createStackNavigator(
  {
    App: TabNav,
    ...home,

    ...info,
    ...welfare,
    ...my,

    ...login,
    ...common,
  },
  {
    defaultNavigationOptions: ({navigation, screenProps}) =>
      StackOptions({navigation, screenProps}),
    cardShadowEnabled: false,
    cardOverlayEnabled: true,
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;

const StackOptions = ({navigation, screenProps}) => {
  console.log('screenProps', screenProps, navigation);
  const tabBarVisible = false;
  const headerBackTitle = false;

  const headerStyle = {
    backgroundColor: '#fff',
    // borderBottomWidth: 1,
    // borderBottomColor: ' #ececec',
    elevation: 0,
  };

  const headerTitleStyle = {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    color: '#333',
    lineHeight: transformSize(90),
    fontSize: transformSize(36),
    borderBottomWidth: 0,
  };
  const headerTintColor = commonStyle.colorTheme.title;
  const headerLeft = () => (
    <Button
      icon="back"
      iconColor={'#333333'}
      iconSize={16}
      onPress={() => {
        navigation.goBack();
      }}
      style={s.backButton}
      // textStyle={{
      //   color: '#666',
      //   marginLeft: transformSize(10),
      //   fontSize: transformSize(28),
      // }}
    />
  );
  const headerRight = () => <View style={s.rightView} />;
  return {
    tabBarVisible,
    headerBackTitle,
    headerStyle,
    headerTitleStyle,
    headerTintColor,
    headerLeft,
    headerRight,
  };
};

const s = StyleSheet.create({
  backButton: {
    width: transformSize(80),
    height: transformSize(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightView: {
    marginRight: transformSize(24),
  },
});
