import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  DeviceEventEmitter,
} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Message, Button, FlowList} from 'ui';

import FilterItem from './FilterItem';
import {connect} from 'react-redux';
import {getSportFilter, commitSportFilter} from '@/store/actions';
import _ from 'lodash';
import {withNavigation} from 'react-navigation';
const mapStateToProps = state => {
  return {
    sportFilter: state.info.sportFilter,
  };
};

const mapDispatchToProps = {
  getSportFilter,
  commitSportFilter,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@withNavigation
export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let data = _.cloneDeep(this.props.sportFilter);
    data = _.flatten(data);

    return (
      <View tabLabel="全部赛事" style={style.tabOne}>
        {data.length ? (
          <FlatList
            style={style.flatlistWrap}
            contentContainerStyle={style.flatlist}
            data={this.props.sportFilter}
            renderItem={({item, index}) => (
              <FilterItem
                item={item}
                handleItem={i => this.handleItem(index, i)}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Message preset="no-data" />
        )}
        <View style={style.bottomBtnWrap}>
          <Button
            title="全选"
            style={style.btnWrap}
            textStyle={style.btn}
            onPress={this.handleAll}
          />
          <Button
            title="反选"
            style={style.btnWrap}
            textStyle={style.btn}
            onPress={this.handleAllBack}
          />
          <Button
            title="确定"
            style={[style.btnWrap, style.confirm]}
            textStyle={[style.btn, style.confirmBtn]}
            onPress={() => this.submit()}
          />
        </View>
      </View>
    );
  }
  componentDidMount = async () => {
    await this.props.getSportFilter();
  };
  handleItem(index, i) {
    let data = _.cloneDeep(this.props.sportFilter);
    data[index][i].icon = !data[index][i].icon;
    this.props.commitSportFilter(data);
  }
  handleAll = () => {
    let data = _.cloneDeep(this.props.sportFilter);
    data.forEach(item => {
      item.forEach(it => {
        it.icon = true;
      });
    });
    this.props.commitSportFilter(data);
  };
  handleAllBack = () => {
    let data = _.cloneDeep(this.props.sportFilter);
    data.forEach(item => {
      item.forEach(it => {
        it.icon = !it.icon;
      });
    });
    this.props.commitSportFilter(data);
  };
  submit = () => {
    let data = _.cloneDeep(this.props.sportFilter);
    let arr = _.flatten(data);
    let selectData = arr.filter(item => item.icon);
    let paramsData = selectData.map(item => item.id);
    console.log(paramsData);

    DeviceEventEmitter.emit('filterSport', paramsData);
    this.props.navigation.goBack();
  };
}
const style = StyleSheet.create({
  tabOne: {
    flex: 1,
  },
  flatlistWrap: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  flatlist: {
    paddingBottom: 50,

    paddingHorizontal: transformSize(26),
  },
  tab_1: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: transformSize(26),
  },
  tab_2: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: transformSize(26),
  },
  bottomBtnWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: transformSize(88),
    alignItems: 'center',
  },
  btnWrap: {
    flex: 1,
    height: transformSize(88),
  },
  confirm: {
    backgroundColor: '#DA1B2A',
  },
  btn: {
    fontSize: transformSize(30),
    color: '#203046',
    fontWeight: 'bold',
  },
  confirmBtn: {
    color: '#fff',
  },
});
