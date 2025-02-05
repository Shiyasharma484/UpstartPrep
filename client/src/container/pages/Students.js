import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Row, Input, Switch, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useHistory } from 'react-router-dom';
import { headers } from '../../helpers/variables';
import { Main } from '../styled';
import { Button } from '../../components/buttons/buttons';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import authorizes from '../../../src/static/img/authorized.png';
import Cookies from 'js-cookie';
import {
  get_api_request,
  post_api_request,
  put_api_request,
  delete_api_request,
  api_url,
} from '../../helpers/Common.js';
import { Cards } from '../../components/cards/frame/cards-frame';
import { createGlobalStyle } from 'styled-components';
const { encrypt, decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

var ModuleName = 'DASHBOARD';
const Students = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [form] = Form.useForm();
  const [Userform] = Form.useForm();
  const [Editform] = Form.useForm();
  var enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);
  var user_role_id = userDetail?.sessdata?.user?.[0];
  var userId = userDetail?.sessdata?.users_id_enc;

  const [arrayDataUsergroup, setarrayDataUsergroup] = useState(null);

  const [ShowInstructorsection, setShowInstructorsection] = useState(false);
  const [ShowAddNewUser, setShowAddNewUser] = useState(false);
  const [ShowEditUser, setShowEditUser] = useState(false);
  const [ASwitch, setASwitch] = useState(false);
  const [UserRole, setUserRole] = useState([]);
  const [arrayDataUserrole, setarrayDataUserrole] = useState(null);
  const [EditASwitch, setEditASwitch] = useState(false);
  const [ActiveSwitch, setActiveSwitch] = useState(false);
  const [EditActiveSwitch, setEditActiveSwitch] = useState(false);
  const [loading, setloading] = useState(false);
  const [render, setrender] = useState(0);
  useEffect(() => {
    console.log(user_role_id);

    if (user_role_id?.user_role == 'super_admin' && user_role_id?.user_role_id == 1) {
      GetAllStudents();
    } else if (user_role_id?.user_role == 'instructor') {
      GetStudentsByInstructorID();
    }
    async function GetAllUsersByRole() {
      const url = api_url.get_user_by_role + '55';
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const roleusersdata = response?.data?.responsedata;
        const dataArray = roleusersdata.map(item => {
          return { id: item.id, name: item.first_Name };
        });
        setUserRole(dataArray);
      } else {
        console.log('error');
      }
    }
    GetAllUsersByRole();

    async function GetStudentsByInstructorID() {
      const url = api_url.getStudents_byTeacherID + userId;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const usersdata = response?.data?.responsedata;
        setData(usersdata);
      } else {
        console.log('error');
      }
    }

    async function GetAllStudents() {
      const url1 = api_url.get_allStudents;
      const response = await get_api_request(url1, headers);
      if (response.status == 200) {
        const usersdata = response?.data?.responsedata;
        setData(usersdata);
      } else {
        console.log('error');
      }
    }

    async function getUserGroups() {
      const url = api_url.get_group;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const categorydata = response.data.responsedata;
        const dataArray = categorydata.map(item => {
          return { id: item.id, name: item.group_name };
        });
        setarrayDataUsergroup(dataArray);
      } else {
        console.log('error');
      }
    }
    getUserGroups();
    async function getRoleName() {
      const payload = { request: 'edit' };
      const url = api_url.admin_user_role;
      const response = await post_api_request(url, payload, { headers });

      if (response.status === 200) {
        const rolesdata = response.data.responsedata.roles;
        const dataArray = rolesdata.map(item => {
          if (item?.title == 'student') {
            form.setFieldsValue({
              role_id: item?.id,
            });
          }
          return { id: item.id, name: item.title };
        });
        setarrayDataUserrole(dataArray);
      }
    }
    getRoleName();
  }, [render]);
  const GetStudentPage = e => {
    // history.push('');
  };
  const LoginAsStudent = async user_id => {
    setloading(true);
    //getPermissions_byRoleID
    //get_all_users
    async function GetUserByID() {
      const url = api_url.get_all_users + user_id;

      const response = await get_api_request(url, headers);

      if (response.status == 200) {
        const student_data = response?.data?.responsedata?.users?.[0];
        const student_roleID = student_data?.role;

        const url1 = api_url.getPermissions_byRoleID + student_roleID;
        const response1 = await get_api_request(url1, headers);
        console.log(response1);
        const role_permissions = response1?.data?.permissions;
        if (response?.status == 200) {
          var student_details = {
            message: 'Welcome Super Admin User',
            login: true,
            sessdata: {
              //access_token: 'Njk3NjUyYjktY2E4NC00YjY2LWE5ZGMtYjU5ZDM4YmViNTE0MmRkZDk5ZmE0NGU1NjhiNGI4MmVmM2MzZjNiZTJmMjI=',
              //refresh_token: '174b21ba3af3e169eee54f24e0baed07',
              users_id: encrypttheid(student_data?.id),
              users_id_enc: student_data?.id,
              ipaddress: '::1',
              login: true,
              active: 1,
              user: [
                {
                  user_role_id: student_roleID,
                  user_role: student_data?.role_name,
                  user_role_active: 1,
                  user_role_trash: 0,
                  first_Name: student_data?.first_Name,
                  last_Name: student_data?.last_Name,
                  phone: student_data?.phone,
                  phone_verify: 0,
                  email: student_data?.email,
                  email_verify: student_data?.email_verify,
                  image: student_data?.image,
                  permissions: role_permissions,
                },
              ],
            },
            global: [
              { id: 1, variable_name: 'SUPER ADMIN', parent: 0, values: '1', active: 1 },
              { id: 10, variable_name: 'MODULES', parent: null, values: '3', active: 1 },
              { id: 11, variable_name: 'SETTINGS', parent: 10, values: '1', active: 1 },
              { id: 12, variable_name: 'DASHBOARD', parent: 10, values: '2', active: 1 },
              { id: 14, variable_name: 'CLIENTS', parent: 10, values: '4', active: 1 },
              { id: 15, variable_name: 'POSTS', parent: 10, values: '5', active: 1 },
              { id: 21, variable_name: 'SOCIAL_ACCOUNTS', parent: 10, values: '6', active: 1 },
            ],
          };

          const student_cookies = Cookies.get('LoginAsChild');
          const enc_userdetial = await encrypt(student_details);

          // console.log(student_cookies);
          // console.log(enc_userdetial);
          // console.log(decrypt(enc_userdetial));
          Cookies.set('UserDetail', enc_userdetial);
          Cookies.set('LoginAsChild', enc_userdetial);
          if (student_cookies == undefined) {
            Cookies.set('SuperAdminDetails', enc_user_detail);
          }

          setTimeout(() => {
            history.push(`../dashboard/studenthome`);
            setloading(true);
            window.location.reload();
          }, 1000);
        }
      }
    }
    GetUserByID();
  };

  const columns = [
    {
      name: 'Name',
      selector: row => (
        <>
          <div class="tooltip">
            <FeatherIcon icon="eye" size={16} style={{ color: 'darkcyan' }} onClick={() => LoginAsStudent(row.id)} />
            <span class="tooltiptext tooltip-top">Access As {row.first_Name}</span>
          </div>

          <a style={{ padding: '0px 15px 0px 17px' }} onClick={() => LoginAsStudent(row.id)}>
            {row.first_Name}
          </a>
        </>
      ),

      sortable: true,
    },
    // {
    //   name: '	USER NAME',
    //   selector: row => row.user_name,
    //   sortable: true,
    // },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Last Seen',
      selector: row => row.kkk,
      sortable: true,
    },
    {
      name: 'Online Time',
      selector: row => row.kkk,
      sortable: true,
    },
  ];

  const tableData = {
    columns,
    data,
  };
  const GetInstructor = e => {
    console.log(e);
  };
  const addNewUser = fieldsvalue => {
    var payload = {};
    var emailactive = 0;
    var activeswicth = 0;
    if (ASwitch == true) {
      emailactive = 1;
    } else {
      emailactive = 0;
    }

    if (ActiveSwitch == true) {
      activeswicth = 1;
    } else {
      activeswicth = 0;
    }

    if (user_role_id?.user_role == 'instructor') {
      arrayDataUserrole?.map(item => {
        if (item.name == 'student') {
          payload['role'] = item.id;
        }
      });
      payload['instructor'] = JSON.stringify(userId);
    } else {
      payload['role'] = fieldsvalue.role_id;
      payload['instructor'] = fieldsvalue.instructor.toString();
    }

    payload['first_Name'] = fieldsvalue.first_Name;
    payload['last_Name'] = fieldsvalue.last_Name;
    //payload['role'] = fieldsvalue.role_id;
    payload['phone'] = fieldsvalue.phone;
    payload['email'] = fieldsvalue.email;
    // payload['instructor'] = fieldsvalue.instructor.toString();
    payload['email_verify'] = emailactive;
    payload['password'] = fieldsvalue.password;
    // payload['user_name'] = fieldsvalue.user_name;
    payload['group_id'] = fieldsvalue?.user_groups?.toString();
    payload['active'] = activeswicth;
    console.log(payload);
    async function CreateUser(data) {
      const url = api_url.create_user;
      const response = await post_api_request(url, data, headers);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.responsedata,
        });
        setTimeout(() => {
          setShowAddNewUser(false);
          setrender(render + 1);
          form.resetFields();
          // window.location.reload();
        }, 1000);
      } else
        notification.error({
          message: response?.data?.responsedata,
        });
    }
    CreateUser(payload);
  };

  const EditUser = Fieldsvalue => {
    var Payload = {};

    var editemailactive;
    var editactiveswicth;
    if (EditASwitch == true) {
      editemailactive = 1;
    } else {
      editemailactive = 0;
    }

    if (EditActiveSwitch == true) {
      editactiveswicth = 1;
    } else {
      editactiveswicth = 0;
    }
    Payload['first_Name'] = Fieldsvalue.first_Name;
    Payload['last_Name'] = Fieldsvalue.last_Name;
    // Payload['role'] = Fieldsvalue.role_id;
    Payload['phone'] = Fieldsvalue.phone;

    Payload['email'] = Fieldsvalue.email;
    Payload['email_verify'] = editemailactive;
    Payload['instructor'] = Fieldsvalue.instructor.toString();
    //Payload['user_name'] = Fieldsvalue.user_name;
    // payload['user_groups'] = fieldsvalue.user_groups;
    Payload['active'] = editactiveswicth;
    console.log(Payload);
    async function editUser() {
      const userId = encrypttheid(formData?.id);
      const url = api_url.update_user_id + userId;
      const response = await put_api_request(url, Payload, headers);
      if (response.status == 200) {
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
    editUser(Payload);
  };
  return (
    <>
      <Spin spinning={loading} delay={200}>
        <Main>
          <div key="1" className="page-header-actions" style={{ marginTop: '16px', justifyContent: 'space-between' }}>
            <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Students</h1>
            <div className="importNewBTN">
              <Button onClick={() => setShowAddNewUser(true)} size="small" key="4" type="success">
                <FeatherIcon icon="plus" size={14} />
                New Student
              </Button>
            </div>
          </div>
          <Select
            style={{ width: '30%' }}
            classNamePrefix="select"
            isSearchable={true}
            arrayDataUsergroup={arrayDataUsergroup}
            //onSelect={GetPosition}
          >
            {arrayDataUsergroup != null
              ? arrayDataUsergroup.map((item, index) => <Option value={item.id}>{item.name} </Option>)
              : ''}
          </Select>
          <DataTableExtensions {...tableData}>
            <div className="student-table">
              <DataTable
                className="tableHeading"
                columns={columns}
                data={data}
                defaultSortField="id"
                defaultSortAsc={false}
                pagination
                highlightOnHover
              />
            </div>
          </DataTableExtensions>
        </Main>
      </Spin>
      {ShowAddNewUser != false ? (
        <div className="AddnewUser contactCard customCard">
          <Form
            name="sDash_validation-form"
            className="AddForm contactForm"
            form={form}
            layout="vertical"
            onFinish={addNewUser}
          >
            <div className="headerDiv">
              <p>New Student</p>
              <div className="crossIcon">
                <a
                  onClick={() => {
                    setShowAddNewUser(false);
                    form.resetFields();
                  }}
                >
                  X
                </a>
              </div>
            </div>
            <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
              <Col md={24} xs={24}>
                <Form.Item
                  name="first_Name"
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter First Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="last_Name"
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Last Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Last Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Phone !',
                    },
                    { min: 9, message: 'Min 9 digits allowed!' },

                    { max: 10, message: 'Max 10 digits allowed!' },
                  ]}
                >
                  <Input type="number" name="phone" placeholder="Phone" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="email"
                  initialValue=""
                  label="Email"
                  rules={[
                    {
                      required: true,
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
            <Row gutter={30} className="mainRow">
              <Col md={24} xs={24}>
                <Form.Item
                  name="user_name"
                  label="User Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter User Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="User Name" />
                </Form.Item>
              </Col>
              {user_role_id?.user_role == 'super_admin' ? (
                <>
                  <Col md={24} xs={24}>
                    <Form.Item name="role_id" label="User Role">
                      <Select
                        style={{ width: '100%' }}
                        classNamePrefix="select"
                        isSearchable={true}
                        arrayDataUserrole={arrayDataUserrole}
                        onSelect={e => {
                          GetInstructor(e);
                          setShowInstructorsection(e);
                        }}
                        disabled
                      >
                        {arrayDataUserrole != null
                          ? arrayDataUserrole.map((item, index) => (
                              <Option value={item.id}>{item.name.toUpperCase()} </Option>
                            ))
                          : ''}
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* {ShowInstructorsection == '54' ? ( */}
                  <Col md={24} xs={24}>
                    <Form.Item name="instructor" label="Instructor">
                      <Select
                        style={{ width: '100%' }}
                        classNamePrefix="select"
                        isSearchable={true}
                        mode="multiple"
                        UserRole={UserRole}
                        //onSelect={GetInstructor}
                      >
                        {UserRole != null
                          ? UserRole.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                          : ''}
                        {/* <Option value={1}>Shweta</Option>
                      <Option value={2}>Gaurav</Option>
                      <Option value={3}>Akshay</Option>
                      <Option value={4}>Jagjeet</Option>
                      <Option value={4}>Neelam</Option>
                      <Option value={4}>Sanjay</Option> */}
                      </Select>
                    </Form.Item>
                  </Col>
                  {/* ) : (
                ''
              )} */}
                </>
              ) : (
                ''
              )}
              <Col md={24} xs={24}>
                <Form.Item
                  name="user_groups"
                  label="User Groups"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter User_Groups !',
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    classNamePrefix="select"
                    isSearchable={true}
                    // arrayDataUsergroup={arrayDataUsergroup}
                    //onSelect={GetPosition}
                  >
                    {arrayDataUsergroup != null
                      ? arrayDataUsergroup.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30} className="mainRow">
              <Col md={24} xs={24}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Password !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Password" />
                </Form.Item>
              </Col>

              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="email_verfied"
                    initialValue=""
                    label="Email Verified - No"
                    rules={[
                      {
                        required: false,
                        message: 'Please Enter User_Groups !',
                      },
                    ]}
                  >
                    <p name="">Yes (Email is verified). No (Email not verified)</p>
                  </Form.Item>
                </Col>
                <div className="switchToggle">
                  <Switch onChange={() => setASwitch(!ASwitch)} />
                </div>
              </div>
              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="status"
                    initialValue=""
                    label="Status - Active"
                    rules={[
                      {
                        required: false,
                        message: 'Please Enter User_Groups !',
                      },
                    ]}
                  >
                    <p name="">Active (Allow Login). In-active (Disallow Login).</p>
                  </Form.Item>
                </Col>{' '}
                <div className="switchToggle">
                  <Switch onChange={() => setActiveSwitch(!ActiveSwitch)} />
                </div>
              </div>
            </Row>
            <Row gutter={30} className="Addgroupbtn">
              <Col md={24} xs={24}>
                <Form.Item>
                  <Button htmlType="submit" className="btn-animation">
                    Create
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      ) : (
        ''
      )}
      {ShowEditUser != false ? (
        <div className="AddnewUser contactCard customCard">
          <Form
            name="sDash_validation-form"
            className="AddForm contactForm"
            form={Editform}
            layout="vertical"
            onFinish={EditUser}
          >
            <div className="headerDiv">
              <p>Edit User</p>
              <div className="crossIcon">
                <a onClick={() => setShowEditUser(false)}>X</a>
              </div>
            </div>
            <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
              <Col md={24} xs={24}>
                <Form.Item
                  name="first_Name"
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter First Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="last_Name"
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Last Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Last Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Phone !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Phone" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="email"
                  initialValue=""
                  label="Email"
                  rules={[
                    {
                      required: true,
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
            <Row gutter={30} className="mainRow">
              <Col md={24} xs={24}>
                <Form.Item
                  name="user_name"
                  label="User Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter User Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="User Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item name="role_id" label="User Role">
                  <Select
                    style={{ width: '100%' }}
                    classNamePrefix="select"
                    isSearchable={true}
                    arrayDataUserrole={arrayDataUserrole}
                    //onSelect={GetPosition}
                  >
                    {arrayDataUserrole != null
                      ? arrayDataUserrole.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item name="user_groups" initialValue="" label="User Groups">
                  <Select
                    style={{ width: '100%' }}
                    classNamePrefix="select"
                    isSearchable={true}
                    arrayDataUsergroup={arrayDataUsergroup}
                    //onSelect={GetPosition}
                  >
                    {arrayDataUsergroup != null
                      ? arrayDataUsergroup.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30} className="mainRow">
              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="email_verfied"
                    initialValue=""
                    label="Email Verified - No"
                    rules={[
                      {
                        required: false,
                        message: 'Please Enter User_Groups !',
                      },
                      {
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please Enter Correct Email',
                      },
                    ]}
                  >
                    <p name="">Yes (Email is verified). No (Email not verified)</p>
                  </Form.Item>
                </Col>
                <div className="switchToggle">
                  <Switch checked={EditASwitch} onChange={() => setEditASwitch(!EditASwitch)} />
                </div>
              </div>
              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="active"
                    initialValue=""
                    label="Status - Active"
                    rules={[
                      {
                        required: false,
                        message: 'Please Enter User_Groups !',
                      },
                    ]}
                  >
                    <p name="">Active (Allow Login). In-active (Disallow Login).</p>
                  </Form.Item>
                </Col>{' '}
                <div className="switchToggle">
                  <Switch checked={EditActiveSwitch} onChange={() => setEditActiveSwitch(!EditActiveSwitch)} />
                </div>
              </div>
            </Row>
            <Row gutter={30} className="Addgroupbtn">
              <Col md={24} xs={24}>
                <Form.Item>
                  <Button htmlType="submit">Update</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Students;
