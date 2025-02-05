import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Spin, Form, Input, Table, Checkbox, notification } from 'antd';
import { Switch, Route, NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import { AddUser } from '../../container/pages/style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main, TableWrapper } from '../styled';
import Axios from 'axios';
import { headers } from '../../helpers/variables';
import Cookies from 'js-cookie';
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const { decrypt, encrypt } = require('../../helpers/encryption-decryption');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

var finalarray = [];
var ModuleName = 'EditUsersRole';
const EditUsersRole = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  const [arraydataroles, setarraydataroles] = useState(null);
  const [arraydatastoretype, setarraydatastoretype] = useState(null);
  const [storeModulesData, setStoreModulesData] = useState([]);
  const [ShowAddNewModule, setShowAddNewModule] = useState(false);
  const [arraydatamodules, setarraydatamodules] = useState(null);
  const [ModulesData1, setModulesData] = useState([]);
  const [Roles, setRoles] = useState([]);
  const [ReRender, setReRender] = useState(0);
  const [CheckedAll, setCheckedAll] = useState(false);
  const dataSource = [];

  var permissionsArrayData = [];
  var roleObject = {};
  roleObject['ADMIN'] = {};
  roleObject.ADMIN['MODULES'] = {};

  useEffect(() => {
    async function getparentrole() {
      await Axios.get(domainpath + '/module/all', { headers }).then(response => {
        if (response.status === 200) {
          const modulesdata = response.data.responsedata.modules;

          var count = 0;
          const dataArray = modulesdata?.map(item => {
            count++;
            return {
              index: count,
              id: item.id,
              name: item.name,
              view: '',
              add: '',
              edit: '',
              delete1: '',
              select: '',
            };
          });
          GetFirstIndexPermissions(dataArray);

          setarraydatamodules(dataArray);
          setModulesData(dataArray);
        }
      });
    }
    getparentrole();
    GetAllRoles();
    async function GetFirstIndexPermissions(data) {
      const encodedID = encrypttheid(1);
      await Axios.get(domainpath + `/role/${encodedID}`, { headers }).then(response => {
        const permissionsData = response?.data?.responsedata?.role?.[0];
        const modulesdata = permissionsData.MODULES;
        const gg = Object.entries(modulesdata).map(([key, value]) => ({ key, value }));
        const dataArrayFinal = data?.map(item => {
          gg.map(item1 => {
            if (item.name == item1.key) {
              const permArr = item1.value.split(',');
              //console.log(permArr);
              if (permArr[0] == '1') {
                item.view = true;
              }
              if (permArr[1] == '1') {
                item.add = true;
              }
              if (permArr[2] == '1') {
                item.edit = true;
              }
              if (permArr[3] == '1') {
                item.delete1 = true;
              }
              if (permArr[0] == '1' && permArr[1] == '1' && permArr[2] == '1' && permArr[3] == '1') {
                item.select = true;
              }
            }
          });
          return item;
        });

        setStoreModulesData(dataArrayFinal);
      });
    }
  }, [ReRender]);
  async function GetAllRoles() {
    await Axios.get(domainpath + `/role/allNamesAndIds/all`, { headers }).then(response => {
      const RolesData = response?.data?.responsedata?.roles;
      setRoles(RolesData);
    });
  }
  //-------------------------------------------------------------------------------------------
  async function GetRolePermissions(id) {
    const encodedID = encrypttheid(id);
    await Axios.get(domainpath + '/module/all', { headers }).then(response => {
      if (response.status === 200) {
        const modulesdata = response.data.responsedata.modules;

        var count = 0;
        const dataArray = modulesdata?.map(item => {
          count++;
          return {
            index: count,
            id: item.id,
            name: item.name,
            view: '',
            add: '',
            edit: '',
            delete1: '',
            select: '',
          };
        });
        // GetFirstIndexPermissions(dataArray);

        GetPermissionDataByID(dataArray);
        async function GetPermissionDataByID(data) {
          await Axios.get(domainpath + `/role/${encodedID}`, { headers }).then(response => {
            const permissionsData = response?.data?.responsedata?.role?.[0];
            const modulesdata = permissionsData.MODULES;
            const gg = Object.entries(modulesdata).map(([key, value]) => ({ key, value }));

            var dataArrayFinal = data?.map(item => {
              gg.map(item1 => {
                if (item.name == item1.key) {
                  const permArr = item1.value.split(',');

                  if (permArr[0] == '1') {
                    item.view = true;
                  }
                  if (permArr[1] == '1') {
                    item.add = true;
                  }
                  if (permArr[2] == '1') {
                    item.edit = true;
                  }
                  if (permArr[3] == '1') {
                    item.delete1 = true;
                  }
                  if (permArr[0] == '1' && permArr[1] == '1' && permArr[2] == '1' && permArr[3] == '1') {
                    item.select = true;
                  }
                }
              });
              return item;
              //dataArrayFinal.push(item);
            });

            setStoreModulesData(dataArrayFinal);
          });
        }
      }
    });
  }

  const SelectAll = e => {
    if (e.target.checked == true) {
      const selecteAll = storeModulesData?.map(item => {
        return {
          add: true,
          delete1: true,
          edit: true,
          view: true,
          select: true,
          id: item.id,
          index: item.index,
          name: item.name,
        };
      });
      setStoreModulesData(selecteAll);
      setCheckedAll(true);
    } else if (e.target.checked == false) {
      const UnSelecteAll = storeModulesData?.map(item => {
        return {
          add: false,
          delete1: false,
          edit: false,
          view: false,
          select: false,
          id: item.id,
          index: item.index,
          name: item.name,
        };
      });
      setCheckedAll(false);
      setStoreModulesData(UnSelecteAll);
    }
  };
  const handleOnChange = (rec_id, rec_view) => {
    const key_name = rec_view.target.value;
    const soureceObj = { [key_name]: rec_view.target.checked };
    var tempData = storeModulesData.map(item => {
      if (item.id == rec_id) {
        Object.assign(item, soureceObj);
        if (item.view == false || item.add == false || item.edit == false || item.delete1 == false) {
          item.select = '';
        } else if (item.view == true && item.add == true && item.edit == true && item.delete1 == true) {
          item.select = true;
        }
      }
      return item;
    });

    setStoreModulesData(tempData);
  };

  const handleOnChange1 = (rec_id, rec_view, index) => {
    if (rec_view.target.checked == true) {
      var row_num = index - 1;
      storeModulesData[row_num].view = true;
      storeModulesData[row_num].add = true;
      storeModulesData[row_num].edit = true;
      storeModulesData[row_num].delete1 = true;
    } else if (rec_view.target.checked == false) {
      var row_num = index - 1;
      storeModulesData[row_num].view = false;
      storeModulesData[row_num].add = false;
      storeModulesData[row_num].edit = false;
      storeModulesData[row_num].delete1 = false;
    }
    const key_name = rec_view.target.value;
    const soureceObj = { [key_name]: rec_view.target.checked };

    var tempData = storeModulesData.map(item => {
      if (item.id == rec_id) {
        Object.assign(item, soureceObj);
      }
      return item;
    });

    setStoreModulesData(tempData);
  };
  const AddModule = fieldsValue => {
    // CHECK if Module already exists or not+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++STARTS
    async function checkModule(postData) {
      await Axios.post(domainpath + '/module/checkmodulealready', postData, { headers }).then(response => {
        if (response.status === 200) {
          notification.error({
            message: response.data.message,
          });
        } else if (response.status === 201 && response.data.message == 'itsnewmodule') {
          //Now create module===========================================================================STARTS
          async function createmodule(postData) {
            await Axios.post(domainpath + '/module/', postData, { headers }).then(response => {
              if (response.status === 201 && response.data.status === 'success') {
                notification.success({
                  message: 'Module Created Successfully',
                });
                form.resetFields();
                setReRender(ReRender + 1);
                setShowAddNewModule(false);
              } else if (response.status === 400) {
                notification.error({ message: 'Server error' });
                setTimeout(() => {
                  notification.destroy();
                }, 2500);
              } else {
                notification.error({ message: 'Server error' });
                setTimeout(() => {
                  notification.destroy();
                }, 2500);
              }
            });
          }
          createmodule(fieldsValue);
          //Now create  module=========================================================================ENDS
        }
      });
    }
    checkModule(fieldsValue);
    // CHECK if Module already exists or not+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ENDS
  };

  var payload = {};
  const handleSubmit = fieldsValue => {
    const cookie_data = Cookies.get('UserDetail');
    const decodedData = decrypt(cookie_data);
    const UserInfo = decodedData?.sessdata?.user?.[0];
    const GetRole = UserInfo?.user_role?.toUpperCase();
    const modules = UserInfo?.permissions?.[GetRole].MODULES;

    var finalkey = [];
    storeModulesData?.map((item, key) => {
      if (item.view == false && item.add == false && item.edit == false && item.delete1 == false) {
      } else {
        if (item.view == true) {
          storeModulesData[key].view = 1;
        } else {
          storeModulesData[key].view = 0;
        }
        if (item.add == true) {
          storeModulesData[key].add = 1;
        } else {
          storeModulesData[key].add = 0;
        }
        if (item.edit == true) {
          storeModulesData[key].edit = 1;
        } else {
          storeModulesData[key].edit = 0;
        }
        if (item.delete1 == true) {
          storeModulesData[key].delete1 = 1;
        } else {
          storeModulesData[key].delete1 = 0;
        }
        //array for api------
        const keyName = item.name;
        const value = item.view + ',' + item.add + ',' + item.edit + ',' + item.delete1;
        finalkey.push([keyName, value]);
      }
    });

    var RoleTitle = Roles.filter(item => {
      if (item.id == fieldsValue.role_title) return item.title;
    });

    //array for api------

    const arraytoObject = Object.fromEntries(finalkey);

    if (arraytoObject && arraytoObject !== undefined && Object.keys(arraytoObject).length != 0) {
      const gotTitledata = RoleTitle?.[0]?.title;
      let temp0 = gotTitledata
        .replace(/^\s+|\s+$/gm, '') //remove first and last spaces
        .replace(/ /g, '_') //replaced space to underscore
        .toLowerCase(); //replace to lowecase
      payload['title'] = temp0;
      payload['active'] = fieldsValue.active;
      payload['MODULES'] = arraytoObject;
      console.log(payload);
      //
      const RoleID = fieldsValue.role_title;
      const encryptedId = encrypttheid(RoleID);
      Axios.put(domainpath + `/role/${encryptedId}`, payload, { headers })
        .then(response => {
          if (response.status === 200) {
            if (response.data.status == 'success') {
              notification.success({
                message: 'Role Updated Successfully',
              });
              // SetError('Added Successfully');
              decodedData.sessdata.user[0].permissions[GetRole].MODULES = arraytoObject;
              async function UpdateCookies() {
                const encrypted_userDetails = await encrypt(decodedData);
                console.log(encrypted_userDetails);
                // Cookies.set('UserDetail', encrypted_userDetails);
                // setReRender(ReRender + 1);
                window.location.reload();
              }
              UpdateCookies();
            }
          } else {
            notification.error({ message: 'Server error' });
            setTimeout(() => {
              notification.destroy();
            }, 2000);
          }
        })
        .catch(error => {
          notification.error({
            message: error.response.data.message,
          });
        });
    } else {
      notification.error({ message: 'Select Modules and Permissions' });
    }
  };

  function datavalueMapping() {
    if (storeModulesData?.length) {
      storeModulesData?.map((value, key) => {
        const { id, index, name, view, add, edit, delete1, select } = value;
        return dataSource.push({
          key: key + 1,
          id: (
            <Checkbox
              id={id}
              checked={select}
              value="select"
              onChange={e => {
                handleOnChange1(id, e, index);
              }}
            ></Checkbox>
          ),

          name: name,
          view: (
            <Checkbox
              id={id}
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
              value="delete1"
              checked={delete1}
              onChange={e => {
                handleOnChange(id, e);
              }}
            ></Checkbox>
          ),
        });
      });
    }
  }
  datavalueMapping();

  const columns = [
    {
      title: <Checkbox id="selectall" checked={CheckedAll} onChange={e => SelectAll(e)}></Checkbox>,
      dataIndex: 'id',
      key: 'id',
    },
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
      title: '',
      dataIndex: '',
      key: '',
    },
  ];

  return (
    <>
      <PageHeader ghost title="" buttons={[<div key="1" className="page-header-actions"></div>]} />
      <Main className="userRoleCustm">
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
            <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Assign permissions to a role</h1>
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
                // onClick={() => history.push(`../users/roles`)}
                onClick={() => history.push('../users/add-role')}
                size="small"
                key="5"
                type="primary"
                className="btn-animation"
              >
                Add Role
              </Button>
              <Button
                // onClick={() => history.push(`../users/roles`)}
                onClick={() => setShowAddNewModule(true)}
                size="small"
                key="4"
                type="primary"
                className="btn-animation"
              >
                Add Module
              </Button>
            </div>
          </div>
        </div>

        <Row gutter={15}>
          <Col xs={24}>
            <AddUser>
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
                <Cards>
                  <Form
                    name="sDash_validation-form"
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    //  onChange={submit}
                  >
                    {ShowAddNewModule == false ? (
                      <Row gutter={30}>
                        <Col md={12} xs={24}>
                          <Form.Item
                            name="role_title"
                            label="Role Title"
                            rules={[
                              {
                                required: true,
                                message: 'Enter Role Name',
                              },
                            ]}
                            initialValue={1}
                          >
                            <Select
                              style={{ width: '100%' }}
                              id="GetRolePermissions"
                              onChange={GetRolePermissions}
                              initialValue={1}
                            >
                              {Roles?.map(item => (
                                <Option key={item.id} value={item.id}>
                                  {item?.title?.toUpperCase()}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
                          <Form.Item key="active" name="active" label="Status" initialValue={1}>
                            <Select style={{ width: '100%' }}>
                              <Option value={1}>Active</Option>
                              <Option value={0}>Inactive</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    ) : (
                      ''
                    )}
                    <Row gutter={15}>
                      <Col md={24}>
                        <TableWrapper
                          className="moduleTablePermission table-order table-responsive"
                          style={{ marginTop: '10px' }}
                        >
                          <Table
                            //rowSelection={rowSelection}
                            dataSource={dataSource}
                            columns={columns}
                            // expandable={{
                            //   expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                            // }}
                            pagination={{
                              style: { justifyContent: 'center' },
                              defaultPageSize: 50,
                              //  showSizeChanger: true,
                              total: storeModulesData.length,
                              // pageSizeOptions: ['10', '20', '30', '40', '50', '100'],
                            }}
                          />
                        </TableWrapper>
                      </Col>
                    </Row>
                    <Row>
                      <Form.Item>
                        <div className="add-user-bottom text-right">
                          {/* <Button
                          className="ant-btn ant-btn-primary"
                          type="danger"
                          size="default"
                          onClick={() => {
                            history.push('../users/roles');
                          }}
                        >
                          Back
                        </Button> */}

                          <Button htmlType="submit" type="success" size="default" className="btn-animation">
                            Update
                          </Button>
                        </div>
                      </Form.Item>
                    </Row>
                  </Form>
                </Cards>
              </div>
            </AddUser>
          </Col>
        </Row>
      </Main>
      {ShowAddNewModule != false ? (
        <div className="AddnewUser contactCard customCard">
          <Form
            name="sDash_validation-form"
            className="AddForm contactForm"
            form={form}
            layout="vertical"
            onFinish={AddModule}
          >
            <div className="headerDiv">
              <p>New Module</p>
              <div className="crossIcon">
                <a onClick={() => setShowAddNewModule(false)}>X</a>
              </div>
            </div>
            <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
              <Col md={24} xs={24}>
                <Form.Item
                  name="name"
                  label="Module Name"
                  rules={[
                    {
                      required: true,
                      message: 'Module name is required !',
                    },
                    { max: 50, message: 'Max 50 characters allowed!' },
                  ]}
                >
                  <Input name="" placeholder="First_Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item key="active" name="active" label="Status" initialValue={1}>
                  <Select style={{ width: '100%' }}>
                    <Select.Option value={1}>Active</Select.Option>
                    <Select.Option value={0}>Inactive</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  key="slug"
                  name="slug"
                  label="Slug"
                  rules={[
                    {
                      required: true,
                      message: 'Slug is required !',
                    },
                    { max: 50, message: 'Max 50 characters allowed!' },
                  ]}
                >
                  <Input placeholder="Slug" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30} className="mainRow">
              <Col md={24} xs={24}>
                <Form.Item name="parent_id" label="Parent Name">
                  <Select style={{ width: '100%' }} arraydatamodules={arraydatamodules}>
                    {arraydatamodules != null
                      ? arraydatamodules.map(item => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}{' '}
                          </Select.Option>
                        ))
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
    </>
  );
};

export default EditUsersRole;
