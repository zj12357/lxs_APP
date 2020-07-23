import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon, Button} from 'ui';
import Title from '../../../components/common/Title';
import {SportItem} from '../components';
import {withNavigation} from 'react-navigation';

import {connect} from 'react-redux';
import {getHomeSports, commitHomeSports} from '@/store/actions';

const mapStateToProps = state => {
  return {
    homeSports: state.home.homeSports,
  };
};

const mapDispatchToProps = {
  getHomeSports,
  commitHomeSports,
};

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@withNavigation
export default class HomeSports extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // eslint-disable-next-line no-undef
    this.socket = new WebSocket('ws://159.138.3.116:8103/ws/race');

    this.socket.onopen = this.onOpenSocket.bind(this);

    this.socket.onmessage = this.onReceivedMessage.bind(this);
  }
  render() {
    return (
      <View style={style.homeSports}>
        <Title
          title="热门体育"
          right={true}
          goToPage={() => this.goToPage()}
          style={{paddingHorizontal: transformSize(30)}}
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={this.props.homeSports}
          renderItem={({item}) => (
            <SportItem
              from="home"
              item={item}
              style={style.itemWrap}
              // topWrap={style.topWrap}
              // conWrap={style.conWrap}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
  componentDidMount = async () => {
    this.params = {pageIndex: 1, pageSize: 10};
    await this.props.getHomeSports(this.params);
  };
  componentWillUnmount = async () => {
    this.socket.close();
  };
  goToPage() {
    console.log('this,props', this);
    this.props.navigation.navigate('info', {to: 'sport'});
  }
  onOpenSocket = mes => {
    console.log('socketOpen', mes);
  };
  onReceivedMessage = mes => {
    let homeSports = this.props.homeSports;
    let data = JSON.parse(mes.data);
    // console.log(mes, data, 'socket1');
    let selectData = data.filter(item => {
      return homeSports.some(dt => {
        return dt.id === item.data_id;
      });
    });

    let finalData = [];

    if (selectData.length) {
      finalData = homeSports.map(item => {
        let index = selectData.findIndex(se => {
          return se.data_id === item.id;
        });

        return {
          ...item,
          cornerKick: selectData[index].corner,
          midfielderScore: selectData[index].half_score,
          redCard: selectData[index].master_red,
          score: selectData[index].score,
          yellowCard: selectData[index].master_yellow,
        };
      });
      this.props.commitHomeSports(finalData);
    }

    // console.log('socketHome', mes.data, selectData, finalData);
  };
}
const style = StyleSheet.create({
  homeSports: {
    backgroundColor: '#f0f0f0',
  },
  itemWrap: {
    width: transformSize(622),
    // height: transformSize(190),
    backgroundColor: '#fff',
    borderRadius: transformSize(4),
    marginLeft: transformSize(30),
  },
  topWrap: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    height: transformSize(60),
    alignItems: 'center',
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: transformSize(1),
  },

  conWrap: {
    height: transformSize(132),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
