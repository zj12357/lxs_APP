import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon} from 'ui';
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerData: [
        '负盈利',
        '感恩红包随机金额',
        '感恩红包随机金额',
        '感恩红包随机金额',
      ],
      conData: [
        {
          label_0: '1000元',
          label_1: '1000元',
          label_2: '1000元',
          label_3: '1000元',
        },
        {
          label_0: '1000元',
          label_1: '1000元',
          label_2: '1000元',
          label_3: '1000元',
        },
        {
          label_0: '1000元',
          label_1: '1000元',
          label_2: '1000元',
          label_3: '1000元',
        },
      ],
    };
  }
  render() {
    let {headerData, conData} = this.state;
    return (
      <View style={[style.wrap, this.props.style]}>
        <View style={style.headerWrap}>
          {headerData.map((item, index) => {
            return (
              <View style={style.headerItem} key={index}>
                <Text style={style.headerTitle}>{item}</Text>
              </View>
            );
          })}
        </View>
        {conData.map((con, conIndex) => {
          return (
            <View
              style={[style.conWrap, conIndex === 2 ? style.col_3 : null]}
              key={conIndex}>
              <View style={style.conItemWrap}>
                <Text style={style.conItem}>1000元</Text>
              </View>
              <View style={style.conItemWrap}>
                <Text style={style.conItem}>1000元</Text>
              </View>
              <View style={style.conItemWrap}>
                <Text style={style.conItem}>1000元</Text>
              </View>
              <View style={[style.conItemWrap, style.column_4]}>
                <Text style={style.conItem}>1000元</Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({
  wrap: {
    borderWidth: transformSize(1),
    borderColor: '#203046',
    borderRadius: transformSize(22),
  },
  headerWrap: {
    backgroundColor: '#203046',
    width: transformSize(640),
    height: transformSize(92),
    flexDirection: 'row',
    borderTopLeftRadius: transformSize(22),
    borderTopRightRadius: transformSize(22),
  },
  headerItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: transformSize(20),
    borderRightWidth: transformSize(1),
    borderRightColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: transformSize(26),
    color: '#fff',
    fontWeight: 'bold',
  },
  conWrap: {
    flexDirection: 'row',
    borderBottomLeftRadius: transformSize(22),
    borderBottomRightRadius: transformSize(22),
    borderBottomWidth: transformSize(1),
    borderBottomColor: '#203046',
  },
  col_3: {
    borderBottomWidth: 0,
  },
  conItemWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    borderRightWidth: transformSize(1),
    borderRightColor: '#203046',

    height: transformSize(64),
  },

  column_4: {
    borderRightWidth: 0,
  },
  conItem: {
    fontSize: transformSize(24),
    color: '#333',
    fontWeight: 'bold',
  },
});
