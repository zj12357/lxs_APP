import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {transformSize} from '@/utils';
import {Icon, Touchable} from 'ui';
export default class HomeHeader extends Component {
  constructor(props) {
    super(props);
  }

  renderIcon() {
    let {icon, iconColor, iconSize} = this.props;

    if (icon) {
      return (
        <Icon name={icon} disabled={true} color={iconColor} size={iconSize} />
      );
    } else {
      return null;
    }
  }

  static defaultProps = {
    textStyle: {
      fontSize: transformSize(28),
      color: '#333',
      marginVertical: 0,
    },
    style: {},

    isIconRight: false,
    renderIcon: null,
  };

  render() {
    const title = this.props.title;
    const style = this.props.style;
    const onPress = this.props.onPress;
    const isIconRight = this.props.isIconRight;

    const renderIcon = this.props.renderIcon;

    return onPress ? (
      <Touchable
        {...this.props}
        style={[styles.main, style]}
        onPress={this.props.onPress}
        activeOpacity={0.8}>
        {isIconRight ? null : renderIcon ? renderIcon() : this.renderIcon()}
        <Text style={this.props.textStyle}>{title}</Text>
        {isIconRight ? (renderIcon ? renderIcon() : this.renderIcon()) : null}
      </Touchable>
    ) : (
      <View
        {...this.props}
        style={[styles.main, style]}
        onPress={this.props.onPress}
        activeOpacity={0.8}>
        {isIconRight ? null : renderIcon ? renderIcon() : this.renderIcon()}
        <Text style={this.props.textStyle}>{title}</Text>
        {isIconRight ? (renderIcon ? renderIcon() : this.renderIcon()) : null}
      </View>
    );
  }

  componentDidMount() {}

  handlePressIn() {
    this.setState({
      pressing: true,
    });
  }

  handlePressOut() {
    this.setState({
      pressing: false,
    });
  }

  state = {
    pressing: false,
  };
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
