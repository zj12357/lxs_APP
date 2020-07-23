import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Button} from 'ui';
import {WebView} from 'react-native-webview';
export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({navigation, screenProps}) => ({
    title: '在线反馈',
  });
  static defaultProps = {
    goBack: false,
  };
  render() {
    let url = this.props.url || 'https://www.163.com/';
    return (
      <View style={style.wrap}>
        {this.props.goBack ? (
          <Button
            style={style.btnWrap}
            textStyle={style.btn}
            icon="back"
            iconColor="#ededed"
            iconSize={16}
            onPress={this.props.goBack}
          />
        ) : null}
        <WebView
          source={{uri: url}}
          // onLoadStart={this.handleLoadStart}
          onNavigationStateChange={this.handleNavigationStateChange}
          ref={ref => {
            this._webView = ref;
          }}
          javaScriptEnabled={true}
          allowUniversalAccessFromFileURLs
          allowFileAccess
          useWebKit={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          // onLoad={this.handleLoadEnd}
          // for android: WebView应该允许https页面中加载非安全http的内容
          mixedContentMode={'always'}
          // nativeConfig={{ props: { backgroundColor: commonStyle.colorTheme.pageBg, flex: 1 } }}
        />
      </View>
    );
  }
  componentDidMount = async () => {};
  handleNavigationStateChange = () => {};
}
const style = StyleSheet.create({
  wrap: {
    position: 'relative',
    flex: 1,
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
