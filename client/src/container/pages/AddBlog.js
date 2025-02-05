import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Row, Input, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useHistory } from 'react-router-dom';
import { headers } from '../../helpers/variables';
import { Main } from '../styled';
import { Button } from '../../components/buttons/buttons';
import DataTable from 'react-data-table-component';
import StaticImage from './../../static/img/video-lessons.png';
import DataTableExtensions from 'react-data-table-component-extensions';
import Cookies from 'js-cookie';
import {
  get_api_request,
  post_api_request,
  put_api_request,
  delete_api_request,
  api_url,
} from '../../helpers/Common.js';
import imageUploadSave from '../../helpers/uploadImage';
import { Editor, EditorTools } from '@progress/kendo-react-editor';
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
const { imageRender } = require('../../helpers/renderImage');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const Blog1 = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [ShowAttachment, setShowAttachment] = useState(false);
  const [ASwitch, setASwitch] = useState(false);
  const [imageURL1, setImageURL1] = useState(null);
  const [Images1, setImages1] = useState([]);
  const [Render, setRender] = useState(0);
  const [formData, setformData] = useState({
    html: '',
  });
  const [FormData, setFormData] = useState([]);
  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);
  var userId = userDetail?.sessdata?.users_id_enc;
  console.log(userId);

  useEffect(() => {
    async function GetAllBlogs() {
      const url = api_url.get_all_Blogs;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const blogdata = response?.data?.responsedata;
        setData(blogdata);
      } else {
        console.log('error');
      }
    }
    GetAllBlogs();
  }, [Render]);

  const imageHandleChange1 = async e => {
    console.log(e);
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);

    setImages1(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        console.log(resp);
        setImageURL1(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };
  /**IMAGE SECTION=========================================================STARTS **/
  const [Images, setImages] = useState([]);
  const url = domainpath + '/images/post';
  const imageHandleChange = async e => {
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);
    // setImages(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        var image = `<br /><img src=${domainpath +
          resp[0]} contenteditable="false" draggable="true" width="200px"></img>`;

        setformData({ ...formData, html: formData?.html + image });
        setShowAttachment(false);
        // setImageURL(resp[0]);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
        console.log(error);
      });
  };
  const renderPictures = source => {
    return source.map(pictures => {
      return <Image src={pictures} key={pictures} />;
    });
  };

  const HandleImageWithInput = url => {
    console.log(url);
  };
  /**IMAGE SECTION=========================================================ENDS **/

  const AddBlog = Fieldsvalue => {
    var Payload = {};
    var activeswicth;
    if (ASwitch == true) {
      activeswicth = 1;
    } else {
      activeswicth = 0;
    }
    Payload['user_id'] = userId;
    Payload['title'] = Fieldsvalue?.title;
    Payload['html'] = formData?.html;
    Payload['active'] = activeswicth;
    Payload['slug'] = Fieldsvalue?.slug;
    Payload['featured_image'] = imageURL1;
    console.log(Payload);
    async function AddBlogs(data) {
      const url = api_url.create_blogs;
      const response = await post_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.responsedata,
        });
        setTimeout(() => {
          history.push(`./blog`);
        }, 1000);
        // history.push('../users/customer-list');
      } else
        notification.error({
          message: 'Server Error',
        });
    }
    AddBlogs(Payload);
  };

  return (
    <>
      <Main className="AddBlogPage">
        <div className="AddBlogPage-inner">
          <h3>Add Blog</h3>
        </div>

        <Form name="sDash_validation-form" className="AddBlogForm" form={form} layout="vertical" onFinish={AddBlog}>
          <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
            <Col md={24} xs={24}>
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Title ',
                  },
                ]}
              >
                <Input name="" placeholder="Title " />
              </Form.Item>
            </Col>
            {ShowAttachment == true ? (
              <div className="modal-details-fade que-instert-img">
                <div className="modal-details">
                  <FeatherIcon className="closemodal" icon="x" onClick={() => setShowAttachment(false)} />
                  <h3>Insert Image</h3>
                  <div style={{ borderBottom: '1px solid #d2d2d2', margin: '12px 0 20px 0' }}></div>
                  <Col md={24} xs={24}>
                    <Form.Item
                      label="Image"
                      rules={[
                        {
                          required: false,
                          message: 'Please select Store Featured Image!',
                        },
                      ]}
                    >
                      <Input name="images" type="file" onChange={e => imageHandleChange(e)} />
                      {/* <div className="checkURL">
                                  <Input placeholder="Image URL" /> <FeatherIcon icon="check-circle" />
                                  <i data-feather="image"></i>
                                </div> */}
                    </Form.Item>
                  </Col>
                </div>
              </div>
            ) : (
              ''
            )}
            <Col md={24} xs={24}>
              <Form.Item name="html" label="Description">
                <div className="gallerydescription">
                  <button
                    title="Insert image"
                    type="button"
                    class="k-button k-button-md k-button-solid k-button-solid-base k-rounded-md k-icon-button k-group-end"
                    tabindex="-1"
                    onClick={() => setShowAttachment(!ShowAttachment)}
                  >
                    <span role="presentation" class="k-button-icon k-icon k-i-image"></span>
                  </button>
                </div>
                <div className="result qst-render-image" style={{ width: '20vh' }}>
                  {renderPictures(Images)}
                </div>
                <Editor
                  name="html"
                  id="question-editor"
                  value={formData.html}
                  className="question-editor"
                  tools={[
                    [Bold, Italic, Underline, Strikethrough],
                    [Subscript, Superscript],
                    [OrderedList, UnorderedList],
                    [InsertTable, InsertImage],
                  ]}
                  contentStyle={{
                    height: 430,
                  }}
                  onChange={selectedValue => {
                    // setformData({ ...formData, description: selectedValue.html.replace(/(<([^>]+)>)/gi, '') });
                    setformData({ ...formData, html: selectedValue.html });
                  }}
                />
              </Form.Item>
            </Col>
            <Col md={24} xs={24}>
              <Form.Item
                name="featured_image"
                label="Image"
                rules={[
                  {
                    required: false,
                    message: 'Please select Store Featured Image!',
                  },
                ]}
              >
                <div className="overly-container">
                  <label for="file-input2" style={{ position: 'relative' }}>
                    <div className="addpageupload categoryEditResult ">
                      {/* {renderPictures(Images)} */}
                      {Images1.length > 0 ? (
                        <img className="imgse renderCategoryEdit  " src={Images1} style={{ width: '35%' }} />
                      ) : (
                        <img className="imgse staticImagewid" src={StaticImage} />
                      )}
                    </div>
                    {/* <div class="overlaytext">
                          <div class="text">Change Image</div>
                        </div> */}
                  </label>
                  <Input
                    style={{ opacity: '0', height: '25%' }}
                    name="image"
                    label="Image"
                    type="file"
                    // datafield={image + '-' + i}
                    onChange={e => imageHandleChange1(e)}
                    id="file-input2"
                  />
                  {/* <div class="overlay">
                        <div className="text"></div>
                      </div> */}
                </div>
              </Form.Item>
            </Col>
            <Col md={24} xs={24}>
              <Form.Item
                name="slug"
                label="Slug"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Slug ',
                  },
                ]}
              >
                <Input name="" placeholder="Slug " />
              </Form.Item>
            </Col>
            <div className="togglefield">
              <Col md={24} xs={24}>
                <Form.Item
                  name="active"
                  initialValue=""
                  label="Active"
                  rules={[
                    {
                      required: false,
                      message: 'Please Enter Status !',
                    },
                    {
                      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Please Enter Correct Email',
                    },
                  ]}
                >
                  <p name="">Active (Shown Everywhere). In-active (Hidden Everywhere).</p>
                </Form.Item>
              </Col>
              <div className="switchToggle">
                <Switch onChange={() => setASwitch(!ASwitch)} />
              </div>
            </div>
          </Row>
          <Row gutter={30} className="Addgroupbtn">
            <Col md={24} xs={24}>
              <Form.Item>
                <Button htmlType="submit">Add</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Main>
    </>
  );
};

export default Blog1;
