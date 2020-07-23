import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon} from 'ui';
export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[style.title, this.props.style]}>
        <View style={style.leftWrap}>
          <Icon name="bt" size={15} color="#203046" />
          <Text
            style={[style.titleText, {color: commonStyle.colorTheme.title}]}>
            {this.props.title}
          </Text>
        </View>

        {this.props.right ? (
          <Touchable style={style.rightWrap} onPress={this.goToPage}>
            <Text
              style={[style.labelText, {color: commonStyle.colorTheme.label}]}>
              查看更多
            </Text>

            <Icon name="jt" size={12} color="#203046" />
          </Touchable>
        ) : null}
      </View>
    );
  }
  componentDidMount = async () => {};
  goToPage = () => {
    this.props.goToPage && this.props.goToPage();
  };
}
const style = StyleSheet.create({
  title: {
    height: transformSize(80),
    marginBottom: transformSize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rightWrap: {
    height: transformSize(80),
    width: transformSize(250),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    marginLeft: transformSize(20),
    fontSize: transformSize(36),
  },
  labelText: {
    fontSize: transformSize(24),
    color: '#203046',
  },
});
