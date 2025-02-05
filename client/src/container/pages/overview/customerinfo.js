import React, { useState } from 'react';
import { Row, Col, Form, Input, Select, DatePicker, Radio, InputNumber } from 'antd'; //card, Upload
import { Link } from 'react-router-dom';
import { Button } from '../../../components/buttons/buttons';


const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';
const CustomerInfo = () => {
  const [state, setState] = useState({
    values: '',
  });


  return (
    <Row gutter={25}>
      <Col xs={24}>
            <Row gutter={30}>
              <Col md={12} xs={24}>
                <Form.Item
                  name="first_name"
                  label="First Name"

                >
                  <Input placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item
                  name="last_name"
                  label="Last Name"

                >
                  <Input placeholder="Last Name" />
                </Form.Item>
              </Col>
              </Row>
              <Row gutter={30}>

              <Col md={12} xs={24}>
                <Form.Item
                  name="email"
                  label="Email Address"

                >
                  <Input type="email" placeholder="name@example.com" />
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item
                  name="phone"
                  label="Phone Number"

                >
                  <InputNumber type="number" placeholder="+44 2546 5236" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              </Row>
              <Row gutter={30}>

              {/* <Col md={8} xs={24}>
                <Form.Item name="country" initialValue="" label="Country">
                  <Select style={{ width: '100%' }}>
                    <Option value="">Please Select</Option>
                    <Option value="russia">Russia</Option>
                    <Option value="india">India</Option>
                    <Option value="uk">United Kingdom</Option>
                    <Option value="usa">United States</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col md={8} xs={24}>
                <Form.Item initialValue="" name="state" label="State">
                  <Select style={{ width: '100%' }}>
                    <Option value="">Please Select</Option>
                    <Option value="maharashtra">Maharashtra</Option>
                    <Option value="punjab">Punjab</Option>
                    <Option value="haryana">Haryana</Option>
                    <Option value="haryana">Tamilnadu</Option>
                    <Option value="karnataka">Karnataka</Option>
                    <Option value="kerala">Kerala</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col md={8} xs={24}>
                <Form.Item initialValue="" name="city" label="City">
                  <Select style={{ width: '100%' }}>
                    <Option value="">Please Select</Option>
                    <Option value="dhaka">Dhaka</Option>
                    <Option value="khulna">Khulna</Option>
                    <Option value="barisal">Barisal</Option>
                  </Select>
                </Form.Item>
              </Col> */}

              <Col md={12} xs={24}>
                <Form.Item name="date" rules={[{ type: 'object', whitespace: true }]} label="Date of Birth">
                  <DatePicker format={dateFormat} style={{ width: '100%' }} />
                </Form.Item>
              </Col>

              <Col md={12} xs={24}>
                <Form.Item name="status" initialValue="active" label="Gender">
                  <Radio.Group>
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                    <Radio value="others">Others</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
      </Col>



      {/* <Col xl={10} md={16} xs={24}>
        <Cards title="Personal Information">
          <div className="user-info-form">
            <BasicFormWrapper>
              <Form style={{ width: '100%' }} form={form} name="info" layout="vertical" onFinish={handleSubmit}>
                <Heading className="form-title" as="h4">
                  Personal Information
                </Heading> 

                <figure className="photo-upload align-center-v">
                  <img src={require('../../../static/img/avatar/pic1.jpg')} alt="" style={{ width: '120px' }} />
                  <figcaption>
                    <Upload>
                      <Link className="btn-upload" to="#">
                        <FeatherIcon icon="camera" size={16} />
                      </Link>
                    </Upload>
                    <div className="info">
                      <Heading as="h4">Profile Photo</Heading>
                    </div>
                  </figcaption>
                </figure>
                
             </Form>
            </BasicFormWrapper>
          </div>
        </Cards>
      </Col> */}

    </Row>
  );
};

export default CustomerInfo;
