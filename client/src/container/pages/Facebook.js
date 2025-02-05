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
const Facebook = () => {
  const [form] = Form.useForm();
  const [showButton, setShowButton] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [userID, setUserID] = useState();
  const [rowID, setRowID] = useState();
  const [authURL, setAuthURL] = useState();
  const [data, setData] = useState({
    client_id: '',
    client_secret: '',
    redirect_uri: '',
    refresh_token: '',
    token: '',
  });
  const [dd, setDD] = useState(true);
  const [code, setCode] = useState(true);
  useEffect(() => {
    var enc_userDetail = Cookies.get('UserDetail');
    var response = decrypt(enc_userDetail);
    if (response?.login == true) {
      const UserID = response?.sessdata?.users_id;
      const ID = decodetheid(UserID);
      setUserID(ID);

      async function GetAllFBConnects(id) {
        const url = api_url.facebook_by_user + id;
        const response = await get_api_request(url, { headers });
        if (response.status == 200) {
          setShowButton(true);
          setIsChecked(true);
          const data = response?.data?.responsedata?.fbconnects?.[0];
          setRowID(data.id);
          setAuthURL(data.auth_url);
          form.setFieldsValue({
            client_id: data.client_id,
            client_secret: data.client_secret,
            redirect_uri: data.redirect_uri,
            refresh_token: data.refresh_token,
            token: data.token,
          });
          setData({
            client_id: data.client_id,
            client_secret: data.client_secret,
            redirect_uri: data.redirect_uri,
            refresh_token: data.refresh_token,
            token: data.token,
          });
        } else if (response.status == 204) {
          notification.error({
            message: 'Server Error',
          });
        } else {
          notification.error({
            message: 'Server Error',
          });
        }
      }
      GetAllFBConnects(ID);
    }
    const search = window.location.href; // to get url
    const splitcode = search.split('code=');
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
  }, [dd]);

  const AuthURL = () => {
    // window.location.href = authURL;
    window.open(authURL, '_blank'); //to redirect new window
    //const urldata = window.location.href; // to get url
  };
  const handleSubmit = () => {
    const payload = {};
    payload['user_id'] = userID;
    payload['client_id'] = data.client_id;
    payload['client_secret'] = data.client_secret;
    payload['redirect_uri'] = data.redirect_uri;
    async function UpdateData(data) {
      const url = api_url.facebook;

      const response = await post_api_request(url, data, { headers });
      c;
      if (response.status == 201) {
        const auth_url = response?.data?.responsedata?.fbconnects?.[0].auth_url;
        setAuthURL(auth_url);
        setIsChecked(true);
        setShowButton(true);
        notification.success({ message: response?.statusText });
      } else {
        notification.error({ message: 'Server Error' });
      }
    }
    UpdateData(payload);
  };
  const handleUpdate = () => {
    const payload = {};
    payload['user_id'] = userID;
    payload['client_id'] = data.client_id;
    payload['client_secret'] = data.client_secret;
    payload['redirect_uri'] = data.redirect_uri;

    async function UpdateData(data) {
      console.log(data);
      const url = api_url.facebook + rowID;
      console.log(url);
      const response = await put_api_request(url, data, { headers });
      console.log(response);
      if (response.status == 200) {
        setIsChecked(true);
        setDD(!dd);
        notification.success({ message: response?.data?.message });
      } else {
        notification.error({ message: 'Server Error' });
      }
    }
    UpdateData(payload);
  };

  return (
    <>
      <PageHeader ghost title="FACEBOOK" />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <AddUser>
              <Cards>
                <Form name="sDash_validation-form" form={form} layout="vertical">
                  <Row gutter={30}>
                    <Col md={6} xs={24}>
                      <Form.Item
                        name="client_id"
                        label="Client ID"
                        rules={[
                          {
                            required: true,
                            message: 'Please Enter Client ID !',
                          },
                        ]}
                      >
                        <Input
                          placeholder="Client ID"
                          onChange={e => setData({ ...data, client_id: e.target.value })}
                        />
                      </Form.Item>
                    </Col>
                    <Col md={6} xs={24}>
                      <Form.Item
                        name="client_secret"
                        initialValue=""
                        label="Client Secret"
                        rules={[
                          {
                            required: false,
                            message: 'Please Enter Client Secret !',
                          },
                        ]}
                      >
                        <Input
                          placeholder="Client Secret"
                          onChange={e => setData({ ...data, client_secret: e.target.value })}
                        />
                      </Form.Item>
                    </Col>
                    <Col md={6} xs={24}>
                      <Form.Item
                        name="redirect_uri"
                        initialValue=""
                        label="Redirect URI"
                        rules={[
                          {
                            required: false,
                            message: 'Please Enter Redirect URI !',
                          },
                        ]}
                      >
                        <Input
                          placeholder="Redirect URI"
                          onChange={e => setData({ ...data, redirect_uri: e.target.value })}
                        />
                      </Form.Item>
                    </Col>

                    {showButton == true ? (
                      <Button
                        htmlType="submit"
                        type="success"
                        size="default"
                        className="instagram_button"
                        onClick={handleUpdate}
                      >
                        Update
                      </Button>
                    ) : (
                      <Button
                        htmlType="submit"
                        type="success"
                        size="default"
                        className="instagram_button"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    )}
                    {isChecked == true ? (
                      <Button
                        htmlType="submit"
                        type="success"
                        size="default"
                        className="instagram_button auth"
                        onClick={AuthURL}
                      >
                        Authorise
                      </Button>
                    ) : (
                      ''
                    )}
                  </Row>
                </Form>
              </Cards>
            </AddUser>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Facebook;
