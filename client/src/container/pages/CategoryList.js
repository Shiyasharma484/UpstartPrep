import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Row, Input, Switch, Checkbox } from 'antd';
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
  const [OriginData, setOriginData] = useState([]);
  const [UniQueData, setUniQueData] = useState([]);
  const history = useHistory();
  const [form] = Form.useForm();
  const [Editform] = Form.useForm();
  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);

  const [ShowUserGroup, setShowUserGroup] = useState(false);
  const [ShowAddNewUser, setShowAddNewUser] = useState(false);
  const [ShoweditSection, setShoweditSection] = useState(false);
  const [ASwitch, setASwitch] = useState(false);
  const [editASwitch, seteditASwitch] = useState(false);
  const [DescriptionValue, setDescriptionValue] = useState();
  const [EditDescriptionValue, setEditDescriptionValue] = useState();
  const [formData, setformData] = useState();
  const [ReRender, setReRender] = useState(0);
  /*Filter Section================================================= Starts */
  const [FilteredArraynew, setFilteredArraynew] = useState({ category_name: [], active: [] });
  const [dataForFilter, setDataForFilter] = useState([]);
  const [ShowNameFilter, setShowNameFilter] = useState(false);
  const [ShowStatusFilter, setShowStatusFilter] = useState(false);
  const [CategoryFilterClass, setCategoryFilterClass] = useState(true);
  const [ActiveFilterClass, setActiveFilterClass] = useState(true);
  const [FirstFilterActive, setFirstFilterActive] = useState(false);
  const [FilterCategoryName, setFilterCategoryName] = useState({
    category_name: false,
    active: false,
  });
  const [ShowActive, setShowActive] = useState(false);
  const [CheckedDataArray, setCheckedDataArray] = useState({
    category_name: '',
    active: '',
  });
  const [Render, setRender] = useState(0);
  /*Filter Section================================================= Ends */

  useEffect(() => {
    async function GetAllUsers() {
      const url = api_url.get_category;
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
  }, [ReRender]);

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
    var FilterColumns = ['category_name', 'active'];
    var i = 0;
    var count = 0;
    var uniqueData = [];
    FilterColumns?.forEach(name => {
      uniqueData = [...new Map(data.map(item => [item[name], item])).values()];

      const index = uniqueData.findIndex(item => item[name].toLowerCase() === search.toLowerCase());
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
                    setShowNameFilter(false);
                    setShowActive(false);
                    setActiveFilterClass(true);
                    setCategoryFilterClass(true);
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

  /*HANDLING DELETE A USER===================START */
  const handleDelete = id => {
    var deletedrowid = id;
    var column = 'id';
    async function deleteData(id) {
      const url = api_url.delete_category_id + deletedrowid;
      const response = await delete_api_request(url, headers);
      if (response.status == 201) {
        notification.success({
          message: 'Category Deleted Successfully',
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
  const HandleAction = (e, id) => {
    if (e == 1) {
      GetUserCategoryDataByID(id);
      setShoweditSection(true);
    } else if (e == 2) {
      console.log('Delete');
      window.confirm('Are you sure you wish to delete this item?') ? handleDelete(id) : '';
    }
  };
  const CopyToClipboard = e => {
    const id = 'cat_' + encrypttheid(e);
    navigator.clipboard.writeText(id);
    notification.success({
      message: `Copied Successfully ${id}`,
    });
  };
  async function GetUserCategoryDataByID(id) {
    const url = api_url.get_category_id + id;
    const response = await get_api_request(url, headers);
    if (response.status == 200) {
      const usersdata = response?.data?.responsedata?.[0];

      // setData(usersdata);
      if (usersdata?.active == 1) {
        seteditASwitch(true);
      } else if (usersdata?.active == 0) {
        seteditASwitch(false);
      }

      Editform.setFieldsValue({
        category_name: usersdata?.category_name,
        description: usersdata?.description,
        //group_name: usersdata?.group_name,
        short_description: usersdata?.short_description,
      });
      setformData(usersdata);
    } else {
      console.log('error');
    }
  }

  /*HANDLING DELETE A USER========================================END */

  const columns = [
    {
      name: 'CODE',
      selector: row => (
        <>
          <p onClick={() => CopyToClipboard(row.id)}>
            <i class="fa fa-files-o" aria-hidden="true"></i> {'cat_' + encrypttheid(row.id)}
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
              setCategoryFilterClass(!CategoryFilterClass);
              //ShowNameFilterIcon();
              // setShowNameFilter(true);
            }}
          ></i>
        </>
      ),
      selector: row => row.category_name,
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
          <Select
            className="Quizz_actions"
            defaultValue="Actions"
            onSelect={e => HandleAction(e, row.id)}
            // onClick={e => {
            //   HandleAction(e.target.value);
            // }}
          >
            <Option value={1}>Edit</Option>
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
    var editactiveswicth;
    if (editASwitch == true) {
      editactiveswicth = 1;
    } else {
      editactiveswicth = 0;
    }
    Payload['category_name'] = Fieldsvalue.category_name;
    Payload['description'] = EditDescriptionValue;
    Payload['active'] = editactiveswicth;
    Payload['short_description'] = Fieldsvalue.short_description;
    console.log(Payload);
    async function editSection(data) {
      const url = api_url.update_category_id + formData.id;
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
    editSection(Payload);
  };

  const addNewsection = fieldsvalue => {
    var payload = {};
    var activeswicth;
    if (ASwitch == true) {
      activeswicth = 1;
    } else {
      activeswicth = 0;
    }
    payload['category_name'] = fieldsvalue.category_name;
    payload['description'] = DescriptionValue;
    payload['active'] = activeswicth;
    payload['short_description'] = fieldsvalue.short_description;

    console.log(payload);
    async function CreateSection(data) {
      const url = api_url.create_category;
      const response = await post_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data.message,
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
            <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Categories</h1>
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
                New Category
              </Button>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-offset="10"
          data-aos-delay="50"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="center"
        >
          {/* /*********************************************************************Filter Section Starts*********** */}
          <Form id="MapSectionForm">
            {/* {ShowNameFilter == true ? FilteredArraynew.category_name : ''} */}
            <div
              id="category_filter"
              className={`${
                CategoryFilterClass != false ? 'CategoryFilter_displaynone' : 'CategoryFilter_displayblock'
              }`}
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
        </div>
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
            onFinish={addNewsection}
          >
            <div className="headerDiv">
              <p>New Category</p>
              <div className="crossIcon">
                <a onClick={() => setShowAddNewUser(false)}>X</a>
              </div>
            </div>
            <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
              <Col md={24} xs={24}>
                <Form.Item
                  name="category_name"
                  label="Category Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Status !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Category Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  className="txtareaSpace fullsizefield"
                  name="short_description"
                  label="Short Description (Max. 160 Characters)"
                >
                  <TextArea rows={3} showCount maxLength={100} />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item className="txtareaSpace fullsizefield" name="description" label="Description">
                  <Editor
                    onChange={e => setDescriptionValue(e.html)}
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
              <p>Edit Category</p>
              <div className="crossIcon">
                <a onClick={() => CloseEditSection()}>X</a>
              </div>
            </div>
            <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
              <Col md={24} xs={24}>
                <Form.Item
                  name="category_name"
                  label="Category Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Status !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Category Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  className="txtareaSpace fullsizefield"
                  name="short_description"
                  label="Short Description (Max. 160 Characters)"
                >
                  <TextArea rows={3} showCount maxLength={100} />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item className="txtareaSpace fullsizefield" name="description" label="Description">
                  <Editor
                    onChange={e => setEditDescriptionValue(e.html)}
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
                    value={Editform?.description}
                  />
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
