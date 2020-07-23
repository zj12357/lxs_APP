import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon} from 'ui';
import LinearGradient from 'react-native-linear-gradient';
export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[style.tabs, this.props.style]}>
        {this.props.tabs.map((tab, i) => {
          return (
            <Touchable
              key={tab}
              onPress={() => this.props.goToPage(i)}
              style={style.tab}>
              <View style={style.tabWrap}>
                <Text
                  style={[
                    style.tabText,
                    this.props.activeTab === i ? style.activeText : null,
                  ]}>
                  {tab}
                </Text>
                {this.props.activeTab === i ? (
                  <View style={style.active} />
                ) : null}
              </View>
            </Touchable>
          );
        })}
      </View>
    );
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: transformSize(80),

    backgroundColor: '#fff',
  },
  tab: {
    height: '100%',
    paddingHorizontal: transformSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabWrap: {
    position: 'relative',
  },
  tabText: {
    fontSize: transformSize(28),
    color: '#203046',
  },
  activeText: {
    fontWeight: 'bold',
  },
  active: {
    position: 'absolute',
    left: '50%',
    transform: [
      {
        translateX: -transformSize(19),
      },
    ],
    bottom: -transformSize(12),
    width: transformSize(38),
    height: transformSize(6),
    backgroundColor: '#DA1B2A',
  },
});
