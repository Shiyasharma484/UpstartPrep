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
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

var finalarray = [];
var ModuleName = 'ADDUSERSROLE';
const AddUsersRole = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  const [arraydataroles, setarraydataroles] = useState(null);
  const [arraydatastoretype, setarraydatastoretype] = useState(null);
  const [storeModulesData, setStoreModulesData] = useState([]);
  const [ShowAddNewModule, setShowAddNewModule] = useState(false);
  const [arraydatamodules, setarraydatamodules] = useState(null);
  const dataSource = [];

  var permissionsArrayData = [];
  var roleObject = {};
  roleObject['ADMIN'] = {};
  roleObject.ADMIN['MODULES'] = {};

  var ModulesData = [
    {
      module_id: 1,
      module_name: 'Exam',
    },
    {
      module_id: 2,
      module_name: 'quiz',
    },
    {
      module_id: 3,
      module_name: 'practice',
    },
    {
      module_id: 4,
      module_name: 'Quiz Type',
    },
    {
      module_id: 5,
      module_name: 'Exam Type',
    },
  ];
  var Roles = [
    {
      role_id: 1,
      role_name: 'Admin',
    },
    {
      role_id: 2,
      role_name: 'Instructor',
    },
    {
      role_id: 3,
      role_name: 'Student',
    },
    {
      role_id: 4,
      role_name: 'Parent',
    },
    {
      role_id: 5,
      role_name: 'Guest',
    },
    {
      role_id: 6,
      role_name: 'Employee',
    },
    {
      role_id: 7,
      role_name: 'Institute',
    },
    {
      role_id: 8,
      role_name: 'Candidate',
    },
  ];
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
          setStoreModulesData(dataArray);
          setarraydatamodules(dataArray);
        }
      });
    }
    getparentrole();
  }, []);

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

    const arraytoObject = Object.fromEntries(finalkey);

    if (arraytoObject && arraytoObject !== undefined && Object.keys(arraytoObject).length != 0) {
      const gotTitledata = fieldsValue.role_title;
      let temp0 = gotTitledata
        .replace(/^\s+|\s+$/gm, '') //remove first and last spaces
        .replace(/ /g, '_') //replaced space to underscore
        .toLowerCase(); //replace to lowecase
      payload['title'] = temp0;
      payload['active'] = fieldsValue.active;
      payload['MODULES'] = arraytoObject;
      console.log(payload);
      //
      Axios.post(domainpath + '/role/', payload, { headers })
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            if (response.data.status == 'success') {
              notification.success({
                message: 'Role Created Successfully',
              });
              // SetError('Added Successfully');
            }
            // setTimeout(() => {
            //   notification.destroy();
            //   history.push('../users/roles');
            // }, 2500);
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
    if (storeModulesData.length) {
      storeModulesData.map((value, key) => {
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
      title: (
        <Checkbox
          id="selectall"
          //checked={delete1}
          onChange={e => SelectAll(e)}
        ></Checkbox>
      ),
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
      <PageHeader ghost title="" />
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
                          >
                            <Input />
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
                              defaultPageSize: 100,
                              //  showSizeChanger: true,
                              //total: storeModulesData.length,
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
                            Submit
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
    </>
  );
};

export default AddUsersRole;
