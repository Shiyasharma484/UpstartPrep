import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Row, Input, Switch, Checkbox } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useHistory } from 'react-router-dom';
import { headers } from '../../helpers/variables';
import { Main } from '../styled';
import { Button } from '../../components/buttons/buttons';
import DataTable from 'react-data-table-component';
import { Editor, EditorTools } from '@progress/kendo-react-editor';
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
import { TextArea } from '@progress/kendo-react-inputs';
const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Indent,
  Outdent,
  OrderedList,
  UnorderedList,
  Undo,
  Redo,
  FontSize,
  FontName,
  FormatBlock,
  Link,
  Unlink,
  InsertImage,
  ViewHtml,
  InsertTable,
  AddRowBefore,
  AddRowAfter,
  AddColumnBefore,
  AddColumnAfter,
  DeleteRow,
  DeleteColumn,
  DeleteTable,
  MergeCells,
  SplitCell,
} = EditorTools;
var ModuleName = 'DASHBOARD';
/*Filter Section =========Start*/
var OriginalData = [];

/*Filter Section =========Ends*/
const UsersList = () => {
  const [data, setData] = useState([]);
  const [OriginData, setOriginData] = useState([]);
  const [UniQueData, setUniQueData] = useState([]);
  const history = useHistory();
  const [form] = Form.useForm();
  const [Editform] = Form.useForm();
  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);

  const [ShowUserGroup, setShowUserGroup] = useState(false);
  const [ShowAddNewUser, setShowAddNewUser] = useState(false);
  const [ShoweditSection, setShoweditSection] = useState(false);
  const [ASwitch, setASwitch] = useState(false);
  const [editASwitch, seteditASwitch] = useState(false);
  const [DescriptionValue, setDescriptionValue] = useState();
  const [EditDescriptionValue, setEditDescriptionValue] = useState();
  const [formData, setformData] = useState();
  const [ReRender, setReRender] = useState(0);
  /*Filter Section================================================= Starts */
  const [FilteredArraynew, setFilteredArraynew] = useState({ category_name: [], active: [] });
  const [dataForFilter, setDataForFilter] = useState([]);
  const [ShowNameFilter, setShowNameFilter] = useState(false);
  const [ShowStatusFilter, setShowStatusFilter] = useState(false);
  const [CategoryFilterClass, setCategoryFilterClass] = useState(true);
  const [ActiveFilterClass, setActiveFilterClass] = useState(true);
  const [FirstFilterActive, setFirstFilterActive] = useState(false);
  const [FilterCategoryName, setFilterCategoryName] = useState({
    category_name: false,
    active: false,
  });
  const [ShowActive, setShowActive] = useState(false);
  const [CheckedDataArray, setCheckedDataArray] = useState({
    category_name: '',
    active: '',
  });
  const [Render, setRender] = useState(0);
  /*Filter Section================================================= Ends */

  useEffect(() => {
    async function GetAllUsers() {
      const url = api_url.get_all_consultations;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const usersdata = response?.data?.responsedata;

        /*FILTER SECTION ============STARTS*/
        // OriginalData = usersdata;
        // GetFilterData(usersdata);
        setData(usersdata);
        // dataForFilter.push(usersdata);
        /*FILTER SECTION ==========Ends*/
      } else {
        console.log('error');
      }
    }
    GetAllUsers();
  }, [ReRender]);

  /*HANDLING DELETE A USER===================START */
  const handleDelete = id => {
    var deletedrowid = id;
    var column = 'id';
    async function deleteData(id) {
      const url = api_url.delete_category_id + deletedrowid;
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
  const HandleAction = (e, id) => {
    if (e == 1) {
      GetUserCategoryDataByID(id);
      setShoweditSection(true);
    } else if (e == 2) {
      console.log('Delete');
      window.confirm('Are you sure you wish to delete this item?') ? handleDelete(id) : '';
    }
  };
  const CopyToClipboard = e => {
    const id = 'cat_' + encrypttheid(e);
    navigator.clipboard.writeText(id);
    notification.success({
      message: `Copied Successfully ${id}`,
    });
  };
  async function GetUserCategoryDataByID(id) {
    const url = api_url.get_category_id + id;
    const response = await get_api_request(url, headers);
    if (response.status == 200) {
      const usersdata = response?.data?.responsedata?.[0];

      // setData(usersdata);
      if (usersdata?.active == 1) {
        seteditASwitch(true);
      } else if (usersdata?.active == 0) {
        seteditASwitch(false);
      }

      Editform.setFieldsValue({
        category_name: usersdata?.category_name,
        description: usersdata?.description,
        //group_name: usersdata?.group_name,
        short_description: usersdata?.short_description,
      });
      setformData(usersdata);
    } else {
      console.log('error');
    }
  }

  /*HANDLING DELETE A USER========================================END */

  const columns = [
    {
      name: (
        <>
          Name
          <i
            class="fa fa-filter"
            aria-hidden="true"
            // onClick={() => {
            //   setCategoryFilterClass(!CategoryFilterClass);
            //   //ShowNameFilterIcon();
            //   // setShowNameFilter(true);
            // }}
          ></i>
        </>
      ),
      selector: row => row?.data?.s_f_name,
    },
    {
      name: (
        <>
          Instructor Name
          <i
            class="fa fa-filter"
            aria-hidden="true"
            // onClick={() => {
            //   setCategoryFilterClass(!CategoryFilterClass);
            //   //ShowNameFilterIcon();
            //   // setShowNameFilter(true);
            // }}
          ></i>
        </>
      ),
      selector: row => row?.data?.f_name,
    },
    {
      name: (
        <>
          Email
          <i
            class="fa fa-filter"
            aria-hidden="true"
            // onClick={() => {
            //   setCategoryFilterClass(!CategoryFilterClass);
            //   //ShowNameFilterIcon();
            //   // setShowNameFilter(true);
            // }}
          ></i>
        </>
      ),
      selector: row => row?.data?.email,
    },
    {
      name: (
        <>
          Phone Number
          <i
            class="fa fa-filter"
            aria-hidden="true"
            // onClick={() => {
            //   setCategoryFilterClass(!CategoryFilterClass);
            //   //ShowNameFilterIcon();
            //   // setShowNameFilter(true);
            // }}
          ></i>
        </>
      ),
      selector: row => row?.data?.number,
    },
    {
      name: (
        <>
          STATUS{' '}
          <i
            class="fa fa-filter"
            aria-hidden="true"
            onClick={() => {
              setActiveFilterClass(!ActiveFilterClass);
              // ShowNameFilterIcon();
              // setShowActive(!ShowActive);
              // setShowStatusFilter(!ShowStatusFilter);
            }}
          ></i>
        </>
      ),
      selector: row => row.name,
    },

    {
      name: 'Actions',
      cell: row => (
        <div className="datatable-actions">
          <Select
            className="Quizz_actions"
            defaultValue="Actions"
            onSelect={e => HandleAction(e, row.id)}
            // onClick={e => {
            //   HandleAction(e.target.value);
            // }}
          >
            <Option value={1}>Edit</Option>
            <Option
              value={2}
              // onClick={() => (window.confirm('Are you sure you wish to delete this item?') ? handleDelete(row.id) : '')}
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

  const Editsection = Fieldsvalue => {
    var Payload = {};
    var editactiveswicth;
    if (editASwitch == true) {
      editactiveswicth = 1;
    } else {
      editactiveswicth = 0;
    }
    Payload['category_name'] = Fieldsvalue.category_name;
    Payload['description'] = EditDescriptionValue;
    Payload['active'] = editactiveswicth;
    Payload['short_description'] = Fieldsvalue.short_description;
    console.log(Payload);
    async function editSection(data) {
      const url = api_url.update_category_id + formData.id;
      const response = await put_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.responsedata,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        // history.push('../users/customer-list');
      } else
        notification.error({
          message: 'Server Error',
        });
    }
    editSection(Payload);
  };

  const addNewsection = fieldsvalue => {
    var payload = {};
    var activeswicth;
    if (ASwitch == true) {
      activeswicth = 1;
    } else {
      activeswicth = 0;
    }
    payload['category_name'] = fieldsvalue.category_name;
    payload['description'] = DescriptionValue;
    payload['active'] = activeswicth;
    payload['short_description'] = fieldsvalue.short_description;

    console.log(payload);
    async function CreateSection(data) {
      const url = api_url.create_category;
      const response = await post_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data.message,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        // history.push('../users/customer-list');
      } else
        notification.error({
          message: 'Server Error',
        });
    }
    CreateSection(payload);
  };
  const CloseEditSection = () => {
    console.log('555555555555');
    setShoweditSection(false);
    //setReRender(ReRender + 1);
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
            <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Consultation Requests</h1>
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
              {/* <Button
                onClick={() => setShowAddNewUser(true)}
                size="small"
                key="4"
                type="success"
                className="btn-animation"
              >
                <FeatherIcon icon="plus" size={14} />
                New Category
              </Button> */}
            </div>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-offset="10"
          data-aos-delay="50"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="center"
        >
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
        </div>
      </Main>

      {ShoweditSection != false ? (
        <div className="AddnewUser contactCard customCard">
          <Form
            name="sDash_validation-form"
            className="AddForm contactForm"
            form={Editform}
            layout="vertical"
            onFinish={Editsection}
          >
            <div className="headerDiv">
              <p>Edit Consultation</p>
              <div className="crossIcon">
                <a onClick={() => CloseEditSection()}>X</a>
              </div>
            </div>
            <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
              <Col md={24} xs={24}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Name " />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="instructor_name"
                  label="Instructor Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Select Instructor Name !',
                    },
                  ]}
                >
                  <Select>
                    <Option value={1}>Sweta</Option>
                    <Option value={1}>Arti</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Email !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Email" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Phone Number !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Phone Number " />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30} className="mainRow">
              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="active"
                    initialValue=""
                    label="Status"
                    rules={[
                      {
                        required: false,
                        message: 'Please Enter Status !',
                      },
                      {
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please Enter Correct Email',
                      },
                    ]}
                  >
                    <p name="">Active (Shown Everywhere). In-active (Hidden Everywhere).</p>
                  </Form.Item>
                </Col>
                <div className="switchToggle">
                  <Switch checked={editASwitch} onChange={() => seteditASwitch(!editASwitch)} />
                </div>
              </div>
            </Row>
            <Row gutter={30} className="Addgroupbtn">
              <Col md={24} xs={24}>
                <Form.Item>
                  <Button htmlType="submit">Update</Button>
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

export default UsersList;
