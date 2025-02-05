import React from 'react';
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
import { Row, Col, Form, Input, DatePicker, Select, Radio, InputNumber, notification, Image, Switch } from 'antd';

// @Todo console warning from button

const { theme } = config;
const Configurations = () => {
  return (
    <>
      <PageHeader
        ghost
        title="BASIC SETTINGS"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add New
            </Button>
          </div>,
        ]}
      />
      <Main className="sizesStyle">
        <Cards
          title={
            <div className="card-nav">
              <ul>
                <li>
                  <NavLink to={`#`} onClick={e => e.preventDefault()}>
                    <FeatherIcon icon="user" size={14} />
                    Configuration
                    {/* {FormTitles[page]} */}
                  </NavLink>
                </li>
              </ul>
            </div>
          }
        >
          <div className="TitleConf">
            <p style={{ marginTop: '10px' }}>
              <span className="TitleUserAdd2">SUBSCRIPTIONS (DISABLED)</span>
            </p>
            <p style={{ marginTop: '10px' }}>
              <span className="TitleUserAdd2">INVENTORY</span>
            </p>
          </div>

          <Row gutter={24}>
            <Col md={12}>
              <Form.Item label="TRIAL PERIOD:" className="trialCustm">
                <Input type="number" value="13" placeholder="Trial period" disabled />
                <span class="input-group-addon">Days</span> <p className="conf-Que">?</p>
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item label="SHOW ITEM CONDITIONS:" className="swtichTogglee">
                <p className="conf-Que">?</p>
                <div className="">
                  <span className="swtichOFF">OFF </span> <Switch defaultChecked />
                  <span className="swtichON"> ON</span>
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col md={12}>
              <Form.Item label="REQUIRED CARD UPFRONT:" className="swtichTogglee">
                <p className="conf-Que">?</p>
                <div className="">
                  <span className="swtichOFF">OFF </span> <Switch defaultChecked />
                  <span className="swtichON"> ON</span>
                </div>
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item label="IMAGE SIZE LIMIT IN KB:" className="trialCustm">
                <Input type="number" placeholder="Trial period" /> <p className="conf-Que">?</p>
              </Form.Item>
              <Form.Item label="NUMBER OF INVENTORY IMAGES:" className="trialCustm">
                <Input type="number" placeholder="Trial period" /> <p className="conf-Que">?</p>
              </Form.Item>
            </Col>
          </Row>

          <div className="TitleConf">
            <p style={{ marginTop: '10px' }}>
              <span className="TitleUserAdd2">VENDORS</span>
            </p>
            <p style={{ marginTop: '10px' }}>
              <span className="TitleUserAdd2">UNITS</span>
            </p>
          </div>

          <Row gutter={24}>
            <Col md={12}>
              <Form.Item label="VENDOR NEEDS APPROVAL:" className="swtichTogglee">
                <p className="conf-Que">?</p>
                <div className="">
                  <span className="swtichOFF">OFF </span> <Switch defaultChecked />
                  <span className="swtichON"> ON</span>
                </div>
              </Form.Item>

              <Form.Item label="CAN USE OWN CATALOG ONLY:" className="swtichTogglee">
                <p className="conf-Que">?</p>
                <div className="">
                  <span className="swtichOFF">OFF </span> <Switch defaultChecked />
                  <span className="swtichON"> ON</span>
                </div>
              </Form.Item>

              <Form.Item label="SHOW MERCHANT INFO AS VENDOR:" className="swtichTogglee">
                <p className="conf-Que">?</p>
                <div className="">
                  <span className="swtichOFF">OFF </span> <Switch defaultChecked />
                  <span className="swtichON"> ON</span>
                </div>
              </Form.Item>

              <Form.Item label="VENDOR CAN VIEW CUSTOMER INFO:" className="swtichTogglee">
                <p className="conf-Que">?</p>
                <div className="">
                  <span className="swtichOFF">OFF </span> <Switch defaultChecked />
                  <span className="swtichON"> ON</span>
                </div>
              </Form.Item>

              <Form.Item label="ENABLE LIVE CHAT:" className="swtichTogglee">
                <p className="conf-Que">?</p>
                <div className="">
                  <span className="swtichOFF">OFF </span> <Switch defaultChecked />
                  <span className="swtichON"> ON</span>
                </div>
              </Form.Item>

              <Form.Item label="ORDER CANCELLATION FEE:" className="trialCustm">
                <span class="input-group-addon" style={{ borderRadius: '0' }}>
                  $
                </span>
                <Input type="number" placeholder="Cancelation fee" />
                <p className="conf-Que">?</p>
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item label="*UNIT OF WEIGHT:" className="trialCustm">
                <Select defaultValue="Kilogram(kg)">
                  <Option value="Gram(g)">Gram(g)</Option>
                  <Option value="Kilogram(kg)">Kilogram(kg)</Option>
                  <Option value="Pound(lb)">Pound(lb)</Option>
                  <Option value="Ounce(oz)">Ounce(oz)</Option>
                </Select>
                <p className="conf-Que">?</p>
              </Form.Item>

              <Form.Item label="*UNIT OF LENGTH:" className="trialCustm">
                <Select defaultValue="Meter(M)">
                  <Option value="Meter(M)">Meter(M)</Option>
                  <Option value="Centemeter(cm)">Centemeter(cm)</Option>
                  <Option value="Inch(in)">Inch(in)</Option>
                </Select>
                <p className="conf-Que">?</p>
              </Form.Item>

              <Form.Item label="*UNIT OF VALUME:" className="trialCustm">
                <Select defaultValue="Liter(L)">
                  <Option value="Liter(L)">Liter(L)</Option>
                  <Option value="gallon(gal)">gallon(gal)</Option>
                </Select>
                <p className="conf-Que">?</p>
              </Form.Item>
            </Col>
          </Row>

          <div className="TitleConf">
            <p style={{ marginTop: '10px' }}>
              <span className="TitleUserAdd2">CUSTOMERS</span>
            </p>
            <p style={{ marginTop: '10px' }}>
              <span className="TitleUserAdd2">VIEWS</span>
            </p>
          </div>

          <Row gutter={24}>
            <Col md={12}>
              <Form.Item label="CAN CANCEL ORDER WITHIN:" className="trialCustm">
                <Input type="number" placeholder="CAN CANCEL ORDER WITHIN" />
                <span class="input-group-addon">Minutes</span> <p className="conf-Que">?</p>
              </Form.Item>

              <Form.Item label="ASK CUSTOMER FOR EMAIL SUBSCRIPTION:" className="swtichTogglee">
                <p className="conf-Que">?</p>
                <div className="">
                  <span className="swtichOFF">OFF </span> <Switch defaultChecked />
                  <span className="swtichON"> ON</span>
                </div>
              </Form.Item>

              <Form.Item label="SHOW SOCIAL AUTH:" className="swtichTogglee">
                <p className="conf-Que">?</p>
                <div className="">
                  <span className="swtichOFF">OFF </span> <Switch defaultChecked />
                  <span className="swtichON"> ON</span>
                </div>
              </Form.Item>

              <Form.Item label="ALLOW GUEST CHECKOUT:" className="swtichTogglee">
                <p className="conf-Que">?</p>
                <div className="">
                  <span className="swtichOFF">OFF </span> <Switch defaultChecked />
                  <span className="swtichON"> ON</span>
                </div>
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item label="PAGINATION:" className="trialCustm">
                <Input type="number" value="13" placeholder="PAGINATION" disabled />
                <p className="conf-Que">?</p>
              </Form.Item>

              <Form.Item label="SHOW SEO INFO TO FRONTEND:" className="swtichTogglee">
                <p className="conf-Que">?</p>
                <div className="">
                  <span className="swtichOFF">OFF </span> <Switch defaultChecked />
                  <span className="swtichON"> ON</span>
                </div>
              </Form.Item>
            </Col>
          </Row>

          <div className="TitleConf">
            <p style={{ marginTop: '10px' }}>
              <span className="TitleUserAdd2">ADDRESS</span>
            </p>
            <p style={{ marginTop: '10px' }}>
              <span className="TitleUserAdd2">NOTIFICATIONS</span>
            </p>
          </div>

          <Row gutter={24}>
            <Col md={12}>
              <Form.Item label="DEFAULT COUNTRY:" className="trialCustm">
                <Select defaultValue="United States">
                  <Option value="United States">United States</Option>
                  <Option value="India">India</Option>
                </Select>
                <p className="conf-Que">?</p>
              </Form.Item>

              <Form.Item label="DEFAULT STATE:" className="trialCustm">
                <Select defaultValue="Alabama">
                  <Option value="Alabama">Alabama</Option>
                  <Option value="Delhi">Delhi</Option>
                </Select>
                <p className="conf-Que">?</p>
              </Form.Item>

              <Form.Item label="SHOW ADDRESS TITLE:" className="swtichTogglee">
                <p className="conf-Que">?</p>
                <div className="">
                  <span className="swtichOFF">OFF </span> <Switch defaultChecked />
                  <span className="swtichON"> ON</span>
                </div>
              </Form.Item>

              <Form.Item label="SHOW COUNTRY NAME IN ADDRESS:" className="swtichTogglee">
                <p className="conf-Que">?</p>
                <div className="">
                  <span className="swtichOFF">OFF </span> <Switch defaultChecked />
                  <span className="swtichON"> ON</span>
                </div>
              </Form.Item>

              <Form.Item label="SHOW MAP:" className="swtichTogglee">
                <p className="conf-Que">?</p>
                <div className="">
                  <span className="swtichOFF">OFF </span> <Switch defaultChecked />
                  <span className="swtichON"> ON</span>
                </div>
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item label="NEW VENDOR REGISTERED:" className="swtichTogglee">
                <p className="conf-Que">?</p>
                <div className="">
                  <span className="swtichOFF">OFF </span> <Switch defaultChecked />
                  <span className="swtichON"> ON</span>
                </div>
              </Form.Item>
              <Form.Item label="NEW MESSAGE:" className="swtichTogglee">
                <p className="conf-Que">?</p>
                <div className="">
                  <span className="swtichOFF">OFF </span> <Switch defaultChecked />
                  <span className="swtichON"> ON</span>
                </div>
              </Form.Item>
              <Form.Item label="NEW TICKET:" className="swtichTogglee">
                <p className="conf-Que">?</p>
                <div className="">
                  <span className="swtichOFF">OFF </span> <Switch defaultChecked />
                  <span className="swtichON"> ON</span>
                </div>
              </Form.Item>
              <Form.Item label="WHEN DISPUTE APPEALED:" className="swtichTogglee">
                <p className="conf-Que">?</p>
                <div className="">
                  <span className="swtichOFF">OFF </span> <Switch defaultChecked />
                  <span className="swtichON"> ON</span>
                </div>
              </Form.Item>
            </Col>
          </Row>

          <div className="TitleConf">
            <p style={{ marginTop: '10px' }}>
              <span className="TitleUserAdd2">VISITORS</span>
            </p>
            <p style={{ marginTop: '10px' }}>
              <span className="TitleUserAdd2"></span>
            </p>
          </div>

          <Row gutter={24}>
            <Col md={12}>
              <Form.Item label="GOOGLE ANALYTIC REPORT:" className="swtichTogglee">
                <p className="conf-Que">?</p>
                <div className="">
                  <span className="swtichOFF">OFF </span> <Switch defaultChecked />
                  <span className="swtichON"> ON</span>
                </div>
              </Form.Item>
              <p>The changes can take up to 1 Day to affect the result.</p>
            </Col>
            <Col md={12}></Col>
          </Row>

          <Row>
            <Col md={24}>
              <Form.Item className="CustomSetting" style={{ textAlign: 'center' }}>
                <Button htmlType="submit" type="success" size="default">
                  UPDATE
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Cards>
      </Main>
    </>
  );
};

export default Configurations;
