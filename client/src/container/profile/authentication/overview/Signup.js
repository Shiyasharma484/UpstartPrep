import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { NavLink, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
//import { useHistory } from 'react-router-dom';
import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { Row, Col, Form, notification, Input, Button, Select, DatePicker, Checkbox, Radio } from 'antd';
import { AuthWrapper } from './style';
//import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';
import hero_BG from '../../../../static/img/auth/home-hero-img.png';
import Cookies from 'js-cookie';
import { TextArea } from '@progress/kendo-react-inputs';
import { headers } from '../../../../helpers/variables';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import upstartWhite from '../../../../static/img/auth/logoupstartprep.png';

Axios.defaults.withCredentials = true;
import { get_api_request, post_api_request, put_api_request, api_url } from '../../../../helpers/Common';
import { setCommentRange } from 'typescript';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const SignUp = () => {
  var location = useLocation();
  var StudentLocation = useLocation();
  const [form] = Form.useForm();
  const [showlogo, setshowlogo] = useState();
  const [ConfigData, setConfigData] = useState([]);
  const [RoleName, setRoleName] = useState();
  const [roledata, setroledata] = useState();
  // const history = useHistory(); //for redirects in page
  //checking for user already logged in or not
  // useEffect(() => {
  //   console.log('React-checking for user already logged in or not');
  //   Axios.get('http://localhost:5000/login/').then(response => {
  //     console.log(response);
  //     if (response.data.login === true) {
  //       //alert("already logged in ");
  //       history.push('/dashboard');
  //     }
  //   });
  // }, []);

  const [state, setState] = useState({
    values: null,
    checked: null,
  });
  // const handleSubmit = values => {
  //   console.log(values);
  //   setState({ ...state, values });
  // };

  const onChange = checked => {
    setState({ ...state, checked });
  };
  const history = useHistory();
  console.log(location);
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
    async function getRoleName() {
      const payload = { request: 'edit' };
      const url = api_url.admin_user_role;
      const response = await post_api_request(url, payload, headers);
      if (response.status === 200) {
        console.log(response);
        const rolesdata = response.data.responsedata.roles;
        const roleid = response.data.responsedata.roles?.[0]?.title;
        console.log(roleid);
        setRoleName(roleid);
        const dataArray = rolesdata.map(item => {
          if (location?.state) {
            if (location?.state == item?.title) {
              form.setFieldsValue({
                user_role: item.id,
              });
            }
          } else {
            form.setFieldsValue({
              user_role: rolesdata[0].id,
            });
          }

          return { id: item.id, name: item.title };
        });
        setroledata(dataArray);
      }
    }
    getRoleName();

    // async function Getallmodules(data) {
    //   const url = api_url.getall_modules;
    //   const response = await get_api_request(url, data, headers);
    //   console.log(response);
    //   if (response.status == 200) {
    //     const Moduledata = response?.data?.responsedata?.modules;
    //     const getmodules = Moduledata.map(items => {
    //       console.log(items);
    //       if (items.name == 'ROLES') {
    //         const parentdata = items?.parent_id;
    //         console.log(parentdata);
    //         async function getentitybyparentid() {
    //           const url = '/entity/parent/' + parentdata;
    //           const response = await get_api_request(url, data, headers);
    //           const questiontypedata = response?.data?.responsedata;
    //           //setData(questiontypedata);
    //           const DataArray = questiontypedata.map(item => {
    //             return { id: item.id, name: item.name };
    //           });
    //           setroledata(DataArray);
    //         }
    //         getentitybyparentid();
    //       }
    //     });
    //   } else {
    //     console.log('error');
    //   }
    // }
    // Getallmodules();
  }, []);
  // const handleSubmit = (feildsvalue, e) => {
  //   var payload = {};
  //   payload['fullname'] = feildsvalue.fullname;
  //   payload['email'] = feildsvalue.email;
  //   payload['phone'] = feildsvalue.phone;
  //   payload['subject'] = feildsvalue.subject;
  //   async function CreateSection(data) {
  //     const url = `/contactus/`;
  //     const response = await post_api_request(url, data, headers);
  //     console.log(response);
  //     if (response.status == 201) {
  //       notification.success({
  //         message: response?.data?.message,
  //       });
  //       setTimeout(() => {
  //         //window.location.reload();
  //       }, 1000);
  //       // history.push('../users/customer-list');
  //     } else
  //       notification.error({
  //         message: 'Server Error',
  //       });
  //   }
  //   CreateSection(payload);
  // };
  // const getCategoryId = e => {
  //   console.log(e);
  //   //GetUserPlansDataByID(e);
  //   setCategoryID(e);
  // };
  const handleSubmit = fieldsvalue => {
    var payload = {};
    payload['first_Name'] = fieldsvalue.f_name;
    payload['last_Name'] = fieldsvalue.l_name;
    payload['role'] = fieldsvalue.user_role;
    // payload['phone'] = fieldsvalue.phone;
    payload['email'] = fieldsvalue.email;
    // payload['email_verify'] = emailactive;
    payload['password'] = fieldsvalue.pwd;
    // payload['user_name'] = fieldsvalue.user_name;
    // payload['group_id'] = fieldsvalue.user_groups.toString();
    //payload['active'] = fieldsvalue.activeswicth;
    console.log(payload);
    async function CreateUser(data) {
      const url = api_url.create_user;
      const response = await post_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.responsedata,
        });
        setTimeout(() => {
          history.push('/login');
        }, 1000);
        // history.push('../users/customer-list');
      } else
        notification.error({
          message: 'Server Error',
        });
    }
    CreateUser(payload);
  };

  return (
    <AuthWrapper>
      <Row style={{ background: '#fff' }} className="login-main">
        <Col md={24} xs={24} className="skillrow-inner">
          <Row style={{ background: '#fff' }} className="login-box RegisterForm">
            <Col md={12} xs={24} style={{ borderRight: '1px solid rgba(243, 244, 246)' }} className="login-box-inner">
              <div className="login-left">
                <div>
                  <NavLink to="/">
                    {ConfigData?.login_logo ? <img src={ConfigData?.login_logo} style={{ width: '200px' }} /> : ''}
                  </NavLink>
                </div>
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
                <Form name="register" onFinish={handleSubmit} layout="vertical" id="register" form={form}>
                  <Heading as="h3" style={{ fontSize: '24px', fontWeight: '800', marginBottom: '45px' }}>
                    {ConfigData?.welcome_text_1}
                  </Heading>
                  <p className="title-nice"> {ConfigData?.welcome_text_2}</p>

                  <div className="flexrow">
                    <Form.Item
                      label="First Name"
                      name="f_name"
                      rules={[{ required: true, message: 'Please input your First name!' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Last Name"
                      name="l_name"
                      rules={[{ required: true, message: 'Please input your Last name!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </div>

                  {/* <div className="flexrow"> */}
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your email!',
                        type: 'email',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name="user_role" label="Role" className="selectLabelDesign">
                    <Select
                      roledata={roledata}
                      style={{ width: '100%' }}
                      classNamePrefix="select"
                      //onChange={e => getCategoryId(e)}
                      //value={roledata?.[0]?.id}
                      //defaultValue={roledata?.[0]?.title}
                    >
                      {roledata?.map(item => (
                        <Option value={item?.id} selected>
                          {item.name.toUpperCase()}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  {/* </div> */}
                  {console.log(roledata?.[0]?.id)}

                  <Form.Item
                    label="User Name"
                    name="u_name"
                    rules={[{ required: true, message: 'Please input your User name!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <div className="flexrow">
                    <Form.Item
                      label="Password"
                      name="pwd"
                      rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                      <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                      label="Confirm Password"
                      name="c_pwd"
                      rules={[{ required: true, message: 'Passwords should be same!' }]}
                    >
                      <Input.Password placeholder="Confirm Password" />
                    </Form.Item>
                  </div>
                  {/* <div className="auth-form-action">
                    <Checkbox onChange={onChange}>
                      Creating an account means you’re okay with our Terms of Service and Privacy Policy
                    </Checkbox>
                  </div> */}
                  <Form.Item>
                    <Button className="btn-create submitRegister" htmlType="submit" type="primary" size="large">
                      REGISTER
                    </Button>
                  </Form.Item>

                  <div className="or-line">
                    <hr className="hrline" />
                    <span>OR</span>
                    <hr className="hrline" />
                  </div>

                  <div className="registerNow">
                    <p>
                      Already registered? &nbsp;
                      <NavLink className="pass-link" to="/login">
                        Login
                      </NavLink>
                    </p>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </AuthWrapper>
  );
};

export default SignUp;
