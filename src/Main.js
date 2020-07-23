import React, {Component} from 'react';

import store, {StoreProvider} from './store/store';
import {modal, toast, ymodal} from '@/utils';
import Root from './Root';
import {WModal, Toast, YModal} from 'ui';

export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <StoreProvider store={store}>
        <Root />
        <WModal ref={ref => modal.setInstance(ref)} />
        <YModal ref={ref => ymodal.setInstance(ref)} />
      </StoreProvider>
    );
  }
  componentDidMount = () => {};
}
