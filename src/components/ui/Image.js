import React from 'react';
import {Image as ReactNativeImage, StyleSheet} from 'react-native';

import {commonStyle} from '@/utils';

export default class Image extends React.Component {
  static defaultProps = {
    defaultSource: require('@/assets/images/pic_not.png'),
    autoCalcSize: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      hasLoadImage: false,
      finalSource: null,
    };
  }
  initState = () => {
    let hasLoadImage = false;
    let {source, style, defaultSource, autoCalcSize} = this.props;

    if (!defaultSource || typeof source === 'number') {
      hasLoadImage = true;
      return {
        hasLoadImage,
        finalSource: source,
      };
    }
    let finalSource = {...source};

    // finalSource.cache = finalSource.uri.indexOf("http") === 0 && "force-cache";
    if (
      !autoCalcSize ||
      !finalSource.uri ||
      finalSource.uri.indexOf('http') !== 0
    ) {
      return {
        hasLoadImage,
        finalSource,
      };
    }

    let flattenStyle = style;
    if (typeof flattenStyle === 'number') {
      flattenStyle = StyleSheet.flatten(style);
    } else if (Array.isArray(flattenStyle)) {
      flattenStyle = flattenStyle.reduce((total, next) => {
        if (typeof next === 'number') {
          next = StyleSheet.flatten(next);
        }
        return {...total, ...next};
      }, {});
    }

    let width = source.width || flattenStyle.width;
    let height = source.height || flattenStyle.height;
    if (!width && __DEV__) {
      throw `image 必须定义width,source:${JSON.stringify(
        source,
      )},style:${JSON.stringify(flattenStyle)}`;
    }

    width = width || commonStyle.SCREEN_WIDTH;
    height = height || commonStyle.SCREEN_HEIGHT;

    finalSource = {
      ...finalSource,
      width,
      height,
    };
    hasLoadImage = false;
    return {
      hasLoadImage,
      finalSource,
    };
  };
  componentDidMount() {
    let state = this.initState();
    this.setState(state, this.prefetchImage);
  }

  prefetchImage = () => {
    let {finalSource} = this.state;
    if (this.state.hasLoadImage || !finalSource.uri) {
      return;
    }
    this._isMounted = true;
    ReactNativeImage.prefetch(finalSource.uri).then(() => {
      this.setState({
        hasLoadImage: true,
      });
    });
  };

  render() {
    let {
      defaultSource,
      style,
      source,
      resizeMode,
      defaultSourceStyle,
      ...restProps
    } = this.props;

    let {finalSource, hasLoadImage} = this.state;
    if (!hasLoadImage) {
      style = [style, defaultSourceStyle];
      resizeMode = 'cover';
    }
    return hasLoadImage ? (
      <ReactNativeImage
        {...restProps}
        style={style}
        source={finalSource}
        resizeMode={resizeMode}
      />
    ) : (
      <ReactNativeImage
        {...restProps}
        style={style}
        source={defaultSource}
        resizeMode={resizeMode}
      />
    );
  }
}
