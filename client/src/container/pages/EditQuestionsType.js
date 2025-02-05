import React, { useState, useEffect } from 'react';

import { Form, notification, Select, Col, Row, Input, Switch, Space } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useHistory, useParams } from 'react-router-dom';
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
  ModulePermissions,
} from '../../helpers/Common.js';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Editor, EditorTools } from '@progress/kendo-react-editor';
import TextArea from 'antd/lib/input/TextArea';
const {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  OrderedList,
  UnorderedList,
  InsertTable,
  InsertImage,
} = EditorTools;
const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

var ModuleName = 'QUESTION TYPES';
var UserRole = [];
var PermissionValues = {};
const EditQuestionsType = () => {
  var permissions = ModulePermissions(ModuleName);
  const [form] = Form.useForm();
  const [entitydataarray, setentitydataarray] = useState();
  const history = useHistory();
  const params = useParams();
  const id = params?.id;
  console.log(id);
  useEffect(() => {
    if (permissions) {
      UserRole = permissions?.role;
      if (permissions?.item?.value) {
        const perminssion_values = permissions?.item?.value.split(','); // get module value
        PermissionValues['view'] = perminssion_values[0];
        PermissionValues['add'] = perminssion_values[1];
        PermissionValues['edit'] = perminssion_values[2];
        PermissionValues['delete'] = perminssion_values[3];
      }
    } else {
      console.log('Not Authorized');
    }
    async function GetEntitybyid() {
      const url = api_url.get_entity_byid + id;
      //console.log(id);
      //console.log(url);
      const response = await get_api_request(url, headers);
      console.log(response);

      if (response.status == 200) {
        const entitydata = response?.data?.responsedata?.[0];
        form.setFieldsValue({
          entity: entitydata?.name,
          description: entitydata?.meta?.description,
          active: entitydata?.meta?.active == 1 ? 'Active' : 'Inactive',
        });
        setentitydataarray(entitydata);
      } else {
        console.log('error');
      }
    }
    GetEntitybyid();
  }, []);

  const handlesubmit = fieldsValue => {
    var meta = {};
    var payload = {
      name: fieldsValue?.entity,
      parent_id: entitydataarray?.parent_id,
      module_id: entitydataarray?.module_id,
    };
    meta = {
      active: fieldsValue?.active,
      description: fieldsValue?.description,
      code: fieldsValue?.code,
    };
    payload['meta'] = meta;
    console.log(JSON.stringify(payload));
    const entityid = entitydataarray?.id;
    async function createentity() {
      const url = api_url.create_entity + '/' + entityid;
      const response = await put_api_request(url, payload, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: 'Question Type Updated Successfully',
        });
        setTimeout(() => {
          history.push(`../question-types`);
        }, 1000);
      } else {
        notification.error({ message: response?.message });
      }
    }
    createentity();
    console.log(payload);
  };

  return (
    <>
      <Main>
        <Form
          name="sDash_validation-form"
          className="editquestion_form"
          form={form}
          // layout="vertical"
          onFinish={handlesubmit}
        >
          <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Edit Questions Types</h1>

          <section className="SectionTabsMainTop">
            <Cards>
              <Row gutter={30} className="skillrow">
                <Col md={8} xs={24}>
                  <Form.Item
                    name="entity"
                    label="Question Type"
                    rules={[{ required: true, message: 'Question Type is required!' }]}
                  >
                    <Input name="entity" type="text" placeholder="Enter Your Question "></Input>
                  </Form.Item>
                </Col>
                {/* <Col md={8} xs={24}>
                  <label>Parent Category</label>
                  <Form.Item name="parent_entity">
                    <Input name="parent_entity" readOnly></Input>
                    {/* <Select>
                      <Option value={moduledataarray?.parent_id}>{moduledataarray?.parent_name} </Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                  <label>Module Name</label>
                  <Form.Item name="module">
                    <Input name="module" readOnly></Input>
                    {/* <Select value={moduledataarray?.name}>
                      <Option value={moduledataarray?.id}>{moduledataarray?.name} </Option>
                    </Select>
                  </Form.Item>
                </Col> */}

                <Col md={8} xs={24}>
                  <Form.Item name="active" label="Status" rules={[{ required: true, message: 'Status is required!' }]}>
                    <Select defaultValue="Please Select">
                      <Option value={0}>InActive </Option>
                      <Option value={1}>Active </Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                  {/* <label>Code</label>
                  <Form.Item name="code">
                    <Input name="code" type="text"></Input>
                  </Form.Item> */}
                </Col>
                <Col md={16} xs={24}>
                  <Form.Item name="description" label="Description">
                    <TextArea name="description" style={{ height: '200px' }} />
                  </Form.Item>
                </Col>
                <Col md={24} xs={24}>
                  <Button htmlType="submit" type="success" size="default" className="pull-right">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Cards>
          </section>
        </Form>
      </Main>
    </>
  );
};
export default EditQuestionsType;
