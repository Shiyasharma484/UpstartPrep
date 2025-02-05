import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Row, Input, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useHistory } from 'react-router-dom';
import { headers } from '../../helpers/variables';
import { Main } from '../styled';
import { Button } from '../../components/buttons/buttons';
import DataTable from 'react-data-table-component';
import StaticImage from './../../static/img/video-lessons.png';
import DataTableExtensions from 'react-data-table-component-extensions';
import Cookies from 'js-cookie';
import {
  get_api_request,
  post_api_request,
  put_api_request,
  delete_api_request,
  api_url,
} from '../../helpers/Common.js';
import imageUploadSave from '../../helpers/uploadImage';
import { Editor, EditorTools } from '@progress/kendo-react-editor';
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
const { decrypt } = require('../../helpers/encryption-decryption');
const { imageRender } = require('../../helpers/renderImage');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const Blog1 = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [Render, setRender] = useState(0);

  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);
  var userId = userDetail?.sessdata?.users_id_enc;
  console.log(userId);

  useEffect(() => {
    async function GetAllBlogs() {
      const url = api_url.get_all_Blogs;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const blogdata = response?.data?.responsedata;
        setData(blogdata);
      } else {
        console.log('error');
      }
    }
    GetAllBlogs();
  }, [Render]);
  var columns = [
    {
      name: 'CODE',
      selector: row => 'blog_' + encrypttheid(row.id),
      sortable: true,
    },
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Slug',
      selector: row => row.slug,
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.html,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => (
        <>
          <span className={`status ${row.active == 1 ? 'Success' : 'error'}`}>
            {row.active == 1 ? 'Active' : 'Inactive'}
          </span>
        </>
      ),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="datatable-actions">
          <Select className="Quizz_actions" defaultValue="Actions" onSelect={e => HandleAction(e, row.id)}>
            <Option value={1}>Edit</Option>
            <Option value={2}>Delete</Option>
          </Select>
        </div>
      ),
    },
  ];
  const tableData = {
    columns,
    data,
  };
  const HandleAction = (e, id) => {
    if (e == 1) {
      history.push(`./editblog/${encrypttheid(id)}`);
    } else if (e == 2) {
      console.log('Delete');
      window.confirm('Are you sure you wish to delete this item?') ? handleDelete(id) : '';
    }
  };

  const handleDelete = id => {
    var deletedrowid = id;
    var column = 'id';
    async function deleteData(id) {
      const url = api_url.delete_blog_by_id + deletedrowid;
      const response = await delete_api_request(url, headers);
      if (response.status == 201) {
        notification.success({
          message: 'Category Deleted Successfully',
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
            <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Blog List</h1>
          </div>
          <div className="importNewBTN">
            {/* <Button onClick={() => history.push(`../users/add-user`)} size="small" key="4" type="dark">
            Import Users
          </Button> */}
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
                onClick={() => history.push('./addblog')}
                size="small"
                key="4"
                type="success"
                className="btn-animation"
              >
                <FeatherIcon icon="plus" size={14} />
                New Blog
              </Button>
            </div>
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

export default Blog1;
