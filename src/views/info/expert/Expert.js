import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon, Button, FlowList} from 'ui';
import {Title, Select} from 'common';
import {ExpertItem} from '../components';
import {connect} from 'react-redux';
import {
  getTicketRecommendDetail,
  getTicketRecommendRecord,
  getTicketPlayMethod,
} from '@/store/actions';
const mapStateToProps = state => {
  return {
    ticketRecommendDetail: state.info.ticketRecommendDetail,
    ticketTab: state.info.ticketTab,
    ticketPlayMethod: state.info.ticketPlayMethod,
  };
};

const mapDispatchToProps = {
  getTicketRecommendDetail,
  getTicketRecommendRecord,
  getTicketPlayMethod,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class Expert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expert: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      category: '全部类型',
      champion: '冠军定码',
      categoryOptions: ['分类1', '分类2', '分类3', '分类4', '分类5'],
      championOptions: ['冠军1', '冠军2', '冠军3', '冠军4', '冠军5'],
      params: {
        userByName: props.navigation.state.params.name,
        // playMethod: '',
        // lotteryTypeById: '',
      },
    };
  }
  static navigationOptions = ({navigation, screenProps}) => ({
    title: '赛车',
    headerStyle: {
      borderBottomWidth: 0,
      backgroundColor: '#203046',
    },
    headerTitleStyle: {
      borderBottomWidth: 0,
      color: '#fff',
    },
    headerLeft: (
      <Button
        icon="back"
        iconColor={'#fff'}
        iconSize={16}
        onPress={() => {
          navigation.goBack();
        }}
        style={{marginLeft: 15}}
      />
    ),
  });
  render() {
    return (
      <View style={style.wrap}>
        <FlowList
          style={style.flatlistWrap}
          request={this.props.getTicketRecommendRecord}
          params={this.state.params}
          contentContainerStyle={style.flatlist}
          ListHeaderComponent={this.renderHeader()}
          renderItem={() => <ExpertItem />}
          bounces={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  componentDidMount = async () => {
    let data = this.props.ticketTab.map(item => {
      return item.name;
    });

    data.unshift('全部分类');

    console.log(data, 'datadata');
    this.setState({
      categoryOptions: data,
    });

    let {id} = this.props.navigation.state.params;
    let params = {id};
    await this.props.getTicketRecommendDetail(params);
    let paramsPlayMethod = {
      lotteryCategoryById: this.props.ticketRecommendDetail.lotteryCategoryById,
      pageIndex: 1,
      pageSize: 10,
    };

    await this.props.getTicketPlayMethod(paramsPlayMethod);
    let data2 = this.props.ticketPlayMethod.map(item => {
      return item.playMethod;
    });

    data2.unshift('冠军定码');

    console.log(data2, 'datadata');
    this.setState({
      championOptions: data2,
    });
  };
  renderHeader() {
    let detail = this.props.ticketRecommendDetail;
    let con = [
      {
        num: detail.recommendTotal || 0,
        label: '累计推荐',
      },
      {
        num: detail.accuracyAmt,
        label: '累计红单',
      },
      {
        num: detail.accuracy * 100 + '%',
        label: '红单率',
      },
      {
        num: detail.straightHit,
        label: '累计连中',
      },
    ];
    return (
      <View style={style.headerWrap}>
        <ImageBackground
          style={style.topWrap}
          source={require('@/assets/images/info/ticket-bg.png')}>
          <View style={style.avatarWrap}>
            <Image
              style={style.avatar}
              source={
                detail.img
                  ? {uri: detail.img}
                  : require('@/assets/images/info/avatar.png')
              }
            />
            <Text style={style.avatarText}>{detail.userByName}</Text>
          </View>
        </ImageBackground>
        <View style={style.conWrap}>
          {con.map(item => {
            return (
              <View style={style.conItem}>
                <Text style={style.conItemNum}>{item.num}</Text>
                <Text style={style.conItemLabel}>{item.label}</Text>
              </View>
            );
          })}
        </View>

        <View style={style.listWrap}>
          <View style={style.listHeader}>
            <Title title="近100期推荐记录" />
            <Select
              style={style.select}
              textStyle={style.listSelect}
              label={this.state.category}
              iconColor="#FF770D"
              actionTitle={'请选择类型'}
              actionOptions={this.state.categoryOptions}
              actionConfirm={this.categoryConfirm}
            />
            <Select
              style={style.select}
              textStyle={style.listSelect}
              label={this.state.champion}
              iconColor="#FF770D"
              actionTitle={'请选择冠军定码'}
              actionOptions={this.state.championOptions}
              actionConfirm={this.championConfirm}
            />
            {/* <Button
              title="全部类型"
              isIconRight
              icon="xl"
              iconColor="#FF770D"
              iconSize={7}
              style={style.listSelectWrap}
              textStyle={style.listSelect}
            />
            <Button
              title="冠军定码"
              isIconRight
              icon="xl"
              iconColor="#FF770D"
              iconSize={7}
              style={style.listSelectWrap}
              textStyle={style.listSelect}
            /> */}
          </View>
        </View>
      </View>
    );
  }
  categoryConfirm = data => {
    this.setState({
      category: data,
    });
  };
  championConfirm = data => {
    this.setState({
      champion: data,
    });
  };
}
const style = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  flatlistWrap: {
    flex: 1,
  },
  flatlist: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  headerWrap: {
    position: 'relative',
    // height: transformSize(460),
  },
  topWrap: {
    height: transformSize(520),
    zIndex: 10,
  },

  avatarWrap: {
    marginTop: transformSize(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: transformSize(102),
    width: transformSize(102),
    borderRadius: transformSize(51),
    marginLeft: transformSize(38),
    marginRight: transformSize(24),
  },
  avatarText: {
    fontSize: transformSize(34),
    fontWeight: 'bold',
    color: '#fff',
  },
  conWrap: {
    width: transformSize(700),
    height: transformSize(254),
    borderRadius: transformSize(14),
    marginHorizontal: transformSize(25),
    paddingHorizontal: transformSize(80),
    position: 'absolute',
    bottom: transformSize(116),
    backgroundColor: '#fff',

    flexDirection: 'row',
    zIndex: 100,
    flexWrap: 'wrap',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  conItem: {
    width: transformSize(270),
    height: transformSize(120),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  conItemNum: {
    fontSize: transformSize(40),
    fontWeight: 'bold',
    color: '#DA1B2A',
  },
  conItemLabel: {
    fontSize: transformSize(26),
    fontWeight: 'bold',
    color: '#203046',
  },

  listWrap: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: transformSize(40),
    borderTopRightRadius: transformSize(40),
    paddingTop: transformSize(140),
    zIndex: 50,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: transformSize(24),
  },
  listSelectWrap: {},
  listSelect: {
    fontSize: transformSize(28),
    fontWeight: 'bold',
    color: '#FF770D',
    marginRight: transformSize(6),
  },
});
