import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // useDispatch
import { Form, Row, Col, Table, Select, Checkbox } from 'antd'; // Radio
import FeatherIcon from 'feather-icons-react';


import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, TableWrapper } from '../styled';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
// import { userspermissionFilter } from '../../redux/userpermission/actionCreator';

// import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
// import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
// import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';

const { Option } = Select;
var ModuleName = "USERSPERMISSION";
const UsersPermission = () => {
  // const dispatch = useDispatch();
  const { searchData, userspermission } = useSelector(state => {
    return {
      searchData: state.headerSearchData,
      userspermission: state.userspermission.data,
    };
  });

  const [state, setState] = useState({
    notData: searchData,
    item: userspermission,
    visible: false,
    selectedRowKeys: [],
  });

  const { notData, selectedRowKeys, visible } = state; // item
  // const filterKey = ['Active', 'Inactive'];

  useEffect(() => {
    if (userspermission) {
      setState({
        item: userspermission,
        selectedRowKeys,
      });
    }
  }, [userspermission, selectedRowKeys]);

  const handleSearch = searchText => {
    const data = searchData.filter(value => value.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  // const handleChangeForFilter = e => {
  //   dispatch(userspermissionFilter('status', e.target.value));
  // };

  const dataSource = [];
  if (userspermission.length) {
    userspermission.map((value, key) => {
      const { userRole } = value;
      return dataSource.push({
        key: key + 1,
        userRole: <span className="order-id">{userRole}</span>,
        // status: (
        //   <span
        //     className={`status ${
        //       status === 'Active' ? 'Success' : status === 'Inactive' ? 'error' : 'error'
        //     }`}
        //   >
        //     {status}
        //   </span>
        // ),
        action: (
          <div className="table-actions">
            <>
              <Button className="btn-icon" type="primary" to="#" shape="circle">
                <FeatherIcon icon="eye" size={16} />
              </Button>
              <Button className="btn-icon" type="info" to="#" shape="circle">
                <FeatherIcon icon="edit" size={16} />
              </Button>
              <Button className="btn-icon" type="danger" to="#" shape="circle">
                <FeatherIcon icon="trash-2" size={16} />
              </Button>
            </>
          </div>
        ),
      });
    });
  }

  const columns = [
    {
      title: 'Module Name',
      dataIndex: 'userRole',
      key: 'userRole',
    },
    // {
    //   title: 'View',
    //   dataIndex: '',
    //   key: '',
    //   render: val=><Checkbox value={val}></Checkbox>
    // },
    // {
    //   title: 'Add',
    //   dataIndex: '',
    //   key: '',
    //   render: val=><Checkbox value={val}></Checkbox>
    // },
    // {
    //   title: 'Update',
    //   dataIndex: '',
    //   key: '',
    //   render: val=><Checkbox value={val}></Checkbox>
    // },
    // {
    //   title: 'Delete',
    //   dataIndex: '',
    //   key: '',
    //   render: val=><Checkbox value={val}></Checkbox>
    // },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  const onSelectChange = selectedRowKey => {
    setState({ ...state, selectedRowKeys: selectedRowKey });
  };

  const rowSelection = {
    // eslint-disable-next-line no-shadow
    onChange: selectedRowKeys => {
      onSelectChange(selectedRowKeys);
    },
  };

  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
  };

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
    });
  };

  return (
    <>
      <PageHeader
        ghost
        title="Users Permissions"
        buttons={[
          <div key="1" className="page-header-actions">
            {/* <CalendarButtonPageHeader key="1" />
            <ExportButtonPageHeader key="2" />
            <ShareButtonPageHeader key="3" /> */}
            <Button size="small" key="4" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add New
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Cards headless>
          <Row gutter={15}>
            <Col xs={24}>
              <TopToolBox>
                <Row gutter={15} className="justify-content-center">
                  <Col lg={8} xs={24}>
                    <div className="table-search-box">
                      <AutoComplete onSearch={handleSearch} dataSource={notData} width="100%" patterns />
                    </div>
                  </Col>
                  <Col xxl={14} lg={16} xs={24}>
                    <div className="table-toolbox">
                      <Form.Item name="category" initialValue="" label="">
                        <Select style={{ width: '30%' }}>
                          <Option value="">Select User</Option>
                          <Option value="one">Admin</Option>
                          <Option value="two">SEO</Option>
                          <Option value="three">Content Writer</Option>
                          <Option value="four">Supervisor</Option>
                        </Select>
                      </Form.Item>
                    </div>
                  </Col>
                  {/* <Col xxl={14} lg={16} xs={24}>
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
                  </Col> */}
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
                  expandable={{
                    expandedRowRender: record => <p style={{ maring: 0 }}>{ record.description}</p>,
                  }}
                  pagination={{ pageSize: 7, showSizeChanger: true, total: userspermission.length }}
                />
              </TableWrapper>
            </Col>
          </Row>
        </Cards>
        <CreateRole onCancel={onCancel} visible={visible} />
      </Main>
    </>
  );
};

export default UsersPermission;
