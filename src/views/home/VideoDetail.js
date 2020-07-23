import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {transformSize, modal, SCREEN_WIDTH} from '@/utils';
import {Touchable, Button, FlowList} from 'ui';
import {IconText, InputComment, Video} from 'common';

import {CommentItem} from './components';
import {connect} from 'react-redux';
import {getVideoCommentList, getVideoDetail} from '@/store/actions';
const mapStateToProps = state => {
  return {
    videoDetail: state.home.videoDetail,
    videoCommentList: state.home.videoCommentList,
  };
};

const mapDispatchToProps = {
  getVideoDetail,
  getVideoCommentList,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class VideoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 0,
    };
  }
  static navigationOptions = () => ({
    title: '详情',
  });
  render() {
    let id = this.props.navigation.state.params.id;
    let params = {videoById: id};
    let detail = this.props.videoDetail;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={style.wrap}>
          <FlowList
            style={style.flatlistWrap}
            contentContainerStyle={style.flatlist}
            request={this.props.getVideoCommentList}
            params={params}
            // data={this.state.commentList}
            renderItem={({item}) => <CommentItem item={item} />}
            ListHeaderComponent={this.renderHeader}
          />
          <InputComment data={detail} type={3} handleStar={this.handleStar} />
        </View>
      </SafeAreaView>
    );
  }
  componentDidMount = async () => {
    let id = this.props.navigation.state.params.id;
    this.params = {videoById: id};
    console.log(this.props, 'this.props');
    await this.props.getVideoDetail(this.params);
  };
  renderHeader = () => {
    let detail = this.props.videoDetail;
    let {show} = this.state;
    return (
      <View style={style.topWrap}>
        {show === 1 ? (
          <View style={style.videoWrap}>
            <Video
              style={style.videoWrap}
              url={detail.videoURL}
              goBack={() => this.setState({show: 0})}
            />
          </View>
        ) : (
          <ImageBackground
            source={
              detail.imgAddress
                ? {uri: detail.imgAddress}
                : require('@/assets/images/pic_not.png')
            }
            style={style.image}>
            <Button
              icon="video"
              iconSize={18}
              iconColor="rgba(255,255,255,.9)"
              style={style.control}
              onPress={() => this.setState({show: 1})}
            />
          </ImageBackground>
        )}
        <View style={style.conWrap}>
          <Text style={style.title}>{detail.title}</Text>
          <View style={style.tipsWrap}>
            <Text style={style.time}>{detail.time}</Text>
            <View style={style.tipsRight}>
              <Button
                title={detail.browseNumber}
                icon="gk"
                textStyle={style.tipsText}
                iconColor="#666"
              />
              <Button
                title={detail.commentNumber}
                textStyle={style.tipsText}
                icon="pl"
                iconColor="#666"
              />
            </View>
          </View>
        </View>
      </View>
    );
  };
  handleStar = async () => {
    await this.props.getVideoDetail(this.params);
    modal.close();
  };
}
const style = StyleSheet.create({
  wrap: {
    position: 'relative',
    flex: 1,
  },
  flatlistWrap: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  flatlist: {
    paddingBottom: transformSize(150),
  },
  videoWrap: {
    width: SCREEN_WIDTH,
    height: transformSize(420),
  },
  image: {
    height: transformSize(420),
    justifyContent: 'center',
    alignItems: 'center',
  },

  control: {
    width: transformSize(90),
    height: transformSize(90),
    backgroundColor: 'rgba(0,0,0,.5)',
    borderRadius: transformSize(45),
  },
  topWrap: {
    backgroundColor: '#fff',
  },
  conWrap: {
    paddingHorizontal: transformSize(30),
  },
  title: {
    fontSize: transformSize(32),
    fontWeight: 'bold',
    color: '#333',
    marginTop: transformSize(20),
  },
  tipsWrap: {
    marginTop: transformSize(12),
    marginBottom: transformSize(22),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: transformSize(26),

    color: '#999',
  },
  tipsRight: {
    flexDirection: 'row',
    width: transformSize(208),
    justifyContent: 'space-between',
  },
  tipsText: {
    color: '#666',
    marginLeft: transformSize(10),
  },
  con: {
    fontSize: transformSize(32),
    marginTop: transformSize(28),
    marginBottom: transformSize(28),
    color: '#333333',
    lineHeight: transformSize(44),
  },
});
