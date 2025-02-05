import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Row, Input, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useHistory } from 'react-router-dom';
import { headers } from '../../helpers/variables';
import { Main } from '../styled';
import { Button } from '../../components/buttons/buttons';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import authorizes from '../../../src/static/img/authorized.png';
import Cookies from 'js-cookie';
import {
  get_api_request,
  post_api_request,
  put_api_request,
  delete_api_request,
  api_url,
} from '../../helpers/Common.js';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Editor, EditorTools } from '@progress/kendo-react-editor';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
const {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  OrderedList,
  UnorderedList,
  InsertTable,
  InsertImage,
} = EditorTools;
const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

var ModuleName = 'DASHBOARD';
const EditComprehension = props => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [EditActiveStatusSwitch, setEditActiveStatusSwitch] = useState(false);

  const params = useParams();
  const id = params.id;
  const [formData, setformData] = useState({
    title: '',
    active: '',
    body: '',
  });

  useEffect(() => {
    async function GetComprehensionbyid() {
      const url = api_url.create_comprehension + props?.id;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const comprehensiondata = response?.data?.responsedata?.[0];
        console.log(comprehensiondata);
        if (comprehensiondata?.active == 1) {
          setEditActiveStatusSwitch(true);
        } else if (comprehensiondata?.active == 0) {
          setEditActiveStatusSwitch(false);
        }
        form.setFieldsValue({
          title: comprehensiondata?.title,
          body: comprehensiondata?.body,
        });
        setformData({
          title: comprehensiondata?.title,
          body: comprehensiondata?.body,
          active: comprehensiondata?.active,
        });
        //seteditdataarray(comprehensiondata);
      } else {
        console.log('error');
      }
    }
    GetComprehensionbyid();
  }, []);

  const handleSubmit = () => {
    console.log(formData);
    var activeswicth;
    if (EditActiveStatusSwitch == true) {
      activeswicth = 1;
    } else {
      activeswicth = 0;
    }
    var payload = {
      title: formData?.title,
      body: formData?.body,
      active: activeswicth,
    };
    async function UpdateComprehension() {
      const url = api_url.create_comprehension + props?.id;
      const response = await put_api_request(url, payload, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({ message: 'Comprehension Updated Sucessfully!' });
        history.push({
          pathname: '../users/comprehension',
          state: 'false',
        });
      } else {
        notification.error({ message: response?.message });
      }
    }
    UpdateComprehension();
  };

  return (
    <>
      <div className="Main-headerDiv">
        <div className="inner-headerDiv">
          <div className="headerDiv">
            <p>Edit Comprehension</p>
            <div className="crossIcon">
              <a
                onClick={() =>
                  //setShowUserGroup(false)
                  history.push({
                    pathname: '../users/comprehension',
                    state: 'false',
                  })
                }
              >
                X
              </a>
            </div>
          </div>
          <Main>
            <Form name="sDash_validation-form" form={form}>
              <Cards>
                <label>Comprehension Title</label>
                <Form.Item name="title">
                  <Input
                    name="title"
                    type="text"
                    onChange={selectedValue => {
                      setformData({ ...formData, title: selectedValue.target.value });
                    }}
                  ></Input>
                </Form.Item>
                <label>Body</label>
                <Form.Item name="body">
                  <Editor
                    name="body"
                    // value={cssvalue}
                    onChange={selectedValue => {
                      setformData({ ...formData, body: selectedValue.html });
                    }}
                    tools={[
                      [Bold, Italic, Underline, Strikethrough],
                      [Subscript, Superscript],
                      [OrderedList, UnorderedList],
                      [InsertTable, InsertImage],
                    ]}
                    contentStyle={{
                      height: 200,
                    }}
                  />
                </Form.Item>
                <label>
                  In-Active
                  <br />
                  Active (Shown Everywhere). In-active (Hidden Everywhere).
                </label>
                <Form.Item name="status">
                  <Switch
                    className="pull-right activeswitch"
                    onChange={() => setEditActiveStatusSwitch(!EditActiveStatusSwitch)}
                    checked={EditActiveStatusSwitch}
                  />
                </Form.Item>
                <Button type="dark" size="default" onClick={handleSubmit}>
                  Update
                </Button>
              </Cards>
            </Form>
          </Main>
        </div>
      </div>
    </>
  );
};
export default EditComprehension;
