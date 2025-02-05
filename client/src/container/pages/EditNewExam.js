import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Tabs, Row, Input, Switch, Card, Spin } from 'antd';
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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-build-classic-mathtype';
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
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import AddSettings from './QuizTabs/SettingsTab';
import AddQuestions from './QuizTabs/QuestionsTab';
import AddSchedules from './QuizTabs/schedulesTab';
const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

var ModuleName = 'DASHBOARD';
const EditNewExam = () => {
  const [form] = Form.useForm();
  const [SettingForm] = Form.useForm();
  const [EditSection] = Form.useForm();
  const [EditScheuleForm] = Form.useForm();
  const [EditScheduleForm] = Form.useForm();
  const [EditForm] = Form.useForm();
  const [AddSection] = Form.useForm();
  const [FilterForm] = Form.useForm();
  const history = useHistory();
  const { TabPane } = Tabs;
  const location = useLocation();

  const [render, setrender] = useState(0);
  const [ScheduleData, setScheduleData] = useState([]);
  const [moduledataarray, setmoduledataarray] = useState();
  const [SectionData, setSectionData] = useState([]);
  const [SectionArray, setSectionArray] = useState(null);
  const [ActivesectinSwitch, setActivesectinSwitch] = useState();
  const [ActivesectinSwitch1, setActivesectinSwitch1] = useState();
  const [updatedid, setupdatedid] = useState([]);
  const [updatedSectionID, setupdatedSectionID] = useState([]);
  const [EditActiveStatusSwitch, setEditActiveStatusSwitch] = useState(false);
  const [arrayDataUsergroup, setarrayDataUsergroup] = useState(null);
  const [ExamTypeData, setExamTypeData] = useState([]);
  const [IsActiveMarks, setIsActiveMarks] = useState(false);
  const [Negative, setNegative] = useState(false);
  const [SectionDatatable, setSectionDatatable] = useState([]);
  const [IsNegative, setIsNegative] = useState(false);
  const [NegativeType, setNegativeType] = useState(false);
  const [IsNegativeType, setIsNegativeType] = useState(false);
  const [Shuffle, setShuffle] = useState(false);
  const [IsShuffle, setIsShuffle] = useState(false);
  const [ShowStartTimeFields, setShowStartTimeFields] = useState(true);
  const [Restrict, setRestrict] = useState(false);
  const [IsRestrict, setIsRestrict] = useState(false);
  const [SectionDataByID, setSectionDataByID] = useState();
  const [Disable, setDisable] = useState(false);
  const [IsDisable, setIsDisable] = useState(false);
  const [Enable, setEnable] = useState(false);
  const [IsEnable, setIsEnable] = useState(false);
  const [ActiveMarks, setActiveMarks] = useState(false);
  const [Hide, setHide] = useState(false);
  const [IsHide, setIsHide] = useState(false);
  const [Show, setShow] = useState(false);
  const [arrayDataUser, setarrayDataUser] = useState(null);
  const [IsShow, setIsShow] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [Active, setActive] = useState(false);

  const [quizupdatedid, setquizupdatedid] = useState([]);

  const [arrayDatasubcategory, setarrayDatasubcategory] = useState(null);

  const [sidebaroptions, setsidebaroptions] = useState(false);
  const [OptionLoading, setOptionLoading] = useState(false);
  const [add_sidebaroptions, setadd_sidebaroptions] = useState(false);
  const [add_OptionLoading, setadd_OptionLoading] = useState(false);

  const [startDate, setStartDate] = useState();
  const [StartTime, setStartTime] = useState();
  const [ActiveStatusSwitch, setActiveStatusSwitch] = useState(false);
  const [EditActiveSwitch, setEditActiveSwitch] = useState(false);
  const [EndDate, setEndDate] = useState();
  const [EndTime, setEndTime] = useState();
  const [ExamsettingById, setExamsettingById] = useState();
  const [ShowAddNewQuizType, setShowAddNewQuizType] = useState(false);
  const [ShowEditNewQuizType, setShowEditNewQuizType] = useState(false);
  const [Visibility, setVisibility] = useState();
  const [ShowAddNewSection, setShowAddNewSection] = useState(false);
  const [ShowEditNewSection, setShowEditNewSection] = useState(false);
  const [Render, setRender] = useState(0);
  const [Showscroeboard, setShowscroeboard] = useState(false);
  const [IsscroeboardShow, setIsscroeboardShow] = useState(false);
  const [settingData, setsettingData] = useState({
    fixed: false,
    flex: true,
    editfixed: false,
    editflex: false,
    end_time: '',
    end_date: '',
    start_time: '',
    start_date: '',
  });
  const [SettingsData, setSettingsData] = useState({
    free: '',
    visibility: '',
    active: '',
    redeem_points: '',
    points: '',
    description: '',
    terms_condition: '',
    exam_type: '',
    category_id: '',
    title: '',
    created_by: '',
    price: '',
    dissableFinishButtonAuto: true,
    dissableFinishButtonManual: false,
    dissableSectionAuto: '',
    dissableSectionManual: true,
    durationModeAuto: true,
    durationModeManual: false,
    enableQusetionListAuto: '',
    enableQusetionListManual: true,
    hideSoluationsAuto: '',
    hideSoluationsManual: true,
    marksModeAuto: true,
    marksModeManual: '',
    negatineMarkingAuto: '',
    negatineMarkingManual: true,
    numberofAttempts: '', //
    pass_percentage: '', //
    restrictAttemptAuto: '',
    restrictAttemptManual: true,
    showLeaderBoardAuto: '',
    showLeaderBoardManual: true,
    suffleQuestionAuto: '',
    suffleQuestionManual: true,
    showScoreBoardAuto: '',
    showScoreBoardManual: '',
  });

  const [ShowTabPane, setShowTabPane] = useState({
    Detail: true,
    Settings: false,
    Questions: false,
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

  const [EditFormDate, setEditFormDate] = useState({
    startDate: '',
    endDate: '',
  });

  /**QUESTION **/
  const [ViewquestionsData, setViewquestionsData] = useState([]);
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
  const [AllInstructor, setAllInstructor] = useState([]);
  const StatusVisibility = e => {
    if (e == true) {
      setVisibility(1);
    } else {
      setVisibility(0);
    }
  };

  const params = useParams();
  const id = decodetheid(params.id);

  //Handle Created Section for Questions
  const [SelectedSectionID, setSelectedSectionID] = useState();

  //Loading
  const [loading, setLoading] = useState(false);
  var updateids;

  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);
  var RoleName = userDetail?.sessdata?.user?.[0]?.user_role;
  var RoleID = userDetail?.sessdata?.user?.[0]?.user_role_id;

  useEffect(() => {
    if (location?.state == 'schedule') {
      setShowTabPane({
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
      });
      setActiveAttachment(true);
    }
    // else {
    //   setActiveDetails(true);
    // }
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

    async function GetAllInstructors() {
      const url = api_url.get_allInstructor;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const usersdata = response?.data?.responsedata;
        setAllInstructor(usersdata);
      } else {
        console.log('error');
      }
    }
    GetAllInstructors();

    async function GetAllSections() {
      const url = api_url.get_section;
      const response = await get_api_request(url, headers);

      console.log(response);
      if (response.status == 200) {
        const SectionDATA = response?.data?.responsedata;

        const sectionArray = SectionDATA.map(item => {
          return { id: item.id, name: item.section_name };
        });
        setSectionArray(sectionArray);
      } else {
        console.log('error');
      }
    }
    GetAllSections();

    console.log(id);
    async function GetAllSchedules() {
      const url = api_url.get_schedules_by_event_id + id + '/' + '30';
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const SchedulesData = response?.data?.data;
        const d = new Date(SchedulesData[0].end_date);
        var datestring = d.getMonth() + 1 + '-' + d.getDate() + '-' + d.getFullYear();
        SchedulesData?.map((item, i) => {
          const date = new Date(SchedulesData?.[i]?.start_date);
          const date1 = new Date(SchedulesData?.[i]?.end_date);
          var StartDate = date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getFullYear();
          var EndDate = date1.getMonth() + 1 + '-' + date1.getDate() + '-' + date1.getFullYear();
          SchedulesData[i].start_date = StartDate;
          SchedulesData[i].end_date = EndDate;
        });
        setScheduleData(SchedulesData);
      } else {
        console.log('error');
      }
    }
    GetAllSchedules(id);

    async function getUser() {
      const url = api_url.get_all_users;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const userdata = response?.data?.responsedata?.users;
        var dataArray = [];
        userdata.map(item => {
          if (item?.role == 54) {
            var data = { id: item.id, name: item.user_name };
            dataArray.push(data);
          }
        });
        setarrayDataUser(dataArray);
      } else {
        console.log('error');
      }
    }
    getUser();

    async function GetAllSectionData() {
      const url = api_url.get_section_by_exam_id + id;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const SectionData = response?.data?.data;
        setSectionDatatable(SectionData);
        getaddedquestions(SectionData?.[0]?.id);
        setSelectedSectionID(SectionData?.[0]?.id);
      } else {
        console.log('error');
      }
    }
    GetAllSectionData(id);

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

    async function getallquestions() {
      const url = api_url.getallquestions;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const QuestionData = response.data.responsedata;
        var changedarray = QuestionData?.map(item => {
          if (item?.options) {
            var options = JSON.parse(item?.options);
            item.options = options;
          }
          return item;
        });
        setallquestions(changedarray);
      } else {
        console.log('error');
      }
    }
    getallquestions();

    async function Getallmodules(data) {
      const url = api_url.getall_modules;
      const response = await get_api_request(url, data, headers);
      console.log(response);
      if (response.status == 200) {
        const Moduledata = response?.data?.responsedata?.modules;

        const getmodules = Moduledata?.map(items => {
          if (items.name == 'EXAM TYPES') {
            const parentdata = items?.id;

            async function getentitybyparentid() {
              const url = api_url.get_entity_byparentid + parentdata;
              const response = await get_api_request(url, data, headers);

              const questiontypedata = response?.data?.responsedata;
              questiontypedata.map(item => {
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

              const questiontypedata = response?.data?.responsedata;
              questiontypedata?.map(item => {
                return { id: item.id, name: item.name };
              });
              setQuizTypeData(questiontypedata);
              console.log(questiontypedata);
            }
            getentitybyparentid();
          } else if (items.name == 'QUESTION TYPES') {
            const parentdata = items?.parent_id;
            async function getquestiontype_entitybyparentid() {
              const url = api_url.get_entity_byparentid + parentdata;
              const response = await get_api_request(url, headers);

              const questiontypedata = response?.data?.responsedata;
              setQuestionTypeData(questiontypedata);
            }

            getquestiontype_entitybyparentid();
          } else if (items.name == 'Levels') {
            const parentdata = items?.parent_id;
            async function getentitybyparentid() {
              const url = api_url.get_entity_byparentid + parentdata;
              const response = await get_api_request(url, headers);
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
    getExambyID();
    setIsActive(true);
    setRender(0);
  }, [render, Render]);

  /*==========================================END */

  /*HANDLING EDIT=============================START */
  async function getExambyID() {
    const url = api_url.get_exam_byId + id;
    const response = await get_api_request(url, headers);
    if (response.status == 200) {
      console.log(response);
      var quizdatabyid = response?.data?.data[0];
      var QuizSettingDatabyId = response?.data?.meta?.settings;
      setExamsettingById(QuizSettingDatabyId);
      updateids = quizdatabyid?.id;
      quizupdatedid.push(quizdatabyid?.id);
      console.log(quizdatabyid);
      console.log(QuizSettingDatabyId);

      setSettingsData({
        ...SettingsData,
        free: quizdatabyid?.free == 1 ? true : false,
        visibility: quizdatabyid?.visibility == 1 ? true : false,
        active: quizdatabyid?.active == 1 ? true : false,
        redeem_points: quizdatabyid?.redeen_points,
        points: quizdatabyid?.points == 1 ? true : false,
        title: quizdatabyid?.title,
        category_id: quizdatabyid?.category_id,
        exam_type: quizdatabyid?.exam_type,
        description: quizdatabyid?.description,
        created_by: quizdatabyid?.created_by,
        price: quizdatabyid?.price,
        dissableFinishButtonAuto: QuizSettingDatabyId?.dissableFinishButtonAuto,
        dissableFinishButtonManual: QuizSettingDatabyId?.dissableFinishButtonManual,
        dissableSectionAuto: QuizSettingDatabyId?.dissableSectionAuto,
        dissableSectionManual: QuizSettingDatabyId?.dissableSectionManual,
        durationModeAuto: QuizSettingDatabyId?.durationModeAuto,
        durationModeManual: QuizSettingDatabyId?.durationModeManual,
        enableQusetionListAuto: QuizSettingDatabyId?.enableQusetionListAuto,
        enableQusetionListManual: QuizSettingDatabyId?.enableQusetionListManual,
        hideSoluationsAuto: QuizSettingDatabyId?.hideSoluationsAuto,
        hideSoluationsManual: QuizSettingDatabyId?.hideSoluationsManual,
        marksModeAuto: QuizSettingDatabyId?.marksModeAuto,
        marksModeManual: QuizSettingDatabyId?.marksModeManual,
        negatineMarkingAuto: QuizSettingDatabyId?.negatineMarkingAuto,
        negatineMarkingManual: QuizSettingDatabyId?.negatineMarkingManual,
        numberofAttempts: QuizSettingDatabyId?.numberofAttempts, //
        pass_percentage: QuizSettingDatabyId?.pass_percentage, //
        restrictAttemptAuto: QuizSettingDatabyId?.restrictAttemptAuto,
        restrictAttemptManual: QuizSettingDatabyId?.restrictAttemptManual,
        showLeaderBoardAuto: QuizSettingDatabyId?.showLeaderBoardAuto,
        showLeaderBoardManual: QuizSettingDatabyId?.showLeaderBoardManual,
        suffleQuestionAuto: QuizSettingDatabyId?.suffleQuestionAuto,
        suffleQuestionManual: QuizSettingDatabyId?.suffleQuestionManual,
        showScoreBoardAuto: QuizSettingDatabyId?.showScoreBoardAuto,
        showScoreBoardManual: QuizSettingDatabyId?.showScoreBoardManual,
        terms_condition: QuizSettingDatabyId?.terms_condition,
      });
      console.log(QuizSettingDatabyId?.terms_condition);
      console.log(SettingsData);
      EditForm.setFieldsValue({
        title: quizdatabyid?.title,
        category_id: quizdatabyid?.category_id,
        exam_type: quizdatabyid?.exam_type,
        free: quizdatabyid?.free,
        points: quizdatabyid?.points,
        visibility: quizdatabyid?.visibility,
        active: quizdatabyid?.active,
        redeem_points: quizdatabyid?.redeem_points,
        description: quizdatabyid?.description,
        created_by: quizdatabyid?.created_by,
        price: quizdatabyid?.price,
      });
      SettingForm.setFieldsValue({
        pass_percentage: QuizSettingDatabyId?.pass_percentage, //
        numberofAttempts: QuizSettingDatabyId?.numberofAttempts, //
        terms_condition: QuizSettingDatabyId?.terms_condition,
      });
    } else {
      console.log('error');
    }
  }

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
        console.log(response);
        if (response.status == 200) {
          const scheduledatabyid = response?.data?.data[0];
          console.log(scheduledatabyid?.id);
          updateids = scheduledatabyid?.id;
          console.log(updateids);
          updatedid.push(scheduledatabyid?.id);

          if (scheduledatabyid?.status == 1) {
            setEditActiveSwitch(true);
          } else if (scheduledatabyid?.status == 0) {
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
            end_date: new Date(scheduledatabyid?.end_date),
            start_date: new Date(scheduledatabyid?.start_date),
          });
          var numberArray;
          if (scheduledatabyid.schedule_to_individual) {
            numberArray = JSON.parse(scheduledatabyid.schedule_to_individual);
          }
          setEditFormDate({
            // startDate: scheduledatabyid?.start_date ? moment(scheduledatabyid?.start_date) : '',
            // endDate: scheduledatabyid?.end_date ? moment(scheduledatabyid?.end_date) : '',
            endDate: new Date(scheduledatabyid?.end_date),
            startDate: new Date(scheduledatabyid?.start_date),
          });

          var groupArray;
          if (scheduledatabyid.schedule_to_group) {
          }
          EditScheduleForm.setFieldsValue({
            user_groups: scheduledatabyid?.schedule_to_group,
            grace_period_to_join: scheduledatabyid?.grace_period_to_join,
            users: scheduledatabyid?.schedule_to_individual,
            // start_date: moment(scheduledatabyid?.start_date).format('MM-DD-YYYY'),
            // end_date: moment(scheduledatabyid?.end_date).format('MM-DD-YYYY'),
            end_date: new Date(scheduledatabyid?.end_date),
            start_date: new Date(scheduledatabyid?.start_date),
            start_time: moment(scheduledatabyid?.start_time, 'HH:mm'),

            end_time: moment(scheduledatabyid?.end_time, 'HH:mm'),
            schedule_to_group: scheduledatabyid.schedule_to_group,
            schedule_to_individual: numberArray,
          });
        } else {
          console.log('error');
        }
      }
      getschedulebyid();
    } else if (actionid == 1) {
      history.push(`../${actionid}/overallExam-report`);
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
        updatedSectionID.push(sectionDatabyId?.id);
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
        console.log(sectionDatabyId);
        EditSection.setFieldsValue({
          active: sectionDatabyId?.active == 1 ? true : false,
          section_name: sectionDatabyId?.name,
          section: sectionDatabyId?.section_id,
          duration_in_mintues: sectionDatabyId?.duration ? Number(sectionDatabyId?.duration) : '',
          correct_answer_mrk: sectionDatabyId?.marks_for_correct_answers,
          negative_mrks: sectionDatabyId?.negative_marks,
          pass_percent_age: sectionDatabyId?.pass_percentage,
          section_order: sectionDatabyId?.section_order,
        });
      }
      getsectionbyid();
    } else if (actionid == 0) {
      console.log(typeof rowid);
      // GetQuestionBySectionID(rowid);
      setSelectedSectionID(Number(rowid));
      getaddedquestions(rowid);
      setTimeout(() => {
        setShowTabPane({
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
        });
        setActiveDetails(false);
        setActiveSetting(false);
        setActivesolution(true);
        setActiveAttachment(false);
        setActiveSection(false);
        setShowQuestions({
          ViewQuestion: false,
          AddQuestion: true,
        });
      }, 300);
    } else if (actionid == 1) {
      history.push(`../${actionid}/overallExam-report`);
    } else if (actionid == 4) {
      handleDelete1(rowid);
    }
  };

  const AddNewSchedule = fieldsvalue => {
    console.log(id);
    var payload = {};
    var schedule_Type;
    console.log(settingData);
    if (settingData.fixed == true) {
      schedule_Type = 'Fixed';
    } else if (settingData.flex == true) {
      schedule_Type = 'Flexible';
    }

    var activeswicth;

    if (ActiveStatusSwitch == true) {
      activeswicth = 1;
    } else {
      activeswicth = 0;
    }
    const IndividualString = JSON.stringify(fieldsvalue.schedule_to_individual);
    console.log(IndividualString);
    const GroupString = JSON.stringify(fieldsvalue?.schedule_to_group);
    payload['schedule_type'] = schedule_Type;
    payload['event_type'] = 30;
    payload['event_id'] = id;
    payload['start_date'] = moment(fieldsvalue.start_date).format('YYYY-MM-DD');
    payload['start_time'] = moment(fieldsvalue.start_time).format('HH:mm');
    payload['end_date'] = moment(fieldsvalue.end_date).format('YYYY-MM-DD');
    payload['end_time'] = moment(fieldsvalue.end_time).format('HH:mm');
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
        setActiveStatusSwitch(false);

        function Resetform1() {
          document.getElementById('schedule_form')?.reset();
        }
        Resetform1();
        setTimeout(() => {
          notification.destroy();
        }, 2000);
        setShowAddNewQuizType(false);
        setStartDate();
        setEndDate();
      } else
        notification.error({
          message: response?.data?.message,
        });
    }
    CreateSchedule(payload);
  };

  const AddNewSection = fieldsvalue => {
    var activeswicth;

    if (ActivesectinSwitch == true) {
      activeswicth = 1;
    } else {
      activeswicth = 0;
    }
    var addnewsection = {
      exam_id: id,
      name: fieldsvalue?.section_name,
      active: activeswicth,
      section_id: fieldsvalue?.section,
      duration: fieldsvalue?.duration_in_mintues,
      marks_for_correct_answers: fieldsvalue?.correct_answer_mrk,
      negative_marks: fieldsvalue?.negative_mrks,
      pass_percentage: fieldsvalue?.pass_percent_age,
      section_order: fieldsvalue?.section_order,
    };

    console.log(JSON.stringify(addnewsection));
    async function CreateSection() {
      const url = api_url.create_exam_section;
      const response = await post_api_request(url, addnewsection, headers);
      console.log(response);
      if (response.status === 201) {
        notification.success({
          message: 'Section Created Successfully',
        });
        setActivesectinSwitch(false);
        setShowAddNewSection(false);
        // function Resetform() {
        //   document.getElementById('section_form')?.reset();
        // }
        AddSection.resetFields();
        // Resetform();
        setrender(render + 1);
        // setTimeout(() => {
        //   notification.destroy();
        // }, 2000);
      } else {
        notification.error({
          message: response?.data?.message,
        });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      }
    }
    CreateSection();
  };

  const EditNewSection = fieldsvalue => {
    var activeswicth;

    if (EditActiveStatusSwitch == true) {
      activeswicth = 1;
    } else {
      activeswicth = 0;
    }
    var editnewsection = {
      exam_id: id,
      name: fieldsvalue?.section_name,
      active: activeswicth,
      section_id: fieldsvalue?.section,
      duration: fieldsvalue?.duration_in_mintues,
      marks_for_correct_answers: fieldsvalue?.correct_answer_mrk,
      negative_marks: fieldsvalue?.negative_mrks,
      pass_percentage: fieldsvalue?.pass_percent_age,
      section_order: fieldsvalue?.section_order,
    };

    console.log(JSON.stringify(editnewsection));

    async function UpdatedSection() {
      console.log(updatedSectionID?.[0]);
      const url = api_url.update_by_id + updatedSectionID?.[0];
      const response = await put_api_request(url, editnewsection, headers);
      console.log(response);
      if (response.status === 201) {
        notification.success({
          message: 'Section Updated Successfully',
        });

        setrender(render + 1);
        setShowEditNewSection(false);
        setupdatedSectionID([]);
        EditSection.resetFields();
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
    UpdatedSection();
  };

  const EditNewSchedule = FieldsValue => {
    var Payload = {};
    var schedule_Type;
    if (settingData.editfixed == true) {
      schedule_Type = 'Fixed';
    } else if (settingData.editflex == true) {
      schedule_Type = 'Flexible';
      Payload['end_date'] = moment(EditFormDate?.endDate).format('YYYY-MM-DD');
      if (settingData?.end_time) {
        Payload['end_time'] = moment(FieldsValue?.end_time).format('HH:mm');
      }
    }

    var activeswicth;
    if (EditActiveSwitch == true) {
      activeswicth = 1;
    } else {
      activeswicth = 0;
    }
    const IndividualString = JSON.stringify(FieldsValue?.schedule_to_individual);
    const GroupString = JSON.stringify(FieldsValue?.schedule_to_group);

    Payload['schedule_type'] = schedule_Type;
    Payload['event_type'] = 30;
    Payload['event_id'] = id;
    Payload['start_date'] = moment(EditFormDate.startDate).format('YYYY-MM-DD');
    Payload['start_time'] = moment(FieldsValue?.start_time).format('HH:mm');
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
        setupdatedid([]);
        setEditFormDate({
          startDate: '',
          endDate: '',
        });
        EditScheduleForm.resetFields();
        setTimeout(() => {
          notification.destroy();
          setShowEditNewQuizType(false);
        }, 2000);
        setRender(Render + 1);
      } else
        notification.error({
          message: response?.data?.responsedata,
        });
    }
    UpdateSchedule(Payload);
  };

  const handleDelete = id => {
    console.log(id);
    var deletedrowid = id;
    var column = 'id';
    async function deleteData(id) {
      const url = api_url.delete_scheduleby_id + deletedrowid;

      const response = await delete_api_request(url, headers);
      console.log(response);

      if (response.status === 201) {
        notification.success({
          message: 'Schedule Deleted Successfully',
        });
        setrender(render + 1);
        const afterdeletedata = ScheduleData.filter(item => {
          if (column !== '') {
            return item[column] != deletedrowid;
          }
          return item;
        });
        setScheduleData(afterdeletedata);
      } else {
        notification.error({
          message: response.data.message,
        });
      }
      // });
    }
    deleteData(id);
  };
  const handleDelete1 = id => {
    console.log(id);
    var deletedrowid = id;
    var column = 'id';
    async function deleteSectionData(id) {
      const url = api_url.delete_by_id + deletedrowid;

      const response = await delete_api_request(url, headers);
      console.log(response);

      if (response.status === 200) {
        notification.success({
          message: response.data.message,
        });
        setrender(render + 1);
        const afterdeletedata = SectionDatatable.filter(item => {
          if (column !== '') {
            return item[column] !== deletedrowid;
          }
          return item;
        });
        setScheduleData(afterdeletedata);
      } else {
        notification.error({
          message: response.data.message,
        });
      }
      // });
    }
    deleteSectionData(id);
  };

  const CopyToClipboard = e => {
    const id = encrypttheid(e);
    console.log(domainpath);
    console.log(e);
    navigator.clipboard.writeText(`${domainpath}/dashboard/engage/edit-exam/${id}`);
    notification.success({
      message: `Copied Successfully ${domainpath}/dashboard/engage/edit-exam/${id}`,
    });
  };

  const columns = [
    {
      name: 'CODE',
      selector: row => (
        <>
          {row.id ? (
            <p onClick={() => CopyToClipboard(row.id)}>
              <i class="fa fa-files-o" aria-hidden="true"></i> {row.id ? encrypttheid(row.id) : ''}
            </p>
          ) : (
            ''
          )}
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
      // selector: row => (row.start_date ? moment(row.start_date).format('MM-DD-YYYY') : ''),
      selector: row => row.start_date,
      sortable: true,
    },
    {
      name: 'ENDS AT	',
      // selector: row => (row.end_date ? moment(row.end_date).format('MM-DD-YYYY') : ''),
      selector: row => row.end_date,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => (
        <>
          <>
            <span className={`status ${row.status == 1 ? 'Success' : 'error'}`}>
              {row.status == 1 ? 'Active' : 'Inactive'}
            </span>
          </>
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
      selector: row => row.id,
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
          <Select className="Quizz_actions" defaultValue="Actions" onSelect={e => HandleAction1(e + ',' + row.id)}>
            <Option value={0}>Add Questions</Option>
            <Option value={1}>Analytics</Option>
            <Option value={3}>Edit</Option>
            <Option value={4}>Delete</Option>
          </Select>
        </div>
      ),
    },
  ];

  const EditQuizDetail = name => {
    console.log(SettingsData);

    var EditQuizDetail = {
      free: SettingsData?.free == true ? 1 : 0,
      active: SettingsData?.active == true ? 1 : 0,
      description: SettingsData?.description,
      title: SettingsData?.title,
      created_by: SettingsData?.created_by,
      price: SettingsData?.price,
      category_id: SettingsData?.category_id,
      exam_type: SettingsData?.exam_type,
      points: SettingsData?.points == true ? 1 : 0,
      visibility: SettingsData?.visibility == true ? 1 : 0,
      redeem_points: SettingsData?.redeem_points,
    };
    var meta = {};
    console.log(EditQuizDetail);
    EditQuizDetail['meta'] = meta;
    async function UpdatedQuiz() {
      console.log(quizupdatedid?.[0]);
      const url = api_url.update_exam_byId + quizupdatedid?.[0];
      const response = await put_api_request(url, EditQuizDetail, headers);
      console.log(response);
      if (response.status === 201) {
        notification.success({
          message: 'Exam Updated Successfully',
        });
        setrender(render + 1);
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
    UpdatedQuiz();
  };

  const EditSettingsDetail = name => {
    console.log(SettingsData);
    var meta = {};
    var EditSettings = {
      free: SettingsData?.free == true ? 1 : 0,
      active: SettingsData?.active == true ? 1 : 0,
      description: SettingsData?.description,
      title: SettingsData?.title,
      created_by: SettingsData?.created_by,
      price: SettingsData?.price,
      category_id: SettingsData?.category_id,
      exam_type: SettingsData?.exam_type,
      points: SettingsData?.points == true ? 1 : 0,
      visibility: SettingsData?.visibility == true ? 1 : 0,
      redeem_points: SettingsData?.redeem_points,
    };

    meta = {
      settings: {
        dissableFinishButtonAuto: SettingsData.dissableFinishButtonAuto,
        dissableFinishButtonManual: SettingsData.dissableFinishButtonManual,
        dissableSectionAuto: SettingsData.dissableSectionAuto,
        dissableSectionManual: SettingsData.dissableSectionManual,
        durationModeAuto: SettingsData.durationModeAuto,
        durationModeManual: SettingsData.durationModeManual,
        enableQusetionListAuto: SettingsData.enableQusetionListAuto,
        enableQusetionListManual: SettingsData.enableQusetionListManual,
        hideSoluationsAuto: SettingsData.hideSoluationsAuto,
        hideSoluationsManual: SettingsData.hideSoluationsManual,
        marksModeAuto: SettingsData.marksModeAuto,
        marksModeManual: SettingsData.marksModeManual,
        negatineMarkingAuto: SettingsData.negatineMarkingAuto,
        negatineMarkingManual: SettingsData.negatineMarkingManual,
        numberofAttempts: SettingsData.numberofAttempts, //
        pass_percentage: SettingsData.pass_percentage, //
        restrictAttemptAuto: SettingsData.restrictAttemptAuto,
        restrictAttemptManual: SettingsData.restrictAttemptManual,
        showLeaderBoardAuto: SettingsData.showLeaderBoardAuto,
        showLeaderBoardManual: SettingsData.showLeaderBoardManual,
        suffleQuestionAuto: SettingsData.suffleQuestionAuto,
        suffleQuestionManual: SettingsData.suffleQuestionManual,
        showScoreBoardAuto: SettingsData?.showScoreBoardAuto,
        showScoreBoardManual: SettingsData?.showScoreBoardManual,
        terms_condition: SettingsData?.terms_condition,
      },
    };

    EditSettings['meta'] = meta;
    console.log(EditSettings);
    console.log(JSON.stringify(EditSettings));
    async function UpdatedQuiz() {
      console.log(quizupdatedid?.[0]);
      const url = api_url.update_exam_byId + quizupdatedid?.[0];
      const response = await put_api_request(url, EditSettings, headers);
      console.log(response);
      if (response.status === 201) {
        notification.success({
          message: 'Exam Setting Updated Successfully',
        });
        setrender(render + 1);
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
    UpdatedQuiz();
  };

  /**QUESTION SECTION===========================================STARTS */
  const AddQuestionByID = e => {
    console.log(SelectedSectionID);
    setLoading(true);
    if (SelectedSectionID) {
      var addQuestion = {
        exam_id: id,
        questions: e,
        section_id: SelectedSectionID,
      };

      async function AddQuizQuestion() {
        const url = api_url.addexam_question;
        const response = await post_api_request(url, addQuestion, headers);
        console.log(response);
        if (response.status === 201) {
          notification.success({
            message: 'Question Added Successfully',
          });
          setTimeout(() => {
            setLoading(false);
          }, 500);
          getaddedquestions(SelectedSectionID);
          //GetQuestionBySectionID(SelectedSectionID);
        } else {
          notification.error({ message: response?.message });
        }
      }
      AddQuizQuestion();
    } else {
      notification.error({
        message: 'Select Section First',
      });
    }
  };
  /**GET QUESTION BY SECTION ID===================STARTS **/

  async function GetQuestionBySectionID(section_id) {
    console.log(section_id);
    console.log(ViewquestionsData);
  }

  /**GET QUESTION BY SECTION ID===================ENDS **/
  async function getaddedquestions(sectionID) {
    console.log(sectionID);
    const url = api_url.getexam_question + id;
    const response = await get_api_request(url, headers);
    if (response.status == 200) {
      console.log(response);
      const ViewQuestionData = response.data.responsedata;
      var QuestionBySectionID = [];
      var QustID = [];
      var changedviewarray = ViewQuestionData?.map(item => {
        if (item?.section_id == sectionID) {
          if (item?.options) {
            var options = JSON.parse(item?.options);
            item.options = options;
            QuestionBySectionID.push(item);
          }
          QustID.push(item.question_id);
        }
        return item;
      });
      var QuestionIds = ViewQuestionData?.map(item => {
        return item.question_id;
      });
      setAddedQuestion(QustID);
      setViewquestionsData(QuestionBySectionID);
    } else {
      console.log('error');
    }
  }

  const RemoveQuestionByID = e => {
    console.log(e);
    setLoading(true);
    async function deleteData(e) {
      const examID = id;
      const qustID = e;
      const connect_ID = examID + '/' + qustID;
      const url = api_url.getexam_question + connect_ID;
      console.log(url);
      const response = await delete_api_request(url, headers);
      console.log(response);
      if (response.status === 201) {
        notification.success({
          message: 'Question Removed Successfully',
        });
        setTimeout(() => {
          setLoading(false);
        }, 200);
        setTimeout(() => {
          getaddedquestions(SelectedSectionID);
          setrender(render + 1);
        }, 200);
      }
    }
    deleteData(e);
  };

  const AddQuestionViewOptions = () => {
    setadd_OptionLoading(true);

    setTimeout(() => {
      setadd_OptionLoading(false);
      setadd_sidebaroptions(true);
    }, 500);
  };

  const AddedQuestionViewOptions = () => {
    setOptionLoading(true);

    setTimeout(() => {
      setOptionLoading(false);
      setsidebaroptions(true);
    }, 500);
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
      <Main>
        <section className="SectionTabsMainTop">
          <Cards>
            <div className="SectionTabs_Main">
              <div id="SectionTabsGeneral" className="SectionTabsInner">
                {ShowTabPane?.ExamDetails == true ? (
                  <p>
                    <b>Exam Details</b>
                  </p>
                ) : (
                  ''
                )}
                {ShowTabPane?.ExamSettings == true ? (
                  <p>
                    <b>Exam Settings</b>
                  </p>
                ) : (
                  ''
                )}
                {ShowTabPane?.ExamSections == true ? (
                  <p>
                    <b>Exam Sections</b>
                    <br />
                  </p>
                ) : (
                  ''
                )}
                {ShowTabPane?.ExamQuestions == true ? (
                  <p>
                    <b>Exam Questions</b>
                    <br />
                  </p>
                ) : (
                  ''
                )}
                {ShowTabPane?.ExamSchedules == true ? (
                  <p>
                    <b>Exam Schedule</b>
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
                  <button
                    id="Settings"
                    data-rowid={'1'}
                    className={ActiveSetting ? 'practice-tabpane' : ''}
                    onClick={e => {
                      setShowTabPane({
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
                      });
                      setActiveDetails(false);
                      setActiveSetting(true);
                      setActivesolution(false);
                      setActiveAttachment(false);
                      setActiveSection(false);
                    }}
                  >
                    <span>2</span> Settings
                  </button>
                  <button
                    id="Sections"
                    data-rowid={'2'}
                    className={ActiveSection ? 'practice-tabpane' : ''}
                    onClick={e => {
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
                      setActiveDetails(false);
                      setActiveSetting(false);
                      setActivesolution(false);
                      setActiveAttachment(false);
                      setActiveSection(true);
                    }}
                  >
                    <span>3</span> Sections
                  </button>
                  <button
                    id="Questions"
                    data-rowid={'3'}
                    className={Activesolution ? 'practice-tabpane' : ''}
                    onClick={e => {
                      setShowTabPane({
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
                      });
                      setActiveDetails(false);
                      setActiveSetting(false);
                      setActivesolution(true);
                      setActiveAttachment(false);
                      setActiveSection(false);
                    }}
                  >
                    <span>4</span> Questions
                  </button>
                  <button
                    id="Schedules"
                    data-rowid={'4'}
                    className={ActiveAttachment ? 'practice-tabpane' : ''}
                    onClick={e => {
                      setShowTabPane({
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
                      });
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
          </Cards>

          {ShowTabPane?.Detail == true ? (
            <Main>
              <Cards>
                {' '}
                <>
                  <Form
                    form={EditForm}
                    name="sDash_validation-form"
                    layout="vertical"
                    className="Details_form"
                    onFinish={() => EditQuizDetail('details')}
                  >
                    <Row gutter={30}>
                      <Col md={18} xs={24} className="editexamCol">
                        <Row gutter={30}>
                          <Col md={24} xs={24}>
                            <label>Title</label>
                            <Form.Item
                              name="title"
                              rules={[
                                {
                                  required: true,
                                  message: 'Title is required !',
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
                        </Row>
                        {RoleName == 'super_admin' ? (
                          <Row gutter={30}>
                            <Col md={24} xs={24} className="skillrow-inner mBottom">
                              <Form.Item
                                name="created_by"
                                label="Created By"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Created By is required !',
                                  },
                                ]}
                              >
                                <Select
                                  style={{ width: '100%' }}
                                  classNamePrefix="select"
                                  isSearchable={true}
                                  onChange={selectedValue => {
                                    setSettingsData({ ...SettingsData, created_by: selectedValue });
                                  }}
                                >
                                  {AllInstructor != null
                                    ? AllInstructor.map((item, index) => (
                                        <Option value={item.id}>{item.first_Name} </Option>
                                      ))
                                    : ''}
                                </Select>
                              </Form.Item>
                            </Col>
                          </Row>
                        ) : (
                          ''
                        )}
                        <Row gutter={30}>
                          <Col md={12} xs={24}>
                            <label>Category</label>
                            <Form.Item
                              name="category_id"
                              rules={[
                                {
                                  required: true,
                                  message: 'Category is required !',
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
                                  ? arrayDatasubcategory.map((item, index) => (
                                      <Option value={item.id}>{item.name} </Option>
                                    ))
                                  : ''}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col md={12} xs={24}>
                            <label>Exam Type</label>
                            <Form.Item name="exam_type">
                              <Select
                                ExamTypeData={ExamTypeData}
                                onChange={selectedValue => {
                                  setSettingsData({ ...SettingsData, exam_type: selectedValue });
                                }}
                              >
                                {ExamTypeData != null
                                  ? ExamTypeData.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                                  : ''}
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={30} className="switchToggle">
                          <Col md={21}>
                            <p>
                              <b>Paid </b> <br />
                              Paid (Accessible to only Paid users). Free (Anyone can access).
                            </p>
                          </Col>
                          <Col md={3}>
                            <Form name="free">
                              <Switch
                                name="free"
                                checked={SettingsData?.free}
                                onChange={e => {
                                  setSettingsData({
                                    ...SettingsData,
                                    free: e,
                                  });
                                }}
                              />
                            </Form>
                          </Col>
                        </Row>
                        {SettingsData?.free == true ? (
                          <>
                            <Row guttor={30}>
                              <Col md={24}>
                                <Form.Item
                                  label="Price"
                                  name="price"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Price is required !',
                                    },
                                  ]}
                                >
                                  <Input
                                    type="number"
                                    onChange={selectedValue => {
                                      setSettingsData({ ...SettingsData, price: selectedValue.target.value });
                                    }}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row gutter={30} id="Access_point" className="switchToggle">
                              <Col md={21}>
                                <p>
                                  <b>Can access with Points (Yes) </b> <br />
                                  Yes (User should redeem with points to access quiz). No (Anyone can access).
                                </p>
                              </Col>
                              <Col md={3}>
                                <Form name="points">
                                  <Switch
                                    name="points"
                                    checked={SettingsData?.points}
                                    onChange={e => {
                                      setSettingsData({
                                        ...SettingsData,
                                        points: e,
                                      });
                                    }}
                                  />
                                </Form>
                              </Col>
                            </Row>
                          </>
                        ) : (
                          ''
                        )}
                        {SettingsData?.points == true ? (
                          <Row gutter={30} id="required_points">
                            <Col md={24} xs={24}>
                              <label>Points Required to Redeem</label>
                              <Form.Item
                                name="redeem_points"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Points is required !',
                                  },
                                ]}
                              >
                                <Input
                                  name="redeem_points"
                                  type="number"
                                  placeholder="Enter Point Required"
                                  onChange={selectedValue => {
                                    setSettingsData({ ...SettingsData, redeem_points: selectedValue.target.value });
                                  }}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        ) : (
                          ''
                        )}
                        <Row gutter={30}>
                          <Col md={24} xs={24}>
                            <label>Description</label>
                            <Form.Item name="description">
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
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={30}>
                          <Col md={21}>
                            <p>
                              <b>Visibility - Public</b> <br /> Private (Only scheduled user groups can access). Public
                              (Anyone can access).
                            </p>
                          </Col>
                          <Col md={3}>
                            <Form name="visibility" className="switchToggle">
                              <Switch
                                name="visibility"
                                checked={SettingsData?.visibility}
                                onChange={e => {
                                  setSettingsData({
                                    ...SettingsData,
                                    visibility: e,
                                  });
                                }}
                              />
                            </Form>
                          </Col>
                        </Row>
                        <Row gutter={30} className="switchToggle">
                          <Col md={21}>
                            <p>
                              <b>Status - Draft</b>
                              <br /> Private (Published (Shown Everywhere). Draft (Not Shown).)
                            </p>
                          </Col>

                          <Col md={3}>
                            <Form name="active">
                              <Switch
                                name="active"
                                checked={SettingsData?.active}
                                onChange={e => {
                                  setSettingsData({
                                    ...SettingsData,
                                    active: e,
                                  });
                                  //visibilitystatus(e);
                                }}
                              />
                            </Form>
                          </Col>
                        </Row>
                        <Col md={24} xs={24}>
                          <div className="add-details-bottom text-right">
                            <Button htmlType="submit" type="success" size="default" className="btn-animation">
                              Save & Proceed
                            </Button>
                          </div>
                        </Col>
                      </Col>
                    </Row>
                  </Form>
                </>
              </Cards>
            </Main>
          ) : (
            ''
          )}
          {ShowTabPane?.Settings == true ? (
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
                  <Main className="Settings_form_main">
                    <Form form={SettingForm} className="Settings_form" onFinish={() => EditSettingsDetail('settings')}>
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

                            {console.log(SettingsData?.durationModeAuto, '1111111111111')}
                            {console.log(SettingsData, '2222222222222222222')}
                            <Col md={12}>
                              {' '}
                              <div className="video_buttons">
                                <Button
                                  value={1}
                                  className={SettingsData?.durationModeManual != true ? 'bg-salmon' : ''}
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
                                  className={SettingsData?.durationModeManual == true ? 'bg-salmon' : ''}
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
                                  className={SettingsData?.marksModeManual != true ? 'bg-salmon' : ''}
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
                                  className={SettingsData?.marksModeManual == true ? 'bg-salmon' : ''}
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
                                  className={SettingsData?.negatineMarkingManual != true ? 'bg-salmon' : ''}
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
                                  className={SettingsData?.negatineMarkingManual == true ? 'bg-salmon' : ''}
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
                                onChange={selectedValue => {
                                  setSettingsData({ ...SettingsData, pass_percentage: selectedValue.target.value });
                                }}
                              />
                            </Form.Item>
                          </Col>
                          <Col md={24} className="termsSection">
                            <Form.Item name="terms_condition" label="Terms & Condition">
                              <Editor
                                name="terms_condition"
                                onChange={selectedValue => {
                                  setSettingsData({ ...SettingsData, terms_condition: selectedValue.html });
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
                                    className={SettingsData?.suffleQuestionAuto == true ? 'bg-salmon' : ''}
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
                                    className={SettingsData?.suffleQuestionAuto != true ? 'bg-salmon' : ''}
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
                                    className={SettingsData?.restrictAttemptAuto == true ? 'bg-salmon' : ''}
                                    onClick={() => {
                                      setIsRestrict(current => !current);
                                      setRestrict(false);

                                      setSettingsData({
                                        ...SettingsData,
                                        restrictAttemptAuto: true,
                                        restrictAttemptManual: false,
                                      });
                                    }}
                                  >
                                    Yes
                                  </Button>
                                  <Button
                                    value={2}
                                    id="No"
                                    className={SettingsData?.restrictAttemptAuto != true ? 'bg-salmon' : ''}
                                    onClick={() => {
                                      setIsRestrict(false);
                                      setRestrict(current => !current);
                                      setSettingsData({
                                        ...SettingsData,
                                        restrictAttemptManual: true,
                                        restrictAttemptAuto: false,
                                      });
                                    }}
                                  >
                                    No
                                  </Button>
                                </div>
                              </Col>
                            </Col>
                            <Col md={12}></Col>
                          </Row>
                          {SettingsData?.restrictAttemptAuto != false ? (
                            <Col md={24}>
                              <b>
                                {' '}
                                <label>Number of Attempts</label>
                              </b>
                              <Form.Item
                                name="numberofAttempts"
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
                                  className={SettingsData?.dissableSectionAuto == true ? 'bg-salmon' : ''}
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
                                  className={SettingsData?.dissableSectionAuto != true ? 'bg-salmon' : ''}
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
                                  className={SettingsData?.dissableFinishButtonManual != true ? 'bg-salmon' : ''}
                                  onClick={() => {
                                    setIsDisable(current => !current);
                                    setDisable(false);

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
                                  className={SettingsData?.dissableFinishButtonManual == true ? 'bg-salmon' : ''}
                                  onClick={() => {
                                    setIsDisable(false);
                                    setDisable(current => !current);
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
                                  className={SettingsData?.enableQusetionListAuto == true ? 'bg-salmon' : ''}
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
                                  className={SettingsData?.enableQusetionListAuto != true ? 'bg-salmon' : ''}
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
                                  className={SettingsData?.hideSoluationsAuto == true ? 'bg-salmon' : ''}
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
                                  className={SettingsData?.hideSoluationsAuto != true ? 'bg-salmon' : ''}
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
                                <label>Show Dashboard</label>
                              </b>
                              <i class="fa fa-info-circle" aria-hidden="true"></i>
                              <div id="showinfo">
                                <b>
                                  <span className="Hover_text">Yes</span>
                                </b>{' '}
                                -Dashboard will be shown to test takers.
                                <br />
                                <b>
                                  <span className="Hover_text">No</span>
                                </b>{' '}
                                - Dashboard will not be shown to test takers.
                              </div>
                            </Col>
                            <Col md={12}>
                              {' '}
                              <div className="video_buttons">
                                <Button
                                  value={1}
                                  className={SettingsData?.showLeaderBoardAuto == true ? 'bg-salmon' : ''}
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
                                  className={SettingsData?.showLeaderBoardAuto != true ? 'bg-salmon' : ''}
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
                                  className={SettingsData?.showScoreBoardAuto == true ? 'bg-salmon' : ''}
                                  onClick={() => {
                                    setIsscroeboardShow(current => !current);
                                    setShowscroeboard(false);

                                    setSettingsData({
                                      ...SettingsData,
                                      showScoreBoardAuto: true,
                                      showScoreBoardManual: false,
                                    });
                                  }}
                                >
                                  Yes
                                </Button>
                                <Button
                                  value={2}
                                  id="No"
                                  className={
                                    SettingsData?.showScoreBoardAuto == undefined ||
                                    SettingsData?.showScoreBoardAuto == false
                                      ? 'bg-salmon'
                                      : ''
                                  }
                                  onClick={() => {
                                    setIsscroeboardShow(false);
                                    setShowscroeboard(current => !current);
                                    setSettingsData({
                                      ...SettingsData,
                                      showScoreBoardManual: true,
                                      showScoreBoardAuto: false,
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
            </div>
          ) : (
            ''
          )}
          {ShowTabPane?.Sections == true ? (
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
                      <Button
                        onClick={() => setShowAddNewSection(true)}
                        size="small"
                        key="4"
                        type="success"
                        className="btn-animation"
                      >
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
                                  <label>Exam Section</label>
                                </b>
                                <Form.Item
                                  name="section_name"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Exam Section is required.',
                                    },
                                  ]}
                                >
                                  <Input
                                    type="text"
                                    placeholder="Exam Section Name"
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
                                        message: 'Duration (Minutes) is required.',
                                      },
                                    ]}
                                  >
                                    <Input
                                      type="number"
                                      placeholder="Duration (Minutes)"
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
                                        message: 'Marks for Correct Answer is required.',
                                      },
                                    ]}
                                  >
                                    <Input
                                      type="number"
                                      placeholder="Marks for Correct Answer"
                                      onChange={selectedValue => {
                                        setaddsectionData({ ...addsectionData, correct_answer_mrk: selectedValue });
                                      }}
                                    ></Input>
                                  </Form.Item>
                                </Col>
                              ) : (
                                ''
                              )}
                              {SettingsData?.negatineMarkingAuto == undefined ||
                              SettingsData?.negatineMarkingAuto == true ? (
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
                                        className={
                                          SettingsData?.negatineMarkingManual == undefined ||
                                          SettingsData?.negatineMarkingManual == false
                                            ? 'bg-salmon'
                                            : ''
                                        }
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
                              {SettingsData?.negatineMarkingAuto == undefined ||
                              SettingsData?.negatineMarkingAuto == true ? (
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
                                      placeholder="Negative Marks"
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
                                    placeholder="Pass Percentage"
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
                                    placeholder="Section Order"
                                    onChange={selectedValue => {
                                      setaddsectionData({ ...addsectionData, section_order: selectedValue });
                                    }}
                                  ></Input>
                                </Form.Item>
                              </Col>

                              <Col md={20}>
                                <p>
                                  <b>Status - Draft</b>
                                  <br /> Private (Published (Shown Everywhere). Draft (Not Shown).)
                                </p>
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
                                    onChange={() => setEditActiveStatusSwitch(!EditActiveStatusSwitch)}
                                    checked={EditActiveStatusSwitch}
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
          )}
          {ShowTabPane?.Questions == true ? (
            <Cards>
              {' '}
              <>
                <Main className="Question_form_main">
                  <Form className="Question_form" form={FilterForm}>
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
                                ? filtersectionData.map((item, index) => <Option value={item.id}>{item.name} </Option>)
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
                            <label>Difficulty level</label>
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
                        <Row className="bgviewexamque">
                          <Col md={12} className="Select_Questions">
                            {ShowQuestions?.ViewQuestion == true ? <h3>Currently Viewing Questions</h3> : ''}
                            {ShowQuestions?.AddQuestion == true ? <h3>Currently Adding Questions</h3> : ''}
                            <b>
                              <a
                                href="#"
                                onClick={e => {
                                  setShowQuestions({
                                    ViewQuestion: true,
                                    AddQuestion: false,
                                  });
                                  setsidebaroptions(false);
                                  setadd_sidebaroptions(false);
                                }}
                              >
                                {' '}
                                View Questions
                              </a>
                            </b>{' '}
                            |{' '}
                            <b>
                              <a
                                href="#"
                                onClick={e => {
                                  setShowQuestions({
                                    ViewQuestion: false,
                                    AddQuestion: true,
                                  });
                                  setsidebaroptions(false);
                                  setadd_sidebaroptions(false);
                                }}
                              >
                                Add Questions
                              </a>
                            </b>
                          </Col>
                          <Col md={12}>
                            <b>
                              <label>Sections:-</label>
                            </b>
                            <FormItem>
                              <Select
                                onChange={selectedValue => {
                                  setSelectedSectionID(selectedValue);
                                  getaddedquestions(selectedValue);
                                  // GetQuestionBySectionID(selectedValue);
                                }}
                                defaultValue={SelectedSectionID}
                              >
                                {SectionDatatable.map((item, index) => (
                                  <Option value={item.id}>{item.name} </Option>
                                ))}
                              </Select>
                            </FormItem>
                          </Col>
                        </Row>

                        <b>
                          <p className="Questions_tag">
                            {ViewquestionsData?.length} items found for the selected section.
                          </p>
                        </b>

                        {/* --------------------------View Questions--------------------------- */}
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
                                {/* <img src="" alt="" /> */}
                                <p>
                                  <b>Skill Name :</b>
                                  {item?.skill_name}
                                </p>
                                <p>
                                  <b>Question:</b>
                                  {item?.questions}
                                </p>
                                <Spin spinning={OptionLoading}>
                                  {sidebaroptions != true ? (
                                    <a
                                      className="options-text"
                                      onClick={() => {
                                        AddedQuestionViewOptions();
                                      }}
                                    >
                                      View Options
                                    </a>
                                  ) : (
                                    ''
                                  )}
                                </Spin>
                                {sidebaroptions != false ? (
                                  <>
                                    {item?.options?.map(item => (
                                      //   <input style={{ Width: '100%' }} value={item?.value} readOnly />
                                      <CKEditor
                                        editor={ClassicEditor}
                                        contentStyle={{
                                          height: 430,
                                        }}
                                        config={{
                                          toolbar: {
                                            shouldNotGroupWhenFull: true,
                                            items: [
                                              // 'heading',
                                              // 'outdent',
                                              // 'indent',
                                              // '|',
                                              // 'bold',
                                              // 'italic',
                                              // 'link',
                                              // 'bulletedList',
                                              // 'numberedList',
                                              // 'imageUpload',
                                              // 'mediaEmbed',
                                              // 'insertTable',
                                              // 'blockQuote',
                                              // 'undo',
                                              // 'redo',
                                              // '|',
                                              // 'MathType',
                                              // 'ChemType',
                                            ],
                                          },
                                        }}
                                        data={item?.value}
                                        style={{ pointerEvents: 'none' }}
                                      />
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
                                  {item.level_name}
                                </p>
                                <p>
                                  <b>Marks/Points:</b>
                                  {item.marks_point}
                                </p>
                                {/* <p>
                                  <b>Attachments:</b>
                                  {item.attachments}
                                </p> */}
                                <Col md={24} className="Unique_code_button">
                                  {' '}
                                  <p className="Unique_code">{'que_' + encrypttheid(item?.id)}</p>
                                  <Spin spinning={loading} delay={200}>
                                    <Button
                                      size="small"
                                      type="danger"
                                      className="btn-animation"
                                      onClick={e => RemoveQuestionByID(item?.question_id)}
                                    >
                                      REMOVE
                                    </Button>
                                  </Spin>
                                </Col>
                              </Cards>
                            ))
                          : ''}

                        {/* -----------------------ADdQuestion-------------------------- */}
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
                                {/* <img src="" alt="" /> */}
                                <p>
                                  <b>Skill Name :</b>
                                  {item?.skill_name}
                                </p>
                                <p>
                                  <b>Question:</b>
                                  {item?.questions}
                                </p>
                                <Spin spinning={add_OptionLoading} delay={200}>
                                  {add_sidebaroptions != true ? (
                                    <a
                                      className="options-text"
                                      onClick={() => {
                                        AddQuestionViewOptions();
                                      }}
                                    >
                                      View Options
                                    </a>
                                  ) : (
                                    ''
                                  )}
                                </Spin>
                                {add_sidebaroptions != false ? (
                                  <>
                                    {item?.options?.map(item => (
                                      // <input style={{ Width: '100%' }} value={item?.value} readOnly />
                                      <CKEditor
                                        editor={ClassicEditor}
                                        contentStyle={{
                                          height: 430,
                                        }}
                                        config={{
                                          toolbar: {
                                            shouldNotGroupWhenFull: true,
                                            items: [
                                              // 'heading',
                                              // 'outdent',
                                              // 'indent',
                                              // '|',
                                              // 'bold',
                                              // 'italic',
                                              // 'link',
                                              // 'bulletedList',
                                              // 'numberedList',
                                              // 'imageUpload',
                                              // 'mediaEmbed',
                                              // 'insertTable',
                                              // 'blockQuote',
                                              // 'undo',
                                              // 'redo',
                                              // '|',
                                              // 'MathType',
                                              // 'ChemType',
                                            ],
                                          },
                                        }}
                                        data={item?.value}
                                        style={{ pointerEvents: 'none' }}
                                      />
                                    ))}

                                    <br />
                                    <a className="options-text" onClick={() => setadd_sidebaroptions(false)}>
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
                                  {item.level_name}
                                </p>
                                <p>
                                  <b>Marks/Points:</b>
                                  {item.marks_point}
                                </p>
                                {/* <p>
                                  <b>Attachments:</b>
                                  {item.attachments}
                                </p> */}
                                <Col md={24} className="Unique_code_button">
                                  {' '}
                                  <p className="Unique_code">{'que_' + encrypttheid(item?.id)}</p>{' '}
                                  <Spin spinning={loading} delay={100}>
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
                                        className="btn-animation"
                                        onClick={() => AddQuestionByID(item?.id)}
                                      >
                                        ADD
                                      </Button>
                                    )}
                                  </Spin>
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
          ) : (
            ''
          )}
          {ShowTabPane?.Schedules == true ? (
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
                      id="schedule_form"
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
                                  checked={settingData?.flex}
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
                                // rules={[
                                //   {
                                //     required: true,
                                //     message: 'Select Schedule to User Groups',
                                //   },
                                // ]}
                              >
                                <Select
                                  mode="multiple"
                                  allowClear
                                  showSearch
                                  filterOption={(inputValue, option) =>
                                    option.children
                                      .join('')
                                      .toLowerCase()
                                      .includes(inputValue.toLowerCase())
                                  }
                                  style={{ width: '100%' }}
                                  classNamePrefix="select"
                                  isSearchable={true}
                                  arrayDataUsergroup={arrayDataUsergroup}
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
                                <label>Schedule to Individual</label>
                              </b>
                              <Form.Item
                                name="schedule_to_individual"
                                // rules={[
                                //   {
                                //     required: true,
                                //     message: 'Select Schedule to Individual',
                                //   },
                                // ]}
                              >
                                <Select
                                  mode="multiple"
                                  allowClear
                                  showSearch
                                  filterOption={(inputValue, option) =>
                                    option.children
                                      .join('')
                                      .toLowerCase()
                                      .includes(inputValue.toLowerCase())
                                  }
                                  style={{ width: '100%' }}
                                  classNamePrefix="select"
                                  isSearchable={true}
                                  arrayDataUser={arrayDataUser}
                                >
                                  {arrayDataUser != null
                                    ? arrayDataUser.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                                    : ''}
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col md={24}>
                              <div className="togglefield" id="editexamschedule" style={{ width: '94%' }}>
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
                            <Button htmlType="submit">Create</Button>
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
                                      setEditFormDate({
                                        ...EditFormDate,
                                        startDate: selectedValue,
                                      });
                                      console.log(moment(selectedValue).format('MM-DD-YYYY'), 'start_date');
                                    }}
                                  />
                                </Form.Item>
                              </Col>
                              <Col md={12} xs={24}>
                                <Form.Item name="start_time" label="Start Time">
                                  <TimePicker
                                    selected={moment(settingData?.start_time).format('HH:mm')}
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
                                        setEditFormDate({
                                          ...EditFormDate,
                                          endDate: selectedValue,
                                        });
                                        console.log(moment(selectedValue).format('MM-DD-YYYY'), 'end_date');
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
                              <b>
                                <label>Schedule to User Groups</label>
                              </b>
                              {console.log(arrayDataUser, 'arrayDataUser')}
                              <Form.Item
                                name="schedule_to_group"
                                // rules={[
                                //   {
                                //     required: true,
                                //     message: 'Select Schedule to User Groups',
                                //   },
                                // ]}
                              >
                                <Select
                                  mode="multiple"
                                  allowClear
                                  showSearch
                                  filterOption={(inputValue, option) =>
                                    option.children
                                      .join('')
                                      .toLowerCase()
                                      .includes(inputValue.toLowerCase())
                                  }
                                  style={{ width: '100%' }}
                                  classNamePrefix="select"
                                  isSearchable={true}
                                  arrayDataUsergroup={arrayDataUsergroup}
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
                                <label>Schedule to Individual</label>
                              </b>
                              <Form.Item
                                name="schedule_to_individual"
                                // rules={[
                                //   {
                                //     required: true,
                                //     message: 'Select Schedule to Individual',
                                //   },
                                // ]}
                              >
                                <Select
                                  mode="multiple"
                                  allowClear
                                  showSearch
                                  filterOption={(inputValue, option) =>
                                    option.children
                                      .join('')
                                      .toLowerCase()
                                      .includes(inputValue.toLowerCase())
                                  }
                                  style={{ width: '100%' }}
                                  classNamePrefix="select"
                                  isSearchable={true}
                                  arrayDataUser={arrayDataUser}
                                >
                                  {arrayDataUser != null
                                    ? arrayDataUser.map((item, index) => <Option value={item.id}>{item.name} </Option>)
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
                                    onChange={() => setEditActiveSwitch(!EditActiveSwitch)}
                                    checked={EditActiveSwitch}
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
          ) : (
            ''
          )}
        </section>
      </Main>
    </>
  );
};

export default EditNewExam;
