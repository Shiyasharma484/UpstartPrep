import React, { useEffect, useState } from 'react';
import { Row, Col, Form, notification, Input, Button, Select, DatePicker } from 'antd';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { Cards } from '../../components/cards/frame/cards-frame';
import Cookies from 'js-cookie';
import { Main } from '../styled';
import dayjs from 'dayjs';
import 'moment/locale/zh-cn';
import { get_api_request, post_api_request, put_api_request, api_url } from '../../helpers/Common';
import { headers } from '../../helpers/variables';
import FeatherIcon from 'feather-icons-react';
import StaticLogo from '../../static/img/Home/tutoring-services.png';
import third1 from '../../static/img/Home/for-teacher.png';
import third2 from '../../static/img/Home/for-student.png';
import third3 from '../../static/img/Home/for-education.png';
import homebanner from '../../static/img/Home/top-hero-sec.png';
import accomplished from '../../static/img/Homepage/accomplished.png';
import results from '../../static/img/Homepage/results.png';
import integrity from '../../static/img/Homepage/integrity.png';
import upstartlogo from '../../static/img/Homepage/upstartlogo.png';
import running from '../../static/img/Homepage/running.png';
import inclusivity from '../../static/img/Homepage/inclusivity.png';
import innovative from '../../static/img/Homepage/innovative.png';
import expertise from '../../static/img/Homepage/expertise.png';
import discovestudent from '../../static/img/Homepage/discovestudent.png';
import valuesimage from '../../static/img/Homepage/valuesimage.png';
import value1 from '../../static/img/Homepage/value1.png';
import value2 from '../../static/img/Homepage/value2.png';
import missonimg from '../../static/img/Homepage/missonimg.png';
import tutoring_ISEE from '../../static/img/Home/tutoring-ISEE2.png';
import tutoring_SSAT from '../../static/img/Home/tutoring-SSAT2.png';
import tutoring_SAT from '../../static/img/Home/tutoring-SAT2.png';
import tutoring_ACT from '../../static/img/Home/tutoring-ACT2.png';
import upstartsec from '../../static/img/Home/upstart-sec.png';
import tutoringservicebg2 from '../../static/img/Home/tutoring-service-bg2.png';
import discover from '../../static/img/Home/discover.png';
import adapt from '../../static/img/Home/adapt.png';
import achieve from '../../static/img/Home/achieve.png';
import vector from '../../static/img/icon/Vector.png';
import sportsOrganizations from '../../static/img/Homepage/sports-organizations.png';
import builtDemandRightSec from '../../static/img/Home/built-demand-right-sec.png';
import builtIcon from '../../static/img/Home/built-icon.png';
import UpStartAscend from '../../static/img/Home/UpStartAscend.png';
import Effectvideo from '../../static/img/Home/Effectvideo.mp4';
import calmfocus from '../../static/img/Homepage/calmfocus.png';
import user2 from '../../static/img/icon/user2.png';
import clock2 from '../../static/img/icon/clock2.png';
import lastfooterIMg from '../../static/img/Home/last-footerIMg.png';
import Serene from '../../static/img/Homepage/Serene.png';
import 'react-multi-carousel/lib/styles.css';
import SiteHeader from '../../container/dashboard/SiteHeader';
import { TypeAnimation } from 'react-type-animation';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
//import img_src from '../../static/img/uploads/logo/59a679528057.png';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { decrypt } = require('../../helpers/encryption-decryption');

