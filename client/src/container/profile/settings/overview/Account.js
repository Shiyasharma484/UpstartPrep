import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input } from 'antd';
import { AccountWrapper } from './style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { BasicFormWrapper } from '../../../styled';
import Heading from '../../../../components/heading/heading';

const Account = () => {
  const [form] = Form.useForm();

  const [state, setState] = useState({
    name: 'clayton',
    values: null,
  });
  useEffect(() => {
    async function fetchData() {
      const url = api_url.get_settings;
      const response = await get_api_request(url, headers);
      const config_Data = response?.data?.responsedata?.configurations;
      console.log(config_Data);
      fetchData();
    }
  }, []);

  const handleSubmit = fieldvalue => {
    var payload = {};
    // const profile = {
    //   name: '',
    //   phone: '',
    //   country: '',
    //   city: '',
    //   company: '',
    //   website: '',
    //   userBio: '',
    //   skills: '',
    // };
    payload['account'] = fieldvalue;
    console.log(payload);
    //console.log(fieldvalue);
  };

  const handleCancel = e => {
    e.preventDefault();
    form.resetFields();
  };

  const handleChange = e => {
    setState({
      name: e.target.value,
    });
  };

  return (
    <AccountWrapper>
      <Cards
        title={
          <div className="setting-card-title">
            <Heading as="h4">Account Settings</Heading>
            <span>Update your username and manage your account</span>
          </div>
        }
      >
        <Row>
          <Col xs={24}>
            <BasicFormWrapper>
              <Form form={form} name="editAccount" onFinish={handleSubmit}>
                <div className="account-form-top">
                  <Row justify="center">
                    <Col xxl={10} lg={16} md={18} xs={24}>
                      <div className="account-form">
                        <Form.Item name="username" initialValue={state.name} label="Username">
                          <Input onChange={handleChange} />
                        </Form.Item>
                        <p>
                          Your Dashboard URL: http://dashboard.com/<span>{state.name}</span>
                        </p>
                        <Form.Item
                          name="email"
                          initialValue="contact@example.com"
                          rules={[{ type: 'email' }]}
                          label="Email"
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="account-form-bottom">
                  <Row justify="center">
                    <Col xxl={10} lg={16} md={18} xs={24}>
                      <div className="account-closing">
                        <Row>
                          <Col lg={18} md={24} sm={18} xs={24}>
                            <Heading className="account-closing__title" as="h4">
                              Close Account
                            </Heading>
                            <p>Delete Your Account and Account data</p>
                          </Col>
                          <Col lg={6} md={24} sm={6} xs={24}>
                            <Button size="small" type="danger">
                              Close Account
                            </Button>
                          </Col>
                        </Row>
                      </div>
                      <div className="account-action">
                        <div className="setting-form-actions">
                          <Button size="default" htmlType="submit" type="primary">
                            Save Change
                          </Button>
                          &nbsp; &nbsp;
                          <Button size="default" onClick={handleCancel} type="light">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Form>
            </BasicFormWrapper>
          </Col>
        </Row>
      </Cards>
    </AccountWrapper>
  );
};

export default Account;
