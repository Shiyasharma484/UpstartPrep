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
  useEffect(() => {
    async function getemailsetting() {
      const url = api_url.get_config;
      const response = await get_api_request(url, headers);

      const configdata = response?.data?.responsedata?.configurations?.[0];
      form.setFieldsValue({
        username: configdata?.email_settings_username,
        password: configdata?.email_settings_password,
        address: configdata?.email_settings_address,
        encryption: configdata?.email_settings_encryption,
        host_name: configdata?.email_settings_host_name,
        name: configdata?.email_settings_name,
        port: configdata?.email_settings_port,
      });
    }
    getemailsetting();
  }, []);
  const HanleSubmit = fieldsValue => {
    console.log(fieldsValue);
    var payload = {
      email_settings_username: fieldsValue?.username,
      email_settings_password: fieldsValue?.password,
      email_settings_address: fieldsValue?.address,
      email_settings_encryption: fieldsValue?.encryption,
      email_settings_host_name: fieldsValue?.host_name,
      email_settings_name: fieldsValue?.name,
      email_settings_port: fieldsValue?.port,
    };
    console.log(payload);
    async function Updateemailsettings() {
      const url = api_url.get_config;
      const response = await put_api_request(url, payload, headers);

      if (response.status == 201) {
        notification.success({
          message: 'Email Settings Updated Successfully',
        });
      } else {
        notification.error({
          message: response.status,
        });
      }
    }
    Updateemailsettings();
  };

  return (
    <>
      <PageHeader ghost title="" />
      <Main className="SettingForm">
        <Row gutter={30}>
          <Col md={24}>
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
              <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Email SMTP Configuration</h1>
            </div>
          </Col>
          <Col md={24}>
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
              <Cards>
                <Form
                  name="sDash_validation-form GeneralsettingsForm"
                  id="emailsettings"
                  //className="AddForm contactForm"
                  form={form}
                  layout="vertical"
                  onFinish={HanleSubmit}
                >
                  <Row gutter={30} className="togglefield settingsform ">
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="host_name" label="Host Name">
                        <Input name="host_name"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="port" label="Port Number">
                        <Input name="port"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="username" label="User Name">
                        <Input name="port"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="password" label="Password">
                        <Input name="password" type="password"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="encryption" label="Encryption">
                        <Input name="encryption"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="address" label="From Address">
                        <Input name="address"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="name" label="From Name">
                        <Input name="name"></Input>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                      <Button htmlType="submit" type="success" size="default" className="btn-animation">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Cards>
            </div>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default GeneralSetting;
