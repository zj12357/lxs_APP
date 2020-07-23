import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon} from 'ui';
export default class Cell extends Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    labelStyle: {
      fontSize: transformSize(32),
      color: commonStyle.colorTheme.title,
      fontWeight: 'bold',
    },
    titleStyle: {
      fontSize: transformSize(32),
      flex: 1,
      textAlign: 'right',
      flexWrap: 'wrap',
      color: commonStyle.colorTheme.label,
    },
    border: true,
  };
  render() {
    let {border} = this.props;
    return (
      <Touchable
        onPress={this.props.onPress}
        style={[
          style.wrap,

          border ? {borderBottomColor: commonStyle.colorTheme.border} : null,
        ]}>
        {this.renderLeft()}
        {this.renderRight()}
      </Touchable>
    );
  }
  componentDidMount = async () => {};
  renderLeft = () => {
    let {leftIcon, labelStyle, label} = this.props;
    return (
      <View style={style.left}>
        {leftIcon ? (
          <Icon
            name={leftIcon.name}
            size={leftIcon.size}
            color={leftIcon.color}
            style={{marginRight: transformSize(10)}}
          />
        ) : null}
        <Text style={labelStyle}>{label}</Text>
      </View>
    );
  };
  renderRight = () => {
    let {islink, titleStyle, title} = this.props;
    return (
      <View style={style.right}>
        <Text style={titleStyle}>{title}</Text>
        {islink ? (
          <Icon
            name="jt"
            size={15}
            color={commonStyle.color_theme}
            style={{marginLeft: transformSize(10)}}
          />
        ) : null}
      </View>
    );
  };
}
const style = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: transformSize(90),
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    textAlign: 'right',
  },
});
