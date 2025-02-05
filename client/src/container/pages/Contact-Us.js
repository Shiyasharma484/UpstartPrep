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
import general from '../../static/img/slide/general.png';
import inquiry from '../../static/img/slide/inquiry.png';
import instructor from '../../static/img/slide/instructor.png';
import report from '../../static/img/slide/report.png';
import zigZag from '../../static/img/slide/zigzag-line.svg';
import Accordion from './Accordion';
import Carousel from 'react-multi-carousel';
import SiteHeader from '../../container/dashboard/SiteHeader';
import 'react-multi-carousel/lib/styles.css';

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { decrypt } = require('../../helpers/encryption-decryption');
const Contactus = () => {
  const accordionData = [
    {
      title: 'Where can I change or cancel my order?',
      content:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi idames est laborum etnale dolorum fuga rerum faciliste. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possi aermus omnistae voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam etmiaut officiis debitis auit rerum cessitatibue saepe evenietiu et voluptates repudiandae sint etemolestiae nocusandae www.domainurl447.com Itaque earum rerum hic tenetur a sapiente delectus, ut autme reiciendis voluptatibus maiores alias consequatur aeut perferendis doloribus asperiores repellate.',
    },
    {
      title: 'Do I have to pay customs fees or duty on my package?',
      content:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi idames est laborum etnale dolorum fuga rerum faciliste. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possi aermus omnistae voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam etmiaut officiis debitis auit rerum cessitatibue saepe evenietiu et voluptates repudiandae sint etemolestiae nocusandae www.domainurl447.com Itaque earum rerum hic tenetur a sapiente delectus, ut autme reiciendis voluptatibus maiores alias consequatur aeut perferendis doloribus asperiores repellate.',
    },
    {
      title: 'What are the returns and exchange requirements?',
      content:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi idames est laborum etnale dolorum fuga rerum faciliste. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possi aermus omnistae voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam etmiaut officiis debitis auit rerum cessitatibue saepe evenietiu et voluptates repudiandae sint etemolestiae nocusandae www.domainurl447.com Itaque earum rerum hic tenetur a sapiente delectus, ut autme reiciendis voluptatibus maiores alias consequatur aeut perferendis doloribus asperiores repellate.',
    },
    {
      title: 'Will I be charged for an exchange?',
      content:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi idames est laborum etnale dolorum fuga rerum faciliste. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possi aermus omnistae voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam etmiaut officiis debitis auit rerum cessitatibue saepe evenietiu et voluptates repudiandae sint etemolestiae nocusandae www.domainurl447.com Itaque earum rerum hic tenetur a sapiente delectus, ut autme reiciendis voluptatibus maiores alias consequatur aeut perferendis doloribus asperiores repellate.',
    },
  ];

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
  // const HandleSubmitForm = (feildsvalue, e) => {
  //   var payload = {};
  //   payload['fullname'] = feildsvalue.fullname;
  //   payload['email'] = feildsvalue.email;
  //   payload['phone'] = feildsvalue.phone;
  //   payload['subject'] = feildsvalue.subject;
  //   async function CreateSection(data) {
  //     const url = `/contactus/`;
  //     const response = await post_api_request(url, data, headers);
  //     console.log(response);
  //     if (response.status == 201) {
  //       notification.success({
  //         message: response?.data?.message,
  //       });
  //       setTimeout(() => {
  //         //window.location.reload();
  //       }, 1000);
  //       // history.push('../users/customer-list');
  //     } else
  //       notification.error({
  //         message: 'Server Error',
  //       });
  //   }
  //   CreateSection(payload);
  // };

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

        <Row gutter={15}>
          <Col xs={24} className="custm-multi-slide">
            <div className="features-main-line">
              <div className="features-main-size">
                <div className="features-main">
                  <p className="contact-title">Sort FAQ by category</p>

                  <Carousel responsive={responsive} className="carousel">
                    {/* <i id="left" className="fa-solid fa-angle-left"></i> */}
                    {/* <FeatherIcon icon="chevron-left" id="left" /> */}
                    <div className="carouselMain">
                      <div className="carousel">
                        <div className="card">
                          <div className="img">
                            <img src={general} alt="img" draggable="false" />
                          </div>
                          <h2>General queries</h2>
                          <span>2 FAQ's</span>
                        </div>
                      </div>
                    </div>
                    <div className="carouselMain">
                      <div className="carousel">
                        <div className="card">
                          <div className="img">
                            <img src={inquiry} alt="img" draggable="false" />
                          </div>
                          <h2>Student’s inquiry</h2>
                          <span>4 FAQ's</span>
                        </div>
                      </div>
                    </div>

                    <div className="carouselMain">
                      <div className="carousel">
                        <div className="card card-line">
                          <div className="img">
                            <img src={instructor} alt="img" draggable="false" />
                          </div>
                          <h2>Instructor’s queries</h2>
                          <span>4 FAQ's</span>
                        </div>
                      </div>
                    </div>

                    <div className="carouselMain">
                      <div className="carousel">
                        <div className="card">
                          <div className="img">
                            <img src={report} alt="img" draggable="false" />
                          </div>
                          <h2>Report a bug</h2>
                          <span>4 FAQ's</span>
                        </div>
                      </div>
                    </div>
                    <div className="carouselMain">
                      <div className="carousel">
                        <div className="card">
                          <div className="img">
                            <img src={general} alt="img" draggable="false" />
                          </div>
                          <h2>General queries</h2>
                          <span>2 FAQ's</span>
                        </div>
                      </div>
                    </div>
                    <div className="carouselMain">
                      <div className="carousel">
                        <div className="card">
                          <div className="img">
                            <img src={inquiry} alt="img" draggable="false" />
                          </div>
                          <h2>Student’s inquiry</h2>
                          <span>4 FAQ's</span>
                        </div>
                      </div>
                    </div>

                    <div className="carouselMain">
                      <div className="carousel">
                        <div className="card card-line">
                          <div className="img">
                            <img src={instructor} alt="img" draggable="false" />
                          </div>
                          <h2>Instructor’s queries</h2>
                          <span>4 FAQ's</span>
                        </div>
                      </div>
                    </div>

                    <div className="carouselMain">
                      <div className="carousel">
                        <div className="card">
                          <div className="img">
                            <img src={report} alt="img" draggable="false" />
                          </div>
                          <h2>Report a bug</h2>
                          <span>4 FAQ's</span>
                        </div>
                      </div>
                    </div>
                    {/* <i id="right" className="fa-solid fa-angle-right"></i> */}
                    {/* <FeatherIcon id="right" icon="chevron-right" /> */}
                  </Carousel>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={24} style={{ background: '#fff' }}>
            <div className="contact-faq">
              <img src={zigZag} />
              <p className="text-base">Have question in mind?</p>
              <h1>Search from our common FAQs</h1>

              <div className="faq-search">
                <FeatherIcon icon="search" id="left" />
                <input placeholder="Search what’s frequently asked" />
                <button>Search</button>
              </div>
            </div>

            <div className="contact-faq-tabs">
              <p className="conact-instructor">Instructor’s queries FAQ's</p>

              <div className="accordion">
                {accordionData.map(({ title, content }) => (
                  <Accordion title={title} content={content} />
                ))}
              </div>
            </div>
          </Col>
          <Col md={24} style={{ background: '#fff' }}>
            <div className="questionTab">
              <div className="questionTab-first">
                <h5>Did’nt find your question here?</h5>
                <h2>Send us your question now</h2>
                <div className="quesion-desc">
                  <p>
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditis aesentium voluptatum
                    deleniti atque lorakes mishiumes anakitum
                  </p>
                </div>
              </div>
              <div className="questionTab-second">
                <Button>
                  Submit your question
                  <FeatherIcon icon="edit-3" style={{ marginLeft: '10px' }} />
                </Button>
              </div>
            </div>
          </Col>
        </Row>

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

export default Contactus;
