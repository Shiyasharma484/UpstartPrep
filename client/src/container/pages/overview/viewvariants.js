import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, DatePicker, Select, Radio, InputNumber, Upload, message, Table } from 'antd'; // Upload, , Card
import { Button } from '../../../components/buttons/buttons';
import FeatherIcon from 'feather-icons-react';
import { Main, TableWrapper } from '../../../container/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewVariants = ({ formData, setformData }) => {
    const [disValue, setDisValue] = useState(null);
    const dispatch = useDispatch();

    const params = useParams();
    console.log(params.id);

    const { searchData, variantslist } = useSelector(state => {
        return {
            searchData: state.headerSearchData,
            variantslist: state.variantslist.data,
        };
    });

    const [state, setState] = useState({
        notData: searchData,
        item: variantslist,
        visible: false,
        selectedRowKeys: [],
    });

    const { selectedRowKeys } = state;


    useEffect(() => {
        if (variantslist) {
            setState({
                item: variantslist,
                selectedRowKeys,
            });
        }
    }, [variantslist, selectedRowKeys]);



    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            onSelectChange(selectedRowKeys);
        },
    };

    const [dataSource, setDataSource] = useState([
        {
            color: '',
            size: '',
            type: '',
            price: '',
            sku: '',
            actions: ''
            // action: (
            //     <div className="table-actions">
            //         <>
            //             <Button onClick={addNewRecord} className="btn-icon" type="info" to="#" shape="circle">
            //                 <FeatherIcon icon="plus" size={16} />
            //             </Button>
            //             <Button className="btn-icon" type="danger" to="#" shape="circle">
            //                 <FeatherIcon icon="trash-2" size={16} />
            //             </Button>
            //         </>
            //     </div>
            // ),
        }

    ]);



    const attributes = [{
        value: 1,
        label: "Color"
    },
    {
        value: 2,
        label: "Size"
    },
    {
        value: 3,
        label: "Type"
    },
    ];

    const colors = [{
        value: 1,
        label: "Red"
    },
    {
        value: 2,
        label: "Blue"
    },
    {
        value: 3,
        label: "Black"
    },
    {
        value: 4,
        label: "White"
    },
    ];

    const size = [{
        value: 1,
        label: "S"
    },
    {
        value: 2,
        label: "M"
    },
    {
        value: 3,
        label: "L"
    },
    {
        value: 4,
        label: "XL"
    },
    {
        value: 5,
        label: "XXL"
    },
    ];

    const type = [{
        value: 1,
        label: "Plastic"
    },
    {
        value: 2,
        label: "Silk"
    },
    {
        value: 3,
        label: "Cotton"
    },
    ];

    const multiHandle = (e) => {
        console.log(e);
        // let b=category[e-1].label;
        //console.log(b);
        // setDisValue({...disValue,b})
        setDisValue(Array.isArray(e) ? e.map(a => attributes[a - 1].label) : []);
        // console.log(disValue);
    };

    

    const addNewRecord = () => {
        const newRecord = {
            color: '',
            size: '',
            type: '',
            price: '',
            sku: '',
            action: ''
            // action: (
            //     <div className="table-actions">
            //         <>
            //             <Button onClick={addNewRecord} className="btn-icon" type="info" to="#" shape="circle">
            //                 <FeatherIcon icon="plus" size={16} />
            //             </Button>
            //             <Button onClick={()=>{deleteRecord(record)} } className="btn-icon" type="danger" to="#" shape="circle">
            //                 <FeatherIcon icon="trash-2" size={16} />
            //             </Button>
            //         </>
            //     </div>
            // ),
        }
        setDataSource((pre) => {
            console.log(pre);
            console.log(newRecord);
            return [...pre, newRecord];
        });
    }


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
            dataIndex: '',
            key: 'color',
            render: () => <Select options={colors}></Select>
        },
        {
            title: 'Size',
            dataIndex: '',
            key: 'size',
            render: () => <Select options={size}></Select>

        },
        {
            title: 'Type',
            dataIndex: '',
            key: 'type',
            render: () => <Select options={type}></Select>

        },
        {
            title: 'SKU',
            dataIndex: '',
            key: 'sku',
            render: () => <Input style={{ width: "50%" }} />
        },
        {
            title: 'Price',
            dataIndex: '',
            key: 'price',
            render: () => <Input style={{ width: "50%" }} />
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            render: (record) => {
                console.log(record);
                return (
                    <div className="table-actions">
                    <>
                        <Button onClick={addNewRecord} className="btn-icon" type="info" to="#" shape="circle">
                            <FeatherIcon icon="plus" size={16} />
                        </Button>
                        <Button onClick={()=>{deleteRecord(record)} } className="btn-icon" type="danger" to="#" shape="circle">
                            <FeatherIcon icon="trash-2" size={16} />
                        </Button>
                    </>
                </div>
                )
            }
        }
    ];

    const deleteRecord = (record) =>{
        console.log(record);
        setDataSource((pre)=>{
            return pre.filter((att)=>{att.id !==record.id});
        })
    }

    return (
        <Row gutter={25}>
            <Col xs={24}>
                {/* <Cards title="User Information"> */}
                {/* //row------------------------------------------------------------------------------------------- */}
                <Row gutter={15}>
                    <Col lg={12} md={12} xs={24}>
                        <Form.Item
                            name="attribute"
                            initialValue=""
                            label="Attributes"
                        >
                            <Select mode='multiple' options={attributes} onChange={multiHandle} disabled></Select>

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
                            {/* <Button
                                                type="success"
                                                size="default"
                                            onClick = {mutliHandle}>
                                                Add
                                            </Button> */}
                            <h1>{disValue === null ? "" : `${disValue}`}</h1>
                        </Form.Item>

                    </Col>
                </Row>
                <Row gutter={15}>
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
                            <Input placeholder="Red, Blue, Black, White" style={{ width: "80%" }} readOnly/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={15}>
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
                            <Input placeholder="S,L,XL,XXL" style={{ width: "80%" }} readOnly/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={15}>
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
                            <Input placeholder="Plastic, Silk, Cotton" style={{ width: "80%" }} readOnly/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={15}>
                    <Col md={24}>
                        <TableWrapper className="table-order table-responsive">
                            <Table
                                rowSelection={rowSelection}
                                dataSource={dataSource}
                                columns={columns}
                            //pagination={{ pageSize: 7, showSizeChanger: true, total: variantslist.length }}
                            />
                        </TableWrapper>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default ViewVariants;
