import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon, Button} from 'ui';
export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {isSuccess, mes} = this.props;
    let image = isSuccess
      ? require('@/assets/images/common/cg.png')
      : require('@/assets/images/common/sb.png');
    let msg = isSuccess ? '预计60分钟完成审核' : mes;
    return (
      <View style={style.mesWrap}>
        <Image style={style.mesImg} source={image} />
        <Text style={style.mesTitle}>申请失败</Text>
        <Text style={style.mesLabel}>{msg}</Text>

        <View style={style.modalBtnWrap}>
          <Button
            style={style.confirmWrap}
            textStyle={style.confirm}
            onPress={this.props.confirm}
            title="确定"
          />
        </View>
      </View>
    );
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({
  wrap: {},
  mesWrap: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: transformSize(540),
    borderRadius: transformSize(20),
    position: 'relative',
  },
  mesImg: {
    width: transformSize(176),
    height: transformSize(170),
    position: 'absolute',
    top: -transformSize(85),
    left: transformSize(176),
  },
  mesTitle: {
    fontSize: transformSize(68),

    color: '#EC3939',
    fontWeight: 'bold',
    marginTop: transformSize(100),
  },

  mesLabel: {
    fontSize: transformSize(40),
    paddingHorizontal: transformSize(30),
    color: '#203046',
    textAlign: 'center',
    lineHeight: transformSize(40),
    marginTop: transformSize(60),
  },
  modalBtnWrap: {
    marginTop: transformSize(90),
    marginBottom: transformSize(42),
    width: transformSize(474),
    height: transformSize(84),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  confirmWrap: {
    width: transformSize(474),
    height: transformSize(84),
    borderRadius: transformSize(8),
    backgroundColor: '#203046',
  },
  confirm: {
    fontSize: transformSize(32),
    color: '#fff',
    fontWeight: 'bold',
  },
});
