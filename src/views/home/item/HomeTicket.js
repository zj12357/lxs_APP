import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {transformSize, commonStyle} from '@/utils';
import {Touchable, Icon} from 'ui';
import {ColorNum} from 'common';
import Title from '../../../components/common/Title';
import {TicketItem} from '../components';
import {connect} from 'react-redux';
import {getHomeTicket} from '@/store/actions';
import {withNavigation} from 'react-navigation';
const mapStateToProps = state => {
  return {
    homeTicket: state.home.homeTicket,
  };
};

const mapDispatchToProps = {
  getHomeTicket,
};
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@withNavigation
export default class HomeTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: '极品赛车',
          time: '20200527101期',
          tip: '365',
          con: [8, 9, 6, 2, 10, 3, 4, 7, 1, 5],
          label: '距离下期开奖',
          minute: '16',
          second: '02',
        },
        {
          name: '极品赛车',
          time: '20200527101期',
          tip: '365',
          con: [8, 9, 6, 2, 10, 3, 4, 7, 1, 5],
          label: '距离下期开奖',
          minute: '16',
          second: '02',
        },
      ],
    };
  }
  render() {
    let len = this.props.homeTicket.length;
    return (
      <View style={style.homeTicket}>
        <Title
          title="热门彩票"
          right={true}
          goToPage={() => this.goToPage()}
          style={{paddingHorizontal: transformSize(30)}}
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={this.props.homeTicket}
          renderItem={({item}) => (
            <TicketItem
              item={item}
              from="home"
              style={[style.itemWrap, len === 1 ? style.itemAlone : null]}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
  componentDidMount = async () => {
    this.params = {pageIndex: 1, pageSize: 10};
    await this.props.getHomeTicket(this.params);
  };
  renderItem = ({item, index}) => {
    return (
      <View style={style.itemWrap} key={index}>
        <View style={style.topWrap}>
          <View style={style.topLeft}>
            <Text style={style.name}>{item.name}</Text>
            <Text style={style.time}>{item.time}</Text>
          </View>

          <View style={style.topRight}>
            <Icon name="renqizhi" size={12} />
            <Text style={style.tip}>{item.tip}</Text>
          </View>
        </View>

        <ColorNum style={style.conWrap} />

        <View style={style.bottomWrap}>
          <Text style={style.label}>{item.label}</Text>

          <View style={style.bottomRight}>
            <Text style={style.minute}>{item.minute}</Text>
            <Text style={style.label}>分</Text>
            <Text style={style.minute}>{item.second}</Text>
            <Text style={style.label}>秒</Text>
          </View>
        </View>
      </View>
    );
  };

  goToPage() {
    console.log('this,props', this);
    this.props.navigation.navigate('info', {to: 'ticket'});
  }
}
const style = StyleSheet.create({
  homeTicket: {
    marginTop: transformSize(38),

    backgroundColor: '#f0f0f0',
  },
  itemWrap: {
    width: transformSize(622),
    borderRadius: transformSize(4),

    backgroundColor: '#fff',
    marginLeft: transformSize(30),
  },
  itemAlone: {
    width: transformSize(690),
  },
  topWrap: {
    flexDirection: 'row',
    marginHorizontal: transformSize(16),
    justifyContent: 'space-between',
    height: transformSize(60),
    alignItems: 'center',
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: transformSize(1),
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  name: {
    fontSize: transformSize(26),
    color: '#333',
    marginRight: transformSize(10),
  },
  time: {
    fontSize: transformSize(26),
    color: '#333',
  },

  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tip: {
    fontSize: transformSize(24),
    color: '#999',
    marginLeft: transformSize(10),
  },
  conWrap: {
    marginHorizontal: transformSize(16),
    paddingHorizontal: transformSize(18),
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: transformSize(1),
    height: transformSize(124),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomWrap: {
    height: transformSize(80),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: transformSize(16),
  },
  label: {
    color: '#333',
    fontSize: transformSize(26),
  },
  bottomRight: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  minute: {
    backgroundColor: '#E1E3E4',
    marginHorizontal: transformSize(16),
    borderRadius: transformSize(6),
    paddingHorizontal: transformSize(6),
    color: '#333',
    fontSize: transformSize(26),
  },
});
