import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TextInput, FlatList} from 'react-native';
import {transformSize, commonStyle, modal, SCREEN_WIDTH, $api} from '@/utils';
import {Button, Loading} from 'ui';
import LinearGradient from 'react-native-linear-gradient';
import Title from '../../components/common/Title';
import {YaboItem} from './components';
export default class AboutYabo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isContact: false,
      list: [0, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    };
  }
  static navigationOptions = () => ({
    title: '关联亚博账号',
  });
  render() {
    let {isContact} = this.state;
    return (
      <View style={style.aboutYabo}>
        {isContact ? (
          <FlatList
            style={style.flatist}
            data={this.state.list}
            renderItem={() => <YaboItem />}
            ListHeaderComponent={this.renderHeader}
          />
        ) : (
          <View style={style.wrap}>
            <Image
              source={require('@/assets/images/my/aboutYabo/logo.png')}
              style={style.img}
            />
            <LinearGradient
              colors={['#475C78', '#203046']}
              style={style.linear}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Button
                style={style.btnWrap}
                textStyle={style.btn}
                title="立即关联"
                onPress={this.handleContact}
              />
            </LinearGradient>
          </View>
        )}
      </View>
    );
  }
  componentDidMount = async () => {};
  renderHeader = () => {
    return (
      <View style={style.titleWrap}>
        <Image
          source={require('@/assets/images/my/aboutYabo/logoC.png')}
          style={style.img}
        />
        <Title title="活动彩金记录" right={false} style={style.title} />
      </View>
    );
  };

  handleContact = () => {
    let MyComponent = (
      <View style={style.modalWrap}>
        <Text style={style.modalTitle}>关联亚博账号</Text>
        <View style={style.modalInputWrap}>
          <TextInput
            placeholderTextColor={commonStyle.colorTheme.tag}
            placeholder="请输入亚博账号"
            style={style.modalInput}
            onChangeText={text => {
              this.setState({contact: text});
            }}
            value={this.state.contact}
          />
        </View>
        <View style={style.modalBtnWrap}>
          <Button
            style={style.cancelWrap}
            textStyle={style.cancel}
            onPress={this.cancel}
            title="取消"
          />
          <Button
            style={style.confirmWrap}
            textStyle={style.confirm}
            onPress={this.contactConfirm}
            title="确定"
          />
        </View>
      </View>
    );
    modal.show(MyComponent, 'center');
  };
  cancel = () => {
    modal.close();
  };
  contactConfirm = async () => {
    if (!this.state.contact) {
      modal.showToast('请输入账号');
      return;
    }

    let MyComponent = (
      <View style={style.mesWrap}>
        <Image
          style={style.mesImg}
          source={require('@/assets/images/common/cg.png')}
        />
        <Text style={style.mesTitle}>关联申请已提交</Text>

        <View style={style.mesLabelWrap}>
          <Text style={style.mesLabel}>将在一小时内完成审核，</Text>
          <Text style={style.mesLabel}>审核结果短信通知</Text>
          <Text style={style.mesLabel}>请耐心等待...</Text>
        </View>
        <View style={style.modalBtnWrap}>
          <Button
            style={style.cancelWrap}
            textStyle={style.cancel}
            onPress={this.cancel}
            title="取消"
          />
          <Button
            style={style.confirmWrap}
            textStyle={style.confirm}
            onPress={() => this.confirm()}
            title="确定"
          />
        </View>
      </View>
    );
    let params = {
      name: this.state.contact,
      type: 'Yabo',
    };
    modal.show(<Loading />, 'loading');
    let res = await $api['user/link'](params);
    if (!res.resultData) {
      modal.showToast(res.message);
      return;
    }
    modal.show(MyComponent, 'center');
  };
  confirm = () => {
    this.setState({
      isContact: true,
    });
    modal.close();
  };
}

const style = StyleSheet.create({
  aboutYabo: {
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  wrap: {
    alignItems: 'center',
    marginTop: transformSize(28),
  },
  titleWrap: {
    alignItems: 'center',
    marginTop: transformSize(28),
    width: SCREEN_WIDTH,
  },
  title: {
    paddingHorizontal: transformSize(30),
    alignSelf: 'flex-start',
    marginTop: transformSize(20),
  },
  flatlist: {},
  img: {
    width: transformSize(420),
    height: transformSize(210),
  },
  linear: {
    marginTop: transformSize(68),
  },
  btnWrap: {
    width: transformSize(688),
    height: transformSize(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    fontSize: transformSize(28),
    color: '#fff',
    fontWeight: 'bold',
  },
  modalWrap: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: transformSize(524),
    borderRadius: transformSize(8),
  },
  modalTitle: {
    fontSize: transformSize(32),
    color: '#203046',
    fontWeight: 'bold',
    marginTop: transformSize(36),
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
    marginBottom: transformSize(42),
    width: transformSize(452),
    height: transformSize(64),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cancelWrap: {
    width: transformSize(196),
    height: transformSize(64),
    borderRadius: transformSize(8),
    borderColor: '#203046',
    borderWidth: transformSize(2),
  },
  cancel: {
    fontSize: transformSize(32),
    color: '#203046',
    fontWeight: 'bold',
  },
  confirmWrap: {
    width: transformSize(196),
    height: transformSize(64),
    borderRadius: transformSize(8),
    backgroundColor: '#DA1B2A',
  },
  confirm: {
    fontSize: transformSize(32),
    color: '#fff',
    fontWeight: 'bold',
  },
  mesWrap: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: transformSize(524),
    borderRadius: transformSize(8),
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
    fontSize: transformSize(32),
    color: '#203046',
    fontWeight: 'bold',
    marginTop: transformSize(95),
  },
  mesLabelWrap: {
    marginTop: transformSize(44),
    marginBottom: transformSize(46),
  },
  mesLabel: {
    fontSize: transformSize(28),
    color: '#666666',
    textAlign: 'center',
    lineHeight: transformSize(40),
  },
});
