import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, DatePicker, Select, Radio, InputNumber, Upload, message, Table, Modal } from 'antd'; // Upload, , Card
import { Button } from '../../../components/buttons/buttons';
import FeatherIcon from 'feather-icons-react';
import { Main, TableWrapper } from '../../../container/styled';

const Variants = ({ formData, setformData }) => {
    const { confirm } = Modal;
    const [disValue, setDisValue] = useState(null);
    const [status, setStatus] = useState(false);
    const [statusTable, setStatusTable] = useState(false);

    const changeAttribute = status => {
        setStatus(status);
    }

    const changeAttribute1 = statusTable => {
        setStatusTable(statusTable);
    }

    const attributes = [
        {
            value: 'a',
            label: "Customize your attribute"
        },
        {
            value: 'b',
            label: "Color"
        },
        {
            value: 'c',
            label: "Size"
        },
        {
            value: 'd',
            label: "Type"
        },
    ];

    const colors = [
        {
            value: 'a',
            label: "Please select"
        },
        {
            value: 'b',
            label: "Red"
        },
        {
            value: 'c',
            label: "Blue"
        },
        {
            value: 'd',
            label: "Black"
        },
        {
            value: 'e',
            label: "White"
        },
    ];

    const size = [
        {
            value: 'a',
            label: "Please select"
        },
        {
            value: 'b',
            label: "S"
        },
        {
            value: 'c',
            label: "M"
        },
        {
            value: 'd',
            label: "L"
        },
        {
            value: 'e',
            label: "XL"
        },
        {
            value: 'f',
            label: "XXL"
        },
    ];

    const type = [
        {
            value: 'a',
            label: "Please select"
        },
        {
            value: 'b',
            label: "Plastic"
        },
        {
            value: 'c',
            label: "Silk"
        },
        {
            value: 'd',
            label: "Cotton"
        },
    ];

    const [state, setState] = useState({
        dataSource: [
            {
                key: '',
                color: '',
                size: '',
                type: '',
                price: '',
                sku: '',
            }
        ],
        count: 1,
    });

    const { dataSource } = state;



    const multiHandle = (e) => {
        console.log(`selected ${e}`);
        // let b=category[e-1].label;
        //console.log(b);
        // setDisValue({...disValue,b})
        // setDisValue(Array.isArray(e) ? e.map(a => attributes[a - 1].label) : []);
        // console.log(disValue);
    };



    const addNewRecord = () => {
        const { count, dataSource } = state;
        const newRecord = {
            key: count,
            color: '',
            size: '',
            type: '',
            price: '',
            sku: '',
        }
        setState({
            dataSource: [...dataSource, newRecord],
            count: count + 1,
        });
    };

    const deleteRecord = (key) => {
        console.log(key);
        const { count, dataSource } = state;
        confirm({
            title: 'Do you want to delete this item?',
            onOk() {
                setState({
                    dataSource: dataSource.filter(item => item.key !== key),
                    count: count - 1,
                });
            }
        });
    };


    // if (variantslist.length) {
    //     variantslist.map((value, key) => {
    //         const { color, size, type, sku, price } = value;
    //         return dataSource.push({
    //             key: key + 1,
    //             color: color,
    //             size: size,
    //             type: type,
    //             sku: sku,
    //             price: price,
    //             // status: (
    //             //   <span
    //             //     className={`status ${
    //             //       status === 'Active' ? 'Success' : status === 'Inactive' ? 'error' : 'error'
    //             //     }`}
    //             //   >
    //             //     {status}
    //             //   </span>
    //             // ),
    //             action: (
    //                 <div className="table-actions">
    //                     <>
    //                         <Button onClick={addNewRecord} className="btn-icon" type="info" to="#" shape="circle">
    //                             <FeatherIcon icon="plus" size={16} />
    //                         </Button>
    //                         <Button className="btn-icon" type="danger" to="#" shape="circle">
    //                             <FeatherIcon icon="trash-2" size={16} />
    //                         </Button>
    //                     </>
    //                 </div>
    //             ),
    //         });
    //     });
    // }


    const columns = [
        {
            title: 'Color',
            dataIndex: 'color',
            key: '1',
            render: () => <Select defaultValue='a' options={colors} style={{ width: '100%' }}></Select>
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: '2',
            render: () => <Select defaultValue='a' options={size} style={{ width: '100%' }}></Select>

        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: '3',
            render: () => <Select defaultValue='a' options={type} style={{ width: '100%' }}></Select>

        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: '4',
            render: () => <Input style={{ width: "100%" }} />
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: '5',
            render: () => <Input style={{ width: "100%" }} />
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: '6',
            render: (_, record) => {
                return (
                    <div className="table-actions">
                        <>
                            <Button onClick={addNewRecord} className="btn-icon" type="info" to="#" shape="circle">
                                <FeatherIcon icon="plus" size={16} />
                            </Button>
                            <Button onClick={() => dataSource.length > 1 ? (deleteRecord(record.key)) : null} className="btn-icon" type="danger" to="#" shape="circle">
                                <FeatherIcon icon="trash-2" size={16} />
                            </Button>
                        </>
                    </div>
                )
            }
        }
    ];



    return (
        <Row gutter={25}>
            <Col xs={24}>
                {/* <Cards title="User Information"> */}
                {/* //row------------------------------------------------------------------------------------------- */}
                <Row gutter={15}>
                    <Col lg={12} md={12} xs={24}>
                        <Form.Item
                            name="attribute"
                            label="Attributes"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please choose a category !',
                                },
                            ]}
                        >
                            <Select mode='tags' options={attributes} onChange={multiHandle}></Select>

                            {/* <Select mode="multiple" style={{ width: '100%' }} defaultValue={'Apparels'}>
                                <Option value="" label="Please Select"></Option>
                                <Option value="wearingClothes" label="Apparels">
                                    Apparels
                                </Option>
                                <Option value="sunglasses" label="Sunglasses">
                                    Sunglasses
                                </Option>
                                <Option value="t-shirt" label="T-Shirt">
                                    T-Shirt
                                </Option>
                            </Select> */}
                            {/* <h1>{disValue === null ? "" : `${disValue}`}</h1> */}
                        </Form.Item>
                    </Col>
                    <Col lg={12} md={12} xs={24}>
                        <Form.Item
                            name="button"
                            initialValue=""
                            label=""
                        >
                            <Button
                                type="success"
                                size="default"
                                onClick={() => changeAttribute(true)}
                                style={{marginTop: '30px'}}>
                                Add
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={30}>
                    <Col md={24}>
                        {status === true ?
                            <Row gutter={30}>
                                <Col lg={24} md={24} xs={24}>
                                    <Row gutter={30}>
                                        <Col lg={4} md={4} xs={24}>
                                            <Form.Item
                                                name="color"
                                            >
                                                <Input placeholder="Color" style={{ width: "80%" }} disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col lg={8} md={8} xs={24}>
                                            <Form.Item
                                                name="colors"
                                                initialValue={"Red, Blue, Black, White"}
                                            >
                                                <Input placeholder="Red, Blue, Black, White" style={{ width: "80%" }} />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={30}>
                                        <Col lg={4} md={4} xs={24}>
                                            <Form.Item
                                                name="size"
                                            >
                                                <Input placeholder="Size" style={{ width: "80%" }} disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col lg={8} md={8} xs={24}>
                                            <Form.Item
                                                name="sizes"
                                                initialValue={"S,L,XL,XXL"}
                                            >
                                                <Input placeholder="S,L,XL,XXL" style={{ width: "80%" }} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={30}>
                                        <Col lg={4} md={4} xs={24}>
                                            <Form.Item
                                                name="type"
                                            >
                                                <Input placeholder="Type" style={{ width: "80%" }} disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col lg={8} md={8} xs={24}>
                                            <Form.Item
                                                name="types"
                                                initialValue={"Plastic, Silk, Cotton"}
                                            >
                                                <Input placeholder="Plastic, Silk, Cotton" style={{ width: "80%" }} />
                                            </Form.Item>
                                        </Col>
                                        <Col lg={12} md={12} xs={24}>
                                            <Button
                                                type="success"
                                                size="default"
                                                onClick={() => changeAttribute1(true)}>
                                                Add
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row gutter={30}>
                                        <Col md={24}>
                                            {statusTable === true ?
                                                <Row gutter={30}>
                                                    <Col md={24}>
                                                        <TableWrapper className="table-order table-responsive">
                                                            <Table
                                                                dataSource={dataSource}
                                                                columns={columns}
                                                            />
                                                        </TableWrapper>
                                                    </Col>
                                                </Row> : null}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            : null}
                    </Col>
                </Row>



            </Col>
        </Row>
    );
};

export default Variants;
