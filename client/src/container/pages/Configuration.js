import React, { useEffect, useState } from 'react';
import { Row, Col, Form, notification, Input, Button, Select, DatePicker } from 'antd';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Main } from '../styled';
import dayjs from 'dayjs';
import 'moment/locale/zh-cn';
import { get_api_request, post_api_request, put_api_request, api_url } from '../../helpers/Common';
import { headers } from '../../helpers/variables';
import FeatherIcon from 'feather-icons-react';
import OfferingCorse from '../../static/img/auth/Offering-corse.png';
import Onlineconsultation from '../../static/img/auth/Online-consultation.png';
import greatinvestment from '../../static/img/auth/great-investment.png';
import zigZag from '../../static/img/zigzag-line.svg';
import million7 from '../../static/img/auth/million7.png';
import primary from '../../static/img/auth/primary.jpg';
import testimonial3 from '../../static/img/auth/testimonial3.jpg';
import qualify1 from '../../static/img/auth/qualify1.jpg';
import qualifyProfile from '../../static/img/auth/qualifyProfile.png';
import data_img2 from '../../static/img/data_img2.png';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { TypeAnimation } from 'react-type-animation';
//import img_src from '../../static/img/uploads/logo/59a679528057.png';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { decrypt } = require('../../helpers/encryption-decryption');

