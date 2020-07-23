import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from 'react-native';

import {transformSize, commonStyle} from '@/utils';
import {Button} from 'ui';

export default class WDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }
  render() {
    let {type} = this.props;

    let keyboardType = type === 'number' ? 'phone-pad' : 'default';
    return (
      <KeyboardAvoidingView
        style={style.keyboard}
        enabled
        behavior="position"
        keyboardVerticalOffset={300}>
        <View
          style={[
            style.wrap,
            {backgroundColor: commonStyle.colorTheme.pageBg},
          ]}>
          <Text style={[style.title, {color: commonStyle.colorTheme.title}]}>
            {this.props.title}
          </Text>

          <TextInput
            ref="input"
            onChangeText={text => {
              this.setState({content: text});
            }}
            placeholderTextColor={commonStyle.colorTheme.tag}
            placeholder={this.props.placeholder}
            maxLength={300}
            keyboardType={keyboardType}
            //   multiline={true}
            // underlineColorAndroid="transparent"
            style={[
              style.textInputStyle,
              {
                borderBottomColor: commonStyle.colorTheme.border,
                color: commonStyle.colorTheme.title,
              },
            ]}
          />
          <View style={style.btnWrap}>
            <Button
              title={'取消'}
              style={[
                style.cancelWrap,
                {borderColor: commonStyle.colorTheme.border},
              ]}
              textStyle={[style.cancel, {color: commonStyle.colorTheme.label}]}
              onPress={this.props.cancel}
            />
            <Button
              title={'确定'}
              style={style.confirmWrap}
              textStyle={style.confirm}
              onPress={() => this.props.confirm(this.state.content)}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({
  wrap: {
    width: transformSize(630),
    height: transformSize(380),
    paddingHorizontal: transformSize(40),
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  title: {
    fontSize: transformSize(36),
    color: '#333',
    fontWeight: 'bold',
  },

  textInputStyle: {
    height: transformSize(80),
    width: '100%',
    borderBottomWidth: transformSize(1),
  },
  btnWrap: {
    flexDirection: 'row',
  },
  cancelWrap: {
    borderWidth: transformSize(1),

    borderRadius: transformSize(4),
    width: transformSize(240),
    height: transformSize(70),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancel: {
    fontSize: transformSize(28),
  },
  confirmWrap: {
    borderRadius: transformSize(4),
    width: transformSize(240),
    height: transformSize(70),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: transformSize(20),
    backgroundColor: commonStyle.color_theme,
  },
  confirm: {
    fontSize: transformSize(28),
    color: '#fff',
  },
});
