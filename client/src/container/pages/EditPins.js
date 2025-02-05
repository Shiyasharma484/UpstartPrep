import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Select, notification, Input, Image } from 'antd';
import { useHistory } from 'react-router-dom';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import FeatherIcon from 'feather-icons-react';
import { Editor, EditorTools } from '@progress/kendo-react-editor';
import Cookies from 'js-cookie';
import authorizes from '../../../src/static/img/authorized.png';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { get_api_request, api_url, put_api_request, post_api_request } from '../../helpers/Common.js';
import { headers } from '../../helpers/variables';
import { imageRender } from '../../helpers/renderImage';
import imageUploadSave from '../../helpers/uploadImage';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { decrypt } = require('../../helpers/encryption-decryption');
const { decodetheid } = require('../../helpers/encode-decode');
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
const EditPost = () => {
  const history = useHistory(); //redirects in pages
  const [form] = Form.useForm();
  const params = useParams();
  const { TextArea } = Input;
  const [formData, setformData] = useState({
    description: '',
    title: '',
    active: '',
  });
  const [permission, setPermission] = useState(false);
  const [UserID, setUserID] = useState();
  const [imageURL, setImageURL] = useState(null);
  const [Images, setImages] = useState([]);
  const [Images1, setImages1] = useState([]);
  const [htmlValue, setHtmlValue] = useState();
  useEffect(() => {
    if (params.id) {
      const paramsID = params.id;
      const PostID = decodetheid(paramsID);
      const enc_user_detail = Cookies.get('UserDetail');
      const response = decrypt(enc_user_detail);
      const UserInfo = response?.sessdata?.user?.[0];
      const GetRole = UserInfo?.user_role?.toUpperCase();
      const modules = UserInfo?.permissions?.[GetRole].MODULES;

      if (modules[ModuleName]) {
        setPermission(true);
        const value = modules[ModuleName]; //get module values
        const getvalue = value.split(',');
      } else {
        notification.error({
          message: 'Permissions Not Valid',
        });
      }
      async function GetPostByID(id) {
        const url = api_url.get_all_posts + id;
        const response = await get_api_request(url, { headers });
        const userID = response?.data?.responsedata?.posts?.[0]?.user_id;
        setUserID(userID);
        if (response.status === 200) {
          const PostData = response?.data?.responsedata?.posts[0];
          if (PostData.active == 1) {
            form.setFieldsValue({
              active: 'Published',
            });
          } else {
            form.setFieldsValue({
              active: 'Draft',
            });
          }
          setHtmlValue(PostData.description);
          form.setFieldsValue({
            title: PostData.title,
          });
          const image = [domainpath + PostData.images];
          setImages(image);
          setImageURL(PostData.images);
          setformData({
            title: PostData.title,
            active: PostData.active,
            description: PostData.description,
          });
        }
      }
      GetPostByID(PostID);
    }
  }, []);

  const url = domainpath + '/images/post';
  const imageHandleChange = async e => {
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);

    setImages(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        console.log(resp);
        setImageURL(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };
  const renderPictures = source => {
    return source.map(pictures => {
      return <Image src={pictures} key={pictures} />;
    });
  };

  const handleSubmit = fieldsValue => {
    const paramsID = params.id;
    const PostID = decodetheid(paramsID);

    var payload = {};
    payload['user_id'] = UserID;
    payload['title'] = formData.title;
    payload['active'] = formData.active;
    payload['description'] = formData.description;
    payload['images'] = imageURL;
    if (formData.description == 'undefined') {
      notification.error({
        message: 'Please Fill Description',
      });
    } else {
      if (formData.active == 1) {
        async function CreatePost(data) {
          data['id'] = PostID;
          const url = api_url.create_post;
          console.log(data);
          const response = await post_api_request(url, data, { headers });
          if (response.status == 200) {
            // console.log(response);
            notification.success({
              message: 'Success',
            });
            setTimeout(() => {
              history.push('../post-list');
            }, 1000);
          } else {
            notification.error({
              message: 'Server Error',
            });
          }
        }
        CreatePost(payload);
      } else {
        async function UpdatePostById(id) {
          const url = api_url.get_all_posts + id;
          const response = await put_api_request(url, payload, { headers });
          if (response.status == 200) {
            notification.success({
              message: 'Data Updated successfully',
            });
            setTimeout(() => {
              history.push('../post-list');
            }, 1000);
          } else {
            notification.error({
              message: 'Nothing Updated',
            });
          }
        }
        UpdatePostById(PostID);
      }
    }
  };
  return (
    <>
      <PageHeader
        className="ProTabsHead"
        ghost
        title="Edit Post"
        buttons={[
          <div className="ProTabsBtn">
            <div key="1" className="page-header-actions">
              <Button
                onClick={() => {
                  history.push('../post-list');
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
        <Main className="removeCardSpace">
          <Cards>
            <Form
              name="sDash_validation-form"
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              // onChange={handleChange}
            >
              <Row gutter={30}>
                <Col md={12} xs={24}>
                  <Form.Item
                    label="Post Title"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: 'Post Title is required !',
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="Job Title"
                      onChange={e => setformData({ ...formData, title: e.target.value })}
                    />
                  </Form.Item>
                </Col>
                <Col md={12} xs={24}>
                  <Form.Item name="active" label="Status">
                    <Select
                      style={{ width: '100%' }}
                      onChange={selectedValue => {
                        setformData({ ...formData, active: selectedValue });
                      }}
                    >
                      <Option value={0}>Draft</Option>
                      <Option value={1}>Published</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col md={24} xs={24}>
                  <Form.Item label="Post Description">
                    <Form.Item
                      name="description"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Please enter description !',
                      //   },
                      // ]}
                    >
                      <div className="addpost-upload">
                        <div className="addpost-render">
                          <Input className="postimg" name="images" type="file" onChange={e => imageHandleChange(e)} />

                          <i data-feather="image"></i>
                          <div className="result" style={{ width: '20vh' }}>
                            {renderPictures(Images)}
                          </div>
                        </div>
                      </div>
                      {htmlValue ? (
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
                          defaultContent={htmlValue}
                          required
                          //onChange={handleHtml}
                          onChange={e => setformData({ ...formData, description: e.html })}
                        />
                      ) : (
                        ''
                      )}
                    </Form.Item>
                  </Form.Item>
                </Col>
              </Row>
              <div className="add-user-bottom text-right">
                <Button htmlType="submit" type="success" size="default">
                  Submit
                </Button>
              </div>
            </Form>
          </Cards>
        </Main>
      ) : (
        <div className="authorized_msg">
          <img src={authorizes} width="40%" />
        </div>
      )}
    </>
  );
};
export default EditPost;
