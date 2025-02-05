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
// import { encrypttheid } from '../../helpers/encode-decode';
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const Pricing = () => {
  const [chooosemenu, setchooosemenu] = useState(false);
  const [testprepmenu, settestprepmenu] = useState(false);
  const [Academicmenu, setAcademicmenu] = useState(false);
  const [Strategiesmenu, setStrategiesmenu] = useState(false);
  const [Resourcesmenu, setResourcesmenu] = useState(false);
  const [isIcon, setisIcon] = useState(false);
  const [isActive1, setIsActive1] = useState(false);

  const history = useHistory();
  const [ShowTopBar, setShowTopBar] = useState(true);
  const [data, setData] = useState(null);
  const [CategoryData, setCategoryData] = useState({});
  const [PlansData, setPlansData] = useState([]);
  const [featurearraydata, setfeaturearraydata] = useState([]);
  const [ConfigData, setConfigData] = useState([]);
  const [Message, setMessage] = useState();
  console.log(CategoryData?.plan_name);
  const [showlogo, setshowlogo] = useState();
  const [CategoryID, setCategoryID] = useState();
  const [isActive, setIsActive] = useState(false);
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
    const url = api_url.get_plans_by_category_id + id;
    const response = await get_api_request(url, headers);
    console.log(response);
    if (response.status == 200) {
      const categorydata = response?.data?.responsedata?.[0];
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
    history.push(`./checkout/${id}`);
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
  const handleClick = event => {
    setisIcon(current => !current);
  };
  const enc_user_detail = Cookies.get('UserDetail');
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
                          <NavLink className={isActive ? 'mobsubclick' : 'pass-links  homeMenus'} to="/">
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
                          <NavLink className={chooosemenu ? 'mobsubclick' : 'slide-animate pass-links'} to="/">
                            {/* <NavLink className="pass-links slide-animate" to="/"> */}
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

        <Row gutter={15} style={{ background: '#fff' }}>
          <Col xs={24}>
            <div className="hero-main-line pricingTop">
              <div className="hero-main-size">
                <div className="hero-main">
                  <div className="hero-left">
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
                      <h1>Pricing Plans</h1>
                      <p>
                        Become lifelong learners with the best teachers, engaging video lessons and personalised
                        learning journeys
                      </p>
                    </div>
                  </div>
                  <div className="hero-right">
                    <div
                      className="pricing-ryt"
                      data-aos="fade-left"
                      data-aos-offset="10"
                      data-aos-delay="50"
                      data-aos-duration="1500"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                      data-aos-anchor-placement="top-center"
                    >
                      <p>Category</p>

                      <Select
                        className="pricing-category"
                        classNamePrefix="select "
                        isSearchable={true}
                        data={data}
                        //onSelect={GetPosition}
                        onChange={e => getCategoryId(e)}
                        value={CategoryID}
                      >
                        {data != null ? data.map((item, index) => <Option value={item.id}>{item.name} </Option>) : ''}
                      </Select>
                    </div>
                    ,{console.log(data?.[0]?.id)}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={15} style={{ background: '#fff' }}>
          <Col xs={24}>
            <div className="features-main-line pricingPageFooter">
              <div className="features-main-size">
                <div className="features-main">
                  <div className="features-left">
                    <h1>
                      {CategoryData?.plan_name} Subscription <span>Plans</span>
                    </h1>
                    <p className="site-des">To be paid as a one-time payment.</p>
                  </div>

                  <div
                    className="pricingSection"
                    data-aos="fade-up"
                    data-aos-offset="10"
                    data-aos-delay="50"
                    data-aos-duration="1500"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="true"
                    data-aos-anchor-placement="top-center"
                  >
                    {PlansData?.map(
                      (item, index) => (
                        console.log(item, '666666666'),
                        (
                          <div className="price-main">
                            <div className="price-inner">
                              <div className="price-inner-top">
                                <p className="pricing-pop">MOST POPULAR</p>
                                <p className="pricing-gold">{item?.plan_name}</p>
                                <p className="pricing-price">
                                  ${item?.price} <span>/month</span>
                                </p>
                                <p className="site-des">To be paid $300 for 4 months</p>
                                <Button className="pass-link buyPlan" onClick={() => GoCheckout(item.id)}>
                                  Buy Plan
                                </Button>
                              </div>
                              <div className="price-inner-top">
                                <p className="site-des">{item?.duration} Month Unlimited Access To</p>
                                {featurearraydata?.map((item1, index) => (
                                  <p className="site-des">
                                    {item['feature'].includes(item1?.id) ? (
                                      <svg
                                        class="flex-shrink-0 h-5 w-5 text-green-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clip-rule="evenodd"
                                        ></path>
                                      </svg>
                                    ) : (
                                      <svg
                                        style={{ color: 'rgba(239, 68, 68)' }}
                                        class="flex-shrink-0 h-5 w-5 text-red-500"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M6 18L18 6M6 6l12 12"
                                        ></path>
                                      </svg>
                                    )}
                                    {item1.name}
                                  </p>
                                ))}
                              </div>{' '}
                            </div>
                          </div>
                        )
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={15} style={{ background: '#fff' }}>
          <Col xs={24} className="CardsReletive" style={{ position: 'relative' }}>
            {/* <Row gutter={30} className="main-CardRow">
              <div className="inner-MainCol PricingForm">
                <Row>
                  <Col md={6} xs={24} sm={24}>
                    <Cards>
                      <FeatherIcon icon="map-pin" />
                      <h5 className="inner-h5">our main office</h5>
                      <p className="inner-paragraph">SoHo 94 Broadway St New York, NY 1001</p>
                    </Cards>
                  </Col>
                  <Col md={6} sm={24} xs={24}>
                    <Cards>
                      <FeatherIcon icon="phone-call" />
                      <h5 className="inner-h5">PHONE NUMBER</h5>
                      <p className="inner-paragraph">234-9876-5400 888-0123-4567 (Toll Free)</p>
                    </Cards>
                  </Col>
                  <Col md={6} sm={24} xs={24}>
                    <Cards>
                      <FeatherIcon icon="printer" />
                      <h5 className="inner-h5">FAX</h5>
                      <p className="inner-paragraph">1-234-567-8900</p>
                    </Cards>
                  </Col>
                  <Col md={6} sm={24} xs={24}>
                    <Cards>
                      <FeatherIcon icon="mail" />
                      <h5 className="inner-h5">EMAIL</h5>
                      <p className="inner-paragraph">hello@theme.com</p>
                    </Cards>
                  </Col>
                </Row>
              </div>
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
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Pricing;
