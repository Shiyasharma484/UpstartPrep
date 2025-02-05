import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Tabs, Row, Input, Switch, Card, Spin } from 'antd';
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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-build-classic-mathtype';
import { Editor, EditorTools } from '@progress/kendo-react-editor';
import { Cards } from '../../components/cards/frame/cards-frame';
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

const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

var ModuleName = 'DASHBOARD';
const CreateNewQuiz = () => {
  const [ViewquestionsData, setViewquestionsData] = useState();
  const [AddedQuestion, setAddedQuestion] = useState([]);
  const [RenderSearchQuestionData, setRenderSearchQuestionData] = useState(0);
  const [ScheduleData, setScheduleData] = useState([]);
  const history = useHistory();
  const [form] = Form.useForm();
  const [Scheduleform] = Form.useForm();
  const [FilterForm] = Form.useForm();
  const [levelsData, setlevelsData] = useState();
  const [AddForm] = Form.useForm();
  const [statusvalue, setstatusvalue] = useState(0);
  const [render, setrender] = useState(0);
  const [QuizTypeData, setQuizTypeData] = useState([]);
  const [ShowPointsMode, setShowPointsMode] = useState(false);
  const [updatedid, setupdatedid] = useState([]);
  const [EditScheuleForm] = Form.useForm();
  const [QuestionTypeData, setQuestionTypeData] = useState([]);
  const [RestrictAttempts, setRestrictAttempts] = useState(false);
  const [SkillsData, setSkillsData] = useState([]);
  const [arrayDataUsergroup, setarrayDataUsergroup] = useState(null);
  const [filtersectionData, setfiltersectionData] = useState([]);
  const [filtertopicData, setfiltertopicData] = useState();
  const [arrayDataUser, setarrayDataUser] = useState(null);

  const [sidebaroptions, setsidebaroptions] = useState(false);
  const [OptionLoading, setOptionLoading] = useState(false);
  const [add_sidebaroptions, setadd_sidebaroptions] = useState(false);
  const [add_OptionLoading, setadd_OptionLoading] = useState(false);

  const [allquestions, setallquestions] = useState();
  const { TabPane } = Tabs;
  const [MetaId, setMetaId] = useState();
  const [ShowNegativeMark, setShowNegativeMark] = useState(false);
  const [ShowAddNewQuizType, setShowAddNewQuizType] = useState(false);
  const [EditActiveStatusSwitch, setEditActiveStatusSwitch] = useState(false);
  const [ShowEditNewQuizType, setShowEditNewQuizType] = useState(false);
  const [ShowStartTimeFields, setShowStartTimeFields] = useState(true);
  const [AccessPoint, setAccessPoint] = useState(0);
  const [arrayDatasubcategory, setarrayDatasubcategory] = useState(null);
  const [moduledataarray, setmoduledataarray] = useState();
  const [isActive, setIsActive] = useState(false);
  const [filtertagsData, setfiltertagsData] = useState();
  const [Active, setActive] = useState(false);
  const [showsolutionvalue, setshowsolutionvalue] = useState(false);
  const [PaidAccess, setPaidAccess] = useState(0);
  const [showredeemvalue, setshowredeemvalue] = useState(false);
  const [Visibility, setVisibility] = useState(0);
  const [status, setStatus] = useState(0);
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
  const [Enable, setEnable] = useState(true);
  const [IsEnable, setIsEnable] = useState(false);
  const [Hide, setHide] = useState(false);
  const [IsHide, setIsHide] = useState(false);
  const [Show, setShow] = useState(false);
  const [IsShow, setIsShow] = useState(false);
  const [Showscroeboard, setShowscroeboard] = useState(false);
  const [IsscroeboardShow, setIsscroeboardShow] = useState(false);
  const [QuizID, setQuizID] = useState();
  const [QuizzData, setQuizzData] = useState();
  const [startDate, setStartDate] = useState();
  const [StartTime, setStartTime] = useState();
  const [ActiveStatusSwitch, setActiveStatusSwitch] = useState(false);
  const [EditActiveSwitch, setEditActiveSwitch] = useState(false);
  const [EndDate, setEndDate] = useState();
  const [EndTime, setEndTime] = useState();
  const [ShowDurationminutes, setShowDurationminutes] = useState(false);
  const [EditFormDate, setEditFormDate] = useState({
    startDate: '',
    endDate: '',
  });
  const [ActiveDetails, setActiveDetails] = useState(true);
  const [Activesolution, setActivesolution] = useState(false);
  const [ActiveSetting, setActiveSetting] = useState(false);
  const [ActiveAttachment, setActiveAttachment] = useState(false);
  const [AllInstructor, setAllInstructor] = useState([]);
  const [SettingsData, setSettingsData] = useState({
    description: '',
    quiz_type: '',
    terms_condition: '',
    redeem_points: '',
    category: '',
    title: '',
    created_by: '',
    price: '',
    durationModeAuto: false,
    durationModeManual: false,
    marksModeAuto: false,
    marksModeManual: false,
    durationMinutes: '',
    marksforCorrectAnswer: '',
    negatineMarkingAuto: false,
    negatineMarkingManual: false,
    negatineMarkingTypeAuto: false,
    negatineMarkingTypeManual: false,
    negativMarks: '',
    pass_percentage: '',
    suffleQuestionAuto: false,
    suffleQuestionManual: false,
    restrictAttemptAuto: false,
    restrictAttemptManual: false,
    numberofAttempts: '',
    dissableFinishButtonAuto: false,
    dissableFinishButtonManual: false,
    enableQusetionListAuto: false,
    enableQusetionListManual: false,
    hideSoluationsAuto: false,
    hideSoluationsManual: false,
    showLeaderBoardAuto: false,
    showLeaderBoardManual: false,
    showScoreBoardAuto: false,
    showScoreBoardManual: false,
    by_code: '',
    by_section: '',
    by_skill: '',
    by_topic: '',
  });
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

  //LOADING
  const [loading, setloading] = useState(false);

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
  const visibilitystatus = e => {
    if (e == true) {
      setStatus(1);
    } else {
      setStatus(0);
    }
  };
  const [SeacrhArray, setSeacrhArray] = useState([]);
  const [LevelArray, setLevelArray] = useState([]);
  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);

  var RoleName = userDetail?.sessdata?.user?.[0]?.user_role;
  var UserID = userDetail?.sessdata?.users_id_enc;
  var updateids;
  useEffect(() => {
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

    async function GetAllSchedules() {
      const url = api_url.get_schedules_by_event_id + QuizID + '/' + '29';
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const SchedulesData = response?.data?.data;
        setScheduleData(SchedulesData);
      } else {
        console.log('error');
      }
    }
    GetAllSchedules(QuizID);

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
        console.log(response);
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
              questiontypedata?.map(item => {
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
    setIsActive(true);
    setNegative(true);
    setIsNegativeType(true);
    setShuffle(true);
    setRestrict(true);
    setIsActiveMarks(true);
    setDisable(true);
    setIsEnable(false);
    setHide(true);
    setShow(true);
    setShowscroeboard(true);
    setrender(0);
  }, [render]);

  useEffect(() => {
    if (UserID) {
      setSettingsData({ ...SettingsData, created_by: UserID });
    }
  }, []);

  //
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
  //

  const handlestatus = e => {
    if (e == true) {
      setstatusvalue(1);
    } else {
      setstatusvalue(0);
    }
  };

  const HandleAction = e => {
    console.log(e);
    const ids = e.split(',');
    const actionid = ids?.[0];
    const rowid = ids?.[1];
    if (actionid == 3) {
      setShowEditNewQuizType(true);
      async function getschedulebyid() {
        const url = api_url.get_schedule_byId + rowid;
        const response = await get_api_request(url, headers);
        if (response.status == 200) {
          const scheduledatabyid = response?.data?.data[0];
          updateids = scheduledatabyid?.id;
          updatedid.push(scheduledatabyid?.id);
          console.log(scheduledatabyid?.status);
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
            startDate: scheduledatabyid?.start_date ? moment(scheduledatabyid?.start_date) : '',
            endDate: scheduledatabyid?.end_date ? moment(scheduledatabyid?.end_date) : '',
          });
          var numberArray;
          if (scheduledatabyid?.schedule_to_individual) {
            numberArray = JSON.parse(scheduledatabyid?.schedule_to_individual);
          }
          var groupArray;
          if (scheduledatabyid.schedule_to_group) {
          }
          console.log(numberArray);
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
      history.push(`../users/${actionid}/overallQuiz-report`);
    } else if (actionid == 4) {
      handleDelete(rowid);
    }
  };

  const CopyToClipboard = e => {
    const id = encrypttheid(e);

    navigator.clipboard.writeText(`${domainpath}/dashboard/engage/create`);
    notification.success({
      message: `Copied Successfully ${domainpath}/dashboard/engage/create`,
    });
  };

  const AddNewSchedule = fieldsvalue => {
    QuizID;

    var schedule_Type;
    if (settingData.fixed == true) {
      schedule_Type = 'Fixed';
    } else if (settingData.flex == true) {
      schedule_Type = 'Flexible';
    }
    const IndividualString = JSON.stringify(fieldsvalue?.schedule_individuel);
    var addnewschedule = {
      event_type: 29,
      event_id: QuizID,
      schedule_type: schedule_Type,
      start_date: moment(fieldsvalue?.start_date).format('YYYY-MM-DD'),
      start_time: moment(fieldsvalue?.start_time).format('HH:mm'),
      end_date: moment(fieldsvalue?.end_date).format('YYYY-MM-DD'),
      end_time: moment(fieldsvalue?.end_time).format('HH:mm'),
      grace_period_to_join: fieldsvalue?.grace_period_to_join,
      schedule_to_group: fieldsvalue?.user_groups,
      schedule_to_individual: IndividualString,
      status: statusvalue,
    };

    console.log(addnewschedule);
    async function CreateSchedule() {
      const url = api_url.create_schedule;
      const response = await post_api_request(url, addnewschedule, headers);
      console.log(response);
      if (response.status === 201) {
        notification.success({
          message: 'Schedule Created Successfully',
        });
        setrender(render + 1);
        form.resetFields();
        setStartDate();
        setEndDate();
        setstatusvalue(0);
        setShowAddNewQuizType(false);
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      } else {
        notification.error({ message: response?.data?.message });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      }
    }
    CreateSchedule();
    //
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

    async function UpdatedSchedule() {
      const url = api_url.update_schedulebyId + updatedid?.[0];
      const response = await put_api_request(url, payload, headers);
      console.log(response);
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

  function clearInput() {
    document.getElementById('ScheduleForm').reset();
  }

  const handleDelete = id => {
    var deletedrowid = id;
    var column = 'id';
    async function deleteData(id) {
      const url = api_url.delete_scheduleby_id + id;

      const response = await delete_api_request(url, headers);

      if (response.status === 201) {
        notification.success({
          message: 'Schedule Deleted Successfully',
        });

        const afterdeletedata = ScheduleData.filter(item => {
          if (column !== '') {
            return item[column] != deletedrowid;
          }
          return item;
        });
        setScheduleData(afterdeletedata);
      } else {
        notification.error({ message: response?.data?.message });
      }
    }
    deleteData(id);
  };

  const columns = [
    {
      name: 'CODE',
      selector: row => (
        <>
          <p onClick={() => CopyToClipboard(row.id)}>
            <i class="fa fa-files-o" aria-hidden="true"></i> {encrypttheid(row.id)}
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

  const AddQuizDetails = fieldsvalue => {
    console.log(SettingsData?.redeem_points);
    if (QuizzData) {
      var meta = {};
      var AddquizDetails = {
        title: SettingsData?.title,
        created_by: SettingsData?.created_by,
        price: SettingsData?.price,
        category_id: SettingsData?.category,
        quiz_type: SettingsData?.quiz_type,
        free: PaidAccess,
        points: AccessPoint,
        visibility: Visibility,
        active: status,
        redeem_points: SettingsData?.redeem_points,
        description: SettingsData?.description,
      };
      meta = {
        id: fieldsvalue.id,
        durationModeAuto: fieldsvalue?.durationModeAuto,
        durationModeManual: fieldsvalue?.durationModeManual,
        marksModeAuto: fieldsvalue?.marksModeAuto,
        marksModeManual: fieldsvalue?.marksModeManual,
        durationMinutes: fieldsvalue?.durationMinutes,
        marksforCorrectAnswer: fieldsvalue?.marksforCorrectAnswer,
        negatineMarkingAuto: fieldsvalue?.negatineMarkingAuto,
        negatineMarkingManual: fieldsvalue?.negatineMarkingManual,
        negatineMarkingTypeAuto: fieldsvalue?.negatineMarkingTypeAuto,
        negatineMarkingTypeManual: fieldsvalue?.negatineMarkingTypeManual,
        negativMarks: fieldsvalue?.negativMarks,
        pass_percentage: fieldsvalue?.pass_percentage,
        suffleQuestionAuto: fieldsvalue?.suffleQuestionAuto,
        suffleQuestionManual: fieldsvalue?.suffleQuestionManual,
        restrictAttemptAuto: fieldsvalue?.restrictAttemptAuto,
        restrictAttemptManual: fieldsvalue?.restrictAttemptManual,
        dissableFinishButtonAuto: fieldsvalue?.dissableFinishButtonAuto,
        dissableFinishButtonManual: fieldsvalue?.dissableFinishButtonManual,
        enableQusetionListAuto: fieldsvalue?.enableQusetionListAuto,
        enableQusetionListManual: fieldsvalue?.enableQusetionListManual,
        hideSoluationsAuto: fieldsvalue?.hideSoluationsAuto,
        hideSoluationsManual: fieldsvalue?.hideSoluationsManual,
        showLeaderBoardAuto: fieldsvalue?.showLeaderBoardAuto,
        showLeaderBoardManual: fieldsvalue?.showLeaderBoardManual,
        numberofAttempts: fieldsvalue?.numberofAttempts,
        terms_condition: fieldsvalue?.terms_condition,
      };
      AddquizDetails['meta'] = meta;
    } else {
      var AddquizDetails = {
        title: SettingsData?.title,
        created_by: SettingsData?.created_by,
        price: SettingsData?.price,
        category_id: SettingsData?.category,
        quiz_type: SettingsData?.quiz_type,
        free: PaidAccess,
        points: AccessPoint,
        visibility: Visibility,
        active: status,
        redeem_points: SettingsData?.redeem_points,
        description: SettingsData?.description,
      };
    }

    if (QuizzData) {
      async function UpdateQuiz() {
        const url = api_url.update_quiz_byId + QuizID;
        const response = await put_api_request(url, AddquizDetails, headers);
        console.log(response);
        if (response.status === 201) {
          notification.success({
            message: 'Quiz Updated Successfully',
          });

          setTimeout(() => {
            notification.destroy();
          }, 2000);
        } else {
          notification.error({ message: response?.data?.message });
          setTimeout(() => {
            notification.destroy();
          }, 2000);
        }
      }
      UpdateQuiz();
    } else {
      async function CreateQuiz() {
        const url = api_url.create_quiz;
        const response = await post_api_request(url, AddquizDetails, headers);
        console.log(response);
        if (response.status === 201) {
          notification.success({
            message: 'Quiz Created Successfully',
          });
          const metadata = response?.data?.data[0];
          setQuizzData(metadata);
          const Quiz_Id = response?.data?.data[0]?.id;
          setQuizID(Quiz_Id);

          setTimeout(() => {
            notification.destroy();
          }, 2000);
        } else if (response.status == 200) {
          notification.error({
            message: response?.data?.message,
          });
        } else {
          notification.error({ message: response?.data?.message });
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

  const AddQuizSettings = name => {
    console.log(SettingsData);
    var meta = {};
    console.log(QuizzData);
    var Settingpayload = {
      title: QuizzData?.title,
      created_by: QuizzData?.created_by,
      price: QuizzData?.price,
      category_id: QuizzData?.category_id,
      quiz_type: QuizzData?.quiz_type,
      free: PaidAccess,
      points: AccessPoint,
      visibility: Visibility,
      active: status,
      redeem_points: QuizzData?.redeem_points,

      description: QuizzData?.description,
    };
    meta = {
      id: QuizID,
      settings: {
        durationModeAuto: SettingsData?.durationModeAuto,
        durationModeManual: SettingsData?.durationModeManual,
        marksModeAuto: SettingsData?.marksModeAuto,
        marksModeManual: SettingsData?.marksModeManual,
        durationMinutes: SettingsData?.durationMinutes,
        marksforCorrectAnswer: SettingsData?.marksforCorrectAnswer,
        negatineMarkingAuto: SettingsData?.negatineMarkingAuto,
        negatineMarkingManual: SettingsData?.negatineMarkingManual,
        negatineMarkingTypeAuto: SettingsData?.negatineMarkingTypeAuto,
        negatineMarkingTypeManual: SettingsData?.negatineMarkingTypeManual,
        negativMarks: SettingsData?.negativMarks,
        pass_percentage: SettingsData?.pass_percentage,
        suffleQuestionAuto: SettingsData?.suffleQuestionAuto,
        suffleQuestionManual: SettingsData?.suffleQuestionManual,
        restrictAttemptAuto: SettingsData?.restrictAttemptAuto,
        restrictAttemptManual: SettingsData?.restrictAttemptManual,
        dissableFinishButtonAuto: SettingsData?.dissableFinishButtonAuto,
        dissableFinishButtonManual: SettingsData?.dissableFinishButtonManual,
        enableQusetionListAuto: SettingsData?.enableQusetionListAuto,
        enableQusetionListManual: SettingsData?.enableQusetionListManual,
        hideSoluationsAuto: SettingsData?.hideSoluationsAuto,
        hideSoluationsManual: SettingsData?.hideSoluationsManual,
        showLeaderBoardAuto: SettingsData?.showLeaderBoardAuto,
        showLeaderBoardManual: SettingsData?.showLeaderBoardManual,
        showScoreBoardAuto: SettingsData?.showScoreBoardAuto,
        showScoreBoardManual: SettingsData?.showScoreBoardManual,
        numberofAttempts: SettingsData?.numberofAttempts,
        terms_condition: SettingsData?.terms_condition,
      },
    };
    Settingpayload['meta'] = meta;
    console.log(Settingpayload);

    async function UpdateQuizSettingById() {
      const url = api_url.update_quiz_byId + QuizID;
      const response = await put_api_request(url, Settingpayload, headers);
      console.log(response);
      if (response.status === 201) {
        notification.success({
          message: 'Quiz Settings Updated Successfully',
        });

        const metadata = response?.data?.responsedata;
        setMetaId(metadata);
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
          setActiveDetails(false);
          setActiveSetting(false);
          setActivesolution(true);
          setActiveAttachment(false);
        }
      } else {
        notification.error({ message: response?.message });
      }
    }
    UpdateQuizSettingById();
  };

  const AddQuestionByID = e => {
    setloading(true);
    var addQuestion = {
      quiz_id: QuizID,
      questions: e,
    };

    async function AddQuizQuestion() {
      const url = api_url.add_question;
      console.log(headers);
      console.log(url);
      const response = await post_api_request(url, addQuestion, headers);
      console.log(response);
      if (response.status === 201) {
        notification.success({
          message: 'Question Added Successfully',
        });
        setTimeout(() => {
          setloading(false);
        }, 500);
      } else {
        notification.error({ message: response?.message });
      }
    }
    AddQuizQuestion();
    getaddedquestions();
  };
  async function getaddedquestions() {
    const url = api_url.getQuestion_by_quizID + QuizID;
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
    setloading(true);
    async function deleteData(e) {
      const quiz_id = QuizID;
      const questionID = e;
      const connect_ID = quiz_id + '/' + questionID;
      const url = api_url.remove_question_by_questionID + connect_ID;

      const response = await delete_api_request(url, headers);
      console.log(response);
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
    console.log(SettingsData);
    var payload = {
      code: SettingsData?.by_code,
      section: SettingsData?.by_section,
      skill: SettingsData?.by_skill,
      type: Type,
      topic: SettingsData?.by_topic,
      difficulty_level: DifficultyLevel,
    };

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
                      QuizID
                        ? setShowTabPane({
                            Detail: false,
                            Settings: true,
                            Questions: false,
                            Schedules: false,
                            QuizDetails: false,
                            QuizSettings: true,
                            QuizQuestions: false,
                            QuizSchedules: false,
                          })
                        : '';

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
                      QuizID
                        ? setShowTabPane({
                            Detail: false,
                            Settings: false,
                            Questions: true,
                            Schedules: false,
                            QuizDetails: false,
                            QuizSettings: false,
                            QuizQuestions: true,
                            QuizSchedules: false,
                          })
                        : '';

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
                    data-rowid={'3'}
                    className={ActiveAttachment ? 'practice-tabpane' : ''}
                    onClick={e => {
                      QuizID
                        ? setShowTabPane({
                            Detail: false,
                            Settings: false,
                            Questions: false,
                            Schedules: true,
                            QuizDetails: false,
                            QuizSettings: false,
                            QuizQuestions: false,
                            QuizSchedules: true,
                          })
                        : '';

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
                    form={AddForm}
                    name="sDash_validation-form"
                    layout="vertical"
                    className="Details_form"
                    onFinish={() => AddQuizDetails()}
                  >
                    <Row gutter={30} style={{ margin: '10px 0 0 0' }}>
                      <Col md={18} xs={24} style={{ margin: '0 auto' }}>
                        <Row gutter={30}>
                          <Col md={24} xs={24} style={{ margin: '10px 0 0 0' }}>
                            <Form.Item
                              label="Title"
                              name="title"
                              rules={[
                                {
                                  required: true,
                                  message: 'Tittle is required !',
                                },
                              ]}
                            >
                              <Input
                                placeholder="Title"
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
                            <Form.Item
                              name="quiz_type"
                              label="Quiz Type"
                              rules={[
                                {
                                  required: true,
                                  message: 'Quiz Type is required !',
                                },
                              ]}
                            >
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
                              Paid (Accessible to only paid users). Free (Anyone can access).
                            </p>
                          </Col>
                          <Col md={3}>
                            <Switch onChange={e => handleswitch(e)} checked={PaidAccess} />
                          </Col>
                        </Row>
                        {showsolutionvalue == true ? (
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
                            <Row gutter={30} className="switchToggle">
                              <Col md={21}>
                                <p>
                                  <b>Can access with Points (Yes) </b> <br />
                                  Yes (User should redeem with points to access quiz). No (Anyone can access).
                                </p>
                              </Col>
                              <Col md={3}>
                                <Switch onChange={e => handleredeem(e)} checked={AccessPoint} />
                              </Col>
                            </Row>
                          </>
                        ) : (
                          ''
                        )}
                        {showredeemvalue == true ? (
                          <Row gutter={30} id="required_points">
                            <Col md={24} xs={24}>
                              <Form.Item
                                name="redeem_points"
                                label="Points Required to Redeem"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Points Required to Redeem !',
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
                            <Switch onChange={e => visibility(e)} checked={Visibility} />
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
                            <Switch onChange={e => visibilitystatus(e)} checked={status} />
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
            <>
              <Main className="Settings_form_main">
                <Cards>
                  <Form className="Settings_form" onFinish={() => AddQuizSettings('settings')}>
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
                                  setShowDurationminutes(false);
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
                                  setShowDurationminutes(true);
                                }}
                              >
                                Manual
                              </Button>
                            </div>
                          </Col>
                        </Col>

                        {ShowDurationminutes != false ? (
                          <Col md={24} className="skillrow">
                            <Form.Item
                              className="skillrow"
                              id="Duration"
                              label="Duration (Minutes)"
                              name="duration"
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
                                value={SettingsData?.durationMinutes}
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
                                className={IsActiveMarks ? 'bg-salmon' : ''}
                                onClick={() => {
                                  setIsActiveMarks(current => !current);
                                  setActiveMarks(false);
                                  setSettingsData({ ...SettingsData, marksModeAuto: true, marksModeManual: false });
                                  setShowPointsMode(false);
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
                                  setShowPointsMode(true);
                                }}
                              >
                                Manual
                              </Button>
                            </div>
                          </Col>
                        </Col>
                        {ShowPointsMode != false ? (
                          <Col md={24} className="skillrow">
                            <Form.Item
                              className="skillrow"
                              id="points_Mode"
                              name="points_Mode"
                              label="Marks for Correct Answer"
                              rules={[
                                {
                                  required: true,
                                  message: 'Marks for Correct Answer is required',
                                },
                              ]}
                            >
                              <Input
                                type="text"
                                placeholder="Enter Marks for Correct Answer"
                                value={SettingsData?.marksforCorrectAnswer}
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
                                className={IsNegative ? 'bg-salmon' : ''}
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
                                className={Negative ? 'bg-salmon' : ''}
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
                        {ShowNegativeMark != false ? (
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
                                  className={IsNegativeType ? 'bg-salmon' : ''}
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
                                  className={NegativeType ? 'bg-salmon' : ''}
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
                        {ShowNegativeMark != false ? (
                          <Col md={24} className="skillrow">
                            <Form.Item
                              className="skillrow"
                              id="negative_marks"
                              name="negative_marks"
                              label="Negative Marks"
                              rules={[
                                {
                                  required: true,
                                  message: 'Negative Marks are required',
                                },
                              ]}
                            >
                              <Input
                                type="text"
                                placeholder="Enter Negative Marks"
                                value={SettingsData?.negativMarks}
                                onChange={selectedValue => {
                                  setSettingsData({ ...SettingsData, negativMarks: selectedValue.target.value });
                                }}
                              />
                            </Form.Item>
                          </Col>
                        ) : (
                          ''
                        )}

                        <Col md={24} className="skillrow">
                          <Form.Item
                            className="skillrow"
                            id="pass_percentage"
                            name="pass_percentage"
                            label="Pass Percentage"
                            rules={[
                              {
                                required: true,
                                message: 'Pass Percentage are required',
                              },
                            ]}
                            initialValue={SettingsData?.pass_percentage}
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
                        <Col md={24} className="termsSection">
                          <Form.Item name="terms_condition" label="Terms & Condition">
                            <Editor
                              name="terms_condition"
                              value={SettingsData?.terms_condition}
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
                          <Col md={24} className="skillrow">
                            <Form.Item
                              className="skillrow"
                              id="attempts"
                              name="attempts"
                              label="Number of Attempts"
                              rules={[
                                {
                                  required: true,
                                  message: 'Number of Attempts is required',
                                },
                              ]}
                            >
                              <Input
                                style={{ width: '90%' }}
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
                                className={IsDisable ? 'bg-salmon' : ''}
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
                                className={Disable ? 'bg-salmon' : ''}
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
                                className={IsEnable == true ? 'bg-salmon' : ''}
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
                                className={Enable == true ? 'bg-salmon' : ''}
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
                        <Col md={24} className="Switches_main">
                          <Col md={12} className="info">
                            <b>
                              <label>Show ScoreBoard</label>
                            </b>
                            <i class="fa fa-info-circle" aria-hidden="true"></i>
                            <div id="showinfo">
                              <b>
                                <span className="Hover_text">Yes</span>
                              </b>{' '}
                              -ScoreBoard will be shown to test takers.
                              <br />
                              <b>
                                <span className="Hover_text">No</span>
                              </b>{' '}
                              - ScoreBoard will not be shown to test takers.
                            </div>
                          </Col>
                          <Col md={12}>
                            {' '}
                            <div className="video_buttons">
                              <Button
                                value={1}
                                className={IsscroeboardShow ? 'bg-salmon' : ''}
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
                                className={Showscroeboard ? 'bg-salmon' : ''}
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
                </Cards>
              </Main>
            </>
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
                        <i class="fa fa-filter" aria-hidden="true"></i>
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
                              setSettingsData({ ...SettingsData, by_code: selectedValue.target.value });
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
                              setSettingsData({ ...SettingsData, by_section: selectedValue });
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
                              setSettingsData({ ...SettingsData, by_skill: selectedValue });
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
                              setSettingsData({ ...SettingsData, by_topic: selectedValue });
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
                          <label>By Tag</label>
                        </b>
                        <FormItem name="by_tag ">
                          <Select
                            isSearchable={true}
                            filtertagsData={filtertagsData}
                            onChange={selectedValue => {
                              setSettingsData({ ...SettingsData, by_tag: selectedValue });
                            }}
                          >
                            {filtertagsData != null
                              ? filtertagsData.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                              : ''}
                          </Select>
                        </FormItem>
                      </Col>
                      <Col md={24}>
                        <b>
                          <label>Difficulty Level</label>
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
                              {/* <p>
                                <b>Attachments:</b>
                                {item.attachments}
                              </p> */}
                              <Col md={24} className="Unique_code_button">
                                {' '}
                                <p className="Unique_code">{'que_' + encrypttheid(item?.id)}</p>
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
          ) : (
            ''
          )}
          {ShowTabPane?.Schedules == true ? (
            <>
              <Main className="Schedule_form_main">
                <Cards>
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
                </Cards>
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
                                <Form.Item name="end_time" label="End Time">
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
                                <Switch onChange={e => handlestatus(e)} checked={statusvalue} />
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
          ) : (
            // </div>
            ''
          )}
        </section>
      </Main>
    </>
  );
};

export default CreateNewQuiz;
