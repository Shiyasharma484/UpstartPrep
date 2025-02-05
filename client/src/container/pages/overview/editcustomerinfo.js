import React, { useState } from 'react';
import { Row, Col, Form, Input, DatePicker, Radio, InputNumber } from 'antd'; //card, Upload

const dateFormat = 'MM/DD/YYYY';
const EditCustomerInfo = () => {

    return (
        <Row gutter={25}>
            <Col xs={24}>
                <Row gutter={30}>
                    <Col md={12} xs={24}>
                        <Form.Item
                            name="f-name"
                            label="First Name"
                            rules={[{
                                required: true,
                                message: "First name is required",
                            },
                            ]}
                        >
                            <Input placeholder="First Name" />
                        </Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                        <Form.Item
                            name="l-name"
                            label="Last Name"
                            rules={[{
                                required: true,
                                message: "Last name is required",
                            },
                            ]}
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
                            rules={[{
                                required: true,
                                message: "Email is required",
                            },
                            ]}
                        >
                            <Input type="email" placeholder="name@example.com" />
                        </Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[{
                                required: true,
                                message: "Phone number is required",
                            },
                            ]}
                        >
                            <InputNumber type="number" placeholder="+44 2546 5236" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={30}>
                    <Col md={12} xs={24}>
                        <Form.Item
                            name="date_of_birth"
                            rules={[{
                                type: 'object',
                                whitespace: true
                            },
                            {
                                required: false,
                                message: "Date is required",
                            },
                            ]} label="Date of Birth">
                            <DatePicker format={dateFormat} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>

                    <Col md={12} xs={24}>
                        <Form.Item
                            name="status"
                            initialValue="active"
                            label="Gender"
                            rules={[{
                                required: false,
                                message: "Status is required",
                            },
                            ]}>
                            <Radio.Group>
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

export default EditCustomerInfo;
