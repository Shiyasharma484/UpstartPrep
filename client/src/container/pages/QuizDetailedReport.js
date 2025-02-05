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
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {
  get_api_request,
  post_api_request,
  put_api_request,
  delete_api_request,
  api_url,
} from '../../helpers/Common.js';
import { Cards } from '../../components/cards/frame/cards-frame';

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

var ModuleName = 'DASHBOARD';
const QuizDetailedReport = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const params = useParams();
  const id = params.id;
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
  const HandleAction = e => {
    console.log(e);
    const id = e;
    if (e == 3) {
      history.push(`../users/${id}/edit-quiz`);
    } else if (e == 2) {
      history.push(`../users/${id}/edit-quiz`);
    } else if (e == 1) {
      history.push(`../users/${id}/overallQuiz-report`);
    }
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
    // {
    //   name: 'CODE',
    //   selector: row => row.fullname,
    //   sortable: true,
    // },
    // {
    //   name: 'TITLE',
    //   selector: row => row.role,
    //   sortable: true,
    // },
    // {
    //   name: 'CATEGORY',
    //   selector: row => row.email,
    //   sortable: true,
    // },
    // {
    //   name: 'TYPE	',
    //   selector: row => row.phone,
    //   sortable: true,
    // },
    // {
    //   name: 'VISIBILITY	',
    //   selector: row => row.phone,
    //   sortable: true,
    // },

    // {
    //   name: 'Status',
    //   selector: row => (
    //     <>
    //       <span className={`status ${row.active === 1 ? 'Success' : 'error'}`}>
    //         {row.active === 1 ? 'Active' : 'Inactive'}
    //       </span>
    //     </>
    //   ),
    //   sortable: true,
    // },
    // {
    //   name: 'Action',
    //   cell: row => (
    //     <div className="datatable-actions">
    //       <Select className="Quizz_actions" defaultValue="Actions" onSelect={e => HandleAction(e, row.id)}>
    //         <Option value={1}>Analytics</Option>
    //         <Option value={2}>Schedules</Option>
    //         <Option value={3}>Edit</Option>
    //         <Option
    //           value={4}
    //           onClick={() => (window.confirm('Are you sure you wish to delete this item?') ? handleDelete(row.id) : '')}
    //         >
    //           Delete
    //         </Option>
    //       </Select>
    //     </div>
    //   ),
    // },
    'No Data',
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
      <Main className="Quiz_report">
        <div key="1" className="page-header-actions" style={{ marginTop: '16px', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Fraction 1 - Overall Report</h1>
          <div className="importNewBTN">
            <Button size="small" key="4" type="dark">
              <FeatherIcon icon="plus" size={14} />
              DOWNLOAD REPORT
            </Button>
            <Button onClick={() => history.push(`./overallQuiz-report`)} size="small" key="4" type="success">
              <FeatherIcon icon="plus" size={14} />
              OVERALL REPORT
            </Button>
          </div>
        </div>
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
    </>
  );
};

export default QuizDetailedReport;
