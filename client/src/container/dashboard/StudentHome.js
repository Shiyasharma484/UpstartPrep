import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Select, Space, notification, Input, Image, DatePicker } from 'antd';
import { useHistory } from 'react-router-dom';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import moment from 'moment';
import dayjs from 'dayjs';
import FeatherIcon from 'feather-icons-react';
import Cookies from 'js-cookie';
import authorizes from '../../../src/static/img/authorized.png';
import { headers } from '../../helpers/variables';
import { get_api_request, post_api_request, api_url, delete_api_request, put_api_request } from '../../helpers/Common';
import { imageRender } from '../../helpers/renderImage';
import PenIcon from '../../static/img/auth/pen-icon.png';
import arrow_icon from '../../static/img/auth/arrow-icon.png';
import calender_icon from '../../static/img/auth/calender-icon.png';
import verbal_leaf from '../../static/img/auth/verbal_leaf.png';
import quantitative from '../../static/img/auth/quantitative.png';
import examiner from '../../static/img/auth/examiner.png';
import student_clock from '../../static/img/auth/student-clock.png';
import imageUploadSave from '../../helpers/uploadImage';
import { TextArea } from '@progress/kendo-react-inputs';
import { CChart } from '@coreui/react-chartjs';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { decodetheid, encrypttheid } = require('../../helpers/encode-decode');
const { decrypt } = require('../../helpers/encryption-decryption');
var ModuleName = 'POSTS';
const { RangePicker } = DatePicker;
const StudentDashboard = () => {
  const history = useHistory(); //redirects in pages
  const [form] = Form.useForm();
  const [value, onChange] = useState(new Date());

  useEffect(() => {}, []);

  return (
    <>
      <Form name="sDash_validation-form" form={form} layout="vertical">
        <Main className="removeSpace-student">
          <Row gutter={30} className="custm-mob-size Student_home">
            <Col md={4} xs={24}></Col>
            <Col md={11} xs={24}>
              <div class="Profile-header">
                <div>{/* <p className="student-title">Dashboard</p> */}</div>
                <h1 className="s-home-title">Continue Practice</h1>
              </div>
              <div className="Profile-header buttonpractice">
                <Button className="practicebtn">START PRACTICE</Button>
              </div>
              <div className="progress-main">
                <div class="Profile-header">
                  <h1 className="s-home-title">My Progress</h1>
                </div>
                <Cards>
                  <div className="main-Div_q">
                    <p className="quizeText">Quize Attempts</p>
                    <a className="link">View All</a>
                  </div>
                </Cards>
              </div>
              <div>
                <div className="hederTets">
                  <h1 className="s-home-title">All Tests</h1>
                  <div>
                    <Select style={{ width: '100%' }}>
                      <Option value={1}>Paid Exams</Option>
                      <Option value={2}>All Exams</Option>
                      <Option value={3}>Free Exams</Option>
                    </Select>
                  </div>
                </div>

                <div className="examCard">
                  <Cards>
                    <div className="examDiv">
                      <p>No Exams</p>
                    </div>
                  </Cards>
                </div>
              </div>
            </Col>

            <Col md={7} xs={24} className="student-right-sidebar ">
              <div>
                <h1 className="s-home-title">Test Schedules</h1>
                <Calendar onChange={onChange} value={value} />
              </div>
              <div className="student-sidebar-inner">
                <h1>Upcoming Tests</h1>
                <div className="upcoming-main">
                  <div className="inner-main-first">
                    <p className="upcoming-date">7</p>
                    <div className="upcoming-year-main">
                      <p className="upcoming-year">June 2022</p> <p className="upcoming-time">24:00</p>
                    </div>
                  </div>
                  <hr />
                  <div className="inner-main-sec">
                    <p className="title-bio">Biology | Mock Test I</p>
                    <p className="des-bio">Professor Arnold Lorem</p>
                  </div>
                </div>

                <div className="upcoming-main">
                  <div className="inner-main-first">
                    <p className="upcoming-date" style={{ background: '#F0C19A' }}>
                      7
                    </p>
                    <div className="upcoming-year-main">
                      <p className="upcoming-year">July 2020</p> <p className="upcoming-time">24:00</p>
                    </div>
                  </div>
                  <hr />
                  <div className="inner-main-sec">
                    <p className="title-bio">History | Mock Test II</p>
                    <p className="des-bio">Professor Arnold Lorem</p>
                  </div>
                </div>

                <h1>My Test History</h1>
                <div className="upcoming-main">
                  <div className="inner-main-first">
                    <p className="upcoming-date" style={{ background: '#898585', padding: '4px 6px 4px 5px' }}>
                      17
                    </p>
                    <div className="upcoming-year-main">
                      <p className="upcoming-year">July 2020</p> <p className="upcoming-time">24:00</p>
                    </div>
                  </div>
                  <hr />
                  <div className="inner-main-sec">
                    <p className="title-bio">Biology | Mock Test II</p>
                    <p className="des-bio">Professor Arnold Lorem</p>
                  </div>
                </div>

                <div className="upcoming-main">
                  <div className="inner-main-first">
                    <p className="upcoming-date" style={{ background: '#F0C19A' }}>
                      7
                    </p>
                    <div className="upcoming-year-main">
                      <p className="upcoming-year">July 2020</p> <p className="upcoming-time">24:00</p>
                    </div>
                  </div>
                  <hr />
                  <div className="inner-main-sec">
                    <p className="title-bio">History | Mock Test II</p>
                    <p className="des-bio">Professor Arnold Lorem</p>
                  </div>
                </div>

                <div className="upcoming-main">
                  <div className="inner-main-first">
                    <p className="upcoming-date">7</p>
                    <div className="upcoming-year-main">
                      <p className="upcoming-year">June 2022</p> <p className="upcoming-time">24:00</p>
                    </div>
                  </div>
                  <hr />
                  <div className="inner-main-sec">
                    <p className="title-bio">Biology | Mock Test I</p>
                    <p className="des-bio">Professor Arnold Lorem</p>
                  </div>
                </div>

                <div className="upcoming-main">
                  <div className="inner-main-first">
                    <p className="upcoming-date">7</p>
                    <div className="upcoming-year-main">
                      <p className="upcoming-year">June 2022</p> <p className="upcoming-time">24:00</p>
                    </div>
                  </div>
                  <hr />
                  <div className="inner-main-sec">
                    <p className="title-bio">Biology | Mock Test I</p>
                    <p className="des-bio">Professor Arnold Lorem</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={2} xs={24}></Col>
          </Row>
        </Main>
      </Form>
    </>
  );
};

export default StudentDashboard;
