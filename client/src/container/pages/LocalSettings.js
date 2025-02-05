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
  const [languagearray, setlanguagearray] = useState();
  const [Directiondata, setDirectiondata] = useState();
  const [Timezone, setTimezone] = useState();
  const [formData, setformData] = useState({
    localization_locale: '',
    localization_default_direction: '',
    localization_default_timezone: '',
  });
  useEffect(() => {
    async function Getallmodules(data) {
      const url = api_url.getall_modules;
      const response = await get_api_request(url, data, headers);

      if (response.status == 200) {
        const Moduledata = response?.data?.responsedata?.modules;
        const getmodules = Moduledata.map(items => {
          if (items.id == '73') {
            const parentdata = items?.id;
            async function getentitybyparentid() {
              const url = api_url.get_entity_byparentid + parentdata;
              const response = await get_api_request(url, data, headers);

              const questiontypedata = response?.data?.responsedata;

              const languagedata = questiontypedata.map(item => {
                return { id: item.id, name: item.name };
              });
              setlanguagearray(languagedata);
            }

            getentitybyparentid();
          }
        });
      } else {
        console.log('error');
      }
    }
    Getallmodules();

    async function Getallentity() {
      const url = api_url.getall_entity;
      const response = await get_api_request(url, headers);

      if (response.status == 200) {
        const Entitydata = response?.data?.responsedata;
        const getmodules = Entitydata.map(items => {
          if (items.id == '34') {
            const parentdata = items?.id;
            async function getentitybyparentid() {
              const url = api_url.get_entity_byparentid + parentdata;
              const response = await get_api_request(url, headers);

              const Directiondata = response?.data?.responsedata;

              const DirectiondtaArray = Directiondata.map(item => {
                return { id: item.id, name: item.name };
              });
              setDirectiondata(DirectiondtaArray);
            }

            getentitybyparentid();
          } else if (items.name == 'Timezone') {
            const parentdata = items?.id;

            async function gettimezonebyid() {
              const url = api_url.get_entity_byparentid + parentdata;
              const response = await get_api_request(url, headers);

              const Timezonedata = response?.data?.responsedata;

              const TimezoneDataArray = Timezonedata.map(item => {
                return { id: item.id, name: item.name };
              });
              setTimezone(TimezoneDataArray);
            }

            gettimezonebyid();
          }
        });
      } else {
        console.log('error');
      }
    }
    Getallentity();

    async function getconfig() {
      const url = api_url.get_config;
      const response = await get_api_request(url, headers);

      const configdata = response?.data?.responsedata?.configurations?.[0];
      form.setFieldsValue({
        localization_default_timezone: configdata?.localization_default_timezone,
        localization_locale: configdata?.localization_locale,
        localization_default_direction: configdata?.localization_default_direction,
      });
      setformData({
        localization_default_timezone: configdata?.localization_default_timezone,
        localization_locale: configdata?.localization_locale,
        localization_default_direction: configdata?.localization_default_direction,
      });
    }
    getconfig();
  }, []);

  const HandleSubmit = fieldsValue => {
    var payload = {
      localization_locale: formData?.localization_locale,
      localization_default_direction: formData?.localization_default_direction,
      localization_default_timezone: formData?.localization_default_timezone,
    };

    async function Updateconfig() {
      const url = api_url.get_config;
      const response = await put_api_request(url, payload, headers);

      if (response.status == 201) {
        notification.success({
          message: 'Localization Settings Updated Successfully',
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
              <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Localization Settings</h1>
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
                      <Form.Item name="localization_locale" label="Default Locale">
                        <Select
                          onChange={selectedValue => {
                            setformData({ ...formData, localization_locale: selectedValue });
                          }}
                        >
                          {languagearray?.map(item => (
                            <Option value={item.name}>{item.name}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="localization_default_direction" label="Default Direction">
                        <Select
                          onChange={selectedValue => {
                            setformData({ ...formData, localization_default_direction: selectedValue });
                          }}
                        >
                          {Directiondata?.map(item => (
                            <Option value={item.name}>{item.name}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={16} xs={24} className="mb-space">
                      <Form.Item name="localization_default_timezone" label="Default Timezone">
                        <Select
                          onChange={selectedValue => {
                            setformData({ ...formData, localization_default_timezone: selectedValue });
                          }}
                        >
                          {Timezone?.map(item => (
                            <Option value={item.name}>{item.name}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={30} style={{ margin: '0px' }}>
                    <Col md={24} xs={24} className="mainteneceBtn">
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
