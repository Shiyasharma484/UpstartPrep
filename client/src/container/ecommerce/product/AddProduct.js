import React, { useState } from 'react';
import { Row, Col, Form, Input, Select, InputNumber, Radio, Upload, message } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { Link } from 'react-router-dom';

import Heading from '../../../components/heading/heading';

const { Option } = Select;
const { Dragger } = Upload;

var ModuleName = 'ADDPRODUCT';
const AddProduct = () => {
  const [form] = Form.useForm();
  const [state, setState] = useState({
    file: null,
    list: null,
    submitValues: {},
  });

  const fileList = [
    {
      uid: '1',
      name: '1.png',
      status: 'done',
      url: require('../../../static/img/products/1.png'),
      thumbUrl: require('../../../static/img/products/1.png'),
    },
  ];

  const fileUploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        setState({ ...state, file: info.file, list: info.fileList });
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    listType: 'picture',
    defaultFileList: fileList,
    showUploadList: {
      showRemoveIcon: true,
      removeIcon: <FeatherIcon icon="trash-2" onClick={e => console.log(e, 'custom removeIcon event')} />,
    },
  };

  const handleSubmit = values => {
    setState({ ...state, submitValues: values });
  };

  return (
    <>
      <PageHeader ghost title="Add Post" />
      <Main>
        <Row gutter={25}>
          <Col xs={24}>
            <Cards title="About Product">
              <Form name="sDash_validation-form addProduct" form={form} layout="vertical" onFinish={handleSubmit}>
                <Row gutter={30}>
                  <Col md={8} xs={24}>
                    <Form.Item name="name" label="Product Name">
                      <Input placeholder="Product Name" />
                    </Form.Item>
                  </Col>
                  <Col md={8} xs={24}>
                    <Form.Item name="subtext" label="Sub Text">
                      <Input placeholder="Sub text" />
                    </Form.Item>
                  </Col>

                  <Col md={8} xs={24}>
                    <Form.Item name="category" initialValue="" label="Category">
                      <Select style={{ width: '100%' }}>
                        <Option value="">Please Select</Option>
                        <Option value="wearingClothes">Wearing Clothes</Option>
                        <Option value="sunglasses">Sunglasses</Option>
                        <Option value="t-shirt">T-Shirt</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col md={8} xs={24}>
                    <Form.Item name="price" label="Price">
                      <div className="input-prepend-wrap">
                        <span className="input-prepend">
                          <FeatherIcon icon="dollar-sign" size={14} />
                        </span>
                        <InputNumber style={{ width: '100%' }} />
                      </div>
                    </Form.Item>
                  </Col>
                  {/* 
                  <Col md={8} xs={24}>
                    <Form.Item name="discount" label="Discount">
                      <div className="input-prepend-wrap">
                        <span className="input-prepend f">
                          <FeatherIcon icon="percent" size={14} />
                        </span>
                        <InputNumber style={{ width: '100%' }} />
                      </div>
                    </Form.Item>
                  </Col> */}

                  {/* <Col md={8} xs={24}>
                    <Form.Item name="status" label="Status">
                      <Radio.Group>
                        <Radio value="Published">In Stock</Radio>
                        <Radio value="Draft">Low Stock</Radio>
                        <Radio value="Draft">Out of Stock</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col> */}

                  {/* <Col xs={24}>
                    <Form.Item name="description" label="Product Description">
                      <Input.TextArea rows={5} />
                    </Form.Item>
                  </Col> */}

                  {/* <Col md={12} xs={24}>
                    <Form.Item name="mTitle" label="Meta Title">
                      <Input />
                    </Form.Item>
                  </Col> */}

                  {/* <Col md={12} xs={24}>
                    <Form.Item name="mKeyword" label="Meta Keyword">
                      <Input />
                    </Form.Item>
                  </Col> */}

                  <Col md={12} xs={24}>
                    <div className="add-product-content">
                      <Cards title="Product Image">
                        <Dragger {...fileUploadProps}>
                          <p className="ant-upload-drag-icon">
                            <FeatherIcon icon="upload" size={50} />
                          </p>
                          <Heading as="h4" className="ant-upload-text">
                            Drag and drop an image
                          </Heading>
                          <p className="ant-upload-hint">
                            or <span>Browse</span> to choose a file
                          </p>
                        </Dragger>
                      </Cards>
                    </div>
                  </Col>
                  <Col md={8} xs={24}>
                    <div className="add-product-content">
                      <Cards title="Featured Image">
                        <Dragger {...fileUploadProps}>
                          <p className="ant-upload-drag-icon">
                            <FeatherIcon icon="upload" size={50} />
                          </p>
                          <Heading as="h4" className="ant-upload-text">
                            Drag and drop an image
                          </Heading>
                          <p className="ant-upload-hint">
                            or <span>Browse</span> to choose a file
                          </p>
                        </Dragger>
                      </Cards>
                    </div>
                  </Col>
                </Row>

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
                      <Link to="">Save Product</Link>
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default AddProduct;
