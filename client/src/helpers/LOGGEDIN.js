// //Additions by khush================================================================================================
// import Axios from 'axios';
// import { useEffect } from 'react';

// import { useDispatch } from 'react-redux';
// //import { alreadyloggedin } from '../redux/authentication/actionCreator';

// Axios.defaults.withCredentials = true;
// //==================================================================================================================

// const Checkloggedin = () => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     //console.log('INSIDE CUSTOM CHECKLOGGEDIN FUNCTION');
//     //console.log('999---UseEffect--React-checking for user already logged in or not');

//     const aFunction = () => {
//       //console.log('999-inside async func');
//       return Promise.resolve(dispatch(alreadyloggedin()));
//     };
//     aFunction()
//       .then(() => {
//         //console.log('999--back to react ----inside .then');
//         // {
//         //   isLogin ? history.push('/dashboard') : history.push('/');
//         // }
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     // setTimeout(() => {
//     //   console.log('999-check');
//     //   console.log(isLoggedIn);
//     // }, 100);
//   }, []);
// };
// export default Checkloggedin;
