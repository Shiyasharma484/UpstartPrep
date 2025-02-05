import React, { lazy, Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Switch, Route } from 'react-router-dom';
import propTypes from 'prop-types';
import { SettingWrapper } from './overview/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main } from '../../styled';
import { Cards } from '../../../components/cards/frame/cards-frame';

const Profile = lazy(() => import('./overview/Profile'));
const Password = lazy(() => import('./overview/Passwoard'));
const AuthorBox = lazy(() => import('./overview/ProfileAuthorBox'));
const CoverSection = lazy(() => import('../overview/CoverSection'));

const Settings = ({ match }) => {
  const { path } = match;

  return (
    <>
      <PageHeader ghost title="Edit Profile" />

      <Main>
        <Row gutter={25}>
          <Col xxl={6} lg={8} md={10} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton avatar />
                </Cards>
              }
            >
              <AuthorBox />
            </Suspense>
          </Col>
          <Col xxl={18} lg={16} md={14} xs={24}>
            <SettingWrapper>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton avatar />
                  </Cards>
                }
              >
                <CoverSection />
              </Suspense>
              <Switch>
                <Suspense
                  fallback={
                    <Cards headless>
                      <Skeleton paragraph={{ rows: 20 }} />
                    </Cards>
                  }
                >
                  <Route exact path={`${path}/profile`} component={Profile} />

                  <Route exact path={`${path}/password`} component={Password} />
                </Suspense>
              </Switch>
            </SettingWrapper>
          </Col>
        </Row>
      </Main>
    </>
  );
};

Settings.propTypes = {
  match: propTypes.object,
};

export default Settings;
