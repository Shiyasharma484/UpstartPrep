import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Dashboard from './dashboard';

import AddNewStore from 'react';

import Pages from './pages';
import Users from './users';
import Products from './products';
import Banners from './banners';
import Widgets from './widgets';
import Ecommerce from './ecommerce';

import Features from './features';
import Axios from 'axios';
import Gallery from './gallery';
import withAdminLayout from '../../layout/withAdminLayout';
import { headers } from '../../helpers/variables';
import Cookies from 'js-cookie';

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const Calendars = lazy(() => import('../../container/Calendar'));

//const AddNewStore = lazy(() => import('../../container/pages/AddNewStore'));

const Inbox = lazy(() => import('../../container/email/Email'));
const Chat = lazy(() => import('../../container/chat/ChatApp'));
const Myprofile = lazy(() => import('../../container/profile/myProfile/Index'));
const ToDo = lazy(() => import('../../container/toDo/ToDo'));
const Note = lazy(() => import('../../container/note/Note'));
const Contact = lazy(() => import('../../container/contact/Contact'));
const ContactGrid = lazy(() => import('../../container/contact/ContactGrid'));
const ContactAddNew = lazy(() => import('../../container/contact/AddNew'));
const Calendar = lazy(() => import('../../container/calendar/Calendar'));
// const FileManager = lazy(() => import('../../container/fileManager/FileManager'));
const Kanban = lazy(() => import('../../container/kanban/Index'));
const Task = lazy(() => import('../../container/task/Index'));
const Home = lazy(() => import('../../container/pages/Configuration'));
const Pricing = lazy(() => import('../../container/pages/Pricing'));
const { encrypt, decrypt } = require('../../helpers/encryption-decryption');
const Admin = () => {
  const { path } = useRouteMatch();
  //console.log(path)
  const [state, setState] = useState({});

  useEffect(() => {
    setTimeout(() => {
      // Axios.get(domainpath + `/user/login/data`, { headers })
      //   .then(response => {
      //     console.log(response);
      //     if (response.data.login === true) {
      const enc_user_detail = Cookies.get('UserDetail');
      const response = decrypt(enc_user_detail);

      if (response?.login == true) {
        const userInfo = response?.sessdata;
        const storeInfo = response?.sessdata?.user?.[0];

        setState({ userInfo, storeInfo });
      }
      //   }
      // })
      // .catch(error => console.log(error));
    }, 1000);
  }, []);

  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        {state.userInfo === null ? (
          <Route path={path} component={AddNewStore} />
        ) : (
          <Route path={path} component={Dashboard} />
        )}

        <Route path={`${path}/ecommerce`} component={Ecommerce} />
        <Route path={`${path}`} component={Pages} />
        <Route path={`${path}`} component={Features} />
        {/* <Route path={`${path}`} component={Axios} /> */}
        {/* 1 */}
        <Route path={`${path}/users`} component={Users} />

        {/* 1 */}

        <Route path={`${path}/products`} component={Products} />
        <Route path={`${path}/banners`} component={Banners} />
        <Route path={`${path}/gallery`} component={Gallery} />

        <Route path={`${path}/calendar`} component={Calendars} />
        {/* <Route path={`${path}/app/fileManager`} component={FileManager} /> */}
        <Route path={`${path}/app/kanban`} component={Kanban} />
        <Route path={`${path}/email/:page`} component={Inbox} />
        {/* <Route path={`${path}/`} component={Home} /> */}
        {/* <Route path={`${path}/pricing`} component={Pricing} /> */}
        <Route path={`${path}/main/chat`} component={Chat} />
        <Route path={`${path}/profile/myProfile`} component={Myprofile} />
        <Route path={`${path}/app/to-do`} component={ToDo} />
        <Route path={`${path}/app/note`} component={Note} />
        <Route path={`${path}/app/task`} component={Task} />
        <Route path={`${path}/contact/list`} component={Contact} />
        <Route path={`${path}/contact/grid`} component={ContactGrid} />
        <Route path={`${path}/contact/addNew`} component={ContactAddNew} />
        <Route path={`${path}/app/calendar`} component={Calendar} />
        <Route path={`${path}/widgets`} component={Widgets} />
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Admin);
