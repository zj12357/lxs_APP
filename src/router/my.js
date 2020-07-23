import My from '@/views/my/My';
import MySet from '@/views/my/MySet';
import AboutYabo from '@/views/my/AboutYabo';
import Focus from '@/views/my/Focus';
import Collect from '@/views/my/Collect';
import Feedback from '@/views/my/Feedback';
import About from '@/views/my/About';
import Message from '@/views/my/Message';

import Security from '@/views/my/security/Security';
import UpdatePhone from '@/views/my/security/UpdatePhone';
import UpdatePwd from '@/views/my/security/UpdatePwd';
import ResetPwd from '@/views/my/security/ResetPwd';

const MyRoute = {
  my: {
    screen: My,
  },
  mySet: {
    screen: MySet,
  },
  aboutYabo: {
    screen: AboutYabo,
  },
  focus: {
    screen: Focus,
  },
  collect: {
    screen: Collect,
  },
  feedback: {
    screen: Feedback,
  },
  about: {
    screen: About,
  },
  message: {
    screen: Message,
  },
  security: {
    screen: Security,
  },
  updatePhone: {
    screen: UpdatePhone,
  },
  updatePwd: {
    screen: UpdatePwd,
  },
  resetPwd: {
    screen: ResetPwd,
  },
};
export default MyRoute;
