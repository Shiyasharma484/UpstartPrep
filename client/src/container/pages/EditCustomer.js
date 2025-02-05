import React, { useEffect, useState } from 'react';
import { Row, Col, Form } from 'antd';
import { useHistory } from 'react-router-dom';
import { PageHeader } from '../../components/page-headers/page-headers';
import { AddUser } from '../../container/pages/style';
import { Button } from '../../components/buttons/buttons';
import { Input, notification, Image } from 'antd';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import Cookies from 'js-cookie';
import authorizes from '../../../src/static/img/authorized.png';
import { headers } from '../../helpers/variables';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { get_api_request, put_api_request, api_url } from '../../helpers/Common.js';
import { decodetheid } from '../../helpers/encode-decode';

const { encrypt, decrypt } = require('../../helpers/encryption-decryption');

var ModuleName = 'DASHBOARD';
const EditCustomer = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const params = useParams();
  const [permission, setPermission] = useState(false);
  const [data, setData] = useState({
    first_Name: '',
    last_Name: '',
    phone: '',
    email: '',
  });
  useEffect(() => {
    const enc_user_detail = Cookies.get('UserDetail');
    const response = decrypt(enc_user_detail);
    const UserInfo = response?.sessdata?.user?.[0];
    const GetRole = UserInfo?.user_role?.toUpperCase();
    const modules = UserInfo?.permissions?.[GetRole].MODULES;
    if (modules[ModuleName]) {
      setPermission(true);
      const value = modules[ModuleName]; //get module values
      const getvalue = value.split(',');
    } else {
      notification.error({
        message: 'Permissions Not Valid',
      });
    }

    const paramsID = params.id;
    if (paramsID) {
      const PostID = decodetheid(paramsID);
      async function GetUserByID(id) {
        const url = api_url.get_all_users + id;
        const response = await get_api_request(url, headers);

        const user_data = response?.data?.responsedata?.users?.[0];
        form.setFieldsValue({
          first_Name: user_data?.first_Name,
          last_Name: user_data?.last_Name,
          phone: user_data?.phone,
          email: user_data?.email,
        });
        setData({
          first_Name: user_data?.first_Name,
          last_Name: user_data?.last_Name,
          phone: user_data?.phone,
          email: user_data?.email,
        });
      }
      GetUserByID(PostID);
    }
  }, []);

  const fandlesubmit = () => {
    const paramsID = params.id;
    async function UpdateUser(id) {
      const url = api_url.get_all_users + id;
      const response = await put_api_request(url, data, headers);
      if (response.status == 200) {
        notification.success({
          message: 'User Updated Successfully',
        });
        setTimeout(() => {
          console.log('This will run after 1 second!');
          history.push('../customer-list');
        }, 1000);
      } else {
        notification.error({
          message: response.message,
        });
      }
    }
    UpdateUser(paramsID);
  };

  return (
    <>
      <PageHeader
        ghost
        title="Edit Customer"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button onClick={() => history.push(`../customer-list`)} size="small" key="4" type="primary">
              View List
            </Button>
          </div>,
        ]}
      />
      {permission == true ? (
        <Main>
          <Row gutter={15}>
            <Col xs={24}>
              <AddUser>
                <Cards>
                  <Form name="sDash_validation-form" form={form} layout="vertical">
                    <Row gutter={30}>
                      <Col md={8} xs={24}>
                        <Form.Item
                          name="first_Name"
                          label="First Name"
                          rules={[
                            {
                              required: true,
                              message: 'Please Enter First_Name !',
                            },
                          ]}
                        >
                          <Input
                            name=""
                            placeholder="First_Name"
                            onChange={e => setData({ ...data, first_Name: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={8} xs={24}>
                        <Form.Item
                          name="last_Name"
                          label="Last Name"
                          rules={[
                            {
                              required: true,
                              message: 'Please Enter Last_Name !',
                            },
                          ]}
                        >
                          <Input
                            name=""
                            placeholder="Last_Name"
                            onChange={e => setData({ ...data, last_Name: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={8} xs={24}>
                        <Form.Item
                          name="email"
                          initialValue=""
                          label="Email"
                          rules={[
                            {
                              required: false,
                              message: 'Please Enter Email !',
                            },
                            {
                              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: 'Please Enter Correct Email',
                            },
                          ]}
                        >
                          <Input
                            placeholder="Email"
                            name=""
                            onChange={e => setData({ ...data, email: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={30}>
                      <Col md={8} xs={24}>
                        <Form.Item
                          name="phone"
                          initialValue=""
                          label="Phone Number"
                          rules={[
                            {
                              required: false,
                              message: 'Please Enter Email !',
                            },
                          ]}
                        >
                          <Input
                            type="number"
                            placeholder="Phone Number"
                            name=""
                            onChange={e => setData({ ...data, phone: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Form.Item>
                        <div className="add-user-bottom text-right">
                          <Button htmlType="submit" type="success" size="default" onClick={fandlesubmit}>
                            Submit
                          </Button>
                        </div>
                      </Form.Item>
                    </Row>
                  </Form>
                </Cards>
              </AddUser>
            </Col>
          </Row>
        </Main>
      ) : (
        <div className="authorized_msg">
          <img src={authorizes} width="40%" />
        </div>
      )}
    </>
  );
};

export default EditCustomer;
