import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, DatePicker, Select, Radio, InputNumber, Image } from 'antd'; // Upload, , Card
import { useHistory } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';

import { Button } from '../../../components/buttons/buttons';

const { Option } = Select;

const dateFormat = 'DD-MM-YYYY';

const ViewInfo = ({ formData, setformData, imageUrl, setImageURL }) => {
  const history = useHistory(); //for redirects in page
  const [passwordShown, setPasswordShown] = useState(true);
  const [disableButton, setDisableButton] = useState(true);
  const [form] = Form.useForm();
  console.log(imageUrl);
  // var UserRoles = [];

  // if (formData?.roles.length > 0) {
  //   UserRoles = formData?.roles;
  // }

  // useEffect(() => {
  //   console.log(formData);
  //   const roles = formData?.roles?.map(item => {
  //     return { id: item.id, name: item.title };
  //   });
  //   console.log(roles);
  // },[])

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const saveFile = e => {
    setFile(null);
    setFileName(null);
    setImageURL(null);
    setDisableButton(true);
    console.log('inside save');
    console.log(e.target.files);
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setDisableButton(false);
    } else {
      notification.error({
        message: 'Please Select Image!!',
      });
    }

    //console.log(file);
    // console.log(fileName);
  };

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
  // console.log(UserRoles);
  // console.log(formData);
  return (
    <Row gutter={25}>
      <Col xs={24}>
        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item
              name="first_name"
              label="First Name"
              // rules={[
              //   {
              //     required: true,
              //     message: 'First Name is required !',
              //   },
              //   { max: 50, message: 'Max 50 characters allowed!' },
              //   {
              //     pattern: /^[a-zA-Z]+$/,
              //     message: 'Letters allowed only',
              //   },
              // ]}
            >
              <Input
                placeholder="First Name"
                //value={formData.firstName}
                //onChange={event => setformData({ ...formData, first_name: event.target.value })}
                readOnly
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              name="last_name"
              label="Last Name"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Last Name is required !',
              //   },
              //   { max: 50, message: 'Max 50 characters allowed!' },
              //   {
              //     pattern: /^[a-zA-Z]+$/,
              //     message: 'Letters allowed only',
              //   },
              // ]}
            >
              <Input
                //placeholder="Last Name"
                //value={formData.lastName}
                //onChange={event => setformData({ ...formData, last_name: event.target.value })}
                readOnly
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
              // rules={[
              //   { type: 'email', required: true, message: 'Email is required !' },
              //   { min: 10, message: 'Min 10 characters required!' },
              //   { max: 50, message: 'Max 50 characters allowed!' },
              // ]}
            >
              <Input
                placeholder="name@example.com"
                //value={formData.email}
                //onChange={event => setformData({ ...formData, email: event.target.value })}
                readOnly
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              name="phone"
              label="Phone Number"
              // rules={[
              //   { required: true, message: 'Phone number is required !' },
              //   {
              //     pattern: /^[\d]{0,13}$/,
              //     message: 'Value should be less than 13 digits',
              //   },
              // ]}
            >
              <Input
                //type="number"
                // placeholder="+44 2546 5236"
                // pattern="[0-9]*"
                // style={{ width: '100%' }}
                //value={formData.phoneNumber}
                // onChange={event => setformData({ ...formData, phone: event })}
                readOnly
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={30}>
          {/* <Col md={12} xs={24}>
            <Form.Item
              name="date_of_birth"
              label="Date of Birth"
              // rules={[
              //   {
              //     type: 'object',
              //     whitespace: true,
              //     required: true,
              //     message: 'Enter your date of birth !',
              //   },
              // ]}
            >
              {/* <DatePicker format={dateFormat} style={{ width: '100%', padding: '12px' }} /> */}
          {/* <Input
                // type="text"
                // style={{ width: '100%', padding: '12px' }}
                //value={formData.dateOfBirth}
                //onChange={event => setformData({ ...formData, date_of_birth: event.target.value})} */}
          {/* //       readOnly
          //     />
          //   </Form.Item> */}
          {/* </Col>  */}
          <Col md={12} xs={24}>
            <Form.Item
              name="gender"
              //   initialValue=""
              label="Gender"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please select your gender !',
              //   },
              // ]}
            >
              <Input
                //value={formData.gender}
                //  onChange={event => setformData({ ...formData, gender: event })}
                readOnly
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item name="roles" initialValue="" label="Role">
              <Input placeholder="Status" readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={12} xs={24}>
            <Form.Item name="active" label="Status" initialValue="">
              <Input placeholder="Status" readOnly />
            </Form.Item>
          </Col>
        </Row>

        {/* //row------------------------------------------------------------------------------------------- */}
        {/* <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item name="roles" label="Role">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            {console.log(imageUrl)}
            {imageUrl != null ? (
              <Form.Item name="image" label="Image">
                <Image width={200} src={imageUrl} />
              </Form.Item>
            ) : (
              ''
            )}
          </Col>
        </Row> */}
        {/* <Row gutter={30}>
          <Col md={6} xs={12}>
            <Form.Item
              name="role_id"
              label="Role"
            
            >
              <Select
                style={{ width: '100%' }}
              
              >
                (<Option value={null}>Select</Option>)
                {UserRoles != null
                  ? UserRoles.map(item => {
                      return <Option value={item.id}>{item.name} </Option>;
                    })
                  : ''}
              </Select>
            </Form.Item>
          </Col>
        </Row> */}
      </Col>
    </Row>
  );
};

export default ViewInfo;
