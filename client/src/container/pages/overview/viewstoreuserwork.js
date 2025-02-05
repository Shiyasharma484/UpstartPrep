import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Row, Col, Form, Input, Select, InputNumber, notification } from 'antd';
import { useHistory, useParams } from 'react-router-dom';

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const { Option } = Select;
const ViewStoreUserWork = ({ formData, setformData }) => {
  const history = useHistory(); //for redirects in page
  const [form] = Form.useForm();
  return (
    <Row gutter={25}>
      <Col xs={24}>
        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item name="address_line1" label="Address Line 1">
              <Input
                //  placeholder="Floor, Flat/House Number"
                //value={formData.addressLineOne}
                //   onChange={event => setformData({ ...formData, address_line1: event.target.value })}
                readOnly
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item name="address_line2" label="Address Line 2">
              <Input
                //  placeholder="Street and locality"
                //value={formData.addressLineTwo}
                // onChange={event => setformData({ ...formData, address_line2: event.target.value })}
                readOnly
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item name="country" label="Country">
              <Input
                //  style={{ width: '100%' }}
                //value={formData.country}
                //   onChange={(event)=> setformData({...formData, country:event})}
                readOnly
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item name="state" label="State">
              <Input
                // placeholder="Enter state Name"
                //value={formData.state}
                //  onChange={event => setformData({ ...formData, state: event.target.value })}
                readOnly
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item name="city" label="City">
              <Input
                // placeholder="Enter city name"
                //value={formData.city}
                // onChange={event => setformData({ ...formData, city: event.target.value })}
                readOnly
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item name="postal_code" label="Postal/Zip/Pin">
              <Input
                // type="number"
                //  placeholder="160071"
                // style={{ width: '100%' }}
                //value={formData.zip}
                //  onChange={event => setformData({ ...formData, postal_code: event })}
                readOnly
              />
            </Form.Item>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ViewStoreUserWork;
