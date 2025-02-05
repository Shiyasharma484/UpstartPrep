import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { AddUser } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
//import Info from './overview/info';
//import Work from './overview/work';
import { Row, Col, Form, Input, DatePicker, Select, notification, Image } from 'antd';
import moment from 'moment';
import Cookies from 'js-cookie';
import { headers } from '../../helpers/variables';
import authorizes from '../../../src/static/img/authorized.png';
import imageUploadSave from '../../helpers/uploadImage';
import { post_api_request, api_url } from '../../helpers/Common.js';
const { decrypt } = require('../../helpers/encryption-decryption');
const { imageRender } = require('../../helpers/renderImage');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const url = domainpath + '/images/storeuser';
const { TextArea } = Input;

var ModuleName = 'DASHBOARD';

const AddNew = () => {
  var Array_of_Modules = [];
  var UserRole = [];
  var currentStoreModules = [];
  var value_of_Module = [];
  var getModule = [];

  const history = useHistory(); //for redirects in page
  const [formData, setformData] = useState({});
  const [userRole, setUserRole] = useState(null);
  const [storeType, setStoreType] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [Images, setImages] = useState([]);

  var SelectedStoreID = sessionStorage.getItem('storeID'); //Get Selected Store ID
  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);
  var currectStoreID = userDetail?.currentstore?.store_id;
  var currectUserRoleID = userDetail?.currentstore?.user_role_id;
  var userStore = userDetail?.store;

  useEffect(() => {
    const enc_user_detail = Cookies.get('UserDetail');
    const currentUser = decrypt(enc_user_detail);
    console.log(currentUser);
    formData['store_type'] = currentUser?.currentUser?.store_type_id;
    if (currentUser.store[0].user_role == 'super_admin') {
      console.log('super_admin');
    }
    async function getRoleName() {
      const payload = { request: 'edit' };
      const url = api_url.admin_user_role;
      const response = await post_api_request(url, payload, headers);
      if (response.status === 200) {
        const rolesdata = response.data.responsedata.roles;
        const dataArray = rolesdata.map(item => {
          return { id: item.id, name: item.title };
        });
        setUserRole(dataArray);
      }
    }
    getRoleName();

    async function GetStoreType() {
      const payload = { request: 'all' };
      const url = api_url.store_type_all;
      const response = await post_api_request(url, payload, headers);

      if (response.status == 200) {
        const storetypedata = response?.data?.responsedata?.storetypes;
        console.log(response);
        const typeList = storetypedata?.map(item => {
          return { id: item.id, name: item.name };
        });
        setStoreType(typeList);
      }
    }
    GetStoreType();
  }, []);

  /*+++++++++++++++++++++++++++++++++ Store Modules ++++++++++++++++++++++++++++++++start */
  /*get User Role dynamicaly ----*/
  userStore?.map(item => {
    if (currectUserRoleID == item.user_role_id) {
      return (UserRole = item.user_role.toUpperCase());
    }
  });
  /*get Modules dynamicaly ---- */
  userStore?.map(item => {
    if (item.store_id == currectStoreID) {
      return (currentStoreModules = item.permissions?.[UserRole].MODULES);
    }
  });
  var Modules_key = Object.keys(currentStoreModules); // to check is modules available or not?
  Modules_key?.map((item, value) => {
    if (item == ModuleName) {
      return (getModule = item);
    }
  });

  /*----------- Make Array For All Modules------------Start */
  var modules_array = Object.entries(currentStoreModules).map(([key, value]) => ({ key, value }));
  Array_of_Modules = modules_array;
  Array_of_Modules?.map(item => {
    if (item.key == ModuleName) {
      return (value_of_Module = item.value.split(',')); // get module value
      /*  View = value_of_Module[0], */
      /*  Add = value_of_Module[1], */
      /*  Edit = value_of_Module[2], */
      /*  Delete = value_of_Module[3], */
    }
  });
  //---------------Make Array For All Modules---------------End */
  /*+++++++++++++++++++++++++++++++++++++++++ Store Modules +++++++++++++++++++++++++++++End */

  const handleChange = event => {
    // setDisable(event.target.value === '');
  };

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
    console.log(fieldsValue);
    console.log(imageURL);
    var payLoad = {};

    payLoad['address_line1'] = fieldsValue.addressone;
    payLoad['address_line2'] = fieldsValue.addresstwo;
    payLoad['password'] = fieldsValue.password;
    payLoad['description'] = fieldsValue.description;
    payLoad['city'] = fieldsValue.city;
    payLoad['country'] = fieldsValue.country;
    payLoad['date_of_birth'] = moment(fieldsValue.dob).format('YYYY-MM-DD');
    payLoad['email'] = fieldsValue.email;
    payLoad['first_name'] = fieldsValue.first_name;
    payLoad['gender'] = fieldsValue.gender;
    payLoad['image'] = imageURL;
    payLoad['last_name'] = fieldsValue.last_name;
    payLoad['nick_name'] = fieldsValue.nick_name;
    payLoad['phone'] = fieldsValue.phone;
    payLoad['role_id'] = fieldsValue.role_id;
    payLoad['state'] = fieldsValue.state;
    payLoad['active'] = fieldsValue.status;
    payLoad['store_type'] = fieldsValue.store_type;
    payLoad['postal_code'] = fieldsValue.zip;

    async function createStoreUser(postData) {
      const url = api_url.add_user;
      console.log(postData);
      const response = await post_api_request(url, postData, headers);
      if (response.status === 201) {
        notification.success({
          message: 'User Created Successfully',
        });
        setTimeout(() => {
          notification.destroy();
          history.push('../users/users');
        }, 2000);
      } else {
        notification.error({ message: 'server error' });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      }
    }
    createStoreUser(payLoad);
  };

  return (
    <>
      <PageHeader
        ghost
        title="Add Post"
        buttons={[
          <div key="2" className="page-header-actions">
            <Button onClick={() => history.push(`../users/users`)} size="small" key="5" type="primary">
              View Users List
            </Button>
          </div>,
        ]}
      />
      {getModule.length != 0 ? (
        <Main className="Adduserdemocustm">
          <Row gutter={15}>
            <Col xs={24}>
              <AddUser className="card-Title-hide">
                <Cards
                  title={
                    <div className="card-nav">
                      <ul>
                        <li>
                          <NavLink to={`#`} onClick={e => e.preventDefault()}>
                            <FeatherIcon icon="user" size={14} />
                            Post Info
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  }
                >
                  <Form
                    name="sDash_validation-form"
                    className="userAddRegister"
                    onFinish={handleSubmit}
                    onChange={handleChange}
                  >
                    {/* <h3>
                      <span className="TitleUserAdd">Personal Information</span>
                    </h3> */}

                    <Row gutter={30} className="custmblock">
                      <Col md={6} xs={24}>
                        <Form.Item
                          name="Name"
                          label="Name"
                          rules={[
                            {
                              required: true,
                              message: 'Name is required !',
                            },
                            { max: 50, message: 'Max 50 characters allowed!' },
                            {
                              pattern: /^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/,
                              message: 'Letters allowed only with space inbetween',
                            },
                          ]}
                        >
                          <Input placeholder="Name" />
                        </Form.Item>
                      </Col>

                      <Col md={6} xs={24}>
                        <Form.Item
                          name="Role"
                          label="Role"
                          rules={[
                            {
                              required: true,
                              message: 'Role is required !',
                            },
                            { max: 50, message: 'Max 50 characters allowed!' },
                            {
                              pattern: /^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/,
                              message: 'Letters allowed only with space inbetween',
                            },
                          ]}
                        >
                          <Input placeholder="Role" />
                        </Form.Item>
                      </Col>
                      {/* 
                      <Col md={6} xs={24}>
                        <Form.Item name="nick_name" label="Nick Name">
                          <Input placeholder="Nick Name" />
                        </Form.Item>
                      </Col> */}

                      <Col md={6} xs={24}>
                        <Form.Item
                          name="email"
                          label="Email Address"
                          rules={[
                            {
                              required: true,
                              message: 'Email is required !',
                            },
                          ]}
                        >
                          <Input placeholder="Email Address" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={30} className="custmblock">
                      <Col md={6} xs={24}>
                        <Form.Item
                          name="phone"
                          label="Phone"
                          type="number"
                          rules={[
                            {
                              required: true,
                              message: 'Phone number is required !',
                            },
                            { max: 10, message: 'Max 10 digits allowed!' },
                          ]}
                        >
                          <Input placeholder="Phone Number" />
                        </Form.Item>
                      </Col>

                      <Col md={6} xs={24}>
                        <Form.Item
                          name="password"
                          autoComplete="on"
                          label="Enter New Password"
                          rules={[
                            {
                              message: 'Please enter your new password',
                              required: true,
                            },
                            {
                              pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/,
                              message:
                                'Password must be minimum 8 characters, a numeric character, a special character',
                            },
                          ]}
                          hasFeedback
                        >
                          <Input />
                        </Form.Item>
                      </Col>

                      {/* <Col md={6} xs={24}>
                        <Form.Item
                          name="Cpassword"
                          autoComplete="on"
                          label="Confirm Password"
                          dependencies={['password']}
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                              },
                            }),
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col> */}
                      {/* 
                      <Col md={6} xs={24}>
                        <Form.Item
                          name="images"
                          label="Image"
                          rules={[
                            {
                              required: false,
                              message: 'Please select Store Featured Image!',
                            },
                          ]}
                        >
                          <Input name="images" type="file" onChange={e => imageHandleChange(e)} />
                          <i data-feather="image"></i>
                          <div className="result" style={{ width: '20vh' }}>
                            {renderPictures(Images)}
                          </div>
                        </Form.Item>
                      </Col> */}
                    </Row>

                    <Row gutter={30} className="custmblock">
                      {/* <Col md={9} xs={24}>
                        <Form.Item name="gender" label="Gender">
                          <Select>
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                            <Option value="Others">Others</Option>
                          </Select>
                        </Form.Item>
                      </Col> */}
                      {/* 
                      <Col md={9} xs={24}>
                        <Form.Item name="dob" label="Date Of Birth">
                          <DatePicker />
                        </Form.Item>
                      </Col> */}
                    </Row>

                    {/* <Row gutter={30} className="custmblock">
                      <Col md={12} xs={24}>
                        <Form.Item className="spaceCustmLable" name="description" label="Biography">
                          <TextArea rows={2} placeholder="Biography" />
                        </Form.Item>
                      </Col>
                    </Row> */}

                    {/* <h3>
                      <span className="TitleUserAdd">Address</span>
                    </h3> */}

                    <Row gutter={30} className="custmblock">
                      {/* <Col md={8} xs={24}>
                        <Form.Item name="addressone" label="Address Line 1">
                          <Input placeholder="Address Line 1" />
                        </Form.Item>
                      </Col> */}

                      {/* <Col md={8} xs={24}>
                        <Form.Item name="addresstwo" label="Address Line 2">
                          <Input placeholder="Address Line 2" />
                        </Form.Item>
                      </Col> */}

                      {/* <Col md={8} xs={24}>
                        <Form.Item name="zip" label="Zip/Postal Code">
                          <Input placeholder="Zip/Postal Code" />
                        </Form.Item>
                      </Col> */}
                    </Row>

                    <Row gutter={30} className="custmblock">
                      {/* <Col md={8} xs={24}>
                        <Form.Item name="city" label="City">
                          <Input placeholder="City" />
                        </Form.Item>
                      </Col> */}

                      {/* <Col md={8} xs={24}>
                        <Form.Item name="country" label="Country">
                          <Select>
                            <Option value="India">India</Option>
                            <Option value="United State">United State</Option>
                            <Option value="Afghanistan">Afghanistan</Option>
                          </Select>
                        </Form.Item>
                      </Col> */}

                      {/* <Col md={8} xs={24}>
                        <Form.Item name="state" label="State">
                          <Select>
                            <Option value="Delhi">Delhi</Option>
                            <Option value="Alaska">Alaska</Option>
                            <Option value="Kabul">Kabul</Option>
                          </Select>
                        </Form.Item>
                      </Col> */}
                    </Row>

                    {/* <h3>
                      <span className="TitleUserAdd">Others</span>
                    </h3> */}

                    <Row gutter={30} className="custmblock">
                      {/* <Col md={8} xs={24}>
                        <Form.Item
                          name="status"
                          label="Status"
                          initialValue={0}
                          rules={[
                            {
                              required: true,
                              message: 'status is required !',
                            },
                          ]}
                        >
                          <Select value={'Inactive'}>
                            <Option value={1}>Active</Option>
                            <Option value={0}>Inactive</Option>
                          </Select>
                        </Form.Item>
                      </Col> */}
                      {/* <Col md={8} xs={24}>
                        <Form.Item
                          name="store_type"
                          initialValue=""
                          label="Store Type"
                          rules={[
                            {
                              required: true,
                              message: 'Please select store_type !',
                            },
                          ]}
                        >
                          <Select style={{ width: '100%' }}>
                            {storeType != null
                              ? storeType?.map(item => {
                                  return <Option value={item.id}>{item.name} </Option>;
                                })
                              : ''}
                          </Select>
                        </Form.Item>
                      </Col> */}

                      {/* <Col md={8} xs={24}>
                        <Form.Item
                          name="role_id"
                          initialValue=""
                          label="Role"
                          rules={[
                            {
                              required: true,
                              message: 'Please select role !',
                            },
                          ]}
                        >
                          <Select
                            style={{ width: '100%' }}
                            defaultValue={{ value: formData.role_id }}
                            onChange={seletedValue => setformData({ ...formData, role_id: seletedValue })}
                            userRole={userRole}
                          >
                            {userRole != null
                              ? userRole.map(item => {
                                  return <Option value={item.id}>{item.name} </Option>;
                                })
                              : ''}
                          </Select>
                        </Form.Item>
                      </Col> */}
                    </Row>

                    <Form.Item>
                      <div className="add-user-bottom text-right">
                        <Button htmlType="submit" type="success" size="default">
                          Submit
                        </Button>
                      </div>
                    </Form.Item>
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

export default AddNew;
