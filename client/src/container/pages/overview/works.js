import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Row, Col, Form, Input, Select, InputNumber, notification } from 'antd';
import { useHistory, useParams } from 'react-router-dom';

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const { Option } = Select;

const Work = ({ formData, setformData }) => {
  return (
    <Row gutter={25}>
      <Col xs={24}>
        <Row gutter={30}>
          <Col md={12} xs={24}>
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
                // value={formData.addressLineOne}
                onChange={event => setformData({ ...formData, address_line1: event.target.value })}
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
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
                //value={formData.addressLineTwo}
                onChange={event => setformData({ ...formData, address_line2: event.target.value })}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={30}>
          <Col md={12} xs={24}>
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
                //value={formData.country}
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
          <Col md={12} xs={24}>
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
                //value={formData.state}
                onChange={event => setformData({ ...formData, state: event.target.value })}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={30}>
          <Col md={12} xs={24}>
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
                //value={formData.city}
                onChange={event => setformData({ ...formData, city: event.target.value })}
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
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
                //value={formData.zip}
                onChange={selectedZip => setformData({ ...formData, zip: selectedZip })}
              />
            </Form.Item>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Work;
