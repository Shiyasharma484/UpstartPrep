import React, { useState } from 'react';
import { Row, Col, Form, Input, Select, DatePicker, Radio, InputNumber } from 'antd';
//import { Row, Col, Form, Input, Select, Radio, InputNumber } from 'antd'; // DatePicker
import FeatherIcon from 'feather-icons-react';
import { ShipPopover } from '../../../components/popup/shippopup';
import { DimPopover } from '../../../components/popup/dimpopup';
import { WeightPopover } from '../../../components/popup/weightpopup';
import { useParams } from 'react-router-dom';

const { Option } = Select;
const ViewShipping = ({ formData, setformData }) => {

    const params = useParams();
    console.log(params.id);

    return (
        <Row gutter={25}>
            <Col xs={24}>
                {/* <Cards title="User Information"> */}
                <Row gutter={30}>
                    <Col md={12} xs={24}>
                        <Form.Item
                            name="weight"
                            label="Weight(in kg)"
                        >
                            <div>
                                <InputNumber
                                    type="number"
                                    placeholder=""
                                    style={{ width: '80%' }}
                                // value={formData.weight}
                                //onChange={e => setformData({ ...formData, weight: e })}
                                readOnly/>
                                <WeightPopover placement="bottomLeft">
                                    <FeatherIcon icon="help-circle" size={20} style={{ margin: "auto 10px" }} />
                                </WeightPopover>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={30}>
                    <Col md={12} xs={24}>
                        <Form.Item
                            name="dimensions"
                            label="Dimensions(in cm)"
                        >
                            <div style={{ display: "flex" }}>
                                <Row gutter={15} style={{ width: "84%" }}>
                                    <Col md={8} xs={24}>
                                        <Form.Item
                                            name="length"
                                            label=""
                                        >
                                            <InputNumber
                                                type="number"
                                                placeholder="Length"
                                                style={{ width: '100%' }}
                                            // value={formData.length}
                                            // onChange={e => setformData({ ...formData, length: e })}
                                            readOnly/>
                                        </Form.Item>
                                    </Col>
                                    <Col md={8} xs={24}>
                                        <Form.Item
                                            name="width"
                                            label=""
                                        >
                                            <InputNumber
                                                type="number"
                                                placeholder="Width"
                                                style={{ width: '100%' }}
                                            // value={formData.width}
                                            // onChange={e => setformData({ ...formData, width: e })}
                                            readOnly/>
                                        </Form.Item>
                                    </Col>
                                    <Col md={8} xs={24}>
                                        <Form.Item
                                            name="height"
                                            label=""
                                        >
                                            <InputNumber
                                                type="number"
                                                placeholder="Height"
                                                style={{ width: '100%' }}
                                            //  value={formData.height}
                                            // onChange={e => setformData({ ...formData, height: e })}
                                            readOnly/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <DimPopover placement="bottomLeft">
                                    <FeatherIcon icon="help-circle" size={20} style={{ margin: "auto 10px" }} />
                                </DimPopover>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={30}>
                    <Col md={12} xs={24}>
                        <Form.Item
                            name="shipping_class"
                            label="Shipping Class"
                        >
                            <div>
                                <Select
                                    mode="multiple"
                                    style={{ width: '80%' }}
                                //   value={formData.shipping_class}
                                //  onChange={e => setformData({ ...formData, shipping_class: e })}
                                disabled>
                                    <Option value="please select" label="">
                                        Please Select
                                    </Option>
                                    <Option value="standard" label="Standard Delivery">
                                        Standard Delivery
                                    </Option>
                                    <Option value="fast" label="Fast Delivery">
                                        Fast Delivery
                                    </Option>
                                    <Option value="sameday" label="Same Day Delivery">
                                        Same Day Delivery
                                    </Option>
                                </Select>
                                <ShipPopover placement="bottomLeft">
                                    <FeatherIcon icon="help-circle" size={20} style={{ margin: "auto 10px" }} />
                                </ShipPopover>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default ViewShipping;
