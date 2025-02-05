import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, DatePicker, Select, Radio, InputNumber, Image } from 'antd'; // Upload, , Card
import { useHistory } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { BasicFormWrapper } from '../style';
//import moment from 'moment';
import Axios from 'axios';
import { headers } from '../../../helpers/variables';
import moment from 'moment';
import {
  post_api_request,
  api_url,
  get_api_request,
  delete_api_request,
  get_rolesby_store,
} from '../../../helpers/Api';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';

const EditStoreUserInfo = ({ formData, setformData, imageUrl, setImageURL }) => {
  //const history = useHistory(); //for redirects in page
  const [passwordShown, setPasswordShown] = useState(false);
  const [role1, setRole] = useState(null);
  var SelectedStoreID = {};
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const disabledDate = current => {
    return current && current > moment().endOf('day');
  };
  var SelectedStoreID = sessionStorage.getItem('storeID');
  console.log(SelectedStoreID);
  useEffect(() => {
    // async function getStoreName() {
    //  const postdata = { request: 'edit' };
    //   await Axios.post(domainpath + '/store/allNamesAndIds',postdata, { headers }).then(response => {
    //     if (response.status === 200) {
    //       const storenamesdata = response.data.responsedata.stores;
    //       console

    //       //make array of names of store types+++++++++++++++++
    //       const dataArray = storenamesdata.map(item => {
    //         return { id: item.id, name: item.name };
    //       });
    //       console.log(dataArray);
    //       setarraydatastorename(dataArray);
    //       //+++++++++++++++++++++++++++++++++++++++++++++++++++
    //     }
    //   });
    // }
    // getStoreName();

    console.log(SelectedStoreID);
    async function getRoleName(postID) {
      const payload = { request: 'list' };
      const url = get_rolesby_store(id);
      console.log(url);
      const response = await post_api_request(url, payload, { headers });
      //  await Axios.post(domainpath + `/store/role/${postID}`, payload, { headers }).then(response => {
      console.log(response);
      if (response.status === 200) {
        const rolesdata = response.data.responsedata.roles;

        //make array of names of store types+++++++++++++++++
        const dataArray = rolesdata.map(item => {
          return { id: item.id, name: item.title };
        });
        console.log(dataArray);
        setRole(dataArray);
        // setarraydataroles(dataArray);
        //+++++++++++++++++++++++++++++++++++++++++++++++++++
      }
      // });
    }
    getRoleName(SelectedStoreID);
  }, []);

  return (
    <Row gutter={25}>
      <Col xs={24}>
        <Row gutter={30}>
          <Col md={12} xs={24}>
            {/* <Form.Item
              name="store"
              label="Store"
              rules={[
                {
                  required: true,
                  message: 'Store Name is required !',
                },
              ]}
            >
              <Select
                style={{ width: '100%' }}
                arraydatastorename={arraydatastorename}
                onChange={event => setformData({ ...formData, store: event })}
                //defaultValue={{ value: formData.store }}
              >
                {arraydatastorename != null
                  ? arraydatastorename.map(item => {
                      return <Option value={item.id}>{item.name} </Option>;
                    })
                  : ''}
              </Select>
            </Form.Item> */}

            <Form.Item
              name="store"
              label="Store"
              rules={[
                {
                  required: true,
                  message: 'Store Name is required !',
                },
                { max: 50, message: 'Max 50 characters allowed!' },
                // {
                //   pattern: /^[a-zA-Z]+$/,
                //   message: 'Letters allowed only',
                // },
              ]}
            >
              <Input
                placeholder="Store name"
                //value={formData.firstName}
                onChange={event => setformData({ ...formData, store: event.target.value })}
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              name="employee_id"
              label="Employee ID"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Employee ID is required !',
              //   },
              //   { max: 50, message: 'Max 50 characters allowed!' },
              // ]}
            >
              <Input
                placeholder="Employee ID"
                //value={formData.lastName}
                onChange={event => setformData({ ...formData, employee_id: event.target.value })}
              />
            </Form.Item>
          </Col>
        </Row>
        {/* //row------------------------------------------------------------------------------------------- */}
        <Row gutter={30}>
          <Col md={12} xs={24}>
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
                  pattern: /^[a-zA-Z]+$/,
                  message: 'Letters allowed only',
                },
              ]}
            >
              <Input
                placeholder="First Name"
                // value={formData.firstName}
                onChange={event => setformData({ ...formData, first_name: event.target.value })}
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
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
                  pattern: /^[a-zA-Z]+$/,
                  message: 'Letters allowed only',
                },
              ]}
            >
              <Input
                placeholder="Last Name"
                //value={formData.last_name}
                onChange={event => setformData({ ...formData, last_Name: event.target.value })}
              />
            </Form.Item>
          </Col>
        </Row>
        {/* //row------------------------------------------------------------------------------------------- */}
        <Row gutter={30}>
          <Col md={12} xs={24}>
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
                // value={formData.email}
                onChange={event => setformData({ ...formData, email: event.target.value })}
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
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
                //value={formData.phoneNumber}
                onChange={selectedNumber => setformData({ ...formData, phone: selectedNumber })}
              />
            </Form.Item>
          </Col>
          {/* <Col md={12} xs={24}>
            <Form.Item
              name="date_of_birth"
              label="Date of Birth"
              rules={[
                {
                  required: true,
                  message: 'Enter your date of birth !',
                },
              ]}
            >
              <DatePicker
                style={{ width: '100%', padding: '12px' }}
                initialValue="YYYY-MM-DD"
                disabledDate={disabledDate}
               
                onChange={selectedOption =>
                  setformData({ ...formData, date_of_birth: selectedOption.format(dateFormat) })
                }
                format={dateFormat}
              />
            </Form.Item>
          </Col> */}
        </Row>

        {/* //row------------------------------------------------------------------------------------------- */}
        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item
              name="role"
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
                //value={formData.role}
                onChange={seletedValue => setformData({ ...formData, role: seletedValue })}
              >
                (<Option value={null}>Select</Option>)
                {role1 != null ? (
                  role1.map(item => {
                    return <Option value={item.id}>{item.name} </Option>;
                  })
                ) : (
                  <Input readOnly />
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col md={8} xs={24}>
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
          </Col>
          {/* <Col md={8} xs={24}>
            <Form.Item
              name="gender"
              initialValue=""
              label="Gender"
              rules={[
                {
                  required: true,
                  message: 'Please select your gender !',
                },
              ]}
            >
              <Radio.Group
                //value={formData.gender}
                onChange={event => setformData({ ...formData, gender: event })}
              >
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="others">Others</Radio>
              </Radio.Group>
            </Form.Item>
          </Col> */}
          <Col md={12} xs={24}>
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
          {/* <Col md={12} xs={24}>
            <BasicFormWrapper>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Enter password !',
                  },
                  {
                    pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/,
                    message: 'Password must be minimum 8 characters, a numeric character, a special character',
                  },
                ]}
              >
                <div className="input-prepend-wrap">
                  <span className="input-prepend">
                    <FeatherIcon icon="eye" size={16} onClick={togglePassword} />
                  </span>
                  <span className="ant-input-number">
                    <Input
                      type={passwordShown ? 'text' : 'password'}
                      name="pwd"
                      //value={formData.password}
                      onChange={event => setformData({ ...formData, password: event.target.value })}
                    />
                  </span>
                </div>
              </Form.Item>
            </BasicFormWrapper>
          </Col> */}
        </Row>
        <Row gutter={30}>
          <Col md={12} xs={24}>
            {imageUrl !== null ? (
              <Form.Item
                name="image"
                initialValue=""
                label="Image"
                // rules={[
                //   {
                //     required: true,
                //     message: 'Please select store type !',
                //   },
                // ]}
              >
                {/* <Image width={200} src={domainpath + imageUrl} /> */}
                <Image width={200} src={imageUrl} />
                {/* <Image width={200} src={imagefolderurl + imageUrl} /> */}
                {/* <Image width={200} src={imageUrl} /> */}
              </Form.Item>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default EditStoreUserInfo;
