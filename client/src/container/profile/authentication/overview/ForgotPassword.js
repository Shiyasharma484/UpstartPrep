import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { Row, Col, Form, notification, Input, Button, Select, DatePicker, Checkbox, Radio, Spin } from 'antd';
//import Otp from '../../../ecommerce/overview/Otp';
import { AuthWrapper } from './style';
import Cookies from 'js-cookie';
import Heading from '../../../../components/heading/heading';
import { headers } from '../../../../helpers/variables';
import { useHistory } from 'react-router-dom';
import { get_api_request, post_api_request, put_api_request, api_url } from '../../../../helpers/Common';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const ForgotPassword = () => {
  const history = useHistory();
  const [ConfigData, setConfigData] = useState([]);
  const [showlogo, setshowlogo] = useState();
  const [state, setState] = useState({
    values: null,
    visible: false,
    loading: false,
  });
  // const handleSubmit = values => {
  //   setState({ ...state, values });
  // };
  const [error, setError] = useState(null);

  const { loading } = state;

  const toggle = status => {
    // to open notification after 2 seconds
    setTimeout(() => {
      notification.open({
        message: 'Email is being sent',
      });
    }, 2000);
    // to close old notification and start new after 4 seconds
    // setTimeout(() => {
    //   notification.destroy();
    // }, 4000);
    // setTimeout(() => {
    //   notification.success({
    //     message: 'Email has been sent successfully',
    //   });
    // }, 3500);
    // // to close notification
    // setTimeout(() => {
    //   notification.destroy();
    //   setState({ loading: false });
    //   if (status == 200) {
    //     history.push('../oneTimePassword');
    //   } else {
    //     setError('Invalid Account Detail');
    //   }
    // }, 4500);
  };
  useEffect(() => {
    const enc_user_detail = Cookies.get('UserDetail');

    async function GetConfiguration() {
      const url = api_url.get_all_configurations;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const configdata = response?.data?.responsedata?.configurations[0].message;
        const configData = response?.data?.responsedata?.configurations[0];
        setConfigData(configData);
        const show_logo = response?.data?.responsedata?.configurations[0]?.site_logo;
        console.log(show_logo);
        setshowlogo(show_logo);
      } else {
        console.log('error');
      }
    }
    GetConfiguration();
  }, []);
  const handleSubmit = values => {
    setError(null);
    //console.log(values);
    //CHECK FOR RECEIVED VALUE IS EMAIL OR PHONE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const phoneoremailvalue = values.phoneoremail;
    var checkemailorphone = isValidEmail(phoneoremailvalue); // true
    //console.log(checkemailorphone);
    function isValidEmail(phoneoremailvalue) {
      //console.log(!isNaN(phoneoremailvalue));
      var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (phoneoremailvalue.match(emailRegex) && typeof phoneoremailvalue === 'string') {
        return 'email';
      } else if (!isNaN(phoneoremailvalue)) {
        return 'phone';
      }
    }

    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if (checkemailorphone === 'email') {
      async function SendEmail() {
        const url = api_url.forgot_password;
        const request = { email: phoneoremailvalue };
        setState({ loading: true }); // to start spinner
        toggle();
        const response = await post_api_request(url, request, headers);
        // console.log(response);

        if (response.status == 200) {
          setState({ loading: false }); // to stop spinner

          notification.success({ message: 'Email sent successfully' });
          // setTimeout(() => {
          //   notification.destroy();
          //   //
          // }, 2000);
          history.push('../oneTimePassword');
        } else {
          setError('Invalid Account Detail');
        }
      }
      SendEmail();
      // //check for user==========================================================================
      // async function checkEmailPhoneFP(checkemailorphone) {
      //   var postData = {};
      //   if (checkemailorphone === 'email') {
      //     postData = { email: phoneoremailvalue };
      //   } else if (checkemailorphone === 'phone') {
      //     postData = { phone: phoneoremailvalue };
      //   }

      //   await Axios.post(domainpath + '/user/checkuser', postData, { headers }).then(response => {
      //     //console.log(response);
      //     //console.log('resp bck check user exists for given details');
      //     if (response.data.message === 'phone' || response.data.message === 'email') {
      //       //accounts exists===================================================================

      //       const postID = response.data.userId; //already encrypted
      //       toggle(postID);
      //       // alert('account exists');
      //       //NOW GENERATE EMAIL and OTP +_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+
      //       async function sendEmailFP(postID) {
      //         console.log(domainpath);

      //         await Axios.get(domainpath + `/user/email/forgotpassword/${postID}`, { headers })
      //           .then(response1 => {
      //             console.log(response1);
      //             if (response1.data.responsedata.message == 'Email Successfully Sent') {
      //               console.log('Email Successfully Sent');
      //               // alert('Email Successfully Sent');
      //               //  var updateData = response1.data.responsedata; //contains message, vcode
      //               //console.log(updateData);
      //               //   delete updateData['message']; //removed message
      //               //console.log(updateData);
      //               //save verification code in db and get updated time from db+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      //               // async function updateDATA(updateData) {
      //               //   await Axios.put(domainpath + `/user/update/${postID}`, updateData, { headers }).then(response => {
      //               //     //make it async
      //               //     //console.log(response);

      //               //     if (response.status === 200) {
      //               //       console.log('resp bck --saved vcode in db');
      //               //       //console.log(response);
      //               //       // const uptimevcodesavedindb = response.data.responsedata.user[0].updated_at;
      //               //       //console.log(uptimevcodesavedindb);
      //               //       //alert('vcode saved in db successfully');
      //               //     } else if (response.status === 204) {
      //               //       console.log('No Such user in db');
      //               //       setError('No Such user in db');
      //               //     } else if (response.status === 400) {
      //               //       setError(response.Error);
      //               //     }
      //               //   });
      //               // }
      //               // updateDATA(updateData);
      //             } else {
      //               console.log('Email not sent');
      //               //alert('Email not sent');
      //             }
      //           })
      //           .catch(error => {
      //             notification.error({
      //               message: error.response.data.message,
      //             });
      //           });
      //       }
      //       sendEmailFP(postID);
      //       //ends+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+
      //     } else if (response.data.message === 'itsnewuser') {
      //       setError('Invalid Account Details');
      //     }
      //   });
      // }
      // checkEmailPhoneFP(checkemailorphone);
    } else {
      setError('Neither email');
    }
  };

  // const showModal = () => {
  //   // setState({
  //   //   ...state,
  //   //   visible: true,
  //   // });

  // };

  // const onCancel = () => {
  //   setState({
  //     ...state,
  //     visible: false,
  //   });
  // };

  return (
    <AuthWrapper>
      {/* just spaces */}
      <Row gutter={15} style={{ background: '#f3f4f6' }} className="forget-main">
        <Col>
          <div className="auth-contents">
            <Form name="forgotPass" id="forgotPass" onFinish={handleSubmit} layout="vertical">
              <div className="logo-forgot">
                <NavLink className="pass-link" to="/">
                  <img src={domainpath + showlogo} />
                </NavLink>
              </div>

              <div className="forgot-box" style={{ background: 'white', padding: '30px' }}>
                <p className="forgot-text">
                  Forgot your password? No problem. Just let us know your email address and we will email you a password
                  reset link that will allow you to choose a new one.
                </p>
                <Spin spinning={loading} delay={500}>
                  <Form.Item
                    name="phoneoremail"
                    rules={[
                      {
                        message: 'Please input your Phone or Email!',
                        required: true,
                      },
                      { min: 10, message: 'Email must be minimum 10 characters.' },
                    ]}
                    initialValue="1234567890"
                    label="Email"
                  >
                    {/* <Alert
              message="Alert message"/> */}
                    <Input />
                  </Form.Item>
                </Spin>
                {/* <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
          >
            <Input placeholder="name@example.com" />
          </Form.Item> */}

                {/* <Button onClick={showModal} className="btn-reset" htmlType="submit" type="primary" size="large"> */}
                {/* <Suspense
              fallback={
                <div className="spin">
                  <Spin />
                </div>
              }
            >
            </Suspense> */}

                <div className="forgotSubmit">
                  <Button className="btn-reset" htmlType="submit" type="primary" size="large">
                    EMAIL PASSWORD RESET OTP
                  </Button>
                </div>
                {/* <p className="return-text">
                  Return to <NavLink to="/">Sign In</NavLink>
                </p> */}

                <Button className="btn-loginmessage" type="danger">
                  {error !== 'null' ? error : ''}
                </Button>

                {/* <p>
            <NavLink to="/oneTimePassword">OTP</NavLink>
          </p> */}
              </div>
            </Form>
          </div>
        </Col>
      </Row>
      {/* <Otp onCancel={onCancel} visible={visible} /> */}
    </AuthWrapper>
  );
};

export default ForgotPassword;
