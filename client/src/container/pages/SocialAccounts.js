import React, { useEffect, useState } from 'react';
import { Row, Col, Form, notification } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import Cookies from 'js-cookie';
import 'moment/locale/zh-cn';
import { get_api_request, api_url, put_api_request } from '../../helpers/Common';

const { decrypt } = require('../../helpers/encryption-decryption');

const SocialAccounts = () => {
  const [form] = Form.useForm();

  const [authData, setAuthData] = useState();

  const access_token = Cookies.get('access_token');
  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    token: access_token,
    device_id: '',
    api_version: '',
    browser: '',
    device_type: '',
  };

  useEffect(() => {
    var enc_userDetail = Cookies.get('UserDetail');
    var User_Details = decrypt(enc_userDetail);
    console.log(User_Details);
    const user_ID = User_Details?.sessdata?.users_id;
    async function GetAllURL() {
      const url = api_url.get_auth_url;
      console.log(url);
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const authdata = response?.data?.responsedata[0].auth_url;

        setAuthData(authdata);
      }
    }
    GetAllURL();

    const search = window.location.href; // to get url
    console.log(search);
    const splitcode = search.split('code=');
    console.log(splitcode);
    if (splitcode?.[1]) {
      const payload = {
        user_id: user_ID,
        code: splitcode?.[1],
      };
      PostCode(payload);
      console.log(payload);
    }
  }, []);

  async function PostCode(data) {
    //update_access_token
    const url = api_url.update_access_token;
    console.log(url);
    const response = await put_api_request(url, data, headers);
    console.log(response);
    if (response.status == 200) {
      notification.success({
        message: 'Connected Successfully',
      });
    }
  }
  return (
    <>
      <PageHeader ghost title="Social Accounts" />
      <Main>
        {/* {authData?.map((item, i) => (
      
          <Row gutter={25} key={i} className="icon_row">
            <Col xxl={4} md={4} xs={8} className="image_icon">
              <img src={item.icon} key={i} />
            </Col>
            <Col xxl={4} md={4} xs={8} className="button_icon">
              <a
                key={i}
                href=""
                style={{ marginTop: 24 }}
                size="default"
                className="auth_button"
                onClick={() => {
                  window.open(item.auth_url, '_blank');
                }}
              >
                Connect
              </a>
            </Col>
            {console.log(authData)}
            <Col xxl={4} md={4} xs={8} className="checkbox_icon">
              <input type="checkbox" id="topping" name="topping" readOnly checked={item.access} />
            </Col>
          </Row>
        ))} */}

        <Row gutter={25} className="icon_row">
          <Col xxl={4} md={4} xs={8} className="image_icon" style={{ marginTop: '25px' }}>
            <i class="fa fa-pinterest" style={{ color: '#ff0000', fontSize: '22px' }}></i>
          </Col>
          <Col xxl={4} md={4} xs={8} className="button_icon">
            <a
              //key={i}
              href=""
              style={{ marginTop: 24 }}
              size="default"
              className="auth_button"
              onClick={() => {
                // window.open(item.auth_url, '_blank');
                // window.open("https://www.pinterest.com/oauth/?client_id=1483528&redirect_uri=http://localhost:3001/admin/users/social_accounts&response_type=code&scope=boards:read,boards:read_secret,boards:write,boards:write_secret,pins:read,pins:read_secret,pins:write,pins:write_secret,user_accounts:read,catalogs:read,catalogs:write", '_blank');
                window.open(authData);
              }}
            >
              Connect
            </a>
          </Col>
          {console.log(authData)}
          <Col xxl={4} md={4} xs={8} className="checkbox_icon">
            <input type="checkbox" id="topping" name="topping" readOnly checked={true} />
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default SocialAccounts;
