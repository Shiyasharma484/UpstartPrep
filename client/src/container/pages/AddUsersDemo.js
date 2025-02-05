import React, { lazy, Suspense, useState, useEffect } from 'react';
import Axios from 'axios';
import { Switch, Route, NavLink, useHistory } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import { AddUser } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import imageUploadSave from '../../helpers/uploadImage';
// import Info from './overview/info';
// import Work from './overview/work';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Input, DatePicker, Select, Radio, InputNumber, notification, Image } from 'antd';

import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/locale/zh_CN';
import Cookies from 'js-cookie';
const { encrypt, decrypt } = require('../../helpers/encryption-decryption');
import { headers } from '../../helpers/variables';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const { TextArea } = Input;

// var    = 'ADDNEWSTOREUSER';
const AddUsersDemo = () => {
  const history = useHistory(); //for redirects in page

  const [formData, setformData] = useState({
    //   image: '',
    //   role_id: '',
    //   first_name: '',
    //   last_name: '',
    //   gender: '',
    //   date_of_birth: '',
    //   email: '',
    //   phone: '',
    //   password: '',
    //   postal_code: '',
    //   address_line1: '',
    //   address_line2: '',
    //   city: '',
    //   state: '',
    //   country: '',
    //   active: '',
  });

  const handleChange = event => {
    // setDisable(event.target.value === '');
  };
  const [arraydataroles, setarraydataroles] = useState(null);
  const { imageRender } = require('../../helpers/renderImage');
  const [simpleProductImages, setSimpleProductImagesImages] = useState([]);
  const handleSubmit = fieldsValue => {
    console.log(fieldsValue);
    var payLoad = {};

    payLoad['address_line1'] = fieldsValue.address_line1;
    payLoad['address_line2'] = fieldsValue.address_line2;
    payLoad['password'] = fieldsValue.password;
    payLoad['description'] = fieldsValue.description;
    payLoad['city'] = fieldsValue.city;
    payLoad['country'] = fieldsValue.country;
    payLoad['date_of_birth'] = fieldsValue.date_of_birth;
    payLoad['email'] = fieldsValue.email;
    payLoad['first_name'] = fieldsValue.first_name;
    payLoad['gender'] = fieldsValue.gender;
    payLoad['image'] = fieldsValue.image;
    payLoad['last_name'] = fieldsValue.last_name;
    payLoad['nick_name'] = fieldsValue.nick_name;
    payLoad['phone'] = fieldsValue.phone;
    payLoad['role_id'] = fieldsValue.role_id;
    payLoad['state'] = fieldsValue.state;
    payLoad['active'] = fieldsValue.active;
    payLoad['store_type'] = fieldsValue.store_type;
    payLoad['postal_code'] = fieldsValue.postal_code;

    console.log(payLoad);

    async function createStoreUser(postData) {
      postData['store_type'] = '4'; //reason -- bcz super admin will make users for dashboard only on this page
      console.log(postData);

      await Axios.post(domainpath + '/user/', postData, { headers })
        .then(response => {
          //console.log(domainpath);
          console.log(response);
          //console.log(response.status);
          //console.log('resp bckkkkkkkkkkkkkkkkkkkkkkkk');
          if (response.status === 201) {
            console.log('AC');
            notification.success({
              message: 'User Created Successfully',
            });
            setTimeout(() => {
              notification.destroy();
              history.push('../users/users');
            }, 2000);
          } else {
            notification.error({ message: 'Server error' });
            setTimeout(() => {
              notification.destroy();
            }, 2000);
          }
        })
        .catch(error => {
          console.log(error);
          notification.error({
            message: error.response.data.message,
          });
        });
    }
    createStoreUser(payLoad);
  };
  //======================================================================================================
  useEffect(() => {
    const enc_user_detail = Cookies.get('UserDetail');
    const currentUser = decrypt(enc_user_detail);
    console.log(currentUser);
    //  formData['store_id'] = currentUser?.currentUser?.store_id;
    formData['store_type'] = currentUser?.currentUser?.store_type_id;
    // if (formData.store_id > 0) {
    //   console.log('loggedin store type');
    // } else
    if (currentUser.store[0].user_role == 'super_admin') {
      console.log('super_admin');
    }
    async function getRoleName() {
      const payload = { request: 'edit' };
      await Axios.post(domainpath + '/role/admin/user/', payload, { headers }).then(response => {
        console.log(response);
        if (response.status === 200) {
          const rolesdata = response.data.responsedata.roles;

          //make array of names of store types+++++++++++++++++
          const dataArray = rolesdata.map(item => {
            return { id: item.id, name: item.title };
          });
          console.log(dataArray);

          setarraydataroles(dataArray);
          //+++++++++++++++++++++++++++++++++++++++++++++++++++
        }
      });
    }
    getRoleName();
  }, []);
  const [imageURL, setImageURL] = useState(null);
  //IMAGE FILE HANDLING+++++++++++++++++++++++++++++++++++++++++++++++++++++STARTS
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  //const [imageURL, setImageURL] = useState(null);
  const [disableButton, setDisableButton] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const url = domainpath + '/images/storeuser';

  const uploadFile = async e => {
    console.log(file);
    if (file === null) {
      notification.error({
        message: 'Please Select Image First!!',
      });
    } else {
      const formData = new FormData();
      formData.append('photo', file);
      //  formData.append('photoName', fileName);
      // console.log(formData);

      async function uploadphotofunc(url, formData) {
        await Axios.post(url, formData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            token: 'Bearer hjskdhskjdhsjkdhskjdhskjdhskdhskjdhsdjksjhdsjkdsdks',
          },
        })
          .then(response => {
            console.log('AC');
            console.log(response);
            //console.log(response.data.success);
            if (response.status === 200 && response.data.success === 'Success') {
              // console.log('insideeeee');

              setImageURL(response.data.url);

              notification.success({
                message: 'Image Added Successfully',
              });
              setTimeout(() => {
                notification.destroy();
              }, 3000);
            } else {
              notification.error({
                message: 'Error in Image Upload!!',
              });
            }
          })
          .catch(err => {
            console.log('err', err);
          });
      }
      uploadphotofunc(url, formData);
    }
  };

  const imageHandleChange = async e => {
    var fieldsname;
    var vfile;
    fieldsname = e.target.name;
    vfile = e.target.files;
    console.log(fieldsname);
    var updateimg = [];
    if (fieldsname == 'images') {
      var singleimage = imageRender(vfile);

      setSimpleProductImagesImages(singleimage);
      await imageUploadSave(vfile, url)
        .then(resp => {
          console.log(resp, 'resp');
          setSimpleProductFImageURL(resp);
        })
        .catch(error => {
          console.log(error);
          notification.error({
            message: error?.response?.data?.message,
          });
        });
    } else if (fieldsname == 'gallery_images') {
      var multipleimages = imageRender(vfile);

      setSimpleProductGalleryImagesImages(prev => prev.concat(multipleimages));
      await imageUploadSave(vfile, url)
        .then(resp => {
          console.log(resp, 'resp');

          var imageurl = resp;
          setSimpleProductGalleryImagesURL(prev => prev.concat(imageurl));
        })
        .catch(error => {
          console.log(error);
          notification.error({
            message: error?.response?.data?.message,
          });
        });
    }
  };
  const renderPictures = source => {
    return source.map(pictures => {
      return <Image src={pictures} key={pictures} />;
    });
  };

  //IMAGE FILE HANDLING+++++++++++++++++++++++++++++++++++++++++++++++++++++ENDS

  return (
    <>
      <PageHeader
        ghost
        title="Add User"
        buttons={[
          <div key="2" className="page-header-actions">
            <Button onClick={() => history.push(`../users/users`)} size="small" key="5" type="primary">
              View Users List
            </Button>
          </div>,
        ]}
      />
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
                          User Info
                          {/* {FormTitles[page]} */}
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                }
              >
                <Form
                  name="sDash_validation-form"
                  className="userAddRegister"
                  // form={form}
                  // layout="vertical"
                  onFinish={handleSubmit}
                  onChange={handleChange}
                >
                  <h3>
                    <span className="TitleUserAdd">Personal Information</span>
                  </h3>

                  <Row gutter={30} className="custmblock">
                    <Col md={6} xs={24}>
                      <Form.Item
                        name="first_name"
                        label="First Name"
                        rules={[
                          {
                            required: true,
                            message: 'First Name is required !',
                          },
                          { max: 50, message: 'Max 50 characters allowed!' },
                          {
                            pattern: /^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/,
                            message: 'Letters allowed only with space inbetween',
                          },
                        ]}
                      >
                        <Input
                          placeholder="First Name"
                          // value={formData.first_name}
                          // onChange={event => setformData({ ...formData, first_name: event.target.value })}
                        />
                      </Form.Item>
                    </Col>

                    <Col md={6} xs={24}>
                      <Form.Item
                        name="last_name"
                        label="Last Name"
                        rules={[
                          {
                            required: true,
                            message: 'Last Name is required !',
                          },
                          { max: 50, message: 'Max 50 characters allowed!' },
                          {
                            pattern: /^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/,
                            message: 'Letters allowed only with space inbetween',
                          },
                        ]}
                      >
                        <Input placeholder="Last Name" />
                      </Form.Item>
                    </Col>

                    <Col md={6} xs={24}>
                      <Form.Item name="nick_name" label="Nick Name">
                        <Input placeholder="Nick Name" />
                      </Form.Item>
                    </Col>

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
                        label="Password"
                        rules={[
                          {
                            required: true,
                            message: 'Password is required !',
                          },
                        ]}
                      >
                        <Input placeholder="Password" />
                      </Form.Item>
                    </Col>

                    <Col md={6} xs={24}>
                      <Form.Item
                        name="Cpassword"
                        label="Confirm Password"
                        rules={[
                          {
                            required: true,
                            message: 'Confirm Password is required !',
                          },
                        ]}
                      >
                        <Input placeholder="Confirm Password" />
                      </Form.Item>
                    </Col>

                    <Col md={6} xs={24}>
                      <Form.Item
                        name="image"
                        label="Image"
                        rules={[
                          {
                            required: false,
                            message: 'Please select Store Featured Image!',
                          },
                        ]}
                      >
                        <Input
                          //required
                          name="images"
                          type="file"
                          onChange={e => imageHandleChange(e)}
                        />
                        <i data-feather="image"></i>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={30} className="custmblock">
                    <Col md={6} xs={24}>
                      <Form.Item name="gender" label="Gender">
                        <Select>
                          <Option value="Male">Male</Option>
                          <Option value="Female">Female</Option>
                          <Option value="Others">Others</Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col md={6} xs={24}>
                      <Form.Item name="dob" label="Date Of Birth">
                        <DatePicker defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={30} className="custmblock">
                    <Col md={12} xs={24}>
                      <Form.Item className="spaceCustmLable" name="description" label="Biography">
                        <TextArea rows={2} placeholder="Biography" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <h3>
                    <span className="TitleUserAdd">Address</span>
                  </h3>

                  <Row gutter={30} className="custmblock">
                    <Col md={8} xs={24}>
                      <Form.Item name="addressone" label="Address Line 1">
                        <Input placeholder="Address Line 1" />
                      </Form.Item>
                    </Col>

                    <Col md={8} xs={24}>
                      <Form.Item name="addresstwo" label="Address Line 2">
                        <Input placeholder="Address Line 2" />
                      </Form.Item>
                    </Col>

                    <Col md={8} xs={24}>
                      <Form.Item name="zip" label="Zip/Postal Code">
                        <Input placeholder="Zip/Postal Code" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={30} className="custmblock">
                    <Col md={8} xs={24}>
                      <Form.Item name="city" label="City">
                        <Input placeholder="City" />
                      </Form.Item>
                    </Col>

                    <Col md={8} xs={24}>
                      <Form.Item name="country" label="Country">
                        <Select>
                          <Option value="India">India</Option>
                          <Option value="United State">United State</Option>
                          <Option value="Afghanistan">Afghanistan</Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col md={8} xs={24}>
                      <Form.Item name="state" label="State">
                        <Select>
                          <Option value="Delhi">Delhi</Option>
                          <Option value="Alaska">Alaska</Option>
                          <Option value="Kabul">Kabul</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <h3>
                    <span className="TitleUserAdd">Others</span>
                  </h3>

                  <Row gutter={30} className="custmblock">
                    <Col md={8} xs={24}>
                      <Form.Item
                        name="status"
                        label="Status"
                        rules={[
                          {
                            required: true,
                            message: 'status is required !',
                          },
                        ]}
                      >
                        <Select>
                          <Option value="Active">Active</Option>
                          <Option value="Inactive">Inactive</Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col md={8} xs={24}>
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
                          arraydataroles={arraydataroles}
                        >
                          {arraydataroles != null
                            ? arraydataroles.map(item => {
                                return <Option value={item.id}>{item.name} </Option>;
                              })
                            : ''}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* {PageDisplay()} */}

                  <Form.Item>
                    <div className="add-user-bottom text-right">
                      {/* <Button
                        className="ant-btn ant-btn-primary"
                        type="danger"
                        size="default"
                        onClick={() => {
                          return form.resetFields();
                        }}
                      >
                        Reset
                      </Button> */}

                      {/*<Button htmlType="submit" type="primary" size="default">
                        Back
                    </Button>*/}

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
    </>
  );
};

// AddNew.propTypes = {
//   match: propTypes.object,
// };

export default AddUsersDemo;
