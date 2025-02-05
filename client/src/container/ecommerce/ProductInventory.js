import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col, Radio, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';

import TopToolBox from 'react';

import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, TableWrapper } from '../styled';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { productinventoryFilter } from '../../redux/productinventory/actionCreator';
import authorizes from '../../../src/static/img/authorized.png';
import Cookies from 'js-cookie';
const { encrypt, decrypt } = require('../../helpers/encryption-decryption');

// import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
// import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
// import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';

var ModuleName = 'PRODUCTS';

//for Modules-------------start
var Array_of_Modules = [];
var UserRole = [];
var currentStoreModules = [];
var value_of_Module = [];
var getModule = [];
//for Modules-------------end

const ProductInventory = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { searchData, productinventory } = useSelector(state => {
    return {
      searchData: state.headerSearchData,
      productinventory: state.productinventory.data,
    };
  });

  const [state, setState] = useState({
    notData: searchData,
    item: productinventory,
    selectedRowKeys: [],
  });

  const { notData, item, selectedRowKeys } = state;
  const filterKey = ['In Stock', 'Low Stock', 'Out of Stock'];

  //========================================= Store Modules ==========================start
  //var userDetail = JSON.parse(sessionStorage.getItem('UserDetail')); //get UserDetail array from session
  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);
  var currectStoreID = userDetail?.currentstore?.store_id;
  var currectUserRoleID = userDetail?.currentstore?.user_role_id;
  var userStore = userDetail?.store;

  //get User Role dynamicaly ----
  userStore?.map(item => {
    if (currectUserRoleID == item.user_role_id) {
      return (UserRole = item.user_role.toUpperCase());
    }
  });

  //get Modules dynamicaly ----
  userStore?.map(item => {
    // console.log(item);
    if (item.store_id == currectStoreID) {
      return (currentStoreModules = item.permissions?.[UserRole].MODULES);
    }
    // else {
    //   currentStoreModules = item.permissions?.[UserRole].MODULES
    // }
  });
  console.log(UserRole);
  console.log(currentStoreModules);

  var Modules_key = Object.keys(currentStoreModules); // to check is modules available or not?

  Modules_key?.map((item, value) => {
    if (item == ModuleName) {
      return (
        //console.log(item),
        (getModule = item)
      );
    }
  });

  //------------ Make array for all modules------------start

  var modules_array = Object.entries(currentStoreModules).map(([key, value]) => ({ key, value }));
  Array_of_Modules = modules_array;
  //console.log(Array_of_Modules)
  Array_of_Modules?.map(item => {
    if (item.key == ModuleName) {
      return (value_of_Module = item.value.split(',')); // get module value
      //   View = value_of_Module[0],
      //   Add = value_of_Module[1],
      //   Edit = value_of_Module[2],
      //   Delete = value_of_Module[3],
    }
  });

  //---------------make array for all modules---------------end

  //========================================= Store Modules ==========================end

  useEffect(() => {
    if (productinventory) {
      setState({
        item: productinventory,
        selectedRowKeys,
      });
    }
  }, [productinventory, selectedRowKeys]);

  const handleSearch = searchText => {
    const data = searchData.filter(value => value.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  const handleChangeForFilter = e => {
    dispatch(productinventoryFilter('status', e.target.value));
  };

  const dataSource = [];
  if (productinventory.length) {
    productinventory.map((value, key) => {
      const { productName, sku, date, totalStock, status } = value;
      return dataSource.push({
        key: key + 1,
        name: <span className="order-id">{productName}</span>,
        sku: <span className="order-id">{sku}</span>,
        date: <span className="ordered-date">{date}</span>,
        total: <span className="ordered-date">{totalStock}</span>,

        status: (
          <span
            className={`status ${status === 'In Stock' ? 'Success' : status === 'Low Stock' ? 'warning' : 'error'}`}
          >
            {status}
          </span>
        ),
        action: (
          <div className="table-actions">
            <>
              {value_of_Module[0] == 1 ? (
                <Button
                  onClick={() => {
                    history.push('../products/view-product');
                  }}
                  className="btn-icon"
                  type="primary"
                  to="#"
                  shape="circle"
                >
                  <FeatherIcon icon="eye" size={16} />
                </Button>
              ) : (
                ''
              )}
              {value_of_Module[2] == 1 ? (
                <Button
                  onClick={() => {
                    history.push('../products/edit-product');
                  }}
                  className="btn-icon"
                  type="info"
                  to="#"
                  shape="circle"
                >
                  <FeatherIcon icon="edit" size={16} />
                </Button>
              ) : (
                ''
              )}
              {value_of_Module[3] == 1 ? (
                <Button className="btn-icon" type="danger" to="#" shape="circle">
                  <FeatherIcon icon="trash-2" size={16} />
                </Button>
              ) : (
                ''
              )}
            </>
          </div>
        ),
      });
    });
  }

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Total Stock',
      dataIndex: 'total',
      key: 'total',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  const onSelectChange = selectedRowKey => {
    setState({ ...state, selectedRowKeys: selectedRowKey });
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      onSelectChange(selectedRowKeys);
    },
  };
  const sort = {
    onChange: (pagination, sorter) => {
      console.log('params', pagination, sorter);
      total.reverse();
    },
  };

  return (
    <>
      {getModule.length != 0 ? (
        <PageHeader
          ghost
          title="Product Inventory"
          buttons={[
            <div key="1" className="page-header-actions">
              {/* <CalendarButtonPageHeader key="1" />
            <ExportButtonPageHeader key="2" />
            <ShareButtonPageHeader key="3" /> */}
              {value_of_Module[1] == 1 ? (
                <Button
                  onClick={() => {
                    history.push('../products/add-product');
                  }}
                  size="small"
                  key="4"
                  type="primary"
                >
                  <FeatherIcon icon="plus" size={14} />
                  Add New
                </Button>
              ) : (
                ''
              )}
            </div>,
          ]}
        />
      ) : (
        ''
      )}
      {getModule.length != 0 ? (
        <Main>
          <Cards headless>
            <Row gutter={15}>
              <Col xs={24}>
                <TopToolBox>
                  <Row gutter={15} className="justify-content-center">
                    <Col lg={6} xs={24}>
                      <div className="table-search-box">
                        <AutoComplete onSearch={handleSearch} dataSource={notData} width="100%" patterns />
                      </div>
                    </Col>
                    <Col xxl={14} lg={16} xs={24}>
                      <div className="table-toolbox-menu">
                        <span className="toolbox-menu-title"> Status:</span>
                        <Radio.Group onChange={handleChangeForFilter} defaultValue="">
                          <Radio.Button value="">All</Radio.Button>
                          {item.length &&
                            [...new Set(filterKey)].map(value => {
                              return (
                                <Radio.Button key={value} value={value}>
                                  {value}
                                </Radio.Button>
                              );
                            })}
                        </Radio.Group>
                      </div>
                    </Col>
                    {/* <Col xxl={4} xs={24}>
                    <div className="table-toolbox-actions">
                      <Button size="small" type="secondary" transparented>
                        Export
                      </Button>
                      <Button size="small" type="primary">
                        <FeatherIcon icon="plus" size={12} /> Add Order
                      </Button>
                    </div>
                  </Col> */}
                  </Row>
                </TopToolBox>
              </Col>
            </Row>
            <Row gutter={15}>
              <Col md={24}>
                <TableWrapper className="table-order table-responsive">
                  <Table
                    rowSelection={rowSelection}
                    dataSource={dataSource}
                    columns={columns}
                    onChange={sort}
                    pagination={{ pageSize: 7, showSizeChanger: true, total: productinventory.length }}
                  />
                </TableWrapper>
              </Col>
            </Row>
          </Cards>
        </Main>
      ) : (
        <div className="authorized_msg">
          <img src={authorizes} width="40%" />
          {/* <h1>You are not authorized</h1> */}
        </div>
      )}
    </>
  );
};

export default ProductInventory;
