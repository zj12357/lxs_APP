import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, ActionSheet} from 'ui';
import {SetDefault, SetUpload} from '../components';

export default class Security extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          label: '修改登录密码',
          key: 'password',
          type: 'link',
          showValue: false,
          route: 'updatePwd',
          moreIcon: true,
          border: true,
        },
        {
          label: '更换绑定手机号',
          key: 'mobile',
          type: 'link',
          showValue: false,
          route: 'updatePhone',
          moreIcon: true,
          border: true,
        },
        {
          label: '重置登录密码',
          key: 'password',
          type: 'link',
          border: false,
          showValue: false,
          moreIcon: true,

          route: 'resetPwd',
        },
      ],
    };
  }
  static navigationOptions = ({navigation, screenProps}) => ({
    title: '安全中心',
  });

  render() {
    return (
      <View style={[style.mySet]}>
        <View style={style.wrap}>
          {this.state.data.map((item, index) => {
            return (
              <SetDefault data={item} key={index} style={style.itemWrap} />
            );
          })}
        </View>
      </View>
    );
  }
  componentDidMount = async () => {};
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
  itemWrap: {
    paddingTop: transformSize(34),
  },
});
