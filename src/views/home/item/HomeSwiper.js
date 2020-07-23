import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Platform,
} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon} from 'ui';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {getHomeSwiper} from '@/store/actions';
const mapStateToProps = state => {
  return {
    homeSwiper: state.home.homeSwiper,
  };
};

const mapDispatchToProps = {
  getHomeSwiper,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@withNavigation
export default class HomeSwiper extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Swiper
        style={style.wrapper}
        autoplay={true}
        dotStyle={style.dot}
        activeDotStyle={style.activeDot}>
        {this.props.homeSwiper.map((item, index) => {
          return (
            <ImageBackground
              key={index}
              style={style.swiper}
              imageStyle={style.swiperImg}
              source={{uri: item.imgAddress}}>
              <Touchable onPress={() => this.clickImg(item)}>
                <LinearGradient
                  colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']}
                  style={style.linear}
                />
              </Touchable>
            </ImageBackground>
          );
        })}
      </Swiper>
    );
  }
  componentDidMount = async () => {
    let platform = Platform.select({
      ios: 2,
      android: 1,
    });
    let params = {
      platformById: platform,
    };
    await this.props.getHomeSwiper(params);
  };
  clickImg(item) {
    console.log(this.props);
    this.props.navigation.navigate('webview', {url: item.redirectAddress});
  }
}
const style = StyleSheet.create({
  wrapper: {
    height: transformSize(560),
  },
  swiper: {
    width: '100%',
    height: transformSize(560),
  },
  swiperImg: {
    resizeMode: 'stretch',
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,.8)',
  },
  activeDot: {
    backgroundColor: '#DA1B2A',
    width: 18,
  },
  linear: {
    height: transformSize(260),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
