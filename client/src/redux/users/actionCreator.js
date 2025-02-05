import actions from './actions';
import Axios from 'axios';
//import initialState from '../../demoData/userslist.json';
//const { filterUsersListBegin, filterUsersListSuccess, filterUsersListErr } = actions;
import { headers } from '../../helpers/variables';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const {
  // formBegin,
  // checkPhoneEmailAlreadyBegin,
  // checkPhoneEmailAlreadySuccess,

  adduserBegin,
  adduserSuccess,
  adduserErr,

  usersListBegin,
  usersListSuccess,
  usersListErr,

  userDataBegin,
  userDataSuccess,
  userDataErr,

  filterUsersListBegin,
  filterUsersListSuccess,
  filterUsersListErr,
} = actions;

// let axiosConfig = {
//   headers: {
//     'Content-Type': 'application/json; charset=UTF-8',
//     token: 'Bearer hjskdhskjdhsjkdhskjdhskjdhskdhskjdhsdjksjhdsjkdsdks',
//   },
// };

// const form1 = () => {
//   return async dispatch => {
//     return dispatch(formBegin());
//   };
// };

// const checkPhoneEmailAlready = postData => {
//   return async dispatch => {
//     try {
//       dispatch(checkPhoneEmailAlreadyBegin());
//       await Axios.post(domainpath + '/user/checkuser', postData, { headers }).then(response => {
//         if (response.data.message === 'phone') {
//           console.log('Phone Already exists');
//           return dispatch(adduserErr('Phone Already exists'));
//         } else if (response.data.message === 'email') {
//           console.log('Email Already exists');
//           return dispatch(adduserErr('Email Already exists'));
//         }
//         console.log('im here');
//         return dispatch(checkPhoneEmailAlreadySuccess(postData));
//       });
//     } catch (err) {
//       return dispatch(adduserErr('error in AC try catch block'));
//     }
//   };
// };

const addUser = postData => {
  console.log('PPPPPPPPP AC addUser function');
  return async dispatch => {
    try {
      dispatch(adduserBegin(postData));
      await Axios.post(domainpath + '/user', postData, { headers })
        .then(err, response => {
          console.log(response);
          console.log('resp bckkkkkkkkkkkkkkkkkkkkkkkk');
          if (response.status === 201) {
            console.log('AC');

            // Cookies.set('logedIn', true);
            // console.log(response.data.status);
            // console.log(response.status);
            // console.log(response.data.responsedata.users);
            // const userdata = response.data.responsedata.users;
            // return dispatch(adduserSuccess(userdata));
            // const postID = params.id;
            //NOW SEND EMAIL that ACCOUNT IS CREATED SUCCESSFULLY_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_++_+_+_+_+_+_+_+_+_+_+
            // console.log(response.data.user);
            const postID = response.data.user;
            async function sendEmailFP(postID) {
              await Axios.get(domainpath + `/user/email/created/${postID}`, { headers }).then(response1 => {
                console.log(response1);
                if (response1.data.responsedata.message == 'Email Successfully Sent') {
                  console.log('Email Successfully Sent');
                } else {
                  console.log('Email not sent');
                }
              });
            }
            sendEmailFP(postID);
            //ends+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+

            return dispatch(adduserSuccess());
          } else if (response.status === 400) {
            dispatch(adduserErr('err'));
          } else {
            console.log(response);
            dispatch(adduserErr('err'));
          }
        })
        .catch(err => {
          dispatch(adduserErr(err));
        });
    } catch (err) {
      dispatch(adduserErr(err));
    }
  };
};

// const getallUsers = () => {
//   //console.log('PPPPPPPPP AC getallusers function');
//   return async dispatch => {
//     try {
//       dispatch(usersListBegin());
//       await Axios.post(domainpath + '/user/all', { headers }).then(response => {
//         // console.log(response);
//         //console.log('resp bckkkkkkkkkkkkkkkkkkkkkkkk');
//         if (response.status === 200) {
//           // console.log('AC');
//           //alert('already logged in ');
//           // Cookies.set('logedIn', true);
//           // console.log(response.data.status);
//           // console.log(response.status);
//           // console.log(response.data.responsedata.users);
//           const userdata = response.data.responsedata.users;
//           return dispatch(usersListSuccess(userdata));
//         }
//       });
//     } catch (err) {
//       dispatch(usersListErr(err));
//     }
//   };
// };

const editGetDataById = id => {
  return async dispatch => {
    try {
      dispatch(userDataBegin());
      await Axios.post(domainpath + '/user/all', { headers }).then(response => {
        // console.log(response);
        //console.log('resp bckkkkkkkkkkkkkkkkkkkkkkkk');
        if (response.status === 200) {
          // console.log('AC');
          //alert('already logged in ');
          // Cookies.set('logedIn', true);
          // console.log(response.data.status);
          // console.log(response.status);
          // console.log(response.data.responsedata.users);
          const userdata = response.data.responsedata.users;
          return dispatch(userDataSuccess(userdata));
        }
      });
    } catch (err) {
      dispatch(userDataErr(err));
    }
  };
};

// const userslistFilter = (column, value, listdata) => {
//   //column value ='status' & value=either active or inactive
//   return async dispatch => {
//     console.log('i am in dispatch AC');
//     try {
//       if (value === 'Active') {
//         const valueincolumn = 1;
//         dispatch(filterUsersListBegin());
//         const data = listdata.filter(item => {
//           if (value !== '') {
//             return item[column] === valueincolumn;
//           }
//           return item;
//         });

//         dispatch(filterUsersListSuccess(data));
//       } else if (value === 'Inactive') {
//         const valueincolumn = 0;
//         dispatch(filterUsersListBegin());
//         const data = listdata.filter(item => {
//           if (value !== '') {
//             return item[column] === valueincolumn;
//           }
//           return item;
//         });
//         dispatch(filterUsersListSuccess(data));
//       }
//     } catch (err) {
//       dispatch(filterUsersListErr(err));
//     }
//   };
// };

export { addUser, editGetDataById };
// export { form1, checkPhoneEmailAlready, addUser, getallUsers, editGetDataById, userslistFilter };
