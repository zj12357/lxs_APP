import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize} from '@/utils';
import SafeAreaView from 'react-native-safe-area-view';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {TabBar} from 'common';
import {InfoSports, InfoTicket, InfoAllHappy} from './item';
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    };
  }
  static navigationOptions = ({navigation, screenProps}) => {
    return {
      header: null,
    };
  };
  render() {
    this.from = this.props.navigation.state.params;
    let {page} = this.state;
    return (
      <ScrollableTabView
        ref={r => (this.tabView = r)}
        onChangeTab={i => this.changeTab(i)}
        renderTabBar={() => (
          <TabBar
            ref={r => (this.tabBar = r)}
            rightIcon={page ? null : '1'}
            clickRightIcon={this.goToFilter}
          />
        )}>
        <InfoSports tabLabel="体育" />
        {/* <InfoTicket tabLabel="彩票" /> */}
        <InfoAllHappy tabLabel="百家乐" />
      </ScrollableTabView>
    );
  }
  componentDidMount = async () => {
    let params = this.props.navigation.state.params;
    if (params && params.to) {
      this.goToPage(params.to);
    }

    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        if (payload.action.params) {
          let to = payload.action.params.to;
          this.goToPage(to);
        }

        console.log('didFocus', payload);
      },
    );
    // let initPage = 0;

    // console.log(from, initPage, this.tabBar, 'initPage');
    // this.tabBar.props.goToPage(initPage);
  };

  componentWillUnmount() {
    this.didFocusSubscription.remove();
  }
  changeTab({i}) {
    this.setState({
      page: i,
    });
  }
  goToFilter = () => {
    this.props.navigation.navigate('filter');
  };
  goToPage(to) {
    console.log(this.tabView, 'this.tabView');
    if (to === 'sport') {
      setTimeout(() => {
        this.tabView && this.tabView.goToPage(0);
      }, 0);
    } else if (to === 'ticket') {
      setTimeout(() => {
        this.tabView && this.tabView.goToPage(1);
      }, 0);
    } else if (to === 'news') {
      setTimeout(() => {
        this.tabView && this.tabView.goToPage(2);
      }, 0);
    }
  }
}
const style = StyleSheet.create({
  safearea: {flex: 1, backgroundColor: '#fff'},
});
