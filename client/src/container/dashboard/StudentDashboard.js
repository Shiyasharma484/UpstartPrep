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
import icon_1 from '../../static/img/icon_1.png';
import icon_2 from '../../static/img/icon_2.png';
import icon_3 from '../../static/img/icon_3.png';
import icon_4 from '../../static/img/icon_4.png';
import examiner from '../../static/img/auth/examiner.png';
import student_calender from '../../static/img/auth/calender-date.png';
import monogram from '../../static/img/wizards/monogram_logo.png';
import imageUploadSave from '../../helpers/uploadImage';
import { TextArea } from '@progress/kendo-react-inputs';
import { CChart } from '@coreui/react-chartjs';
import Calendar from 'react-calendar';
import vector from '../../static/img/icon/Vector.png';
import user from '../../static/img/icon/user.png';
import clock from '../../static/img/icon/clock.png';
import eye from '../../static/img/icon/eye.png';
import message from '../../static/img/icon/message.png';
import iconsss from '../../static/img/icon/iconsss.png';
import 'react-calendar/dist/Calendar.css';
import { createGlobalStyle } from 'styled-components';

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { decodetheid, encrypttheid } = require('../../helpers/encode-decode');
const { decrypt } = require('../../helpers/encryption-decryption');
var ModuleName = 'POSTS';
const { RangePicker } = DatePicker;
const StudentDashboard = () => {
  const history = useHistory(); //redirects in pages
  const [form] = Form.useForm();
  const [value, onChange] = useState(new Date());
  const [showOverPop, setshowOverPop] = useState(false);
  const [ScheduledsData, setScheduledsData] = useState([]);
  const [CurrentTime, setCurrentTime] = useState(moment(new Date()).format('HH:mm:ss'));
  const CurrentDate = moment(new Date()).format('YYYY-MM-DD');
  /** ADDED EXTRA TIME================== **/
  // let dt = new Date();
  //  dt.setMinutes(dt.getMinutes() + 30)

  const [Render, setRender] = useState(0);
  const enc_user_detail = Cookies.get('UserDetail');
  const response = decrypt(enc_user_detail);

  const user_id = response?.sessdata?.users_id;
  const decoded_UserID = decodetheid(user_id);

  const [ModalData, setModalData] = useState();
  const [ModalData1, setModalData1] = useState();
  const [StartButton, setStartButton] = useState(false);
  useEffect(() => {
    console.log(response);
    console.log(decoded_UserID);
    async function GetAllScheduleByUserID() {
      const url1 = api_url.get_allschedules_byuserID + decoded_UserID;
      const response = await get_api_request(url1, headers);
      console.log(response);
      // const url = api_url.get_schedules_learn;
      // const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const all_schedules = response?.data?.data;
        //  console.log(all_schedules);
        all_schedules?.map((item, i) => {
          const n_date = item.start_time ? item.start_time.split(':') : '';
          var date = new Date(2022, 4, 19, Number(n_date[0]), Number(n_date[1]));
          var grace_period_to_join = item?.grace_period_to_join ? item?.grace_period_to_join : 15;
          date.setMinutes(date.getMinutes() + grace_period_to_join);
          var formated_time = moment(date).format('HH:mm:ss');
          all_schedules[i].time_to_join = formated_time;
        });
        console.log(all_schedules);

        setScheduledsData(all_schedules);
      } else {
        console.log('error');
        window.location.reload();
      }
    }
    GetAllScheduleByUserID();
  }, []);
  setTimeout(() => {
    setCurrentTime(moment(new Date()).format('HH:mm:ss'));
    setRender(Render + 1);
  }, 30000);

  useEffect(() => {
    console.log(CurrentTime);
    console.log(CurrentDate);
  }, [Render]);

  const SortBy = e => {
    if (e == 'Date') {
      console.log(e);
    } else if (e == 'Name') {
      console.log(e);
    }
  };
  const handleAction = (event_id, type, scheduleID) => {
    const EventID = encrypttheid(event_id);
    const ScheduleID = encrypttheid(scheduleID);
    if (type == 'EXAM') {
      history.push(`/exam/${EventID + '+' + ScheduleID}`);
      window.location.reload();
      //setshowOverPop(true);
    } else if (type == 'PRACTICE SETS') {
      history.push(`/practice-sets/${EventID + '+' + ScheduleID}`);
      window.location.reload();
      //setshowOverPop(true);
    } else if (type == 'QUIZZES') {
      //history.push(`/quiz/${EventID + '+' + ScheduleID}`);
      history.push(`/quiz/${EventID + '+' + ScheduleID}`);
      window.location.reload();
      //setshowOverPop();
      //overview-quiz
    }
  };
  const handleOvervieModal = data => {
    var id = data?.event_id;
    if (data?.event_type_name == 'EXAM') {
      const url = api_url.get_exam_byId + id;
      GetDetailsByExamID(url);
    } else if (data?.event_type_name == 'QUIZZES') {
      const url = api_url.getquiz_by_id + id;
      GetDetailsByQuizID(url);
    } else if (data?.event_type_name == 'PRACTICE SETS') {
      const url = api_url.get_practice_id + id;
      GetDetailsByPracticeID(url);
    }

    async function GetDetailsByExamID(url) {
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response?.status == 200) {
        var exam_data = response?.data?.data?.[0];
        exam_data.event_type_name = data?.event_type_name;
        exam_data.start_time = data?.start_time;
        exam_data.start_date = data?.start_date;
        exam_data.event_id = data?.event_id;
        exam_data.event_type_name = data?.event_type_name;
        exam_data.schedule_id = data?.schedule_id;
        exam_data.negativMarks = exam_data?.section?.[0]?.negative_marks
          ? exam_data?.section?.[0]?.negative_marks
          : '0';
        exam_data.pass_percentage = exam_data?.section?.[0]?.pass_percentage;

        console.log(exam_data);
        setModalData(exam_data);
      } else {
        setModalData(data);
      }
    }
    async function GetDetailsByPracticeID(url) {
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response?.status == 200) {
        var exam_data = response?.data?.responsedata?.[0];
        var meta_data = response?.data?.meta;
        exam_data.event_type_name = data?.event_type_name;
        exam_data.start_time = data?.start_time;
        exam_data.start_date = data?.start_date;
        exam_data.event_id = data?.event_id;
        exam_data.event_type_name = data?.event_type_name;
        exam_data.schedule_id = data?.schedule_id;
        exam_data.negativMarks = meta_data?.negativMarks ? meta_data?.negativMarks : '0';
        exam_data.pass_percentage = meta_data?.pass_percentage ? meta_data?.pass_percentage : '0';
        console.log(exam_data);
        setModalData(exam_data);
      } else {
        setModalData(data);
      }
    }
    async function GetDetailsByQuizID(url) {
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response?.status == 200) {
        var exam_data = response?.data?.data?.[0];
        var meta_data = response?.data?.meta?.settings;
        exam_data.event_type_name = data?.event_type_name;
        exam_data.start_time = data?.start_time;
        exam_data.start_date = data?.start_date;
        exam_data.event_id = data?.event_id;
        exam_data.event_type_name = data?.event_type_name;
        exam_data.schedule_id = data?.schedule_id;
        exam_data.negativMarks = meta_data?.negativMarks ? meta_data?.negativMarks : '0';
        exam_data.pass_percentage = meta_data?.pass_percentage;
        console.log(exam_data);
        setModalData(exam_data);
      } else {
        setModalData(data);
      }
    }
    //   console.log(data);

    //  setModalData(data);
    setshowOverPop(true);
  };
  return (
    <>
      <Form name="sDash_validation-form" form={form} layout="vertical">
        <Main className="removeSpace-student">
          <Row gutter={40} className="custm-mob-size">
            <Col md={16} xs={24} className="pad-5">
              <Row gutter={40}>
                <Col md={24} xs={24}>
                  <Row>
                    <Col md={24} xs={24}>
                      <div className="cons">
                        <div className="">
                          <h2>All Test | 6 in Total</h2>
                        </div>
                        <div className="cons1">
                          <ul>
                            <li>
                              <img src={icon_1} />
                            </li>
                            <li>
                              <img src={icon_2} />
                            </li>
                            <li>
                              <img src={icon_3} />
                            </li>
                            <li>
                              <img src={icon_4} />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="drop_by">
                        <select id="#" className="filter">
                          <option value="volvo">Filter by</option>
                          <option value="a">A</option>
                          <option value="b">B</option>
                          <option value="c">C</option>
                        </select>
                      </div>
                    </Col>
                  </Row>
                  {/* <div class="Profile-header">
                    <div
                    // data-aos="fade-down"
                    // data-aos-offset="10"
                    // data-aos-delay="50"
                    // data-aos-duration="500"
                    // data-aos-easing="ease-in-out"
                    // data-aos-mirror="true"
                    // data-aos-once="false"
                    // data-aos-anchor-placement="top-center"
                    >
                      <p className="student-title">Dashboard</p>
                    </div>
                  </div> */}
                </Col>
              </Row>

              {/* <Row>
                <Col md={8} xs={24}>
                  <div className="student-dash">
                    <img src={PenIcon} />
                    <div className="student-dash-inner">
                      <h1>14+</h1>
                      <p>Tests Taken</p>
                    </div>
                  </div>
                </Col>
                <Col md={8} xs={24}>
                  <div className="student-dash">
                    <img src={arrow_icon} />
                    <div className="student-dash-inner">
                      <h1>21</h1>
                      <p>Overall Rank</p> <span>(Previous Test)</span>
                    </div>
                  </div>
                </Col>
                <Col md={8} xs={24}>
                  <div className="student-dash">
                    <img src={calender_icon} />
                    <div className="student-dash-inner">
                      <h1>2nd Aug 2022</h1>
                      <p>Nearest Exam</p>
                    </div>
                  </div>
                </Col>
              </Row> */}

              <Row className="latest-courses-main">
                <Col md={24} xs={24}>
                  <div className="latest-courses">
                    {/* <h1>Latest Video Courses</h1> */}

                    {/* <div>
                      Sort By
                      <select
                        onChange={e => {
                          SortBy(e.target?.value);
                        }}
                      >
                        <option value="Select">Select</option>
                        <option value="Date">Date</option>
                        <option value="Name">Name</option>
                      </select>
                    </div> */}
                  </div>
                  {/* <div className="category-inner">
                    {ScheduledsData?.map((item, index) => (
                      <div className="category-box">
                        <p>
                          {item.schedule_type}
                          <br />
                          <span>{item.category_name}</span>
                        </p>
                        <div style={{ marginTop: '2rem' }}> */}
                  {/* <Button className="pass-link" onClick={() => handleAction(item.id)}>
                            Explore
                          </Button> */}
                  {/* </div>
                      </div>
                    ))}
                    ,{console.log(ScheduledsData)}
                  </div>
                </Col> */}

                  <div className="main-courses-video">
                    {ScheduledsData?.map((item, index) =>
                      CurrentDate > moment(item?.start_date).format('YYYY-MM-DD') ? (
                        //&& CurrentTime > item?.start_time ?
                        ''
                      ) : item?.student_id == null ? (
                        <>
                          {/* <div className="courses-video">
                            <div className="courses-video-inner">
                              <p className="title">{item?.event_type_name}</p>
                              <p>
                                <b>
                                  {item?.EXAM_TITLE != null
                                    ? item?.EXAM_TITLE
                                    : item?.PRACTICE_SETS_TITLE != null
                                    ? item?.PRACTICE_SETS_TITLE
                                    : item?.QUIZZES_TITLE != null
                                    ? item?.QUIZZES_TITLE
                                    : ''}
                                </b>
                              </p>
                              <p>
                                <img src={student_calender} />
                                <b> {moment(item?.start_date).format('D MMMM YYYY')}</b>
                              </p>
                              <p>
                                <img src={student_clock} /> {item.start_time}
                              </p>
                              {CurrentDate == moment(item?.start_date).format('YYYY-MM-DD') &&
                              item.time_to_join >= CurrentTime &&
                              item.start_time <= CurrentTime ? (
                                <Button
                                  className="schedule"
                                  //onClick={() => handleAction(item?.event_id, item?.event_type_name, item?.schedule_id)}
                                  onClick={() => {
                                    handleOvervieModal(item);
                                  }}
                                >
                                  Start Now
                                </Button>
                              ) : (
                                <Button className="schedule" disabled>
                                  {item.time_to_join < CurrentTime ? 'Expired' : 'Upcoming'}
                                </Button>
                              )}
                            </div>
                          </div> */}
                          <Row className="progressbar-main">
                            <Col md={24} className="testCard1">
                              <Cards>
                                <div className="testCard1Heading-title">
                                  <h1 className="title">
                                    {item?.EXAM_TITLE != null
                                      ? item?.EXAM_TITLE
                                      : item?.PRACTICE_SETS_TITLE != null
                                      ? item?.PRACTICE_SETS_TITLE
                                      : item?.QUIZZES_TITLE != null
                                      ? item?.QUIZZES_TITLE
                                      : ''}
                                  </h1>
                                  {item?.free == '0' ? <span>Free</span> : <span className="protext">Pro</span>}
                                </div>

                                <div className="testinnerCard_div">
                                  <FeatherIcon icon="calendar" />
                                  <b>
                                    {' '}
                                    {moment(item?.start_date).format('D MMMM ')},{item.start_time}
                                  </b>
                                  <img src={vector} />
                                  <FeatherIcon icon="calendar" />
                                  <b>
                                    {' '}
                                    {moment(item?.end_date).format('D MMMM ')},{item.end_time}
                                  </b>
                                </div>
                                <div className="testinnerCard_div cardtest2">
                                  <div style={{ width: '48%' }}>
                                    <img src={clock} />
                                    <span>{item.grace_period_to_join} min</span>
                                  </div>

                                  <div style={{ width: '52%', marginLeft: '35px' }}>
                                    <img src={message} />
                                    <span>25 Questions</span>
                                  </div>
                                </div>
                                <div className="Enrolleddiv">
                                  <img src={user} />
                                  <span>{item?.schedule_to_individual?.length}</span>
                                </div>
                                {CurrentDate == moment(item?.start_date).format('YYYY-MM-DD') &&
                                item.time_to_join >= CurrentTime &&
                                item.start_time <= CurrentTime ? (
                                  <Button
                                    className="schedule"
                                    style={{ float: 'left' }}
                                    //onClick={() => handleAction(item?.event_id, item?.event_type_name, item?.schedule_id)}
                                    onClick={() => {
                                      handleOvervieModal(item);
                                    }}
                                  >
                                    Start Now
                                  </Button>
                                ) : (
                                  <Button className="schedule" disabled style={{ float: 'left' }}>
                                    {item.time_to_join < CurrentTime ? 'Expired' : 'Upcoming'}
                                  </Button>
                                )}
                              </Cards>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        ''
                      ),
                    )}
                  </div>
                </Col>
              </Row>

              {/* <Row className="assigned-main">
                <Col md={24} xs={24}>
                  <div className="assigned-inner">
                    <h1>
                      Assigned Task <span style={{ color: '#6F0FBD' }}>(10)</span>
                    </h1>
                    <p className="assigned-miscall">
                      Missed <span style={{ color: '#C23B35' }}>(3)</span>
                    </p>
                    <p className="verbal">
                      <img src={verbal_leaf} /> Verbal Reasoning
                    </p>
                    <h2>Explain the theory of photosynthessis.</h2>
                    <p className="assigned-des">Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum</p>
                    <p className="quantitative">
                      <img src={quantitative} /> Quantitative Reas.
                    </p>
                    <h2 style={{ color: '#D31245' }}>Explain American Revolution.</h2>
                    <p className="assigned-des">Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum</p>
                  </div>
                </Col>
              </Row> */}

              {/* <Row className="nearest-main">
                <Col md={24} xs={24}>
                  <div className="nearest-innerMain">
                    <h1>Nearest Mock Test</h1>
                    <div className="nearest-inner">
                      <div className="nearest-inner-first">
                        <p className="nearest-date">Date</p>
                        <p className="nearest-month">19, Oct</p>
                        <p className="nearest-year">2019</p>
                      </div>

                      <div className="nearest-inner-sec">
                        <p className="nearest-date-sec">Start Time</p>
                        <div className="nearest-month-sec">
                          <p className="nearest-month-sec-time">14:00</p>
                          <div class="sec-clock">
                            <img src={student_clock} /> <p class="half-mint-sec">30 Minutes</p>
                          </div>
                        </div>
                        <p className="nearest-year-sec">25 Questions</p>
                      </div>

                      <div className="nearest-inner-third">
                        <p className="nearest-date-third">Subject</p>
                        <p className="verbal">
                          <img src={verbal_leaf} /> Verbal Reasoning
                        </p>
                      </div>

                      <div className="nearest-inner-for">
                        <p className="nearest-date-for">Examiner</p>
                        <div className="nearest-img-for">
                          <img src={examiner} />
                          <div>
                            <p className="nearest-name-for">Elizabeth Cruz</p>
                            <p className="nearest-desig-for">Professor</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row> */}

              {/* <Row className="progressbar-main">
                <Col md={24} xs={24}>
                  <div className="progressbarFlex">
                    <div className="progressbarMain">
                      <div className="progressbarInner">
                        <h1 className="progressbarTitle">Areas of interest</h1>
                        <span className="progressbarkey">Key hobbies - </span>
                        <span className="progressbarPain">painting, reading</span>
                      </div>

                      <div class="skillBar">
                        <h4>Sport</h4>
                        <div class="skillBarContainer">
                          <div class="skillBarValue value-25"></div>
                        </div>
                      </div>

                      <div class="skillBar">
                        <h4>Reading</h4>
                        <div class="skillBarContainer">
                          <div class="skillBarValue value-75"></div>
                        </div>
                      </div>

                      <div class="skillBar">
                        <h4>Hi-tech</h4>
                        <div class="skillBarContainer">
                          <div class="skillBarValue value-35"></div>
                        </div>
                      </div>

                      <div class="skillBar">
                        <h4>Music/Art</h4>
                        <div class="skillBarContainer">
                          <div class="skillBarValue value-95"></div>
                        </div>
                      </div>

                      <div class="skillBar">
                        <h4>Science</h4>
                        <div class="skillBarContainer">
                          <div class="skillBarValue value-55"></div>
                        </div>
                      </div>
                    </div>

                    <div className="progressbarMain">
                      <h1 className="progressbarTitle">Traits of character</h1>
                      <CChart
                        type="polarArea"
                        data={{
                          labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
                          datasets: [
                            {
                              data: [11, 16, 7, 3, 14],
                              backgroundColor: ['#FF6384', '#60a77f', '#FFCE56', '#E7E9ED', '#36A2EB'],
                            },
                          ],
                        }}
                      />
                    </div>
                  </div>
                </Col>
              </Row> */}

              {/* <Row className="progressbar-main">
                <Col md={24} xs={24}>
                  <CChart
                    type="line"
                    data={{
                      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                      datasets: [
                        {
                          label: 'My First dataset',
                          backgroundColor: 'rgba(220, 220, 220, 0.2)',
                          borderColor: '#272efb',
                          pointBackgroundColor: '#272efb',
                          pointBorderColor: '#fff',
                          data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                        },
                        {
                          label: 'My Second dataset',
                          backgroundColor: 'rgba(151, 187, 205, 0.2)',
                          borderColor: '#60a77f',
                          pointBackgroundColor: '#60a77f',
                          pointBorderColor: '#fff',
                          data: [50, 12, 28, 29, 7, 25, 12, 70, 60],
                        },
                      ],
                    }}
                  />
                </Col>
              </Row> */}
              {/* <Row className="progressbar-main">
                <Col md={24} xs={24} className="testMain_div">
                  <div>
                    <h3>All Tests</h3>
                  </div>
                  <div className="testinner_div">
                    <FeatherIcon icon="filter" /> <span style={{ fontWeight: '400' }}>Filter By</span>
                    <DatePicker defaultValue={moment('2023:05:01')}></DatePicker>
                    <span>to</span>
                    <DatePicker defaultValue={moment('2023:05:02')}></DatePicker>
                  </div>
                </Col>
              </Row> */}
              {/* <Row className="progressbar-main">
                <Col md={12} className="testCard1">
                  <Cards>
                    <h1>Mock Test I</h1>
                    <div className="testinnerCard_div">
                      <DatePicker defaultValue={moment('2023:05:01')}></DatePicker>
                      <img src={vector} />
                      <DatePicker defaultValue={moment('2023:05:02')}></DatePicker>
                    </div>
                    <div className="testinnerCard_div cardtest2">
                      <div style={{ width: '50%' }}>
                        <img src={clock} />
                        <span>25 minutes</span>
                      </div>

                      <div style={{ width: '43%' }}>
                        <img src={message} />
                        <span>25 Questions</span>
                      </div>
                    </div>
                    <div className="Enrolleddiv">
                      <img src={user} />
                      <span>156 + Enrolled</span>
                    </div>
                    <a className="mock-btn">Start Now</a>
                  </Cards>
                </Col>
                <Col md={12} className="testCard1">
                  <Cards>
                    <h1>Mock Test II</h1>
                    <div className="testinnerCard_div">
                      <DatePicker defaultValue={moment('2023:05:01')}></DatePicker>
                      <img src={vector} />
                      <DatePicker defaultValue={moment('2023:05:02')}></DatePicker>
                    </div>
                    <div className="testinnerCard_div cardtest2">
                      <div style={{ width: '50%' }}>
                        <img src={clock} />
                        <span>25 minutes</span>
                      </div>

                      <div style={{ width: '50%' }}>
                        <img src={message} />
                        <span>25 Questions</span>
                      </div>
                    </div>
                    <div className="Enrolleddiv">
                      <img src={user} />
                      <span>156 + Enrolled</span>
                    </div>
                    <a className="mock-btn">Upgrade</a>
                  </Cards>
                </Col>
                <Col md={12} className="testCard1">
                  <Cards>
                    <h1>Mock Test I</h1>
                    <div className="testinnerCard_div">
                      <DatePicker></DatePicker>
                      <img src={vector} />
                      <DatePicker></DatePicker>
                    </div>
                    <div className="testinnerCard_div cardtest2">
                      <div style={{ width: '50%' }}>
                        <img src={clock} />
                        <span>25 minutes</span>
                      </div>

                      <div style={{ width: '50%' }}>
                        <img src={message} />
                        <span>25 Questions</span>
                      </div>
                    </div>
                    <div className="Enrolleddiv">
                      <img src={user} />
                      <span>156 + Enrolled</span>
                    </div>
                  </Cards>
                </Col>
                <Col md={12} className="testCard1">
                  <Cards>
                    <h1>Mock Test IV</h1>
                    <div className="testinnerCard_div">
                      <DatePicker></DatePicker>
                      <img src={vector} />
                      <DatePicker></DatePicker>
                    </div>
                    <div className="testinnerCard_div cardtest2">
                      <div style={{ width: '50%' }}>
                        <img src={clock} />
                        <span>25 minutes</span>
                      </div>

                      <div style={{ width: '50%' }}>
                        <img src={message} />
                        <span>25 Questions</span>
                      </div>
                    </div>
                    <div className="Enrolleddiv">
                      <img src={user} />
                      <span>156 + Enrolled</span>
                    </div>
                  </Cards>
                </Col>
              </Row> */}
              {/* <Row className="biotestMain">
                <Col md={24} xs={24}>
                  <Cards>
                    <div>
                      <h1>Biology Test 1</h1>
                      <span>Professor Richarson</span>
                    </div>
                  </Cards>
                </Col>
                <Col md={24}>
                  <div className="tymremain">
                    <img src={clock} />
                    <span>10 minutes remaining</span>
                  </div>
                </Col>
                <Col md={24} className="mainColQ">
                  <div className="mainqDiv">
                    <div className="inner-qdiv">1</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv">2</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv">3</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv">4</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv">5</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv">6</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv">7</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv">8</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv">9</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv">10</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv inner-grey">11</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv inner-grey">12</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv inner-grey">13</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv inner-grey">14</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv inner-grey">15</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv inner-grey">16</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv inner-grey">17</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv inner-grey">18</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv inner-grey">19</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv inner-grey">20</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv inner-grey">21</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv inner-grey">22</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv inner-grey">23</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv inner-grey">24</div>
                  </div>
                  <div className="mainqDiv">
                    <div className="inner-qdiv inner-grey">25</div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={17} style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                  <Row>
                    <Col md={6} className="QuestioniBTN" style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                      <div className="Q-inner">
                        <Button>Q10</Button>
                      </div>

                      <span> 10 out of 25</span>
                    </Col>
                    <Col md={18} className="qusetionp" style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                      <p>What is called as the power house of a cell?</p>
                      <img src={iconsss} style={{ width: '100%' }} />
                      <div>
                        <p className="Ans-type">
                          About Question Lorem Epsum About Question Lorem Epsum About Question Lorem Epsum About
                          Question Lorem Epsum
                        </p>
                        <p className="Ans-type">
                          About Question Lorem Epsum About Question Lorem Epsum About Question Lorem Epsum About
                          Question
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col md={7} className="quest_Btns" style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                  <div className="quest_Btns_pre_nxt">
                    <Button className="previousbtn">Previous</Button>
                    <Button className="nextbtn">Next</Button>
                  </div>
                  <div className="QusetionHeadings">
                    <h1>Choose the best option</h1>
                  </div>
                  <div className="QusetionHeadings-inner">
                    <img src={eye} />
                    <Button>A</Button>
                    <span>Mitochondria</span>
                  </div>
                  <div className="QusetionHeadings-innerW">
                    <img src={eye} />
                    <Button>B</Button>
                    <span>Golgi Complex</span>
                  </div>
                  <div className="QusetionHeadings-innerW">
                    <img src={eye} />
                    <Button>C</Button>
                    <span>Cytoplast</span>
                  </div>
                  <div className="QusetionHeadings-innerW">
                    <img src={eye} />
                    <Button>D</Button>
                    <span>Nucleous</span>
                  </div>
                  <div className="text-center">
                    <Button className="BackButton">Come Back Later</Button>
                  </div>
                </Col>
              </Row> */}
              {/* <Row className="biotestMain mt">
                <Col md={24} xs={24}>
                  <Cards>
                    <div>
                      <h1>Biology Test 1</h1>
                      <span>Professor Richarson</span>
                    </div>

                    <div>
                      <h1>You Scored 18 / 25</h1>
                    </div>

                    <div>
                      <span>
                        <img src={clock} /> Finished
                      </span>
                    </div>
                  </Cards>
                </Col>
              </Row> */}

              {/* <Row className="detail-pdf">
                <Col md={24}>
                  <div>
                    <h1>Detailed Report</h1>
                  </div>

                  <div>
                    <a className="download-pdf">Download Pdf</a>
                  </div>
                </Col>
              </Row> */}

              {/* <Row className="progressbar-main">
                <Col md={24} xs={24}>
                  <div className="progressbarFlex">
                    <div className="progressbarMain">
                      <div className="progressbarInner">
                        <h1 className="progressbarTitle">Areas of interest</h1>
                        <span className="progressbarkey">Key hobbies - </span>
                        <span className="progressbarPain">painting, reading</span>
                      </div>

                      <div class="skillBar">
                        <h4>Sport</h4>
                        <div class="skillBarContainer">
                          <div class="skillBarValue value-25"></div>
                        </div>
                      </div>

                      <div class="skillBar">
                        <h4>Reading</h4>
                        <div class="skillBarContainer">
                          <div class="skillBarValue value-75"></div>
                        </div>
                      </div>

                      <div class="skillBar">
                        <h4>Hi-tech</h4>
                        <div class="skillBarContainer">
                          <div class="skillBarValue value-35"></div>
                        </div>
                      </div>

                      <div class="skillBar">
                        <h4>Music/Art</h4>
                        <div class="skillBarContainer">
                          <div class="skillBarValue value-95"></div>
                        </div>
                      </div>

                      <div class="skillBar">
                        <h4>Science</h4>
                        <div class="skillBarContainer">
                          <div class="skillBarValue value-55"></div>
                        </div>
                      </div>
                    </div>

                    <div className="progressbarMain">
                      <h1 className="progressbarTitle">Traits of character</h1>
                      <CChart
                        type="polarArea"
                        data={{
                          labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
                          datasets: [
                            {
                              data: [11, 16, 7, 3, 14],
                              backgroundColor: ['#FF6384', '#60a77f', '#FFCE56', '#E7E9ED', '#36A2EB'],
                            },
                          ],
                        }}
                      />
                    </div>
                  </div>
                </Col>
              </Row> */}
            </Col>

            {/* <Col md={8} xs={24} className="student-right-sidebar pad-5">
              <div><Calendar onChange={onChange} value={value} selectMultiple={true} /></div>
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
            </Col> */}
            {showOverPop == true ? (
              <>
                <div className="modal-ExamOverwiew applyingSchool ">
                  <Row className="nearest-main" style={{ background: '#fff' }}>
                    <div className="crossIcon">
                      <a
                        onClick={() => {
                          setshowOverPop(false);
                          setStartButton(false);
                        }}
                      >
                        X
                      </a>
                    </div>
                    <Col md={24} xs={24}>
                      <div className="nearest-innerMain">
                        <div className="nearest-title">
                          <h1>
                            Title:{' '}
                            {/* {ModalData?.QUIZZES_TITLE
                              ? ModalData?.QUIZZES_TITLE
                              : ModalData?.EXAM_TITLE
                              ? ModalData?.EXAM_TITLE
                              : ModalData?.PRACTICE_SETS_TITLE
                              ? ModalData?.PRACTICE_SETS_TITLE
                              : ''} */}
                            {ModalData?.title ? (ModalData?.title).toUpperCase() : ''}
                          </h1>
                          <p>Type: {ModalData?.event_type_name}</p>
                        </div>
                        <div className="nearest-inner">
                          <div className="nearest-inner-first">
                            <p className="nearest-date">Date:</p>
                            <p className="nearest-month">
                              {ModalData?.start_date ? moment(ModalData?.start_date).format('DD-MM-YYYY') : ''}
                            </p>
                            {/* <p className="nearest-year">2019</p> */}
                          </div>

                          <div className="nearest-inner-sec">
                            <p className="nearest-date-sec">Start Time:</p>
                            <div className="nearest-month-sec">
                              <p className="nearest-month-sec-time">{ModalData?.start_time}</p>
                            </div>
                          </div>

                          {/* <div class="sec-clock"> */}
                          <div className="nearest-inner-sec">
                            {/* <div className="flexclock">
                              <img src={student_clock} /> <p class="half-mint-sec">30 Minutes</p>
                            </div> */}
                            <p className="nearest-date">Question:</p>
                            <p className="nearest-year-sec">{ModalData?.Total_questions}</p>
                          </div>

                          {/* <div className="nearest-inner-third"> */}
                          {/* <p className="nearest-date-third">Subject</p> */}
                          {/* <p className="verbal">
                              <img src={verbal_leaf} /> Verbal Reasoning
                            </p>
                          </div> */}

                          <div className="nearest-inner-for">
                            <div className="nearest-img-for">
                              <img src={examiner} />
                              <div>
                                <p className="nearest-date-for">Instructor</p>
                                <p className="nearest-name-for">Elizabeth Cruz</p>
                                <p className="nearest-desig-for">Professor</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>

                    <Col md={24}>
                      <div className="overquizSecondMain">
                        <table>
                          <tr>
                            {ModalData?.event_type_name == 'EXAM' ? <th>Section Name</th> : <th></th>}
                            <th>Question</th>
                            <th>Marks</th>
                          </tr>
                          {ModalData?.event_type_name == 'EXAM' ? (
                            <>
                              {ModalData?.section?.map((item, i) => (
                                <tr>
                                  <td>{item?.name}</td>
                                  <td>{item?.question}</td>
                                  <td>{item?.total_section_marks}</td>
                                </tr>
                              ))}
                            </>
                          ) : (
                            ''
                          )}

                          <tr className="borderTotal">
                            <th>Total</th>
                            <td>{ModalData?.Total_questions}</td>
                            <td>{ModalData?.total_marks}</td>
                          </tr>
                        </table>
                      </div>
                      <div className="negativemarks">Negative Marks: {ModalData?.negativMarks}</div>
                      <div className="negativemarks">Pass Percentage: {ModalData?.pass_percentage} </div>
                      {ModalData?.description ? (
                        <div className="terms&condition conditiondes">
                          <h1 className="terms-title">Description</h1>

                          <ul>
                            {/* <p>Before the Exam</p>
                          <li>
                            Check the exam timetable carefully. Make sure you know the time and locations of your exams.
                            Check whether you should go directly to an exam hall or a waiting room.
                          </li>
                          <li>
                            Bring your Student ID Booklet or University Library Card (i.e. 650****). You will not be
                            allowed into the exam hall without these.
                          </li>
                          <li>
                            Do not bring any unauthorised material (e.g. written notes, notes in dictionaries, paper,
                            and sticky tape eraser). Pencil cases and glasses cases must not be taken to your desks.
                            These will be checked and confiscated
                          </li>
                          <li>You are allowed to bring tissues and a drink (but not food) into the exam.</li> */}
                            {ModalData?.description?.replace(/<(.|\n)*?>/g, '')}
                          </ul>
                        </div>
                      ) : (
                        ''
                      )}
                      <div className="terms&condition">
                        <h1 className="terms-title">Terms & Conditions</h1>
                        <ul>
                          <p>Before the Exam</p>
                          <li>
                            Check the exam timetable carefully. Make sure you know the time and locations of your exams.
                            Check whether you should go directly to an exam hall or a waiting room.
                          </li>
                          <li>
                            Bring your Student ID Booklet or University Library Card (i.e. 650****). You will not be
                            allowed into the exam hall without these.
                          </li>
                          <li>
                            Do not bring any unauthorised material (e.g. written notes, notes in dictionaries, paper,
                            and sticky tape eraser). Pencil cases and glasses cases must not be taken to your desks.
                            These will be checked and confiscated
                          </li>
                          <li>You are allowed to bring tissues and a drink (but not food) into the exam.</li>
                        </ul>
                        <div className="agree-terms">
                          <label>
                            <input type="checkbox" onClick={() => setStartButton(!StartButton)} /> I agree Terms &
                            Conditons
                          </label>
                        </div>
                        {/* {StartButton == true ? ( */}
                        <div className="OverViewQuiz-btn">
                          <Button
                            disabled={StartButton == false}
                            onClick={() =>
                              handleAction(ModalData?.event_id, ModalData?.event_type_name, ModalData?.schedule_id)
                            }
                          >
                            Start
                          </Button>
                        </div>
                        {/* ) : (
                          ''
                        )} */}
                      </div>
                    </Col>
                    <div className="bg_s">
                      <Row>
                        <Col md={24} xs={24}>
                          <div className="content_r">
                            <div className="">
                              <svg className="a" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
                              </svg>
                              <span>ISEE</span>
                              <svg className="b" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                              </svg>
                            </div>
                            <div className="">
                              <span>Kharis Yeboah</span>
                              <svg className="c" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                              </svg>
                            </div>
                          </div>
                          <div className="Upper">
                            <div className="Level">
                              <h4>ISEE Upper Level One</h4>
                              <p>Eastern Standard Time</p>
                            </div>
                            <div className="oct">
                              <svg
                                className="cal"
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 448 512"
                              >
                                <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
                              </svg>
                              <span>Oct 21, 1:30pm</span>
                              <svg
                                className="arrow"
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 512 512"
                              >
                                <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
                              </svg>
                              <svg
                                className="cal"
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 448 512"
                              >
                                <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
                              </svg>
                              <span>Oct 21, 1:30pm</span>
                            </div>
                            <div className="oct">
                              <svg
                                className="watch"
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 512 512"
                              >
                                <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                              </svg>
                              <span>40 mins</span>
                            </div>
                            <div className="Level">
                              <div className="oct">
                                <svg
                                  className="paper"
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="1em"
                                  viewBox="0 0 512 512"
                                >
                                  <path d="M96 96c0-35.3 28.7-64 64-64H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H80c-44.2 0-80-35.8-80-80V128c0-17.7 14.3-32 32-32s32 14.3 32 32V400c0 8.8 7.2 16 16 16s16-7.2 16-16V96zm64 24v80c0 13.3 10.7 24 24 24H296c13.3 0 24-10.7 24-24V120c0-13.3-10.7-24-24-24H184c-13.3 0-24 10.7-24 24zm208-8c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H384c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H384c-8.8 0-16 7.2-16 16zM160 304c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16z" />
                                </svg>
                                <span>45 Questions</span>
                              </div>
                              <div className="btn_b">
                                <svg
                                  className="lock"
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="1em"
                                  viewBox="0 0 448 512"
                                >
                                  <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                                </svg>
                                <span>$25.99</span>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="bg_k">
                      <Row>
                        <Col md={24} xs={24}>
                          <div className="content_bb">
                            <div className="">
                              <svg
                                className="sec"
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 512 512"
                              >
                                <path d="M64 256V160H224v96H64zm0 64H224v96H64V320zm224 96V320H448v96H288zM448 256H288V160H448v96zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
                              </svg>
                              <span>Sections</span>
                            </div>
                          </div>

                          <div className="Verbal">
                            <div className="Verbal_1">
                              <h3>1</h3>
                              <div className="Verbal_2">
                                <h2>Verbal Reasoning</h2>
                                <span>35 minutes</span>
                              </div>
                            </div>
                            <div className="Verbal_1">
                              <h3>3</h3>
                              <div className="Verbal_2">
                                <h2>Reading Comprehension</h2>
                                <span>35 minutes</span>
                              </div>
                            </div>
                          </div>
                          <div className="Verbal">
                            <div className="Verbal_1">
                              <h3>2</h3>
                              <div className="Verbal_2">
                                <h2>Quantitative Reasoning</h2>
                                <span>35 minutes</span>
                              </div>
                            </div>
                            <div className="Verbal_1">
                              <h3>4</h3>
                              <div className="Verbal_2">
                                <h2>Mathematics Achievmeent</h2>
                                <span>35 minutes</span>
                              </div>
                            </div>
                          </div>
                          <div className="content_bb mar_jn">
                            <div className="">
                              <svg
                                className="sec"
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 512 512"
                              >
                                <path d="M64 256V160H224v96H64zm0 64H224v96H64V320zm224 96V320H448v96H288zM448 256H288V160H448v96zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
                              </svg>
                              <span>Sections</span>
                            </div>
                          </div>
                          <div className="content_bb mar_jn">
                            <div className="">
                              <svg
                                className="sac"
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 512 512"
                              >
                                <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                              </svg>
                              <span>Standard Instructions </span>
                            </div>
                          </div>
                          <ul className="ul_the">
                            <li>
                              The clock will be set on the server. The countdown timer in the top right corner of the
                              screen will display the remaining time available for you to complete the test. When the
                              timer reaches zero, the test will end by itself.
                            </li>
                            <li>
                              Click on the question number in the Question Palette at the right of your screen to go to
                              that numbered question directly. Note that using this option does NOT save your answer to
                              the current question.
                            </li>
                            <li>
                              Click on Save & Next to save your answer for the current question and then go to the next
                              question.
                            </li>
                            <li>
                              The Question Palette displayed on the right side of the screen will show the status of
                              each question.
                            </li>
                          </ul>
                          <div className="lgo">
                            <img src={monogram}></img>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Row>
                </div>
              </>
            ) : (
              ''
            )}
          </Row>
        </Main>
      </Form>
    </>
  );
};

export default StudentDashboard;
