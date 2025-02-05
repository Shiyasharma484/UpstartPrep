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
import FeatherIcon from 'feather-icons-react';
import SiteHeader from '../../container/dashboard/SiteHeader';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// import { TypeAnimation } from 'react-type-animation';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { decrypt, encrypt } = require('../../helpers/encryption-decryption');
// const { decodetheid, encrypttheid } = require('../../helpers/encode-decode');

const Act = () => {
  const params = useParams();
  const history = useHistory();
  const [form] = Form.useForm();
  const [userid, setUserID] = useState();
  const [CategoryData, setCategoryData] = useState([]);
  const [Configdata, setConfigdata] = useState([]);
  const [config, setconfig] = useState([]);
  const [ConfigData, setConfigData] = useState([]);
  const [showlogo, setshowlogo] = useState();
  const [Message, setMessage] = useState();
  const [PagesData, setPagesData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isIcon, setisIcon] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [chooosemenu, setchooosemenu] = useState(false);
  const [testprepmenu, settestprepmenu] = useState(false);
  const [Academicmenu, setAcademicmenu] = useState(false);
  const [Strategiesmenu, setStrategiesmenu] = useState(false);
  const [Resourcesmenu, setResourcesmenu] = useState(false);

  const [formData, setformData] = useState({
    updtaecontext: '',
    updtaemodel: '',
  });

  const enc_user_detail = Cookies.get('UserDetail');

  useEffect(() => {
    const enc_user_detail = Cookies.get('UserDetail');
    const response = decrypt(enc_user_detail);
    const userId = response?.sessdata?.users_id;
    setUserID(userId);

    // async function getallConfiguration() {
    //   const Ids = '245';
    //   const url = api_url.get_all_configurations_byid + Ids;
    //   const response = await get_api_request(url, headers);
    //   if (response.status === 200) {
    //     const configdata = response.data.responsedata.configurations[0].config_value;
    //     setconfig(configdata);
    //     form.setFieldsValue({
    //       schedule_interval: configdata,
    //     });
    //   }
    // }
    // getallConfiguration();
    async function GetConfiguration() {
      const url = api_url.get_all_configurations;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const configdata = response?.data?.responsedata?.configurations[0].message;
        const configData = response?.data?.responsedata?.configurations[0];

        setConfigdata(configData);
        setMessage(configdata);
        const show_logo = response?.data?.responsedata?.configurations[0]?.site_logo;
        setshowlogo(show_logo);
      } else {
        console.log('error');
      }
    }
    GetConfiguration();

    async function GetAllSubcategory() {
      const url = api_url.get_subcategory;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const usersdata = response?.data?.responsedata;
        setCategoryData(usersdata);
      } else {
        console.log('error');
      }
    }
    GetAllSubcategory();

    // async function GetAllPages() {
    //   const url = api_url.getallpages;
    //   const response = await get_api_request(url, headers);
    //   console.log(response);
    //   if (response.status == 200) {
    //     const PageData = response?.data?.responsedata;
    //     setPagesData(PageData);
    //     console.log(PageData);
    //   } else {
    //     console.log('error');
    //   }
    // }
    // GetAllPages();
    setIsActive(true);
  }, []);

  const disabledDate = current => {
    return current && current < dayjs().endOf('day');
  };

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  const handleClick = event => {
    setisIcon(current => !current);
  };
  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
  });

  var textanimation1 = Configdata?.typing_animationtext;
  const myFunction = e => {
    //setIsActive1(true);
  };
  var text1 = textanimation1;
  //var textanimation1 = Configdata?.typing_animationtext;
  const seeAll = () => {
    document.getElementById('exam-detail').style.display = 'block';
    document.getElementById('seeAll').style.display = 'none';
  };
  const seeAllCourses = () => {
    document.getElementById('exam-detail2').style.display = 'block';
    document.getElementById('seeAll2').style.display = 'none';
  };

  //   document.getElementById('seeAll').onClick = function() {
  //     document.getElementById('exam-detail').style.display = 'block';
  //     document.getElementById('seeAll').style.display = 'none';
  //   };

  const review_carousel = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const RedirectToDashboard = () => {
    //to="/dashboard"
    history.push(`/dashboard`);
    window.location.reload();
  };
  return (
    <>
      <Main className="mainSpace">
        {/* <Row gutter={15} style={{ background: '#fff' }}>
          <Col xs={24}>
            <div className="header-main-line">
              <div className="header-main-size">
                <div className="header-main ">
                  <div className="header-main-left">
                    <NavLink className="pass-link" to="/">
                      <img src={showlogo ? showlogo : ''} />
                    </NavLink>
                    <a
                      href="javascript:void(0);"
                      class="icon"
                      onClick={() => {
                        setIsActive1(current => !current);
                      }}
                    >
                      <div className={isIcon ? 'addRemovebars' : 'addRemoveclose'} onClick={handleClick}>
                        <i class="fa fa-bars"></i>
                        <i class="fa fa-close"></i>
                      </div>
                    </a>
                  </div>

                  <div className={isActive1 ? 'topmenudesignblock' : 'topmenudesign'}>
                    <div className="header-main-right topnav header-main-right topnav" id="myTopnav">
                      <div className="header-nav">
                        <div className="main-menu">
                          <NavLink className={isActive ? '' : 'pass-links slide-animate mobsubclick'} to="/act">
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
                              <a className="pass-links" href="#">
                                Private Tutoring
                              </a>

                              <a className="pass-links" href="#">
                                Academic Tutoring
                              </a>

                              <a className="pass-links" href="#">
                                Admissions Coaching
                              </a>
                            </div>
                        
                          </div>
                        </div>

                        <div className="main-menu">
                          <NavLink className={chooosemenu ? 'mobsubclick' : 'slide-animate pass-links'} to="/act">
                        
                            <div
                              className="flex-iconMenu"
                              onClick={() => {
                                setchooosemenu(current => !current);
                              }}
                            >
                              Choose Upstart <FeatherIcon icon="chevron-down" />
                            </div>
                          </NavLink>

                          <div className="main-sub-menu">
                            <div className="sub-menu">
                              <NavLink className="pass-links" to="">
                                The Upstart Effect
                              </NavLink>
                              <NavLink className="pass-links" to="/findInstructor">
                                Find Instructor
                              </NavLink>
                              <NavLink className="pass-links" to="/">
                                Letter From Our Founder
                              </NavLink>
                              <NavLink className="pass-links" to="/">
                                FAQs
                              </NavLink>
                            </div>
                          </div>
                        </div>

                        <div className="main-menu">
                          <NavLink className={testprepmenu ? 'mobsubclick' : 'homeMenus pass-links'} to="/act">
                            <div
                              className="flex-iconMenu"
                              onClick={() => {
                                settestprepmenu(current => !current);
                              }}
                            >
                              Test Prep <FeatherIcon icon="chevron-down" />
                            </div>
                          </NavLink>

                          <div className="main-sub-menu">
                            <div className="sub-menu">
                              <NavLink className="pass-links" to="/preppage">
                                SAT Prep
                              </NavLink>
                              <NavLink className="pass-links" to="/act">
                                ACT Prep
                              </NavLink>
                              <NavLink className="pass-links" to="/preppage">
                                ISEE Prep
                              </NavLink>
                              <NavLink className="pass-links" to="/preppage">
                                SSAT Prep
                              </NavLink>
                              <NavLink className="pass-links" to="/preppage">
                                HSPT Prep
                              </NavLink>
                              <NavLink className="pass-links" to="/preppage">
                                PSAT Prep
                              </NavLink>
                              <NavLink className="pass-links" to="/preppage">
                                GRE Prep
                              </NavLink>
                            </div>
                          </div>
                        </div>
                        <div className="main-menu">
                          <NavLink className={Academicmenu ? 'mobsubclick' : 'slide-animate pass-links'} to="/act">
                            <div
                              className="flex-iconMenu"
                              onClick={() => {
                                setAcademicmenu(current => !current);
                              }}
                            >
                              Academic Tutoring <FeatherIcon icon="chevron-down" />
                            </div>
                          </NavLink>

                          <div className="main-sub-menu">
                            <div className="sub-menu">
                              <NavLink className="pass-links" to="/">
                                Math
                              </NavLink>
                              <NavLink className="pass-links" to="/">
                                Science
                              </NavLink>
                              <NavLink className="pass-links" to="/">
                                English
                              </NavLink>
                              <NavLink className="pass-links" to="/">
                                History & Social Science
                              </NavLink>
                            </div>
                          </div>
                        </div>

                        <div className="main-menu">
                          <NavLink className={Strategiesmenu ? 'mobsubclick' : 'slide-animate pass-links'} to="/act">
                            <div
                              className="flex-iconMenu"
                              onClick={() => {
                                setStrategiesmenu(current => !current);
                              }}
                            >
                              Strategies
                              <FeatherIcon icon="chevron-down" />
                            </div>
                          </NavLink>

                          <div className="main-sub-menu">
                            <div className="sub-menu">
                              <NavLink className="pass-links" to="/">
                                Executive Function /Mindfulness
                              </NavLink>
                              <NavLink className="pass-links" to="/">
                                School Partnerships
                              </NavLink>
                              <NavLink className="pass-links" to="/">
                                Youth Sport Partnership
                              </NavLink>
                              <NavLink className="pass-links" to="/">
                                Educational Consultants
                              </NavLink>
                              <NavLink className="pass-links" to="/">
                                Math Enrichment
                              </NavLink>
                              <NavLink className="pass-links" to="/">
                                Congnitive Learning Assesment
                              </NavLink>
                            </div>
                          </div>
                        </div>

                        <div className="main-menu">
                          <NavLink className={Resourcesmenu ? 'mobsubclick' : 'slide-animate pass-links'} to="/act">
                            <div
                              className="flex-iconMenu"
                              onClick={() => {
                                setResourcesmenu(current => !current);
                              }}
                            >
                              Resources
                              <FeatherIcon icon="chevron-down" />
                            </div>
                          </NavLink>

                          <div className="main-sub-menu">
                            <div className="sub-menu">
                              <NavLink className="pass-links" to="/">
                                Blogs
                              </NavLink>
                              <NavLink className="pass-links" to="/">
                                Webnars
                              </NavLink>
                              <NavLink className="pass-links" to="/">
                                Practice Exams
                              </NavLink>
                              <NavLink className="pass-links" to="/">
                                Videos
                              </NavLink>
                              <NavLink className="pass-links" to="/">
                                Educator Resources
                              </NavLink>
                            </div>
                          </div>
                        </div>
                     

                        <NavLink className="pass-links slide-animate" to="/contact-us">
                          Contact Us
                        </NavLink>
                      </div>
                      {enc_user_detail ? (
                        <NavLink className="pass-link" to="#" onClick={RedirectToDashboard}>
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
        </Row> */}
        <SiteHeader />

        <div className="act-background">
          <div className="container">
            <Row gutter={15}>
              <Col md={15}>
                <p className="act-title">
                  HARVARD UNIVERSITY <br /> <span>AND</span> REVOLUTION PREP
                </p>
                <p className="act-des">
                  Revolution Prep offers families resources and guidance to help every child meet their academic
                  aspirations. We look forward to helping you in your child's academic journey.
                </p>
              </Col>

              <Col md={24}>
                <div className="flex-act-top">
                  <div className="act-top-width">
                    <div className="act-top">
                      <p className="act-top-title">Valuable Resources</p>
                      <p className="flex-partners-des">
                        From practice exams to informational parent events to relevant grade and test prep guides, we
                        have you covered.
                      </p>
                    </div>
                  </div>

                  <div className="act-top-width">
                    <div className="act-top">
                      <p className="act-top-title">Valuable Resources</p>
                      <p className="flex-partners-des">
                        From practice exams to informational parent events to relevant grade and test prep guides, we
                        have you covered.
                      </p>
                    </div>
                  </div>

                  <div className="act-top-width">
                    <div className="act-top">
                      <p className="act-top-title">Valuable Resources</p>
                      <p className="flex-partners-des">
                        From practice exams to informational parent events to relevant grade and test prep guides, we
                        have you covered.
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {/* <div className="act-sec-bg">
          <div className="container">
            <Row gutter={15}>
              <Col md={20}>
                <p className="act-sec-title">Level up without sacrificing summer</p>
                <p className="act-sec-des">Soak up summer learning with a $200 gift card toward tutoring!</p>
              </Col>

              <Col md={4}>
                <button className="act-sec-btn">CLAIM MY GIFT CARD</button>
                <p className="act-sec-time">Ends 6/30/23</p>
              </Col>
            </Row>
          </div>
        </div> */}

        <div className="act-Practice-bg">
          <div className="container">
            <Row gutter={15}>
              <Col md={7}>
                <div className="Practice-exam">
                  <div className="Practice-exam-inner">
                    <FeatherIcon icon="file-text" />
                    <p className="act-Practice-title">Practice Exams</p>
                  </div>
                  <p className="act-Practice-des">
                    Taking practice tests for primary, secondary, and college admission exams provides students with a
                    baseline score. Finding out where you stand allows you to compare scores and determine your best fit
                    test.
                  </p>
                </div>
              </Col>

              <Col md={17}>
                <div className="main-exam-details-flex">
                  <div className="exam-details">
                    <div className="exam-details-flex">
                      <div className="exam-detail">
                        <p className="exam-details-title">
                          SAT Practice Exam <span> | $30 </span> FREE
                        </p>
                        <p className="exam-details-des">Saturday, June 3, 2023 | 6:30 PM IST</p>
                        <p className="exam-details-online">Online</p>
                      </div>

                      <div className="exam-detail">
                        <button>SEE DETAILS</button>
                      </div>
                    </div>
                  </div>

                  <div className="exam-details">
                    <div className="exam-details-flex">
                      <div className="exam-detail">
                        <p className="exam-details-title">
                          SAT Practice Exam <span> | $30 </span> FREE
                        </p>
                        <p className="exam-details-des">Saturday, June 3, 2023 | 6:30 PM IST</p>
                        <p className="exam-details-online">Online</p>
                      </div>

                      <div className="exam-detail">
                        <button>SEE DETAILS</button>
                      </div>
                    </div>
                  </div>

                  <div className="exam-details">
                    <div className="exam-details-flex">
                      <div className="exam-detail">
                        <p className="exam-details-title">
                          SAT Practice Exam <span> | $30 </span> FREE
                        </p>
                        <p className="exam-details-des">Saturday, June 3, 2023 | 6:30 PM IST</p>
                        <p className="exam-details-online">Online</p>
                      </div>

                      <div className="exam-detail">
                        <button>SEE DETAILS</button>
                      </div>
                    </div>
                  </div>

                  <div className="exam-details">
                    <div className="exam-details-flex">
                      <div className="exam-detail">
                        <p className="exam-details-title">
                          SAT Practice Exam <span> | $30 </span> FREE
                        </p>
                        <p className="exam-details-des">Saturday, June 3, 2023 | 6:30 PM IST</p>
                        <p className="exam-details-online">Online</p>
                      </div>

                      <div className="exam-detail">
                        <button>SEE DETAILS</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="exam-detail" style={{ display: 'none' }}>
                  <div className="main-exam-details-flex">
                    <div className="exam-details">
                      <div className="exam-details-flex">
                        <div className="exam-detail">
                          <p className="exam-details-title">
                            SAT Practice Exam <span> | $30 </span> FREE
                          </p>
                          <p className="exam-details-des">Saturday, June 3, 2023 | 6:30 PM IST</p>
                          <p className="exam-details-online">Online</p>
                        </div>

                        <div className="exam-detail">
                          <button>SEE DETAILS</button>
                        </div>
                      </div>
                    </div>

                    <div className="exam-details">
                      <div className="exam-details-flex">
                        <div className="exam-detail">
                          <p className="exam-details-title">
                            SAT Practice Exam <span> | $30 </span> FREE
                          </p>
                          <p className="exam-details-des">Saturday, June 3, 2023 | 6:30 PM IST</p>
                          <p className="exam-details-online">Online</p>
                        </div>

                        <div className="exam-detail">
                          <button>SEE DETAILS</button>
                        </div>
                      </div>
                    </div>

                    <div className="exam-details">
                      <div className="exam-details-flex">
                        <div className="exam-detail">
                          <p className="exam-details-title">
                            SAT Practice Exam <span> | $30 </span> FREE
                          </p>
                          <p className="exam-details-des">Saturday, June 3, 2023 | 6:30 PM IST</p>
                          <p className="exam-details-online">Online</p>
                        </div>

                        <div className="exam-detail">
                          <button>SEE DETAILS</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="seeAll" onClick={() => seeAll()}>
                  <p>SEE ALL</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <div className="act-Practice-bg" style={{ padding: '1rem 0 3rem 0' }}>
          <div className="container">
            <Row gutter={15}>
              <Col md={7}>
                <div className="Practice-exam">
                  <div className="Practice-exam-inner">
                    <FeatherIcon icon="users" />
                    <p className="act-Practice-title">Test Prep Courses</p>
                  </div>
                  <p className="act-Practice-des">
                    Take advantage of our proven SAT®, ACT®, and PSAT score-boosting curriculum and tailored instruction
                    in a group setting of only 8 students. All courses include practice tests, a personalized
                    improvement plan, and weekly parent updates.
                  </p>
                </div>
              </Col>

              <Col md={17}>
                <div className="main-exam-details-flex">
                  <div className="exam-details">
                    <div className="exam-details-flex">
                      <div className="exam-detail">
                        <p className="exam-details-title">ACT 24-Hour Small Group Course | $799</p>
                        <p className="exam-details-des">Jun 11 - Aug 28</p>
                        <p className="exam-details-des">Sunday at 10:30PM IST</p>
                        <p className="exam-details-online">Online</p>
                      </div>

                      <div className="exam-detail">
                        <button>SEE DETAILS</button>
                      </div>
                    </div>
                  </div>

                  <div className="exam-details">
                    <div className="exam-details-flex">
                      <div className="exam-detail">
                        <p className="exam-details-title">ACT 24-Hour Small Group Course | $799</p>
                        <p className="exam-details-des">Jun 11 - Aug 28</p>
                        <p className="exam-details-des">Sunday at 10:30PM IST</p>
                        <p className="exam-details-online">Online</p>
                      </div>

                      <div className="exam-detail">
                        <button>SEE DETAILS</button>
                      </div>
                    </div>
                  </div>

                  <div className="exam-details">
                    <div className="exam-details-flex">
                      <div className="exam-detail">
                        <p className="exam-details-title">ACT 24-Hour Small Group Course | $799</p>
                        <p className="exam-details-des">Jun 11 - Aug 28</p>
                        <p className="exam-details-des">Sunday at 10:30PM IST</p>
                        <p className="exam-details-online">Online</p>
                      </div>

                      <div className="exam-detail">
                        <button>SEE DETAILS</button>
                      </div>
                    </div>
                  </div>

                  <div className="exam-details">
                    <div className="exam-details-flex">
                      <div className="exam-detail">
                        <p className="exam-details-title">ACT 24-Hour Small Group Course | $799</p>
                        <p className="exam-details-des">Jun 11 - Aug 28</p>
                        <p className="exam-details-des">Sunday at 10:30PM IST</p>
                        <p className="exam-details-online">Online</p>
                      </div>

                      <div className="exam-detail">
                        <button>SEE DETAILS</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="exam-detail2" style={{ display: 'none' }}>
                  <div className="main-exam-details-flex">
                    <div className="exam-details">
                      <div className="exam-details-flex">
                        <div className="exam-detail">
                          <p className="exam-details-title">ACT 24-Hour Small Group Course | $799</p>
                          <p className="exam-details-des">Jun 11 - Aug 28</p>
                          <p className="exam-details-des">Sunday at 10:30PM IST</p>
                          <p className="exam-details-online">Online</p>
                        </div>

                        <div className="exam-detail">
                          <button>SEE DETAILS</button>
                        </div>
                      </div>
                    </div>

                    <div className="exam-details">
                      <div className="exam-details-flex">
                        <div className="exam-detail">
                          <p className="exam-details-title">ACT 24-Hour Small Group Course | $799</p>
                          <p className="exam-details-des">Jun 11 - Aug 28</p>
                          <p className="exam-details-des">Sunday at 10:30PM IST</p>
                          <p className="exam-details-online">Online</p>
                        </div>

                        <div className="exam-detail">
                          <button>SEE DETAILS</button>
                        </div>
                      </div>
                    </div>

                    <div className="exam-details">
                      <div className="exam-details-flex">
                        <div className="exam-detail">
                          <p className="exam-details-title">ACT 24-Hour Small Group Course | $799</p>
                          <p className="exam-details-des">Jun 11 - Aug 28</p>
                          <p className="exam-details-des">Sunday at 10:30PM IST</p>
                          <p className="exam-details-online">Online</p>
                        </div>

                        <div className="exam-detail">
                          <button>SEE DETAILS</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="seeAll2" onClick={() => seeAllCourses()}>
                  <p>SEE ALL</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <div className="program-sec-bg">
          <div className="container">
            <Row gutter={15}>
              <Col md={24}>
                <div className="program-title">
                  <p>
                    Our <span>Programs</span>
                  </p>
                  <p>
                    Revolution Prep’s convenient online tutoring programs optimize the learning experience with
                    personalized instruction, easy scheduling, and top-quality tutors – anywhere, at any time!
                  </p>
                </div>
              </Col>
              <Col md={8}>
                <div className="program-card">
                  <div className="program-inner">
                    <p className="program-inner-title">Private Tutoring</p>
                    <p className="program-inner-des">
                      Customized 1-on-1 tutoring plan tailored to your specific academic or test prep needs and goals.
                    </p>
                    <hr />
                    <div className="fully-schedule">
                      {/* <img src={program_calendar} /> */}
                      <FeatherIcon icon="calendar" />
                      <p>Fully customized schedule</p>
                    </div>
                    <div className="fully-schedule">
                      <FeatherIcon icon="user" />
                      {/* <img src={program_pt_student} /> */}
                      <p>1 tutor to 1 student</p>
                    </div>
                    <div className="fully-schedule">
                      {/* <img src={program_price} /> */}
                      <FeatherIcon icon="dollar-sign" />
                      <div className="fully-schedule2">
                        <p>Starting at $1,398</p>
                        <p>For 12 hours</p>
                      </div>
                    </div>
                    <hr />
                    <button className="program-btn">Learn More</button>
                  </div>
                </div>
              </Col>

              <Col md={8}>
                <div className="program-card">
                  <div className="program-inner">
                    <p className="program-inner-title">Tutoring</p>
                    <p className="program-inner-des">
                      Customized 1-on-1 tutoring plan tailored to your specific academic or test prep needs and goals.
                    </p>
                    <hr />
                    <div className="fully-schedule">
                      {/* <img src={program_calendar} /> */}
                      <FeatherIcon icon="calendar" />
                      <p>Fully customized schedule</p>
                    </div>
                    <div className="fully-schedule">
                      <FeatherIcon icon="user" />
                      {/* <img src={program_pt_student} /> */}
                      <p>1 tutor to 1 student</p>
                    </div>
                    <div className="fully-schedule">
                      {/* <img src={program_price} /> */}
                      <FeatherIcon icon="dollar-sign" />
                      <div className="fully-schedule2">
                        <p>Starting at $1,398</p>
                        <p>For 12 hours</p>
                      </div>
                    </div>
                    <hr />
                    <button className="program-btn">Learn More</button>
                  </div>
                </div>
              </Col>

              <Col md={8}>
                <div className="program-card">
                  <div className="program-inner">
                    <p className="program-inner-title">Group Test Prep</p>
                    <p className="program-inner-des">
                      Customized 1-on-1 tutoring plan tailored to your specific academic or test prep needs and goals.
                    </p>
                    <hr />
                    <div className="fully-schedule">
                      {/* <img src={program_calendar} /> */}
                      <FeatherIcon icon="calendar" />
                      <p>Fully customized schedule</p>
                    </div>
                    <div className="fully-schedule">
                      <FeatherIcon icon="user" />
                      {/* <img src={program_pt_student} /> */}
                      <p>1 tutor to 1 student</p>
                    </div>
                    <div className="fully-schedule">
                      {/* <img src={program_price} /> */}
                      <FeatherIcon icon="dollar-sign" />
                      <div className="fully-schedule2">
                        <p>Starting at $1,398</p>
                        <p>For 12 hours</p>
                      </div>
                    </div>
                    <hr />
                    <button className="program-btn">Learn More</button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <div className="reviews-sec-bg">
          <div className="container">
            <Row gutter={15}>
              <Col md={24}>
                <div className="program-review-title">
                  <p>
                    Student <span>Reviews</span>
                  </p>
                  <p>
                    Why do students love Revolution Prep so much? It's not a secret: better tutors get better results.
                    With the only full-time faculty in the industry, our tutors have dedicated their careers to boosting
                    scores, and benefit from 100+ hours of training and 1,000+ hours of tutoring experience each year.
                    That means better tutors, better results, and happier students!
                  </p>
                </div>
              </Col>

              <Col md={24}>
                <div className="program-review">
                  <p className="latest-review">Latest Student Reviews</p>
                  <Carousel responsive={review_carousel}>
                    <div className="review-student">
                      <p className="review-title">Jasmine</p>
                      <span>
                        <FeatherIcon icon="star" className="yellowStar" />
                        <FeatherIcon icon="star" className="yellowStar" />
                        <FeatherIcon icon="star" className="yellowStar" />
                        <FeatherIcon icon="star" className="yellowStar" />
                        <FeatherIcon icon="star" className="yellowStar" />
                      </span>
                      <p className="review-des">
                        Great with explaining concepts in a way you understand. She likes to get to know you so she
                        knows where you are coming from. I love her!
                      </p>
                    </div>

                    <div className="review-student">
                      <p className="review-title">Jasmine</p>
                      <span>
                        <FeatherIcon icon="star" className="yellowStar" />
                        <FeatherIcon icon="star" className="yellowStar" />
                        <FeatherIcon icon="star" className="yellowStar" />
                        <FeatherIcon icon="star" className="yellowStar" />
                        <FeatherIcon icon="star" className="yellowStar" />
                      </span>
                      <p className="review-des">
                        Great with explaining concepts in a way you understand. She likes to get to know you so she
                        knows where you are coming from. I love her!
                      </p>
                    </div>

                    <div className="review-student">
                      <p className="review-title">Jasmine</p>
                      <span>
                        <FeatherIcon icon="star" className="yellowStar" />
                        <FeatherIcon icon="star" className="yellowStar" />
                        <FeatherIcon icon="star" className="yellowStar" />
                        <FeatherIcon icon="star" className="yellowStar" />
                        <FeatherIcon icon="star" className="yellowStar" />
                      </span>
                      <p className="review-des">
                        Great with explaining concepts in a way you understand. She likes to get to know you so she
                        knows where you are coming from. I love her!
                      </p>
                    </div>

                    <div className="review-student">
                      <p className="review-title">Jasmine</p>
                      <span>
                        <FeatherIcon icon="star" className="yellowStar" />
                        <FeatherIcon icon="star" className="yellowStar" />
                        <FeatherIcon icon="star" className="yellowStar" />
                        <FeatherIcon icon="star" className="yellowStar" />
                        <FeatherIcon icon="star" className="yellowStar" />
                      </span>
                      <p className="review-des">
                        Great with explaining concepts in a way you understand. She likes to get to know you so she
                        knows where you are coming from. I love her!
                      </p>
                    </div>
                  </Carousel>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <div className="footersection">
          <div className="container">
            <Row gutter={30} className="howItWorkRowFooter">
              <Col md={24}>
                <p>© AjivaInfotech 2023 All Rights Reserved.</p>
              </Col>
            </Row>
          </div>
        </div>
      </Main>
    </>
  );
};

export default Act;
