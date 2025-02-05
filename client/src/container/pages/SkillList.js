import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Row, Input, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
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
const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { TextArea } = Input;
var ModuleName = 'DASHBOARD';
/*Filter Section =========Start*/
var OriginalData = [];

/*Filter Section =========Ends*/
const UsersList = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [form] = Form.useForm();
  const [Editform] = Form.useForm();
  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);
  const params = useParams();
  const [ShowEditskill, setShowEditskill] = useState(false);
  const [ShowAddNewUser, setShowAddNewUser] = useState(false);
  const [arrayDataSection, setarrayDataSection] = useState(null);
  const [ASwitch, setASwitch] = useState(false);
  const [editASwitch, seteditASwitch] = useState(false);
  const [formData, setformData] = useState();

  const [settingData, setsettingData] = useState({
    section_id: '',
  });
  /*Filter Section================================================= Starts */
  const [FilteredArraynew, setFilteredArraynew] = useState({
    skill_name: [],
    section_name: [],
    active: [],
  });
  const [dataForFilter, setDataForFilter] = useState([]);
  const [ShowNameFilter, setShowNameFilter] = useState(false);
  const [UserFilterClass, setUserFilterClass] = useState(true);
  const [RoleFilterClass, setRoleFilterClass] = useState(true);
  const [EmailFilterClass, setEmailFilterClass] = useState(true);
  const [PhoneFilterClass, setPhoneFilterClass] = useState(true);
  const [ActiveFilterClass, setActiveFilterClass] = useState(true);
  const [FirstFilterActive, setFirstFilterActive] = useState(false);
  const [FilterCategoryName, setFilterCategoryName] = useState({
    skill_name: false,
    section_name: false,
    active: false,
  });
  const [ShowActive, setShowActive] = useState(false);
  const [CheckedDataArray, setCheckedDataArray] = useState({
    skill_name: '',
    section_name: '',
    active: '',
  });
  const [Render, setRender] = useState(0);
  /*Filter Section================================================= Ends */
  useEffect(() => {
    async function GetAllUsers() {
      const url = api_url.get_skills;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const usersdata = response?.data?.responsedata;
        /*FILTER SECTION ============STARTS*/
        OriginalData = usersdata;
        GetFilterData(usersdata);
        setData(usersdata);
        dataForFilter.push(usersdata);
        /*FILTER SECTION ==========Ends*/
      } else {
        console.log('error');
      }
    }
    GetAllUsers();
    async function getSection() {
      const url = api_url.get_section;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const skilldata = response.data.responsedata;
        const dataArray = skilldata.map(item => {
          return { id: item.id, name: item.section_name };
        });
        setarrayDataSection(dataArray);
      } else {
        console.log('error');
      }
    }
    getSection();
  }, []);

  /*FILTER SECTION ================================================================STARTS*/

  /************************************Get Form Data Starts */
  const SearchFilteredData = (search, name, uniqueData, margin) => {
    GetFilterData(OriginalData, search, name);
  };
  function submit_form(form_id) {
    let e = document.getElementById(form_id),
      l = new FormData(e),
      t = Array.from(l.entries());
    var n = {};
    for (let o = 0; o < t.length; o++) {
      var s = t[o],
        i = s[0],
        y = s[1];
      y.length > 0 && (void 0 != n[i] ? (n[i] = n[i] + ',' + y) : (n[i] = y));
    }
    return n;
  }

  /************************************Get Form Data Ends */

  /**********************************Search Data Starts */
  const FilterResult = FieldName => {
    var FilterPayload = submit_form('MapSectionForm');
    CheckedDataArray[FieldName] = FilterPayload[FieldName];
    //var FilterPayload = CheckedDataArray;
    if (Object.keys(FilterPayload).length > 0) {
      var filterdata = [];
      var filter_keys = Object.keys(FilterPayload);
      var s = 0;
      filter_keys?.forEach(name => {
        var arr = FilterPayload[name].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

        if (arr) {
          if (s == 0) {
            filterdata = OriginalData.filter(rowdata => {
              return arr.includes(rowdata[name]);
            });
          } else {
            filterdata = filterdata.filter(rowdata => {
              return arr.includes(rowdata[name]);
            });
          }

          s++;
        }
      });

      setData(filterdata);
    } else {
      setData(OriginalData);
    }
  };
  /**********************************Search Data Ends */
  /**********************************Change Index Starts */

  const moveElement = (array, fromIndex, toIndex, field_name, uniqueData) => {
    const element = array.splice(fromIndex, 1)[0];

    array.splice(toIndex, 0, element);

    return array;
  };
  /**********************************Change Index Ends */

  /***********************ReRender ChildComponent Starts */
  useEffect(() => {}, [Render]);
  /***********************ReRender ChildComponent Ends */
  /**********************************Get Unique Data Starts */
  const GetFilterData = (data, search = 'null', field_name = 'null') => {
    var FilterColumns = ['skill_name', 'section_name', 'active'];
    var i = 0;
    var count = 0;
    var uniqueData = [];
    FilterColumns?.forEach(name => {
      uniqueData = [...new Map(data.map(item => [item[name], item])).values()];

      //const index = uniqueData.findIndex(item => item[name].toLowerCase() === search.toLowerCase());
      /***************************************************Chaneg Index Starts */

      if (search != 'null' && field_name != 'null' && search) {
        uniqueData.forEach((item, i) => {
          if (item[name].toLowerCase().match(search.toLowerCase())) {
            if (i >= 0) {
              count++;
              var fromIndex = i;
              const toIndex = 0;
              uniqueData = moveElement(uniqueData, fromIndex, toIndex, field_name, uniqueData);
              setRender(count);
              ToCheckBox(field_name, uniqueData);
            }
          }
        });
      }

      /***************************************************Chaneg Index Ends */

      var margin = i * 320;
      var elements = FilterSections(name, uniqueData, margin);
      FilteredArraynew[name] = elements;
      i++;
    });
  };
  /**********************************Get Unique Data Ends */
  /**********************************Checked Checkbox By ID Starts */
  const ToCheckBox = name => {
    if (name != 'null') {
      var arr = CheckedDataArray[name].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
      if (arr != null) {
        arr?.map(check => {
          dataForFilter[0]?.map(item => {
            setTimeout(() => {
              if (check == item[name]) {
                document.getElementById(check).checked = true;
              } else {
                setTimeout(() => {
                  document.getElementById(item[name]).checked = false;
                }, 200);
              }
            }, 100);
          });
        });
      }
    }
  };
  /**********************************Checked Checkbox By ID Starts */

  // const ShowNameFilterIcon = () => {
  //   if (ShowNameFilter == true || ShowStatusFilter == true) {
  //     setFirstFilterActive(true);
  //   }
  // };

  /************************************Clear Filter Starts */

  const ClearFilter = name => {
    if (CheckedDataArray[name] != undefined) {
      var arr = CheckedDataArray[name].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
      if (arr != null) {
        arr?.map(check => {
          document.getElementById(check).checked = false;
        });
        setData(OriginalData);
        // setActiveFilterClass(true);
        // setCategoryFilterClass(true);
      }
    }
  };

  /************************************Clear Filter Starts */
  /************************************Filter Section HTML Starts */
  var FilterSections = (name, uniqueData, margin = null) => {
    return (
      <>
        <div className="filterdata-main" id="categoryfilter" style={{ marginLeft: margin + 'px' }}>
          <div className="filterdata" style={{ width: '220px', height: '210px' }}>
            <Cards>
              <i class="fa fa-filter" aria-hidden="true"></i> Filter
              <div className="innerfilter">
                <input
                  placeholder="search"
                  onChange={e => SearchFilteredData(e.target.value, name, uniqueData, margin)}
                />
                {uniqueData?.map((item, index) => (
                  <>
                    <div className="flex-check">
                      <input
                        type="checkbox"
                        name={name}
                        id={item[name]}
                        value={item[name]}
                        className={name + ' ' + 's-' + item[name]}
                        data-attr={item[name]}
                        onChange={e => {
                          FilterResult(name);
                        }}
                      />
                      <span>{name == 'active' ? (item[name] == 0 ? 'Inactive' : 'Active') : item[name]}</span>
                    </div>
                  </>
                ))}
              </div>
              <div className="ClearDone">
                <button onClick={() => ClearFilter(name)}>Clear</button>
                <button
                  onClick={() => {
                    setRoleFilterClass(true);
                    setUserFilterClass(true);
                    setActiveFilterClass(true);
                    setEmailFilterClass(true);
                    setPhoneFilterClass(true);
                  }}
                >
                  Done
                </button>
              </div>
            </Cards>
          </div>
        </div>
        {/* ) */}
      </>
    );
  };

  /************************************Filter Section HTML Ends */

  /*FILTER SECTION ================================================================ENDS*/

  /*HANDLE VIEW=================================START */
  const handleView = id => {
    async function viewData(id) {
      const encryptedid = encrypttheid(id);
      const postID = encryptedid;
      history.push(`../users/view-user/${postID}`);
    }
    viewData(id);
  };

  async function GetUserSkillDataByID(id) {
    const url = api_url.get_skills_id + id;
    const response = await get_api_request(url, headers);
    if (response.status == 200) {
      console.log(response);
      const usersdata = response?.data?.responsedata?.[0];
      console.log(usersdata);

      // setData(usersdata);
      if (usersdata?.active == 1) {
        seteditASwitch(true);
      } else if (usersdata?.active == 0) {
        seteditASwitch(false);
      }

      setsettingData({
        ...settingData,
        section_id: usersdata?.section_id,
      });

      Editform.setFieldsValue({
        skill_name: usersdata?.skill_name,
        section_id: usersdata?.section_name,
        //group_name: usersdata?.group_name,
        description: usersdata?.short_description,
      });
      setformData(usersdata);
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
    if (e == 1) {
      GetUserSkillDataByID(id);
      setShowEditskill(true);
    } else if (e == 2) {
      console.log('Delete');
      window.confirm('Are you sure you wish to delete this item?') ? handleDelete(id) : '';
    }
  };

  /*=========================================ENDS */
  /*HANDLING DELETE A USER===================START */
  const handleDelete = id => {
    var deletedrowid = id;
    var column = 'id';
    async function deleteData(id) {
      const url = api_url.delete_skills_id + deletedrowid;
      const response = await delete_api_request(url, headers);
      if (response.status == 201) {
        notification.success({
          message: 'Skill Deleted Successfully',
        });
        const afterdeletedata = data.filter(item => {
          if (column !== '') {
            return item[column] !== deletedrowid;
          }
          return item;
        });
        setData(afterdeletedata);
      } else if (response.status == 400) {
        alert(response.data.message);
      } else {
        alert('Error');
      }
      // });
    }
    deleteData(id);
  };
  const CopyToClipboard = e => {
    navigator.clipboard.writeText(e);
    notification.success({
      message: `Copied Successfully ${e}`,
    });
  };
  /*HANDLING DELETE A USER========================================END */
  const columns = [
    {
      name: 'CODE',
      selector: row => (
        <>
          <p onClick={() => CopyToClipboard(row.id)}>
            <i class="fa fa-files-o" aria-hidden="true"></i> {'skill_' + encrypttheid(row.id)}
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
      name: (
        <>
          Name{' '}
          <i
            class="fa fa-filter"
            aria-hidden="true"
            onClick={() => {
              setUserFilterClass(!UserFilterClass);
              //ShowNameFilterIcon();
              // setShowNameFilter(true);
            }}
          ></i>
        </>
      ),
      selector: row => row.skill_name,
      //sortable: true,
    },
    {
      name: (
        <>
          SECTION{' '}
          <i
            class="fa fa-filter"
            aria-hidden="true"
            onClick={() => {
              setRoleFilterClass(!RoleFilterClass);
              //ShowNameFilterIcon();
              // setShowNameFilter(true);
            }}
          ></i>
        </>
      ),
      selector: row => row.section_name,
      //sortable: true,
    },
    {
      name: (
        <>
          STATUS{' '}
          <i
            class="fa fa-filter"
            aria-hidden="true"
            onClick={() => {
              setActiveFilterClass(!ActiveFilterClass);
              // ShowNameFilterIcon();
              // setShowActive(!ShowActive);
              // setShowStatusFilter(!ShowStatusFilter);
            }}
          ></i>
        </>
      ),
      selector: row => (
        <>
          <span className={`status ${row.active == 1 ? 'Success' : 'error'}`}>
            {row.active == 1 ? 'Active' : 'Inactive'}
          </span>
        </>
      ),
    },

    {
      name: 'Actions',
      cell: row => (
        <div className="datatable-actions">
          <Select className="Quizz_actions" defaultValue="Actions" onSelect={e => HandleAction(e, row.id)}>
            <Option value={1}>Edit</Option>
            <Option
              value={2}
              //onClick={() => (window.confirm('Are you sure you wish to delete this item?') ? handleDelete(row.id) : '')}
            >
              Delete
            </Option>
          </Select>
        </div>
      ),
    },
  ];

  const tableData = {
    columns,
    data,
  };

  const editSkill = Fieldsvalue => {
    var Payload = {};
    var editactive;
    if (editASwitch == true) {
      editactive = 1;
    } else {
      editactive = 0;
    }
    Payload['short_description'] = Fieldsvalue.description;
    Payload['section_id'] = settingData.section_id;
    Payload['skill_name'] = Fieldsvalue.skill_name;
    Payload['active'] = editactive;
    console.log(Payload);
    async function Createeditskill(data) {
      const url = api_url.update_skills_id + formData.id;
      const response = await put_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.responsedata,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        // history.push('../users/customer-list');
      } else
        notification.error({
          message: 'Server Error',
        });
    }
    Createeditskill(Payload);
  };
  const addNewSkill = fieldsvalue => {
    var payload = {};
    var activeswicth;
    if (ASwitch == true) {
      activeswicth = 1;
    } else {
      activeswicth = 0;
    }
    payload['short_description'] = fieldsvalue.description;
    payload['section_id'] = fieldsvalue.section_id;
    payload['skill_name'] = fieldsvalue.skill_name;
    payload['active'] = activeswicth;
    console.log(payload);
    async function Createskill(data) {
      const url = api_url.create_skills;
      const response = await post_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.message,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        // history.push('../users/customer-list');
      } else
        notification.error({
          message: 'Server Error',
        });
    }
    Createskill(payload);
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
          <div key="1" className="page-header-actions" style={{ marginTop: '16px', justifyContent: 'space-between' }}>
            <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Skills</h1>
            <div className="importNewBTN">
              {/* <Button onClick={() => history.push(`../users/add-user`)} size="small" key="4" type="dark">
              Import Users
            </Button> */}
              <Button
                onClick={() => setShowAddNewUser(true)}
                size="small"
                key="4"
                type="success"
                className="btn-animation"
              >
                <FeatherIcon icon="plus" size={14} />
                New Skill
              </Button>
            </div>
          </div>
        </div>

        {/* <div
          data-aos="fade-up"
          data-aos-offset="10"
          data-aos-delay="50"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="center"
        > */}
        {/* /*********************************************************************Filter Section Starts*********** */}
        <Form id="MapSectionForm">
          {/* {ShowNameFilter == true ? FilteredArraynew.category_name : ''} */}
          <div
            id="category_filter"
            className={`${UserFilterClass != false ? 'CategoryFilter_displaynone' : 'CategoryFilter_displayblock'}`}
          >
            {FilteredArraynew.skill_name}
          </div>
          <div
            id="category_filter"
            className={`${RoleFilterClass != false ? 'CategoryFilter_displaynone' : 'CategoryFilter_displayblock'}`}
          >
            {FilteredArraynew.section_name}
          </div>
          <div
            id="active_filter"
            className={`${ActiveFilterClass != false ? 'ActiveFilter_displaynone' : 'ActiveFilter_displayblock'}`}
          >
            {FilteredArraynew.active}
          </div>
          {/* {ShowActive == true ? FilteredArraynew.active : ''} */}
        </Form>
        {/* /************************************************************************Filter Section Ends*********** */}

        <DataTableExtensions {...tableData}>
          <DataTable
            className="tableHeading"
            columns={columns}
            data={data}
            defaultSortField="id"
            defaultSortAsc={false}
            pagination
            highlightOnHover
          />
        </DataTableExtensions>
        {/* </div> */}
      </Main>
      {/* {ShowUserGroup != false ? (
        <div className="Main-headerDiv">
          <div className="inner-headerDiv">
            <div className="headerDiv">
              <p>Add user to group</p>
              <div className="crossIcon">
                <a onClick={() => setShowUserGroup(false)}>X</a>
              </div>
            </div>
            <div className="joinedP">
              <p>Joined Groups:</p>
            </div>
            <div className="userGroupselect">
              <label>Users Groups</label>
              <div className="userGroupselect-inner">
                <Select>
                  <Option defaultValue="Select User Groups">Select User Groups</Option>
                  <Option value={1}>One</Option>
                  <Option value={2}>Two</Option>
                  <Option value={3}>Three</Option>
                </Select>
              </div>
            </div>
            <div className="Addgroupbtn">
              <button>Add</button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )} */}
      {ShowAddNewUser != false ? (
        <div className="AddnewUser contactCard customCard">
          <Form
            name="sDash_validation-form"
            className="AddForm contactForm"
            form={form}
            layout="vertical"
            onFinish={addNewSkill}
          >
            <div className="headerDiv">
              <p>New Skill</p>
              <div className="crossIcon">
                <a onClick={() => setShowAddNewUser(false)}>X</a>
              </div>
            </div>
            <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
              <Col md={24} xs={24}>
                <Form.Item
                  name="skill_name"
                  label="Skill Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Skill Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Skill Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="section_id"
                  label="Section"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Section !',
                    },
                  ]}
                >
                  <Select
                    style={{ width: '100%' }}
                    classNamePrefix="select"
                    isSearchable={true}
                    arrayDataSection={arrayDataSection}
                    //onSelect={GetPosition}
                  >
                    {arrayDataSection != null
                      ? arrayDataSection.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item className="txtareaSpace fullsizefield" name="description" label="Short Description">
                  <TextArea rows={3} showCount maxLength={100} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30} className="mainRow">
              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="active"
                    initialValue=""
                    label="Active"
                    rules={[
                      {
                        required: false,
                        message: 'Please Enter Status !',
                      },
                      {
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please Enter Correct Email',
                      },
                    ]}
                  >
                    <p name="">Active (Shown Everywhere). In-active (Hidden Everywhere).</p>
                  </Form.Item>
                </Col>
                <div className="switchToggle">
                  <Switch onChange={() => setASwitch(!ASwitch)} />
                </div>
              </div>
            </Row>
            <Row gutter={30} className="Addgroupbtn">
              <Col md={24} xs={24}>
                <Form.Item>
                  <Button htmlType="submit" className="btn-animation">
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
      {ShowEditskill != false ? (
        <div className="AddnewUser contactCard customCard">
          <Form
            name="sDash_validation-form"
            className="AddForm contactForm"
            form={Editform}
            layout="vertical"
            onFinish={editSkill}
          >
            <div className="headerDiv">
              <p>Edit Skill</p>
              <div className="crossIcon">
                <a onClick={() => setShowEditskill(false)}>X</a>
              </div>
            </div>
            <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
              <Col md={24} xs={24}>
                <Form.Item
                  name="skill_name"
                  label="Skill Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Skill Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Skill Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="section_id"
                  label="Section"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Section !',
                    },
                  ]}
                >
                  <Select
                    style={{ width: '100%' }}
                    classNamePrefix="select"
                    isSearchable={true}
                    arrayDataSection={arrayDataSection}
                    //onSelect={GetPosition}
                    onChange={selectedValue => {
                      setsettingData({ ...settingData, section_id: selectedValue });
                    }}
                  >
                    {arrayDataSection != null
                      ? arrayDataSection.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item className="txtareaSpace fullsizefield" name="description" label="Short Description">
                  <TextArea rows={3} showCount maxLength={100} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30} className="mainRow">
              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="active"
                    initialValue=""
                    label="Active"
                    rules={[
                      {
                        required: false,
                        message: 'Please Enter Status !',
                      },
                      {
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please Enter Correct Email',
                      },
                    ]}
                  >
                    <p name="">Active (Shown Everywhere). In-active (Hidden Everywhere).</p>
                  </Form.Item>
                </Col>
                <div className="switchToggle">
                  <Switch checked={editASwitch} onChange={() => seteditASwitch(!editASwitch)} />
                </div>
              </div>
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
  );
};

export default UsersList;
