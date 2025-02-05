import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, InputNumber } from 'antd'; // Upload, , Card
import MailComposer from '../../email/overview/MailComposer';
import { useParams } from 'react-router-dom';
import { headers } from '../../../helpers/variables';
import axios from 'axios';

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

//const { Dragger } = Upload;
const ViewGeneral = ({ formData, setformData }) => {
  const category = [{
    value: 1,
    label: "Apparels"
  },
  {
    value: 2,
    label: "Sunglasses"
  },
  {
    value: 3,
    label: "T-Shirt"
  }
  ];
  const [form] = Form.useForm();
  const params = useParams();
  console.log(params.id);

  const [disValue, setDisValue] = useState(null);

  useEffect(() => {
    console.log('inside useEffect')
    if (params.id.length > 0) {
      async function fetchProductData() {
        const postID = params.id;
        console.log(postID);
        await axios.get(domainpath + `/products/single/${postID}`, { headers }).then(response => {
          console.log(response);
          if (response.status == 200) {
            const product_Data = response.data?.responsedata.product[0];
            form.setFieldsValue({
              category_name: product_Data.category_name,
              description: product_Data.description,
              featured_image: product_Data.featured_image,
              regular_price: product_Data.regular_price,
              slug: product_Data.slug,
              store_name: product_Data.store_name,
              tags: product_Data.tags,
              title: product_Data.title,
            });
          }
        });
      };
      fetchProductData();
    }



  }, []);

  const mutliHandle = (e) => {
    console.log(e);
    // let b=category[e-1].label;
    //console.log(b);
    // setDisValue({...disValue,b})
    setDisValue(Array.isArray(e) ? e.map(b => category[b - 1].label) : []);
    // console.log(disValue);
  }

  return (
    <Form
      name="sDash_validation-form"
      form={form}>


      <Row gutter={25}>
        <Col xs={24}>
          {/* <Cards title="User Information"> */}
          {/* //row------------------------------------------------------------------------------------------- */}
          <Row gutter={30}>
            <Col md={12} xs={24}>
              <Form.Item
                name="title"
                label="Product Name"
              >
                <Input
                  placeholder="Product Name"
                  //value={formData.name}
                  //onChange={e => setformData({ ...formData, name: e.target.value })}
                  readOnly />
              </Form.Item>
            </Col>

            <Col md={12} xs={24}>
              <Form.Item
                name="category_name"
                // initialValue=""
                label="Category"
              >
                <Select mode='multiple' options={category} onChange={mutliHandle} disabled></Select>
                <p> {disValue === null ? "" : `${disValue}`}</p>
                {/* <Select
                mode="multiple"
                style={{ width: '100%' }}
                defaultValue={{ value: formData.category_id }}
                onChange={e => setformData({ ...formData, category_id: e })}
              >
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
              </Form.Item>
            </Col>
          </Row>
          {/* //row------------------------------------------------------------------------------------------- */}
          <Row gutter={30}>
            <Col md={12} xs={24}>
              <Form.Item label="Regular Price" required>
                <Form.Item
                  name="regular_price"
                >
                  <Input
                    placeholder="regular_price"
                    readOnly
                  //value={formData.slug}
                  //onChange={e => setformData({ ...formData, slug: e.target.value })}
                  />
                  
                  {/* <div className="input-prepend-wrap">
                <InputNumber
                  type="number"
                  style={{ width: '100%' }}
                  //  value={formData.regular_price}
                  //  onChange={e => setformData({ ...formData, regular_price: e })}
                  readOnly />
              </div> */}
                </Form.Item>
              </Form.Item>
            </Col>

            <Col md={12} xs={24}>
            <Form.Item label="Sale Price" required>
                <Form.Item
                  name="sale_price"
                >
                  <Input
                    placeholder="sale_price"
                    readOnly
                  //value={formData.slug}
                  //onChange={e => setformData({ ...formData, slug: e.target.value })}
                  />
                  
                  {/* <div className="input-prepend-wrap">
                <InputNumber
                  type="number"
                  style={{ width: '100%' }}
                  //  value={formData.sale_price}
                  //  onChange={e => setformData({ ...formData, sale_price: e })}
                  readOnly />
              </div> */}
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col md={12} xs={24}>
              <Form.Item label="Slug" required>
                <Form.Item
                  name="slug"
                >
                  <Input
                    placeholder="slug"
                    readOnly
                  //value={formData.slug}
                  //onChange={e => setformData({ ...formData, slug: e.target.value })}
                  />
                </Form.Item>
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item label="Tags" required>
                <Form.Item
                  name="tags"
                >
                  <Input
                    placeholder="tags"
                  //value={formData.tags}
                  //onChange={e => setformData({ ...formData, tags: e.target.value })}
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
              <Form.Item
                name="description"
                label="Product Description"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please enter description !',
              //   },
              // ]}
              >
                <div className="editor-compose">
                  <MailComposer
                    text
                    //  value={formData.description}
                    //  onChange={e => setformData({ ...formData, description: e.target.value })}
                    disabled />
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default ViewGeneral;
