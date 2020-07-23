import React from 'react';

import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {commonStyle} from '@/utils';

export default class EndTip extends React.Component {
  render() {
    const tipText = this.props.visible ? '没有更多了' : '加载中';
    return (
      <View
        style={[styles.endTipContainer]}
        ref={element => (this.endTip = element)}>
        {this.props.visible ? null : (
          <ActivityIndicator style={styles.endTipIcon} />
        )}
        <Text style={styles.endTipText}>{tipText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  endTipContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  endTipIcon: {
    marginRight: 10,
  },
  endTipText: {
    textAlign: 'center',
    color: '#999',
  },
});
