import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Platform} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon} from 'ui';
import {connect} from 'react-redux';
import {getAbout} from '@/store/actions';
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    about: state.my.about,
  };
};

const mapDispatchToProps = {
  getAbout,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label:
        '知乎属于北京智者天下科技有限公司旗下品牌。知乎，可信赖的问答社区，以让每个人高效获得可信赖的解答为使命。知乎凭借认真、专业和友善的社区氛围，结构化、易获得的优质内容，基于问答的内容生产方式和独特的社区机制，吸引、聚集了各行各业中大量的亲历者、内行人、领域专家、领域爱好者，将高质量的内容透过人的节点来成规模地生产和分享。用户通过问答等交流方式建立信任和连接，打造和提升个人影响力，并发现、获得新机会。',
      company: '北京智者天下科技有限公司  ',
      location: '北京市海淀区学院路甲 5 号 768 创意园 A 座西区四通道 3-010 ',
      phone: '010-61190680',
    };
  }
  static navigationOptions = ({navigation, screenProps}) => ({
    title: '关于我们',
    headerStyle: {
      borderBottomWidth: 0,
      elevation: 0,
    },
    headerTitleStyle: {
      borderBottomWidth: 0,
      color: '#333',
      flex: 1,
      textAlign: 'center',
      fontWeight: '600',
      lineHeight: transformSize(90),
      fontSize: transformSize(36),
    },
  });
  render() {
    let data = this.props.about;
    return (
      <View style={style.wrap}>
        <Image
          style={style.img}
          source={require('@/assets/images/my/about/logo.png')}
        />
        {/* <Text style={style.label}>&emsp;&emsp;{data.content}</Text> */}
        <Text style={style.label}>{data.content}</Text>
        {/* <View style={style.tipsWrap}>
          <View style={style.tipsItem}>
            <Text style={style.tipsLabel}>公司名称：</Text>
            <Text style={style.tips}>{this.state.company}</Text>
          </View>
          <View style={style.tipsItem}>
            <Text style={style.tipsLabel}>地址：</Text>
            <Text style={style.tips}>{this.state.location}</Text>
          </View>
          <View style={style.tipsItem}>
            <Text style={style.tipsLabel}>电话：</Text>
            <Text style={style.tips}>{this.state.phone}</Text>
          </View>
        </View> */}
      </View>
    );
  }
  componentDidMount = async () => {
    let platformById = Platform.select({
      ios: 2,
      android: 1,
    });
    await this.props.getAbout({
      platformById: platformById,
    });
  };
}
const style = StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    paddingHorizontal: transformSize(58),
    alignItems: 'center',

    overflow: 'hidden',
  },
  img: {
    width: transformSize(196),
    height: transformSize(170),
    marginTop: transformSize(100),
    marginBottom: transformSize(90),
  },
  label: {
    fontSize: transformSize(32),
    color: '#333',
    fontWeight: 'bold',
    lineHeight: transformSize(44),
  },
  tipsWrap: {
    marginTop: transformSize(40),
    width: '100%',
  },
  tipsItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tipsLabel: {
    fontSize: transformSize(32),
    color: '#333',
    fontWeight: 'bold',
    lineHeight: transformSize(44),
    marginRight: transformSize(10),
    marginBottom: transformSize(10),
  },
  tips: {
    fontSize: transformSize(32),
    color: '#333',
    fontWeight: 'bold',
    lineHeight: transformSize(44),
    flex: 1,
  },
});
