import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Button} from 'ui';

export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[style.tabs, this.props.style]}>
        {this.props.leftIcon ? (
          <Button
            icon="back"
            iconSize={18}
            iconColor="#666"
            style={style.iconBack}
            onPress={this.props.clickLeftIcon}
          />
        ) : null}
        {this.props.tabs.map((tab, i) => {
          let isActive = this.props.activeTab === i;
          return (
            <Touchable
              key={tab}
              onPress={() => this.props.goToPage(i)}
              style={style.tab}>
              <View style={style.tabWrap}>
                <Text
                  style={[
                    style.tabText,
                    isActive ? style.tabTextActive : null,
                  ]}>
                  {tab}
                </Text>
                {isActive ? (
                  <Image
                    source={require('@/assets/images/info/activeTab.png')}
                    style={style.active}
                  />
                ) : null}
              </View>
            </Touchable>
          );
        })}
        {this.props.rightIcon ? (
          <Button
            icon={this.props.rightIcon}
            iconSize={18}
            iconColor="#666"
            style={style.iconRight}
            onPress={this.props.clickRightIcon}
          />
        ) : null}
      </View>
    );
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginBottom: transformSize(16),
    paddingTop: transformSize(70),
    paddingHorizontal: transformSize(20),
    height: transformSize(160),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  iconBack: {
    position: 'absolute',
    bottom: transformSize(15),
    left: 0,
    zIndex: 1,
    width: transformSize(80),
    height: transformSize(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRight: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1,
    width: transformSize(80),
    height: transformSize(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabWrap: {
    position: 'relative',
  },
  tabText: {
    fontSize: transformSize(30),
    color: '#203046',
    fontWeight: 'bold',
  },
  tabTextActive: {
    fontSize: transformSize(36),
  },
  active: {
    position: 'absolute',

    left: -transformSize(26),
    bottom: -transformSize(4),
    width: transformSize(124),
    height: transformSize(24),
  },
});
