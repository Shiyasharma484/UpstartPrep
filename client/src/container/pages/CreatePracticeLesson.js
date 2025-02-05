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

import { Cards } from '../../components/cards/frame/cards-frame';
const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

var ModuleName = 'DASHBOARD';
const CreateNewQuiz = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [Detailsform] = Form.useForm();
  const [arrayDatasubcategory, setarrayDatasubcategory] = useState(null);
  const [arrayDataskills, setarrayDataskills] = useState(null);
  const [isActive, setisActive] = useState(true);
  const [Active, setActive] = useState(false);
  const [Practice, setPractice] = useState();
  const [PracticeId, setPracticeId] = useState();

  const [ShowTabPane, setShowTabPane] = useState({
    Detail: true,
    Settings: false,
    Questions: false,
    Schedules: false,
  });
  const [settingData, setsettingData] = useState({
    skill_id: '',
    sub_category_id: '',
  });

  useEffect(() => {
    console.log('createnewwwwwwwwwwwwwwwww');
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
    async function getCategory() {
      const url = api_url.get_subcategory;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const categorydata = response.data.responsedata;
        const dataArray = categorydata.map(item => {
          return { id: item.id, name: item.sub_category_name };
        });
        setarrayDatasubcategory(dataArray);
      } else {
        console.log('error');
      }
    }
    getCategory();
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
    setisActive(true);
    getSkill();
  }, []);

  const handleclass = e => {
    console.log(e);
    if (e == 1) {
      setisActive(current => !current);
      setActive(false);
      setShowTabPane({
        Detail: true,
        Settings: false,
        Questions: false,
        Schedules: false,
      });
    } else if (e == 2) {
      setActive(current => !current);
      setisActive(false);
      setShowTabPane({
        //Detail: false,
        /// Settings: true,
        Questions: true,
        Schedules: false,
      });
    }
  };

  const addDetails = fieldsvalue => {
    var payload = {
      sub_category_id: settingData.sub_category_id,
      skill_id: settingData.skill_id,
    };

    if (Practice) {
      async function updateLesson() {
        const url = api_url.get_lesson_id + PracticeId;
        const response = await put_api_request(url, payload, headers);
        console.log(response);
        if (response.status == 201) {
          notification.success({
            message: response?.data?.responsedata,
          });
        } else {
          notification.error({ message: response?.message });
        }
      }
      updateLesson();
    } else {
      async function CreateSection(data) {
        const url = api_url.create_lesson;
        const response = await post_api_request(url, payload, headers);
        console.log(response);
        if (response.status == 201) {
          notification.success({
            message: response?.data.message,
          });
          const responseid = response?.data?.id;
          setPracticeId(responseid);
          async function getQuestionbyid() {
            const url = api_url.get_lesson_id + responseid;
            const response = await get_api_request(url, headers);
            if (response.status == 200) {
              const questiondata = response?.data?.responsedata?.[0];
              console.log(questiondata);
              // const skillid = questiondata?.skill_id;
              setPractice(questiondata);
              Detailsform.setFieldsValue({});
            } else {
              notification.error({ message: response?.message });
            }
          }
          getQuestionbyid();
        } else {
          notification.error({ message: response?.message });
        }
      }
      CreateSection();
    }
  };

  return (
    <>
      <Main>
        <section className="SectionTabsMainTop">
          <div
            data-aos="fade-down"
            data-aos-offset="10"
            data-aos-delay="50"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
          >
            <Cards>
              <div className="SectionTabs_Main">
                <div id="SectionTabsGeneral" className="SectionTabsInner">
                  <p>
                    <h2 className="titlepractice">Configure Lessons</h2>
                    <p>Add Lessons to Learning</p>
                  </p>
                  <div className="practicebuttons">
                    {' '}
                    <button
                      //id="Details"
                      // onClick={selectProductType}
                      // onClick={handleGeneralButton}
                      value={1}
                      className={isActive ? 'practice-tabpane' : ''}
                      onClick={e => (PracticeId ? handleclass(e.target.value) : '')}
                      // className={isActive1 ? 'active' : ''}
                    >
                      <span>1</span> Choose Skills
                    </button>
                    <button
                      //id="Settings"
                      // onClick={selectProductType}
                      // data-rowid={'2'}
                      //disabled={disableAttribute}
                      // disabled={disableAttributeButton}
                      // onClick={handleAttributeButton}
                      // className={isActive2 ? 'active' : ''}
                      value={2}
                      className={Active ? 'practice-tabpane' : ''}
                      onClick={e => (PracticeId ? handleclass(e.target.value) : '')}
                    >
                      <span>2</span> Add / Remove Videos
                    </button>
                  </div>
                </div>
              </div>
            </Cards>
          </div>

          {ShowTabPane?.Detail == true ? (
            <>
              <Main className="mainCard lessonCard">
                <div
                  data-aos="fade-up"
                  data-aos-offset="10"
                  data-aos-delay="50"
                  data-aos-duration="500"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="false"
                  data-aos-anchor-placement="top-center"
                >
                  <Cards>
                    <Form
                      name="sDash_validation-form detailForm"
                      //className="AddForm contactForm"
                      form={Detailsform}
                      layout="vertical"
                      onFinish={addDetails}
                    >
                      <Row gutter={30} className="togglefield">
                        <p className="border-b">
                          {' '}
                          <b>Choose Sub Category & Skill</b>
                        </p>
                        <Col md={24} xs={24} className="mb-space">
                          <Form.Item
                            name="sub_category_id"
                            label="Sub Category"
                            rules={[
                              {
                                required: true,
                                message: 'Please Enter Sub category !',
                              },
                            ]}
                          >
                            <Select
                              style={{ width: '100%' }}
                              classNamePrefix="select"
                              isSearchable={true}
                              arrayDatasubcategory={arrayDatasubcategory}
                              //onSelect={GetPosition}
                              onChange={selectedValue => {
                                setsettingData({ ...settingData, sub_category_id: selectedValue });
                              }}
                            >
                              {arrayDatasubcategory != null
                                ? arrayDatasubcategory.map((item, index) => (
                                    <Option value={item.id}>{item.name} </Option>
                                  ))
                                : ''}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col md={24} xs={24} className="mb-space">
                          <Form.Item
                            name="skill_id"
                            label="Skill"
                            rules={[
                              {
                                required: true,
                                message: 'Please Enter Skill !',
                              },
                            ]}
                          >
                            <Select
                              style={{ width: '100%' }}
                              classNamePrefix="select"
                              isSearchable={true}
                              arrayDataskills={arrayDataskills}
                              //onSelect={GetPosition}
                              onChange={selectedValue => {
                                setsettingData({ ...settingData, skill_id: selectedValue });
                              }}
                            >
                              {arrayDataskills != null
                                ? arrayDataskills.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                                : ''}
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col md={24} xs={24} style={{ textAlign: 'right' }} className="Videobtn">
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
          ) : (
            ''
          )}

          {ShowTabPane?.Questions == true ? (
            <div
              data-aos="fade-up"
              data-aos-offset="10"
              data-aos-delay="50"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="top-center"
            >
              <Cards>
                {' '}
                <>
                  <Main className="Question_form_main">
                    <Form className="Question_form">
                      <Row gutter={30}>
                        <Col md={10} className="Question_first_division">
                          <Col md={24}>
                            <i class="fa fa-filter" aria-hidden="true"></i>
                            <b>Filters</b>
                          </Col>
                          <Col md={24}>
                            <b>
                              <label>Code</label>
                            </b>
                            <FormItem name="code">
                              <Input placeholder="Enter Code"></Input>
                            </FormItem>
                          </Col>
                          <Col md={24}>
                            <b>
                              <label>Type</label>
                            </b>
                          </Col>
                          <Col md={24}>
                            <Col md={24} className="Type_checkboxes">
                              <Input type="checkbox" value="1" />
                              <label> Multiple Choice Single Answer</label>
                            </Col>
                            <Col md={24} className="Type_checkboxes">
                              <Input type="checkbox" value="2" />
                              <label> Multiple Choice Multiple Answers</label>
                            </Col>
                            <Col md={24} className="Type_checkboxes">
                              <Input type="checkbox" value="3" />
                              <label> True or False</label>
                            </Col>
                            <Col md={24} className="Type_checkboxes">
                              <Input type="checkbox" value="4" />
                              <label> Short Answer</label>
                            </Col>
                            <Col md={24} className="Type_checkboxes">
                              <Input type="checkbox" value="5" />
                              <label> Match the Following</label>
                            </Col>
                            <Col md={24} className="Type_checkboxes">
                              <Input type="checkbox" value="6" />
                              <label> Ordering/Sequence</label>
                            </Col>
                            <Col md={24} className="Type_checkboxes">
                              <Input type="checkbox" value="7" />
                              <label> Fill in the Blanks</label>
                            </Col>
                          </Col>
                          <Col md={24}>
                            <b>
                              <label>Section</label>
                            </b>
                            <FormItem name="Section">
                              <Input placeholder="Enter Section"></Input>
                            </FormItem>
                          </Col>
                          <Col md={24}>
                            <b>
                              <label>Skill</label>
                            </b>
                            <FormItem name="Skill">
                              <Input placeholder="Enter Skill"></Input>
                            </FormItem>
                          </Col>
                          <Col md={24}>
                            <b>
                              <label>Topic</label>
                            </b>
                            <FormItem name="Topic">
                              <Input placeholder="Enter Topic"></Input>
                            </FormItem>
                          </Col>
                          <Col md={24}>
                            <b>
                              <label>By Tag</label>
                            </b>
                            <FormItem name="by_tag ">
                              <Input type="search"></Input>
                            </FormItem>
                          </Col>
                          <Col md={24}>
                            <b>
                              <label>Difficulty_Level</label>
                            </b>
                          </Col>
                          <Col md={24}>
                            <Col md={24} className="Difficulty_checkboxes">
                              <Input type="checkbox" value="1" />
                              <label> Very Easy</label>
                            </Col>
                            <Col md={24} className="Difficulty_checkboxes">
                              <Input type="checkbox" value="2" />
                              <label> Easy</label>
                            </Col>
                            <Col md={24} className="Difficulty_checkboxes">
                              <Input type="checkbox" value="3" />
                              <label> Medium</label>
                            </Col>
                            <Col md={24} className="Difficulty_checkboxes">
                              <Input type="checkbox" value="4" />
                              <label> High</label>
                            </Col>
                            <Col md={24} className="Difficulty_checkboxes">
                              <Input type="checkbox" value="5" />
                              <label>Very High</label>
                            </Col>
                          </Col>
                          <Col md={24} className="Reset_FirstDivision">
                            <Button size="small" type="danger" className="btn-animation">
                              Reset
                            </Button>

                            <Button size="small" type="success" className="btn-animation">
                              Search
                            </Button>
                          </Col>
                        </Col>
                        <Col md={14} className="Question_second_division">
                          <Cards>
                            <h3>Currently Viewing Questions</h3>
                            <b>
                              <a href="#"> View Questions</a>
                            </b>{' '}
                            |{' '}
                            <b>
                              <a href="#">Add Questions</a>
                            </b>
                          </Cards>
                        </Col>
                      </Row>
                    </Form>
                  </Main>
                </>
              </Cards>
            </div>
          ) : (
            ''
          )}
        </section>
        {console.log(ShowTabPane)}
      </Main>
    </>
  );
};

export default CreateNewQuiz;
