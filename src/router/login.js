import Login from '@/views/login/Login';
import Password from '@/views/login/Password';
import Register from '@/views/login/Register';

const LoginRoute = {
  login: {
    screen: Login,
  },
  password: {
    screen: Password,
  },
  register: {
    screen: Register,
  },
};
export default LoginRoute;
