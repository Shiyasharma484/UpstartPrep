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

var ModuleName = 'DASHBOARD';
const ExamType = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [form] = Form.useForm();
  const [Editform] = Form.useForm();
  const { TextArea } = Input;
  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);
  const [render, setrender] = useState(0);
  const [ShowAddNewExamType, setShowAddNewExamType] = useState(false);
  const [ShowEditNewExamType, setShowEditNewExamType] = useState(false);
  const [moduledataarray, setmoduledataarray] = useState();
  const [statusvalue, setstatusvalue] = useState();
  const [EditActiveStatusSwitch, setEditActiveStatusSwitch] = useState(false);
  const [entitydataarray, setentitydataarray] = useState();
  const [status, setStatus] = useState(0);
  const [updatedid, setupdatedid] = useState([]);
  const [editExamData, seteditExamData] = useState({
    exam_type_name: '',
    // color: '',
    image_URL: '',
  });

  useEffect(() => {
    async function Getallmodules(data) {
      const url = api_url.getall_modules;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const Moduledata = response?.data?.responsedata?.modules;
        console.log(Moduledata);
        const getmodules = Moduledata?.map(items => {
          console.log(items);
          if (items.name == 'EXAM TYPES') {
            const parentdata = items?.id;
            console.log(parentdata);

            async function getentitybyparentid() {
              const url = api_url.getquestion_type_byparent + parentdata;
              const response = await get_api_request(url, headers);
              console.log(response);
              const questiontypedata = response?.data?.responsedata;
              setData(questiontypedata);
            }
            getentitybyparentid();
            setmoduledataarray(items);
          }
        });
      } else {
        console.log('error');
      }
    }
    Getallmodules();

    seteditExamData({
      name: editExamData?.exam_type_name,
    });
    setrender(0);
  }, [render]);

  const visibilitystatus = e => {
    if (e == true) {
      setStatus(1);
    } else {
      setStatus(0);
    }
  };

  const HandleAction = e => {
    console.log(e);
    const ids = e.split(',');
    console.log(ids);
    const actionid = ids?.[0];
    const rowid = ids?.[1];
    console.log(rowid);
    if (actionid == 3) {
      setShowEditNewExamType(true);
      async function GetEntitybyid(data) {
        const url = api_url.get_entity_byid + rowid;
        const response = await get_api_request(url, headers);
        console.log(response);
        if (response.status == 200) {
          const entitydata = response?.data?.responsedata?.[0];
          console.log(entitydata);
          if (entitydata?.meta?.active == 1) {
            setEditActiveStatusSwitch(true);
          } else if (entitydata?.meta?.active == 0) {
            setEditActiveStatusSwitch(false);
          }
          setentitydataarray(entitydata);
          updatedid.push(entitydata?.id);
          console.log(entitydata?.id);
          Editform.setFieldsValue({
            exam_type_name: entitydata?.name,
            image_URL: entitydata?.meta?.imageurl,
          });
        } else {
          console.log('error');
        }
      }
      GetEntitybyid();
    } else if (actionid == 4) {
      handleDelete(rowid);
    }
  };

  const CopyToClipboard = e => {
    const id = encrypttheid(e);
    console.log(domainpath);
    console.log(e);
    navigator.clipboard.writeText(`${domainpath}/dashboard/engage/exam-type/`);
    notification.success({
      message: `Copied Successfully ${domainpath}/dashboard/engage/exam-type/`,
    });
  };

  const columns = [
    {
      name: 'CODE',
      selector: row => (
        <>
          <p onClick={() => CopyToClipboard(row.id)}>
            <i class="fa fa-files-o" aria-hidden="true"></i> {encrypttheid(row.id)}
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
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },

    {
      name: 'Status',
      selector: row => (
        <>
          <span className={`status ${row.meta.active == 1 ? 'Success' : 'error'}`}>
            {row.meta.active == 1 ? 'Active' : 'Inactive'}
          </span>
        </>
      ),
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className="datatable-actions">
          <Select className="Examz_actions" defaultValue="Actions" onSelect={e => HandleAction(e + ',' + row.id)}>
            <Option value={3}>Edit</Option>
            <Option value={4}>Delete</Option>
          </Select>
        </div>
      ),
    },
  ];

  const tableData = {
    columns,
    data,
  };

  const addexamtype = fieldsvalue => {
    var meta = {};
    var AddExamTpe = {
      name: fieldsvalue?.exam_type_name,
      parent_id: moduledataarray?.id,
      module_id: moduledataarray?.id,
    };
    meta = {
      imageurl: fieldsvalue?.image_URL,
      // color: fieldsvalue?.color,
      active: status,
    };
    AddExamTpe['meta'] = meta;
    console.log(meta);
    console.log(JSON.stringify(AddExamTpe));
    console.log(AddExamTpe);
    async function createentity() {
      const url = api_url.create_entity;
      const response = await post_api_request(url, AddExamTpe, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.message,
        });
        setrender(render + 1);
        setShowAddNewExamType(false);
        setStatus(0);
        form.resetFields();
        setTimeout(() => {
          notification.destroy();
        }, 1000);
      } else {
        notification.error({ message: response?.data?.message });
      }
    }
    createentity();
    console.log(AddExamTpe);
    console.log(fieldsvalue);
  };

  const Editexamtype = fieldsValue => {
    var meta = {};
    var activeswicth;
    if (EditActiveStatusSwitch == true) {
      activeswicth = 1;
    } else {
      activeswicth = 0;
    }

    var UpdateExamType = {
      name: fieldsValue?.exam_type_name,
      parent_id: moduledataarray?.parent_id,
      module_id: moduledataarray?.id,
    };
    meta = {
      imageurl: fieldsValue?.image_URL,
      active: activeswicth,
    };
    UpdateExamType['meta'] = meta;
    console.log(UpdateExamType);
    console.log(meta);
    async function UpdatedSchedule() {
      console.log(updatedid?.[0]);
      const id = updatedid?.[0];
      const url = api_url.update_entity_byId + '/' + id;
      const response = await put_api_request(url, UpdateExamType, headers);
      console.log(response);
      if (response.status === 201) {
        notification.success({
          message: 'Exam Type Updated Successfully',
        });
        setrender(render + 1);
        setTimeout(() => {
          notification.destroy();
          setShowEditNewExamType(false);
        }, 2000);
      } else {
        notification.error({ message: response?.data?.message });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      }
    }
    UpdatedSchedule();
  };
  const handleDelete = id => {
    console.log(id);
    var deletedrowid = id;
    var column = 'id';
    async function deleteData(id) {
      console.log(id);
      const url = api_url.delete_entity_byId + id;
      console.log(url);
      const response = await delete_api_request(url, headers);
      console.log(response);

      if (response.status === 201) {
        notification.success({
          message: response?.data?.message,
        });
        setrender(render + 1);
        setTimeout(() => {
          notification.destroy();
        }, 1000);
        const afterdeletedata = data.filter(item => {
          if (column !== '') {
            return item[column] != id;
          }
          return item;
        });

        setData(afterdeletedata);
      } else {
        notification.error({ message: response?.data?.message });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      }
      // });
    }
    deleteData(id);
  };

  return (
    <>
      <Main>
        <div key="1" className="page-header-actions" style={{ marginTop: '16px', justifyContent: 'space-between' }}>
          <div
            data-aos="fade-down"
            data-aos-offset="10"
            data-aos-delay="50"
            data-aos-duration="1500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="center"
          >
            <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Exam Types</h1>
          </div>
          <div className="importNewBTN">
            <div
              data-aos="fade-down"
              data-aos-offset="10"
              data-aos-delay="50"
              data-aos-duration="1500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="center"
            >
              <Button
                className="btn-animation"
                onClick={() => setShowAddNewExamType(true)}
                size="small"
                key="4"
                type="success"
              >
                <FeatherIcon icon="plus" size={14} />
                NEW EXAM TYPE
              </Button>
            </div>
          </div>
        </div>
        <br />{' '}
        <div
          data-aos="fade-up"
          data-aos-offset="10"
          data-aos-delay="50"
          data-aos-duration="1500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="center"
        >
          <DataTable
            className="tableHeading"
            columns={columns}
            data={data}
            defaultSortField="id"
            defaultSortAsc={false}
            pagination
            highlightOnHover
          />
        </div>
      </Main>
      {ShowAddNewExamType != false ? (
        <div className="AddnewUser contactCard customCard">
          <Form
            name="sDash_validation-form"
            className="AddForm contactForm"
            form={form}
            layout="vertical"
            onFinish={addexamtype}
          >
            <div className="headerDiv">
              <p>New Exam Type</p>
              <div className="crossIcon">
                <a onClick={() => setShowAddNewExamType(false)}>X</a>
              </div>
            </div>
            <Row gutter={30} className="AddQuizTpe_main" style={{ marginTop: ' 10px' }}>
              <Col className="AddQuizTpe" md={24} xs={24}>
                <Row gutter={30}>
                  <Col md={24} xs={24}>
                    <Form.Item name="exam_type_name" label="Exam Type Name">
                      <Input placeholder="exam-type-name" />
                    </Form.Item>
                  </Col>
                  {/* <Col md={24} xs={24}>
                    <Form.Item name="color" label="Color">
                      <Input placeholder="color" type="color" />
                    </Form.Item>
                  </Col> */}
                  <Col md={24} xs={24}>
                    <Form.Item name="image_URL" label="Image URL">
                      <Input placeholder="Image URL" type="url" />
                    </Form.Item>
                  </Col>

                  <Col md={21}>
                    <p>
                      <b>Active</b> <br />
                      Active (Shown Everywhere). In-active (Hidden Everywhere).
                    </p>
                  </Col>
                  <Col md={3} className="switchToggle">
                    <Switch onChange={e => visibilitystatus(e)} checked={status} />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row gutter={30} className="Addgroupbtn">
              <Col md={24} xs={24}>
                <Form.Item>
                  <Button htmlType="submit">Create</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      ) : (
        ''
      )}
      {ShowEditNewExamType != false ? (
        <div className="AddnewUser contactCard customCard">
          <Form
            name="sDash_validation-form"
            className="AddForm contactForm"
            form={Editform}
            layout="vertical"
            onFinish={Editexamtype}
          >
            <div className="headerDiv">
              <p>Edit Exam Type</p>
              <div className="crossIcon">
                <a onClick={() => setShowEditNewExamType(false)}>X</a>
              </div>
            </div>
            <Row gutter={30} className="AddQuizTpe_main" style={{ marginTop: ' 10px' }}>
              <Col className="AddQuizTpe" md={24} xs={24}>
                <Row gutter={30}>
                  <Col md={24} xs={24}>
                    <Form.Item name="exam_type_name" label="Exam Type Name">
                      <Input
                        placeholder="Exam Type Name"
                        onChange={selectedValue => {
                          seteditExamData({
                            ...editExamData,
                            exam_type_name: selectedValue.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  {/* <Col md={24} xs={24}>
                    <Form.Item name="color" label="Color">
                      <Input
                        placeholder="color"
                        type="color"
                        onChange={selectedValue => {
                          seteditExamData({
                            ...editExamData,
                            color: selectedValue.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </Col> */}
                  <Col md={24} xs={24}>
                    <Form.Item name="image_URL" label="Image URL">
                      <Input
                        placeholder="Image URL"
                        type="url"
                        onChange={selectedValue => {
                          seteditExamData({
                            ...editExamData,
                            image_URL: selectedValue.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col md={21}>
                    <div className="togglefield" style={{ width: '94%' }}>
                      <Col md={24} xs={24}>
                        <Form.Item
                          name="status"
                          initialValue=""
                          label="Active"
                          rules={[
                            {
                              required: false,
                              message: 'Please Enter Status !',
                            },
                          ]}
                        >
                          <p name="">Active (Shown Everywhere). In-active (Hidden Everywhere).</p>
                        </Form.Item>
                      </Col>
                      <div className="switchToggle">
                        <Switch
                          onChange={() => setEditActiveStatusSwitch(!EditActiveStatusSwitch)}
                          checked={EditActiveStatusSwitch}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
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

export default ExamType;
