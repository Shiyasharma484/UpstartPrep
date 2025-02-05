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
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { decrypt, encrypt } = require('../../helpers/encryption-decryption');
const { decodetheid, encrypttheid } = require('../../helpers/encode-decode');
const StudentDetails = () => {
  const params = useParams();
  const history = useHistory();
  const [form] = Form.useForm();
  const [userid, setUserID] = useState();
  const [ShowTopBar, setShowTopBar] = useState(true);
  const [config, setconfig] = useState([]);
  const [ConfigData, setConfigData] = useState([]);
  const [showlogo, setshowlogo] = useState();
  const [Message, setMessage] = useState();
  const [PagesData, setPagesData] = useState([]);
  const [isActive1, setIsActive1] = useState(false);
  const enc_user_detail = Cookies.get('UserDetail');

  const [isActive, setIsActive] = useState(false);

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
        setConfigData(configData);
        setMessage(configdata);
        const show_logo = response?.data?.responsedata?.configurations[0]?.site_logo;
        setshowlogo(show_logo);
      } else {
        console.log('error');
      }
    }
    GetConfiguration();

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
  }, []);
  const handleClick = event => {
    setIsActive(current => !current);
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
                              // onClick={() => {
                              //   setIsActive(current => !current);
                              // }}
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
                          <NavLink className={isActive ? 'homeMenus' : 'pass-links slide-animate'} to="/">
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
            </div>
          </Col>
        </Row>
        <section className="constructor_section">
          <div className="container_fluid instructor">
            <div className="constructor_main">
              <div class="tu-profileview">
                <figure>
                  <img
                    src="https://demos.wp-guppy.com/tuturnp/wp-content/uploads/2022/03/54-400x400.png"
                    alt="Sarah Chapman
                    "
                  ></img>
                </figure>
                <div class="tu-protutorinfo">
                  <div class="tu-protutordetail">
                    <div class="tu-productorder-content">
                      <div class="tu-product-title">
                        <h3>
                          Sarah Chapman
                          <i class="icon icon-check-circle  tu-icongreen"></i>{' '}
                        </h3>
                        <h5>Making thoughts ideas into super reality</h5>
                      </div>
                    </div>
                  </div>
                  <div class="tu-infoprofile">
                    <ul class="tu-tutorreview">
                      <li>
                        <span>
                          <i class="fa fa-map-marker" aria-hidden="true"></i>
                          <em>Austin, AZ</em>
                        </span>
                      </li>
                    </ul>
                    <div class="tu-detailitem">
                      <h6>Languages I know </h6>
                      <div class="tu-languagelist">
                        <ul class="tu-languages">
                          <li> English </li>
                          <li> Arabic </li>
                          <li> Chinese </li>
                          <li> Hebrew </li>
                          <li> French </li>
                          <li> Spanish </li>
                          <li>
                            <a href=""> +02 more</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tu-actionbts">
                <a href="javascript:void(0);">
                  <i class="fa fa-globe" aria-hidden="true"></i>
                  <span>
                    <p id="urlcopy">https://tinyurl.com/2mamh9wu</p>
                    <i id="copyurl" class="fa fa-clone" aria-hidden="true"></i>
                  </span>
                </a>
                <ul class="tu-profilelinksbtn">
                  <li>
                    <a
                      href="https://demos.wp-guppy.com/tuturnp/login/?redirect=https://demos.wp-guppy.com/tuturnp/inbox/?chat_type=1&amp;chat_id=2_1&amp;type=messanger"
                      data-receiver_id="2"
                      class="tu-secbtn "
                    >
                      Let's talk now
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="constructor_main_tabs">
              <div className="breif_intro">
                <h3>A brief introduction</h3>
                <p>
                  On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and
                  demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee
                  the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty
                  through weakness of will, which is the same as saying through shrinking from toil and pain. These
                  cases are perfectly simple and easy to distinguish.
                </p>
                <br></br>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem antium doloremque laudantium, totam rem
                  aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.
                </p>
                <ul className="details_list">
                  <li>
                    {' '}
                    <em class="fa fa-check-circle tu-colorgreen"></em>
                    <span>Accusantium doloremque laudantium totam rem aperiam.</span>
                  </li>
                  <li>
                    {' '}
                    <em class="fa fa-check-circle tu-colorgreen"></em>
                    <span>Eicta sunt explicaboemo enim ipsam voluptatemuia</span>
                  </li>
                  <li>
                    {' '}
                    <em class="fa fa-check-circle tu-colorgreen"></em>
                    <span>Voluptas sit aspernatur aut odit aut fugited</span>
                  </li>
                  <li>
                    {' '}
                    <em class="fa fa-check-circle tu-colorgreen"></em>
                    <span>Quia consequuntur magni dolores eos qui ratione</span>
                  </li>
                </ul>
                <p>
                  When our power of choice is untrammelled and when nothing prevents our being able to do what we like
                  best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing
                  to the claims of duty or the obligations of business it will frequently occur that pleasures have to
                  be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this
                  principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures
                  pains to avoid worse pains.
                </p>
              </div>
            </div>

            <div className="container_fluid instructor">
              <div className="constructor_main" style={{ background: 'transparent' }}>
                <div class="tu-profileview community-main">
                  <div className="community-flex">
                    <div className="community-content">
                      <h4>Trending tutor directory of 2022</h4>
                      <p>Its Free, Join today and start spreading knowledge with students out there</p>
                    </div>
                    <div className="community-btn">
                      <a href="#" class="tu-yellowbtn">
                        Join our community
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container_fluid contact">
            <aside className={isActive ? 'tu-asidedetail bg-salmon' : 'tu-asidedetail'}>
              <a href="javascript:void(0)" class="tu-dbmenu" onClick={handleClick}>
                <i class="fa fa-headphones" aria-hidden="true"></i>
              </a>
              <div class="tu-asidebar">
                <div class="tu-asideinfo text-center">
                  <h6>I would like to get teaching service direct at</h6>
                </div>
                <ul class="tu-featureinclude">
                  <li>
                    <span class="icon icon-home tu-colorgreen">
                      {' '}
                      <i class="fa fa-home" aria-hidden="true"></i>
                      <i>My home</i>{' '}
                    </span>
                    <em class="fa fa-check-circle tu-colorgreen"></em>
                  </li>
                  <li>
                    <span class="icon icon-map-pin tu-colorblue">
                      {' '}
                      <i class="fa fa-map-marker" aria-hidden="true"></i>
                      <i>Teacher's home</i>{' '}
                    </span>
                    <em class="fa fa-check-circle tu-colorgreen"></em>
                  </li>

                  <li>
                    <span class="icon icon-video tu-colororange">
                      {' '}
                      <i class="fa fa-video-camera" aria-hidden="true"></i>
                      <i>Online</i>{' '}
                    </span>
                    <em class="fa fa-check-circle tu-colorgreen"></em>
                  </li>
                </ul>
                <div class="tu-contactbox">
                  <h6>Contact details</h6>
                  <ul class="tu-listinfo">
                    <li>
                      <span class="tu-bg-maroon">
                        <i class="fa fa-phone" aria-hidden="true"></i>
                      </span>
                      <h6>
                        0800 - 27<span>*** - ***</span>
                      </h6>
                    </li>

                    <li>
                      <span class="tu-bg-voilet">
                        <i class="fa fa-envelope-o" aria-hidden="true"></i>
                      </span>
                      <h6>
                        sarah@<span>*****</span>.com
                      </h6>
                    </li>
                    <li>
                      <span class="tu-bg-blue">
                        <i class="fa fa-skype" aria-hidden="true"></i>
                      </span>
                      <h6>
                        sara<span>********</span>
                      </h6>
                    </li>
                    <li>
                      <span class="tu-bg-green">
                        <i class="fa fa-whatsapp" aria-hidden="true"></i>
                      </span>
                      <h6>
                        1324 - 14<span>*** - ***</span>
                      </h6>
                    </li>
                    <li>
                      <span class="tu-bg-orange">
                        <i class="fa fa-print" aria-hidden="true"></i>
                      </span>
                      <a>
                        <span>******</span>.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </section>
        <Row gutter={15} style={{ background: '#fff' }}>
          <Col xs={24} className="CardsReletive" style={{ position: 'relative' }}>
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

export default StudentDetails;
