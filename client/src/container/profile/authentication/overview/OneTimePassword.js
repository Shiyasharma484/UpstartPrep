import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { Form, Input, Button, Spin, notification, Alert } from 'antd';
import { AuthWrapper } from './style';
import Heading from '../../../../components/heading/heading';
import { headers } from '../../../../helpers/variables';
import { useHistory, useParams } from 'react-router-dom';
import { get_api_request, post_api_request, put_api_request, api_url } from '../../../../helpers/Api';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const OneTimePassword = () => {
  const history = useHistory();
  const params = useParams();
  const [state, setState] = useState({
    values: null,
    visible: false,
    loading: false,
  });

  // const [error, setError] = useState(null);
  var [showrotp, setShowROTP] = useState(0);
  var [count, setCount] = useState(1); //for otp correct/incorrect 3 times
  var [countresend, setCountresend] = useState(1); //for resending new otp 3 times
  const [message, setMessage] = useState(null);

  useEffect(() => {
    //setShowROTP(0);
    const oncomponentload = () => {
      setTimeout(() => {
        setShowROTP(1);
      }, 7000);
    };
    oncomponentload();
  }, []);
  //
  const handleResendOtp = () => {
    setCount(1);
    setCountresend(prevCount => prevCount + 1);
    //console.log(countresend);
    if (countresend < 4) {
      setMessage(`Re-send Otp is in progress, ${3 - countresend} attempts remaining`);
      setState({ loading: true }); // to start spinner

      // to open notification after 2 seconds
      setTimeout(() => {
        notification.open({
          message: 'OTP is being sent',
        });
      }, 1000);
      // to close old notification and start new after 4 seconds
      setTimeout(() => {
        notification.destroy();
      }, 2500);
      setTimeout(() => {
        notification.success({
          message: 'New OTP sent on email successfully',
        });
      }, 3000);
      // to close notification
      setTimeout(() => {
        notification.destroy();
        setState({ loading: false });
        setMessage('Enter New OTP from new email');
      }, 5000);

      // //get id from url========================
      // const postID = params.id;
      // //console.log(postID);
      // //ends===================================
      // sendEmailFP(postID);
    } else {
      setMessage('Attempts Exhausted. You are being redirected.');
      setTimeout(() => {
        history.push('/');
      }, 2000);
    }
  };
  //
  // //NOW RE-GENERATE EMAIL and OTP +_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+
  // async function sendEmailFP(postID) {
  //   await Axios.get(domainpath + `/user/email/forgotpassword/${postID}`, { headers })
  //     .then(response1 => {
  //       console.log(response1);
  //       if (response1.data.responsedata.message == 'Email Successfully Sent') {
  //         console.log('Email Successfully Sent');
  //       } else {
  //         console.log('Email not sent');
  //         alert('Email not sent');
  //       }
  //     })
  //     .catch(error => {
  //       notification.error({
  //         message: error.response.data.message,
  //       });
  //     });
  // }
  // //ends+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+
  // //

  const handleSubmit = values => {
    // setCount(prevCount => prevCount + 1);
    // console.log(count);
    //  const postID = params.id;
    //console.log(values);
    var enteredOTP = {};
    enteredOTP.verification_code = values.otpcode;
    enteredOTP.entity = 'Forgot Password';
    //console.log(enteredOTP);
    //
    var condition_chk = 0;
    async function verifyTimeExpiryAndCode() {
      // console.log(postID);
      const url = api_url.verifyotp;

      const response = await post_api_request(url, enteredOTP, headers);
      // await Axios.post(domainpath + `/user/verifyotp/${postID}`, enteredOTP, { headers }).then(response => {
      //make it async
      // console.log(response);
      const postID = response?.data?.responsedata?.user_id;
      if (response.status === 200) {
        condition_chk = 1;
        setMessage('OTP Validation Successful. Proceeding to Set Password Page');
        setTimeout(() => {
          history.push(`/resetPassword/${postID}`);
        }, 1000);

        //alert('vcode saved in db successfully');
      } else if (response.status === 204) {
        // console.log('Else Error');
        setMessage('Server Error');
        //&&&&&&&&&&&&&&&&&&&&&&----check for valid otp---&&&&&&&&&&&&&&&&&&&&&&&&&---STARTS
        //  console.log('prevCount + 1');
        setCount(prevCount => prevCount + 1);
        //===============check count==========================+++++++++++++++++STARTS
        if (count > 2) {
          setMessage('Attempts Exhausted. Retry Forgot option. You are being redirected back to Forgot Password Page');

          setTimeout(() => {
            history.push('/forgotPassword');
          }, 3000);
        } else {
          //alert('invalid OTP entered');

          setMessage(`Invalid OTP entered. ${3 - count} attempts remaining`);
        }
        //===============check count===========================++++++++++++++++++ENDS

        //&&&&&&&&&&&&&&&&&&&&&&----check for valid otp---&&&&&&&&&&&&&&&&&&&&&&&&&---ENDS
      } else {
        // console.log('Else Error');
        condition_chk = 0;
        //checkAttempts();
        setMessage('Server Error');
      }
      //});
    }
    verifyTimeExpiryAndCode();

    // setState({ ...state, values });
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
          name="oneTimePass"
          onFinish={handleSubmit}
          layout="vertical"
          style={{ background: 'white', padding: '30px' }}
        >
          <Heading as="h3" style={{ fontSize: '24px', fontWeight: '800', marginBottom: '45px' }}>
            Validate OTP
          </Heading>
          <p className="otp-text">
            The OTP has been sent to your registered email address. Please enter the 6 Digit OTP you have recieved to
            generate new password.
          </p>
          <Spin spinning={loading}>
            <Form.Item name="otpcode" initialValue="" label="Enter OTP">
              <Input />
            </Form.Item>

            <Form.Item>
              <Button className="btn-reset" htmlType="submit" type="primary" size="large">
                Validate
              </Button>
            </Form.Item>

            <Form.Item>
              <Button className="btn-loginmessage" style={{ borderColor: 'red' }}>
                {/* {error != 'null' ? error : ''} */}
                {message != 'null' ? message : ''}
              </Button>
            </Form.Item>
            {/* {showrotp != '0' ? (
              <p>
                Didn't get OTP, Resend Now by clicking here.&nbsp;
                <a className="return-text" onClick={handleResendOtp}>
                  Click here.
                </a>
              </p>
            ) : (
              ''
            )} */}
            {/* <p className="return-text">
                        Reset Password?<NavLink to="/resetPassword">&nbsp; Click here.</NavLink>
                    </p> */}
          </Spin>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default OneTimePassword;
