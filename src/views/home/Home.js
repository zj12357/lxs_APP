import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {transformSize} from '@/utils';
import SafeAreaView from 'react-native-safe-area-view';
import {Touchable} from 'ui';
import {HomeNews, HomeSwiper, HomeRecord, HomeSports, HomeTicket} from './item';
import {MeiqiaInit, MeiqiaShow} from 'meiqia-react-native';
export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({navigation, screenProps}) => ({
    header: null,
  });
  render() {
    return (
      <View style={style.wrap}>
        <ScrollView style={style.scrollView} bounces={false}>
          <HomeSwiper />

          <HomeRecord />
          <HomeSports />
          {/* <HomeTicket /> */}
          <HomeNews />
        </ScrollView>
        <Touchable style={style.kefuWrap} onPress={this.getMeiQia}>
          <Image
            source={require('@/assets/images/home/kf.png')}
            style={style.img}
          />
        </Touchable>
      </View>
    );
  }
  componentDidMount = async () => {};
  getMeiQia = () => {
    MeiqiaShow({
      clientInfo: {},
    });
  };
}
const style = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#f0f0f0',
  },
  kefuWrap: {
    position: 'absolute',
    right: 10,
    bottom: 50,
  },
  img: {
    width: 54,
    height: 54,
  },
});
