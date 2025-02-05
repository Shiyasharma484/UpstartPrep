import { headers } from '../../helpers/variables';
import Cookies from 'js-cookie';

import { get_api_request, post_api_request, api_url } from '../../helpers/Common';
import shortid from 'shortid';
const { decrypt } = require('../../helpers/encryption-decryption');

export default function seed(store) {
  const enc_user_detail = Cookies.get('UserDetail');
  const response = decrypt(enc_user_detail);
  const userId = response?.sessdata?.users_id;
  const firstListId = shortid.generate();

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
  var list_title = months[month];

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
  var days = months_days[list_title];
  for (var i = 1; i <= days; i++) {
    var list_Id = i + '_' + list_title + '_2023';
    var list_titless = i + ' ' + list_title;
    store.dispatch({
      type: 'ADD_LIST',
      payload: { listId: list_Id, listTitle: list_titless },
    });
  }
  async function GetAllSchedules() {
    const url = api_url.get_schedule_all;
    const response = await get_api_request(url, headers);

    if (response.status == 200) {
      const scheduledata = response?.data?.responsedata;
    } else {
      console.log('error');
    }
  }
  GetAllSchedules();

  async function GetAllUserPins() {
    const url = api_url.get_all_users_pins;
    const response = await get_api_request(url, headers);

    if (response.status == 200) {
      const userpinsdata = response?.data?.responsedata;
    } else {
      console.log('error');
    }
  }
  GetAllUserPins();
}
