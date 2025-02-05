import React, { useEffect, useState } from 'react';
import { Row, Col, Form, notification, Input, Button } from 'antd';
import { TextArea } from '@progress/kendo-react-inputs';
import { PageHeader } from '../../components/page-headers/page-headers';
import { AddUser } from './style';
import Cookies from 'js-cookie';
import { Main } from '../styled';
import 'moment/locale/zh-cn';
import { imageRender } from '../../helpers/renderImage';

import { Cards } from '../../components/cards/frame/cards-frame';
import { get_api_request, post_api_request, put_api_request, api_url } from '../../helpers/Common';
import { headers } from '../../helpers/variables';
// import { decodetheid, encrypttheid } from '../../helpers/encode-decode';

const { decrypt } = require('../../helpers/encryption-decryption');

const Linkedin = () => {
  const [form] = Form.useForm();
  const [linkform] = Form.useForm();

  const [ImageUrl, setImageURL] = useState([]);
  const [link, setlink] = useState([]);
  const [reRenderPinData, setReRenderPinData] = useState(0);
  const [userid, setUserID] = useState();

  useEffect(() => {
    const enc_user_detail = Cookies.get('UserDetail');
    const response = decrypt(enc_user_detail);
    const userId = response?.sessdata?.users_id;
    setUserID(userId);

    async function getalldefaultImage() {
      const url = api_url.get_defaultimage_byuserid;
      const response = await get_api_request(url, headers);
      if (response.status === 200) {
        const kk = response.data.responsedata[0]?.link;
        console.log(kk);
        form.setFieldsValue({
          link: kk,
        });
      }
    }
    getalldefaultImage();
  }, [reRenderPinData]);

  const handleSubmit = feildsvalue => {
    const payload = {};
    payload['link'] = feildsvalue.link;
    UpdateData(payload);
  };
  async function UpdateData(data) {
    const url = api_url.updatebyuserId_defaultImage;
    const response = await put_api_request(url, data, headers);
    if (response.status == 201) {
      notification.success({
        message: 'DefaultLink updated Successfully',
      });
      setReRenderPinData(reRenderPinData + 1);
    }
  }

  return (
    <>
      <PageHeader ghost title="Link" />
      <Main>
        <Row gutter={15}>
          <Col xs={12}>
            <AddUser>
              <Cards>
                <Form name="sDash_validation-form" form={form} layout="vertical" onFinish={handleSubmit}>
                  <Row gutter={30}>
                    <Col md={24} className="">
                      <Form.Item name="link">
                        <TextArea name="link" rows={3} />
                      </Form.Item>
                    </Col>
                    <Col md={24} style={{ marginTop: ' 10px' }}>
                      <Button style={{ background: '#6dc16d', color: ' white' }} htmlType="submit">
                        Update
                      </Button>
                    </Col>
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

export default Linkedin;
