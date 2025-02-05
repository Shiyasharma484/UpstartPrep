import React, { useState, useCallback, useEffect } from 'react';
import Axios from 'axios';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Row, Col, Form, notification, Input, Button, Select, DatePicker, Checkbox, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
//import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
// import { Auth0Lock } from 'auth0-lock';
import { AuthWrapper } from './style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { login, alreadyloggedin } from '../../../../redux/authentication/actionCreator';

import TextArea from 'antd/lib/input/TextArea';
//import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';
import hero_BG from '../../../../static/img/auth/home-hero-img.png';
import upstartWhite from '../../../../static/img/auth/logoupstartprep.png';
import FeatherIcon from 'feather-icons-react';
import { get_api_request, post_api_request, put_api_request, api_url } from '../../../../helpers/Common';
import { headers } from '../../../../helpers/variables';

//import { auth0options } from "../../../../config/auth0";

//Axios.defaults.withCredentials = true;
// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const SignIn = () => {
  const [ConfigData, setConfigData] = useState([]);
  const [showlogo, setshowlogo] = useState();
  const [Message, setMessage] = useState();

  //  console.log('React-I am in Sign in overview/');
  const history = useHistory(); //for redirects in page
  const dispatch = useDispatch();
  const { isLoading, isLogin, isMessage } = useSelector(state => {
    return {
      isLoading: state.auth.loading,
      isLogin: state.auth.login,
      isMessage: state.auth.message,
      isError: state.auth.error,
    };
  });
  // const isLoading = useSelector(state => state.auth.loading); //interacting with rootreducer for auth reducer
  // const isLogin = useSelector(state => state.auth.login); //interacting with rootreducer for auth reducer
  // const isMessage = useHistory(state => state.auth.message);
  const [form] = Form.useForm(); //form

  const [state, setState] = useState({
    checked: null,
  });
  useEffect(() => {
    async function GetConfiguration() {
      const url = api_url.get_all_configurations;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const configdata = response?.data?.responsedata?.configurations[0].message;
        const configData = response?.data?.responsedata?.configurations[0];
        setConfigData(configData);
        setMessage(configdata);
        const show_logo = response?.data?.responsedata?.configurations[0]?.site_logo;
        setshowlogo(show_logo);
      } else {
        console.log('error');
      }
    }
    GetConfiguration();
  }, []);
  // const lock = new Auth0Lock(clientId, domain, auth0options);//11111111111111111111111

  // //CHECKING for user already logged in or not---------------------------
  // useEffect(() => {
  //   //console.log(isLogin);
  //   console.log('1---UseEffect--React-checking for user already logged in or not');

  //   const aFunction = () => {
  //     console.log('2-inside async func');
  //     return Promise.resolve(dispatch(alreadyloggedin()));
  //   };
  //   aFunction()
  //     .then(() => {
  //       console.log('3--back to react ----inside .then');
  //       // console.log(isLogin);
  //       // {
  //       //   isLogin ? history.push('/dashboard') : history.push('/');
  //       // }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);
  // //checking for user already logged in or not ENDS---------------------------

  const [value, setValue] = useState(null);

  const handleLoginChange = e => {
    // console.log('radio checked', e.target.checked);
    setValue(e.target.checked);
    // console.log(value);
  };

  const handleSubmit = useCallback(
    values => {
      //  console.log('Received values of form: ', values);
      var postData = {
        phoneoremailvalue: values.phoneoremail,
        password: values.password,
      };
      //console.log(postData);
      // let entity = value;
      // if (entity != null) {
      //   console.log(entity);
      // }
      dispatch(login(postData));
      //dispatch(login(postData,entity));
      // isLogin ? history.push('/dashboard') : history.push('/'); //NOT REQ
    },
    [history, dispatch],
  );

  const onChange = checked => {
    setState({ ...state, checked });
  };

  // lock.on('authenticated', authResult => {
  //   lock.getUserInfo(authResult.accessToken, (error, profileResult) => {
  //     if (error) {
  //       return;
  //     }

  //     handleSubmit();
  //     lock.hide();
  //   });
  // });
  const HandleSubmitForm = (feildsvalue, e) => {
    var payload = {};
    payload['fullname'] = feildsvalue.fullname;
    payload['email'] = feildsvalue.email;
    payload['phone'] = feildsvalue.phone;
    payload['subject'] = feildsvalue.subject;
    async function CreateSection(data) {
      const url = `/contactus/`;
      const response = await post_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.message,
        });
        setTimeout(() => {
          //window.location.reload();
        }, 1000);
        // history.push('../users/customer-list');
      } else
        notification.error({
          message: 'Server Error',
        });
    }
    CreateSection(payload);
  };

  return (
    <AuthWrapper>
      {/* just spaces */}
      {/* <p className="auth-notice">
        Don&rsquo;t have an account?
        <NavLink to="/register">Sign up now</NavLink>
      </p> */}

      <Row style={{ background: '#fff' }} className="login-main">
        <Col md={24} xs={24} className="skillrow-inner">
          <Row style={{ background: '#fff' }} className="login-box LoginMain">
            <Col md={12} xs={24} style={{ borderRight: '1px solid rgba(243, 244, 246)' }} className="login-box-inner">
              <div className="login-left">
                {ConfigData?.login_logo != undefined ? (
                  <div>
                    <NavLink to="/">
                      <img src={ConfigData?.login_logo} style={{ width: '200px' }} />
                    </NavLink>
                  </div>
                ) : (
                  ''
                )}
                {ConfigData?.hero_image ? (
                  <img
                    src={ConfigData?.hero_image}
                    // className="mover"
                    style={{ width: '100%', margin: '110px 0px 0' }}
                  />
                ) : (
                  ''
                )}
                <p className="making-progress">{ConfigData?.title_login}</p>
                <p className="min-sec">{ConfigData?.sub_title_login}</p>
              </div>
            </Col>
            <Col md={12} xs={24} className="login-box-inner">
              <div className="auth-contents-login">
                <Form
                  name="login"
                  form={form}
                  onFinish={handleSubmit}
                  layout="vertical"
                  style={{ background: 'white', padding: '30px' }}
                >
                  <Heading as="h3" style={{ fontSize: '24px', fontWeight: '800', marginBottom: '45px' }}>
                    {ConfigData?.welcome_text_1}
                  </Heading>
                  <p className="title-nice"> {ConfigData?.welcome_text_2}</p>

                  <Button className="btn-loginmessage" type="text" danger>
                    {isMessage != 'null' ? isMessage : ''}
                  </Button>

                  {/* <Form.Item name="radio"
            label="Entity"
            rules={[
              {
                required: true,
                message: 'Please select your entity !',
              },
            ]}
          >
            <Radio.Group onChange={handleLoginChange} value={value}>
              <Radio value={'admin'}>Admin</Radio>
              <Radio value={'storeuser'}>Store User</Radio>
              <Radio value={'deliverypartner'}>Delivery Partner</Radio>
            </Radio.Group>
          </Form.Item> */}
                  <Form.Item
                    // label="Email / User Name"
                    name="phoneoremail"
                    rules={[
                      {
                        message: 'Please input your Phone or Email!',
                        required: true,
                      },
                      { min: 10, message: 'Phone/Email must be minimum 10 characters.' },
                    ]}
                    //  initialValue="2222222222"
                    //  initialValue="client1@gmail.com"
                    //label="Email Address"
                  >
                    <Input placeholder="Username/email" />
                  </Form.Item>
                  <Form.Item
                    //  label="Password"
                    name="password"
                    rules={[
                      {
                        message: 'Please input password',
                        required: true,
                      },
                      { min: 8, message: 'minimum 8 characters.' },
                    ]}
                    //initialValue="password1@"
                    //label="Password"
                  >
                    <Input.Password placeholder="your password" />
                  </Form.Item>

                  <div className="auth-form-action keepForget">
                    <Form.Item name="checkbox">
                      <Checkbox onChange={onChange}>Remember me</Checkbox>
                    </Form.Item>

                    <NavLink className="forgot-pass-link" to="/forgotPassword">
                      Forgot Password?
                    </NavLink>
                  </div>
                  {/* <div>{isMessage != 'null' ? isMessage : ''}</div> */}

                  <Form.Item>
                    <Button className="btn-signin submitLogin" htmlType="submit" type="primary" size="large">
                      {isLoading ? 'Loading...' : 'LOGIN'}
                    </Button>
                  </Form.Item>

                  <div className="or-line">
                    <hr className="hrline" />
                    <span>OR</span>
                    <hr className="hrline" />
                  </div>

                  <div className="registerNow">
                    <p>
                      Don’t Have An Account? &nbsp;
                      <NavLink className="pass-link" to="/register">
                        Register
                      </NavLink>
                    </p>
                  </div>

                  {/* removing social section */}
                  {/* <p className="form-divider">
            <span>Or</span>
          </p>
          <ul className="social-login">
            <li>
              <Link className="google-signup" to="#">
                <img src={require('../../../../static/img/google.png')} alt="" />
                <span>Sign in with Google</span>
              </Link>
            </li>
            <li>
              <Link className="facebook-sign" to="#">
                <FacebookOutlined />
              </Link>
            </li>
            <li>
              <Link className="twitter-sign" to="#">
                <TwitterOutlined />
              </Link>
            </li>
          </ul> */}
                  {/* <div className="auth0-login">
            <Link to="#" onClick={() => lock.show()}>
              Sign In with Auth0
            </Link>
          </div> */}
                </Form>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </AuthWrapper>
  );
};

export default SignIn;
