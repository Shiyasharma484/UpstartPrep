import React, { useEffect, useState } from 'react';
import { FlowChartWithState, Content, Page, Sidebar, SidebarItem } from 'react-work-flow';
import { Row, Col, Form, notification, Input, Button, Select, DatePicker } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { AddUser } from './style';
import Cookies from 'js-cookie';
import { Main } from '../styled';
import dayjs from 'dayjs';
import 'moment/locale/zh-cn';
import { Cards } from '../../components/cards/frame/cards-frame';
import { get_api_request, post_api_request, put_api_request, api_url } from '../../helpers/Common';
import { headers } from '../../helpers/variables';
import TextArea from 'antd/lib/input/TextArea';

const { decrypt, encrypt } = require('../../helpers/encryption-decryption');
const { decodetheid, encrypttheid } = require('../../helpers/encode-decode');

const Linkedin = () => {
  const params = useParams();
  const [form] = Form.useForm();
  const [userid, setUserID] = useState();
  const [arrayDataModels, setarrayDataModels] = useState([]);
  const [config, setconfig] = useState([]);

  const disabledDate = current => {
    return current && current < dayjs().endOf('day');
  };
  const [formData, setformData] = useState({
    updtaecontext: '',
    updtaemodel: '',
  });
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
  });

  function myTab2() {
    const zoomElement = document.querySelector('.workspace');
    let zoom = 1;
    const ZOOM_SPEED = 0.1;

    document.addEventListener('wheel', function(e) {
      console.log(e.target.value);
      if (e.deltaY > 0) {
        zoomElement.style.transform = 'scale(${(zoom += ZOOM_SPEED)})';
      } else {
        zoomElement.style.transform = 'scale(${(zoom -= ZOOM_SPEED)})';
      }
    });
  }
  const chartSimple = {
    offset: {
      x: 0,
      y: 0,
    },
    nodes: {},
    links: {},
    selected: {},
    hovered: {},
  };
  const numbers = [
    { id: 1, name: 'Leanne Graham' },
    { id: 2, name: 'Ervin Howell' },
    { id: 3, name: 'Clementine Bauch' },
    { id: 4, name: 'Patricia Lebsack' },
  ];
  const listItems = numbers.map(number => <li>{number}</li>);
  useEffect(() => {
    const enc_user_detail = Cookies.get('UserDetail');
    const response = decrypt(enc_user_detail);
    const userId = response?.sessdata?.users_id;
    setUserID(userId);

    async function getallConfiguration() {
      const Ids = '245';
      const url = api_url.get_all_configurations_byid + Ids;
      const response = await get_api_request(url, headers);
      if (response.status === 200) {
        const configdata = response.data.responsedata.configurations[0].config_value;
        setconfig(configdata);
        form.setFieldsValue({
          schedule_interval: configdata,
        });
      }
    }
    getallConfiguration();
  }, []);
  const handleSubmit = (feildsvalue, e) => {
    const payload = {};
    payload['config_key'] = 'schedule_interval';
    payload['config_value'] = feildsvalue.schedule_interval;
    //payload['GPT_modelllll']=feildsvalue.GPT_modelllll;
    async function CreateConfig(data) {
      const id = '245';
      const url = api_url.update_configurationBYId + id;
      const response = await put_api_request(url, data, headers);
      if (response.status == 201) {
        notification.success({
          message: 'Configuartion  Updated Successfully',
        });
      }
    }
    CreateConfig(payload);
  };

  return (
    <>
      <PageHeader ghost title="Work Flow" />
      <Main>
        {/* <Page>
          <Content>
            <FlowChartWithState initialValue={chartSimple} />
          </Content>

          <Sidebar>
            <div style={{ margin: '10px', padding: '10px', background: 'rgba(0,0,0,0.05)' }}>
              Drag and drop these items onto the canvas.
            </div>
            <SidebarItem type="start" id="kk" />
            <SidebarItem type="process-queue" />
            <SidebarItem type="process-point" />
            <SidebarItem type="end" />
          </Sidebar>
        </Page> */}
        {/* <Row gutter={30}>
          <div>
            <ul class="list-group">
              <li class="list-group-item googleBG">
                <i class="fa fa-google" aria-hidden="true"></i> Google
              </li>
              <li class="list-group-item ">
                <i class="fa fa-instagram" aria-hidden="true"></i> Instagram
              </li>
              <li class="list-group-item ">
                <i class="fa fa-facebook" aria-hidden="true"></i> Facebook
              </li>
              <li class="list-group-item ">
                <i class="fa fa-calendar" aria-hidden="true"></i> Google Calender
              </li>
              <li class="list-group-item ">
                <i class="fa fa-envelope" aria-hidden="true"></i> Gmail
              </li>
              
              <li class="list-group-item ">
                <i class="fa fa-slack" aria-hidden="true"></i> Slack
              </li>
            </ul>
          </div>
        </Row>

        <Row gutter={30}>
          <Col md={8}>
            <Select style={{ width: '100%' }}>
              <Option value={1}>
                <i class="fa fa-google" aria-hidden="true"></i> Google
              </Option>
              <Option value={2}>
                <i class="fa fa-instagram" aria-hidden="true"></i> Instagram
              </Option>
              <Option value={3}>
                <i class="fa fa-facebook" aria-hidden="true"></i> Facebook
              </Option>
              <Option value={4}>
                <i class="fa fa-calendar" aria-hidden="true"></i> Google Calender
              </Option>
              <Option value={5}>
                <i class="fa fa-envelope" aria-hidden="true"></i> Gmail
              </Option>
              <Option value={6}>
                <i class="fa fa-slack" aria-hidden="true"></i> Slack
              </Option>
            </Select>
          </Col>
        </Row> */}
        {/* <div class="workspace">
          {myTab2()}
          <h1>Scroll with Wheel or Trackpad</h1>
        </div>
         */}
        <TransformWrapper defaultScale={1} defaultPositionX={200} defaultPositionY={100}>
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              {/* <div className="tools">
                <button onClick={zoomIn}>+</button>
                <button onClick={zoomOut}>-</button>
                <button onClick={resetTransform}>x</button>
              </div> */}
              <TransformComponent>
                <img src="https://prc5.github.io/react-zoom-pan-pinch/12f95f128da3f0cb375c.jpeg" alt="test" />
                <div className="zoomDiv">Example text</div>
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>{' '}
      </Main>
    </>
  );
};

export default Linkedin;
