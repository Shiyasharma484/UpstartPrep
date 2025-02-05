import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Button, notification, Spin } from 'antd';
import { ChangePasswordWrapper } from './style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../../styled';
import Heading from '../../../../components/heading/heading';
//import { headers } from '../../../../helpers/variables';
import { useHistory } from 'react-router-dom';
// import { decrypt } from '../../../../helpers/encryption-decryption';

import Cookies from 'js-cookie';
import { put_api_request, api_url } from '../../../../helpers/Api';
const { decrypt } = require('../../../../helpers/encryption-decryption');

const Password = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [state, setState] = useState({
    values: null,
    loading: false,
  });
  const [error, setError] = useState(null);
  const [UserID, setUserID] = useState();
  const access_token = Cookies.get('access_token');
  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    token: 'Bearer ' + access_token,
    device_id: '',
    api_version: '',
    browser: '',
    device_type: '',
  };

  useEffect(() => {
    const enc_user_detail = Cookies.get('UserDetail');
    var userDetail = decrypt(enc_user_detail);
    const userID = userDetail?.sessdata?.users_id;
    setUserID(userID);
  }, []);
  const handleSubmit = values => {
    setState({ loading: true });

    var payload = {};
    payload['old_password'] = values.old;
    payload['password'] = values.pass1;

    async function updateDAta(id, payload) {
      const url = api_url.UpdatePassword + id;
      const response = await put_api_request(url, payload, headers);
      console.log(response);
      if (response.status === 201) {
        notification.success({
          message: 'Password Changed Successfully',
        });
        setTimeout(() => {
          setState({ loading: false });
        }, 1000);
        setState({ loading: false });
      } else if (response.status === 'error') {
        setError(response.message);
        notification.error({
          message: response.message,
        });
        setTimeout(() => {
          setState({ loading: false });
        }, 1000);
      }
      // });
    }
    updateDAta(UserID, payload);
  };
  const handleCancel = e => {
    e.preventDefault();
    form.resetFields();
  };
  const { visible, loading } = state;
  return (
    <ChangePasswordWrapper>
      <Cards
        title={
          <div className="setting-card-title">
            <Heading as="h4">Password Settings</Heading>
            <span>Change or reset your account password</span>
          </div>
        }
      >
        <Row justify="center">
          <Col lg={12} sm={20} xs={24}>
            <BasicFormWrapper>
              <Spin spinning={loading}>
                <Form form={form} name="changePassword" onFinish={handleSubmit}>
                  <Form.Item name="old" label="Old Password">
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="pass1"
                    autoComplete="on"
                    label="Enter New Password"
                    dependencies={['old']}
                    rules={[
                      {
                        message: 'Please enter your new password',
                        required: true,
                      },
                      {
                        pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/,
                        message: 'Password must be minimum 8 characters, a numeric character, a special character',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (getFieldValue('old') === value) {
                            return Promise.reject(new Error('Old Password and New Password Cannot be same!'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                    hasFeedback
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="pass2"
                    autoComplete="on"
                    label="Confirm Password"
                    dependencies={['pass1']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('pass1') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item>
                    <div className="setting-form-actions">
                      &nbsp;
                      <Button htmlType="submit" type="primary">
                        Change Password
                      </Button>
                      &nbsp;
                      <Button size="default" onClick={handleCancel} type="light">
                        Cancel
                      </Button>
                    </div>
                  </Form.Item>
                  <Form.Item>
                    {/* <Button className="btn-loginmessage" style={{ borderColor: 'red' }}>
                      {error != null ? error : ''}
                    </Button> */}
                  </Form.Item>
                </Form>
              </Spin>
            </BasicFormWrapper>
          </Col>
        </Row>
      </Cards>
    </ChangePasswordWrapper>
  );
};

export default Password;
