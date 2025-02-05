import React, { useState } from 'react';
import { Row, Col, Form, Input, DatePicker, Radio, InputNumber } from 'antd'; //card, Upload

const dateFormat = 'MM/DD/YYYY';
const ViewCustomerInfo = () => {

    const [form] = Form.useForm();

    return (
        <Row gutter={25}>
            <Col xs={24}>
                <Row gutter={30}>
                    <Col md={12} xs={24}>
                        <Form.Item
                            name="f-name"
                            label="First Name"
                        >
                            <Input placeholder="First Name" readOnly/>
                        </Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                        <Form.Item
                            name="l-name"
                            label="Last Name"
                        >
                            <Input placeholder="Last Name" readOnly/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={30}>
                    <Col md={12} xs={24}>
                        <Form.Item
                            name="email"
                            label="Email Address"
                        >
                            <Input type="email" placeholder="name@example.com" readOnly/>
                        </Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                        <Form.Item
                            name="pnumber"
                            label="Phone Number"
                        >
                            <InputNumber type="number" placeholder="+44 2546 5236" style={{ width: '100%' }} readOnly/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={30}>
                    <Col md={12} xs={24}>
                        <Form.Item name="hiringDate" rules={[{ type: 'object', whitespace: true }]} label="Date of Birth">
                            <DatePicker format={dateFormat} style={{ width: '100%' }} disabled/>
                        </Form.Item>
                    </Col>
                    <Col md={12} xs={24} disabled>
                        <Form.Item name="status" initialValue="active" label="Gender">
                            <Radio.Group disabled>
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

export default ViewCustomerInfo;
