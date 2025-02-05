import React, { useState, useEffect } from 'react';
import { Form, notification, label, Select, Col, Row, Input, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useHistory } from 'react-router-dom';
import { headers } from '../../../helpers/variables';
import { Main } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
//import ReactRichEditor from 'react-rich-text-editor'

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
const AddSchedule = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);

  const [ShowAddNewQuizType, setShowAddNewQuizType] = useState(false);
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
    history.push(`../users/edit-user/`);
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
      name: 'Type',
      selector: row => row.type,
      sortable: true,
    },
    {
      name: 'STARTS AT	',
      selector: row => row.started_at,
      sortable: true,
    },
    {
      name: 'ENDS AT	',
      selector: row => row.ends_at,
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
            <Option
              onClick={() => {
                handleEdit('');
              }}
              value={2}
            >
              Edit
            </Option>
            <Option
              value={3}
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
        <div key="1" className="page-header-actions" style={{ marginTop: '16px', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Quiz Schedules</h1>
          <div className="importNewBTN">
            <Button onClick={() => setShowAddNewQuizType(true)} size="small" key="4" type="success">
              <FeatherIcon icon="plus" size={14} />
              NEW SCHEDULE
            </Button>
          </div>
        </div>
        <br />{' '}
        <DataTable
          className="tableHeading"
          columns={columns}
          data={data}
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          highlightOnHover
        />
      </Main>
      {ShowAddNewQuizType != false ? (
        <div className="AddnewUser contactCard customCard">
          <Form
            name="sDash_validation-form"
            className="AddForm contactForm"
            form={form}
            layout="vertical"
            onFinish={addNewUser}
          >
            <div className="headerDiv">
              <p>New Schedule</p>
              <div className="crossIcon">
                <a onClick={() => setShowAddNewQuizType(false)}>X</a>
              </div>
            </div>
            <Row gutter={30} className="AddQuizTpe_main" style={{ marginTop: ' 10px' }}>
              <Col className="AddQuizTpe" md={24} xs={24}>
                <Row gutter={30}>
                  <Col md={24} xs={24}>
                    <Form.Item name="Schedule_Type" label="Quiz Type Name">
                      <Input type="radio" placeholder="Schedule_Type" />
                      <label className="fixed_radio"> Fixed</label>
                      <Input type="radio" placeholder="Schedule_Type" />
                      <label className="fixed_radio"> Flexible</label>
                    </Form.Item>
                  </Col>
                  <Col md={24} xs={24}>
                    <b>
                      <label>Grace Period to Join (Minutes)</label>
                    </b>
                    <Form.Item
                      name="grace_period"
                      rules={[
                        {
                          required: true,
                          message: 'The grace period field is required.',
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Enter Grace Period"></Input>
                    </Form.Item>
                  </Col>
                  <Col md={24} xs={24}>
                    <b>
                      <label>Schedule to User Groups</label>
                    </b>
                    <Form.Item
                      name="user_groups"
                      rules={[
                        {
                          required: true,
                          message: 'The user groups field is required.',
                        },
                      ]}
                    >
                      <Select>
                        <Option value={1}>Test Group</Option>
                        <Option value={2}>Reading Group</Option>
                        <Option value={3}>ISEE Lower level</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col md={24} xs={24}>
                    <b>
                      <label>Schedule to User Groups</label>
                    </b>
                    <Form.Item
                      name="user-grp"
                      rules={[
                        {
                          required: true,
                          message: 'The user groups field is required.',
                        },
                      ]}
                    >
                      <Select>
                        <Option value={1}>Kelvin Student 1</Option>
                        <Option value={2}>Test Student</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
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
      )}
    </>
  );
};

export default AddSchedule;
