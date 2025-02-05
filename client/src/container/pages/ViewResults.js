import React, { useEffect, useState } from 'react';
import { Row, Col, Form, notification, Input, Button, Select, DatePicker } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { AddUser } from './style';
import Cookies from 'js-cookie';
import { Main } from '../styled';
import dayjs from 'dayjs';
import 'moment/locale/zh-cn';
import { Cards } from '../../components/cards/frame/cards-frame';
import { get_api_request, post_api_request, put_api_request, api_url } from '../../helpers/Common';
import { headers } from '../../helpers/variables';
import TextArea from 'antd/lib/input/TextArea';
import FeatherIcon from 'feather-icons-react';
import upstart from '../../static/img/auth/upstart.png';
import hero_BG from '../../static/img/auth/home-hero-img.png';
import features from '../../static/img/auth/48x48.png';
import videoLessons from '../../static/img/video-lessons.png';
import QuestionBank from '../../static/img/Question-bank.png';
import PrivateTutoring from '../../static/img/Private-Tutoring.png';
import MockTests from '../../static/img/Mock-Tests.png';
import { CChart } from '@coreui/react-chartjs';
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const ActivePlan = () => {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [CategoryData, setCategoryData] = useState({});
  const [PlansData, setPlansData] = useState([]);
  const [featurearraydata, setfeaturearraydata] = useState([]);
  const [ConfigData, setConfigData] = useState([]);
  const [Message, setMessage] = useState();
  console.log(CategoryData?.plan_name);
  const [showlogo, setshowlogo] = useState();
  const [CategoryID, setCategoryID] = useState();
  useEffect(() => {
    const enc_user_detail = Cookies.get('UserDetail');
    async function GetAllUsers() {
      const url = api_url.get_category;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const usersdata = response?.data?.responsedata;
        const dataArray = usersdata.map(item => {
          return { id: item.id, name: item.category_name };
        });
        // setCategoryID(dataArray?.[0]?.id);
        getCategoryId(dataArray?.[0]?.id);
        setData(dataArray);
      } else {
        console.log('error');
      }
    }
    GetAllUsers();

    async function GetConfiguration() {
      const url = api_url.get_all_configurations;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const configdata = response?.data?.responsedata?.configurations[0].message;
        setMessage(configdata);
        const configData = response?.data?.responsedata?.configurations[0];
        setConfigData(configData);
        const show_logo = response?.data?.responsedata?.configurations[0]?.site_logo;
        setshowlogo(show_logo);
      } else {
        console.log('error');
      }
    }
    GetConfiguration();

    async function Getallmodules(data) {
      const url = api_url.getall_modules;
      const response = await get_api_request(url, data, headers);
      console.log(response);
      if (response.status == 200) {
        const Moduledata = response?.data?.responsedata?.modules;
        const getmodules = Moduledata.map(items => {
          console.log(items);
          if (items.name == 'PLANS') {
            const parentdata = items?.parent_id;
            console.log(parentdata);
            async function getentitybyparentid() {
              const url = '/entity/parent/' + parentdata;
              const response = await get_api_request(url, data, headers);
              const questiontypedata = response?.data?.responsedata;
              //setData(questiontypedata);
              // const DataArray = questiontypedata.map(item => {
              //   return { id: item.id, name: item.name };
              // });
              setfeaturearraydata(questiontypedata);
            }
            getentitybyparentid();
          }
        });
      } else {
        console.log('error');
      }
    }
    Getallmodules();
  }, []);
  async function GetUserPlansDataByID(id) {
    console.log(id);
    const url = api_url.get_plans;
    const response = await get_api_request(url, headers);
    console.log(response);
    if (response.status == 200) {
      const categorydata = response?.data?.responsedata;
      const categoryIddata = response?.data?.responsedata;
      var changed_array = categoryIddata?.map(item => {
        var featureddata = [];
        if (item?.feature) {
          var feature_array = (item?.feature).match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
          featureddata = feature_array?.map(item => {
            return Number(item);
          });
        }

        item.feature = featureddata;
        return item;
      });
      setCategoryData(categorydata);
      setPlansData(changed_array);
      console.log(categorydata);
    } else {
      console.log('error');
    }
  }
  const getCategoryId = e => {
    console.log(e);
    GetUserPlansDataByID(e);
    setCategoryID(e);
  };
  const GoCheckout = e => {
    console.log(e);
    var id = encrypttheid(e);
    history.push(`../../checkout/${id}`);
  };
  const HandleSubmitForm = (feildsvalue, e) => {
    var payload = {};
    payload['fullname'] = feildsvalue.fullname;
    payload['email'] = feildsvalue.email;
    payload['phone'] = feildsvalue.phone;
    payload['subject'] = feildsvalue.subject;
    async function CreateSection(data) {
      const url = `/contactus/`;
      const response = await post_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.message,
        });
        setTimeout(() => {
          //window.location.reload();
        }, 1000);
        // history.push('../users/customer-list');
      } else
        notification.error({
          message: 'Server Error',
        });
    }
    CreateSection(payload);
  };
  const enc_user_detail = Cookies.get('UserDetail');
  return (
    <>
      <Main className="viewResult">
        <Row gutter={15} style={{ background: '#fff' }}>
          <Col xs={24}>
            <div className="header-main-line">
              <div className="header-main-size">
                <div className="header-main ">
                  <div className="header-main-left">
                    <NavLink className="pass-link" to="/">
                      <img src={domainpath + showlogo} />
                    </NavLink>
                    <a
                      href="javascript:void(0);"
                      class="icon"
                      onClick={() => {
                        setIsActive1(current => !current);
                      }}
                    >
                      <i class="fa fa-bars"></i>
                    </a>
                  </div>

                  <div className={isActive1 ? 'topmenudesignblock' : 'topmenudesign'}>
                    <div className="header-main-right topnav header-main-right topnav" id="myTopnav">
                      <div className="header-nav">
                        <div className="main-menu">
                          <NavLink className="pass-links slide-animate" to="/">
                            <div
                              className="flex-iconMenu"
                              onClick={() => {
                                setIsActive(current => !current);
                              }}
                            >
                              Home <FeatherIcon icon="chevron-down" />
                            </div>
                          </NavLink>

                          <div className="main-sub-menu">
                            <div className="sub-menu">
                              <a className="pass-links" href="#explore">
                                Explore
                              </a>
                              <NavLink className="pass-links" to="/consultation">
                                Learn & Practice
                              </NavLink>
                              <NavLink className="pass-links" to="/login">
                                Quizzes
                              </NavLink>
                              <NavLink className="pass-links" to="/pricing">
                                Pricing
                              </NavLink>
                              <NavLink className="pass-links" to="/exam">
                                Exam
                              </NavLink>
                            </div>
                          </div>
                        </div>

                        <NavLink className="pass-links slide-animate" to="/howitwork">
                          How it work
                        </NavLink>

                        <NavLink className="pass-links slide-animate" to="/findInstructor">
                          Find instructors
                        </NavLink>

                        <div className="main-menu">
                          <NavLink className="pass-links slide-animate" to="/">
                            <div className="flex-iconMenu">
                              Pages <FeatherIcon icon="chevron-down" />
                            </div>
                          </NavLink>

                          <div className="main-sub-menu">
                            <div className="sub-menu">
                              <NavLink className="pass-links" to="/instructor-detail">
                                Instructor detail
                              </NavLink>
                              <NavLink className="pass-links" to="/student-detail">
                                Student detail
                              </NavLink>
                            </div>
                          </div>
                        </div>

                        <NavLink className={isActive ? 'homeMenus' : 'pass-links slide-animate'} to="/contact-us">
                          Contact Us
                        </NavLink>
                        <NavLink className="pass-links" to="analysis">
                          Analysis
                        </NavLink>
                        <NavLink className="pass-links" to="/ViewResults">
                          ViewResults
                        </NavLink>
                      </div>
                      {enc_user_detail ? (
                        <NavLink className="pass-link" to="/dashboard">
                          Dashboard
                        </NavLink>
                      ) : (
                        <NavLink className="pass-link" to="/login">
                          Get started
                        </NavLink>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* <Row gutter={15} style={{ background: '#fff' }}>
          <Col md={24}> */}
        {/* <div className="MainDivViewResult">
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="10"
            data-aos-duration="3000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            className="MainDivViewResult-first"
          >
            <p
              data-aos="fade-down"
              data-aos-offset="300"
              data-aos-delay="20"
              data-aos-duration="2000"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="true"
              data-aos-anchor-placement="top-center"
            >
              Incorrect
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="10"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            className="MainDivViewResult-second"
          >
            <p
              data-aos="fade-down"
              data-aos-offset="50"
              data-aos-delay="20"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="true"
              data-aos-anchor-placement="top-center"
            >
              Correct
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-offset="10"
            data-aos-delay="10"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            className="MainDivViewResult-third"
          >
            <p
            // data-aos="fade-down"
            // data-aos-offset="100"
            // data-aos-delay="10"
            // data-aos-duration="100"
            // data-aos-easing="ease-in-out"
            // data-aos-mirror="true"
            // data-aos-once="true"
            // data-aos-anchor-placement="top-center"
            >
              Skipped
            </p>
          </div>
        </div> */}
        {/* </Col>
        </Row> */}
        <div className="MainResult">
          <div className="firstRowResult">
            <h1>Quantitative Section #1 Summary:</h1>
            <Button onClick={() => history.push(`/exam`)}>
              View Your Answers
              <FeatherIcon icon="chevron-right" />
            </Button>
          </div>
        </div>
        <div>
          <h2>How You did, By Difficulty</h2>
        </div>
        <Row>
          <Col md={8}>
            <h1 className="pieTitle">Easy</h1>
            <CChart
              className="piechartdesign"
              type="doughnut"
              data={{
                labels: ['Incorrect', 'Correct', 'Unanswered'],
                datasets: [
                  {
                    backgroundColor: ['red', 'green', '#efab58'],
                    data: [50, 30, 20],
                  },
                ],
              }}
            />
          </Col>
          <Col md={8}>
            <h1 className="pieTitle">Medium</h1>
            <CChart
              className="piechartdesign"
              type="polarArea"
              data={{
                labels: ['Incorrect', 'Correct', 'Unanswered'],
                datasets: [
                  {
                    data: [30, 50, 20],
                    backgroundColor: ['red', 'green', '#efab58'],
                  },
                ],
              }}
            />
          </Col>
          <Col md={8}>
            <h1 className="pieTitle">Hard</h1>
            <CChart
              className="piechartdesign"
              type="doughnut"
              data={{
                labels: ['Incorrect', 'Correct', 'Unanswered'],
                datasets: [
                  {
                    backgroundColor: ['red', 'green', '#efab58'],
                    data: [40, 20, 40],
                  },
                ],
              }}
            />
          </Col>
        </Row>

        <Row className="RowHeading">
          <div style={{ marginTop: '20px' }}>
            <h2>How You did, By Subtype:</h2>
          </div>
          <Col md={24}>
            {/* <CChart
              type="line"
              data={{
                labels: [
                  'Algebric Concepts',
                  'Data Analysis &Probability',
                  'Decimals,Percent,Fractions',
                  'Geometry',
                  'Meassurement',
                  'Number Sense',
                ],
                datasets: [
                  {
                    label: 'Correct',
                    backgroundColor: 'green',
                    borderColor: 'green',
                    pointBackgroundColor: 'green',
                    pointBorderColor: '#fff',
                    data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                  },
                  {
                    label: 'UnAnswered',
                    backgroundColor: '#FFEB3B',
                    borderColor: '#FFEB3B',
                    pointBackgroundColor: '#FFEB3B',
                    pointBorderColor: '#fff',
                    data: [50, 12, 28, 29, 7, 25, 12, 70, 60],
                  },
                  {
                    label: 'Incorrect',
                    backgroundColor: 'red',
                    borderColor: 'red',
                    pointBackgroundColor: 'red',
                    pointBorderColor: '#fff',
                    data: [30, 18, 12, 26, 5, 20, 17, 65, 55],
                  },
                ],
              }}
            /> */}
            <CChart
              type="bar"
              data={{
                labels: [
                  'Algebraic Concepts',
                  'Data Analysis & Probability',
                  'Decimals, Percents, Fractions',
                  'Geometry',
                  'Measurement',
                  'Number Sense',
                ],
                datasets: [
                  {
                    label: 'Subtype',
                    backgroundColor: '#f87979',
                    data: [10, 30, 50, 20, 40, 60],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 205, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(201, 203, 207, 0.2)',
                    ],
                    borderColor: [
                      'rgb(255, 99, 132)',
                      'rgb(255, 159, 64)',
                      'rgb(255, 205, 86)',
                      'rgb(75, 192, 192)',
                      'rgb(54, 162, 235)',
                      'rgb(153, 102, 255)',
                      'rgb(201, 203, 207)',
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              labels="months"
            />
          </Col>
        </Row>

        <Row>
          <div style={{ marginTop: '20px' }}>
            <h2>How you allocated your time:</h2>
          </div>
          <Col md={24}>
            <CChart
              type="bubble"
              data={{
                datasets: [
                  {
                    label: 'Time Minutes',
                    data: [
                      {
                        x: 0,
                        y: 0,
                        r: 20,
                      },
                      {
                        x: 10,
                        y: 10,
                        r: 20,
                      },
                      {
                        x: 20,
                        y: 20,
                        r: 20,
                      },
                      {
                        x: 30,
                        y: 30,
                        r: 20,
                      },
                      {
                        x: 40,
                        y: 40,
                        r: 20,
                      },
                      {
                        x: 50,
                        y: 50,
                        r: 20,
                      },
                      {
                        x: 60,
                        y: 60,
                        r: 20,
                      },
                      {
                        x: 70,
                        y: 70,
                        r: 20,
                      },
                    ],
                    backgroundColor: 'rgb(255, 99, 132)',
                  },
                ],
              }}
            />
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default ActivePlan;
