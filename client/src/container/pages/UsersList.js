import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Row, Input, Switch } from 'antd';
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
const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
/*Filter Section =========Start*/
var OriginalData = [];

/*Filter Section =========Ends*/
var ModuleName = 'DASHBOARD';
const UsersList = () => {
  const [data, setData] = useState([]);
  const [formData, setformData] = useState();

  const history = useHistory();
  const [form] = Form.useForm();
  const [Userform] = Form.useForm();
  const [Editform] = Form.useForm();
  const [arrayDataUsergroup, setarrayDataUsergroup] = useState(null);
  const [arrayDataUserrole, setarrayDataUserrole] = useState(null);
  const [ShowInstructorsection, setShowInstructorsection] = useState(0);
  const [ShowInstructorSection, setShowInstructorSection] = useState(false);
  const [ShowUserGroup, setShowUserGroup] = useState(false);
  const [ShowAddNewUser, setShowAddNewUser] = useState(false);
  const [ShowEditUser, setShowEditUser] = useState(false);

  const [ASwitch, setASwitch] = useState(false);
  const [EditASwitch, setEditASwitch] = useState(false);
  const [ActiveSwitch, setActiveSwitch] = useState(false);
  const [EditActiveSwitch, setEditActiveSwitch] = useState(false);
  const [RoleId, setRoleId] = useState();
  const [render, setrender] = useState(0);
  const [UserRole, setUserRole] = useState([]);
  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);
  var role_Id = userDetail?.sessdata?.user[0]?.user_role_id;
  /*Filter Section================================================= Starts */
  const [FilteredArraynew, setFilteredArraynew] = useState({
    user_name: [],
    role_name: [],
    email: [],
    phone: [],
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
    user_name: false,
    role_name: false,
    email: false,
    phone: false,
    active: false,
  });
  const [ShowActive, setShowActive] = useState(false);
  const [CheckedDataArray, setCheckedDataArray] = useState({
    user_name: '',
    role_name: '',
    email: '',
    phone: '',
    active: '',
  });
  const [Render, setRender] = useState(0);
  /*Filter Section================================================= Ends */
  //setRoleId(role_Id)
  useEffect(() => {
    async function GetAllUsers() {
      const url = api_url.get_all_users;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const usersdata = response?.data?.responsedata?.users;
        /*FILTER SECTION ============STARTS*/
        OriginalData = usersdata;
        GetFilterData(usersdata);
        setData(usersdata);
        dataForFilter.push(usersdata);
        /*FILTER SECTION ==========Ends*/
        setData(usersdata);
      } else {
        notification.error({ message: response?.data?.message });
      }
    }
    GetAllUsers();
    async function getUserGroups() {
      const url = api_url.get_group;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const categorydata = response.data.responsedata;
        console.log(categorydata);
        const dataArray = categorydata.map(item => {
          return { id: item.id, name: item.group_name };
        });
        setarrayDataUsergroup(dataArray);
      } else {
        notification.error({ message: response?.data?.message });
      }
    }
    getUserGroups();

    async function getRoleName() {
      const payload = { request: 'edit' };
      const url = api_url.admin_user_role;
      const response = await post_api_request(url, payload, headers);
      if (response.status === 200) {
        const rolesdata = response.data.responsedata.roles;
        const dataArray = rolesdata.map(item => {
          if (item?.title == 'instructor') {
            GetAllInstructor(item?.id);
          }
          return { id: item.id, name: item.title };
        });
        setarrayDataUserrole(dataArray);
      }
    }
    getRoleName();

    async function GetAllInstructor(id) {
      const url = api_url.get_user_by_role + id;
      //const url = api_url.get_allInstructor;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const roleusersdata = response?.data?.responsedata;
        const dataArray = roleusersdata.map(item => {
          return { id: item.id, name: item.first_Name };
        });
        setUserRole(dataArray);
      } else {
        console.log('error');
      }
    }

    setrender(0);
  }, [render]);

  /*=========================================ENDS */
  /*HANDLING DELETE A USER===================START */
  const GetInstructor = e => {
    console.log(e);
    // setShowInstructorsection(true);
  };
  const handleDelete = id => {
    var deletedrowid = id;
    var column = 'id';
    async function deleteData(id) {
      const url = api_url.delete_user_id + deletedrowid;
      const response = await delete_api_request(url, headers);
      if (response.status == 201) {
        notification.success({
          message: 'User Deleted Successfully',
        });
        const afterdeletedata = data.filter(item => {
          if (column !== '') {
            return item[column] !== deletedrowid;
          }
          return item;
        });
        setData(afterdeletedata);
        setDataForFilter(afterdeletedata);
      } else {
        notification.error({ message: response?.data?.message });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      }
    }
    deleteData(id);
  };
  const HandleAction = (e, id) => {
    console.log(id);
    if (e == 1) {
      setShowUserGroup(true);
    } else if (e == 2) {
      GetUserDataByID(id);
      setShowEditUser(true);
    } else if (e == 3) {
      handleDelete(id);
    }
  };

  async function GetUserDataByID(id) {
    const url = '/user/' + id;
    const response = await get_api_request(url, headers);
    if (response.status == 200) {
      console.log(response);
      const userdata = response?.data?.responsedata?.users?.[0];
      console.log(userdata);

      // setData(usersdata);
      if (userdata?.active == 1) {
        setEditActiveSwitch(true);
      } else if (userdata?.active == 0) {
        setEditActiveSwitch(false);
      }

      if (userdata?.email_verify == 1) {
        setEditASwitch(true);
      } else if (userdata?.email_verify == 0) {
        setEditASwitch(false);
      }
      var groupID = [];
      if (userdata?.group_id) {
        var splited_data = userdata.group_id.split(',');
        splited_data?.map(item => {
          console.log(item);
          groupID.push(Number(item));
        });
      }
      var instructorID = [];
      if (userdata?.instructor) {
        var splited_Data = userdata.instructor.split(',');
        splited_Data?.map(item => {
          instructorID.push(Number(item));
        });
      }
      setShowInstructorsection(userdata?.role);
      console.log(groupID);
      Editform.setFieldsValue({
        email: userdata?.email,
        first_Name: userdata?.first_Name,
        last_Name: userdata?.last_Name,
        phone: userdata?.phone,
        user_name: userdata?.user_name,
        role_id: userdata?.role,
        // user_groups: userdata?.group_name.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g),
        user_groups: groupID,
        instructor: instructorID,
      });
      setformData(userdata);
    } else {
      console.log('error');
    }
  }

  /*HANDLING DELETE A USER========================================END */
  const columns = [
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
      selector: row => row.user_name,
      //sortable: true,
    },
    {
      name: (
        <>
          Role{' '}
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
      selector: row => row.role_name,
      //sortable: true,
    },
    {
      name: (
        <>
          Email{' '}
          <i
            class="fa fa-filter"
            aria-hidden="true"
            onClick={() => {
              setEmailFilterClass(!EmailFilterClass);
              //ShowNameFilterIcon();
              // setShowNameFilter(true);
            }}
          ></i>
        </>
      ),
      selector: row => row.email,
      //sortable: true,
    },
    // {
    //   name: (
    //     <>
    //       Phone Number{' '}
    //       <i
    //         class="fa fa-filter"
    //         aria-hidden="true"
    //         onClick={() => {
    //           setPhoneFilterClass(!PhoneFilterClass);
    //           //ShowNameFilterIcon();
    //           // setShowNameFilter(true);
    //         }}
    //       ></i>
    //     </>
    //   ),
    //   selector: row => row.phone,
    //   //sortable: true,
    // },
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
      //sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className="datatable-actions">
          <Select className="Quizz_actions" defaultValue="Actions" onSelect={e => HandleAction(e, row.id)}>
            <Option value={1}>Add To Group</Option>
            <Option value={2}>Edit</Option>
            <Option value={3}>Delete</Option>
          </Select>
        </div>
      ),
    },
  ];

  const tableData = {
    columns,
    data,
  };

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
    var FilterColumns = ['user_name', 'role_name', 'email', 'phone', 'active'];
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

  const addNewUser = fieldsvalue => {
    var payload = {};
    var emailactive;
    var activeswicth;
    if (ASwitch == true) {
      emailactive = 1;
    } else {
      emailactive = 0;
    }

    if (ActiveSwitch == true) {
      activeswicth = 1;
    } else {
      activeswicth = 0;
    }
    payload['first_Name'] = fieldsvalue.first_Name;
    payload['last_Name'] = fieldsvalue.last_Name;
    payload['role'] = fieldsvalue.role_id;
    payload['phone'] = fieldsvalue.phone;
    payload['email'] = fieldsvalue.email;
    payload['email_verify'] = emailactive;
    payload['password'] = fieldsvalue.password;
    payload['instructor'] = fieldsvalue.instructor ? fieldsvalue.instructor.toString() : '';
    payload['group_id'] = fieldsvalue.user_groups?.toString();
    payload['active'] = activeswicth;
    console.log(payload);
    async function CreateUser(data) {
      const url = api_url.create_user;
      const response = await post_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.responsedata,
        });
        function Resetform() {
          document.getElementById('user_form')?.reset();
        }
        Resetform();
        setrender(render + 1);

        setTimeout(() => {
          notification.destroy();
        }, 2000);
        setShowAddNewUser(false);
      } else
        notification.error({
          message: response?.data?.responsedata,
        });
    }
    CreateUser(payload);
  };

  const addNewGroup = fieldsvalue => {
    var payload = {};
    payload['group_name'] = fieldsvalue.group_name;

    console.log(payload);
    async function AddGroupUser(data) {
      const url = api_url.create_group;
      const response = await post_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.responsedata,
        });
        setShowUserGroup(false);
        setrender(render + 1);
        setASwitch(false);
        setActiveSwitch(false);
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      } else
        notification.error({
          message: response?.data?.responsedata,
        });
    }
    AddGroupUser(payload);
  };
  const EditUser = Fieldsvalue => {
    var Payload = {};

    var editemailactive;
    var editactiveswicth;

    if (EditASwitch == true) {
      editemailactive = 1;
    } else {
      editemailactive = 0;
    }

    if (EditActiveSwitch == true) {
      editactiveswicth = 1;
    } else {
      editactiveswicth = 0;
    }
    Payload['first_Name'] = Fieldsvalue.first_Name;
    Payload['last_Name'] = Fieldsvalue.last_Name;
    Payload['role'] = Fieldsvalue.role_id;
    Payload['phone'] = Fieldsvalue.phone;
    Payload['instructor'] = Fieldsvalue.instructor?.toString();
    Payload['email'] = Fieldsvalue.email;
    Payload['email_verify'] = editemailactive;
    //Payload['password'] = Fieldsvalue.password;
    //Payload['user_name'] = Fieldsvalue.user_name;
    Payload['group_id'] = Fieldsvalue.user_groups?.toString();
    Payload['active'] = editactiveswicth;
    console.log(Payload);
    async function editUser() {
      const userId = encrypttheid(formData?.id);
      const url = api_url.update_user_id + userId;
      const response = await put_api_request(url, Payload, headers);
      console.log(response);
      if (response.status == 200) {
        console.log(response);
        notification.success({
          message: response?.data?.message,
        });
        setShowEditUser(false);
        setrender(render + 1);
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      } else
        notification.error({
          message: response?.data?.message,
        });
    }
    editUser(Payload);
  };
  return (
    <>
      <Main>
        <div key="1" className="page-header-actions" style={{ marginTop: '16px', justifyContent: 'space-between' }}>
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
            <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Users</h1>
          </div>
          <div className="importNewBTN">
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
              <Button
                onClick={() => history.push(`../configuration/import-users`)}
                size="small"
                key="4"
                type="dark"
                className="btn-animation"
              >
                Import Users
              </Button>
              <Button
                onClick={() => setShowAddNewUser(true)}
                size="small"
                key="4"
                type="success"
                className="btn-animation"
              >
                <FeatherIcon icon="plus" size={14} />
                New Users
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
            {FilteredArraynew.user_name}
          </div>
          <div
            id="category_filter"
            className={`${RoleFilterClass != false ? 'CategoryFilter_displaynone' : 'CategoryFilter_displayblock'}`}
          >
            {FilteredArraynew.role_name}
          </div>
          <div
            id="category_filter"
            className={`${EmailFilterClass != false ? 'CategoryFilter_displaynone' : 'CategoryFilter_displayblock'}`}
          >
            {FilteredArraynew.email}
          </div>
          <div
            id="category_filter"
            className={`${PhoneFilterClass != false ? 'CategoryFilter_displaynone' : 'CategoryFilter_displayblock'}`}
          >
            {FilteredArraynew.phone}
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
      {ShowUserGroup != false ? (
        <Form
          name="sDash_validation-form"
          className="AddForm contactForm"
          form={Userform}
          layout="vertical"
          onFinish={addNewGroup}
        >
          <div className="Main-headerDiv">
            <div className="inner-headerDiv">
              <div className="headerDiv">
                <p>Add user to group</p>
                <div className="crossIcon">
                  <a
                    onClick={() => {
                      setShowUserGroup(false);
                      form.resetFields();
                    }}
                  >
                    X
                  </a>
                </div>
              </div>
              <div className="joinedP">
                <p>Joined Groups:</p>
              </div>
              <div className="userGroupselect">
                <div className="userGroupselect-inner">
                  <Form.Item name="group_name" label="Users Groups">
                    <Select
                      style={{ width: '100%' }}
                      classNamePrefix="select"
                      isSearchable={true}
                      arrayDataUsergroup={arrayDataUsergroup}
                      //onSelect={GetPosition}
                    >
                      {arrayDataUsergroup != null
                        ? arrayDataUsergroup.map((item, index) => <Option value={item.name}>{item.name} </Option>)
                        : ''}
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="Addgroupbtn">
                <button>Add</button>
              </div>
            </div>
          </div>
        </Form>
      ) : (
        ''
      )}
      {ShowAddNewUser != false ? (
        <div className="AddnewUser contactCard customCard">
          <Form
            id="user_form"
            name="sDash_validation-form"
            className="AddForm contactForm"
            form={form}
            layout="vertical"
            onFinish={addNewUser}
          >
            <div className="headerDiv">
              <p>New User</p>
              <div className="crossIcon">
                <a
                  onClick={() => {
                    setShowAddNewUser(false);
                    form.resetFields();
                  }}
                >
                  X
                </a>
              </div>
            </div>
            <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
              <Col md={24} xs={24}>
                <Form.Item
                  name="first_Name"
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter First Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="last_Name"
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Last Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Last Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Phone !',
                    },
                    {
                      min: 9,
                      message: 'Min 9 digits allowed!',
                    },
                    {
                      max: 10,
                      message: 'max 10 digits allowed!',
                    },
                  ]}
                >
                  <Input name="" type="number" placeholder="Phone" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="email"
                  initialValue=""
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Email !',
                    },
                    {
                      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Please Enter Correct Email',
                    },
                  ]}
                >
                  <Input placeholder="Email" name="" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30} className="mainRow">
              <Col md={24} xs={24}>
                <Form.Item
                  name="user_name"
                  label="User Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter User Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="User Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item name="role_id" label="User Role">
                  <Select
                    style={{ width: '100%' }}
                    classNamePrefix="select"
                    isSearchable={true}
                    arrayDataUserrole={arrayDataUserrole}
                    onSelect={e => {
                      GetInstructor(e);
                      setShowInstructorSection(e);
                    }}
                  >
                    {arrayDataUserrole != null
                      ? arrayDataUserrole.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                      : ''}
                  </Select>
                </Form.Item>
              </Col>

              {ShowInstructorSection == '54' ? (
                <Col md={24} xs={24}>
                  <Form.Item name="instructor" label="Instructor">
                    <Select
                      style={{ width: '100%' }}
                      classNamePrefix="select"
                      isSearchable={true}
                      mode="multiple"
                      UserRole={UserRole}
                      //onSelect={GetInstructor}
                    >
                      {UserRole != null
                        ? UserRole.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                        : ''}
                    </Select>
                  </Form.Item>
                </Col>
              ) : (
                ''
              )}
              <Col md={24} xs={24}>
                <Form.Item
                  name="user_groups"
                  label="User Groups"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter User_Groups !',
                    },
                  ]}
                >
                  <Select
                    style={{ width: '100%' }}
                    classNamePrefix="select"
                    mode="multiple"
                    arrayDataUsergroup={arrayDataUsergroup}
                    //onSelect={GetPosition}
                  >
                    {arrayDataUsergroup != null
                      ? arrayDataUsergroup.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30} className="mainRow">
              <Col md={24} xs={24}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Password !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Password" />
                </Form.Item>
              </Col>

              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="email_verfied"
                    initialValue=""
                    label="Email Verified - No"
                    rules={[
                      {
                        required: false,
                        message: 'Please Enter User_Groups !',
                      },
                    ]}
                  >
                    <p name="">Yes (Email is verified). No (Email not verified)</p>
                  </Form.Item>
                </Col>
                <div className="switchToggle">
                  <Switch onChange={() => setASwitch(!ASwitch)} />
                </div>
              </div>
              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="status"
                    initialValue=""
                    label="Status - Active"
                    rules={[
                      {
                        required: false,
                        message: 'Please Enter User_Groups !',
                      },
                    ]}
                  >
                    <p name="">Active (Allow Login). In-active (Disallow Login).</p>
                  </Form.Item>
                </Col>{' '}
                <div className="switchToggle">
                  <Switch onChange={() => setActiveSwitch(!ActiveSwitch)} />
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
      {ShowEditUser != false ? (
        <div className="AddnewUser contactCard customCard">
          <Form
            name="sDash_validation-form"
            className="AddForm contactForm"
            form={Editform}
            layout="vertical"
            onFinish={EditUser}
          >
            <div className="headerDiv">
              <p>Edit User</p>
              <div className="crossIcon">
                <a onClick={() => setShowEditUser(false)}>X</a>
              </div>
            </div>
            <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
              <Col md={24} xs={24}>
                <Form.Item
                  name="first_Name"
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter First Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="last_Name"
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Last Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Last Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Phone !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Phone" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="email"
                  initialValue=""
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Email !',
                    },
                    {
                      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Please Enter Correct Email',
                    },
                  ]}
                >
                  <Input placeholder="Email" name="" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30} className="mainRow">
              <Col md={24} xs={24}>
                <Form.Item
                  name="user_name"
                  label="User Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter User Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="User Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item name="role_id" label="User Role">
                  <Select
                    style={{ width: '100%' }}
                    classNamePrefix="select"
                    isSearchable={true}
                    arrayDataUserrole={arrayDataUserrole}
                    onSelect={e => {
                      GetInstructor(e);
                      setShowInstructorsection(e);
                    }}
                  >
                    {arrayDataUserrole != null
                      ? arrayDataUserrole.map((item, index) => (
                          <Option value={item.id}>{item.name.toUpperCase()} </Option>
                        ))
                      : ''}
                  </Select>
                </Form.Item>
              </Col>

              {ShowInstructorsection == '54' ? (
                <Col md={24} xs={24}>
                  <Form.Item name="instructor" label="Instructor">
                    <Select
                      style={{ width: '100%' }}
                      classNamePrefix="select"
                      isSearchable={true}
                      mode="multiple"
                      UserRole={UserRole}
                      //onSelect={GetInstructor}
                    >
                      {UserRole != null
                        ? UserRole.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                        : ''}
                      {/* <Option value={1}>Shweta</Option>
                      <Option value={2}>Gaurav</Option>
                      <Option value={3}>Akshay</Option>
                      <Option value={4}>Jagjeet</Option>
                      <Option value={4}>Neelam</Option>
                      <Option value={4}>Sanjay</Option> */}
                    </Select>
                  </Form.Item>
                </Col>
              ) : (
                ''
              )}
              <Col md={24} xs={24}>
                <Form.Item name="user_groups" initialValue="" label="User Groups">
                  <Select
                    style={{ width: '100%' }}
                    classNamePrefix="select"
                    isSearchable={true}
                    mode="multiple"
                    arrayDataUsergroup={arrayDataUsergroup}
                    //onSelect={GetPosition}
                  >
                    {arrayDataUsergroup != null
                      ? arrayDataUsergroup.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30} className="mainRow">
              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="email_verfied"
                    initialValue=""
                    label="Email Verified - No"
                    rules={[
                      {
                        required: false,
                        message: 'Please Enter User_Groups !',
                      },
                      {
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please Enter Correct Email',
                      },
                    ]}
                  >
                    <p name="">Yes (Email is verified). No (Email not verified)</p>
                  </Form.Item>
                </Col>
                <div className="switchToggle">
                  <Switch onChange={() => setEditASwitch(!EditASwitch)} checked={EditASwitch} />
                </div>
              </div>
              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="active"
                    initialValue=""
                    label="Status - Active"
                    rules={[
                      {
                        required: false,
                        message: 'Please Enter User_Groups !',
                      },
                    ]}
                  >
                    <p name="">Active (Allow Login). In-active (Disallow Login).</p>
                  </Form.Item>
                </Col>{' '}
                <div className="switchToggle">
                  <Switch onChange={() => setEditActiveSwitch(!EditActiveSwitch)} checked={EditActiveSwitch} />
                </div>
              </div>
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
  );
};

export default UsersList;
