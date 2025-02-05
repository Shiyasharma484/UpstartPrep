import React, { useState } from 'react';
import { Row, Col, Form, Input, Select, DatePicker, Radio, InputNumber } from 'antd'; // Upload, card

const dateFormat = 'MM/DD/YYYY';
const ViewPartnerInfo = ({ formData, setformData }) => {

  return (
    <Row gutter={25}>
      <Col xs={24}>
        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item
              name="first_name"
              label="First Name">
              <Input
                value={formData.first_name}
                onChange={e => setformData({ ...formData, first_name: e.target.value })}
                readOnly
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              name="last_name"
              label="Last Name">
              <Input
                value={formData.last_name}
                onChange={e => setformData({ ...formData, last_name: e.target.value })}
                readOnly
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item
              name="email"
              label="Email Address">
              <Input
                value={formData.email}
                onChange={e => setformData({ ...formData, email: e.target.value })}
                readOnly
              />
            </Form.Item>
          </Col>

          <Col md={12} xs={24}>
            <Form.Item
              name="phone"
              label="Phone Number">
              <Input
                value={formData.phone}
                onChange={e => setformData({ ...formData, phone: e })}
                readOnly
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item
              name="date"
              label="Date of Birth">
              <Input
                value={formData.date}
                onChange={e => setformData({ ...formData, date: e })}
                readOnly
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              name="status"
              label="Gender"
            >
              <Radio.Group
                value={formData.status}
                onChange={e => setformData({ ...formData, status: e.target.value })}
                disabled
              >
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="others">Others</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ViewPartnerInfo;
