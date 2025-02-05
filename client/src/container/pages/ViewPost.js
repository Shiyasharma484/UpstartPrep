import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Select, notification, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import FeatherIcon from 'feather-icons-react';
import MailComposer from '../email/overview/MailComposer';
import { Editor, EditorTools } from '@progress/kendo-react-editor';
import Axios from 'axios';
import { AddUser } from '../../container/pages/style';
import Cookies from 'js-cookie';
import authorizes from '../../../src/static/img/authorized.png';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { headers } from '../../helpers/variables';
import {
  get_api_request,
  post_api_request,
  put_api_request,
  delete_api_request,
  api_url,
} from '../../helpers/Common.js';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
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

var ModuleName = 'POSTS';
const ViewPost = () => {
  const history = useHistory(); //redirects in pages
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const params = useParams();
  const [formData, setformData] = useState({
    description: '',
    posttitle: '',
    active: '',
  });
  const [permission, setPermission] = useState(false);
  const [data, setData] = useState();
  const [image, setImage] = useState();
  useEffect(() => {
    setformData({ active: 0 });
    if (params.id) {
      const paramsID = params.id;
      const PostID = decodetheid(paramsID);

      const enc_user_detail = Cookies.get('UserDetail');
      const response = decrypt(enc_user_detail);
      console.log(response);
      const UserInfo = response?.sessdata?.user?.[0];
      const GetRole = UserInfo?.user_role?.toUpperCase();
      const modules = UserInfo?.permissions?.[GetRole].MODULES;
      console.log(modules);

      if (modules[ModuleName]) {
        setPermission(true);
        const value = modules[ModuleName]; //get module values
        const getvalue = value.split(',');
      } else {
        notification.error({
          message: 'Permissions Not Valid',
        });
      }
      console.log(params.id);
      async function GetPostByID(id) {
        const url = api_url.get_all_posts + id;
        const response = await get_api_request(url, { headers });
        console.log(response);
        if (response.status === 200) {
          const PostData = response?.data?.responsedata?.posts[0];
          setData(PostData.description);
          setImage(domainpath + PostData.images);
          form.setFieldsValue({
            posttitle: PostData.title,
            active: PostData.active,
            description: PostData.description,
          });
          // setData(userdata);
        }
      }
      GetPostByID(PostID);
    }
  }, []);

  return (
    <>
      <PageHeader
        className="ProTabsHead"
        ghost
        title="View Post"
        buttons={[
          <div className="ProTabsBtn">
            <div key="1" className="page-header-actions">
              <Button
                onClick={() => {
                  history.push('/dashboard/users/post-list');
                }}
                size="small"
                key="4"
                type="primary"
              >
                <FeatherIcon icon="eye" size={14} />
                View Post List
              </Button>
            </div>
          </div>,
        ]}
      />

      {permission == true ? (
        <Main>
          <Row gutter={15}>
            <Col xs={24}>
              <AddUser>
                <Cards>
                  <Form
                    name="sDash_validation-form"
                    form={form}
                    layout="vertical"
                    //onFinish={handleSubmit}
                    // onChange={handleChange}
                  >
                    <Row gutter={30}>
                      <Col md={12} xs={24}>
                        <Form.Item
                          label="Post Title"
                          name="posttitle"
                          rules={[
                            {
                              required: true,
                              message: 'Post Title is required !',
                            },
                          ]}
                        >
                          <Input type="text" placeholder="Job Title" readOnly />
                        </Form.Item>
                      </Col>
                      <Col md={12} xs={24}>
                        <Form.Item
                          name="active"
                          label="Status"
                          rules={[
                            {
                              required: true,
                              message: 'Status is required !',
                            },
                          ]}
                        >
                          <Select style={{ width: '100%' }} defaultValue={0} disabled>
                            <Option value={0}>Draft</Option>
                            <Option value={1}>Published</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>

                    <div className="addpost-upload">
                      <div className="addpost-render">
                        <Input className="postimg" name="images" type="file" onChange={e => imageHandleChange(e)} />

                        <i data-feather="image"></i>
                        <div className="result" style={{ width: '20vh' }}>
                          <img src={image} />
                        </div>
                      </div>
                    </div>
                    <Row gutter={30}>
                      <Col md={24} xs={24}>
                        <Form.Item label="Post Description">
                          <Form.Item
                            name="description"
                            rules={[
                              {
                                required: false,
                                message: 'Please enter description !',
                              },
                            ]}
                          >
                            {/* <TextArea rows={2} readOnly /> */}

                            <Editor
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
                              disabled
                              defaultContent={data}
                            />
                          </Form.Item>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Cards>
              </AddUser>
            </Col>
          </Row>
        </Main>
      ) : (
        <div className="authorized_msg">
          <img src={authorizes} width="40%" />
        </div>
      )}
    </>
  );
};

export default ViewPost;
