import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon, Button, FlowList} from 'ui';
import NormalItem from './item/NormalItem';
import {connect} from 'react-redux';
import {getSportPankouThree} from '@/store/actions';
const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    sportPankouThree: state.info.sportPankouThree,
  };
};

const mapDispatchToProps = {
  getSportPankouThree,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class TabThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    };
  }
  render() {
    let {id, sportPankouThree} = this.props;
    let params = {competitionById: id};
    return (
      <View style={style.wrap}>
        <FlowList
          style={style.flatlist}
          request={this.props.getSportPankouThree}
          params={params}
          ListHeaderComponent={
            sportPankouThree.length ? this.renderHeader : null
          }
          renderItem={({item}) => (
            <NormalItem item={item} getDetail={this.props.getDetail} />
          )}
          contentContainerStyle={style.flatlist}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
  componentDidMount = async () => {};
  renderHeader = () => {
    return (
      <View style={style.headerWrap}>
        <Text style={style.headerCom}>公司</Text>
        <Text style={style.headerChu}>初盘</Text>
        <Text style={style.headerJishi}>即时盘</Text>
      </View>
    );
  };
}
const style = StyleSheet.create({
  wrap: {
    flex: 1,
    marginHorizontal: transformSize(20),
  },
  flatlist: {},

  headerWrap: {
    marginBottom: transformSize(20),
    marginTop: transformSize(30),
    flexDirection: 'row',
  },
  headerCom: {
    width: transformSize(168),
    textAlign: 'center',
    color: '#999',
    fontSize: transformSize(24),
  },
  headerChu: {
    width: transformSize(240),
    textAlign: 'center',
    color: '#999',
    fontSize: transformSize(24),
  },
  headerJishi: {
    width: transformSize(240),
    textAlign: 'center',
    color: '#999',
    fontSize: transformSize(24),
  },
});
