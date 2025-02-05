import React, { useState, useEffect } from 'react';
import { Row, Col, Select, notification, Form, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import authorizes from '../../../src/static/img/authorized.png';
import { headers } from '../../helpers/variables';
import { Editor, EditorTools } from '@progress/kendo-react-editor';
import { get_api_request, post_api_request, put_api_request, delete_api_request, api_url } from '../../helpers/Common';
import { ModulePermissions } from '../../helpers/Common';
const { encrypt, decrypt } = require('../../helpers/encryption-decryption');

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
  //Link,
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
// const { TextArea } = Input;
//var ModuleName = 'SETTINGS';
//for Modules-------------start
var ModuleName = 'Pages';
var permissions = ModulePermissions(ModuleName);
var UserRole = [];
var PermissionValues = {};
const { TextArea } = Input;
const AddPages = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [htmlValue, setHtmlValue] = useState('');
  const [formData, setformData] = useState({
    title: '',
    slug: '',
    active: '',
  });
  const [state, setState] = useState({
    file: null,
    list: null,
    submitValues: {},
  });

  const handleHtml = event => {
    setHtmlValue(event.html);
  };

  useEffect(() => {
    async function fetchData() {
      const url = api_url.get_settings;
      const response = await get_api_request(url, headers);
      const config_Data = response?.data?.responsedata?.configurations?.[0].configurations_privacy_policy;
      setHtmlValue(config_Data);
    }
    fetchData();
  }, []);

  const handleSubmit = fieldsvalue => {
    console.log(fieldsvalue);
    var payload = {};
    payload['html'] = htmlValue;
    payload['title'] = formData?.title;
    payload['slug'] = formData?.slug;
    payload['enable'] = formData?.active;
    console.log(payload);
    console.log(JSON.stringify(payload));
    async function UpdatedNewPage() {
      const url = api_url.createpage;
      const response = await post_api_request(url, payload, headers);
      console.log(url);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: 'Page Created Successfully',
        });
        history.push(`/dashboard/configuration/pages`);
      } else {
        notification.error({ message: 'server error' });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      }
    }
    UpdatedNewPage();
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
            <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Add New Page</h1>
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
                onClick={() => history.push(`/dashboard/configuration/pages/`)}
                size="small"
                key="4"
                type="success"
              >
                <FeatherIcon icon="plus" size={14} />
                View Pages List
              </Button>
            </div>
          </div>
        </div>
        <Cards headless>
          <Row gutter={24}>
            <Col xs={24}>
              <Form>
                {' '}
                <Row gutter={24}>
                  <Col md={8} xs={24}>
                    <Form.Item
                      name="title"
                      rules={[
                        {
                          required: true,
                          message: 'Please Enter Page Title First',
                        },
                      ]}
                    >
                      <label>Page Title</label>
                      <Input
                        name="title"
                        placeholder="Enter Page Title"
                        style={{ background: 'none' }}
                        onChange={selectedValue => {
                          setformData({
                            ...formData,
                            title: selectedValue.target.value,
                          });
                        }}
                      ></Input>
                    </Form.Item>
                  </Col>
                  <Col md={8} xs={24}>
                    <Form.Item
                      name="slug"
                      rules={[
                        {
                          required: true,
                          message: 'Please Enter Slug First',
                        },
                      ]}
                    >
                      <label>Slug</label>
                      <Input
                        name="slug"
                        placeholder="Enter Your Slug"
                        style={{ background: 'none' }}
                        onChange={selectedValue => {
                          setformData({
                            ...formData,
                            slug: selectedValue.target.value,
                          });
                        }}
                      ></Input>
                    </Form.Item>
                  </Col>
                  <Col md={8} xs={24}>
                    <Form.Item
                      name="active"
                      rules={[
                        {
                          required: true,
                          message: 'Please Select Status First',
                        },
                      ]}
                    >
                      <label>Status</label>
                      <Select
                        name="active"
                        defaultValue={'Please Select'}
                        style={{ background: 'none' }}
                        onChange={selectedValue => {
                          setformData({
                            ...formData,
                            active: selectedValue,
                          });
                        }}
                      >
                        <Option value="1">Active</Option>
                        <Option value="0">Inactive</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Editor
                    value={htmlValue}
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
                      height: 430,
                    }}
                    defaultContent={htmlValue}
                    onChange={handleHtml}
                  />
                </Form.Item>
                {/* ) : (
                  ''
                )} */}
                <p className="custmTxtQue">
                  <span>?</span>Add your custom styling HTML in the box. This will override the theme design.
                </p>
              </Form>
              <Button onClick={handleSubmit} htmlType="submit" type="success" size="default">
                {' '}
                Save
              </Button>
            </Col>
            <Col xs={12}></Col>
          </Row>
        </Cards>
      </Main>
    </>
  );
};

export default AddPages;
