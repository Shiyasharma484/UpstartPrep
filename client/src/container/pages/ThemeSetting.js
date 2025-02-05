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
import FormItem from 'antd/lib/form/FormItem';

const { decrypt } = require('../../helpers/encryption-decryption');

const GeneralSetting = () => {
  const [form] = Form.useForm();

  const [formData, setformData] = useState({
    secondary_color: '',
    primary_color: '',
    font_name: '',
    font_url: '',
  });
  useEffect(() => {
    async function getconfig() {
      const url = api_url.get_config;
      const response = await get_api_request(url, headers);
      const configdata = response?.data?.responsedata?.configurations?.[0];
      console.log(configdata);
      console.log(configdata?.primary_color);
      form.setFieldsValue({
        secondary_color: configdata?.secondary_color,
        primary_color: configdata?.primary_color,
        font_name: configdata?.font_name,
        font_url: configdata?.font_url,
      });
      setformData({
        secondary_color: configdata?.secondary_color,
        primary_color: configdata?.primary_color,
        font_name: configdata?.font_name,
        font_url: configdata?.font_url,
      });
    }
    getconfig();
  }, []);
  const ThemeSettings = fieldsvalue => {
    var ThemePayLoad = {
      secondary_color: formData?.secondary_color,
      primary_color: formData?.primary_color,
      font_name: formData?.font_name,
      font_url: formData?.font_url,
    };
    console.log(ThemePayLoad);
    async function Updateconfig() {
      const url = api_url.get_config;
      const response = await put_api_request(url, ThemePayLoad, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: 'Settings Updated Successfully',
        });
      } else {
        notification.error({
          message: response.status,
        });
      }
    }
    Updateconfig();
  };

  return (
    <>
      <PageHeader ghost title="Theme Settings" />

      <Main className="SettingForm">
        <Row gutter={30}>
          <Col md={4} style={{ textAlign: 'right' }}>
            <h3>Theme Settings</h3>
          </Col>
          <Col md={20}>
            <Cards>
              <Form
                name="sDash_validation-form GeneralsettingsForm"
                form={form}
                layout="vertical"
                onFinish={ThemeSettings}
              >
                <Row gutter={30} className="Theme_setting_form">
                  <Col md={24} xs={24}>
                    <FormItem name="primary_bg" className="primary_bg">
                      <Col
                        md={24}
                        className="primary_bg"
                        name="primary_bg"
                        style={{
                          width: '80%',
                          background: `${formData?.primary_color}`,
                          color: `${formData?.secondary_color}`,
                          border: '1px solid gray',
                          borderRadius: '5px',
                          textAlign: 'center',
                          padding: '10px 0 10px 0px',
                        }}
                      >
                        Primary BG + Secondary Text
                      </Col>
                    </FormItem>
                    <FormItem name="secondary_bg" className="secondary_bg">
                      <Col
                        md={24}
                        className="secondary_bg"
                        name="secondary_bg"
                        style={{
                          width: '80%',
                          background: `${formData?.secondary_color}`,
                          color: `${formData?.primary_color}`,
                          border: '1px solid gray',
                          borderRadius: '5px',
                          textAlign: 'center',
                          padding: '10px 0 10px 0px',
                        }}
                      >
                        Secondary BG + Primary Text
                      </Col>
                    </FormItem>
                    <FormItem name="primary_whiteText" className="primary_whitetext">
                      <Col
                        md={24}
                        className="primary_whiteText"
                        name="primary_whitetext"
                        style={{
                          width: '80%',
                          background: `${formData?.primary_color}`,
                          color: `${formData?.secondary_color}`,
                          border: '1px solid gray',
                          borderRadius: '5px',
                          textAlign: 'center',
                          padding: '10px 0 10px 0px',
                        }}
                      >
                        Primary BG + White Text
                      </Col>
                    </FormItem>
                    <FormItem name="white_primaryText" className="white_primaryText">
                      <Col
                        md={24}
                        className="white_primaryText"
                        name="white_primarytext"
                        style={{
                          width: '80%',
                          border: '1px solid gray',
                          borderRadius: '5px',
                          color: `${formData?.primary_color}`,
                          textAlign: 'center',
                          padding: '10px 0 10px 0px',
                        }}
                      >
                        White BG + Primary Text
                      </Col>
                    </FormItem>
                    <FormItem name="white_secondaryText" className="white_secondarytext">
                      <Col
                        md={24}
                        className="white_secondaryText"
                        name="white_secondarytext"
                        style={{
                          width: '80%',
                          border: '1px solid gray',
                          borderRadius: '5px',
                          color: `${formData?.secondary_color}`,
                          textAlign: 'center',
                          padding: '10px 0 10px 0px',
                        }}
                      >
                        White BG + Secondary Text
                      </Col>
                    </FormItem>
                  </Col>
                  <Col md={24} xs={24} className="Primary_color">
                    <label style={{ margin: '0 0 0 15px', fontWeight: '600px' }}>Primary Color</label>
                    <FormItem name="primary_color">
                      <Input
                        type="color"
                        value={formData?.primary_color}
                        onChange={e => setformData({ ...formData, primary_color: e.target.value })}
                        style={{ width: '7%' }}
                        name="primary_color"
                      />
                      <Input
                        type="text"
                        value={formData?.primary_color}
                        onChange={e => setformData({ ...formData, primary_color: e.target.value })}
                        style={{ width: '72%', margin: '0 0 0 10px' }}
                        name="primary_color"
                      />
                    </FormItem>
                  </Col>
                  <Col md={24} xs={24} className="secondary_color">
                    <label style={{ margin: '0 0 0 15px', fontWeight: '600px' }}>Secondary Color</label>
                    <FormItem name="secondary_color">
                      <Input
                        type="color"
                        style={{ width: '7%' }}
                        name="secondary_color"
                        value={formData?.secondary_color}
                        onChange={e => setformData({ ...formData, secondary_color: e.target.value })}
                      />
                      <Input
                        type="text"
                        value={formData?.secondary_color}
                        onChange={e => setformData({ ...formData, secondary_color: e.target.value })}
                        style={{ width: '72%', margin: '0 0 0 10px' }}
                        name="primary_color"
                      />
                    </FormItem>
                  </Col>
                  {/* {console.log(formData?.primary_color)} */}
                </Row>
                <Row gutter={30}>
                  <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                    <Button htmlType="submit" type="success" size="default">
                      Save
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Cards>
          </Col>
        </Row>
        <Row gutter={30}>
          <Col md={4} style={{ textAlign: 'right' }}>
            <h3>Font Settings</h3>
          </Col>
          <Col md={20}>
            <Cards>
              <Form
                name="sDash_validation-form GeneralsettingsForm"
                form={form}
                layout="vertical"
                onFinish={ThemeSettings}
              >
                <Row gutter={30} className="togglefield settingsform ">
                  <Col md={24} xs={24} className="mb-space">
                    <label style={{ margin: '0 0 0 15px', fontWeight: '600px' }}>Default Font Name</label>
                    <Form.Item name="font_name">
                      <Input name="font_name" onChange={e => setformData({ ...formData, font_name: e.target.value })} />
                    </Form.Item>
                  </Col>
                  <Col md={24} xs={24} className="mb-space">
                    <label style={{ margin: '0 0 0 15px', fontWeight: '600px' }}>Default Font URL</label>
                    <Form.Item name="font_url">
                      <Input name="font_url" onChange={e => setformData({ ...formData, font_url: e.target.value })} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={30}>
                  <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                    <Button htmlType="submit" type="success" size="default">
                      Save
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default GeneralSetting;
