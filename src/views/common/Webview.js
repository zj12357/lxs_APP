import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {Message, Touchable} from 'ui';

import {connect} from 'react-redux';
import {transformSize, commonStyle} from '@/utils';
import PropTypes from 'prop-types';
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {};
class WebViewScreen extends Component {
  static navigationOptions = ({navigation}) => {
    let {params} = navigation.state;
    let title = params.title;

    return {
      headerTitle: title,
    };
  };

  constructor(props) {
    super(props);
    let {url} = props.navigation.state.params;
    this.state = {
      title: '载入中...',
      url,

      session_id: '',
    };
    this.props.navigation.setParams({
      title: this.state.title,
    });
  }

  render() {
    let {method} = this.props.navigation.state.params;

    let source = {
      uri: this.state.url,
    };
    if (method) {
      source.method = 'GET';
    }
    // if (params) {
    //   source.body = JSON.stringify(params);
    // }
    console.log('fasd', source);
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: commonStyle.colorTheme.pageBg}}>
        <WebView
          source={source}
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
      </SafeAreaView>
    );
  }
  componentDidMount = async () => {
    this.setState({});
  };

  handleLoadStart = () => {};

  handleNavigationStateChange = e => {
    this.canGoBack = e.canGoBack;
    this.canGoForward = e.canGoForward;
    this.setState({title: e.title});
    this.props.navigation.setParams({
      title: e.title || '',
    });
  };
}
const style = StyleSheet.create({
  indicator: {
    marginTop: transformSize(100),
  },
  loadWrap: {
    position: 'absolute',
    width: transformSize(750),
    top: 0,
    left: 0,
  },
  loadText: {
    fontSize: transformSize(28),
    color: commonStyle.color_blue,
    marginTop: transformSize(40),
    alignSelf: 'center',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: transformSize(40),
    height: transformSize(80),
    backgroundColor: commonStyle.color_theme,
    borderBottomWidth: transformSize(1),
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: transformSize(28),
    color: '#fff',
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WebViewScreen);
