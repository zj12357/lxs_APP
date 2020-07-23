import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

import {transformSize, commonStyle, modal, moment} from '@/utils';
import {Icon, Touchable, DatePicker} from 'ui';
import {withNavigation} from 'react-navigation';
import SetDialog from './SetDialog';
import $api from '@/config/api';
@withNavigation
export default class SetInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }
  static defaultProps = {
    moreIcon: true,
    border: true,
    showValue: true,
  };
  render() {
    let {data, userInfo} = this.props;
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

          <DatePicker
            ref={r => (this.datePicker = r)}
            locale="zh-Hans"
            style={style.value}
            date={this.state.date}
            showIcon={false}
            mode="date"
            placeholder={moment(userInfo[data.key]).format('YYYY-MM-DD')}
            format="YYYY-MM-DD"
            minDate="1970-01-01"
            maxDate="2021-12-31"
            confirmBtnText="确定"
            cancelBtnText="取消"
            customStyles={{
              dateInput: {borderWidth: 0, alignItems: 'flex-end'},
            }}
            onDateChange={date => {
              this.confirm(date);
            }}
          />
        </Touchable>
      </View>
    );
  }
  componentDidMount = async () => {};
  clickItem = () => {
    this.datePicker.onPressDate();
  };

  confirm = mes => {
    this.setState({date: mes});
    console.log(mes);
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
  },

  label: {color: '#333', fontSize: transformSize(28), fontWeight: 'bold'},
  value: {
    flex: 1,
    textAlign: 'right',
    justifyContent: 'flex-end',
    fontSize: transformSize(28),
  },
  icon: {marginLeft: transformSize(10)},
  border: {
    borderBottomColor: '#ccc',
    borderBottomWidth: transformSize(1),
  },
});
