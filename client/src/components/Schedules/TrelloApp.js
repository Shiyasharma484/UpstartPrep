import '../Styles/App.css';

import React, { Component } from 'react';

import { Provider } from 'react-redux';
import scheduleList from '../Schedules/scheduleStore';

import * as serviceWorker from '../../serviceWorker';
//import PinList from "../../container/pages/PinList";
import Schedule from './Schedule';
import CalenderList from './ScheduleList';
const d = new Date();
let month = d.getMonth();
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

class ScheduleBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedMonth: months[month] };
    this.state = { selectedYear: new Date().getFullYear() };
  }

  render() {
    return (
      <Provider store={scheduleList}>
        <div className="App">
          <div className="menuBar">
            <div className="Header">
              {/* <CalenderList /> */}
              <div className="scheduleTitle">Schedules</div>
            </div>
          </div>

          <Schedule selectedMonth={(this.state = { selectedMonth: months[month] })} />
        </div>
      </Provider>
    );
  }
}
serviceWorker.unregister();
export default ScheduleBoard;
