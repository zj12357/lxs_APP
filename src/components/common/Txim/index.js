import {Platform} from 'react-native';
import TximIos from './Txim.ios.js';
import TximAndroid from './Txim.android.js';

let Txim;

if (Platform.OS === 'ios') {
  Txim = TximIos;
} else {
  Txim = TximAndroid;
}

export default Txim;
