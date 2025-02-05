import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Form } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { UserOutlined } from '@ant-design/icons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Link } from 'react-router-dom';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
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

const { TextArea } = Input;
const RefundPolicy = () => {
  const [form] = Form.useForm();
  const [state, setState] = useState({
    file: null,
    list: null,
    submitValues: {},
  });
  // const handleSubmit = values => {
  //     setState({ ...state, submitValues: values });
  // };
  const handleHtml = event => {
    htmlValue(event.html);
  };
  const [htmlValue, setHtmlValue] = useState('');

  useEffect(() => {
    async function fetchData() {
      const url = api_url.get_settings;
      const response = await get_api_request(url, headers);
      const config_Data = response?.data?.responsedata?.configurations;
      console.log(config_Data);
      config_Data?.map(item => {
        if (item?.config_key == 'Custom_refund_policy') {
          setHtmlValue(item?.config_value);
        } else {
        }
      });
    }

    fetchData();
  }, []);

  const handleSubmit = async e => {
    var payload = {};
    payload['Custom_refund_policy'] = htmlValue;

    console.log(payload);
    const url = api_url.update_settings;
    const response = await put_api_request(url, payload, headers);
    if (response.status == 201) {
      notification.success({
        message: 'Settings Updated Successfully',
      });
    }
  };

  return (
    <>
      <PageHeader ghost title="Refund Policy" />
      <Main>
        <Cards headless>
          <Row gutter={24}>
            <Col xs={24}>
              <h3>Custom Refund Policy*</h3>
              {console.log(htmlValue)}
              <Form>
                {/* {htmlValue ? ( */}
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
                {/* ) : (
                  ''
                )} */}

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

export default RefundPolicy;
