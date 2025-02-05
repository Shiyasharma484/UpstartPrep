import React, { useState } from 'react';
import { Row, Col, Form, Input, Select, Radio } from 'antd';
//import { Row, Col, Form, Input, Select, DatePicker, Radio } from 'antd';
import { Link } from 'react-router-dom';
// import { BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
// import Heading from '../../../components/heading/heading';
import { Cards } from '../../../components/cards/frame/cards-frame';

// const dateFormat = 'MM/DD/YYYY';
const { Option } = Select;
const ViewCustomerWork = () => {
    const [form] = Form.useForm();

    return (
        <Row gutter={25}>
            <Col xs={24}>
                <Row gutter={30}>
                    <Col md={12} xs={24}>
                        <Form.Item name="address_line_1" label="Address line 1">
                            <Input placeholder="Floor/Flat no./House no." readOnly/>
                        </Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                        <Form.Item name="address_line_2" label="Address Line 2">
                            <Input placeholder="Street name/Sector/Area" readOnly/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={30}>
                    <Col md={12} xs={24}>
                        <Form.Item name="locality" label="Locality">
                            <Input placeholder="Nearby Area" readOnly/>
                        </Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                        <Form.Item name="country" initialValue="" label="Country">
                            <Select style={{ width: '100%' }} disabled>
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
                        <Form.Item initialValue="" name="state" label="State">
                            <Select style={{ width: '100%' }} disabled>
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
                        <Form.Item initialValue="" name="city" label="City">
                            <Select style={{ width: '100%' }} disabled>
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
                        <Form.Item name="postal_code" label="Postal/Zip/Pin Code">
                            <Input placeholder="160071" readOnly/>
                        </Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                        <Form.Item name="phone" label="Phone Number">
                            <Input placeholder="+440 2546 5236" readOnly/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={30}>
                    <Col md={12} xs={24}>
                        <Form.Item name="address_type" initialValue="active" label="Address type">
                            <Radio.Group disabled>
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

export default ViewCustomerWork;
