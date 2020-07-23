import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Button} from 'ui';
export default class FilterItem extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({navigation, screenProps}) => ({
    title: '在线反馈',
  });
  render() {
    let {item} = this.props;
    return item.length ? (
      <View style={style.wrap}>
        <Text style={style.title}>{item[0].letter}</Text>
        <View style={style.conWrap}>
          {item.map((bt, index) => {
            return (
              <Button
                style={[style.btnWrap, (index + 1) % 3 ? null : style.three]}
                textStyle={style.btn}
                title={bt.name}
                icon={bt.icon ? 'radioSelect' : 'radioEmpty'}
                iconColor={
                  bt.icon ? commonStyle.colorTheme.color_theme : '#666'
                }
                iconSize={12}
                onPress={() => this.handleSelect(index)}
              />
            );
          })}
        </View>
      </View>
    ) : null;
  }
  componentDidMount = async () => {};
  handleSelect = index => {
    this.props.handleItem && this.props.handleItem(index);
  };
}
const style = StyleSheet.create({
  wrap: {
    marginTop: transformSize(34),
  },
  title: {
    fontSize: transformSize(30),
    color: '#333',
    marginBottom: transformSize(12),
  },
  conWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btnWrap: {
    backgroundColor: '#fff',
    marginBottom: transformSize(20),
    marginRight: '4%',
    width: '30%',
    height: transformSize(60),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: transformSize(20),
    borderRadius: transformSize(4),
    borderWidth: transformSize(2),
    borderColor: '#DBDBDB',
  },
  three: {
    marginRight: 0,
  },
  btn: {
    fontSize: transformSize(24),
    color: '#333',
    marginLeft: transformSize(20),
  },
});
