import React, { useState, useEffect } from 'react';
import { Form, notification, label, Select, Col, Row, Input, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useHistory } from 'react-router-dom';
import { headers } from '../../../helpers/variables';
import { Main } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
//import ReactRichEditor from 'react-rich-text-editor'
const {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  OrderedList,
  UnorderedList,
  InsertTable,
  InsertImage,
} = EditorTools;
import { Editor, EditorTools } from '@progress/kendo-react-editor';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
//import authorizes from '../../../src/static/img/authorized.png';
import Cookies from 'js-cookie';
import {
  get_api_request,
  post_api_request,
  put_api_request,
  delete_api_request,
  api_url,
} from '../../../helpers/Common.js';
import FormItem from 'antd/lib/form/FormItem';
//import { Cards } from '../../components/cards/frame/cards-frame';
const { decrypt } = require('../../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

var ModuleName = 'DASHBOARD';
const AddSettings = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [form] = Form.useForm();
  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);

  const [ShowUserGroup, setShowUserGroup] = useState(false);
  const [ShowAddNewUser, setShowAddNewUser] = useState(false);
  useEffect(() => {
    async function GetAllUsers() {
      const url = api_url.get_all_users;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const usersdata = response?.data?.responsedata?.users;
        setData(usersdata);
      } else {
        console.log('error');
      }
    }
    GetAllUsers();
  }, []);

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
  const columns = [
    {
      name: 'CODE',
      selector: row => row.fullname,
      sortable: true,
    },
    {
      name: 'TITLE',
      selector: row => row.role,
      sortable: true,
    },
    {
      name: 'CATEGORY',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'TYPE	',
      selector: row => row.phone,
      sortable: true,
    },
    {
      name: 'VISIBILITY	',
      selector: row => row.phone,
      sortable: true,
    },

    {
      name: 'Status',
      selector: row => (
        <>
          <span className={`status ${row.active === 1 ? 'Success' : 'error'}`}>
            {row.active === 1 ? 'Active' : 'Inactive'}
          </span>
        </>
      ),
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className="datatable-actions">
          <Select className="Quizz_actions" defaultValue="Actions">
            <Option value={1}>Analytics</Option>
            <Option value={2}>Schedules</Option>
            <Option
              onClick={() => {
                handleEdit(row.id);
              }}
              value={3}
            >
              Edit
            </Option>
            <Option
              value={4}
              onClick={() => (window.confirm('Are you sure you wish to delete this item?') ? handleDelete(row.id) : '')}
            >
              Delete
            </Option>
          </Select>
        </div>
      ),
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
          console.log('This will run after 1 second!');
          history.push('../users/customer-list');
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
          console.log('This will run after 1 second!');
          history.push('../users/customer-list');
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
    <>
      <Main>
        <Form className="Details_form">
          <Row className="Main_division">
            <Col md={12} className="First_Division">
              <Col md={24}>
                <b>
                  {' '}
                  <label> Duration (Minutes)</label>
                </b>
                <Form.Item
                  name="Duration"
                  rules={[
                    {
                      required: true,
                      message: 'Duration is required !',
                    },
                  ]}
                >
                  <Input type="text" placeholder="Enter Duration (in minutes)"></Input>
                </Form.Item>
              </Col>
              <Col md={24}>
                <b>
                  {' '}
                  <label>Marks for Correct Answer</label>
                </b>
                <Form.Item
                  name="Points_Mode"
                  rules={[
                    {
                      required: true,
                      message: 'Marks for Correct Answer is required',
                    },
                  ]}
                >
                  <Input type="text" placeholder="Enter Duration (in minutes)"></Input>
                </Form.Item>
              </Col>
              <Col md={24}>
                <b>
                  {' '}
                  <label>Negative Marks</label>
                </b>
                <Form.Item
                  name="Points_Mode"
                  rules={[
                    {
                      required: true,
                      message: 'Negative Marks are required',
                    },
                  ]}
                >
                  <Input type="text" placeholder="Enter Number"></Input>
                </Form.Item>
              </Col>
              <Col md={24}>
                <b>
                  {' '}
                  <label>Pass Percentage</label>
                </b>
                <Form.Item
                  name="Points_Mode"
                  rules={[
                    {
                      required: true,
                      message: 'Negative Marks are required',
                    },
                  ]}
                >
                  <Input placeholder="60%"></Input>
                </Form.Item>
              </Col>
            </Col>
            <Col md={12} className="Second_Division">
              <Row gutter={30}>
                <Col md={12}>
                  <b>
                    {' '}
                    <label>Shuffle Questions</label>
                  </b>
                </Col>
                <Col md={12}></Col>
              </Row>
              <Row gutter={30}>
                <Col md={12}>
                  <b>
                    {' '}
                    <label>Restrict Attempts</label>
                  </b>
                </Col>
                <Col md={12}></Col>
              </Row>
              <Col md={24}>
                <b>
                  {' '}
                  <label>Number of Attempts</label>
                </b>
                <Form.Item
                  name="attempts"
                  rules={[
                    {
                      required: true,
                      message: 'Number of Attempts is required',
                    },
                  ]}
                >
                  <Input type="text" placeholder="Enter Number)"></Input>
                </Form.Item>
              </Col>
              <Row gutter={30}>
                <Col md={12}>
                  <b>
                    {' '}
                    <label>Disable Finish Button</label>
                  </b>
                </Col>
                <Col md={12}></Col>
              </Row>
              <Row gutter={30}>
                <Col md={12}>
                  <b>
                    {' '}
                    <b>
                      {' '}
                      <label>Enable Question List View</label>
                    </b>
                  </b>
                </Col>
                <Col md={12}></Col>
              </Row>
              <Row gutter={30}>
                <Col md={12}>
                  <b>
                    {' '}
                    <label>Hide Solutions</label>
                  </b>
                </Col>
                <Col md={12}></Col>
              </Row>
              <Row gutter={30}>
                <Col md={12}>
                  <b>
                    {' '}
                    <label>Show Leaderboard</label>
                  </b>
                </Col>
                <Col md={12}></Col>
              </Row>
            </Col>
          </Row>

          <Col md={24} xs={24}>
            <div className="add-details-bottom text-right">
              <Button htmlType="submit" type="success" size="default">
                Update
              </Button>
            </div>
          </Col>
        </Form>
      </Main>
    </>
  );
};

export default AddSettings;
