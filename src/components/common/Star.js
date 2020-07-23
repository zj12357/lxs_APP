import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle, modal} from '@/utils';
import {Loading, Button} from 'ui';
import {withNavigation} from 'react-navigation';
import $api from '@/config/api';

import {connect} from 'react-redux';
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = {};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@withNavigation
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTrue: false,
    };
  }

  render() {
    let {isTrue} = this.state;
    return (
      <View style={[style.wrap, this.props.style]}>
        {isTrue ? (
          <Button
            icon={'shoucangdianjiqian'}
            iconSize={this.props.iconSize || 16}
            iconColor={'#FFCF0D'}
            style={[style.starWrap, this.props.btnStyle]}
            onPress={this.cancelStar}
          />
        ) : (
          <Button
            icon={'shoucangdianjiqian'}
            iconSize={this.props.iconSize || 16}
            iconColor={'#dbdbdb'}
            style={[style.starWrap, this.props.btnStyle]}
            onPress={this.handleStar}
          />
        )}
      </View>
    );
  }
  componentDidMount = async () => {
    let {data} = this.props;
    let isTrue = data.isInterested || data.isAttention;
    this.setState({
      isTrue,
    });
  };

  handleStar = () => {
    let {type, userInfo} = this.props;

    if (!userInfo.name) {
      this.props.navigation.navigate('login');
      return;
    }
    if (type === 1) {
      this.handleAttention();
      return;
    }
    let MyComponent = (
      <View style={style.modalWrap}>
        <Text style={style.modalTitle}>
          关注：
          <Text style={style.modalLabel}>
            添加到先关注栏中的同时赛事结果会通过APP进行推送
          </Text>
        </Text>
        <Text style={style.modalTitle}>
          收藏：
          <Text style={style.modalLabel}>仅显示在收藏栏中，无任何消息推送</Text>
        </Text>

        <View style={style.modalBtnWrap}>
          <Button
            style={style.btnWrap}
            textStyle={style.btn}
            onPress={this.handleCollect}
            title="收藏"
          />

          <Button
            style={style.btnWrap}
            textStyle={style.btn}
            onPress={this.handleAttention}
            title="关注"
          />
        </View>
      </View>
    );
    modal.show(MyComponent, 'center');
  };
  cancelStar = async () => {
    let {data, type, userInfo, from} = this.props;
    if (!userInfo.name) {
      this.props.navigation.navigate('login');
      return;
    }
    let params = {
      type: type,
      newsById: type === 1 ? data.lotteryCategoryById : data.id,
    };
    if (from === 'collect' || from === 'focus') {
      params = {
        id: data.id,
      };
    }
    let url = '';
    if (data.isInterested) {
      if (from === 'collect' || from === 'focus') {
        url = 'my/delMyCollect';
      } else {
        url = 'my/delCollect';
      }
    } else {
      if (from === 'collect' || from === 'focus') {
        url = 'my/delMyAttention';
      } else {
        url = 'my/delAttention';
      }
    }
    modal.show(<Loading />, 'loading');
    let res = await $api[url](params);
    if (res.resultData) {
      this.setState({
        isTrue: false,
      });
    }
    modal.showToast(res.message);
    this.props.handleStar && this.props.handleStar();
  };
  handleCollect = async () => {
    let {data, type, from} = this.props;
    let params = {
      type: type,
      newsById: data.id,
    };
    modal.show(<Loading />, 'loading');
    let res = await $api['my/addCollect'](params);
    if (res.resultData) {
      this.setState({
        isTrue: true,
      });
    }
    modal.showToast(res.message);
    this.props.handleStar && this.props.handleStar();
  };
  handleAttention = async () => {
    let {data, type, from} = this.props;
    let params = {
      type: type,
      newsById: type === 1 ? data.lotteryCategoryById : data.id,
    };
    modal.show(<Loading />, 'loading');
    let res = await $api['my/addAttention'](params);
    if (res.resultData) {
      this.setState({
        isTrue: true,
      });
    }
    modal.showToast(res.message);
    this.props.handleStar && this.props.handleStar();
  };
}
const style = StyleSheet.create({
  wrap: {},
  modalWrap: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: transformSize(524),
    paddingHorizontal: transformSize(36),
    borderRadius: transformSize(8),
  },
  modalTitle: {
    fontSize: transformSize(28),
    color: '#203046',
    fontWeight: 'bold',
    marginTop: transformSize(32),
  },
  modalLabel: {
    fontSize: transformSize(28),
    color: '#203046',
    fontWeight: 'normal',
    marginTop: transformSize(32),
  },
  modalInputWrap: {
    marginTop: transformSize(48),
    width: transformSize(452),
    height: transformSize(92),
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: transformSize(34),
    marginBottom: transformSize(58),
  },
  modalInput: {},
  modalBtnWrap: {
    marginBottom: transformSize(38),
    marginTop: transformSize(34),
    width: transformSize(454),
    height: transformSize(64),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  btnWrap: {
    width: transformSize(218),
    height: transformSize(64),
    borderRadius: transformSize(8),
    backgroundColor: '#DA1B2A',
  },
  btn: {
    fontSize: transformSize(32),
    color: '#fff',
    fontWeight: 'bold',
  },
});
