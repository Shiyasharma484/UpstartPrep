import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Row, Input, Switch } from 'antd';
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
const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const client_domain = process.env.REACT_APP_DOMAIN;
var ModuleName = 'DASHBOARD';
const QuizzesList = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [form] = Form.useForm();
  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);
  const [ShowEditQuiz, setShowEditQuiz] = useState(false);

  const [ShowUserGroup, setShowUserGroup] = useState(false);
  const [ShowAddNewUser, setShowAddNewUser] = useState(false);
  useEffect(() => {
    async function GetAllUsers() {
      const url = api_url.get_practice;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const usersdata = response?.data?.responsedata;
        setData(usersdata);
      } else {
        console.log('error');
      }
    }
    GetAllUsers();
  }, []);
  const HandleAction = (e, id) => {
    console.log(e);
    const encryptedID = encrypttheid(id);
    const postid = e;
    if (e == 3) {
      history.push(`../engage/edit-practice/${encryptedID}`);
    } else if (e == 2) {
      console.log(id);
      history.push({
        pathname: `../engage/edit-practice/${encryptedID}`,
        state: 4,
      });
    } else if (e == 1) {
      console.log(id);
      history.push(`../engage/overallpractice-report/${encryptedID}`);
    } else if (e == 4) {
      console.log('Delete');
      handleDelete(encryptedID);
    }
  };

  /*=========================================ENDS */
  /*HANDLING DELETE A USER===================START */
  const handleDelete = id => {
    console.log(id);
    var deletedrowid = decodetheid(id);
    var column = 'id';
    async function deleteData(id) {
      const url = api_url.delete_practice_id + deletedrowid;
      const response = await delete_api_request(url, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: 'Practice Sets Deleted Successfully',
        });
        const afterdeletedata = data.filter(item => {
          if (column !== '') {
            return item[column] !== deletedrowid;
          }
          return item;
        });
        setData(afterdeletedata);
      } else if (response.status == 400) {
        alert(response.data.message);
      } else {
        alert('Error');
      }
      // });
    }
    deleteData(id);
  };
  const CopyToClipboard = e => {
    const id = encrypttheid(e);
    console.log(client_domain);
    console.log(e);
    navigator.clipboard.writeText(`${client_domain}/dashboard/engage/edit-practice/${id}`);
    notification.success({
      message: `Copied Successfully ${client_domain}/dashboard/engage/edit-practice/${id}`,
    });
  };
  /*HANDLING DELETE A USER========================================END */
  const columns = [
    {
      name: 'CODE',
      selector: row => (
        <>
          <p onClick={() => CopyToClipboard(row.id)}>
            <i class="fa fa-files-o" aria-hidden="true"></i> {'set_' + encrypttheid(row.id)}
          </p>
        </>
      ),
      style: {
        background: '#2196F3',
        display: 'inline-flex',
        alignItems: 'center',
        flexGrow: '0',
        marginRight: '13%',
        color: '#fff',
        cursor: 'pointer',
      },
      sortable: true,
    },
    {
      name: 'TITLE',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'CATEGORY',
      selector: row => row.sub_category_name,
      sortable: true,
    },
    {
      name: 'VISIBILITY	',
      selector: row => (
        <>
          <span className={`status ${row.status == 1 ? 'Success' : 'error'}`}>
            {row.status == 1 ? 'Publish' : 'Draft'}
          </span>
        </>
      ),
      sortable: true,
    },

    {
      name: 'Status',
      selector: row => (
        <>
          <span className={`status ${row.status == 1 ? 'Success' : 'error'}`}>
            {row.status == 1 ? 'Active' : 'Inactive'}
          </span>
        </>
      ),
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className="datatable-actions">
          <Select className="Quizz_actions" defaultValue="Actions" onSelect={e => HandleAction(e, row.id)}>
            <Option value={1}>Analytics</Option>
            <Option value={2}>Schedules</Option>
            <Option value={3}>Edit</Option>
            <Option value={4}>Delete</Option>
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
          <div
            data-aos="fade-down"
            data-aos-offset="10"
            data-aos-delay="50"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="center"
          >
            <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Practice Sets</h1>
          </div>
          <div className="importNewBTN">
            <div
              data-aos="fade-down"
              data-aos-offset="10"
              data-aos-delay="50"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="center"
            >
              <Button
                className="btn-animation"
                onClick={() =>
                  // setShowAddNewUser(true)
                  history.push(`../engage/createpractice`)
                }
                size="small"
                key="4"
                type="success"
              >
                <FeatherIcon icon="plus" size={14} />
                New Practice Sets
              </Button>
            </div>
          </div>
        </div>
        {/* 
        <div
          data-aos="fade-up"
          data-aos-offset="10"
          data-aos-delay="50"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="center"
        > */}
        <DataTable
          className="tableHeading"
          columns={columns}
          data={data}
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          highlightOnHover
        />
        {/* </div> */}
      </Main>
    </>
  );
};

export default QuizzesList;
