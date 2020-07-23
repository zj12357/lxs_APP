import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {transformSize, commonStyle, $api} from '@/utils';
import {Touchable, Icon} from 'ui';
import Title from '../../../components/common/Title';
import {NewsItem} from 'common';
import {withNavigation} from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import {connect} from 'react-redux';
import {getHomeNews, getHomeVideo} from '@/store/actions';
const mapStateToProps = state => {
  return {
    homeNews: state.home.homeNews,
    homeVideo: state.home.homeVideo,
  };
};

const mapDispatchToProps = {
  getHomeNews,
  getHomeVideo,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@withNavigation
export default class HomeNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  render() {
    return (
      <View style={style.homeNews}>
        <Title
          title="热门资讯"
          right={true}
          goToPage={() => this.goToPage()}
          style={{paddingHorizontal: transformSize(30)}}
        />
        <FlatList
          style={style.flatlist}
          data={this.state.list}
          renderItem={({item, index}) => (
            <NewsItem item={item} isH={(index + 1) % 3} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
  componentDidMount = async () => {
    try {
      this.params = {pageIndex: 1, pageSize: 4};
      await this.props.getHomeNews(this.params);
      this.paramsVideo = {pageIndex: 1, pageSize: 2};
      await this.props.getHomeVideo(this.paramsVideo);
      SplashScreen.hide();
    } catch (err) {
      SplashScreen.hide();
    }

    let {homeNews, homeVideo} = this.props;
    let news = [].concat(homeNews);
    homeNews.forEach((item, index) => {
      console.log(index);
      if (!((index + 1) % 2)) {
        console.log(index, 'index');
        news.splice(index + 1, 0, homeVideo[(index + 1) / 2 - 1]);
      }
    });
    console.log(news, 'news');
    this.setState({list: news});
  };

  goToPage() {
    console.log('this,props', this);
    this.props.navigation.navigate('info', {to: 'news'});
  }
}
const style = StyleSheet.create({
  homeNews: {
    marginTop: transformSize(38),

    backgroundColor: '#f0f0f0',
  },
  flatlist: {
    paddingHorizontal: transformSize(26),

    backgroundColor: '#fff',
  },
});
