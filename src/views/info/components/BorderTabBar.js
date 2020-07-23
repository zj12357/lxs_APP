import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon} from 'ui';
export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {tabLabel, active} = this.props;
    return (
      <View style={style.tabWrap}>
        {tabLabel.map((item, index) => {
          return (
            <Touchable
              onPress={() => this.changeTab(index)}
              key={index}
              style={[
                style.tabItem,
                active === index ? style.activeTabItem : null,
                index === 2 ? {borderRightWidth: 0} : null,
              ]}>
              <Text
                style={[style.tab, active === index ? style.activeTab : null]}>
                {item}
              </Text>
            </Touchable>
          );
        })}
      </View>
    );
  }
  componentDidMount = async () => {};
  changeTab = index => {
    this.props.changeTab && this.props.changeTab(index);
  };
}
const style = StyleSheet.create({
  tabWrap: {
    marginTop: transformSize(34),
    marginHorizontal: transformSize(20),
    borderColor: '#DA1B2A',
    borderWidth: transformSize(2),
    flexDirection: 'row',
    borderRadius: transformSize(8),
  },
  tabItem: {
    flex: 1,
    height: transformSize(62),
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#DA1B2A',
    borderRightWidth: transformSize(2),
  },

  activeTabItem: {
    backgroundColor: '#DA1B2A',
  },
  tab: {
    color: '#DA1B2A',
    fontSize: transformSize(30),
    fontWeight: 'bold',
  },
  activeTab: {
    color: '#fff',
  },
});
