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
import {Touchable} from 'ui';
const {height} = Dimensions.get('window');
export default class YModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dark: false,
      forceUse: false,
      modalVisible: false,
      component: null,
      maskOpacity: new Animated.Value(0),
      panelTranslateY: new Animated.Value(0),
      panelHeight: 0,
    };
    // this.panelHeight = 0;
  }
  show(newprops, type, forceUse) {
    // alert(1)
    this.setState({
      component: newprops,
      dark: type,
      modalVisible: true,
      forceUse: forceUse,
    });
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  close = async () => {
    await this.animateOut();
    this.setState({
      modalVisible: false,
    });
  };
  render() {
    let {modalVisible, component, dark, ...props} = this.state;
    let centerTop = (this.state.panelHeight + height) / 2;
    console.log(dark, 'darkdark');
    const maskStyle = [
      style.mask,
      dark
        ? {backgroundColor: 'rgba(100, 100, 100, 0.7)'}
        : {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
      {
        opacity: this.state.maskOpacity,
      },
    ];
    const panelStyle = [
      style.panel_bottom,

      {
        transform: [
          {
            translateY: this.state.panelTranslateY,
          },
        ],
      },
    ];
    return (
      <Modal
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={this.close}
        onShow={this.animateIn}
        {...props}>
        <Animated.Text
          style={maskStyle}
          onPress={() => {
            if (!this.state.forceUse) {
              this.close();
            }
          }}
        />
        <Animated.View onLayout={this.handlePanelLayout} style={panelStyle}>
          {/* {component} */}
          {component}
        </Animated.View>
      </Modal>
    );
  }
  handlePanelLayout = e => {
    this.setState({
      panelHeight: e.nativeEvent.layout.height,
    });
  };
  createAnimation = (variable, value) => {
    return Animated.timing(variable, {
      toValue: value,
      duration: 250,
      useNativeDriver: true,
    });
  };

  animateIn = () => {
    Animated.parallel([
      this.createAnimation(this.state.maskOpacity, 1),
      this.createAnimation(this.state.panelTranslateY, -this.state.panelHeight),
    ]).start();
  };

  animateOut = () => {
    return new Promise((resolve, reject) => {
      Animated.parallel([
        this.createAnimation(this.state.maskOpacity, 0),
        this.createAnimation(this.state.panelTranslateY, 0),
      ]).start(resolve);
    });
  };
}

const style = StyleSheet.create({
  mask: {
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
  },
  panel_bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '100%',
    backgroundColor: 'white',
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
    top: '80%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  panel_Share: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '100%',
  },
});
