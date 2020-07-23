import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle, modal} from '@/utils';
import {Icon, Touchable, Image, Loading} from 'ui';

import ImagePicker from 'react-native-image-crop-picker';
import $api from '@/config/api';
export default class SetUpload extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {userInfo, data} = this.props;
    return (
      <View style={[data.border ? style.border : null]}>
        <Touchable
          style={[style.content]}
          onPress={() => {
            this.chooseImg();
          }}>
          <Text style={[style.label, {color: commonStyle.colorTheme.title}]}>
            {data.label}
          </Text>
          <View style={[style.value, {color: commonStyle.colorTheme.title}]}>
            <Image
              source={
                userInfo.img
                  ? {uri: userInfo.img}
                  : require('@/assets/images/my/avatar-nologin.png')
              }
              style={style.img}
            />
          </View>
        </Touchable>
      </View>
    );
  }
  componentDidMount = async () => {};
  chooseImg = () => {
    ImagePicker.openPicker({
      includeBase64: true,
    }).then(image => {
      let fileData = 'data:image/jpeg;base64,' + image.data;
      let fileName = image.filename || image.modificationDate;
      console.log(image);
      this.uploadImg(fileData, fileName);
    });
  };
  uploadImg = async (fileData, fileName) => {
    var formdata = new FormData();
    formdata.append('file', fileData);
    modal.show(<Loading />, 'loading');
    let res = await $api['user/uploadImg'](formdata);
    if (res.resultData) {
      this.props.afterHandle && this.props.afterHandle();
      modal.close();
    } else {
      modal.showToast(res.message);
    }
  };
}
const style = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
    paddingTop: transformSize(24),
    paddingBottom: transformSize(30),
  },

  label: {color: '#333', fontSize: transformSize(28)},
  value: {flex: 1, flexDirection: 'row', justifyContent: 'flex-end'},
  img: {
    width: transformSize(70),
    height: transformSize(70),
    borderRadius: transformSize(35),
  },
  icon: {marginLeft: transformSize(10)},
  border: {
    borderBottomColor: '#ccc',
    borderBottomWidth: transformSize(1),
  },
});
