import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useHistory } from 'react-router-dom';
import { headers } from '../../helpers/variables';
import { Main } from '../styled';
import { Button } from '../../components/buttons/buttons';
import DataTable from 'react-data-table-component';
import 'react-data-table-component-extensions/dist/index.css';
import authorizes from '../../../src/static/img/authorized.png';
import Cookies from 'js-cookie';
import { get_api_request, delete_api_request, api_url } from '../../helpers/Common.js';
const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');

var ModuleName = 'POSTS';
const UsersList = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    const enc_user_detail = Cookies.get('UserDetail');
    const response = decrypt(enc_user_detail);
    const getuserID = response?.sessdata?.users_id;
    const decriptedID = decodetheid(getuserID);
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

    if (GetRole == 'SUPER_ADMIN') {
      async function GetAllPosts() {
        const url = api_url.get_all_posts;
        const response = await get_api_request(url, { headers });
        if (response.status === 200) {
          const userdata = response?.data?.responsedata?.posts;
          setData(userdata);
        }
        // });
      }
      GetAllPosts();
    } else {
      async function GetPostsByUser() {
        const url = api_url.get_posts_byid + decriptedID;
        const response = await get_api_request(url, { headers });
        if (response.status === 200) {
          const userdata = response?.data?.responsedata?.posts;
          setData(userdata);
        }
        // });
      }
      GetPostsByUser();
    }
  }, []);

  const handleView = id => {
    async function viewData(id) {
      const encryptedid = encrypttheid(id);
      const postID = encryptedid;
      history.push(`../users/view-post/${postID}`);
    }
    viewData(id);
  };

  const handleEdit = id => {
    async function editData(id) {
      const encryptedid = encrypttheid(id);
      const postID = encryptedid;
      history.push(`../users/edit-post/${postID}`);
    }
    editData(id);
  };

  const handleDelete = id => {
    var deletedrowid = id;
    var column = 'id';
    async function deleteData(id) {
      const encryptedid = encrypttheid(id);
      const postID = encryptedid;

      const url = api_url.trash_posts_byid + id;
      const response = await delete_api_request(url, headers);

      if (response.status === 201) {
        notification.success({
          message: 'Post Deleted Successfully',
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

  const columns = [
    {
      name: 'Name',
      selector: row => row.user_name,
      sortable: true,
    },
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Medium',
      selector: row => row.medium,
      sortable: true,
    },

    {
      name: 'Status',
      selector: row => (
        <>
          <span className={`status ${row.active === 1 ? 'Success' : 'error'}`}>
            {row.active === 1 ? 'Published' : 'Draft'}
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
    <>
      {permission == true ? (
        <Main>
          <div key="1" className="page-header-actions" style={{ marginTop: '16px', justifyContent: 'space-between' }}>
            <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Pins</h1>
            <Button onClick={() => history.push(`../users/add-pins`)} size="small" key="4" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add New
            </Button>
          </div>

          <DataTable
            columns={columns}
            data={data}
            defaultSortField="id"
            defaultSortAsc={false}
            pagination
            highlightOnHover
          />
        </Main>
      ) : (
        <div className="authorized_msg">
          <img src={authorizes} width="40%" />
        </div>
      )}
    </>
  );
};

export default UsersList;
