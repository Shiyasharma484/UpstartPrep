import React, { useState, useEffect } from 'react';
import FeatherIcon from 'feather-icons-react';
import { Button, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import 'react-data-table-component-extensions/dist/index.css';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
//import { headers } from '../../helpers/variables';
import Cookies from 'js-cookie';
import authorizes from '../../../src/static/img/authorized.png';
import { get_api_request, delete_api_request, api_url } from '../../helpers/Common.js';
const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid } = require('../../helpers/encode-decode');

var ModuleName = 'DASHBOARD';
const Productlist = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [permission, setPermission] = useState(false);
  const access_token = Cookies.get('access_token');
  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    token: access_token,
    device_id: '',
    api_version: '',
    browser: '',
    device_type: '',
  };

  useEffect(() => {
    async function GetPermissions() {
      const enc_user_detail = Cookies.get('UserDetail');
      const response = decrypt(enc_user_detail);
      const UserInfo = response?.sessdata?.user?.[0];
      const GetRole = UserInfo?.user_role?.toUpperCase();
      const modules = UserInfo?.permissions?.[GetRole].MODULES;

      if (modules[ModuleName]) {
        setPermission(true);
        const value = modules[ModuleName]; //get module values
        const getvalue = value.split(',');
      } else {
        notification.error({
          message: 'Permissions Not Valid',
        });
      }
    }
    GetPermissions();

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

  const handleView = id => {
    async function viewData(id) {
      const encryptedid = encrypttheid(id);
      const postID = encryptedid;
      history.push(`../users/view-customer/${postID}`);
    }
    viewData(id);
  };

  const handleEdit = id => {
    async function editData(id) {
      const encryptedid = encrypttheid(id);
      const postID = encryptedid;
      history.push(`../users/edit-customer/${postID}`);
    }
    editData(id);
  };

  const handleDelete = id => {
    var deletedrowid = id;
    var column = 'id';

    async function deleteData(id) {
      const url = api_url.trash_user + id;
      const response = await delete_api_request(url, headers);

      if (response.status === 201) {
        const afterdeletedata = data.filter(item => {
          if (column !== '') {
            return item[column] !== deletedrowid;
          }
          return item;
        });

        setData(afterdeletedata);
        notification.open({
          message: 'User Deleted Successfully',
        });
      } else if (response.status === 400) {
        notification.error({ message: response?.data?.data?.message });
      } else {
        alert('Error');
      }
    }
    deleteData(id);
  };

  const columns = [
    {
      name: 'Name',
      selector: row => row.user_name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },

    {
      name: 'Phone Number',
      selector: row => row.phone,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => (
        <>
          <span className={`status ${row.active === 1 ? 'Success' : 'error'}`}>
            {row.active === 1 ? 'Active' : 'InActive'}
          </span>
        </>
      ),
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className="datatable-actions">
          <Button
            onClick={() => {
              handleView(row.id);
            }}
            className="btn-icon"
            type="primary"
            to="#"
            shape="circle"
          >
            <FeatherIcon icon="eye" size={16} />
          </Button>

          <Button
            onClick={() => {
              handleEdit(row.id);
            }}
            className="btn-icon"
            type="info"
            to="#"
            shape="circle"
          >
            <FeatherIcon icon="edit" size={16} />
          </Button>

          <Button
            className="btn-icon"
            type="danger"
            to="#"
            shape="circle"
            onClick={() => (window.confirm('Are you sure you wish to delete this item?') ? handleDelete(row.id) : '')}
          >
            <FeatherIcon icon="trash-2" size={16} margin-right={10} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Main className="productListName">
      <div key="1" className="page-header-actions" style={{ marginTop: '16px', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)', marginTop: '16px' }}>Customers List</h1>

        <Button
          onClick={() => {
            history.push('../users/add-customer');
          }}
          size="small"
          key="4"
          type="primary"
        >
          <FeatherIcon icon="plus" size={14} />
          Add New Customer
        </Button>
      </div>
      {permission == true ? (
        <Cards>
          <DataTable
            columns={columns}
            data={data}
            noHeader
            defaultSortField="id"
            defaultSortAsc={false}
            pagination
            highlightOnHover
          />
        </Cards>
      ) : (
        <div className="authorized_msg">
          <img src={authorizes} width="40%" />
        </div>
      )}
    </Main>
  );
};

export default Productlist;
