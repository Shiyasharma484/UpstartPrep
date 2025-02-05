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
import { headers } from '../../helpers/variables';
import { get_api_request, post_api_request, api_url } from '../../helpers/Common';
import { imageRender } from '../../helpers/renderImage';
import imageUploadSave from '../../helpers/uploadImage';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { decodetheid } = require('../../helpers/encode-decode');
const { decrypt } = require('../../helpers/encryption-decryption');
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
const AddPost = () => {
  const history = useHistory(); //redirects in pages
  const [form] = Form.useForm();

  const [formData, setformData] = useState({
    description: '',
    name: '',
    active: '',
  });
  const [permission, setPermission] = useState(false);
  const [userID, setUserID] = useState();
  const [imageURL, setImageURL] = useState(null);
  const [Images, setImages] = useState([]);
  useEffect(() => {
    setformData({ active: 0 });

    const enc_user_detail = Cookies.get('UserDetail');
    const response = decrypt(enc_user_detail);
    if (response.login == true) {
      const getuserID = response?.sessdata?.users_id;
      const decriptedID = decodetheid(getuserID);
      setUserID(decriptedID);
      const UserInfo = response?.sessdata?.user?.[0];
      const GetRole = UserInfo?.user_role?.toUpperCase();
      const modules = UserInfo?.permissions?.[GetRole].MODULES;

      if (modules[ModuleName]) {
        setPermission(true);
        const value = modules[ModuleName]; //get module values
        const getvalue = value.split(',');
      } else {
        notification.error({
          message: 'No Authorised',
        });
      }
    } else {
      notification.error({
        message: 'Server Error',
      });
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
        setImageURL(resp[0]);
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

  const handleSubmit = () => {
    // alert('Post added successfully');
    var payload = {};
    payload['user_id'] = userID;
    payload['title'] = formData.name;
    payload['description'] = formData.description;
    payload['active'] = formData.active;
    payload['images'] = imageURL;
    async function CreatePost(data) {
      const url = api_url.create_post;
      const response = await post_api_request(url, data, { headers });
      if (response.status == 200) {
        // console.log(response);
        notification.success({
          message: 'Success',
        });
        setTimeout(() => {
          history.push('../users/post-list');
        }, 1000);
      } else {
        notification.error({
          message: 'Server Error',
        });
      }
    }
    CreatePost(payload);
  };

  return (
    <>
      <PageHeader
        className="ProTabsHead"
        ghost
        title="Add Post"
        buttons={[
          <div className="ProTabsBtn">
            <div key="1" className="page-header-actions">
              <Button
                onClick={() => {
                  history.push('/dashboard/users/post-list');
                }}
                size="small"
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
            <Row gutter={30}>
              <Col md={12} xs={24}>
                <Form.Item
                  label="Post Title"
                  name="name"
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
                    onChange={e => setformData({ ...formData, name: e.target.value })}
                  />
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
                  <Select
                    style={{ width: '100%' }}
                    defaultValue={0}
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
                    rules={[
                      {
                        required: true,
                        message: 'Please enter description !',
                      },
                    ]}
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
                      // defaultContent={htmlValue}
                      //onChange={handleHtml}
                      onChange={e => setformData({ ...formData, description: e.html })}
                    />
                  </Form.Item>
                </Form.Item>
              </Col>
            </Row>
            <div className="add-user-bottom text-right">
              <Button type="success" size="default" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
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

export default AddPost;
