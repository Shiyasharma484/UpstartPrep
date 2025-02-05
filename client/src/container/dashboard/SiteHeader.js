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
import StaticLogo from '../../static/img/Homepage/NewLogo.png';
import 'react-multi-carousel/lib/styles.css';

const SiteHeader = () => {
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

  const RedirectToDashboard = () => {
    //to="/dashboard"
    history.push(`/dashboard`);
    window.location.reload();
  };

  return (
    <Row gutter={15} style={{ background: '#fafaff' }}>
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
                    <div
                      className="main-menu"
                      onClick={() => {
                        setIsActive(true);
                        setchooosemenu(false);
                        settestprepmenu(false);
                        setAcademicmenu(false);
                        setStrategiesmenu(false);
                        setResourcesmenu(false);
                      }}
                    >
                      <NavLink className={isActive ? 'homeMenus' : 'pass-links slide-animate mobsubclick'} to="/">
                        <div className="flex-iconMenu">
                          Home <FeatherIcon icon="chevron-down" />
                        </div>
                      </NavLink>

                      <div className="main-sub-menu">
                        <div className="sub-menu">
                          <NavLink className="pass-links" to="/">
                            Private Tutoring
                          </NavLink>

                          <NavLink className="pass-links" to="/">
                            Academic Tutoring
                          </NavLink>

                          <NavLink className="pass-links" to="/">
                            Admissions Coaching
                          </NavLink>
                        </div>
                      </div>
                    </div>

                    <div
                      className="main-menu"
                      onClick={() => {
                        setIsActive(false);
                        setchooosemenu(true);
                        settestprepmenu(false);
                        setAcademicmenu(false);
                        setStrategiesmenu(false);
                        setResourcesmenu(false);
                      }}
                    >
                      <NavLink className={chooosemenu ? 'mobsubclick' : 'slide-animate pass-links'} to="#">
                        <div
                          className="flex-iconMenu"
                          //   onClick={() => {
                          //     setchooosemenu(current => !current);
                          //   }}
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

                    <div
                      className="main-menu"
                      onClick={() => {
                        setIsActive(false);
                        setchooosemenu(false);
                        settestprepmenu(true);
                        setAcademicmenu(false);
                        setStrategiesmenu(false);
                        setResourcesmenu(false);
                      }}
                    >
                      <NavLink className={testprepmenu ? 'mobsubclick' : 'slide-animate pass-links'} to="#">
                        <div
                          className="flex-iconMenu"
                          //   onClick={() => {
                          //     settestprepmenu(current => !current);
                          //   }}
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
                    <div
                      className="main-menu"
                      onClick={() => {
                        setIsActive(false);
                        setchooosemenu(false);
                        settestprepmenu(false);
                        setAcademicmenu(true);
                        setStrategiesmenu(false);
                        setResourcesmenu(false);
                      }}
                    >
                      <NavLink className={Academicmenu ? 'mobsubclick' : 'slide-animate pass-links'} to="#">
                        <div
                          className="flex-iconMenu"
                          //   onClick={() => {
                          //     setAcademicmenu(current => !current);
                          //   }}
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

                    <div
                      className="main-menu"
                      onClick={() => {
                        setIsActive(false);
                        setchooosemenu(false);
                        settestprepmenu(false);
                        setAcademicmenu(false);
                        setStrategiesmenu(true);
                        setResourcesmenu(false);
                      }}
                    >
                      <NavLink className={Strategiesmenu ? 'mobsubclick' : 'slide-animate pass-links'} to="#">
                        <div
                          className="flex-iconMenu"
                          //   onClick={() => {
                          //     setStrategiesmenu(current => !current);
                          //   }}
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

                    <div
                      className="main-menu"
                      onClick={() => {
                        setIsActive(false);
                        setchooosemenu(false);
                        settestprepmenu(false);
                        setAcademicmenu(false);
                        setStrategiesmenu(false);
                        setResourcesmenu(true);
                      }}
                    >
                      <NavLink className={Resourcesmenu ? 'mobsubclick' : 'slide-animate pass-links'} to="#">
                        <div
                          className="flex-iconMenu"
                          //   onClick={() => {
                          //     setResourcesmenu(current => !current);
                          //   }}
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
    </Row>
  );
};

export default SiteHeader;
