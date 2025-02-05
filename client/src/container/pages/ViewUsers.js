import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import { AddUser } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
//import ViewStoreUserInfo from './overview/viewinfo';
//import ViewStoreUserWork from './overview/viewwork';
import { headers } from '../../helpers/variables';
import { get_api_request, post_api_request, put_api_request, delete_api_request, api_url } from '../../helpers/Common.js';
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

var ModuleName = 'VIEWUSER';
const ViewUser = ({ match }) => {
  const history = useHistory(); //for redirects in page
  const [form] = Form.useForm();
  const params = useParams();
  const dateFormat = 'DD-MM-YYYY';
  const { TextArea } = Input;

  const [image, setImage] = useState(null);

  useEffect(() => {
    console.log(sessionStorage.getItem('storeID'));
    const encStoreID = sessionStorage.getItem('storeID');
    var storeID;
    if (encStoreID && encStoreID.length > 0) {
      storeID = decodetheid(encStoreID); //
    }

    if (params.id.length > 0) {
      async function fetchStoreListData() {
        const postID = params.id;
        const url = api_url.user_single + postID;
        const response = await get_api_request(url, headers);
        console.log(response);
        if (response.status == 200) {
          const userdata = response.data.responsedata.user[0];
          console.log(userdata);
          const roles = response?.data?.responsedata?.user?.[0].roles;
          if (roles && roles.length > 0) {
            roles.map(item => {
              if (storeID == item.store_id) {
                form.setFieldsValue({ roles: item.role_name }); //store_type_name
                form.setFieldsValue({ store_type_name: item.store_type_name });
              } else {
                form.setFieldsValue({ roles: 'No Role' });
              }
            });
          }
          if (userdata.date_of_birth != null) {
          }

          if (userdata.active == 1) {
            form.setFieldsValue({
              active: 'Active',
            });
          } else {
            form.setFieldsValue({
              active: 'Inactive',
            });
          }

          form.setFieldsValue({
            first_name: userdata.first_Name,
            last_name: userdata.last_Name,
            email: userdata.email,
            phone: userdata.phone,
            gender: userdata.gender,
            date_of_birth: moment(userdata.date_of_birth).format(dateFormat),
            address_line1: userdata.address_line1,
            address_line2: userdata.address_line2,
            country: userdata.country,
            city: userdata.city,
            state: userdata.state,
            postal_code: userdata.postal_code,
            description: userdata.description,
            nick_name: userdata.nick_name,
            image: userdata.image,
            store_type_id: userdata.store_type_id,
          });
          if (userdata?.image != null) {
            setImage(userdata.image);
          }
        } else if (response.status == 204) {
          console.log('No Such user in db');
        }
        // });
      }
      fetchStoreListData();
    } else {
      alert('wrongly accessed the page');
      history.push('/../users/users');
    }
  }, []);

  return (
    <>
      <PageHeader
        ghost
        title="View Post"
        buttons={[
          <div key="2" className="page-header-actions">
            <Button onClick={() => history.push(`../users`)} size="small" key="5" type="primary">
              View Users List
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <AddUser>
              <Cards>
                <Form name="sDash_validation-form" form={form} layout="vertical">
                  <h3>
                    <span className="TitleUserAdd">Personal Information</span>
                  </h3>

                  <Row gutter={25}>
                    <Col xs={24}>
                      <Row gutter={30}>
                        <Col md={6} xs={24}>
                          <Form.Item name="Name" label="Name">
                            <Input placeholder="Name" readOnly />
                          </Form.Item>
                        </Col>
                        {/* <Col md={6} xs={24}>
                          <Form.Item name="Role" label="Role">
                            <Input readOnly />
                          </Form.Item>
                        </Col> */}
                        <Col md={6} xs={24}>
                          <Form.Item name="email" label="Email Address">
                            <Input placeholder="name@example.com" readOnly />
                          </Form.Item>
                        </Col>
                        <Col md={6} xs={24}>
                          <Form.Item name="phone" label="Phone Number">
                            <Input readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={30}>
                        {/* <Col md={6} xs={24}>
                          <Form.Item name="gender" label="Gender">
                            <Input readOnly />
                          </Form.Item>
                        </Col> */}
                        {/* <Col md={6} xs={24}>
                          <Form.Item name="date_of_birth" label="Date Of Birth">
                            <Input type="text" style={{ width: '100%', padding: '12px' }} readOnly />
                          </Form.Item>
                        </Col> */}
                        {/* 
                        <Col md={6} xs={24}>
                          <Form.Item name="nick_name" label="Nick Name">
                            <Input readOnly />
                          </Form.Item>
                        </Col> */}
                        {image ? (
                          <Col md={6} xs={24}>
                            <Form.Item name="image" label="image">
                              <img src={image} width="40%" />
                            </Form.Item>
                          </Col>
                        ) : (
                          ''
                        )}
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    {/* <Col md={24} xs={24}>
                      <Form.Item className="spaceCustmLable" name="description" label="Biography">
                        <TextArea rows={2} readOnly />
                      </Form.Item>
                    </Col> */}
                  </Row>
                  {/* <h3>
                    <span className="TitleUserAdd">Address</span>
                  </h3> */}
                  <Row gutter={25}>
                    <Col xs={24}>
                      <Row gutter={30}>
                        {/* <Col md={8} xs={24}>
                          <Form.Item name="address_line1" label="Address Line 1">
                            <Input readOnly />
                          </Form.Item>
                        </Col> */}
                        {/* <Col md={8} xs={24}>
                          <Form.Item name="address_line2" label="Address Line 2">
                            <Input readOnly />
                          </Form.Item>
                        </Col> */}
                        {/* <Col md={8} xs={24}>
                          <Form.Item name="country" label="Country">
                            <Input readOnly />
                          </Form.Item>
                        </Col> */}
                      </Row>

                      <Row gutter={30}>
                        {/* <Col md={8} xs={24}>
                          <Form.Item name="state" label="State">
                            <Input readOnly />
                          </Form.Item>
                        </Col> */}
                        <Col md={8} xs={24}>
                          {/* <Form.Item name="city" label="City">
                            <Input readOnly />
                          </Form.Item> */}
                        </Col>
                        <Col md={8} xs={24}>
                          {/* <Form.Item name="postal_code" label="Postal/Zip/Pin">
                            <Input readOnly />
                          </Form.Item> */}
                        </Col>
                      </Row>
                      {/* <h3>
                        <span className="TitleUserAdd">Others</span>
                      </h3> */}
                      <Row gutter={30}>
                        <Col md={8} xs={24}>
                          <Form.Item name="active" label="Status" initialValue="">
                            <Input placeholder="Status" readOnly />
                          </Form.Item>
                        </Col>
                        {/* <Col md={8} xs={24}>
                          <Form.Item name="store_type_name" initialValue="" label="Store Type">
                            <Input placeholder="Status" readOnly />
                          </Form.Item>
                        </Col> */}
                        <Col md={8} xs={24}>
                          <Form.Item name="roles" initialValue="" label="Role">
                            <Input placeholder="Status" readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Form.Item>
                    <div className="add-user-bottom text-right">
                      {/*<Button
                        htmlType="submit"
                        type="primary"
                        size="default"
                        enabled={page == 0}
                        onClick={() => {
                          setPage(currPage => currPage + 0);
                        }}
                      >
                        Back
                      </Button>*/}

                      {/*<Button
                        htmlType="submit"
                        type="success"
                        size="default"
                        disabled={page == FormTitles.length - 1}
                        onClick={() => {
                          setPage(currPage => currPage + 1);
                        }}
                      >
                        Next
                        {/* {page === FormTitles.length - 1 ? "Submit" : "Next"} 
                      </Button>*/}
                    </div>
                  </Form.Item>
                </Form>
              </Cards>
            </AddUser>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default ViewUser;
