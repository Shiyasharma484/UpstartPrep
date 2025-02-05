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
import blog_1 from '../../static/img/blog_1.jpg';
import blog_2 from '../../static/img/blog_2.jpg';
import blog_3 from '../../static/img/blog_3.jpg';
import blog_4 from '../../static/img/blog_4.jpg';
import blog_5 from '../../static/img/blog_5.jpg';
import blog_6 from '../../static/img/blog_6.jpg';
import SiteHeader from '../../container/dashboard/SiteHeader';
import 'react-multi-carousel/lib/styles.css';

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { decrypt, encrypt } = require('../../helpers/encryption-decryption');
const { decodetheid, encrypttheid } = require('../../helpers/encode-decode');
const blog = () => {
  const params = useParams();
  const history = useHistory();
  const [form] = Form.useForm();
  const [userid, setUserID] = useState();
  const [CategoryData, setCategoryData] = useState([]);
  const [arrayDataModels, setarrayDataModels] = useState([]);
  const [ShowTopBar, setShowTopBar] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [config, setconfig] = useState([]);
  const [ConfigData, setConfigData] = useState([]);
  const [showlogo, setshowlogo] = useState();
  const [Message, setMessage] = useState();
  const [PagesData, setPagesData] = useState([]);
  const [isActive1, setIsActive1] = useState(false);
  const [chooosemenu, setchooosemenu] = useState(false);
  const [testprepmenu, settestprepmenu] = useState(false);
  const [Academicmenu, setAcademicmenu] = useState(false);
  const [Strategiesmenu, setStrategiesmenu] = useState(false);
  const [Resourcesmenu, setResourcesmenu] = useState(false);
  const [isIcon, setisIcon] = useState(false);

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
        setConfigData(configData);
        setMessage(configdata);
        const show_logo = response?.data?.responsedata?.configurations[0]?.site_logo;
        setshowlogo(show_logo);
      } else {
        console.log('error');
      }
    }
    GetConfiguration();

    // async function GetAllSubcategory() {
    //   const url = api_url.get_subcategory;
    //   const response = await get_api_request(url, headers);
    //   if (response.status == 200) {
    //     console.log(response);
    //     const usersdata = response?.data?.responsedata;
    //     setCategoryData(usersdata);
    //   } else {
    //     console.log('error');
    //   }
    // }
    // GetAllSubcategory();

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
  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
  });

  const handleClick = event => {
    setisIcon(current => !current);
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
                      <img src={showlogo} />
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
                          <NavLink className={isActive ? '' : 'pass-links slide-animate mobsubclick'} to="/contact-us">
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
                          <NavLink
                            className={chooosemenu ? 'mobsubclick' : ' slide-animate pass-links'}
                            to="/contact-us"
                          >
                         
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
                          <NavLink
                            className={testprepmenu ? 'mobsubclick' : 'slide-animate pass-links'}
                            to="/contact-us"
                          >
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
                          <NavLink
                            className={Academicmenu ? 'mobsubclick' : 'slide-animate pass-links'}
                            to="/contact-us"
                          >
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
                          <NavLink
                            className={Strategiesmenu ? 'mobsubclick' : 'slide-animate pass-links'}
                            to="/contact-us"
                          >
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
                          <NavLink
                            className={Resourcesmenu ? 'mobsubclick' : 'slide-animate pass-links'}
                            to="/contact-us"
                          >
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
                     

                        <NavLink className="pass-links homeMenus" to="/contact-us">
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
        <div className="container mar_jn">
          <div className="">
            {' '}
            <p className="contact-title blog_t">Blogs</p>
          </div>
          <Row>
            <Col md={8}>
              <div className="card_blog">
                <div className="blo">
                  <img src={blog_1} alt="Image" />
                </div>
                <div className="blo_content">
                  <span>Product</span>
                  <p>See your content come to life with live preview</p>
                </div>
                <div className="blo_sum">
                  <p>April 25, 2023</p>
                  <span>Rose Paik</span>
                </div>
              </div>
            </Col>
            <Col md={8}>
              <div className="card_blog">
                <div className="blo">
                  <img src={blog_2} alt="Image" />
                </div>
                <div className="blo_content">
                  <span>Product</span>
                  <p>POC beats RFP: Optimizing resources for an investment decision</p>
                </div>
                <div className="blo_sum">
                  <p>April 25, 2023</p>
                  <span>Rose Paik</span>
                </div>
              </div>
            </Col>
            <Col md={8}>
              <div className="card_blog">
                <div className="blo">
                  <img src={blog_3} alt="Image" />
                </div>
                <div className="blo_content">
                  <span>Product</span>
                  <p>Taking a composable approach to partnerships: Bringing experts together to serve customers</p>
                </div>
                <div className="blo_sum">
                  <p>April 25, 2023</p>
                  <span>Rose Paik</span>
                </div>
              </div>
            </Col>
          </Row>
          <div className="mar_jn">
            <Row>
              <Col md={8}>
                <div className="card_blog">
                  <div className="blo">
                    <img src={blog_4} alt="Image" />
                  </div>
                  <div className="blo_content">
                    <span>Product</span>
                    <p>Content modeling: Lessons learned from David Hasselhoff and Baywatch Nights</p>
                  </div>
                  <div className="blo_sum">
                    <p>April 25, 2023</p>
                    <span>Rose Paik</span>
                  </div>
                </div>
              </Col>
              <Col md={8}>
                <div className="card_blog">
                  <div className="blo">
                    <img src={blog_5} alt="Image" />
                  </div>
                  <div className="blo_content">
                    <span>Product</span>
                    <p>See your content come to life with live preview</p>
                  </div>
                  <div className="blo_sum">
                    <p>April 25, 2023</p>
                    <span>Rose Paik</span>
                  </div>
                </div>
              </Col>
              <Col md={8}>
                <div className="card_blog">
                  <div className="blo">
                    <img src={blog_6} alt="Image" />
                  </div>
                  <div className="blo_content">
                    <span>Product</span>
                    <p>See your content come to life with live preview</p>
                  </div>
                  <div className="blo_sum">
                    <p>April 25, 2023</p>
                    <span>Rose Paik</span>
                  </div>
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

export default blog;
