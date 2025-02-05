import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Form, notification, Select, Col, Row, Input, Switch, Space } from 'antd';
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
import imageUploadSave from '../../helpers/uploadImage';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-build-classic-mathtype';
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
const { imageRender } = require('../../helpers/renderImage');
const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

var ModuleName = 'DASHBOARD';
const AddMultipleQuestions = () => {
  const [checked, setChecked] = useState(true);
  const form = Form.useForm();
  const params = useParams();
  //console.log(params);
  // const questiontype_id = encrypttheid(params?.id)
  const ParamID = params?.id;
  const questiontype_id = decodetheid(ParamID);
  const [showsolutionvalue, setshowsolutionvalue] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [Active, setActive] = useState(false);
  const [VimeoActive, setVimeoActive] = useState(false);
  const [YoutubeActive, setYoutubeActive] = useState(false);
  const [Mp4Active, setMp4Active] = useState(false);
  const [OptionValues, setOptionValues] = useState([]);
  const [skillsdataarray, setskillsdataarray] = useState();
  const [topicsdataarray, settopicsdataarray] = useState();
  const [comprehensionData, setcomprehensionData] = useState();
  const [tagsarraydata, settagsarraydata] = useState();
  const [ActiveDetails, setActiveDetails] = useState(false);
  const [Activesolution, setActivesolution] = useState(false);
  const [ActiveSetting, setActiveSetting] = useState(false);
  const [ActiveAttachment, setActiveAttachment] = useState(false);
  const [skills, setskills] = useState();
  const [levelsData, setlevelsData] = useState();
  const [AllSections, setAllSections] = useState([]);
  const [ShowAttachment, setShowAttachment] = useState(false);
  const [QuestionAttempt, setQuestionAttempt] = useState({
    Enable: false,
    disable: false,
  });
  const [QuestionId, setQuestionId] = useState();
  const [entityarray, setentityarray] = useState();
  const [MetaId, setMetaId] = useState();
  const [ShowQuestionAttempt, setShowQuestionAttempt] = useState();
  const [AnswersData, setAnswersData] = useState();
  const [exactanswer, setexactanswer] = useState({
    key: '',
    value: '',
  });
  const [CheckedExactAnswer, setCheckedExactAnswer] = useState({
    option1: false,
    option2: false,
  });
  const [tabpane, settabpane] = useState({
    Details: true,
    Settings: false,
    Solution: false,
    Attachment: false,
  });
  const [formData, setformData] = useState({
    question: '',
    description: '',
    option1: '',
    option2: '',
    skill: '',
    level: '',
    points: '1',
    question_time: '60',
    tags: '',
    topic: '',
    section: '',
    hint: '',
    solution: '',
    solution_video: '',
    attachments: '',
    video_link: '',
    attachment_type: '',
  });
  const [videoType, setvideoType] = useState();
  const [AttachemtType, setAttachemtType] = useState({
    comprehension: false,
    audio: false,
    video: false,
  });
  const [AttachmentTypeValues, setAttachmentTypeValues] = useState({
    value: '',
    link: '',
  });
  useEffect(() => {
    async function getallskills() {
      const url = api_url.get_skills;
      const response = await get_api_request(url, headers);

      if (response.status == 200) {
        const skillsdata = response?.data?.responsedata;

        const skillsarray = skillsdata.map(items => {
          return { id: items.id, name: items.skill_name };
        });
        setskillsdataarray(skillsarray);
      } else {
        notification.error({ message: response?.message });
      }
    }
    getallskills();

    async function getallTopics() {
      const url = api_url.get_topics;
      const response = await get_api_request(url, headers);

      if (response.status == 200) {
        const topicsdata = response?.data?.responsedata;

        const topicsarray = topicsdata.map(items => {
          return { id: items.id, name: items.topic_name };
        });
        settopicsdataarray(topicsarray);
      } else {
        notification.error({ message: response?.message });
      }
    }
    getallTopics();
    async function getallCopmrehension() {
      const url = api_url.comprehension_all;
      const response = await get_api_request(url, headers);

      if (response.status == 200) {
        const comprehension = response?.data?.responsedata;

        const comprehensionarray = comprehension.map(items => {
          return { id: items.id, name: items.title };
        });
        setcomprehensionData(comprehensionarray);
      } else {
        notification.error({ message: response?.message });
      }
    }
    getallCopmrehension();

    async function GetAllSection() {
      const url = api_url.get_section;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const Section = response?.data?.responsedata;
        const filtersection = Section.map(item => {
          return { id: item.id, name: item.section_name };
        });
        setAllSections(filtersection);
      } else {
        console.log('error');
      }
    }
    GetAllSection();

    async function getallTags() {
      const url = api_url.get_tags;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const tagsdata = response?.data?.responsedata;
        // console.log(skillsdata);
        const tagssarray = tagsdata.map(items => {
          //console.log(items);
          return { id: items.id, name: items.tag_name };
        });
        settagsarraydata(tagssarray);
      } else {
        notification.error({ message: response?.message });
      }
    }
    getallTags();

    async function get_entity_byid() {
      const url = api_url.get_entity_byid + questiontype_id;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const entitydata = response?.data?.responsedata?.[0]?.name;
        setentityarray(entitydata);
      } else {
        notification.error({ message: response?.message });
      }
    }
    get_entity_byid();

    async function Getallmodules(data) {
      const url = api_url.getall_modules;
      const response = await get_api_request(url, data, headers);

      if (response.status == 200) {
        const Moduledata = response?.data?.responsedata?.modules;
        const getmodules = Moduledata.map(items => {
          if (items.name == 'Levels') {
            const parentdata = items?.parent_id;
            async function getentitybyparentid() {
              const url = api_url.get_entity_byparentid + parentdata;
              const response = await get_api_request(url, data, headers);

              const questiontypedata = response?.data?.responsedata;
              const levelarray = questiontypedata?.map(item => {
                return { name: item.name, id: item.id };
              });
              setlevelsData(levelarray);
            }

            getentitybyparentid();
          }
        });
      } else {
        console.log('error');
      }
    }
    Getallmodules();

    setActiveDetails(true);
    setActive(true);
    setQuestionAttempt({
      Enable: false,
      disable: true,
    });
  }, []);

  const handleclass = e => {
    console.log(e);

    if (e == 1) {
      setActiveDetails(current => !current);
      setActiveSetting(false);
      setActivesolution(false);
      setActiveAttachment(false);
      //setActivesection(false);
      settabpane({
        Details: true,
        Settings: false,
        Section: false,
        Questions: false,
      });
    } else if (e == 2) {
      setActiveSetting(current => !current);
      setActiveDetails(false);
      setActivesolution(false);
      setActiveAttachment(false);
      settabpane({
        Details: false,
        Settings: true,
        Solution: false,
        Questions: false,
      });
    } else if (e == 3) {
      setActivesolution(current => !current);
      setActiveDetails(false);
      setActiveSetting(false);
      setActiveAttachment(false);
      settabpane({
        Details: false,
        Settings: false,
        Solution: true,
        Attachment: false,
      });
    } else if (e == 4) {
      setActiveAttachment(current => !current);
      setActiveDetails(false);
      setActiveSetting(false);
      setActivesolution(false);
      settabpane({
        Details: false,
        Settings: false,
        Solution: false,
        Attachment: true,
      });
    }
  };

  const handleClick = e => {
    console.log(e);

    if (e == 1) {
      setQuestionAttempt({
        Enable: true,
        disable: false,
      });
      setIsActive(current => !current);
      setActive(false);
    } else if (e == 2) {
      setQuestionAttempt({
        Enable: false,
        disable: true,
      });
      setIsActive(false);
      setActive(current => !current);
    }
  };

  // const HandleAttachmentRadioButton = e => {
  //   console.log(QuestionAttempt);
  //   console.log(e);
  // };
  const handlevideotab = e => {
    //console.log(e);
    if (e == 1) {
      setMp4Active(current => !current);
      setYoutubeActive(false);
      setVimeoActive(false);
    } else if (e == 2) {
      setYoutubeActive(current => !current);
      setMp4Active(false);
      setVimeoActive(false);
    } else if (e == 3) {
      setVimeoActive(current => !current);
      setMp4Active(false);
      setYoutubeActive(false);
    }
  };

  // const handleChange = val => {
  //   setChecked(val);
  // };
  const handleswitch = e => {
    console.log(e);
    if (e == true) {
      setshowsolutionvalue(true);
    } else {
      setshowsolutionvalue(false);
    }
  };
  /**IMAGE SECTION=========================================================STARTS **/
  const [Images, setImages] = useState([]);
  const url = domainpath + '/images/logo';
  const imageHandleChange = async e => {
    var vfile;
    vfile = e.target.files;

    // var singleimage = imageRender(vfile);

    // setImages(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        var image = `<br /><img src=${resp} contenteditable="false" draggable="true" ></img>`;

        setformData({ ...formData, description: formData?.description + image });
        setShowAttachment(false);
        // setImageURL(resp[0]);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
        console.log(error);
      });
  };
  const renderPictures = source => {
    return source.map(pictures => {
      return <Image src={pictures} key={pictures} />;
    });
  };

  const HandleImageWithInput = url => {
    console.log(url);
  };
  /**IMAGE SECTION=========================================================ENDS **/
  const HandleAddOptionValue = (e, index) => {
    const updatePrice = OptionValues?.map((value, i) => (index == i ? Object.assign(value, { ['value']: e }) : value));

    setOptionValues(updatePrice);
  };
  const RemoveOptionRow = index => {
    const filterSlabPrice = [...OptionValues];
    delete filterSlabPrice[index];

    var finalArr = [];
    filterSlabPrice.map(item => {
      finalArr.push(item);
    });

    console.log(finalArr);
    setOptionValues(finalArr);
  };

  const HandleMultipleAnswer = (e, data, option, index) => {
    // console.log(data);
    // console.log(formData);
    // console.log(e.target.checked);
    // console.log(OptionValues);
    if (e.target.checked == true) {
      if (option == 'option1') {
        setCheckedExactAnswer({ ...CheckedExactAnswer, option1: true });
      } else if (option == 'option2') {
        setCheckedExactAnswer({ ...CheckedExactAnswer, option2: true });
      } else {
        const updatePrice = OptionValues?.map((value, i) => {
          //console.log(updatePrice);
          index == i ? Object.assign(value, { ['checked']: true }) : value;
          return value;
        });
        console.log(updatePrice);
        // console.log(OptionValues);
        setOptionValues(updatePrice);
      }

      // }
    } else if (e.target.checked == false) {
      if (option == 'option1') {
        setCheckedExactAnswer({ ...CheckedExactAnswer, option1: false });
      } else if (option == 'option2') {
        setCheckedExactAnswer({ ...CheckedExactAnswer, option2: false });
      } else {
        const updatePrice = OptionValues?.map((value, i) => {
          index == i ? Object.assign(value, { ['checked']: false }) : value;
          return value;
        });
        console.log(updatePrice);
        //console.log(OptionValues);
        setOptionValues(updatePrice);
      }
    }
    // console.log(AnswersData);
    setexactanswer({
      key: option,
      value: data?.replaceAll('"', "'"),
    });
  };

  //   const HandleAnswer = (e, data, option, index) => {
  //     if (e.target.checked == true) {
  //       if (option == 'option1') {
  //         setCheckedExactAnswer({
  //           option1: true,
  //           option2: false,
  //         });
  //         const updatePrice = OptionValues?.map((value, i) => {
  //           value.checked = false;
  //           return value;
  //         });
  //         setOptionValues(updatePrice);
  //       } else if (option == 'option2') {
  //         setCheckedExactAnswer({
  //           option1: false,
  //           option2: true,
  //         });
  //         const updatePrice = OptionValues?.map((value, i) => {
  //           value.checked = false;
  //           return value;
  //         });
  //         setOptionValues(updatePrice);
  //       } else {
  //         setCheckedExactAnswer({
  //           option1: false,
  //           option2: false,
  //         });
  //         const updatePrice = OptionValues?.map((value, i) => {
  //           index == i ? Object.assign(value, { ['checked']: true }) : (value.checked = false);
  //           return value;
  //         });
  //         setOptionValues(updatePrice);
  //       }
  //     }
  //     setexactanswer({
  //       key: option,
  //       value: data?.replace(/(<([^>]+)>)/gi, ''),
  //     });
  //   };

  const handlesubmit = (fieldsValue, name) => {
    if (exactanswer.key && exactanswer.value) {
      var Options = [
        {
          key: 'option1',
          value: (formData?.option1).replaceAll('"', "'"),
          checked: CheckedExactAnswer?.option1,
        },
        {
          key: 'option2',
          value: (formData?.option2).replaceAll('"', "'"),
          checked: CheckedExactAnswer?.option2,
        },
      ];
      console.log(OptionValues);
      var AnswerArray = [];
      OptionValues?.map((item, i) => {
        var GetOption = {
          key: 'option' + (i + 3),
          value: (item?.value).replaceAll('"', "'"),
          checked: item?.checked,
        };

        Options.push(GetOption);
      });
      Options?.map((item, index) => {
        if (item?.checked == true) {
          var anserData = {
            key: 'option' + (index + 1),
            value: (item?.value).replaceAll('"', "'"),
          };
          AnswerArray.push(anserData);
        }
      });
      if (skills) {
        var meta = {};
        var payload = {
          questions: (formData?.question).replaceAll('"', "'"),
          description: formData?.description,
          options: Options,
          skill: formData?.skill,
          answers: AnswerArray,
        };
        meta = {
          topic: fieldsValue?.topic,
          tags: fieldsValue?.tags,
          difficulty_level: fieldsValue?.difficulty_level,
          QuestionAttempt: QuestionAttempt,
        };
        payload['meta'] = meta;
      } else {
        var payload = {
          type: questiontype_id,
          questions: (formData?.question).replaceAll('"', "'"),
          description: formData?.description,
          options: Options,
          skill: formData?.skill,
          answers: AnswerArray,
        };
      }
      console.log(payload);
      if (skills) {
        async function updatesinglequestion() {
          const url = api_url.get_questions_by_id + QuestionId;
          const response = await put_api_request(url, payload, headers);
          console.log(response);
          if (response.status == 201) {
            notification.success({ message: 'Question updated Sucessfully!' });
            setActiveSetting(current => !current);
            setActiveDetails(false);
            setActivesolution(false);
            setActiveAttachment(false);
            settabpane({
              Details: false,
              Settings: true,
              Solution: false,
              Questions: false,
            });
          } else {
            notification.error({ message: response?.message });
          }
        }
        updatesinglequestion();
      } else {
        async function createsinglequestion() {
          const url = api_url.create_questions;
          const response = await post_api_request(url, payload, headers);
          console.log(response);
          if (response.status == 201) {
            notification.success({ message: 'Question Created Sucessfully!' });
            const responseid = response?.data?.id;
            setQuestionId(responseid);

            async function getQuestionbyid() {
              const url = api_url.get_questions_by_id + responseid;
              const response = await get_api_request(url, headers);
              if (response.status == 200) {
                const questiondata = response?.data?.responsedata?.[0];
                console.log(questiondata);
                // const skillid = questiondata?.skill_id;
                setskills(questiondata);
                //         setformData({
                //           question:questiondata?.question ,
                // option1: questiondata?.option1,
                // option2: questiondata?.option2,
                // skill: questiondata?.option2,
                //         })
              } else {
                notification.error({ message: 'Something went wrong' });
              }
            }
            if (name == 'details') {
              setActiveSetting(current => !current);
              setActiveDetails(false);
              setActivesolution(false);
              setActiveAttachment(false);
              settabpane({
                Details: false,
                Settings: true,
                Solution: false,
                Questions: false,
              });
            }
            getQuestionbyid();
          } else if (response.status == 200) {
            notification.error({ message: response?.data?.message });
          }
        }
        createsinglequestion();
      }
    } else {
      notification.error({ message: 'Select Correct Answer' });
    }
  };
  var active;
  const HandleSettingTab = name => {
    if (formData.active == true) {
      active = 1;
    } else {
      active = 0;
    }
    var settingspayload = {
      skill: skills?.skill_id,
      questions: skills?.questions,
      description: skills?.description,
      options: skills?.options,
      answers: skills?.answers,
      topic: formData?.topic,
      section: formData?.section,
      active: active,
      difficulty_level: formData?.level,
    };
    var meta = {
      id: QuestionId,
      level: formData?.level,
      points: formData?.points,
      question_time: formData?.question_time,
      tags: formData?.tags,
    };
    settingspayload['meta'] = meta;
    console.log(settingspayload);
    async function UpdateQuestionbyid() {
      const url = api_url.get_questions_by_id + QuestionId;
      const response = await put_api_request(url, settingspayload, headers);
      console.log(response);
      if (response.status == 201) {
        const metadata = response?.data?.responsedata;
        setMetaId(metadata);
        notification.success({ message: 'Question Updated Sucessfully!' });
        if (name == 'settings') {
          setActivesolution(current => !current);
          setActiveDetails(false);
          setActiveSetting(false);
          setActiveAttachment(false);
          settabpane({
            Details: false,
            Settings: false,
            Solution: true,
            Attachment: false,
          });
        }
      } else {
        notification.error({ message: response?.message });
      }
    }
    UpdateQuestionbyid();
  };

  const HandleSolutionTab = name => {
    var settingspayload = {
      skill: skills?.skill_id,
      questions: skills?.questions,
      description: skills?.description,
      options: skills?.options,
      answers: skills?.answers,
    };
    var meta = {
      id: QuestionId,
      solution: formData?.solution,
      hint: formData?.hint,
      video_link: formData?.video_link,
      tags: formData?.tags,
      topic: formData?.topic,
      active: formData?.active,
      videoType: videoType,
      showsolutionvalue: showsolutionvalue,
      QuestionAttempt: QuestionAttempt,
    };

    settingspayload['meta'] = meta;
    console.log(meta);
    async function UpdateSolutionbyid() {
      const url = api_url.get_questions_by_id + QuestionId;
      const response = await put_api_request(url, settingspayload, headers);
      console.log(response);
      if (response.status == 201) {
        const metadata = response?.data?.responsedata;
        setMetaId(metadata);
        notification.success({ message: 'Question Updated Sucessfully!' });
        if (name == 'solution') {
          setActiveAttachment(current => !current);
          setActiveDetails(false);
          setActiveSetting(false);
          setActivesolution(false);
          settabpane({
            Details: false,
            Settings: false,
            Solution: false,
            Attachment: true,
          });
        }
      } else {
        notification.error({ message: response?.message });
      }
    }
    UpdateSolutionbyid();
  };

  const HandleAttachment = fieldsValue => {
    var attachmentpayload = {
      id: QuestionId,
      skill: skills?.skill_id,
      questions: skills?.questions,
      description: skills?.description,
      options: skills?.options,
      answers: skills?.answers,
    };
    var meta = {
      id: QuestionId,
      attachment_type: ShowQuestionAttempt,
      AttachmentTypeValues: AttachmentTypeValues?.value,
      AttachmentTypeLink: AttachmentTypeValues?.link,
      AttachemtType: AttachemtType,
      QuestionAttempt: QuestionAttempt,
    };
    attachmentpayload['meta'] = meta;
    console.log(meta);
    async function UpdateSolutionbyid(data) {
      console.log(data);
      const url = api_url.get_questions_by_id + QuestionId;
      const response = await put_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        const metadata = response?.data?.responsedata;
        setMetaId(metadata);
        notification.success({ message: 'Question Updated Sucessfully!' });
      } else {
        notification.error({ message: response?.message });
      }
    }
    UpdateSolutionbyid(attachmentpayload);
  };

  return (
    <>
      <Main>
        <Form
          name="sDash_validation-form"
          // className="AddForm contactForm"
          Form={form}
          // layout="vertical"
          //onFinish={handlesubmit}
        >
          <section className="SectionTabsMainTop">
            <Cards>
              <div className="SectionTabs_Main">
                <div id="SectionTabsGeneral" className="SectionTabsInner">
                  {tabpane?.Details == true ? (
                    <p className="header_text" style={{ width: '100%' }}>
                      <b>Question Details</b>
                      <br />
                      {entityarray}
                    </p>
                  ) : tabpane?.Settings == true ? (
                    <p style={{ width: '100%' }}>
                      <b>Question Settings </b>
                      <br />
                      {entityarray}
                    </p>
                  ) : tabpane?.Solution == true ? (
                    <p style={{ width: '100%' }}>
                      <b>Question Solution </b>
                      <br />
                      {entityarray}
                    </p>
                  ) : tabpane?.Attachment == true ? (
                    <p style={{ width: '100%' }}>
                      <b>Question Attachment </b>
                      <br />
                      {entityarray}
                    </p>
                  ) : (
                    ''
                  )}

                  <button
                    value={1}
                    className={ActiveDetails ? 'practice-tabpane' : ''}
                    onClick={e => handleclass(e.target.value)}
                  >
                    <span>1</span> Details
                  </button>

                  <button
                    value={2}
                    className={ActiveSetting ? 'practice-tabpane' : ''}
                    onClick={e => (QuestionId ? handleclass(e.target.value) : '')}
                  >
                    <span>2</span> Settings
                  </button>

                  <button
                    value={3}
                    className={Activesolution ? 'practice-tabpane' : ''}
                    onClick={e => (QuestionId ? handleclass(e.target.value) : '')}
                  >
                    <span>3</span> Solution
                  </button>
                  <button
                    value={4}
                    className={ActiveAttachment ? 'practice-tabpane' : ''}
                    onClick={e => (QuestionId ? handleclass(e.target.value) : '')}
                  >
                    <span>4</span> Attachment
                  </button>
                </div>
              </div>
            </Cards>
            {tabpane?.Details == true ? (
              <Cards>
                <Row gutter={30} className="skillrow mb-space">
                  <Col md={18} xs={24} className="skillrow-inner" id="skills">
                    <Form.Item name="skill" label="Skills" rules={[{ required: true, message: 'Skills required!' }]}>
                      <Select
                        onChange={selectedValue => {
                          setformData({ ...formData, skill: selectedValue });
                        }}
                      >
                        {skillsdataarray?.map(item => (
                          <Option value={item?.id}>{item.name}</Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="question"
                      label="Title"
                      initialValue={formData.question}
                      rules={[{ required: true, message: 'Question is required!' }]}
                    >
                      <Input
                        value={formData.question}
                        onChange={selectedValue => {
                          setformData({ ...formData, question: selectedValue.target.value });
                        }}
                      />
                    </Form.Item>

                    {ShowAttachment == true ? (
                      <div className="modal-details-fade que-instert-img">
                        <div className="modal-details">
                          <FeatherIcon className="closemodal" icon="x" onClick={() => setShowAttachment(false)} />
                          <h3>Insert Image</h3>
                          <div style={{ borderBottom: '1px solid #d2d2d2', margin: '12px 0 20px 0' }}></div>
                          <Col md={24} xs={24}>
                            <Form.Item
                              label="Image"
                              rules={[
                                {
                                  required: false,
                                  message: 'Please select Store Featured Image!',
                                },
                              ]}
                            >
                              <Input name="images" type="file" onChange={e => imageHandleChange(e)} />
                              {/* <div className="checkURL">
                                  <Input placeholder="Image URL" /> <FeatherIcon icon="check-circle" />
                                  <i data-feather="image"></i>
                                </div> */}
                            </Form.Item>
                          </Col>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                    <Form.Item name="description" label="Description">
                      <div className="gallerydescription ckeditorgalleryimage">
                        <button
                          title="Insert image"
                          type="button"
                          class="k-button k-button-md k-button-solid k-button-solid-base k-rounded-md k-icon-button k-group-end"
                          tabindex="-1"
                          onClick={() => setShowAttachment(!ShowAttachment)}
                        >
                          <span role="presentation" class="k-button-icon k-icon k-i-image"></span>
                        </button>
                      </div>
                      <div className="result qst-render-image" style={{ width: '20vh' }}>
                        {renderPictures(Images)}
                      </div>
                      <CKEditor
                        editor={ClassicEditor}
                        contentStyle={{
                          height: 430,
                        }}
                        config={{
                          toolbar: {
                            shouldNotGroupWhenFull: true,
                            items: [
                              'heading',

                              'outdent',
                              'indent',
                              '|',
                              'bold',
                              'italic',
                              'link',
                              'bulletedList',
                              'numberedList',
                              'imageUpload',
                              'mediaEmbed',
                              'insertTable',
                              'blockQuote',
                              'undo',
                              'redo',
                              '|',
                              'MathType',
                              'ChemType',
                            ],
                          },
                        }}
                        data={formData.description}
                        onReady={editor => {
                          // You can store the "editor" and use when it is needed.
                          // console.log( 'Editor is ready to use!', editor );
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          // console.log(data, '00000000000000000000');
                          //  setCkData(data);
                          setformData({ ...formData, description: data });
                        }}
                      />
                      {/* <Editor
                        name="description"
                        id="question-editor"
                        value={formData.description}
                        className="question-editor"
                        tools={[
                          [Bold, Italic, Underline, Strikethrough],
                          [Subscript, Superscript],
                          [OrderedList, UnorderedList],
                          [InsertTable, InsertImage],
                        ]}
                        contentStyle={{
                          height: 430,
                        }}
                        onChange={selectedValue => {
                          // setformData({ ...formData, description: selectedValue.html.replace(/(<([^>]+)>)/gi, '') });
                          setformData({ ...formData, description: selectedValue.html });
                        }}
                      /> */}
                    </Form.Item>

                    {/* <Form.Item
                      name="question"
                      label="Question"
                      rules={[{ required: true, message: 'Question is required!' }]}
                    >
                      <Editor
                        // value={cssvalue}
                        tools={[
                          [Bold, Italic, Underline, Strikethrough],
                          [Subscript, Superscript],
                          [OrderedList, UnorderedList],
                          [InsertTable, InsertImage],
                        ]}
                        contentStyle={{
                          height: 300,
                        }}
                        onChange={e => setformData({ ...formData, question: e.html })}
                        // className="k-icon k-i-loading"
                        // defaultContent={cssvalue}
                        // onChange={handleCSS}
                      />
                    </Form.Item> */}
                  </Col>

                  <Col md={18} xs={24} className="skillrow-inner">
                    <div className="greencol">
                      {/* <Form.Item
                        name="option1"
                        label="Sequence Item 1"
                        // rules={[{ required: true }]}
                        required="true"
                      >
                        <Editor
                          // value={cssvalue}
                          tools={[
                            [Subscript, Superscript],

                            [InsertTable, InsertImage],
                          ]}
                          contentStyle={{
                            height: 250,
                          }}
                          onChange={e => setformData({ ...formData, option1: e.html })}
                          // className="k-icon k-i-loading"
                          // defaultContent={cssvalue}
                          // onChange={handleCSS}
                          value={formData?.option1}
                        />
                      </Form.Item> */}

                      <Form.Item
                        name="option1"
                        label="Option 1"
                        // rules={[{ required: true }]}
                        required="true"
                      >
                        <CKEditor
                          editor={ClassicEditor}
                          contentStyle={{
                            height: 430,
                          }}
                          config={{
                            toolbar: {
                              shouldNotGroupWhenFull: true,
                              items: [
                                'heading',
                                // 'fontsize',
                                // 'alignment',
                                // 'fontColor',
                                // 'fontBackgroundColor',
                                'outdent',
                                'indent',
                                '|',
                                'bold',
                                'italic',
                                'link',
                                'bulletedList',
                                'numberedList',

                                'mediaEmbed',
                                'insertTable',
                                'blockQuote',
                                'undo',
                                'redo',
                                '|',
                                'MathType',
                                'ChemType',
                              ],
                            },
                          }}
                          data={formData?.option1}
                          onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            // console.log( 'Editor is ready to use!', editor );
                          }}
                          onChange={(event, editor) => {
                            const data = editor.getData();

                            setformData({ ...formData, option1: data });
                          }}
                        />
                        {/* <Editor
                          tools={[
                            [Subscript, Superscript],
                            [InsertTable, InsertImage],
                          ]}
                          contentStyle={{
                            height: 250,
                          }}
                          onChange={e => setformData({ ...formData, option1: e.html })}
                          value={formData?.option1}
                        /> */}

                        <div className="radio_button">
                          <Input
                            className="exact_answer"
                            type="checkbox"
                            name="answer"
                            //checked={CheckedExactAnswer?.option1}
                            onChange={e => HandleMultipleAnswer(e, formData?.option1, 'option1')}
                          ></Input>
                          <label>Correct Answer</label>
                        </div>
                      </Form.Item>
                    </div>
                  </Col>

                  <Col md={18} xs={24} className="skillrow-inner">
                    <div className="greencol">
                      <Form.Item
                        name="option2"
                        label="Option 2"
                        // rules={[{ required: true }]}
                      >
                        <CKEditor
                          editor={ClassicEditor}
                          contentStyle={{
                            height: 430,
                          }}
                          config={{
                            toolbar: {
                              shouldNotGroupWhenFull: true,
                              items: [
                                'heading',
                                // 'fontsize',
                                // 'alignment',
                                // 'fontColor',
                                // 'fontBackgroundColor',
                                'outdent',
                                'indent',
                                '|',
                                'bold',
                                'italic',
                                'link',
                                'bulletedList',
                                'numberedList',

                                'mediaEmbed',
                                'insertTable',
                                'blockQuote',
                                'undo',
                                'redo',
                                '|',
                                'MathType',
                                'ChemType',
                              ],
                            },
                          }}
                          data={formData?.option2}
                          onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            // console.log( 'Editor is ready to use!', editor );
                          }}
                          onChange={(event, editor) => {
                            const data = editor.getData();

                            setformData({ ...formData, option2: data });
                          }}
                        />
                        {/* 
                        <Editor                      
                          tools={[
                            [Subscript, Superscript],

                            [InsertTable, InsertImage],
                          ]}
                          contentStyle={{
                            height: 250,
                          }}
                          onChange={e => setformData({ ...formData, option2: e.html })}
                       
                          value={formData?.option2}
                        /> */}

                        <div className="radio_button">
                          <Input
                            className="exact_answer"
                            type="checkbox"
                            name="answer"
                            // checked={CheckedExactAnswer?.option2}
                            onChange={e => HandleMultipleAnswer(e, formData?.option2, 'option2')}
                          ></Input>
                          <label>Correct Answer</label>
                        </div>
                      </Form.Item>
                    </div>
                  </Col>

                  {OptionValues?.map((item, index) => (
                    <Col md={18} xs={24} className="skillrow-inner">
                      <div className="greencol">
                        <Form.Item name="option-2" label={'Option' + ' ' + (index + 3)} className="optionadd">
                          {/* <label>Option {index + 3}</label> */}
                          <CKEditor
                            name={'Option' + ' ' + (index + 3)}
                            id={'Option' + ' ' + (index + 3)}
                            editor={ClassicEditor}
                            config={{
                              toolbar: {
                                shouldNotGroupWhenFull: true,
                                items: [
                                  'heading',
                                  // 'fontsize',
                                  // 'alignment',
                                  // 'fontColor',
                                  // 'fontBackgroundColor',
                                  'outdent',
                                  'indent',
                                  '|',
                                  'bold',
                                  'italic',
                                  'link',
                                  'bulletedList',
                                  'numberedList',

                                  'mediaEmbed',
                                  'insertTable',
                                  'blockQuote',
                                  'undo',
                                  'redo',
                                  '|',
                                  'MathType',
                                  'ChemType',
                                ],
                              },
                            }}
                            data={item['value']}
                            onReady={editor => {
                              // You can store the "editor" and use when it is needed.
                              // console.log( 'Editor is ready to use!', editor );
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData();

                              // setformData({ ...formData, option2: data });
                              HandleAddOptionValue(data, index);
                            }}
                          />
                          {/* <Editor
                            name="value"
                            value={item['value']}
                            tools={[
                              [Subscript, Superscript],
                              [InsertTable, InsertImage],
                            ]}
                            contentStyle={{
                              height: 250,
                            }}
                            onChange={e => HandleAddOptionValue(e, index)}
                          /> */}

                          <div className="radio_button">
                            <Input
                              className="exact_answer"
                              type="checkbox"
                              name="answer"
                              //checked={item['checked']}
                              onChange={e => HandleMultipleAnswer(e, item['value'], 'Option' + (index + 3), index)}
                            ></Input>
                            <label>Correct Answer</label>
                            <Button type="danger" style={{ marginLeft: 'auto' }} onClick={() => RemoveOptionRow(index)}>
                              Remove
                            </Button>
                          </div>
                        </Form.Item>
                      </div>
                    </Col>
                  ))}

                  <Col md={18} xs={24} className="skillrow-inner">
                    <div className="greencol" style={{ marginTop: '0' }}>
                      <Form.Item>
                        <div className="add_option" style={{ border: '1px dashed #43e143 ', textAlign: 'center' }}>
                          <Button
                            style={{ background: 'transparent' }}
                            onClick={() => {
                              setOptionValues([
                                ...OptionValues,
                                {
                                  id: '',
                                  table: '',
                                  image: '',
                                  value: '',
                                  checked: false,
                                  exact_option: '',
                                },
                              ]);
                            }}
                          >
                            Add Option
                          </Button>
                        </div>
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
                <div className="form-group">
                  <Button
                    htmlType="submit"
                    type="success"
                    className="pull-right"
                    style={{ marginTop: '10px' }}
                    size="default"
                    onClick={() => handlesubmit('details')}
                    //onClick={(e) => onSubmit(e + "," + item.id)}
                  >
                    Save Details
                  </Button>
                </div>
              </Cards>
            ) : tabpane?.Settings == true ? (
              <>
                <Cards>
                  <div className="settingstab">
                    <Row gutter={30}>
                      <Col md={18} xs={24} className="skillrow-inner">
                        <label>Skill</label>
                        <Form.Item name="skill">
                          <Select
                            onChange={selectedValue => {
                              setformData({ ...formData, skill: selectedValue });
                            }}
                            disabled
                          >
                            {skillsdataarray?.map(item => (
                              <Option value={item?.id}>{item.name}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={18} xs={24} className="skillrow-inner">
                        <label>Section</label>
                        <Form.Item name="section">
                          <Select
                            onChange={selectedValue => {
                              setformData({ ...formData, section: selectedValue });
                            }}
                          >
                            {AllSections?.map(item => (
                              <Option value={item?.id}>{item.name}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={18} xs={24} className="skillrow-inner">
                        <label>Topic</label>
                        <Form.Item name="topic">
                          <Select
                            onChange={selectedValue => {
                              setformData({ ...formData, topic: selectedValue });
                            }}
                          >
                            {topicsdataarray?.map(item => (
                              <Option value={item?.id}>{item.name}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col md={18} xs={24} className="skillrow-inner">
                        <label>Tags</label>
                        <Form.Item name="tags">
                          <Select
                            mode="multiple"
                            onChange={selectedValue => {
                              setformData({ ...formData, tags: selectedValue });
                            }}
                          >
                            {tagsarraydata?.map(item => (
                              <Option value={item?.id}>{item.name}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col md={18} xs={24} className="skillrow-inner">
                        <label>Difficulty Level</label>
                        <Form.Item name="level">
                          <Select
                            onChange={selectedValue => {
                              setformData({ ...formData, level: selectedValue });
                            }}
                          >
                            {levelsData?.map(item => (
                              <Option value={item.id}>{item.name}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col md={18} xs={24} className="skillrow-inner">
                        <label>Default Marks/Grade Points</label>
                        <Form.Item name="points">
                          <Input
                            type="text"
                            defaultValue="1"
                            onChange={selectedValue => {
                              setformData({ ...formData, points: selectedValue.target.value });
                            }}
                          ></Input>
                        </Form.Item>
                      </Col>

                      <Col md={18} xs={24} className="skillrow-inner">
                        <label>Default Time To Solve (Seconds)</label>
                        <Form.Item name="question_time">
                          <Input
                            type="text"
                            defaultValue="60"
                            onChange={selectedValue => {
                              setformData({ ...formData, question_time: selectedValue.target.value });
                            }}
                          ></Input>
                        </Form.Item>
                      </Col>

                      <Col md={18} xs={24} className="skillrow-inner">
                        <label>
                          Active
                          <br />
                          &nbsp; &nbsp; Active (Shown Everywhere). In-active (Hidden Everywhere).
                        </label>
                        <Form.Item name="active">
                          <Switch
                            className="pull-right"
                            checked={formData?.active}
                            onChange={selectedValue => {
                              setformData({ ...formData, active: selectedValue });
                            }}
                          ></Switch>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Button
                      className="pull-right"
                      style={{ color: '#fff', background: '#000' }}
                      onClick={() => (QuestionId ? HandleSettingTab('settings') : '')}
                    >
                      Update Settings
                    </Button>
                  </div>
                </Cards>
              </>
            ) : tabpane?.Solution == true ? (
              <>
                <Cards>
                  <Col md={18} xs={24} className="skillrow-inner">
                    <Form.Item name="solution">
                      <label>Solution</label>
                      <Editor
                        value={formData?.solution}
                        tools={[
                          [Bold, Italic, Underline, Strikethrough],
                          [Subscript, Superscript],
                          [OrderedList, UnorderedList],
                          [InsertTable, InsertImage],
                        ]}
                        contentStyle={{
                          height: 430,
                        }}
                        onChange={e => setformData({ ...formData, solution: e.html })}
                        // className="k-icon k-i-loading"
                        // defaultContent={cssvalue}
                        // onChange={handleCSS}
                      />
                    </Form.Item>
                  </Col>
                  <Col md={18} xs={24} className="skillrow-inner">
                    <Form.Item name="solution_video">
                      <label>Enable Solution Video</label>
                      <br />
                      <Space direction="vertical">
                        <Switch
                          checked={showsolutionvalue}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                          onChange={e => handleswitch(e)}
                        ></Switch>
                      </Space>
                    </Form.Item>
                  </Col>
                  {showsolutionvalue == true ? (
                    <Col md={18} xs={24} style={{ padding: 'inherit' }}>
                      <div className="video_buttons">
                        <button
                          value={1}
                          className={Mp4Active ? 'bg-salmon' : ''}
                          onClick={e => {
                            handlevideotab(e.target.value);
                            setvideoType('MP4 Video');
                          }}
                        >
                          MP4 Video
                        </button>
                        <button
                          value={2}
                          className={YoutubeActive ? 'bg-salmon' : ''}
                          onClick={e => {
                            handlevideotab(e.target.value);
                            setvideoType('YouTube Video');
                          }}
                        >
                          YouTube Video
                        </button>
                        <button
                          value={3}
                          className={VimeoActive ? 'bg-salmon' : ''}
                          onClick={e => {
                            handlevideotab(e.target.value);
                            setvideoType('Vimeo Video');
                          }}
                        >
                          Vimeo Video
                        </button>
                      </div>
                      <Input
                        className="videolink_input"
                        type="text"
                        placeholder="Enter Your Video Link"
                        defaultValue={formData?.video_link}
                        onChange={e => setformData({ ...formData, video_link: e.target.value })}
                      ></Input>
                      <Button type="dark" style={{ display: 'initial' }} className="videopreview">
                        {' '}
                        <FeatherIcon size={17} icon="play" />
                        Preview
                      </Button>
                    </Col>
                  ) : (
                    ''
                  )}
                  <Col md={18} xs={24} className="skillrow-inner">
                    <Form.Item name="hint">
                      <label>Hint</label>
                      <Editor
                        value={formData?.hint}
                        tools={[
                          [Bold, Italic, Underline, Strikethrough],
                          [Subscript, Superscript],
                          [OrderedList, UnorderedList],
                          [InsertTable, InsertImage],
                        ]}
                        contentStyle={{
                          height: 430,
                        }}
                        onChange={e => setformData({ ...formData, hint: e.html })}
                        // className="k-icon k-i-loading"
                        // defaultContent={cssvalue}
                        // onChange={handleCSS}
                      />
                    </Form.Item>
                  </Col>
                  <Button
                    className="pull-right"
                    style={{ color: '#fff', background: '#000' }}
                    onClick={() => HandleSolutionTab('solution')}
                  >
                    Update
                  </Button>
                </Cards>
              </>
            ) : tabpane?.Attachment == true ? (
              <>
                <Cards>
                  <Col md={18} xs={24} style={{ padding: '0px' }}>
                    <label>
                      <b>Enable Question Attachment</b>
                    </label>
                    <div className="video_buttons">
                      <button
                        value={1}
                        className={isActive ? 'bg-salmon' : ''}
                        onClick={e => handleClick(e.target.value)}
                      >
                        Yes
                      </button>
                      <button
                        value={2}
                        id="No"
                        className={Active ? 'bg-salmon' : ''}
                        onClick={e => handleClick(e.target.value)}
                      >
                        No
                      </button>
                    </div>
                    {isActive == 1 ? (
                      <Form.Item name="attachments">
                        <label>
                          <b>Attachment Type</b>
                        </label>
                        <div className="attachment_type">
                          <Input
                            name="radio_attachment"
                            className="attachment_radio"
                            type="radio"
                            checked={AttachemtType?.comprehension}
                            onClick={e => {
                              // HandleAttachmentRadioButton('Comprehension')
                              setShowQuestionAttempt('Comprehension');
                              setAttachemtType({
                                comprehension: true,
                                audio: false,
                                video: false,
                              });
                            }}
                          ></Input>
                          <label>Comprehension Passage</label>

                          <Input
                            name="radio_attachment"
                            className="attachment_radio left"
                            type="radio"
                            checked={AttachemtType?.audio}
                            onClick={e => {
                              // HandleAttachmentRadioButton('Audio')
                              setShowQuestionAttempt('Audio');
                              setAttachemtType({
                                comprehension: false,
                                audio: true,
                                video: false,
                              });
                            }}
                          ></Input>
                          <label>Audio</label>

                          <Input
                            name="radio_attachment"
                            className="attachment_radio left"
                            type="radio"
                            checked={AttachemtType?.video}
                            onClick={e => {
                              //HandleAttachmentRadioButton('Video')
                              setShowQuestionAttempt('Video');
                              setAttachemtType({
                                comprehension: false,
                                audio: false,
                                video: true,
                              });
                            }}
                          ></Input>
                          <label>Video</label>
                        </div>
                      </Form.Item>
                    ) : (
                      ''
                    )}
                    {QuestionAttempt?.Enable == true ? (
                      <>
                        {ShowQuestionAttempt == 'Comprehension' ? (
                          <Select
                            style={{ width: '100%' }}
                            classNamePrefix="select"
                            isSearchable={true}
                            comprehensionData={comprehensionData}
                            //onSelect={GetPosition}
                            onClick={e => {
                              setAttachmentTypeValues({ ...AttachmentTypeValues, value: e });
                            }}
                          >
                            {comprehensionData != null
                              ? comprehensionData.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                              : ''}
                          </Select>
                        ) : (
                          ''
                        )}
                        {ShowQuestionAttempt == 'Audio' ? (
                          <Col md={18} xs={24} className="skillrow-inner">
                            <div className="video_buttons">
                              <button
                                value={1}
                                className={Mp4Active ? 'bg-salmon' : ''}
                                onClick={e => {
                                  handlevideotab(e.target.value);
                                  setAttachmentTypeValues({ ...AttachmentTypeValues, value: 'MP3 Format' });
                                }}
                              >
                                MP3 Format
                              </button>
                              <button
                                value={2}
                                className={YoutubeActive ? 'bg-salmon' : ''}
                                onClick={e => {
                                  handlevideotab(e.target.value);
                                  setAttachmentTypeValues({ ...AttachmentTypeValues, value: 'OTT Format' });
                                }}
                              >
                                OTT Format
                              </button>
                            </div>

                            <Input
                              className="videolink_input"
                              type="text"
                              placeholder="Enter Your Video Link"
                              defaultValue={AttachmentTypeValues?.link}
                              onChange={e => {
                                setAttachmentTypeValues({ ...AttachmentTypeValues, link: e.target.value });
                              }}
                            ></Input>
                            <Button className="videopreview">
                              {' '}
                              <FeatherIcon size={17} icon="play" />
                              Preview
                            </Button>
                          </Col>
                        ) : (
                          ''
                        )}
                        {ShowQuestionAttempt == 'Video' ? (
                          <Col md={18} xs={24} className="skillrow-inner">
                            <div className="video_buttons">
                              <button
                                value={1}
                                className={Mp4Active ? 'bg-salmon' : ''}
                                onClick={e => {
                                  handlevideotab(e.target.value);
                                  setAttachmentTypeValues({ ...AttachmentTypeValues, value: 'MP4 Video' });
                                }}
                              >
                                MP4 Video
                              </button>
                              <button
                                value={2}
                                className={YoutubeActive ? 'bg-salmon' : ''}
                                onClick={e => {
                                  handlevideotab(e.target.value);
                                  setAttachmentTypeValues({ ...AttachmentTypeValues, value: 'YouTube Video' });
                                }}
                              >
                                YouTube Video
                              </button>
                              <button
                                value={3}
                                className={VimeoActive ? 'bg-salmon' : ''}
                                onClick={e => {
                                  handlevideotab(e.target.value);
                                  setAttachmentTypeValues({ ...AttachmentTypeValues, value: 'Vimeo Video' });
                                }}
                              >
                                Vimeo Video
                              </button>
                            </div>

                            <Input
                              className="videolink_input"
                              type="text"
                              placeholder="Enter Your Video Link"
                              defaultValue={AttachmentTypeValues?.link}
                              onChange={e => {
                                setAttachmentTypeValues({ ...AttachmentTypeValues, link: e.target.value });
                              }}
                            ></Input>
                            <Button className="videopreview">
                              {' '}
                              <FeatherIcon size={17} icon="play" />
                              Preview
                            </Button>
                          </Col>
                        ) : (
                          ''
                        )}
                      </>
                    ) : (
                      ''
                    )}
                  </Col>

                  <Button
                    style={{ color: '#fff', background: '#000' }}
                    className="pull-right"
                    onClick={HandleAttachment}
                  >
                    Update
                  </Button>
                </Cards>
              </>
            ) : (
              ''
            )}
          </section>
        </Form>
      </Main>
    </>
  );
};
export default AddMultipleQuestions;
