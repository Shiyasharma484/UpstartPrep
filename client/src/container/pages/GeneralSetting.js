import React, { useEffect, useState } from 'react';
import { Row, Col, Form, notification, Input, Button, Select, Switch } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { AddUser } from './style';
import Cookies from 'js-cookie';
import { Main } from '../styled';
import 'moment/locale/zh-cn';
import { Cards } from '../../components/cards/frame/cards-frame';
import { get_api_request, post_api_request, put_api_request, api_url } from '../../helpers/Common';
import { headers } from '../../helpers/variables';
import TextArea from 'antd/lib/input/TextArea';
// import { encrypttheid } from '../../helpers/encode-decode';
import StaticImage from './../../static/img/video-lessons.png';
import imageUploadSave from '../../helpers/uploadImage';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const url = domainpath + '/attachment/upload/image';
const { imageRender } = require('../../helpers/renderImage');
const { decrypt } = require('../../helpers/encryption-decryption');

const GeneralSetting = () => {
  const [form] = Form.useForm();
  const [Images, setImages] = useState([]);
  const [logos, setlogos] = useState([]);
  const [Image, setImage] = useState([]);
  const [imageURL, setImageURL] = useState(null);
  const [imageURL3, setImageURL3] = useState(null);
  const [imageURL1, setImageURL1] = useState(null);
  const [Enabled, setEnabled] = useState();

  const [formData, setformData] = useState({
    site_name: '',
    tag_line: '',
    description: '',
    active: '',
  });
  useEffect(() => {
    async function getconfig() {
      const url = api_url.get_config;
      const response = await get_api_request(url, headers);

      const configdata = response?.data?.responsedata?.configurations?.[0];
      setEnabled(configdata?.site_active);
      setImages(configdata?.site_logo);
      setlogos(configdata?.site_logo_white);
      setImage(configdata?.site_favicon);
      form.setFieldsValue({
        description: configdata?.site_description,
        tag_line: configdata?.site_tagline,
        site_name: configdata?.site_name,
        active: configdata?.site_active,
      });
      setformData({
        description: configdata?.site_description,
        tag_line: configdata?.site_tagline,
        site_name: configdata?.site_name,
        active: configdata?.site_active,
      });
    }
    getconfig();
  }, []);

  const imageHandleChange = async e => {
    console.log(e);
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

  const imageHandleChange1 = async e => {
    console.log(e);
    var vfiles;
    vfiles = e.target.files;
    var singleimages = imageRender(vfiles);

    setlogos(singleimages);
    await imageUploadSave(vfiles, url)
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

  const imageHandleChange3 = async e => {
    console.log(e);
    var vfiless;
    vfiless = e.target.files;
    var singleimagess = imageRender(vfiless);

    setImage(singleimagess);
    await imageUploadSave(vfiless, url)
      .then(resp => {
        console.log(resp);
        setImageURL3(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };

  const addDetails = fieldsvalue => {
    // console.log(imageURL);
    var Active;
    console.log(formData);
    if (formData?.active == true) {
      Active = 1;
    } else {
      Active = 0;
    }
    var payload = {
      site_name: formData?.site_name,
      site_tagline: formData?.tag_line,
      site_description: formData?.description,
      site_active: Active,
      site_logo: imageURL,
      site_logo_white: imageURL1,
      site_favicon: imageURL3,
    };
    console.log(formData);
    async function Updateconfig() {
      const url = api_url.get_config;
      const response = await put_api_request(url, payload, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: 'General Settings Updated Successfully',
        });
      } else {
        notification.error({
          message: response.status,
        });
      }
    }
    Updateconfig();
    console.log(payload);
  };
  const Savelogo = () => {
    console.log(imageURL);
  };

  return (
    <>
      <PageHeader ghost title="General Settings" />
      <Main>
        <Row gutter={30}>
          <Col md={4} style={{ textAlign: 'right' }}>
            <h3>Site Settings</h3>
          </Col>
          <Col md={20}>
            <Cards>
              <Form
                name="sDash_validation-form GeneralsettingsForm"
                //className="AddForm contactForm"
                form={form}
                layout="vertical"
                //onFinish={addDetails}
              >
                <Row gutter={30} className="togglefield settingsform ">
                  <Col md={16} xs={24} className="mb-space">
                    <Form.Item name="site_name" label="Site Name">
                      <Input
                        name="site_name"
                        type="text"
                        onChange={e => setformData({ ...formData, site_name: e.target.value })}
                      ></Input>
                    </Form.Item>
                  </Col>
                  <Col md={16} xs={24} className="mb-space">
                    <Form.Item name="tag_line" label="Tag Line">
                      <Input
                        name="tagline"
                        type="text"
                        onChange={e => setformData({ ...formData, tag_line: e.target.value })}
                      ></Input>
                    </Form.Item>
                  </Col>
                  <Col md={16} xs={24} className="mb-space">
                    <Form.Item name="description" label="SEO Description">
                      <TextArea
                        style={{ height: '150px' }}
                        onChange={e => setformData({ ...formData, description: e.target.value })}
                      />
                    </Form.Item>
                  </Col>
                  <Col md={16} xs={24} className="togglefield settingsToggle">
                    <div className="settingToggle">
                      {/* {console.log(formData.active)} */}
                      <Form.Item name="active" initialValue="" label="Enable User Registration">
                        {formData?.active == '1' ? <p>Enabled</p> : formData?.active == '0' ? <p>Disabled</p> : ''}
                      </Form.Item>

                      <Switch
                        className="switchToggles"
                        onChange={e => setformData({ ...formData, active: e })}
                        checked={formData?.active}
                      ></Switch>
                      {/* //checked={editASwitch} onChange={() => seteditASwitch(!editASwitch)} */}
                    </div>
                  </Col>
                </Row>
                <Row gutter={30}>
                  <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                    <Button htmlType="submit" type="success" size="default" onClick={addDetails}>
                      Save
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Cards>
          </Col>
        </Row>

        <Row gutter={30} className="mtop">
          <Col md={4} style={{ textAlign: 'right' }}>
            <h3>Site Logo</h3>
          </Col>
          <Col md={20}>
            <Cards>
              <Form
                name="sDash_validation-form GeneralsettingsForm"
                //className="AddForm contactForm"
                Form={form}
                layout="vertical"
                onFinish={addDetails}
              >
                <Row gutter={30} className="togglefield settingsform">
                  <Col md={24} xs={24} className="imageoverlay1">
                    <Form.Item
                      name="image"
                      // label="Featured Image"
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
                            {Images.length > 0 ? (
                              <img
                                className="imgse renderCategoryEdit  "
                                src={Images}
                                // defaultValue={domainpath + logo}
                                style={{ width: 'auto', height: '200px' }}
                              />
                            ) : (
                              <img className="imgse staticImagewid" src={StaticImage} />
                            )}
                          </div>
                          {/* <div class="overlaytext">
                          <div class="text">Change Image</div>
                        </div> */}
                        </label>
                        <Input
                          style={{ opacity: '0', height: '50%' }}
                          name="image"
                          label="Image"
                          type="file"
                          // datafield={image + '-' + i}
                          onChange={e => imageHandleChange(e)}
                          id="file-input2"
                        />
                        {/* <div class="overlay">
                          <div className="text"></div>
                        </div> */}
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={30}>
                  <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                    <Button htmlType="submit" type="success" size="default">
                      Save
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Cards>
          </Col>
        </Row>
        <Row gutter={30} className="mtop">
          <Col md={4} style={{ textAlign: 'right' }}>
            <h3>Site White Logo</h3>
          </Col>
          <Col md={20}>
            <Cards>
              <Form
                name="sDash_validation-form GeneralsettingsForm"
                //className="AddForm contactForm"
                Form={form}
                layout="vertical"
                onFinish={addDetails}
              >
                <Row gutter={30} className="togglefield settingsform">
                  <Col md={24} xs={24} className="imageoverlay2">
                    <Form.Item
                      name="images"
                      // label="Featured Image"
                      rules={[
                        {
                          required: false,
                          message: 'Please select Store Featured Image!',
                        },
                      ]}
                    >
                      <div className="overly-container">
                        <label for="file-input" style={{ position: 'relative' }}>
                          <div className="addpageupload categoryEditResult ">
                            {/* {renderPictures(Images)} */}
                            {logos.length > 0 ? (
                              <img
                                className="imgse renderCategoryEdit "
                                src={logos}
                                // defaultValue={domainpath + logoWhite}
                                style={{ width: 'auto', height: '200px' }}
                              />
                            ) : (
                              <img className="imgse staticImagewid" src={StaticImage} />
                            )}
                          </div>
                          {/* <div class="overlaytext">
                          <div class="text">Change Image</div>
                        </div> */}
                        </label>

                        <Input
                          style={{ opacity: '0', height: '50%' }}
                          name="images"
                          label="Site White Logo"
                          type="file"
                          // datafield={image + '-' + i}
                          onChange={e => imageHandleChange1(e)}
                          id="file-input"
                        />
                        {/* <div class="overlay">
                          <div className="text"></div>
                        </div> */}
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={30}>
                  <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                    <Button htmlType="submit" type="success" size="default">
                      Save
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Cards>
          </Col>
        </Row>

        <Row gutter={30} className="mtop">
          <Col md={4} style={{ textAlign: 'right' }}>
            <h3>Site Favicon</h3>
          </Col>
          <Col md={20}>
            <Cards>
              <Form
                name="sDash_validation-form GeneralsettingsForm"
                //className="AddForm contactForm"
                Form={form}
                layout="vertical"
                onFinish={addDetails}
              >
                <Row gutter={30} className="togglefield settingsform">
                  <Col md={24} xs={24} className="imageoverlay3">
                    <Form.Item
                      name="imagess"
                      // label="Featured Image"
                      rules={[
                        {
                          required: false,
                          message: 'Please select Store Featured Image!',
                        },
                      ]}
                    >
                      <div className="overly-container">
                        <label for="file-input3" style={{ position: 'relative' }}>
                          <div className="addpageupload categoryEditResult ">
                            {/* {renderPictures(Images)} */}
                            {Image.length > 0 ? (
                              <img
                                className="imgse renderCategoryEdits  "
                                src={Image}
                                //defaultValue={domainpath + siteFavicon}
                                style={{ width: 'auto', height: '200px' }}
                              />
                            ) : (
                              <img className="imgse staticImagewid" src={StaticImage} />
                            )}
                          </div>
                          {/* <div class="overlaytext">
                            <div class="text">Change Image</div>
                          </div> */}
                        </label>
                        <Input
                          style={{ opacity: '0', height: '50%' }}
                          name="favicon"
                          label="Favicon"
                          type="file"
                          // datafield={image + '-' + i}
                          onChange={e => imageHandleChange3(e)}
                          id="file-input3"
                        />
                        {/* <div class="overlay">
                          <div className="text"></div>
                        </div> */}
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={30}>
                  <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                    <Button htmlType="submit" type="success" size="default">
                      Save
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default GeneralSetting;