const HomePage = () => {
  const params = useParams();
  const history = useHistory();
  const [form] = Form.useForm();
  const [isActive, setIsActive] = useState(false);
  const [isIcon, setisIcon] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [chooosemenu, setchooosemenu] = useState(false);
  const [testprepmenu, settestprepmenu] = useState(false);
  const [Academicmenu, setAcademicmenu] = useState(false);
  const [Strategiesmenu, setStrategiesmenu] = useState(false);
  const [Resourcesmenu, setResourcesmenu] = useState(false);
  const enc_user_detail = Cookies.get('UserDetail');
  const [showlogo, setshowlogo] = useState();

  useEffect(() => {}, []);
  const handleClick = event => {
    setisIcon(current => !current);
  };
  function openTutoring(evt, cityName) {
    var i, Tutoringcontent, tutoringlinks;
    Tutoringcontent = document.getElementsByClassName('Tutoringcontent');
    for (i = 0; i < Tutoringcontent.length; i++) {
      Tutoringcontent[i].style.display = 'none';
    }
    tutoringlinks = document.getElementsByClassName('tutoringlinks');
    for (i = 0; i < tutoringlinks.length; i++) {
      tutoringlinks[i].className = tutoringlinks[i].className.replace(' active', '');
    }
    document.getElementById(cityName).style.display = 'block';
    evt.currentTarget.className += ' active';
  }
  const RedirectToDashboard = () => {
    //to="/dashboard"
    history.push(`/dashboard`);
    window.location.reload();
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
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
  return (
    <>
      <Main className="mainSpace">
        {/* <Row gutter={15} style={{ background: '#fafaff' }}>
          <Col xs={24}>
            <div className="header-main-line">
              <div className="header-main-size">
                <div className="header-main ">
                  <div className="header-main-left">
                    <NavLink className="pass-link" to="/">
                      <img src={StaticLogo} loading="lazy" decoding="async" />
                    </NavLink>
                    <a
                      href="javascript:void(0);"
                      className="icon"
                      onClick={() => {
                        setIsActive1(current => !current);
                      }}
                    >
                      <div className={isIcon ? 'addRemovebars' : 'addRemoveclose'} onClick={handleClick}>
                        <i className="fa fa-bars"></i>
                        <i className="fa fa-close"></i>
                      </div>
                    </a>
                  </div>

                  <div className={isActive1 ? 'topmenudesignblock' : 'topmenudesign'}>
                    <div className="header-main-right topnav header-main-right topnav" id="myTopnav">
                      <div className="header-nav">
                        <div className="main-menu">
                          <NavLink className={isActive ? 'homeMenus' : 'pass-links slide-animate mobsubclick'} to="/">
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
                          <NavLink className={chooosemenu ? 'mobsubclick' : 'slide-animate pass-links'} to="/">
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
                              <NavLink className="pass-links" to="/contact-us">
                                FAQs
                              </NavLink>
                            </div>
                          </div>
                        </div>

                        <div className="main-menu">
                          <NavLink className={testprepmenu ? 'mobsubclick' : 'slide-animate pass-links'} to="/">
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
                              <NavLink className="pass-links" to="/iseeprep">
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
                          <NavLink className={Academicmenu ? 'mobsubclick' : 'slide-animate pass-links'} to="/">
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
                          <NavLink className={Strategiesmenu ? 'mobsubclick' : 'slide-animate pass-links'} to="/">
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
                          <NavLink className={Resourcesmenu ? 'mobsubclick' : 'slide-animate pass-links'} to="/">
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
                              <NavLink className="pass-links" to="/blog">
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
        <div className="home-container">
          <div className="NewHomeMainDiv">
            <img src={homebanner}></img>
            <div className="NewHomeMainDiv-inner">
              <h1>
                Elevating every
                <br /> learner's journey
              </h1>
              <div className="sectionSecond-inner">
                <p className="NewHomeMainDiv-inner-p">
                  Customized online one-on-one tutoring, meticulously
                  <br />
                  engineered to elevate performance and supercharge confidence.
                </p>
              </div>
            </div>
          </div>
          <div className="NewHomeMainDiv-inner-btns">
            <Button className="JoinBtn" onClick={() => history.push('/register')}>
              Join the Platform
            </Button>
            <Button className="ScheduleBtn" onClick={() => history.push('/consultation')}>
              Schedule Consultation
            </Button>
          </div>
        </div>
        <div className="home-container">
          <Row>
            <Col md={24} xs={24}>
              <div className="tutoring-service-main">
                <h2 className="tutoring-title">One on One Tutoring Services</h2>
                <div className="tutoring-service">
                  <button
                    className="tutoringlinks active"
                    onClick={e => {
                      openTutoring(e, 'TestPrep');
                    }}
                  >
                    Test Prep
                  </button>
                  <button
                    className="tutoringlinks"
                    onClick={e => {
                      openTutoring(e, 'Academic');
                    }}
                  >
                    Academic Tutoring
                  </button>
                  <button
                    className="tutoringlinks"
                    onClick={e => {
                      openTutoring(e, 'Strategies');
                    }}
                  >
                    Strategies
                  </button>
                  <button
                    className="tutoringlinks"
                    onClick={e => {
                      openTutoring(e, 'Resources');
                    }}
                  >
                    Resources
                  </button>
                </div>
                <div id="TestPrep" className="Tutoringcontent" style={{ display: 'block' }}>
                  <div className="Tutoringcontent1">
                    <Row>
                      <Col md={24} xs={24} className="Tutoringdata">
                        <div className="features-main-line">
                          <div className="features-main-size">
                            <div className="features-main">
                              <Carousel responsive={responsive} className="carousel">
                                <div className="carouselMain">
                                  <div className="carousel">
                                    <div className="tutoring_ISEE">
                                      <div className="img">
                                        <img src={tutoring_ISEE} alt="img" draggable="false" />
                                      </div>
                                      <h2>ISEE</h2>
                                    </div>
                                  </div>
                                </div>
                                <div className="carouselMain">
                                  <div className="carousel">
                                    <div className="tutoring_SSAT">
                                      <div className="img">
                                        <img src={tutoring_SSAT} alt="img" draggable="false" />
                                      </div>
                                      <h2>SSAT</h2>
                                    </div>
                                  </div>
                                </div>

                                <div className="carouselMain">
                                  <div className="carousel">
                                    <div className="tutoring_SAT">
                                      <div className="img">
                                        <img src={tutoring_SAT} alt="img" draggable="false" />
                                      </div>
                                      <h2>SAT</h2>
                                    </div>
                                  </div>
                                </div>

                                <div className="carouselMain">
                                  <div className="carousel">
                                    <div className="tutoring_ACT">
                                      <div className="img">
                                        <img src={tutoring_ACT} alt="img" draggable="false" />
                                      </div>
                                      <h2>ACT</h2>
                                    </div>
                                  </div>
                                </div>
                                <div className="carouselMain">
                                  <div className="carousel">
                                    <div className="tutoring_ISEE">
                                      <div className="img">
                                        <img src={tutoring_ISEE} alt="img" draggable="false" />
                                      </div>
                                      <h2>ISEE</h2>
                                    </div>
                                  </div>
                                </div>
                                <div className="carouselMain">
                                  <div className="carousel">
                                    <div className="tutoring_SSAT">
                                      <div className="img">
                                        <img src={tutoring_SSAT} alt="img" draggable="false" />
                                      </div>
                                      <h2>SSAT</h2>
                                    </div>
                                  </div>
                                </div>

                                <div className="carouselMain">
                                  <div className="carousel">
                                    <div className="tutoring_SAT">
                                      <div className="img">
                                        <img src={tutoring_SAT} alt="img" draggable="false" />
                                      </div>
                                      <h2>SAT</h2>
                                    </div>
                                  </div>
                                </div>
                                <div className="carouselMain">
                                  <div className="carousel">
                                    <div className="tutoring_ACT">
                                      <div className="img">
                                        <img src={tutoring_ACT} alt="img" draggable="false" />
                                      </div>
                                      <h2>ACT</h2>
                                    </div>
                                  </div>
                                </div>
                              </Carousel>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <Row>
                    <Col md={24} xs={24} className="Tutoringdata2">
                      <div className="Tutoringdata2">
                        <div className="Tutoringdata-sec">
                          <img src={StaticLogo} />
                        </div>
                        <div className="Tutoringdata-txt1">
                          <img src={tutoringservicebg2} />
                          <p className="Tutoringdata-txt2">The UpstartPrep Vision</p>
                          <p>
                            Purpose-built technology
                            <br /> for students, parents, and
                            <br /> educators
                          </p>
                          <button>About UpstartPrep</button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div id="Academic" className="Tutoringcontent">
                  {/* <Row>
                    <Col md={6} xs={24} className="Tutoringdata">
                      <img src={tutoring_ISEE} />
                      <p>ISEE</p>
                    </Col>
                    <Col md={6} xs={24} className="Tutoringdata">
                      <img src={tutoring_SSAT} />
                      <p>SSAT</p>
                    </Col>
                    <Col md={6} xs={24} className="Tutoringdata">
                      <img src={tutoring_SAT} />
                      <p>SAT</p>
                    </Col>
                    <Col md={6} xs={24} className="Tutoringdata">
                      <img src={tutoring_ACT} />
                      <p>ACT</p>
                    </Col>
                    <div></div>
                  </Row> */}
                </div>
                <div id="Strategies" className="Tutoringcontent">
                  {/* <Row>
                    <Col md={6} xs={24} className="Tutoringdata">
                      <img src={tutoring_ISEE} />
                      <p>ISEE</p>
                    </Col>
                    <Col md={6} xs={24} className="Tutoringdata">
                      <img src={tutoring_SSAT} />
                      <p>SSAT</p>
                    </Col>
                    <Col md={6} xs={24} className="Tutoringdata">
                      <img src={tutoring_SAT} />
                      <p>SAT</p>
                    </Col>
                    <Col md={6} xs={24} className="Tutoringdata">
                      <img src={tutoring_ACT} />
                      <p>ACT</p>
                    </Col>
                    <div></div>
                  </Row> */}
                </div>
                <div id="Resources" className="Tutoringcontent">
                  {/* <Row>
                    <Col md={6} xs={24} className="Tutoringdata">
                      <img src={tutoring_ISEE} />
                      <p>ISEE</p>
                    </Col>
                    <Col md={6} xs={24} className="Tutoringdata">
                      <img src={tutoring_SSAT} />
                      <p>SSAT</p>
                    </Col>
                    <Col md={6} xs={24} className="Tutoringdata">
                      <img src={tutoring_SAT} />
                      <p>SAT</p>
                    </Col>
                    <Col md={6} xs={24} className="Tutoringdata">
                      <img src={tutoring_ACT} />
                      <p>ACT</p>
                    </Col>
                    <div></div>
                  </Row> */}
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="sectionThirdHome-fluid">
          <div className="home-container">
            <div className="sectionThirdHome-Main">
              <Row className="sectionThirdHomeRow">
                <Col md={6} sm={24} xs={24} className="firstlearningDiv ">
                  <p>
                    Modern
                    <br />
                    Learning
                    <br />
                    Solutions
                  </p>
                  <Button>Schedule a Consultation</Button>
                </Col>
                <Col md={6} xs={12} className="parentssection activeparentssec">
                  <h3>
                    For
                    <br /> Parents
                  </h3>
                  <img src={third1}></img>
                </Col>
                <Col md={6} xs={12} style={{ textAlign: 'center' }} className="parentssection">
                  <h3>
                    For
                    <br /> Students
                  </h3>
                  <img src={third2}></img>
                </Col>
                <Col md={6} xs={12} className="parentssection hidmob-parentssection">
                  <h3>
                    For <br />
                    Educators
                  </h3>
                  <img src={third3}></img>
                </Col>
                <Col xs={24} className="firstlearningDiv mob-firstlearningDiv">
                  <Button>Schedule a Consultation</Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>

        <div className="Effect-upstart-bg">
          <div className="home-container">
            <p className="effect-title1">The UpStartPrep Effect</p>
            <p className="effect-title2">The UpStartPrep Effect</p>
            <Row>
              <Col md={10} xs={24}>
                <div className="Effect-upstart-left">
                  <div className="Discover-main">
                    <p>Discover</p>
                    <div className="Discover">
                      <div>
                        <img src={discover} />
                      </div>
                      <p>
                        We initiate each student's journey with a diagnostic and learner assessment test. This dual
                        approach not only acquaints the student with the exam format but also illuminates their unique
                        learning style, setting the stage for tailored success.
                      </p>
                    </div>
                  </div>
                  <div className="Adapt-main">
                    <p>Adapt</p>
                    <div className="adapt">
                      <div>
                        <img src={adapt} />
                      </div>
                      <p>
                        We use the information gathered from the initial assessments to formulate a unique learning
                        plan. In tandem with our adaptive platform that dynamically adjusts to the student, this bespoke
                        approach ensures thorough mastery of the exam material.
                      </p>
                    </div>
                  </div>
                  <div className="Achieve-main">
                    <p>Achieve</p>
                    <div className="achieve">
                      <div>
                        <img src={achieve} />
                      </div>
                      <p>
                        Students reach their targeted outcomes, a direct result of the personalized journey crafted
                        during the Discover and Adapt phases.
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={14} xs={24}>
                <div className="Effect-upstart-right">
                  <div className="Effectvideo-head">
                    <p className="Effectvideo-title">12+</p>
                    <p className="Effectvideo-subtitle">
                      Years <br />
                      Experience
                    </p>
                    <p className="Effectvideo-title">30%</p>
                    <p className="Effectvideo-subtitle">
                      Average
                      <br /> increase in <br />
                      test score
                    </p>
                    <p className="Effectvideo-title">86%</p>
                    <p className="Effectvideo-subtitle">
                      Met or
                      <br /> Exceed <br />
                      Goal Score
                    </p>
                  </div>
                  <video src={Effectvideo} width="100%" height="100%" mute controls></video>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        {/* <div className="whyupstartMainContainer"> */}
        <div className="home-container">
          <div className="featureHomeNewup-main">
            <div className="featureHomeNewup-inner">
              <p>Ready to get started with UpstartPrep?</p>
              <Button onClick={() => history.push('/consultation')}>Schedule a Consultation</Button>
            </div>
          </div>
          <Row style={{ borderTop: '2px solid #27374c' }}>
            <Col md={18} xs={24}>
              <div className="featuresNewHome-Inner">
                <div className="featuresNewHome-Inner-main">
                  <img src={accomplished}></img>
                  <div>
                    <h3>Accomplished</h3>
                    <p>
                      Our team of experts is composed of industry professionals, boasting unparalleled credentials from
                      renowned educational institutions.
                    </p>
                  </div>
                </div>
                <div className="featuresNewHome-Inner-main">
                  <img src={results}></img>
                  <div>
                    <h3>Results</h3>
                    <p>
                      We ensure outstanding results, transforming your child's academic journey with proven teaching
                      methodologies and personalized learning strategies.
                    </p>
                  </div>
                </div>

                <div className="featuresNewHome-Inner-main">
                  <img src={integrity}></img>
                  <div>
                    <h3>Integrity</h3>
                    <p>
                      We uphold the highest standard of integrity by ensuring an honest and transparent approach to your
                      child's academic progression.
                    </p>
                  </div>
                </div>
              </div>
              <div className="featuresNewHome-Inner">
                <div className="featuresNewHome-Inner-main">
                  <img src={inclusivity}></img>
                  <div>
                    <h3>Inclusivity</h3>
                    <p>
                      We provide tailored support for all learners, including those with ADHD, autism, and other
                      learning differences, to nurture their unique potential.
                    </p>
                  </div>
                </div>
                <div className="featuresNewHome-Inner-main">
                  <img src={innovative}></img>
                  <div>
                    <h3>Innovative</h3>
                    <p>
                      {' '}
                      We offer an innovative, industry-exclusive adaptive dashboard, enabling parents, students, and
                      educators to track and enhance learning progress in real-time, even for those with unique learning
                      differences.
                    </p>
                  </div>
                </div>
                <div className="featuresNewHome-Inner-main">
                  <img src={expertise}></img>
                  <div>
                    <h3 className="featuresNewHome_title">Expertise</h3>
                    <p className="featuresNewHome_subtitle">
                      With a stellar track record, we specialize in providing the highest caliber of test prep, uniquely
                      tailored to optimize every learner's success.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6} xs={24}>
              <div className="whyupstarth3-main">
                <div className="whyupstarth3">
                  <h3>Why UpstartPrep?</h3>
                  <Button>Message from our founder</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        {/* </div> */}

        {/* Free Practice Exam */}
        <div className="home-container">
          <Row>
            <Col md={24} xs={24}>
              <p className="practiceExam-bg">
                Free <br /> Practice Exams
              </p>
              <p className="practiceExam-title">
                Free <br /> Practice Exams
              </p>
              <div className="flex-practiceExam">
                <p>ISEE</p>
                <p>SSAT</p>
                <p>PSAT</p>
                <p>SAT</p>
                <p>ACT</p>
                <p>GRE</p>
              </div>
            </Col>
          </Row>
        </div>
        {/* Free Practice Exam */}
        <div className="home-container">
          <Row className="progressbar-Main">
            <div style={{ marginBottom: '20px' }}>
              <img src={running} style={{ width: '100%' }} />
            </div>
            <Col md={12} className="progressbar-Inner" xs={24}>
              <div className="progressbar-InnerDiv">
                <h1>
                  Not sure <br />
                  where to begin?
                </h1>
                <p>
                  Take a{' '}
                  <span style={{ color: '#F4B324' }}>
                    free <br />
                    practice
                  </span>
                  exam!
                </p>
              </div>
            </Col>
            <Col md={12} xs={24}>
              <div className="testCard1HeadingMainHome-Main">
                <div className="testCard1HeadingMainHome">
                  <div className="testCard1Heading-title">
                    <h1 className="title"> Practice Exam One</h1>
                    <span>Free</span>
                  </div>

                  <div className="testinnerCard_div">
                    <div>
                      <FeatherIcon icon="calendar" />
                      <b>Now</b>
                    </div>
                    <img src={vector} />
                    <div>
                      <FeatherIcon icon="calendar" />
                      <b> Whenever</b>
                    </div>
                  </div>
                  <div className="testinnerCard_div cardtest2">
                    <div style={{ width: '48%' }}>
                      <img src={clock2} />
                      <span>20 mins</span>
                    </div>

                    {/* <div style={{ width: '52%', marginLeft: '35px' }}>
                      <img src={message2} />
                      <span>25 Questions</span>
                    </div> */}
                  </div>
                  <div className="Enrolleddiv">
                    <img src={user2} />
                    <span>15 Questions</span>
                  </div>
                  <div className="StandardTimeDiv">
                    <Button className="schedule" style={{ float: 'left' }}>
                      Standard Time
                    </Button>
                    <Button className="schedule bgschedule" style={{ float: 'left' }}>
                      Start Now
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="home-container">
          <Row className="misson-Row">
            <Col md={8} xs={24} className="missonHeading">
              <h1>
                Our <br />
                <span style={{ color: '#F4B324' }}>mission</span>{' '}
              </h1>
            </Col>
            <Col md={16} className="textMissonDiv">
              <p>
                Navigating online tutoring for your child can be complex. Challenges often include finding the right
                tutor, dealing with the high costs of personalized education, and sourcing teaching aids that can
                sometimes confuse rather than clarify. Parents continually grapple with finding a solution that truly
                suits their child's unique learning needs.
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={8} xs={24} className="firstmisson">
              {' '}
              <p>
                That's where UpstartPrep comes in. We've <span style={{ color: '#F4B324' }}>simplified tutor</span>{' '}
                selection and offer <span style={{ color: '#F4B324' }}>affordable, premium tutoring</span>. On our
                advanced, adaptive platform, personalized dashboards cater to each child's unique learning style. Our
                engaging resources are specially chosen to align with individual educational needs.
              </p>
            </Col>
            <Col xs={24} md={8} className="secondmisson">
              <p>
                Our <span style={{ color: '#F4B324' }}>adaptive platform </span>works like a dedicated personal tutor,
                continually learning from each interaction with your child. This learning data is then used to craft{' '}
                <span style={{ color: '#F4B324' }}>individualized learning paths</span> that adapt to the unique needs
                of every student, whether they're excelling or in need of a little extra help.
              </p>
            </Col>
            <Col md={8} xs={24} className="misson">
              <img src={upstartlogo} />
            </Col>
          </Row>
          <Row className="missonbgImage">
            <Col md={24}>
              <img src={missonimg} style={{ width: '100%' }} />
            </Col>
          </Row>
        </div>
        <div className="home-container">
          <Row className="discoverRow">
            <Col md={8} xs={24} className="discoverRow-inner1">
              <h1>
                Above all, UpstartPrep is priced affordably, making it accessible for families of all sizes and budgets.
              </h1>
            </Col>
            <Col md={16}>
              <p>
                At UpstartPrep, we firmly believe in education's transformative power, viewing it not as a privilege but
                as a <span style={{ color: '#F4B324' }}>fundamental right</span>. Guided by this principle, we've
                engineered our tutoring services and platform to become a seamless portal, bridging the knowledge gap
                for students, parents, and educators, sparking curiosity, and encouraging lifelong learning.
              </p>
            </Col>
          </Row>
          <Row className="discoverbgRow">
            <Col md={24} xs={24} className="discoverbgRow-Col">
              <img src={discovestudent} style={{ width: '100%' }} />
              <div className="discoverbgRow-text">
                <p>Discover how we can enhance your students' success and bolster your academic reputation.</p>
                <div className="discoverbgRowIcon">
                  <FeatherIcon icon="arrow-right" />
                </div>
              </div>
            </Col>
            <div className="sportsorg ">
              <img src={sportsOrganizations}></img>
              <p>
                We also work with youth
                <br /> <span style={{ color: '#F4B324' }}>sports organizations.</span>
              </p>
            </div>
          </Row>
        </div>
        {/* Built from the ground UP */}
        <div className="home-container built-ground-space">
          <Row>
            <Col md={24} xs={24}>
              <p className="built-ground-title">
                Built from the gro<span>und UP</span>
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={10} xs={24}>
              <div className="built-ground-main">
                <p className="built-ground-demand">
                  <span>Demand more</span>
                  <br /> from your tutoring services!
                </p>
                <p className="built-ground-des">
                  In a post-COVID world, many test prep companies have resorted to offering mere Zoom links and pdf
                  materials, leaving students feeling shortchanged by the lack of personalized experiences. At
                  UpstartPrep, we refuse to settle for mediocrity. We have built our platform from the ground up,
                  meticulously crafting a <span>transformative learning ecosystem</span> that goes beyond
                  one-size-fits-all approaches. Our platform offers interactive resources, tailored feedback, and a
                  truly customized experience, ensuring that your investment in test prep delivers the results you
                  deserve. Say goodbye to generic solutions and embrace a test preparation journey that ignites your
                  true potential.
                </p>
                <ul className="builtIcon-content">
                  <li>
                    <img src={builtIcon} className="builtIcon" />
                    <p>Track your progress from your phone or desktop.</p>
                  </li>
                  <li>
                    <img src={builtIcon} className="builtIcon" />
                    <p>Take live and scheduled exams from our expert team, right on your dashboard.</p>
                  </li>
                  <li>
                    <img src={builtIcon} className="builtIcon" />
                    <p>Receive dynamic feedback to help you adapt and overcome specific challenges.</p>
                  </li>
                  <li>
                    <img src={builtIcon} className="builtIcon" />
                    <p> additional help? Schedule a session right from the app.</p>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={14} xs={24} style={{ position: 'static' }}>
              <div className="builtDemandRightSec">
                <img src={builtDemandRightSec} />
                <button>Speak with one of our engineers</button>
              </div>
            </Col>
          </Row>
        </div>
        {/* Built from the ground UP End */}
        {/* Upstart Ascend */}
        <div className="Ascend-bg">
          <div className="home-container">
            <Row>
              <Col md={24} xs={24}>
                <div className="Ascend-main">
                  <img src={UpStartAscend} />
                  <div className="titles">
                    <p className="title1">
                      UpStart <br />
                      Ascend
                    </p>
                    <p className="title2">
                      UpStart <br />
                      Ascend
                    </p>
                  </div>
                  <button>Count Me In for Success!</button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12} xs={24}>
                <div className="Ascend-border">
                  <p className="Ascend-equation">
                    The <span>equation</span> for academic success just becomes <span>simpler!</span>
                  </p>
                </div>
              </Col>
              <Col md={12}>
                <p className="Ascend-equation2">
                  Experience the transformative journey of our <span>Upstart Ascend</span> Program. Instead of a
                  stressful, last-minute scramble, we believe in a steady, weekly stride toward success. Through
                  year-round, focused guidance, we prepare students for future standardized exams and empower them with
                  the confidence to excel. Embrace the UpStartPrep way, where we transform daunting academic marathons
                  into empowering learning adventures.
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={24} md={8} className="equation-space">
                <p className="equation-title">MathElevate</p>
                <p className="equation-des">
                  <span>Every week</span>, we focus on empowering students to{' '}
                  <span>master crucial mathematical concepts</span>. We equip learners with the necessary skills and
                  knowledge that lead them to excel in their upcoming standardized exams
                </p>
              </Col>
              <Col xs={24} md={8} className="equation-space">
                <p className="equation-title">MathElevate</p>
                <p className="equation-des">
                  We provide <span>weekly homework assignments</span>. These tasks are designed to reinforce
                  understanding, encourage practice, and foster mastery of key mathematical concepts
                </p>
              </Col>
              <Col xs={24} md={8} className="equation-space">
                <p className="equation-title">MathElevate</p>
                <p className="equation-des">
                  We incorporate <span>progress check-ins</span> to validate understanding,{' '}
                  <span>track improvements</span>, and reinforce key concepts, setting students up for standardized{' '}
                  <span>exam success</span>.
                </p>
              </Col>
            </Row>
          </div>
        </div>
        {/* Upstart Ascend End */}

        <div className="home-container">
          <Row className="upstartsreneMain">
            <Col md={24} xs={24} className="upstartsreneCol">
              <img src={Serene} style={{ width: '100%' }} />
              <div className="upstarttextdiv">
                <h3>UpStart</h3>
                <h3 style={{ marginLeft: '80px', color: '#ffff' }}>Serene</h3>
              </div>
              <div className="btnfree">
                <Button>Download the free guide</Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={10} xs={24} className="SecondfreeGuidediv-First">
              <p>
                Our groundbreaking program blends the <span style={{ color: '#F4B324' }}>art of mindfulness</span> with
                comprehensive test preparation, providing students with the tools to{' '}
                <span style={{ color: '#F4B324' }}>conquer test anxiety, elevate concentration,</span> and unlock their
                full potential. Through a carefully crafted approach that combines mindfulness practices, proven
                strategies, and personalized guidance, UpStart Serene empowers students to cultivate a calm and focused
                mindset, enabling them to perform at their best during exams
              </p>
            </Col>
            <Col md={14} xs={24} className="SecondfreeGuidediv-second">
              <img src={calmfocus} />
            </Col>
          </Row>
        </div>
        <div className="home-container">
          <Row className="valuesRow">
            <Col md={8} xs={24} className="values-firstdiv">
              <p>A proven solution</p>
              <h3>
                UpStart
                <br /> creates value <br /> across the board.
              </h3>
            </Col>

            <Col md={8} xs={24} className="values-firstdiv1">
              <div className="shape-sizes">
                <div className="yellow-shape"></div>
                <div className="skyBlue-shape shapeCenter">
                  <p>
                    "What stands out is how UpStartPrep made the whole prep process seem so manageable, leading to some
                    real proud parent moments on test day."
                  </p>
                  <small>
                    A.M. <br /> Parent
                  </small>
                </div>
                <div className="darkBlue-shape"></div>
              </div>
            </Col>

            <Col md={8} xs={24} className="values-firstdiv2">
              <div className="shape-sizes" style={{ marginTop: '-210px' }}>
                <div className="skyBlue-shape"></div>
                <div className="darkBlue-shape shapeCenter">
                  <p>
                    "Thanks to your smart prep materials, we were able to pinpoint my kid's weak spots, sharpen their
                    skills, and build a ton of confidence."
                  </p>
                  <small>
                    D.K. <br /> Parent
                  </small>
                </div>
                <div className="yellow-shape"></div>
              </div>
            </Col>

            {/* <Col md={18} xs={24} className="values-seconddiv">
              <img src={valuesimage} style={{ width: '100%' }}></img> */}
            {/* <img src={value1} style={{ width: '100%' }}></img>
              <img src={value2} style={{ width: '100%' }}></img> */}
            {/* <div className="values-seconddiv-inner1">
                <p>
                  "What stands out is how UpStartPrep made the whole prep process seem so manageable, leading to some
                  real proud parent moments on test day."
                </p>
                <span>A.M.</span>
                <span>Parent</span>
              </div>
              <div className="values-seconddiv-inner2">
                <p style={{ fontSize: '18px' }}>
                  "Thanks to your smart prep materials, we were able to pinpoint my kid's weak spots, sharpen their
                  skills, and build a ton of confidence."
                </p>
                <span>D.K.</span>
                <span>Parent</span>
              </div>
            </Col> */}
          </Row>
        </div>

        <div className="home-container">
          <Row style={{ borderTop: '2px solid #27374C' }}>
            <Col md={8} xs={24}>
              <div className="Prep_content">
                <h2>UpStart Prep</h2>
                <p>
                  We uplift students to excel,
                  <br /> fostering better academic
                  <br /> outcomes for all.
                </p>
              </div>
            </Col>
            <Col md={8} xs={24}>
              <div className="Prep_content_2">
                <h2>Test Prep</h2>
                <ul>
                  <li>ISEE Prep</li>
                  <li>SSAT Prep</li>
                  <li>HSPT Prep</li>
                  <li>PSAT Prep</li>
                  <li>SAT Prep</li>
                  <li>ACT Prep</li>
                  <li>GRE Prep</li>
                </ul>
              </div>
            </Col>
            <Col md={8} xs={24}>
              <div className="Prep_content_2">
                <h2>Others</h2>
                <ul>
                  <li>Academic Tutoring</li>
                  <li>Executive Functioning</li>
                  <li>School Partnerships</li>
                  <li>Educational Consultants</li>
                  <li>Educational Resources</li>
                  <li>Practice Exams</li>
                  <li>Contact Us</li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
        <div className="lastfooterIMg">
          <img src={lastfooterIMg} />
        </div>
      </Main>
    </>
  );
};

export default HomePage;
