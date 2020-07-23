import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {transformSize, commonStyle, formatTime, modal} from '@/utils';

import {Touchable, Button, FlowList, Message, Loading} from 'ui';
import {IconText, InputComment} from 'common';
import {CommentItem} from './components';
import $api from '@/config/api';
import HTMLView from 'react-native-htmlview';
import {connect} from 'react-redux';
import {getNewsDetail, getNewsCommentList} from '@/store/actions';
const mapStateToProps = state => {
  return {
    newsDetail: state.home.newsDetail,
  };
};

const mapDispatchToProps = {
  getNewsDetail,
  getNewsCommentList,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class NewsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = () => ({
    title: '详情',
  });
  render() {
    let pageId = this.props.navigation.state.params.id;
    let params = {newsById: pageId, isShow: true};
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={style.wrap}>
          <FlowList
            ref={r => (this.flowlist = r)}
            style={style.flatlistWrap}
            contentContainerStyle={style.flatlist}
            // data={this.state.commentList}
            request={this.props.getNewsCommentList}
            params={params}
            renderItem={({item}) => <CommentItem item={item} />}
            ListHeaderComponent={this.renderHeader}
            emptyComponent={
              <Message preset="no-data" messageTitle="暂无评论" />
            }
          />

          <InputComment
            data={this.props.newsDetail}
            type={0}
            handleStar={this.handleStar}
            alertSubmit={this.addComment}
          />
        </View>
      </SafeAreaView>
    );
  }
  componentDidMount = async () => {
    this.pageId = this.props.navigation.state.params.id;
    this.params = {id: this.pageId};
    await this.handleView();
    this.props.getNewsDetail(this.params);
  };
  renderHeader = () => {
    let newsDetail = this.props.newsDetail;
    return (
      <View style={style.conWrap}>
        <Text style={style.title}>{newsDetail.title}</Text>
        <View style={style.tipsWrap}>
          <Text style={style.time}>{formatTime(newsDetail.createTime)}</Text>
          <View style={style.tipsRight}>
            <Button
              title={newsDetail.browseNumber}
              icon="gk"
              textStyle={style.tipsText}
              iconColor="#666"
            />
            <Button
              title={newsDetail.commentNumber}
              textStyle={style.tipsText}
              icon="pl"
              iconColor="#666"
            />
          </View>
        </View>
        {/* <Image
          source={
            newsDetail.imgAddress
              ? {uri: newsDetail.imgAddress}
              : require('@/assets/images/pic_not.png')
          }
          style={style.image}
        /> */}
        {/* <Text style={style.con}>{newsDetail.content}</Text> */}
        <View style={style.con}>
          <HTMLView
            value={newsDetail.content}
            // stylesheet={styleHtml}
            paragraphBreak=""
            addLineBreaks={true}
            // renderNode={this.renderNode}
          />
        </View>
      </View>
    );
  };
  handleView = async () => {
    let params = {
      id: this.pageId,
    };
    let res = await $api['home/newsViewCount'](params);
  };
  addComment = async text => {
    let params = {
      newsById: this.pageId,
      content: text,
    };
    modal.show(<Loading />, 'loading');
    let res = await $api['home/addComment'](params);
    if (res.resultData) {
      modal.showToast('添加成功，审核过后可查看');
    } else {
      modal.showToast(res.message);
    }
  };
  handleStar = async () => {
    await this.props.getNewsDetail(this.params);
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

  conWrap: {
    backgroundColor: '#fff',
    paddingHorizontal: transformSize(30),
  },
  title: {
    fontSize: transformSize(44),
    fontWeight: 'bold',
    color: '#333',
    marginTop: transformSize(28),
  },
  tipsWrap: {
    marginTop: transformSize(12),

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tipsText: {
    color: '#666',
    marginLeft: transformSize(10),
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
  image: {
    marginTop: transformSize(28),
    height: transformSize(516),
    width: '100%',
  },
  con: {
    marginTop: transformSize(28),
    marginBottom: transformSize(28),
  },
});
