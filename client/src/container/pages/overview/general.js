import React, { useState } from 'react';
import { Row, Col, Form, Input, DatePicker, Select, Radio, InputNumber, Upload, message } from 'antd'; // Upload, , Card
//import { Link } from 'react-router-dom';
//import Select from 'react-select';
import MailComposer from '../../email/overview/MailComposer';

const { Option } = Select;

//const { Dragger } = Upload;
const General = ({ formData, setformData }) => {
  const category = [{
    value: 'a',
    label: "Apparels"
  },
  {
    value: 'b',
    label: "Sunglasses"
  },
  {
    value: 'c',
    label: "T-Shirt"
  }
  ];

  //const [disValue, setDisValue] = useState(null);

  //const mutliHandle = (e) => {
  // console.log(e);
  // let b=category[e-1].label;
  //console.log(b);
  // setDisValue({...disValue,b})
  //setDisValue(Array.isArray(e)?e.map(b=>category[b-1].label):[]);
  // console.log(disValue);
  // }


  // const fileList = [
  //   {
  //     uid: '1',
  //     name: '1.png',
  //     status: 'done',
  //     url: require('../../../static/img/products/1.png'),
  //     thumbUrl: require('../../../static/img/products/1.png'),
  //   },
  // ];

  // const fileUploadProps = {
  //   name: 'file',
  //   multiple: true,
  //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //   onChange(info) {
  //     const { status } = info.file;
  //     if (status !== 'uploading') {
  //       setState({ ...state, file: info.file, list: info.fileList });
  //     }
  //     if (status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully.`);
  //     } else if (status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  //   listType: 'picture',
  //   defaultFileList: fileList,
  //   showUploadList: {
  //     showRemoveIcon: true,
  //     removeIcon: <FeatherIcon icon="trash-2" onClick={e => console.log(e, 'custom removeIcon event')} />,
  //   },
  // };

  return (
    <Row gutter={25}>
      <Col xs={24}>
        {/* <Cards title="User Information"> */}
        {/* //row------------------------------------------------------------------------------------------- */}
        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item
              label="Product Name"
              required
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Name is required !',
                  },
                ]}
              >
                <Input
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={e => setformData({ ...formData, name: e.target.value })}
                />
              </Form.Item>
            </Form.Item>
          </Col>

          <Col md={12} xs={24}>
            <Form.Item label="Category" required>
              <Form.Item
                name="category_id"
                rules={[
                  {
                    required: true,
                    message: 'Please choose a category !',
                  },
                ]}
              >
                <Select
                  mode='tags'
                  //onChange={mutliHandle}
                  options={category}
                  tokenSeparators={[',']}
                  value={[formData.category_id]}
                  onChange={e => setformData({ ...formData, category_id: e })}
                >
                  {/* <Option value="please select" label="Please Select">
                Please select
              </Option>
                <Option value="apparels" label="Apparels">
                  Apparels
                </Option>
                <Option value="sunglasses" label="Sunglasses">
                  Sunglasses
                </Option>
                <Option value="t-shirt" label="T-Shirt">
                  T-Shirt
                </Option> */}
                </Select>
                {/* <p> {disValue=== null ? "":`${disValue}`}</p> */}
                {/* <Select
                mode="multiple"
                style={{ width: '100%' }}
                defaultValue={{ value: formData.category_id }}
                onChange={e => setformData({ ...formData, category_id: e })}
              >
               
              </Select> */}
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>
        {/* //row------------------------------------------------------------------------------------------- */}
        <Row gutter={30}>
          <Col md={12} xs={24}>
            <Form.Item label="Regular Price" required>
              <Form.Item
                name="regular_price"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the price !',
                  },
                ]}
              >
                <InputNumber
                  type="number"
                  style={{ width: '100%' }}
                  value={formData.regular_price}
                  onChange={e => setformData({ ...formData, regular_price: e })}
                />
              </Form.Item>
            </Form.Item>
          </Col>

          <Col md={12} xs={24}>
            <Form.Item label="Sale Price" >
              <Form.Item
                name="sale_price"
              >
                <InputNumber
                  type="number"
                  style={{ width: '100%' }}
                  value={formData.sale_price}
                  onChange={e => setformData({ ...formData, sale_price: e })}
                />
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>

        {/* //row------------------------------------------------------------------------------------------- */}
        {/* <Row gutter={30}>
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
          </Row> */}
        <Row gutter={30}>
          <Col md={24} xs={24}>
            <Form.Item label="Product Description">
              <Form.Item
                name="description"
                rules={[
                  {
                    required: false,
                    message: 'Please enter description !',
                  },
                ]}
              >
                <div className="editor-compose">
                  <MailComposer
                    text
                    value={formData.description}
                    onChange={e => setformData({ ...formData, description: e })}
                  />
                </div>
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default General;
