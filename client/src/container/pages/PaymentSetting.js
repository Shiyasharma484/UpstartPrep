import React, { useEffect, useState } from 'react';
import { Row, Col, Form, notification, Input, Button, Select, Switch } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { AddUser } from './style';
import Cookies from 'js-cookie';
import { Main } from '../styled';
import 'moment/locale/zh-cn';
import { Cards } from '../../components/cards/frame/cards-frame';
import { get_api_request, post_api_request, put_api_request, api_url } from '../../helpers/Common';
import { headers } from '../../helpers/variables';
import TextArea from 'antd/lib/input/TextArea';
// import { encrypttheid } from '../../helpers/encode-decode';

const { decrypt } = require('../../helpers/encryption-decryption');

const GeneralSetting = () => {
  const [form] = Form.useForm();
  const [formData, setformData] = useState({
    payment_process: '',
    currency: '',
    currency_symbol: '',
    currency_symbol_position: '',
    enable_paypal: '',
    enable_stripe: '',
    enable_razorpay: '',
    enable_bank_transfer: '',
    paypal_client_id: '',
    paypal_currency_symbol: '',
    stripe_api_key: '',
    stripe_secret_key: '',
    stripe_webhook_url: '',
    stripe_webhook_secret: '',
  });
  useEffect(() => {
    async function getpaymentsettings() {
      const url = api_url.get_config;
      const response = await get_api_request(url, headers);

      const configdata = response?.data?.responsedata?.configurations?.[0];
      console.log(configdata);
      form.setFieldsValue({
        bank_account_number: configdata?.bank_account_number,
        bank_account_owner: configdata?.bank_account_owner,
        bank_bic: configdata?.bank_bic,
        bank_iban: configdata?.bank_iban,
        bank_name: configdata?.bank_name,
        bank_other_details: configdata?.bank_other_details,
        bank_routing_number: configdata?.bank_routing_number,
        payment_settings_currency: configdata?.payment_settings_currency,
        payment_settings_currency_symbol: configdata?.payment_settings_currency_symbol,
        payment_settings_currency_symbol_position: configdata?.payment_settings_currency_symbol_position,
        payment_settings_payment_process: configdata?.payment_settings_payment_process,
        paypal_client_id: configdata?.paypal_client_id,
        paypal_client_secret: configdata?.paypal_client_secret,
        razorpay_key_id: configdata?.razorpay_key_id,
        razorpay_key_secret: configdata?.razorpay_key_secret,
        razorpay_webhook_secret: configdata?.razorpay_webhook_secret,
        razorpay_webhook_url: configdata?.razorpay_webhook_url,
        stripe_api_key: configdata?.stripe_api_key,
        stripe_secret_key: configdata?.stripe_secret_key,
        stripe_webhook_secret: configdata?.stripe_webhook_secret,
        stripe_webhook_url: configdata?.stripe_webhook_url,
      });
      setformData({
        bank_account_number: configdata?.bank_account_number,
        bank_account_owner: configdata?.bank_account_owner,
        bank_bic: configdata?.bank_bic,
        bank_iban: configdata?.bank_iban,
        bank_name: configdata?.bank_name,
        bank_other_details: configdata?.bank_other_details,
        bank_routing_number: configdata?.bank_routing_number,
        payment_settings_currency: configdata?.payment_settings_currency,
        payment_settings_currency_symbol: configdata?.payment_settings_currency_symbol,
        payment_settings_currency_symbol_position: configdata?.payment_settings_currency_symbol_position,
        payment_settings_payment_process: configdata?.payment_settings_payment_process,
        paypal_client_id: configdata?.paypal_client_id,
        paypal_client_secret: configdata?.paypal_client_secret,
        razorpay_key_id: configdata?.razorpay_key_id,
        razorpay_key_secret: configdata?.razorpay_key_secret,
        razorpay_webhook_secret: configdata?.razorpay_webhook_secret,
        razorpay_webhook_url: configdata?.razorpay_webhook_url,
        stripe_api_key: configdata?.stripe_api_key,
        stripe_secret_key: configdata?.stripe_secret_key,
        stripe_webhook_secret: configdata?.stripe_webhook_secret,
        stripe_webhook_url: configdata?.stripe_webhook_url,
        enable_bank_transfer: configdata?.enable_bank_transfer == 1 ? true : false,
        enable_paypal: configdata?.enable_paypal == 1 ? true : false,
        enable_razorpay: configdata?.enable_razorpay == 1 ? true : false,
        enable_stripe: configdata?.enable_stripe == 1 ? true : false,
      });
    }
    getpaymentsettings();
  }, []);

  const HandleSubmit = fiedsValue => {
    console.log(fiedsValue);
    console.log(formData);
    var payload = {
      enable_bank_transfer: formData?.enable_bank_transfer == true ? '1' : '0',
      enable_paypal: formData?.enable_paypal == true ? '1' : '0',
      enable_razorpay: formData?.enable_razorpay == true ? '1' : '0',
      enable_stripe: formData?.enable_stripe == true ? '1' : '0',
      bank_account_number: fiedsValue?.bank_account_number,
      bank_account_owner: fiedsValue?.bank_account_owner,
      bank_bic: fiedsValue?.bank_bic,
      bank_iban: fiedsValue?.bank_iban,
      bank_name: fiedsValue?.bank_name,
      bank_other_details: fiedsValue?.bank_other_details,
      bank_routing_number: fiedsValue?.bank_routing_number,
      payment_settings_currency: fiedsValue?.payment_settings_currency,
      payment_settings_currency_symbol: fiedsValue?.payment_settings_currency_symbol,
      payment_settings_currency_symbol_position: fiedsValue?.payment_settings_currency_symbol_position,
      payment_settings_payment_process: fiedsValue?.payment_settings_payment_process,
      paypal_client_id: fiedsValue?.paypal_client_id,
      paypal_client_secret: fiedsValue?.paypal_client_secret,
      paypal_currency_symbol: fiedsValue?.paypal_currency_symbol,
      razorpay_key_id: fiedsValue?.razorpay_key_id,
      razorpay_key_secret: fiedsValue?.razorpay_key_secret,
      razorpay_webhook_secret: fiedsValue?.razorpay_webhook_secret,
      razorpay_webhook_url: fiedsValue?.razorpay_webhook_url,
      stripe_api_key: fiedsValue?.stripe_api_key,
      stripe_secret_key: fiedsValue?.stripe_secret_key,
      stripe_webhook_secret: fiedsValue?.stripe_webhook_secret,
      stripe_webhook_url: fiedsValue?.stripe_webhook_url,
    };
    console.log(payload);
    async function UpdatePaymentMethod() {
      const url = api_url.get_config;
      const response = await put_api_request(url, payload, headers);

      if (response.status == 201) {
        notification.success({
          message: 'Payment Settings Updated Successfully',
        });
      } else {
        notification.error({
          message: response.status,
        });
      }
    }
    UpdatePaymentMethod();
  };

  return (
    <>
      <PageHeader ghost title="" />
      <Main className="SettingForm">
        <Row gutter={30}>
          <Col md={24}>
            <div
              data-aos="fade-down"
              data-aos-offset="10"
              data-aos-delay="50"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="center"
            >
              <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Payment Settings</h1>
            </div>
          </Col>
          <Col md={24}>
            <div
              data-aos="fade-up"
              data-aos-offset="10"
              data-aos-delay="50"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="center"
            >
              <Cards>
                <Form
                  name="sDash_validation-form GeneralsettingsForm"
                  //className="AddForm contactForm"
                  form={form}
                  layout="vertical"
                  onFinish={HandleSubmit}
                >
                  <Row gutter={30} className="togglefield settingsform ">
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="payment_settings_payment_process" label="Default Payment Processor">
                        <Select name="payment_settings_payment_process">
                          <Option value="PayPal">PayPal</Option>
                          <Option value="Stripe">Stripe</Option>
                          <Option value="Razorpay">Razorpay</Option>
                          <Option value="Bank">Bank</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="payment_settings_currency" label="Currency">
                        <Select name="payment_settings_currency">
                          <Option value="USD-United States Dollar">USD-United States Dollar</Option>
                          <Option value="INR - Indian Rupee">INR - Indian Rupee</Option>
                          <Option value="EUR - Euro"> EUR - Euro</Option>
                          <Option value=" GBP - British Pound"> GBP - British Pound</Option>
                          <Option value=" AFN - Afghan Afghani"> AFN - Afghan Afghani</Option>
                          <Option value="ALL - Albanian Lek"> ALL - Albanian Lek</Option>
                          <Option value="DZD - Algerian Dinar"> DZD - Algerian Dinar</Option>
                          <Option value="DKK - Danish Krone"> DKK - Danish Krone</Option>
                          <Option value="JPY - Japanese Yen"> JPY - Japanese Yen</Option>
                          <Option value="PHP - Philippine Peso"> PHP - Philippine Peso</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="payment_settings_currency_symbol" label="Currency Symbol">
                        <Input name="payment_settings_currency_symbol" type="text" placeholder="$"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="payment_settings_currency_symbol_position" label="Currency Symbol Position">
                        <Select name="payment_settings_currency_symbol_position">
                          <Option value="Left">Left</Option>
                          <Option value="Right">Right</Option>
                          {/* <Option value={3}>okkkk</Option> */}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                      <Button htmlType="submit" type="success" size="default" className="btn-animation">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Cards>
            </div>
          </Col>
        </Row>

        <Row gutter={30}>
          <Col md={24}>
            <div
              data-aos="fade-down"
              data-aos-offset="10"
              data-aos-delay="50"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="center"
            >
              <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>PayPal Settings</h1>
            </div>
          </Col>
          <Col md={24}>
            <div
              data-aos="fade-up"
              data-aos-offset="10"
              data-aos-delay="50"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="center"
            >
              <Cards>
                <Form
                  name="sDash_validation-form GeneralsettingsForm"
                  //className="AddForm contactForm"
                  form={form}
                  layout="vertical"
                  onFinish={HandleSubmit}
                >
                  <Row gutter={30} className="togglefield settingsform ">
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="enable_paypal" label="Enable PayPal">
                        <Switch
                          className="switchToggles"
                          onChange={e => setformData({ ...formData, enable_paypal: e })}
                          checked={formData?.enable_paypal}
                        ></Switch>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="paypal_client_id" label="Client Id">
                        <Input name="paypal_client_id" />
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="paypal_client_secret" type="password" label="Secret">
                        <Input name="paypal_client_secret" />
                      </Form.Item>
                    </Col>
                    {/* <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="paypal_currency_symbol" label="Currency Symbol">
                        <Input name="paypal_currency_symbol"></Input>
                      </Form.Item>
                    </Col> */}
                  </Row>
                  <Row gutter={30}>
                    <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                      <Button htmlType="submit" type="success" size="default" className="btn-animation">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Cards>
            </div>
          </Col>
        </Row>

        <Row gutter={30}>
          <Col md={24}>
            <div
              data-aos="fade-down"
              data-aos-offset="10"
              data-aos-delay="50"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="center"
            >
              <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Stripe Settings</h1>
            </div>
          </Col>
          <Col md={24}>
            <div
              data-aos="fade-up"
              data-aos-offset="10"
              data-aos-delay="50"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="center"
            >
              <Cards>
                <Form
                  name="sDash_validation-form GeneralsettingsForm"
                  //className="AddForm contactForm"
                  form={form}
                  layout="vertical"
                  onFinish={HandleSubmit}
                >
                  <Row gutter={30} className="togglefield settingsform ">
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="enable_stripe" label="Enable Stripe">
                        <Switch
                          className="switchToggles"
                          onChange={e => setformData({ ...formData, enable_stripe: e })}
                          checked={formData?.enable_stripe}
                        ></Switch>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="stripe_api_key" label="Api Key">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="stripe_secret_key" type="password" label="Secret Key">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="stripe_webhook_url" label="Stripe Webhook URL">
                        <Input></Input>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="stripe_webhook_secret" type="password" label="Stripe Webhook Secret">
                        <Input></Input>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                      <Button htmlType="submit" type="success" size="default" className="btn-animation">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Cards>
            </div>
          </Col>
        </Row>
        <Row gutter={30}>
          <Col md={24}>
            <div
              data-aos="fade-down"
              data-aos-offset="10"
              data-aos-delay="50"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="center"
            >
              <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Razorpay Settings</h1>
            </div>
          </Col>
          <Col md={24}>
            <div
              data-aos="fade-up"
              data-aos-offset="10"
              data-aos-delay="50"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="center"
            >
              <Cards>
                <Form
                  name="sDash_validation-form GeneralsettingsForm"
                  //className="AddForm contactForm"
                  form={form}
                  layout="vertical"
                  onFinish={HandleSubmit}
                >
                  <Row gutter={30} className="togglefield settingsform ">
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="enable_razorpay" label="Enable Razorpay">
                        <Switch
                          className="switchToggles"
                          onChange={e => setformData({ ...formData, enable_razorpay: e })}
                          checked={formData?.enable_razorpay}
                        ></Switch>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="razorpay_key_id" label="Razorpay Key Id">
                        <Input name="razorpay_key_id" />
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="razorpay_key_secret" type="password" label="Razorpay Key Secret">
                        <Input name="razorpay_key_secret" />
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="razorpay_webhook_url" label="Razorpay Webhook URL">
                        <Input name="razorpay_webhook_url"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="razorpay_webhook_secret" type="password" label="Razorpay Webhook Secret">
                        <Input name="razorpay_webhook_secret"></Input>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                      <Button htmlType="submit" type="success" size="default" className="btn-animation">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Cards>
            </div>
          </Col>
        </Row>

        <Row gutter={30}>
          <Col md={24}>
            <div
              data-aos="fade-down"
              data-aos-offset="10"
              data-aos-delay="50"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="center"
            >
              <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Bank Settings</h1>
            </div>
          </Col>
          <Col md={24}>
            <div
              data-aos="fade-up"
              data-aos-offset="10"
              data-aos-delay="50"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="center"
            >
              <Cards>
                <Form
                  name="sDash_validation-form GeneralsettingsForm"
                  //className="AddForm contactForm"
                  form={form}
                  layout="vertical"
                  onFinish={HandleSubmit}
                >
                  <Row gutter={30} className="togglefield settingsform ">
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="enable_bank_transfer" label="Enable Bank Transfer">
                        <Switch
                          className="switchToggles"
                          onChange={e => setformData({ ...formData, enable_bank_transfer: e })}
                          checked={formData?.enable_bank_transfer}
                        ></Switch>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item>
                        <p className="ColoredP">Enter - (hyphen) to hide a field.</p>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="bank_name" label="Bank Name">
                        <Input name="bank_name" />
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="bank_account_owner" label="Account Owner">
                        <Input name="bank_account_owner" />
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="bank_account_number" label="Account Number">
                        <Input name="bank_account_number"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="bank_iban" label="IBAN">
                        <Input name="bank_iban"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="bank_routing_number" label="Routing Number">
                        <Input name="bank_routing_number"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="bank_bic" label="BIC/Swift">
                        <Input name="bank_bic"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="bank_other_details" label="Other Details">
                        <TextArea name="bank_other_details" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                      <Button htmlType="submit" type="success" size="default" className="btn-animation">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Cards>
            </div>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default GeneralSetting;
