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
import upstart from '../../static/img/auth/upstart.png';
import hero_BG from '../../static/img/auth/home-hero-img.png';
import features from '../../static/img/auth/48x48.png';
import videoLessons from '../../static/img/video-lessons.png';
import QuestionBank from '../../static/img/Question-bank.png';
import PrivateTutoring from '../../static/img/Private-Tutoring.png';
import MockTests from '../../static/img/Mock-Tests.png';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const CategoryExplore = () => {
  const enc_user_detail = Cookies.get('UserDetail');
  const [ConfigData, setConfigData] = useState([]);
  const [showlogo, setshowlogo] = useState();
  const [CategoryData, setCategoryData] = useState([]);
  const [Message, setMessage] = useState();
  const history = useHistory();
  const params = useParams();
  var parms_id = params?.id;
  useEffect(() => {
    async function GetConfiguration() {
      const url = api_url.get_all_configurations;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const configdata = response?.data?.responsedata?.configurations[0].message;
        const configData = response?.data?.responsedata?.configurations[0];
        setConfigData(configData);
        setMessage(configdata);
        const show_logo = response?.data?.responsedata?.configurations[0]?.site_logo;
        setshowlogo(show_logo);
      } else {
        console.log('error');
      }
    }
    GetConfiguration();
    async function GetPrcaticeByID() {
      const url = api_url.get_subcategory_id + parms_id;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const subCategoryData = response?.data?.responsedata?.[0];
        setCategoryData(subCategoryData);
      } else {
        console.log('error');
      }
    }
    GetPrcaticeByID();
  }, []);
  console.log(CategoryData);

  return (
    <>
      <Main className="mainSpace">
        <Row gutter={15} style={{ background: '#fff' }}>
          <Col xs={24}>
            <div className="head-main-line">
              <div className="head-main-size">
                <div className="head-main">
                  <div className="head-main-left">
                    <svg
                      className=""
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      {' '}
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                      ></path>{' '}
                    </svg>
                    <p>{ConfigData?.message}</p>
                  </div>

                  <div className="head-main-right">
                    <button>Details</button>
                    <svg
                      className="h-6 w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      {' '}
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>{' '}
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col xs={24}>
            <div className="header-main-line">
              <div className="header-main-size">
                <div className="header-main">
                  <div className="header-main-left">
                    <NavLink className="pass-link" to="/">
                      <img src={domainpath + showlogo} />
                    </NavLink>
                  </div>
                  <div className="header-main-right">
                    <div className="header-nav">
                      <div className="main-menu">
                        <NavLink className={isActive ? 'homeMenus' : 'pass-links slide-animate'} to="/">
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
                            <a className="pass-links" href="/explore">
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

                      <NavLink className="pass-links slide-animate" to="/contact-us">
                        Contact Us
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

            <div className="mob-header" style={{ display: 'none' }}>
              <div id="nav-container">
                <div className="mob-header-inner">
                  <div class="hem-button" tabindex="0">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </div>
                  <NavLink className="pass-link" to="/">
                    <img src={domainpath + ConfigData?.site_logo} />
                  </NavLink>
                </div>

                <div id="nav-content" tabindex="0">
                  <div className="crossMob">
                    <svg
                      class="h-6 w-6"
                      x-description="Heroicon name: outline/x"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </div>
                  <ul>
                    <li>
                      <a className="pass-link" href="#explore">
                        Explore
                      </a>
                    </li>
                    <li>
                      <NavLink className="pass-link" to="/">
                        Learn & Practice
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="pass-link" to="/">
                        Quizzes
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="pass-link" to="/pricing">
                        Pricing
                      </NavLink>
                    </li>
                    <div className="login-mob">
                      <li>
                        <NavLink className="pass-link" to="/login">
                          Login
                        </NavLink>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={15} style={{ background: '#fff' }}>
          <Col xs={24}>
            <div className="hero-main-line">
              <div className="hero-main-size">
                <div className="hero-main">
                  <div className="hero-left category-explore-left">
                    <div
                      data-aos="fade-right"
                      data-aos-offset="10"
                      data-aos-delay="50"
                      data-aos-duration="1500"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                      data-aos-anchor-placement="top-center"
                    >
                      <img src={hero_BG} className="mover" />
                    </div>
                  </div>
                  <div className="hero-right category-explore-right">
                    <div
                      data-aos="zoom-in"
                      data-aos-offset="10"
                      data-aos-delay="50"
                      data-aos-duration="1500"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                      data-aos-anchor-placement="top-center"
                    >
                      <span className="subsStart">
                        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M0 0h24v24H0V0z" fill="none"></path>
                          <path d="M4 6h16v2H4zm2-4h12v2H6zm14 8H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm0 10H4v-8h16v8zm-10-7.27v6.53L16 16z"></path>
                        </svg>
                        Subscription starts from $/month
                      </span>
                      <h1>{CategoryData?.sub_category_name}</h1>
                      <p>{CategoryData?.short_description}</p>
                      <div style={{ marginTop: '40px' }}>
                        <a href="#pricing">View Pricing</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={15} style={{ background: '#fff' }}>
          <Col xs={24}>
            <div className="features-main-line">
              <div className="features-main-size">
                <div className="features-main">
                  <div className="features-left">
                    <p className="text-base">FEATURES</p>
                    <h1>{ConfigData?.title_1}</h1>
                    <p className="site-des">{ConfigData?.subtitle_1}</p>
                  </div>

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
                        <img src={ConfigData?.icon_url} />
                        <div>
                          <p className="sec-title">{ConfigData?.caption_1}</p>
                          <p className="sec-des">{ConfigData?.description}</p>
                        </div>
                      </div>

                      <div className="features-inner-right">
                        <img src={ConfigData?.icon_url_2} />
                        <div>
                          <p className="sec-title"> {ConfigData?.caption_2}</p>
                          <p className="sec-des">{ConfigData?.description_2}</p>
                        </div>
                      </div>
                    </div>

                    <div className="features-inner">
                      <div className="features-inner-left">
                        <img src={ConfigData?.icon_url_3} />
                        <div>
                          <p className="sec-title"> {ConfigData?.caption_3}</p>
                          <p className="sec-des">{ConfigData?.description_3}</p>
                        </div>
                      </div>

                      <div className="features-inner-right">
                        <img src={ConfigData?.icon_url_4} />
                        <div>
                          <p className="sec-title"> {ConfigData?.caption_4}</p>
                          <p className="sec-des">{ConfigData?.description_4}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={15} style={{ background: '#fff' }} id="pricing">
          <Col xs={24}>
            <div className="features-main-line greybg">
              <div className="features-main-size">
                <div className="features-main">
                  <div className="features-left">
                    <p className="text-base">PRICING</p>
                    <h1>{CategoryData?.sub_category_name} Subscription Plans</h1>
                    <p className="site-des">To be paid as a one-time payment.</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={15} style={{ background: '#fff' }}>
          <Col xs={24}>
            <div className="features-main-size">
              <div className="features-main">
                <div className="features-left">
                  <p className="text-base">TESTIMONIALS</p>
                  <h1> {ConfigData?.testimonial_title}</h1>
                  <p className="site-des">{ConfigData?.testimonial_subtitle}</p>
                </div>

                <div className="testimonial-main">
                  <div className="testimonial-left">
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
                      <div className="testimonial-box">
                        <svg
                          class="rtl:flip"
                          width="25"
                          height="27"
                          viewBox="0 0 25 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0)">
                            <path
                              d="M24.5767 14.331H18.6157C18.7176 9.55831 19.9498 9.01654 21.4974 8.86191L22.0942 8.78063V3.53254L21.4063 3.57304C19.3854 3.69795 17.1512 4.09818 15.6605 6.11977C14.3539 7.89195 13.7778 10.7872 13.7778 15.2317V23.4674H24.5767V14.331Z"
                              fill="currentColor"
                            ></path>
                            <path
                              d="M10.7988 23.4674V14.331H4.91744C5.01934 9.55831 6.21168 9.01654 7.75927 8.86191L8.31634 8.78063V3.53254L7.66816 3.57304C5.64729 3.69795 3.39306 4.09818 1.90245 6.11977C0.595916 7.89195 -5.72205e-06 10.7872 -5.72205e-06 15.2317V23.4674H10.7988Z"
                              fill="currentColor"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0">
                              <rect
                                width="24.5767"
                                height="27"
                                fill="white"
                                transform="translate(24.5767 27) rotate(-180)"
                              ></rect>
                            </clipPath>
                          </defs>
                        </svg>
                        <p>{ConfigData?.testimonial1_message}</p>
                        <div className="testi-before">
                          <svg
                            width="23"
                            height="22"
                            viewBox="0 0 23 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect x="1" width="20" height="21" fill="white"></rect>
                            <path
                              d="M21.5 6L11.5 21L1 6"
                              stroke="#E5E7EB"
                              stroke-linecap="square"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </div>

                      <div className="testi-bottom">
                        <img src="https://ui-avatars.com/api/?name=Sarah+Meyer" />
                        <div className="testi-bot-txt">
                          <p className="testi-name"> {ConfigData?.testimonial1_name} </p>
                          <p className="testi-desig"> {ConfigData?.testimonial1_designation} </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="testimonial-right">
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
                      <div className="testimonial-box">
                        <svg
                          class="rtl:flip"
                          width="25"
                          height="27"
                          viewBox="0 0 25 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0)">
                            <path
                              d="M24.5767 14.331H18.6157C18.7176 9.55831 19.9498 9.01654 21.4974 8.86191L22.0942 8.78063V3.53254L21.4063 3.57304C19.3854 3.69795 17.1512 4.09818 15.6605 6.11977C14.3539 7.89195 13.7778 10.7872 13.7778 15.2317V23.4674H24.5767V14.331Z"
                              fill="currentColor"
                            ></path>
                            <path
                              d="M10.7988 23.4674V14.331H4.91744C5.01934 9.55831 6.21168 9.01654 7.75927 8.86191L8.31634 8.78063V3.53254L7.66816 3.57304C5.64729 3.69795 3.39306 4.09818 1.90245 6.11977C0.595916 7.89195 -5.72205e-06 10.7872 -5.72205e-06 15.2317V23.4674H10.7988Z"
                              fill="currentColor"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0">
                              <rect
                                width="24.5767"
                                height="27"
                                fill="white"
                                transform="translate(24.5767 27) rotate(-180)"
                              ></rect>
                            </clipPath>
                          </defs>
                        </svg>
                        <p>{ConfigData?.testimonial2_message}</p>
                        <div className="testi-before">
                          <svg
                            width="23"
                            height="22"
                            viewBox="0 0 23 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect x="1" width="20" height="21" fill="white"></rect>
                            <path
                              d="M21.5 6L11.5 21L1 6"
                              stroke="#E5E7EB"
                              stroke-linecap="square"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div className="testi-bottom">
                        <img src="https://ui-avatars.com/api/?name=Vijay+Shah" />
                        <div className="testi-bot-txt">
                          <p className="testi-name">{ConfigData?.testimonial2_name}</p>
                          <p className="testi-desig">{ConfigData?.testimonial2_designation}</p>
                        </div>
                      </div>{' '}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={15} style={{ background: '#fff' }}>
          <Col xs={24}>
            <div className="online-main-line">
              <div className="online-main-size">
                <div
                  data-aos="zoom-in"
                  data-aos-offset="10"
                  data-aos-delay="50"
                  data-aos-duration="1500"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="true"
                  data-aos-anchor-placement="top-center"
                >
                  <div className="online-main">
                    <div className="online-left">
                      <p>
                        {ConfigData?.cta_title} <br /> {ConfigData?.cta_subtitle}
                      </p>
                    </div>
                    <div className="online-right">
                      <a>{ConfigData?.cta_button_text} </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={15} style={{ background: '#fff' }}>
          <Col xs={24}>
            <div className="footer-main-line">
              <div className="footer-main-size">
                <div className="footer-main">
                  <div className="footer-top">
                    <NavLink className="pass-link" to="/">
                      <img src={upstart} />
                    </NavLink>
                    <p>{ConfigData?.site_tagline}</p>
                    <div className="footer-social">
                      <a>
                        <svg
                          class="h-6 w-6"
                          fill="currentColor"
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Facebook</title>
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                        </svg>
                      </a>

                      <a>
                        <svg
                          class="h-6 w-6"
                          fill="currentColor"
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Twitter</title>
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                        </svg>
                      </a>

                      <a>
                        <svg
                          class="h-6 w-6"
                          fill="currentColor"
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>YouTube</title>
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                        </svg>
                      </a>

                      <a>
                        <svg
                          class="h-6 w-6"
                          fill="currentColor"
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Instagram</title>
                          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"></path>
                        </svg>
                      </a>

                      <a>
                        <svg
                          class="h-6 w-6"
                          fill="currentColor"
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>LinkedIn</title>
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                        </svg>
                      </a>

                      <a>
                        <svg
                          class="h-6 w-6"
                          fill="currentColor"
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>GitHub</title>
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                        </svg>
                      </a>
                    </div>

                    <div className="footer-nav">
                      <NavLink className="pass-link" to="/">
                        {ConfigData?.footerlink_text1}
                      </NavLink>
                      <NavLink className="pass-link" to="/">
                        {ConfigData?.footerlink_text2}
                      </NavLink>
                      <NavLink className="pass-link" to="/pricing">
                        {ConfigData?.footerlink_text3}
                      </NavLink>
                      <NavLink className="pass-link" to="/">
                        {ConfigData?.footerlink_text4}
                      </NavLink>
                      <NavLink className="pass-link" to="/">
                        {ConfigData?.footerlink_text5}
                      </NavLink>
                      <NavLink className="pass-link" to="/">
                        {ConfigData?.footerlink_text6}
                      </NavLink>
                    </div>
                  </div>

                  <div className="copyright">
                    <p>©2023 UpstartPrep. {ConfigData?.copyright}</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default CategoryExplore;
