import React, { useState, useEffect } from 'react';
import { Row, Col, Select, notification, Form, Input } from 'antd';
import { useHistory } from 'react-router-dom';
//import React, { useState, useEffect } from 'react';
// import FeatherIcon from 'feather-icons-react';
// import { UserOutlined } from '@ant-design/icons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Link } from 'react-router-dom';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import authorizes from '../../../src/static/img/authorized.png';
import { headers } from '../../helpers/variables';
import { Editor, EditorTools } from '@progress/kendo-react-editor';
import { get_api_request, post_api_request, put_api_request, delete_api_request, api_url } from '../../helpers/Api.js';
const { encrypt, decrypt } = require('../../helpers/encryption-decryption');
const {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Indent,
  Outdent,
  OrderedList,
  UnorderedList,
  Undo,
  Redo,
  FontSize,
  FontName,
  FormatBlock,
  //Link,
  Unlink,
  InsertImage,
  ViewHtml,
  InsertTable,
  AddRowBefore,
  AddRowAfter,
  AddColumnBefore,
  AddColumnAfter,
  DeleteRow,
  DeleteColumn,
  DeleteTable,
  MergeCells,
  SplitCell,
} = EditorTools;
// const { TextArea } = Input;
//var ModuleName = 'SETTINGS';
const { TextArea } = Input;
const PrivacyPolicy = () => {
  const { Option } = Select;
  const history = useHistory();

  var Array_of_Modules = [];
  var UserRole = [];
  var currentStoreModules = [];
  var value_of_Module = [];
  var getModule = [];

  const [cssvalue, setCssValue] = useState('');
  const [scriptValue, setScriptValue] = useState('');
  const [htmlValue, setHtmlValue] = useState('');

  useEffect(() => {
    async function fetchData() {
      const url = api_url.get_settings;
      const response = await get_api_request(url, headers);
      const config_Data = response?.data?.responsedata?.configurations;
      console.log(config_Data);
      config_Data?.map(item => {
        if (item?.config_key == 'custom_privacy_policy') {
          setHtmlValue(item?.config_value);
        } else {
        }
      });
    }

    fetchData();
  }, []);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    file: null,
    list: null,
    submitValues: {},
  });
  // const handleSubmit = values => {
  //   setState({ ...state, submitValues: values });
  // };
  const handleCSS = event => {
    //event.preventDefault();
    htmlValue(event.html);
  };

  const handleScript = event => {
    setScriptValue(event.html);
  };
  const handleHtml = event => {
    htmlValue(event.html);
  };

  const handleSubmit = async e => {
    var payload = {};
    payload['custom_privacy_policy'] = htmlValue;

    console.log(payload);
    const url = api_url.update_settings;
    const response = await put_api_request(url, payload, headers);
    if (response.status == 201) {
      notification.success({
        message: 'Settings Updated Successfully',
      });
    }
  };

  // form.setFieldsValue({});
  return (
    <>
      <PageHeader ghost title="Privacy Policy" />

      <Main>
        <Cards headless>
          <Row gutter={24}>
            <Col xs={24}>
              <h3>Custom Privacy Policy*</h3>
              {console.log(htmlValue)}
              <Form>
                {htmlValue ? (
                  <Form.Item>
                    <Editor
                      tools={[
                        [Bold, Italic, Underline, Strikethrough],
                        [Subscript, Superscript],
                        [AlignLeft, AlignCenter, AlignRight, AlignJustify],
                        [Indent, Outdent],
                        [OrderedList, UnorderedList],
                        FontSize,
                        FontName,
                        FormatBlock,
                        [Undo, Redo],
                        [Link, Unlink, InsertImage, ViewHtml],
                        [InsertTable],
                        [AddRowBefore, AddRowAfter, AddColumnBefore, AddColumnAfter],
                        [DeleteRow, DeleteColumn, DeleteTable],
                        [MergeCells, SplitCell],
                      ]}
                      contentStyle={{
                        height: 430,
                      }}
                      // className="k-icon k-i-loading"
                      defaultContent={htmlValue}
                      onChange={handleHtml}
                    />
                  </Form.Item>
                ) : (
                  ''
                )}

                <p className="custmTxtQue">
                  <span>?</span>Add your custom styling HTML in the box. This will override the theme design.
                </p>
              </Form>
              <Button onClick={handleSubmit} htmlType="submit" type="success" size="default">
                Save
              </Button>
            </Col>
            <Col xs={12}></Col>
          </Row>
        </Cards>
      </Main>
    </>
  );
};

export default PrivacyPolicy;
