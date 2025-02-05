import '../../BoardStyles/App.css';

import React, { Component } from 'react';
import Board from './Board';

import { Provider } from 'react-redux';
import storeBoard from './storeBoard';

import * as serviceWorker from '../../serviceWorker';
import PinList from '../../container/pages/PinList';

//import "./index.css";

class BoardAPP extends Component {
  render() {
    return (
      <Provider store={storeBoard}>
        <div className="App">
          <div className="Header">Pinterest Board</div>
          <Board />
          {/* <PinterestBoard/> */}
        </div>
      </Provider>
    );
  }
}
serviceWorker.unregister();
export default BoardAPP;
