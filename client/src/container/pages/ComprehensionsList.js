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
import { Editor, EditorTools } from '@progress/kendo-react-editor';
import EditComprehension from './EditComprehension';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
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
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const client_domain = process.env.REACT_APP_DOMAIN;
var ModuleName = 'DASHBOARD';
const ComprehensionsList = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [form] = Form.useForm();
  const [Editform] = Form.useForm();
  const location = useLocation();
  // console.log(location);
  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);

  const [ShowUserGroup, setShowUserGroup] = useState(false);
  const [ComprehensionID, setComprehensionID] = useState(null);
  const [Showaddcomprehension, setShowaddcomprehension] = useState(false);
  const [addnewoptions, setaddnewoptions] = useState(false);

  const [sidebaroptions, setsidebaroptions] = useState(false);
  const [optiondata, setoptiondata] = useState();
  const [checked, setChecked] = useState(false);
  const [editdataarray, seteditdataarray] = useState();
  const [render, setrender] = useState(false);
  const [formData, setformData] = useState({
    title: '',
    active: '',
    body: '',
  });

  const [formDataedit, setformDataedit] = useState({
    title: '',
    active: '',
    body: '',
  });
  useEffect(() => {
    setShowUserGroup(false);
    async function GetAllComprehension() {
      const url = api_url.comprehension_all;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const comprehensiondata = response?.data?.responsedata;
        setData(comprehensiondata);
      } else {
        console.log('error');
      }
    }
    GetAllComprehension();
  }, [location, render]);

  const handleView = e => {
    console.log(e);
    const ids = e.split(',');
    const actionid = ids?.[0];
    const rowid = ids?.[1];
    if (actionid == '1') {
      setComprehensionID(rowid);
      setShowUserGroup(true);
    } else if (actionid == '2') {
      handleDelete(rowid);
    }
  };

  const handleDelete = id => {
    var deletedrowid = id;
    var column = 'id';
    async function deleteData(id) {
      console.log(id);
      const url = api_url.create_comprehension + id;
      const response = await delete_api_request(url, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: 'Comprehension Deleted Successfully',
        });

        const afterdeletedata = data.filter(item => {
          if (column !== '') {
            return item[column] != id;
          }
          return item;
        });
        setData(afterdeletedata);
      } else {
        notification.error({
          message: response?.data?.message,
        });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      }
      // });
    }
    deleteData(id);
  };

  const handleaddnew = e => {
    setShowaddcomprehension(true);
  };
  const handlequestions = e => {
    console.log(e);
    if (e == '4') {
      history.push(`../users/add-shortquestions`);
    } else {
      history.push(`../users/add-singlequestion`);
    }
  };

  const handleChange = val => {
    setChecked(val);
  };
  const tablestyle = {
    background: '#2196F3',
    display: 'inline-flex',
    alignItems: 'center',
    flexGrow: '0.2',
    marginRight: '13%',
    color: '#fff',
    cursor: 'pointer',
    marginLeft: '10px',
  };
  const columns = [
    {
      name: 'Code',

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
      name: 'Title',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Body',
      selector: row => row.body.replace(/<[^>]*>/g, ''),
      sortable: true,
    },

    {
      name: 'Status',
      selector: row => (
        <>
          <span className={`status ${row.active === '1' ? 'Success' : 'error'}`}>
            {row.active === '1' ? 'Active' : 'Inactive'}
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
            onSelect={e => {
              handleView(e + ',' + row?.id);
            }}
          >
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

  const CopyToClipboard = e => {
    const id = encrypttheid(e);
    console.log(client_domain);
    console.log(e);
    navigator.clipboard.writeText(`${client_domain}/dashboard/users/comprehension`);
    notification.success({
      message: `Copied Successfully ${client_domain}/dashboard/users/comprehension`,
    });
  };
  var active;
  {
    formData.active == true ? (active = 1) : (active = 0);
  }
  const HandleSubmit = fieldsValue => {
    console.log(formData);
    console.log(fieldsValue);
    var payload = {
      title: formData?.title,
      body: formData?.body,
      active: active,
    };

    async function CreateComprehension() {
      const url = api_url.create_comprehension;
      const response = await post_api_request(url, payload, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({ message: 'Comprehension Created Sucessfully!' });
        setShowaddcomprehension(false);
        setrender(render + 1);
      } else {
        notification.error({
          message: response?.data?.message,
        });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      }
    }
    CreateComprehension();
  };

  return (
    <>
      <Main>
        <div key="1" className="page-header-actions">
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
            <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Comprehensions</h1>
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
              <Button className="btn-animation" onClick={() => handleaddnew()} size="small" key="5" type="success">
                <FeatherIcon icon="plus" size={14} />
                New Comprehensions
              </Button>
            </div>
          </div>
          {addnewoptions != false ? (
            <div className="questions_type">
              <Cards>
                {optiondata?.map(items => (
                  <a onClick={e => handlequestions(items?.id)} value={items?.id} className="options_value">
                    {items?.value}
                  </a>
                ))}
              </Cards>
            </div>
          ) : (
            ''
          )}
        </div>
        <DataTableExtensions {...tableData}>
          <DataTable
            className="tableHeading"
            columns={columns}
            data={data}
            defaultSortField="id"
            defaultSortAsc={false}
            pagination
            highlightOnHover
          />
        </DataTableExtensions>
      </Main>

      {ShowUserGroup != false ? <EditComprehension id={ComprehensionID} /> : ''}
      {Showaddcomprehension != false ? (
        <div className="Main-headerDiv">
          <div className="inner-headerDiv">
            <div className="headerDiv">
              <p>Add Comprehension</p>
              <div className="crossIcon">
                <a onClick={() => setShowaddcomprehension(false)}>X</a>
              </div>
            </div>
            <Main>
              <Form name="sDash_validation-form" Form={form}>
                <Cards>
                  <Form.Item
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: 'title is required.',
                      },
                    ]}
                  >
                    <label>Comprehension Title</label>
                    <Input
                      type="text"
                      onChange={selectedValue => {
                        setformData({ ...formData, title: selectedValue.target.value });
                      }}
                    ></Input>
                  </Form.Item>
                  <Form.Item name="body">
                    <label>Body</label>
                    <Editor
                      name="body"
                      onChange={selectedValue => {
                        setformData({ ...formData, body: selectedValue.html });
                      }}
                      tools={[
                        [Bold, Italic, Underline, Strikethrough],
                        [Subscript, Superscript],
                        [OrderedList, UnorderedList],
                        [InsertTable, InsertImage],
                      ]}
                      contentStyle={{
                        height: 200,
                      }}
                    />
                  </Form.Item>
                  <Form.Item name="active">
                    <label>
                      In-Active
                      <br />
                      Active (Shown Everywhere). In-active (Hidden Everywhere).
                    </label>
                    <Switch
                      className="pull-right"
                      onChange={selectedValue => {
                        setformData({ ...formData, active: selectedValue });
                      }}
                    ></Switch>
                  </Form.Item>
                  <Button type="dark" size="default" onClick={HandleSubmit}>
                    Create
                  </Button>
                </Cards>
              </Form>
            </Main>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default ComprehensionsList;
