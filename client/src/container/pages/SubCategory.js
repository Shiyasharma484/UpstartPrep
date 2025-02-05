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
import { Editor, EditorTools } from '@progress/kendo-react-editor';
var ModuleName = 'DASHBOARD';
/*Filter Section =========Start*/
var OriginalData = [];

/*Filter Section =========Ends*/
const UsersList = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [form] = Form.useForm();
  const [Editform] = Form.useForm();
  const [MapSectionForm] = Form.useForm();
  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);

  const [ShowUserGroup, setShowUserGroup] = useState(false);
  const [ShowAddNewUser, setShowAddNewUser] = useState(false);
  const [ASwitch, setASwitch] = useState(false);
  const [editASwitch, seteditASwitch] = useState(false);
  const [arrayDatacategory, setarrayDatacategory] = useState(null);
  const [DescriptionValue, setDescriptionValue] = useState();
  const [EditDescriptionValue, setEditDescriptionValue] = useState();
  const [arrayDatatype, setarrayDatatype] = useState(null);
  const [formData, setformData] = useState();
  const [ShoweditSection, setShoweditSection] = useState(false);
  const [ShowMapSection, setShowMapSection] = useState(false);
  const [checked, setChecked] = useState([]);
  const [ReRender, setReRender] = useState(0);
  const [SectionData, setSectionData] = useState([]);
  const [SectionId, setSectionId] = useState([]);
  /*Filter Section================================================= Starts */
  const [FilteredArraynew, setFilteredArraynew] = useState({
    sub_category_name: [],
    category_name: [],
    active: [],
    sub_category_type: [],
  });
  const [dataForFilter, setDataForFilter] = useState([]);
  const [ShowNameFilter, setShowNameFilter] = useState(false);
  const [ShowStatusFilter, setShowStatusFilter] = useState(false);
  const [CategoryFilterClass, setCategoryFilterClass] = useState(true);
  const [SubCategoryFilterClass, setSubCategoryFilterClass] = useState(true);
  const [SubCategorytypeFilterClass, setSubCategorytypeFilterClass] = useState(true);
  const [ActiveFilterClass, setActiveFilterClass] = useState(true);
  const [UserFilterClass, setUserFilterClass] = useState(true);
  const [FilterClass, setFilterClass] = useState(true);
  const [FilterCategoryName, setFilterCategoryName] = useState({
    category_name: false,
    active: false,
    sub_category_name: false,
    sub_category_type: false,
  });
  const [ShowActive, setShowActive] = useState(false);
  const [CheckedDataArray, setCheckedDataArray] = useState({
    category_name: '',
    active: '',
    sub_category_name: '',
    sub_category_type: '',
  });
  const [Render, setRender] = useState(0);
  /*Filter Section================================================= Ends */
  const [settingData, setsettingData] = useState({
    category_id: '',
    section_id: '',
    type: '',
    sub_category_name: '',
    sub_category_type: '',
  });

  useEffect(() => {
    async function GetAllUsers() {
      const url = api_url.get_subcategory;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const usersdata = response?.data?.responsedata;
        /*FILTER SECTION ============STARTS*/
        OriginalData = usersdata;
        GetFilterData(usersdata);
        setData(usersdata);
        dataForFilter.push(usersdata);
        /*FILTER SECTION ==========Ends*/
        console.log(usersdata);
      } else {
        console.log('error');
      }
    }
    GetAllUsers();
    async function getCategory() {
      const url = api_url.get_category;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const categorydata = response.data.responsedata;
        const dataArray = categorydata.map(item => {
          return { id: item.id, name: item.category_name };
        });
        setarrayDatacategory(dataArray);
      } else {
        console.log('error');
      }
    }
    getCategory();

    async function getType() {
      const url = api_url.get_type;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const typedata = response.data.responsedata;
        const DataArray = typedata.map(item => {
          return { id: item.id, name: item.type_name };
        });
        //setarrayDatatype(DataArray);
      } else {
        console.log('error');
      }
    }
    getType();

    async function Getallmodules(data) {
      const url = api_url.getall_modules;
      const response = await get_api_request(url, data, headers);
      console.log(response);
      if (response.status == 200) {
        const Moduledata = response?.data?.responsedata?.modules;
        const getmodules = Moduledata.map(items => {
          console.log(items);
          if (items.name == 'SUB CATEGORIES') {
            const parentdata = items?.parent_id;
            console.log(parentdata);
            async function getentitybyparentid() {
              const url = '/entity/parent/' + parentdata;
              const response = await get_api_request(url, data, headers);
              const questiontypedata = response?.data?.responsedata;
              //setData(questiontypedata);
              const DataArray = questiontypedata.map(item => {
                return { id: item.id, name: item.name };
              });
              setarrayDatatype(DataArray);
            }
            getentitybyparentid();
          }
        });
      } else {
        console.log('error');
      }
    }
    Getallmodules();
    async function getAllSection() {
      const url = api_url.get_section;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const sectiondata = response.data.responsedata;
        setSectionData(sectiondata);
        // const DataArray = typedata.map(item => {
        //   return { id: item.id, name: item.type_name };
        // });
        // setarrayDatatype(DataArray);
      } else {
        console.log('error');
      }
    }
    getAllSection();
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
    var FilterPayload = submit_form('MapFilterForm');
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
    var FilterColumns = ['sub_category_name', 'category_name', 'active', 'sub_category_type'];
    var i = 0;
    var count = 0;
    var uniqueData = [];
    FilterColumns?.forEach(name => {
      uniqueData = [...new Map(data.map(item => [item[name], item])).values()];

      // const index = uniqueData.findIndex(item => item[name].toLowerCase() === search.toLowerCase());
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
                    setSubCategoryFilterClass(true);
                    setSubCategorytypeFilterClass(true);
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

  /*HANDLING DELETE A USER========================================END */
  const handleDelete = id => {
    var deletedrowid = id;
    var column = 'id';
    async function deleteData(id) {
      const url = api_url.delete_subcategory_id + deletedrowid;
      const response = await delete_api_request(url, headers);
      if (response.status == 201) {
        notification.success({
          message: 'Sub Category Deleted Successfully',
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
    const row_id = id;
    if (e == 1) {
      GetUserSubCategoryDataByID(row_id);
      setShoweditSection(true);
    } else if (e == 2) {
      window.confirm('Are you sure you wish to delete this item?') ? handleDelete(row_id) : '';
    } else if (e == 0) {
      // GetMapSection(row_id);
      GetUserSubCategoryDataByID(row_id, 'map');
      setShowMapSection(true);
    }
  };
  const CopyToClipboard = e => {
    const id = 'scat_' + encrypttheid(e);
    navigator.clipboard.writeText(id);
    notification.success({
      message: `Copied Successfully ${id}`,
    });
  };
  function reset_sections(itemData) {
    var items = document.getElementsByClassName('section_checkboxes');
    for (var i = 0; i < items.length; i++) {
      items[i].checked = false;
    }
    if (itemData != null) {
      setDataSArray(itemData);
      for (var j = 0; j < itemData.length; j++) {
        var input_checvk = 'check_' + itemData[j];
        document.getElementById(input_checvk).checked = true;
      }
    }
  }

  async function GetUserSubCategoryDataByID(id, map = null) {
    const url = api_url.get_subcategory_id + id;
    const response = await get_api_request(url, headers);
    if (response.status == 200) {
      console.log(response);
      const subcategoryData = response?.data?.responsedata?.[0];
      const sectionId = subcategoryData.section_id;
      setSectionId(sectionId);
      if (map != null) {
        if (subcategoryData.section_id != null) {
          var splitsection = subcategoryData.section_id.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
          reset_sections(splitsection);
        }
      }
      // setData(usersdata);
      if (subcategoryData?.active == 1) {
        seteditASwitch(true);
      } else if (subcategoryData?.active == 0) {
        seteditASwitch(false);
      }
      setsettingData({
        ...settingData,
        category_id: subcategoryData?.category_id,
        section_id: subcategoryData?.section_id,
        type: subcategoryData?.type,
      });

      Editform.setFieldsValue({
        //category_id: usersData?.category_name,
        description: subcategoryData?.description,
        sub_category_name: subcategoryData?.sub_category_name,
        short_description: subcategoryData?.short_description,
        type: subcategoryData?.sub_category_type,
        category_id: subcategoryData?.category_id,
      });
      setformData(subcategoryData);
    } else {
      console.log('error');
    }
  }

  const columns = [
    {
      name: 'CODE',
      selector: row => (
        <>
          <p onClick={() => CopyToClipboard(row.id)}>
            <i class="fa fa-files-o" aria-hidden="true"></i> {'scat_' + encrypttheid(row.id)}
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
              setSubCategoryFilterClass(!SubCategoryFilterClass);
              //ShowNameFilterIcon();
              // setShowNameFilter(true);
            }}
          ></i>
        </>
      ),
      selector: row => row.sub_category_name,
      //sortable: true,
    },
    {
      name: (
        <>
          Category Name{' '}
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
      // sortable: true,
    },
    {
      name: (
        <>
          Type{' '}
          <i
            class="fa fa-filter"
            aria-hidden="true"
            onClick={() => {
              setSubCategorytypeFilterClass(!SubCategorytypeFilterClass);
              //ShowNameFilterIcon();
              // setShowNameFilter(true);
            }}
          ></i>
        </>
      ),
      selector: row => row.sub_category_type,
      //  sortable: true,
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
      //sortable: true,
    },

    {
      name: 'Actions',
      cell: row => (
        <div className="datatable-actions">
          <Select className="Quizz_actions" defaultValue="Actions" onSelect={e => HandleAction(e, row.id)}>
            <Option value={0}>Map Section</Option>
            <Option value={1}>Edit</Option>
            <Option value={2}>Delete</Option>
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
    Payload['sub_category_name'] = Fieldsvalue.sub_category_name;
    Payload['category_id'] = settingData.category_id;
    Payload['short_description'] = Fieldsvalue.short_description;
    Payload['description'] = EditDescriptionValue;
    Payload['type'] = settingData.type;
    Payload['active'] = editactiveswicth;
    async function editSection(data) {
      console.log(formData);
      const url = api_url.update_subcategory_id + formData.id;
      const response = await put_api_request(url, data, headers);
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
    payload['sub_category_name'] = fieldsvalue.sub_category_name;
    payload['short_description'] = fieldsvalue.short_description;
    payload['category_id'] = settingData.category_id;
    payload['description'] = DescriptionValue;
    payload['active'] = activeswicth;
    payload['type'] = settingData.type;
    async function CreateSection(data) {
      const url = api_url.create_subcategory;
      const response = await post_api_request(url, data, headers);
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
    CreateSection(payload);
  };
  const CloseEditSection = () => {
    setShoweditSection(false);
    //setReRender(ReRender + 1);
  };
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ', ' + item;
      })
    : '';

  // Return classes based on whether item is checked
  var isChecked = item => (checked.includes(item) ? 'checked-item' : 'not-checked-item');
  const checkList = [
    'Reading Comprehension',
    'Verbal Reasoning',
    'Mathematics Achievement',
    'Practice',
    'Quantitative Reasoning',
    'Break',
  ];
  const UpdateMapSectionById = e => {
    var PayLoad = {};
    var section_data = submit_form('MapSectionForm');
    if (Object.keys(section_data).length > 0) {
      PayLoad['section_id'] = section_data.section;
    }
    PayLoad['sub_category_name'] = formData.sub_category_name;
    PayLoad['short_description'] = formData.short_description;
    PayLoad['description'] = formData.description;
    PayLoad['active'] = formData.active;
    PayLoad['type'] = formData.type;
    PayLoad['category_id'] = formData.category_id;
    async function editSection(data) {
      const url = api_url.update_subcategory_id + formData.id;
      const response = await put_api_request(url, data, headers);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.responsedata,
        });
        setTimeout(() => {
          //window.location.reload();
        }, 1000);
        // history.push('../users/customer-list');
      } else
        notification.error({
          message: 'Server Error',
        });
    }
    editSection(PayLoad);
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

  const [DataSArray, setDataSArray] = useState([]);
  // const HandleCheck = (e, data) => {
  //   DataSArray.push(data);
  // };
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
            <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Sub Categories</h1>
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
                New Sub Category
              </Button>
            </div>
          </div>
        </div>
        {/* /*********************************************************************Filter Section Starts*********** */}
        <Form id="MapFilterForm">
          {/* {ShowNameFilter == true ? FilteredArraynew.category_name : ''} */}
          <div
            id="sub_category_filter"
            className={`${
              SubCategoryFilterClass != false ? 'CategoryFilter_displaynone' : 'CategoryFilter_displayblock'
            }`}
          >
            {FilteredArraynew.sub_category_name}
          </div>
          <div
            id="category_filter"
            className={`${CategoryFilterClass != false ? 'CategoryFilter_displaynone' : 'CategoryFilter_displayblock'}`}
          >
            {FilteredArraynew.category_name}
          </div>
          <div
            id="sub_category_type_filter"
            className={`${
              SubCategorytypeFilterClass != false ? 'CategoryFilter_displaynone' : 'CategoryFilter_displayblock'
            }`}
          >
            {FilteredArraynew.sub_category_type}
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
      </Main>

      {ShowMapSection != false ? (
        <Form form={MapSectionForm} id="MapSectionForm">
          <div className="Main-headerDiv">
            <div className="inner-headerDiv">
              <div className="headerDiv">
                <p>Map Sections</p>
                <div className="crossIcon">
                  <a onClick={() => setShowMapSection(false)}>X</a>
                </div>
              </div>
              <div className="userGroupselect">
                <label>Select Sections</label>

                {SectionData?.map((item, index) => (
                  <div className="userGroupselect-inner">
                    <div className="checkbox-Map">
                      <label
                        onChange={selectedValue => {
                          setsettingData({ ...settingData, section_id: selectedValue });
                        }}
                      >
                        <input
                          type="checkbox"
                          class="section_checkboxes"
                          id={'check_' + item.id}
                          name="section"
                          //onClick={e => HandleCheck(e, item.id)}
                          value={item.id}
                        />
                        <span>{item.section_name}</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              <div className="Addgroupbtn">
                <Button onClick={e => UpdateMapSectionById(e)}>Update</Button>
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
            name="sDash_validation-form"
            className="AddForm contactForm"
            form={form}
            layout="vertical"
            onFinish={addNewsection}
          >
            <div className="headerDiv">
              <p> New Sub Category</p>
              <div className="crossIcon">
                <a onClick={() => setShowAddNewUser(false)}>X</a>
              </div>
            </div>
            <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
              <Col md={24} xs={24}>
                <Form.Item
                  name="sub_category_name"
                  label="Sub Category Name"
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
                  name="category_id"
                  label="Category Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Category Name !',
                    },
                  ]}
                >
                  <Select
                    style={{ width: '100%' }}
                    classNamePrefix="select"
                    isSearchable={true}
                    arrayDatacategory={arrayDatacategory}
                    //onSelect={GetPosition}
                    onChange={selectedValue => {
                      setsettingData({ ...settingData, category_id: selectedValue });
                    }}
                  >
                    {arrayDatacategory != null
                      ? arrayDatacategory.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item name="type" label="Type">
                  <Select
                    style={{ width: '100%' }}
                    classNamePrefix="select"
                    isSearchable={true}
                    arrayDatatype={arrayDatatype}
                    onChange={selectedValue => {
                      setsettingData({ ...settingData, type: selectedValue });
                    }} //onSelect={GetPosition}
                  >
                    {arrayDatatype != null
                      ? arrayDatatype.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                      : ''}
                    {/* <Option value={1}>Certification</Option>
                    <Option value={2}>Class</Option>
                    <Option value={3}>Course</Option>
                    <Option value={4}>Exam</Option>
                    <Option value={5}>Grade</Option>
                    <Option value={6}>Standard</Option>
                    <Option value={7}>Stream</Option>
                    <Option value={8}>Level</Option>
                    <Option value={8}>Skill</Option>
                    <Option value={8}>Branch</Option> */}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item className="txtareaSpace fullsizefield" name="short_description" label="Short Description">
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
              <p>Edit Sub Category</p>
              <div className="crossIcon">
                <a onClick={() => CloseEditSection()}>X</a>
              </div>
            </div>
            <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
              <Col md={24} xs={24}>
                <Form.Item
                  name="sub_category_name"
                  label="Sub Category Name"
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
                  name="category_id"
                  label="Category Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Category Name !',
                    },
                  ]}
                >
                  <Select
                    style={{ width: '100%' }}
                    classNamePrefix="select"
                    isSearchable={true}
                    arrayDatacategory={arrayDatacategory}
                    //onSelect={GetPosition}
                    onChange={selectedValue => {
                      setsettingData({ ...settingData, category_id: selectedValue });
                    }}
                  >
                    {arrayDatacategory != null
                      ? arrayDatacategory.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Type !',
                    },
                  ]}
                >
                  <Select
                    style={{ width: '100%' }}
                    classNamePrefix="select"
                    isSearchable={true}
                    arrayDatatype={arrayDatatype}
                    onChange={selectedValue => {
                      setsettingData({ ...settingData, type: selectedValue });
                    }}
                    //onSelect={GetPosition}
                  >
                    {arrayDatatype != null
                      ? arrayDatatype.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item className="txtareaSpace fullsizefield" name="short_description" label="Short Description">
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
