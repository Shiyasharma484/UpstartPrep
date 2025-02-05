import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Tabs, Row, Input, Switch, Card } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useHistory } from 'react-router-dom';
import { headers } from '../../helpers/variables';
import { Main } from '../styled';
import FormItem from 'antd/lib/form/FormItem';
import { TimePicker } from 'antd';
import DatePicker from 'react-datepicker';
import { Button } from '../../components/buttons/buttons';
import DataTable from 'react-data-table-component';
import 'react-datepicker/dist/react-datepicker.css';
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
import { Editor, EditorTools } from '@progress/kendo-react-editor';
import { Cards } from '../../components/cards/frame/cards-frame';
import AddDetails from './QuizTabs/DetailsTab';
import AddSettings from './QuizTabs/SettingsTab';
import AddQuestions from './QuizTabs/QuestionsTab';
import AddSchedules from './QuizTabs/schedulesTab';
const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

var ModuleName = 'DASHBOARD';
const CreateNewQuiz = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [form] = Form.useForm();
  const [Detailsform] = Form.useForm();
  const enc_user_detail = Cookies.get('UserDetail');
  const [startDate, setStartDate] = useState(new Date());
  const { TabPane } = Tabs;
  const [arrayDataskills, setarrayDataskills] = useState(null);
  const [arrayDatatopic, setarrayDatatopic] = useState(null);
  const [DescriptionValue, setDescriptionValue] = useState();

  const [ShowTabPane, setShowTabPane] = useState({
    Detail: true,
    Settings: false,
    Questions: false,
    Schedules: false,
  });
  const [arrayDatatag, setarrayDatatag] = useState(null);
  const [ActiveSwitch, setActiveSwitch] = useState(false);
  const [EditActiveSwitch, setEditActiveSwitch] = useState(false);
  const [ASwitch, setASwitch] = useState(false);
  const [EditASwitch, setEditASwitch] = useState(false);

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

  /*==========================================END */
  /*HANDLING EDIT=============================START */

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
    payload['description'] = DescriptionValue;
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
          history.push('../users/lessons');
        }, 1000);
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
          <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Edit Lesson</h1>
        </div>
        <section className="SectionTabsMainTop">
          <>
            <Main className="mainCard">
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
                <Cards>
                  <Form
                    name="sDash_validation-form detailForm"
                    //className="AddForm contactForm"
                    form={Detailsform}
                    layout="vertical"
                    onFinish={addNewUser}
                  >
                    <Row gutter={30} className="detailrow togglefield">
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item
                          name="title"
                          label="Lesson Title"
                          rules={[
                            {
                              required: false,
                              message: 'Please Enter Lesson Title !',
                            },
                          ]}
                        >
                          <Input name="" placeholder="Lesson Title" />
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="description" label="Body">
                          <Editor
                            onChange={e => setDescriptionValue(e.html)}
                            tools={[
                              [Bold, Italic, Underline, Strikethrough],
                              [Subscript, Superscript],
                              [AlignLeft, AlignCenter, AlignRight, AlignJustify],
                              [Indent, Outdent],
                              [OrderedList, UnorderedList],
                              FontSize,
                              FontName,
                              FormatBlock,
                              [Undo, Redo],
                              [Link, Unlink, InsertImage, ViewHtml],
                              [InsertTable],
                              [AddRowBefore, AddRowAfter, AddColumnBefore, AddColumnAfter],
                              [DeleteRow, DeleteColumn, DeleteTable],
                              [MergeCells, SplitCell],
                            ]}
                            contentStyle={{
                              height: 150,
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
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
                      <Col md={24} xs={24} className="mb-space">
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
                      <Col md={24} xs={24} className="mb-space">
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
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="difficulty_level" label="Difficulty Level">
                          <Select>
                            <Option value={1}>Difficulty Level</Option>
                            <Option value={2}>Difficulty Level</Option>
                            <Option value={3}>Difficulty Level</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
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

                      <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtns">
                        <Button htmlType="submit" type="success" size="default" className="btn-animation">
                          Save & Proceed
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Cards>
              </div>
            </Main>
          </>
        </section>
      </Main>
    </>
  );
};

export default CreateNewQuiz;
