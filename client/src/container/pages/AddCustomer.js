import React, { useEffect, useState } from 'react';
import { Row, Col, Form } from 'antd';
import { useHistory } from 'react-router-dom';
import { PageHeader } from '../../components/page-headers/page-headers';
import { AddUser } from '../../container/pages/style';
import { Button } from '../../components/buttons/buttons';
import { Input, notification, Image } from 'antd';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import Cookies from 'js-cookie';
import authorizes from '../../../src/static/img/authorized.png';
import { headers } from '../../helpers/variables';
import { post_api_request, api_url } from '../../helpers/Common.js';

const { encrypt, decrypt } = require('../../helpers/encryption-decryption');

var ModuleName = 'DASHBOARD';
const AddNewCustomer = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const [permission, setPermission] = useState(false);

  useEffect(() => {
    const enc_user_detail = Cookies.get('UserDetail');
    const response = decrypt(enc_user_detail);
    const UserInfo = response?.sessdata?.user?.[0];
    const GetRole = UserInfo?.user_role?.toUpperCase();
    const modules = UserInfo?.permissions?.[GetRole].MODULES;
    if (modules[ModuleName]) {
      setPermission(true);
      const value = modules[ModuleName]; //get module values
      const getvalue = value.split(',');
    } else {
      notification.error({
        message: 'Permissions Not Valid',
      });
    }
  }, []);

  const handleSubmit = fieldsvalue => {
    var payload = {};
    payload['first_Name'] = fieldsvalue.first_Name;
    payload['last_Name'] = fieldsvalue.last_Name;
    payload['phone'] = fieldsvalue.phone;
    payload['email'] = fieldsvalue.email;
    payload['password'] = fieldsvalue.password;
    console.log(payload)
    async function CreateCustomer(data) {
      const url = api_url.create_user;
      const response = await post_api_request(url, data, headers);
      console.log(response)
      if (response.status == 201) {
        notification.success({
          message: response?.data?.responsedata,
        });
        setTimeout(() => {
          console.log('This will run after 1 second!');
          history.push('../users/customer-list');
        }, 1000);
        // history.push('../users/customer-list');
      
      } else
        notification.error({
          message: 'Server Error',
        });
    }
    CreateCustomer(payload);
  };

  return (
    <>
      <PageHeader
        ghost
        title="Add Customer"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button onClick={() => history.push(`../users/customer-list`)} size="small" key="4" type="primary">
              View List
            </Button>
          </div>,
        ]}
      />
      {permission == true ? (
        <Main>
          <Row gutter={15}>
            <Col xs={24}>
              <AddUser>
                <Cards>
                  <Form name="sDash_validation-form" form={form} layout="vertical" onFinish={handleSubmit}>
                    <Row gutter={30}>
                      <Col md={8} xs={24}>
                        <Form.Item
                          name="first_Name"
                          label="First Name"
                          rules={[
                            {
                              required: true,
                              message: 'Please Enter First_Name !',
                            },
                          ]}
                        >
                          <Input name="" placeholder="First_Name" />
                        </Form.Item>
                      </Col>
                      <Col md={8} xs={24}>
                        <Form.Item
                          name="last_Name"
                          label="Last Name"
                          rules={[
                            {
                              required: true,
                              message: 'Please Enter Last_Name !',
                            },
                          ]}
                        >
                          <Input name="" placeholder="Last_Name" />
                        </Form.Item>
                      </Col>
                      <Col md={8} xs={24}>
                        <Form.Item
                          name="email"
                          initialValue=""
                          label="Email"
                          rules={[
                            {
                              required: false,
                              message: 'Please Enter Email !',
                            },
                            {
                              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: 'Please Enter Correct Email',
                            },
                          ]}
                        >
                          <Input placeholder="Email" name="" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={30}>
                      <Col md={8} xs={24}>
                        <Form.Item
                          name="phone"
                          initialValue=""
                          label="Phone Number"
                          rules={[
                            {
                              required: false,
                              message: 'Please Enter Email !',
                            },
                          ]}
                        >
                          <Input type="number" placeholder="Phone Number" name="" />
                        </Form.Item>
                      </Col>
                      <Col md={8} xs={24}>
                        <Form.Item
                          name="password"
                          autoComplete="on"
                          label="Enter New Password"
                          rules={[
                            {
                              message: 'Please enter your new password',
                              required: true,
                            },
                            {
                              pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/,
                              message:
                                'Password must be minimum 8 characters, a numeric character, a special character',
                            },
                          ]}
                          hasFeedback
                        >
                          <Input placeholder="password" />
                        </Form.Item>
                      </Col>

                      <Col md={8} xs={24}>
                        <Form.Item
                          name="Cpassword"
                          autoComplete="on"
                          label="Confirm Password"
                          dependencies={['password']}
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                              },
                            }),
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Form.Item>
                        <div className="add-user-bottom text-right">
                          <Button htmlType="submit" type="success" size="default">
                            Submit
                          </Button>
                        </div>
                      </Form.Item>
                    </Row>
                  </Form>
                </Cards>
              </AddUser>
            </Col>
          </Row>
        </Main>
      ) : (
        <div className="authorized_msg">
          <img src={authorizes} width="40%" />
        </div>
      )}
    </>
  );
};

export default AddNewCustomer;
