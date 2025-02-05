import React, { useState } from 'react';
import { Row, Col, Input, Form } from 'antd';
// import FeatherIcon from 'feather-icons-react';
// import { UserOutlined } from '@ant-design/icons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Link } from 'react-router-dom';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';


const ApiKeys = () => {

    const [form] = Form.useForm();
    const [state, setState] = useState({
        file: null,
        list: null,
        submitValues: {},
    });
    const handleSubmit = values => {
        setState({ ...state, submitValues: values });
    };
    return (
        <>
            <PageHeader
                ghost
                title="API Keys"

            />
            <Main>

                <div className="input-wrap">
                    <Row gutter={25}>
                        <Col md={8} sm={12} xs={24}>
                            <Form name="sDash_validation-form addProduct" form={form} layout="vertical" onFinish={handleSubmit}>
                                <Cards title="API Key">
                                    <Input placeholder="Enter the API key" />
                                    
                                </Cards>
                                <Cards title="Secret Key">
                                    <Input placeholder="Enter the secret key" />

                                </Cards>

                                <Form.Item>
                                    <div className="add-user-bottom text-right">
                                        <Button
                                            className="ant-btn ant-btn-light"
                                            onClick={() => {
                                                return form.resetFields();
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button htmlType="submit" type="primary">
                                            <Link to="">Save</Link>
                                        </Button>
                                    </div>
                                </Form.Item>



                            </Form>
                        </Col>
                    </Row>
                </div>


            </Main>
        </>
    );
};

export default ApiKeys;
