import React, { useState } from 'react';
import { Row, Col, Form, Input, DatePicker, Select, Radio, InputNumber, Upload, message } from 'antd'; // Upload, , Card
//import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../style';
import { Button } from '../../../components/buttons/buttons';
import Heading from '../../../components/heading/heading';
import MailComposer from '../../email/overview/MailComposer';

const { Option } = Select;

const dateFormat = 'MM/DD/YYYY';
const { Dragger } = Upload;
const StoreInfo = () => {
  const [form] = Form.useForm();
  const [disable, setDisable] = useState(true);
  const handleChange = event => {
    setDisable(event.target.value === '');
  };
  const [state, setState] = useState({
    file: null,
    list: null,
    submitValues: {},
  });

  const handleSubmit = values => {
    setState({ ...state, submitValues: values });
  };

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

  return (
    <Row gutter={25}>
      <Col xs={24}>
        {/* <Cards title="User Information"> */}
        <Form
          name="sDash_validation-form"
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onChange={handleChange}
        >
          {/* //row------------------------------------------------------------------------------------------- */}
          <Row gutter={30}>
            <Col md={12} xs={24}>
              <Form.Item
                name="product_name"
                label="Product Name"
                rules={[
                  {
                    required: true,
                    message: 'Name is required !',
                  },
                ]}

              >
                <Input placeholder="Product Name" />
              </Form.Item>
            </Col>
            {/* <Col md={12} xs={24}>
              <Form.Item
                name="sub_text"
                label="Sub Text"
                rules={[
                  {
                    required: true,
                    message: 'Please enter sub text !',
                  },
                ]}
              >
                <Input placeholder="Sub Text" />
              </Form.Item>
            </Col> */}

            <Col md={12} xs={24}>
              <Form.Item
                name="category"
                initialValue=""
                label="Category"
                rules={[{
                  required: true,
                  message: 'Please choose a category !'
                }]}
              >
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  defaultValue={'Apparels'}
                >

                  {/* <Option value="" label="Please Select"></Option> */}
                  <Option value="wearingClothes" label="Apparels">Apparels</Option>
                  <Option value="sunglasses" label="Sunglasses">Sunglasses</Option>
                  <Option value="t-shirt" label="T-Shirt">T-Shirt</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/* //row------------------------------------------------------------------------------------------- */}
          <Row gutter={30}>
           
            {/* <Col md={12} xs={24}>
              <Form.Item
                name="status"
                label="Status"
                rules={[
                  {
                    required: true,
                    message: 'Please select a status !',
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="In_Stock">In Stock</Radio>
                  <Radio value="Low_Stock">Low Stock</Radio>
                  <Radio value="Out_of_Stock">Out of Stock</Radio>
                </Radio.Group>
              </Form.Item>
            </Col> */}
            <Col md={12} xs={24}>
              <BasicFormWrapper>
                <Form.Item
                  name="regular_price"
                  label="Regular Price"
                  rules={[
                    {
                      whitespace: true,
                      required: true,
                      message: 'Please enter the price !',
                    },
                  ]}
                >
                  <div className="input-prepend-wrap">
                    <span className="input-prepend">
                      <FeatherIcon icon="dollar-sign" size={14} />
                    </span>
                    <InputNumber type="number" style={{ width: '100%' }} />
                  </div>
                </Form.Item>
              </BasicFormWrapper>
            </Col>

            <Col md={12} xs={24}>
              <BasicFormWrapper>
                <Form.Item
                  name="sale_price"
                  label="Sale Price"
                  rules={[
                    {
                      whitespace: true,
                      required: false,
                      message: 'Please enter the discount price !',
                    },
                  ]}
                >
                  <div className="input-prepend-wrap">
                    <span className="input-prepend">
                      <FeatherIcon icon="dollar-sign" size={14} />
                    </span>
                    <InputNumber type="number" style={{ width: '100%' }} />
                  </div>
                </Form.Item>
              </BasicFormWrapper>
            </Col>
          </Row>

          {/* //row------------------------------------------------------------------------------------------- */}
          <Row gutter={30}>
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
          <Row gutter={30}>
            <Col md={24} xs={24}>
              <Form.Item name="description" label="Product Description">
                <div className="editor-compose">
                  <MailComposer text />
                </div>
              </Form.Item>

            </Col>
          </Row>
          {/* //row------------------------------------------------------------------------------------------- */}
          <Row>
            <Form.Item>
              <div className="add-user-bottom text-right">
                <Button
                  className="ant-btn ant-btn-primary"
                  type="danger"
                  size="default"
                  onClick={() => {
                    return form.resetFields();
                  }}
                >
                  Reset
                </Button>

                <Button htmlType="submit" type="success" size="default" disabled={disable}>
                  Save & Next
                </Button>
              </div>
            </Form.Item>


          </Row>
        </Form>

      </Col>


    </Row>
  );
};

export default StoreInfo;
