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
    billing_vendor_country: '',
    tax_amount_type: '',
    tax_type: '',
    additional_tax_amount_type: '',
    additional_tax_type: '',
  });
  useEffect(() => {
    async function getpaymentsettings() {
      const url = api_url.get_config;
      const response = await get_api_request(url, headers);

      const configdata = response?.data?.responsedata?.configurations?.[0];
      console.log(configdata);
      form.setFieldsValue({
        add_tax_type: configdata?.add_tax_type,
        addi_tax_amount: configdata?.addi_tax_amount,
        addi_tax_amount_type: configdata?.addi_tax_amount_type,
        billing_vendor_address: configdata?.billing_vendor_address,
        billing_vendor_city: configdata?.billing_vendor_city,
        billing_vendor_country: configdata?.billing_vendor_country,
        billing_vendor_invoice_prefix: configdata?.billing_vendor_invoice_prefix,
        billing_vendor_name: configdata?.billing_vendor_name,
        billing_vendor_phone: configdata?.billing_vendor_phone,
        billing_vendor_state: configdata?.billing_vendor_state,
        billing_vendor_vat: configdata?.billing_vendor_vat,
        billing_vendor_zipcode: configdata?.billing_vendor_zipcode,
        enable_addi_tax: configdata?.enable_addi_tax,
        enable_invoice: configdata?.enable_invoice,
        enable_tax: configdata?.enable_tax,
        tax_addi_name: configdata?.tax_addi_name,
        tax_amount: configdata?.tax_amount,
        tax_amount_type: configdata?.tax_amount_type,
        tax_name: configdata?.tax_name,
        tax_type: configdata?.tax_type,
      });
      console.log(configdata?.enable_addi_tax);
      console.log(configdata?.enable_invoice);
      console.log(configdata?.enable_tax);
      setformData({
        add_tax_type: configdata?.add_tax_type,

        addi_tax_amount_type: configdata?.addi_tax_amount_type,

        billing_vendor_country: configdata?.billing_vendor_country,

        enable_addi_tax: configdata?.enable_addi_tax == 1 ? true : false,
        enable_invoice: configdata?.enable_invoice == 1 ? true : false,
        enable_tax: configdata?.enable_tax == 1 ? true : false,
      });
    }
    getpaymentsettings();
  }, []);
  //var Additionaltax;
  const HandleSubmit = fieldsValue => {
    //console.log(fieldsValue);
    console.log(formData);
    // if (formData.enable_addi_tax == true) {
    //   Additionaltax = '1';
    // } else if (formData.enable_addi_tax == false) {
    //   Additionaltax = '0';
    // }
    var payload = {
      add_tax_type: formData?.add_tax_type,
      addi_tax_amount: fieldsValue?.addi_tax_amount,
      addi_tax_amount_type: formData?.addi_tax_amount_type,
      billing_vendor_address: fieldsValue?.billing_vendor_address,
      billing_vendor_city: fieldsValue?.billing_vendor_city,
      billing_vendor_country: formData?.billing_vendor_country,
      billing_vendor_invoice_prefix: fieldsValue?.billing_vendor_invoice_prefix,
      billing_vendor_name: fieldsValue?.billing_vendor_name,
      billing_vendor_phone: fieldsValue?.billing_vendor_phone,
      billing_vendor_state: fieldsValue?.billing_vendor_state,
      billing_vendor_vat: fieldsValue?.billing_vendor_vat,
      billing_vendor_zipcode: fieldsValue?.billing_vendor_zipcode,
      enable_addi_tax: formData?.enable_addi_tax == true ? '1' : '0',
      enable_invoice: formData?.enable_invoice == true ? '1' : '0',
      enable_tax: formData?.enable_tax == true ? '1' : '0',
      tax_addi_name: fieldsValue?.tax_addi_name,
      tax_amount: fieldsValue?.tax_amount,
      tax_amount_type: formData?.tax_amount_type,
      tax_name: fieldsValue?.tax_name,
      tax_type: formData?.tax_type,
    };
    console.log(payload);
    async function Updatebillingandtax() {
      const url = api_url.get_config;
      const response = await put_api_request(url, payload, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: 'Tax Settings Updated Successfully',
        });
      } else {
        notification.error({
          message: response.status,
        });
      }
    }
    Updatebillingandtax();
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
              <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Billing Settings</h1>
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
                      <Form.Item>
                        <p className="ColoredP">Enter - (hyphen) to hide a field.</p>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="billing_vendor_name" label="Vendor Name">
                        <Input name="billing_vendor_name"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="billing_vendor_address" label="Address">
                        <TextArea name="billing_vendor_address" />
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="billing_vendor_city" label="City">
                        <Input name="billing_vendor_city"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="billing_vendor_state" label="State">
                        <Input name="billing_vendor_state"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="billing_vendor_country" label="Country">
                        <Select
                          name="billing_vendor_country"
                          onChange={e => setformData({ ...formData, billing_vendor_country: e })}
                        >
                          <Option value="India">India</Option>
                          <Option value="Pakistan">Pakistan</Option>
                          <Option value="United States">United States</Option>
                          <Option value="Afganistan">Afganistan</Option>
                          {/* <Option value={3}>kkkk</Option> */}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="billing_vendor_zipcode" label="Zip">
                        <Input name="billing_vendor_zipcode"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="billing_vendor_phone" label="Phone Number">
                        <Input name="billing_vendor_phone"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="billing_vendor_vat" label="VAT Number">
                        <Input name="billing_vendor_vat"></Input>
                      </Form.Item>
                    </Col>

                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="enable_invoice" label="Enable Invoicing">
                        <Switch
                          className="switchToggles"
                          onChange={e => setformData({ ...formData, enable_invoice: e })}
                          checked={formData?.enable_invoice}
                        ></Switch>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="billing_vendor_invoice_prefix" label="Invoice Prefix">
                        <Input name="billing_vendor_invoice_prefix"></Input>
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
              <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Tax Settings</h1>
            </div>
          </Col>
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
                      <Form.Item name="enable_tax" label="Enable Tax">
                        <Switch
                          className="switchToggles"
                          onChange={e => setformData({ ...formData, enable_tax: e })}
                          checked={formData?.enable_tax}
                        ></Switch>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="tax_name" label="Tax Name">
                        <Input name="tax_name"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="tax_amount_type" label="Tax Amount Type">
                        <Select name="tax_amount_type" onChange={e => setformData({ ...formData, tax_amount_type: e })}>
                          <Option value="Fixed">Fixed</Option>
                          <Option value="Percentage">Percentage</Option>
                          {/* <Option value={3}>kkkk</Option> */}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="tax_amount" label="Tax Amount">
                        <Input name="tax_amount"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="tax_type" label="Tax Type">
                        <Select name="tax_type" onChange={e => setformData({ ...formData, tax_type: e })}>
                          <Option value="Inclusive">Inclusive</Option>
                          <Option value="Exclusive">Exclusive</Option>
                          {/* <Option value={3}>kkkk</Option> */}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="enable_addi_tax" label="Enable Additional Tax">
                        <Switch
                          className="switchToggles"
                          onChange={e => setformData({ ...formData, enable_addi_tax: e })}
                          checked={formData?.enable_addi_tax}
                        ></Switch>
                      </Form.Item>
                    </Col>

                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="tax_addi_name" label="Additional Tax Name">
                        <Input name="tax_addi_name"></Input>
                      </Form.Item>
                    </Col>
                    {/* <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="tag_line" label="Zip">
                        <Input></Input>
                      </Form.Item>
                    </Col> */}
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="addi_tax_amount_type" label="Additional Tax Amount Type">
                        <Select
                          name="addi_tax_amount_type"
                          onChange={e => setformData({ ...formData, addi_tax_amount_type: e })}
                        >
                          <Option value="Fixed">Fixed</Option>
                          <Option value="Percentage">Percentage</Option>
                          {/* <Option value={3}>kkkk</Option> */}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="addi_tax_amount" label="Additional Tax Amount">
                        <Input name="addi_tax_amount"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="add_tax_type" label="Additional Tax Type">
                        <Select name="add_tax_type" onChange={e => setformData({ ...formData, add_tax_type: e })}>
                          <Option value="Inclusive">Inclusive</Option>
                          <Option value="Exclusive">Exclusive</Option>
                          {/* <Option value={3}>kkkk</Option> */}
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
      </Main>
    </>
  );
};

export default GeneralSetting;
