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
  ModulePermissions,
} from '../../helpers/Common.js';
import { Cards } from '../../components/cards/frame/cards-frame';
const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const client_domain = process.env.REACT_APP_DOMAIN;

var ModuleName = 'QUIZZES';
var UserRole = [];
var PermissionValues = {};
const QuizzesList = () => {
  var permissions = ModulePermissions(ModuleName);
  const [QuizeData, setQuizData] = useState([]);
  const history = useHistory();
  const [form] = Form.useForm();
  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);
  const [render, setrender] = useState(false);

  useEffect(() => {
    /*++++++++Get User Detail From Session+++++++++++++++++STARTS*/
    if (permissions) {
      UserRole = permissions?.role;
      if (permissions?.item?.value) {
        const perminssion_values = permissions?.item?.value.split(','); // get module value
        PermissionValues['view'] = perminssion_values[0];
        PermissionValues['add'] = perminssion_values[1];
        PermissionValues['edit'] = perminssion_values[2];
        PermissionValues['delete'] = perminssion_values[3];
      }
    } else {
      console.log('Not Authorized');
    }
    /*++++++++Get User Detail From Session+++++++++++++++++ENDS*/

    if (enc_user_detail) {
      var userDetail = decrypt(enc_user_detail);
      console.log(userDetail);
      var RoleName = userDetail?.sessdata?.user?.[0]?.user_role;
      var RoleID = userDetail?.sessdata?.user?.[0]?.user_role_id;
      var UserID = userDetail?.sessdata?.users_id;
      const deodedID = decodetheid(UserID);

      console.log(RoleName);
      if (RoleName == 'instructor') {
        GetQuizByInstructorID(deodedID);
      } else {
        GetAllQuizees();
      }
    }

    async function GetAllQuizees() {
      const url = api_url.get_all_quiz;
      console.log(url);
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const QuizData = response?.data?.data;
        console.log(QuizData);
        setQuizData(QuizData);
      } else {
        console.log('error');
      }
    }

    async function GetQuizByInstructorID(id) {
      const url = api_url.getQuiz_byInstructorID + id;
      console.log(url);
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const QuizData = response?.data?.data;
        setQuizData(QuizData);
        console.log(QuizData);
      } else {
        console.log('error');
      }
    }
  }, [render]);
  const HandleAction = e => {
    console.log(e);
    const ids = e.split(',');
    console.log(ids);
    const actionid = ids?.[0];
    const rowid = encrypttheid(ids?.[1]);
    console.log(rowid);
    if (actionid == 3) {
      history.push(`../engage/edit-quiz/${rowid}`);
    } else if (actionid == 2) {
      history.push({
        pathname: `../engage/edit-quiz/${rowid}`,
        state: 'schedule',
      });
    } else if (actionid == 1) {
      history.push(`../engage/overallQuiz-report/${rowid}`);
    } else if (actionid == 4) {
      handleDelete(rowid);
    }
  };
  const CopyToClipboard = e => {
    const id = encrypttheid(e);
    navigator.clipboard.writeText(`${client_domain}/dashboard/engage/edit-quiz/${id}`);
    notification.success({
      message: `Copied Successfully ${client_domain}/dashboard/engage/edit-quiz/${id}`,
    });
  };
  /*=========================================ENDS */
  /*HANDLING DELETE A USER===================START */

  const handleDelete = id => {
    console.log(id);
    var deletedrowid = decodetheid(id);
    var column = 'id';
    async function deleteData(id) {
      console.log(id);
      const url = api_url.delete_quiz_byId + deletedrowid;
      console.log(url);
      const response = await delete_api_request(url, headers);
      console.log(response);

      if (response.status == 200) {
        notification.success({
          message: 'Quiz Deleted Successfully',
        });
        setrender(true + 1);
        const afterdeletedata = QuizeData.filter(item => {
          if (column !== '') {
            return item[column] !== deletedrowid;
          }
          return item;
        });
        setQuizData(afterdeletedata);
      } else if (response.status == 400) {
        alert(response.data.message);
      } else {
        alert('Error');
      }
      // });
    }
    deleteData(deletedrowid);
  };
  /*HANDLING DELETE A USER========================================END */
  const columns = [
    {
      name: 'CODE',
      selector: row => (
        <>
          <p onClick={() => CopyToClipboard(row.id)}>
            <i class="fa fa-files-o" aria-hidden="true"></i> {encrypttheid(row.id)}
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
      selector: row => row.category_name,
      sortable: true,
    },
    {
      name: 'TYPE	',
      selector: row => row.quiz_name,
      sortable: true,
    },

    {
      name: 'VISIBILITY',
      selector: row => (
        <>
          <span className={`status ${row.visibility === '1' ? 'Success' : 'error'}`}>
            {row.visibility === '1' ? 'Publish' : 'Draft'}
          </span>
        </>
      ),
      sortable: true,
    },

    {
      name: 'Status',
      selector: row => (
        <>
          <span className={`status ${row.active == '1' ? 'Success' : 'error'}`}>
            {row.active == '1' ? 'Active' : 'Inactive'}
          </span>
        </>
      ),
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className="datatable-actions">
          <Select className="Quizz_actions" defaultValue="Actions" onSelect={e => HandleAction(e + ',' + row.id)}>
            <Option value={1}>Analytics</Option>
            <Option value={2}>Schedules</Option>
            {PermissionValues?.edit == 1 ? <Option value={3}>Edit</Option> : ''}
            {PermissionValues?.delete == 1 ? <Option value={4}>Delete</Option> : ''}
          </Select>
        </div>
      ),
    },
  ];

  const tableData = {
    columns,
    QuizeData,
  };

  return (
    <>
      <Main className="Quizlist">
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
            <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Quizzes</h1>
          </div>
          {PermissionValues?.add == 1 ? (
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
                    history.push(`../engage/create`)
                  }
                  size="small"
                  key="4"
                  type="success"
                >
                  <FeatherIcon icon="plus" size={14} />
                  New Quiz
                </Button>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>

        {/* <div
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
          data={QuizeData}
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
