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
import OfferingCorse from '../../static/img/auth/Offering-corse.png';
import Onlineconsultation from '../../static/img/auth/Online-consultation.png';
import greatinvestment from '../../static/img/auth/great-investment.png';
import zigZag from '../../static/img/zigzag-line.svg';
import million7 from '../../static/img/auth/million7.png';
import primary from '../../static/img/auth/primary.jpg';
import testimonial3 from '../../static/img/auth/testimonial3.jpg';
import qualify1 from '../../static/img/auth/qualify1.jpg';
import qualifyProfile from '../../static/img/auth/qualifyProfile.png';
import qualify2 from '../../static/img/auth/qualify2.jpg';
import qualifyProfile2 from '../../static/img/auth/qualifyProfile2.png';
import step3 from '../../static/img/step3.jpg';
import bannerImage from '../../static/img/bannerEvent.png';
import Accordion from './Accordion';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { TypeAnimation } from 'react-type-animation';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { decrypt, encrypt } = require('../../helpers/encryption-decryption');
const { decodetheid, encrypttheid } = require('../../helpers/encode-decode');

const HomePage = () => {
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
  const accordionData = [
    {
      title: 'Do you offer a broadcasting service, or does we have to source an external service?',
      content:
        'Broadcasting is part of our service offering and can be added to your contract. However, if the client prefers to manage this portion of the event himself, no worries! We are very flexible et we can adapt to your needs.',
    },
    {
      title: 'Why choose a virtual format?',
      content:
        'First of all, the cost. The virtual event is less expensive for the host, without forgetting that it makes it a frontier-free event, which allows international participants to attend at a fraction of the price. Time optimization is also a great advantage in this type of arrangement.',
    },
    {
      title: 'Can we showcase the full event program on your platform?',
      content:
        'Yes! The platform contains a specific tab where you can add your event program as a PDF document, and add individual interactive activities.Our platform also offers the possibility of hosting simultaneous activities in virtual rooms which are adapted to your needs: one-on-one meeting rooms, group meetings rooms and conference rooms.Participants can familiarize themselves with the full event program and create their event schedule based on their own availability by selecting the activities they wish to participate in.',
    },
    {
      title: 'What kind of data do you collect?',
      content:
        'Attendees who register on the platform share with the event organizer a wealth of key business information. Each user’s data includes (but is not limited to) company profile, contact details, location, language, promotional tools, business objectives, needs.In addition, the platform allows the collection of real-time information about specific interests in the event in which he is participating: registration for activities, duration of participation in virtual activities, views of partners, etc.Not to mention all the data relating to networking, such as business compatibility between users, requests for meetings (accepted, refused, etc.) as well as the attendance rate. Data is analyzed daily by the B2B/2GO team in order to give the organizer directives to adapt its offer and its promotions in a precise manner.Finally, B2B/2GO always offers a human perspective on each project, a qualitative analysis that requires recommendations that have an impact for the organizer. All this, in compliance with the GDPR',
    },
  ];
  const handleClick = event => {
    setisIcon(current => !current);
  };
  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
  });

  const enc_user_detail = Cookies.get('UserDetail');

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
        console.log(usersdata);
      } else {
        console.log('error');
      }
    }
    GetAllSubcategory();

    async function GetAllPages() {
      const url = api_url.getallpages;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const PageData = response?.data?.responsedata;
        setPagesData(PageData);
        console.log(PageData);
      } else {
        console.log('error');
      }
    }
    GetAllPages();
    setIsActive(true);
  }, []);

  var textanimation1 = Configdata?.typing_animationtext;
  const myFunction = e => {
    //setIsActive1(true);
  };
  var text1 = textanimation1;
  //var textanimation1 = Configdata?.typing_animationtext;
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
                      <img src={showlogo ? domainpath + showlogo : ''} />
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

                        {/* <NavLink className="pass-links slide-animate" to="/howitwork">
                          How it work
                        </NavLink> */}
                        <div className="main-menu">
                          <NavLink className="pass-links slide-animate" to="/">
                            <div className="flex-iconMenu">
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
                          <NavLink className="pass-links slide-animate" to="/">
                            <div className="flex-iconMenu">
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
                              <NavLink className="pass-links" to="https://b2b-2go.com/en/virtual-events/">
                                ISEE Prep
                              </NavLink>
                              <NavLink className="pass-links" to="https://b2b-2go.com/en/virtual-events/">
                                SSAT Prep
                              </NavLink>
                              <NavLink className="pass-links" to="https://b2b-2go.com/en/virtual-events/">
                                HSPT Prep
                              </NavLink>
                              <NavLink className="pass-links" to="https://b2b-2go.com/en/virtual-events/">
                                PSAT Prep
                              </NavLink>
                              <NavLink className="pass-links" to="https://b2b-2go.com/en/virtual-events/">
                                GRE Prep
                              </NavLink>
                            </div>
                          </div>
                        </div>
                        <div className="main-menu">
                          <NavLink className="pass-links slide-animate" to="/">
                            <div className="flex-iconMenu">
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
                          <NavLink className="pass-links slide-animate" to="/">
                            <div className="flex-iconMenu">
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
                          <NavLink className="pass-links slide-animate" to="/">
                            <div className="flex-iconMenu">
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

        <div className="mainBubbless">
          <div className="bubbles">
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>

            <div className="container">
              <Row gutter={15}>
                <Col xs={24} md={12}>
                  <div className="tu-banner_title">
                    <div className="preppage_title">
                      <span>SAT</span>
                      <p>events</p>
                    </div>
                    <p className="des-header EventPage-header">
                      {' '}
                      Streamline the virtual experience by ensuring participation in all events is conducted onto the
                      platform – with no downloads required.
                    </p>
                    {/* <div className="startJoin">
                      <Button
                        className="startStudent"
                        onClick={
                          () => history.push('/consultation')
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
                    </div> */}
                    <div className="feature-banner">
                      <p className="join-shield">
                        <FeatherIcon icon="check-circle" />
                        Virtual meetings coached by online concierges.
                        {/* {Configdata?.cta_description} */}
                      </p>
                      <p className="join-shield">
                        <FeatherIcon icon="check-circle" />
                        Webinars with visual aids.
                        {/* {Configdata?.cta_description} */}
                      </p>
                    </div>
                    <div className="startJoin">
                      <Button
                        className="startStudent"
                        onClick={
                          () => history.push('/consultation')
                          // history.push({
                          //   pathname: '/register',
                          //   state: 'student',
                          // })
                        }
                      >
                        Start Now
                        {/* {Configdata?.cta_text} */}
                        <FeatherIcon icon="chevron-right" />
                      </Button>
                    </div>
                    {/* <div className="eventIcons">
                      <img src="https://b2b-2go.com/wp-content/uploads/2022/09/RFAQ_logo-transparent-footer-1-300x164.png"></img>
                      <img src="https://b2b-2go.com/wp-content/uploads/2022/07/FEDERATION-TRANSPORTEUR-AUTOBUS-300x94.png"></img>
                      <img src="https://b2b-2go.com/wp-content/uploads/2022/07/Canada_wordmark-1-300x71.png"></img>
                      <img src="https://b2b-2go.com/wp-content/uploads/2022/07/Logo-Desjardins-2018-1-300x65.png"></img>
                    </div> */}
                  </div>
                </Col>

                <Col xs={24} md={12}></Col>
              </Row>
            </div>
            <div className="topBbannerRyt">
              <img
                //src={domainpath + Configdata?.image}
                src={bannerImage}
                loading="lazy"
                decoding="async"
              />
            </div>
            {/* <div className="tu-dottedimage">
              <img
                loading="lazy"
                decoding="async"
                src="https://demos.wp-guppy.com/tuturnp/wp-content/uploads/2022/04/img-04.png"
                alt="Image"
              />
            </div> */}
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
          </div>
        </div>
        <div className="container">
          <div className="networkingDiv">
            <div className="networkingDiv-inner">
              <p>Online </p>
              <span>networking</span>
            </div>

            <Row>
              <Col md={12} className="paragraphSectionMain">
                <p>
                  With our B2B networking platform, we provide your attendees with the opportunity to participate in
                  virtual networking and contribute to their business development remotely.
                </p>
                <div className="paragraphSectionMain-inner">
                  <FeatherIcon icon="check" />
                  <p>Access meetings with a single click</p>
                </div>
                <div className="paragraphSectionMain-inner">
                  <FeatherIcon icon="check" />
                  <p>Increase international attendance</p>
                </div>
                <div className="paragraphSectionMain-inner">
                  <FeatherIcon icon="check" />
                  <p>No application installation required</p>
                </div>
                <div className="paragraphSectionMain-inner">
                  <FeatherIcon icon="check" />
                  <p>Coach participants throughout every step of the event</p>
                </div>
              </Col>
              <Col md={12} className="ImageSection">
                <img src="https://images.theconversation.com/files/403861/original/file-20210601-663-unv024.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip" />
              </Col>
            </Row>
          </div>
        </div>
        <div className="bg_cliant">
          <div className="container" style={{ padding: '50px 0 50px 0' }}>
            <h1 className="potentialdiv-MainHeader">Develop the full potential of your online event</h1>
            <Row className="potentialdiv-Main">
              <Col md={12}>
                <div className="potentialdivMain-inner">
                  <FeatherIcon icon="check-circle" />
                  <p>Provide a variety of virtual activity types: webinars, workshops, business meetings.</p>
                </div>
              </Col>
              <Col md={12}>
                <div className="potentialdivMain-inner">
                  <FeatherIcon icon="check-circle" />
                  <p>Promote qualified online exchanges and meetings between participants.</p>
                </div>
              </Col>
              <Col md={12}>
                <div className="potentialdivMain-inner">
                  <FeatherIcon icon="check-circle" />
                  <p>Promote qualified online exchanges and meetings between participants.</p>
                </div>
              </Col>
              <Col md={12}>
                <div className="potentialdivMain-inner">
                  <FeatherIcon icon="check-circle" />
                  <p>Promote qualified online exchanges and meetings between participants.</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <div className="container">
          <div className="eventbenfitsMain">
            <h1> Event benefits</h1>
            <Row>
              <Col md={12} className="eventbanefitImage" style={{ padding: '20px !important' }}>
                <img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/scrum_event.jpg"></img>
              </Col>
              <Col md={12} className="eventbeniftparagraph" style={{ padding: '20px !important' }}>
                <div className="eventbeniftparagraph-inner">
                  <h1>The platform helps you quantify your event in several ways.</h1>
                  <p>
                    How many people have registered for each activity? The participants came from which countries or
                    sectors? How many meetings were planned and how many actually took place?
                  </p>
                  <div className="eventbenfitslist">
                    <FeatherIcon icon="check" />
                    <p> Number of actual registrations</p>
                  </div>
                  <div className="eventbenfitslist">
                    <FeatherIcon icon="check" />
                    <p> Compatibility calculation of participants</p>
                  </div>
                  <div className="eventbenfitslist">
                    <FeatherIcon icon="check" />
                    <p> Participation analysis</p>
                  </div>
                  <div className="eventbenfitslist">
                    <FeatherIcon icon="check" />
                    <p> Networking and connection count details</p>
                  </div>
                  <div className="eventbenfitslist">
                    <FeatherIcon icon="check" />
                    <p> Full analytical report</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="bg_cliant2">
          <div className="container">
            <Row gutter={15}>
              <Col xs={24} md={16}>
                <div className="icons_2">
                  <h1>Get to know today!</h1>
                  <p>
                    Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or
                    web designs.
                  </p>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className="icons_img">
                  <img src={step3} alt="Image" />
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="container">
          <div className="accordian-Main">
            <h1>Frequently asked questions</h1>
            <div className="accordion prepAccordian">
              {accordionData.map(({ title, content }) => (
                <Accordion title={title} content={content} />
              ))}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="featureEvents-main">
            <Row>
              <Col md={10} className="featureEvents-main-inner">
                <div className="featureEvents-main-first">
                  <h3>B2B/2GO is</h3>
                  <span style={{ fontSize: '2em' }}>
                    {console.log(text1)}
                    <TypeAnimation
                      sequence={['easy', 1000, 'fast', 1000, 'efficient', 1000, 'simple', 1000, console.log(text1)]}
                      repeat={Infinity}
                    />
                  </span>
                </div>
              </Col>
              <Col md={8} className="featureEvent-image">
                <img src="https://global-uploads.webflow.com/600f0ea5652fe43f9947466f/62cf2268529adc18dd791fc8_%20Student%20to%20Teacher%20Ratio%20in%20High%20Schools1.jpg"></img>
              </Col>
              <Col md={6} className="featureEvents-main-inner">
                <div className="featureEvents-main-third">
                  <p>Meet the expectations of event attendees, without even worrying!</p>
                  <div className="startJoin">
                    <Button
                      className="startStudent"
                      onClick={
                        () => history.push('/consultation')
                        // history.push({
                        //   pathname: '/register',
                        //   state: 'student',
                        // })
                      }
                    >
                      Start Now
                      {/* {Configdata?.cta_text} */}
                      <FeatherIcon icon="chevron-right" />
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          {/* <div className="keepInTouchDiv">
            <Row>
              <Col md={8} className="keepInTouchDiv-first">
                <div className="keepInTouchDiv-firstinner">
                  <h3>Let’s keep in touch. Subscribe to our newsletter.</h3>
                </div>
              </Col>
              <Col md={8} className="keepInTouchDiv-second"></Col>
              <Col md={8} className="keepInTouchDiv-image">
                <img src="https://www.netacad.com/sites/default/files/field/image/technopreneur-600x400.jpg" />
              </Col>
            </Row>
          </div> */}
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

export default HomePage;
