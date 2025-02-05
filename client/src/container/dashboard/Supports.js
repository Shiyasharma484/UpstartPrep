import React, { lazy, Suspense, useState, useEffect } from 'react';
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
import { UserOutlined } from '@ant-design/icons';
import { Route, NavLink, useHistory } from 'react-router-dom';
import { get_api_request, post_api_request, put_api_request, delete_api_request, api_url } from '../../helpers/Api.js';
import { headers } from '../../helpers/variables';
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
// @Todo console warning from button

const { theme } = config;
const Supports = () => {
  const handleSubmit = async e => {
    var payload = {
      support_phone: '',
      tollfree_no: '',
      support_email: '',
      sender_email_address: '',
      sender_name: '',
      googleplus: '',
      facebook: '',
      twitter: '',
      pinterest: '',
      instagram: '',
      youtube: '',
    };

    // payload['headers_css'] = cssvalue;
    // payload['headers_script'] = scriptValue;
    // payload['headers_html'] = htmlValue;
    // payload['support'] = fieldvalue;
    console.log(payload);
    const url = api_url.update_settings;
    const response = await put_api_request(url, payload, headers);
    if (response.status == 201) {
      notification.success({
        message: 'Updated Successfully',
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      const url = api_url.get_settings;
      const response = await get_api_request(url, payload, headers);
      const config_Data = response?.data?.responsedata?.configurations;
      console.log(config_Data);
      fetchData();
    }
  }, []);

  return (
    <>
      <PageHeader
        ghost
        title="SUPPORT"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add New
            </Button>
          </div>,
        ]}
      />
      <Main className="customsupport">
        <Cards
          title={
            <div className="card-nav">
              <ul>
                <li>
                  <NavLink to={`#`} onClick={e => e.preventDefault()}>
                    <FeatherIcon icon="user" size={14} />
                    Supports
                    {/* {FormTitles[page]} */}
                  </NavLink>
                </li>
              </ul>
            </div>
          }
        >
          <Form onFinish={handleSubmit} name="basic">
            <Row gutter={24} className="supportmiddle">
              <Col md={24}>
                <div className="supportmid">
                  <Form.Item label="SUPPORT PHONE:" name="support_phone:">
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                      placeholder="SUPPORT PHONE"
                      prefix={<i class="fa fa-phone" aria-hidden="true"></i>}
                    />
                    {/* <span className="inlinespan">?</span> */}
                  </Form.Item>

                  <Form.Item label="TOLL FREE NUMBER:" name="tollfree_no:">
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                      placeholder="TOLL FREE NUMBER"
                      prefix={<i class="fa fa-phone-square" aria-hidden="true"></i>}
                    />
                    {/* <span className="inlinespan">?</span> */}
                  </Form.Item>

                  <Form.Item label="*SUPPORT EMAIL:" name="support_email:">
                    <Input
                      type="email"
                      placeholder="SUPPORT EMAIL"
                      prefix={<i class="fa fa-envelope-o" aria-hidden="true"></i>}
                    />
                    {/* <span className="inlinespan">?</span> */}
                  </Form.Item>

                  <Form.Item label="*DEFAULT SENDER EMAIL ADDRESS:" name="sender_email_address:">
                    <Input
                      type="email"
                      placeholder="DEFAULT SENDER EMAIL ADDRESS"
                      prefix={<i class="fa fa-at" aria-hidden="true"></i>}
                    />
                    {/* <span className="inlinespan">?</span> */}
                  </Form.Item>

                  <Form.Item label="*DEFAULT SENDER FULL NAME:" name="sender_name:">
                    <Input
                      type="text"
                      placeholder="DEFAULT SENDER FULL NAME"
                      prefix={<i class="fa fa-user" aria-hidden="true"></i>}
                    />
                    {/* <span className="inlinespan">?</span> */}
                  </Form.Item>
                </div>
                <br></br>
                <br></br>
                <Row gutter={24} className="breakpt">
                  <Col md={22}>
                    <span className="TitleUserAdd2" style={{ textAlign: 'right' }}>
                      SOCIAL LINKS
                    </span>
                    <hr></hr>
                  </Col>
                </Row>

                <div className="supportmid">
                  <Form.Item label="GOOGLE PLUS:" name="googleplus">
                    <Input type="url" prefix={<i class="fa fa-google-plus-official" aria-hidden="true"></i>} />
                  </Form.Item>

                  <Form.Item label="FACEBOOK:" name="facebook">
                    <Input type="url" prefix={<i class="fa fa-facebook" aria-hidden="true"></i>} />
                  </Form.Item>

                  <Form.Item label="TWITTER:" name="twitter">
                    <Input type="url" prefix={<i class="fa fa-twitter" aria-hidden="true"></i>} />
                  </Form.Item>

                  <Form.Item label="PINTEREST:" name="pinterest">
                    <Input type="url" prefix={<i class="fa fa-pinterest" aria-hidden="true"></i>} />
                  </Form.Item>

                  <Form.Item label="INSTAGRAM:" name="instagram">
                    <Input type="url" prefix={<i class="fa fa-instagram" aria-hidden="true"></i>} />
                  </Form.Item>

                  <Form.Item label="YOUTUBE:" name="youtube">
                    <Input type="url" prefix={<i class="fa fa-youtube" aria-hidden="true"></i>} />
                  </Form.Item>
                  <br></br>
                  <p>* Required fields.</p>
                  <Form.Item>
                    <Button htmlType="submit" type="success" size="default" className="supportbtn">
                      UPDATE
                    </Button>
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Form>
        </Cards>
      </Main>
    </>
  );
};

export default Supports;