const HomePage = () => {
  const params = useParams();
  const history = useHistory();
  const [form] = Form.useForm();
  const [userid, setUserID] = useState();
  const [CategoryData, setCategoryData] = useState([]);
  const [InstructorData, setInstructorData] = useState([]);
  const [Configdata, setConfigdata] = useState([]);
  const [config, setconfig] = useState([]);
  const [showlogo, setshowlogo] = useState();
  const [Message, setMessage] = useState();
  const [isActive, setIsActive] = useState(false);
  const [isIcon, setisIcon] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [chooosemenu, setchooosemenu] = useState(false);
  const [testprepmenu, settestprepmenu] = useState(false);
  const [Academicmenu, setAcademicmenu] = useState(false);
  const [Strategiesmenu, setStrategiesmenu] = useState(false);
  const [Resourcesmenu, setResourcesmenu] = useState(false);

  const enc_user_detail = Cookies.get('UserDetail');

  const [typingData, settypingData] = useState([]);
  const [newdata, setnewdata] = useState();
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
      var html = [];
      const url = api_url.get_all_configurations;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const configdata = response?.data?.responsedata?.configurations[0].message;
        const configData = response?.data?.responsedata?.configurations[0];
        var loclztion = response?.data?.responsedata?.configurations[0]?.localization_locale;
        const show_logo = response?.data?.responsedata?.configurations[0]?.site_logo;

        setConfigdata(configData);
        setMessage(configdata);
        setshowlogo(show_logo);
        typingData.push(configData);
        //   ShowAnimation(configData);
        html[0] = (
          <TypeAnimation
            sequence={[
              configData?.caption_1,
              1000,
              configData?.caption_2,
              1000,
              configData?.caption_3,
              1000,
              configData?.caption_4,
              1000,
              configData?.caption_5,
              1000,
              configData?.caption_6,
              1000,
            ]}
            repeat={Infinity}
          />
        );

        setnewdata(html);
        const title1 = configData.title_1.split(',');
        var html2 = [];
        html2[0] = (
          <>
            {title1?.[0]} <span>{title1?.[1]}</span>
          </>
        );

        configData.title_1 = html2;
        //Configdata?.title_1
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
    async function GetAllInstructor() {
      const url = api_url.get_allInstructor;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const instructordata = response?.data?.responsedata;
        setInstructorData(instructordata);
      } else {
        console.log('error');
      }
    }
    GetAllInstructor();
    setIsActive(true);
    //    ShowAnimation();
  }, []);

  const handleClick = event => {
    setisIcon(current => !current);
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

  const responsive_testimonial = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
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

  const qualify = {
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
  var textanimation1 = Configdata?.typing_animationtext;
  const myFunction = e => {
    //setIsActive1(true);
  };

  const RedirectToDashboard = () => {
    //to="/dashboard"
    history.push(`/dashboard`);
    window.location.reload();
  };
  return (
    <>
      <Main className="mainSpace">
        <Row gutter={15} style={{ background: '#fff' }}>
          <Col xs={24}>
            <div className="header-main-line">
              <div className="header-main-size">
                <div className="header-main ">
                  <div className="header-main-left">
                    <NavLink className="pass-link" to="/">
                      {showlogo ? (
                        // <img src={require('../../static/img' + showlogo)} loading="lazy" decoding="async" />
                        <img src={showlogo} loading="lazy" decoding="async" />
                      ) : (
                        ''
                      )}
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
                        {/* <NavLink className="pass-links slide-animate" to="/findInstructor">
                          Find instructors
                        </NavLink> */}

                        {/* <div className="main-menu">
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
                        </div> */}

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
        </Row>

        <div className="mainBubbles" style={{ backgroundColor: '#f7f8fc' }}>
          <div className="bubbles">
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>

            <div className="container">
              <Row gutter={15}>
                <Col xs={24} md={12}>
                  <div className="tu-banner_title">
                    <h1>{Configdata?.title}</h1>
                    <h1>{Configdata?.title_line2}</h1>
                    <h1>{Configdata?.title_line3}</h1>
                    <div className="textTyping">
                      <span style={{ fontSize: '2em' }}>
                        <div id="TypeAnimation"> {newdata}</div>
                      </span>

                      {/* {getTyping} */}
                    </div>
                    {/* <div class="wrapper">
                      <div class="typing-demo">{Configdata?.typing_animationtext}</div>
                      <div class="typing-demo">{Configdata?.typing_animationtext2}</div>
                      <div class="typing-demo">{Configdata?.typing_animationtext3}</div>
                    </div> */}
                    <p className="des-header">{Configdata?.sub_title}</p>
                    <div className="startJoin">
                      <Button
                        className="startStudent"
                        onClick={
                          () => {
                            history.push('/consultation');
                          }

                          // history.push({
                          //   pathname: '/register',
                          //   state: 'student',
                          // })
                        }
                      >
                        {Configdata?.cta_text}
                        <FeatherIcon icon="chevron-right" />
                      </Button>
                      <Button
                        className="joinInstruc"
                        onClick={() =>
                          history.push({
                            pathname: '/register',
                            state: 'student',
                          })
                        }
                      >
                        {Configdata?.cta_text2}
                      </Button>
                    </div>

                    <p className="join-shield">
                      <FeatherIcon icon="shield" /> {Configdata?.cta_description}
                    </p>
                  </div>
                </Col>

                <Col xs={24} md={12} style={{ textAlign: 'center' }}></Col>
              </Row>
            </div>

            <div className="topBbannerRyt">
              {Configdata?.image ? (
                <img
                  src={Configdata?.image}
                  // loading="lazy"
                  decoding="async"
                />
              ) : (
                ''
              )}
            </div>

            <div className="tu-dottedimage">
              <img
                //loading="lazy"
                decoding="async"
                src="https://demos.wp-guppy.com/tuturnp/wp-content/uploads/2022/04/img-04.png"
                alt="Image"
              />
            </div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
          </div>
        </div>

        <Row gutter={15} style={{ background: '#fff' }}>
          <Col xs={24}>
            <div className="features-main-line" style={{ background: 'rgb(247, 248, 252)' }}>
              <div className="features-main-size">
                <div className="features-main">
                  <Col xs={24} md={18} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <div className="features-left">
                      {/* {zigZag ? <img src={require('../../static/img' + zigZag)} loading="lazy" decoding="async" /> : ''} */}
                      <p className="site-des">{Configdata?.feature_tagline}</p>
                      <h1>{Configdata?.title_1}</h1>
                      <p className="text-base">{Configdata?.subtitle_1}</p>
                    </div>
                  </Col>

                  <Col xs={24}>
                    <div
                      data-aos="fade-up"
                      data-aos-offset="10"
                      data-aos-delay="50"
                      data-aos-duration="1500"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                      data-aos-anchor-placement="top-center"
                    >
                      <div className="features-inner">
                        <div className="features-inner-left">
                          <div
                            data-aos="zoom-in"
                            data-aos-offset="10"
                            data-aos-delay="50"
                            data-aos-duration="1500"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="true"
                            //data-aos-anchor-placement="top-center"
                          >
                            {Configdata?.icon_url ? (
                              <img src={Configdata?.icon_url} loading="lazy" decoding="async" />
                            ) : (
                              ''
                            )}
                          </div>
                          <div
                            data-aos="zoom-in"
                            data-aos-offset="10"
                            data-aos-delay="50"
                            data-aos-duration="1500"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="true"
                            // data-aos-anchor-placement="top-center"
                          >
                            <p className="sec-title">{Configdata?.caption_1}</p>
                            <p className="sec-des">{Configdata?.description}</p>
                          </div>
                        </div>
                        <div className="features-inner-right">
                          <div
                            className="newCourseImg"
                            data-aos="zoom-in"
                            data-aos-offset="10"
                            data-aos-delay="50"
                            data-aos-duration="1500"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="true"
                            //data-aos-anchor-placement="top-center"
                          >
                            {Configdata?.icon_url_2 ? (
                              <img src={Configdata?.icon_url_2} loading="lazy" decoding="async" />
                            ) : (
                              ''
                            )}
                          </div>
                          <div
                            data-aos="zoom-in"
                            data-aos-offset="10"
                            data-aos-delay="50"
                            data-aos-duration="1500"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="true"
                            //data-aos-anchor-placement="top-center"
                          >
                            <p className="sec-title"> {Configdata?.caption_2}</p>
                            <p className="sec-des">{Configdata?.description_2}</p>
                          </div>
                        </div>
                      </div>

                      <div className="features-inner">
                        <div className="features-inner-left">
                          <div
                            className="newCourseImg"
                            data-aos="zoom-in"
                            data-aos-offset="10"
                            data-aos-delay="50"
                            data-aos-duration="1500"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="true"
                            //data-aos-anchor-placement="top-center"
                          >
                            {Configdata?.icon_url_3 ? (
                              <img src={Configdata?.icon_url_3} loading="lazy" decoding="async" />
                            ) : (
                              ''
                            )}
                          </div>
                          <div
                            data-aos="zoom-in"
                            data-aos-offset="10"
                            data-aos-delay="50"
                            data-aos-duration="1500"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="true"
                            // data-aos-anchor-placement="top-center"
                          >
                            <p className="sec-title"> {Configdata?.caption_3}</p>
                            <p className="sec-des">{Configdata?.description_3}</p>
                          </div>
                        </div>

                        <div className="features-inner-right">
                          <div
                            className="newCourseImg"
                            data-aos="zoom-in"
                            data-aos-offset="10"
                            data-aos-delay="50"
                            data-aos-duration="1500"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="true"
                            // data-aos-anchor-placement="top-center"
                          >
                            {Configdata?.icon_url_4 ? (
                              <img src={Configdata?.icon_url_4} loading="lazy" decoding="async" />
                            ) : (
                              ''
                            )}
                          </div>
                          <div
                            data-aos="zoom-in"
                            data-aos-offset="10"
                            data-aos-delay="50"
                            data-aos-duration="1500"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="true"
                            //data-aos-anchor-placement="top-center"
                          >
                            <p className="sec-title"> {Configdata?.caption_4}</p>
                            <p className="sec-des">{Configdata?.description_4}</p>
                          </div>
                        </div>
                      </div>
                      <div className="features-inner">
                        <div className="features-inner-left">
                          <div
                            className="newCourseImg"
                            data-aos="zoom-in"
                            data-aos-offset="10"
                            data-aos-delay="50"
                            data-aos-duration="1500"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="true"
                            //data-aos-anchor-placement="top-center"
                          >
                            {Configdata?.icon_url_5 ? (
                              <img src={Configdata?.icon_url_5} loading="lazy" decoding="async" />
                            ) : (
                              ''
                            )}
                          </div>
                          <div
                            data-aos="zoom-in"
                            data-aos-offset="10"
                            data-aos-delay="50"
                            data-aos-duration="1500"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="true"
                            //data-aos-anchor-placement="top-center"
                          >
                            <p className="sec-title"> {Configdata?.caption_5}</p>
                            <p className="sec-des">{Configdata?.description_5}</p>
                          </div>
                        </div>

                        <div className="features-inner-right">
                          <div
                            className="newCourseImg"
                            data-aos="zoom-in"
                            data-aos-offset="10"
                            data-aos-delay="50"
                            data-aos-duration="1500"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="true"
                            //data-aos-anchor-placement="top-center"
                          >
                            {Configdata?.icon_url_6 ? (
                              <img src={Configdata?.icon_url_6} loading="lazy" decoding="async" />
                            ) : (
                              ''
                            )}
                          </div>
                          <div
                            data-aos="zoom-in"
                            data-aos-offset="10"
                            data-aos-delay="50"
                            data-aos-duration="1500"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="true"
                            // data-aos-anchor-placement="top-center"
                          >
                            <p className="sec-title"> {Configdata?.caption_6}</p>
                            <p className="sec-des">{Configdata?.description_6}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24}>
                    <div class="tu-primbtn-lg">
                      <Button onClick={() => history.push('/consultation')}>
                        Schedule A Consultation <FeatherIcon icon="lock" />
                      </Button>
                    </div>
                  </Col>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={15} style={{ background: '#fff' }}>
          <Col xs={24}>
            <div className="features-main-line new4courses">
              <div className="features-main-size">
                <div className="features-main ">
                  <Col xs={24}>
                    <div
                      data-aos="fade-up"
                      data-aos-offset="10"
                      data-aos-delay="50"
                      data-aos-duration="1500"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                      data-aos-anchor-placement="top-center"
                    >
                      <div className="features-inner">
                        <div className="features-inner-left">
                          {/* <img src={domainpath + ConfigData?.icon_url} /> */}
                          <div
                            className="newCourseImg"
                            data-aos="zoom-in"
                            data-aos-offset="10"
                            data-aos-delay="50"
                            data-aos-duration="1500"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="true"
                          >
                            {OfferingCorse ? <img src={OfferingCorse} loading="lazy" decoding="async" /> : ''}
                          </div>
                          <div
                            data-aos="zoom-in"
                            data-aos-offset="10"
                            data-aos-delay="50"
                            data-aos-duration="1500"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="true"
                          >
                            <p className="sec-title">{Configdata?.statistic1_count}</p>
                            <p className="sec-des">{Configdata?.statistic1_name}</p>
                            {/* <p className="sec-title">560,616</p>
                            <p className="sec-des">Courses available for verified and top tutors</p> */}
                          </div>
                        </div>

                        <div className="features-inner-right">
                          {/* <img src={domainpath + ConfigData?.icon_url_2} /> */}
                          <div
                            className="newCourseImg"
                            data-aos="zoom-in"
                            data-aos-offset="10"
                            data-aos-delay="50"
                            data-aos-duration="1500"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="true"
                          >
                            <img src={Onlineconsultation} loading="lazy" decoding="async" style={{ width: '55px' }} />
                          </div>
                          <div
                            data-aos="zoom-in"
                            data-aos-offset="10"
                            data-aos-delay="50"
                            data-aos-duration="1500"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="true"
                          >
                            <p className="sec-title"> {Configdata?.statistic2_count}</p>
                            <p className="sec-des">{Configdata?.statistic2_name}</p>
                            {/* <p className="sec-title">648,482</p>
                            <p className="sec-des">Total tuition job posted on the platform till date</p> */}
                          </div>
                        </div>
                      </div>

                      <div className="features-inner">
                        <div className="features-inner-left">
                          {/* <img src={domainpath + ConfigData?.icon_url_3} /> */}
                          <div
                            className="newCourseImg"
                            data-aos="zoom-in"
                            data-aos-offset="10"
                            data-aos-delay="50"
                            data-aos-duration="1500"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="true"
                          >
                            <img src={greatinvestment} loading="lazy" decoding="async" />
                          </div>
                          <div
                            data-aos="zoom-in"
                            data-aos-offset="10"
                            data-aos-delay="50"
                            data-aos-duration="1500"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="true"
                          >
                            <p className="sec-title"> {Configdata?.statistic3_count}</p>
                            <p className="sec-des">{Configdata?.statistic3_name}</p>
                            {/* <p className="sec-title">20+ Hours</p>
                            <p className="sec-des">User daily average time spent on the platform</p> */}
                          </div>
                        </div>

                        <div className="features-inner-right">
                          {/* <img src={domainpath + ConfigData?.icon_url_4} /> */}
                          <div
                            className="newCourseImg"
                            data-aos="zoom-in"
                            data-aos-offset="10"
                            data-aos-delay="50"
                            data-aos-duration="1500"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="true"
                          >
                            <img src={million7} loading="lazy" decoding="async" />
                          </div>
                          <div
                            data-aos="zoom-in"
                            data-aos-offset="10"
                            data-aos-delay="50"
                            data-aos-duration="1500"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="true"
                          >
                            <p className="sec-title"> {Configdata?.statistic4_count}</p>
                            <p className="sec-des">{Configdata?.statistic4_name}</p>
                            {/* <p className="sec-title">7+ Million</p>
                            <p className="sec-des">Active instructor and students available on the platform</p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <div className="my-5" style={{ margin: '20px 0px' }}>
          <div className="container">
            <Row>
              <Col lg={12}>
                <div
                  className="our_app"
                  data-aos="fade-up"
                  data-aos-offset="10"
                  data-aos-delay="50"
                  data-aos-duration="1500"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="true"
                  data-aos-anchor-placement="top-center"
                >
                  <h2>Our Approach to One-On-One Tutoring</h2>
                  <p>
                    As a UpstartPrep, you get more than a tutor. You have an entire team of experts dedicated to your
                    student’s success. Your program director serves as your personal advisor and carefully matches your
                    student with one of our expert tutors. In addition, our vast network of resources — including proven
                    proprietary course materials and curricula — is always accessible to you along the way.
                  </p>
                  <p>
                    We recognize that every student is unique — in personality, learning style, in goals. That is why we
                    customize each of our programs to fit the individual, putting the student’s well-being front and
                    center.
                  </p>
                </div>
              </Col>
              <Col lg={12}>
                <div
                  className="data_pimg"
                  data-aos="flip-right"
                  data-aos-offset="10"
                  data-aos-delay="50"
                  data-aos-duration="1500"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="true"
                  data-aos-anchor-placement="top-center"
                >
                  <img src={data_img2} loading="lazy" decoding="async" />
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
                  <p>{Configdata?.our_program_title}</p>

                  <p>{Configdata?.our_program_subtitle}</p>
                </div>
              </Col>
              <Col md={8}>
                <div
                  className="program-card"
                  data-aos="flip-left"
                  data-aos-offset="10"
                  data-aos-delay="50"
                  data-aos-duration="1500"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="true"
                  data-aos-anchor-placement="top-center"
                >
                  <div className="program-inner">
                    <p className="program-inner-title">{Configdata?.program1_title}</p>
                    <p className="program-inner-des">{Configdata?.program1_subtitle}</p>
                    <hr />
                    <div className="fully-schedule">
                      {Configdata?.program1_feture_icon1 ? (
                        <img src={Configdata?.program1_feture_icon1} loading="lazy" decoding="async" />
                      ) : (
                        ''
                      )}
                      {/* <FeatherIcon icon="calendar" /> */}
                      <p>{Configdata?.program1_feture_text1}</p>
                    </div>
                    <div className="fully-schedule">
                      {/* <FeatherIcon icon="user" /> */}
                      {Configdata?.program1_feture_icon2 ? (
                        <img src={Configdata?.program1_feture_icon2} loading="lazy" decoding="async" />
                      ) : (
                        ''
                      )}
                      <p>{Configdata?.program1_feture_text2}</p>
                    </div>
                    <div className="fully-schedule">
                      {Configdata?.program1_feture_icon3 ? (
                        <img src={Configdata?.program1_feture_icon3} loading="lazy" decoding="async" />
                      ) : (
                        ''
                      )}
                      {/* <FeatherIcon icon="dollar-sign" /> */}
                      <div className="fully-schedule2">
                        <p>{Configdata?.program1_feture_text3}</p>
                        {/* <p>For 12 hours</p> */}
                      </div>
                    </div>
                    <hr />
                    <button className="program-btn">Learn More</button>
                  </div>
                </div>
              </Col>

              <Col md={8}>
                <div
                  className="program-card"
                  data-aos="zoom-in-up"
                  data-aos-offset="10"
                  data-aos-delay="50"
                  data-aos-duration="1500"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="true"
                  data-aos-anchor-placement="top-center"
                >
                  <div className="program-inner">
                    <p className="program-inner-title">Tutori{Configdata?.program2_title}ng</p>
                    <p className="program-inner-des">{Configdata?.program2_subtitle}</p>
                    <hr />
                    <div className="fully-schedule">
                      {Configdata?.program2_feture_icon1 ? (
                        <img src={Configdata?.program2_feture_icon1} loading="lazy" decoding="async" />
                      ) : (
                        ''
                      )}
                      <p>{Configdata?.program2_feture_text1}</p>
                    </div>
                    <div className="fully-schedule">
                      {Configdata?.program2_feture_icon2 ? (
                        <img src={Configdata?.program2_feture_icon2} loading="lazy" decoding="async" />
                      ) : (
                        ''
                      )}
                      <p>{Configdata?.program2_feture_text2}</p>
                    </div>
                    <div className="fully-schedule">
                      {Configdata?.program2_feture_icon3 ? (
                        <img src={Configdata?.program2_feture_icon3} loading="lazy" decoding="async" />
                      ) : (
                        ''
                      )}
                      {/* <FeatherIcon icon="dollar-sign" /> */}
                      <div className="fully-schedule2">
                        <p>{Configdata?.program2_feture_text3}</p>
                        {/* <p>For 12 hours</p> */}
                      </div>
                    </div>
                    <hr />
                    <button className="program-btn">Learn More</button>
                  </div>
                </div>
              </Col>

              <Col md={8}>
                <div
                  className="program-card"
                  data-aos="flip-right"
                  data-aos-offset="10"
                  data-aos-delay="50"
                  data-aos-duration="1500"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="true"
                  data-aos-anchor-placement="top-center"
                >
                  <div className="program-inner">
                    <p className="program-inner-title">{Configdata?.program3_title}</p>
                    <p className="program-inner-des">{Configdata?.program3_subtitle}</p>
                    <hr />
                    <div className="fully-schedule">
                      {Configdata?.program3_feture_icon1 ? (
                        <img src={Configdata?.program3_feture_icon1} loading="lazy" decoding="async" />
                      ) : (
                        ''
                      )}
                      {/* <FeatherIcon icon="calendar" /> */}
                      <p>{Configdata?.program3_feture_text1}</p>
                    </div>
                    <div className="fully-schedule">
                      {Configdata?.program3_feture_icon2 ? (
                        <img src={Configdata?.program3_feture_icon2} loading="lazy" decoding="async" />
                      ) : (
                        ''
                      )}
                      <p>{Configdata?.program3_feture_text2}</p>
                    </div>
                    <div className="fully-schedule">
                      {/* <img src={program_price} /> */}
                      {Configdata?.program3_feture_icon3 ? (
                        <img src={Configdata?.program3_feture_icon3} loading="lazy" decoding="async" />
                      ) : (
                        ''
                      )}
                      {/* <FeatherIcon icon="dollar-sign" /> */}
                      <div className="fully-schedule2">
                        <p>{Configdata?.program3_feture_text3}</p>
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

        <Row gutter={15} style={{ background: '#fff' }}>
          <Col xs={24}>
            <div className="features-main-line">
              <div className="features-main-size">
                <div className="features-main">
                  <Col xs={24} md={18} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <div className="features-left">
                      <img src={zigZag} loading="lazy" decoding="async" />
                      <p className="site-des">Let’s make a quick start today</p>
                      <h1>Choose from the top visited categories you may like</h1>
                      <p className="text-base">
                        Accusamus et iusidio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque
                        corrupti quos dolores etmquasa molestias epturi sint occaecati cupiditate non providente mikume
                        molareshe.
                      </p>
                    </div>
                  </Col>

                  <Col xs={24} className="custm-multi-slide">
                    <Carousel responsive={responsive}>
                      {CategoryData?.map((item, index) => (
                        <div className="slide-image" onClick={() => history.push(`/findInstructor`)}>
                          <img src={primary} loading="lazy" decoding="async" />
                          <div className="slide-content">
                            <div class="middle">
                              <FeatherIcon icon="plus" />
                            </div>
                            <div className="slide-cont-inner">
                              <h3>{item.sub_category_name}</h3>
                              <p>46 Listings</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Carousel>
                  </Col>

                  <Col xs={24}>
                    <div class="tu-primbtn-lg">
                      <Button onClick={() => history.push(`/login`)}>
                        Explore All categories <FeatherIcon icon="chevron-right" />
                      </Button>
                    </div>
                  </Col>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row gutter={15} style={{ background: '#fff' }}>
          <Col xs={24} className="testimonialBG">
            <div className="features-main-size">
              <div className="features-main">
                <div className="testimonial-title">
                  <p>
                    {Configdata?.testimonial_title} <span>{Configdata?.testimonial_subtitle}</span>
                  </p>
                </div>

                <Carousel responsive={responsive_testimonial}>
                  <div className="testimonial-mainn">
                    {Configdata?.testimonial1_image ? (
                      <img src={Configdata?.testimonial1_image} loading="lazy" decoding="async" />
                    ) : (
                      ''
                    )}
                    <h5>On first project I feel its a mess then later it turn into an great details for me</h5>
                    <blockquote>{Configdata?.testimonial1_message}</blockquote>
                    <h4> {Configdata?.testimonial1_name}</h4>
                    <span>{Configdata?.testimonial1_designation}</span>
                  </div>

                  <div className="testimonial-mainn">
                    {Configdata?.testimonial2_image ? (
                      <img src={Configdata?.testimonial2_image} loading="lazy" decoding="async" />
                    ) : (
                      ''
                    )}
                    <h5>I highly recommend this platform, amazing experience with fast delivery</h5>
                    <blockquote>{Configdata?.testimonial2_message}</blockquote>
                    <h4> {Configdata?.testimonial2_name}</h4>
                    <span>{Configdata?.testimonial2_designation}</span>
                  </div>

                  <div className="testimonial-mainn">
                    <img src={testimonial3} loading="lazy" decoding="async" />
                    <h5>I really can imagin how professional they are. Just amazing experience</h5>
                    <blockquote>
                      “ There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                      alteration in some form, by injected humour, or randomised words which don't look. “
                    </blockquote>
                    <h4>Bobbie Schwartz</h4>
                    <span>2nd Standard, Manchester UK</span>
                  </div>
                </Carousel>
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={15} style={{ background: '#fff' }}>
          <Col xs={24}>
            <div className="features-main-line">
              <div className="features-main-size">
                <div className="features-main">
                  <Col xs={24} md={18} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <div className="features-left">
                      <img src={zigZag} loading="lazy" decoding="async" />
                      <p className="site-des">{Configdata?.title_instructor}</p>
                      <h1>{Configdata?.title_main_instructor}</h1>
                      <p className="text-base">{Configdata?.subtitle_instrcutor}</p>
                    </div>
                  </Col>

                  <Col xs={24} className="custm-multi-slide">
                    <Carousel responsive={qualify}>
                      {InstructorData?.map((item, index) => (
                        <div className="main-qualify-slide tu-featureitem">
                          <div className="qualify-slide">
                            <div className="qualify-slide-inner">
                              <div className="qualify-slide-img">
                                <img src={qualify1} loading="lazy" decoding="async" />
                                <span class="tu-featuretag">FEATURED</span>
                              </div>

                              <div className="qualify-slide-cont">
                                <div className="qualify-slide-cont-first">
                                  <img src={qualifyProfile} loading="lazy" decoding="async" />
                                  <div>
                                    <h5>
                                      {' '}
                                      <a>{item?.first_Name}</a> <FeatherIcon icon="check-circle" />
                                    </h5>
                                    <span>Phoenix, MN</span>
                                  </div>
                                </div>

                                <div className="qualify-slide-cont-first">
                                  <ul className="tu-authorlist">
                                    <li>
                                      <span>
                                        Starting from:<em>$77.00/hr</em>
                                      </span>
                                    </li>

                                    <li>
                                      <span>
                                        Mobile:<em>{item?.phone}</em>
                                      </span>
                                    </li>

                                    <li>
                                      <span>
                                        Whatsapp:<em>132414</em>
                                      </span>
                                    </li>

                                    <li>
                                      <span>
                                        Qualification:<em>MBBS</em>
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              <div className="tu-instructors_footer">
                                <div className="tu-rating" style={{ alignItems: 'center' }}>
                                  <h6>5.0</h6>
                                  <FeatherIcon icon="star" className="yellowStar" />
                                  <span>(06)</span>
                                </div>
                                <div className="tu-instructors_footer-right">
                                  <a
                                    className="tu-linkheart"
                                    href="javascript:void(0);"
                                    data-user_id="0"
                                    data-profile_id="334"
                                  >
                                    <FeatherIcon icon="heart" />
                                    <span></span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Carousel>
                  </Col>

                  <Col xs={24}>
                    <div class="tu-primbtn-lg">
                      <Button onClick={() => history.push(`/findInstructor`)}>
                        Explore all instructors <FeatherIcon icon="chevron-right" />
                      </Button>
                    </div>
                  </Col>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* <Row gutter={15} style={{ background: '#fff' }}>
          <Col xs={24}> */}
        <div className="features-main-line footer-bg">
          <div className="features-main-size">
            <div className="features-main">
              <div className="main-footer">
                <img src={zigZag} loading="lazy" decoding="async" />
                <p className="text-base">Explore from our huge collection</p>
                <h2>Approach tutors near to your house</h2>
              </div>

              <Row className="footer-row">
                <Col
                  md={6}
                  data-aos="zoom-in"
                  data-aos-offset="10"
                  data-aos-delay="900ms"
                  data-aos-duration="1000"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="true"
                  // data-aos-anchor-placement="top-center"
                >
                  <p className="footer-title">
                    <a href="">Home</a>
                  </p>
                  <div className="footer-inner">
                    <ul className="tu-footerlist">
                      <li>
                        <a href="">
                          <p>
                            <FeatherIcon icon="check" /> Private Tutoring
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </a>
                      </li>
                      <li>
                        <a href="">
                          <p>
                            <FeatherIcon icon="check" /> Academic Tutoring
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </a>
                      </li>
                      <li>
                        <a href="">
                          <p>
                            <FeatherIcon icon="check" /> Admissions Tutoring
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>

                <Col
                  md={6}
                  data-aos="zoom-in"
                  data-aos-offset="10"
                  data-aos-delay="400ms"
                  data-aos-duration="1000"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="true"
                  // data-aos-anchor-placement="top-center"
                >
                  <p className="footer-title">
                    <a href="">Choose Upstart</a>
                  </p>
                  <div className="footer-inner">
                    <ul className="tu-footerlist">
                      <li>
                        <a href="">
                          <p>
                            <FeatherIcon icon="check" /> The Upstart Effect
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </a>
                      </li>
                      <li>
                        <NavLink to="/findInstructor">
                          <p>
                            <FeatherIcon icon="check" /> Find Instructor
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                      <li>
                        <a href="">
                          <p>
                            <FeatherIcon icon="check" /> Letter From Our Founder
                          </p>{' '}
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </a>
                      </li>
                      <li>
                        <a href="">
                          <p>
                            <FeatherIcon icon="check" /> FAQs
                          </p>{' '}
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>

                <Col
                  md={6}
                  data-aos="zoom-in"
                  data-aos-offset="10"
                  data-aos-delay="400ms"
                  data-aos-duration="1000"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="true"
                  // data-aos-anchor-placement="top-center"
                >
                  <p className="footer-title">
                    <a href="">Academic Tutoring</a>
                  </p>
                  <div className="footer-inner">
                    <ul className="tu-footerlist">
                      <li>
                        <NavLink to="/">
                          <p>
                            <FeatherIcon icon="check" /> Math
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/">
                          <p>
                            <FeatherIcon icon="check" /> Science
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/">
                          <p>
                            <FeatherIcon icon="check" /> English
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/">
                          <p>
                            <FeatherIcon icon="check" /> History & Social Science
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </Col>

                <Col
                  md={6}
                  data-aos="zoom-in"
                  data-aos-offset="10"
                  data-aos-delay="900ms"
                  data-aos-duration="1000"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="true"
                  // data-aos-anchor-placement="top-center"
                >
                  <p className="footer-title">
                    <a href="">Resources</a>
                  </p>
                  <div className="footer-inner">
                    <ul className="tu-footerlist">
                      <li>
                        <NavLink to="/blog">
                          <p>
                            <FeatherIcon icon="check" /> Blogs
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/">
                          <p>
                            <FeatherIcon icon="check" /> Webnars
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/">
                          <p>
                            <FeatherIcon icon="check" /> Practice Exams
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/">
                          <p>
                            <FeatherIcon icon="check" /> Videos
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/">
                          <p>
                            <FeatherIcon icon="check" /> Educator Resources
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>

              <Row className="footer-row footer-row-mt">
                <Col
                  md={6}
                  data-aos="zoom-in"
                  data-aos-offset="10"
                  data-aos-delay="900ms"
                  data-aos-duration="1000"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="true"
                  //data-aos-anchor-placement="top-center"
                >
                  <p className="footer-title">
                    <a href="">Strategies</a>
                  </p>
                  <div className="footer-inner">
                    <ul className="tu-footerlist">
                      <li>
                        <NavLink to="/">
                          <p>
                            <FeatherIcon icon="check" /> Executive Function/Mindfulness
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/">
                          <p>
                            <FeatherIcon icon="check" /> School Partnerships
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/">
                          <p>
                            <FeatherIcon icon="check" /> Youth Sport Partnership
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/">
                          <p>
                            <FeatherIcon icon="check" /> Educational Consultants
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/">
                          <p>
                            <FeatherIcon icon="check" /> Math Enrichment
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/">
                          <p>
                            <FeatherIcon icon="check" /> Congnitive Learning Assesment
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </Col>

                <Col
                  md={6}
                  data-aos="zoom-in"
                  data-aos-offset="10"
                  data-aos-delay="600ms"
                  data-aos-duration="1000"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="true"
                  // data-aos-anchor-placement="top-center"
                >
                  <p className="footer-title">
                    <a href="">Test Prep</a>
                  </p>
                  <div className="footer-inner">
                    <ul className="tu-footerlist">
                      <li>
                        <NavLink to="/preppage">
                          <p>
                            <FeatherIcon icon="check" /> SAT Prep
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/act">
                          <p>
                            <FeatherIcon icon="check" /> ACT Prep
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/preppage">
                          <p>
                            <FeatherIcon icon="check" /> ISEE Prep
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/preppage">
                          <p>
                            <FeatherIcon icon="check" /> SSAT Prep
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/preppage">
                          <p>
                            <FeatherIcon icon="check" /> HSPT Prep
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/preppage">
                          <p>
                            <FeatherIcon icon="check" /> PSAT Prep
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/preppage">
                          <p>
                            <FeatherIcon icon="check" /> GRE Prep
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </Col>

                <Col
                  md={6}
                  data-aos="zoom-in"
                  data-aos-offset="10"
                  data-aos-delay="600ms"
                  data-aos-duration="1000"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="true"
                  // data-aos-anchor-placement="top-center"
                >
                  <p className="footer-title">
                    <NavLink to="/contact-us">Contact Us</NavLink>
                  </p>
                  <div className="footer-inner">
                    <ul className="tu-footerlist">
                      <li>
                        <NavLink to="/contact-us">
                          <p>
                            <FeatherIcon icon="check" /> Contact Us
                          </p>
                          {/* <span>
                                <FeatherIcon icon="arrow-right" />
                              </span> */}
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        {/* </Col>
        </Row> */}

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

export default HomePage;
