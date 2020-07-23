import Info from '@/views/info/info/Info';
import TicketDetail from '@/views/info/ticketDetail/TicketDetail';
import SportsDetail from '@/views/info/sportDetail/SportsDetail';
import Filter from '@/views/info/filter/Filter';
import Expert from '@/views/info/expert/Expert';

const InfoRoute = {
  info: {
    screen: Info,
  },
  ticketDetail: {
    screen: TicketDetail,
  },
  sportsDetail: {
    screen: SportsDetail,
    navigationOptions: {
      header: null,
    },
  },
  filter: {
    screen: Filter,
  },
  expert: {
    screen: Expert,
  },
};
export default InfoRoute;
