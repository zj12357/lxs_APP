import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle, modal} from '@/utils';
import {Touchable, ActionSheet, Loading} from 'ui';
import {SetDefault, SetUpload, SetTime} from './components';
import $api from '@/config/api';
import {connect} from 'react-redux';

import {commitUserInfo, commitToken, getUserInfo} from '@/store/actions';
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = {
  commitUserInfo,
  commitToken,
  getUserInfo,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          label: '头像',
          key: 'img',
          type: 'upload',
          border: true,
        },
        {
          label: '昵称',
          key: 'alias',
          type: 'input',
          border: true,
          moreIcon: false,
        },

        {
          label: '性别',
          key: 'gender',
          type: 'action',
          border: true,
          action: ['取消', '男', '女'],
          moreIcon: true,
        },
        {
          label: '生日',
          key: 'birthday',
          type: 'input',
          border: true,
          moreIcon: true,
        },

        {
          label: '地址',
          key: 'userRegion',
          type: 'input',
          border: false,
          moreIcon: false,
        },
      ],
      actionOptions: [],
    };
  }
  static navigationOptions = () => {
    return {
      title: '基本资料',
    };
  };
  render() {
    let {data} = this.state;

    return (
      <View style={[style.mySet]}>
        <View style={style.wrap}>
          <SetUpload
            data={data[0]}
            userInfo={this.props.userInfo}
            afterHandle={this.afterHandle}
            _updateInfo={mes => this._updateInfo(mes, data[0])}
          />
          <SetDefault
            data={data[1]}
            userInfo={this.props.userInfo}
            afterHandle={this.afterHandle}
            _updateInfo={mes => this._updateInfo(mes, data[1])}
          />
          <SetDefault
            data={data[2]}
            userInfo={this.props.userInfo}
            afterHandle={this.afterHandle}
            _updateInfo={mes => this._updateInfo(mes, data[2])}
            clickAction={() => this.clickAction(data[2])}
          />
          <SetTime
            data={data[3]}
            userInfo={this.props.userInfo}
            afterHandle={this.afterHandle}
            _updateInfo={mes => this._updateInfo(mes, data[3])}
          />
          <SetDefault
            data={data[4]}
            userInfo={this.props.userInfo}
            afterHandle={this.afterHandle}
            _updateInfo={mes => this._updateInfo(mes, data[4])}
          />
        </View>
        <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
          title={'请设置性别'}
          options={this.state.actionOptions}
          cancelButtonIndex={0}
          destructiveButtonIndex={3}
          onPress={this.handleActionPress}
        />
      </View>
    );
  }
  componentDidMount = async () => {};
  afterHandle = () => {
    this.props.getUserInfo();
  };
  clickAction = item => {
    this.setState(
      {
        actionOptions: item.action,
      },
      () => {
        this.ActionSheet.show();
      },
    );
  };
  handleActionPress = v => {
    let mes = this.state.actionOptions[v] === '男' ? true : false;

    this._updateInfo(mes, this.state.data[2]);
  };
  _updateInfo = async (mes, item) => {
    let {userInfo} = this.props;
    let params = {
      id: userInfo.id,
    };
    params[item.key] = mes;
    modal.show(<Loading />, 'loading');
    let res = await $api['user/updateInfo'](params);

    if (res.resultData) {
      this.afterHandle();
      modal.close();
    } else {
      modal.showToast(res.message);
    }
  };
}
const style = StyleSheet.create({
  mySet: {flex: 1, backgroundColor: '#f0f0f0'},
  wrap: {
    marginHorizontal: transformSize(32),
    marginTop: transformSize(24),
    backgroundColor: '#fff',
    paddingHorizontal: transformSize(24),
    borderRadius: transformSize(20),
  },
  border: {
    width: '100%',
    height: transformSize(10),
  },
});
