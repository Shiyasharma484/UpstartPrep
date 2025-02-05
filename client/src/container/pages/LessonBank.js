import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Row, Input, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
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
const ExamType = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const params = useParams();
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);

  const [ShowAddNewQuizType, setShowAddNewQuizType] = useState(false);
  const [arrayDataskills, setarrayDataskills] = useState(null);
  const [arrayDatatag, setarrayDatatag] = useState(null);
  const [ActiveSwitch, setActiveSwitch] = useState(false);
  const [EditActiveSwitch, setEditActiveSwitch] = useState(false);
  const [ASwitch, setASwitch] = useState(false);
  const [EditASwitch, setEditASwitch] = useState(false);

  const [arrayDatatopic, setarrayDatatopic] = useState(null);
  useEffect(() => {
    async function GetAllUsers() {
      const url = api_url.get_lesson;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const usersdata = response?.data?.responsedata;
        setData(usersdata);
      } else {
        console.log('error');
      }
    }
    GetAllUsers();
    async function getSkill() {
      const url = api_url.get_skills;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const skilldata = response.data.responsedata;
        const DataArray = skilldata.map(item => {
          return { id: item.id, name: item.skill_name };
        });
        setarrayDataskills(DataArray);
      } else {
        console.log('error');
      }
    }
    getSkill();
    async function getTopic() {
      const url = api_url.get_topics;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const topicdata = response.data.responsedata;
        const DataArray = topicdata.map(item => {
          return { id: item.id, name: item.topic_name };
        });
        setarrayDatatopic(DataArray);
      } else {
        console.log('error');
      }
    }
    getTopic();
    async function getTag() {
      const url = api_url.get_tags;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const tagsdata = response.data.responsedata;
        const DataArray = tagsdata.map(item => {
          return { id: item.id, name: item.tag_name };
        });
        setarrayDatatag(DataArray);
      } else {
        console.log('error');
      }
    }
    getTag();
  }, []);

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
    console.log(id);
    async function editData(id) {
      const encryptedid = encrypttheid(id);
      // const postID = encryptedid;
      history.push(`../library/editlesson/${encryptedid}`);
    }
    editData(id);
  };
  /*=========================================ENDS */
  /*HANDLING DELETE A USER===================START */
  const handleDelete = id => {
    var deletedrowid = decodetheid(id);
    var column = 'id';
    async function deleteData(id) {
      const url = api_url.delete_lesson_id + deletedrowid;
      const response = await delete_api_request(url, headers);
      if (response.status == 201) {
        notification.success({
          message: 'Lesson Deleted Successfully',
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
    console.log(e);
    navigator.clipboard.writeText(`${client_domain}/dashboard/library/editlesson/${id}`);
    notification.success({
      message: `Copied Successfully ${client_domain}/dashboard/library/editlesson/${id}`,
    });
  };

  /*HANDLING DELETE A USER========================================END */
  const columns = [
    {
      name: 'CODE',
      selector: row => (
        <>
          <p onClick={() => CopyToClipboard(row.id)}>
            <i class="fa fa-files-o" aria-hidden="true"></i> {'lesson_' + encrypttheid(row.id)}
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
      name: 'SECTION',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'SKILL',
      selector: row => row.skill_name,
      sortable: true,
    },
    {
      name: 'TOPIC',
      selector: row => row.topic_name,
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
      name: 'Action',
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
    const encryptedID = encrypttheid(id);
    if (e == 1) {
      handleEdit(id);
    } else if (e == 2) {
      console.log('Delete');
      window.confirm('Are you sure you wish to delete this item?') ? handleDelete(encryptedID) : '';
    }
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
    var paidactive;
    var activeswicth;
    if (ASwitch == true) {
      paidactive = 1;
    } else {
      paidactive = 0;
    }
    if (ActiveSwitch == true) {
      activeswicth = 1;
    } else {
      activeswicth = 0;
    }
    payload['title'] = fieldsvalue.title;
    payload['skill_id'] = fieldsvalue.skill_id;
    payload['tag_id'] = fieldsvalue.tag_id;
    payload['topic_id'] = fieldsvalue.topic_id;
    payload['difficulty_level'] = fieldsvalue.difficulty_level;
    payload['description'] = fieldsvalue.description;
    payload['read_time'] = fieldsvalue.read_time;
    payload['active'] = activeswicth;
    payload['paid'] = paidactive;

    console.log(payload);
    async function CreateLesson(data) {
      const url = api_url.create_lesson;
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
    CreateLesson(payload);
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
            <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Lessons</h1>
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
                onClick={() => history.push(`../library/createlesson`)}
                size="small"
                key="4"
                type="success"
                className="btn-animation"
              >
                <FeatherIcon icon="plus" size={14} />
                NEW LESSON
              </Button>
            </div>
          </div>
        </div>
        <br />{' '}
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
          data={data}
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          highlightOnHover
        />
        {/* </div> */}
      </Main>
      {ShowAddNewQuizType != false ? (
        <div className="AddnewUser contactCard customCard">
          <Form
            name="sDash_validation-form"
            className="AddForm contactForm"
            form={form}
            layout="vertical"
            onFinish={addNewUser}
          >
            <div className="headerDiv">
              <p>Edit Lesson</p>
              <div className="crossIcon">
                <a onClick={() => setShowAddNewQuizType(false)}>X</a>
              </div>
            </div>
            <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
              <Col md={24} xs={24}>
                <Form.Item name="title" label="Lesson Title">
                  <Input placeholder="Quiz Type Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item name="description" label="Body">
                  <Input placeholder="Body" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item name="skill_id" label="Skill">
                  <Select
                    style={{ width: '100%' }}
                    classNamePrefix="select"
                    isSearchable={true}
                    arrayDataskills={arrayDataskills}
                    //onSelect={GetPosition}
                  >
                    {arrayDataskills != null
                      ? arrayDataskills.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item name="topic_id" label="Topic">
                  <Select
                    style={{ width: '100%' }}
                    classNamePrefix="select"
                    isSearchable={true}
                    arrayDatatopic={arrayDatatopic}
                    //onSelect={GetPosition}
                  >
                    {arrayDatatopic != null
                      ? arrayDatatopic.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item name="tag_id" label="Tags">
                  <Select
                    style={{ width: '100%' }}
                    classNamePrefix="select"
                    isSearchable={true}
                    arrayDatatag={arrayDatatag}
                    //onSelect={GetPosition}
                  >
                    {arrayDatatag != null
                      ? arrayDatatag.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item name="difficulty_level" label="Difficulty Level">
                  <Select>
                    <Option value={1}>Difficulty Level</Option>
                    <Option value={2}>Difficulty Level</Option>
                    <Option value={3}>Difficulty Level</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item name="read_time" label="Read Time (Minutes)">
                  <Input placeholder="1" />
                </Form.Item>
              </Col>
              <Col md={21}>
                <p>
                  <b>Active</b> <br />
                  Active (Shown Everywhere). In-active (Hidden Everywhere).
                </p>
              </Col>
              <Col md={3}>
                <Switch onChange={() => setActiveSwitch(!ActiveSwitch)} />
              </Col>
              <Col md={21}>
                <p>
                  <b>Paid</b> <br />
                  Paid (Accessible to only paid users). Free (Anyone can access).
                </p>
              </Col>
              <Col md={3}>
                <Switch onChange={() => setASwitch(!ASwitch)} />
              </Col>
            </Row>

            <Row gutter={30} className="Addgroupbtn">
              <Col md={24} xs={24}>
                <Form.Item>
                  <Button htmlType="submit">Save Lesson</Button>
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

export default ExamType;
