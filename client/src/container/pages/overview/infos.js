import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, DatePicker, Select, Radio, InputNumber, Image, Button, notification } from 'antd'; // Upload, , Card
import { useHistory } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { BasicFormWrapper } from '../style';
import moment from 'moment';
import Axios from 'axios';
import { headers } from '../../../helpers/variables';
//import { Button } from '../../components/buttons/buttons';

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const { Option } = Select;
const dateFormat = 'DD-MM-YYYY';

const Infos = ({ formData, setformData, imageUrl, setImageURL }) => {
  //const history = useHistory(); //for redirects in page
  const [passwordShown, setPasswordShown] = useState(false);
  const [role, setRole] = useState(null);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const disabledDate = current => {
    return current && current > moment().endOf('day');
  };
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

          setRole(dataArray);
          //+++++++++++++++++++++++++++++++++++++++++++++++++++
        }
      });
    }
    getRoleName();
  }, []);

  //----------------------------new image's------------------------//
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [disableButton, setDisableButton] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImages1, setSelectedImages1] = useState([]);
  const url = domainpath + '/images/storetype';

  const imageHandleChange = e => {
    setFile(null);
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
    console.log(e.target.files);
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file)); //to create a url path for images
      console.log(fileArray);

      setSelectedImages(
        // prev => prev.concat
        fileArray,
      );
      Array.from(e.target.files).map(file => URL.revokeObjectURL(file));
    }
  };
  console.log(selectedImages);

  const renderPictures = source => {
    return source.map(pictures => {
      return <Image src={pictures} key={pictures} />;
    });
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
      console.log(formData);

      async function uploadphotofunc(url, formData) {
        await Axios.post(url, formData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            token: 'Bearer hjskdhskjdhsjkdhskjdhskjdhskdhskjdhsdjksjhdsjkdsdks',
          },
        })
          .then(response => {
            console.log(response);
            console.log('AC');
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
  //IMAGE FILE HANDLING+++++++++++++++++++++++++++++++++++++++++++++++++++++STARTS--Gallery Image--MULTIPLE
  const [filevar1, setFile1] = useState(null);
  const [imageURL1, setImageURL1] = useState(null);
  const [disableButton1, setDisableButton1] = useState(true);
  const url1 = domainpath + '/uploads/storetype';

  const uploadFile1 = async e => {
    console.log(filevar1);
    if (filevar1.length > 0) {
      const formData = new FormData();
      [...filevar1].map(file => {
        formData.append('photo', file);
      });
      //for single file working below code-----------------
      //   const formData = new FormData();
      //   formData.append('photo', file);
      //-----------------------------------------------------

      async function uploadphotofunc1(url1, formData) {
        await Axios.post(url1, formData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            token: 'Bearer hjskdhskjdhsjkdhskjdhskjdhskdhskjdhsdjksjhdsjkdsdks',
          },
        })
          .then(response => {
            console.log(response);
            console.log('AC');
            //console.log(response.data.success);
            if (response.status === 200 && response.data.success === 'Success') {
              // console.log('insideeeee');
              // setImageURL1(response.data.url);
              notification.success({
                message: 'Image Added Successfully',
              });
              setTimeout(() => {
                notification.destroy();
              }, 3000);
              //console.log(response.data.url);
              const imageData = response.data.url;
              const images = imageData.toString();
              setImageURL1(images);
              //console.log(images);
              //empty the images uploaded--starts
              setSelectedImages1(null);
              //empty the images uploaded--starts
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
      uploadphotofunc1(url1, formData);
    } else {
      notification.error({
        message: 'Please Select Images First!!',
      });
    }
  };

  // const [selectedImages1, setSelectedImages1] = useState([]);

  const imageHandleChange1 = e => {
    setFile1(null);
    setImageURL1(null);
    setDisableButton1(true);
    //console.log('inside save');
    //  console.log(e.target.files);
    if (e.target.files.length > 0) {
      setFile1(e.target.files);
      //  setFileName1(e.target.files[0].name);
      setDisableButton1(false);
    } else {
      notification.error({
        message: 'Please Select Image!!',
      });
    }
    //console.log(e.target.files);
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file)); //to create a url path for images
      console.log(fileArray);

      //  setSelectedImages1(prev => prev.concat(fileArray));

      setSelectedImages1(prev => prev.concat(fileArray));
      Array.from(e.target.files).map(file => URL.revokeObjectURL(file));
    }
  };

  const renderPictures1 = source => {
    return source?.map((pictures, index) => {
      return (
        <>
          <Image src={pictures} key={pictures} />
          <Button
            type="danger"
            onClick={() => {
              setSelectedImages1(source.filter(e => e !== pictures));
              console.log(index);
              //remove array picture wd specific index ---STARTS
              //let dataimg = JSON.stringify(filevar)
              console.log(filevar1);
              if (filevar1 > 0) {
                const fileListArr1 = Array.from(filevar1);

                console.log(fileListArr1);
                fileListArr1.splice(index, 1); // here u remove the file
                console.log(fileListArr1);
                setFile1(fileListArr1);
                //console.log(filevar);
                //remove array picture wd specific index ---ENDS
              }
            }}
          >
            X
          </Button>
        </>
      );
    });
  };

  //IMAGE FILE HANDLING+++++++++++++++++++++++++++++++++++++++++++++++++++++ENDS--Gallery Image --MULTIPLE

  return (
    <Row gutter={25}>
      <Col xs={24}>
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
                  pattern: /^[a-zA-Z]/,
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
                  pattern: /^[a-zA-Z]/,
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
                initialValue="DD-MM-YYYY"
                disabledDate={disabledDate}
                // value={formData.dateOfBirth}
                onChange={selectedOption =>
                  setformData({ ...formData, date_of_birth: selectedOption.format(dateFormat) })
                }
                format={dateFormat}
              />
            </Form.Item>
          </Col> */}

          <Col md={12} xs={24}>
            <Form.Item
              name="gender"
              initialValue=""
              label="Gender"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please select your gender !',
              //   },
              // ]}
            >
              {/* <Radio.Group
                //value={formData.gender}
                onChange={event => setformData({ ...formData, gender: event })}
              >
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="others">Others</Radio>
              </Radio.Group> */}
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
              name="roles"
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
                onChange={seletedValue => setformData({ ...formData, roles: seletedValue })}
              >
                (<Option value={null}>Select</Option>)
                {role != null
                  ? role.map(item => {
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
              name="active"
              label="Status"
              initialValue=""
              // rules={[
              //   {
              //     required: true,
              //     message: 'Name is required !',
              //   },
              //   { max: 50, message: 'Max 50 characters allowed!' },
              //   {
              //     pattern: /^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/,
              //     message: 'Letters allowed only with space inbetween',
              //   },
              // ]}
            >
              {/* <Input placeholder="Status" readOnly /> */}
              <Select
                style={{ width: '100%' }}
                onChange={seletedValue => {
                  setformData({ ...formData, active: seletedValue });
                  //setDisable(selectedValue == '');
                }}
              >
                <Option value={1}>Published</Option>
                <Option value={0}>Draft</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* <Col md={12} xs={24}> */}
          {/* <BasicFormWrapper>
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
            </BasicFormWrapper> */}
          {/* </Col> */}
        </Row>
        {/* <Row gutter={30}>
          <Col md={12} xs={24}>
            {imageUrl !== null ? (
              <Form.Item name="image" initialValue="" label="Image">
                <Image width={200} src={imageUrl} />
              </Form.Item>
            ) : (
              ''
            )}
          </Col>
        </Row> */}
        {/* <section>
          <Row gutter={30}>
            <Col md={12} xs={24}>
              <Row gutter={30}>
                <Col md={24} xs={24}>
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
                    <Input
                      //required
                      type="file"
                      onChange={e => imageHandleChange(e)}
                    />
                    {console.log(imageUrl)}
                    {imageUrl != null ? (
                      (console.log(imageUrl),
                      (
                        <Button
                          type="success"
                          onClick={e => {
                            uploadFile(e);
                          }}
                          required
                        >
                          Uploaded Successfully
                        </Button>
                      ))
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
              </Row>

              <Row gutter={30}>
                <Col md={24} xs={24}>
                  <div className="result" style={{ width: '20vh' }}>
                    {renderPictures(selectedImages) != ''
                      ? renderPictures(selectedImages)
                      : renderPictures1(selectedImages1)}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </section> */}
      </Col>
    </Row>
  );
};

export default Infos;
