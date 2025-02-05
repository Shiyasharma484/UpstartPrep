import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Tabs, Row, Input, Switch, Card } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useHistory } from 'react-router-dom';
import { headers } from '../../helpers/variables';
import { Main } from '../styled';
import FormItem from 'antd/lib/form/FormItem';
import { TimePicker } from 'antd';
import moment from 'moment';
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
  OrderedList,
  UnorderedList,
  InsertTable,
  InsertImage,
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
const CreateNewCourse = () => {
  const [moduledataarray, setmoduledataarray] = useState();
  const [CourseData, setCourseData] = useState();
  const [ScheduleData, setScheduleData] = useState([]);
  const [data, setData] = useState([]);
  const [MetaId, setMetaId] = useState();
  const [SectionDatatable, setSectionDatatable] = useState();
  const [data1, setData1] = useState([]);
  const [ShowStartTimeFields, setShowStartTimeFields] = useState(false);
  const [ActivesectinSwitch, setActivesectinSwitch] = useState();
  const [ActivesectinSwitch1, setActivesectinSwitch1] = useState();
  const [SectionData, setSectionData] = useState([]);
  const [AddSection] = Form.useForm();
  const [arrayDataUsergroup, setarrayDataUsergroup] = useState(null);
  const [arrayDataUser, setarrayDataUser] = useState(null);
  const [AddForm] = Form.useForm();
  const [SectionArray, setSectionArray] = useState(null);
  const [SectionDataByID, setSectionDataByID] = useState();
  const [ActiveMarks, setActiveMarks] = useState(false);
  const [IsActiveMarks, setIsActiveMarks] = useState(false);
  const history = useHistory();
  const [EditActiveStatusSwitch, setEditActiveStatusSwitch] = useState(false);
  const [EditActiveStatusSwitch1, setEditActiveStatusSwitch1] = useState(false);
  const [ExamTypeData, setExamTypeData] = useState([]);

  const [CourseID, setCourseID] = useState(1);
  const [form] = Form.useForm();
  const [EditScheduleForm] = Form.useForm();
  const [Negative, setNegative] = useState(false);
  const [IsNegative, setIsNegative] = useState(false);
  const [arrayDatasubcategory, setarrayDatasubcategory] = useState(null);
  const [EditSection] = Form.useForm();
  const [Shuffle, setShuffle] = useState(false);
  const [IsShuffle, setIsShuffle] = useState(false);
  const [Restrict, setRestrict] = useState(false);
  const [IsRestrict, setIsRestrict] = useState(false);
  const [EditScheuleForm] = Form.useForm();
  const [isActive, setIsActive] = useState(false);
  const [NegativeType, setNegativeType] = useState(false);
  const [IsNegativeType, setIsNegativeType] = useState(false);
  const [updatedid, setupdatedid] = useState([]);
  const [Disable, setDisable] = useState(false);
  const [IsDisable, setIsDisable] = useState(false);
  const [Disable1, setDisable1] = useState(false);
  const [IsDisable1, setIsDisable1] = useState(false);
  const [Enable, setEnable] = useState(false);
  const [IsEnable, setIsEnable] = useState(false);
  const [Hide, setHide] = useState(false);
  const [IsHide, setIsHide] = useState(false);
  const [Show, setShow] = useState(false);
  const [IsShow, setIsShow] = useState(false);
  const enc_user_detail = Cookies.get('UserDetail');
  const [showredeemvalue, setshowredeemvalue] = useState(false);
  const [sidebaroptions, setsidebaroptions] = useState(false);
  const { TabPane } = Tabs;
  const [ShowAddNewQuizType, setShowAddNewQuizType] = useState(false);
  const [showsolutionvalue, setshowsolutionvalue] = useState(false);
  const [ShowEditNewQuizType, setShowEditNewQuizType] = useState(false);
  const [PaidAccess, setPaidAccess] = useState(0);
  const [ShowAddNewSection, setShowAddNewSection] = useState(false);
  const [ShowEditNewSection, setShowEditNewSection] = useState(false);
  const [status, setStatus] = useState(0);
  const [Visibility, setVisibility] = useState(0);
  const [statusVisibility, setstatusVisibility] = useState();

  const [AccessPoint, setAccessPoint] = useState(0);
  const [Active, setActive] = useState(false);
  const [Activesection, setActivesection] = useState(false);
  const [ActiveQuestion, setActiveQuestion] = useState(false);
  const [ActiveSchedules, setActiveSchedules] = useState(false);
  const [startDate, setStartDate] = useState();
  const [StartTime, setStartTime] = useState();
  const [RestrictAttempts, setRestrictAttempts] = useState(false);
  const [ActiveStatusSwitch, setActiveStatusSwitch] = useState(false);
  const [EditActiveSwitch, setEditActiveSwitch] = useState(false);
  const [EndDate, setEndDate] = useState();
  const [EndTime, setEndTime] = useState();
  const [render, setrender] = useState(false);
  const [Render, setRender] = useState(0);
  /**QUESTION **/
  const [ViewquestionsData, setViewquestionsData] = useState();
  const [allquestions, setallquestions] = useState();
  const [AddedQuestion, setAddedQuestion] = useState([]);
  const [RenderSearchQuestionData, setRenderSearchQuestionData] = useState(0);
  const [QuestionTypeData, setQuestionTypeData] = useState([]);
  const [QuizTypeData, setQuizTypeData] = useState([]);
  const [levelsData, setlevelsData] = useState();
  const [filtersectionData, setfiltersectionData] = useState([]);
  const [filtertopicData, setfiltertopicData] = useState();
  const [filtertagsData, setfiltertagsData] = useState();
  const [SkillsData, setSkillsData] = useState([]);
  const [SeacrhArray, setSeacrhArray] = useState([]);
  const [LevelArray, setLevelArray] = useState([]);
  const [FilterData, setFilterData] = useState({
    by_code: '',
    by_section: '',
    by_skill: '',
    by_topic: '',
  });
  //
  /**Active Tab **/
  const [ActiveDetails, setActiveDetails] = useState(true);
  const [Activesolution, setActivesolution] = useState(false);
  const [ActiveSetting, setActiveSetting] = useState(false);
  const [ActiveAttachment, setActiveAttachment] = useState(false);
  const [ActiveSection, setActiveSection] = useState(false);

  const handleswitch = e => {
    console.log(e);
    if (e == true) {
      setPaidAccess(1);
      setshowsolutionvalue(true);
    } else {
      setPaidAccess(0);
      setshowsolutionvalue(false);
      setshowredeemvalue(false);
    }
  };
  const handleredeem = e => {
    console.log(e);
    if (e == true) {
      setAccessPoint(1);
      setshowredeemvalue(true);
    } else {
      setAccessPoint(0);
      setshowredeemvalue(false);
    }
  };
  const visibility = e => {
    if (e == true) {
      setVisibility(1);
    } else {
      setVisibility(0);
    }
  };
  const StatusVisibility = e => {
    if (e == true) {
      setstatusVisibility(1);
    } else {
      setstatusVisibility(0);
    }
  };
  const visibilitystatus = e => {
    if (e == true) {
      setStatus(1);
    } else {
      setStatus(0);
    }
  };

  const [SettingsData, setSettingsData] = useState({
    description: '',
    exam_type: '',
    redeem: '',
    category_id: '',
    title: '',
    durationModeAuto: false,
    durationModeManual: false,
    marksModeAuto: false,
    marksModeManual: false,
    negatineMarkingAuto: false,
    negatineMarkingManual: false,
    pass_percentage: '',
    suffleQuestionAuto: false,
    suffleQuestionManual: false,
    restrictAttemptAuto: false,
    restrictAttemptManual: false,
    numberofAttempts: '',
    dissableSectionAuto: false,
    dissableSectionManual: false,
    dissableFinishButtonAuto: false,
    dissableFinishButtonManual: false,
    enableQusetionListAuto: false,
    enableQusetionListManual: false,
    hideSoluationsAuto: false,
    hideSoluationsManual: false,
    showLeaderBoardAuto: false,
    showLeaderBoardManual: false,
    section: '',
  });

  const [settingData, setsettingData] = useState({
    fixed: false,
    flex: false,
    editfixed: false,
    editflex: false,
    end_time: '',
    end_date: '',
    start_time: '',
    start_date: '',
  });
  const [ShowTabPane, setShowTabPane] = useState({
    Detail: true,
    Settings: false,
    Questions: false,
    Sections: false,
    Schedules: false,
    ExamDetails: true,
    ExamSettings: false,
    ExamSections: false,
    ExamQuestions: false,
    ExamSchedules: false,
  });
  const [ShowQuestions, setShowQuestions] = useState({
    ViewQuestion: true,
    AddQuestion: false,
    CurrentView: false,
    CurrentAdd: false,
  });
  // ==================================Set Form Data for Edit schedule Start========================================== //

  const [addsectionData, setaddsectionData] = useState({
    section_name: '',
    negatineMarkingAuto1: '',
    negatineMarkingManual1: '',
    section: '',
    duration_in_mintues: '',
    correct_answer_mrk: '',
    negative_mrks: '',
    pass_percent_age: '',
    section_order: '',
    active: '',
  });

  const [editsectionData, seteditsectionData] = useState({
    section_name: '',
    section: '',
    duration_in_mintues: '',
    negatineMarkingAuto1: '',
    negatineMarkingManual1: '',
    correct_answer_mrk: '',
    negative_mrks: '',
    pass_percent_age: '',
    section_order: '',
    active: '',
  });

  var updateids;
  useEffect(() => {
    async function GetAllSections() {
      const url = api_url.get_section;
      const response = await get_api_request(url, headers);

      console.log(response);
      if (response.status == 200) {
        const SectionDATA = response?.data?.responsedata;
        console.log(SectionDATA);
        const sectionArray = SectionDATA.map(item => {
          return { id: item.id, name: item.section_name };
        });
        setSectionArray(sectionArray);
        console.log(sectionArray);
        console.log(SectionDATA);
      } else {
        console.log('error');
      }
    }
    GetAllSections();

    async function GetSectionbyid() {
      const url = api_url.get_section_id;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const SectionData = response?.data?.responsedata;
        setSectionData(SectionData);
      } else {
        console.log('error');
      }
    }
    GetSectionbyid();

    async function getallquestions() {
      const url = api_url.getallquestions;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const QuestionData = response.data.responsedata;
        // var changedarray = QuestionData?.map(item => {
        //   if (item?.options) {
        //     var options = JSON.parse(item?.options);
        //     item.options = options;
        //   }
        //   return item;
        // });
        setallquestions(QuestionData);
      } else {
        console.log('error');
      }
    }
    getallquestions();

    async function getUserGroups() {
      const url = api_url.get_group;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const usergroupdata = response.data.responsedata;
        const dataArray = usergroupdata.map(item => {
          return { id: item.id, name: item.group_name };
        });
        setarrayDataUsergroup(dataArray);
      } else {
        console.log('error');
      }
    }
    getUserGroups();

    async function getUser() {
      const url = api_url.get_all_users;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const userdata = response?.data?.responsedata?.users;

        const dataArray = userdata.map(item => {
          return { id: item.id, name: item.user_name };
        });
        setarrayDataUser(dataArray);
      } else {
        console.log('error');
      }
    }
    getUser();

    async function GetAllSchedules() {
      const url = api_url.get_schedules_by_event_id + CourseID + '/' + '30';
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const SchedulesData = response?.data?.data;
        setScheduleData(SchedulesData);
      } else {
        console.log('error');
      }
    }
    GetAllSchedules(CourseID);

    async function GetAllSectionData() {
      const url = api_url.get_section_by_exam_id + CourseID;
      const response = await get_api_request(url, headers);
      console.log(url);
      console.log(response);
      if (response.status == 200) {
        const SectionData = response?.data?.data;
        setSectionDatatable(SectionData);
      } else {
        console.log('error');
      }
    }
    GetAllSectionData(CourseID);

    async function Getallmodules(data) {
      console.log(data);
      const url = api_url.getall_modules;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const Moduledata = response?.data?.responsedata?.modules;
        console.log(Moduledata);
        const getmodules = Moduledata?.map(items => {
          console.log(items);
          if (items.name == 'EXAM TYPES') {
            const parentdata = items?.id;
            console.log(parentdata);

            async function getentitybyparentid() {
              const url = api_url.get_entity_byparentid + parentdata;
              const response = await get_api_request(url, headers);
              console.log(response);
              const questiontypedata = response?.data?.responsedata;
              questiontypedata?.map(item => {
                return { id: item.id, name: item.name };
              });
              setExamTypeData(questiontypedata);
            }
            getentitybyparentid();
            setmoduledataarray(items);
          } else if (items.name == 'QUIZ TYPES') {
            const parentdata = items?.parent_id;
            async function getentitybyparentid() {
              const url = api_url.get_entity_byparentid + parentdata;
              const response = await get_api_request(url, headers);
              console.log(response);
              const questiontypedata = response?.data?.responsedata;
              questiontypedata.map(item => {
                return { id: item.id, name: item.name };
              });
              setQuizTypeData(questiontypedata);
              console.log(questiontypedata);
            }
            getentitybyparentid();
            //setmoduledataarray(items);
          } else if (items.name == 'QUESTION TYPES') {
            //console.log(items);
            const parentdata = items?.parent_id;
            async function getquestiontype_entitybyparentid() {
              const url = api_url.get_entity_byparentid + parentdata;
              const response = await get_api_request(url, headers);
              console.log(response);
              const questiontypedata = response?.data?.responsedata;
              setQuestionTypeData(questiontypedata);
            }

            getquestiontype_entitybyparentid();
          } else if (items.name == 'Levels') {
            const parentdata = items?.parent_id;
            async function getentitybyparentid() {
              const url = api_url.get_entity_byparentid + parentdata;
              const response = await get_api_request(url, headers);
              console.log(response);
              console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
              const questiontypedata = response?.data?.responsedata;
              setlevelsData(questiontypedata);
            }
            getentitybyparentid();
          }
        });
      } else {
        console.log('error');
      }
    }
    Getallmodules();

    /**Filter Section=============================================STARTS **/
    async function GetAllSkills() {
      const url = api_url.get_skills;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const Skills = response?.data?.responsedata;
        const SkillsDataarray = Skills.map(item => {
          return { id: item.id, name: item.skill_name };
        });
        setSkillsData(SkillsDataarray);
        console.log(SkillsDataarray);
      } else {
        console.log('error');
      }
    }
    GetAllSkills();

    async function getFilterSection() {
      const url = api_url.get_section;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const Section = response?.data?.responsedata;
        const filtersection = Section.map(item => {
          return { id: item.id, name: item.section_name };
        });
        setfiltersectionData(filtersection);
        console.log(filtersection);
      } else {
        console.log('error');
      }
    }
    getFilterSection();

    async function getFilterTopics() {
      const url = api_url.get_topics;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const Topics = response?.data?.responsedata;
        const filtertopics = Topics.map(item => {
          return { id: item.id, name: item.topic_name };
        });
        setfiltertopicData(filtertopics);
        console.log(filtertopics);
      } else {
        console.log('error');
      }
    }
    getFilterTopics();

    async function getFilterTags() {
      const url = api_url.get_tags;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const Tags = response?.data?.responsedata;
        const filtertags = Tags.map(item => {
          return { id: item.id, name: item.tag_name };
        });
        setfiltertagsData(filtertags);
        console.log(filtertags);
      } else {
        console.log('error');
      }
    }
    getFilterTags();
    /**Filter Section=============================================ENDS **/
    async function getCategory() {
      const url = api_url.get_category;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const categorydata = response.data.responsedata;
        const dataArray = categorydata.map(item => {
          return { id: item.id, name: item.category_name };
        });
        setarrayDatasubcategory(dataArray);
      } else {
        console.log('error');
      }
    }
    getCategory();
    setRender(0);
    setIsActive(true);
    setNegative(true);
    setIsNegativeType(true);
    setShuffle(true);
    setRestrict(true);
    setIsActiveMarks(true);
    setDisable(true);
    setIsEnable(true);
    setHide(true);
    setShow(true);
  }, [render, Render]);

  /*==========================================END */
  /*HANDLING EDIT=============================START */

  const HandleAction = e => {
    console.log(e);
    const ids = e.split(',');
    console.log(ids);
    const actionid = ids?.[0];
    const rowid = ids?.[1];
    console.log(rowid);
    if (actionid == 3) {
      setShowEditNewQuizType(true);
      async function getschedulebyid() {
        const url = api_url.get_schedule_byId + rowid;
        const response = await get_api_request(url, headers);
        if (response.status == 200) {
          console.log(response);
          const scheduledatabyid = response?.data?.data[0];
          console.log(scheduledatabyid?.id);
          updateids = scheduledatabyid?.id;
          console.log(updateids);
          updatedid.push(scheduledatabyid?.id);

          // ==================================Set Edit Schedule Fieldvalue start========================================== //

          if (scheduledatabyid?.active == 1) {
            setEditActiveSwitch(true);
          } else if (scheduledatabyid?.active == 0) {
            setEditActiveSwitch(false);
          }

          if (scheduledatabyid?.paid == 1) {
            setEditASwitch(true);
          } else if (scheduledatabyid?.paid == 0) {
            setEditASwitch(false);
          }
          setsettingData({
            ...settingData,
            editflex: scheduledatabyid?.schedule_type == 'Flexible' ? true : false,
            editfixed: scheduledatabyid?.schedule_type == 'Fixed' ? true : false,

            pointsmaunalInput: scheduledatabyid?.pointsinput,
            durationmaunalInput: scheduledatabyid?.durationinput,
            // end_time: scheduledatabyid?.end_time,
            // end_date: scheduledatabyid?.end_date,
            // start_time: scheduledatabyid?.start_time,
            // start_date: scheduledatabyid?.start_date,
          });
          var numberArray;
          if (scheduledatabyid.schedule_to_individual) {
            // const individual = scheduledatabyid.schedule_to_individual?.split(',');
            // numberArray = individual?.map(Number); //to show data with id in multiple tag --"151,150,152"
            // console.log(numberArray);
            numberArray = JSON.parse(scheduledatabyid.schedule_to_individual);
          }
          var groupArray;
          if (scheduledatabyid.schedule_to_group) {
            // const individual = scheduledatabyid.schedule_to_individual?.split(',');
            // numberArray = individual?.map(Number); //to show data with id in multiple tag --"151,150,152"
            // console.log(numberArray);
            // groupArray = JSON.parse(scheduledatabyid?.schedule_to_group);
          }

          EditScheduleForm.setFieldsValue({
            user_groups: scheduledatabyid?.schedule_to_group,
            grace_period_to_join: scheduledatabyid?.grace_period_to_join,
            users: scheduledatabyid?.schedule_to_individual,
            start_time: moment(scheduledatabyid?.start_time, 'HH:mm:ss'),
            end_time: moment(scheduledatabyid?.end_time, 'HH:mm:ss'),
            start_date: moment(scheduledatabyid?.start_date).format('MM-DD-YYYY'),
            end_date: moment(scheduledatabyid?.end_date).format('MM-DD-YYYY'),
            schedule_to_group: scheduledatabyid?.schedule_to_group,
            // schedule_to_group: scheduledatabyid.schedule_to_group ? Number(scheduledatabyid.schedule_to_group) : '',
            schedule_to_individual: numberArray,
          });

          // ==================================Set Edit Schedule Fieldvalue End========================================== //
        } else {
          console.log('error');
        }
      }
      getschedulebyid();
    } else if (actionid == 1) {
      history.push(`../users/${actionid}/overallQuiz-report`);
    } else if (actionid == 4) {
      handleDelete(rowid);
    }
  };
  const HandleAction1 = e => {
    console.log(e);
    const ids = e.split(',');
    console.log(ids);
    const actionid = ids?.[0];
    const rowid = ids?.[1];
    console.log(rowid);
    if (actionid == 3) {
      setShowEditNewSection(true);
      async function getsectionbyid() {
        const url = api_url.get_exam_by_section_id + rowid;
        const response = await get_api_request(url, headers);
        console.log(response);
        var sectionDatabyId = response?.data?.data[0];
        setSectionDataByID(sectionDatabyId);
        console.log(sectionDatabyId);
        updateids = sectionDatabyId?.id;
        console.log(updateids);
        updatedid.push(sectionDatabyId?.id);
        if (sectionDatabyId?.active == 1) {
          setEditActiveStatusSwitch(true);
        } else if (sectionDatabyId?.active == 0) {
          setEditActiveStatusSwitch(false);
        }
        seteditsectionData({
          ...editsectionData,
          active: sectionDatabyId?.active == 1 ? true : false,
          section_name: sectionDatabyId?.name,
          section: sectionDatabyId?.section_id,
          duration_in_mintues: sectionDatabyId?.duration,
          correct_answer_mrk: sectionDatabyId?.marks_for_correct_answers,
          negative_mrks: sectionDatabyId?.negative_marks,
          pass_percent_age: sectionDatabyId?.pass_percentage,
          section_order: sectionDatabyId?.section_order,
        });
        EditSection.setFieldsValue({
          active: sectionDatabyId?.active == 1 ? true : false,
          section_name: sectionDatabyId?.name,
          section: sectionDatabyId?.section_id,
          duration_in_mintues: sectionDatabyId?.duration,
          correct_answer_mrk: sectionDatabyId?.marks_for_correct_answers,
          negative_mrks: sectionDatabyId?.negative_marks,
          pass_percent_age: sectionDatabyId?.pass_percentage,
          section_order: sectionDatabyId?.section_order,
        });
      }
      getsectionbyid();
    } else if (actionid == 1) {
      history.push(`../${actionid}/overallExam-report`);
    } else if (actionid == 4) {
      handleDelete1(rowid);
    }
  };
  // ==================================Create Schedule start========================================== //
  const AddNewSchedule = fieldsvalue => {
    console.log(CourseID);

    //
    var payload = {};
    var schedule_Type;
    if (settingData.fixed == true) {
      schedule_Type = 'Fixed';
    } else if (settingData.flex == true) {
      schedule_Type = 'Flexible';
      payload['end_date'] = moment(EndDate).format('YYYY-MM-DD');
      payload['end_time'] = moment(fieldsvalue.end_time).format('hh:mm');
    }

    var activeswicth;

    if (ActiveStatusSwitch == true) {
      activeswicth = 1;
    } else {
      activeswicth = 0;
    }
    const IndividualString = JSON.stringify(fieldsvalue.schedule_to_individual);
    const GroupString = JSON.stringify(fieldsvalue?.schedule_to_group);
    console.log(IndividualString);
    payload['schedule_type'] = schedule_Type;
    payload['event_type'] = 30;
    payload['event_id'] = CourseID;
    payload['start_date'] = moment(fieldsvalue.start_date).format('YYYY-MM-DD');
    payload['start_time'] = moment(fieldsvalue.start_time).format('hh:mm');
    payload['grace_period_to_join'] = fieldsvalue.grace_period_to_join;
    payload['schedule_to_group'] = fieldsvalue?.schedule_to_group;
    payload['schedule_to_individual'] = IndividualString;
    payload['status'] = activeswicth;

    console.log(payload);
    async function CreateSchedule(data) {
      const url = api_url.create_schedule;
      const response = await post_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.message,
        });
        setRender(Render + 1);
        setShowAddNewQuizType(false);
        form.resetFields();
        // window.location.reload();
      } else if (response.status === 200) {
        notification.error({
          message: response?.data?.message,
        });
      } else {
        notification.error({ message: 'server error' });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      }
    }
    CreateSchedule(payload);
  };
  // ==================================Create Schedule End========================================== //

  const EditNewSchedule = FieldsValue => {
    console.log(updatedid?.[0]);

    var Payload = {};
    var schedule_Type;
    if (settingData.editfixed == true) {
      schedule_Type = 'Fixed';
    } else if (settingData.editflex == true) {
      schedule_Type = 'Flexible';
      Payload['end_date'] = moment(EndDate).format('YYYY-MM-DD');
      Payload['end_time'] = moment(FieldsValue.end_time).format('hh:mm');
    }

    var activeswicth;

    if (EditActiveStatusSwitch == true) {
      activeswicth = 1;
    } else {
      activeswicth = 0;
    }
    const IndividualString = JSON.stringify(FieldsValue?.schedule_to_individual);
    const GroupString = JSON.stringify(FieldsValue?.schedule_to_group);
    const start_date = moment(FieldsValue.start_date).format('YYYY-MM-DD');
    const start_time = moment(FieldsValue.start_time).format('hh:mm');
    console.log(start_date);
    Payload['schedule_type'] = schedule_Type;
    Payload['event_type'] = 30;
    Payload['event_id'] = CourseID;
    Payload['start_date'] = start_date;
    Payload['start_time'] = start_time;
    Payload['grace_period_to_join'] = FieldsValue.grace_period_to_join;
    Payload['schedule_to_group'] = FieldsValue?.schedule_to_group;
    Payload['schedule_to_individual'] = IndividualString;
    Payload['status'] = activeswicth;

    console.log(Payload);
    async function UpdateSchedule(data) {
      const url = api_url.update_schedules_id + updatedid?.[0];
      const response = await put_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.responsedata,
        });
        setShowEditNewQuizType(false);
        setRender(Render + 1);
        form.resetFields();
        // history.push('../users/customer-list');
      } else
        notification.error({
          message: 'Server Error',
        });
    }
    UpdateSchedule(Payload);
  };

  const AddNewSection = fieldsvalue => {
    var activeswicth;

    if (ActivesectinSwitch == true) {
      activeswicth = 1;
    } else {
      activeswicth = 0;
    }
    var addnewsection = {
      exam_id: CourseID,
      name: fieldsvalue?.section_name,
      active: activeswicth,
      section_id: fieldsvalue?.section,
      duration: fieldsvalue?.duration_in_mintues,
      marks_for_correct_answers: fieldsvalue?.correct_answer_mrk,
      negative_marks: fieldsvalue?.negative_mrks,
      pass_percentage: fieldsvalue?.pass_percent_age,
      section_order: fieldsvalue?.section_order,
    };
    console.log(addnewsection);
    console.log(addnewsection);
    console.log(JSON.stringify(addnewsection));
    async function CreateSection() {
      const url = api_url.create_exam_section;
      const response = await post_api_request(url, addnewsection, headers);
      console.log(response);
      if (response.status === 201) {
        notification.success({
          message: 'Section Created Successfully',
        });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
        setShowAddNewSection(false);
        setrender(true + 1);
      } else if (response.status === 200) {
        notification.error({
          message: response?.data?.message,
        });
      } else {
        notification.error({ message: 'server error' });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      }
    }
    CreateSection();
  };

  const EditNewSection = fieldsvalue => {
    var activeswicth;

    if (EditActiveStatusSwitch1 == true) {
      activeswicth = 1;
    } else {
      activeswicth = 0;
    }
    var editnewsection = {
      exam_id: CourseID,
      name: fieldsvalue?.section_name,
      active: activeswicth,
      section_id: fieldsvalue?.section,
      duration: fieldsvalue?.duration_in_mintues,
      marks_for_correct_answers: fieldsvalue?.correct_answer_mrk,
      negative_marks: fieldsvalue?.negative_mrks,
      pass_percentage: fieldsvalue?.pass_percent_age,
      section_order: fieldsvalue?.section_order,
    };
    console.log(editnewsection);
    console.log(editnewsection);
    console.log(JSON.stringify(editnewsection));

    async function UpdatedSection() {
      console.log(updatedid?.[0]);
      const url = api_url.update_by_id + updatedid?.[0];
      const response = await put_api_request(url, editnewsection, headers);
      console.log(response);
      if (response.status === 201) {
        notification.success({
          message: 'Section Updated Successfully',
        });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
        setShowEditNewSection(false);
        setrender(true + 1);
      } else {
        notification.error({ message: 'server error' });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      }
    }
    UpdatedSection();
  };
  const handleDelete1 = id => {
    console.log(id);
    var deletedrowid = id;
    var column = 'id';
    async function deleteSectionData(id) {
      console.log(id);
      const url = api_url.delete_by_id + deletedrowid;
      console.log(url);
      const response = await delete_api_request(url, headers);
      console.log(response);

      if (response.status === 201) {
        notification.success({
          message: 'Section Deleted Successfully',
        });
        const afterdeletedata = SectionDatatable.filter(item => {
          if (column !== '') {
            return item[column] !== deletedrowid;
          }
          return item;
        });
        setScheduleData(afterdeletedata);
      } else if (response.status === 400) {
        alert(response.data.message);
      } else {
        alert('Error');
      }
      // });
    }
    deleteSectionData(id);
  };
  const CopyToClipboard = e => {
    const id = encrypttheid(e);
    console.log(domainpath);
    console.log(e);
    navigator.clipboard.writeText(`${domainpath}/dashboard/engage/create-exam`);
    notification.success({
      message: `Copied Successfully ${domainpath}/dashboard/engage/create-exam`,
    });
  };

  const columns = [
    {
      name: 'CODE',
      selector: row => (
        <>
          <p onClick={() => CopyToClipboard(row.id)}>
            <i class="fa fa-files-o" aria-hidden="true"></i> {'setsd_' + encrypttheid(row.id)}
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
      name: 'Type',
      selector: row => row.schedule_type,
      sortable: true,
    },
    {
      name: 'STARTS AT	',
      selector: row => (row.start_date ? moment(row.start_date).format('DD-MM-YYYY') : ''),
      sortable: true,
    },
    {
      name: 'ENDS AT	',
      selector: row => (row.end_date ? moment(row.end_date).format('DD-MM-YYYY') : ''),
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => (
        <>
          <span className={`status ${row.status == 1 ? 'Success' : 'error'}`}>
            {row.status == 1 ? 'Active' : 'Inactive'}
          </span>
        </>
      ),
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className="datatable-actions">
          <Select className="Quizz_actions" defaultValue="Actions" onSelect={e => HandleAction(e + ',' + row.id)}>
            <Option value={1}>Analytics</Option>
            <Option value={3}>Edit</Option>
            <Option value={4}>Delete</Option>
          </Select>
        </div>
      ),
    },
  ];
  const columns1 = [
    {
      name: '#',
      selector: row => row.section_order,
      sortable: true,
    },
    {
      name: 'Display Name	',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Section',
      selector: row => row.section_name,
      sortable: true,
    },
    {
      name: 'Total Questions',
      selector: row => row.total_questions,
      sortable: true,
    },
    {
      name: 'Total Duration	',
      selector: row => row.duration,
      sortable: true,
    },
    {
      name: 'Total Marks	',
      selector: row => row.marks_for_correct_answers,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => (
        <>
          <span className={`status ${row.active === '1' ? 'Success' : 'error'}`}>
            {row.active === '1' ? 'Publish' : 'Draft'}
          </span>
        </>
      ),
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className="datatable-actions">
          <Select className="Quizz_actions" defaultValue="Actions" onSelect={e => HandleAction1(e + ',' + row.id)}>
            <Option value={1}>Analytics</Option>
            <Option value={3}>Edit</Option>
            <Option value={4}>Delete</Option>
          </Select>
        </div>
      ),
    },
  ];

  /*=========================================ENDS */
  /*HANDLING DELETE A USER===================START */
  const handleDelete = id => {
    console.log(id);
    var deletedrowid = id;
    var column = 'id';
    async function deleteData(id) {
      console.log(id);
      const url = api_url.delete_scheduleby_id + id;
      console.log(url);
      const response = await delete_api_request(url, headers);
      console.log(response);

      if (response.status === 201) {
        notification.success({
          message: 'Schedule Deleted Successfully',
        });
        const afterdeletedata = ScheduleData.filter(item => {
          if (column !== '') {
            return item[column] !== deletedrowid;
          }
          return item;
        });
        setScheduleData(afterdeletedata);
      } else if (response.status === 400) {
        alert(response.data.message);
      } else {
        alert('Error');
      }
      // });
    }
    deleteData(id);
  };

  const AddQuizDetails = (fieldsvalue, name) => {
    if (CourseData) {
      var meta = {};
      var AddquizDetails = {
        title: SettingsData?.title,
        category_id: SettingsData?.category_id,
        exam_type: SettingsData?.exam_type,
        free: PaidAccess,
        points: AccessPoint,
        visibility: Visibility,
        active: status,
        redeem_points: SettingsData?.redeem,
        description: SettingsData?.description,
      };
      meta = {
        id: fieldsvalue?.id,
        durationModeAuto: fieldsvalue?.durationModeAuto,
        durationModeManual: fieldsvalue?.durationModeManual,
        marksModeAuto: fieldsvalue?.marksModeAuto,
        marksModeManual: fieldsvalue?.marksModeManual,
        negatineMarkingAuto: fieldsvalue?.negatineMarkingAuto,
        negatineMarkingManual: fieldsvalue?.negatineMarkingManual,
        pass_percentage: fieldsvalue?.pass_percentage,
        suffleQuestionAuto: fieldsvalue?.suffleQuestionAuto,
        suffleQuestionManual: fieldsvalue?.suffleQuestionManual,
        restrictAttemptAuto: fieldsvalue?.restrictAttemptAuto,
        restrictAttemptManual: fieldsvalue?.restrictAttemptManual,
        numberofAttempts: fieldsvalue?.numberofAttempts,
        dissableSectionAuto: fieldsvalue?.dissableSectionAuto,
        dissableSectionManual: fieldsvalue?.dissableSectionManual,
        dissableFinishButtonAuto: fieldsvalue?.dissableFinishButtonAuto,
        dissableFinishButtonManual: fieldsvalue?.dissableFinishButtonManual,
        enableQusetionListAuto: fieldsvalue?.enableQusetionListAuto,
        enableQusetionListManual: fieldsvalue?.enableQusetionListManual,
        hideSoluationsAuto: fieldsvalue?.hideSoluationsAuto,
        hideSoluationsManual: fieldsvalue?.hideSoluationsManual,
        showLeaderBoardAuto: fieldsvalue?.showLeaderBoardAuto,
        showLeaderBoardManual: fieldsvalue?.showLeaderBoardManual,
      };
      AddquizDetails['meta'] = meta;
    } else {
      var AddquizDetails = {
        title: SettingsData?.title,
        category_id: SettingsData?.category_id,
        exam_type: SettingsData?.exam_type,
        free: PaidAccess,
        points: AccessPoint,
        visibility: Visibility,
        active: status,
        redeem_points: SettingsData?.redeem,
        description: SettingsData?.description,
      };
    }

    if (CourseData) {
      async function UpdateExam() {
        const url = api_url.update_exam_byId + CourseID;
        // const response = await put_api_request(url, AddquizDetails, headers);
        const response = await put_api_request(url, headers);
        console.log(response);
        if (response.status === 201) {
          notification.success({
            message: 'Exam Updated Successfully',
          });
          setTimeout(() => {
            notification.destroy();
          }, 2000);
        } else {
          notification.error({ message: 'server error' });
          setTimeout(() => {
            notification.destroy();
          }, 2000);
        }
      }
      UpdateExam();
    } else {
      async function CreateQuiz() {
        const url = api_url.create_exam;
        console.log(headers);
        const response = await post_api_request(url, headers);
        // const response = await post_api_request(url, AddquizDetails, headers);
        console.log(response);
        if (response.status === 201) {
          notification.success({
            message: 'Exam Created Successfully',
          });
          const metadata = response?.data?.data[0];
          setCourseData(metadata);
          const Quiz_Id = response?.data?.data[0]?.id;
          setCourseID(Quiz_Id);
          console.log(Quiz_Id);
          setTimeout(() => {
            notification.destroy();
          }, 2000);
          if (name == 'details') {
            setShowTabPane({
              Settings: true,
            });
          }
        } else if (response.status === 200) {
          notification.error({
            message: response?.data?.message,
          });
        } else {
          notification.error({ message: 'server error' });
          setTimeout(() => {
            notification.destroy();
          }, 2000);
        }
      }
      CreateQuiz();
    }
    console.log(JSON.stringify(AddquizDetails));
    console.log(AddquizDetails);
  };
  const AddExamSettings = name => {
    var meta = {};
    console.log(CourseData);
    var Settingpayload = {
      title: CourseData?.title,
      category_id: CourseData?.category_id,
      exam_type: CourseData?.exam_type, //
      free: PaidAccess, //0
      points: AccessPoint, //0
      visibility: Visibility, //0
      active: status, //0
      redeem_points: CourseData?.redeem_points,
      description: CourseData?.description,
    };
    meta = {
      id: CourseID,
      settings: {
        durationModeAuto: SettingsData?.durationModeAuto,
        durationModeManual: SettingsData?.durationModeManual,
        marksModeAuto: SettingsData?.marksModeAuto,
        marksModeManual: SettingsData?.marksModeManual,
        negatineMarkingAuto: SettingsData?.negatineMarkingAuto,
        negatineMarkingManual: SettingsData?.negatineMarkingManual,
        pass_percentage: SettingsData?.pass_percentage,
        suffleQuestionAuto: SettingsData?.suffleQuestionAuto,
        suffleQuestionManual: SettingsData?.suffleQuestionManual,
        restrictAttemptAuto: SettingsData?.restrictAttemptAuto,
        restrictAttemptManual: SettingsData?.restrictAttemptManual,
        numberofAttempts: SettingsData?.numberofAttempts,
        dissableSectionAuto: SettingsData?.dissableSectionAuto,
        dissableSectionManual: SettingsData?.dissableSectionManual,
        dissableFinishButtonAuto: SettingsData?.dissableFinishButtonAuto,
        dissableFinishButtonManual: SettingsData?.dissableFinishButtonManual,
        enableQusetionListAuto: SettingsData?.enableQusetionListAuto,
        enableQusetionListManual: SettingsData?.enableQusetionListManual,
        hideSoluationsAuto: SettingsData?.hideSoluationsAuto,
        hideSoluationsManual: SettingsData?.hideSoluationsManual,
        showLeaderBoardAuto: SettingsData?.showLeaderBoardAuto,
        showLeaderBoardManual: SettingsData?.showLeaderBoardManual,
      },
    };
    Settingpayload['meta'] = meta;
    console.log(Settingpayload);
    console.log(SettingsData);
    async function UpdateExamSettingById() {
      const url = api_url.update_exam_byId + CourseID;
      const response = await put_api_request(url, Settingpayload, headers);
      console.log(response);

      if (response.status === 201) {
        notification.success({
          message: 'Exam Settings Updated Successfully',
        });
        if (name == 'settings') {
          setShowTabPane({
            Detail: false,
            Settings: false,
            Sections: true,
            Questions: false,
            Schedules: false,
            ExamDetails: false,
            ExamSettings: false,
            ExamSections: true,
            ExamQuestions: false,
            ExamSchedules: false,
          });
          setActiveSection(true);
          setActiveDetails(false);
          setActiveSetting(false);
          setActivesolution(false);
          setActiveAttachment(false);
        }
        console.log(response);
        const metadata = response?.data?.responsedata;
        console.log(metadata);
        setMetaId(metadata);
      } else {
        notification.error({ message: response?.message });
      }
    }
    UpdateExamSettingById();
  };

  /**QUESTION SECTION===========================================STARTS */
  const AddQuestionByID = e => {
    var addQuestion = {
      exam_id: CourseID,
      questions: e,
    };

    async function AddQuizQuestion() {
      const url = api_url.addexam_question;
      const response = await post_api_request(url, addQuestion, headers);
      console.log(response);
      if (response.status === 201) {
        notification.success({
          message: 'Question Added Successfully',
        });
      } else {
        notification.error({ message: 'Server Error' });
      }
    }
    AddQuizQuestion();
    getaddedquestions();
  };
  async function getaddedquestions() {
    const url = api_url.getexam_question + CourseID;
    const response = await get_api_request(url, headers);
    if (response.status == 200) {
      console.log(response);
      const ViewQuestionData = response.data.responsedata;
      var changedviewarray = ViewQuestionData?.map(item => {
        if (item?.options) {
          var options = JSON.parse(item?.options);
          item.options = options;
        }
        return item;
      });
      var QuestionIds = ViewQuestionData?.map(item => {
        return item.question_id;
      });
      setAddedQuestion(QuestionIds);
      setViewquestionsData(changedviewarray);
    } else {
      console.log('error');
    }
  }

  const RemoveQuestionByID = e => {
    const exam_id = CourseID;
    const examID = CourseID;
    const qustID = e;
    const connect_ID = examID + '/' + qustID;
    const url = api_url.getexam_question + connect_ID;
    console.log(url);
    async function deleteData(e) {
      const url = api_url.getexam_question + connect_ID;

      const response = await delete_api_request(url, headers);
      console.log(response);
      if (response.status === 201) {
        notification.success({
          message: 'Question Removed Successfully',
        });
        setrender(true + 1);
        getaddedquestions();
      }
    }
    deleteData(e);
  };

  /**SEARCH QUESTION===========================================================STARTS **/
  const Getlevelsid = (e, id) => {
    if (e.target.checked == true) {
      LevelArray.push(id);
    } else if (e.target.checked == false) {
      delete LevelArray[id];
      const filteredPeople = LevelArray.filter(item => item !== id);
      setLevelArray(filteredPeople);
    }
  };
  const GetQuestiontypeid = (e, id) => {
    if (e.target.checked == true) {
      SeacrhArray.push(id);
    } else if (e.target.checked == false) {
      delete SeacrhArray[id];
      const filteredPeople = SeacrhArray.filter(item => item !== id);
      setSeacrhArray(filteredPeople);
    }
  };
  useEffect(() => {}, [RenderSearchQuestionData]);
  const SearchQuestion = fieldsvalue => {
    const DifficultyLevel = LevelArray.join(',');
    const Type = SeacrhArray.join(',');
    console.log(FilterData);
    var payload = {
      code: FilterData?.by_code,
      section: FilterData?.by_section,
      skill: FilterData?.by_skill,
      type: Type,
      topic: FilterData?.by_topic,
      difficulty_level: DifficultyLevel,
    };
    console.log(payload);
    async function GetSearchQuestion() {
      const url = api_url.search_question;
      const response = await post_api_request(url, payload, headers);
      if (response.status == 200) {
        const searchedQuestionsData = response?.data?.data;
        console.log(searchedQuestionsData);
        if (searchedQuestionsData.length > 0) {
          var changedviewarray = searchedQuestionsData?.map(item => {
            if (item?.options) {
              var options = JSON.parse(item?.options);
              item.options = options;
            }
            return item;
          });
          // setQuestionSearchData(searchedQuestionsData);
          setallquestions(changedviewarray);
          setRenderSearchQuestionData(RenderSearchQuestionData + 1);
          setShowQuestions({
            ViewQuestion: false,
            AddQuestion: true,
          });
        } else {
          notification.error({
            message: 'No Data Found',
          });
        }
      } else {
        console.log('error');
      }
    }
    GetSearchQuestion();
  };
  /**SEARCH QUESTION===========================================================ENDS **/

  return (
    <>
      <Main className="exampage">
        <section className="SectionTabsMainTop exampage">
          {/* <div
            data-aos="fade-down"
            data-aos-offset="10"
            data-aos-delay="50"
            data-aos-duration="1500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
          > */}
          <Cards>
            {/* <Row gutter={30}>
              <Col md={18} xs={24}> */}
            <div className="SectionTabs_Main">
              <div id="SectionTabsGeneral" className="SectionTabsInner">
                {ShowTabPane?.ExamDetails == true ? (
                  <p>
                    <b>Course Details</b>
                  </p>
                ) : (
                  ''
                )}
                {ShowTabPane?.ExamSettings == true ? (
                  <p>
                    <b>Course Settings</b>
                  </p>
                ) : (
                  ''
                )}
                {ShowTabPane?.ExamSections == true ? (
                  <p>
                    <b>Course Sections</b>
                    <br />
                  </p>
                ) : (
                  ''
                )}
                {ShowTabPane?.ExamQuestions == true ? (
                  <p>
                    <b>Course Questions</b>
                    <br />
                  </p>
                ) : (
                  ''
                )}
                {ShowTabPane?.ExamSchedules == true ? (
                  <p>
                    <b>Course Schedule</b>
                  </p>
                ) : (
                  ''
                )}
                <div className="practicebuttons">
                  <button
                    id="Details"
                    className={ActiveDetails ? 'practice-tabpane' : ''}
                    onClick={() => {
                      setShowTabPane({
                        Detail: true,
                        Settings: false,
                        Sections: false,
                        Questions: false,
                        Schedules: false,
                        ExamDetails: true,
                        ExamSettings: false,
                        ExamSections: false,
                        ExamQuestions: false,
                        ExamSchedules: false,
                      });
                      setActiveDetails(true);
                      setActiveSetting(false);
                      setActivesolution(false);
                      setActiveAttachment(false);
                      setActiveSection(false);
                    }}
                    data-rowid={'0'}
                  >
                    <span>1</span> Details
                  </button>
                  {/* <button
                    id="Settings"
                    data-rowid={'1'}
                    className={ActiveSetting ? 'practice-tabpane' : ''}
                    onClick={e => {
                      CourseID
                        ? setShowTabPane({
                            Detail: false,
                            Settings: true,
                            Sections: false,
                            Questions: false,
                            Schedules: false,
                            ExamDetails: false,
                            ExamSettings: true,
                            ExamSections: false,
                            ExamQuestions: false,
                            ExamSchedules: false,
                          })
                        : '';
                      setActiveDetails(false);
                      setActiveSetting(true);
                      setActivesolution(false);
                      setActiveAttachment(false);
                      setActiveSection(false);
                    }}
                  >
                    <span>2</span> Settings
                  </button> */}
                  {/* <button
                    id="Sections"
                    data-rowid={'2'}
                    className={ActiveSection ? 'practice-tabpane' : ''}
                    onClick={e => {
                      CourseID
                        ? setShowTabPane({
                            Detail: false,
                            Settings: false,
                            Sections: true,
                            Questions: false,
                            Schedules: false,
                            ExamDetails: false,
                            ExamSettings: false,
                            ExamSections: true,
                            ExamQuestions: false,
                            ExamSchedules: false,
                          })
                        : '';
                      setActiveDetails(false);
                      setActiveSetting(false);
                      setActivesolution(false);
                      setActiveAttachment(false);
                      setActiveSection(true);
                    }}
                  >
                    <span>3</span> Sections
                  </button> */}
                  {/* <button
                    id="Questions"
                    data-rowid={'3'}
                    className={Activesolution ? 'practice-tabpane' : ''}
                    onClick={e => {
                      CourseID
                        ? setShowTabPane({
                            Detail: false,
                            Settings: false,
                            Sections: false,
                            Questions: true,
                            Schedules: false,
                            ExamDetails: false,
                            ExamSettings: false,
                            ExamSections: false,
                            ExamQuestions: true,
                            ExamSchedules: false,
                          })
                        : '';
                      setActiveDetails(false);
                      setActiveSetting(false);
                      setActivesolution(true);
                      setActiveAttachment(false);
                      setActiveSection(false);
                    }}
                  >
                    <span>4</span> Questions
                  </button> */}
                  <button
                    id="Schedules"
                    data-rowid={'4'}
                    className={ActiveAttachment ? 'practice-tabpane' : ''}
                    onClick={e => {
                      CourseID
                        ? setShowTabPane({
                            Detail: false,
                            Settings: false,
                            Sections: false,
                            Questions: false,
                            Schedules: true,
                            ExamDetails: false,
                            ExamSettings: false,
                            ExamSections: false,
                            ExamQuestions: false,
                            ExamSchedules: true,
                          })
                        : '';
                      setActiveDetails(false);
                      setActiveSetting(false);
                      setActivesolution(false);
                      setActiveAttachment(true);
                      setActiveSection(false);
                    }}
                  >
                    <span>5</span> Schedules
                  </button>
                </div>
              </div>
            </div>
            {/* </Col>
            </Row> */}
          </Cards>
          {/* </div> */}

          {ShowTabPane?.Detail == true ? (
            <>
              <Main>
                <Cards>
                  <Form
                    form={AddForm}
                    name="sDash_validation-form"
                    layout="vertical"
                    onFinish={() => AddQuizDetails('details')}
                  >
                    <Row gutter={30} className="skillrow mb-space">
                      <Col md={18} xs={24} className="skillrow-inner mBottom">
                        <Form.Item
                          name="title"
                          label="Course Title"
                          rules={[
                            {
                              required: true,
                              message: 'Tittle is required !',
                            },
                            { max: 50, message: 'Max 50 characters allowed!' },
                            {
                              pattern: /^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/,
                              message: 'Letters allowed only with space inbetween',
                            },
                          ]}
                        >
                          <Input
                            placeholder="title"
                            name="title"
                            onChange={selectedValue => {
                              setSettingsData({ ...SettingsData, title: selectedValue.target.value });
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={18} xs={24} className="skillrow-inner mBottom">
                        <Form.Item
                          name="topic"
                          label="Topic To Cover"
                          rules={[
                            {
                              required: true,
                              message: 'topic is required !',
                            },
                          ]}
                        >
                          <Select
                            style={{ width: '100%' }}
                            classNamePrefix="select"
                            isSearchable={true}
                            arrayDatasubcategory={arrayDatasubcategory}
                            onChange={selectedValue => {
                              setSettingsData({ ...SettingsData, category_id: selectedValue });
                            }}
                          >
                            {arrayDatasubcategory != null
                              ? arrayDatasubcategory.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                              : ''}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={18} xs={24} className="skillrow-inner mBottom">
                        <Form.Item
                          name="skill"
                          label="Skill"
                          rules={[
                            {
                              required: true,
                              message: 'skill is required !',
                            },
                          ]}
                        >
                          <Select
                            style={{ width: '100%' }}
                            classNamePrefix="select"
                            isSearchable={true}
                            arrayDatasubcategory={arrayDatasubcategory}
                            onChange={selectedValue => {
                              setSettingsData({ ...SettingsData, category_id: selectedValue });
                            }}
                          >
                            {arrayDatasubcategory != null
                              ? arrayDatasubcategory.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                              : ''}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={18} xs={24} className="skillrow-inner mBottom">
                        <Form.Item
                          name="content"
                          label="Content"
                          rules={[
                            {
                              required: true,
                              message: 'Content is required !',
                            },
                          ]}
                        >
                          <Select
                            style={{ width: '100%' }}
                            classNamePrefix="select"
                            isSearchable={true}
                            arrayDatasubcategory={arrayDatasubcategory}
                            onChange={selectedValue => {
                              setSettingsData({ ...SettingsData, category_id: selectedValue });
                            }}
                          >
                            {arrayDatasubcategory != null
                              ? arrayDatasubcategory.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                              : ''}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={18} xs={24} className="skillrow-inner mBottom">
                        <Form.Item name="video" label="Video">
                          <Input
                            className="videolink_input"
                            type="text"
                            placeholder="Enter Your Video Link"
                            //   defaultValue={Meta?.video_link}
                            //   onChange={e => setMeta({ ...Meta, video_link: e.target.value })}
                          ></Input>
                          <Button className="videopreview">
                            {' '}
                            <FeatherIcon size={17} icon="play" />
                            Preview
                          </Button>
                        </Form.Item>
                      </Col>
                      <Row gutter={30}>
                        <Col md={18} xs={24} className="skillrow-inner mBottom">
                          <Row gutter={30} className="switchToggle ExamSwitchToggle">
                            <Col md={20} className="toggleCol">
                              <p>
                                <b>Paid </b> <br />
                                Paid (Accessible to only paid users). Free (Anyone can access).
                              </p>
                            </Col>
                            <Col md={2}>
                              <Switch onChange={e => handleswitch(e)} checked={PaidAccess} />
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      {showsolutionvalue == true ? (
                        <>
                          <Row gutter={30}>
                            <Col md={18} xs={24} className="skillrow-inner mBottom">
                              <Row gutter={30} className="switchToggle ExamSwitchToggle">
                                <Col md={20} className="toggleCol">
                                  <p>
                                    <b>Can access with Points (Yes) </b> <br />
                                    Yes (User should redeem with points to access course). No (Anyone can access).
                                  </p>
                                </Col>
                                <Col md={2}>
                                  <Switch onChange={e => handleredeem(e)} checked={AccessPoint} />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        ''
                      )}
                      {showredeemvalue == true ? (
                        <Row gutter={30} id="required_points">
                          <Col md={18} xs={24} className="skillrow-inner mBottom">
                            <Form.Item
                              name="redeem"
                              label="Points Required to Redeem"
                              rules={[
                                {
                                  required: true,
                                  message: 'Points is required !',
                                },
                              ]}
                            >
                              <Input
                                name="redeem"
                                type="number"
                                placeholder="Enter Point Required"
                                onChange={selectedValue => {
                                  setSettingsData({ ...SettingsData, redeem: selectedValue.target.value });
                                }}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      ) : (
                        ''
                      )}
                      <Row gutter={30}>
                        <Col md={18} xs={24} className="skillrow-inner mBottom">
                          <Form.Item name="description" label="Description">
                            <Editor
                              name="description"
                              onChange={selectedValue => {
                                setSettingsData({ ...SettingsData, description: selectedValue.html });
                              }}
                              // value={cssvalue}
                              tools={[
                                [Bold, Italic, Underline, Strikethrough],
                                [Subscript, Superscript],

                                [OrderedList, UnorderedList],

                                [InsertTable, InsertImage],
                              ]}
                              contentStyle={{
                                height: 430,
                              }}
                              // className="k-icon k-i-loading"
                              // defaultContent={cssvalue}
                              // onChange={handleCSS}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={30}>
                        <Col md={18} xs={24} className="skillrow-inner mBottom">
                          <Row gutter={30} className="switchToggle ExamSwitchToggle">
                            <Col md={20} className="toggleCol">
                              <p>
                                <b>Visibility - Public</b> <br /> Private (Only scheduled user groups can access).
                                Public (Anyone can access).
                              </p>
                            </Col>
                            <Col md={2}>
                              <Switch onChange={e => visibility(e)} checked={Visibility} />
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      <Row gutter={30}>
                        <Col md={18} xs={24} className="skillrow-inner mBottom">
                          <Row gutter={30} className="switchToggle ExamSwitchToggle">
                            <Col md={20} className="toggleCol">
                              <p>
                                <b>Status - Draft</b>
                                <br /> Private (Published (Shown Everywhere). Draft (Not Shown).)
                              </p>
                            </Col>
                            <Col md={2}>
                              <Switch onChange={e => visibilitystatus(e)} checked={status} />
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      <Col md={18} xs={24} className="skillrow-inner">
                        <div className="add-details-bottom text-right">
                          <Button htmlType="submit" type="success" size="default" className="btn-animation">
                            Save & Proceed
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Cards>
              </Main>
            </>
          ) : (
            ''
          )}
          {/* {ShowTabPane?.Settings == true ? (
      
            <Cards>
              {' '}
              <>
                <Main className="Settings_form_main">
                  <Form className="Settings_form" onFinish={() => AddExamSettings('settings')}>
                    <Row className="Main_division">
                      <Col md={12} className="First_Division">
                        <Col md={24} className="Switches_main">
                          <Col md={12} className="info">
                            <b>
                              <label>Duration Mode</label>{' '}
                            </b>
                            <i class="fa fa-info-circle" aria-hidden="true"></i>
                            <div id="showinfo">
                              <b>
                                <span className="Hover_text">Auto</span>
                              </b>{' '}
                              -Duration will be calculated based on questions' default time.
                              <br />
                              <b>
                                <span className="Hover_text">Manual</span>
                              </b>{' '}
                              - Duration will be considered as specified.
                            </div>
                          </Col>
                          <Col md={12}>
                            {' '}
                            <div className="video_buttons">
                              <Button
                                value={1}
                                className={isActive ? 'bg-salmon' : ''}
                                onClick={() => {
                                  setIsActive(current => !current);
                                  setActive(false);
                                  setSettingsData({
                                    ...SettingsData,
                                    durationModeAuto: true,
                                    durationModeManual: false,
                                  });
                                }}
                              >
                                Auto
                              </Button>
                              <Button
                                value={2}
                                className={Active ? 'bg-salmon' : ''}
                                onClick={() => {
                                  setIsActive(false);
                                  setActive(current => !current);
                                  setSettingsData({
                                    ...SettingsData,
                                    durationModeManual: true,
                                    durationModeAuto: false,
                                  });
                                }}
                              >
                                Manual
                              </Button>
                            </div>
                          </Col>
                        </Col>

                        <Col md={24} className="Switches_main">
                          <Col md={12} className="info">
                            <b>
                              <label>Marks/Points Mode</label>{' '}
                            </b>
                            <i class="fa fa-info-circle" aria-hidden="true"></i>
                            <div id="showinfo">
                              <b>
                                <span className="Hover_text">Auto</span>
                              </b>{' '}
                              -Marks/Points will be calculated based on questions' default marks.
                              <br />
                              <b>
                                <span className="Hover_text">Manual</span>
                              </b>{' '}
                              - Marks/Points will be assigned to each question as specified.
                            </div>
                          </Col>
                          <Col md={12}>
                            {' '}
                            <div className="video_buttons">
                              <Button
                                value={1}
                                className={IsActiveMarks ? 'bg-salmon' : ''}
                                onClick={() => {
                                  setIsActiveMarks(current => !current);
                                  setActiveMarks(false);
                                  setSettingsData({ ...SettingsData, marksModeAuto: true, marksModeManual: false });
                                }}
                              >
                                Auto
                              </Button>
                              <Button
                                value={2}
                                className={ActiveMarks ? 'bg-salmon' : ''}
                                onClick={() => {
                                  setIsActiveMarks(false);
                                  setActiveMarks(current => !current);
                                  setSettingsData({ ...SettingsData, marksModeManual: true, marksModeAuto: false });
                                }}
                              >
                                Manual
                              </Button>
                            </div>
                          </Col>
                        </Col>

                        <Col md={24} className="Switches_main">
                          <Col md={12} className="info">
                            <b>
                              <label>Negative Marking</label>{' '}
                            </b>
                            <i class="fa fa-info-circle" aria-hidden="true"></i>
                            <div id="showinfo">
                              <b>
                                <span className="Hover_text">Yes</span>
                              </b>{' '}
                              - Negative marking will be considered as specified.
                              <br />
                              <b>
                                <span className="Hover_text">No</span>
                              </b>{' '}
                              - No Negative marking.
                            </div>
                          </Col>
                          <Col md={12}>
                            {' '}
                            <div className="video_buttons">
                              <Button
                                value={1}
                                className={IsNegative ? 'bg-salmon' : ''}
                                onClick={() => {
                                  setIsNegative(current => !current);
                                  setNegative(false);

                                  setSettingsData({
                                    ...SettingsData,
                                    negatineMarkingAuto: true,
                                    negatineMarkingManual: false,
                                  });
                                }}
                              >
                                Yes
                              </Button>
                              <Button
                                value={2}
                                className={Negative ? 'bg-salmon' : ''}
                                onClick={() => {
                                  setIsNegative(false);
                                  setNegative(current => !current);
                                  setSettingsData({
                                    ...SettingsData,
                                    negatineMarkingManual: true,
                                    negatineMarkingAuto: false,
                                  });
                                }}
                              >
                                No
                              </Button>
                            </div>
                          </Col>
                        </Col>
                        <Col md={24}>
                          <b>
                            {' '}
                            <label>Overall Pass Percentage</label>
                          </b>
                          <Form.Item
                            name="pass_percentage"
                            rules={[
                              {
                                required: true,
                                message: 'Overall Percentage are required',
                              },
                            ]}
                          >
                            <Input
                              placeholder="60%"
                              value={SettingsData?.pass_percentage}
                              onChange={selectedValue => {
                                setSettingsData({ ...SettingsData, pass_percentage: selectedValue.target.value });
                              }}
                            />
                          </Form.Item>
                        </Col>
                      </Col>
                      <Col md={12} className="Second_Division">
                        <Row gutter={30}>
                          <Col md={24} className="Switches_main">
                            <Col md={12} className="Shuffle">
                              <b>
                                <label>Shuffle Questions</label>{' '}
                              </b>
                              <i class="fa fa-info-circle" aria-hidden="true"></i>
                              <div id="showinfo">
                                <b>
                                  <span className="Hover_text">Yes</span>
                                </b>{' '}
                                -Questions will be shuffled for each attempt.
                                <br />
                                <b>
                                  <span className="Hover_text">No</span>
                                </b>{' '}
                                - Questions will not be shuffled.
                              </div>
                            </Col>
                            <Col md={12}>
                              {' '}
                              <div className="video_buttons">
                                <Button
                                  value={1}
                                  className={IsShuffle ? 'bg-salmon' : ''}
                                  onClick={() => {
                                    setIsShuffle(current => !current);
                                    setShuffle(false);
                                    setSettingsData({
                                      ...SettingsData,
                                      suffleQuestionAuto: true,
                                      suffleQuestionManual: false,
                                    });
                                  }}
                                >
                                  Yes
                                </Button>
                                <Button
                                  value={2}
                                  className={Shuffle ? 'bg-salmon' : ''}
                                  onClick={() => {
                                    setIsShuffle(false);
                                    setShuffle(current => !current);
                                    setSettingsData({
                                      ...SettingsData,
                                      suffleQuestionManual: true,
                                      suffleQuestionAuto: false,
                                    });
                                  }}
                                >
                                  No
                                </Button>
                              </div>
                            </Col>
                          </Col>
                          <Col md={24} className="Switches_main">
                            <Col md={12} className="Restrict">
                              <b>
                                <label>Restrict Attempts</label>{' '}
                              </b>
                              <i class="fa fa-info-circle" aria-hidden="true"></i>
                              <div id="showinfo">
                                <b>
                                  <span className="Hover_text">Yes</span>
                                </b>{' '}
                                -Attempts will be restricted as specified.
                                <br />
                                <b>
                                  <span className="Hover_text">No</span>
                                </b>{' '}
                                - Unlimited attempts.
                              </div>
                            </Col>
                            <Col md={12}>
                              {' '}
                              <div className="video_buttons">
                                <Button
                                  value={1}
                                  className={IsRestrict ? 'bg-salmon' : ''}
                                  onClick={() => {
                                    setIsRestrict(current => !current);
                                    setRestrict(false);

                                    setSettingsData({
                                      ...SettingsData,
                                      restrictAttemptAuto: true,
                                      restrictAttemptManual: false,
                                    });
                                    setRestrictAttempts(true);
                                  }}
                                >
                                  Yes
                                </Button>
                                <Button
                                  value={2}
                                  id="No"
                                  className={Restrict ? 'bg-salmon' : ''}
                                  onClick={() => {
                                    setIsRestrict(false);
                                    setRestrict(current => !current);
                                    setSettingsData({
                                      ...SettingsData,
                                      restrictAttemptManual: true,
                                      restrictAttemptAuto: false,
                                    });
                                    setRestrictAttempts(false);
                                  }}
                                >
                                  No
                                </Button>
                              </div>
                            </Col>
                          </Col>
                          <Col md={12}></Col>
                        </Row>
                        {RestrictAttempts != false ? (
                          <Col md={24}>
                            <b>
                              {' '}
                              <label>Number of Attempts</label>
                            </b>
                            <Form.Item
                              name="attempts"
                              rules={[
                                {
                                  required: true,
                                  message: 'Number of Attempts is required',
                                },
                              ]}
                            >
                              <Input
                                type="text"
                                placeholder="Enter Number)"
                                value={SettingsData?.numberofAttempts}
                                onChange={selectedValue => {
                                  setSettingsData({ ...SettingsData, numberofAttempts: selectedValue.target.value });
                                }}
                              />
                            </Form.Item>
                          </Col>
                        ) : (
                          ''
                        )}

                        <Col md={24} className="Switches_main">
                          <Col md={12} className="info">
                            <b>
                              <label>Disable Section Navigation</label>
                            </b>
                            <i class="fa fa-info-circle" aria-hidden="true"></i>
                            <div id="showinfo">
                              <b>
                                <span className="Hover_text">Yes</span>
                              </b>{' '}
                              -Section navigation will be disabled during exam.
                              <br />
                              <b>
                                <span className="Hover_text">No</span>
                              </b>{' '}
                              - Test takers can navigate sections during exam.
                            </div>
                          </Col>
                          <Col md={12}>
                            {' '}
                            <div className="video_buttons">
                              <Button
                                value={1}
                                className={IsDisable ? 'bg-salmon' : ''}
                                onClick={() => {
                                  setIsDisable(current => !current);
                                  setDisable(false);

                                  setSettingsData({
                                    ...SettingsData,
                                    dissableSectionAuto: true,
                                    dissableSectionManual: false,
                                  });
                                }}
                              >
                                Yes
                              </Button>
                              <Button
                                value={2}
                                id="No"
                                className={Disable ? 'bg-salmon' : ''}
                                onClick={() => {
                                  setIsDisable(false);
                                  setDisable(current => !current);
                                  setSettingsData({
                                    ...SettingsData,
                                    dissableSectionManual: true,
                                    dissableSectionAuto: false,
                                  });
                                }}
                              >
                                No
                              </Button>
                            </div>
                          </Col>
                        </Col>

                        <Col md={24} className="Switches_main">
                          <Col md={12} className="info">
                            <b>
                              <label>Disable Finish Button</label>
                            </b>
                            <i class="fa fa-info-circle" aria-hidden="true"></i>
                            <div id="showinfo">
                              <b>
                                <span className="Hover_text">Yes</span>
                              </b>{' '}
                              -Test Finish button will be disabled.
                              <br />
                              <b>
                                <span className="Hover_text">No</span>
                              </b>{' '}
                              - Test Finish button will be displayed.
                            </div>
                          </Col>
                          <Col md={12}>
                            {' '}
                            <div className="video_buttons">
                              <Button
                                value={1}
                                className={IsDisable1 ? 'bg-salmon' : ''}
                                onClick={() => {
                                  setIsDisable1(current => !current);
                                  setDisable1(false);

                                  setSettingsData({
                                    ...SettingsData,
                                    dissableFinishButtonAuto: true,
                                    dissableFinishButtonManual: false,
                                  });
                                }}
                              >
                                Yes
                              </Button>
                              <Button
                                value={2}
                                id="No"
                                className={Disable1 ? 'bg-salmon' : ''}
                                onClick={() => {
                                  setIsDisable1(false);
                                  setDisable1(current => !current);
                                  setSettingsData({
                                    ...SettingsData,
                                    dissableFinishButtonManual: true,
                                    dissableFinishButtonAuto: false,
                                  });
                                }}
                              >
                                No
                              </Button>
                            </div>
                          </Col>
                        </Col>
                        <Col md={24} className="Switches_main">
                          <Col md={12} className="info">
                            <b>
                              <label>Enable Question List View</label>
                            </b>
                            <i class="fa fa-info-circle" aria-hidden="true"></i>
                            <div id="showinfo">
                              <b>
                                <span className="Hover_text">Yes</span>
                              </b>{' '}
                              -User can be able to see all questions as list.
                              <br />
                              <b>
                                <span className="Hover_text">No</span>
                              </b>{' '}
                              - User cannot be able to see all questions as list.
                            </div>
                          </Col>
                          <Col md={12}>
                            {' '}
                            <div className="video_buttons">
                              <Button
                                value={1}
                                className={IsEnable ? 'bg-salmon' : ''}
                                onClick={() => {
                                  setIsEnable(current => !current);
                                  setEnable(false);

                                  setSettingsData({
                                    ...SettingsData,
                                    enableQusetionListAuto: true,
                                    enableQusetionListManual: false,
                                  });
                                }}
                              >
                                Yes
                              </Button>
                              <Button
                                value={2}
                                id="No"
                                className={Enable ? 'bg-salmon' : ''}
                                onClick={() => {
                                  setIsEnable(false);
                                  setEnable(current => !current);
                                  setSettingsData({
                                    ...SettingsData,
                                    enableQusetionListManual: true,
                                    enableQusetionListAuto: false,
                                  });
                                }}
                              >
                                No
                              </Button>
                            </div>
                          </Col>
                        </Col>
                        <Col md={24} className="Switches_main">
                          <Col md={12} className="info">
                            <b>
                              <label>Hide Solutions</label>
                            </b>
                            <i class="fa fa-info-circle" aria-hidden="true"></i>
                            <div id="showinfo">
                              <b>
                                <span className="Hover_text">Yes</span>
                              </b>{' '}
                              -Solutions will not be shown in results.
                              <br />
                              <b>
                                <span className="Hover_text">No</span>
                              </b>{' '}
                              - Solutions will be shown in results.
                            </div>
                          </Col>
                          <Col md={12}>
                            {' '}
                            <div className="video_buttons">
                              <Button
                                value={1}
                                className={IsHide ? 'bg-salmon' : ''}
                                onClick={() => {
                                  setIsHide(current => !current);
                                  setHide(false);

                                  setSettingsData({
                                    ...SettingsData,
                                    hideSoluationsAuto: true,
                                    hideSoluationsManual: false,
                                  });
                                }}
                              >
                                Yes
                              </Button>
                              <Button
                                value={2}
                                id="No"
                                className={Hide ? 'bg-salmon' : ''}
                                onClick={() => {
                                  setIsHide(false);
                                  setHide(current => !current);
                                  setSettingsData({
                                    ...SettingsData,
                                    hideSoluationsManual: true,
                                    hideSoluationsAuto: false,
                                  });
                                }}
                              >
                                No
                              </Button>
                            </div>
                          </Col>
                        </Col>
                        <Col md={24} className="Switches_main">
                          <Col md={12} className="info">
                            <b>
                              <label>Show Leaderboard</label>
                            </b>
                            <i class="fa fa-info-circle" aria-hidden="true"></i>
                            <div id="showinfo">
                              <b>
                                <span className="Hover_text">Yes</span>
                              </b>{' '}
                              -Leaderboard will be shown to test takers.
                              <br />
                              <b>
                                <span className="Hover_text">No</span>
                              </b>{' '}
                              - Leaderboard will not be shown to test takers.
                            </div>
                          </Col>
                          <Col md={12}>
                            {' '}
                            <div className="video_buttons">
                              <Button
                                value={1}
                                className={IsShow ? 'bg-salmon' : ''}
                                onClick={() => {
                                  setIsShow(current => !current);
                                  setShow(false);

                                  setSettingsData({
                                    ...SettingsData,
                                    showLeaderBoardAuto: true,
                                    showLeaderBoardManual: false,
                                  });
                                }}
                              >
                                Yes
                              </Button>
                              <Button
                                value={2}
                                id="No"
                                className={Show ? 'bg-salmon' : ''}
                                onClick={() => {
                                  setIsShow(false);
                                  setShow(current => !current);
                                  setSettingsData({
                                    ...SettingsData,
                                    showLeaderBoardManual: true,
                                    showLeaderBoardAuto: false,
                                  });
                                }}
                              >
                                No
                              </Button>
                            </div>
                          </Col>
                        </Col>
                      </Col>
                    </Row>

                    <Col md={24} xs={24}>
                      <div className="add-details-bottom text-right">
                        <Button htmlType="submit" type="success" size="default" className="btn-animation">
                          Update
                        </Button>
                      </div>
                    </Col>
                  </Form>
                </Main>
              </>
            </Cards>
          ) : (
       
            ''
          )} */}
          {/* {ShowTabPane?.Sections == true ? (
            <Cards>
              <>
                <Main className="Sections_form_main">
                  <div
                    key="1"
                    className="page-header-actions"
                    style={{ marginTop: '16px', justifyContent: 'space-between' }}
                  >
                    <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}></h1>
                    <div className="importNewBTN">
                      <Button onClick={() => setShowAddNewSection(true)} size="small" key="4" type="success">
                        <FeatherIcon icon="plus" size={14} />
                        Add Section
                      </Button>
                    </div>
                  </div>
                  <br />{' '}
                  <DataTable
                    className="tableHeading"
                    columns={columns1}
                    data={SectionDatatable}
                    defaultSortField="id"
                    defaultSortAsc={false}
                    pagination
                    highlightOnHover
                  />
                  {ShowAddNewSection != false ? (
                    <div className="AddnewUser contactCard customCard">
                      <Form
                        name="sDash_validation-form"
                        className="AddForm contactForm"
                        form={AddSection}
                        layout="vertical"
                        onFinish={AddNewSection}
                      >
                        <div className="headerDiv">
                          <p>New Section</p>
                          <div className="crossIcon">
                            <a onClick={() => setShowAddNewSection(false)}>X</a>
                          </div>
                        </div>
                        <Row gutter={30} className="AddQuizTpe_main" style={{ marginTop: ' 10px' }}>
                          <Col className="AddQuizTpe" md={24} xs={24}>
                            <Row gutter={30} className="New_section">
                              <Col md={24} xs={24}>
                                <b>
                                  <label>Display Name</label>
                                </b>
                                <Form.Item
                                  name="section_name"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Name is required.',
                                    },
                                  ]}
                                >
                                  <Input
                                    type="text"
                                    placeholder="Enter Name"
                                    onChange={selectedValue => {
                                      setaddsectionData({ ...addsectionData, section_name: selectedValue });
                                    }}
                                  ></Input>
                                </Form.Item>
                              </Col>
                              <Col md={24} xs={24}>
                                <b>
                                  <label>Section</label>
                                </b>
                                <Form.Item
                                  name="section"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Section is required.',
                                    },
                                  ]}
                                >
                                  <Select
                                    style={{ width: '100%' }}
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    SectionArray={SectionArray}
                                    onChange={selectedValue => {
                                      setaddsectionData({ ...addsectionData, section: selectedValue });
                                    }}
                                  >
                                    {SectionArray != null
                                      ? SectionArray.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                                      : ''}
                                  </Select>
                                </Form.Item>
                              </Col>
                              {SettingsData?.durationModeAuto == false ? (
                                <Col md={24} xs={24}>
                                  <b>
                                    <label>Duration (Minutes)</label>
                                  </b>
                                  <Form.Item
                                    name="duration_in_mintues"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Section Order is required.',
                                      },
                                    ]}
                                  >
                                    <Input
                                      type="number"
                                      placeholder="Enter Order"
                                      onChange={selectedValue => {
                                        setaddsectionData({ ...addsectionData, duration_in_mintues: selectedValue });
                                      }}
                                    ></Input>
                                  </Form.Item>
                                </Col>
                              ) : (
                                ''
                              )}
                              {SettingsData?.marksModeAuto == false ? (
                                <Col md={24} xs={24}>
                                  <b>
                                    <label>Marks for Correct Answer</label>
                                  </b>
                                  <Form.Item
                                    name="correct_answer_mrk"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Section Order is required.',
                                      },
                                    ]}
                                  >
                                    <Input
                                      type="number"
                                      placeholder="Enter Order"
                                      onChange={selectedValue => {
                                        setaddsectionData({ ...addsectionData, correct_answer_mrk: selectedValue });
                                      }}
                                    ></Input>
                                  </Form.Item>
                                </Col>
                              ) : (
                                ''
                              )}
                              {SettingsData?.negatineMarkingAuto == true ? (
                                <Col md={24} className="Switches_main">
                                  <Col md={12} className="info">
                                    <b>
                                      <label>Negative Marking Type</label>{' '}
                                    </b>
                                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                                    <div id="showinfo">
                                      <b>
                                        <span className="Hover_text">Fixed</span>
                                      </b>{' '}
                                      - Fixed amount will be deduct from question marks.
                                      <br />
                                      <b>
                                        <span className="Hover_text">Percentage</span>
                                      </b>{' '}
                                      - Percentage will be deduct from question marks.
                                    </div>
                                  </Col>
                                  <Col md={12}>
                                    <div className="video_buttons">
                                      <Button
                                        value={1}
                                        className={SettingsData?.negatineMarkingAuto == true ? 'bg-salmon' : ''}
                                        onClick={() => {
                                          setIsNegative(current => !current);
                                          setNegative(false);

                                          setaddsectionData({
                                            ...addsectionData,
                                            negatineMarkingAuto: true,
                                            negatineMarkingManual: false,
                                          });
                                        }}
                                      >
                                        Fixed
                                      </Button>
                                      <Button
                                        value={2}
                                        className={SettingsData?.negatineMarkingManual == true ? 'bg-salmon' : ''}
                                        onClick={() => {
                                          setIsNegative(false);
                                          setNegative(current => !current);
                                          setaddsectionData({
                                            ...addsectionData,
                                            negatineMarkingManual: true,
                                            negatineMarkingAuto: false,
                                          });
                                        }}
                                      >
                                        Percentage
                                      </Button>
                                    </div>
                                  </Col>
                                </Col>
                              ) : (
                                ''
                              )}
                              {SettingsData?.negatineMarkingAuto == true ? (
                                <Col md={24} xs={24}>
                                  <b>
                                    <label>Negative Marks</label>
                                  </b>
                                  <Form.Item
                                    name="negative_mrks"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Negative Marks is required.',
                                      },
                                    ]}
                                  >
                                    <Input
                                      type="number"
                                      placeholder="Enter Order"
                                      onChange={selectedValue => {
                                        setaddsectionData({ ...addsectionData, negative_mrks: selectedValue });
                                      }}
                                    ></Input>
                                  </Form.Item>
                                </Col>
                              ) : (
                                ''
                              )}
                              <Col md={24} xs={24}>
                                <b>
                                  <label>Pass Percentage</label>
                                </b>
                                <Form.Item
                                  name="pass_percent_age"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Pass Percentage is required.',
                                    },
                                  ]}
                                >
                                  <Input
                                    type="number"
                                    placeholder="Enter Order"
                                    onChange={selectedValue => {
                                      setaddsectionData({ ...addsectionData, pass_percent_age: selectedValue });
                                    }}
                                  ></Input>
                                </Form.Item>
                              </Col>
                              <Col md={24} xs={24}>
                                <b>
                                  <label>Section Order</label>
                                </b>
                                <Form.Item
                                  name="section_order"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Section Order is required.',
                                    },
                                  ]}
                                >
                                  <Input
                                    type="number"
                                    placeholder="Enter Order"
                                    onChange={selectedValue => {
                                      setaddsectionData({ ...addsectionData, section_order: selectedValue });
                                    }}
                                  ></Input>
                                </Form.Item>
                              </Col>

                              <Col md={20}>
                                <Form.Item>
                                  <p>
                                    <b>Status - Draft</b>
                                    <br /> Private (Published (Shown Everywhere). Draft (Not Shown).)
                                  </p>
                                </Form.Item>
                              </Col>
                              <Col md={4}>
                                <Form.Item name="active" label="Status">
                                  <Switch onChange={() => setActivesectinSwitch(!ActivesectinSwitch)} />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Col>
                        </Row>

                        <Row gutter={30} className="Addgroupbtn">
                          <Col md={24} xs={24}>
                            <Form.Item>
                              <Button htmlType="submit">Create</Button>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  ) : (
                    ''
                  )}
                  {ShowEditNewSection != false ? (
                    <div className="AddnewUser contactCard customCard">
                      <Form
                        name="sDash_validation-form"
                        className="AddForm contactForm"
                        form={EditSection}
                        layout="vertical"
                        onFinish={EditNewSection}
                      >
                        <div className="headerDiv">
                          <p>Edit Section</p>
                          <div className="crossIcon">
                            <a onClick={() => setShowEditNewSection(false)}>X</a>
                          </div>
                        </div>
                        <Row gutter={30} className="AddQuizTpe_main" style={{ marginTop: ' 10px' }}>
                          <Col className="AddQuizTpe" md={24} xs={24}>
                            <Row gutter={30} className="New_section">
                              <Col md={24} xs={24}>
                                <b>
                                  <label>Display Name</label>
                                </b>
                                <Form.Item
                                  name="section_name"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Name is required.',
                                    },
                                  ]}
                                >
                                  <Input
                                    type="text"
                                    placeholder="Enter Name"
                                    onChange={selectedValue => {
                                      seteditsectionData({ ...editsectionData, section_name: selectedValue });
                                    }}
                                  ></Input>
                                </Form.Item>
                              </Col>
                              <Col md={24} xs={24}>
                                <b>
                                  <label>Section</label>
                                </b>
                                <Form.Item
                                  name="section"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Section is required.',
                                    },
                                  ]}
                                >
                                  <Select
                                    style={{ width: '100%' }}
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    SectionArray={SectionArray}
                                    onChange={selectedValue => {
                                      seteditsectionData({ ...editsectionData, section: selectedValue });
                                    }}
                                  >
                                    {SectionArray != null
                                      ? SectionArray.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                                      : ''}
                                  </Select>
                                </Form.Item>
                              </Col>
                              {SettingsData?.durationModeAuto == false ? (
                                <Col md={24} xs={24}>
                                  <b>
                                    <label>Duration (Minutes)</label>
                                  </b>
                                  <Form.Item
                                    name="duration_in_mintues"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Section Order is required.',
                                      },
                                    ]}
                                  >
                                    <Input
                                      type="number"
                                      placeholder="Enter Order"
                                      onChange={selectedValue => {
                                        seteditsectionData({ ...editsectionData, duration_in_mintues: selectedValue });
                                      }}
                                    ></Input>
                                  </Form.Item>
                                </Col>
                              ) : (
                                ''
                              )}
                              {SettingsData?.marksModeAuto == false ? (
                                <Col md={24} xs={24}>
                                  <b>
                                    <label>Marks for Correct Answer</label>
                                  </b>
                                  <Form.Item
                                    name="correct_answer_mrk"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Section Order is required.',
                                      },
                                    ]}
                                  >
                                    <Input
                                      type="number"
                                      placeholder="Enter Order"
                                      onChange={selectedValue => {
                                        seteditsectionData({ ...editsectionData, correct_answer_mrk: selectedValue });
                                      }}
                                    ></Input>
                                  </Form.Item>
                                </Col>
                              ) : (
                                ''
                              )}
                              {SettingsData?.negatineMarkingAuto == true ? (
                                <Col md={24} className="Switches_main">
                                  <Col md={12} className="info">
                                    <b>
                                      <label>Negative Marking Type</label>{' '}
                                    </b>
                                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                                    <div id="showinfo">
                                      <b>
                                        <span className="Hover_text">Fixed</span>
                                      </b>{' '}
                                      - Fixed amount will be deduct from question marks.
                                      <br />
                                      <b>
                                        <span className="Hover_text">Percentage</span>
                                      </b>{' '}
                                      - Percentage will be deduct from question marks.
                                    </div>
                                  </Col>
                                  <Col md={12}>
                                    <div className="video_buttons">
                                      <Button
                                        value={1}
                                        className={SettingsData?.negatineMarkingAuto == true ? 'bg-salmon' : ''}
                                        onClick={() => {
                                          setIsNegative(current => !current);
                                          setNegative(false);

                                          seteditsectionData({
                                            ...editsectionData,
                                            negatineMarkingAuto: true,
                                            negatineMarkingManual: false,
                                          });
                                        }}
                                      >
                                        Fixed
                                      </Button>
                                      <Button
                                        value={2}
                                        className={SettingsData?.negatineMarkingManual == true ? 'bg-salmon' : ''}
                                        onClick={() => {
                                          setIsNegative(false);
                                          setNegative(current => !current);
                                          seteditsectionData({
                                            ...editsectionData,
                                            negatineMarkingManual: true,
                                            negatineMarkingAuto: false,
                                          });
                                        }}
                                      >
                                        Percentage
                                      </Button>
                                    </div>
                                  </Col>
                                </Col>
                              ) : (
                                ''
                              )}
                              {SettingsData?.negatineMarkingAuto == true ? (
                                <Col md={24} xs={24}>
                                  <b>
                                    <label>Negative Marks</label>
                                  </b>
                                  <Form.Item
                                    name="negative_mrks"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Negative Marks is required.',
                                      },
                                    ]}
                                  >
                                    <Input
                                      type="number"
                                      placeholder="Enter Order"
                                      onChange={selectedValue => {
                                        seteditsectionData({ ...editsectionData, negative_mrks: selectedValue });
                                      }}
                                    ></Input>
                                  </Form.Item>
                                </Col>
                              ) : (
                                ''
                              )}
                              <Col md={24} xs={24}>
                                <b>
                                  <label>Pass Percentage</label>
                                </b>
                                <Form.Item
                                  name="pass_percent_age"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Pass Percentage is required.',
                                    },
                                  ]}
                                >
                                  <Input
                                    type="number"
                                    placeholder="Enter Order"
                                    onChange={selectedValue => {
                                      seteditsectionData({ ...editsectionData, pass_percent_age: selectedValue });
                                    }}
                                  ></Input>
                                </Form.Item>
                              </Col>
                              <Col md={24} xs={24}>
                                <b>
                                  <label>Section Order</label>
                                </b>
                                <Form.Item
                                  name="section_order"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Section Order is required.',
                                    },
                                  ]}
                                >
                                  <Input
                                    type="number"
                                    placeholder="Enter Order"
                                    onChange={selectedValue => {
                                      seteditsectionData({ ...editsectionData, section_order: selectedValue });
                                    }}
                                  ></Input>
                                </Form.Item>
                              </Col>
                              <Col md={20}>
                                <Form.Item>
                                  <p>
                                    <b>Status - Draft</b>
                                    <br /> Private (Published (Shown Everywhere). Draft (Not Shown).)
                                  </p>
                                </Form.Item>
                              </Col>
                              <Col md={4}>
                                <Form.Item name="active" label="Status">
                                  <Switch
                                    onChange={() => setEditActiveStatusSwitch1(!EditActiveStatusSwitch1)}
                                    checked={EditActiveStatusSwitch1}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Col>
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
                </Main>
              </>
            </Cards>
          ) : (
            ''
          )} */}
          {/* {ShowTabPane?.Questions == true ? (
            <div
              data-aos="fade-up"
              data-aos-offset="10"
              data-aos-delay="50"
              data-aos-duration="1500"
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
                            <i className="fa fa-filter" aria-hidden="true"></i>
                            <b>Filters</b>
                          </Col>
                          <Col md={24}>
                            <b>
                              <label>Code</label>
                            </b>
                            <FormItem name="by_code">
                              <Input
                                placeholder="Enter Code"
                                onChange={selectedValue => {
                                  setFilterData({ ...FilterData, by_code: selectedValue.target.value });
                                }}
                              />
                            </FormItem>
                          </Col>
                          <Col md={24}>
                            <b>
                              <label>Type</label>
                            </b>
                          </Col>
                          <Col md={24} className="by_type_div">
                            <FormItem name="by_type">
                              <Col md={2} className="type_checkboxes">
                                {QuestionTypeData?.map((item, i) => (
                                  <Input
                                    type="checkbox"
                                    checked={item['checked']}
                                    value={item?.id}
                                    onChange={e => GetQuestiontypeid(e, item?.id)}
                                  />
                                ))}
                              </Col>
                              <Col md={22} className="type_name">
                                {QuestionTypeData?.map((item, i) => (
                                  <label>{item?.name}</label>
                                ))}
                              </Col>
                            </FormItem>
                          </Col>
                          <Col md={24}>
                            <b>
                              <label>Section</label>
                            </b>
                            <FormItem name="by_section">
                              <Select
                                isSearchable={true}
                                filtersectionData={filtersectionData}
                                onChange={selectedValue => {
                                  setFilterData({ ...FilterData, by_section: selectedValue });
                                }}
                              >
                                {filtersectionData != null
                                  ? filtersectionData.map((item, index) => (
                                      <Option value={item.id}>{item.name} </Option>
                                    ))
                                  : ''}
                              </Select>
                            </FormItem>
                          </Col>
                          <Col md={24}>
                            <b>
                              <label>Skill</label>
                            </b>
                            <FormItem name="by_skill" placeholder="Enter Skill">
                              <Select
                                isSearchable={true}
                                SkillsData={SkillsData}
                                onChange={selectedValue => {
                                  setFilterData({ ...FilterData, by_skill: selectedValue });
                                }}
                              >
                                {SkillsData != null
                                  ? SkillsData.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                                  : ''}
                              </Select>
                            </FormItem>
                          </Col>
                          <Col md={24}>
                            <b>
                              <label>Topic</label>
                            </b>
                            <FormItem name="by_topic">
                              <Select
                                isSearchable={true}
                                filtertopicData={filtertopicData}
                                onChange={selectedValue => {
                                  setFilterData({ ...FilterData, by_topic: selectedValue });
                                }}
                              >
                                {filtertopicData != null
                                  ? filtertopicData.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                                  : ''}
                              </Select>
                            </FormItem>
                          </Col>
                          
                          <Col md={24}>
                            <b>
                              <label>Difficulty_level</label>
                            </b>
                          </Col>
                          <Col md={24} className="by_difficulty_div">
                            <FormItem name="by_difficulty_Level">
                              <Col md={2} className="level_checkboxes">
                                {levelsData?.map((item, i) => (
                                  <Input
                                    type="checkbox"
                                    checked={item['checked']}
                                    value={item?.id}
                                    onChange={e => Getlevelsid(e, item?.id)}
                                  />
                                ))}
                              </Col>
                              <Col md={22} className="level_name">
                                {levelsData?.map((item, i) => (
                                  <label>{item?.name}</label>
                                ))}
                              </Col>
                            </FormItem>
                          </Col>
                          <Col md={24} className="Reset_FirstDivision">
                            <Button
                              size="small"
                              type="dark"
                              className="btn-animation"
                              onClick={() => {
                                setrender(render + 1);
                                FilterForm.resetFields();
                              }}
                            >
                              Reset
                            </Button>

                            <Button
                              size="small"
                              type="success"
                              className="btn-animation"
                              htmlType="submit"
                              onClick={() => SearchQuestion()}
                            >
                              Search
                            </Button>
                          </Col>
                        </Col>
                        <Col md={14} className="Question_second_division">
                          <Col md={24} className="Select_Questions">
                            {ShowQuestions?.ViewQuestion == true ? <h3>Currently Viewing Questions</h3> : ''}
                            {ShowQuestions?.AddQuestion == true ? <h3>Currently Adding Questions</h3> : ''}
                            <b>
                              <a
                                href="#"
                                onClick={e =>
                                  setShowQuestions({
                                    ViewQuestion: true,
                                    AddQuestion: false,
                                  })
                                }
                              >
                                {' '}
                                View Questions
                              </a>
                            </b>{' '}
                            |{' '}
                            <b>
                              <a
                                href="#"
                                onClick={e =>
                                  setShowQuestions({
                                    ViewQuestion: false,
                                    AddQuestion: true,
                                  })
                                }
                              >
                                Add Questions
                              </a>
                            </b>
                          </Col>

                          <b>
                            <p className="Questions_tag">6 items found for the selected criteria.</p>
                          </b>

                          
                          {ShowQuestions?.ViewQuestion == true
                            ? ViewquestionsData?.map((item, i) => (
                                <Cards style={{ borderBottom: '5px solid black' }}>
                                  <p
                                    className="examtype"
                                    style={{ color: 'rgb(81 157 119', background: '#a4f7ce', width: 'fit-content' }}
                                  >
                                    Decimals, Percents, Fractions
                                  </p>
                                  <p>
                                    <b>Topic Name:</b>
                                    {item?.topic_name}
                                  </p>
                                  <img src="" alt="" />
                                  <p>
                                    <b>Skill Name :</b>
                                    {item?.skill_name}
                                  </p>
                                  <p>
                                    <b>Question:</b>
                                    {item?.questions}
                                  </p>
                                  {sidebaroptions != true ? (
                                    <a className="options-text" onClick={() => setsidebaroptions(true)}>
                                      View Options
                                    </a>
                                  ) : (
                                    ''
                                  )}
                                  {sidebaroptions != false ? (
                                    <>
                                      {item?.options?.map(item => (
                                        <input style={{ Width: '100%' }} value={item?.value} readOnly />
                                      ))}
                                      <br />
                                      <a className="options-text" onClick={() => setsidebaroptions(false)}>
                                        Hide Options
                                      </a>
                                    </>
                                  ) : (
                                    ''
                                  )}
                                  <p>
                                    <b>Questions Type:</b>
                                    {item.question_type}
                                  </p>
                                  <p>
                                    <b>Difficulty Level:</b>
                                    {item.difficulty_level}
                                  </p>
                                  <p>
                                    <b>Marks/Points:</b>
                                    {item.marks_point}
                                  </p>
                                  <p>
                                    <b>Attachments:</b>
                                    {item.attachments}
                                  </p>
                                  <Col md={24} className="Unique_code_button">
                                    {' '}
                                    <p className="Unique_code">que_fr0AtnREMHp</p>
                                    <Button
                                      size="small"
                                      type="danger"
                                      className="btn-animation"
                                      onClick={e => RemoveQuestionByID(item?.question_id)}
                                    >
                                      REMOVE
                                    </Button>
                                  </Col>
                                </Cards>
                              ))
                            : ''}

                       

                          {ShowQuestions?.AddQuestion == true
                            ? allquestions?.map((item, i) => (
                                <Cards style={{ borderBottom: '5px solid black' }}>
                                  <p
                                    className="examtype"
                                    style={{ color: 'rgb(81 157 119', background: '#a4f7ce', width: 'fit-content' }}
                                  >
                                    Decimals, Percents, Fractions
                                  </p>
                                  {AddedQuestion.includes(item.id) ? (
                                    <div style={{ float: 'right', background: 'darkgreen', color: 'white' }}>
                                      Already Added
                                    </div>
                                  ) : (
                                    ''
                                  )}
                                  <p>
                                    <b>Topic Name:</b>
                                    {item?.topic_name}
                                  </p>
                                  <img src="" alt="" />
                                  <p>
                                    <b>Skill Name :</b>
                                    {item?.skill_name}
                                  </p>
                                  <p>
                                    <b>Question:</b>
                                    {item?.questions}
                                  </p>
                                  {sidebaroptions != true ? (
                                    <a className="options-text" onClick={() => setsidebaroptions(true)}>
                                      View Options
                                    </a>
                                  ) : (
                                    ''
                                  )}
                                  {sidebaroptions != false ? (
                                    <>
                                      {item?.options?.map(item => (
                                        <input style={{ Width: '100%' }} value={item?.value} readOnly />
                                      ))}

                                      <br />
                                      <a className="options-text" onClick={() => setsidebaroptions(false)}>
                                        Hide Options
                                      </a>
                                    </>
                                  ) : (
                                    ''
                                  )}
                                  <p>
                                    <b>Questions Type:</b>
                                    {item.question_type}
                                  </p>
                                  <p>
                                    <b>Difficulty Level:</b>
                                    {item.difficulty_level}
                                  </p>
                                  <p>
                                    <b>Marks/Points:</b>
                                    {item.marks_point}
                                  </p>
                                  <p>
                                    <b>Attachments:</b>
                                    {item.attachments}
                                  </p>
                                  <Col md={24} className="Unique_code_button">
                                    {' '}
                                    <p className="Unique_code">que_fr0AtnREMHp</p>
                                    {AddedQuestion.includes(item.id) ? (
                                      <Button
                                        size="small"
                                        type="danger"
                                        className="btn-animation"
                                        onClick={e => RemoveQuestionByID(item?.id)}
                                      >
                                        REMOVE
                                      </Button>
                                    ) : (
                                      <Button
                                        htmlType="submit"
                                        size="small"
                                        type="success"
                                        onClick={() => AddQuestionByID(item?.id)}
                                      >
                                        ADD
                                      </Button>
                                    )}
                                  </Col>
                                  <hr></hr>
                                </Cards>
                              ))
                            : ''}
                        </Col>
                      </Row>
                    </Form>
                  </Main>
                </>
              </Cards>
            </div>
          ) : (
            ''
          )} */}
          {ShowTabPane?.Schedules == true ? (
            <div
              data-aos="fade-up"
              data-aos-offset="10"
              data-aos-delay="50"
              data-aos-duration="1500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="top-center"
            >
              <Cards>
                {' '}
                <>
                  <Main className="Schedule_form_main">
                    <div
                      key="1"
                      className="page-header-actions"
                      style={{ marginTop: '16px', justifyContent: 'space-between' }}
                    >
                      <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Exam Schedules</h1>
                      <div className="importNewBTN">
                        <Button
                          onClick={() => setShowAddNewQuizType(true)}
                          size="small"
                          key="4"
                          type="success"
                          className="btn-animation"
                        >
                          <FeatherIcon icon="plus" size={14} />
                          NEW SCHEDULE
                        </Button>
                      </div>
                    </div>
                    <br />{' '}
                    <DataTable
                      className="tableHeading"
                      columns={columns}
                      data={ScheduleData}
                      defaultSortField="id"
                      defaultSortAsc={false}
                      pagination
                      highlightOnHover
                    />
                  </Main>

                  {ShowAddNewQuizType != false ? (
                    <div className="AddnewUser contactCard customCard">
                      <Form
                        name="sDash_validation-form"
                        className="AddForm contactForm"
                        form={form}
                        layout="vertical"
                        onFinish={AddNewSchedule}
                      >
                        <div className="headerDiv">
                          <p>New Schedule</p>
                          <div className="crossIcon">
                            <a onClick={() => setShowAddNewQuizType(false)}>X</a>
                          </div>
                        </div>
                        <Row gutter={30} className="AddQuizTpe_main" style={{ marginTop: ' 10px' }}>
                          <Col className="AddQuizTpe" md={24} xs={24}>
                            <Row gutter={30}>
                              <Col md={24} xs={24}>
                                <b>
                                  <label>Schedule Type Name</label>
                                </b>
                                <Form.Item name="schedule_type">
                                  <input
                                    type="radio"
                                    id="html"
                                    name="fav_language"
                                    value="HTML"
                                    onChange={e => {
                                      setsettingData({ ...settingData, flex: false, fixed: true });
                                      setShowStartTimeFields(false);
                                    }}
                                  />
                                   <label for="html">Fixed</label> {' '}
                                  <input
                                    type="radio"
                                    id="css"
                                    name="fav_language"
                                    value="CSS"
                                    onChange={e => {
                                      setsettingData({ ...settingData, flex: true, fixed: false });
                                      setShowStartTimeFields(true);
                                    }}
                                  />
                                   <label for="css">Flexible</label>
                                </Form.Item>
                              </Col>

                              <Col md={24} xs={24} className="Date_time_picker">
                                <Col md={12} xs={24}>
                                  <b>
                                    {' '}
                                    <label>Start Date</label>
                                  </b>
                                  <Form.Item name="start_date">
                                    <DatePicker
                                      minDate={new Date()}
                                      selected={startDate}
                                      onChange={date => setStartDate(date)}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col md={12} xs={24}>
                                  <b>
                                    <label>Start Time</label>
                                  </b>
                                  <Form.Item name="start_time">
                                    <TimePicker
                                      selected={StartTime}
                                      onChange={date => {
                                        setStartTime(date);
                                        // form.resetFields(['end_date']);
                                        // form.setFieldsValue({ end_date: '' });
                                        // setEndDate();
                                      }}
                                    />
                                  </Form.Item>
                                </Col>
                              </Col>
                              {ShowStartTimeFields != false ? (
                                <Col md={24} xs={24} className="Date_time_picker">
                                  <Col md={12} xs={24}>
                                    <b>
                                      <label>End Date</label>
                                    </b>
                                    <Form.Item name="end_date">
                                      <DatePicker
                                        minDate={startDate}
                                        selected={EndDate}
                                        onChange={date => setEndDate(date)}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col md={12} xs={24}>
                                    <b>
                                      <label>End Time</label>
                                    </b>
                                    <Form.Item name="end_time">
                                      <TimePicker selected={EndTime} onChange={date => setEndTime(date)} />
                                    </Form.Item>
                                  </Col>
                                </Col>
                              ) : (
                                ''
                              )}
                              <Col md={24} xs={24}>
                                <b>
                                  <label>Grace Period to Join (Minutes)</label>
                                </b>
                                <Form.Item
                                  name="grace_period_to_join"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'The grace period field is required.',
                                    },
                                  ]}
                                >
                                  <Input type="number" placeholder="Enter Grace Period"></Input>
                                </Form.Item>
                              </Col>
                              <Col md={24} xs={24}>
                                <b>
                                  <label>Schedule to User Groups</label>
                                </b>
                                <Form.Item
                                  name="schedule_to_group"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Select Schedule to User Groups',
                                    },
                                  ]}
                                >
                                  <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    arrayDataUsergroup={arrayDataUsergroup}
                                    //onSelect={GetPosition}
                                  >
                                    {arrayDataUsergroup != null
                                      ? arrayDataUsergroup.map((item, index) => (
                                          <Option value={item.id}>{item.name} </Option>
                                        ))
                                      : ''}
                                  </Select>
                                </Form.Item>
                              </Col>
                              {console.log(arrayDataUser, 'arrayDataUser')}
                              <Col md={24} xs={24}>
                                <b>
                                  <label>Schedule to Individuel</label>
                                </b>
                                <Form.Item
                                  name="schedule_to_individual"
                                  //label="Schedule to Individuel"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Select Schedule to Individuel',
                                    },
                                  ]}
                                >
                                  <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    arrayDataUser={arrayDataUser}
                                    //onSelect={GetPosition}
                                  >
                                    {arrayDataUser != null
                                      ? arrayDataUser.map((item, index) => (
                                          <Option value={item.id}>{item.name} </Option>
                                        ))
                                      : ''}
                                  </Select>
                                </Form.Item>
                              </Col>

                              {/* <Col md={24} xs={24}>
                                <b>
                                  <label>Schedule to Individuel</label>
                                </b>
                                {console.log(arrayDataUser, 'arrayDataUser')}
                                <Form.Item
                                  name="schedule_to_individual"
                                 
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Select Schedule to Individuel',
                                    },
                                  ]}
                                >
                                  <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    arrayDataUser={arrayDataUser}
                                 
                                  >
                                    {arrayDataUser != null
                                      ? arrayDataUser.map((item, index) => (
                                          <Option value={item.id}>{item.name} </Option>
                                        ))
                                      : ''}
                                  </Select>
                                </Form.Item>
                              </Col> */}
                              <Col md={24}>
                                <div className="togglefield" style={{ width: '94%' }}>
                                  <Col md={24} xs={24}>
                                    <Form.Item name="active" initialValue="" label="Active">
                                      <p name="">Active (Shown Everywhere). In-active (Hidden Everywhere).</p>
                                    </Form.Item>
                                  </Col>
                                  <div className="switchToggle">
                                    <Switch onChange={() => setActiveStatusSwitch(!ActiveStatusSwitch)} />
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>

                        <Row gutter={30} className="Addgroupbtn">
                          <Col md={24} xs={24}>
                            <Form.Item>
                              <Button
                                htmlType="submit"
                                //onClick={scheduleCreate}
                              >
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

                  {ShowEditNewQuizType != false ? (
                    <div className="AddnewUser contactCard customCard">
                      <Form
                        name="sDash_validation-form"
                        className="AddForm contactForm"
                        form={EditScheduleForm}
                        layout="vertical"
                        onFinish={EditNewSchedule}
                      >
                        <div className="headerDiv">
                          <p>Edit Schedule</p>
                          <div className="crossIcon">
                            <a onClick={() => setShowEditNewQuizType(false)}>X</a>
                          </div>
                        </div>
                        <Row gutter={30} className="AddQuizTpe_main" style={{ marginTop: ' 10px' }}>
                          <Col className="AddQuizTpe" md={24} xs={24}>
                            <Row gutter={30}>
                              <Col md={24} xs={24}>
                                <b>
                                  <label>Schedule Type Name</label>
                                </b>
                                <Form.Item name="schedule_type">
                                  <Input
                                    name="fixed"
                                    type="radio"
                                    id="fixed"
                                    checked={settingData?.editfixed}
                                    placeholder="Schedule_Type"
                                    onChange={e => {
                                      setsettingData({ ...settingData, editflex: false, editfixed: true });
                                    }}
                                  />
                                  <label className="fixed_radio" for="fixed">
                                    {' '}
                                    Fixed
                                  </label>
                                  <Input
                                    name="fixed"
                                    id="flexi"
                                    type="radio"
                                    checked={settingData?.editflex}
                                    placeholder="Schedule_Type"
                                    onChange={e => {
                                      setsettingData({ ...settingData, editflex: true, editfixed: false });
                                    }}
                                  />
                                  <label className="fixed_radio" for="flexi">
                                    {' '}
                                    Flexible
                                  </label>
                                </Form.Item>
                              </Col>
                              <Col md={24} xs={24} className="Date_time_picker">
                                <Col md={12} xs={24}>
                                  <Form.Item name="start_date" label="Start Date">
                                    <DatePicker
                                      selected={settingData?.start_date}
                                      onChange={selectedValue => {
                                        setsettingData({ ...settingData, start_date: selectedValue });
                                      }}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col md={12} xs={24}>
                                  <Form.Item name="start_time" label="Start Time">
                                    <TimePicker
                                      // value={moment(settingData?.start_time).format('HH:mm:ss')}
                                      selected={moment(settingData?.start_time).format('HH:mm:ss')}
                                      onChange={selectedValue => {
                                        setsettingData({ ...settingData, start_time: selectedValue });
                                      }}
                                    />
                                  </Form.Item>
                                </Col>
                              </Col>
                              {settingData.editflex != false ? (
                                <Col md={24} xs={24} className="Date_time_picker">
                                  <Col md={12} xs={24}>
                                    <Form.Item name="end_date" label="End Date">
                                      <DatePicker
                                        minDate={settingData?.start_date}
                                        selected={settingData?.end_date}
                                        onChange={selectedValue => {
                                          setsettingData({ ...settingData, end_date: selectedValue });
                                        }}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col md={12} xs={24}>
                                    <Form.Item name="end_time" label="End Time">
                                      <TimePicker
                                        selected={settingData?.end_time}
                                        onChange={selectedValue => {
                                          setsettingData({ ...settingData, end_time: selectedValue });
                                        }}
                                      />
                                    </Form.Item>
                                  </Col>
                                </Col>
                              ) : (
                                ''
                              )}
                              <Col md={24} xs={24}>
                                <b>
                                  <label>Grace Period to Join (Minutes)</label>
                                </b>
                                <Form.Item
                                  name="grace_period_to_join"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'The grace period field is required.',
                                    },
                                  ]}
                                >
                                  <Input type="number" placeholder="Enter Grace Period"></Input>
                                </Form.Item>
                              </Col>
                              <Col md={24} xs={24}>
                                <Form.Item
                                  name="schedule_to_group"
                                  label="Schedule to User Groups"
                                  // rules={[
                                  //   {
                                  //     required: true,
                                  //     message: 'Select Schedule to User Groups',
                                  //   },
                                  // ]}
                                >
                                  <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    arrayDataUsergroup={arrayDataUsergroup}
                                    //onSelect={GetPosition}
                                  >
                                    {arrayDataUsergroup != null
                                      ? arrayDataUsergroup.map((item, index) => (
                                          <Option value={item.id}>{item.name} </Option>
                                        ))
                                      : ''}
                                  </Select>
                                </Form.Item>
                              </Col>
                              <Col md={24} xs={24}>
                                <b>
                                  <label>Schedule to Individuel</label>
                                </b>
                                <Form.Item
                                  name="schedule_to_individual"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Select Schedule to Individuel',
                                    },
                                  ]}
                                >
                                  <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    arrayDataUser={arrayDataUser}
                                    //onSelect={GetPosition}
                                  >
                                    {arrayDataUser != null
                                      ? arrayDataUser.map((item, index) => (
                                          <Option value={item.id}>{item.name} </Option>
                                        ))
                                      : ''}
                                  </Select>
                                </Form.Item>
                              </Col>
                              <Col md={24}>
                                <div className="togglefield" style={{ width: '94%' }}>
                                  <Col md={24} xs={24}>
                                    <Form.Item name="active" initialValue="" label="Active">
                                      <p name="">Active (Shown Everywhere). In-active (Hidden Everywhere).</p>
                                    </Form.Item>
                                  </Col>
                                  <div className="switchToggle">
                                    <Switch
                                      onChange={() => setEditActiveStatusSwitch(!EditActiveStatusSwitch)}
                                      checked={EditActiveStatusSwitch}
                                    />
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </Col>
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
              </Cards>
            </div>
          ) : (
            ''
          )}
        </section>
      </Main>
    </>
  );
};

export default CreateNewCourse;
