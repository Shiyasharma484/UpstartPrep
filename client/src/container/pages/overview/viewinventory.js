import React, { useState } from 'react';
import { Row, Col, Form, Input, Select, DatePicker, Radio, InputNumber } from 'antd';
import FeatherIcon from 'feather-icons-react';

import { SKUPopover } from '../../../components/popup/skupopup';
import { StockPopover } from '../../../components/popup/stockpopup';
import { useParams } from 'react-router-dom';

const dateFormat = 'MM/DD/YYYY';
const { Option } = Select;
const ViewInventory = ({ formData, setformData }) => {
  const params = useParams();
  console.log(params.id);

  return (
    <Row gutter={25}>
      <Col xs={24}>
        {/* <Cards title="User Information"> */}
        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item
              name="sku"
              label="SKU"
            >
              <div>
                <Input placeholder="" style={{ width: "80%" }} readOnly/>
                <SKUPopover placement="bottomLeft">
                  <FeatherIcon icon="help-circle" size={20} style={{ margin: "auto 10px" }} />
                </SKUPopover>

              </div>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item
              name="stock"
              label="Total Stock"
            >
              <div>
                <InputNumber type={"number"} placeholder="" style={{ width: "80%" }} readOnly/>
              </div>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item
              name="stock_status"
              initialValue=""
              label="Stock Status"
            // rules={[
            //   {
            //     required: true,
            //     message: 'Kindly select status !',
            //   },
            // ]}
            >
              <div>
                <Select style={{ width: '80%' }} disabled>
                  <Option value="">Please Select</Option>
                  <Option value="instock">In Stock</Option>
                  <Option value="outofstock">Out Of Stock</Option>
                  <Option value="onbackorder">On Backorder</Option>
                </Select>
                <StockPopover placement="bottomLeft">
                  <FeatherIcon icon="help-circle" size={20} style={{ margin: "auto 10px" }} />
                </StockPopover>
              </div>
            </Form.Item>
          </Col>

        </Row>
      </Col>
    </Row>
  );
};

export default ViewInventory;
