import React, { useEffect, useState } from 'react';
import { Row, Col, Form, notification, Input, Button } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { AddUser } from './style';
import { Main } from '../styled';
import Cookies from 'js-cookie';
import 'moment/locale/zh-cn';
import { Cards } from '../../components/cards/frame/cards-frame';
import { decodetheid } from '../../helpers/encode-decode';
import { get_api_request, post_api_request, put_api_request, api_url } from '../../helpers/Common';
import { headers } from '../../helpers/variables';

const { decrypt } = require('../../helpers/encryption-decryption');
const Facebook1 = () => {
  const [form] = Form.useForm();

  const [authData, setAuthData] = useState();
  const [data, setData] = useState(false);
  useEffect(() => {
    var enc_userDetail = Cookies.get('UserDetail');
    var response = decrypt(enc_userDetail);
    const access_token = Cookies.get('access_token');
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      token: 'Bearer ' + access_token,
      device_id: '',
      api_version: '',
      browser: '',
      device_type: '',
    };

    async function GetAllURL() {
      const url = api_url.global_auth_url;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const authdata = response?.data?.responsedata;
        console.log(authdata);
        authdata?.map(item => {
          if (item.platform == 'facebook') {
            const facebook = item;
            setData(facebook);
          }
        });
      }
    }
    GetAllURL();

    const search = window.location.href; // to get url
    console.log(search);
    const splitcode = search.split('code=');
    console.log(splitcode);
    const getcode = splitcode?.[1];
    var code = {};
    code['code'] = getcode;
    if (getcode) {
      async function PostAccessToken(code) {
        const url = api_url.facebook_accesstoken;
        const response = await post_api_request(url, code, headers);
        if (response.status == 200) {
          notification.success({
            message: response?.data?.status,
          });
        } else {
          notification.error({ message: response?.data?.message });
        }
      }
      PostAccessToken(code);
    }
  }, []);
  return (
    <>
      <PageHeader ghost title="Facebook" />
      <Main>
        {console.log(data)}
        <Row gutter={25} key={'fb'} className="icon_row">
          <Col xxl={4} md={4} xs={8} className="image_icon">
            <img src={data.icon} key={'fb1'} />
          </Col>
          <Col xxl={4} md={4} xs={8} className="button_icon">
            <a
              key={'fb2'}
              href=""
              style={{ marginTop: 24 }}
              size="default"
              className="auth_button"
              onClick={() => {
                window.open(data.auth_url, '_blank');
              }}
            >
              Re-connect
            </a>
          </Col>
          <Col xxl={4} md={4} xs={8} className="checkbox_icon">
            <input type="checkbox" id="topping" name="topping" readOnly checked={data.access} />
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Facebook1;
