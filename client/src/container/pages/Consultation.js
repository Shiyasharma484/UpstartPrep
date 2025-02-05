import React, { useEffect, useState } from 'react';
import { Row, Col, notification, Input, Select, DatePicker, Form } from 'antd';
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
import consulatantimg from '../../static/img/auth/consulatant-img.png';
import Text from 'antd/lib/typography/Text';
//import { Form, FormElement } from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
import { Stepper } from '@progress/kendo-react-layout';
import { discussSchedule } from '../pages/discussSchedule';
import { aboutChallanges } from './aboutChallanges.js';
import { tellUsabout } from './tellUsabout.js';
import { yourname } from './yourname.js';
import { studentName } from './studentName.js';
import { yournumber } from './yournumber.js';
import { exampreparing } from './exampreparing.js';
import { aboutus } from './aboutus.js';
import { alreadyAcc } from './alreadyAcc.js';
import { interestTutoring } from './interestTutoring.js';
import { youremail } from './youremail.js';
import { complimentary } from './complimentary.js';
import { timezone } from './timezone.js';
import { hearAbout } from './hearAbout.js';
import { Thanks } from './Thanks.js';
import SiteHeader from '../../container/dashboard/SiteHeader';

const stepPages = [
  discussSchedule,
  aboutChallanges,
  tellUsabout,
  yourname,
  studentName,
  yournumber,
  exampreparing,
  aboutus,
  alreadyAcc,
  interestTutoring,
  youremail,
  complimentary,
  timezone,
  hearAbout,
  Thanks,
];

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const Consultation = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [isIcon, setisIcon] = useState(false);
  const [step, setStep] = React.useState(0);
  const [formState, setFormState] = React.useState({});
  const [CanHelpButton, setCanHelpButton] = useState(false);
  const [steps, setSteps] = React.useState([
    {
      label: 'Schedule a Free Call',
      isValid: undefined,
    },
    {
      label: 'About Challenges',
      isValid: undefined,
    },
    {
      label: 'tellUsabout',
      isValid: undefined,
    },
    {
      label: 'Your Name',
      isValid: undefined,
    },
    {
      label: 'Student Name',
      isValid: undefined,
    },
    {
      label: 'Your Number',
      isValid: undefined,
    },
    {
      label: 'exam preparing',
      isValid: undefined,
    },
    {
      label: 'About us',
      isValid: undefined,
    },
    {
      label: 'already Acc',
      isValid: undefined,
    },
    {
      label: 'interestTutoring',
      isValid: undefined,
    },
    {
      label: 'youremail',
      isValid: undefined,
    },
    {
      label: 'complimentary',
      isValid: undefined,
    },
    {
      label: 'timezone',
      isValid: undefined,
    },
    {
      label: 'hearAbout',
      isValid: undefined,
    },
    {
      label: 'Thanks',
      isValid: undefined,
    },
  ]);
  const handleChange = e => {
    // console.log(e.checked);
  };
  const lastStepIndex = steps.length - 1;
  const isLastStep = lastStepIndex === step;
  const onStepSubmit = React.useCallback(
    event => {
      const { isValid, values } = event;
      const currentSteps = steps.map((currentStep, index) => ({
        ...currentStep,
        isValid: index === step ? isValid : currentStep.isValid,
      }));
      setSteps(currentSteps);
      if (!isValid) {
        return;
      }
      setStep(() => Math.min(step + 1, lastStepIndex));
      setFormState(values);
      if (isLastStep) {
        alert(JSON.stringify(values));
      }
    },
    [steps, isLastStep, step, lastStepIndex],
  );
  const onPrevClick = React.useCallback(
    event => {
      event.preventDefault();
      setStep(() => Math.max(step - 1, 0));
    },
    [step, setStep],
  );

  const [chooosemenu, setchooosemenu] = useState(false);
  const [testprepmenu, settestprepmenu] = useState(false);
  const [Academicmenu, setAcademicmenu] = useState(false);
  const [Strategiesmenu, setStrategiesmenu] = useState(false);
  const [Resourcesmenu, setResourcesmenu] = useState(false);
  const [Answer, setAnswer] = useState(false);
  const [Grade, setGrade] = useState(false);
  const [data, setData] = useState(null);
  const [CategoryData, setCategoryData] = useState({});
  const [PlansData, setPlansData] = useState([]);
  const [featurearraydata, setfeaturearraydata] = useState([]);
  const [ConfigData, setConfigData] = useState([]);
  const [Message, setMessage] = useState();
  const [isActive1, setIsActive1] = useState(false);
  console.log(CategoryData?.plan_name);
  const [showlogo, setshowlogo] = useState();
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
        setData(dataArray);
      } else {
        console.log('error');
      }
    }
    GetAllUsers();
    name = 'section';

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
  const handleClick1 = event => {
    setisIcon(current => !current);
  };
  function submit_form(form_id) {
    let e = document.getElementById(form_id),
      l = new FormData(e),
      t = Array.from(l.entries());
    var n = {};
    for (let o = 0; o < t.length; o++) {
      var s = t[o],
        i = s[0],
        y = s[1];
      y.length > 0 && (void 0 != n[i] ? (n[i] = n[i] + ',' + y) : (n[i] = y));
    }
    return n;
  }

  //var datasssssssss = submit_form('ConsultationForm', validationRule);
  // console.log(datasssssssss);

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
  };

  function handleClick(showArray, hideArray) {
    showArray.map(id => {
      document.getElementById(id).style = 'display:block';
      //document.getElementById('secondID').classList.add('secStep');
      //document.getElementById('thirdID').classList.add('thirdStep');
    });

    hideArray.map(id => {
      document.getElementById(id).style = 'display:none';
    });
  }
  function openMessage(showArray, hideArray) {
    showArray.map(id => {
      document.getElementById(id).style = 'display:block';
      //document.getElementById('secondID').classList.add('secStep');
      //document.getElementById('thirdID').classList.add('thirdStep');
    });

    hideArray.map(id => {
      document.getElementById(id).style = 'display:none';
    });
  }

  const HandleSubmitForm = (feildsvalue, e) => {
    //var datasss = submit_form("MapSectionForm",validationRule);
    var reqform = submit_form('ConsultationForm');
    console.log(reqform);
    var payload = {};
    var data = {};
    if (Object.keys(reqform).length > 0) {
      data = {
        speaking_org: reqform?.speaking_org,
        Online_org: reqform?.Online_org,
        email: reqform?.email,
        answer: reqform?.answer,
        f_name: reqform?.f_name,
        exam_prepare: reqform?.exam_prepare,
        house_number: reqform?.house_number,
        gradelevel: reqform?.gradelevel,
        l_name: reqform?.l_name,
        number: reqform?.number,
        organization: reqform?.organization,
        s_f_name: reqform?.s_f_name,
        s_l_name: reqform?.s_l_name,
        about_test: reqform?.about_test,
        about_motivate: reqform?.about_motivate,
        about_Apply: reqform?.about_Apply,
        t_Signet_client_no: reqform?.t_Signet_client_no,
        t_Signet_client_yes: reqform?.t_Signet_client_yes,
        t_Signet_client_maybe: reqform?.t_Signet_client_maybe,
        about_course: reqform?.about_course,
        about_graduate: reqform?.about_graduate,
        about_Other: reqform?.about_Other,
        about_other: reqform?.about_other,
        plan_yes: reqform?.plan_yes,
        plan_no: reqform?.plan_no,
        s_Signet_client_no: reqform?.s_Signet_client_no,
        s_Signet_client_yes: reqform?.s_Signet_client_yes,
        Returning_org: reqform?.Returning_org,
        Online_org: reqform?.Online_org,
        zone_yes: reqform?.zone_yes,
        zone_no: reqform?.zone_no,
        prep_client: reqform?.prep_client,
        speaking_org: reqform?.speaking_org,
        organization: reqform?.organization,
        othersAbout: reqform?.othersAbout,
        prep_client: reqform?.prep_client,
      };
    }
    payload['data'] = data;
    console.log(payload);
    async function CreateSection(data) {
      const url = api_url.create_consultation;
      const response = await post_api_request(url, payload, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.message,
        });
        document.getElementById('step_15').style = 'display:block';
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
  const enc_user_detail = Cookies.get('UserDetail');

  const RedirectToDashboard = () => {
    //to="/dashboard"
    history.push(`/dashboard`);
    window.location.reload();
  };

  const HandleCanHelpButton = e => {
    if (e.target.checked == true) {
      setCanHelpButton(true);
    } else {
      setCanHelpButton(false);
    }
  };

  const ChangeAnswer = e => {
    setAnswer({ answer: e.target.value });
  };

  const ChangeGrade = e => {
    setGrade({ grade: e.target.value });
  };

  return (
    <>
      <AddUser>
        {/* <Row gutter={15} style={{ background: '#fff' }}>
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
                      <div className={isIcon ? 'addRemovebars' : 'addRemoveclose'} onClick={handleClick1}>
                        <i class="fa fa-bars"></i>
                        <i class="fa fa-close"></i>
                      </div>
                    </a>
                  </div>

                  <div className={isActive1 ? 'topmenudesignblock' : 'topmenudesign'}>
                    <div className="header-main-right topnav header-main-right topnav" id="myTopnav">
                      <div className="header-nav">
                        <div className="main-menu">
                          <NavLink className={isActive ? 'mobsubclick' : 'pass-links  homeMenus'} to="/consultation">
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
                            className={chooosemenu ? 'mobsubclick' : 'slide-animate pass-links'}
                            to="/consultation"
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
                            to="/consultation"
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
                            to="/consultation"
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
                            to="/consultation"
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
                            to="/consultation"
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
        {/* <div className="ContactFreeCF-main"> */}
        <div className="mainBubbles contactnewanimate" style={{ backgroundColor: '#f7f8fc' }}>
          <div className="ContactFreeCF">
            <Row className=" consultpage">
              <Col md={12}>
                <div className="MainFirstFormDiv">
                  <h1>Contact Us</h1>
                  <h4>
                    Every UpstartPrep tutoring relationship begins with a conversation. Here’s what to expect when you
                    contact us:
                  </h4>
                </div>
              </Col>
              <Col md={12} className="consulatantimg">
                <img src={consulatantimg} style={{ width: '100%' }}></img>
              </Col>
            </Row>
          </div>
        </div>
        {/* </div> */}

        <div className="schedule-mainbg ContactFreeCF">
          <Row>
            <Col md={24} style={{ position: 'static' }}>
              <div className="mainneedsDiv">
                <div className="mainneedsDiv1">
                  <FeatherIcon icon="arrow-up-right" className="mainneedsDivSVG" />
                  <p>1</p>
                  <h1>We’ll learn about your needs and goals.</h1>
                </div>
                <div className="mainneedsDiv1">
                  <FeatherIcon icon="arrow-up-right" className="mainneedsDivSVG" />
                  <p>2</p>
                  <h1>We come up with a great option (or options) for you.</h1>
                </div>
                <div className="mainneedsDiv1">
                  <FeatherIcon icon="arrow-up-right" className="mainneedsDivSVG" />
                  <p>3</p>
                  <h1>You decide whom you want to work with.</h1>
                </div>
                <div className="mainneedsDiv1">
                  <FeatherIcon icon="arrow-up-right" className="mainneedsDivSVG" />
                  <p>4</p>
                  <h1>You’ll get started, and we’ll check in regularly.</h1>
                </div>
              </div>
            </Col>
          </Row>
          <Row style={{ marginBottom: '30px' }} id="formconsultation">
            <Col md={6}>
              <div className="left-address">
                <p>
                  Please feel free to contact us with any question or concern. Our client service team is here to help,
                  by phone or email.
                </p>
                <p>
                  <a href="">617.714.5262</a>
                </p>
                <p>
                  <a href="">info@signeteducation.com</a>
                </p>
                <address>MAILING ADDRESS Signet Education 160 Alewife Brook Pkwy #1247 Cambridge, MA 02138</address>
              </div>
            </Col>
            <Col md={18}>
              <div className="main-schedule">
                <div className="inner-main-schedule">
                  <Form form={form} id="ConsultationForm" className="consultationMain-Form">
                    <div
                      className="inner-main-schedule"
                      id="step_1"
                      style={{ marginTop: '80px', marginBottom: '100px' }}
                    >
                      <Col md={24}>
                        <h2>Hello, Answer a few Questions and we’ll get in touch with you shortly.</h2>
                        <Button
                          onClick={() => {
                            handleClick(
                              ['step_2'],
                              [
                                'step_1',
                                'step_3',
                                'step_4',
                                'step_5',
                                'step_6',
                                'step_7',
                                'step_8',
                                'step_9',
                                'step_10',
                                'step_11',
                                'step_12',
                                'step_13',
                                'step_14',
                                'step_15',
                              ],
                            );
                            //handleClickRemove3();
                          }}
                        >
                          Schedule a Free Call
                        </Button>
                      </Col>
                    </div>
                    <div className="inner-main-schedule helpspacetop" id="step_2" style={{ display: 'none' }}>
                      <div className="aboutChallanges-title">
                        <h3>
                          How can we help you?
                          <span className="required-color">*</span>
                        </h3>
                        <p>You can elaborate further with the next question?</p>
                        <p>You can select as many as you’d like</p>
                      </div>
                      <div className="aboutChallanges-form" name="helpSection">
                        <p>Choose as many as you like</p>
                        <div class="form-group">
                          <input
                            type="checkbox"
                            name="about_course"
                            id="specific-course"
                            onChange={e => {
                              HandleCanHelpButton(e);
                            }}
                          />
                          <label for="specific-course">
                            Preparing for a standardized exam (ISEE, SSAT, HSPT, ,PSAT, SAT, ACT, GRE, ETC)
                          </label>
                        </div>

                        <div class="form-group">
                          <input
                            type="checkbox"
                            name="about_test"
                            id="standardized-test"
                            onChange={e => {
                              HandleCanHelpButton(e);
                            }}
                          />
                          <label for="standardized-test">Keeping up with a specific course or class</label>
                        </div>

                        <div class="form-group twolinesTick">
                          <input
                            type="checkbox"
                            name="about_motivate"
                            id="motivate"
                            onChange={e => {
                              HandleCanHelpButton(e);
                            }}
                          />
                          <label for="motivate">Applying to College (BS, BA, and other undergraduate degrees)</label>
                        </div>

                        <div class="form-group">
                          <input
                            type="checkbox"
                            name="about_Apply"
                            id="Applyingclg"
                            onChange={e => {
                              HandleCanHelpButton(e);
                            }}
                          />
                          <label for="Applyingclg">
                            Applying to a graduate school (Masters, PhD, or Professional schools)
                          </label>
                        </div>

                        <div class="form-group">
                          <input
                            type="checkbox"
                            name="about_graduate"
                            id="graduateSchool"
                            onChange={e => {
                              HandleCanHelpButton(e);
                            }}
                          />
                          <label for="graduateSchool">
                            Support for ADHD, Autism, Dyslexia, or other learning differences
                          </label>
                        </div>

                        <div class="form-group">
                          <input
                            type="checkbox"
                            name="about_Other"
                            id="Enhancing"
                            onChange={e => {
                              HandleCanHelpButton(e);
                            }}
                          />
                          <label
                            for="Enhancing"
                            onChange={e => {
                              HandleCanHelpButton(e);
                            }}
                          >
                            Enhancing organization, motivation, and executive functioning skills
                          </label>
                        </div>

                        <div class="form-group">
                          <input
                            type="checkbox"
                            name="about_other"
                            id="Other"
                            onChange={e => {
                              HandleCanHelpButton(e);
                            }}
                          />
                          <label for="Other">Other</label>
                        </div>

                        <div style={{ textAlign: 'left' }} className="CNextPrevBtn">
                          <Button
                            onClick={() => {
                              handleClick(
                                ['step_1'],
                                [
                                  'step_2',
                                  'step_3',
                                  'step_4',
                                  'step_5',
                                  'step_6',
                                  'step_7',
                                  'step_8',
                                  'step_9',
                                  'step_10',
                                  'step_11',
                                  'step_12',
                                  'step_13',
                                  'step_14',
                                  'step_15',
                                ],
                              );
                              //handleClickRemove3();
                            }}
                          >
                            Previous
                          </Button>
                          <Button
                            onClick={() => {
                              //checkCheckBoxes();
                              handleClick(
                                ['step_3'],
                                [
                                  'step_1',
                                  'step_2',
                                  'step_4',
                                  'step_5',
                                  'step_6',
                                  'step_7',
                                  'step_8',
                                  'step_9',
                                  'step_10',
                                  'step_11',
                                  'step_12',
                                  'step_13',
                                  'step_14',
                                  'step_15',
                                ],
                              );
                              //handleClickRemove3();
                            }}
                            disabled={CanHelpButton == false}
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="inner-main-schedule"
                      style={{ marginTop: '80px', marginBottom: '100px', display: 'none' }}
                      id="step_3"
                    >
                      <div className="aboutChallanges-title tellUsabout">
                        <h3>How should we address you? </h3>
                        {/* <p>
                (Please include your grade level, academic subject, specific standardized test, graduate program, etc.
                as well as any other information you'd like to share.)
              </p> */}
                      </div>
                      <div className="cFormfeilds">
                        <div className="aboutChallanges-form">
                          {/* <input
                            type="text"
                            placeholder="First name"
                            name="f_name"
                            className="tellUsabout-input"
                            required
                          /> */}
                          <Form.Item
                            name="f_name"
                            className="tellUsabout-input"
                            rules={[
                              {
                                message: 'First name is required !',
                              },
                            ]}
                          >
                            <Input placeholder="First name" name="f_name" />
                          </Form.Item>
                        </div>
                        <div className="aboutChallanges-form">
                          <Form.Item
                            name="l_name"
                            className="tellUsabout-input"
                            rules={[
                              {
                                message: 'Last name is required !',
                              },
                            ]}
                          >
                            <Input placeholder="Last name" name="l_name" />
                          </Form.Item>
                        </div>
                      </div>

                      <div style={{ textAlign: 'left' }} className="CNextPrevBtn">
                        <Button
                          onClick={() => {
                            handleClick(
                              ['step_2'],
                              [
                                'step_1',
                                'step_3',
                                'step_4',
                                'step_5',
                                'step_6',
                                'step_7',
                                'step_8',
                                'step_9',
                                'step_10',
                                'step_11',
                                'step_12',
                                'step_13',
                                'step_14',
                                'step_15',
                              ],
                            );
                            //handleClickRemove3();
                          }}
                        >
                          Previous
                        </Button>
                        <Button
                          onClick={() => {
                            handleClick(
                              ['step_4'],
                              [
                                'step_1',
                                'step_2',
                                'step_3',
                                'step_5',
                                'step_6',
                                'step_7',
                                'step_8',
                                'step_9',
                                'step_10',
                                'step_11',
                                'step_12',
                                'step_13',
                                'step_14',
                                'step_15',
                              ],
                            );
                            //handleClickRemove3();
                          }}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                    <div
                      className="inner-main-schedule"
                      id="step_4"
                      style={{ marginTop: '80px', marginBottom: '100px', display: 'none' }}
                    >
                      <div className="aboutChallanges-title yourname">
                        <h3>
                          Thank you, could you share more about the specific hurdles you’re encountering?
                          <span className="required-color">*</span>
                        </h3>
                        <p>Share as much information as you’d like. We will ask all the technical details later</p>
                      </div>
                      <div className="aboutChallanges-form">
                        <input
                          type="text"
                          name="answer"
                          placeholder="Type your answer here..."
                          className="tellUsabout-input"
                          value={Answer?.answer}
                          onChange={ChangeAnswer}
                        />
                      </div>

                      <div style={{ textAlign: 'left' }} className="CNextPrevBtn">
                        <Button
                          onClick={() => {
                            handleClick(
                              ['step_3'],
                              [
                                'step_2',
                                'step_1',
                                'step_4',
                                'step_5',
                                'step_6',
                                'step_7',
                                'step_8',
                                'step_9',
                                'step_10',
                                'step_11',
                                'step_12',
                                'step_13',
                                'step_14',
                                'step_15',
                              ],
                            );
                            //handleClickRemove3();
                          }}
                        >
                          Previous
                        </Button>
                        <Button
                          onClick={() => {
                            handleClick(
                              ['step_5'],
                              [
                                'step_1',
                                'step_2',
                                'step_4',
                                'step_6',
                                'step_7',
                                'step_8',
                                'step_9',
                                'step_10',
                                'step_11',
                                'step_12',
                                'step_13',
                                'step_14',
                                'step_15',
                              ],
                            );
                            //handleClickRemove3();
                          }}
                          disabled={!Answer?.answer}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                    <div
                      className="inner-main-schedule"
                      id="step_5"
                      style={{ marginTop: '80px', marginBottom: '100px', display: 'none' }}
                    >
                      <div className="aboutChallanges-title yourname">
                        <h3>What’s your students name?</h3>
                        <p>If you are the student, you can leave this blank.</p>
                      </div>
                      <div className="cFormfeilds ">
                        <div className="aboutChallanges-form">
                          <input type="text" placeholder="First Name" name="s_f_name" className="tellUsabout-input" />
                        </div>
                        <div className="aboutChallanges-form">
                          <input type="text" placeholder="Last Name" name="s_l_name" className="tellUsabout-input" />
                        </div>
                      </div>

                      <div style={{ textAlign: 'left' }} className="CNextPrevBtn">
                        <Button
                          onClick={() => {
                            handleClick(
                              ['step_4'],
                              [
                                'step_2',
                                'step_1',
                                'step_3',
                                'step_5',
                                'step_6',
                                'step_7',
                                'step_8',
                                'step_9',
                                'step_10',
                                'step_11',
                                'step_12',
                                'step_13',
                                'step_14',
                                'step_15',
                              ],
                            );
                            //handleClickRemove3();
                          }}
                        >
                          Previous
                        </Button>
                        <Button
                          onClick={() => {
                            handleClick(
                              ['step_6'],
                              [
                                'step_1',
                                'step_2',
                                'step_4',
                                'step_5',
                                'step_7',
                                'step_8',
                                'step_9',
                                'step_10',
                                'step_11',
                                'step_12',
                                'step_13',
                                'step_14',
                                'step_15',
                              ],
                            );
                            //handleClickRemove3();
                          }}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                    <div
                      className="inner-main-schedule"
                      id="step_6"
                      style={{ marginTop: '80px', marginBottom: '100px', display: 'none' }}
                    >
                      <div className="aboutChallanges-title yourname">
                        <h3>
                          Grade Level?
                          <span className="required-color">*</span>
                        </h3>
                        <p>This helps us decide how best to help during the call.</p>
                      </div>
                      <div className="aboutChallanges-form">
                        <input
                          type="number"
                          name="gradelevel"
                          placeholder="Grade Level?"
                          className="tellUsabout-input"
                          value={Grade?.grade}
                          onChange={ChangeGrade}
                        />
                      </div>

                      <div style={{ textAlign: 'left' }} className="CNextPrevBtn">
                        <Button
                          onClick={() => {
                            handleClick(
                              ['step_5'],
                              [
                                'step_1',
                                'step_2',
                                'step_3',
                                'step_4',
                                'step_6',
                                'step_7',
                                'step_8',
                                'step_9',
                                'step_10',
                                'step_11',
                                'step_12',
                                'step_13',
                                'step_14',
                                'step_15',
                              ],
                            );
                            //handleClickRemove3();
                          }}
                        >
                          Previous
                        </Button>
                        <Button
                          onClick={() => {
                            handleClick(
                              ['step_7'],
                              [
                                'step_1',
                                'step_2',
                                'step_3',
                                'step_4',
                                'step_5',
                                'step_6',
                                'step_8',
                                'step_9',
                                'step_10',
                                'step_11',
                                'step_12',
                                'step_13',
                                'step_14',
                                'step_15',
                              ],
                            );
                            //handleClickRemove3();
                          }}
                          disabled={!Grade?.grade}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                    <div className="inner-main-schedule" id="step_7" style={{ display: 'none' }}>
                      <div className="aboutChallanges-title">
                        <h3>What exam are you preparing for?</h3>
                        <p>Leave blank, if you’re not preparing for an exam.</p>
                      </div>

                      <div className="aboutChallanges-form">
                        <input
                          type="text"
                          name="exam_prepare"
                          placeholder="exam preparing"
                          className="tellUsabout-input"
                        />
                      </div>
                      <div style={{ textAlign: 'left' }} className="CNextPrevBtn">
                        <Button
                          onClick={() => {
                            handleClick(
                              ['step_6'],
                              [
                                'step_1',
                                'step_2',
                                'step_3',
                                'step_4',
                                'step_5',
                                'step_7',
                                'step_8',
                                'step_9',
                                'step_10',
                                'step_11',
                                'step_12',
                                'step_13',
                                'step_14',
                                'step_15',
                              ],
                            );
                            //handleClickRemove3();
                          }}
                        >
                          Previous
                        </Button>
                        <Button
                          onClick={() => {
                            handleClick(
                              ['step_8'],
                              [
                                'step_1',
                                'step_2',
                                'step_4',
                                'step_5',
                                'step_6',
                                'step_7',
                                'step_9',
                                'step_10',
                                'step_11',
                                'step_12',
                                'step_13',
                                'step_14',
                                'step_15',
                              ],
                            );
                            //handleClickRemove3();
                          }}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                    <div className="inner-main-schedule" id="step_8" style={{ display: 'none' }}>
                      <div className="aboutChallanges-title">
                        <h3>Awesome, when is test day?</h3>
                        <p>This helps our system and admin team personalize your plan</p>
                      </div>
                      <div className="aboutChallanges-form">
                        <div class="form-group">
                          <input type="checkbox" id="plan_yes" name="plan_yes" />
                          <label for="plan_yes">Yes</label>
                        </div>

                        <div class="form-group">
                          <input type="checkbox" id="plan_no" name="plan_no" />
                          <label for="plan_no">No</label>
                        </div>
                      </div>
                      <div style={{ textAlign: 'left' }} className="CNextPrevBtn">
                        <Button
                          onClick={() => {
                            handleClick(
                              ['step_7'],
                              [
                                'step_1',
                                'step_2',
                                'step_3',
                                'step_4',
                                'step_5',
                                'step_6',
                                'step_8',
                                'step_9',
                                'step_10',
                                'step_11',
                                'step_12',
                                'step_13',
                                'step_14',
                                'step_15',
                              ],
                            );
                            //handleClickRemove3();
                          }}
                        >
                          Previous
                        </Button>
                        <Button
                          onClick={() => {
                            handleClick(
                              ['step_9'],
                              [
                                'step_1',
                                'step_2',
                                'step_3',
                                'step_4',
                                'step_5',
                                'step_6',
                                'step_7',
                                'step_8',
                                'step_10',
                                'step_11',
                                'step_13',
                                'step_12',
                                'step_14',
                                'step_15',
                              ],
                            );
                            //handleClickRemove3();
                          }}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                    <div className="inner-main-schedule" id="step_9" style={{ display: 'none' }}>
                      <div className="aboutChallanges-title">
                        <h3>Do you already have an account with us?</h3>
                        <p>Our consultants use this to access the student’s dashboard to learn more.</p>
                      </div>

                      <div className="aboutChallanges-form">
                        <div class="form-group">
                          <input type="checkbox" id="s_Signet-client-yes" name="s_Signet_client_yes" />
                          <label for="s_Signet-client-yes">Yes</label>
                        </div>

                        <div class="form-group">
                          <input type="checkbox" id="s_Signet-client-no" name="s_Signet_client_no" />
                          <label for="s_Signet-client-no">No</label>
                        </div>
                      </div>
                      <div style={{ textAlign: 'left' }} className="CNextPrevBtn">
                        <Button
                          onClick={() => {
                            handleClick(
                              ['step_8'],
                              [
                                'step_1',
                                'step_2',
                                'step_3',
                                'step_4',
                                'step_5',
                                'step_6',
                                'step_7',
                                'step_9',
                                'step_10',
                                'step_11',
                                'step_12',
                                'step_13',
                                'step_14',
                                'step_15',
                              ],
                            );
                            //handleClickRemove3();
                          }}
                        >
                          Previous
                        </Button>
                        <Button
                          onClick={() => {
                            handleClick(
                              ['step_10'],
                              [
                                'step_1',
                                'step_2',
                                'step_3',
                                'step_4',
                                'step_5',
                                'step_6',
                                'step_7',
                                'step_8',
                                'step_9',
                                'step_11',
                                'step_12',
                                'step_13',
                                'step_14',
                                'step_15',
                              ],
                            );
                            //handleClickRemove3();
                          }}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                    <div className="inner-main-schedule" id="step_10" style={{ display: 'none' }}>
                      <div className="aboutChallanges-title">
                        <h3>Are you interested in tutoring?</h3>
                        <p>
                          You can answer with a yes, no or maybe. This doesn’t affect the quality of the consultation
                        </p>
                      </div>

                      <div className="aboutChallanges-form">
                        <div class="form-group">
                          <input type="checkbox" id="t_Signet_client_yes" name="t_Signet_client_yes" />
                          <label for="t_Signet_client_yes">Yes</label>
                        </div>

                        <div class="form-group">
                          <input type="checkbox" id="another-org" name="t_Signet_client_no" />
                          <label for="another-org">No</label>
                        </div>

                        <div class="form-group">
                          <input type="checkbox" id="Maybe" name="t_Signet_client_maybe" />
                          <label for="Maybe">Maybe</label>
                        </div>
                      </div>
                      <div style={{ textAlign: 'left' }} className="CNextPrevBtn">
                        <Button
                          onClick={() => {
                            handleClick(
                              ['step_9'],
                              [
                                'step_1',
                                'step_2',
                                'step_3',
                                'step_4',
                                'step_5',
                                'step_6',
                                'step_7',
                                'step_8',
                                'step_10',
                                'step_11',
                                'step_12',
                                'step_13',
                                'step_14',
                                'step_15',
                              ],
                            );
                            //handleClickRemove3();
                          }}
                        >
                          Previous
                        </Button>
                        <Button
                          onClick={() => {
                            handleClick(
                              ['step_11'],
                              [
                                'step_2',
                                'step_1',
                                'step_3',
                                'step_4',
                                'step_5',
                                'step_6',
                                'step_7',
                                'step_8',
                                'step_9',
                                'step_10',
                                'step_13',
                                'step_12',
                                'step_15',
                                'step_14',
                              ],
                            );
                            //handleClickRemove3();
                          }}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                    <div
                      className="inner-main-schedule"
                      id="step_11"
                      style={{ marginTop: '80px', display: 'none', marginBottom: '100px' }}
                    >
                      <Col md={24}>
                        <form>
                          <div className="aboutChallanges-title yourname">
                            <h3>Whats your email?</h3>
                          </div>
                          <div className="aboutChallanges-form">
                            <input type="email" placeholder="email" name="email" className="tellUsabout-input" />
                          </div>

                          <div style={{ textAlign: 'left' }} className="CNextPrevBtn">
                            <Button
                              onClick={() => {
                                handleClick(
                                  ['step_10'],
                                  [
                                    'step_1',
                                    'step_2',
                                    'step_3',
                                    'step_4',
                                    'step_5',
                                    'step_6',
                                    'step_7',
                                    'step_8',
                                    'step_9',
                                    'step_11',
                                    'step_12',
                                    'step_13',
                                    'step_14',
                                    'step_15',
                                  ],
                                );
                                //handleClickRemove3();
                              }}
                            >
                              Previous
                            </Button>
                            <Button
                              onClick={() => {
                                handleClick(
                                  ['step_12'],
                                  [
                                    'step_2',
                                    'step_1',
                                    'step_4',
                                    'step_3',
                                    'step_6',
                                    'step_7',
                                    'step_5',
                                    'step_8',
                                    'step_9',
                                    'step_10',
                                    'step_11',
                                    'step_13',
                                    'step_14',
                                    'step_15',
                                  ],
                                );
                                //handleClickRemove3();
                              }}
                            >
                              Next
                            </Button>
                          </div>
                        </form>
                      </Col>
                    </div>
                    <div className="inner-main-schedule" id="step_12" style={{ display: 'none' }}>
                      <div className="aboutChallanges-title">
                        <h3>What’s the best way for us to get in touch for your complimentary consultation. </h3>
                        <p>
                          By sharing your number, you’re kindly giving us permission to call you about the service you
                          requested.
                        </p>
                      </div>

                      <div className="aboutChallanges-form">
                        <input type="number" placeholder="number" name="number" className="tellUsabout-input" />
                      </div>

                      <div style={{ textAlign: 'left' }} className="CNextPrevBtn">
                        <Button
                          onClick={() => {
                            handleClick(
                              ['step_11'],
                              [
                                'step_1',
                                'step_2',
                                'step_3',
                                'step_4',
                                'step_5',
                                'step_6',
                                'step_7',
                                'step_8',
                                'step_9',
                                'step_10',
                                'step_12',
                                'step_13',
                                'step_14',
                                'step_15',
                              ],
                            );
                            //handleClickRemove3();
                          }}
                        >
                          Previous
                        </Button>
                        <Button
                          onClick={() => {
                            handleClick(
                              ['step_13'],
                              [
                                'step_1',
                                'step_2',
                                'step_3',
                                'step_4',
                                'step_5',
                                'step_6',
                                'step_7',
                                'step_8',
                                'step_9',
                                'step_10',
                                'step_11',
                                'step_12',
                                'step_14',
                                'step_15',
                              ],
                            );
                            //handleClickRemove3();
                          }}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                    <div className="inner-main-schedule" id="step_13" style={{ display: 'none' }}>
                      <div className="aboutChallanges-title">
                        <h3>In which time zone do you reside?</h3>
                        <p>
                          We want to make sure we don’t interrupt your favorite tv show. *Can we provide time and time
                          zones
                        </p>
                      </div>

                      <div className="aboutChallanges-form">
                        <div class="form-group">
                          <input type="checkbox" id="zone-yes" name="zone_yes" />
                          <label for="zone-yes">Yes</label>
                        </div>

                        <div class="form-group">
                          <input type="checkbox" id="zone_no" name="zone_no" />
                          <label for="zone_no">No</label>
                        </div>
                      </div>
                      <div style={{ textAlign: 'left' }} className="CNextPrevBtn">
                        <Button
                          onClick={() => {
                            handleClick(
                              ['step_12'],
                              [
                                'step_1',
                                'step_2',
                                'step_3',
                                'step_4',
                                'step_5',
                                'step_6',
                                'step_7',
                                'step_8',
                                'step_9',
                                'step_10',
                                'step_11',
                                'step_13',
                                'step_14',
                                'step_15',
                              ],
                            );
                            //handleClickRemove3();
                          }}
                        >
                          Previous
                        </Button>
                        <Button
                          onClick={() => {
                            handleClick(
                              ['step_14'],
                              [
                                'step_2',
                                'step_1',
                                'step_4',
                                'step_3',
                                'step_6',
                                'step_7',
                                'step_5',
                                'step_8',
                                'step_9',
                                'step_10',
                                'step_11',
                                'step_12',
                                'step_13',
                                'step_15',
                              ],
                            );
                            //handleClickRemove3();
                          }}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                    <div className="inner-main-schedule" id="step_14" style={{ display: 'none' }}>
                      <div className="aboutChallanges-title">
                        <h3>This is great, how did you hear about us?</h3>
                      </div>

                      <div className="aboutChallanges-form" onChange={() => handleChange()}>
                        <div class="form-group">
                          <input type="checkbox" id="prep_client" name="prep_client" />
                          <label for="prep_client">From an Upstart Prep Client</label>
                        </div>

                        <div class="form-group">
                          <input type="checkbox" id="Online_org" name="Online_org" />
                          <label for="Online_org">Online</label>
                        </div>

                        <div class="form-group">
                          <input type="checkbox" id="Returning-org" name="Returning_org" />
                          <label for="Returning-org">Returning Upstart Prep Client</label>
                        </div>

                        <div class="form-group">
                          <input type="checkbox" id="speaking_org" name=" speaking_org" />
                          <label for="speaking_org">From a speaking event</label>
                        </div>

                        <div class="form-group">
                          <input type="checkbox" id="staff-org" name="staff_org" />
                          <label for="staff-org">From a staff member</label>
                        </div>

                        <div class="form-group">
                          <input type="checkbox" id="organization" name="organization" />
                          <label for="organization">From a organization</label>
                        </div>

                        <div class="form-group">
                          <input type="checkbox" id="Other" name="othersAbout" />
                          <label for="Other">Other</label>
                        </div>
                      </div>
                      <div style={{ textAlign: 'left' }} className="CNextPrevBtn">
                        <Button
                          onClick={() => {
                            handleClick(
                              ['step_13'],
                              [
                                'step_1',
                                'step_2',
                                'step_3',
                                'step_4',
                                'step_5',
                                'step_6',
                                'step_7',
                                'step_8',
                                'step_9',
                                'step_10',
                                'step_11',
                                'step_12',
                                'step_14',
                                'step_15',
                              ],
                            );
                            //handleClickRemove3();
                          }}
                        >
                          Previous
                        </Button>
                        <Button
                          onClick={() => {
                            openMessage(
                              ['step_15'],
                              [
                                'step_2',
                                'step_1',
                                'step_4',
                                'step_3',
                                'step_6',
                                'step_7',
                                'step_5',
                                'step_8',
                                'step_9',
                                'step_10',
                                'step_11',
                                'step_12',
                                'step_13',
                                'step_14',
                              ],
                            );
                            HandleSubmitForm();
                            //handleClickRemove3();
                          }}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                    <div
                      className="inner-main-schedule"
                      id="step_15"
                      style={{ marginTop: '80px', marginBottom: '100px', display: 'none' }}
                    >
                      <div className="aboutChallanges-title yourname">
                        <h2>Perfect! We will be in touch soon</h2>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="ContactFreeCF">
          <Row gutter={30} className=" contact_us">
            <Col md={8} className="contact_title">
              {/* <h1>Sign up for our newsletter</h1> */}
              <h1>Subscribe me to the newsletter</h1>
            </Col>
            <Col md={16}>
              <div className="contact_form">
                <form className="form-subscribe" action="#">
                  <div className="input-group flexinput">
                    <span className="newsletterbg">
                      <input type="text" className="form-control input-lg" placeholder="Your eamil address" />
                    </span>
                    <div className="input-group-btn">
                      <FeatherIcon icon="arrow-right" />
                    </div>
                  </div>
                </form>
                {/* <Col md={24} xs={24} className="cont_first">
                  <Input type="text" name="firsr_name" placeholder="First Name"></Input>
                </Col>
                <Col md={24} xs={24} className="cont_last">
                  <Input type="text" name="last_name" placeholder="Last Name"></Input>
                </Col>
                <Col md={24} xs={24} className="cont_email">
                  <Input type="email" name="email" placeholder="Email"></Input>
                </Col>
                <Col md={24} xs={24} className="select_class">
                  <Select>
                    <Option>Class of 2023</Option>
                    <Option>Class of 2024</Option>
                    <Option>Class of 2025</Option>
                  </Select>
                </Col>
                <Col md={24} className="align_sub_btn">
                  <Button htmltype="submit" className="sub_cont">
                    SUBSCRIBE
                  </Button>
                </Col> */}
              </div>
            </Col>
          </Row>
        </div>

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
      </AddUser>
    </>
  );
};

export default Consultation;
