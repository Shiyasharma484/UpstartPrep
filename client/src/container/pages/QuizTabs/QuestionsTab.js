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
//import { Cards } from '../../components/cards/frame/cards-frame';
const { decrypt } = require('../../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

var ModuleName = 'DASHBOARD';
const AddQuestions = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [form] = Form.useForm();
  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);

  const [ShowUserGroup, setShowUserGroup] = useState(false);
  const [ShowAddNewUser, setShowAddNewUser] = useState(false);
  useEffect(async () => {
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
          <Row gutter={30}>
            <Col md={24} xs={24}>
              <Row gutter={30}>
                <Col md={24} xs={24}>
                  <label>Tittle</label>
                  <Form.Item
                    name="Tittle"
                    rules={[
                      {
                        required: true,
                        message: 'Tittle is required !',
                      },
                      { max: 50, message: 'Max 50 characters allowed!' },
                      {
                        pattern: /^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/,
                        message: 'Letters allowed only with space inbetween',
                      },
                    ]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col md={12} xs={24}>
                  <label>Sub Category</label>
                  <Form.Item
                    name="Sub Category"
                    rules={[
                      {
                        required: true,
                        message: 'Sub Category is required !',
                      },
                    ]}
                  >
                    <Select>
                      <Option>Isee Upper Level(ISEE)</Option>
                      <Option>Isee Upper Level(ISEE)</Option>
                      <Option>Isee Upper Level(ISEE)</Option>
                      <Option>Isee Upper Level(ISEE)</Option>
                      <Option>Isee Upper Level(ISEE)</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={12} xs={24}>
                  <label>Quiz Type</label>
                  <Form.Item name="Quiz Type">
                    <Select>
                      <Option>Quiz</Option>
                      <Option>Contest</Option>
                      <Option>Daily Challenge</Option>
                      <Option>Daily Task</Option>
                      <Option>HomeWork</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col md={21}>
                  <p>
                    <b>Free </b> <br />
                    Paid (Accessible to only paid users). Free (Anyone can access).
                  </p>
                </Col>
                <Col md={3}>
                  <Switch defaultChecked />
                </Col>
              </Row>
              <Col md={24} xs={24}>
                <label>Description</label>
                <Form.Item name="description">
                  <Editor
                    // value={cssvalue}
                    tools={[
                      [Bold, Italic, Underline, Strikethrough],
                      [Subscript, Superscript],

                      [OrderedList, UnorderedList],

                      [InsertTable, InsertImage],
                    ]}
                    contentStyle={{
                      height: 430,
                    }}
                    // className="k-icon k-i-loading"
                    // defaultContent={cssvalue}
                    // onChange={handleCSS}
                  />
                </Form.Item>
              </Col>

              <Row gutter={30}>
                <Col md={21}>
                  <p>
                    <b>Visibility - Public</b> <br />
                    Private (Only scheduled user groups can access). Public (Anyone can access).
                  </p>
                </Col>
                <Col md={3}>
                  <Switch defaultChecked />
                </Col>
              </Row>
              <Col md={24} xs={24}>
                <div className="add-details-bottom text-right">
                  <Button htmlType="submit" type="success" size="default">
                    Save & Proceed
                  </Button>
                </div>
              </Col>
            </Col>
          </Row>
        </Form>
      </Main>
    </>
  );
};

export default AddQuestions;
