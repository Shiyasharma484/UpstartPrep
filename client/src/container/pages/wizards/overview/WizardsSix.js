import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Select, Radio, Table } from 'antd';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { FigureWizards, WizardWrapper, ProductTable, WizardSix } from '../Style';
import { Steps } from '../../../../components/steps/steps';
import Heading from '../../../../components/heading/heading';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { BasicFormWrapper } from '../../../styled';
import { cartGetData, cartUpdateQuantity, cartDelete } from '../../../../redux/cart/actionCreator';

const { Option } = Select;
const WizardsSix = () => {
  const dispatch = useDispatch();
  const { cartData, rtl } = useSelector(state => {
    return {
      cartData: state.cart.data,
      rtl: state.ChangeLayoutMode.rtlData,
    };
  });
  const [form] = Form.useForm();

  const [state, setState] = useState({
    status: 'process',
    isFinished: false,
    current: 1,
  });

  const { status, isFinished, current } = state;

  useEffect(() => {
    if (cartGetData) {
      dispatch(cartGetData());
    }
  }, [dispatch]);

  const incrementUpdate = (id, quantity) => {
    const data = parseInt(quantity, 10) + 1;
    dispatch(cartUpdateQuantity(id, data, cartData));
  };

  const decrementUpdate = (id, quantity) => {
    const data = parseInt(quantity, 10) >= 2 ? parseInt(quantity, 10) - 1 : 1;
    dispatch(cartUpdateQuantity(id, data, cartData));
  };



  const next = () => {
    setState({
      ...state,
      status: 'process',
      current: current + 1,
    });
  };

  const prev = () => {
    setState({
      ...state,
      status: 'process',
      current: current - 1,
    });
  };

  const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  const dataSource = [];

  let subtotal = 0;

 
  const columns = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
  ];

  return (
    <div className="wizard-side-border">
      <WizardWrapper>
        <WizardSix>
          <Steps
            isswitch
            isvertical
            current={0}
            status={status}
            steps={[
              {
                title: (
                  <div className="wizard-item">
                    <h2>Create Account</h2>
                    <p>Lorem Ipsum is simply dummy text of the dummy typesetting industry.</p>
                    <img src={require('../../../../static/img/wizards/1.svg')} alt="" />
                  </div>
                ),
                content: (
                  <BasicFormWrapper className="basic-form-inner">
                    <div className="atbd-form-checkout">
                      <Row justify="center">
                        <Col xs={24}>
                          <div className="create-account-form">
                            <Heading as="h4">1. Please Create Your Account</Heading>
                            <Form form={form} name="account">
                              <Form.Item name="username" label="Username">
                                <Input placeholder="Username" />
                              </Form.Item>
                              <Form.Item name="email" rules={[{ type: 'email' }]} label="Email Address">
                                <Input placeholder="name@gmail.com" />
                              </Form.Item>
                              <Form.Item
                                name="password"
                                rules={[
                                  {
                                    min: 6,
                                    message: 'Enter a valid password. Min 6 characters long.',
                                  },
                                ]}
                                label="Password"
                              >
                                <Input.Password placeholder="Password" />
                              </Form.Item>
                              <span className="input-message">Enter a valid password. Min 6 characters long</span>
                            </Form>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </BasicFormWrapper>
                ),
              },
              {
                title: (
                  <div className="wizard-item">
                    <h2>Shipping Address</h2>
                    <p>Lorem Ipsum is simply dummy text of the dummy typesetting industry.</p>
                    <img src={require('../../../../static/img/wizards/1-1.svg')} alt="" />
                  </div>
                ),
                content: (
                  <BasicFormWrapper className="basic-form-inner">
                    <div className="atbd-form-checkout">
                      <Row justify="center">
                        <Col xs={24}>
                          <div className="shipping-form">
                            <Heading as="h4">2. Please Fill in Your Shipping Address</Heading>
                            <Form form={form} name="address">
                              <Form.Item name="name" label="Contact Name">
                                <Input placeholder="Ibn adam" />
                              </Form.Item>
                              <Form.Item
                                name="company"
                                label={
                                  <span>
                                    Company Name <span>(Optional)</span>
                                  </span>
                                }
                              >
                                <Input placeholder="adam" />
                              </Form.Item>
                              <Form.Item name="phone" label="Phone Number">
                                <Input placeholder="+880" />
                              </Form.Item>
                              <Form.Item name="country" initialValue="" label="Country/Region">
                                <Select style={{ width: '100%' }}>
                                  <Option value="">Please Select</Option>
                                  <Option value="bangladesh">Bangladesh</Option>
                                  <Option value="india">India</Option>
                                </Select>
                              </Form.Item>
                              <Form.Item name="street" label="Street Address">
                                <Input placeholder="House Number and Street Name" />
                              </Form.Item>
                              <Form.Item name="street2" label="">
                                <Input placeholder="Apartment, Suite, Unit etc." />
                              </Form.Item>
                              <Form.Item name="city" label="City">
                                <Input placeholder="Enter City" />
                              </Form.Item>
                              <Form.Item name="zip" label="Zip/Postal Code">
                                <Input placeholder="Enter Zip" />
                              </Form.Item>
                            </Form>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </BasicFormWrapper>
                ),
              },
              {
                title: (
                  <div className="wizard-item">
                    <h2>Payment Method</h2>
                    <p>Lorem Ipsum is simply dummy text of the dummy typesetting industry.</p>
                    <img src={require('../../../../static/img/wizards/2.svg')} alt="" />
                  </div>
                ),
                content: (
                  <BasicFormWrapper className="basic-form-inner">
                    <div className="atbd-form-checkout">
                      <Row justify="center">
                        <Col xs={24}>
                          <div className="payment-method-form">
                            <Heading as="h4">3. Please Please Select Your Payment Method</Heading>
                            <div className="shipping-selection">
                              <Radio.Group style={{ width: '100%' }}>
                                <div className="shipping-selection__card">
                                  <Radio style={{ width: '100%' }} value="card">
                                    <Cards
                                      headless
                                      bodyStyle={{
                                        backgroundColor: '#F8F9FB',
                                        borderRadius: '20px',
                                        border: '1px solid #F1F2F6',
                                      }}
                                    >
                                      <div className="supported-card d-flex">
                                        <span>Credit/Debit Card</span>
                                        <div className="supported-card_logos">
                                          <img
                                            style={{ width: '50px' }}
                                            src={require('../../../../static/img/cards-logo/ms.png')}
                                            alt=""
                                          />
                                          <img
                                            style={{ width: '50px' }}
                                            src={require('../../../../static/img/cards-logo/american-express.png')}
                                            alt=""
                                          />
                                          <img
                                            style={{ width: '50px' }}
                                            src={require('../../../../static/img/cards-logo/visa.png')}
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                      <Cards headless style={{ marginBottom: 0 }}>
                                        <Form form={form} name="info">
                                          <Form.Item name="number" label="Card Number">
                                            <Input placeholder="6547-8702-6987-2527" />
                                          </Form.Item>
                                          <Form.Item name="name" label="Name on Card">
                                            <Input placeholder="Full name" />
                                          </Form.Item>
                                          <Form.Item name="month" initialValue="" label="Expiration Date">
                                            <Select style={{ width: '100%' }}>
                                              <Option value="">MM</Option>
                                              {month.map(value => (
                                                <Option key={value} value={value}>
                                                  {value}
                                                </Option>
                                              ))}
                                            </Select>
                                          </Form.Item>
                                          <Form.Item name="year" initialValue="">
                                            <Select style={{ width: '100%' }}>
                                              <Option value="">YY</Option>
                                              <Option value={new Date().getFullYear()}>
                                                {new Date().getFullYear()}
                                              </Option>
                                              {month.map(value => (
                                                <Option
                                                  key={value}
                                                  value={parseInt(new Date().getFullYear(), 10) + parseInt(value, 10)}
                                                >
                                                  {parseInt(new Date().getFullYear(), 10) + parseInt(value, 10)}
                                                </Option>
                                              ))}
                                            </Select>
                                          </Form.Item>
                                          <Form.Item name="cvv" label="CVV">
                                            <div className="cvv-wrap">
                                              <Input style={{ width: '60%' }} placeholder="XXX" />
                                              <Link className="input-leftText" to="#">
                                                What is this?
                                              </Link>
                                            </div>
                                          </Form.Item>
                                        </Form>
                                      </Cards>
                                    </Cards>
                                  </Radio>
                                </div>
                                <div className="shipping-selection__paypal">
                                  <Radio value="payPal" style={{ width: '100%' }}>
                                    Pay With PayPal
                                    <img src={require('../../../../static/img/PayPalLogo.png')} alt="paypal" />
                                  </Radio>
                                </div>
                                <div className="shipping-selection__cash">
                                  <Radio value="cash" style={{ width: '100%' }}>
                                    Cash on delivery
                                  </Radio>
                                </div>
                              </Radio.Group>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </BasicFormWrapper>
                ),
              },
              {
                title: (
                  <div className={`wizard-item ${status === 'finish' && 'block'}`}>
                    <h2 className={`${status === 'finish' ? 'none' : 'block'}`}>Review Order</h2>
                    <p className={`${status === 'finish' ? 'none' : 'block'}`}>
                      Lorem Ipsum is simply dummy text of the dummy typesetting industry.
                    </p>
                    <img src={require(`../../../../static/img/wizards/${status !== 'finish' ? 3 : 4}.svg`)} alt="" />
                  </div>
                ),
                content:
                  status !== 'finish' ? (
                    <BasicFormWrapper style={{ width: '100%' }}>
                      <div className="atbd-review-order" style={{ width: '100%' }}>
                        <Heading as="h4">4. Review and confirm Order</Heading>
                        <Cards bodyStyle={{ backgroundColor: '#F8F9FB', borderRadius: 10 }} headless>
                          <div className="atbd-review-order__single">
                            <Cards headless>
                              <div className="atbd-review-order__shippingTitle">
                                <Heading as="h5">
                                  Shipping Information
                                  <Link to="#">
                                    <FeatherIcon icon="edit" />
                                    Edit
                                  </Link>
                                </Heading>
                              </div>
                              <article className="atbd-review-order__shippingInfo">
                                <Radio.Group style={{ width: '100%' }}>
                                  <Radio value="ms" style={{ width: '100%' }}>
                                    <div className="shipping-info-text">
                                      <Heading as="h6">Ibn Adam</Heading>
                                      <Heading as="h6">Phone: +61412345678</Heading>
                                      <p>
                                        795 Folsom Ave, Suite 600 <br />
                                        San Francisco, CA 94107 <br />
                                        United States
                                      </p>
                                    </div>
                                  </Radio>
                                </Radio.Group>
                                <Link className="btn-addNew" to="#">
                                  + Add New Address
                                </Link>
                              </article>
                            </Cards>
                          </div>
                          <div className="atbd-review-order__single">
                            <Cards headless>
                              <div>
                                <Heading as="h5">Payment Method</Heading>
                              </div>
                              <Radio.Group style={{ width: '100%' }}>
                                <Radio value="ms" style={{ width: '100%' }}>
                                  <div className="method-info">
                                    <img src={require('../../../../static/img/ms.svg')} alt="" />
                                    **** **** **** 2597
                                  </div>
                                </Radio>
                              </Radio.Group>
                              <Link className="btn-addCard" to="#">
                                + Add New Card
                              </Link>
                            </Cards>
                          </div>

                          <div className="atbd-review-order__single">
                            <Cards headless>
                              <>
                                <ProductTable>
                                  <div className="table-cart table-responsive">
                                    <Table pagination={false} dataSource={dataSource} columns={columns} />
                                  </div>
                                </ProductTable>

                                <Row justify="end">
                                  <Col xl={20} xs={24} offset={!rtl ? 10 : 0}>
                                  
                                  </Col>
                                </Row>
                              </>
                            </Cards>
                          </div>
                        </Cards>
                      </div>
                    </BasicFormWrapper>
                  ) : (
                    <Row justify="start" style={{ width: '100%' }}>
                      <Col xl={20} xs={24}>
                        <div className="checkout-successful">
                          <Cards
                            headless
                            bodyStyle={{
                              backgroundColor: '#F8F9FB',
                              borderRadius: '20px',
                            }}
                          >
                            <Cards headless>
                              <span className="icon-success">
                                <FeatherIcon icon="check" />
                              </span>
                              <Heading as="h3">Payment Successful</Heading>
                              <p>Thank you! We have received your Payment</p>
                            </Cards>
                          </Cards>
                        </div>
                      </Col>
                    </Row>
                  ),
              },
            ]}
            onNext={next}
            onPrev={prev}
            onDone={done}
            isfinished={isFinished}
          />
        </WizardSix>
      </WizardWrapper>
    </div>
  );
};

export default WizardsSix;
