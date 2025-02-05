import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Row, Input, Switch } from 'antd';
import { useHistory } from 'react-router-dom';
import { headers } from '../../helpers/variables';
import { Main } from '../styled';
import moment from 'moment';
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
const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

var ModuleName = 'DASHBOARD';
const Students = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [form] = Form.useForm();
  const [Userform] = Form.useForm();
  const [scheduledata, setscheduledata] = useState([]);

  const [Editform] = Form.useForm();
  const [arrayDataUsergroup, setarrayDataUsergroup] = useState(null);
  const [ShowUserGroup, setShowUserGroup] = useState(false);
  const [ShowAddNewUser, setShowAddNewUser] = useState(false);
  const [ShowEditUser, setShowEditUser] = useState(false);
  const [AllExams, setAllExams] = useState([]);
  const [AllQuizzes, setAllQuizzes] = useState([]);
  const [AllPracticeSet, setAllPracticeSet] = useState([]);

  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);
  var user_id = userDetail?.sessdata?.users_id_enc;
  var user_role = userDetail?.sessdata?.user?.[0]?.user_role;
  useEffect(async () => {
    if (user_role == 'student') {
      GetExamHistoryByStudentID(user_id);
    } else if (user_role == 'instructor') {
      //
    } else if (user_role == 'parent') {
      var child_data = Cookies.get('ChildByParent');
      const decoded_data = child_data ? decrypt(child_data) : '';
      const student_id = decoded_data?.id;
      GetExamHistoryByStudentID(student_id);
      //
    } else {
      //
    }
    async function GetExamHistoryByStudentID(id) {
      const url = api_url.get_exam_history + id;
      const response = await get_api_request(url, headers);
      setAllExams(response?.data?.Exams);
      setAllQuizzes(response?.data?.Quiz);
      setAllPracticeSet(response?.data?.Practice_Set);
    }

    async function GetAllUsers() {
      const url = api_url.get_all_users;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const usersdata = response?.data?.responsedata?.users;
        setData(usersdata);
      } else {
        console.log('error');
      }
    }
    GetAllUsers();
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
    async function GetAllSchedules() {
      const url = api_url.get_schedules_by_event_type + '34';
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const SchedulesData = response?.data?.data;
        setscheduledata(SchedulesData);
      } else {
        console.log('error');
      }
    }
    GetAllSchedules();
  }, []);

  const HandleAction = e => {
    console.log(e);
    if (e == 1) {
      setShowUserGroup(true);
    } else if (e == 2) {
      setShowEditUser(true);
    }
  };

  /*HANDLE VIEW=================================START */
  const handleView = id => {
    async function viewData(id) {
      const encryptedid = encrypttheid(id);
      const postID = encryptedid;
      history.push(`../users/view-user/${postID}`);
    }
    viewData(id);
  };
  /*==========================================END */
  /*HANDLING EDIT=============================START */
  const handleEdit = id => {
    async function editData(id) {
      const encryptedid = encrypttheid(id);
      const postID = encryptedid;
      history.push(`../users/edit-user/${postID}`);
    }
    editData(id);
  };
  /*=========================================ENDS */
  /*HANDLING DELETE A USER===================START */
  const handleDelete = id => {
    var deletedrowid = id;
    var column = 'id';
    async function deleteData(id) {
      const encryptedid = encrypttheid(id);
      const postID = encryptedid;

      const url = api_url.delete_user + postID;
      const response = await delete_api_request(url, headers);

      if (response.status === 200) {
        notification.success({
          message: 'User Deleted Successfully',
        });
        const afterdeletedata = data.filter(item => {
          if (column !== '') {
            return item[column] !== deletedrowid;
          }
          return item;
        });
        setData(afterdeletedata);
      } else if (response.status === 400) {
        alert(response.data.message);
      } else {
        alert('Error');
      }
      // });
    }
    deleteData(id);
  };
  /*HANDLING DELETE A USER========================================END */
  const RedirectToViewResult = (id, name) => {
    console.log(name);
    const exam_id = encrypttheid(id);
    if (name == 'quiz') {
      history.push({
        pathname: `Analysis/${exam_id}`,
        state: 'Quiz',
      });
    } else if (name == 'exam') {
      history.push({
        pathname: `Analysis/${exam_id}`,
        state: 'Exam',
      });
    } else if (name == 'practice') {
      history.push({
        pathname: `Analysis/${exam_id}`,
        state: 'Practice',
      });
    }

    // window.location.reload();
  };
  const columns = [
    user_role != 'student' && user_role != 'parent'
      ? {
          name: 'STUDENT',
          selector: row => row.user_name,
          sortable: true,
        }
      : {
          name: 'RESULT',
          selector: row => row.result,
          sortable: true,
        },
    {
      name: '	QUIZ',
      selector: row => <a onClick={() => RedirectToViewResult(row.id, 'quiz')}> {row.quiz_title}</a>,
      sortable: true,
    },
    {
      name: '% SCORE',
      selector: row => row.per_score.toFixed(2),
      sortable: true,
    },
    {
      name: 'DATE',
      selector: row => (row.datetime ? moment(row.datetime).format('MM-DD-YYYY') : ''),
      sortable: true,
    },
  ];
  const columns2 = [
    user_role != 'student' && user_role != 'parent'
      ? {
          name: 'STUDENT',
          selector: row => row.user_name,
          sortable: true,
        }
      : {
          name: 'RESULT',
          selector: row => row.result,
          sortable: true,
        },
    {
      name: 'EXAM',
      selector: row => <a onClick={() => RedirectToViewResult(row.id, 'exam')}> {row.exam_title}</a>,
      sortable: true,
    },
    {
      name: '% SCORE',
      selector: row => row.per_score.toFixed(2),
      sortable: true,
    },
    {
      name: 'DATE',
      selector: row => (row.datetime ? moment(row.datetime).format('MM-DD-YYYY') : ''),
      sortable: true,
    },
  ];

  const columns3 = [
    user_role != 'student' && user_role != 'parent'
      ? {
          name: 'STUDENT',
          selector: row => row.user_name,
          sortable: true,
        }
      : {
          name: 'RESULT',
          selector: row => row.result,
          sortable: true,
        },
    {
      name: 'PRACTICE SET',
      selector: row => <a onClick={() => RedirectToViewResult(row.id, 'practice')}> {row.practice_title}</a>,
      sortable: true,
    },
    {
      name: '% SCORE',
      selector: row => row.per_score.toFixed(2),
      sortable: true,
    },
    {
      name: 'DATE',
      selector: row => (row.datetime ? moment(row.datetime).format('MM-DD-YYYY') : ''),
      sortable: true,
    },
  ];

  const columns4 = [
    user_role != 'student' && user_role != 'parent'
      ? {
          name: 'STUDENT',
          selector: row => row.user_name,
          sortable: true,
        }
      : {
          name: 'RESULT',
          selector: row => row.result,
          sortable: true,
        },
    {
      name: 'PRACTICE SET',
      selector: row => row.role,
      sortable: true,
    },
    {
      name: 'DATE',
      selector: row => (row.datetime ? moment(row.datetime).format('MM-DD-YYYY') : ''),
      sortable: true,
    },
  ];

  const tableData = {
    columns,
    data,
  };

  const addUserGroups = fieldsValue => {
    var Payload = {};
    Payload['first_Name'] = fieldsValue.first_Name;
    console.log(Payload);
    async function CreateUserGroup(data) {
      const url = api_url.create_user;
      const response = await post_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.responsedata,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        // history.push('../users/customer-list');
      } else
        notification.error({
          message: 'Server Error',
        });
    }
    CreateUserGroup(Payload);
  };

  const addNewUser = fieldsvalue => {
    var payload = {};
    payload['first_Name'] = fieldsvalue.first_Name;
    payload['last_Name'] = fieldsvalue.last_Name;
    payload['user_role'] = fieldsvalue.user_role;
    payload['email'] = fieldsvalue.email;
    payload['password'] = fieldsvalue.password;
    payload['user_name'] = fieldsvalue.user_name;
    payload['user_groups'] = fieldsvalue.user_groups;
    payload['status'] = fieldsvalue.status;
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
          window.location.reload();
        }, 1000);
        // history.push('../users/customer-list');
      } else
        notification.error({
          message: 'Server Error',
        });
    }
    CreateUser(payload);
  };

  const addNewGroup = fieldsvalue => {
    var payload = {};
    payload['first_Name'] = fieldsvalue.first_Name;

    console.log(payload);
    async function editUser(data) {
      const url = api_url.create_group;
      const response = await post_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.responsedata,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        // history.push('../users/customer-list');
      } else
        notification.error({
          message: 'Server Error',
        });
    }
    editUser(payload);
  };
  const EditUser = fieldsvalue => {
    var payload = {};
    payload['first_Name'] = fieldsvalue.first_Name;
    payload['last_Name'] = fieldsvalue.last_Name;
    payload['user_role'] = fieldsvalue.user_role;
    payload['email'] = fieldsvalue.email;
    payload['password'] = fieldsvalue.password;
    payload['user_name'] = fieldsvalue.user_name;
    payload['user_groups'] = fieldsvalue.user_groups;
    payload['status'] = fieldsvalue.status;
    console.log(payload);
    async function editUser(data) {
      const url = api_url.create_user;
      const response = await post_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.responsedata,
        });
        setTimeout(() => {
          console.log('This will run after 1 second!');
          history.push('../users/customer-list');
        }, 1000);
      } else
        notification.error({
          message: 'Server Error',
        });
    }
    editUser(payload);
  };
  return (
    <>
      <Main className="classworkPage">
        <div key="1" className="page-header-actions" style={{ marginTop: '16px', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Classwork</h1>
        </div>
        <Row gutter={30}>
          <Col md={12}>
            <div className="tableHeading">
              <h3>Quizzes</h3>
            </div>
            <DataTable
              className="tableHeading"
              columns={columns}
              data={AllQuizzes}
              defaultSortField="id"
              defaultSortAsc={false}
              pagination
              highlightOnHover
            />
          </Col>
          <Col md={12}>
            <div className="tableHeading">
              <h3>Exams</h3>
            </div>

            <DataTable
              className="tableHeading"
              columns={columns2}
              data={AllExams}
              defaultSortField="id"
              defaultSortAsc={false}
              pagination
              highlightOnHover
            />
          </Col>
        </Row>
        <Row gutter={30}>
          <Col md={12}>
            <div className="tableHeading">
              <h3>Practice sets</h3>
            </div>

            <DataTable
              className="tableHeading"
              columns={columns3}
              data={AllPracticeSet}
              defaultSortField="id"
              defaultSortAsc={false}
              pagination
              highlightOnHover
            />
          </Col>
          <Col md={12}>
            <div className="tableHeading">
              <h3>Practice Set Schedule</h3>
              <div>
                <Button
                // onClick={() => history.push('./engage/createpractice')}
                >
                  New Custom HW
                </Button>
              </div>
            </div>
            <DataTable
              className="tableHeading"
              columns={columns4}
              // data={data}
              defaultSortField="id"
              defaultSortAsc={false}
              pagination
              highlightOnHover
            />
            {/* </DataTableExtensions> */}
          </Col>
        </Row>
      </Main>
      {/* {ShowUserGroup != false ? (
        <Form
          name="sDash_validation-form"
          className="AddForm contactForm"
          form={Userform}
          layout="vertical"
          onFinish={addNewGroup}
        >
          <div className="Main-headerDiv">
            <div className="inner-headerDiv">
              <div className="headerDiv">
                <p>Add user to group</p>
                <div className="crossIcon">
                  <a onClick={() => setShowUserGroup(false)}>X</a>
                </div>
              </div>
              <div className="joinedP">
                <p>Joined Groups:</p>
              </div>
              <div className="userGroupselect">
                <div className="userGroupselect-inner">
                  <Form.Item name="Users Groups" label="Users Groups">
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
                </div>
              </div>
              <div className="Addgroupbtn">
                <button>Add</button>
              </div>
            </div>
          </div>
        </Form>
      ) : (
        ''
      )} */}
      {/* {ShowAddNewUser != false ? (
        <div className="AddnewUser contactCard customCard">
          <Form
            name="sDash_validation-form"
            className="AddForm contactForm"
            form={form}
            layout="vertical"
            onFinish={addNewUser}
          >
            <div className="headerDiv">
              <p>New User</p>
              <div className="crossIcon">
                <a onClick={() => setShowAddNewUser(false)}>X</a>
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
                      message: 'Please Enter First_Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="First_Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
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
                      message: 'Please Enter User_Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="User_Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="user_role"
                  label="User Role"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter User_Role !',
                    },
                  ]}
                >
                  <Select placeholder="User_Roles" name="">
                    <Option value={1}>admin</Option>
                    <Option value={2}>client</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="user_groups"
                  initialValue=""
                  label="User Groups"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter User_Groups !',
                    },
                    {
                      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Please Enter Correct Email',
                    },
                  ]}
                >
                  <Select placeholder="User_Groups" name="">
                    <Option value={1}>user1</Option>
                    <Option value={2}>user2</Option>
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
                      message: 'Please Enter password !',
                    },
                  ]}
                >
                  <Input name="" placeholder="password" />
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
                  <Switch
                  // onChange={() => setASwitch(!ASwitch)}
                  />
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
                      {
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please Enter Correct Email',
                      },
                    ]}
                  >
                    <p name="">Active (Allow Login). In-active (Disallow Login).</p>
                  </Form.Item>
                </Col>{' '}
                <div className="switchToggle">
                  <Switch
                  // onChange={() => setASwitch(!ASwitch)}
                  />
                </div>
              </div>
            </Row>
            <Row gutter={30} className="Addgroupbtn">
              <Col md={24} xs={24}>
                <Form.Item>
                  <Button htmlType="submit">Create</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      ) : (
        ''
      )} */}
      {/* {ShowEditUser != false ? (
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
                      message: 'Please Enter First_Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="First_Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
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
                      message: 'Please Enter User_Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="User_Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="user_role"
                  label="User Role"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter User_Role !',
                    },
                  ]}
                >
                  <Select placeholder="User_Roles" name="">
                    <Option value={1}>admin</Option>
                    <Option value={2}>client</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="user_groups"
                  initialValue=""
                  label="User Groups"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter User_Groups !',
                    },
                    {
                      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Please Enter Correct Email',
                    },
                  ]}
                >
                  <Select placeholder="User_Groups" name="">
                    <Option value={1}>user1</Option>
                    <Option value={2}>user2</Option>
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
                      message: 'Please Enter password !',
                    },
                  ]}
                >
                  <Input name="" placeholder="password" />
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
                  <Switch
                  // onChange={() => setASwitch(!ASwitch)}
                  />
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
                      {
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please Enter Correct Email',
                      },
                    ]}
                  >
                    <p name="">Active (Allow Login). In-active (Disallow Login).</p>
                  </Form.Item>
                </Col>{' '}
                <div className="switchToggle">
                  <Switch
                  // onChange={() => setASwitch(!ASwitch)}
                  />
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
      )} */}
    </>
  );
};

export default Students;
