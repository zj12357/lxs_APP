import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

import {transformSize, commonStyle, modal} from '@/utils';
import {Icon, Touchable, Loading} from 'ui';
import {withNavigation} from 'react-navigation';
import SetDialog from './SetDialog';
import $api from '@/config/api';
@withNavigation
export default class SetInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static defaultProps = {};
  render() {
    let {data, userInfo} = this.props;
    console.log(data, 'data');
    return (
      <View style={[data.border ? style.border : null]}>
        <Touchable
          style={[style.content, this.props.style]}
          onPress={() => {
            this.clickItem();
          }}>
          <Text style={[style.label, {color: commonStyle.colorTheme.title}]}>
            {data.label}
          </Text>
          {data.type === 'action' ? (
            <Text style={[style.value, {color: commonStyle.colorTheme.title}]}>
              {userInfo && userInfo.gender ? '男' : '女'}
            </Text>
          ) : (
            <Text style={[style.value, {color: commonStyle.colorTheme.title}]}>
              {userInfo && userInfo[data.key]}
            </Text>
          )}

          {data.moreIcon ? (
            <Icon
              name="jt"
              size={transformSize(24)}
              color={'#707070'}
              style={style.icon}
            />
          ) : null}
        </Touchable>
      </View>
    );
  }
  componentDidMount = async () => {};
  clickItem = () => {
    let {type, route, params, label, key} = this.props.data;
    if (type === 'action') {
      this.props.clickAction && this.props.clickAction();
    }
    if (type === 'link') {
      this.props.navigation.navigate(route);
    }
    if (type === 'input') {
      modal.show(
        <SetDialog
          title={'请设置' + label}
          placeholder={this.props.userInfo[key]}
          cancel={() => this.closeDialog()}
          confirm={mes => this.confirmDialog(mes)}
        />,
        'center',
      );
    }
  };
  closeDialog = () => {
    modal.close();
  };
  confirmDialog = mes => {
    this.closeDialog();
    this.props._updateInfo && this.props._updateInfo(mes);
  };
  // _updateInfo = async mes => {
  //   let {userInfo} = this.props;
  //   let params = {
  //     id: userInfo.id,
  //   };
  //   params[this.props.data.key] = mes;
  //   modal.show(<Loading />, 'loading');
  //   let res = await $api['user/updateInfo'](params);

  //   if (res.resultData) {
  //     this.props.afterHandle && this.props.afterHandle();
  //     modal.close();
  //   } else {
  //     modal.showToast(res.message);
  //   }
  // };
}
const style = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
    paddingTop: transformSize(24),
    paddingBottom: transformSize(30),
  },

  label: {color: '#333', fontSize: transformSize(28), fontWeight: 'bold'},
  value: {flex: 1, textAlign: 'right', fontSize: transformSize(28)},
  icon: {marginLeft: transformSize(10)},
  border: {
    borderBottomColor: '#ccc',
    borderBottomWidth: transformSize(1),
  },
});
