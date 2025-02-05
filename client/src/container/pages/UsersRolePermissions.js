import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Spin, Form, Input, Table, Checkbox } from 'antd';
import { Switch, Route, NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import { AddUser } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main, TableWrapper } from '../styled';
import Axios from 'axios';
import { headers } from '../../helpers/variables';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');

var finalarray = [];
var ModuleName = 'ADDUSERSROLE';
const UsersRolePermissions = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  const [arraydataroles, setarraydataroles] = useState(null);
  const [arraydatastoretype, setarraydatastoretype] = useState(null);
  const [storeModulesData, setStoreModulesData] = useState({});

  useEffect(() => {
    //getting array of id and names to populate dropdowns++++++++++++++++++++++++++++++++++++++++++++++++++STARTS
    async function getRoles() {
      await Axios.get(domainpath + '/role/allNamesAndIds', { headers }).then(response => {
        if (response.status === 200) {
          const rolesdata = response.data.responsedata.roles;

          //make array of names of store types+++++++++++++++++
          const dataArray = rolesdata.map(item => {
            return { id: item.id, name: item.title };
          });
          console.log(dataArray);
          setarraydataroles(dataArray);
          //+++++++++++++++++++++++++++++++++++++++++++++++++++
        }
      });
    }
    getRoles();

    async function getStoreTypes() {
      const payload = { request: 'all' };
      await Axios.post(domainpath + '/storetype/all', payload, { headers }).then(response => {
        if (response.status === 200) {
          const storetypedata = response.data.responsedata.storetypes;

          //make array of names of store types+++++++++++++++++
          const dataArray = storetypedata.map(item => {
            return { id: item.id, name: item.name };
          });
          console.log(dataArray);
          setarraydatastoretype(dataArray);
          //+++++++++++++++++++++++++++++++++++++++++++++++++++
        }
      });
    }
    getStoreTypes();
    //getting array of id and names to populate dropdowns++++++++++++++++++++++++++++++++++++++++++++++++++ENDS

    //get modules name from db++++++++++++++++++++++++++++++++STARTS
    async function getStoreModules() {
      await Axios.get(domainpath + '/module/allNamesAndIds', { headers }).then(response => {
        if (response.status === 200) {
          const modulesdata = response.data.responsedata.modules;
          console.log(modulesdata);
          //make array of names of store modules+++++++++++++++++
          const dataArray = modulesdata.map(item => {
            return { id: item.id, name: item.name, view: '', add: '', edit: '', delete1: '' };
          });
          console.log(dataArray);
          //inserting false to add, edit, view , del--starts

          //inserting false to add, edit, view , del--ends
          setStoreModulesData(dataArray);
          //+++++++++++++++++++++++++++++++++++++++++++++++++++
        }
      });
    }
    getStoreModules();
    //get modules name from db++++++++++++++++++++++++++++++++ENDS
  }, []);
  const dataSource = [];
  // const onchange2 = e => {
  //  // console.log(dataSource);
  //   console.log(e);
  //   console.log(e.target.checked);
  // };

  const handleOnChange = (rec_id, rec_view) => {
    // console.log(rec_id);
    // console.log(rec_view); //"view"
    const key_name = rec_view.target.value;
    // console.log(key_name);

    const soureceObj = { [key_name]: rec_view.target.checked };
    // console.log(soureceObj);
    //  console.log(storeModulesData);
    var tempData = storeModulesData.map(item => {
      if (item.id == rec_id) {
        Object.assign(item, soureceObj);
      }
      return item;
    });

    // var userRole = storeModulesData.map(item => {
    //   if (item.key_name == '') {
    //     item.key_name = '0';
    //   }
    //   return item;
    // });
    // console.log(userRole);
    //  console.log(tempData);
    setStoreModulesData(tempData);
  };

  var payload = [];
  const handleSubmit = fieldsValue => {
    console.log(fieldsValue);
    console.log(storeModulesData);
    if (fieldsValue.parent_role != undefined) {
      payload['parent_role'] = fieldsValue.parent_role;
      payload['role_title'] = fieldsValue.role_title;
      payload['store_type'] = fieldsValue.store_type;
      payload['roles'] = storeModulesData;
      console.log(payload);
    }
    // console.log('===================');
  };
  //=====================================================Action Starts==================================================

  //HANDLE VIEW==============
  const handleView = id => {
    console.log(id);
    async function viewData(id) {
      const encryptedid = encrypttheid(id);
      const postID = encryptedid;
      // history.push(`../users/view-user/viewinfo/${postID}`);
    }
    viewData(id);
  };
  //============================
  //HANDLING EDIT_______________
  const handleEdit = id => {
    console.log(id);

    async function editData(id) {
      const encryptedid = encrypttheid(id);
      const postID = encryptedid;
      //  history.push(`../users/edit-user/infos/${postID}`);
    }
    editData(id);
  };

  //_________________________________
  //HANDLING DELETE A USER+++++++++++
  const handleDelete = id => {
    console.log(id);

    // alert(id);
    var deletedrowid = id;
    // console.log(deletedrowid);
    var column = 'id';
    //console.log(column);
    // async function deleteData(id) {
    //   const encryptedid = encrypttheid(id);
    //   const postID = encryptedid;
    //   console.log(postID);

    //   await Axios.delete(domainpath + `/user/delete/${postID}`, { headers }).then(response => {
    //     //make it async
    //     console.log(response);
    //     console.log('resp bckkkkkkkkkkkkkkkkkkkkkkkk');
    //     notification.open({
    //       message: 'User Deleted Successfully',
    //     });
    //     if (response.status === 200) {
    //       //  alert(response.data.responsedata.message);
    //       const afterdeletedata = userList.filter(item => {
    //         if (column !== '') {
    //           //console.log('working');
    //           return item[column] !== deletedrowid;
    //         }
    //         return item;
    //       });
    //       //console.log(afterdeletedata);
    //       setUserList(afterdeletedata);
    //     } else if (response.status === 400) {
    //       alert(response.data.message);
    //       //return dispatch(usersListSuccess(userdata));
    //     } else {
    //       alert('Error');
    //     }
    //   });
    // }
    // deleteData(id);
  };
  //++++++++++++++++++++++++++++++++++++++++++

  //=====================================================Action Ends====================================================
  if (storeModulesData.length) {
    storeModulesData.map((value, key) => {
      const { id, name, view, add, edit, delete1 } = value;
      return dataSource.push({
        key: key + 1,
        id: id,
        name: name,
        view: (
          <Checkbox
            id={id}
            disabled
            value="view"
            checked={view}
            onChange={e => {
              handleOnChange(id, e);
            }}
          ></Checkbox>
        ),

        add: (
          <Checkbox
            id={id}
            disabled
            value="add"
            checked={add}
            onChange={e => {
              handleOnChange(id, e);
            }}
          ></Checkbox>
        ),
        edit: (
          <Checkbox
            id={id}
            disabled
            value="edit"
            checked={edit}
            onChange={e => {
              handleOnChange(id, e);
            }}
          ></Checkbox>
        ),
        delete1: (
          <Checkbox
            id={id}
            disabled
            value="delete1"
            checked={delete1}
            onChange={e => {
              handleOnChange(id, e);
            }}
          ></Checkbox>
        ),
        action: (
          <div className="table-actions">
            <>
              {/* {value_of_Module[0] == 1 ? ( */}
              <Button
                className="btn-icon"
                type="primary"
                to="#"
                shape="circle"
                onClick={() => {
                  handleView(id);
                }}
              >
                <FeatherIcon icon="eye" size={16} />
              </Button>
              {/* ) : (
                ''
              )} */}
              {/* {value_of_Module[2] == 1 ? ( */}
              <Button
                className="btn-icon"
                type="info"
                to="#"
                shape="circle"
                onClick={() => {
                  handleEdit(id);
                }}
              >
                <FeatherIcon icon="edit" size={16} />
              </Button>
              {/* ) : (
                ''
              )} */}
              {/* {value_of_Module[3] == 1 ? ( */}
              <Button
                className="btn-icon"
                type="danger"
                to="#"
                shape="circle"
                onClick={() =>
                  window.confirm('Are you sure you wish to delete this item?') ? handleDelete(value.id) : ''
                }
              >
                <FeatherIcon icon="trash-2" size={16} />
              </Button>
              {/* ) : (
                ''
              )} */}
            </>
          </div>
        ),
      });
    });
  }

  const columns = [
    {
      title: 'Module Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'View',
      dataIndex: 'view',
      key: 'view',
      // render: val => (
      //   <Checkbox
      //     checked={val}
      //     //onChange={onchange2}
      //   ></Checkbox>
      // ),
    },
    {
      title: 'Add',
      dataIndex: 'add',
      key: 'add',
      //  render: val => <Checkbox checked={val}></Checkbox>,
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'edit',
      //render: val => <Checkbox checked={val}></Checkbox>,
    },
    {
      title: 'Delete',
      dataIndex: 'delete1',
      key: 'delete1',
      // render: val => <Checkbox checked={val}></Checkbox>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];
  //ROW SELECTION STARTS============================================================
  const rowSelection = {
    // eslint-disable-next-line no-shadow
    //let selectedids={};
    onChange: (selectedRowKeys, rows) => {
      console.log(selectedRowKeys);

      console.log(rows);
      finalarray = rows;
      //get data from state datasource and acc to selected row get data ------------------------------
      // setTimeout(() => {
      //   if (selectedRowKeys.length > 0) {
      //     alert('selected rows are' + selectedRowKeys);
      //   }
      // }, 500);
      // ---------------------------------------------------------------------------------------------

      //console.log(rows); //getting selected rows
      //console.log(selectedRowKeys);//getting selected row keys
      let selectedids = []; //array
      for (let i = 0; i < selectedRowKeys.length; i++) {
        selectedids.push(rows[i].id);
      }

      // console.log(selectedids);
      bulkDelete(selectedids);
    },
  };

  const bulkDelete = selectedids => {
    // setState({ ...state, selectedRowKeys: selectedRowKey });
  };
  //ROW SELECTION ENDS==============================================================
  //
  //

  return (
    <>
      <PageHeader
        ghost
        title="Role Permissions List"
        buttons={[
          <div key="1" className="page-header-actions">
            {/* <CalendarButtonPageHeader key="1" />
          <ExportButtonPageHeader key="2" />
          <ShareButtonPageHeader key="3" /> */}
            <Button
              type="primary"
              onClick={() => {
                history.push('./add-users-role');
              }}
            >
              Add User Role
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <AddUser>
              <Cards>
                {/* <Form
                  name="sDash_validation-form"
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                  //  onChange={submit}
                > */}
                {/* <Row gutter={30}>
                    <Col md={8} xs={24}>
                      <Form.Item
                        name="role_title"
                        label="Role Title"
                        rules={[
                          {
                            required: true,
                            message: 'Enter Role Name',
                          },
                        ]}
                      >
                        <Input placeholder="Enter role name" />
                      </Form.Item>
                    </Col>
                    <Col md={8} xs={24}>
                      <Form.Item name="parent_role" initialValue="" label="Parent Role(if any)">
                        <Select style={{ width: '100%' }} arraydataroles={arraydataroles}>
                          {arraydataroles != null
                            ? arraydataroles.map(item => {
                                return <Option value={item.name}>{item.name} </Option>;
                              })
                            : ''}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={8} xs={24}>
                      <Form.Item
                        name="store_type"
                        initialValue=""
                        label="Store Type"
                        rules={[
                          {
                            required: true,
                            message: 'Please select store type !',
                          },
                        ]}
                      >
                        <Select style={{ width: '100%' }} arraydatastoretype={arraydatastoretype}>
                          {arraydatastoretype != null
                            ? arraydatastoretype.map(item => {
                                return (
                                  <Option value={item.name} type="readonly">
                                    {item.name}
                                  </Option>
                                );
                              })
                            : ''}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row> */}

                <Row gutter={15}>
                  <Col md={24}>
                    <TableWrapper className="table-order table-responsive">
                      <Table
                        rowSelection={rowSelection}
                        dataSource={dataSource}
                        columns={columns}
                        // expandable={{
                        //   expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                        // }}
                        pagination={{
                          style: { justifyContent: 'center' },
                          defaultPageSize: 10,
                          showSizeChanger: true,
                          total: storeModulesData.length,
                          pageSizeOptions: ['10', '20', '30', '40', '50', '100'],
                        }}
                      />
                    </TableWrapper>
                  </Col>
                </Row>
                {/* <Row>
                  <Form.Item>
                    <div className="add-user-bottom text-right">
                      <Button
                        className="ant-btn ant-btn-primary"
                        type="danger"
                        size="default"
                        onClick={() => {
                          return form.resetFields();
                        }}
                        //onClick={submit}
                      >
                        Reset
                      </Button>

                      <Button
                        htmlType="submit"
                        type="success"
                        size="default" //disabled={disable}
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </div>
                  </Form.Item>
                </Row> */}
                {/* </Form> */}
              </Cards>
            </AddUser>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default UsersRolePermissions;
