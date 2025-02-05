import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Tabs, Row, Input, Switch, Card, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { headers } from '../../helpers/variables';
import { Main } from '../styled';
import moment from 'moment';
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
  const location = useLocation();
  const history = useHistory();
  const [form] = Form.useForm();
  const [Detailsform] = Form.useForm();
  const [EditScheduleForm] = Form.useForm();
  const [SettingsForm] = Form.useForm();
  const [FilterForm] = Form.useForm();
  const [ScheduleForm] = Form.useForm();
  const [startDate, setStartDate] = useState();
  const [StartTime, setStartTime] = useState();
  const [EndDate, setEndDate] = useState();
  const [EndTime, setEndTime] = useState();
  const [render, setrender] = useState(0);
  const [startEditDate, setStartEditDate] = useState(new Date());

  const [StartEditTime, setStartEditTime] = useState();
  const [EndEditDate, setEndEditDate] = useState(new Date());
  const [EndEditTime, setEndEditTime] = useState();

  const { TabPane } = Tabs;
  const [ShowAddNewQuizType, setShowAddNewQuizType] = useState(false);
  const [arrayDatasubcategory, setarrayDatasubcategory] = useState(null);
  const [arrayDataskills, setarrayDataskills] = useState(null);
  const [ShowEditNewQuizType, setShowEditNewQuizType] = useState(false);
  const [ShowManualfield, setShowManualfield] = useState(false);
  const [ShowPointsManualfield, setShowPointsManualfield] = useState(false);
  const [ShowStartTimeFields, setShowStartTimeFields] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [Active, setActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [Active1, setActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [Active2, setActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [Active3, setActive3] = useState(false);

  const [ASwitch, setASwitch] = useState(false);
  const [EditASwitch, setEditASwitch] = useState(false);
  const [EditActiveSwitch, setEditActiveSwitch] = useState(false);

  const [sidebaroptions, setsidebaroptions] = useState(false);
  const [OptionLoading, setOptionLoading] = useState(false);
  const [add_sidebaroptions, setadd_sidebaroptions] = useState(false);
  const [add_OptionLoading, setadd_OptionLoading] = useState(false);

  const [moduledataarray, setmoduledataarray] = useState();
  const [PaidASwitch, setPaidASwitch] = useState(false);
  const [ActiveDetails, setActiveDetails] = useState(false);
  const [Activesolution, setActivesolution] = useState(false);
  const [ActiveSetting, setActiveSetting] = useState(false);
  const [ActiveAttachment, setActiveAttachment] = useState(false);
  const [PracticeId, setPracticeId] = useState();
  const [arrayDataUsergroup, setarrayDataUsergroup] = useState(null);
  const [arrayDataUser, setarrayDataUser] = useState(null);
  const [formData, setformData] = useState();
  const [ActiveSwitch, setActiveSwitch] = useState(false);
  const [EditActiveStatusSwitch, setEditActiveStatusSwitch] = useState(false);
  const [ActiveStatusSwitch, setActiveStatusSwitch] = useState(false);
  const [QuestionData, setQuestionData] = useState([]);
  const [MetaId, setMetaId] = useState();
  const [Practice, setPractice] = useState();
  const [SelectedScheduleIDForUpdate, setSelectedScheduleIDForUpdate] = useState();
  const [QuestionSearchData, setQuestionSearchData] = useState();

  const [DescriptionValue, setDescriptionValue] = useState();
  const [settingData, setsettingData] = useState({
    durationAuto: false,
    durationManual: false,
    RewardAuto: false,
    RewardManual: false,
    PointsAuto: false,
    PointsManual: false,
    showRewardManual: false,
    showRewardAuto: false,
    durationmaunalInput: '',
    pointsmaunalInput: '',
    fixed: false,
    flex: true,
    editfixed: false,
    editflex: false,
    end_time: '',
    end_date: '',
    start_time: '',
    start_date: '',
    title: '',
    created_by: '',
    by_code: '',
    by_section: '',
    by_tag: '',
    by_skill: '',
    by_topic: '',
    description: '',
    terms_condition: '',
  });

  const [tabpane, settabpane] = useState({
    Details: true,
    Settings: false,
    Questions: false,
    Schedules: false,
  });
  const [Render, setRender] = useState(0);
  const [ShowQuestions, setShowQuestions] = useState({
    ViewQuestion: true,
    AddQuestion: false,
    CurrentView: false,
    CurrentAdd: false,
  });

  const [EditFormDate, setEditFormDate] = useState({
    startDate: '',
    endDate: '',
  });

  const [SeacrhArray, setSeacrhArray] = useState([]);
  const [LevelArray, setLevelArray] = useState([]);
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
  const [AllInstructor, setAllInstructor] = useState([]);
  const [FilterData, setFilterData] = useState({
    by_code: '',
    by_section: '',
    by_skill: '',
    by_topic: '',
    by_tag: '',
  });

  //loading spinner
  const [loading, setloading] = useState(false);

  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);
  var RoleName = userDetail?.sessdata?.user?.[0]?.user_role;
  var UserID = userDetail?.sessdata?.users_id_enc;
  useEffect(() => {
    handleclass(location?.state);

    async function GetAllSchedules() {
      const url = api_url.get_schedules_by_event_id + PracticeId + '/' + moduleId;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const SchedulesData = response?.data?.data;
        setData(SchedulesData);
      } else {
        console.log('error');
      }
    }
    GetAllSchedules();
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
    async function getQuestionsData() {
      const url = api_url.get_skills;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const qusetion = response.data.responsedata;
        setQuestionData(qusetion);
      } else {
        console.log('error');
      }
    }
    getQuestionsData();
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
              questiontypedata?.map(item => {
                return { id: item.id, name: item.name };
              });
              setQuizTypeData(questiontypedata);
            }
            getentitybyparentid();
            setmoduledataarray(items);
          } else if (items.name == 'QUESTION TYPES') {
            //console.log(items);
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
    getallquestions();
    setActiveDetails(true);
    setIsActive(true);
    setIsActive2(true);
    setIsActive1(true);
    setIsActive3(true);
    setrender(0);
    setRender(0);
  }, [render]);

  useEffect(() => {
    if (UserID) {
      setsettingData({ ...settingData, created_by: UserID });
    }
  }, []);

  var moduleId = 34;
  useEffect(() => {
    async function GetAllsheduleById() {
      const url = '/schedulelearn/event/' + PracticeId + '/' + moduleId;

      const response = await get_api_request(url, headers);

      if (response.status == 200) {
        const scheduleByiddata = response?.data?.data;
        setData(scheduleByiddata);
      } else {
        console.log('error');
      }
    }
    GetAllsheduleById();
    getallquestions();
  }, [PracticeId, Render]);

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

  async function GetPrcaticeByID(id) {
    const url = api_url.get_schedules_id + id;
    const response = await get_api_request(url, headers);
    // setEditActiveStatusSwitch(!EditActiveStatusSwitch)
    // checked={EditActiveSwitch}
    console.log(response);
    if (response.status == 200) {
      const Scheduledata = response.data.data[0];
      const Schedulemeta = response.data.meta;
      setSelectedScheduleIDForUpdate(Scheduledata?.id);

      // setData(usersdata);
      if (Scheduledata?.status == 1) {
        setEditActiveStatusSwitch(true);
      } else if (Scheduledata?.status == 0) {
        setEditActiveStatusSwitch(false);
      }

      if (Scheduledata?.paid == 1) {
        setEditASwitch(true);
      } else if (Scheduledata?.paid == 0) {
        setEditASwitch(false);
      }
      setsettingData({
        ...settingData,
        editflex: Scheduledata?.schedule_type == 'Flexible' ? true : false,
        editfixed: Scheduledata?.schedule_type == 'Fixed' ? true : false,

        pointsmaunalInput: Scheduledata?.pointsinput,
        durationmaunalInput: Scheduledata?.durationinput,
        // end_time: Scheduledata?.end_time,
        // end_date: Scheduledata?.end_date,
        // start_time: Scheduledata?.start_time,
        // start_date: Scheduledata?.start_date,
      });
      setEditFormDate({
        startDate: Scheduledata?.start_date ? moment(Scheduledata?.start_date) : '',
        endDate: Scheduledata?.end_date ? moment(Scheduledata?.end_date) : '',
      });
      var numberArray;
      if (Scheduledata.schedule_to_individual) {
        numberArray = JSON.parse(Scheduledata?.schedule_to_individual);
      }
      var groupArray;
      if (Scheduledata.schedule_to_group) {
      }
      EditScheduleForm.setFieldsValue({
        grace_period_to_join: Scheduledata?.grace_period_to_join,
        start_time: moment(Scheduledata?.start_time, 'HH:mm'),
        end_time: moment(Scheduledata?.end_time, 'HH:mm'),
        start_date: moment(Scheduledata?.start_date).format('MM-DD-YYYY'),
        end_date: moment(Scheduledata?.end_date).format('MM-DD-YYYY'),
        schedule_to_group: Scheduledata?.schedule_to_group,
        schedule_individual: numberArray,
      });

      setformData(Scheduledata);
    } else {
      console.log('error');
    }
  }

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
        Schedules: false,
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
        Schedules: false,
        Questions: false,
      });
    } else if (e == 3) {
      setActivesolution(current => !current);
      setActiveAttachment(false);
      setActiveDetails(false);
      setActiveSetting(false);
      //setActivesolution(false);
      settabpane({
        Details: false,
        Settings: false,
        Schedules: false,
        Questions: true,
      });
    } else if (e == 4) {
      setActiveAttachment(current => !current);
      setActiveDetails(false);
      setActiveSetting(false);
      setActivesolution(false);
      //setActiveAttachment(false);
      settabpane({
        Details: false,
        Settings: false,
        Schedules: true,
        Questions: false,
      });
    }
  };

  /*==========================================END */
  /*HANDLING EDIT=============================START */

  const HandleAction = (e, id) => {
    console.log(id);
    if (e == 1) {
      //setShowEditNewQuizType(true);
    } else if (e == 2) {
      GetPrcaticeByID(id);
      setShowEditNewQuizType(true);
    } else if (e == 3) {
      console.log('Delete');
      handleDelete(id);
    }
  };
  const CopyToClipboard = e => {
    const id = 'setsd_' + encrypttheid(e);
    navigator.clipboard.writeText(id);
    notification.success({
      message: `Copied Successfully ${id}`,
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
          <Select className="Quizz_actions" defaultValue="Actions" onSelect={e => HandleAction(e, row.id)}>
            <Option value={1}>Analytics</Option>
            <Option value={2}>Edit</Option>
            <Option value={3}>Delete</Option>
          </Select>
        </div>
      ),
    },
  ];
  /*=========================================ENDS */
  /*HANDLING DELETE A USER===================START */
  const handleDelete = id => {
    var deletedrowid = id;
    var column = 'id';
    async function deleteData(id) {
      const url = api_url.delete_schedules_id + deletedrowid;
      const response = await delete_api_request(url, headers);
      if (response.status == 201) {
        notification.success({
          message: 'Schedules Deleted Successfully',
        });
        setrender(render + 1);
        const afterdeletedata = data.filter(item => {
          if (column !== '') {
            return item[column] != deletedrowid;
          }
          return item;
        });
        setData(afterdeletedata);
      } else {
        notification.error({
          message: response?.data?.message,
        });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      }
      // });
    }
    deleteData(id);
  };

  const addDetails = fieldsvalue => {
    var activeswicth;
    if (ASwitch == true) {
      activeswicth = 1;
    } else {
      activeswicth = 0;
    }
    var paidswicth;
    if (PaidASwitch == true) {
      paidswicth = 1;
    } else {
      paidswicth = 0;
    }
    if (Practice) {
      var meta = {};
      var payload = {
        title: fieldsvalue.title,
        created_by: settingData?.created_by,
        subcategory_id: settingData.sub_category_id,
        skill_id: settingData.skill_id,
        description: settingData?.description,
        status: activeswicth,
        free: paidswicth,
      };
      meta = {
        id: fieldsvalue.id,
        durationauto: fieldsvalue.durationAuto,
        durationmanual: fieldsvalue.durationManual,
        Rewardauto: fieldsvalue.RewardAuto,
        Rewardmanual: fieldsvalue.RewardManual,
        pointsauto: fieldsvalue.PointsAuto,
        pointsmanual: fieldsvalue.PointsManual,
        showRewardauto: fieldsvalue.showRewardAuto,
        showRewardmanual: fieldsvalue.showRewardManual,
        durationinput: fieldsvalue.durationmaunalInput,
        pointsinput: fieldsvalue.pointsmaunalInput,
        terms_condition: fieldsvalue.terms_condition,
      };
      payload['meta'] = meta;
    } else {
      var payload = {
        title: fieldsvalue.title,
        created_by: settingData?.created_by,
        subcategory_id: settingData.sub_category_id,
        skill_id: settingData.skill_id,
        description: settingData?.description,
        status: activeswicth,
        free: paidswicth,
      };
    }

    if (Practice) {
      async function updatePractice() {
        console.log(JSON.stringify(payload));
        const url = api_url.get_practice_id + PracticeId;
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
      updatePractice();
    } else {
      async function CreateSection(data) {
        const url = api_url.create_practice;
        const response = await post_api_request(url, payload, headers);
        console.log(response);
        if (response.status === 201) {
          notification.success({
            message: 'Practice Set Created Successfully',
          });
          const responseid = response?.data?.id;

          setPracticeId(responseid);

          async function getPracticebyid() {
            const url = api_url.get_practice_id + responseid;
            const response = await get_api_request(url, headers);
            if (response.status == 200) {
              const practicedata = response?.data?.responsedata?.[0];
              console.log(practicedata);
              setPractice(practicedata);
            } else {
              notification.error({ message: 'Server Error' });
            }
          }
          getPracticebyid();
        } else if (response.status == 200) {
          notification.error({ message: response?.data?.message });
        } else {
          notification.error({ message: 'Server Error' });
        }
      }
      CreateSection();
    }
  };
  const SettingFormSubmit = name => {
    var meta = {};
    var Settingpayload = {
      title: Practice.title,
      created_by: Practice?.created_by,
      subcategory_id: Practice.subcategory_id,
      skill_id: Practice.skill_id,
      description: Practice.description,
      status: Practice.status,
      free: Practice.free,
    };
    meta = {
      id: PracticeId,
      durationauto: settingData.durationAuto,
      durationmanual: settingData.durationManual,
      Rewardauto: settingData.RewardAuto,
      Rewardmanual: settingData.RewardManual,
      pointsauto: settingData.PointsAuto,
      pointsmanual: settingData.PointsManual,
      showRewardauto: settingData.showRewardAuto,
      showRewardmanual: settingData.showRewardManual,
      durationinput: settingData.durationmaunalInput,
      pointsinput: settingData.pointsmaunalInput,
      terms_condition: settingData.terms_condition,
    };
    Settingpayload['meta'] = meta;
    console.log(Settingpayload);

    async function UpdatePracticebyid() {
      const url = api_url.get_practice_id + PracticeId;
      const response = await put_api_request(url, Settingpayload, headers);

      if (response.status == 201) {
        notification.success({
          message: response?.data?.responsedata,
        });
        setActivesolution(current => !current);
        const metadata = response?.data?.responsedata;
        setMetaId(metadata);
        if (name == 'settings') {
          setActiveDetails(false);
          setActiveSetting(false);
          setActivesolution(false);

          setActivesolution(true);
          settabpane({
            Details: false,
            Settings: false,
            Schedules: false,
            Questions: true,
          });
        }
      } else {
        notification.error({ message: 'Server Error' });
      }
    }
    UpdatePracticebyid();
  };
  function clearInput() {
    document.getElementById('ScheduleForm').reset();
  }

  const addNewSchedule = fieldsvalue => {
    var payload = {};
    var schedule_Type;
    if (settingData.fixed == true) {
      schedule_Type = 'Fixed';
    } else if (settingData.flex == true) {
      schedule_Type = 'Flexible';
      payload['end_date'] = moment(EndDate).format('YYYY-MM-DD');
      payload['end_time'] = moment(fieldsvalue.end_time).format('HH:mm');
    }

    var activeswicth;

    if (ActiveStatusSwitch == true) {
      activeswicth = 1;
    } else {
      activeswicth = 0;
    }
    const IndividualString = JSON.stringify(fieldsvalue.schedule_individuel);
    // const GroupString = JSON.stringify(fieldsvalue?.user_groups);
    console.log(IndividualString);
    payload['schedule_type'] = schedule_Type;
    payload['event_type'] = 34;
    payload['event_id'] = PracticeId;
    payload['start_date'] = moment(fieldsvalue.start_date).format('YYYY-MM-DD');
    payload['start_time'] = moment(fieldsvalue.start_time).format('HH:mm');
    payload['grace_period_to_join'] = fieldsvalue.grace_period_to_join;
    payload['schedule_to_group'] = fieldsvalue?.user_groups;
    payload['schedule_to_individual'] = IndividualString;
    payload['status'] = activeswicth;

    async function CreateLesson(data) {
      const url = api_url.create_schedule;
      const response = await post_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.message,
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
        // window.location.reload();
      } else {
        notification.error({ message: response?.data?.message });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      }
    }
    CreateLesson(payload);
  };

  const editSchedule = fieldsvalue => {
    var Payload = {};
    var schedule_Type;
    if (settingData.editfixed == true) {
      schedule_Type = 'Fixed';
    } else if (settingData.editflex == true) {
      schedule_Type = 'Flexible';
      Payload['end_date'] = moment(EditFormDate?.endDate).format('YYYY-MM-DD');
      Payload['end_time'] = moment(fieldsvalue.end_time).format('HH:mm');
    }

    var activeswicth;

    if (EditActiveStatusSwitch == true) {
      activeswicth = 1;
    } else {
      activeswicth = 0;
    }
    const IndividualString = JSON.stringify(fieldsvalue?.schedule_individual);
    const GroupString = JSON.stringify(fieldsvalue?.schedule_to_group);
    // const start_date = moment(EditFormDate.startDate).format('YYYY-MM-DD');
    // const start_time = moment(fieldsvalue.start_time).format('HH:mm');
    Payload['schedule_type'] = schedule_Type;
    Payload['event_type'] = 34;
    Payload['event_id'] = PracticeId;
    Payload['start_date'] = moment(EditFormDate.startDate).format('YYYY-MM-DD');
    Payload['start_time'] = moment(fieldsvalue?.start_time).format('HH:mm');
    Payload['grace_period_to_join'] = fieldsvalue.grace_period_to_join;
    Payload['schedule_to_group'] = fieldsvalue?.schedule_to_group;
    Payload['schedule_to_individual'] = IndividualString;
    Payload['status'] = activeswicth;

    console.log(Payload);
    async function UpdateSchedule(data) {
      const url = api_url.update_schedules_id + formData?.id;
      const response = await put_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.responsedata,
        });
        setTimeout(() => {
          notification.destroy();
          setShowEditNewQuizType(false);
        }, 2000);

        setRender(Render + 1);

        // history.push('../users/customer-list');
      } else {
        notification.error({ message: response?.data?.message });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      }
    }
    UpdateSchedule(Payload);
  };

  const AddQuestionByID = e => {
    setloading(true);
    var addQuestion = {
      practice_set_id: PracticeId,
      question_id: e,
    };

    async function AddQuizQuestion() {
      const url = api_url.create_practice_question;
      console.log(addQuestion);

      const response = await post_api_request(url, addQuestion, headers);
      console.log(response);
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
  async function getaddedquestions() {
    const url = api_url.get_practice_addedquestion + PracticeId;

    const response = await get_api_request(url, headers);
    console.log(response);
    if (response.status == 200) {
      const ViewQuestionData = response.data.responsedata;
      // var changedviewarray = ViewQuestionData?.map(item => {
      //   if (item?.options) {
      //     var options = JSON.parse(item?.options);
      //     item.options = options;
      //   }
      //   return item;
      // });
      var QuestionIds = ViewQuestionData?.map(item => {
        return item.question_id;
      });
      setAddedQuestion(QuestionIds);
      setViewquestionsData(ViewQuestionData);
    } else {
      console.log('error');
    }
  }

  const RemoveQuestionByID = e => {
    setloading(true);
    async function deleteData(e) {
      const practice_setID = PracticeId;
      const questionID = e;
      const connect_ID = practice_setID + '/' + questionID;

      const url = api_url.delete_practice_addedquestion + connect_ID;

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
          setrender(render + 1);
          getaddedquestions();
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
                    <h2 className="titlepractice">Practice Details</h2>
                    <p>{Practice?.title ? Practice.title : 'New Practice Set'}</p>
                  </p>
                  <div className="practicebuttons">
                    {' '}
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
                      onClick={e => (PracticeId ? handleclass(e.target.value) : '')}
                    >
                      <span>2</span> Settings
                    </button>
                    <button
                      value={3}
                      className={Activesolution ? 'practice-tabpane' : ''}
                      onClick={e => (PracticeId ? handleclass(e.target.value) : '')}
                    >
                      <span>3</span> Questions
                    </button>
                    <button
                      value={4}
                      className={ActiveAttachment ? 'practice-tabpane' : ''}
                      onClick={e => (PracticeId ? handleclass(e.target.value) : '')}
                    >
                      <span>4</span> Schedules
                    </button>
                  </div>
                </div>
              </div>
            </Cards>
          </div>

          {tabpane?.Details == true ? (
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
                      <Row gutter={30} className="detailrow togglefield">
                        <Col md={24} xs={24} className="mb-space">
                          <Form.Item
                            name="title"
                            label="Title"
                            rules={[
                              {
                                required: true,
                                message: 'Please Enter Title !',
                              },
                            ]}
                          >
                            <Input
                              name=""
                              placeholder="Title"
                              onChange={selectedValue => {
                                setsettingData({ ...settingData, title: selectedValue });
                              }}
                            />
                          </Form.Item>
                        </Col>
                        {RoleName == 'super_admin' ? (
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
                                  setsettingData({ ...settingData, created_by: selectedValue });
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
                        ) : (
                          ''
                        )}
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
                        {/* <Col md={24} xs={24} className="freepaid switchToggle mb-space">
                          <p>
                            <b>Free</b> <br />
                            Paid (Accessible to only paid users). Free (Anyone can access).
                          </p>
                          <Switch onChange={() => setPaidASwitch(!PaidASwitch)} checked={PaidASwitch} />
                        </Col> */}
                        <Col md={24} xs={24} className="mb-space">
                          <Form.Item className="txtareaSpace fullsizefield" name="description" label="Description">
                            <Editor
                              onChange={selectedValue => {
                                setsettingData({ ...settingData, description: selectedValue.html });
                              }}
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
                        <Col md={24} xs={24} className="freepaid switchToggle mb-space">
                          <p>
                            <b>Status</b> <br />
                            Published (Shown Everywhere). Draft (Not Shown).
                          </p>
                          <Switch onChange={() => setASwitch(!ASwitch)} checked={ASwitch} />
                        </Col>
                        <Col md={24} xs={24} style={{ textAlign: 'right' }}>
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
          {tabpane?.Settings == true ? (
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
                  <Main className="Settings_form_main">
                    <Form className="Settings_form" form={SettingsForm} onFinish={() => SettingFormSubmit('settings')}>
                      <Row className="Main_division">
                        <Col md={12} className="First_Division" style={{ padding: '15px 10px 0px 0px' }}>
                          <Row gutter={30}>
                            <Col md={12} className="info">
                              <b>
                                <label> Duration Mode:</label>{' '}
                              </b>
                              <i class="fa fa-info-circle" aria-hidden="true"></i>
                            </Col>
                            <Col md={12} className="text-right">
                              {' '}
                              <div className="video_buttons">
                                <Button
                                  value={1}
                                  className={isActive ? 'bg-salmon' : ''}
                                  // onClick={e => handleClick(e.target.value)}
                                  onClick={e => {
                                    setsettingData({ ...settingData, durationAuto: true, durationManual: false });
                                    setIsActive(current => !current);
                                    setActive(false);
                                    setShowManualfield(false);
                                  }}
                                >
                                  Auto
                                </Button>

                                <Button
                                  value={2}
                                  id="No"
                                  className={Active ? 'bg-salmon' : ''}
                                  onClick={e => {
                                    setsettingData({ ...settingData, durationAuto: false, durationManual: true });
                                    setIsActive(false);
                                    setActive(current => !current);
                                    setShowManualfield(true);
                                  }}
                                >
                                  Manual
                                </Button>
                              </div>
                            </Col>
                            {ShowManualfield != false ? (
                              <Col md={24} xs={24}>
                                <Form.Item
                                  className="duration"
                                  //name="duration"
                                  label="Duration (Minutes)"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please Enter Duration !',
                                    },
                                  ]}
                                >
                                  <Input
                                    onChange={e =>
                                      setsettingData({ ...settingData, durationmaunalInput: e.target.value })
                                    }
                                  ></Input>
                                </Form.Item>
                              </Col>
                            ) : (
                              ''
                            )}
                          </Row>

                          <Row gutter={30}>
                            <Col md={12} className="info">
                              <b>
                                <label> Allow Reward Points</label>{' '}
                              </b>
                              <i class="fa fa-info-circle" aria-hidden="true"></i>
                            </Col>
                            <Col md={12} className="text-right">
                              {' '}
                              <div className="video_buttons">
                                <Button
                                  value={1}
                                  className={isActive2 ? 'bg-salmon' : ''}
                                  onClick={e => {
                                    setsettingData({ ...settingData, RewardAuto: true, RewardManual: false });
                                    setIsActive2(current => !current);
                                    setActive2(false);
                                  }}
                                >
                                  Auto
                                </Button>
                                <Button
                                  value={2}
                                  id="No"
                                  className={Active2 ? 'bg-salmon' : ''}
                                  onClick={e => {
                                    setsettingData({ ...settingData, RewardAuto: false, RewardManual: true });
                                    setIsActive2(false);
                                    setActive2(current => !current);
                                  }}
                                >
                                  Manual
                                </Button>
                              </div>
                            </Col>
                          </Row>
                          <Row gutter={30}>
                            <Col md={12} className="info">
                              <b>
                                <label>Points Mode</label>{' '}
                              </b>
                              <i class="fa fa-info-circle" aria-hidden="true"></i>
                            </Col>
                            <Col md={12} className="text-right">
                              {' '}
                              <div className="video_buttons">
                                <Button
                                  value={1}
                                  className={isActive1 ? 'bg-salmon' : ''}
                                  onClick={e => {
                                    setsettingData({ ...settingData, PointsAuto: true, PointsManual: false });
                                    setIsActive1(current => !current);
                                    setActive1(false);
                                    setShowPointsManualfield(false);
                                  }}
                                >
                                  Auto
                                </Button>
                                <Button
                                  value={2}
                                  id="No"
                                  className={Active1 ? 'bg-salmon' : ''}
                                  onClick={e => {
                                    setsettingData({ ...settingData, PointsAuto: false, PointsManual: true });
                                    setIsActive1(false);
                                    setActive1(current => !current);
                                    setShowPointsManualfield(true);
                                  }}
                                >
                                  Manual
                                </Button>
                              </div>
                            </Col>
                            {ShowPointsManualfield != false ? (
                              <Col md={24} xs={24}>
                                <Form.Item
                                  name="duration"
                                  className="duration"
                                  label="Points for Correct Answer"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please Enter Duration !',
                                    },
                                  ]}
                                >
                                  <Input
                                    onChange={e =>
                                      setsettingData({ ...settingData, pointsmaunalInput: e.target.value })
                                    }
                                  ></Input>
                                </Form.Item>
                              </Col>
                            ) : (
                              ''
                            )}
                            <Col md={24} className="termsSection">
                              <Form.Item name="terms_condition" label="Terms & Condition">
                                <Editor
                                  name="terms_condition"
                                  onChange={selectedValue => {
                                    setsettingData({ ...settingData, terms_condition: selectedValue.html });
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
                          </Row>
                        </Col>
                        <Col md={12} className="Second_Division" style={{ padding: '15px 10px 0px 10px' }}>
                          <Row gutter={30}>
                            <Col md={12} className="info">
                              <b>
                                <label> Show Reward Popup</label>{' '}
                              </b>
                              <i class="fa fa-info-circle" aria-hidden="true"></i>
                            </Col>
                            <Col md={12} className="text-right">
                              {' '}
                              <div className="video_buttons">
                                <Button
                                  value={1}
                                  className={isActive3 ? 'bg-salmon' : ''}
                                  onClick={e => {
                                    setsettingData({ ...settingData, showRewardAuto: true, showRewardManual: false });
                                    setIsActive3(current => !current);
                                    setActive3(false);
                                  }}
                                >
                                  Auto
                                </Button>
                                <Button
                                  value={2}
                                  id="No"
                                  className={Active3 ? 'bg-salmon' : ''}
                                  onClick={e => {
                                    setsettingData({ ...settingData, showRewardAuto: false, showRewardManual: true });
                                    setIsActive3(false);
                                    setActive3(current => !current);
                                  }}
                                >
                                  Manual
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      <Col md={24} xs={24}>
                        <div className="add-details-bottom text-right">
                          <Button
                            htmlType="submit"
                            type="success"
                            size="default"
                            className="btn-animation"
                            //onClick={PracticeId ? HandleSettingTab : ''}
                          >
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
          {tabpane?.Questions == true ? (
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
                    <Form
                      className="Question_form"
                      form={FilterForm}
                      //onFinish={SearchQuestion}
                    >
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
                          {/* <Col md={24}>
                        <b>
                          <label>By Tag</label>
                        </b>
                        <FormItem name="by_tag ">
                          <Select
                            isSearchable={true}
                            filtertagsData={filtertagsData}
                            onChange={selectedValue => {
                              setFilterData({ ...FilterData, by_tag: selectedValue });
                            }}
                          >
                            {filtertagsData != null
                              ? filtertagsData.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                              : ''}
                          </Select>
                        </FormItem>
                      </Col> */}
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
                                setRender(Render + 1);
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
                                    <p className="Unique_code">{'que_' + encrypttheid(item?.question_id)}</p>
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
              </Cards>
            </div>
          ) : (
            ''
          )}
          {tabpane?.Schedules == true ? (
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
                  <Main className="Schedule_form_main">
                    <div key="1" className="page-header-actions" style={{ marginTop: '16px', justifyContent: 'end' }}>
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
                      data={data}
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
                        onFinish={addNewSchedule}
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
                                    {/* <b>
                                        <label>End Time</label>
                                      </b> */}
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
                                      onChange={() => {
                                        setActiveStatusSwitch(!ActiveStatusSwitch);
                                      }}
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
                        onFinish={editSchedule}
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

export default CreateNewQuiz;
