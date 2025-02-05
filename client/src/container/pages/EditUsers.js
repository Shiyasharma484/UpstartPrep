
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, DatePicker, Select, InputNumber, notification, Image } from 'antd';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import moment from 'moment';
import { AddUser } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import EditInfo from './overview/infos';
import EditWork from './overview/works';
import { useDispatch } from 'react-redux';
import { headers } from '../../helpers/variables';
import imageUploadSave from '../../helpers/uploadImage';
import { get_api_request, post_api_request, put_api_request, delete_api_request, api_url } from '../../helpers/Common.js';
const { imageRender } = require('../../helpers/renderImage');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const url = domainpath + '/images/storeuser';

var ModuleName = 'EDITUSER';
var URID;
const EditUser = ({ match }) => {
  const [form] = Form.useForm();
  const dateFormat = 'DD-MM-YYYY';
  const dispatch = useDispatch();
  const history = useHistory(); //for redirects in page

  const { TextArea } = Input;

  // const { TextArea } = Input;
  const params = useParams();

  const [formData, setformData] = useState({
    first_name: '',
    last_Name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    gender: '',
    roles: '',
    address_line1: '',
    address_line2: '',
    country: '',
    state: '',
    city: '',
    postal_code: '',
    active: '',
    nick_name: '',
    store_type_id: '',
    image: '',
  });

  const [userRole, setUserRole] = useState(null);
  const [storeType, setStoreType] = useState(null);
  const [userID, setUserID] = useState();
  const [imageURL, setImageURL] = useState(null);
  const [Images, setImages] = useState([]);
  const [roleCheck, setRoleCheck] = useState(true);

  useEffect(() => {
    // console.log(params);
    if (params.id.length > 0) {
      async function fetchStoreListData() {
        const postID = params.id;
        setUserID(postID);
        const url = api_url.user_single + postID;
        const response = await get_api_request(url, headers);
        console.log(response);

        //set fields++++++++++++++++++++++++++++++++++++++++
        const userdata = response?.data?.responsedata?.user?.[0];
        URID = userdata?.roles?.[0]?.users_role_id;
        if (userdata.roles[0].role_id == 1) {
          form.setFieldsValue({
            roles: userdata.roles[0].role_name,
          });
          setRoleCheck(false);
        } else {
          form.setFieldsValue({
            roles: userdata.roles[0].role_id,
          });
          setRoleCheck(true);
        }
        form.setFieldsValue({
          first_name: userdata.first_Name,
          last_Name: userdata.last_Name,
          email: userdata.email,
          phone: userdata.phone,
          gender: userdata.gender,
          date_of_birth: moment(userdata.date_of_birth),
          store_type_id: userdata.roles[0].store_type_id,
          address_line1: userdata.address_line1,
          address_line2: userdata.address_line2,
          country: userdata.country,
          city: userdata.city,
          state: userdata.state,
          postal_code: userdata.postal_code,
          active: userdata?.active,
          description: userdata.description,
          nick_name: userdata.nick_name,
        });
        //setImages(userdata?.image);
        // image: storelistdata.image,
        if (userdata?.image) {
          var imageurl = [];
          imageurl.push(userdata.image);
          setImages(imageurl);
        }

        setformData({
          first_name: userdata.first_Name,
          last_Name: userdata.last_Name,
          email: userdata.email,
          phone: userdata.phone,
          gender: userdata.gender,
          date_of_birth: userdata.date_of_birth,
          roles: userdata.roles[0].role_id,
          store_type_id: userdata.roles[0].store_type_id,
          address_line1: userdata.address_line1,
          address_line2: userdata.address_line2,
          country: userdata.country,
          city: userdata.city,
          state: userdata.state,
          postal_code: userdata.postal_code,
          active: userdata?.active,
          description: userdata.description,
          nick_name: userdata.nick_name,
        });
      }
      async function getRoleName() {
        const payload = { request: 'edit' };
        const url = api_url.admin_user_role;
        const response = await post_api_request(url, payload, { headers });
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
        const response = await post_api_request(url, payload, { headers });

        if (response.status == 200) {
          const storetypedata = response?.data?.responsedata?.storetypes;
          // console.log(response);
          const typeList = storetypedata?.map(item => {
            return { id: item.id, name: item.name };
          });
          setStoreType(typeList);
        }
      }
      GetStoreType();

      fetchStoreListData();
    } else {
      notification.open({ message: 'wrongly accessed the page' });
      history.push('../ecommerce/storelist');
    }
  }, []);

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

  var roleobjinitial = {};
  roleobjinitial['users_role_id'] = '';
  roleobjinitial['role_id'] = '';
  roleobjinitial['store_type'] = '';

  roleobjinitial.role_id = formData.roles;
  roleobjinitial.users_role_id = URID;
  roleobjinitial.store_type = formData.store_type_id;

  var roleArray = [];
  roleArray.push(roleobjinitial);
  var payload = {
    first_Name: formData.first_name,
    phone: formData.phone,
    last_Name: formData.last_Name,
    email: formData.email,
    address_line1: formData.address_line1,
    address_line2: formData.address_line2,
    city: formData.city,
    country: formData.country,
    date_of_birth: formData.date_of_birth,
    gender: formData.gender,
    postal_code: formData.postal_code,
    roles: roleArray,
    state: formData.state,
    active: formData.active,
    description: formData.description,
    nick_name: formData.nick_name,
    store_type_id: formData.store_type_id,
    image: imageURL,
  };

  const handleSubmit = fieldsValue => {
    async function updateuser(payload) {
      console.log(payload);
      const url = api_url.update_user + userID;
      const response = await put_api_request(url, payload, { headers });
      console.log(response);
      if (response.status === 200) {
        notification.success({
          message: 'User Updated Successfully',
        });
        setTimeout(() => {
          notification.destroy();
          history.push('../users');
        }, 2000);
      } else {
        notification.error({ message: 'Server error' });
        setTimeout(() => {
          notification.destroy();
        }, 2000);
      }
    }

    updateuser(payload);
  };

  return (
    <>
      <PageHeader
        ghost
        title="Edit User"
        buttons={[
          <div key="2" className="page-header-actions">
            <Button onClick={() => history.push(`../users`)} size="small" key="5" type="primary">
              View Users List
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <AddUser>
              <Cards
                title={
                  <div className="card-nav">
                    <ul>
                      <li>
                        <NavLink to={`#`} onClick={e => e.preventDefault()}>
                          <FeatherIcon icon="user" size={14} />
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                }
              >
                <Form
                  name="sDash_validation-form"
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                  onChange={handleChange}
                >
                  <Row gutter={25}>
                    <Col xs={24}>
                      <Row gutter={30}>
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
                                pattern: /^[a-zA-Z]/,
                                message: 'Letters allowed only',
                              },
                            ]}
                          >
                            <Input
                              placeholder="First Name"
                              onChange={event => setformData({ ...formData, first_name: event.target.value })}
                            />
                          </Form.Item>
                        </Col>
                        <Col md={6} xs={24}>
                          <Form.Item
                            name="last_Name"
                            label="Last Name"
                            rules={[
                              {
                                required: true,
                                message: 'Last Name is required !',
                              },
                              { max: 50, message: 'Max 50 characters allowed!' },
                              {
                                pattern: /^[a-zA-Z]/,
                                message: 'Letters allowed only',
                              },
                            ]}
                          >
                            <Input
                              placeholder="Last Name"
                              onChange={event => setformData({ ...formData, last_Name: event.target.value })}
                            />
                          </Form.Item>
                        </Col>
                        <Col md={6} xs={24}>
                          <Form.Item
                            name="email"
                            label="Email Address"
                            rules={[
                              { type: 'email', required: true, message: 'Email is required !' },
                              { min: 10, message: 'Min 10 characters required!' },
                              { max: 50, message: 'Max 50 characters allowed!' },
                            ]}
                          >
                            <Input
                              placeholder="name@example.com"
                              onChange={event => setformData({ ...formData, email: event.target.value })}
                            />
                          </Form.Item>
                        </Col>
                        <Col md={6} xs={24}>
                          <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[
                              {
                                required: true,
                                message: 'Phone number is required !',
                              },
                              {
                                pattern: /^[\d]{0,13}$/,
                                message: 'Value should be less than 13 digits',
                              },
                            ]}
                          >
                            <InputNumber
                              type="number"
                              placeholder="+44 2546 5236"
                              pattern="[0-9]*"
                              style={{ width: '100%' }}
                              onChange={selectedNumber => setformData({ ...formData, phone: selectedNumber })}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      {/* //row------------------------------------------------------------------------------------------- */}
                      <Row gutter={30}>
                        <Col md={6} xs={24}>
                          <Form.Item name="gender" initialValue="" label="Gender">
                            <Select
                              style={{ width: '100%' }}
                              onChange={seletedValue => {
                                setformData({ ...formData, gender: seletedValue });
                                //setDisable(selectedValue == '');
                              }}
                            >
                              <Option value={'male'}>Male</Option>
                              <Option value={'female'}>Female</Option>
                              <Option value={'others'}>Others</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col md={6} xs={24}>
                          <Form.Item name="dob" label="Date Of Birth">
                            <DatePicker defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} />
                          </Form.Item>
                        </Col>
                        <Col md={6} xs={24}>
                          <Form.Item name="nick_name" label="Nick Name">
                            <Input
                              placeholder="nick_name"
                              onChange={event => setformData({ ...formData, nick_name: event.target.value })}
                            />
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
                            <Input name="image" type="file" onChange={e => imageHandleChange(e)} />
                            <i data-feather="image"></i>
                            <div className="result" style={{ width: '20vh' }}>
                              {renderPictures(Images)}
                            </div>
                          </Form.Item>
                        </Col>
                      </Row>

                      {/* //row------------------------------------------------------------------------------------------- */}
                    </Col>
                  </Row>
                  <h3>
                    <span className="TitleUserAdd">Address</span>
                  </h3>
                  <Row gutter={25}>
                    <Col xs={24}>
                      <Row gutter={30}>
                        <Col md={8} xs={24}>
                          <Form.Item
                            name="address_line1"
                            label="Address Line 1"
                            rules={[
                              {
                                required: true,
                                message: 'Address Line1 is required !',
                              },
                              { max: 50, message: 'Max 50 characters allowed!' },
                            ]}
                          >
                            <Input
                              placeholder="Floor, Flat/House Number"
                              onChange={event => setformData({ ...formData, address_line1: event.target.value })}
                            />
                          </Form.Item>
                        </Col>
                        <Col md={8} xs={24}>
                          <Form.Item
                            name="address_line2"
                            label="Address Line 2"
                            rules={[
                              {
                                required: true,
                                message: 'Address Line2 is required !',
                              },
                              { max: 50, message: 'Max 50 characters allowed!' },
                            ]}
                          >
                            <Input
                              placeholder="Street and locality"
                              onChange={event => setformData({ ...formData, address_line2: event.target.value })}
                            />
                          </Form.Item>
                        </Col>

                        <Col md={8} xs={24}>
                          <Form.Item
                            name="country"
                            label="Country"
                            rules={[
                              {
                                required: true,
                                message: 'Kindly choose your country !',
                              },
                            ]}
                          >
                            <Select
                              style={{ width: '100%' }}
                              onChange={selectedCountry => setformData({ ...formData, country: selectedCountry })}
                            >
                              <Option value="">Please Select</Option>
                              <Option value="Russia">Russia</Option>
                              <Option value="India">India</Option>
                              <Option value="United Kingdom">United Kingdom</Option>
                              <Option value="United States">United States</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col md={8} xs={24}>
                          <Form.Item
                            name="state"
                            label="State"
                            rules={[
                              {
                                required: true,
                                message: 'Kindly enter sate name !',
                              },
                              { max: 50, message: 'Max 50 characters allowed!' },
                              {
                                pattern: /^[a-zA-Z]+$/,
                                message: 'Letters allowed only',
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter state Name"
                              onChange={event => setformData({ ...formData, state: event.target.value })}
                            />
                          </Form.Item>
                        </Col>

                        <Col md={8} xs={24}>
                          <Form.Item
                            name="city"
                            label="City"
                            rules={[
                              {
                                required: true,
                                message: 'Kindly enter city name !',
                              },
                              { max: 50, message: 'Max 50 characters allowed!' },
                              {
                                pattern: /^[a-zA-Z]+$/,
                                message: 'Letters allowed only',
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter city name"
                              onChange={event => setformData({ ...formData, city: event.target.value })}
                            />
                          </Form.Item>
                        </Col>
                        <Col md={8} xs={24}>
                          <Form.Item
                            name="postal_code"
                            label="Postal/Zip/Pin"
                            rules={[
                              {
                                required: true,
                                message: 'Enter postal code !',
                              },
                              {
                                pattern: /^[\d]{0,15}$/,
                                message: 'Value should be less than 10 digits/character',
                              },
                            ]}
                          >
                            <InputNumber
                              type="number"
                              placeholder="160071"
                              style={{ width: '100%' }}
                              onChange={selectedZip => setformData({ ...formData, zip: selectedZip })}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <h3>
                    <span className="TitleUserAdd">Others</span>
                  </h3>
                  <Row gutter={30}>
                    <Col md={8} xs={24}>
                      <Form.Item name="active" label="Status" initialValue="">
                        <Select
                          style={{ width: '100%' }}
                          onChange={seletedValue => {
                            setformData({ ...formData, active: seletedValue });
                          }}
                        >
                          <Option value={1}>Published</Option>
                          <Option value={0}>Draft</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    {roleCheck != false ? (
                      <>
                        <Col md={8} xs={24}>
                          <Form.Item
                            name="store_type_id"
                            //initialValue={formData.store_type_id}
                            label="Store Type"
                            rules={[
                              {
                                required: true,
                                message: 'Please select store_type !',
                              },
                            ]}
                          >
                            <Select
                              style={{ width: '100%' }}
                              onChange={seletedValue => setformData({ ...formData, store_type_id: seletedValue })}
                              storeType={storeType}
                            >
                              {storeType != null
                                ? storeType?.map(item => {
                                    return <Option value={item.id}>{item.name} </Option>;
                                  })
                                : ''}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col md={8} xs={24}>
                          <Form.Item
                            name="roles"
                            //initialValue=""
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
                              // defaultValue={{ value: formData.role_id }}
                              onChange={seletedValue => setformData({ ...formData, roles: seletedValue })}
                              userRole={userRole}
                            >
                              {userRole != null
                                ? userRole.map(item => {
                                    return <Option value={item.id}>{item.name} </Option>;
                                  })
                                : ''}
                            </Select>
                          </Form.Item>
                        </Col>
                      </>
                    ) : (
                      <>
                        <Col md={8} xs={24}>
                          <Form.Item
                            name="store_type_id"
                            //initialValue={formData.store_type_id}
                            label="Store Type"
                            rules={[
                              {
                                required: true,
                                message: 'Please select store_type !',
                              },
                            ]}
                          >
                            <Select
                              style={{ width: '100%' }}
                              disabled
                              onChange={seletedValue => setformData({ ...formData, store_type_id: seletedValue })}
                              storeType={storeType}
                            >
                              {storeType != null
                                ? storeType?.map(item => {
                                    return <Option value={item.id}>{item.name} </Option>;
                                  })
                                : ''}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col md={8} xs={24}>
                          <Form.Item name="roles" label="Role">
                            <Input readOnly />
                          </Form.Item>
                        </Col>
                      </>
                    )}
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
    </>
  );
};

export default EditUser;
