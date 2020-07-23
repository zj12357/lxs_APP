import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  transformSize,
  commonStyle,
  formatTime,
  $api,
  modal,
  moment,
} from '@/utils';
import {Touchable, Button, Icon} from 'ui';
import {Title, Table, SubmitStatus} from './item';
import {MeiqiaInit, MeiqiaShow} from 'meiqia-react-native';
import HTMLView from 'react-native-htmlview';
import {connect} from 'react-redux';
import {getWelfareDetail} from '@/store/actions';
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    welfareDetail: state.welfare.welfareDetail,
  };
};

const mapDispatchToProps = {
  getWelfareDetail,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class WelfareDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      contact: '',
      isBefore: false,
    };
  }
  static navigationOptions = ({navigation}) => {
    return {
      title: '测试',
      headerStyle: {
        paddingTop: 40,
        borderBottomWidth: 0,
        backgroundColor: '#203046',
        elevation: 0,
        height: transformSize(130),
      },
      headerTitleStyle: {
        borderBottomWidth: 0,
        color: '#fff',
        flex: 1,
        textAlign: 'center',
        fontWeight: '600',

        lineHeight: transformSize(130),
        fontSize: transformSize(36),
      },
      headerLeft: (
        <Button
          icon="back"
          iconColor={'#fff'}
          iconSize={16}
          onPress={() => {
            navigation.goBack();
          }}
          style={style.backButton}
        />
      ),
    };
  };

  render() {
    return (
      <ScrollView style={style.wrap} bounces={false}>
        {this.renderTop()}
        {this.renderCenter()}
        {this.renderBottom()}
      </ScrollView>
    );
  }
  componentDidMount = async () => {
    console.log(432);
    this.id = this.props.navigation.state.params.id;
    let params = {pid: this.id};
    await this.props.getWelfareDetail(params);
    let detail = this.props.welfareDetail;

    let flag = moment(detail.enddate).isBefore(moment());
    if (flag) {
      this.setState({
        isBefore: true,
      });
    }
  };
  renderTop = () => {
    let detail = this.props.welfareDetail;
    return (
      <ImageBackground style={style.topWrapBg}>
        <View style={style.topWrap}>
          <Title title="活动说明" />
          <View style={style.topConWrap}>
            <Text style={style.topText}>活动标题：{detail.name}</Text>
            <Text style={style.topText}>活动对象：亚博全站会员</Text>
            <Text style={style.topText}>
              活动时间：{formatTime(detail.startdate, 'YYYY.MM.DD')}-
              {formatTime(detail.enddate, 'YYYY.MM.DD')}
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  };
  renderCenter = () => {
    let detail = this.props.welfareDetail;
    let {userInfo} = this.props;
    let {isBefore} = this.state;
    return (
      <View style={style.centerWrap}>
        <Title style={style.centerTitle} title="申请彩礼" />
        {detail.isForm && !isBefore ? (
          <View>
            <View style={style.inputWrap}>
              <TextInput
                placeholderTextColor={'#999999'}
                placeholder="请输入游戏账号"
                style={style.input}
                onChangeText={text => {
                  this.setState({account: text});
                }}
                value={this.state.account}
              />
            </View>
            <View style={style.inputWrap}>
              <TextInput
                placeholderTextColor={commonStyle.colorTheme.tag}
                placeholder="请输入联系方式"
                style={style.input}
                onChangeText={text => {
                  this.setState({contact: text});
                }}
                value={this.state.contact}
              />
            </View>
          </View>
        ) : null}
        {isBefore ? <Text style={style.isBefore}>活动已结束</Text> : null}
        {userInfo.name ? (
          detail.isForm && !isBefore ? (
            <Button
              style={style.centerBtnWrap}
              textStyle={style.centerBtn}
              title="点击立即申请"
              onPress={this.submit}
            />
          ) : (
            <Button
              style={style.centerBtnWrap}
              textStyle={style.centerBtn}
              title="点击联系客服"
              onPress={this.contact}
            />
          )
        ) : (
          <Button
            style={style.centerBtnWrap}
            textStyle={style.centerBtn}
            title="请先登陆"
            onPress={this.goToLogin}
          />
        )}
      </View>
    );
  };
  renderBottom = () => {
    let detail = this.props.welfareDetail;
    // let data = [
    //   '第一重感恩活动（红包雨）只有在AG真人馆才能获得；',
    //   '第二重和第三重感恩活动所有真人馆都能参加 （AG/EBET/OG/GD/BBIN）;',
    //   '同一手机号、姓名、邮箱地址、银行卡号等信息的游戏账号，仅可参与一次，若有违规者，将不享受此红利；',
    //   '任何用户或团体以不正常的方式进行套取活动优惠，平台方保留在不通知的情况下冻结或关闭相关账户的权力，并不退还款项，且用户会被列入黑名单。',
    //   '此活动遵循亚博一般规则与条款。',
    // ];
    return (
      <View style={style.bottomWrap}>
        <Title title="活动规则" />
        <View style={style.bottomConWrap}>
          {/* {data.map((item, index) => {
            return (
              <View style={style.bottomTextItem} key={index}>
                <Text style={style.bottomText}>{index + 1}.</Text>
                <Text style={style.bottomText}>{item}</Text>
              </View>
            );
          })} */}
          <HTMLView
            value={detail.promotionContent}
            // stylesheet={styleHtml}
            paragraphBreak=""
            addLineBreaks={true}
            // renderNode={this.renderNode}
          />
        </View>
        <Table style={style.table} />
      </View>
    );
  };
  submit = async () => {
    let {account, contact} = this.state;
    let params = {
      username: account,
      mobile: contact,
      pid: this.id,
    };
    let res = await $api['welfare/apply'](params);

    let msg = (res.resultData && res.resultData.msg) || res.message;
    if (!res.resultData || !res.resultData.code) {
      modal.show(
        <SubmitStatus mes={msg} confirm={this.statusConfirm} />,
        'center',
      );
      return;
    }
    modal.show(
      <SubmitStatus isSuccess confirm={this.statusConfirm} mes={msg} />,
      'center',
    );
  };
  contact = () => {
    MeiqiaShow({
      clientInfo: {},
    });
  };
  goToLogin = () => {
    this.props.navigation.navigate('login');
  };
  statusConfirm = () => {
    modal.close();
  };
}
const style = StyleSheet.create({
  wrap: {},
  backButton: {
    width: transformSize(80),
    height: transformSize(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  topWrapBg: {
    height: transformSize(200),
    backgroundColor: '#203046',
    justifyContent: 'center',
  },
  topWrap: {
    position: 'relative',
    top: 50,
    backgroundColor: '#fff',
    marginHorizontal: transformSize(28),
    paddingTop: transformSize(32),
    borderRadius: transformSize(18),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  topConWrap: {
    marginTop: transformSize(20),
    marginBottom: transformSize(10),
    marginHorizontal: transformSize(22),
  },
  topText: {
    fontSize: transformSize(26),
    color: '#333',
    fontWeight: 'bold',
    marginBottom: transformSize(10),
  },
  isBefore: {
    textAlign: 'center',
    marginTop: transformSize(40),
    color: '#666',
  },
  centerWrap: {
    marginTop: transformSize(160),
    backgroundColor: '#fff',
    marginHorizontal: transformSize(28),
    paddingTop: transformSize(34),
    borderRadius: transformSize(18),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  centerTitle: {},
  centerBtnWrap: {
    marginTop: transformSize(40),
    marginBottom: transformSize(44),
    marginLeft: transformSize(56),
    width: transformSize(594),
    height: transformSize(68),
    backgroundColor: '#DA1B2A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: transformSize(34),
  },
  inputWrap: {
    marginLeft: transformSize(56),
    marginTop: transformSize(28),
    width: transformSize(594),
    height: transformSize(68),
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: transformSize(34),
  },
  input: {
    width: transformSize(500),
    height: transformSize(68),
    textAlign: 'center',
    paddingVertical: 0,
  },
  centerBtn: {
    fontSize: transformSize(28),
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomWrap: {
    marginTop: transformSize(34),
    marginBottom: transformSize(100),
    backgroundColor: '#fff',
    marginHorizontal: transformSize(28),
    paddingTop: transformSize(34),
    borderRadius: transformSize(18),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  bottomConWrap: {
    marginHorizontal: transformSize(20),
    marginTop: transformSize(16),
  },
  bottomTextItem: {
    flexDirection: 'row',
  },
  bottomText: {
    marginVertical: transformSize(8),
    fontSize: transformSize(26),
    color: '#333',
    lineHeight: transformSize(36),
  },
  table: {
    marginHorizontal: transformSize(26),
    marginTop: transformSize(30),
    marginBottom: transformSize(50),
  },
});
