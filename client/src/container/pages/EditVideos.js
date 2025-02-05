import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Tabs, Row, Input, Switch, Card } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useHistory, useParams } from 'react-router-dom';
import { headers } from '../../helpers/variables';
import { Main } from '../styled';
import FormItem from 'antd/lib/form/FormItem';
import { TimePicker } from 'antd';
import DatePicker from 'react-datepicker';
import { Button } from '../../components/buttons/buttons';
import DataTable from 'react-data-table-component';
import 'react-datepicker/dist/react-datepicker.css';
import imageUploadSave from '../../helpers/uploadImage';
import { imageRender } from '../../helpers/renderImage';

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
  const params = useParams();
  const videoid = decodetheid(params?.id);
  const history = useHistory();
  const [Detailsform] = Form.useForm();
  const enc_user_detail = Cookies.get('UserDetail');
  const [startDate, setStartDate] = useState(new Date());
  const { TabPane } = Tabs;
  const [ShowAddNewQuizType, setShowAddNewQuizType] = useState(false);
  const [arrayDatasubcategory, setarrayDatasubcategory] = useState(null);
  const [arrayDataskills, setarrayDataskills] = useState(null);
  const [arrayDatatopic, setarrayDatatopic] = useState(null);
  const [arrayDatatags, setarrayDatatags] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [DescriptionValue, setDescriptionValue] = useState();
  const [imageURL, setImageURL] = useState(null);
  const [Images, setImages] = useState([]);

  const [ActiveSwitch, setActiveSwitch] = useState(false);
  const [ShowPointsManualfield, setShowPointsManualfield] = useState(false);
  const [ShowVideosLink, setShowVideosLink] = useState(true);
  const [showVideoBox, setshowVideoBox] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setformData] = useState();

  const [ASwitch, setASwitch] = useState(false);
  const [ShowEditNewQuizType, setShowEditNewQuizType] = useState(false);
  const [ShowTabPane, setShowTabPane] = useState({
    Detail: true,
    Settings: false,
    Questions: false,
    Schedules: false,
  });
  const [settingData, setsettingData] = useState({
    youtube: false,
    mp4: false,
    vimeo: false,
    video_id: '',
    video_link: '',
    video_thumbnail: '',
    skill_id: '',
    tags_id: '',
    topic_id: '',
  });
  useEffect(() => {
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
    async function getTags() {
      const url = api_url.get_tags;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const tagdata = response.data.responsedata;
        const DataArray = tagdata.map(item => {
          return { id: item.id, name: item.tag_name };
        });
        setarrayDatatags(DataArray);
      } else {
        console.log('error');
      }
    }
    getTags();
    async function GetUserGroupDataByID() {
      const url = api_url.get_video_bank_id + videoid;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const usersdata = response?.data?.responsedata?.[0];

        // setData(usersdata);
        if (usersdata?.active == 1) {
          setActiveSwitch(true);
        } else if (usersdata?.active == 0) {
          setActiveSwitch(false);
        }

        if (usersdata?.video_thumbnail) {
          var imageurl = [];
          imageurl.push(usersdata.video_thumbnail);
          setImages(imageurl);
        }

        if (usersdata?.paid == 1) {
          setASwitch(true);
        } else if (usersdata?.paid == 0) {
          setASwitch(false);
        }

        if (usersdata?.video_type == 1) {
          setASwitch(true);
        } else if (usersdata?.video_type == 2) {
          setASwitch(true);
        } else if (usersdata?.video_type == 3) {
          setASwitch(true);
        }

        setShowPointsManualfield(usersdata?.video_type == 2);
        setShowPointsManualfield(usersdata?.video_type == 3);
        setsettingData({
          ...settingData,
          youtube: usersdata?.video_type == 2 ? true : false,
          mp4: usersdata?.video_type == 1 ? true : false,
          vimeo: usersdata?.video_type == 3 ? true : false,
          video_id: usersdata?.video_id,
          video_link: usersdata?.video_link,
          video_thumbnail: usersdata?.video_thumbnail,
          skill_id: usersdata?.skill_id,
          tags_id: usersdata?.tag_id,
          topic_id: usersdata?.topic_id,
        });
        Detailsform.setFieldsValue({
          video_title: usersdata?.video_title,
          skill_id: usersdata?.skill_name,
          tags_id: usersdata?.tag_name,
          topic_id: usersdata?.topic_name,
          difficulty_level: usersdata?.difficulty_level,
          watch_time: usersdata?.watch_time,
          description: usersdata?.description,
          video_type: usersdata?.video_type,
          video_link: usersdata?.video_link,
          video_id: usersdata?.video_id,
          video_thumbnail: usersdata?.video_thumbnail,
        });
        setformData(usersdata);
        console.log(usersdata?.watch_time);
      } else {
        console.log('error');
      }
    }
    GetUserGroupDataByID();
  }, []);
  const showMessage = () => {
    //Show message in alert()
    var iframeBox = document.getElementById('iframeBox');
    iframeBox.style.display = 'block';

    var videoInput = document.getElementById('videolink_input');
    console.log(videoInput.value);

    var ytUrl = videoInput.value;
    var ytUrl2 = videoInput.value;

    var ytUrl2 = ytUrl.replace('/watch?v=', '/embed/');
    var ytUrl3 = ytUrl2.replace('https://youtu.be/', 'https://www.youtube.com/embed/');

    var youtubeIframe = document.getElementById('youtubeIframe');
    var youtubeIframe2 = document.getElementById('youtubeIframe');
    var setVideolink = youtubeIframe.setAttribute('src', ytUrl2);
    var setVideolink2 = youtubeIframe2.setAttribute('src', ytUrl3);
    console.log(setVideolink);

    //setshowVideoBox(true);
  };

  const handleClick = e => {
    if (e == 1) {
      setIsActive(current => !current);
      //setActive(false);
      setShowTabPane({
        Detail: true,
        Settings: false,
        Questions: false,
        Schedules: false,
      });
    } else if (e == 2) {
      // setActive(current => !current);
      setIsActive(false);
      setShowTabPane({
        Detail: false,
        Settings: true,
        Questions: false,
        Schedules: false,
      });
    } else if (e == 3) {
      // setActive(current => !current);
      setIsActive(false);
      setShowTabPane({
        Detail: false,
        Settings: true,
        Questions: false,
        Schedules: false,
      });
    }
  };
  const url = domainpath + '/images/post';
  const imageHandleChange = async e => {
    console.log(e.target.files);
    console.log(e.target.value);
    var vfile;

    vfile = e.target.files;
    console.log(vfile);
    // var singleimage = imageRender(vfile);
    // setImages(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        setImageURL(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
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
    var video_Type;
    if (settingData?.mp4 == true) {
      video_Type = 1;
    } else if (settingData?.vimeo == true) {
      video_Type = 3;
    } else if (settingData?.youtube == true) {
      video_Type = 2;
    }
    payload['video_title'] = fieldsvalue.video_title;
    payload['video_type'] = video_Type;
    payload['video_link'] = settingData.video_link;
    payload['video_id'] = settingData.video_id;
    payload['video_thumbnail'] = imageURL;
    payload['skill_id'] = settingData.skill_id;
    payload['tags_id'] = settingData.tags_id;
    payload['topic_id'] = settingData.topic_id;
    payload['difficulty_level'] = fieldsvalue.difficulty_level;
    payload['description'] = DescriptionValue;
    payload['active'] = activeswicth;
    payload['paid'] = paidactive;

    async function CreateLesson(data) {
      const url = api_url.update_video_bank_id + videoid;
      const response = await put_api_request(url, data, headers);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.responsedata,
        });

        setTimeout(() => {
          history.push('../videos');
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
          <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Edit Video</h1>
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
                          name="video_title"
                          label="Video Title"
                          rules={[
                            {
                              required: false,
                              message: 'Please Enter Video Title !',
                            },
                          ]}
                        >
                          <Input name="" placeholder="Video Title" />
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space solution_video">
                        <Form.Item name="video_type" label=" Video Type (Supported YouTube, Vimeo & .mp4 files)">
                          <div className="video_buttons videos">
                            <Button
                              className={settingData?.mp4 == true ? 'bg-salmon' : ''}
                              id="mp4"
                              onClick={e => {
                                setsettingData({ ...settingData, vimeo: false, youtube: false, mp4: true });
                                setShowPointsManualfield(false);
                                setShowVideosLink(true);
                              }}
                              value={1}
                            >
                              MP4 Video
                            </Button>
                            <Button
                              className={settingData?.youtube == true ? 'bg-salmon' : ''}
                              id="youtube"
                              value={2}
                              onClick={e => {
                                setsettingData({ ...settingData, vimeo: false, youtube: true, mp4: false });
                                setShowPointsManualfield(true);
                                setShowVideosLink(false);
                              }}
                            >
                              YouTube Video
                            </Button>
                            <Button
                              className={settingData?.vimeo == true ? 'bg-salmon' : ''}
                              id="vimeo"
                              value={3}
                              //onClick={e => handleClick(e.target.value)}
                              onClick={e => {
                                setsettingData({ ...settingData, vimeo: true, youtube: false, mp4: false });
                                setShowPointsManualfield(true);
                                setShowVideosLink(false);
                              }}
                            >
                              Vimeo Video
                            </Button>
                          </div>
                        </Form.Item>
                      </Col>
                      {ShowVideosLink != false ? (
                        <Col md={24} xs={24} className="mb-space Videolinkmain">
                          <Form.Item
                            name="video_link"
                            label="Video Link"
                            rules={[
                              {
                                required: false,
                                message: 'Please Enter Video Link !',
                              },
                            ]}
                            className="Videolinkmain-inner"
                          >
                            <Input
                              name=""
                              placeholder="Video Link"
                              className="videolink_input"
                              id="videolink_input"
                              onChange={selectedValue => {
                                setsettingData({ ...settingData, video_link: selectedValue.target.value });
                              }}
                            />
                          </Form.Item>

                          <Form.Item
                            className="video_link_label"
                            label="Video Link"
                            rules={[
                              {
                                required: false,
                                message: 'Please Enter Video Link !',
                              },
                            ]}
                          >
                            <Button
                              className="videopreview btn-animation"
                              id="YoutubeBtn"
                              onClick={e => {
                                showMessage(e);
                                //setshowVideoBox(true);
                              }}
                            >
                              {' '}
                              <FeatherIcon size={17} icon="play" />
                              Preview
                            </Button>
                          </Form.Item>
                        </Col>
                      ) : (
                        ''
                      )}
                      {/* {showVideoBox != false ? ( */}
                      <Col md={22} xs={24} className="mb-space">
                        <div className="youtubeIframe" style={{ display: 'none' }} id="iframeBox">
                          <div className="closeVideoBtn">
                            <span>X </span>
                            <span>Close </span>
                          </div>

                          <iframe
                            id="youtubeIframe"
                            width="560"
                            height="315"
                            src=""
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          ></iframe>
                        </div>
                      </Col>
                      {/* ) : (
                        ''
                      )} */}
                      {ShowPointsManualfield != false ? (
                        <Col md={24} xs={24} className="mb-space">
                          <Form.Item name="video_id" label="Video Id">
                            <Input
                              className="videolink_input"
                              type="text"
                              placeholder="Enter Your Video Id"
                              onChange={selectedValue => {
                                setsettingData({ ...settingData, video_id: selectedValue.target.value });
                              }}
                            ></Input>
                            {/* <Button className="videopreview">
                              {' '}
                              <FeatherIcon size={17} icon="play" />
                              Preview
                            </Button> */}
                          </Form.Item>
                        </Col>
                      ) : (
                        ''
                      )}

                      <Col md={24} xs={24} className="mb-space Videolinkmain">
                        <Form.Item name="video_thumbnail" label="Video Thumbnail" className="Videolinkmain-inner">
                          <Input
                            className="videolink_input"
                            type="text"
                            style={{ width: '86%' }}
                            placeholder="Enter Your Video Thumbnail"
                            onChange={selectedValue => {
                              setsettingData({ ...settingData, video_thumbnail: selectedValue.target.value });
                            }}
                            value={imageURL}
                          ></Input>
                        </Form.Item>
                        <Form.Item className="video_link_labels" style={{ marginTop: '61px' }}>
                          <label for="file-upload" className="file-upload">
                            <i class="fa fa-upload"></i>
                          </label>
                          <Input
                            style={{ opacity: '0' }}
                            name="image"
                            label="Image"
                            type="file"
                            // datafield={image + '-' + i}
                            onChange={e => imageHandleChange(e)}
                            id="file-upload"
                            //value={index[0]}
                          />
                        </Form.Item>
                      </Col>

                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item className="txtareaSpace fullsizefield" name="description" label="Description">
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
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="topic_id" label="Topic">
                          <Select
                            style={{ width: '100%' }}
                            classNamePrefix="select"
                            isSearchable={true}
                            arrayDatatopic={arrayDatatopic}
                            //onSelect={GetPosition}
                            onChange={selectedValue => {
                              setsettingData({ ...settingData, topic_id: selectedValue });
                            }}
                          >
                            {arrayDatatopic != null
                              ? arrayDatatopic.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                              : ''}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="tags_id" label="Tag">
                          <Select
                            style={{ width: '100%' }}
                            classNamePrefix="select"
                            isSearchable={true}
                            arrayDatatags={arrayDatatags}
                            //onSelect={GetPosition}
                            onChange={selectedValue => {
                              setsettingData({ ...settingData, tags_id: selectedValue });
                            }}
                          >
                            {arrayDatatags != null
                              ? arrayDatatags.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                              : ''}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item
                          name="difficulty_level"
                          label="Difficulty Level
                        "
                        >
                          <Select>
                            <Option value={1}>Very Easy</Option>
                            <Option value={2}>Easy</Option>
                            <Option value={3}>Medium</Option>
                            <Option value={4}>High</Option>
                            <Option value={5}>Very High</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="watch_time" label="Watch Time (Minutes)">
                          <Input></Input>
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="freepaid switchToggle mb-space">
                        <p>
                          <b>Free</b> <br />
                          Paid (Accessible to only paid users). Free (Anyone can access).
                        </p>
                        <Switch onChange={() => setASwitch(!ASwitch)} checked={ASwitch} />
                      </Col>
                      <Col md={24} xs={24} className="freepaid switchToggle mb-space">
                        <p>
                          <b>Status</b> <br />
                          Published (Shown Everywhere). Draft (Not Shown).
                        </p>
                        <Switch onChange={() => setActiveSwitch(!ActiveSwitch)} checked={ActiveSwitch} />
                      </Col>
                      <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
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
