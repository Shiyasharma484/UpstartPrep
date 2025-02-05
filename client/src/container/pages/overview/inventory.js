import React, { useState } from 'react';
import { Row, Col, Form, Input, Select, DatePicker, Radio, InputNumber } from 'antd';
import FeatherIcon from 'feather-icons-react';

import { SKUPopover } from '../../../components/popup/skupopup';
import { StockPopover } from '../../../components/popup/stockpopup';

const dateFormat = 'MM/DD/YYYY';
const { Option } = Select;
const Inventory = ({ formData, setformData }) => {

  return (
    <Row gutter={25}>
      <Col xs={24}>
        {/* <Cards title="User Information"> */}
        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item
              name="sku"
              label="SKU"
              rules={[
                {
                  required: true,
                  message: 'Enter SKU code !',
                },
              ]}
            >
              <Input
                style={{ width: "80%" }}
                value={formData.sku}
                onChange={e => setformData({ ...formData, sku: e.target.value })}
              />
              {/* <SKUPopover placement="bottomLeft">
                <FeatherIcon icon="help-circle" size={20} style={{ margin: "auto 10px" }} />
              </SKUPopover> */}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item
              name="stock"
              label="Total Stock"
              rules={[
                {
                  required: true,
                  message: 'Enter total stock remaining !',
                },
              ]}
            >
              <InputNumber
                type="number"
                placeholder=""
                style={{ width: "80%" }}
                value={formData.stock}
                onChange={e => setformData({ ...formData, stock: e })}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item
              name="stock_status"
              label="Stock Status"
            rules={[
              {
                required: true,
                message: 'Kindly select status !',
              },
            ]}
            >
              <Select
                style={{ width: '80%' }}
                value={[formData.stock_status]}
                onChange={e => setformData({ ...formData, stock_status: e })}
                defaultValue={'please select'}
              >
                <Option value="please select">Please Select</Option>
                <Option value="instock">In Stock</Option>
                <Option value="outofstock">Out Of Stock</Option>
                <Option value="onbackorder">On Backorder</Option>
              </Select>
              {/* <StockPopover placement="bottomLeft">
                <FeatherIcon icon="help-circle" size={20} style={{ margin: "auto 10px" }} />
              </StockPopover> */}
            </Form.Item>
          </Col>

        </Row>
      </Col>
    </Row>
  );
};

export default Inventory;
