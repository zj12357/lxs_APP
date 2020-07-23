import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import {transformSize, commonStyle, moment} from '@/utils';
import {Touchable, Icon} from 'ui';
import {withNavigation} from 'react-navigation';
@withNavigation
export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {item} = this.props;
    let wei = moment().isBefore(moment(item.startdate));
    let doing = !wei && moment().isBefore(moment(item.enddate));
    let over = moment(item.enddate).isBefore(moment());
    let source = wei
      ? require('@/assets/images/welfare/wei.png')
      : doing
      ? require('@/assets/images/welfare/doing.png')
      : over
      ? require('@/assets/images/welfare/over.png')
      : require('@/assets/images/welfare/wei.png');

    return (
      <ImageBackground
        source={
          item.image
            ? {uri: item.image}
            : require('@/assets/images/pic_not.png')
        }
        style={style.itemWrap}
        imageStyle={style.itemWrapBg}>
        <Touchable onPress={() => this.goToDetail()}>
          <Image
            source={source}
            style={style.statusWrap}
            imageStyle={style.statusWrapBg}
          />

          <View style={style.timeWrap}>
            <Text style={style.begin}>
              {item.startdate && item.startdate.split('T')[0]}
            </Text>
            <Text style={style.label}>至</Text>
            <Text style={style.end}>
              {item.enddate && item.enddate.split('T')[0]}
            </Text>
          </View>
        </Touchable>
      </ImageBackground>
    );
  }
  componentDidMount = async () => {};
  goToDetail = () => {
    this.props.navigation.navigate('welfareDetail', {id: this.props.item.pid});
  };
}
const style = StyleSheet.create({
  itemWrap: {
    margin: transformSize(20),
    height: transformSize(334),
    borderRadius: transformSize(12),
    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  itemWrapBg: {
    borderRadius: transformSize(12),
  },
  statusWrap: {
    marginTop: transformSize(48),
    width: transformSize(96),
    height: transformSize(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    fontSize: transformSize(24),
    color: '#fff',
    fontWeight: 'bold',
  },
  timeWrap: {
    width: transformSize(334),
    height: transformSize(36),
    flexDirection: 'row',
    marginTop: transformSize(164),
    backgroundColor: '#79D4FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: transformSize(18),
    borderBottomRightRadius: transformSize(18),
  },
  begin: {
    fontSize: transformSize(24),
    color: '#fff',
  },
  label: {
    fontSize: transformSize(24),
    color: '#fff',
  },
  end: {
    fontSize: transformSize(24),
    color: '#fff',
  },
});
