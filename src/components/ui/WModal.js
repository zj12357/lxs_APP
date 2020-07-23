// 可传入业务组件或节点
// 通过ref的挂载调用show方法，参数为业务组件或节点

import React, {Component} from 'react';
import {
  Modal,
  Text,
  View,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {height} = Dimensions.get('window');
import {commonStyle} from '@/utils';
export default class WModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      component: null,
      type: 'center',
      num: 2,
      panelHeight: 0,
    };
    // this.panelHeight = 0;
  }
  show(newprops, type) {
    // alert(1)
    this.setState({
      component: newprops,
      type: type,
      modalVisible: true,
    });
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
  showToast(newprops, func) {
    this.setState({
      component: newprops,
      type: 'toast',
      modalVisible: true,
    });
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.close();
      if (func) {
        func();
      }
    }, 2000);
  }
  close = async () => {
    this.setState({
      modalVisible: false,
    });
  };
  setNum = myNum => {
    this.setState({
      num: myNum,
    });
  };
  render() {
    let {modalVisible, component, type, ...props} = this.state;
    let centerTop = (height - this.state.panelHeight) / this.state.num;
    const maskStyle = [
      style.mask,
      commonStyle.colorTheme.dark
        ? {backgroundColor: 'rgba(100, 100, 100, 0.7)'}
        : {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
    ];
    let strategy = {
      center: 'panel_center',
      centerNo: 'panel_center',
      toast: 'panel_Toast',
      loading: 'panel_Toast',
    };
    const panelStyle = [
      style[strategy[type]],

      type === 'center' || type === 'centerNo' ? {top: centerTop} : null,
    ];
    return (
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={this.state.modalVisible}
        onRequestClose={this.close}
        {...props}>
        <Text
          style={
            this.state.type === 'center' || this.state.type === 'centerNo'
              ? maskStyle
              : {flex: 1}
          }
          onPress={() => {
            if (this.state.type === 'centerNo') {
              return;
            }
            this.close();
          }}
        />

        <View style={panelStyle} onLayout={this.handlePanelLayout}>
          {type === 'toast' ? (
            <View
              style={{
                padding: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: 10,
              }}>
              <Text style={{color: '#fff'}}>{component}</Text>
            </View>
          ) : (
            component
          )}
        </View>
      </Modal>
    );
  }
  handlePanelLayout = e => {
    this.setState({
      panelHeight: e.nativeEvent.layout.height,
    });
  };
}

const style = StyleSheet.create({
  mask: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
  },
  panel_center: {
    position: 'absolute',
    left: 0,
    right: 0,
    // top: centerHeight,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  panel_Toast: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '40%',

    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
