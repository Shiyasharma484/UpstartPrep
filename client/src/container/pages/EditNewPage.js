import React, { useState, useEffect } from 'react';
import { Row, Col, Select, notification, Form, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Link } from 'react-router-dom';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import authorizes from '../../../src/static/img/authorized.png';
import { headers } from '../../helpers/variables';
import { Editor, EditorTools } from '@progress/kendo-react-editor';
import { get_api_request, post_api_request, put_api_request, delete_api_request, api_url } from '../../helpers/Common';
import { ModulePermissions } from '../../helpers/Common';
// import { encrypttheid } from '../../helpers/encode-decode';
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

var ModuleName = 'Pages';
var permissions = ModulePermissions(ModuleName);
var UserRole = [];
var PermissionValues = {};
//for Modules-------------end
const { TextArea } = Input;
const EditPage = () => {
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
  const [pagedata, setpagedata] = useState();
  const handleHtml = event => {
    setHtmlValue(event.html);
  };
  const [pageid, setpageid] = useState();
  const params = useParams();
  const id = params.id;
  console.log(params);
  useEffect(() => {
    async function fetchData() {
      const url = api_url.getby_slug + id;
      const response = await get_api_request(url, headers);

      const pagedata = response?.data?.responsedata[0];
      const updateid = pagedata?.id;
      setpageid(updateid);
      setHtmlValue(pagedata?.html);
      setpagedata(pagedata);
      form.setFieldsValue({
        title: pagedata?.title,
        html: pagedata?.html,
        slug: pagedata?.slug,
        active: pagedata?.enable,
      });
    }

    fetchData();
  }, []);

  const handleSubmit = async e => {
    const id = pageid;
    var payload = {};
    payload['html'] = htmlValue;
    payload['title'] = pagedata?.title;
    payload['slug'] = pagedata?.slug;
    payload['enable'] = pagedata?.active;
    console.log(payload);
    const url = api_url.updatepage_byid + id;
    const response = await put_api_request(url, payload, headers);
    if (response.status == 201) {
      notification.success({
        message: 'Page Updated Successfully',
      });
      history.push(`/dashboard/configuration/pages`);
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
            data-aos-duration="1500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="center"
          >
            <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)', textTransform: 'uppercase' }}>Edit {id}</h1>
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
              <Form name="sDash_validation-form" form={form} layout="vertical">
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
                        value={pagedata?.title}
                        onChange={selectedValue => {
                          setpagedata({
                            ...pagedata,
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
                        placeholder="Enter Your Slug"
                        style={{ background: 'none' }}
                        value={pagedata?.slug}
                        onChange={selectedValue => {
                          setpagedata({
                            ...pagedata,
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
                          message: 'Please Enter Slug First',
                        },
                      ]}
                    >
                      <label>Status</label>
                      <Select
                        value={pagedata?.enable}
                        style={{ background: 'none' }}
                        onChange={selectedValue => {
                          setpagedata({
                            ...pagedata,
                            enable: selectedValue,
                          });
                        }}
                      >
                        <Option value="0">Active</Option>
                        <Option value="1">Inactive</Option>
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
                    // className="k-icon k-i-loading"
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
                Save
              </Button>
            </Col>
            <Col xs={12}></Col>
          </Row>
        </Cards>
      </Main>
      {/* ) : (
        <div className="authorized_msg">
          <img src={authorizes} width="40%" />
        </div>
      )} */}
    </>
  );
};

export default EditPage;
