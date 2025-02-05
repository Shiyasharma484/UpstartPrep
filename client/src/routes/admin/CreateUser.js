import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Select, Space, notification, Input, Image, DatePicker } from 'antd';
import loginUpstart from '../../static/img/auth/upstart.png';
import signupleft from '../../static/img/auth/signup-left.png';

const Createnewuser = () => {
  const [form] = Form.useForm();

  return (
    <>
      <div className="main-Signuser">
        <Row gutter={40} className="rowSpace">
          <Col md={24} xs={24} className="usersCard mobImgCenter">
            <img src={loginUpstart} className="loginUpstart" style={{ width: '200px', marginTop: '40px' }} />
          </Col>
        </Row>
        <Row gutter={40} className="inner-Signuser">
          <Col md={8} xs={24} className="usersCard mobImgCenter">
            <img src={signupleft} />
          </Col>
          <Col md={16} xs={24} className="usersCard mobImgCenter">
            <Form name="user-form" form={form} layout="vertical" className="login-form-main signup-form">
              <div className="login-form">
                <h1>Let’s set you up ...</h1>

                <div className="inputIcon-Main">
                  <div className="inputIcon">
                    <input type="text" placeholder="Last Name" />
                  </div>
                  <div className="inputIcon">
                    <input type="text" placeholder="First Name" />
                  </div>
                </div>

                <div className="inputIcon middlename">
                  <input type="text" placeholder="Middle Name" />
                </div>

                <div className="inputIcon email-sign">
                  <input type="email" placeholder="Email" />
                </div>

                <div className="inputIcon pass-sign">
                  <input type="password" placeholder="Password" />
                </div>

                <div className="inputIcon current-Pass">
                  <input type="text" placeholder="Current Address" />
                </div>

                <div class="label-agree">
                  <input id="one" type="checkbox" />
                  <span class="check"></span>
                  <label for="one">I Agree Lorem Epsum</label>
                </div>

                <div className="inputlogin">
                  <input type="submit" value="Create my account" />
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Createnewuser;
