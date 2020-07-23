import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon} from 'ui';

export default class HomeTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      con: [8, 9, 6, 2, 10, 3, 4, 7, 1, 5],
    };
  }
  render() {
    let con = (this.props.data && this.props.data.split(',')) || this.state.con;
    if (con.length > 10) {
      return (
        <View style={[style.manyConWrap]}>
          {con.map((v, i) => {
            let myIndex = i;
            if (i >= 10) {
              myIndex = i - 10;
            }
            return (
              <View
                style={[
                  style.manyCon,
                  style[`con_${myIndex}`],
                  this.props.conStyle,
                ]}
                key={i}>
                <Text style={[style.manyConText, this.props.conText]}>{v}</Text>
              </View>
            );
          })}
        </View>
      );
    } else {
      return (
        <View style={[style.conWrap, this.props.style]}>
          {con.map((v, i) => {
            return (
              <View
                style={[style.con, style[`con_${i}`], this.props.conStyle]}
                key={i}>
                <Text style={[style.conText, this.props.conText]}>{v}</Text>
              </View>
            );
          })}
        </View>
      );
    }
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({
  manyConWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: transformSize(15),
    marginHorizontal: transformSize(16),
    paddingHorizontal: transformSize(18),
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: transformSize(1),
  },
  manyCon: {
    borderRadius: transformSize(6),
    width: transformSize(36),
    height: transformSize(44),
    marginRight: transformSize(15),
    marginBottom: transformSize(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  manyConText: {
    color: '#fff',
    fontSize: transformSize(24),
  },
  conWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // flexWrap: 'wrap',
  },
  con: {
    borderRadius: transformSize(6),
    width: transformSize(36),
    height: transformSize(44),
    justifyContent: 'center',
    alignItems: 'center',
  },
  conText: {
    color: '#fff',
    fontSize: transformSize(24),
  },
  con_0: {
    backgroundColor: '#DA1B2A',
  },
  con_1: {
    backgroundColor: '#7B0602',
  },
  con_2: {
    backgroundColor: '#5235F3',
  },
  con_3: {
    backgroundColor: '#0495EE',
  },
  con_4: {
    backgroundColor: '#04C100',
  },
  con_5: {
    backgroundColor: '#4C4C4C',
  },
  con_6: {
    backgroundColor: '#F97801',
  },
  con_7: {
    backgroundColor: '#BFBFBF',
  },
  con_8: {
    backgroundColor: '#E3DC0F',
  },
  con_9: {
    backgroundColor: '#1BDFDE',
  },
});
