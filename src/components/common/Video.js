'use strict';
import React, {Component} from 'react';

import {
  AlertIOS,
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'ui';
import Video, {FilterType} from 'react-native-video';

const filterTypes = [
  FilterType.NONE,
  FilterType.INVERT,
  FilterType.MONOCHROME,
  FilterType.POSTERIZE,
  FilterType.FALSE,
  FilterType.MAXIMUMCOMPONENT,
  FilterType.MINIMUMCOMPONENT,
  FilterType.CHROME,
  FilterType.FADE,
  FilterType.INSTANT,
  FilterType.MONO,
  FilterType.NOIR,
  FilterType.PROCESS,
  FilterType.TONAL,
  FilterType.TRANSFER,
  FilterType.SEPIA,
];

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onBuffer = this.onBuffer.bind(this);
  }
  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    controls: true,
    paused: true,
    skin: 'custom',
    ignoreSilentSwitch: 'obey',
    mixWithOthers: null,
    isBuffering: false,
    filter: FilterType.NONE,
    filterEnabled: true,
  };

  onLoad(data) {
    console.log('On load fired!');
    this.setState({duration: data.duration});
  }

  onProgress(data) {
    this.setState({currentTime: data.currentTime});
  }

  onBuffer({isBuffering}) {
    this.setState({isBuffering});
  }

  renderCustomSkin() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.fullScreen}
          onPress={() => {
            this.setState({paused: !this.state.paused});
          }}>
          <Video
            source={require('@/assets/video/tt.mov')}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            ignoreSilentSwitch={this.state.ignoreSilentSwitch}
            mixWithOthers={this.state.mixWithOthers}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onBuffer={this.onBuffer}
            onProgress={this.onProgress}
            onEnd={() => {
              AlertIOS.alert('Done!');
            }}
            repeat={true}
            filter={this.state.filter}
            filterEnabled={this.state.filterEnabled}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderNativeSkin() {
    const videoStyle =
      this.state.skin == 'embed'
        ? styles.nativeVideoControls
        : styles.fullScreen;

    let {url} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.fullScreen}>
          <Button
            style={styles.btnWrap}
            textStyle={styles.btn}
            icon="back"
            iconColor="#ededed"
            iconSize={16}
            onPress={this.props.goBack}
          />
          <Video
            source={url ? {uri: url} : require('@/assets/video/tt.mov')}
            style={videoStyle}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            ignoreSilentSwitch={this.state.ignoreSilentSwitch}
            mixWithOthers={this.state.mixWithOthers}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onBuffer={this.onBuffer}
            onProgress={this.onProgress}
            onEnd={() => {
              AlertIOS.alert('Done!');
            }}
            repeat={true}
            controls={this.state.controls}
            filter={this.state.filter}
            filterEnabled={this.state.filterEnabled}
          />
        </View>
      </View>
    );
  }

  render() {
    return this.state.controls
      ? this.renderNativeSkin()
      : this.renderCustomSkin();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  skinControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ignoreSilentSwitchControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mixWithOthersControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  nativeVideoControls: {
    top: 184,
    height: 300,
  },
  btnWrap: {
    backgroundColor: 'rgba(100,100,100,.7)',
    width: 40,
    height: 30,
    zIndex: 100,
    borderRadius: 5,
    position: 'absolute',
    bottom: 40,
    left: 10,
  },
  btn: {},
});
