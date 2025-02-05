import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Tabs, Row, Input, Switch, Spin, Card } from 'antd';
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
import moment from 'moment';
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-build-classic-mathtype';
import {
  get_api_request,
  post_api_request,
  put_api_request,
  delete_api_request,
  api_url,
} from '../../helpers/Common.js';

import { Editor, EditorTools } from '@progress/kendo-react-editor';
import { Cards } from '../../components/cards/frame/cards-frame';
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
const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

var ModuleName = 'DASHBOARD';
const EditNewQuiz = () => {
  const location = useLocation();
  const [EditScheuleForm] = Form.useForm();

  const [SettingForm] = Form.useForm();
  const [EditForm] = Form.useForm();
  const [form] = Form.useForm();
  const [FilterForm] = Form.useForm();
  const history = useHistory();
  const { TabPane } = Tabs;

  const [ViewquestionsData, setViewquestionsData] = useState();
  const [AddedQuestion, setAddedQuestion] = useState([]);
  const [ShowNegativeMark, setShowNegativeMark] = useState(false);
  const [ScheduleData, setScheduleData] = useState([]);
  const [allquestions, setallquestions] = useState();
  const [levelsData, setlevelsData] = useState();
  const [render, setrender] = useState(0);
  const [arrayDataUser, setarrayDataUser] = useState(null);
  const [QuestionTypeData, setQuestionTypeData] = useState([]);
  const [arrayDataUsergroup, setarrayDataUsergroup] = useState(null);
  const [filtertagsData, setfiltertagsData] = useState();
  const [filtertopicData, setfiltertopicData] = useState();
  const [QuizTypeData, setQuizTypeData] = useState([]);
  const [moduledataarray, setmoduledataarray] = useState();
  const [ShowStartTimeFields, setShowStartTimeFields] = useState(true);
  const [updatedid, setupdatedid] = useState([]);
  const [arrayDatasubcategory, setarrayDatasubcategory] = useState(null);
  const [AccessPoint, setAccessPoint] = useState();
  const [QuestionSearchData, setQuestionSearchData] = useState();
  const [quizupdatedid, setquizupdatedid] = useState([]);

  const [showsolutionvalue, setshowsolutionvalue] = useState(false);
  const [EditActiveStatusSwitch, setEditActiveStatusSwitch] = useState(false);
  const [PaidAccess, setPaidAccess] = useState();
  const [showredeemvalue, setshowredeemvalue] = useState(false);
  const [Visibility, setVisibility] = useState();
  const [status, setStatus] = useState();
  const [ShowAddNewQuizType, setShowAddNewQuizType] = useState(false);
  const [SkillsData, setSkillsData] = useState([]);
  const [filtersectionData, setfiltersectionData] = useState([]);
  const [ShowEditNewQuizType, setShowEditNewQuizType] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [Active, setActive] = useState(false);
  const [ActiveMarks, setActiveMarks] = useState(false);
  const [IsActiveMarks, setIsActiveMarks] = useState(false);
  const [Negative, setNegative] = useState(false);
  const [IsNegative, setIsNegative] = useState(false);
  const [NegativeType, setNegativeType] = useState(false);
  const [IsNegativeType, setIsNegativeType] = useState(false);
  const [Shuffle, setShuffle] = useState(false);
  const [IsShuffle, setIsShuffle] = useState(false);
  const [Restrict, setRestrict] = useState(false);
  const [IsRestrict, setIsRestrict] = useState(false);
  const [Disable, setDisable] = useState(false);
  const [IsDisable, setIsDisable] = useState(false);
  const [Enable, setEnable] = useState(false);
  const [IsEnable, setIsEnable] = useState(false);
  const [Hide, setHide] = useState(false);
  const [IsHide, setIsHide] = useState(false);
  const [Show, setShow] = useState(false);
  const [IsShow, setIsShow] = useState(false);
  const [Showscroeboard, setShowscroeboard] = useState(false);
  const [IsscroeboardShow, setIsscroeboardShow] = useState(false);
  const [startDate, setStartDate] = useState();
  const [StartTime, setStartTime] = useState();
  const [ActiveStatusSwitch, setActiveStatusSwitch] = useState(false);
  const [EditActiveSwitch, setEditActiveSwitch] = useState(false);
  const [EndDate, setEndDate] = useState();
  const [EndTime, setEndTime] = useState();
  const [ShowPointsMode, setShowPointsMode] = useState(false);
  const [RestrictAttempts, setRestrictAttempts] = useState(false);
  const [QuizsettingById, setQuizsettingById] = useState();
  const [ShowDurationminutes, setShowDurationminutes] = useState(false);
  //
  const [sidebaroptions, setsidebaroptions] = useState(false);
  const [OptionLoading, setOptionLoading] = useState(false);
  const [add_sidebaroptions, setadd_sidebaroptions] = useState(false);
  const [add_OptionLoading, setadd_OptionLoading] = useState(false);
  const [ShowOptionsByViewQuestionID, setShowOptionsByViewQuestionID] = useState();
  const [sidebaroptionss, setsidebaroptionss] = useState(false);
  const [ShowOptionsByAddQuestionID, setShowOptionsAddQuestionID] = useState();
  const [ActiveDetails, setActiveDetails] = useState(true);
  const [Activesolution, setActivesolution] = useState(false);
  const [ActiveSetting, setActiveSetting] = useState(false);
  const [ActiveAttachment, setActiveAttachment] = useState(false);
  const [AllInstructor, setAllInstructor] = useState([]);
  const [EditFormDate, setEditFormDate] = useState({
    startDate: '',
    endDate: '',
  });
  const [loading, setloading] = useState(false);
  //

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
    terms_condition: '',
    points: '',
    description: '',
    quiz_type: '',
    category: '',
    title: '',
    created_by: '',
    price: '',
    durationModeAuto: '',
    durationModeManual: '',
    marksModeAuto: '',
    marksModeManual: '',
    durationMinutes: '',
    marksforCorrectAnswer: '',
    negatineMarkingAuto: '',
    negatineMarkingManual: '',
    negatineMarkingTypeAuto: '',
    negatineMarkingTypeManual: '',
    negativMarks: '',
    pass_percentage: '',
    suffleQuestionAuto: '',
    suffleQuestionManual: '',
    restrictAttemptAuto: '',
    restrictAttemptManual: '',
    numberofAttempts: '',
    dissableFinishButtonAuto: '',
    dissableFinishButtonManual: '',
    enableQusetionListAuto: '',
    enableQusetionListManual: '',
    hideSoluationsAuto: '',
    hideSoluationsManual: '',
    showLeaderBoardAuto: '',
    showLeaderBoardManual: '',
    showScoreBoardAuto: '',
    showScoreBoardManual: '',
  });

  const [ShowTabPane, setShowTabPane] = useState({
    Detail: true,
    Settings: false,
    Questions: false,
    Schedules: false,
    QuizDetails: true,
    QuizSettings: false,
    QuizQuestions: false,
    QuizSchedules: false,
  });
  const [ShowQuestions, setShowQuestions] = useState({
    ViewQuestion: true,
    AddQuestion: false,
    CurrentView: false,
    CurrentAdd: false,
  });

  const [FilterData, setFilterData] = useState({
    by_code: '',
    by_section: '',
    by_skill: '',
    by_topic: '',
  });
  const [SeacrhArray, setSeacrhArray] = useState([]);
  const [LevelArray, setLevelArray] = useState([]);
  const [RenderSearchQuestionData, setRenderSearchQuestionData] = useState(0);
  const params = useParams();
  const id = decodetheid(params.id);
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
        Questions: false,
        Schedules: true,
        QuizDetails: false,
        QuizSettings: false,
        QuizQuestions: false,
        QuizSchedules: true,
      });
      setActiveAttachment(true);
      setActiveDetails(false);
      setActiveSetting(false);
      setActivesolution(false);
    }
    async function GetAllSkills() {
      const url = api_url.get_skills;
      const response = await get_api_request(url, headers);

      if (response.status == 200) {
        const Skills = response?.data?.responsedata;
        const SkillsDataarray = Skills.map(item => {
          return { id: item.id, name: item.skill_name };
        });
        setSkillsData(SkillsDataarray);
      } else {
        console.log('error');
      }
    }
    GetAllSkills();

    async function getFilterSection() {
      const url = api_url.get_section;
      const response = await get_api_request(url, headers);

      if (response.status == 200) {
        const Section = response?.data?.responsedata;
        const filtersection = Section.map(item => {
          return { id: item.id, name: item.section_name };
        });
        setfiltersectionData(filtersection);
      } else {
        console.log('error');
      }
    }
    getFilterSection();

    async function getFilterTopics() {
      const url = api_url.get_topics;
      const response = await get_api_request(url, headers);

      if (response.status == 200) {
        const Topics = response?.data?.responsedata;
        const filtertopics = Topics.map(item => {
          return { id: item.id, name: item.topic_name };
        });
        setfiltertopicData(filtertopics);
      } else {
        console.log('error');
      }
    }
    getFilterTopics();

    async function getFilterTags() {
      const url = api_url.get_tags;
      const response = await get_api_request(url, headers);

      if (response.status == 200) {
        const Tags = response?.data?.responsedata;
        const filtertags = Tags.map(item => {
          return { id: item.id, name: item.tag_name };
        });
        setfiltertagsData(filtertags);
      } else {
        console.log('error');
      }
    }
    getFilterTags();

    getaddedquestions();

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

    async function Getallmodules(data) {
      const url = api_url.getall_modules;
      const response = await get_api_request(url, headers);

      if (response.status == 200) {
        const Moduledata = response?.data?.responsedata?.modules;
        const getmodules = Moduledata.map(items => {
          if (items.name == 'QUIZ TYPES') {
            const parentdata = items?.parent_id;
            async function getentitybyparentid() {
              const url = api_url.get_entity_byparentid + parentdata;
              const response = await get_api_request(url, headers);

              const questiontypedata = response?.data?.responsedata;
              questiontypedata.map(item => {
                return { id: item.id, name: item.name };
              });
              setQuizTypeData(questiontypedata);
            }
            getentitybyparentid();
            setmoduledataarray(items);
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

    getQuizbyID();

    if (id == 2) {
      setShowTabPane({
        Detail: false,
        Settings: false,
        Questions: false,
        Schedules: true,
        QuizDetails: false,
        QuizSettings: false,
        QuizSections: false,
        QuizQuestions: false,
        QuizSchedules: true,
      });
    }
    setrender(0);
    GetAllSchedules(id);
  }, [render]);

  async function GetAllSchedules() {
    const url = api_url.get_schedules_by_event_id + id + '/' + '29';
    const response = await get_api_request(url, headers);

    if (response.status == 200) {
      const SchedulesData = response?.data?.data;
      setScheduleData(SchedulesData);
    } else {
      console.log('error');
    }
  }

  async function getQuizbyID() {
    const url = api_url.getquiz_by_id + id;
    const response = await get_api_request(url, headers);
    if (response.status == 200) {
      var quizdatabyid = response?.data?.data[0];
      var QuizSettingDatabyId = response?.data?.meta?.settings;
      setQuizsettingById(QuizSettingDatabyId);

      updateids = quizdatabyid?.id;

      quizupdatedid.push(quizdatabyid?.id);

      setSettingsData({
        ...SettingsData,
        free: quizdatabyid?.free == 1 ? true : false,
        visibility: quizdatabyid?.visibility == 1 ? true : false,
        active: quizdatabyid?.active == 1 ? true : false,
        redeem_points: quizdatabyid?.redeem_points,
        points: quizdatabyid?.points == 1 ? true : false,
        title: quizdatabyid?.title,
        created_by: quizdatabyid?.created_by,
        price: quizdatabyid?.price,
        category: quizdatabyid?.category_id,
        quiz_type: quizdatabyid?.quiz_type,
        description: quizdatabyid?.description,
        durationModeAuto: QuizSettingDatabyId?.durationModeAuto,
        durationModeManual: QuizSettingDatabyId?.durationModeManual,
        marksModeAuto: QuizSettingDatabyId?.marksModeAuto,
        marksModeManual: QuizSettingDatabyId?.marksModeManual,
        durationMinutes: QuizSettingDatabyId?.durationMinutes, //
        marksforCorrectAnswer: QuizSettingDatabyId?.marksforCorrectAnswer, //
        negativMarks: QuizSettingDatabyId?.negativMarks, //
        pass_percentage: QuizSettingDatabyId?.pass_percentage, //
        numberofAttempts: QuizSettingDatabyId?.numberofAttempts, //
        negatineMarkingAuto: QuizSettingDatabyId?.negatineMarkingAuto,
        negatineMarkingManual: QuizSettingDatabyId?.negatineMarkingManual,
        negatineMarkingTypeAuto: QuizSettingDatabyId?.negatineMarkingTypeAuto,
        negatineMarkingTypeManual: QuizSettingDatabyId?.negatineMarkingTypeManual,
        suffleQuestionAuto: QuizSettingDatabyId?.suffleQuestionAuto,
        suffleQuestionManual: QuizSettingDatabyId?.suffleQuestionManual,
        restrictAttemptAuto: QuizSettingDatabyId?.restrictAttemptAuto,
        restrictAttemptManual: QuizSettingDatabyId?.restrictAttemptManual,
        dissableFinishButtonAuto: QuizSettingDatabyId?.dissableFinishButtonAuto,
        dissableFinishButtonManual: QuizSettingDatabyId?.dissableFinishButtonManual,
        enableQusetionListAuto: QuizSettingDatabyId?.enableQusetionListAuto,
        enableQusetionListManual: QuizSettingDatabyId?.enableQusetionListManual,
        hideSoluationsAuto: QuizSettingDatabyId?.hideSoluationsAuto,
        hideSoluationsManual: QuizSettingDatabyId?.hideSoluationsManual,
        showLeaderBoardAuto: QuizSettingDatabyId?.showLeaderBoardAuto,
        showLeaderBoardManual: QuizSettingDatabyId?.showLeaderBoardManual,
        showScoreBoardAuto: QuizSettingDatabyId?.showScoreBoardAuto,
        showScoreBoardManual: QuizSettingDatabyId?.showScoreBoardManual,
        terms_condition: QuizSettingDatabyId?.terms_condition,
      });
      EditForm.setFieldsValue({
        title: quizdatabyid?.title,
        created_by: quizdatabyid?.created_by,
        price: quizdatabyid?.price,
        category: quizdatabyid?.category_id,
        quiz_type: quizdatabyid?.quiz_type,
        free: quizdatabyid?.free,
        points: quizdatabyid?.points,
        visibility: quizdatabyid?.visibility,
        active: quizdatabyid?.active,
        redeem_points: quizdatabyid?.redeem_points,
        description: quizdatabyid?.description,
      });
      SettingForm.setFieldsValue({
        durationMinutes: QuizSettingDatabyId?.durationMinutes, //
        marksforCorrectAnswer: QuizSettingDatabyId?.marksforCorrectAnswer, //
        negativMarks: QuizSettingDatabyId?.negativMarks, //
        pass_percentage: QuizSettingDatabyId?.pass_percentage, //
        numberofAttempts: QuizSettingDatabyId?.numberofAttempts, //
        terms_condition: QuizSettingDatabyId?.terms_condition,
      });
    } else {
      console.log('error');
    }
  }

  const HandleAction = e => {
    const ids = e.split(',');

    const actionid = ids?.[0];
    const rowid = ids?.[1];

    if (actionid == 3) {
      setShowEditNewQuizType(true);
      async function getschedulebyid() {
        const url = api_url.get_schedule_byId + rowid;
        const response = await get_api_request(url, headers);
        if (response.status == 200) {
          console.log(response);
          const scheduledatabyid = response?.data?.data[0];

          updateids = scheduledatabyid?.id;

          updatedid.push(scheduledatabyid?.id);

          if (scheduledatabyid?.status == 1) {
            setEditActiveStatusSwitch(true);
          } else if (scheduledatabyid?.status == 0) {
            setEditActiveStatusSwitch(false);
          }

          setsettingData({
            ...settingData,
            editflex: scheduledatabyid?.schedule_type == 'Flexible' ? true : false,
            editfixed: scheduledatabyid?.schedule_type == 'Fixed' ? true : false,
            end_date: new Date(scheduledatabyid?.end_date),
            start_date: new Date(scheduledatabyid?.start_date),
          });
          setEditFormDate({
            startDate: scheduledatabyid?.start_date ? new Date(scheduledatabyid?.start_date) : '',
            endDate: scheduledatabyid?.end_date ? new Date(scheduledatabyid?.end_date) : '',
          });

          var numberArray;
          if (scheduledatabyid?.schedule_to_individual) {
            numberArray = JSON.parse(scheduledatabyid?.schedule_to_individual);
          }
          var groupArray;
          if (scheduledatabyid.schedule_to_group) {
          }

          EditScheuleForm.setFieldsValue({
            start_date: moment(scheduledatabyid?.start_date).format('MM-DD-YYYY'),
            start_time: moment(scheduledatabyid?.start_time, 'HH:mm'),
            end_date: moment(scheduledatabyid?.end_date).format('MM-DD-YYYY'),
            end_time: moment(scheduledatabyid?.end_time, 'HH:mm'),
            grace_period_to_join: scheduledatabyid?.grace_period_to_join,
            schedule_to_group: scheduledatabyid.schedule_to_group,
            schedule_individual: numberArray,
          });
        } else {
          console.log('error');
        }
      }
      getschedulebyid();
    } else if (actionid == 1) {
      history.push(`../${actionid}/overallQuiz-report`);
    } else if (actionid == 4) {
      handleDelete(rowid);
    }
  };

  const CopyToClipboard = e => {
    const id = encrypttheid(e);

    navigator.clipboard.writeText(`${domainpath}/dashboard/engage/edit-quiz/${id}`);
    notification.success({
      message: `Copied Successfully ${domainpath}/dashboard/engage/edit-quiz/${id}`,
    });
  };

  const AddNewSchedule = fieldsvalue => {
    var schedule_Type;
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
    const IndividualString = JSON.stringify(fieldsvalue?.schedule_individuel);
    var addnewschedule = {
      event_type: 29,
      event_id: id,
      schedule_type: schedule_Type,
      start_date: moment(fieldsvalue?.start_date).format('YYYY-MM-DD'),
      start_time: moment(fieldsvalue?.start_time).format('HH:mm'),
      end_date: moment(fieldsvalue?.end_date).format('YYYY-MM-DD'),
      end_time: moment(fieldsvalue?.end_time).format('HH:mm'),
      grace_period_to_join: fieldsvalue?.grace_period_to_join,
      schedule_to_group: fieldsvalue?.user_groups,
      schedule_to_individual: IndividualString,
      status: activeswicth,
    };

    async function CreateSchedule() {
      const url = api_url.create_schedule;
      const response = await post_api_request(url, addnewschedule, headers);

      if (response.status === 201) {
        notification.success({
          message: 'Schedule Created Successfully',
        });
        setrender(render + 1);

        setActiveStatusSwitch(false);
        function Resetform() {
          document.getElementById('schedule_form')?.reset();
        }
        Resetform();
        setTimeout(() => {
          notification.destroy();
        }, 2000);
        setShowAddNewQuizType(false);
        setStartDate();
        setEndDate();
      } else {
        notification.error({ message: response?.data?.message });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      }
    }
    CreateSchedule();
  };

  const EditNewSchedule = fieldsvalue => {
    var payload = {};

    var schedule_Type;
    if (settingData.editfixed == true) {
      schedule_Type = 'Fixed';
    } else if (settingData.editflex == true) {
      schedule_Type = 'Flexible';
      payload['end_date'] = moment(EditFormDate?.endDate).format('YYYY-MM-DD');
      if (settingData?.end_time) {
        payload['end_time'] = moment(fieldsvalue?.end_time).format('HH:mm');
      }
    }
    var activeswicth;

    if (EditActiveStatusSwitch == true) {
      activeswicth = 1;
    } else {
      activeswicth = 0;
    }
    const IndividualString = JSON.stringify(fieldsvalue?.schedule_individual);
    const GroupString = JSON.stringify(fieldsvalue?.schedule_to_group);
    payload['status'] = activeswicth;
    payload['start_date'] = moment(EditFormDate.startDate).format('YYYY-MM-DD');
    payload['start_time'] = moment(fieldsvalue?.start_time).format('HH:mm');
    payload['grace_period_to_join'] = fieldsvalue?.grace_period_to_join;
    payload['schedule_to_group'] = fieldsvalue?.schedule_to_group;
    payload['schedule_to_individual'] = IndividualString;
    payload['schedule_type'] = schedule_Type;
    console.log(payload);
    console.log(updatedid);
    async function UpdatedSchedule() {
      const url = api_url.update_schedulebyId + updatedid?.[0];
      const response = await put_api_request(url, payload, headers);

      if (response.status === 201) {
        notification.success({
          message: 'Schedule Updated Successfully',
        });
        setupdatedid([]);
        setEditFormDate({
          startDate: '',
          endDate: '',
        });
        EditScheuleForm.resetFields();
        setTimeout(() => {
          notification.destroy();
          setShowEditNewQuizType(false);
        }, 2000);
        setrender(render + 1);
      } else {
        notification.error({ message: response?.data?.message });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      }
    }
    UpdatedSchedule();
  };

  const handleDelete = id => {
    var deletedrowid = id;
    var column = 'id';
    async function deleteData(id) {
      const url = api_url.delete_scheduleby_id + deletedrowid;

      const response = await delete_api_request(url, headers);

      if (response.status === 201) {
        notification.success({
          message: 'Schedule Deleted Successfully',
        });

        const afterdeletedata = ScheduleData.filter(item => {
          if (column != '') {
            return item[column] != deletedrowid;
          }
          return item;
        });

        setScheduleData(afterdeletedata);
      } else if (response.status === 400) {
        alert(response.data.message);
      } else {
        alert('Error');
      }
    }
    deleteData(id);
  };

  const columns = [
    {
      name: 'CODE',
      selector: row => (
        <>
          {row.id ? (
            <p onClick={() => CopyToClipboard(row.id)}>
              <i class="fa fa-files-o" aria-hidden="true"></i> {encrypttheid(row.id)}
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
      selector: row => (row.start_date ? moment(row.start_date).format('MM-DD-YYYY') : ''),
      sortable: true,
    },
    {
      name: 'ENDS AT	',
      selector: row => (row.end_date ? moment(row.end_date).format('MM-DD-YYYY') : ''),
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
  const EditQuizDetail = name => {
    var EditQuizDetail = {
      free: SettingsData?.free == true ? 1 : 0,
      active: SettingsData?.active == true ? 1 : 0,
      description: SettingsData?.description,
      title: SettingsData?.title,
      created_by: SettingsData?.created_by,
      price: SettingsData?.price,
      category_id: SettingsData?.category,
      quiz_type: SettingsData?.quiz_type,
      points: SettingsData?.points == true ? 1 : 0,
      visibility: SettingsData?.visibility == true ? 1 : 0,
      redeem_points: SettingsData?.redeem_points,
    };

    var meta = {};

    EditQuizDetail['meta'] = meta;
    console.log(EditQuizDetail);
    async function UpdatedQuiz() {
      const url = api_url.update_quiz_byId + quizupdatedid?.[0];
      const response = await put_api_request(url, EditQuizDetail, headers);

      if (response.status === 201) {
        notification.success({
          message: 'Quiz Updated Successfully',
        });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
        if (name == 'details') {
          setShowTabPane({
            Detail: false,
            Settings: true,
            Questions: false,
            Schedules: false,
            QuizDetails: false,
            QuizSettings: true,
            QuizQuestions: false,
            QuizSchedules: false,
          });
          setActiveDetails(false);
          setActiveSetting(true);
          setActivesolution(false);
          setActiveAttachment(false);
        }
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
    var meta = {};
    var EditSettings = {
      free: SettingsData?.free == true ? 1 : 0,
      active: SettingsData?.active == true ? 1 : 0,
      description: SettingsData?.description,
      title: SettingsData?.title,
      created_by: SettingsData?.created_by,
      price: SettingsData?.price,
      category_id: SettingsData?.category,
      quiz_type: SettingsData?.quiz_type,
      points: SettingsData?.points == true ? 1 : 0,
      visibility: SettingsData?.visibility == true ? 1 : 0,
      redeem_points: SettingsData?.redeem_points,
    };

    meta = {
      settings: {
        durationMinutes: SettingsData.durationMinutes,
        marksforCorrectAnswer: SettingsData.marksforCorrectAnswer,
        negativMarks: SettingsData.negativMarks,
        pass_percentage: SettingsData.pass_percentage,
        numberofAttempts: SettingsData.numberofAttempts,
        durationModeAuto: SettingsData.durationModeAuto,
        durationModeManual: SettingsData.durationModeManual,
        marksModeAuto: SettingsData.marksModeAuto,
        marksModeManual: SettingsData.marksModeManual,
        negatineMarkingAuto: SettingsData.negatineMarkingAuto,
        negatineMarkingManual: SettingsData.negatineMarkingManual,
        negatineMarkingTypeAuto: SettingsData.negatineMarkingTypeAuto,
        negatineMarkingTypeManual: SettingsData.negatineMarkingTypeManual,
        suffleQuestionAuto: SettingsData.suffleQuestionAuto,
        suffleQuestionManual: SettingsData.suffleQuestionManual,
        restrictAttemptAuto: SettingsData.restrictAttemptAuto,
        restrictAttemptManual: SettingsData.restrictAttemptManual,
        dissableFinishButtonAuto: SettingsData.dissableFinishButtonAuto,
        dissableFinishButtonManual: SettingsData.dissableFinishButtonManual,
        enableQusetionListAuto: SettingsData.enableQusetionListAuto,
        enableQusetionListManual: SettingsData.enableQusetionListManual,
        hideSoluationsAuto: SettingsData.hideSoluationsAuto,
        hideSoluationsManual: SettingsData.hideSoluationsManual,
        showLeaderBoardAuto: SettingsData.showLeaderBoardAuto,
        showLeaderBoardManual: SettingsData.showLeaderBoardManual,
        showScoreBoardAuto: SettingsData?.showScoreBoardAuto,
        showScoreBoardManual: SettingsData?.showScoreBoardManual,
        terms_condition: SettingsData?.terms_condition,
      },
    };

    EditSettings['meta'] = meta;

    async function UpdatedQuiz() {
      const url = api_url.update_quiz_byId + quizupdatedid?.[0];
      const response = await put_api_request(url, EditSettings, headers);

      if (response.status === 201) {
        notification.success({
          message: 'Quiz Setting Updated Successfully',
        });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
        if (name == 'settings') {
          setShowTabPane({
            Detail: false,
            Settings: false,
            Questions: true,
            Schedules: false,
            QuizDetails: false,
            QuizSettings: false,
            QuizQuestions: true,
            QuizSchedules: false,
          });
        }
      } else {
        notification.error({ message: 'server error' });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      }
    }
    UpdatedQuiz();
  };
  async function getaddedquestions() {
    const url = api_url.getQuestion_by_quizID + id;
    const response = await get_api_request(url, headers);
    if (response.status == 200) {
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
  const AddQuestionByID = e => {
    setloading(true);
    var addQuestion = {
      quiz_id: id,
      questions: e,
    };

    async function AddQuizQuestion() {
      const url = api_url.add_question;
      const response = await post_api_request(url, addQuestion, headers);

      if (response.status === 201) {
        notification.success({
          message: 'Question Added Successfully',
        });
        setTimeout(() => {
          setloading(false);
        }, 500);
        getaddedquestions();
      } else {
        notification.error({ message: response?.message });
      }
    }
    AddQuizQuestion();
  };

  const RemoveQuestionByID = e => {
    setloading(true);
    async function deleteData(e) {
      const quiz_id = id;
      const questionID = e;
      const connect_ID = quiz_id + '/' + questionID;
      const url = api_url.remove_question_by_questionID + connect_ID;

      const response = await delete_api_request(url, headers);

      if (response.status === 201) {
        notification.success({
          message: 'Question Removed Successfully',
        });
        setTimeout(() => {
          setloading(false);
        }, 200);
        setTimeout(() => {
          getaddedquestions();
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

    var payload = {
      code: FilterData?.by_code,
      section: FilterData?.by_section,
      skill: FilterData?.by_skill,
      type: Type,
      topic: FilterData?.by_topic,
      difficulty_level: DifficultyLevel,
    };

    async function GetSearchQuestion() {
      const url = api_url.search_question;
      const response = await post_api_request(url, payload, headers);
      if (response.status == 200) {
        const searchedQuestionsData = response?.data?.data;

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
                {ShowTabPane?.QuizDetails == true ? (
                  <p>
                    <b>Quiz Details</b>
                    <br />
                    New Quiz
                  </p>
                ) : (
                  ''
                )}
                {ShowTabPane?.QuizSettings == true ? (
                  <p>
                    <b>Quiz Settings</b>
                    <br />
                    New Setting
                  </p>
                ) : (
                  ''
                )}
                {ShowTabPane?.QuizQuestions == true ? (
                  <p>
                    <b>Quiz Questions</b>
                    <br />
                  </p>
                ) : (
                  ''
                )}
                {ShowTabPane?.QuizSchedules == true ? (
                  <p>
                    <b>Quiz Schedule</b>
                    <br />
                    New Schedule
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
                        Questions: false,
                        Schedules: false,
                        QuizDetails: true,
                        QuizSettings: false,
                        QuizQuestions: false,
                        QuizSchedules: false,
                      });
                      setActiveDetails(true);
                      setActiveSetting(false);
                      setActivesolution(false);
                      setActiveAttachment(false);
                    }}
                    data-rowid={'0'}
                  >
                    <span>1</span> Details
                  </button>
                  <button
                    id="Settings"
                    data-rowid={'2'}
                    className={ActiveSetting ? 'practice-tabpane' : ''}
                    onClick={e => {
                      setShowTabPane({
                        Detail: false,
                        Settings: true,
                        Questions: false,
                        Schedules: false,
                        QuizDetails: false,
                        QuizSettings: true,
                        QuizQuestions: false,
                        QuizSchedules: false,
                      });
                      setActiveDetails(false);
                      setActiveSetting(true);
                      setActivesolution(false);
                      setActiveAttachment(false);
                    }}
                  >
                    <span>2</span> Settings
                  </button>

                  <button
                    id="Questions"
                    data-rowid={'3'}
                    className={Activesolution ? 'practice-tabpane' : ''}
                    onClick={e => {
                      setShowTabPane({
                        Detail: false,
                        Settings: false,
                        Questions: true,
                        Schedules: false,
                        QuizDetails: false,
                        QuizSettings: false,
                        QuizQuestions: true,
                        QuizSchedules: false,
                      });
                      setActiveDetails(false);
                      setActiveSetting(false);
                      setActivesolution(true);
                      setActiveAttachment(false);
                    }}
                  >
                    <span>3</span> Questions
                  </button>
                  <button
                    id="Schedules"
                    className={ActiveAttachment ? 'practice-tabpane' : ''}
                    data-rowid={'3'}
                    onClick={e => {
                      setShowTabPane({
                        Detail: false,
                        Settings: false,
                        Questions: false,
                        Schedules: true,
                        QuizDetails: false,
                        QuizSettings: false,
                        QuizQuestions: false,
                        QuizSchedules: true,
                      });
                      setActiveDetails(false);
                      setActiveSetting(false);
                      setActivesolution(false);
                      setActiveAttachment(true);
                    }}
                  >
                    <span>4</span> Schedules
                  </button>
                </div>
              </div>
            </div>
          </Cards>

          {ShowTabPane?.Detail == true ? (
            <>
              <Main>
                <Cards>
                  <Form
                    form={EditForm}
                    name="sDash_validation-form"
                    layout="vertical"
                    className="Details_form"
                    onFinish={() => EditQuizDetail('details')}
                  >
                    <Row gutter={30} style={{ margin: '20px 0 0 0' }}>
                      <Col md={18} xs={24} style={{ margin: '0 auto' }}>
                        <Row gutter={30}>
                          <Col md={24} xs={24} style={{ margin: '20px 0 0 0' }}>
                            <Form.Item
                              label="Title"
                              name="title"
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
                                placeholder="First Name"
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
                            <Col md={24} xs={24} className="skillrow-inner mBottom" id="create_by">
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
                          <Col md={12} xs={24} id="category">
                            <Form.Item
                              label="Category"
                              name="category"
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
                                  setSettingsData({ ...SettingsData, category: selectedValue });
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
                          <Col md={12} xs={24} id="quiz_type">
                            <Form.Item name="quiz_type" label="Quiz Type">
                              <Select
                                QuizTypeData={QuizTypeData}
                                onChange={selectedValue => {
                                  setSettingsData({ ...SettingsData, quiz_type: selectedValue });
                                }}
                              >
                                {QuizTypeData != null
                                  ? QuizTypeData.map((item, index) => <Option value={item.id}>{item.name} </Option>)
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
                              <Form.Item
                                label="Points Required to Redeem"
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
                        <Row gutter={30} className="switchToggle">
                          <Col md={21}>
                            <p>
                              <b>Visibility - Public</b> <br /> Private (Only scheduled user groups can access). Public
                              (Anyone can access).
                            </p>
                          </Col>
                          <Col md={3}>
                            <Form name="visibility">
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
                </Cards>
              </Main>
            </>
          ) : (
            ''
          )}
          {ShowTabPane?.Settings == true ? (
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

                          <Col md={12}>
                            {' '}
                            <div className="video_buttons">
                              <Button
                                value={1}
                                className={
                                  SettingsData?.durationModeManual == undefined ||
                                  SettingsData?.durationModeManual == false
                                    ? 'bg-salmon'
                                    : ''
                                }
                                onClick={() => {
                                  setIsActive(current => !current);
                                  setActive(false);
                                  setSettingsData({
                                    ...SettingsData,
                                    durationModeAuto: true,
                                    durationModeManual: false,
                                  });
                                  setShowDurationminutes(false);
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
                                  setShowDurationminutes(true);
                                }}
                              >
                                Manual
                              </Button>
                            </div>
                          </Col>
                        </Col>

                        {SettingsData?.durationModeManual != undefined && SettingsData?.durationModeManual != false ? (
                          <Col md={24}>
                            <b>
                              {' '}
                              <label> Duration (Minutes)</label>
                            </b>
                            <Form.Item
                              name="durationMinutes"
                              rules={[
                                {
                                  required: true,
                                  message: 'Duration is required !',
                                },
                              ]}
                            >
                              <Input
                                type="text"
                                placeholder="Enter Duration (in minutes)"
                                onChange={selectedValue => {
                                  setSettingsData({ ...SettingsData, durationMinutes: selectedValue.target.value });
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
                                className={
                                  SettingsData?.marksModeManual == undefined || SettingsData?.marksModeManual == false
                                    ? 'bg-salmon'
                                    : ''
                                }
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
                        {SettingsData?.marksModeManual != undefined && SettingsData?.marksModeManual != false ? (
                          <Col md={24}>
                            <b>
                              {' '}
                              <label>Marks for Correct Answer</label>
                            </b>
                            <Form.Item
                              name="marksforCorrectAnswer"
                              rules={[
                                {
                                  required: true,
                                  message: 'Marks for Correct Answer is required',
                                },
                              ]}
                            >
                              <Input
                                type="text"
                                placeholder="Enter Duration (in minutes)"
                                onChange={selectedValue => {
                                  setSettingsData({
                                    ...SettingsData,
                                    marksforCorrectAnswer: selectedValue.target.value,
                                  });
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
                                className={SettingsData?.negatineMarkingAuto == true ? 'bg-salmon' : ''}
                                onClick={() => {
                                  setIsNegative(current => !current);
                                  setNegative(false);

                                  setSettingsData({
                                    ...SettingsData,
                                    negatineMarkingAuto: true,
                                    negatineMarkingManual: false,
                                  });
                                  setShowNegativeMark(true);
                                }}
                              >
                                Yes
                              </Button>
                              <Button
                                value={2}
                                className={
                                  SettingsData?.negatineMarkingAuto == undefined ||
                                  SettingsData?.negatineMarkingAuto == false
                                    ? 'bg-salmon'
                                    : ''
                                }
                                onClick={() => {
                                  setIsNegative(false);
                                  setNegative(current => !current);
                                  setSettingsData({
                                    ...SettingsData,
                                    negatineMarkingManual: true,
                                    negatineMarkingAuto: false,
                                  });
                                  setShowNegativeMark(false);
                                }}
                              >
                                No
                              </Button>
                            </div>
                          </Col>
                        </Col>
                        {SettingsData?.negatineMarkingAuto != undefined &&
                        SettingsData?.negatineMarkingAuto != false ? (
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
                              {' '}
                              <div className="video_buttons">
                                <Button
                                  value={1}
                                  className={
                                    SettingsData?.negatineMarkingTypeManual == false ||
                                    SettingsData?.negatineMarkingTypeManual == undefined
                                      ? 'bg-salmon'
                                      : ''
                                  }
                                  onClick={() => {
                                    setIsNegativeType(current => !current);
                                    setNegativeType(false);

                                    setSettingsData({
                                      ...SettingsData,
                                      negatineMarkingTypeAuto: true,
                                      negatineMarkingTypeManual: false,
                                    });
                                  }}
                                >
                                  Fixed
                                </Button>
                                <Button
                                  value={2}
                                  id="No"
                                  className={SettingsData?.negatineMarkingTypeManual == true ? 'bg-salmon' : ''}
                                  onClick={() => {
                                    setIsNegativeType(false);
                                    setNegativeType(current => !current);
                                    setSettingsData({
                                      ...SettingsData,
                                      negatineMarkingTypeManual: true,
                                      negatineMarkingTypeAuto: false,
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
                        {SettingsData?.negatineMarkingAuto != undefined &&
                        SettingsData?.negatineMarkingAuto != false ? (
                          <Col md={24}>
                            <b>
                              {' '}
                              <label>Negative Marks</label>
                            </b>
                            <Form.Item
                              name="negativMarks"
                              rules={[
                                {
                                  required: true,
                                  message: 'Negative Marks are required',
                                },
                              ]}
                            >
                              <Input
                                type="text"
                                placeholder="Enter Number"
                                onChange={selectedValue => {
                                  setSettingsData({ ...SettingsData, negativMarks: selectedValue.target.value });
                                }}
                              />
                            </Form.Item>
                          </Col>
                        ) : (
                          ''
                        )}
                        <Col md={24}>
                          <b>
                            {' '}
                            <label>Pass Percentage</label>
                          </b>
                          <Form.Item
                            name="pass_percentage"
                            rules={[
                              {
                                required: true,
                                message: 'Pass Percentage are required',
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
                                  className={
                                    SettingsData?.suffleQuestionAuto == undefined ||
                                    SettingsData?.suffleQuestionAuto == false
                                      ? 'bg-salmon'
                                      : ''
                                  }
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
                                    setRestrictAttempts(true);
                                  }}
                                >
                                  Yes
                                </Button>
                                <Button
                                  value={2}
                                  id="No"
                                  className={
                                    SettingsData?.restrictAttemptAuto == undefined ||
                                    SettingsData?.restrictAttemptAuto == false
                                      ? 'bg-salmon'
                                      : ''
                                  }
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
                        {SettingsData?.restrictAttemptAuto != undefined &&
                        SettingsData?.restrictAttemptAuto != false ? (
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
                                className={SettingsData?.dissableFinishButtonAuto == true ? 'bg-salmon' : ''}
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
                                id="No"
                                className={
                                  SettingsData?.dissableFinishButtonAuto == undefined ||
                                  SettingsData?.dissableFinishButtonAuto == false
                                    ? 'bg-salmon'
                                    : ''
                                }
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
                                className={
                                  SettingsData?.enableQusetionListAuto == undefined ||
                                  SettingsData?.enableQusetionListAuto == false
                                    ? 'bg-salmon'
                                    : ''
                                }
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
                                className={
                                  SettingsData?.hideSoluationsAuto == undefined ||
                                  SettingsData?.hideSoluationsAuto == false
                                    ? 'bg-salmon'
                                    : ''
                                }
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
                                className={
                                  SettingsData?.showLeaderBoardAuto == undefined ||
                                  SettingsData?.showLeaderBoardAuto == false
                                    ? 'bg-salmon'
                                    : ''
                                }
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
          ) : (
            ''
          )}
          {ShowTabPane?.Questions == true ? (
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
                      <Col md={24} className="Select_Questions">
                        {ShowQuestions?.ViewQuestion == true ? <h3>Currently Viewing Questions</h3> : ''}
                        {ShowQuestions?.AddQuestion == true ? <h3>Currently Adding Questions</h3> : ''}
                        <b>
                          <span
                            style={{ cursor: 'pointer' }}
                            onClick={e => {
                              setShowQuestions({
                                ViewQuestion: true,
                                AddQuestion: false,
                              });
                              setsidebaroptions(false);
                              setadd_sidebaroptions(false);
                            }}
                          >
                            View Questions
                          </span>
                        </b>
                        <b> | </b>
                        <b>
                          <span
                            style={{ cursor: 'pointer' }}
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
                          </span>
                        </b>
                      </Col>
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
                              <p>
                                <b>Skill Name :</b>
                                {item?.skill_name}
                              </p>
                              <p>
                                <b>Question:</b>
                                {item?.questions}
                              </p>
                              {/* {sidebaroptions != false && ShowOptionsByViewQuestionID == item?.question_id ? (
                                <>
                                  {item?.options?.map(item => (
                                    <input style={{ Width: '100%' }} value={item?.value} readOnly />
                                  ))}
                                  <br />
                                  <a
                                    className="options-text"
                                    onClick={() => {
                                      setShowOptionsByViewQuestionID('');
                                      setsidebaroptions(false);
                                    }}
                                  >
                                    Hide Options
                                  </a>
                                </>
                              ) : (
                                <a
                                  className="options-text"
                                  onClick={() => {
                                    setShowOptionsByViewQuestionID(item?.question_id);
                                    setsidebaroptions(true);
                                  }}
                                >
                                  View Options
                                </a>
                              )} */}
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
                                    // <input style={{ Width: '100%' }} value={item?.value} readOnly />
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
                              <Col md={24} className="Unique_code_button">
                                {' '}
                                <p>{'que_' + encrypttheid(item?.id)}</p>
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
                              <p>
                                <b>Skill Name :</b>
                                {item?.skill_name}
                              </p>
                              <p>
                                <b>Question:</b>
                                {item?.questions}
                              </p>
                              {/* {sidebaroptionss != false && ShowOptionsByAddQuestionID == item?.id ? (
                                <>
                                  {item?.options?.map(item => (
                                    <input style={{ Width: '100%' }} value={item?.value} readOnly />
                                  ))}

                                  <br />
                                  <a
                                    className="options-text"
                                    onClick={() => {
                                      setShowOptionsAddQuestionID('');
                                      setsidebaroptionss(false);
                                    }}
                                  >
                                    Hide Options
                                  </a>
                                </>
                              ) : (
                                <a
                                  className="options-text"
                                  onClick={() => {
                                    setShowOptionsAddQuestionID(item?.id);
                                    setsidebaroptionss(true);
                                  }}
                                >
                                  View Options
                                </a>
                              )} */}
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
                                    // <input style={{ Width: '100%' }} value={item?.value} readOnly />
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
                              <Col md={24} className="Unique_code_button">
                                {' '}
                                <p>{'que_' + encrypttheid(item?.id)}</p>
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
                                      className="btn-animation"
                                      type="success"
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
                    <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Quiz Schedules</h1>
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
                      id="schedule_form"
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
                              <Form.Item name="schedule_type" label="Schedule Type Name">
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
                                <Form.Item name="start_date" label="Start Date">
                                  <DatePicker
                                    selected={startDate}
                                    minDate={new Date()}
                                    onChange={date => setStartDate(date)}
                                  />
                                </Form.Item>
                              </Col>
                              <Col md={12} xs={24}>
                                <Form.Item name="start_time" label="Start Time">
                                  <TimePicker selected={StartTime} onChange={date => setStartTime(date)} />
                                </Form.Item>
                              </Col>
                            </Col>
                            {ShowStartTimeFields != false ? (
                              <Col md={24} xs={24} className="Date_time_picker">
                                <Col md={12} xs={24}>
                                  <Form.Item name="end_date" label="End Date">
                                    <DatePicker
                                      selected={EndDate}
                                      minDate={startDate}
                                      onChange={date => setEndDate(date)}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col md={12} xs={24}>
                                  <Form.Item name="end_time" label="End Date">
                                    <TimePicker selected={EndTime} onChange={date => setEndTime(date)} />
                                  </Form.Item>
                                </Col>
                              </Col>
                            ) : (
                              ''
                            )}
                            <Col md={24} xs={24}>
                              <Form.Item
                                label="Grace Period to Join (Minutes)"
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
                                name="user_groups"
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
                              <Form.Item
                                name="schedule_individuel"
                                label="Schedule to Individual"
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
                      form={EditScheuleForm}
                      layout="vertical"
                      onFinish={EditNewSchedule}
                    >
                      <div className="headerDiv">
                        <p>Edit Schedule</p>
                        <div className="crossIcon">
                          <a
                            onClick={() => {
                              setShowEditNewQuizType(false);
                              setupdatedid([]);
                              setEditFormDate({
                                startDate: '',
                                endDate: '',
                              });
                              EditScheuleForm.resetFields();
                            }}
                          >
                            X
                          </a>
                        </div>
                      </div>
                      <Row gutter={30} className="AddQuizTpe_main" style={{ marginTop: ' 10px' }}>
                        <Col className="AddQuizTpe" md={24} xs={24}>
                          <Row gutter={30}>
                            <Col md={24} xs={24}>
                              <Form.Item name="schedule_type" label="Schedule Type Name">
                                <Input
                                  name="fixed"
                                  type="radio"
                                  id="fixed"
                                  checked={settingData?.editfixed}
                                  placeholder="Schedule_Type"
                                  onChange={e => {
                                    setsettingData({ ...settingData, editflex: false, editfixed: true });
                                    setShowStartTimeFields(false);
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
                                    minDate={new Date()}
                                    onChange={selectedValue => {
                                      setsettingData({ ...settingData, start_date: selectedValue });
                                      setEditFormDate({
                                        ...EditFormDate,
                                        startDate: selectedValue,
                                      });
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
                              <Form.Item
                                name="schedule_to_group"
                                // rules={[
                                //   {
                                //     required: true,
                                //     message: 'Select Schedule To User Groups',
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
                                name="schedule_individual"
                                // rules={[
                                //   {
                                //     required: true,
                                //     message: 'Select Schedule to Individual',
                                //   },
                                // ]}
                              >
                                <Select
                                  mode="multiple"
                                  style={{ width: '100%' }}
                                  classNamePrefix="select"
                                  isSearchable={true}
                                  arrayDataUser={arrayDataUser}
                                  allowClear
                                  showSearch
                                  filterOption={(inputValue, option) =>
                                    option.children
                                      .join('')
                                      .toLowerCase()
                                      .includes(inputValue.toLowerCase())
                                  }
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
          ) : (
            ''
          )}
        </section>
      </Main>
    </>
  );
};

export default EditNewQuiz;
