import React, { useEffect, useState } from 'react';
import { Row, Col, Form, notification, Input, Button, Select, DatePicker } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import { AddUser } from './style';
import Cookies from 'js-cookie';
import { Main } from '../styled';
import dayjs from 'dayjs';
import 'moment/locale/zh-cn';
import Accordion from './Accordion';
import { Cards } from '../../components/cards/frame/cards-frame';
import { get_api_request, post_api_request, put_api_request, api_url } from '../../helpers/Common';
import { headers } from '../../helpers/variables';
import FeatherIcon from 'feather-icons-react';
import qualify1 from '../../static/img/auth/qualify1.jpg';
import qualifyProfile from '../../static/img/auth/qualifyProfile.png';
import qualify2 from '../../static/img/auth/qualify2.jpg';
import qualifyProfile2 from '../../static/img/auth/qualifyProfile2.png';
import qualify3 from '../../static/img/auth/qualify3.jpg';
import qualifyProfile3 from '../../static/img/auth/qualifyProfile3.png';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { decrypt, encrypt } = require('../../helpers/encryption-decryption');
const { decodetheid, encrypttheid } = require('../../helpers/encode-decode');
const InstructorPage = () => {
  const accordionData = [
    {
      title: 'Education',
      content:
        'Accusamus et iusto odio dignissie corrupti quos dolores etolestias excepo officiale deserunt mollitia animi idendication estame laborum.Accusamus etae iusto odioignissie corrupti quos dolores etolestias excepto officiale deserunt mollitia animi endication estame laborum.',
    },
    {
      title: 'MBBS, MS, Mch neurosurgery',
      content:
        'Accusamus et iusto odio dignissie corrupti quos dolores etolestias excepo officiale deserunt mollitia animi idendication estame laborum.Accusamus etae iusto odioignissie corrupti quos dolores etolestias excepto officiale deserunt mollitia animi endication estame laborum.',
    },
    {
      title: 'MBBS, MD pathology',
      content:
        'Accusamus et iusto odio dignissie corrupti quos dolores etolestias excepo officiale deserunt mollitia animi idendication estame laborum.Accusamus etae iusto odioignissie corrupti quos dolores etolestias excepto officiale deserunt mollitia animi endication estame laborum.',
    },
  ];
  const params = useParams();

  const history = useHistory();
  const [form] = Form.useForm();
  var location = useLocation();
  console.log(location?.id);
  var Instructor_id = location?.id;
  const [userid, setUserID] = useState();
  const [ShowTopBar, setShowTopBar] = useState(true);
  const [config, setconfig] = useState([]);
  const [ConfigData, setConfigData] = useState([]);
  const [showlogo, setshowlogo] = useState();
  const [Message, setMessage] = useState();
  const [PagesData, setPagesData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [viewreview, setviewreview] = useState(false);
  const [viewdetails, setviewdetails] = useState(true);
  const enc_user_detail = Cookies.get('UserDetail');
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);

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
    setIsActive1(true);
  }, []);

  async function GetUserByID(id) {
    const url = '/user/' + Instructor_id;
    console.log(url);
    const response = await get_api_request(url, headers);
    console.log(response);
    const user_data = response?.data?.responsedata?.users?.[0];
    // if (response.status == 200) {
    //   form.setFieldsValue({
    //     first_Name: user_data.first_Name,
    //     last_Name: user_data.last_Name,
    //     phone: user_data.phone,
    //     email: user_data.email,
    //   });
    //   setData({
    //     first_Name: user_data.first_Name,
    //     last_Name: user_data.last_Name,
    //     phone: user_data.phone,
    //     email: user_data.email,
    //   });
    // }
  }
  GetUserByID();

  const handleClick = event => {
    setIsActive(current => !current);
  };
  const showinfo = e => {
    console.log(e);
    setviewreview(false);
    setviewdetails(true);
  };
  const showreview = e => {
    console.log(e);
    setviewreview(true);
    setviewdetails(false);
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
                        setIsActive2(current => !current);
                      }}
                    >
                      <i class="fa fa-bars"></i>
                    </a>
                  </div>

                  <div className={isActive2 ? 'topmenudesignblock' : 'topmenudesign'}>
                    <div className="header-main-right topnav header-main-right topnav" id="myTopnav">
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
                    src="https://demos.wp-guppy.com/tuturnp/wp-content/uploads/2022/03/48-400x400.png"
                    alt="Ava Nguyen"
                  ></img>
                </figure>
                <div class="tu-protutorinfo">
                  <div class="tu-protutordetail">
                    <div class="tu-productorder-content">
                      <div class="tu-product-title">
                        <h3>
                          Ava Nguyen <i class="icon icon-check-circle  tu-icongreen"></i>{' '}
                        </h3>
                        <h5>Think Once, Think Twice, Think Technology</h5>
                      </div>
                      <div class="tu-startingrate">
                        <span>Starting from:</span>
                        <h4>$33.00/hr</h4>
                      </div>
                    </div>
                  </div>
                  <div class="tu-infoprofile">
                    <ul class="tu-tutorreview">
                      <li>
                        <span>
                          <i class="fa fa-star tu-coloryellow">
                            {' '}
                            <em>
                              5.0 <span>/5.0</span>
                            </em>{' '}
                          </i>{' '}
                          <em>(06)</em>
                        </span>
                      </li>
                      <li>
                        <span>
                          <i class="fa fa-check-circle tu-colorgreen">
                            <em>100%</em>
                          </i>
                          <em>Profile completion</em>
                        </span>
                      </li>
                      <li>
                        <span>
                          <i class="fa fa-map-marker" aria-hidden="true"></i>
                          <em>Charlotte, OK</em>
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
                            <a href="#"> +02 more</a>
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
                    <p id="urlcopy">https://tinyurl.com/2qysyvqtt</p>
                    <i id="copyurl" class="fa fa-clone" aria-hidden="true"></i>
                  </span>
                </a>
                <ul class="tu-profilelinksbtn">
                  <li>
                    <a class="tu-linkheart" href="javascript:void(0);" data-user_id="0" data-profile_id="301">
                      <i class="icon icon-heart"></i>
                      <span>Save</span>
                    </a>{' '}
                  </li>
                  <li>
                    <a
                      href="https://demos.wp-guppy.com/tuturnp/login/?redirect=https://demos.wp-guppy.com/tuturnp/inbox/?chat_type=1&amp;chat_id=2_1&amp;type=messanger"
                      data-receiver_id="2"
                      class="tu-secbtn "
                    >
                      Let's talk now
                    </a>
                  </li>
                  <li>
                    {' '}
                    <a
                      href="javascript:void(0)"
                      id="tu-book-appointment"
                      data-student_id="0"
                      data-instructor_profile_id="301"
                      class="tu-primbtn"
                    >
                      Book a tution
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="constructor_main_tabs">
              <ul class="nav nav-tabs tu-nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                  <a class="nav-link" id="home-tab" onClick={e => showinfo(e)}>
                    <i class="fa fa-home"></i>
                    <span>Introduction</span>
                  </a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link active" id="profile-tab" onClick={e => showreview(e)}>
                    <i class="fa fa-comment-o" aria-hidden="true"></i>
                    <span>Reviews</span>
                  </a>
                </li>
              </ul>
              {viewdetails != false ? (
                <div className="tab-content tu-tab-content" id="tuTabContent">
                  <div className="tab-pane fade show active" id="home" role="tabpanel">
                    {/* 1st div */}
                    <div className="breif_intro">
                      <h3>A brief introduction</h3>
                      <p>
                        On the other hand, we denounce with righteous indignation and dislike men who are so beguiled
                        and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot
                        foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail
                        in their duty through weakness of will, which is the same as saying through shrinking from toil
                        and pain. These cases are perfectly simple and easy to distinguish.
                      </p>
                      <br></br>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem antium doloremque laudantium,
                        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.
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
                        When our power of choice is untrammelled and when nothing prevents our being able to do what we
                        like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances
                        and owing to the claims of duty or the obligations of business it will frequently occur that
                        pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in
                        these matters to this principle of selection: he rejects pleasures to secure other greater
                        pleasures, or else he endures pains to avoid worse pains.
                      </p>
                    </div>
                    {/* 2nd div */}
                    <div className="FAQ_s">
                      <div className="accordion">
                        {accordionData.map(({ title, content }) => (
                          <Accordion title={title} content={content} />
                        ))}
                      </div>
                    </div>
                    {/* 3rd div */}
                    <div className="tu-tabswrapper">
                      <div className="tu-tabstitle">
                        <h4>I can teach</h4>
                      </div>
                      <ul className="tu-icanteach">
                        <li>
                          <h6>Arts &amp; music</h6>
                          <ul className="tu-serviceslist">
                            <li>
                              <a href="#">Photography</a>
                            </li>
                            <li>
                              <a href="#">Sculpture</a>
                            </li>
                            <li>
                              <a href="#">Sketching</a>
                            </li>
                            <li>
                              <a href="#">Performing art</a>
                            </li>
                            <li>
                              <a href="#">Music Theory</a>
                            </li>
                            <li>
                              <a href="#">Magic</a>
                            </li>
                            <li>
                              <a href="#">Dance</a>
                            </li>
                            <li>
                              <a href="#">Guitar</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <h6>Graduation</h6>
                          <ul className="tu-serviceslist">
                            <li>
                              <a href="=">Textile</a>
                            </li>
                            <li>
                              <a href="#">Agriculture</a>
                            </li>
                            <li>
                              <a href="#">Fashion design</a>
                            </li>
                            <li>
                              <a href="#">Economics</a>
                            </li>
                            <li>
                              <a href="#">Astronomy</a>
                            </li>
                            <li>
                              <a href="#">Marketing</a>
                            </li>
                            <li>
                              <a href="#">Botany</a>
                            </li>
                            <li>
                              <a href="#">Advertising</a>
                            </li>
                            <li>
                              <a href="#">Chemistry</a>
                            </li>
                            <li>
                              <a
                                className="tu-showmore tu-tooltip-tags"
                                id="tu-detail-subjects"
                                href="javascript:void(0);"
                                data-tippy-trigger="click"
                                data-template="tu-industrypro-22"
                                data-tippy-interactive="true"
                                data-tippy-placement="top-start"
                              >
                                {' '}
                                +1 more
                              </a>
                              <div id="tu-industrypro-22" className="tu-tippytooltip d-none">
                                <div className="tu-selecttagtippy tu-tooltip "></div>
                              </div>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <h6>Health &amp; sports</h6>
                          <ul className="tu-serviceslist">
                            <li>
                              <a href="#">Wrestling</a>
                            </li>
                            <li>
                              <a href="#">Diving</a>
                            </li>
                            <li>
                              <a href="#">Table Tennis</a>
                            </li>
                            <li>
                              <a href="#">Zumba</a>
                            </li>
                            <li>
                              <a href="#">Hockey</a>
                            </li>
                            <li>
                              <a href="#">Football</a>
                            </li>
                            <li>
                              <a href="#">Baseball</a>
                            </li>
                            <li>
                              <a href="#">Golf</a>
                            </li>
                            <li>
                              <a href="#">Martial arts</a>
                            </li>
                            <li>
                              <a
                                className="tu-showmore tu-tooltip-tags"
                                id="tu-detail-subjects"
                                href="javascript:void(0);"
                                data-tippy-trigger="click"
                                data-template="tu-industrypro-45"
                                data-tippy-interactive="true"
                                data-tippy-placement="top-start"
                              >
                                {' '}
                                +3 more
                              </a>
                              <div id="tu-industrypro-45" className="tu-tippytooltip d-none">
                                <div className="tu-selecttagtippy tu-tooltip "></div>
                              </div>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    {/* 4th div */}
                    <div className="tu-tabswrapper">
                      <div className="tu-tabstitle">
                        <h4>Availability</h4>
                      </div>
                      <div className="table-responsive">
                        <table className="table tu-availabletable ">
                          <thead>
                            <tr>
                              <th colspan="2"></th>
                              <th scope="col">Mon</th>
                              <th scope="col">Tue</th>
                              <th scope="col">Wed</th>
                              <th scope="col">Thu</th>
                              <th scope="col">Fri</th>
                              <th scope="col">Sat</th>
                              <th scope="col">Sun</th>
                            </tr>
                          </thead>{' '}
                          <tbody>
                            <tr>
                              <th colspan="2" scope="row">
                                {' '}
                                <span class="fa-solid fa-sunrise">
                                  <FeatherIcon icon="sunrise"></FeatherIcon>
                                </span>
                                PRE 12PM
                              </th>
                              <td>
                                <span className="fa fa-check"></span>
                              </td>
                              <td>
                                <span className="fa fa-check"></span>
                              </td>
                              <td>
                                <span className="fa fa-check"></span>
                              </td>
                              <td>
                                <span className="fa fa-check"></span>
                              </td>
                              <td>
                                <span className="fa fa-check"></span>
                              </td>
                              <td className="tu-hasempty">
                                {' '}
                                <div className="tu-nodata">
                                  <span></span>
                                </div>{' '}
                              </td>
                              <td className="tu-hasempty">
                                {' '}
                                <div className="tu-nodata">
                                  <span></span>
                                </div>{' '}
                              </td>
                            </tr>
                            <tr>
                              <th colspan="2" scope="row">
                                {' '}
                                <span className="tu-after-12pm-5pm icon icon-sun">
                                  <FeatherIcon icon="sun"></FeatherIcon>
                                </span>
                                12PM-5PM
                              </th>
                              <td>
                                <span className="fa fa-check"></span>
                              </td>
                              <td>
                                <span className="fa fa-check"></span>
                              </td>
                              <td>
                                <span className="fa fa-check"></span>
                              </td>
                              <td>
                                <span className="fa fa-check"></span>
                              </td>
                              <td>
                                <span className="fa fa-check"></span>
                              </td>
                              <td className="tu-hasempty">
                                {' '}
                                <div className="tu-nodata">
                                  <span></span>
                                </div>{' '}
                              </td>
                              <td className="tu-hasempty">
                                {' '}
                                <div className="tu-nodata">
                                  <span></span>
                                </div>{' '}
                              </td>
                            </tr>
                            <tr>
                              <th colspan="2" scope="row">
                                {' '}
                                <span className="tu-after-5pm icon icon-sunset">
                                  <FeatherIcon icon="sunset"></FeatherIcon>
                                </span>
                                AFTER 5PM
                              </th>
                              <td>
                                <span className="fa fa-check"></span>
                              </td>
                              <td>
                                <span className="fa fa-check"></span>
                              </td>
                              <td>
                                <span className="fa fa-check"></span>
                              </td>
                              <td>
                                <span className="fa fa-check"></span>
                              </td>
                              <td>
                                <span className="fa fa-check"></span>
                              </td>
                              <td className="tu-hasempty">
                                {' '}
                                <div className="tu-nodata">
                                  <span></span>
                                </div>{' '}
                              </td>
                              <td className="tu-hasempty">
                                {' '}
                                <div className="tu-nodata">
                                  <span></span>
                                </div>{' '}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* 5th div */}
                    <div className="tu-tabswrapper">
                      <div class="tu-tabstitle">
                        <h4>Media gallery</h4>
                      </div>
                      <img src="	https://demos.wp-guppy.com/tuturnp/wp-content/uploads/2022/03/gallery-10-1812x800.jpg"></img>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}

              {viewreview != false ? (
                <div className="tab-content tu-tab-content" id="tuTabContent">
                  <div className="tab-pane fade show active" role="tabpanel" id="profile" aria-labelledby="profile-tab">
                    <div className="tu-tabswrapper">
                      <div className="tu-boxtitle">
                        <h4>Reviews(6)</h4>
                      </div>
                      <div className="tu-commentarea">
                        <div className="tu-commentlist" id="comment-242">
                          <img
                            src="https://demos.wp-guppy.com/tuturnp/wp-content/uploads/2022/03/62-100x100.png"
                            alt="Brooklyn Chan"
                          ></img>
                          <div className="tu-coomentareaauth">
                            <div className="tu-commentright">
                              <div className="tu-commentauthor">
                                <h6>
                                  <span>Brooklyn Chan</span>
                                  <em>1 Year ago</em>
                                </h6>
                                <div className="tu-listing-location tu-ratingstars">
                                  <span>5.0</span>
                                  <span className="tu-stars tu-sm-stars"></span>
                                </div>
                              </div>
                            </div>
                            <div className="tu-description">
                              <p>
                                Elit amet ut dui nam enim consectetur arcu amet varius. Viverra ac nisl quam nec justo,
                                posuere suspendisse consequat. Sit aliquam purus mattis libero, pellentesque tellus sed
                                amet pretium. Porttitor massa lectus dolor at enim. Ultricies varius diam elementum quis
                                id eleifend. Eu vulputate urna, nulla dignissim ultrices.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="tu-commentlist" id="comment-242">
                          <img
                            src="https://demos.wp-guppy.com/tuturnp/wp-content/uploads/2022/03/68-100x100.png"
                            alt="Brooklyn Chan"
                          ></img>
                          <div className="tu-coomentareaauth">
                            <div className="tu-commentright">
                              <div className="tu-commentauthor">
                                <h6>
                                  <span>Beau Simard</span>
                                  <em>1 Year ago</em>
                                </h6>
                                <div className="tu-listing-location tu-ratingstars">
                                  <span>5.0</span>
                                  <span className="tu-stars tu-sm-stars"></span>
                                </div>
                              </div>
                            </div>
                            <div className="tu-description">
                              <p>
                                Hac lacus nulla tristique lectus lectus enim. Est eget penatibus et in tempus. Cursus
                                habitant at mauris arcu sed pellentesque viverra massa. Facilisis tristique bibendum
                                dictum amet posuere. Facilisis quis nisi facilisis orci nulla. Hac nullam ut tortor
                                eget.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="tu-commentlist" id="comment-242">
                          <img
                            src="https://demos.wp-guppy.com/tuturnp/wp-content/uploads/2022/03/85-100x100.png"
                            alt="Brooklyn Chan"
                          ></img>
                          <div className="tu-coomentareaauth">
                            <div className="tu-commentright">
                              <div className="tu-commentauthor">
                                <h6>
                                  <span>Isobel Jones</span>
                                  <em>1 Year ago</em>
                                </h6>
                                <div className="tu-listing-location tu-ratingstars">
                                  <span>5.0</span>
                                  <span className="tu-stars tu-sm-stars"></span>
                                </div>
                              </div>
                            </div>
                            <div className="tu-description">
                              <p>
                                Ipsum quisque risus nisl sed tortor nulla. Scelerisque neque, velit dui eget. Mi,
                                viverra sagittis est sapien blandit. Sit mi erat turpis integer accumsan. Mi, quis eget
                                tincidunt dictum. Lorem maecenas a faucibus mattis laoreet quis.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="tu-commentlist" id="comment-242">
                          <img
                            src="	https://demos.wp-guppy.com/tuturnp/wp-content/uploads/2022/03/83-100x100.png"
                            alt="Brooklyn Chan"
                          ></img>
                          <div className="tu-coomentareaauth">
                            <div className="tu-commentright">
                              <div className="tu-commentauthor">
                                <h6>
                                  <span>Kian Johnson</span>
                                  <em>1 Year ago</em>
                                </h6>
                                <div className="tu-listing-location tu-ratingstars">
                                  <span>5.0</span>
                                  <span className="tu-stars tu-sm-stars"></span>
                                </div>
                              </div>
                            </div>
                            <div className="tu-description">
                              <p>
                                Dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                neimit utnaeliquip ex ea commodo consequat volupte ateian essemae cillume.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="explorre_cards">
              <div class="row gy-4 main_cards">
                <div class="col-md-12">
                  <div class="tu-explore-title">
                    <h3>Explore related tutors</h3>
                  </div>
                </div>

                <Carousel responsive={qualify}>
                  <div className="main-qualify-slide tu-featureitem">
                    <div className="qualify-slide">
                      <div className="qualify-slide-inner">
                        <div className="qualify-slide-img">
                          <img src={qualify1} />
                          <span class="tu-featuretag">FEATURED</span>
                        </div>

                        <div className="qualify-slide-cont">
                          <div className="qualify-slide-cont-first">
                            <img src={qualifyProfile} />
                            <div>
                              <h5>
                                {' '}
                                <a>Karren Segovia</a> <FeatherIcon icon="check-circle" />
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
                                  Mobile:<em>080027</em>
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

                  <div className="main-qualify-slide tu-featureitem">
                    <div className="qualify-slide">
                      <div className="qualify-slide-inner">
                        <div className="qualify-slide-img">
                          <img src={qualify2} />
                          <span class="tu-featuretag">FEATURED</span>
                        </div>

                        <div className="qualify-slide-cont">
                          <div className="qualify-slide-cont-first">
                            <img src={qualifyProfile2} />
                            <div>
                              <h5>
                                {' '}
                                <a>Arianne Kearns</a> <FeatherIcon icon="check-circle" />
                              </h5>
                              <span>Charlotte, OK</span>
                            </div>
                          </div>

                          <div className="qualify-slide-cont-first">
                            <ul className="tu-authorlist">
                              <li>
                                <span>
                                  Starting from:<em>$69.00/hr</em>
                                </span>
                              </li>

                              <li>
                                <span>
                                  Mobile:<em>080027</em>
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

                  <div className="main-qualify-slide tu-featureitem">
                    <div className="qualify-slide">
                      <div className="qualify-slide-inner">
                        <div className="qualify-slide-img">
                          <img src={qualify3} />
                          <span class="tu-featuretag">FEATURED</span>
                        </div>

                        <div className="qualify-slide-cont">
                          <div className="qualify-slide-cont-first">
                            <img src={qualifyProfile3} />
                            <div>
                              <h5>
                                {' '}
                                <a>Anthony Shao</a> <FeatherIcon icon="check-circle" />
                              </h5>
                              <span>Indianapolis, CA</span>
                            </div>
                          </div>

                          <div className="qualify-slide-cont-first">
                            <ul className="tu-authorlist">
                              <li>
                                <span>
                                  Starting from:<em>$69.00/hr</em>
                                </span>
                              </li>

                              <li>
                                <span>
                                  Mobile:<em>080027</em>
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

                  <div className="main-qualify-slide tu-featureitem">
                    <div className="qualify-slide">
                      <div className="qualify-slide-inner">
                        <div className="qualify-slide-img">
                          <img src={qualify2} />
                          <span class="tu-featuretag">FEATURED</span>
                        </div>

                        <div className="qualify-slide-cont">
                          <div className="qualify-slide-cont-first">
                            <img src={qualifyProfile2} />
                            <div>
                              <h5>
                                {' '}
                                <a>Arianne Kearns</a> <FeatherIcon icon="check-circle" />
                              </h5>
                              <span>Charlotte, OK</span>
                            </div>
                          </div>

                          <div className="qualify-slide-cont-first">
                            <ul className="tu-authorlist">
                              <li>
                                <span>
                                  Starting from:<em>$69.00/hr</em>
                                </span>
                              </li>

                              <li>
                                <span>
                                  Mobile:<em>080027</em>
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
                </Carousel>
              </div>
            </div>
          </div>
          {/* <div className="container_fluid contact"> */}
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
                    <i class="fa fa-video-camera" aria-hidden="true"></i>
                    <i>My home</i>{' '}
                  </span>
                  <em class="fa fa-check-circle tu-colorgreen"></em>
                </li>
                <li>
                  <span class="icon icon-map-pin tu-colorblue">
                    {' '}
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                    <i>Offline</i>{' '}
                  </span>
                  <em class="fa fa-check-circle tu-colorgreen"></em>
                </li>

                <li>
                  <span class="icon icon-video tu-colororange">
                    {' '}
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                    <i>Student place</i>{' '}
                  </span>
                  <em class="fa fa-check-circle tu-colorgreen"></em>
                </li>
                <li>
                  <span class="icon icon-video tu-colororange">
                    {' '}
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                    <i>Tutor place</i>{' '}
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
              <div class="tu-unlockfeature text-center">
                <h6>Click the button below to login &amp; unlock the contact details </h6>
                <a href="https://demos.wp-guppy.com/tuturnp/login/" class="tu-primbtn tu-btngreen">
                  <span>Unlock feature</span>
                  <i class="icon icon-lock"></i>
                </a>
              </div>
            </div>
          </aside>
          {/* </div> */}
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

export default InstructorPage;
