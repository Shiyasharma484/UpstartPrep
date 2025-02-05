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
const { TextArea } = Input;

var ModuleName = 'DASHBOARD';
const UsersList = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [form] = Form.useForm();
  const [Editform] = Form.useForm();
  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);
  const [ASwitch, setASwitch] = useState(false);
  const [editASwitch, seteditASwitch] = useState(false);
  const [formData, setformData] = useState();
  const [ShowEdittopic, setShowEdittopic] = useState(false);
  const [ShowAddNewUser, setShowAddNewUser] = useState(false);
  const [arrayDataSkills, setarrayDataSkills] = useState(null);
  useEffect(() => {
    async function GetAllUsers() {
      const url = api_url.get_topics;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const usersdata = response?.data?.responsedata;
        setData(usersdata);
      } else {
        console.log('error');
      }
    }
    GetAllUsers();
    async function getSkills() {
      const url = api_url.get_skills;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const skilldata = response.data.responsedata;
        const dataArray = skilldata.map(item => {
          return { id: item.id, name: item.skill_name };
        });
        setarrayDataSkills(dataArray);
      } else {
        console.log('error');
      }
    }
    getSkills();
  }, []);

  const HandleAction = (e, id) => {
    console.log(e);

    if (e == 1) {
      GetUserTopicDataByID(id);
      setShowEdittopic(true);
    } else if (e == 2) {
      console.log('Delete');
      window.confirm('Are you sure you wish to delete this item?') ? handleDelete(id) : '';
    }
  };

  async function GetUserTopicDataByID(id) {
    const url = api_url.get_topics_id + id;
    const response = await get_api_request(url, headers);
    if (response.status == 200) {
      console.log(response);
      const usersdata = response?.data?.responsedata?.[0];
      console.log(usersdata);

      // setData(usersdata);
      if (usersdata?.active == 1) {
        seteditASwitch(true);
      } else if (usersdata?.active == 0) {
        seteditASwitch(false);
      }

      Editform.setFieldsValue({
        topic_name: usersdata?.topic_name,
        skill_id: usersdata?.skill_name,
        //group_name: usersdata?.group_name,
        short_description: usersdata?.short_description,
      });
      setformData(usersdata);
    } else {
      console.log('error');
    }
  }

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
    async function editData(id) {
      const encryptedid = encrypttheid(id);
      const postID = encryptedid;
      history.push(`../users/edit-user/${postID}`);
    }
    editData(id);
  };
  /*=========================================ENDS */
  /*HANDLING DELETE A USER===================START */
  const handleDelete = id => {
    var deletedrowid = id;
    var column = 'id';
    async function deleteData(id) {
      const url = api_url.delete_topics_id + deletedrowid;
      const response = await delete_api_request(url, headers);
      if (response.status == 201) {
        notification.success({
          message: 'Topic Deleted Successfully',
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
    navigator.clipboard.writeText(e);
    notification.success({
      message: `Copied Successfully ${e}`,
    });
  };
  /*HANDLING DELETE A USER========================================END */
  const columns = [
    {
      name: 'CODE',
      selector: row => (
        <>
          <p onClick={() => CopyToClipboard(row.id)}>
            <i class="fa fa-files-o" aria-hidden="true"></i> {'topic_' + encrypttheid(row.id)}
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
      name: 'NAME',
      selector: row => row.topic_name,
      sortable: true,
    },
    {
      name: 'Skill',
      selector: row => row.skill_name,
      sortable: true,
    },
    {
      name: 'STATUS',
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
  const EditTopic = Fieldsvalue => {
    var Payload = {};
    var editactive;
    if (editASwitch == true) {
      editactive = 1;
    } else {
      editactive = 0;
    }
    Payload['topic_name'] = Fieldsvalue.topic_name;
    Payload['skill_id'] = Fieldsvalue.skill_id;
    Payload['short_description'] = Fieldsvalue.short_description;
    Payload['active'] = editactive;
    console.log(Payload);
    async function editTopic(data) {
      const url = api_url.update_topics_id + formData.id;
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
    editTopic(Payload);
  };
  const addNewTopic = fieldsvalue => {
    var payload = {};
    var activeswicth;
    if (ASwitch == true) {
      activeswicth = 1;
    } else {
      activeswicth = 0;
    }
    payload['topic_name'] = fieldsvalue.topic_name;
    payload['skill_id'] = fieldsvalue.skill_id;
    payload['short_description'] = fieldsvalue.short_description;
    payload['active'] = activeswicth;
    console.log(payload);
    async function CreateTopic(data) {
      const url = api_url.create_topics;
      const response = await post_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.message,
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
    CreateTopic(payload);
  };
  return (
    <>
      <Main>
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
          <div key="1" className="page-header-actions" style={{ marginTop: '16px', justifyContent: 'space-between' }}>
            <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Topics</h1>
            <div className="importNewBTN">
              {/* <Button onClick={() => history.push(`../users/add-user`)} size="small" key="4" type="dark">
              Import Users
            </Button> */}
              <Button
                onClick={() => setShowAddNewUser(true)}
                size="small"
                key="4"
                type="success"
                className="btn-animation"
              >
                <FeatherIcon icon="plus" size={14} />
                New Topic
              </Button>
            </div>
          </div>
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
        {/* </div> */}
      </Main>
      {/* {ShowUserGroup != false ? (
        <div className="Main-headerDiv">
          <div className="inner-headerDiv">
            <div className="headerDiv">
              <p>Add user to group</p>
              <div className="crossIcon">
                <a onClick={() => setShowUserGroup(false)}>X</a>
              </div>
            </div>
            <div className="joinedP">
              <p>Joined Groups:</p>
            </div>
            <div className="userGroupselect">
              <label>Users Groups</label>
              <div className="userGroupselect-inner">
                <Select>
                  <Option defaultValue="Select User Groups">Select User Groups</Option>
                  <Option value={1}>One</Option>
                  <Option value={2}>Two</Option>
                  <Option value={3}>Three</Option>
                </Select>
              </div>
            </div>
            <div className="Addgroupbtn">
              <button>Add</button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )} */}
      {ShowAddNewUser != false ? (
        <div className="AddnewUser contactCard customCard">
          <Form
            name="sDash_validation-form"
            className="AddForm contactForm"
            form={form}
            layout="vertical"
            onFinish={addNewTopic}
          >
            <div className="headerDiv">
              <p>New Topic</p>
              <div className="crossIcon">
                <a onClick={() => setShowAddNewUser(false)}>X</a>
              </div>
            </div>
            <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
              <Col md={24} xs={24}>
                <Form.Item
                  name="topic_name"
                  label="Topic Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Topic Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="User Group Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="skill_id"
                  label="Skill Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Skill Name !',
                    },
                  ]}
                >
                  <Select
                    style={{ width: '100%' }}
                    classNamePrefix="select"
                    isSearchable={true}
                    arrayDataSkills={arrayDataSkills}
                    //onSelect={GetPosition}
                  >
                    {arrayDataSkills != null
                      ? arrayDataSkills.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item className="txtareaSpace fullsizefield" name="short_description" label="Short Description">
                  <TextArea rows={3} showCount maxLength={100} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30} className="mainRow">
              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="active"
                    initialValue=""
                    label="Active"
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
                  <Switch onChange={() => setASwitch(!ASwitch)} />
                </div>
              </div>
            </Row>
            <Row gutter={30} className="Addgroupbtn">
              <Col md={24} xs={24}>
                <Form.Item>
                  <Button htmlType="submit" className="btn-animation">
                    Create
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      ) : (
        ''
      )}
      {ShowEdittopic != false ? (
        <div className="AddnewUser contactCard customCard">
          <Form
            name="sDash_validation-form"
            className="AddForm contactForm"
            form={Editform}
            layout="vertical"
            onFinish={EditTopic}
          >
            <div className="headerDiv">
              <p>Edit Topic</p>
              <div className="crossIcon">
                <a onClick={() => setShowEdittopic(false)}>X</a>
              </div>
            </div>
            <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
              <Col md={24} xs={24}>
                <Form.Item
                  name="topic_name"
                  label="Topic Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter User Group Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="User Group Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="skill_id"
                  label="Skill Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Skill Name !',
                    },
                  ]}
                >
                  <Select
                    style={{ width: '100%' }}
                    classNamePrefix="select"
                    isSearchable={true}
                    arrayDataSkills={arrayDataSkills}
                    //onSelect={GetPosition}
                  >
                    {arrayDataSkills != null
                      ? arrayDataSkills.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item className="txtareaSpace fullsizefield" name="short_description" label="Short Description">
                  <TextArea rows={3} showCount maxLength={100} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30} className="mainRow">
              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="active"
                    initialValue=""
                    label="Active"
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
                  <Button htmlType="submit" className="btn-animation">
                    Update
                  </Button>
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
