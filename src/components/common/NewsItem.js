import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import {transformSize, commonStyle, checkImg} from '@/utils';
import {Touchable, Icon, Button} from 'ui';
import {withNavigation} from 'react-navigation';
@withNavigation
export default class HomeNews extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let {isH, item} = this.props;
    return <View>{isH ? this.renderH(item) : this.renderV(item)}</View>;
  }
  componentDidMount = async () => {};

  renderH = item => {
    let {imgAddress, browseNumber, commentNumber} = item;
    return (
      <Touchable style={style.itemWrap} onPress={this.goToNewsDetail}>
        <Image
          source={
            imgAddress
              ? {uri: checkImg(imgAddress)}
              : require('@/assets/images/pic_not.png')
          }
          style={style.image}
        />
        <View style={style.rightWrap}>
          <Text style={style.title}>{item.title}</Text>
          <View style={style.tipsWrap}>
            <Button
              icon="gk"
              iconColor="#999"
              title={browseNumber}
              style={style.iconWrap}
              textStyle={style.view}
            />
            <Button
              icon="pl"
              iconColor="#999"
              title={commentNumber}
              style={style.iconWrap}
              textStyle={style.comment}
            />
          </View>
        </View>
      </Touchable>
    );
  };
  renderV = item => {
    let {imgAddress, browseNumber, commentNumber} = item;
    return (
      <Touchable style={style.vitemWrap} onPress={this.goToVideoDetail}>
        <Text style={style.vtitle}>{item.title}</Text>
        <ImageBackground
          source={
            imgAddress
              ? {uri: imgAddress}
              : require('@/assets/images/pic_not.png')
          }
          style={style.vimage}>
          <Button
            icon="video"
            iconSize={18}
            iconColor="rgba(255,255,255,.9)"
            style={style.control}
          />
        </ImageBackground>
        <View style={style.tipsWrap}>
          <Button
            icon="gk"
            iconColor="#999"
            title={browseNumber}
            style={style.iconWrap}
            textStyle={style.view}
          />
          <Button
            icon="pl"
            iconColor="#999"
            title={commentNumber}
            style={style.iconWrap}
            textStyle={style.comment}
          />
        </View>
      </Touchable>
    );
  };
  goToNewsDetail = () => {
    let {item, from} = this.props;
    let id = from === 'collect' ? item.newsById : item.id;
    this.props.navigation.navigate('newsDetail', {id: id});
  };
  goToVideoDetail = () => {
    let {item, from} = this.props;
    let id = from === 'collect' ? item.newsById : item.id;
    this.props.navigation.navigate('videoDetail', {id: id});
  };
}
const style = StyleSheet.create({
  itemWrap: {
    // height: transformSize(206),
    paddingVertical: transformSize(26),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: transformSize(1),
    borderBottomColor: '#DBDBDB',
  },

  image: {
    width: transformSize(204),
    height: transformSize(152),
    marginRight: transformSize(24),
  },
  rightWrap: {
    flex: 1,
    justifyContent: 'space-between',
    height: transformSize(152),
  },
  title: {
    width: transformSize(455),
    fontSize: transformSize(28),
    color: '#333',
    fontWeight: 'bold',
  },
  tipsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  iconWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: transformSize(30),
  },
  view: {
    fontSize: transformSize(26),
    color: '#999999',
    marginLeft: transformSize(6),
  },
  comment: {
    fontSize: transformSize(26),
    color: '#999999',
    marginLeft: transformSize(6),
  },

  vitemWrap: {
    height: transformSize(568),
    paddingVertical: transformSize(26),
    borderBottomWidth: transformSize(1),
    borderBottomColor: '#DBDBDB',
  },
  vtitle: {
    fontSize: transformSize(28),
    color: '#333',
    fontWeight: 'bold',
    marginBottom: transformSize(26),
  },
  vimage: {
    width: '100%',
    height: transformSize(387),

    marginBottom: transformSize(26),
    justifyContent: 'center',
    alignItems: 'center',
  },
  control: {
    width: transformSize(90),
    height: transformSize(90),
    backgroundColor: 'rgba(0,0,0,.5)',
    borderRadius: transformSize(45),
  },
});
