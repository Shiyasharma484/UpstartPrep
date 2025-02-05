import React, { useState } from 'react';
import { Row, Col, Form, Input, Radio, Select, InputNumber } from 'antd'; // DatePicker, Radio, InputNumber, Select

// const dateFormat = 'MM/DD/YYYY';
const { Option } = Select;
const PartnerWork = ({ formData, setformData }) => {


  return (
    <Row gutter={25}>
      <Col xs={24}>
        <Row gutter={30}>
          {/* <Col md={8} xs={24}>
            <Form.Item name="address_type" initialValue="active" label="Address type">
              <Radio.Group>
                <Radio value="home">Home</Radio>
                <Radio value="work">Work</Radio>
                <Radio value="other">Other</Radio>
              </Radio.Group>
            </Form.Item>
          </Col> */}

          <Col md={12} xs={24}>
            <Form.Item
              name="address_line_1"
              label="Address line 1"
            >
              <Input
                placeholder="Floor/Flat no./House no."
                value={formData.address_line_1}
                onChange={e => setformData({ ...formData, address_line_1: e.target.value })}
              />
            </Form.Item>
          </Col>

          <Col md={12} xs={24}>
            <Form.Item
              name="address_line_2"
              label="Address Line 2"
            >
              <Input
                placeholder="Street name/Sector/Area"
                value={formData.address_line_2}
                onChange={e => setformData({ ...formData, address_line_2: e.target.value })}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item
              name="locality"
              label="Locality"
            >
              <Input
                placeholder="Nearby Area"
                value={formData.locality}
                onChange={e => setformData({ ...formData, locality: e.target.value })}
              />
            </Form.Item>
          </Col>

          <Col md={12} xs={24}>
            <Form.Item
              name="country"
              label="Country"
            >
              <Select
                style={{ width: '100%' }}
                value={formData.country}
                onChange={e => setformData({ ...formData, country: e })}
              >
                <Option value="russia">Russia</Option>
                <Option value="india">India</Option>
                <Option value="uk">United Kingdom</Option>
                <Option value="usa">United States</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item
              name="state"
              label="State"
            >
              <Select
                style={{ width: '100%' }}
                value={formData.state}
                onChange={e => setformData({ ...formData, state: e })}
              >
                <Option value="maharashtra">Maharashtra</Option>
                <Option value="punjab">Punjab</Option>
                <Option value="haryana">Haryana</Option>
                <Option value="tamilnadu">Tamilnadu</Option>
                <Option value="karnataka">Karnataka</Option>
                <Option value="kerala">Kerala</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col md={12} xs={24}>
            <Form.Item
              name="city"
              label="City">
              <Select
                style={{ width: '100%' }}
                value={formData.city}
                onChange={e => setformData({ ...formData, city: e })}
              >
                <Option value="dhaka">Dhaka</Option>
                <Option value="khulna">Khulna</Option>
                <Option value="barisal">Barisal</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item
              name="postal_code"
              label="Postal Code/Zip Code/Pin Code">
              <InputNumber
                type="number"
                placeholder="160071"
                style={{ width: '100%' }}
                value={formData.postal_code}
                onChange={e => setformData({ ...formData, postal_code: e })}
              />
            </Form.Item>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default PartnerWork;
