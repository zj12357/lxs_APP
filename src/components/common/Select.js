import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle, modal} from '@/utils';
import {Button, ActionSheet} from 'ui';
export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let actionOptions = ['取消', ...this.props.actionOptions];
    return (
      <View style={[style.wrap, this.props.style]}>
        <Button
          style={[style.iconTextWrap, this.props.btnStyle]}
          textStyle={[style.iconText, this.props.textStyle]}
          title={this.props.label}
          isIconRight
          icon="xl"
          iconColor={this.props.iconColor || '#203046'}
          iconSize={8}
          onPress={this.handleAction}
        />
        <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
          title={this.props.actionTitle}
          options={actionOptions}
          cancelButtonIndex={0}
          destructiveButtonIndex={this.props.destructive}
          onPress={this.handleActionPress}
        />
      </View>
    );
  }
  componentDidMount = async () => {};
  handleAction = () => {
    if (!this.props.actionOptions.length) {
      modal.showToast('没有选项数据');
      return;
    }
    this.ActionSheet.show();
  };
  handleActionPress = v => {
    if (!v) {
      return;
    }
    let data = this.props.actionOptions[v - 1];
    this.props.actionConfirm(data, v - 1);
  };
}
const style = StyleSheet.create({
  wrap: {},
  iconTextWrap: {
    flex: 1,
    height: transformSize(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#203046',
    fontSize: transformSize(28),
    fontWeight: 'bold',
  },
});
