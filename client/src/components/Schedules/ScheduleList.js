import '../Styles/AddList.css';

import React, { Component } from 'react';
import { headers } from '../../helpers/variables';
import Cookies from 'js-cookie';
import { get_api_request, post_api_request, api_url } from '../../helpers/Common';
import { connect } from 'react-redux';
import ListEditor from '../PinterestBoard/ListEditor';
import shortid from 'shortid';
import EditButtons from '../PinterestBoard/EditButtons';

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

const d = new Date();
let month = d.getMonth();
const months_days = {
  January: 31,
  February: 28,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
};
var m = month + 1;
var monthfirstDay = '2023-' + m + '-01';
const monthfirst = new Date(monthfirstDay);
var days_behind = monthfirst.getDay();
if (days_behind == 1) {
  var days_behind = 0;
}

class CalenderList extends Component {
  state = {
    selectedMonth: '',
  };

  constructor(props) {
    super(props);
    this.state = { selectedMonth: months[month] };
    this.createList(months[month]);
  }

  GetAllSchedules = async e => {
    const url = api_url.get_schedule_all;
    const response = await get_api_request(url, headers);

    if (response.status == 200) {
      const scheduledata = response?.data?.responsedata;
      return scheduledata;
    } else {
      console.log('error');
    }
  };
  handleChangeTitle = e => this.setState({ title: e.target.value });

  createList = async (selected_month = null) => {
    if (selected_month.target != undefined) {
      selected_month = selected_month.target.value;
    }
    var m = months.indexOf(selected_month) + 1;
    var monthfirstDay = '2023-' + m + '-01';
    const monthfirst = new Date(monthfirstDay);
    var days_behind = monthfirst.getDay();
    if (days_behind == 1) {
      var days_behind = 0;
    }

    this.setState({ selected_month });

    var list_title = selected_month;

    var schedule_list = await this.GetAllSchedules();
    var days = months_days[list_title];
    const { title } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'CLEAR_LIST',
      payload: {},
    });

    for (var i = 1; i <= days_behind; i++) {
      var list_Id = i + '__' + list_title + '_2023';
      var list_titless = 'N/A';
      dispatch({
        type: 'ADD_LIST',
        payload: { listId: list_Id, listTitle: list_titless },
      });
    }

    for (var i = 1; i <= days; i++) {
      var list_Id = i + '_' + list_title + '_2023';
      var list_titless = i + ' ' + list_title;
      dispatch({
        type: 'ADD_LIST',
        payload: { listId: list_Id, listTitle: list_titless },
      });
      for (var j = 0; j < schedule_list?.length; j++) {
        var date_sch = schedule_list[j].date;
        let month = schedule_list[j].month;

        let date = date_sch.slice(-2).replace(/^0+/, '');
        let year = schedule_list[j].year;
        var schedule_date = date + '_' + month + '_' + year;
        if (list_Id == schedule_date) {
          dispatch({
            type: 'ADD_CARD',
            payload: {
              listId: list_Id,
              cardId: schedule_list[j].id + '_p',
              cardText: schedule_list[j].title,
              cardImage: schedule_list[j].media_url,
              cardDate: schedule_list[j].date,
              cardTime: schedule_list[j].time,
            },
          });
        }
      }
    }
  };
  render() {
    // const { toggleAddingList } = this.props;
    const { title } = this.state;
    const currentYear = new Date().getFullYear();

    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      years.push(i);
    }
    const current_month = months[month];

    return (
      <div className="Add-List-Editor">
        <div className="monthOption">
          <select onChange={this.createList} title={this.state.selectedMonth}>
            {months.map(month => (
              <option selected={current_month == month ? 'selected' : ''} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default connect()(CalenderList);
