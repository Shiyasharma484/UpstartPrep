import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Select, notification } from 'antd';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { BasicFormWrapper, TagInput } from '../../../styled';
import Heading from '../../../../components/heading/heading';
import { Tag } from '../../../../components/tags/tags';
// import { decrypt } from '../../../../helpers/encryption-decryption';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Cookies from 'js-cookie';
import { headers } from '../../../../helpers/variables';
import { get_api_request, api_url, put_api_request } from '../../../../helpers/Common.js';
import axios from 'axios';
import imageUploadSave from '../../../../helpers/uploadImage';
import Item from 'antd/lib/list/Item';
const { imageRender } = require('../../../../helpers/renderImage');
const { decrypt } = require('../../../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const url = domainpath + '/images/logo';
// var ModuleName = 'DASHBOARD';
const { Option } = Select;
const Profile = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const [permission, setPermission] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [Images, setImages] = useState([]);
  const [cities, setCitties] = useState();
  const [arraydatastate, setarraydatastate] = useState(null);
  const [arraydatacountry, setarraydatacountry] = useState(null);
  const [arrayDataSkills, setarrayDataSkills] = useState(null);
  const [ShowQualification, setShowQualification] = useState(false);
  const [data, setData] = useState({
    first_Name: '',
    last_Name: '',
    phone: '',
    email: '',
  });
  const [UserID, setUserID] = useState();
  const access_token = Cookies.get('access_token');
  // const headers = {
  //   'Content-Type': 'application/json; charset=UTF-8',
  //   token: 'Bearer ' + access_token,
  //   device_id: '',
  //   api_version: '',
  //   browser: '',
  //   device_type: '',
  // };
  useEffect(() => {
    const usersss = Cookies.get('UserDetail');
    const response = decrypt(usersss);
    console.log(response);

    const UserInfo = response?.sessdata?.user?.[0];
    const User_Id = response?.sessdata?.users_id_enc;
    console.log(User_Id);
    const userRoles = UserInfo?.user_role;
    if (userRoles == 'instructor') {
      setShowQualification(true);
    }
    setUserID(User_Id);
    const GetRole = UserInfo?.user_role?.toUpperCase();
    const modules = UserInfo?.permissions?.[GetRole].MODULES;

    // if (modules[ModuleName]) {
    //   setPermission(true);
    //   const value = modules[ModuleName]; //get module values
    //   const getvalue = value.split(',');
    // } else {
    //   notification.error({
    //     message: 'Permissions Not Valid',
    //   });
    // }

    // const paramsID = params.id;
    // console.log(paramsID);
    // if (paramsID) {
    //   const PostID = decodetheid(paramsID);
    async function GetUserByID(id) {
      const url = '/user/' + User_Id;
      console.log(url);
      const response = await get_api_request(url, headers);
      console.log(response);
      const user_data = response?.data?.responsedata?.users?.[0];
      const user_data_meta = response?.data?.responsedata?.users?.[0]?.meta?.profileSettings;
      if (response.status == 200) {
        if (user_data?.image) {
          var imageurl = [];
          imageurl.push(user_data?.image);
          setImages(imageurl);
        }
        console.log(user_data_meta?.skill_id);
        // var numberArray;
        // if (user_data_meta.skill_id) {
        //   numberArray = JSON.parse(user_data_meta?.skill_id);
        // }
        form.setFieldsValue({
          first_Name: user_data?.first_Name,
          last_Name: user_data?.last_Name,
          phone: user_data?.phone,
          email: user_data?.email,
          address_line1: user_data?.address_line1,
          address_line2: user_data?.address_line2,
          country: user_data?.country,
          city: user_data?.city,
          state: user_data?.state,
          postal_code: user_data?.postal_code,
          whatsapp: user_data_meta?.whatsapp,
          qualification: user_data_meta?.qualification,
          skill_id: user_data_meta?.skill_id.toString(),
        });
        setData({
          first_Name: user_data?.first_Name,
          last_Name: user_data?.last_Name,
          phone: user_data?.phone,
          email: user_data?.email,
          address_line1: user_data?.address_line1,
          address_line2: user_data?.address_line2,
          country: user_data?.country,
          city: user_data?.city,
          state: user_data?.state,
          postal_code: user_data?.postal_code,
          whatsapp: user_data_meta?.whatsapp,
          qualification: user_data_meta?.qualification,
          skill_id: user_data_meta?.skill_id.toString(),
        });
        async function GetStateByCountry(id) {
          const url = `/country/${id}/state`;
          if (response.status === 200) {
            const storesdata = response?.data?.responsedata?.states;
            storesdata?.map(item => {
              console.log(item);
              if (item.id == user_data?.state) {
                form.setFieldsValue({
                  state: item.name,
                });
              }
            });
          }
        }
        GetStateByCountry(user_data.country);

        async function GetCityByState(id) {
          const url = `/country/state/${id}/city`;
          if (response.status === 200) {
            const citydata = response.data.responsedata.cities;

            citydata?.map(item => {
              console.log(item);
              if (item.id == user_data?.city) {
                form.setFieldsValue({
                  city: item.name,
                });
              }
            });
          }
        }
        GetCityByState(user_data.state);

        async function getCountry() {
          const url = `/country/`;
          const response = await get_api_request(url, headers);
          if (response.status === 200) {
            const storetypedata = response.data.responsedata.countries;
            //setcountry(storetypedata);
            const dataArray = storetypedata.map(item => {
              if (item.id == user_data?.country) {
                form.setFieldsValue({
                  country: item.full_name,
                });
              }
              return { id: item.id, name: item.full_name };
            });
            setarraydatacountry(dataArray);
          }
        }
        getCountry();
      }
    }
    GetUserByID();

    async function getSkills() {
      const url = api_url.get_skills;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const skilldata = response.data.responsedata;
        const dataArray = skilldata.map(item => {
          return { id: item.id, name: item.skill_name };
        });
        setarrayDataSkills(dataArray);
      } else {
        console.log('error');
      }
    }
    getSkills();
  }, []);
  async function storetypeselectedToGetstore(event) {
    async function getStoresByStoreType(id) {
      const url = `/country/${id}/state`;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status === 200) {
        const storesdata = response.data.responsedata.states;
        const dataArray = storesdata.map(item => {
          return { id: item.id, name: item.name };
        });
        setarraydatastate(dataArray);
      }
    }
    getStoresByStoreType(event);
  }
  async function citynamebystate(event) {
    form.resetFields(['city']);
    console.log(event);
    const selectedValue = { id: event };
    async function getcitybystateid(id) {
      const url = `/country/state/${id}/city`;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status === 200) {
        const citidata = response.data.responsedata.cities;
        setCitties(citidata);
      }
    }
    getcitybystateid(event);
    //
  }
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
  const handleSubmit = fieldsValue => {
    async function UpdatePostById(userId) {
      const id = encrypttheid(userId);
      var payload = {};
      var meta = {};
      payload['first_Name'] = fieldsValue?.first_Name;
      payload['last_Name'] = fieldsValue?.last_Name;
      payload['phone'] = fieldsValue?.phone;
      payload['email'] = fieldsValue?.email;
      payload['address_line1'] = fieldsValue?.address_line1;
      payload['address_line2'] = fieldsValue?.address_line2;
      payload['country'] = fieldsValue?.country;
      payload['city'] = fieldsValue?.city;
      payload['postal_code'] = fieldsValue?.postal_code;
      payload['state'] = fieldsValue?.state;
      payload['image'] = imageURL;

      meta = {
        profileSettings: {
          qualification: fieldsValue?.qualification,
          skill_id: fieldsValue?.skill_id.toString(),
          whatsapp: fieldsValue?.whatsapp,
        },
      };
      payload['meta'] = meta;
      console.log(payload);
      const url = api_url.update_user_id + id;
      console.log(fieldsValue);
      const response = await put_api_request(url, payload, headers);

      if (response.status == 200) {
        notification.success({
          message: 'Data Updated successfully',
        });
      } else {
        notification.error({
          message: 'Nothing Updated',
        });
      }
    }
    UpdatePostById(UserID);
  };

  const handleCancel = e => {
    e.preventDefault();
    form.resetFields();
  };

  return (
    <div className="profile-mainDiv">
      <Cards>
        <BasicFormWrapper>
          <Form name="editProfile" form={form} onFinish={handleSubmit}>
            <Row className="profileRow">
              <Col md={24} xs={24}>
                <div className="overly-container">
                  <label for="file-input2" style={{ position: 'relative' }}>
                    <div className="addpageupload categoryEditResult ">
                      {/* {renderPictures(Images)} */}
                      {Images.length > 0 ? (
                        <img className="imgse renderCategoryEdit  " src={Images} style={{ width: '25%' }} />
                      ) : (
                        <img
                          className="imgse staticImagewid"
                          src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                          style={{ width: '18%', borderRadius: '50%' }}
                        />
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
                    onChange={e => imageHandleChange(e)}
                    id="file-input2"
                  />
                  {/* <div class="overlay">
                        <div className="text"></div>
                      </div> */}
                </div>
              </Col>
            </Row>
            <div className="addressheading">
              <h3>User Details</h3>
            </div>
            <Row className="profileRow">
              <Col md={12} xs={24}>
                <Form.Item
                  name="first_Name"
                  initialValue=""
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter first name!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item
                  name="last_Name"
                  initialValue=""
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter last name!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row className="profileRow">
              <Col md={12} xs={24}>
                <Form.Item
                  name="phone"
                  initialValue=""
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Phone Number !',
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item
                  name="whatsapp"
                  initialValue=""
                  label="Whatsapp Number"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Whatsapp Number !',
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
            </Row>
            <Row className="profileRow">
              <Col md={12} xs={24}>
                <Form.Item
                  name="email"
                  initialValue=""
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Email !',
                    },
                    {
                      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Please Enter Correct Email',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <div className="addressheading">
              <h3>Address Details</h3>
            </div>
            <Row className="profileRow">
              <Col md={12} xs={24}>
                <Form.Item
                  name="address_line1"
                  initialValue=""
                  label="Address Line 1"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Address Line 1 !',
                    },
                  ]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item
                  name="address_line2"
                  initialValue=""
                  label="Address Line 2"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Address Line 2 !',
                    },
                  ]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
            </Row>
            <Row className="profileRow">
              <Col md={12} xs={24} id="selectInProfile">
                <Form.Item
                  name="country"
                  initialValue=""
                  label="Country"
                  rules={[
                    {
                      required: true,
                      message: 'Please Select the Country First!',
                    },
                  ]}
                >
                  <Select
                    style={{ width: '100%' }}
                    arraydatacountry={arraydatacountry}
                    onChange={storetypeselectedToGetstore}
                  >
                    {arraydatacountry != null
                      ? arraydatacountry.map(item => {
                          return <Option value={item.id}>{item.name} </Option>;
                        })
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item
                  name="state"
                  initialValue=""
                  label="State"
                  rules={[
                    {
                      required: true,
                      message: 'Please Select State First !',
                    },
                  ]}
                >
                  <Select
                    style={{ width: '100%' }}
                    arraydatastate={arraydatastate}
                    onChange={selectedValue => {
                      citynamebystate(selectedValue);
                    }}
                  >
                    {arraydatastate != null
                      ? arraydatastate.map(item => {
                          return <Option value={item.id}>{item.name} </Option>;
                        })
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row className="profileRow" id="selectInProfile">
              <Col md={12} xs={24} id="selectInProfile">
                <Form.Item
                  name="city"
                  initialValue=""
                  label="City"
                  rules={[
                    {
                      required: true,
                      message: 'Please Select the City First!',
                    },
                  ]}
                >
                  <Select
                  ///defaultValue={address?.city}
                  //onChange={selectedValue => setaddress({ ...address, city: selectedValue })}
                  >
                    {cities != null
                      ? cities.map(item => {
                          return <Option value={item.id}>{item.name} </Option>;
                        })
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item
                  name="postal_code"
                  initialValue=""
                  label="Postal Code"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Postal Code !',
                    },
                  ]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
            </Row>
            {ShowQualification == true ? (
              <>
                <div className="addressheading">
                  <h3>Qualification And Skill Details</h3>
                </div>
                <Row className="profileRow">
                  <Col md={12} xs={24}>
                    <Form.Item
                      name="qualification"
                      initialValue=""
                      label="Qualification"
                      rules={[
                        {
                          required: true,
                          message: 'Please Enter Qualification !',
                        },
                      ]}
                    >
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      name="skill_id"
                      label="Skill Name"
                      rules={[
                        {
                          required: true,
                          message: 'Please Select the Skill Name First!',
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        classNamePrefix="select"
                        isSearchable={true}
                        arrayDataSkills={arrayDataSkills}
                        //onSelect={GetPosition}
                      >
                        {arrayDataSkills != null
                          ? arrayDataSkills.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                          : ''}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            ) : (
              ''
            )}

            <Row className="profileRow">
              <Col md={12} xs={24}>
                <div className="setting-form-actions">
                  <Button size="default" htmlType="submit" type="primary">
                    Update Profile
                  </Button>
                  &nbsp; &nbsp;
                  <Button size="default" onClick={handleCancel} type="light">
                    Cancel
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </BasicFormWrapper>
      </Cards>
    </div>
  );
};

export default Profile;
