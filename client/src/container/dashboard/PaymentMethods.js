import React, { lazy, Suspense, useState } from 'react';
import Axios from 'axios';
import FeatherIcon from 'feather-icons-react';
import { DashboardBaseStyleWrap } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import Palette from '../../components/color-palette/palette';
import config from '../../config/config';
import Heading from '../../components/heading/heading';
import { Route, NavLink, useHistory } from 'react-router-dom';
import {
  Row,
  Col,
  Spin,
  Form,
  Tabs,
  Input,
  Select,
  Image,
  InputNumber,
  Upload,
  Table,
  Modal,
  Collapse,
  notification,
} from 'antd';
import { Switch } from 'antd';

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const { theme } = config;
const PaymentMethods = () => {
  return (
    <>
      <PageHeader
        ghost
        title="PAYMENT METHOD"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add New
            </Button>
          </div>,
        ]}
      />
      <Main className="custompayment">
        <Cards
          title={
            <div className="card-nav">
              <ul>
                <li>
                  <NavLink to={`#`} onClick={e => e.preventDefault()}>
                    <FeatherIcon icon="user" size={14} />
                    Paymnet Method
                    {/* {FormTitles[page]} */}
                  </NavLink>
                </li>
              </ul>
            </div>
          }
        >
          <Row gutter={24} className="topline">
            <Col md={24}>
              <p>
                The system offers various types of payment gateways. You can enable/disable any payment gateway to
                control payment options vendor can use to accept payment from customers.
              </p>
            </Col>
          </Row>

          <Row gutter={24} className="mainrow">
            <Col md={12} className="cstmpaypal">
              <img src="https://hagglerplanet.com/images/payment-method-types/1.svg" style={{ width: '140px' }} />
              <p>Allow vendors to accept the most convenient payment option.</p>
            </Col>
            <Col md={12} className="paypal-Cont">
              <div className="logoSwitchIcon">
                <img
                  src="https://hagglerplanet.com/images/payment-methods/paypal-express.png"
                  style={{ width: '150px' }}
                />
                <div md={12} className="cstmbtn">
                  <span className="swtichOFF">OFF</span>
                  <Switch defaultChecked />
                  <span className="swtichON">ON</span>
                </div>
              </div>
              <p>
                Add PayPal as a payment method to any checkout with Express Checkout. Express Checkout offers the ease
                of convenience and security of PayPal, can be set up in minutes and can turn more shoppers into buyers.
              </p>
              <Button className="pytmbtn">
                <a
                  href="https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/"
                  className="cstmdoc"
                >
                  DOCUMENTATION
                </a>
              </Button>
              <Button className="pytmbtns" style={{ background: '#5f63f2', color: '#fff', marginLeft: '5px' }}>
                Edit
              </Button>
            </Col>
          </Row>

          <hr></hr>

          <Row gutter={24} className="mainrow">
            <Col md={12} className="thirdcol">
              <Col md-24 className="cstmcred">
                <p style={{ fontSize: 20 }}>Accept credit cards</p>
              </Col>
              <Col md-24>
                <p>
                  Enable at least one credit card payment method to allow vendors to charge credit cards. This can be
                  offered with other payment solutions such as PayPal Express Checkout.
                </p>
              </Col>
            </Col>
            <Col md={12} className="forthcolumn">
              <Col md={24} className="forthcol">
                <Row gutter={24}>
                  <Col md={12}>
                    <img style={{ width: 140 }} src="https://hagglerplanet.com/images/payment-methods/stripe.png"></img>
                  </Col>
                  <Col md={12} className="cstmbtn">
                    <span className="swtichOFF">OFF</span>
                    <Switch defaultChecked />
                    <span className="swtichON">ON</span>
                  </Col>
                </Row>
                <p>
                  Stripe is one of the best and safe option to charge credit and debit cards around the world. Stripe
                  has a product for marketplace like this. To enable Stripe to your vendors, you must have to register
                  your platform with Stripe.
                </p>
                <b>Follow This Simple steps:</b>
                <p>
                  - Create an Stripe application using the bellow information.
                  <a href="">Check their documentation for help.</a>
                  <br></br> - Update the .env file on your server with Stripe API credentials.
                </p>
                <br></br>
                <p>
                  <b>Remember</b> when you register your platform use this information:<br></br> - Name: 'Ezmoov'
                  <br></br>- Website URL: ''
                  <br></br>- Redirect URL: ''
                </p>
                <Button className="pytmbtn">
                  <a
                    href="https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/"
                    className="cstmdoc"
                  >
                    DOCUMENTATION
                  </a>
                </Button>
                <Button className="pytmbtns" style={{ background: '#5f63f2', color: '#fff', marginLeft: '5px' }}>
                  Edit
                </Button>
              </Col>
              <Col md={24} className="fifthcol">
                <Row gutter={24}>
                  <Col md={12}>
                    <img src="https://hagglerplanet.com/images/payment-methods/authorize-net.png"></img>
                  </Col>
                  <Col md={12} className="cstmbtn">
                    <span className="swtichOFF">OFF</span>
                    <Switch defaultChecked />
                    <span className="swtichON">ON</span>
                  </Col>
                </Row>
                <p>Authorize.Net helps makes it simple to accept electronic and credit card payments.</p>
                <p className="cstmwar">
                  <span>
                    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                  </span>
                  &#32;
                  <b> ALERT! :</b> The Authorize.Net is misconfigured and needs to configure correctly! Please check the
                  documentation and configure it correctly or contact support if need help.
                </p>
                <Button className="pytmbtn">
                  <a
                    href="https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/"
                    className="cstmdoc"
                  >
                    DOCUMENTATION
                  </a>
                </Button>
                <Button className="pytmbtns" style={{ background: '#5f63f2', color: '#fff', marginLeft: '5px' }}>
                  Edit
                </Button>
              </Col>
              <Col md={24} className="sixthcol">
                <Row gutter={24}>
                  <Col md={12}>
                    <img src="https://hagglerplanet.com/images/payment-methods/instamojo.png"></img>
                  </Col>
                  <Col md={12} className="cstmbtn">
                    <span className="swtichOFF">OFF</span>
                    <Switch defaultChecked />
                    <span className="swtichON">ON</span>
                  </Col>
                </Row>
                <p>
                  Instamojo is one of the most popular and Multi-Channel Payment Gateway for India - Accept Credit/Debit
                  Cards, Wallets, Net Banking, UPI & EMI. Enable Instamojo to your vendors.
                </p>
                <p className="cstmwar">
                  <span>
                    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                  </span>
                  &#32;
                  <b> ALERT! :</b> The Instamojo is misconfigured and needs to configure correctly! Please check the
                  documentation and configure it correctly or contact support if need help.
                </p>
                <Button className="pytmbtn">
                  <a
                    href="https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/"
                    className="cstmdoc"
                  >
                    DOCUMENTATION
                  </a>
                </Button>
                <Button className="pytmbtns" style={{ background: '#5f63f2', color: '#fff', marginLeft: '5px' }}>
                  Edit
                </Button>
              </Col>
            </Col>
          </Row>

          <hr></hr>

          <Row gutter={24} className="mainrow">
            <Col md={12} className="thirdcol">
              <Col md-24 className="cstmcred">
                <p style={{ fontSize: 20 }}>Manual payment</p>
              </Col>
              <Col md-24>
                <p>
                  Enabling offline payment options will allow vendors to change their customer in more traditional ways.
                  The vendor will be asked for instructions and additional information when they activate manual payment
                  methods.
                </p>
                <p className="skyblue">
                  <span>
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                  </span>{' '}
                  <b>IMPORTANT :</b> Set the manual payment instructions on settings. Without this configuration manual
                  payment will not work.
                </p>
              </Col>
            </Col>
            <Col md={12} className="forthcolumn">
              <Col md={24} className="forthcol">
                <Row gutter={24}>
                  <Col md={12}>
                    <img style={{ width: 140 }} src="https://hagglerplanet.com/images/payment-methods/cod.png"></img>
                  </Col>
                  <Col md={12} className="cstmbtn">
                    <span className="swtichOFF">OFF</span>
                    <Switch defaultChecked />
                    <span className="swtichON">ON</span>
                  </Col>
                </Row>
                <br></br>
                <p>
                  Cash on delivery (COD), sometimes called collect on delivery, is the sale of goods by mail order where
                  payment is made on delivery rather than in advance.
                </p>
                <Button
                  className="pytmbtns"
                  style={{ background: '#5f63f2', color: '#fff', marginLeft: '2px', marginBottom: '10px' }}
                >
                  Edit
                </Button>
              </Col>
              <Col md={24} className="fifthcol">
                <Row gutter={24}>
                  <Col md={12}>
                    <img src="https://hagglerplanet.com/images/payment-methods/wire.png"></img>
                  </Col>
                  <Col md={12} className="cstmbtn">
                    <span className="swtichOFF">OFF</span>
                    <Switch defaultChecked />
                    <span className="swtichON">ON</span>
                  </Col>
                </Row>
                <br></br>
                <p>Authorize.Net helps makes it simple to accept electronic and credit card payments.</p>
                <Button
                  className="pytmbtns"
                  style={{ background: '#5f63f2', color: '#fff', marginLeft: '2px', marginBottom: '10px' }}
                >
                  Edit
                </Button>
              </Col>
              <Col md={24} className="sixthcol">
                <Row gutter={24}>
                  <Col md={12}>
                    <p style={{ marginTop: 10 }}>Wallet</p>
                  </Col>
                  <Col md={12} className="cstmbtn">
                    <span className="swtichOFF">OFF</span>
                    <Switch defaultChecked />
                    <span className="swtichON">ON</span>
                  </Col>
                </Row>
                <p>
                  Wallet module is the payment method where customer could buy products via customer digital wallet
                  balance.
                </p>
                <p className="cstmwar">
                  <span>
                    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                  </span>
                  &#32;
                  <b> ALERT! :</b>The Wallet is misconfigured and needs to configure correctly! Please check the
                  documentation and configure it correctly or contact support if need help.
                </p>
                <Button className="pytmbtn">
                  <a
                    href="https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/"
                    className="cstmdoc"
                  >
                    DOCUMENTATION
                  </a>
                </Button>
                <Button className="pytmbtns" style={{ background: '#5f63f2', color: '#fff', marginLeft: '5px' }}>
                  Edit
                </Button>
              </Col>
            </Col>
          </Row>
          <hr />
          <Row gutter={24}>
            <Col md={12} className="thirdcol">
              <Col md-24 className="cstmcred">
                <p style={{ fontSize: 20 }}>Other payment options</p>
              </Col>
              <Col md-24>
                <p>Enabling more payment options will allow vendors to change their customer in more flexible ways.</p>
              </Col>
            </Col>

            <Col md={12} className="sixthcol">
              <Col md={12}>
                <img
                  src="https://hagglerplanet.com/images/payment-methods/paystack.png"
                  class="open-img-md"
                  alt="Other payment options"
                />
              </Col>

              <Col md={12} className="cstmbtn">
                <span className="swtichOFF">OFF</span>
                <Switch defaultChecked />
                <span className="swtichON">ON</span>
              </Col>

              <p>
                Modern online and offline payments for Africa. Paystack helps businesses in Africa get paid by anyone,
                anywhere in the world.
              </p>
              <p className="cstmwar">
                <span>
                  <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                </span>
                &#32;
                <b> ALERT! :</b>The Paystack is misconfigured and needs to configure correctly! Please check the
                documentation and configure it correctly or contact support if need help.
              </p>
              <Button className="pytmbtn">
                <a
                  href="https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/"
                  className="cstmdoc"
                >
                  DOCUMENTATION
                </a>
              </Button>
              <Button className="pytmbtns" style={{ background: '#5f63f2', color: '#fff', marginLeft: '5px' }}>
                Edit
              </Button>
            </Col>
          </Row>
        </Cards>
      </Main>
    </>
  );
};

export default PaymentMethods;
