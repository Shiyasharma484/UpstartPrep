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
  const [ShoweditSection, setShoweditSection] = useState(false);
  const [arrayDatacategory, setarrayDatacategory] = useState(null);
  const [formData, setformData] = useState();
  const [ASwitch, setASwitch] = useState(false);
  const [editASwitch, seteditASwitch] = useState(false);
  const [discountSwitch, setdiscountSwitch] = useState(false);
  const [editdiscountSwitch, seteditdiscountSwitch] = useState(false);
  const [featureSwitch, setfeatureSwitch] = useState(false);
  const [editfeatureSwitch, seteditfeatureSwitch] = useState(false);
  const [unlimitedSwitch, setunlimitedSwitch] = useState(false);
  const [editunlimitedSwitch, seteditunlimitedSwitch] = useState(false);
  const [featurearraydata, setfeaturearraydata] = useState();
  const [showfeaturesection, setshowfeaturesection] = useState(false);
  const [showDiscountpercentage, setshowDiscountpercentage] = useState(false);
  const [ReRender, setReRender] = useState(0);
  const [settingData, setsettingData] = useState({
    category_id: '',
    feature: '',
  });

  /*Filter Section================================================= Starts */
  const [FilteredArraynew, setFilteredArraynew] = useState({
    category_name: [],
    active: [],
    duration: [],
    plan_name: [],
  });
  const [dataForFilter, setDataForFilter] = useState([]);
  const [ShowNameFilter, setShowNameFilter] = useState(false);
  const [ShowStatusFilter, setShowStatusFilter] = useState(false);
  const [CategoryFilterClass, setCategoryFilterClass] = useState(true);
  const [ActiveFilterClass, setActiveFilterClass] = useState(true);
  const [PlanNameFilterClass, setPlanNameFilterClass] = useState(true);
  const [DurationFilterClass, setDurationFilterClass] = useState(true);
  const [PriceFilterClass, setPriceFilterClass] = useState(true);
  const [FirstFilterActive, setFirstFilterActive] = useState(false);
  const [FilterCategoryName, setFilterCategoryName] = useState({
    category_name: false,
    active: false,
    plan_name: false,
    duration: false,
    price: false,
  });
  const [ShowActive, setShowActive] = useState(false);
  const [CheckedDataArray, setCheckedDataArray] = useState({
    category_name: '',
    active: '',
    plan_name: '',
    duration: '',
    price: '',
  });
  const [Render, setRender] = useState(0);
  /*Filter Section================================================= Ends */

  useEffect(() => {
    async function GetAllUsers() {
      const url = api_url.get_plans;
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

    async function Getallmodules(data) {
      const url = api_url.getall_modules;
      const response = await get_api_request(url, data, headers);
      console.log(response);
      if (response.status == 200) {
        const Moduledata = response?.data?.responsedata?.modules;
        const getmodules = Moduledata.map(items => {
          console.log(items);
          if (items.name == 'PLANS') {
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
              setfeaturearraydata(DataArray);
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
    var FilterColumns = ['category_name', 'active', 'plan_name', 'duration', 'price'];
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
                    setPlanNameFilterClass(true);
                    setDurationFilterClass(true);
                    setPriceFilterClass(true);
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
      const url = api_url.delete_plans_id + deletedrowid;
      const response = await delete_api_request(url, headers);
      if (response.status == 201) {
        notification.success({
          message: 'Plans Deleted Successfully',
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
    console.log(id);
    if (e == 1) {
      GetUserPlansDataByID(id);
      setShoweditSection(true);
    } else if (e == 2) {
      console.log('Delete');
      window.confirm('Are you sure you wish to delete this item?') ? handleDelete(id) : '';
    }
  };
  async function GetUserPlansDataByID(id) {
    console.log(id);
    const url = api_url.get_plans_id + id;
    const response = await get_api_request(url, headers);
    console.log(response);
    if (response.status == 200) {
      const usersData = response?.data?.responsedata?.[0];
      console.log(usersData);

      // setData(usersdata);
      if (usersData?.active == 1) {
        seteditASwitch(true);
      } else if (usersData?.active == 0) {
        seteditASwitch(false);
      }

      if (usersData?.feature_access == 1) {
        seteditfeatureSwitch(true);
        setshowfeaturesection(true);
      } else if (usersData?.active == 0) {
        seteditfeatureSwitch(false);
        setshowfeaturesection(false);
      }

      if (usersData?.popular == 1) {
        seteditunlimitedSwitch(true);
      } else if (usersData?.active == 0) {
        seteditunlimitedSwitch(false);
      }
      if (usersData?.discount == 1) {
        setshowDiscountpercentage(true);
        seteditdiscountSwitch(true);
      } else if (usersData?.active == 0) {
        seteditdiscountSwitch(false);
        setshowDiscountpercentage(false);
      }
      var features_id = usersData?.feature.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
      setsettingData({
        ...settingData,
        category_id: usersData?.category_name,
        feature: usersData?.feature_name,
      });
      Editform.setFieldsValue({
        category_id: usersData?.category_id,
        plan_name: usersData?.plan_name,
        short_description: usersData?.short_description,
        duration: usersData?.duration,
        sort_order: usersData?.sort_order,
        price: usersData?.price,
        feature: features_id,
        discount_perc: usersData?.discount_perc,
        //group_name: usersdata?.group_name,
      });
      setformData(usersData);
    } else {
      console.log('error');
    }
  }
  const CopyToClipboard = e => {
    const id = 'plan_' + encrypttheid(e);
    navigator.clipboard.writeText(id);
    notification.success({
      message: `Copied Successfully ${id}`,
    });
  };
  /*HANDLING DELETE A USER========================================END */
  const columns = [
    {
      name: 'CODE',
      selector: row => (
        <>
          <p onClick={() => CopyToClipboard(row.id)}>
            <i class="fa fa-files-o" aria-hidden="true"></i> {'plan_' + encrypttheid(row.id)}
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
              setPlanNameFilterClass(!PlanNameFilterClass);
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
          DURATION{' '}
          <i
            class="fa fa-filter"
            aria-hidden="true"
            onClick={() => {
              setDurationFilterClass(!DurationFilterClass);
              //ShowNameFilterIcon();
              // setShowNameFilter(true);
            }}
          ></i>
        </>
      ),
      selector: row => row.duration,
      //sortable: true,
    },
    {
      name: (
        <>
          PRICE/MONTH{' '}
          <i
            class="fa fa-filter"
            aria-hidden="true"
            onClick={() => {
              setPriceFilterClass(!PriceFilterClass);
              //ShowNameFilterIcon();
              // setShowNameFilter(true);
            }}
          ></i>
        </>
      ),
      selector: row => row.price,
      //sortable: true,
    },
    {
      name: (
        <>
          CATEGORY{' '}
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
      //sortable: true,
    },

    {
      name: 'Actions',
      cell: row => (
        <div className="datatable-actions">
          <Select className="Quizz_actions" defaultValue="Actions" onSelect={e => HandleAction(e, row.id)}>
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
    var editunlimitedswicth;
    if (editunlimitedSwitch == true) {
      editunlimitedswicth = 1;
    } else {
      editunlimitedswicth = 0;
    }
    var editfeatureswicth;
    if (editfeatureSwitch == true) {
      editfeatureswicth = 1;
    } else {
      editfeatureswicth = 0;
    }
    var editdiscountswicth;
    if (editdiscountSwitch == true) {
      editdiscountswicth = 1;
    } else {
      editdiscountswicth = 0;
    }
    Payload['category_id'] = Fieldsvalue.category_id;
    Payload['plan_name'] = Fieldsvalue.plan_name;
    Payload['duration'] = Fieldsvalue.duration;
    Payload['price'] = Fieldsvalue.price;
    Payload['sort_order'] = Fieldsvalue.sort_order;
    Payload['short_description'] = Fieldsvalue.short_description;
    Payload['discount_perc'] = Fieldsvalue.discount_perc;
    Payload['feature'] = Fieldsvalue.feature.toString();
    Payload['active'] = editactiveswicth;
    Payload['popular'] = editunlimitedswicth;
    Payload['feature_access'] = editfeatureswicth;
    Payload['discount'] = editdiscountswicth;
    console.log(Payload);
    async function editSection(data) {
      const url = api_url.update_plans_id + formData.id;
      const response = await put_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.responsedata,
        });
        setTimeout(() => {
          // window.location.reload();
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

    var feautreswicth;
    if (featureSwitch == true) {
      feautreswicth = 1;
    } else {
      feautreswicth = 0;
    }

    var unlimitedswicth;
    if (unlimitedSwitch == true) {
      unlimitedswicth = 1;
    } else {
      unlimitedswicth = 0;
    }

    var discountswicth;
    if (discountSwitch == true) {
      discountswicth = 1;
    } else {
      discountswicth = 0;
    }

    payload['category_id'] = fieldsvalue.category_id;
    payload['plan_name'] = fieldsvalue.plan_name;
    payload['short_description'] = fieldsvalue.short_description;
    //payload['description'] = fieldsvalue.description;
    payload['duration'] = fieldsvalue.duration;
    payload['sort_order'] = fieldsvalue.sort_order;
    payload['price'] = fieldsvalue.price;
    payload['discount_perc'] = fieldsvalue.discount_perc;
    payload['feature'] = fieldsvalue.feature.toString();
    payload['active'] = activeswicth;
    payload['discount'] = discountswicth;
    payload['popular'] = unlimitedswicth;
    payload['feature_access'] = feautreswicth;
    console.log(payload);
    async function CreateSection(data) {
      const url = api_url.create_plans;
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
    CreateSection(payload);
  };
  const CloseEditSection = () => {
    console.log('555555555555');
    setShoweditSection(false);
    //setReRender(ReRender + 1);
  };
  const handleDiscount = e => {
    if (e == true) {
      setshowDiscountpercentage(true);
    } else {
      setshowDiscountpercentage(false);
    }
  };
  const handleFeature = e => {
    if (e == true) {
      setshowfeaturesection(true);
    } else {
      setshowfeaturesection(false);
    }
  };
  const handleEditDiscount = e => {
    if (e == true) {
      setshowDiscountpercentage(true);
    } else {
      setshowDiscountpercentage(false);
    }
  };
  const handleEditFeature = e => {
    if (e == true) {
      setshowfeaturesection(true);
    } else {
      setshowfeaturesection(false);
    }
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
            <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Plans</h1>
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
                New Plan
              </Button>
            </div>
          </div>
        </div>

        {/* /*********************************************************************Filter Section Starts*********** */}
        <Form id="MapSectionForm">
          {/* {ShowNameFilter == true ? FilteredArraynew.category_name : ''} */}
          <div
            id="plan_filter"
            className={`${PlanNameFilterClass != false ? 'CategoryFilter_displaynone' : 'CategoryFilter_displayblock'}`}
          >
            {FilteredArraynew.plan_name}
          </div>
          <div
            id="duration_filter"
            className={`${DurationFilterClass != false ? 'CategoryFilter_displaynone' : 'CategoryFilter_displayblock'}`}
          >
            {FilteredArraynew.duration}
          </div>
          <div
            id="duration_filter"
            className={`${PriceFilterClass != false ? 'CategoryFilter_displaynone' : 'CategoryFilter_displayblock'}`}
          >
            {FilteredArraynew.price}
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
              <p>New Plans</p>
              <div className="crossIcon">
                <a onClick={() => setShowAddNewUser(false)}>X</a>
              </div>
            </div>
            <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
              <Col md={24} xs={24}>
                <Form.Item
                  name="category_id"
                  label="Category Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Status !',
                    },
                  ]}
                >
                  <Select
                    style={{ width: '100%' }}
                    classNamePrefix="select"
                    isSearchable={true}
                    arrayDatacategory={arrayDatacategory}
                    //onSelect={GetPosition}
                  >
                    {arrayDatacategory != null
                      ? arrayDatacategory.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="plan_name"
                  label="Plan Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Plan Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Plan Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="duration"
                  label="Duration (Months)"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Duration !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Duration " />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="price"
                  label="Monthly Price"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Monthly Price !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Monthly Price " />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30} className="mainRow">
              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="discount"
                    initialValue=""
                    label="Discount - No"
                    rules={[
                      {
                        required: false,
                        message: 'Please Enter Discount - No !',
                      },
                      {
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please Enter Correct Email',
                      },
                    ]}
                  >
                    <p name="">Provide direct discount to the plan.</p>
                  </Form.Item>
                </Col>
                <div className="switchToggle">
                  <Switch
                    onChange={e => {
                      setdiscountSwitch(!discountSwitch);
                      handleDiscount(e);
                    }}
                    //onClick={() => setshowDiscountpercentage(true)}
                  />
                </div>
              </div>
              {showDiscountpercentage != false ? (
                <Col md={24} xs={24}>
                  <Form.Item
                    name="discount_perc"
                    label="Discount Percentage"
                    rules={[
                      {
                        required: true,
                        message: 'Please Enter Discount Percentage!',
                      },
                    ]}
                  >
                    <Input name="" placeholder="Discount Percentage " />
                  </Form.Item>
                </Col>
              ) : (
                ''
              )}
              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="feature_access"
                    initialValue=""
                    label="Feature Access - Unlimited"
                    rules={[
                      {
                        required: false,
                        message: 'Please Enter Feature Access - Unlimited !',
                      },
                      {
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please Enter Correct Email',
                      },
                    ]}
                  >
                    <p name="">
                      Unlimited (Access to all features). Restricted <br></br> (Access to selected features only).
                    </p>
                  </Form.Item>
                </Col>
                <div className="switchToggle">
                  <Switch
                    onChange={e => {
                      setfeatureSwitch(!featureSwitch);
                      handleFeature(e);
                    }}
                  />
                </div>
              </div>
            </Row>
            {showfeaturesection != false ? (
              <Col md={24} xs={24}>
                <Form.Item
                  name="feature"
                  label="Features"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Features !',
                    },
                  ]}
                  featurearraydata={featurearraydata}
                >
                  <Select mode="multiple">
                    {featurearraydata?.map(item => (
                      <Option value={item?.id}>{item.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            ) : (
              ''
            )}
            <Row gutter={30} className="mainRow">
              <Col md={24} xs={24}>
                <Form.Item className="txtareaSpace fullsizefield" name="short_description" label="Short Description">
                  <TextArea rows={3} showCount maxLength={100} />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="sort_order"
                  label="Sort Order"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Sort Order !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Sort Order " />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30} className="mainRow">
              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="popular"
                    initialValue=""
                    label="Popular - Yes"
                    rules={[
                      {
                        required: false,
                        message: 'Please Enter Popular - Yes!',
                      },
                      {
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please Enter Correct Email',
                      },
                    ]}
                  >
                    <p name="">Yes (Shown as Most Popular).</p>
                  </Form.Item>
                </Col>
                <div className="switchToggle">
                  <Switch onChange={() => setunlimitedSwitch(!unlimitedSwitch)} />
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
                        message: 'Please Enter Discount - No !',
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
              <p>Edit Plans</p>
              <div className="crossIcon">
                <a onClick={() => CloseEditSection()}>X</a>
              </div>
            </div>
            <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
              <Col md={24} xs={24}>
                <Form.Item
                  name="category_id"
                  label="Category Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Status !',
                    },
                  ]}
                >
                  <Select
                    style={{ width: '100%' }}
                    classNamePrefix="select"
                    isSearchable={true}
                    arrayDatacategory={arrayDatacategory}
                    //onSelect={GetPosition}
                    disabled
                    value={settingData.category_id}
                  >
                    {arrayDatacategory != null
                      ? arrayDatacategory.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="plan_name"
                  label="Plan Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Plan Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Plan Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="duration"
                  label="Duration (Months)"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Duration !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Duration " />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="price"
                  label="Monthly Price"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Monthly Price !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Monthly Price " />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30} className="mainRow">
              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="discount"
                    initialValue=""
                    label="Discount - No"
                    rules={[
                      {
                        required: false,
                        message: 'Please Enter Discount - No !',
                      },
                      {
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please Enter Correct Email',
                      },
                    ]}
                  >
                    <p name="">Provide direct discount to the plan.</p>
                  </Form.Item>
                </Col>
                <div className="switchToggle">
                  <Switch
                    checked={editdiscountSwitch}
                    onChange={e => {
                      seteditdiscountSwitch(!editdiscountSwitch);
                      handleEditDiscount(e);
                    }}
                  />
                </div>
              </div>
              {showDiscountpercentage != false ? (
                <Col md={24} xs={24}>
                  <Form.Item
                    name="discount_perc"
                    label="Discount Percentage"
                    rules={[
                      {
                        required: true,
                        message: 'Please Enter Discount Percentage!',
                      },
                    ]}
                  >
                    <Input name="" placeholder="Discount Percentage " />
                  </Form.Item>
                </Col>
              ) : (
                ''
              )}
              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="feature_access"
                    initialValue=""
                    label="Feature Access - Unlimited"
                    rules={[
                      {
                        required: false,
                        message: 'Please Enter Feature Access - Unlimited !',
                      },
                      {
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please Enter Correct Email',
                      },
                    ]}
                  >
                    <p name="">
                      Unlimited (Access to all features). Restricted <br></br> (Access to selected features only).
                    </p>
                  </Form.Item>
                </Col>
                <div className="switchToggle">
                  <Switch
                    checked={editfeatureSwitch}
                    onChange={e => {
                      seteditfeatureSwitch(!editfeatureSwitch);
                      handleEditFeature(e);
                    }}
                  />
                </div>
              </div>
            </Row>
            {showfeaturesection != false ? (
              <Col md={24} xs={24}>
                <Form.Item
                  name="feature"
                  label="Features"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Features !',
                    },
                  ]}
                >
                  <Select mode="multiple">
                    {featurearraydata?.map(item => (
                      <Option value={item?.id}>{item.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            ) : (
              ''
            )}
            <Row gutter={30} className="mainRow">
              <Col md={24} xs={24}>
                <Form.Item className="txtareaSpace fullsizefield" name="short_description" label="Short Description">
                  <TextArea rows={3} showCount maxLength={100} />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="sort_order"
                  label="Sort Order"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Sort Order !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Sort Order " />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30} className="mainRow">
              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="popular"
                    initialValue=""
                    label="Popular - Yes"
                    rules={[
                      {
                        required: false,
                        message: 'Please Enter Popular - Yes!',
                      },
                      {
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please Enter Correct Email',
                      },
                    ]}
                  >
                    <p name="">Yes (Shown as Most Popular).</p>
                  </Form.Item>
                </Col>
                <div className="switchToggle">
                  <Switch checked={editunlimitedSwitch} onChange={() => seteditunlimitedSwitch(!editunlimitedSwitch)} />
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
                        message: 'Please Enter Discount - No !',
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
