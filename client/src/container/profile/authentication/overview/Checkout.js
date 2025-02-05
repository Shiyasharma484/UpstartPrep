import React, { useState, useCallback, useEffect } from 'react';
import Axios from 'axios';
import { Link, NavLink, useHistory, useParams } from 'react-router-dom';
import { Row, Col, Form, notification, Input, Button, Select, DatePicker, Checkbox, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AuthWrapper } from './style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { login, alreadyloggedin } from '../../../../redux/authentication/actionCreator';
import TextArea from 'antd/lib/input/TextArea';
import Heading from '../../../../components/heading/heading';
import hero_BG from '../../../../static/img/auth/home-hero-img.png';
import FeatherIcon from 'feather-icons-react';
import { get_api_request, post_api_request, put_api_request, api_url } from '../../../../helpers/Common';
import { headers } from '../../../../helpers/variables';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import Cookies from 'js-cookie';

import amex from '../../../../static/img/auth/amex-card-front.png';
import cardfront from '../../../../static/img/auth/card-front.jpg';
import mastercard from '../../../../static/img/auth/mastercard.png';
import visa from '../../../../static/img/auth/visa.jpg';
import { createGlobalStyle } from 'styled-components';
const { encrypttheid, decodetheid } = require('../../../../helpers/encode-decode');

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const Checkout = () => {
  const [dataUpdate, setData] = useState({
    name: '',
    email_id: '',
    phone: '',
    billing_address_line1: '',
    billing_address_line2: '',
    billing_country: '',
    billing_zipcode: '',
    billing_state: '',
    billing_city: '',
    billing_locality: '',
  });
  const params = useParams();
  const [PlansData, setPlansData] = useState([]);
  const [PlansIddata, setPlansIddata] = useState([]);

  var plan_id = params?.id;
  console.log(plan_id);
  const history = useHistory();
  const [form] = Form.useForm();
  const [checkout_form] = Form.useForm();
  const [billing_details] = Form.useForm();
  const [shipping_details] = Form.useForm();
  const [ConfigData, setConfigData] = useState([]);
  const [Message, setMessage] = useState();
  const [ShowTopBar, setShowTopBar] = useState(true);
  const enc_user_detail = Cookies.get('UserDetail');
  const [isBilling, setIsBilling] = useState(false);

  const [showlogo, setshowlogo] = useState();
  const { wrapperProps, getCardImageProps, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();
  const { decrypt, encrypt } = require('../../../../helpers/encryption-decryption');
  const [userid, setUserID] = useState();
  const [arrayDatacountry, setarrayDatacountry] = useState(null);
  const [arraydatastate, setarraydatastate] = useState(null);
  const [arraydatacity, setarraydatacity] = useState(null);
  const [CardDetails, setCardDetails] = useState({
    card_number: '',
    month: '',
    cvc: '',
    card_holder_name: '',
    nick_name: '',
  });
  useEffect(() => {
    const enc_user_detail = Cookies.get('UserDetail');
    const response = decrypt(enc_user_detail);
    const userId = response?.sessdata?.users_id;
    console.log(userId);
    setUserID(userId);

    async function GetConfiguration() {
      const url = api_url.get_all_configurations;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const configdata = response?.data?.responsedata?.configurations[0].message;
        const configData = response?.data?.responsedata?.configurations[0];
        setConfigData(configData);
        setMessage(configdata);
        const show_logo = response?.data?.responsedata?.configurations[0]?.site_logo;
        setshowlogo(show_logo);
      } else {
        console.log('error');
      }
    }
    GetConfiguration();
    async function getCountry() {
      const url = api_url.get_country;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const countrydata = response.data.responsedata?.countries;
        const dataArray = countrydata.map(item => {
          return { id: item.id, name: item.full_name };
        });
        setarrayDatacountry(dataArray);
      } else {
        console.log('error');
      }
    }
    getCountry();
    async function GetUserPlansDataByID(id) {
      console.log(id);
      var plan_decod_id = decodetheid(plan_id);
      const url = api_url.get_plans_id + plan_decod_id;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const planDatabyid = response?.data?.responsedata;
        const planDatabyids = response?.data?.responsedata?.[0];
        setPlansIddata(planDatabyids);
        console.log(planDatabyid);
        setPlansData(planDatabyid);
      } else {
        console.log('error');
      }
    }
    GetUserPlansDataByID();
  }, []);

  async function GetStatebyCpountry(event) {
    console.log(event);
    async function getStoresByStoreType(id) {
      await Axios.get(domainpath + `/country/${id}/state`, { headers }).then(response => {
        console.log(response);
        if (response.status === 200) {
          const storesdata = response.data.responsedata.states;
          const dataArray = storesdata.map(item => {
            return { id: item.id, name: item.name };
          });
          setarraydatastate(dataArray);
        }
      });
    }
    getStoresByStoreType(event);
  }
  async function citynamebystate(event) {
    shipping_details.resetFields(['shipping_city']);
    console.log(event);
    const selectedValue = { id: event };
    async function getcitybystateid(id) {
      await Axios.get(domainpath + `/country/state/${id}/city`, { headers }).then(response => {
        console.log(response);
        if (response.status === 200) {
          const citidata = response.data.responsedata.cities;
          setarraydatacity(citidata);
        }
      });
    }
    getcitybystateid(event);
    //
  }
  const GoSuccessPage = () => {
    history.push('./success');
  };

  const HandleSubmit = e => {
    console.log(dataUpdate);

    var get_month_detail = CardDetails?.month.slice(0, 2);
    var get_year_detail = CardDetails?.month.slice(2, 4);

    var payload = {};
    var card_details = {};
    var billing_info = {};
    payload['user_id'] = userid;
    payload['plan_id'] = plan_id;
    payload['sub_total'] = PlansIddata?.price;
    payload['tax_amount'] = PlansIddata?.price;
    payload['discount'] = PlansIddata?.price;
    payload['coupon'] = PlansIddata?.price;
    payload['total'] = PlansIddata?.price;
    payload['card_info'] = card_details;
    payload['billing_info'] = billing_info;
    card_details['card_number'] = CardDetails?.card_number;
    card_details['cvv'] = CardDetails?.cvc;
    card_details['exp_month'] = get_month_detail;
    card_details['exp_year'] = get_year_detail;
    card_details['card_holder_name'] = CardDetails?.card_holder_name;
    billing_info['name'] = dataUpdate?.name;
    billing_info['email_id'] = dataUpdate?.email_id;
    billing_info['phone'] = dataUpdate?.phone;
    billing_info['billing_address_line1'] = dataUpdate?.billing_address_line1;
    billing_info['billing_address_line2'] = dataUpdate?.billing_address_line2;
    billing_info['billing_country'] = dataUpdate?.billing_country;
    billing_info['billing_state'] = dataUpdate?.billing_state;
    billing_info['billing_city'] = dataUpdate?.billing_city;
    billing_info['billing_locality'] = dataUpdate?.billing_locality;
    billing_info['billing_zipcode'] = dataUpdate?.billing_zipcode;
    console.log(card_details);
    console.log(billing_info);
    console.log(payload);
    async function CreateSection(data) {
      const url = `/subscription/pay/`;
      const response = await post_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.message,
        });
        setTimeout(() => {
          history.push('../success');
        }, 1000);
      } else
        notification.error({
          message: 'Server Error',
        });
    }
    CreateSection(payload);
  };
  const SaveAddress = () => {
    setIsBilling(false);
  };
  return (
    <AuthWrapper>
      <Row gutter={40} style={{ background: '#fff' }} className="checkout-spacing">
        <Col xs={24}>
          {ShowTopBar == true ? (
            <div className="head-main-line">
              <div className="head-main-size">
                <div className="head-main">
                  <div className="head-main-left">
                    <svg
                      className=""
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      {' '}
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                      ></path>{' '}
                    </svg>
                    <p>{Message}</p>
                  </div>

                  <div className="head-main-right">
                    <button>Details</button>
                    <svg
                      className="h-6 w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                      onClick={() => {
                        setShowTopBar(false);
                      }}
                    >
                      {' '}
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>{' '}
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
        </Col>

        <Col xs={24}>
          <div className="header-main-line">
            <div className="header-main-size">
              <div className="header-main">
                <div className="header-main-left">
                  <NavLink className="pass-link" to="/">
                    <img src={domainpath + showlogo} />
                  </NavLink>
                  <div className="header-nav">
                    <a className="pass-link" href="#explore">
                      Explore
                    </a>

                    <NavLink className="pass-link" to="/consultation">
                      Learn & Practice
                    </NavLink>
                    <NavLink className="pass-link" to="/login">
                      Quizzes
                    </NavLink>
                    <NavLink className="pass-link" to="/pricing">
                      Pricing
                    </NavLink>
                  </div>
                </div>
                {enc_user_detail ? (
                  <div className="header-main-right">
                    <NavLink className="pass-link" to="/dashboard">
                      Dashboard
                    </NavLink>
                  </div>
                ) : (
                  <div className="header-main-right">
                    <NavLink className="pass-link" to="/login">
                      Login
                    </NavLink>
                  </div>
                )}
                {/* <div className="header-main-right">
                <NavLink className="forgot-pass-link" to="/login">
                  Login
                </NavLink>
              </div> */}
              </div>
            </div>
          </div>

          <div className="mob-header" style={{ display: 'none' }}>
            <div id="nav-container">
              <div className="mob-header-inner">
                <div class="hem-button" tabindex="0">
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </div>
                <NavLink className="pass-link" to="/">
                  <img src={domainpath + showlogo} />
                </NavLink>
              </div>

              <div id="nav-content" tabindex="0">
                <div className="crossMob">
                  <svg
                    class="h-6 w-6"
                    x-description="Heroicon name: outline/x"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </div>
                <ul>
                  <li>
                    <a className="pass-link" href="#explore">
                      Explore
                    </a>
                  </li>
                  <li>
                    <NavLink className="pass-link" to="/">
                      Learn & Practice
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="pass-link" to="/">
                      Quizzes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="pass-link" to="/pricing">
                      Pricing
                    </NavLink>
                  </li>
                  <div className="login-mob">
                    {enc_user_detail ? (
                      <li>
                        <NavLink className="pass-link" to="/dashboard">
                          Dashboard
                        </NavLink>
                      </li>
                    ) : (
                      <li>
                        <NavLink className="pass-link" to="/login">
                          Login
                        </NavLink>
                      </li>
                    )}
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <div className="checkout-size">
        <Row gutter={40} className="checkout-main">
          <Col md={12} xs={24}>
            <Cards>
              <div className="checkout-header">
                <div className="logo">
                  <img src={domainpath + showlogo} />
                </div>
              </div>

              <Form form={checkout_form} className="checkout-form">
                <Col md={24} xs={24} sm={24}>
                  <Row gutter={40}>
                    <Col md={12} xs={24} sm={24}>
                      <div className="billing-details">
                        <div className="title-icon">
                          <h3>Billing Details</h3>
                          <FeatherIcon icon="edit" onClick={() => setIsBilling(true)} />
                        </div>
                        <p>Test 1</p>
                        <p>123 different street</p>
                        <p>sydney</p>
                        <p>4000</p>
                        <p>Australia</p>
                      </div>
                    </Col>
                  </Row>
                </Col>

                <Col md={24} xs={24} sm={24}>
                  <h3>Payment details</h3>
                  <div className="payemt-icon">
                    <img src={amex} className="img-fluid" alt="" />
                    <img src={mastercard} className="img-fluid" alt="" />
                    <img src={visa} className="img-fluid" alt="" />
                    <img src={cardfront} className="img-fluid" alt="" />
                  </div>
                </Col>

                <Col md={24} xs={24} sm={24}>
                  <Form.Item name="email">
                    <Input placeholder="Email Address"></Input>
                  </Form.Item>
                </Col>

                <Col md={24} xs={24} sm={24}>
                  <Form.Item name="card_holder_name">
                    <Input
                      placeholder="card Holder Name"
                      onChange={e =>
                        setCardDetails({
                          ...CardDetails,
                          card_holder_name: e.target.value,
                        })
                      }
                    ></Input>
                  </Form.Item>
                </Col>

                <Col md={24} xs={24} sm={24}>
                  <PaymentInputsWrapper {...wrapperProps} className="creditCard12">
                    <svg
                      {...getCardImageProps({
                        images,
                      })}
                    />
                    {console.log(CardDetails)}
                    <input
                      name="card_number"
                      {...getCardNumberProps()}
                      maxLength="16"
                      // onChange={(e) =>
                      //   handleChangeCardNumber(e)
                      // }
                      onChange={e =>
                        setCardDetails({
                          ...CardDetails,
                          card_number: e.target.value,
                        })
                      }
                    />
                    <input
                      {...getExpiryDateProps()}
                      // onChange={(e) =>
                      //   handleChangeCardDate(e)
                      // }
                      onChange={e =>
                        setCardDetails({
                          ...CardDetails,
                          month: e.target.value,
                        })
                      }
                    />
                    <input
                      {...getCVCProps()}
                      maxLength="3"
                      // onChange={(e) =>
                      //   handleChangeCardCvv(e)
                      // }
                      onChange={e =>
                        setCardDetails({
                          ...CardDetails,
                          cvc: e.target.value,
                        })
                      }
                    />
                  </PaymentInputsWrapper>
                </Col>
              </Form>
            </Cards>
          </Col>

          <Col md={12} xs={24}>
            {PlansData?.map((item, index) => (
              <Cards>
                <div className="checkout-pricing-details">
                  <p className="pricing-gold">{item?.plan_name}</p>
                  <p className="pricing-price">
                    ${item?.price} <span>/month</span>
                  </p>
                  <p className="site-des">To be paid $300 for 4 months</p>
                  {/* <div style={{ borderBottom: '1px solid #d2d2d2' }}></div> */}
                  <div className="flex-subtotal">
                    <p className="site-des">Subtotal</p>
                    <p className="site-des price">${item?.price}</p>
                  </div>
                  {/* <div className="flex-subtotal">
                    <p className="site-des">Shipping</p>
                    <p className="site-des price">Free</p>
                  </div> */}
                  <div style={{ borderBottom: '1px solid #d2d2d2', margin: '10px 0 10px 0' }}></div>
                  <div className="flex-subtotal">
                    <p className="site-des price">Total</p>
                    <p className="site-des price">${item?.price}</p>
                  </div>

                  <div className="text-right">
                    <Button
                      className="total-checkout"
                      onClick={HandleSubmit}
                      //onClick={GoSuccessPage}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              </Cards>
            ))}
          </Col>
        </Row>

        {isBilling && (
          <div className="modal-details-fade">
            <div className="modal-details">
              <FeatherIcon className="closemodal" icon="x" onClick={() => setIsBilling(false)} />
              <h3>Billing Details</h3>
              <div style={{ borderBottom: '1px solid #d2d2d2', margin: '12px 0 20px 0' }}></div>
              <Form form={billing_details}>
                <Col md={24} sm={24} xs={24}>
                  <Form.Item name="name">
                    <Input
                      placeholder="Enter your Name"
                      onChange={selectedValue =>
                        setData({
                          ...dataUpdate,
                          name: selectedValue.target.value,
                        })
                      }
                    ></Input>
                  </Form.Item>
                </Col>

                <Row>
                  <Col md={12} sm={24} xs={24}>
                    <Form.Item name="email_id">
                      <Input
                        placeholder="Enter your Email"
                        onChange={selectedValue =>
                          setData({
                            ...dataUpdate,
                            email_id: selectedValue.target.value,
                          })
                        }
                      ></Input>
                    </Form.Item>
                  </Col>
                  <Col md={12} sm={24} xs={24}>
                    <Form.Item name="phone">
                      <Input
                        placeholder="Phone Number"
                        onChange={selectedValue =>
                          setData({
                            ...dataUpdate,
                            phone: selectedValue.target.value,
                          })
                        }
                      ></Input>
                    </Form.Item>
                  </Col>
                  <Col md={12} sm={24} xs={24}>
                    <Form.Item name="billing_address_line1">
                      <Input
                        placeholder="Address Line 1"
                        onChange={selectedValue =>
                          setData({
                            ...dataUpdate,
                            billing_address_line1: selectedValue.target.value,
                          })
                        }
                      ></Input>
                    </Form.Item>
                  </Col>
                  <Col md={12} sm={24} xs={24}>
                    <Form.Item name="billing_address_line2">
                      <Input
                        placeholder="Address Line 2"
                        onChange={selectedValue =>
                          setData({
                            ...dataUpdate,
                            billing_address_line2: selectedValue.target.value,
                          })
                        }
                      ></Input>
                    </Form.Item>
                  </Col>
                  <Col md={12} sm={24} xs={24}>
                    <Form.Item name="billing_country">
                      <Select
                        style={{ width: '100%' }}
                        classNamePrefix="select"
                        isSearchable={true}
                        arrayDatacountry={arrayDatacountry}
                        onChange={selectedValue => {
                          setData({
                            ...dataUpdate,
                            billing_country: selectedValue,
                          }),
                            GetStatebyCpountry(selectedValue);
                        }}
                        //value={settingData.category_id}
                      >
                        {arrayDatacountry != null
                          ? arrayDatacountry.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                          : ''}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col md={12} sm={24} xs={24}>
                    <Form.Item name="billing_zipcode">
                      <Input
                        placeholder="Zip/Pistal Code"
                        onChange={selectedValue =>
                          setData({
                            ...dataUpdate,
                            billing_zipcode: selectedValue.target.value,
                          })
                        }
                      ></Input>
                    </Form.Item>
                  </Col>
                  <Col md={12} sm={24} xs={24}>
                    <Form.Item name="billing_state">
                      <Select
                        style={{ width: '100%' }}
                        classNamePrefix="select"
                        isSearchable={true}
                        arraydatastate={arraydatastate}
                        onChange={selectedValue => {
                          setData({
                            ...dataUpdate,
                            billing_state: selectedValue,
                          }),
                            citynamebystate(selectedValue);
                        }}
                        //value={settingData.category_id}
                      >
                        {arraydatastate != null
                          ? arraydatastate.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                          : ''}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col md={12} sm={24} xs={24}>
                    <Form.Item name="billing_city">
                      <Select
                        style={{ width: '100%' }}
                        classNamePrefix="select"
                        isSearchable={true}
                        arraydatacity={arraydatacity}
                        //onSelect={GetStatebyCpountry}
                        //value={settingData.category_id}
                        onChange={selectedValue =>
                          setData({
                            ...dataUpdate,
                            billing_city: selectedValue,
                          })
                        }
                      >
                        {arraydatacity != null
                          ? arraydatacity.map((item, index) => <Option value={item.id}>{item.name} </Option>)
                          : ''}
                      </Select>
                    </Form.Item>
                  </Col>
                  {/* <Col md={12} sm={24} xs={24}>
                    <Form.Item name="billing_locality">
                      <Input placeholder="Locality"></Input>
                    </Form.Item>
                  </Col> */}
                </Row>
                <Col md={24} sm={24} xs={24}>
                  <Form.Item>
                    <Button htmlType="submit" className="add-address" onClick={SaveAddress}>
                      Add Address
                    </Button>
                  </Form.Item>
                </Col>
              </Form>
            </div>
          </div>
        )}
      </div>

      <Row gutter={40} style={{ background: '#fff' }} className="checkout-spacing">
        <Col xs={24} className="CardsReletive" style={{ position: 'relative' }}>
          <Row gutter={30} className="main-CardRow">
            <div className="inner-MainCol">
              <Row>
                <Col md={6} xs={24} sm={24} style={{ marginRight: '20px' }}>
                  <Cards>
                    <FeatherIcon icon="map-pin" />
                    <h5 className="inner-h5">our main office</h5>
                    <p className="inner-paragraph">SoHo 94 Broadway St New York, NY 1001</p>
                  </Cards>
                </Col>
                <Col md={6} sm={24} xs={24} style={{ marginRight: '20px' }}>
                  <Cards>
                    <FeatherIcon icon="phone-call" />
                    <h5 className="inner-h5">PHONE NUMBER</h5>
                    <p className="inner-paragraph">234-9876-5400 888-0123-4567 (Toll Free)</p>
                  </Cards>
                </Col>
                <Col md={6} sm={24} xs={24} style={{ marginRight: '20px' }}>
                  <Cards>
                    <FeatherIcon icon="printer" />
                    <h5 className="inner-h5">FAX</h5>
                    <p className="inner-paragraph">1-234-567-8900</p>
                  </Cards>
                </Col>
                <Col md={6} sm={24} xs={24} style={{ marginRight: '20px' }}>
                  <Cards>
                    <FeatherIcon icon="mail" />
                    <h5 className="inner-h5">EMAIL</h5>
                    <p className="inner-paragraph">hello@theme.com</p>
                  </Cards>
                </Col>
              </Row>
            </div>
          </Row>
          <div className="footer-main-line">
            <div className="footer-main-size">
              <div className="footer-main">
                <Form
                  name="sDash_validation-form"
                  //  onFinish={HandleSubmitForm}
                >
                  <Row gutter={30} className="ContactForm">
                    <Col md={12} xs={24} sm={24}>
                      <Col md={12} sm={24} xs={24} className="mbottomInput">
                        <Form.Item name="fullname" label="Name" className="contact_input">
                          <Input placeholder="Enter your Name"></Input>
                        </Form.Item>
                      </Col>
                      <Col md={12} sm={24} xs={24} className="mbottomInput">
                        <Form.Item name="email" label="Email" className="contact_input">
                          <Input placeholder="Enter a valid email address"></Input>
                        </Form.Item>
                      </Col>

                      <Col md={12} sm={24} xs={24} className="mbottomInput">
                        <Form.Item name="phone" label="Phone Number" className="contact_input">
                          <Input placeholder="Enter your Phone Number"></Input>
                        </Form.Item>
                      </Col>
                      <Col md={12} sm={24} xs={24} className="mbottomInput">
                        <Form.Item name="subject" label="Message" className="contact_input">
                          <TextArea rows="3" placeholder="Enter your message"></TextArea>
                        </Form.Item>
                      </Col>
                      <Col md={12} sm={24} xs={24} className="mbottomInput">
                        <Form.Item name="" className="contact_input">
                          <Button>Submit</Button>
                        </Form.Item>
                      </Col>
                    </Col>
                    <Col md={12} className="GetInTouchDiv">
                      <h2 className="getIntouch">Get in touch</h2>
                      <Col md={12} className="inner-first">
                        <p>
                          We can ensure reliability, low cost fares and most important, with safety and comfort in mind.
                        </p>
                      </Col>
                      <Col md={12} className="inner-second">
                        <p>
                          Etiam sit amet convallis erat – class aptent taciti sociosqu ad litora torquent per conubia!
                          Maecenas gravida lacus. Lorem etiam sit amet convallis erat.
                        </p>
                      </Col>
                      <Col md={12} className="social_links">
                        <div className="footer-social">
                          <a>
                            <svg
                              class="h-6 w-6"
                              fill="currentColor"
                              role="img"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <title>Facebook</title>
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                            </svg>
                          </a>

                          <a>
                            <svg
                              class="h-6 w-6"
                              fill="currentColor"
                              role="img"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <title>Twitter</title>
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                            </svg>
                          </a>

                          <a>
                            <svg
                              class="h-6 w-6"
                              fill="currentColor"
                              role="img"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <title>YouTube</title>
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                            </svg>
                          </a>

                          <a>
                            <svg
                              class="h-6 w-6"
                              fill="currentColor"
                              role="img"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <title>Instagram</title>
                              <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"></path>
                            </svg>
                          </a>

                          <a>
                            <svg
                              class="h-6 w-6"
                              fill="currentColor"
                              role="img"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <title>LinkedIn</title>
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                            </svg>
                          </a>

                          <a>
                            <svg
                              class="h-6 w-6"
                              fill="currentColor"
                              role="img"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <title>GitHub</title>
                              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                            </svg>
                          </a>
                        </div>

                        <div className="footer-nav">
                          <NavLink className="pass-link" to={ConfigData?.footerlink_link1 + '/'}>
                            {ConfigData.footerlink_text1}
                          </NavLink>
                          {console.log(ConfigData.footerlink_link1)}
                          {/* <NavLink className="pass-link" to={domainpath+ConfigData?.footerlink_link1}>
                              {ConfigData.footerlink_text1}
                            </NavLink> */}
                          <NavLink className="pass-link" to={ConfigData?.footerlink_link2 + '/'}>
                            {ConfigData.footerlink_text2}
                          </NavLink>
                          <NavLink className="pass-link" to={ConfigData?.footerlink_link3 + '/'}>
                            {ConfigData.footerlink_text3}
                          </NavLink>
                          <NavLink className="pass-link" to={ConfigData?.footerlink_link4 + '/'}>
                            {ConfigData.footerlink_text4}
                          </NavLink>
                          <NavLink className="pass-link" to={ConfigData?.footerlink_link5 + '/'}>
                            {ConfigData.footerlink_text5}
                          </NavLink>
                          <NavLink className="pass-link" to={ConfigData?.footerlink_link6 + '/'}>
                            {ConfigData.footerlink_text6}
                          </NavLink>
                        </div>
                      </Col>
                    </Col>
                  </Row>
                </Form>

                <div className="copyright">
                  <p>©2023 UpstartPrep. {ConfigData?.copyright}</p>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </AuthWrapper>
  );
};
export default Checkout;
