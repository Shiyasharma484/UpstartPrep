import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, DatePicker, Select, Radio, InputNumber, Button, notification, Image } from 'antd'; // Upload, , Card
import { useHistory } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { BasicFormWrapper } from '../style';

import Axios from 'axios';
import { headers } from '../../../helpers/variables';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

//import { Button } from '../../../components/buttons/buttons';
const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';
const StoreUserInfo = ({ formData, setformData, imageURL, setImageURL }) => {
  //const history = useHistory(); //for redirects in page
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const [arraydatastorename, setarraydatastorename] = useState(null);
  const [arraydatastoretype, setarraydatastoretype] = useState(null);
  const [arraydataroles, setarraydataroles] = useState(null);
  const [arrayStoreUser, setArrayStoreUser] = useState(null);
  const [form] = Form.useForm();
  //  SelectedStoreID = sessionStorage.getItem('storeID'); //
  //======================================================================================================
  useEffect(() => {
    async function getStoreName() {
      const postdata = { request: 'add' };
      await Axios.post(domainpath + '/store/allNamesAndIds', postdata, { headers }).then(response => {
        if (response.status === 200) {
          console.log(response);
          const storenamesdata = response.data.responsedata.stores;

          //make array of names of store types+++++++++++++++++
          const dataArray = storenamesdata.map(item => {
            return { id: item.id, name: item.name };
          });
          console.log(dataArray);
          setarraydatastoretype(dataArray);
          //+++++++++++++++++++++++++++++++++++++++++++++++++++
        }
      });
    }
    getStoreName();

    // async function getStorType() {
    //   await Axios.get(domainpath + '/storetype/store/', { headers }).then(response => {
    //     console.log(response)
    //     if (response.status === 200) {
    //       console.log(response);
    //       const storenamesdata = response.data.responsedata.stores;

    //       //make array of names of store types+++++++++++++++++
    //       const dataArray = storenamesdata.map(item => {
    //         return { id: item.id, name: item.name };
    //       });
    //       console.log(dataArray);
    //       setarraydatastoretype(dataArray);
    //       //+++++++++++++++++++++++++++++++++++++++++++++++++++
    //     }
    //   });
    // }
    // getStorType();

    async function getRoleName() {
      await Axios.get(domainpath + '/role/allNamesAndIds', { headers }).then(response => {
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

  //=============================Get Store Type by Store======= Start

  async function storeselectedToGetStoreType(event) {
    form.resetFields(['store_type"']);
    // console.log(event);
    //  const storetypeID = { id: event };
    const storetypeID = event;
    console.log(storetypeID);
    console.log('==============================');
    async function getUserDataByID(storetypeID) {
      await Axios.get(domainpath + `/storetype/store/${storetypeID}`, { headers }).then(response => {
        console.log(response);
        if (response.status === 200) {
          const userdata = response.data.responsedata?.store_type;

          console.log(userdata);
          //make array of names of store types+++++++++++++++++
          const dataArray = userdata.map(item => {
            console.log(item);
            //  const userdID = decodetheid(item.id);
            // const userID = decodetheid(item.id);
            //  console.log(userID);

            //  setUserName({...userDetail,
            //   fullname: item.fullname,
            //   id: userdID
            //  });

            //console.log(item.fullname );

            return { id: item.store_type_id, name: item.store_type_name };
          });
          console.log(dataArray);
          setArrayStoreUser(dataArray);
        }
      });
    }
    getUserDataByID(storetypeID);
  }
  //=============================Get Store Type by Store======= End

  //======================================================================================================
  //IMAGE FILE HANDLING+++++++++++++++++++++++++++++++++++++++++++++++++++++STARTS
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  //const [imageURL, setImageURL] = useState(null);
  const [disableButton, setDisableButton] = useState(true);
  const url = domainpath + '/images/storeuser';

  // const saveFile = e => {
  //   setFile(null);
  //   setFileName(null);
  //   setImageURL(null);
  //   setDisableButton(true);
  //   console.log('inside save');
  //   console.log(e.target.files);
  //   if (e.target.files.length > 0) {
  //     setFile(e.target.files[0]);
  //     setFileName(e.target.files[0].name);
  //     setDisableButton(false);
  //   } else {
  //     notification.error({
  //       message: 'Please Select Image!!',
  //     });
  //   }

  //   //console.log(file);
  //   // console.log(fileName);
  // };

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

  const [selectedImages, setSelectedImages] = useState([]);

  const imageHandleChange = e => {
    setFile(null);
    setImageURL(null);
    setDisableButton(true);
    //console.log('inside save');
    //  console.log(e.target.files);
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setDisableButton(false);
    } else {
      notification.error({
        message: 'Please Select Image!!',
      });
    }
    //console.log(e.target.files);
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file)); //to create a url path for images
      console.log(fileArray);

      setSelectedImages(prev => prev.concat(fileArray));
      Array.from(e.target.files).map(file => URL.revokeObjectURL(file));
    }
  };
  const renderPictures = source => {
    return source.map(pictures => {
      return <Image src={pictures} key={pictures} />;
    });
  };

  //IMAGE FILE HANDLING+++++++++++++++++++++++++++++++++++++++++++++++++++++ENDS
  return (
    <Row gutter={25}>
      <Col xs={24}>
        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item
              name="store_id"
              initialValue=""
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
                arraydatastoretype={arraydatastoretype}
                onChange={storeselectedToGetStoreType}
                onSelect={event => setformData({ ...formData, store_id: event })}
              >
                {arraydatastoretype != null
                  ? arraydatastoretype.map((item, index) => {
                      return <Option value={item.id}>{item.name} </Option>;
                    })
                  : ''}
              </Select>
            </Form.Item>
          </Col>

          <Col md={12} xs={24}>
            <Form.Item
              name="store_type"
              initialValue=""
              label="Store Type"
              // onClick={storetypeselectedToGetUserDetail}
              rules={[
                {
                  required: true,
                  message: 'Store Name is required !',
                },
              ]}
            >
              <Select
                style={{ width: '100%' }}
                arrayStoreUser={arrayStoreUser}
                onSelect={event => setformData({ ...formData, store_type: event })}
              >
                {arrayStoreUser != null
                  ? arrayStoreUser.map(item => {
                      console.log(item);

                      return <Option value={item.id}>{item.name} </Option>;
                    })
                  : ''}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {/* //row------------------------------------------------------------------------------------------- */}
        <Row gutter={30}>
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
                value={formData.employee_id}
                onChange={event => setformData({ ...formData, employee_id: event.target.value })}
              />
            </Form.Item>
          </Col>

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
                  pattern: /^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/,
                  message: 'Letters allowed only with space inbetween',
                },
              ]}
            >
              <Input
                placeholder="First Name"
                value={formData.first_Name}
                onChange={event => setformData({ ...formData, first_name: event.target.value })}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={30}>
          <Col md={12} xs={24}>
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
              <Input
                placeholder="Last Name"
                value={formData.last_name}
                onChange={event => setformData({ ...formData, last_name: event.target.value })}
              />
            </Form.Item>
          </Col>
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
                value={formData.email}
                onChange={event => setformData({ ...formData, email: event.target.value })}
              />
            </Form.Item>
          </Col>
        </Row>
        {/* //row------------------------------------------------------------------------------------------- */}
        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: 'Phone number is required !' },
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
                value={formData.phone}
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
                  type: 'object',
                  whitespace: true,
                  required: true,
                  message: 'Enter your date of birth !',
                },
              ]}
            >
              <DatePicker
                type="text"
                style={{ width: '100%', padding: '12px' }}
                value={formData.date_of_birth}
                onChange={selectedOption =>
                  setformData({ ...formData, date_of_birth: selectedOption.format(dateFormat) })
                }
              />
            </Form.Item>
          </Col> */}
          <Col md={6} xs={12}>
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
                      value={formData.password}
                      onChange={event => setformData({ ...formData, password: event.target.value })}
                    />
                  </span>
                </div>
              </Form.Item>
            </BasicFormWrapper>
          </Col>
          <Col md={6} xs={12}>
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
          </Col>
        </Row>

        <Row gutter={30}>
          {/* <Col md={12} xs={24}>
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
                value={formData.gender}
                onChange={event => setformData({ ...formData, gender: event.target.value })}
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
          <Col md={12} xs={24}>
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
        {/* //row------------------------------------------------------------------------------------------- */}
        <Row gutter={30}>
          <Col md={6} xs={12}>
            <Form.Item name="image" label="Image">
              <Input required type="file" onChange={e => imageHandleChange(e)} />

              {imageURL !== null ? (
                <Button
                  type="success"
                  // onClick={e => {
                  //   uploadFile(e);
                  // }}
                  required
                >
                  Uploaded Successfully
                </Button>
              ) : disableButton === true ? (
                ''
              ) : (
                <Button
                  type="danger"
                  onClick={e => {
                    uploadFile(e);
                  }}
                  required
                >
                  Please Click to Upload Image
                </Button>
              )}
            </Form.Item>
          </Col>
          <Col
            // lg={24}
            md={6}
            xs={12}
          >
            <div className="result" style={{ width: '20vh' }}>
              {renderPictures(selectedImages)}
            </div>
          </Col>
        </Row>
        {/* <Row gutter={30}>
         
        </Row> */}
        {/* <Row gutter={30}>
          <Col lg={24} md={24} xs={24}>
            <div className="result" style={{ width: '20vh' }}>
              {renderPictures(selectedImages)}
            </div>
          </Col>
        </Row> */}
      </Col>
    </Row>
  );
};
export default StoreUserInfo;
