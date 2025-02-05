import React, { useState } from 'react';
import { Row, Col, Form, Input, Select, Radio } from 'antd';

const { Option } = Select;
const EditCustomerWork = () => {

    return (
        <Row gutter={25}>
            <Col xs={24}>
                <Row gutter={30}>
                    <Col md={12} xs={24}>
                        <Form.Item
                            name="address_line_1"
                            label="Address line 1"
                            rules={[{
                                required: true,
                                message: "address is required",
                            },
                            ]}>
                            <Input placeholder="Floor/Flat no./House no." />
                        </Form.Item>
                    </Col>

                    <Col md={12} xs={24}>
                        <Form.Item
                            name="address_line_2"
                            label="Address Line 2"
                            rules={[{
                                required: true,
                                message: "address is required",
                            },
                            ]}>
                            <Input placeholder="Street name/Sector/Area" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={30}>

                    <Col md={12} xs={24}>
                        <Form.Item
                            name="locality"
                            label="Locality"
                            rules={[{
                                required: false,
                                message: "locality is required",
                            },
                            ]}>
                            <Input placeholder="Nearby Area" />
                        </Form.Item>
                    </Col>

                    <Col md={12} xs={24}>
                        <Form.Item
                            name="country"
                            initialValue=""
                            label="Country"
                            rules={[{
                                required: false,
                                message: "country is required",
                            },
                            ]}>
                            <Select style={{ width: '100%' }}>
                                <Option value="">Please Select</Option>
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
                            initialValue=""
                            name="state"
                            label="State"
                            rules={[{
                                required: false,
                                message: "state is required",
                            },
                            ]}>
                            <Select style={{ width: '100%' }}>
                                <Option value="">Please Select</Option>
                                <Option value="maharashtra">Maharashtra</Option>
                                <Option value="punjab">Punjab</Option>
                                <Option value="haryana">Haryana</Option>
                                <Option value="haryana">Tamilnadu</Option>
                                <Option value="karnataka">Karnataka</Option>
                                <Option value="kerala">Kerala</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col md={12} xs={24}>
                        <Form.Item
                            initialValue=""
                            name="city"
                            label="City"
                            rules={[{
                                required: false,
                                message: "city is required",
                            },
                            ]}>
                            <Select style={{ width: '100%' }}>
                                <Option value="">Please Select</Option>
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
                            label="Postal/Zip/Pin Code"
                            rules={[{
                                required: true,
                                message: "Pin code is required",
                            },
                            ]}>
                            <Input placeholder="160071" />
                        </Form.Item>
                    </Col>

                    <Col md={12} xs={24}>
                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[{
                                required: true,
                                message: "phone number is required",
                            },
                            ]}>
                            <Input placeholder="+440 2546 5236" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={30}>
                    <Col md={12} xs={24}>
                        <Form.Item
                            name="address_type"
                            initialValue="active"
                            label="Address type"
                            rules={[{
                                required: false,
                                message: "address type is required",
                            },
                            ]}>
                            <Radio.Group>
                                <Radio value="home">Home</Radio>
                                <Radio value="work">Work</Radio>
                                <Radio value="other">Other</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default EditCustomerWork;
