import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Axios from 'axios';

import { hot } from 'react-hot-loader/root';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Admin from './routes/admin'; //calling admin

import Auth from './routes/auth'; //calling auth
import Exam from './routes/ExamURL';
import PracticeSet from './routes/ExamURL';
//calling auth
import './static/css/styleNew.css';
import './static/css/style.css';
import config from './config/config'; //config-------------------------------1
import store from './redux/store'; //calling store---------------------------2
import ProtectedRoute from './components/utilities/protectedRoute';
import { createContext } from 'react';
//import PracticeSet from './container/pages/PracticeSet';
// //Additions by khush================================================================================================
// import Axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { alreadyloggedin } from './redux/authentication/actionCreator';
// import { useHistory } from 'react-router-dom';
Axios.defaults.withCredentials = true;
// //==================================================================================================================

const { theme } = config;
var ExamUrl;
var ExamURL1;
const ProviderConfig = () => {
  // console.log('1-1 React- i am in App.js ProviderConfig()');
  const { rtl, isLoggedIn, topMenu, darkMode } = useSelector(state => {
    return {
      darkMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      isLoggedIn: state.auth.login,
    };
  });
  // console.log(isLoggedIn);

  const [path, setPath] = useState(window.location.pathname);
  // console.log(path);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      //if unmounted true
      setPath(window.location.pathname);
    }
    // eslint-disable-next-line no-return-assign
    return () => (unmounted = true);
  }, [setPath]);

  useEffect(() => {}, []);
  console.log(window.location.pathname, 'window.location.pathname');
  const splitedURL = window.location.pathname.split('/');
  console.log(splitedURL);
  console.log(splitedURL[1]);
  if (splitedURL[1] == 'exam') {
    ExamUrl = splitedURL?.[1];
    ExamURL1 = 'exam';
  } else if (splitedURL[1] == 'practice-sets') {
    ExamUrl = splitedURL?.[1];
    ExamURL1 = 'exam';
  } else if (splitedURL[1] == 'exam-success') {
    ExamUrl = splitedURL?.[1];
    ExamURL1 = 'exam';
  } else if (splitedURL[1] == 'quiz') {
    ExamUrl = splitedURL?.[1];
    ExamURL1 = 'exam';
  } else if (splitedURL[1] == 'quiz-success') {
    ExamUrl = splitedURL?.[1];
    ExamURL1 = 'exam';
  } else if (splitedURL[1] == 'practice-sets-success') {
    ExamUrl = splitedURL?.[1];
    ExamURL1 = 'exam';
  } else if (splitedURL[1] == 'overview-quiz') {
    ExamUrl = splitedURL?.[1];
    ExamURL1 = 'exam';
  } else if (splitedURL[1] == 'overview-exam') {
    ExamUrl = splitedURL?.[1];
    ExamURL1 = 'exam';
  } else if (splitedURL[1] == 'overview-practice-set') {
    ExamUrl = splitedURL?.[1];
    ExamURL1 = 'exam';
  } else if (splitedURL[1] == 'checkout') {
    ExamUrl = splitedURL?.[1];
    ExamURL1 = 'exam';
  }

  return (
    <ConfigProvider direction={rtl ? 'rtl' : 'ltr'}>
      <ThemeProvider theme={{ ...theme, rtl, topMenu, darkMode }}>
        {ExamURL1 != `exam` ? (
          <Router basename={process.env.PUBLIC_URL}>
            {!isLoggedIn ? <Route path="/" component={Auth} /> : <ProtectedRoute path="/dashboard" component={Admin} />}
            {isLoggedIn && (path === process.env.PUBLIC_URL || path === `${process.env.PUBLIC_URL}/`) && (
              <>
                <Redirect to="/dashboard" />
                <Route path="/" component={Auth} />
              </>
            )}
          </Router>
        ) : (
          <Router basename={process.env.PUBLIC_URL}>
            <ProtectedRoute path="/" component={Exam} />
          </Router>
        )}

        {/* {ExamUrl == `practice-sets` ? (
          <Router basename={process.env.PUBLIC_URL}>
            <ProtectedRoute path="/" component={PracticeSet} />
          </Router>
        ) : (
          ''
        )} */}
      </ThemeProvider>
    </ConfigProvider>
  );
};

/**GET RANDOM STRING COOKIES DATA ======================================================STARTS **/
//const User_detail = Cookies.set('UserDetail', SuperAdminDetails);
// function random_string(length) {
//   let result = '';
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const charactersLength = characters.length;
//   let counter = 0;
//   while (counter < length) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     counter += 1;
//   }
//   return result;
// }

// var User_Cookies = {
//   SuperAdminDetails: random_string(10),
//   LoginAsChild: random_string(10),
//   UserDetail: random_string(10),
//   access_token: random_string(10),
// };

// const Context = createContext();
// const value = User_Cookies;

/**GET RANDOM STRING COOKIES DATA ======================================================ENDS **/
function App() {
  return (
    <Provider store={store}>
      {/**GET RANDOM STRING COOKIES DATA ======================================================STARTS **/}
      {/* <Context.Provider value={value}>
        <ProviderConfig />
      </Context.Provider> */}
      {/**GET RANDOM STRING COOKIES DATA ======================================================ENDS **/}
      <ProviderConfig />
    </Provider>
  );
}

export default hot(App);
// export { Context };
