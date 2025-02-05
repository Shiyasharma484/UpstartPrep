import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Row, Input, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useHistory } from 'react-router-dom';
import { headers } from '../../helpers/variables';
import { Main } from '../styled';
import { Button } from '../../components/buttons/buttons';
import DataTable from 'react-data-table-component';
import {
  get_api_request,
  post_api_request,
  put_api_request,
  delete_api_request,
  api_url,
} from '../../helpers/Common.js';
const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { Cards } from '../../components/cards/frame/cards-frame';

var ModuleName = 'PAGES';
const Pages = () => {
  const history = useHistory();
  const [PagesData, setPagesData] = useState([]);
  const [render, setrender] = useState(false);
  useEffect(() => {
    async function GetAllPages() {
      const url = api_url.getallpages;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const PageData = response?.data?.responsedata;
        console.log(PageData);
        setPagesData(PageData);
      } else {
        console.log('error');
      }
    }
    GetAllPages();
  }, [render]);
  const HandleAction = e => {
    console.log(e);
    const ids = e.split(',');
    console.log(ids);
    const actionid = ids?.[0];
    const rowid = encrypttheid(ids?.[1]);
    const slug = ids?.[2];
    console.log(slug);
    if (actionid == 2) {
      history.push(`/dashboard/configuration/edit-page/${slug}`);
    } else if (actionid == 1) {
      history.push(`/dashboard/configuration/view-page/${slug}`);
    } else if (actionid == 3) {
      handleDelete(rowid);
    }
  };
  const handleDelete = id => {
    console.log(id);
    var deletedrowid = decodetheid(id);
    console.log(deletedrowid);
    var column = 'id';
    async function deleteData(id) {
      console.log(id);
      const url = api_url.deletepage_byID + deletedrowid;
      console.log(url);
      const response = await delete_api_request(url, headers);
      console.log(response);

      if (response.status == 201) {
        notification.success({
          message: 'Page Deleted Successfully',
        });
        setrender(true + 1);
        const afterdeletedata = PagesData.filter(item => {
          if (column !== '') {
            return item[column] !== deletedrowid;
          }
          return item;
        });
        setPagesData(afterdeletedata);
      } else if (response.status == 400) {
        alert(response.data.message);
      } else {
        alert('Error');
      }
      // });
    }
    deleteData(deletedrowid);
  };
  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'SLUG',
      selector: row => row.slug,
      sortable: true,
    },

    {
      name: 'Status',
      selector: row => (
        <>
          <span className={`status ${row.enable === '1' ? 'Success' : 'error'}`}>
            {row.enable === '1' ? 'Active' : 'Inactive'}
          </span>
        </>
      ),
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className="datatable-actions">
          <Select
            className="Quizz_actions"
            defaultValue="Actions"
            onSelect={e => HandleAction(e + ',' + row.id + ',' + row.slug)}
          >
            <Option value={1}>View</Option>
            <Option value={2}>Edit</Option>
            <Option value={3}>Delete</Option>
          </Select>
        </div>
      ),
    },
  ];

  const tableData = {
    columns,
    PagesData,
  };
  return (
    <>
      <Main>
        <div key="1" className="page-header-actions" style={{ marginTop: '16px', justifyContent: 'space-between' }}>
          <div
            data-aos="fade-down"
            data-aos-offset="10"
            data-aos-delay="50"
            data-aos-duration="1500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="center"
          >
            <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>PAGES</h1>
          </div>
          <div className="importNewBTN">
            <div
              data-aos="fade-down"
              data-aos-offset="10"
              data-aos-delay="50"
              data-aos-duration="1500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="center"
            >
              <Button
                className="btn-animation"
                onClick={() => history.push(`/dashboard/configuration/add-page`)}
                size="small"
                key="4"
                type="success"
              >
                <FeatherIcon icon="plus" size={14} />
                ADD NEW PAGE
              </Button>
            </div>
          </div>
        </div>
        <DataTable
          className="tableHeading"
          columns={columns}
          data={PagesData}
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          highlightOnHover
        />
      </Main>
    </>
  );
};
export default Pages;
