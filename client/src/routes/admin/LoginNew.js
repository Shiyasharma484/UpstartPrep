import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Select, Space, notification, Input, Image, DatePicker } from 'antd';
import { Cards } from '../../components/cards/frame/cards-frame';
import loginImg from '../../static/img/auth/Login-BG.png';
import loginUpstart from '../../static/img/auth/upstart.png';
import loginlock from '../../static/img/login-lock.png';
import loginemail from '../../static/img/login-email.png';
import loginGoogle from '../../static/img/form-google.png';

const LoginNew = () => {
  const [form] = Form.useForm();
  return (
    <>
      <Row gutter={40} className="rowSpace">
        <Col md={12} xs={24} className="usersCard mobImgCenter">
          <img src={loginUpstart} className="loginUpstart" style={{ width: '200px', marginTop: '40px' }} />
          <img src={loginImg} style={{ width: '100%' }} />
        </Col>
        <Col md={12} xs={24} className="usersCard">
          <Form name="login-form" form={form} layout="vertical" className="login-form-main">
            <div className="login-form">
              <h1>Login in to UpstartPrep</h1>
              <div className="inputIcon">
                <img src={loginemail} style={{ width: '30px' }} /> <input type="email" placeholder="example@mail.com" />
              </div>
              <div className="inputIcon">
                <img src={loginlock} style={{ width: '20px' }} />{' '}
                <input type="password" placeholder="example@mail.com" />
              </div>
              <div className="inputlogin">
                <input type="submit" value="Login" />
              </div>
              <div className="inputORspace">
                <p>
                  <span>or</span>
                </p>
              </div>
              <div className="inputGoogle">
                <img src={loginGoogle} style={{ width: '17px' }} />
                <input type="submit" value="Sign in with Google" />
                <img src={loginGoogle} style={{ width: '17px', opcity: '0' }} />
              </div>
              <div className="dontAcc">
                <a>Don’t have an Account?</a>
              </div>
              <div className="signUp">
                <input type="submit" value="Sign Up" />
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default LoginNew;
