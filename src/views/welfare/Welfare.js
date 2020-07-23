import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import {transformSize} from '@/utils';
import SafeAreaView from 'react-native-safe-area-view';
import {ScrollTabBar} from 'common';
import {Button, Touchable, EndTip, FlowList} from 'ui';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {WelfareItem} from './item';
import {connect} from 'react-redux';
import {getWelfareType, getWelfareCategoryList} from '@/store/actions';
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    welfareType: state.welfare.welfareType,
    welfareCategoryList: state.welfare.welfareCategoryList,
  };
};

const mapDispatchToProps = {
  getWelfareType,
  getWelfareCategoryList,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = ({navigation, screenProps}) => ({
    header: null,
  });
  render() {
    let {welfareType} = this.props;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={style.wrap}>
          <View style={style.headerWrap}>
            <Text style={style.headerTitle}>福利</Text>
            <Button
              title="申请记录"
              style={style.headerTipsWrap}
              textStyle={style.headerTips}
              icon="danju"
              onPress={() => this.goToRecord()}
            />
          </View>
        </View>
        {welfareType.length ? (
          <ScrollableTabView
            renderTabBar={() => (
              <ScrollTabBar
                style={style.tabs}
                activeTextColor="#203046"
                underlineStyle={style.underline}
                underLineOffset={transformSize(19)}
              />
            )}>
            {welfareType.map((tab, i) => {
              return (
                <FlowList
                  style={style.flatlistWrap}
                  contentContainerStyle={style.flatlist}
                  key={i}
                  tabLabel={tab.name}
                  request={this.props.getWelfareCategoryList}
                  params={{promotionTypeID: tab.id}}
                  renderItem={({item}) => <WelfareItem item={item} />}
                  keyExtractor={(item, index) => index.toString()}
                />
              );
            })}
          </ScrollableTabView>
        ) : (
          <EndTip />
        )}
      </SafeAreaView>
    );
  }
  componentDidMount = async () => {
    await this.props.getWelfareType();
  };
  goToRecord = () => {
    let {userInfo} = this.props;
    if (!userInfo.name) {
      this.props.navigation.navigate('login');
      return;
    }
    this.props.navigation.navigate('welfareRecord');
  };
}
const style = StyleSheet.create({
  wrap: {},
  flatlistWrap: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  headerWrap: {
    height: transformSize(88),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: transformSize(34),
    color: '#333',
    fontWeight: 'bold',
  },
  headerTipsWrap: {
    position: 'absolute',
    right: 0,
    height: transformSize(60),
    width: transformSize(200),
  },
  headerTips: {
    fontSize: transformSize(26),
    color: '#333',
    marginLeft: transformSize(6),
  },

  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',

    backgroundColor: '#fff',
  },
  underline: {
    width: transformSize(38),
    height: transformSize(6),
    backgroundColor: '#DA1B2A',
  },
  flatlist: {
    backgroundColor: '#f0f0f0',
  },
});
