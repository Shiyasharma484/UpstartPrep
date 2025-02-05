import React, { useState } from 'react';
import { Row, Col, Form, Input, DatePicker, Select, Radio, InputNumber, Upload, message } from 'antd'; // Upload, , Card
//import { Link } from 'react-router-dom';
//import Select from 'react-select';
import MailComposer from '../../email/overview/MailComposer';

const { Option } = Select;

//const { Dragger } = Upload;
const EditGeneral = ({ formData, setformData }) => {
  const category = [{
    value: 'a',
    label: "Apparels"
  },
  {
    value: 'b',
    label: "Sunglasses"
  },
  {
    value: 'c',
    label: "T-Shirt"
  }
  ];


  return (
    <Row gutter={25}>
      <Col xs={24}>
        {/* <Cards title="User Information"> */}
        {/* //row------------------------------------------------------------------------------------------- */}
        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item
              label="Product Name"
              required
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Name is required !',
                  },
                ]}
              >
                <Input
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={e => setformData({ ...formData, name: e.target.value })}
                />
              </Form.Item>
            </Form.Item>
          </Col>

          <Col md={12} xs={24}>
            <Form.Item label="Category" required>
              <Form.Item
                name="category_id"
                rules={[
                  {
                    required: true,
                    message: 'Please choose a category !',
                  },
                ]}
              >
                <Select
                  mode='tags'
                  options={category}
                  tokenSeparators={[',']}
                  value={[formData.category_id]}
                  onChange={e => setformData({ ...formData, category_id: e })}
                >
                </Select>

              </Form.Item>
            </Form.Item>
          </Col>
        </Row>
        {/* //row------------------------------------------------------------------------------------------- */}
        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item label="Regular Price" required>
              <Form.Item
                name="regular_price"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the price !',
                  },
                ]}
              >
                <InputNumber
                  type="number"
                  style={{ width: '100%' }}
                  value={formData.regular_price}
                  onChange={e => setformData({ ...formData, regular_price: e })}
                />
              </Form.Item>
            </Form.Item>
          </Col>

          <Col md={12} xs={24}>
            <Form.Item label="Sale Price" >
              <Form.Item
                name="sale_price"
              >
                <InputNumber
                  type="number"
                  style={{ width: '100%' }}
                  value={formData.sale_price}
                  onChange={e => setformData({ ...formData, sale_price: e })}
                />
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>

        {/* //row------------------------------------------------------------------------------------------- */}
        
        <Row gutter={30}>
          <Col md={24} xs={24}>
            <Form.Item label="Product Description">
              <Form.Item
                name="description"
                rules={[
                  {
                    required: false,
                    message: 'Please enter description !',
                  },
                ]}
              >
                <div className="editor-compose">
                  <MailComposer
                    text
                    value={formData.description}
                    onChange={e => setformData({ ...formData, description: e })}
                  />
                </div>
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default EditGeneral;
