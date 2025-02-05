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
  // const id = decodetheid(params?.id);
  const location = useLocation();
  const history = useHistory();
  const [form] = Form.useForm();
  const [Detailsform] = Form.useForm();
  const [FilterForm] = Form.useForm();
  const [EditScheduleForm] = Form.useForm();
  const [SettingsForm] = Form.useForm();
  const [QuestionsForm] = Form.useForm();
  const [ScheduleForm] = Form.useForm();
  const [startDate, setStartDate] = useState();
  const [StartTime, setStartTime] = useState();
  const [EndDate, setEndDate] = useState();
  const [EndTime, setEndTime] = useState();

  const [startEditDate, setStartEditDate] = useState();
  const [StartEditTime, setStartEditTime] = useState();
  const [EndEditDate, setEndEditDate] = useState();
  const [EndEditTime, setEndEditTime] = useState();
  const [quizupdatedid, setquizupdatedid] = useState([]);
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
  const [PaidASwitch, setPaidASwitch] = useState(false);
  const [ActiveDetails, setActiveDetails] = useState(false);
  const [Activesolution, setActivesolution] = useState(false);

  const [ActiveSetting, setActiveSetting] = useState(false);
  const [ActiveAttachment, setActiveAttachment] = useState(false);
  const [PracticeId, setPracticeId] = useState();
  const [arrayDataUsergroup, setarrayDataUsergroup] = useState(null);
  const [arrayDataUser, setarrayDataUser] = useState(null);
  const [formData, setformData] = useState();

  const [titles, settitles] = useState();
  const [ActiveSwitch, setActiveSwitch] = useState(false);
  const [EditActiveStatusSwitch, setEditActiveStatusSwitch] = useState(false);
  const [ActiveStatusSwitch, setActiveStatusSwitch] = useState(false);

  const [MetaId, setMetaId] = useState();

  const [Practice, setPractice] = useState();
  const [render, setrender] = useState(0);

  const [sidebaroptions, setsidebaroptions] = useState(false);
  const [OptionLoading, setOptionLoading] = useState(false);
  const [add_sidebaroptions, setadd_sidebaroptions] = useState(false);
  const [add_OptionLoading, setadd_OptionLoading] = useState(false);
  const [sidebaroptionss, setsidebaroptionss] = useState(false);
  const [DescriptionValue, setDescriptionValue] = useState();
  const [moduledataarray, setmoduledataarray] = useState();
  const [AllInstructor, setAllInstructor] = useState([]);
  const [EditFormDate, setEditFormDate] = useState({
    startDate: '',
    endDate: '',
  });
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
    terms_condition: '',
  });
  const [SettingsData, setSettingsData] = useState({
    sub_category_id: '',
    skill_id: '',
    sub_category: '',
    title: '',
    created_by: '',
    description: '',
  });

  const [ShowTabPane, setShowTabPane] = useState({
    Details: true,
    Settings: false,
    Questions: false,
    Schedules: false,
  });
  const [ShowQuestions, setShowQuestions] = useState({
    ViewQuestion: true,
    AddQuestion: false,
    CurrentView: false,
    CurrentAdd: false,
  });

  const [editscheduleData, seteditscheduleData] = useState({
    schedule_type: '',
    start_date: '',
    start_time: '',
    grace_period: '',
    user_groups: '',
    schedule_individuel: '',
  });
  const [Render, setRender] = useState(0);
  const id = decodetheid(params.id);

  /**QUESTION **/

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
    if (location?.state == 4) {
      setActiveAttachment(current => !current);
      setActiveDetails(false);
      setActiveSetting(false);
      setActivesolution(false);
      setShowTabPane({
        Details: false,
        Settings: false,
        Questions: false,
        Schedules: true,
      });
      setActiveDetails(false);
    } else {
      setActiveDetails(true);
    }

    //handleclass(location?.state);

    async function GetAllshedule() {
      const url = api_url.get_schedules_learn;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const usersdata = response?.data?.data;
        //setData(usersdata);
      } else {
        console.log('error');
      }
    }
    GetAllshedule();
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

    getPracticebyID();
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
    // setActiveDetails(true);
    // seteditscheduleData({
    //   schedule_type: editscheduleData?.schedule_type,
    //   start_date: moment(editscheduleData?.start_date).format('MM:DD:YYYY'),
    //   start_time: moment(editscheduleData?.start_time).format('HH:mm'),
    //   grace_period_to_join: editscheduleData?.grace_period,
    //   schedule_to_group: editscheduleData?.user_groups,
    //   schedule_to_individual: editscheduleData?.schedule_individuel,
    // });
  }, []);
  useEffect(() => {
    if (UserID) {
      setsettingData({ ...settingData, created_by: UserID });
    }
  }, []);
  useEffect(() => {
    async function GetAllsheduleById() {
      const url = api_url.get_schedules_by_event_id + id + '/' + '34';
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const scheduleIddata = response?.data?.data;
        setData(scheduleIddata);
      } else {
        console.log('error');
      }
    }
    GetAllsheduleById();
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
        console.log(response);
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
  }, [id, Render]);

  async function GetPrcaticeByID(id) {
    const url = api_url.get_schedules_id + id;
    const response = await get_api_request(url, headers);
    if (response.status == 200) {
      const Scheduledata = response.data.data[0];
      // setData(usersdata);
      if (Scheduledata?.status == '1') {
        setEditActiveSwitch(true);
        setEditActiveStatusSwitch(true);
      } else if (Scheduledata?.status == '0') {
        setEditActiveSwitch(false);
        setEditActiveStatusSwitch(false);
      }

      if (Scheduledata?.paid == 1) {
        setEditASwitch(true);
      } else if (Scheduledata?.paid == 0) {
        setEditASwitch(true);
      }

      setsettingData({
        ...settingData,
        editflex: Scheduledata?.schedule_type == 'Flexible' ? true : false,
        editfixed: Scheduledata?.schedule_type == 'Fixed' ? true : false,
        pointsmaunalInput: Scheduledata?.pointsinput,
        //durationmaunalInput: Scheduledata?.durationinput,
      });
      setEditFormDate({
        startDate: Scheduledata?.start_date ? moment(Scheduledata?.start_date) : '',
        endDate: Scheduledata?.end_date ? moment(Scheduledata?.end_date) : '',
      });
      var numberArray;
      if (Scheduledata.schedule_to_individual) {
        // const individual = Scheduledata.schedule_to_individual?.split(',');
        // numberArray = individual?.map(Number); //to show data with id in multiple tag --"151,150,152"
        // console.log(numberArray);
        numberArray = JSON.parse(Scheduledata.schedule_to_individual);
      }

      var groupArray;
      if (Scheduledata.schedule_to_group) {
        // const individual = scheduledatabyid.schedule_to_individual?.split(',');
        // numberArray = individual?.map(Number); //to show data with id in multiple tag --"151,150,152"
        // console.log(numberArray);
        //groupArray = JSON.parse(Scheduledata?.schedule_to_group);
      }
      console.log(Scheduledata);
      EditScheduleForm.setFieldsValue({
        user_groups: Scheduledata?.schedule_to_group,
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

  /*==========================================END */
  /*HANDLING EDIT=============================START */
  const handleEdit = id => {
    async function editData(id) {
      const encryptedid = encrypttheid(id);
      const postID = encryptedid;
      history.push(`../users/edit-user/${postID}`);
    }
    editData(id);
  };

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
    const id = encrypttheid(e);
    navigator.clipboard.writeText(`${domainpath}/dashboard/engage/edit-practice/${id}`);
    notification.success({
      message: `Copied Successfully ${domainpath}/dashboard/engage/edit-practice/${id}`,
    });
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

  const handleclass = e => {
    if (e == 1) {
      setActiveDetails(current => !current);
      setActiveSetting(false);
      setActivesolution(false);
      setActiveAttachment(false);
      //setActivesection(false);
      setShowTabPane({
        Details: true,
        Settings: false,
        Questions: false,
        Schedules: false,
      });
    } else if (e == 2) {
      setActiveSetting(current => !current);
      setActiveDetails(false);
      setActivesolution(false);
      setActiveAttachment(false);
      setShowTabPane({
        Details: false,
        Settings: true,
        Questions: false,
        Schedules: false,
      });
    } else if (e == 3) {
      setActivesolution(current => !current);
      setActiveDetails(false);
      setActiveSetting(false);
      setActiveAttachment(false);
      setShowTabPane({
        Details: false,
        Settings: false,
        Questions: true,
        Schedules: false,
      });
    } else if (e == 4) {
      setActiveAttachment(current => !current);
      setActiveDetails(false);
      setActiveSetting(false);
      setActivesolution(false);
      setShowTabPane({
        Details: false,
        Settings: false,
        Questions: false,
        Schedules: true,
      });
    }
  };
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
  var updateids;
  async function getPracticebyID() {
    const url = api_url.get_practice_id + id;
    const response = await get_api_request(url, headers);
    if (response.status == 200) {
      console.log(response);
      var practicebyid = response?.data?.responsedata?.[0];
      settitles(practicebyid?.title);
      var meta = response?.data?.meta;

      updateids = practicebyid?.id;
      quizupdatedid.push(practicebyid?.id);

      if (practicebyid?.status == 1) {
        setASwitch(true);
      } else if (practicebyid?.status == 0) {
        setASwitch(false);
      }
      if (practicebyid?.free == 1) {
        setPaidASwitch(true);
      } else if (practicebyid?.free == 0) {
        setPaidASwitch(false);
      }
      console.log(meta);
      setShowManualfield(meta?.durationmanual);
      setShowPointsManualfield(meta?.pointsmanual);
      setsettingData({
        ...settingData,
        durationAuto: meta?.durationauto,
        durationManual: meta?.durationmanual,
        RewardAuto: meta?.Rewardauto,
        RewardManual: meta?.Rewardmanual,
        PointsAuto: meta?.pointsauto,
        PointsManual: meta?.pointsmanual,
        showRewardManual: meta?.showRewardmanual,
        showRewardAuto: meta?.showRewardauto,
        durationmaunalInput: meta?.durationinput,
        pointsmaunalInput: meta?.pointsinput,
        terms_condition: meta?.terms_condition,
      });
      SettingsForm.setFieldsValue({
        durationmaunalInput: meta?.durationinput,
        pointsmaunalInput: meta?.pointsinput,
        terms_condition: meta?.terms_condition,
      });
      console.log(meta?.terms_condition);
      setSettingsData({
        title: practicebyid?.title,
        created_by: practicebyid?.created_by,
        sub_category_id: practicebyid?.subcategory_id,
        skill_id: practicebyid?.skill_id,
        description: practicebyid?.description,
      });

      Detailsform.setFieldsValue({
        title: practicebyid?.title,
        created_by: practicebyid?.created_by,
        sub_category_id: practicebyid?.subcategory_id,
        skill_id: practicebyid?.skill_id,
        description: practicebyid?.description,
      });
    } else {
      console.log('error');
    }
  }

  const addDetails = (e, name) => {
    var meta = {};
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
    var EditPrcaticDetail = {
      description: SettingsData?.description,
      title: SettingsData?.title,
      created_by: SettingsData?.created_by,
      subcategory_id: SettingsData?.sub_category_id,
      skill_id: SettingsData?.skill_id,
      free: paidswicth,
      status: activeswicth,
      meta: {},
    };

    EditPrcaticDetail['meta'] = meta;
    async function UpdatedQuiz() {
      const url = api_url.update_practice_id + quizupdatedid?.[0];
      const response = await put_api_request(url, EditPrcaticDetail, headers);
      console.log(response);
      if (response.status === 201) {
        notification.success({
          message: response?.data?.responsedata,
        });
        if (name == 'details') {
          setActiveSetting(current => !current);
          setActiveDetails(false);
          setActivesolution(false);
          setActiveAttachment(false);
          setShowTabPane({
            Details: false,
            Settings: true,
            Questions: false,
            Schedules: false,
          });
        }
        //settitles(response.)
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

  const SettingFormSubmit = name => {
    var meta = {};
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
    var EditPrcaticDetail = {
      description: SettingsData?.description,
      title: SettingsData?.title,
      created_by: SettingsData?.created_by,
      subcategory_id: SettingsData?.sub_category_id,
      skill_id: SettingsData?.skill_id,
      free: paidswicth,
      status: activeswicth,
      meta: {},
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
    EditPrcaticDetail['meta'] = meta;
    console.log(settingData);
    async function UpdatePracticebyid() {
      const url = api_url.get_practice_id + quizupdatedid?.[0];
      const response = await put_api_request(url, EditPrcaticDetail, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.responsedata,
        });

        const metadata = response?.data?.responsedata;
        setMetaId(metadata);
        if (name == 'settings') {
          setActivesolution(current => !current);
          setActiveDetails(false);
          setActiveSetting(false);
          setActiveAttachment(false);
          setShowTabPane({
            Details: false,
            Settings: false,
            Questions: true,
            Schedules: false,
          });
        }
      } else {
        notification.error({ message: response?.message });
      }
    }
    UpdatePracticebyid();
  };
  const addNewSchedule = fieldsvalue => {
    var payload = {};
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
    const IndividualString = JSON.stringify(fieldsvalue.schedule_individuel);
    console.log(IndividualString);
    // const GroupString = JSON.stringify(fieldsvalue?.schedule_to_group);

    payload['schedule_type'] = schedule_Type;
    payload['event_type'] = 34;
    payload['event_id'] = id;
    payload['start_date'] = moment(fieldsvalue.start_date).format('YYYY-MM-DD');
    payload['start_time'] = moment(fieldsvalue.start_time).format('HH:mm');
    payload['end_date'] = moment(fieldsvalue.end_date).format('YYYY-MM-DD');
    payload['end_time'] = moment(fieldsvalue.end_time).format('HH:mm');
    payload['grace_period_to_join'] = fieldsvalue.grace_period_to_join;
    payload['schedule_to_group'] = fieldsvalue?.user_groups;
    payload['schedule_to_individual'] = IndividualString;
    payload['status'] = activeswicth;

    console.log(payload);
    async function CreateLesson(data) {
      const url = api_url.create_schedule;
      const response = await post_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.message,
        });
        setRender(Render + 1);
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
    CreateLesson(payload);
  };
  function clearInput() {
    document.getElementById('ScheduleForm').reset();
  }

  const editSchedule = FieldsValue => {
    console.log(FieldsValue);
    var Payload = {};
    var schedule_Type;
    if (settingData.editfixed == true) {
      schedule_Type = 'Fixed';
    } else if (settingData.editflex == true) {
      schedule_Type = 'Flexible';
      Payload['end_date'] = moment(EditFormDate?.endDate).format('YYYY-MM-DD');
      Payload['end_time'] = moment(FieldsValue.end_time).format('HH:mm');
    }

    var activeswicth;

    if (EditActiveStatusSwitch == true) {
      activeswicth = 1;
    } else {
      activeswicth = 0;
    }
    const IndividualString = JSON.stringify(FieldsValue?.schedule_individual);
    console.log(IndividualString);
    const GroupString = JSON.stringify(FieldsValue?.schedule_to_group);
    console.log(FieldsValue);

    Payload['schedule_type'] = schedule_Type;
    Payload['event_type'] = 34;
    Payload['event_id'] = id;
    Payload['start_date'] = moment(EditFormDate?.startDate).format('YYYY-MM-DD');
    Payload['start_time'] = moment(FieldsValue.start_time).format('HH:mm');
    Payload['grace_period_to_join'] = FieldsValue.grace_period_to_join;
    Payload['schedule_to_group'] = FieldsValue?.schedule_to_group;
    Payload['schedule_to_individual'] = IndividualString;
    Payload['status'] = activeswicth;

    console.log(Payload);
    async function CreateLesson(data) {
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
      } else {
        notification.error({ message: response?.data?.message });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      }
    }
    CreateLesson(Payload);
  };

  const AddQuestionByID = e => {
    setloading(true);
    var addQuestion = {
      practice_set_id: id,
      question_id: e,
    };
    console.log(addQuestion);
    async function AddQuizQuestion() {
      const url = api_url.create_practice_question;
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

  const RemoveQuestionByID = e => {
    setloading(true);
    async function deleteData(e) {
      const practice_setID = id;
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

  async function getaddedquestions() {
    const url = api_url.get_practice_addedquestion + id;
    const response = await get_api_request(url, headers);
    if (response.status == 200) {
      console.log(response);
      const ViewQuestionData = response?.data?.responsedata;
      // var changedviewarray = ViewQuestionData?.map(item => {
      //   if (item?.options) {
      //     var options = JSON.parse(item?.options);
      //     item.options = options;
      //   }
      //   return item;
      // });
      console.log(ViewQuestionData);
      var QuestionIds = ViewQuestionData?.map(item => {
        return item.question_id;
      });
      setAddedQuestion(QuestionIds);
      setViewquestionsData(ViewQuestionData);
    } else {
      console.log('error');
    }
  }
  const SearchQuestion1 = fieldsvalue => {
    var searchquestion = {
      code: FilterData?.by_code,
      section: FilterData?.by_section,
      skill: FilterData?.by_skill,
      type: SeacrhArray,
      topic: FilterData?.by_topic,
      question_type: LevelArray,
    };
    console.log(searchquestion);
    console.log(JSON.stringify(searchquestion));

    async function GetSearchQuestion() {
      const url = api_url.search_question;
      const response = await get_api_request(url, searchquestion, headers);
      console.log(response);
      if (response.status == 200) {
        const searchedQuestionsData = response?.data?.data;
        setQuestionSearchData(searchedQuestionsData);
      } else {
        console.log('error');
      }
    }
    GetSearchQuestion();
  };

  const GetQuestiontypeid1 = (e, id) => {
    if (e.target.checked == true) {
      SeacrhArray.push(id);
    } else if (e.target.checked == false) {
      delete SeacrhArray[id];
      const filteredPeople = SeacrhArray.filter(item => item !== id);
      console.log(filteredPeople);
      setSeacrhArray(filteredPeople);
    }
  };

  const Getlevelsid1 = (e, id) => {
    if (e.target.checked == true) {
      LevelArray.push(id);
    } else if (e.target.checked == false) {
      delete LevelArray[id];
      const filteredPeople = LevelArray.filter(item => item !== id);
      console.log(filteredPeople);
      setLevelArray(filteredPeople);
    }
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
          // setQuestionSearchData(searchedQuestionsData);
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
                    <p>{titles}</p>
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
                      onClick={e => handleclass(e.target.value)}
                    >
                      <span>2</span> Settings
                    </button>
                    <button
                      value={3}
                      className={Activesolution ? 'practice-tabpane' : ''}
                      onClick={e => handleclass(e.target.value)}
                    >
                      <span>3</span> Questions
                    </button>
                    <button
                      value={4}
                      className={ActiveAttachment ? 'practice-tabpane' : ''}
                      onClick={e => handleclass(e.target.value)}
                    >
                      <span>4</span> Schedules
                    </button>
                  </div>
                </div>
              </div>
            </Cards>
          </div>

          {ShowTabPane?.Details == true ? (
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
                      datafield={'details'}
                      layout="vertical"
                      onFinish={e => addDetails(e, 'details')}
                    >
                      <Row gutter={30} className="detailrow togglefield">
                        <Col md={24} xs={24} className="mb-space">
                          <Form.Item
                            name="title"
                            label="Title"
                            rules={[
                              {
                                required: false,
                                message: 'Please Enter Status !',
                              },
                            ]}
                          >
                            <Input
                              name=""
                              placeholder="Title"
                              onChange={selectedValue => {
                                setSettingsData({ ...SettingsData, title: selectedValue.target.value });
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
                              onChange={selectedValue => {
                                setSettingsData({ ...SettingsData, sub_category_id: selectedValue });
                              }} //onSelect={GetPosition}
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
                                setSettingsData({ ...SettingsData, skill_id: selectedValue });
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
                                setSettingsData({ ...SettingsData, description: selectedValue.html });
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
          {ShowTabPane?.Settings == true ? (
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
                                  //className={isActive ? 'bg-salmon' : ''}
                                  className={
                                    settingData?.durationManual == undefined || settingData?.durationManual == false
                                      ? 'bg-salmon'
                                      : ''
                                  }
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
                                  // className={Active ? 'bg-salmon' : ''}
                                  className={settingData?.durationManual == true ? 'bg-salmon' : ''}
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

                            {settingData?.durationManual != undefined && settingData?.durationManual != false ? (
                              <Col md={24} xs={24}>
                                <Form.Item
                                  className="duration"
                                  name="durationmaunalInput"
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
                                  className={
                                    settingData?.RewardManual == undefined || settingData?.RewardManual == false
                                      ? 'bg-salmon'
                                      : ''
                                  }
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
                                  className={settingData?.RewardManual == true ? 'bg-salmon' : ''}
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
                                  className={
                                    settingData?.PointsManual == undefined || settingData?.PointsManual == false
                                      ? 'bg-salmon'
                                      : ''
                                  }
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
                                  className={settingData?.PointsManual == true ? 'bg-salmon' : ''}
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
                            {settingData?.PointsManual != undefined && settingData?.PointsManual != false ? (
                              <Col md={24} xs={24}>
                                <Form.Item
                                  name="pointsmaunalInput"
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
                                  className={
                                    settingData?.showRewardAuto == undefined || settingData?.showRewardManual == false
                                      ? 'bg-salmon'
                                      : ''
                                  }
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
                                  className={settingData?.showRewardManual == true ? 'bg-salmon' : ''}
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
          {ShowTabPane?.Schedules == true ? (
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
                        name="sDash_validation-form"
                        className="AddForm contactForm"
                        form={form}
                        id="schedule_form"
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
                              <Button htmlType="submit" className="btn-animation">
                                Update
                              </Button>
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
