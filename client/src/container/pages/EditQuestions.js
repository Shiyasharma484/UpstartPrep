import React, { useState, useEffect } from 'react';
//import ReactSwitch from 'react-switch';
import { Form, notification, Select, Col, Row, Input, Switch, Space, Spin, Image } from 'antd';
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
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
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
const { imageRender } = require('../../helpers/renderImage');
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
  Print,
  Pdf,
} = EditorTools;
const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

var ModuleName = 'DASHBOARD';
const EditQuestions = () => {
  const [checked, setChecked] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const [showsolutionvalue, setshowsolutionvalue] = useState(false);
  const [loading, setloading] = useState(true);
  const [singlequestion, setsinglequestion] = useState();
  const [skillsdataarray, setskillsdataarray] = useState();
  const [topicsdataarray, settopicsdataarray] = useState();
  const [ActiveDetails, setActiveDetails] = useState(true);
  const [Activesolution, setActivesolution] = useState(false);
  const [ActiveSetting, setActiveSetting] = useState(false);
  const [ActiveAttachment, setActiveAttachment] = useState(false);
  const [levelsData, setlevelsData] = useState();
  const [tagsarraydata, settagsarraydata] = useState();
  const [OptionValues, setOptionValues] = useState([]);
  const [Mp4Active, setMp4Active] = useState(false);
  const [OTTFormat, setOTTFormat] = useState(false);
  const [MP3Active, setMP3Active] = useState(false);
  const [videoType, setvideoType] = useState({});
  const [AllSections, setAllSections] = useState([]);
  const [settingData, setsettingData] = useState({
    mp4: false,
    youtube: false,
    vimeo: false,
  });
  const [YoutubeActive, setYoutubeActive] = useState(false);
  const [VimeoActive, setVimeoActive] = useState(false);
  const [AnserType, setAnserType] = useState();
  const [comprehensionData, setcomprehensionData] = useState();
  const [QuestionTypeName, setQuestionTypeName] = useState();
  const [ShowAttachment, setShowAttachment] = useState(false);
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
  const [QuestionAttempt, setQuestionAttempt] = useState({
    Enable: false,
    disable: true,
  });
  const [ShowQuestionAttempt, setShowQuestionAttempt] = useState();
  const [AttachmentTypeValues, setAttachmentTypeValues] = useState({
    value: '',
    comperhension: '',
    link: '',
  });
  const [DisableQusetionAttemp, setDisableQusetionAttemp] = useState(true);
  const [EnableToDisableQusetionAttemp, setEnableToDisableQusetionAttemp] = useState(false);
  const [AttachemtType, setAttachemtType] = useState({
    comprehension: false,
    audio: false,
    video: false,
  });
  const [ResponseData, setResponseData] = useState({
    description: '',
  });
  const [formData, setformData] = useState({
    active: '',
    answers: '',
    options: '',
    questions: '',
    description: '',
    skill: '',
    type: '',
    topic: '',
    section: '',
    meta: {},
  });
  const [Meta, setMeta] = useState({
    id: '',
    level: '',
    points: '',
    question_time: '',
    tags: '',
    active: '',
    hint: '',
    showsolutionvalue: '',
    solution: '',
    videoType: '',
    video_link: '',
    AttachemtType: '',
    AttachmentTypeLink: '',
    AttachmentTypeValues: '',
    attachment_type: '',
  });
  const [FillTheBlankAnswerValue, setFillTheBlankAnswerValue] = useState();
  const [FillTheBlankAnswerArray, setFillTheBlankAnswerArray] = useState([]);
  const params = useParams();
  const ParamID = params.id;
  const QuestionID = decodetheid(ParamID);
  useEffect(() => {
    async function getquestionbyid() {
      var OptionsData = [];
      const url = api_url.get_questions_by_id + QuestionID;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const questiondata = response?.data?.responsedata?.[0];
        const answertype = questiondata?.type;
        get_entity_byid(answertype);
        setAnserType(answertype);
        // questiondata.options = questiondata.options.replace(
        //   '"http://www.w3.org/1998/Math/MathML"',
        //   "'http://www.w3.org/1998/Math/MathML'",
        // );
        // questiondata.answers = questiondata.answers.replace(
        //   '"http://www.w3.org/1998/Math/MathML"',
        //   "'http://www.w3.org/1998/Math/MathML'",
        // );
        if (questiondata.answers) {
          // const AnswerData = JSON.parse(questiondata.answers);
          // console.log(AnswerData);
          // setexactanswer(AnswerData);
        }

        if ((questiondata.answers && answertype == 16) || answertype == 17 || answertype == 18) {
          // const AnswerData = JSON.parse(questiondata.answers);
          console.log(questiondata);
          const AnswerData = questiondata.answers;
          setexactanswer(AnswerData);
          // const allData = JSON.parse(questiondata.options);
          const allData = questiondata.options;
          // OptionsData = JSON.parse(questiondata.options);
          OptionsData = questiondata.options;

          var DataArray = [];
          allData?.map((item, i) => {
            const ModifiedData = {
              //  id: i,
              key: item?.key,
              value: item?.value,
              //checked: AnswerData.value == item?.value ? true : false,
              checked: item?.checked,
            };
            DataArray.push(ModifiedData);
          });

          setOptionValues(DataArray);
        } else if (questiondata.options && answertype == 19) {
          const AnswerData = questiondata.answers;
          setexactanswer(AnswerData);
          // const allData = JSON.parse(questiondata.options);
          // OptionsData = JSON.parse(questiondata.options);
          const allData = questiondata.options;
          OptionsData = questiondata.options;
          console.log(AnswerData);
          console.log(allData);

          var DataArray = [];
          allData?.map((item, i) => {
            const ModifiedData = {
              //id: i,
              key: item?.key,
              value: item?.value,
              //checked: AnswerData.value == item?.value ? true : false,
              checked: item?.checked,
            };
            DataArray.push(ModifiedData);
          });

          setOptionValues(DataArray);
        } else if (questiondata.options && answertype == 21) {
          const allData = questiondata.options;
          OptionsData = questiondata.options;

          var DataArray = [];
          allData?.map((item, i) => {
            const ModifiedData = {
              //  id: i,
              key: item?.key,
              pair_value: item?.pair_value,
              pair_answer: item?.pair_answer,
            };
            DataArray.push(ModifiedData);
          });

          setOptionValues(DataArray);
        } else if (questiondata.options && answertype == 22) {
          const allData = questiondata.options;
          OptionsData = questiondata.options;
          var DataArray = [];

          allData?.map((item, i) => {
            const ModifiedData = {
              // id: i,
              key: item?.key,
              value: item?.value,
            };
            DataArray.push(ModifiedData);
          });

          setOptionValues(DataArray);
        } else if (questiondata.answers && answertype == 23) {
          console.log(questiondata);
          const allData = questiondata.options;
          OptionsData = questiondata.options;
          const answer = questiondata.answers;
          setFillTheBlankAnswerArray(answer);

          setOptionValues(questiondata.options);
        }
        const questiondatameta = response?.data?.meta;
        const solutiondatameta = response?.data?.meta;

        setsinglequestion(questiondata);
        // form.setFieldsValue({
        //   skill: questiondata?.skill_name,
        // });
        if (solutiondatameta?.video_link) {
          setshowsolutionvalue(true);
          setChecked(true);
        }
        if (questiondatameta?.AttachemtType) {
          const AttachemtType = questiondatameta?.AttachemtType ? JSON.parse(questiondatameta?.AttachemtType) : '';
          setAttachemtType({
            comprehension: AttachemtType?.comprehension,
            audio: AttachemtType?.audio,
            video: AttachemtType?.video,
          });
          setQuestionAttempt({
            Enable: true,
            disable: false,
          });
          if (AttachemtType.comprehension == true) {
            setShowQuestionAttempt('Comprehension');
            // setEnableToDisableQusetionAttemp(true);
            setDisableQusetionAttemp(false);
          } else if (AttachemtType.audio == true) {
            setShowQuestionAttempt('Audio');
            // setEnableToDisableQusetionAttemp(true);
            setDisableQusetionAttemp(false);
          } else if (AttachemtType.video == true) {
            setShowQuestionAttempt('Video');
            // setEnableToDisableQusetionAttemp(true);
            setDisableQusetionAttemp(false);
          }
        }

        if (solutiondatameta?.AttachmentTypeValues == 'MP4 Video') {
          setMp4Active(true);
          setYoutubeActive(false);
          setVimeoActive(false);
          setOTTFormat(false);
        } else if (solutiondatameta?.AttachmentTypeValues == 'YouTube Video') {
          setYoutubeActive(true);
          setMp4Active(false);
          setVimeoActive(false);
          setOTTFormat(false);
        } else if (solutiondatameta?.AttachmentTypeValues == 'Vimeo Video') {
          setVimeoActive(true);
          setYoutubeActive(false);
          setMp4Active(false);
          setOTTFormat(false);
        }
        // setShowQuestionAttempt(solutiondatameta?.AttachmentTypeValues);
        if (solutiondatameta?.AttachmentTypeValues == 'OTT Format') {
          setOTTFormat(true);
          setMP3Active(false);
        } else {
          setMP3Active(true);
          setOTTFormat(false);
        }
        if (solutiondatameta?.QuestionAttempt) {
          const data = JSON.parse(solutiondatameta?.QuestionAttempt);
          setQuestionAttempt(data);
          if (data?.Enable == true) {
            setEnableToDisableQusetionAttemp(true);
            setDisableQusetionAttemp(false);
          } else {
            setEnableToDisableQusetionAttemp(false);
            setDisableQusetionAttemp(true);
          }
        }
        var TagArray = [];
        if (questiondatameta?.tags) {
          TagArray = JSON.parse(questiondatameta?.tags);
        }

        form.setFieldsValue({
          skill: questiondata?.skill_name,
          skills: questiondata?.skill_name,
          questions: questiondata?.questions,
          description: questiondata?.description,
          level: questiondatameta?.level ? Number(questiondatameta?.level) : '',
          points: questiondatameta?.points,
          question_time: questiondatameta?.question_time,
          tags: TagArray,
          topic: questiondata?.topic ? Number(questiondata?.topic) : '',
          hint: solutiondatameta?.hint,
          solution: solutiondatameta?.solution,
          video_link: questiondatameta?.video_link,
          active: questiondatameta?.active == 1 ? true : false,
          comperhension: questiondatameta?.AttachmentTypeValues,
          section: questiondata?.section,
        });
        setResponseData({ description: questiondata?.description != undefined ? questiondata?.description : '' });
        setformData({
          id: questiondata?.id,
          active: questiondata?.active == 1 ? true : false,
          // answers: questiondata?.answers ? JSON.parse(questiondata.answers) : '',
          answers: questiondata?.answers,
          // options: questiondata?.options && answertype != 23 ? JSON.parse(questiondata.options) : '',
          options: questiondata?.options,
          questions: questiondata?.questions, //
          description: questiondata?.description != undefined ? questiondata?.description : '',
          skill: questiondata?.skill_id, //
          type: questiondata?.type,
          topic: questiondata?.topic, //
          section: questiondata?.section,
        });
        console.log(questiondatameta);
        setMeta({
          //active: questiondata?.active,
          id: questiondata?.id,
          level: questiondatameta?.level,
          points: questiondatameta?.points,
          question_time: questiondatameta?.question_time,
          tags: TagArray,
          hint: solutiondatameta?.hint,
          showsolutionvalue:
            questiondatameta?.showsolutionvalue == 'true' || questiondatameta?.showsolutionvalue == true ? true : '',
          solution: solutiondatameta?.solution,
          //topic: questiondatameta?.topic,
          videoType: solutiondatameta?.videoType,
          video_link: questiondatameta?.video_link,
          AttachemtType: questiondatameta?.AttachemtType ? JSON.parse(questiondatameta?.AttachemtType) : '',
          AttachmentTypeLink: questiondatameta?.AttachmentTypeLink,
          AttachmentTypeValues: questiondatameta?.AttachmentTypeValues,
          attachment_type: questiondatameta?.attachment_type,
        });
        console.log(questiondatameta?.AttachmentTypeValues);

        //setData(usersdata);
      } else {
        console.log('error');
      }
    }
    getquestionbyid();
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
        notification.error({ message: 'Server Error' });
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
        notification.error({ message: 'Server Error' });
      }
    }
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
        notification.error({ message: 'Server Error' });
      }
    }
    getallCopmrehension();
    getallTopics();
    async function getallTags() {
      const url = api_url.get_tags;
      const response = await get_api_request(url, headers);

      if (response.status == 200) {
        const tagsdata = response?.data?.responsedata;
        const tagssarray = tagsdata.map(items => {
          return { id: items.id, name: items.tag_name };
        });
        settagsarraydata(tagssarray);
      } else {
        notification.error({ message: 'Server Error' });
      }
    }
    getallTags();
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
    async function get_entity_byid(id) {
      const url = api_url.get_entity_byid + id;
      const response = await get_api_request(url, headers);

      if (response.status == 200) {
        const entitydata = response?.data?.responsedata?.[0]?.name;

        setQuestionTypeName(entitydata);
        setloading(false);
      } else {
        notification.error({ message: 'Server Error' });
      }
    }
  }, []);

  const handleclass = e => {
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

  const handlevideotab = e => {
    //console.log(e);
    if (e == 1) {
      setMP3Active(current => !current);
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

  const HandleAddOptionValue = (e, index) => {
    const updatePrice = OptionValues?.map((value, i) => (index == i ? Object.assign(value, { ['value']: e }) : value));
    setOptionValues(updatePrice);
  };
  const HandleMatchQuestionValue = (e, index, fieldName) => {
    const updatePrice = OptionValues?.map((value, i) =>
      index == i ? Object.assign(value, { [fieldName]: e }) : value,
    );

    setOptionValues(updatePrice);
  };
  const RemoveOptionRow = index => {
    const filterSlabPrice = [...OptionValues];
    delete filterSlabPrice[index];
    var finalArr = [];
    filterSlabPrice.map(item => {
      finalArr.push(item);
    });
    setOptionValues(finalArr);
  };
  const HandleAnswer = (e, data, option, index) => {
    if (e.target.checked == true) {
      const updatePrice = OptionValues?.map((value, i) => {
        index == i ? Object.assign(value, { ['checked']: true }) : (value.checked = false);
        return value;
      });
      setOptionValues(updatePrice);
      // }
    }
    setexactanswer({
      key: option,
      value: data?.replaceAll('"', "'"),
    });
  };

  const HandleMultipleAnswer = (e, data, option, index) => {
    if (e.target.checked == true) {
      const updatePrice = OptionValues?.map((value, i) => {
        index == i ? Object.assign(value, { ['checked']: true }) : value;
        return value;
      });

      setOptionValues(updatePrice);
      // }
    } else if (e.target.checked == false) {
      const updatePrice = OptionValues?.map((value, i) => {
        index == i ? Object.assign(value, { ['checked']: false }) : value;
        return value;
      });

      setOptionValues(updatePrice);
    }
    setexactanswer({
      key: option,
      value: data?.replaceAll('"', "'"),
    });
  };

  const EnableQuestionAttachment = e => {
    console.log(e);

    if (e == 1) {
      setQuestionAttempt({
        Enable: true,
        disable: false,
      });
      setEnableToDisableQusetionAttemp(current => !current);
      setDisableQusetionAttemp(false);
    } else if (e == 2) {
      setQuestionAttempt({
        Enable: false,
        disable: true,
      });
      setEnableToDisableQusetionAttemp(false);
      setDisableQusetionAttemp(current => !current);
    }
  };

  const handleChange = val => {
    setChecked(val);
  };
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

    //  var singleimage = imageRender(vfile);

    // setImages(singleimage);
    console.log(url);
    await imageUploadSave(vfile, url)
      .then(resp => {
        // console.log(resp);
        var image = `<br /><img src=${resp} contenteditable="false" draggable="true" width="200px"></img>`;

        // setformData({ ...formData, description: formData?.description + image });
        setResponseData({ description: ResponseData?.description + image });
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

  const handlesubmit = name => {
    if (AnserType == 22) {
      UpdateSequence();
    } else if (AnserType == 21) {
      updateMatchQuestion();
    } else if (AnserType == 23) {
      UpdateFillTheBlankQuestion();
    } else {
      var AnswerArray = [];
      OptionValues?.map(item => {
        if (item?.checked == true) {
          var anserData = {
            key: item?.key,
            value: item?.value.replaceAll('"', "'"),
          };
          AnswerArray.push(anserData);
        }
      });

      Meta.QuestionAttempt = QuestionAttempt;
      Meta.AttachemtType = AttachemtType;
      Meta.AttachmentTypeValues = AttachmentTypeValues?.comperhension;
      console.log(AttachmentTypeValues?.value);
      var active;
      if (formData.active == true || formData.active == 1) {
        active = 1;
      } else {
        active = 0;
      }
      formData.active = active;
      formData.meta = Meta;
      formData.answers = AnswerArray[0];
      //formData.answers = JSON.stringify(exactanswer);
      formData.options = OptionValues;
      formData.difficulty_level = Meta?.level;
      formData.description = ResponseData?.description;
      console.log(formData);
      if (formData.topic == null) {
        formData.topic = '';
      }
      //const QuestionID = formData?.id;
      console.log(formData);
      UpdateQuestion(formData);

      async function UpdateQuestion(data) {
        const url = api_url.get_questions_by_id + QuestionID;
        const response = await put_api_request(url, data, headers);
        console.log(response);
        if (response?.status == 201) {
          notification.success({ message: 'Question updated Sucessfully!' });
          // setTimeout(() => {
          //   notification.destroy();
          //   history.push('../question');
          // }, 2000);
          if (name == 'Details') {
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
          } else if (name == 'Settings') {
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
          } else if (name == 'Solution') {
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
        }
      }
    }
  };
  const UpdateSequence = () => {
    Meta.QuestionAttempt = QuestionAttempt;
    Meta.AttachmentTypeValues = AttachmentTypeValues?.value;
    var active;
    if (formData.active == true || formData.active == 1) {
      active = 1;
    } else {
      active = 0;
    }
    formData.active = active;
    formData.meta = Meta;
    formData.answers = OptionValues[0];
    //formData.answers = JSON.stringify(exactanswer);
    formData.options = OptionValues;
    formData.difficulty_level = Meta?.level;
    formData.description = ResponseData?.description;
    // console.log(formData);
    // console.log(OptionValues);
    //  const QuestionID = formData?.id;
    // console.log(QuestionID);
    async function UpdateQuestion(data) {
      const url = api_url.get_questions_by_id + QuestionID;
      const response = await put_api_request(url, data, headers);
      console.log(response);
      if (response?.status == 201) {
        notification.success({ message: 'Question updated Sucessfully!' });
      }
    }
    UpdateQuestion(formData);
  };

  const updateMatchQuestion = () => {
    console.log(OptionValues);
    Meta.QuestionAttempt = QuestionAttempt;
    Meta.AttachemtType = AttachemtType;
    Meta.AttachmentTypeValues = AttachmentTypeValues?.value;
    var active;
    if (formData.active == true || formData.active == 1) {
      active = 1;
    } else {
      active = 0;
    }
    formData.active = active;
    formData.meta = Meta;
    //formData.answers = JSON.stringify(AnswerArray);
    formData.answers = OptionValues;
    formData.options = OptionValues;
    formData.difficulty_level = Meta?.level;
    formData.description = ResponseData?.description;
    console.log(formData);
    // const QuestionID = formData?.id;
    UpdateQuestion(formData);

    async function UpdateQuestion(data) {
      const url = api_url.get_questions_by_id + QuestionID;
      const response = await put_api_request(url, data, headers);
      console.log(response);
      if (response?.status == 201) {
        notification.success({ message: 'Question updated Sucessfully!' });
      }
    }
  };

  /***************************************** Fill The Blank Starts */

  const AddInputAnswerValue = () => {
    console.log(FillTheBlankAnswerValue);
    setFillTheBlankAnswerArray([
      ...FillTheBlankAnswerArray,
      {
        table: '',
        image: '',
        answer: FillTheBlankAnswerValue,
      },
    ]);
    setFillTheBlankAnswerValue();
  };
  const CopyToClipboard = e => {
    navigator.clipboard.writeText('Answer_' + e);
    notification.success({
      message: `Copied Successfully ${'Answer_' + e}`,
    });
  };
  const RemoveInputAnswerRow = index => {
    const FilterAnswer = [...FillTheBlankAnswerArray];
    delete FilterAnswer[index];
    var finalArr = [];
    FilterAnswer.map(item => {
      finalArr.push(item);
    });
    console.log(finalArr);
    setFillTheBlankAnswerArray(finalArr);
  };

  const UpdateFillTheBlankQuestion = () => {
    console.log(OptionValues);
    Meta.QuestionAttempt = QuestionAttempt;
    Meta.AttachemtType = AttachemtType;
    Meta.AttachmentTypeValues = AttachmentTypeValues?.value;
    var active;
    if (formData.active == true || formData.active == 1) {
      active = 1;
    } else {
      active = 0;
    }
    formData.active = active;
    formData.meta = Meta;
    //formData.answers = JSON.stringify(AnswerArray);
    formData.answers = FillTheBlankAnswerArray;
    formData.options = OptionValues;
    formData.difficulty_level = Meta?.level;
    formData.description = ResponseData?.description;
    console.log(formData);
    if (formData.topic == null) {
      formData.topic = '';
    }
    //  const QuestionID = formData?.id;
    UpdateQuestion(formData);

    async function UpdateQuestion(data) {
      const url = api_url.get_questions_by_id + QuestionID;
      const response = await put_api_request(url, data, headers);
      console.log(response);
      if (response?.status == 201) {
        notification.success({ message: 'Question updated Sucessfully!' });
      }
    }
  };
  /***************************************** Fill The Blank Ends */

  return (
    <>
      <Main>
        <Form
          name="sDash_validation-form"
          className="editquestion_form"
          form={form}
          // layout="vertical"
          //  onFinish={handlesubmit}
        >
          <Spin spinning={loading}>
            <section className="SectionTabsMainTop">
              <Cards>
                <div className="SectionTabs_Main">
                  <div id="SectionTabsGeneral" className="SectionTabsInner">
                    {tabpane?.Details == true ? (
                      <p className="header_text" style={{ width: '100%' }}>
                        <b>Question Details</b>
                        <br />

                        {QuestionTypeName}
                      </p>
                    ) : tabpane?.Settings == true ? (
                      <p style={{ width: '100%' }}>
                        <b>Question Settings </b>
                        <br />
                        {QuestionTypeName}
                      </p>
                    ) : tabpane?.Solution == true ? (
                      <p style={{ width: '100%' }}>
                        <b>Question Solution </b>
                        <br />
                        {QuestionTypeName}
                      </p>
                    ) : tabpane?.Attachment == true ? (
                      <p style={{ width: '100%' }}>
                        <b>Question Attachment </b>
                        <br />
                        {QuestionTypeName}
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
                      onClick={e => handleclass(e.target.value)}
                    >
                      <span>2</span> Settings
                    </button>

                    <button
                      value={3}
                      className={Activesolution ? 'practice-tabpane' : ''}
                      onClick={e => handleclass(e.target.value)}
                    >
                      <span>3</span> Solution
                    </button>
                    <button
                      value={4}
                      className={ActiveAttachment ? 'practice-tabpane' : ''}
                      onClick={e => handleclass(e.target.value)}
                    >
                      <span>4</span> Attachment
                    </button>
                  </div>
                </div>
              </Cards>
              {tabpane?.Details == true ? (
                <Cards>
                  <Row gutter={30} className="skillrow mb-space">
                    <Col md={18} xs={24} className="skillrow-inner">
                      {/* <label>Skills</label> */}

                      <Form.Item name="skill" label="Skills" initialValue={formData?.skill}>
                        <Select
                          name="skill"
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
                        name="questions"
                        label="Title"
                        className="skillrow-inner"
                        initialValue={formData.questions}
                      >
                        <Input
                          // style={{ marginLeft: '-13px' }}
                          onChange={selectedValue => {
                            setformData({ ...formData, questions: selectedValue.target.value });

                            console.log(selectedValue.target.value);
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
                        {/* <div className="result qst-render-image" style={{ width: '20vh' }}>
                          {renderPictures(Images)}
                        </div> */}
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
                        <CKEditor
                          editor={ClassicEditor}
                          config={{
                            toolbar: {
                              shouldNotGroupWhenFull: true,
                              items: [
                                // 'heading', '|',
                                // 'fontfamily', 'fontsize', '|',
                                // 'alignment', '|',
                                // 'fontColor', 'fontBackgroundColor', '|',
                                // 'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
                                // 'link', '|',
                                // 'outdent', 'indent', '|',
                                // 'bulletedList', 'numberedList', 'todoList', '|',
                                // 'code', 'codeBlock', '|',
                                // 'insertTable', '|',
                                // 'uploadImage', 'blockQuote', '|',
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
                          name="description"
                          id="question-editor"
                          className="question-editor"
                          contentStyle={{
                            height: 430,
                          }}
                          data={ResponseData?.description}
                          onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            // console.log( 'Editor is ready to use!', editor );
                          }}
                          onChange={(event, editor) => {
                            const data = editor.getData();

                            // setformData({ ...formData, description: data });
                            setResponseData({ description: data });
                          }}
                        />
                      </Form.Item>
                    </Col>

                    {AnserType == 16 || AnserType == 18 ? (
                      /**================================================================================== SINGLE QUESTION STARTS**/
                      <>
                        {OptionValues?.map((item, index) => (
                          <Col md={18} xs={24} className="skillrow-inner">
                            <div className="greencol">
                              <Form.Item
                                name={'option' + (index + 1)}
                                label={'Option' + (index + 1)}
                                className="optionadd"
                              >
                                {/* <Editor
                                  name={'value' + (index + 3)}
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
                                <CKEditor
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
                                  name={'value' + (index + 3)}
                                  id="question-editor"
                                  className="question-editor"
                                  contentStyle={{
                                    height: 430,
                                  }}
                                  data={item['value']}
                                  onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    // console.log( 'Editor is ready to use!', editor );
                                  }}
                                  onChange={(event, editor) => {
                                    const data = editor.getData();
                                    HandleAddOptionValue(data, index);
                                  }}
                                />
                                <div className="radio_button">
                                  <Input
                                    className="exact_answer"
                                    type="radio"
                                    name={'answer' + (index + 3)}
                                    checked={item['checked']}
                                    onChange={e => HandleAnswer(e, item['value'], 'Option' + (index + 3), index)}
                                  ></Input>
                                  <label>Exact Answer</label>
                                  <Button
                                    type="danger"
                                    style={{ marginLeft: 'auto' }}
                                    onClick={() => RemoveOptionRow(index)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </Form.Item>
                            </div>
                          </Col>
                        ))}
                      </>
                    ) : /**================================================================================== SINGLE QUESTION ENDS**/

                    AnserType == 17 ? (
                      /**================================================================================== MULTIPLE QUESTION STARTS**/

                      <>
                        {OptionValues?.map((item, index) => (
                          <Col md={18} xs={24} className="skillrow-inner">
                            <div className="greencol">
                              <Form.Item
                                name={'option' + (index + 1)}
                                label={'Option' + (index + 1)}
                                className="optionadd"
                              >
                                {/* <Editor
                                  name={'value' + (index + 3)}
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
                                <CKEditor
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
                                  name={'value' + (index + 3)}
                                  id="question-editor"
                                  className="question-editor"
                                  contentStyle={{
                                    height: 430,
                                  }}
                                  data={item['value']}
                                  onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    // console.log( 'Editor is ready to use!', editor );
                                  }}
                                  onChange={(event, editor) => {
                                    const data = editor.getData();
                                    HandleAddOptionValue(data, index);
                                  }}
                                />
                                <div className="radio_button">
                                  <Input
                                    className="exact_answer"
                                    type="checkbox"
                                    // name={'answer' + (index + 3)}
                                    checked={item['checked']}
                                    onChange={e =>
                                      HandleMultipleAnswer(e, item['value'], 'Option' + (index + 3), index)
                                    }
                                  ></Input>
                                  <label>Exact Answer</label>
                                  <Button
                                    type="danger"
                                    style={{ marginLeft: 'auto' }}
                                    onClick={() => RemoveOptionRow(index)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </Form.Item>
                            </div>
                          </Col>
                        ))}
                      </>
                    ) : /**================================================================================== MULTIPLE QUESTION ENDS**/

                    AnserType == 19 ? (
                      /**================================================================================== SHORT ANSWER TYPE STARTS**/

                      <>
                        {OptionValues?.map((item, index) => (
                          <Col md={18} xs={24} className="skillrow-inner">
                            <div className="greencol">
                              <Form.Item
                                name={'acceptableanswer' + (index + 1)}
                                label={'Acceptable Answer' + (index + 1)}
                                // rules={[{ required: true }]}
                              >
                                <CKEditor
                                  editor={ClassicEditor}
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
                                  name={'acceptableanswer' + (index + 3)}
                                  id="question-editor"
                                  className="question-editor"
                                  contentStyle={{
                                    height: 430,
                                  }}
                                  data={item['value']}
                                  onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    // console.log( 'Editor is ready to use!', editor );
                                  }}
                                  onChange={(event, editor) => {
                                    const data = editor.getData();
                                    HandleAddOptionValue(data, index);
                                  }}
                                />
                                {/* <Input
                                  type="text"
                                  name={'acceptableanswer' + (index + 1)}
                                  onChange={e => {
                                    HandleAddOptionValue(e.target.value, index);
                                  }}
                                  value={item['value']}
                                /> */}
                                <div className="radio_button">
                                  <Input
                                    className="exact_answer"
                                    type="radio"
                                    name={'answer' + (index + 3)}
                                    checked={item['checked']}
                                    onChange={e => HandleAnswer(e, item['value'], 'Option' + (index + 3), index)}
                                  ></Input>
                                  <label>Exact Answer</label>
                                  <Button
                                    type="danger"
                                    style={{ marginLeft: 'auto' }}
                                    onClick={() => RemoveOptionRow(index)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </Form.Item>
                            </div>
                          </Col>
                        ))}
                      </>
                    ) : /**================================================================================== SHORT ANSWER TYPE ENDS**/

                    AnserType == 21 ? (
                      /**================================================================================== MATCH THE FOLLOWING STARTS**/

                      <>
                        {OptionValues?.map((item, index) => (
                          <>
                            <Col md={12} xs={24}>
                              <Form.Item name="pair">
                                <label>Pair {index + 1} </label>
                                <CKEditor
                                  editor={ClassicEditor}
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
                                  name={'acceptableanswer' + (index + 3)}
                                  id="question-editor"
                                  className="question-editor"
                                  contentStyle={{
                                    height: 430,
                                  }}
                                  data={item['pair_value']}
                                  onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    // console.log( 'Editor is ready to use!', editor );
                                  }}
                                  onChange={(event, editor) => {
                                    const data = editor.getData();
                                    HandleMatchQuestionValue(data, index, 'pair_value');
                                  }}
                                />
                                {/* <Editor
                                  tools={[
                                    [Subscript, Superscript],

                                    [InsertTable, InsertImage],
                                  ]}
                                  contentStyle={{
                                    height: 150,
                                  }}
                                  value={item['pair_value']}
                                  onChange={e => HandleMatchQuestionValue(e, index, 'pair_value')}
                                /> */}
                              </Form.Item>
                            </Col>
                            <Col md={12} xs={24}>
                              <Form.Item name="pairss">
                                <label style={{ visibility: 'hidden' }}>Pair</label>
                                <CKEditor
                                  editor={ClassicEditor}
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
                                  name={'acceptableanswer' + (index + 3)}
                                  id="question-editor"
                                  className="question-editor"
                                  contentStyle={{
                                    height: 430,
                                  }}
                                  data={item['pair_answer']}
                                  onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    // console.log( 'Editor is ready to use!', editor );
                                  }}
                                  onChange={(event, editor) => {
                                    const data = editor.getData();
                                    HandleMatchQuestionValue(data, index, 'pair_answer');
                                  }}
                                />
                                {/* <Editor
                                  tools={[
                                    [Subscript, Superscript],

                                    [InsertTable, InsertImage],
                                  ]}
                                  contentStyle={{
                                    height: 150,
                                  }}
                                  onChange={e => HandleMatchQuestionValue(e, index, 'pair_answer')}
                                  value={item['pair_answer']}
                                /> */}
                              </Form.Item>
                            </Col>
                            <div
                              className="removebtn"
                              style={{
                                background: '#f8f8f8',
                                border: '1px solid #f8f8f8',
                                width: '96%',
                                margin: '0px auto',
                              }}
                            >
                              <Button type="danger" className="pull-right" onClick={() => RemoveOptionRow(index)}>
                                Remove
                              </Button>
                            </div>
                          </>
                        ))}
                      </>
                    ) : /**================================================================================== MATCH THE FOLLOWING ENDS**/

                    AnserType == 22 ? (
                      /**================================================================================== ORDERING SEQUENCE STARTS**/

                      <>
                        {console.log(OptionValues, '0000000')}
                        {OptionValues?.map((item, index) => (
                          <Col md={18} xs={24} className="skillrow-inner">
                            <div className="greencol">
                              <Form.Item
                                name={'sequence-item' + (index + 1)}
                                label={'Sequence Item' + (index + 1)}
                                className="optionadd"
                              >
                                <CKEditor
                                  editor={ClassicEditor}
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
                                  name={'sequence-item' + (index + 3)}
                                  id="question-editor"
                                  className="question-editor"
                                  contentStyle={{
                                    height: 430,
                                  }}
                                  data={item['value']}
                                  onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    // console.log( 'Editor is ready to use!', editor );
                                  }}
                                  onChange={(event, editor) => {
                                    const data = editor.getData();
                                    HandleAddOptionValue(data, index);
                                  }}
                                />

                                {/* <Editor
                                  name={'sequence-item' + (index + 3)}
                                  value={item['sequence']}
                                  tools={[
                                    [Subscript, Superscript],
                                    [InsertTable, InsertImage],
                                  ]}
                                  contentStyle={{
                                    height: 250,
                                  }}
                                  onChange={e => HandleAddOptionValue(e.html, index)}
                                /> */}
                                <div className="radio_button">
                                  <Button
                                    type="danger"
                                    style={{ marginLeft: 'auto' }}
                                    onClick={() => RemoveOptionRow(index)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </Form.Item>
                            </div>
                          </Col>
                        ))}
                      </>
                    ) : /**================================================================================== ORDERING SEQUENCE ENDS**/

                    AnserType == 23 ? (
                      <>
                        <br />
                        <Input
                          className="filltheblank-inputfiled"
                          type="text"
                          value={FillTheBlankAnswerValue}
                          onChange={e => setFillTheBlankAnswerValue(e.target.value)}
                        />
                        <Button type="success" className="add-answer" onClick={() => AddInputAnswerValue()}>
                          Add
                        </Button>

                        <div className="answerfillintheblank">
                          {FillTheBlankAnswerArray?.map((item, i) => (
                            <>
                              <div className="answerfill-inner">
                                <p
                                  onClick={() => CopyToClipboard(i)}
                                  //className="copytoclipboart-filltheblank"
                                  style={{
                                    background: '#2196F3',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    flexGrow: 0,
                                    marginRight: '13%',
                                    color: 'white',
                                    cursor: 'pointer',
                                  }}
                                >
                                  <i class="fa fa-files-o" aria-hidden="true"></i> {item['answer']}
                                </p>
                                <a onClick={() => RemoveInputAnswerRow(i)}>X</a>
                              </div>
                            </>
                          ))}
                        </div>
                        <br />
                      </>
                    ) : (
                      ''
                    )}

                    {AnserType != 23 ? (
                      <Col md={18} xs={24} className="skillrow-inner">
                        <Form.Item>
                          <div className="add_option" style={{ border: '1px dashed #43e143 ', textAlign: 'center' }}>
                            <Button
                              style={{ background: 'transparent' }}
                              onClick={() => {
                                setOptionValues([
                                  ...OptionValues,
                                  {
                                    // id: OptionValues?.length + 1,
                                    key: 'Option' + (OptionValues?.length + 1),
                                    value: '',
                                    checked: false,
                                  },
                                ]);
                              }}
                            >
                              Add Option
                            </Button>
                          </div>
                        </Form.Item>
                      </Col>
                    ) : (
                      ''
                    )}
                  </Row>
                  <div className="form-group">
                    <Button
                      htmlType="submit"
                      type="success"
                      style={{ float: 'right' }}
                      onClick={() => handlesubmit('Details')}
                    >
                      Save Details
                    </Button>
                  </div>
                </Cards>
              ) : tabpane?.Settings == true ? (
                <>
                  <Cards>
                    <Row gutter={30}>
                      <Col md={18} xs={24} className="skillrow-inner">
                        <label>Skill</label>
                        <Form.Item name="skills" initialValue={formData?.skill}>
                          {/* <Select>
                          <Option value={1}>Sentence Completion (Verbal Reasoning)</Option>
                        </Select> */}
                          <Input readOnly />
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
                        <Form.Item name="tags" initialValue={Meta?.tags}>
                          <Select
                            mode="multiple"
                            onChange={selectedValue => {
                              setMeta({ ...Meta, tags: selectedValue });
                              console.log(Meta);
                              console.log(selectedValue);
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
                        <Form.Item name="level" initialValue={Meta?.level}>
                          <Select
                            onChange={selectedValue => {
                              setMeta({ ...Meta, level: selectedValue });
                              console.log(selectedValue);
                              console.log(Meta);
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
                            defaultValue={Meta?.points}
                            onChange={e => {
                              setMeta({ ...Meta, points: e.target.value });
                            }}
                          ></Input>
                        </Form.Item>
                      </Col>

                      <Col md={18} xs={24} className="skillrow-inner">
                        <label>Default Time To Solve (Seconds)</label>
                        <Form.Item name="question_time">
                          <Input
                            type="text"
                            defaultValue={Meta?.question_time}
                            onChange={e => {
                              setMeta({ ...Meta, question_time: e.target.value });
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
                            onChange={e => {
                              //handleChange(e)
                              setChecked(e);
                              setMeta({ ...Meta, active: e });
                              setformData({ ...formData, active: e });
                            }}
                          ></Switch>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Button
                      className="pull-right"
                      style={{ color: '#fff', background: '#000' }}
                      onClick={() => handlesubmit('Settings')}
                    >
                      Update Settings
                    </Button>
                  </Cards>
                </>
              ) : tabpane?.Solution == true ? (
                <>
                  <Cards>
                    <Col md={18} xs={24} className="skillrow-inner">
                      <label>Solution</label>
                      <Form.Item name="solution">
                        <Editor
                          tools={[
                            [Bold, Italic, Underline, Strikethrough],
                            [Subscript, Superscript],
                            [OrderedList, UnorderedList],
                            [InsertTable, InsertImage],
                          ]}
                          contentStyle={{
                            height: 430,
                          }}
                          value={Meta?.solution}
                          onChange={selectedValue => {
                            setMeta({ ...Meta, solution: (selectedValue?.html).replace(/(<([^>]+)>)/gi, '') });
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col md={18} xs={24} className="skillrow-inner">
                      <label>Enable Solution Video</label>
                      <Form.Item name="solution_video">
                        <Space direction="vertical">
                          <Switch
                            checked={Meta.showsolutionvalue}
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                            onChange={e => {
                              handleswitch(e);
                              setMeta({ ...Meta, showsolutionvalue: e });
                            }}
                          ></Switch>
                        </Space>
                      </Form.Item>
                    </Col>
                    {Meta.showsolutionvalue == true ? (
                      <Col md={18} xs={24} className="skillrow-inner">
                        <div className="video_buttons">
                          <Button
                            value={1}
                            className={Mp4Active ? 'bg-salmon' : ''}
                            onClick={e => {
                              handlevideotab(e.target.value);
                              setvideoType('MP4 Video');
                              setMeta({ ...Meta, videoType: 'MP4 Video' });
                            }}
                          >
                            MP4 Video
                          </Button>
                          <Button
                            value={2}
                            className={YoutubeActive ? 'bg-salmon' : ''}
                            onClick={e => {
                              handlevideotab(e.target.value);
                              setvideoType('YouTube Video');
                              setMeta({ ...Meta, videoType: 'YouTube Video' });
                            }}
                          >
                            YouTube Video
                          </Button>
                          <Button
                            value={3}
                            className={VimeoActive ? 'bg-salmon' : ''}
                            onClick={e => {
                              handlevideotab(e.target.value);
                              setvideoType('Vimeo Video');
                              setMeta({ ...Meta, videoType: 'Vimeo Video' });
                            }}
                          >
                            Vimeo Video
                          </Button>
                        </div>
                        <Input
                          className="videolink_input"
                          type="text"
                          placeholder="Enter Your Video Link"
                          defaultValue={Meta?.video_link}
                          onChange={e => setMeta({ ...Meta, video_link: e.target.value })}
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

                    <Col md={18} xs={24} className="skillrow-inner">
                      <label>Hint</label>
                      <Form.Item name="hint">
                        <Editor
                          tools={[
                            [Bold, Italic, Underline, Strikethrough],
                            [Subscript, Superscript],
                            [OrderedList, UnorderedList],
                            [InsertTable, InsertImage],
                          ]}
                          contentStyle={{
                            height: 430,
                          }}
                          value={Meta?.hint}
                          onChange={selectedValue => {
                            setMeta({ ...Meta, hint: (selectedValue?.html).replace(/(<([^>]+)>)/gi, '') });
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Button
                      className="pull-right"
                      style={{ color: '#fff', background: '#000' }}
                      onClick={() => handlesubmit('Solution')}
                    >
                      Update Solution
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
                          className={EnableToDisableQusetionAttemp ? 'bg-salmon' : ''}
                          onClick={e => EnableQuestionAttachment(e.target.value)}
                        >
                          Yes
                        </button>
                        <button
                          value={2}
                          id="No"
                          className={DisableQusetionAttemp ? 'bg-salmon' : ''}
                          onClick={e => EnableQuestionAttachment(e.target.value)}
                        >
                          No
                        </button>
                      </div>
                      {EnableToDisableQusetionAttemp == 1 ? (
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
                            <Form.Item className="duration" name="comperhension">
                              <Select
                                style={{ width: '100%' }}
                                classNamePrefix="select"
                                isSearchable={true}
                                name="comperhension"
                                comprehensionData={comprehensionData}
                                //onSelect={GetPosition}
                                onChange={e => {
                                  setAttachmentTypeValues({ ...AttachmentTypeValues, comperhension: e });
                                }}
                              >
                                {comprehensionData != null
                                  ? comprehensionData.map((item, index) => (
                                      <Option value={item.name}>{item.name} </Option>
                                    ))
                                  : ''}
                              </Select>
                            </Form.Item>
                          ) : (
                            ''
                          )}
                          {ShowQuestionAttempt == 'Audio' ? (
                            <Col md={18} xs={24} className="skillrow-inner">
                              <div className="video_buttons">
                                <button
                                  value={1}
                                  className={MP3Active ? 'bg-salmon' : ''}
                                  onClick={e => {
                                    handlevideotab(e.target.value);
                                    setAttachmentTypeValues({ ...AttachmentTypeValues, value: 'MP3 Format' });
                                  }}
                                >
                                  MP3 Format
                                </button>
                                <button
                                  value={2}
                                  className={OTTFormat ? 'bg-salmon' : ''}
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
                                value={Meta?.AttachmentTypeLink}
                                onChange={e => {
                                  setMeta({ ...Meta, AttachmentTypeLink: e.target.value });
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
                                value={Meta?.AttachmentTypeLink}
                                onChange={e => {
                                  setMeta({ ...Meta, AttachmentTypeLink: e.target.value });
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
                      onClick={() => handlesubmit('Attachment')}
                    >
                      Update
                    </Button>
                  </Cards>
                  {/* <Button style={{ color: '#fff', background: '#000', marginLeft: '33%' }}>Update</Button> */}
                </>
              ) : (
                ''
              )}{' '}
            </section>
          </Spin>
        </Form>
      </Main>
    </>
  );
};
export default EditQuestions;
