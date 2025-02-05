import React, { useState } from 'react';
import { Row, Col, Form, Input, Radio, Select, InputNumber } from 'antd'; // DatePicker, Radio, InputNumber, Select

// const dateFormat = 'MM/DD/YYYY';
const { Option } = Select;
const ViewPartnerWork = ({ formData, setformData }) => {

  return (
    <Row gutter={25}>
      <Col xs={24}>
        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item
              name="address_line_1"
              label="Address line 1"
            >
              <Input
                value={formData.address_line_1}
                onChange={e => setformData({ ...formData, address_line_1: e.target.value })}
                readOnly
              />
            </Form.Item>
          </Col>

          <Col md={12} xs={24}>
            <Form.Item
              name="address_line_2"
              label="Address Line 2"
            >
              <Input
                value={formData.address_line_2}
                onChange={e => setformData({ ...formData, address_line_2: e.target.value })}
                readOnly
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
                value={formData.locality}
                onChange={e => setformData({ ...formData, locality: e.target.value })}
                readOnly
              />
            </Form.Item>
          </Col>

          <Col md={12} xs={24}>
            <Form.Item
              name="country"
              label="Country"
            >
              <Input
                value={formData.country}
                onChange={e => setformData({ ...formData, country: e })}
                readOnly
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item
              name="state"
              label="State"
            >
              <Input
                value={formData.state}
                onChange={e => setformData({ ...formData, state: e })}
                readOnly
              />
            </Form.Item>
          </Col>

          <Col md={12} xs={24}>
            <Form.Item
              name="city"
              label="City">
              <Input
                value={formData.city}
                onChange={e => setformData({ ...formData, city: e })}
                readOnly
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item
              name="postal_code"
              label="Postal Code/Zip Code/Pin Code">
              <Input
                value={formData.postal_code}
                onChange={e => setformData({ ...formData, postal_code: e })}
                readOnly
              />
            </Form.Item>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ViewPartnerWork;
