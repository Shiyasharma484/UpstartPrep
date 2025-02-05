import React, { useState } from 'react';
import { Row, Col, Form, Input, Select, Radio } from 'antd';
//import { Row, Col, Form, Input, Select, DatePicker, Radio } from 'antd';
import { Link } from 'react-router-dom';
// import { BasicFormWrapper } from '../../styled';
import FeatherIcon from 'feather-icons-react';
import { Button } from '../../../components/buttons/buttons';
import { PricingCard, ListGroup, Badge } from '../../pages/style';
import Heading from '../../../components/heading/heading';
import { List } from '../../../components/pricing/pricing';
import { Cards } from '../../../components/cards/frame/cards-frame';

// const dateFormat = 'MM/DD/YYYY';
const { Option } = Select;
const CustomerWork = () => {
  const [form] = Form.useForm();
  const [state, setState] = useState({
    values: '',
  });
  const handleSubmit = values => {
    setState({ ...state, values });
  };

  return (
    <Row gutter={25}>
      <Col xs={24}>
        <Row gutter={30}>
              <Col md={12} xs={24}>
                <Form.Item name="address_line_1" label="Address line 1">
                  <Input placeholder="Floor/Flat no./House no." />
                </Form.Item>
              </Col>

              <Col md={12} xs={24}>
                <Form.Item name="address_line_2" label="Address Line 2">
                  <Input placeholder="Street name/Sector/Area" />
                </Form.Item>
              </Col>
              </Row>

              <Row gutter={30}>

              <Col md={12} xs={24}>
                <Form.Item name="locality" label="Locality">
                  <Input placeholder="Nearby Area" />
                </Form.Item>
              </Col>

              <Col md={12} xs={24}>
                <Form.Item name="country" initialValue="" label="Country">
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
                <Form.Item name="state" label="State">
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
                <Form.Item name="city" label="City">
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
                <Form.Item name="postal_code" label="Postal/Zip/Pin Code">
                  <Input placeholder="160071" />
                </Form.Item>
              </Col>

              {/* <Col md={12} xs={24}>
                <Form.Item name="phone" label="Phone Number">
                  <Input placeholder="+440 2546 5236" />
                </Form.Item>
              </Col> */}
              <Col md={12} xs={24}>
                <Form.Item name="address_type" initialValue="active" label="Address type">
                  <Radio.Group>
                    <Radio value="home">Home</Radio>
                    <Radio value="work">Work</Radio>
                    <Radio value="other">Other</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>

              </Row>



        {/* <Row gutter={25} >
          <Col xxl={6} lg={8} sm={12} xs={24}>
            <PricingCard style={{ marginBottom: 30, justifyContent: 'center' }} >

              <Heading className="pricing-title" as="h3">
                <FeatherIcon icon="plus-circle" size={20} />
              </Heading>
              <span className="package-user-type">Add Address</span>

              <Button type="link">
                Add Address
              </Button>
            </PricingCard>
          </Col>

          <Col xxl={6} lg={8} sm={12} xs={24}>
            <PricingCard style={{ marginBottom: 30 }}>

              <Heading className="pricing-title" as="h3">
                Work
              </Heading>
              <Row gutter={30}>
                <Col xxl={12} lg={12} sm={12} xs={24}>
                  <p className="package-user-type">For 50 Users</p>
                </Col>
              </Row>

              <Row gutter={30}>
                <Col xxl={12} lg={12} sm={12} xs={24}>
                  <Button size="default" type="link">
                    Edit
                  </Button>
                </Col>

                <Col xxl={12} lg={12} sm={12} xs={24}>
                  <Button size="default" type="link" danger>
                    Delete
                  </Button>
                </Col>
              </Row>

            </PricingCard>
          </Col>


          <Col xxl={6} lg={8} sm={12} xs={24}>
            <PricingCard style={{ marginBottom: 30 }}>

              <Heading className="pricing-title" as="h3">
                Home
              </Heading>
              <Row gutter={30}>
                <Col xxl={12} lg={12} sm={12} xs={24}>
                  <p className="package-user-type">For 50 Users</p>
                </Col>
              </Row>

              <Row gutter={30}>
                <Col xxl={12} lg={12} sm={12} xs={24}>
                  <Button size="default" type="link">
                    Edit
                  </Button>
                </Col>

                <Col xxl={12} lg={12} sm={12} xs={24}>
                  <Button size="default" type="link" danger>
                    Delete
                  </Button>
                </Col>
              </Row>

            </PricingCard>
          </Col>

          <Col xxl={6} lg={8} sm={12} xs={24}>
            <PricingCard style={{ marginBottom: 30 }}>

              <Heading className="pricing-title" as="h3">
                Home
              </Heading>
              <Row gutter={30}>
                <Col xxl={12} lg={12} sm={12} xs={24}>
                  <p className="package-user-type">For 50 Users</p>
                </Col>
              </Row>

              <Row gutter={30}>
                <Col xxl={12} lg={12} sm={12} xs={24}>
                  <Button size="default" type="link">
                    Edit
                  </Button>
                </Col>

                <Col xxl={12} lg={12} sm={12} xs={24}>
                  <Button size="default" type="link" danger>
                    Delete
                  </Button>
                </Col>
              </Row>

            </PricingCard>
          </Col>

          <Col xxl={6} lg={8} sm={12} xs={24}>
            <PricingCard style={{ marginBottom: 30 }}>

              <Heading className="pricing-title" as="h3">
                Other
              </Heading>
              <Row gutter={30}>
                <Col xxl={12} lg={12} sm={12} xs={24}>
                  <p className="package-user-type">For 50 Users</p>
                </Col>
              </Row>

              <Row gutter={30}>
                <Col xxl={12} lg={12} sm={12} xs={24}>
                  <Button size="default" type="link">
                    Edit
                  </Button>
                </Col>

                <Col xxl={12} lg={12} sm={12} xs={24}>
                  <Button size="default" type="link" danger>
                    Delete
                  </Button>
                </Col>
              </Row>
              <Button size="default" type="link">
                Edit
              </Button>
              <Button size="default" type="link" danger>
                Delete
              </Button>
            </PricingCard>
          </Col>
        </Row> */}

      </Col>
    </Row>
  );
};

export default CustomerWork;
