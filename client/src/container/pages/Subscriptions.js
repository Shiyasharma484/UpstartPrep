import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Row, Input, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useHistory } from 'react-router-dom';
import { headers } from '../../helpers/variables';
import { Main } from '../styled';
import { Button } from '../../components/buttons/buttons';
import DataTable from 'react-data-table-component';
import { Editor, EditorTools } from '@progress/kendo-react-editor';
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
import { TextArea } from '@progress/kendo-react-inputs';
const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
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

  const [ShowUserGroup, setShowUserGroup] = useState(false);
  const [ShowAddNewUser, setShowAddNewUser] = useState(false);
  const [showStatus, setshowStatus] = useState(false);
  const [showEditButton, setshowEditButton] = useState(true);
  const [showCloseButton, setshowCloseButton] = useState(false);
  const [ShoweditSection, setShoweditSection] = useState(false);
  const [SubscriptionData, setSubscriptionData] = useState([]);
  const [ReRender, setReRender] = useState(0);
  const [formData, setformData] = useState();
  const [arrayDataUser, setarrayDataUser] = useState(null);
  const [arrayDataPlan, setarrayDataPlan] = useState(null);
  const [Statusarraydata, setStatusarraydata] = useState(null);

  /*Filter Section================================================= Starts */
  const [FilteredArraynew, setFilteredArraynew] = useState({
    category_name: [],
    active: [],
    plan_name: [],
    username: [],
    starts_at: [],
    end_date: [],
    role: [],
  });
  const [dataForFilter, setDataForFilter] = useState([]);
  const [ShowNameFilter, setShowNameFilter] = useState(false);
  const [PLANFilterClass, setPLANFilterClass] = useState(true);
  const [CategoryFilterClass, setCategoryFilterClass] = useState(true);
  const [ActiveFilterClass, setActiveFilterClass] = useState(true);
  const [UserFilterClass, setUserFilterClass] = useState(true);
  const [StartFilterClass, setStartFilterClass] = useState(true);
  const [FilterClass, setFilterClass] = useState(true);
  const [FirstFilterActive, setFirstFilterActive] = useState(false);
  const [FilterCategoryName, setFilterCategoryName] = useState({
    category_name: false,
    active: false,
    username: false,
    plan_name: false,
    starts_at: false,
    end_date: false,
    role: false,
  });
  const [ShowActive, setShowActive] = useState(false);
  const [CheckedDataArray, setCheckedDataArray] = useState({
    category_name: '',
    active: '',
    username: '',
    plan_name: '',
    starts_at: '',
    end_date: '',
    role: '',
  });
  const [Render, setRender] = useState(0);
  /*Filter Section================================================= Ends */
  useEffect(() => {
    async function GetAllSubscription() {
      const url = api_url.get_subscription;
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
    GetAllSubscription();

    async function GetAllUsers() {
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
    GetAllUsers();
    async function GetAllPlans() {
      const url = api_url.get_plans;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const palndata = response?.data?.responsedata;
        const dataArray = palndata.map(item => {
          return { id: item.id, name: item.plan_name };
        });
        setarrayDataPlan(dataArray);
      } else {
        console.log('error');
      }
    }
    GetAllPlans();

    async function Getallmodules(data) {
      const url = api_url.getall_modules;
      const response = await get_api_request(url, data, headers);
      if (response.status == 200) {
        const Moduledata = response?.data?.responsedata?.modules;
        const getmodules = Moduledata.map(items => {
          if (items.name == 'STATUS') {
            const parentdata = items?.parent_id;
            async function getentitybyparentid() {
              const url = '/entity/parent/' + parentdata;
              const response = await get_api_request(url, data, headers);
              const questiontypedata = response?.data?.responsedata;
              //setData(questiontypedata);
              const DataArray = questiontypedata.map(item => {
                return { id: item.id, name: item.name };
              });
              setStatusarraydata(DataArray);
            }
            getentitybyparentid();
          }
        });
      } else {
        console.log('error');
      }
    }
    Getallmodules();
  }, [ReRender]);

  async function GetUserSubscriptionDataByID(id) {
    const url = api_url.get_subscription_plans_id + id;
    const response = await get_api_request(url, headers);
    if (response.status == 200) {
      const plansdata = response?.data?.responsedata;

      Editform.setFieldsValue({
        status: plansdata?.status,
      });
      setformData(plansdata?.[0]);
      console.log(plansdata);
      setSubscriptionData(plansdata);
    } else {
      console.log('error');
    }
  }
  const handleedit = e => {
    console.log(e);
    setshowStatus(true);
    setshowEditButton(false);
    setshowCloseButton(true);
  };
  const handleClose = e => {
    console.log(e);
    setshowStatus(false);
    setshowEditButton(true);
    setshowCloseButton(false);
  };

  /*HANDLING DELETE A USER===================START */
  const handleDelete = id => {
    var deletedrowid = id;
    var column = 'id';
    async function deleteData(id) {
      const url = api_url.delete_subscription_id + deletedrowid;
      const response = await delete_api_request(url, headers);
      if (response.status == 201) {
        notification.success({
          message: 'Subscription Deleted Successfully',
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

  /*HANDLING DELETE A USER========================================END */
  const HandleAction = (e, id) => {
    if (e == 1) {
      setShoweditSection(true);
      GetUserSubscriptionDataByID(id);
    } else if (e == 2) {
      console.log('Delete');
      window.confirm('Are you sure you wish to delete this item?') ? handleDelete(id) : '';
    }
  };

  const CopyToClipboard = e => {
    const id = 'sub_' + encrypttheid(e);
    navigator.clipboard.writeText(id);
    notification.success({
      message: `Copied Successfully ${id}`,
    });
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
    var FilterColumns = ['category_name', 'active', 'plan_name', 'username', 'starts_at', 'end_date', 'role'];
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
                    setUserFilterClass(true);
                    setPLANFilterClass(true);
                    setStartFilterClass(true);
                    setActiveFilterClass(true);
                    setCategoryFilterClass(true);
                    setFilterClass(true);
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

  const columns = [
    {
      name: 'CODE',
      selector: row => (
        <>
          <p onClick={() => CopyToClipboard(row.id)}>
            <i class="fa fa-files-o" aria-hidden="true"></i> {'sub_' + encrypttheid(row.id)}
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
          PLAN
          <i
            class="fa fa-filter"
            aria-hidden="true"
            onClick={() => {
              setPLANFilterClass(!PLANFilterClass);
              //ShowNameFilterIcon();
              // setShowNameFilter(true);
            }}
          ></i>
        </>
      ),
      selector: row => row.plan_name,
      //sortable: true,
    },
    {
      name: (
        <>
          USER
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
      selector: row => row.username,
      //sortable: true,
    },
    {
      name: (
        <>
          STARTS{' '}
          <i
            class="fa fa-filter"
            aria-hidden="true"
            onClick={() => {
              setStartFilterClass(!StartFilterClass);
              //ShowNameFilterIcon();
              // setShowNameFilter(true);
            }}
          ></i>
        </>
      ),
      selector: row => row.starts_at,
      //sortable: true,
    },
    {
      name: 'ENDS',
      selector: row => row.end_date,
      //sortable: true,
    },
    {
      name: 'PAYMENT',
      selector: row => row.role,
      // sortable: true,
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
          <span className={`status ${row.status == 1 ? 'Success' : 'error'}`}>
            {row.status == 1 ? 'Active' : 'Inactive'}
          </span>
        </>
      ),
      //sortable: true,
    },

    {
      name: 'Actions',
      cell: row => (
        <div className="datatable-actions">
          <Select
            className="Quizz_actions"
            defaultValue="Actions"
            onSelect={e => HandleAction(e, row.id)}
            // onClick={e => {
            //   HandleAction(e.target.value);
            // }}
          >
            <Option value={1}>Details</Option>
            <Option
              value={2}
              // onClick={() => (window.confirm('Are you sure you wish to delete this item?') ? handleDelete(row.id) : '')}
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

  const Editsection = Fieldsvalue => {
    var Payload = {};
    Payload['plan_id'] = formData?.plan_id;
    Payload['user_id'] = formData?.user_id;
    Payload['status'] = Fieldsvalue.status;
    async function editSection() {
      const url = api_url.update_subscription_plans_id + formData?.id;
      const response = await put_api_request(url, Payload, headers);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.responsedata,
        });
        setTimeout(() => {}, 10000);
        window.location.reload();
      } else
        notification.error({
          message: 'Server Error',
        });
    }
    editSection(Payload);
  };

  const addNewsection = fieldsvalue => {
    var payload = {};
    payload['plan_id'] = fieldsvalue.plan_id;
    payload['user_id'] = fieldsvalue.user_id;
    payload['status'] = fieldsvalue.active;
    async function CreateSection(data) {
      const url = api_url.create_subscription;
      const response = await post_api_request(url, data, headers);
      if (response.status == 201) {
        notification.success({
          message: response?.data.message,
        });
        setTimeout(() => {
          window.location.reload();
        }, 10000);
        // history.push('../users/customer-list');
      } else
        notification.error({
          message: 'Server Error',
        });
    }
    CreateSection(payload);
  };
  const CloseEditSection = () => {
    console.log('555555555555');
    setShoweditSection(false);
    //setReRender(ReRender + 1);
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
            <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Subscriptions</h1>
          </div>
          <div className="importNewBTN">
            {/* <Button onClick={() => history.push(`../users/add-user`)} size="small" key="4" type="dark">
              Import Users
            </Button> */}
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
                onClick={() => setShowAddNewUser(true)}
                size="small"
                key="4"
                type="success"
                className="btn-animation"
              >
                <FeatherIcon icon="plus" size={14} />
                ADD Manual Subscription
              </Button>
            </div>
          </div>
        </div>
        {/* /*********************************************************************Filter Section Starts*********** */}
        <Form id="MapSectionForm">
          {/* {ShowNameFilter == true ? FilteredArraynew.category_name : ''} */}
          <div
            id="category_filter"
            className={`${PLANFilterClass != false ? 'CategoryFilter_displaynone' : 'CategoryFilter_displayblock'}`}
          >
            {FilteredArraynew.plan_name}
          </div>
          <div
            id="category_filter"
            className={`${UserFilterClass != false ? 'CategoryFilter_displaynone' : 'CategoryFilter_displayblock'}`}
          >
            {FilteredArraynew.username}
          </div>
          <div
            id="category_filter"
            className={`${FilterClass != false ? 'CategoryFilter_displaynone' : 'CategoryFilter_displayblock'}`}
          >
            {FilteredArraynew.starts_at}
          </div>
          <div
            id="category_filter"
            className={`${CategoryFilterClass != false ? 'CategoryFilter_displaynone' : 'CategoryFilter_displayblock'}`}
          >
            {FilteredArraynew.end_date}
          </div>
          <div
            id="category_filter"
            className={`${CategoryFilterClass != false ? 'CategoryFilter_displaynone' : 'CategoryFilter_displayblock'}`}
          >
            {FilteredArraynew.role}
          </div>
          <div
            id="category_filter"
            className={`${CategoryFilterClass != false ? 'CategoryFilter_displaynone' : 'CategoryFilter_displayblock'}`}
          >
            {FilteredArraynew.category_name}
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

      {ShowAddNewUser != false ? (
        <div className="AddnewUser contactCard customCard">
          <Form
            name="sDash_validation-form"
            className="AddForm contactForm"
            form={form}
            layout="vertical"
            onFinish={addNewsection}
          >
            <div className="headerDiv">
              <p>New Subscription</p>
              <div className="crossIcon">
                <a onClick={() => setShowAddNewUser(false)}>X</a>
              </div>
            </div>
            <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
              <Col md={24} xs={24}>
                <Form.Item
                  name="user_id"
                  label="User"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter User !',
                    },
                  ]}
                >
                  <Select
                    style={{ width: '100%' }}
                    classNamePrefix="select"
                    isSearchable={true}
                    arrayDataUser={arrayDataUser}
                    //onSelect={GetPosition}
                  >
                    {arrayDataUser != null
                      ? arrayDataUser.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item className="txtareaSpace fullsizefield" name="plan_id" label="Plan">
                  <Select
                    style={{ width: '100%' }}
                    classNamePrefix="select"
                    isSearchable={true}
                    arrayDataPlan={arrayDataPlan}
                    //onSelect={GetPosition}
                  >
                    {arrayDataPlan != null
                      ? arrayDataPlan.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item className="txtareaSpace fullsizefield" name="active" label="Status">
                  <Select
                    style={{ width: '100%' }}
                    classNamePrefix="select"
                    isSearchable={true}
                    Statusarraydata={Statusarraydata}
                    //onSelect={GetPosition}
                  >
                    {Statusarraydata != null
                      ? Statusarraydata.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
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
      {ShoweditSection != false ? (
        <div className="AddnewUser contactCard customCard">
          <Form
            name="sDash_validation-form"
            className="AddForm contactForm"
            form={Editform}
            layout="vertical"
            onFinish={Editsection}
          >
            <div className="headerDiv">
              <p>Subscription Details</p>
              <div className="crossIcon">
                <a onClick={() => CloseEditSection()}>X</a>
              </div>
            </div>
            {SubscriptionData?.map((item, index) => (
              <>
                <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
                  <Col md={10}>
                    <p>Subscription ID</p>
                  </Col>
                  <Col md={14}>
                    <p>
                      {}
                      {/* {item?.id} */}
                      {'sub_' + encrypttheid(item?.id)}
                    </p>
                  </Col>
                </Row>
                <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
                  <Col md={10}>
                    <p>Plan</p>
                  </Col>
                  <Col md={14}>
                    <p>{item?.plan_name}</p>
                  </Col>
                </Row>
                <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
                  <Col md={10}>
                    <p>Payment User</p>
                  </Col>
                  <Col md={14}>
                    <p>{item?.username}</p>
                  </Col>
                </Row>
                <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
                  <Col md={10}>
                    <p>Subscription Starts</p>
                  </Col>
                  <Col md={14}>
                    <p>{item?.starts_at}</p>
                  </Col>
                </Row>
                <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
                  <Col md={10}>
                    <p>Subscription Ends</p>
                  </Col>
                  <Col md={14}>
                    <p>{item?.username}</p>
                  </Col>
                </Row>
                <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
                  <Col md={10}>
                    <p>Status</p>
                  </Col>
                  <Col md={14} className="StatusEdit">
                    <p></p>

                    {showEditButton != false ? <span onClick={() => handleedit()}> Edit</span> : ''}
                    {showCloseButton != false ? <span onClick={() => handleClose()}> Close</span> : ''}
                  </Col>

                  {showStatus != false ? (
                    <Col md={24}>
                      <Form.Item className="txtareaSpace fullsizefield" name="status">
                        <Select
                          style={{ width: '100%' }}
                          classNamePrefix="select"
                          isSearchable={true}
                          Statusarraydata={Statusarraydata}
                          //onSelect={GetPosition}
                        >
                          {Statusarraydata != null
                            ? Statusarraydata.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                            : ''}
                        </Select>
                      </Form.Item>
                      <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                        <Button
                          htmlType="submit"
                          type="success"
                          size="default"
                          className="btn-animation"
                          //onClick={e => UpdateForm(e)}
                        >
                          Update
                        </Button>
                      </Col>
                    </Col>
                  ) : (
                    ''
                  )}
                </Row>

                <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
                  <Col md={10}>
                    <p>Payment Method</p>
                  </Col>
                  <Col md={14}>
                    <p>{item?.username}</p>
                  </Col>
                </Row>
              </>
            ))}
          </Form>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default UsersList;
