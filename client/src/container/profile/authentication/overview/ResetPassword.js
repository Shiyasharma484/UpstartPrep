import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { Form, Input, Button, Spin, notification, Alert } from 'antd';
import { AuthWrapper } from './style';
import Cookies from 'js-cookie';
import Heading from '../../../../components/heading/heading';
import { headers } from '../../../../helpers/variables';
import { useHistory, useParams } from 'react-router-dom';
import { get_api_request, post_api_request, put_api_request, api_url } from '../../../../helpers/Api';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const ResetPassword = () => {
  const history = useHistory();
  const params = useParams();
  const [state, setState] = useState({
    values: null,
    visible: false,
    loading: false,
  });
  const access_token = Cookies.get('access_token');
  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    token: access_token,
    device_id: '',
    api_version: '',
    browser: '',
    device_type: '',
  };
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { isLoading } = useSelector(state => {
    return {
      isLoading: state.auth.loading,
    };
  });

  const handleSubmit = values => {
    //console.log(values);
    const updateData = { password: values.pass1 };

    //==============================================
    async function updateDAta(updateData) {
      const postID = params.id;

      const url = api_url.UpdatePassword + postID;
      const response = await put_api_request(url, updateData, headers);
      console.log(headers);

      //make it async
      //console.log(response);
      // console.log('resp bckkkkkkkkkkkkkkkkkkkkkkkk');
      if (response.status === 201) {
        //send email to user that password has been changed successfully
        setSuccess('Password Set Successfully');
        setTimeout(() => {
          history.push('/');
        }, 1500);
        //NOW RE-GENERATE EMAIL that password was changed_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_++_+_+_+_+_+_+_+_+_+_+
        // async function sendEmailFP(postID) {
        //   await Axios.get(domainpath + `/user/email/changedpassword/${postID}`, { headers }).then(response1 => {
        //     //console.log(response1);
        //     if (response1.data.responsedata.message == 'Email Successfully Sent') {
        //       console.log('Email Successfully Sent');
        //     } else {
        //       console.log('Email not sent');
        //     }
        //   });
        // }
        // sendEmailFP(postID);
        //ends+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+
        //
      } else if (response.status === 204) {
        console.log('No Such user in db');
        setError('No Such user in db');
      }
      // else if (response.status === 400) {
      //   setError(response.Error);
      // }
      // })
    }
    updateDAta(updateData);
    //=================================================
  };
  const { visible, loading } = state;

  return (
    <AuthWrapper>
      {/* just spaces */}
      <br />
      <br />
      <br />
      <br />
      <div className="auth-contents">
        <Form
          name="OneTimePass"
          onFinish={handleSubmit}
          layout="vertical"
          style={{ background: 'white', padding: '30px' }}
        >
          <Heading as="h3" style={{ fontSize: '24px', fontWeight: '800', marginBottom: '45px' }}>
            Reset Password
          </Heading>
          <p className="otp-text">Please reset your password by creating a new one.</p>
          <Spin spinning={loading} delay={500}>
            <Form.Item
              name="pass1"
              autoComplete="on"
              label="Enter New Password"
              rules={[
                {
                  message: 'Please enter your new password',
                  required: true,
                },
                // { min: 8, message: 'Password must be minimum 8 characters.' },
                {
                  pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/,
                  message: 'Password must be minimum 8 characters, a numeric character, a special character',
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            {/* <Form.Item
              name="confirm_password"
              label="Confirm New Password"
              rules={[
                {
                  message: 'Please Re-enter your new password',
                  required: true,
                },
                { min: 8, message: 'New password and confirm password should be same.' },
              ]}
            >
              <Input />
            </Form.Item> */}
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
          </Spin>
          <Form.Item>
            <Button className="btn-reset" htmlType="submit" type="primary" size="large">
              {isLoading ? 'Loading...' : 'Submit'}
            </Button>
          </Form.Item>
          {/* <p className="return-text">
            Resend OTP?<NavLink to="/">&nbsp; Click here.</NavLink>
          </p> */}
          <Form.Item>
            <Button className="btn-loginmessage" style={{ borderColor: 'green' }}>
              {success != 'null' ? success : ''}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default ResetPassword;
