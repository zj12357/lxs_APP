import {transformSize} from '@/utils';
import {Dimensions, Platform, PixelRatio, StyleSheet} from 'react-native';

export const lightColorTheme = {
  dark: false,
  pageBg: '#fff',
  inputBg: '#f0f0f0',
  color_theme: '#DA1B2A',
  color_yellow: '#F8BC5A',
  color_blue: '#7CAFEA',
  color_red: '#EE806B',
  title: '#333',
  label: '#666',
  tag: '#999',
  fontHasBg: '#fff',
  sep: '#f9f9f9',
  border: '#ccc',
  shadowColor: '#A1A1A1',
};
export const darkColorTheme = {
  dark: true,
  pageBg: '#191919',
  inputBg: '#232323',
  color_theme: '#37af68',
  color_yellow: '#E1AD53',
  color_blue: '#71A0D7',
  color_red: '#D87563',
  title: 'rgba(255,255,255,.87)',
  label: 'rgba(255,255,255,.6)',
  tag: 'rgba(255,255,255,.38)',
  fontHasBg: 'rgba(255,255,255,.6)',
  sep: 'rgba(50,50,50,.5)',
  border: '#2e2e2e',
  shadowColor: '#6f6f6f',
};

export let colorTheme = lightColorTheme;

// export function changeTheme(type) {
//   if (type === 'dark') {
//     colorTheme = darkColorTheme;
//   } else {
//     colorTheme = lightColorTheme;
//   }
// }
export const color_theme = '#DA1B2A';
// export const color_theme = '#4CAF50'
export const color_yellow = '#F8BC5A';
export const color_red = '#EE806B';
export const color_blue = '#7CAFEA';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const ellipsis = {
  overflow: 'hidden',
  whiteSpace: 'normal',
};

export const h_1 = {
  fontSize: transformSize(32),
  fontWeight: 'bold',
  color: '#333',
};

export const h_2 = {
  fontSize: transformSize(28),
  fontWeight: 'bold',
  color: '#333',
};
export const p_1 = {
  fontSize: transformSize(28),
  color: '#333',
};
export const p_2 = {
  fontSize: transformSize(24),
  color: '#333',
};
export const tag_1 = {
  fontSize: transformSize(24),
  color: '#666',
};
export const separation = {
  width: transformSize(750),
  height: transformSize(20),
  backgroundColor: '#f1f1f1',
};

export const borderBottom = {
  borderBottomColor: '#f1f1f1',
  borderBottomWidth: transformSize(1),
};
