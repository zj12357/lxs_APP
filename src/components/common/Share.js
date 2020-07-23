import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle, ymodal} from '@/utils';
import {Touchable, Icon, Button} from 'ui';
export default class Share extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={style.wrap}>
        <View style={style.shareWrap}>
          <Text>正在开发中</Text>
          {/* <Button
            icon="weixin"
            iconSize={16}
            title="分享到微信"
            style={style.btnWrap}
            textStyle={style.btn}
          />
          <Button
            icon="weixin"
            iconSize={16}
            title="分享到微信"
            style={style.btnWrap}
            textStyle={style.btn}
          />
          <Button
            icon="weixin"
            iconSize={16}
            title="分享到微信"
            style={style.btnWrap}
            textStyle={style.btn}
          />
          <Button
            icon="weixin"
            iconSize={16}
            title="分享到微信"
            style={style.btnWrap}
            textStyle={style.btn}
          /> */}
        </View>
        <Button title="取消" onPress={ymodal.close} />
      </View>
    );
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    marginBottom: transformSize(50),
  },
  shareWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: transformSize(180),
    alignItems: 'center',
  },
  btnWrap: {
    height: transformSize(100),
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
});
