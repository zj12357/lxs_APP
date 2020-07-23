import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon} from 'ui';
export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    iconName: 'notice',
    iconSize: transformSize(24),
    iconColor: commonStyle.colorTheme.color_theme,
    title: '名称',
    textStyle: {},
    style: {},
  };
  render() {
    let {right} = this.props;
    return (
      <Touchable style={[style.wrap, this.props.style]}>
        {right ? null : (
          <Icon
            name={this.props.icon}
            color={this.props.iconColor}
            size={this.props.iconSize}
          />
        )}
        <Text style={[style.text, this.props.textStyle]}>
          {this.props.title}
        </Text>
        {right ? (
          <Icon
            name={this.props.icon}
            color={this.props.iconColor}
            size={this.props.iconSize}
          />
        ) : null}
      </Touchable>
    );
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: transformSize(24),
    color: '#999',
    marginLeft: transformSize(10),
  },
});
