import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Skeleton } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
const AddPins = lazy(() => import('../pages/AddPins'));

import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import Cookies from 'js-cookie';
const { decrypt } = require('../../helpers/encryption-decryption');
const SocialMediaOverview = lazy(() => import('./overview/index/SocialMediaOverview'));

const Dashboard = () => {
  const enc_user_detail = Cookies.get('UserDetail');
  const [UserRole, setUserRole] = useState();
  useEffect(() => {
    if (enc_user_detail) {
      const response = decrypt(enc_user_detail);
      const UserInfo = response?.sessdata?.user?.[0]?.user_role;
      const user_role = UserInfo.toUpperCase();
      setUserRole(user_role);
    }
  }, []);
  // const { path } = useRouteMatch();
  return (
    <>
      <PageHeader
        ghost
        // title="Social Media Dashboard"
        // buttons={[
        //   <div key="6" className="page-header-actions">
        //     <CalendarButtonPageHeader key="1" />
        //     <ExportButtonPageHeader key="2" />
        //     <ShareButtonPageHeader key="3" />
        //     <Button size="small" key="4" type="primary">
        //       <FeatherIcon icon="plus" size={14} />
        //       Add New
        //     </Button>
        //   </div>,
        // ]}
      />
      {/* <Switch>
        <Route path={`${path}/add-pins`} component={AddPins} />
      </Switch> */}

      <Main>
        <Row justify="left" gutter={5}>
          <Col xxl={24} lg={24} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              {/* <SocialMediaOverview /> */}
              {UserRole ? (
                UserRole == 'STUDENT' ? (
                  <StudentDashboard />
                ) : UserRole == 'TEACHER' ? (
                  <TeacherDashboard />
                ) : (
                  <AddPins />
                )
              ) : (
                ''
              )}
            </Suspense>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Dashboard;
