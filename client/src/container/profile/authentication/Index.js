import React from 'react';
import { Row, Col } from 'antd';
import { Aside, Content } from './overview/style';
import Heading from '../../../components/heading/heading';
import loginImg from '../../../static/img/auth/Login-BG.png';
import loginUpstart from '../../../static/img/auth/upstart.png';

const AuthLayout = WraperContent => {
  return () => {
    return (
      <Row
        className="login_bg"
        style={{
          backgroundImage: 'url(/pinBanner.1e56b9e5.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        {/* <Col xxl={12} xl={12} lg={12} md={12} xs={24}>
          <Aside className="login-aside">
            <div className="auth-side-content">
              <img src={loginUpstart} className="loginUpstart" style={{ width: '200px', marginTop: '40px' }} />
             
              <img src={loginImg} style={{ width: '100%' }} />
              <Content></Content>
            </div>
          </Aside>
        </Col> */}

        <Col xxl={24} xl={24} lg={24} md={24} xs={24} className="home-spacing">
          <WraperContent />
        </Col>
      </Row>
    );
  };
};

export default AuthLayout;
