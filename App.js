import Main from './src/Main';
import {UIManager} from 'react-native';
import {YellowBox} from 'react-native';
// if (!__DEV__) {
//   global.console = {
//     info: () => {},
//     log: () => {},
//     warn: () => {},
//     debug: () => {},
//     error: () => {},
//   };
// }
console.disableYellowBox = true;
console.warn('YellowBox is disabled.');
// YellowBox.ignoreWarnings(['']);
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
export default Main;
