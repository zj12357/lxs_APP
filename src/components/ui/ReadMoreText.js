import React, {Component} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import {commonStyle, transformSize} from '@/utils';
export default class ReadMoreText extends Component {
  state = {
    measured: false,
    shouldShowReadMore: false,
    showAllText: false,
  };

  async componentDidMount() {
    this._isMounted = true;
    await nextFrameAsync();

    if (!this._isMounted) {
      return;
    }

    // Get the height of the text with no restriction on number of lines
    const fullHeight = await measureHeightAsync(this._text);
    this.setState({measured: true});
    await nextFrameAsync();

    if (!this._isMounted) {
      return;
    }

    // Get the height of the text now that number of lines has been set
    const limitedHeight = await measureHeightAsync(this._text);

    if (fullHeight > limitedHeight || this.props.children[1]) {
      this.setState({shouldShowReadMore: true}, () => {
        this.props.onReady && this.props.onReady();
      });
    } else {
      this.props.onReady && this.props.onReady();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let {measured, showAllText, shouldShowReadMore} = this.state;

    let {numberOfLines, children} = this.props;

    return (
      <View style={styles.viewWrap}>
        <Text
          numberOfLines={measured && !showAllText ? numberOfLines : 0}
          ref={text => {
            this._text = text;
          }}>
          {Array.isArray(children) ? children[0] : children}
        </Text>

        {shouldShowReadMore && showAllText ? (
          <View>
            {Array.isArray(children) ? children[1] : null}
            <Text
              style={[styles.button, styles.vertical]}
              onPress={this._handlePressReadLess}>
              收起
            </Text>
          </View>
        ) : null}
        {this._maybeRenderReadMore()}
      </View>
    );
  }

  _handlePressReadMore = () => {
    this.setState({showAllText: true});
  };

  _handlePressReadLess = () => {
    this.setState({showAllText: false});
  };

  _maybeRenderReadMore() {
    let {shouldShowReadMore, showAllText} = this.state;

    if (shouldShowReadMore && !showAllText) {
      if (this.props.renderTruncatedFooter) {
        return this.props.renderTruncatedFooter(this._handlePressReadMore);
      }

      return (
        <Text
          style={[styles.button, styles.vertical, this.props.moreButtonStyle]}
          onPress={this._handlePressReadMore}>
          <Text style={styles.showMore}> 更多</Text>
        </Text>
      );
    } else if (shouldShowReadMore && showAllText) {
      if (this.props.renderRevealedFooter) {
        return this.props.renderRevealedFooter(this._handlePressReadLess);
      }
    }
  }
}

function measureHeightAsync(component) {
  return new Promise(resolve => {
    component.measure((x, y, w, h) => {
      resolve(h);
    });
  });
}

function nextFrameAsync() {
  return new Promise(resolve => requestAnimationFrame(() => resolve()));
}

const styles = StyleSheet.create({
  button: {
    color: commonStyle.color_theme,
    fontSize: transformSize(30),
  },
  viewWrap: {
    position: 'relative',
  },
  showMoreWrap: {
    // position: "absolute",
    // right: 0,
    // bottom: Platform.select({
    //   ios: transformSize(5),
    //   android: transformSize(3)
    // })
  },
  showMore: {
    color: commonStyle.color_theme,
    fontSize: transformSize(30),
  },
  vertical: {
    marginTop: transformSize(20),
  },
});
