import React, { useEffect, useState } from 'react';
import { Row, Col, Form, notification, Input, Button, Select, Switch } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { AddUser } from './style';
import Cookies from 'js-cookie';
import { Main } from '../styled';
import 'moment/locale/zh-cn';
import { Cards } from '../../components/cards/frame/cards-frame';
import { get_api_request, post_api_request, put_api_request, api_url } from '../../helpers/Common';
import { headers } from '../../helpers/variables';
import TextArea from 'antd/lib/input/TextArea';
// import { encrypttheid } from '../../helpers/encode-decode';

const { decrypt } = require('../../helpers/encryption-decryption');

const GeneralSetting = () => {
  const [form] = Form.useForm();
  useEffect(() => {}, []);

  return (
    <>
      <PageHeader ghost title="" />
      <Main className="SettingForm">
        <div
          data-aos="fade-down"
          data-aos-offset="10"
          data-aos-delay="50"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="center"
        >
          <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Maintenance Settings (v1.4.1)</h1>
        </div>

        <div
          data-aos="fade-up"
          data-aos-offset="10"
          data-aos-delay="50"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="center"
        >
          <Row gutter={30}>
            <Col md={4} xs={24} style={{ textAlign: 'right' }}>
              <h3>Clear Cache</h3>
            </Col>
            <Col md={20} xs={24}>
              <Cards>
                <Form
                  name="sDash_validation-form GeneralsettingsForm"
                  //className="AddForm contactForm"
                  form={form}
                  layout="vertical"
                  //onFinish={addDetails}
                >
                  <Row gutter={30} className="togglefield settingsform ">
                    <Col md={16}>
                      <p>
                        If necessary, you may clear your application cache. This action may slow down application for a
                        while.
                      </p>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col md={24} xs={24} className="mainteneceBtn">
                      <Button htmlType="submit" type="success" size="default" className="btn-animation">
                        Clear Cache
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Cards>
            </Col>
          </Row>
        </div>

        <div
          data-aos="fade-up"
          data-aos-offset="10"
          data-aos-delay="50"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="center"
        >
          <Row gutter={30}>
            <Col md={4} xs={24} style={{ textAlign: 'right' }}>
              <h3>Expire Schedules</h3>
            </Col>
            <Col md={20} xs={24}>
              <Cards>
                <Form
                  name="sDash_validation-form GeneralsettingsForm"
                  //className="AddForm contactForm"
                  form={form}
                  layout="vertical"
                  //onFinish={addDetails}
                >
                  <Row gutter={30} className="togglefield settingsform ">
                    <Col md={16}>
                      <p>
                        If you configure task schedule this action can takes place every six hours. If not, you can
                        manually mark all the schedules that passed end date as expired in the database.
                      </p>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col md={24} xs={24} className="mainteneceBtn">
                      <Button htmlType="submit" type="success" size="default" className="btn-animation">
                        Mark Completed Schedules as Expired
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Cards>
            </Col>
          </Row>
        </div>

        <div
          data-aos="fade-up"
          data-aos-offset="10"
          data-aos-delay="50"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="center"
        >
          <Row gutter={30}>
            <Col md={4} style={{ textAlign: 'right' }}>
              <h3>Fix Storage Links</h3>
            </Col>
            <Col md={20} xs={24}>
              <Cards>
                <Form
                  name="sDash_validation-form GeneralsettingsForm"
                  //className="AddForm contactForm"
                  form={form}
                  layout="vertical"
                  //onFinish={addDetails}
                >
                  <Row gutter={30} className="togglefield settingsform ">
                    <Col md={16} xs={24}>
                      <p>
                        After installing/updating the application with latest files, you may need to update storage
                        links. You can do that by using this option.
                      </p>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col md={24} xs={24} className="mainteneceBtn">
                      <Button htmlType="submit" type="success" size="default" className="btn-animation">
                        Fix Storage Links
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Cards>
            </Col>
          </Row>
        </div>

        <div className="horrizontalRow"></div>

        <div
          data-aos="fade-up"
          data-aos-offset="10"
          data-aos-delay="50"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="center"
        >
          <Row gutter={30}>
            <Col md={4} style={{ textAlign: 'right' }}>
              <h3>Fix App Updates</h3>
            </Col>
            <Col md={20} xs={24}>
              <Cards>
                <Form
                  name="sDash_validation-form GeneralsettingsForm"
                  //className="AddForm contactForm"
                  form={form}
                  layout="vertical"
                  //onFinish={addDetails}
                >
                  <Row gutter={30} className="togglefield settingsform ">
                    <Col md={16} xs={24}>
                      <p>
                        After updating the application with latest files, we need to fix some settings. You can do that
                        by using this option.
                      </p>
                    </Col>
                  </Row>
                  <Row gutter={30} xs={24}>
                    <Col md={24} xs={24} className="mainteneceBtn">
                      <Button htmlType="submit" type="success" size="default" className="btn-animation">
                        Fix App Updates
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Cards>
            </Col>
          </Row>
        </div>

        <div
          data-aos="fade-up"
          data-aos-offset="10"
          data-aos-delay="50"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="center"
        >
          <Row gutter={30}>
            <Col md={4} style={{ textAlign: 'right' }}>
              <h3>Debug Mode</h3>
            </Col>
            <Col md={20}>
              <Cards>
                <Form
                  name="sDash_validation-form GeneralsettingsForm"
                  //className="AddForm contactForm"
                  form={form}
                  layout="vertical"
                  //onFinish={addDetails}
                >
                  <Row gutter={30} className="togglefield settingsform ">
                    <Col md={16} xs={24}>
                      <p>Enabling debug mode will expose sensitive data.</p>
                    </Col>
                    <Col md={16} xs={24} className="DebugMode">
                      <span style={{ marginRight: '40px' }}>Debug Mode (Enabled)</span>
                      <Switch />
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col md={24} xs={24} className="mainteneceBtn">
                      <Button htmlType="submit" type="success" size="default" className="btn-animation">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Cards>
            </Col>
          </Row>
        </div>
      </Main>
    </>
  );
};

export default GeneralSetting;
