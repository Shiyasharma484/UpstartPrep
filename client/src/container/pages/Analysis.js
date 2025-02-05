import React, { useEffect, useState } from 'react';
import { Row, Col, Tabs, Form, notification, Input, Button, Select, DatePicker } from 'antd';
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
import VerbalReasoning from './VerbalReasoning';
import QuantitativeReasoning from './QuantativeReasoning';
import ReadingComprehension from './ReadingComprehension';
import MathematicsAchievement from './MathematicsAchievement';
import { CChart } from '@coreui/react-chartjs';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { decodetheid, encrypttheid } = require('../../helpers/encode-decode');
const Analysis = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [CategoryData, setCategoryData] = useState({});
  const [PlansData, setPlansData] = useState([]);
  const [featurearraydata, setfeaturearraydata] = useState([]);
  const [ConfigData, setConfigData] = useState([]);
  const [Message, setMessage] = useState();

  const [showlogo, setshowlogo] = useState();
  const [CategoryID, setCategoryID] = useState();

  const [isBilling, setIsBilling] = useState(false);

  //
  const location = useLocation();
  const Params = useParams();
  console.log(location);
  const EventType = location?.state;
  const EventID = Params?.id;
  //

  const [ScoreData, setScoreData] = useState();
  useEffect(() => {
    var score_url;
    const enc_user_detail = Cookies.get('UserDetail');
    if (EventType && EventType != undefined) {
      const id = decodetheid(EventID);
      console.log(EventType);
      console.log(id);
      if (EventType == 'Quiz') {
        score_url = api_url.getQuiz_score_byID + id;
      } else if (EventType == 'Exam') {
        score_url = api_url.getExam_score_byID + id;
      } else if (EventType == 'Practice') {
        score_url = api_url.getPracticeSet_score_byID + id;
      }

      GetScoreByID();
    }
    async function GetScoreByID() {
      console.log(score_url);
      const response = await get_api_request(score_url, headers);
      console.log(response);
      if (response?.status == 200) {
        const data = response?.data?.data?.[0];
        //data.exam_attempted = data.exam_attempted? Array.from(data.exam_attempted.split(','), Number).join(',') : {};
        // data.exam_not_attempted = data.exam_not_attempted ? Array.from(data.exam_not_attempted.split(','), Number) : [];
        // data.incorrect_answers = data.incorrect_answers ? Array.from(data.incorrect_answers.split(','), Number) : [];
        data?.details?.map((item, i) => {
          data.details[i].answers = item.answers ? JSON.parse(item.answers) : '';
          data.details[i].options = item.options ? JSON.parse(item.options) : '';
          data.details[i].student_answers = item.student_answers ? JSON.parse(item.student_answers) : '';
        });

        console.log(data);
        setScoreData(data);
      }
    }
  }, []);

  /**CUSTOME TAB PAN =======================================================START **/
  function openAnalysis(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(cityName).style.display = 'block';
    evt.currentTarget.className += ' active';
  }

  function openOverview(evt2, cityName2) {
    var i, tabcontent2, tablinks2;
    tabcontent2 = document.getElementsByClassName('tabcontent2');
    for (i = 0; i < tabcontent2.length; i++) {
      tabcontent2[i].style.display = 'none';
    }
    tablinks2 = document.getElementsByClassName('tablinks2');
    for (i = 0; i < tablinks2.length; i++) {
      tablinks2[i].className = tablinks2[i].className.replace(' active', '');
    }
    document.getElementById(cityName2).style.display = 'block';
    evt2.currentTarget.className += ' active';
  }

  /**CUSTOME TAB PAN =======================================================ENDS **/

  return (
    <>
      <Main className="removeSpaces">
        <Row gutter={15} style={{ background: '#fff' }}>
          <Col xs={24}>
            <div className="custom-header">
              <NavLink className="pass-link" to="/">
                <img src={domainpath + showlogo} />
              </NavLink>
            </div>
          </Col>
        </Row>

        <div className="custom-container">
          <Row>
            <div className="MainResult">
              <div className="firstRowResult">
                <h1>ISEE UPPER #1</h1>
              </div>
            </div>
          </Row>
          <Row>
            <Col md={24} className="main-analysisTabs">
              <div className="analysisTabs">
                <div class="tab">
                  <button
                    class="tablinks active"
                    onClick={e => {
                      openAnalysis(e, 'Overview');
                    }}
                  >
                    <div className="flexTab-Title">
                      <span>SUMMARY</span>
                      TEST <br />
                      OVERVIEW
                    </div>
                  </button>

                  <button
                    class="tablinks"
                    onClick={e => {
                      openAnalysis(e, 'Verbal');
                    }}
                  >
                    <div className="flexTab-Title">
                      <span>VIEW RESULTS</span>
                      VERBAL REASONING
                    </div>
                  </button>

                  <button
                    class="tablinks"
                    onClick={e => {
                      openAnalysis(e, 'QUANTITATIVE');
                    }}
                  >
                    <div className="flexTab-Title">
                      <span>VIEW RESULTS</span>
                      QUANTITATIVE REASONING
                    </div>
                  </button>

                  <button
                    class="tablinks"
                    onClick={e => {
                      openAnalysis(e, 'Reading');
                    }}
                  >
                    <div className="flexTab-Title">
                      <span>VIEW RESULTS</span>
                      READING COMPREHENSION
                    </div>
                  </button>

                  <button
                    class="tablinks"
                    onClick={e => {
                      openAnalysis(e, 'Math');
                    }}
                  >
                    <div className="flexTab-Title">
                      <span>VIEW RESULTS</span>
                      MATHEMATICS ACHIEVEMENT
                    </div>
                  </button>

                  <button
                    class="tablinks"
                    onClick={e => {
                      openAnalysis(e, 'Essay');
                    }}
                  >
                    <div className="flexTab-Title">
                      <span>CONTINUE</span>
                      ESSAY
                    </div>
                  </button>
                </div>
                <div id="Overview" class="tabcontent" style={{ display: 'block' }}>
                  <Row>
                    <Col md={24}>
                      <div class="tab verticalTab">
                        <Row className="verticalTabInner">
                          <Col md={5}>
                            <button
                              class="tablinks2 active"
                              onClick={e => {
                                openOverview(e, 'schoolsapply');
                              }}
                            >
                              <div className="flexTab-Title">
                                <FeatherIcon icon="chevrons-right" />
                                <div class="tabs-cont">
                                  St. Thomas High
                                  <span>Greater Houston</span>
                                </div>
                              </div>
                            </button>

                            <button
                              class="tablinks2"
                              onClick={e => {
                                openOverview(e, 'Riverdale');
                              }}
                            >
                              <div className="flexTab-Title">
                                <FeatherIcon icon="chevrons-right" />
                                <div class="tabs-cont">
                                  Strake Jesuit
                                  <span>Houston</span>
                                </div>
                              </div>
                            </button>

                            <button class="tablinks2" onClick={() => setIsBilling(true)}>
                              <div className="flexTab-Title">
                                <FeatherIcon icon="plus-circle" />
                                What schools are you applying to?
                              </div>
                            </button>
                          </Col>

                          <Col md={19}>
                            <div id="schoolsapply" class="tabcontent2" style={{ display: 'block' }}>
                              <div className="Analysis-Table">
                                <div className="Analysis-inner-Table Analysis-head">
                                  <div className="Analysis-Table-row">
                                    <div className="Analysis-Table-sec">
                                      <p>SECTION</p>
                                    </div>
                                    <div className="Analysis-Table-sec">
                                      <p>RAW SCORE</p>
                                    </div>
                                    <div className="Analysis-Table-sec">
                                      <p>PERCENTILE</p>
                                    </div>
                                    <div className="Analysis-Table-sec stanine-sec">
                                      <p>STANINE ANALYSIS</p>
                                      <div className="stanine-flex size-stanine">
                                        <p>1</p>
                                        <p>2</p>
                                        <p>3</p>
                                        <p>4</p>
                                        <p>5</p>
                                        <p>6</p>
                                        <p>7</p>
                                        <p>8</p>
                                        <p>9</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="Analysis-inner-Table">
                                  <div className="Analysis-Table-row">
                                    <div className="Analysis-Table-sec">
                                      <p>Verbal Reasoning</p>
                                    </div>
                                    <div className="Analysis-Table-sec">
                                      <p>32 of 40</p>
                                    </div>
                                    <div className="Analysis-Table-sec">
                                      <p>
                                        78<sup>th</sup>
                                      </p>
                                    </div>
                                    <div className="Analysis-Table-sec stanine-sec">
                                      <div className="stanine-flex space-stanine">
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red">-</p>
                                        <p className="stanine-flex-red">7</p>
                                        <p className="stanine-flex-yellow">-</p>
                                        <p className="stanine-flex-green"></p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="Analysis-inner-Table">
                                  <div className="Analysis-Table-row">
                                    <div className="Analysis-Table-sec">
                                      <p>Quantitative Reasoning</p>
                                    </div>
                                    <div className="Analysis-Table-sec">
                                      <p>17 of 37</p>
                                    </div>
                                    <div className="Analysis-Table-sec">
                                      <p>
                                        20<sup>th</sup>
                                      </p>
                                    </div>
                                    <div className="Analysis-Table-sec stanine-sec">
                                      <div className="stanine-flex space-stanine">
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red">-</p>
                                        <p className="stanine-flex-red">3</p>
                                        <p className="stanine-flex-red">-</p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-yellow"></p>
                                        <p className="stanine-flex-green"></p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="Analysis-inner-Table">
                                  <div className="Analysis-Table-row">
                                    <div className="Analysis-Table-sec">
                                      <p>Reading Comprehension</p>
                                    </div>
                                    <div className="Analysis-Table-sec">
                                      <p>26 of 36</p>
                                    </div>
                                    <div className="Analysis-Table-sec">
                                      <p>
                                        57<sup>th</sup>
                                      </p>
                                    </div>
                                    <div className="Analysis-Table-sec stanine-sec">
                                      <div className="stanine-flex space-stanine">
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red">-</p>
                                        <p className="stanine-flex-red">5</p>
                                        <p className="stanine-flex-red">-</p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-yellow"></p>
                                        <p className="stanine-flex-green"></p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="Analysis-inner-Table">
                                  <div className="Analysis-Table-row">
                                    <div className="Analysis-Table-sec">
                                      <p>Mathematics Achievement</p>
                                    </div>
                                    <div className="Analysis-Table-sec">
                                      <p>22 of 47</p>
                                    </div>
                                    <div className="Analysis-Table-sec">
                                      <p>
                                        24<sup>th</sup>
                                      </p>
                                    </div>
                                    <div className="Analysis-Table-sec stanine-sec">
                                      <div className="stanine-flex space-stanine">
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red">-</p>
                                        <p className="stanine-flex-red">4</p>
                                        <p className="stanine-flex-red">-</p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-yellow"></p>
                                        <p className="stanine-flex-green"></p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="score-app">
                                <p>Score Application:</p>
                                <div className="scores">
                                  <p className="scores-red">
                                    <span></span> Needs Improvement
                                  </p>
                                  <p className="scores-yellow">
                                    <span></span> Almost There
                                  </p>
                                  <p className="scores-green">
                                    <span></span> Looking Good :-)
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div id="Riverdale" class="tabcontent2">
                              <div className="Analysis-Table">
                                <div className="Analysis-inner-Table Analysis-head">
                                  <div className="Analysis-Table-row">
                                    <div className="Analysis-Table-sec">
                                      <p>SECTION</p>
                                    </div>
                                    <div className="Analysis-Table-sec">
                                      <p>RAW SCORE</p>
                                    </div>
                                    <div className="Analysis-Table-sec">
                                      <p>PERCENTILE</p>
                                    </div>
                                    <div className="Analysis-Table-sec stanine-sec">
                                      <p>STANINE ANALYSIS</p>
                                      <div className="stanine-flex size-stanine">
                                        <p>1</p>
                                        <p>2</p>
                                        <p>3</p>
                                        <p>4</p>
                                        <p>5</p>
                                        <p>6</p>
                                        <p>7</p>
                                        <p>8</p>
                                        <p>9</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="Analysis-inner-Table">
                                  <div className="Analysis-Table-row">
                                    <div className="Analysis-Table-sec">
                                      <p>Verbal Reasoning</p>
                                    </div>
                                    <div className="Analysis-Table-sec">
                                      <p>32 of 40</p>
                                    </div>
                                    <div className="Analysis-Table-sec">
                                      <p>
                                        78<sup>th</sup>
                                      </p>
                                    </div>
                                    <div className="Analysis-Table-sec stanine-sec">
                                      <div className="stanine-flex space-stanine">
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red">-</p>
                                        <p className="stanine-flex-red">3</p>
                                        <p className="stanine-flex-red">-</p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-yellow"></p>
                                        <p className="stanine-flex-green"></p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="Analysis-inner-Table">
                                  <div className="Analysis-Table-row">
                                    <div className="Analysis-Table-sec">
                                      <p>Quantitative Reasoning</p>
                                    </div>
                                    <div className="Analysis-Table-sec">
                                      <p>17 of 37</p>
                                    </div>
                                    <div className="Analysis-Table-sec">
                                      <p>
                                        20<sup>th</sup>
                                      </p>
                                    </div>
                                    <div className="Analysis-Table-sec stanine-sec">
                                      <div className="stanine-flex space-stanine">
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red">-</p>
                                        <p className="stanine-flex-red">5</p>
                                        <p className="stanine-flex-red">-</p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-yellow"></p>
                                        <p className="stanine-flex-green"></p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="Analysis-inner-Table">
                                  <div className="Analysis-Table-row">
                                    <div className="Analysis-Table-sec">
                                      <p>Reading Comprehension</p>
                                    </div>
                                    <div className="Analysis-Table-sec">
                                      <p>26 of 36</p>
                                    </div>
                                    <div className="Analysis-Table-sec">
                                      <p>
                                        57<sup>th</sup>
                                      </p>
                                    </div>
                                    <div className="Analysis-Table-sec stanine-sec">
                                      <div className="stanine-flex space-stanine">
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red">-</p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red">-</p>
                                        <p className="stanine-flex-yellow">-</p>
                                        <p className="stanine-flex-green">9</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="Analysis-inner-Table">
                                  <div className="Analysis-Table-row">
                                    <div className="Analysis-Table-sec">
                                      <p>Mathematics Achievement</p>
                                    </div>
                                    <div className="Analysis-Table-sec">
                                      <p>22 of 47</p>
                                    </div>
                                    <div className="Analysis-Table-sec">
                                      <p>
                                        24<sup>th</sup>
                                      </p>
                                    </div>
                                    <div className="Analysis-Table-sec stanine-sec">
                                      <div className="stanine-flex space-stanine">
                                        <p className="stanine-flex-red">1</p>
                                        <p className="stanine-flex-red">-</p>
                                        <p className="stanine-flex-red">-</p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-red"></p>
                                        <p className="stanine-flex-yellow"></p>
                                        <p className="stanine-flex-green"></p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="score-app">
                                <p>Score Application:</p>
                                <div className="scores">
                                  <p className="scores-red">
                                    <span></span> Needs Improvement
                                  </p>
                                  <p className="scores-yellow">
                                    <span></span> Almost There
                                  </p>
                                  <p className="scores-green">
                                    <span></span> Looking Good :-)
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>

                      <p className="nevershare">*We never share your test results with schools</p>
                    </Col>
                  </Row>
                </div>

                <div id="Verbal" class="tabcontent">
                  <VerbalReasoning data={ScoreData} />
                </div>

                <div id="QUANTITATIVE" class="tabcontent">
                  <QuantitativeReasoning />
                </div>

                <div id="Reading" class="tabcontent">
                  <ReadingComprehension />
                </div>

                <div id="Math" class="tabcontent">
                  <MathematicsAchievement />
                </div>

                <div id="Essay" class="tabcontent">
                  <div className="col-sm-12">
                    <h4 className="bottom">Essay topic</h4>
                    <h3 className="top bottom" md="essay.question">
                      <p>Who is one of the most important people in your life? Explain.</p>
                    </h3>{' '}
                    <hr />
                    <h4>Essay</h4>
                    <p>
                      The most important person in my life is my mom. The reason my mom is the most important to me is
                      becuase she helps me in every way she can. Anything I need help with my mom is alwayse there for
                      me. I have lot of struggles and my mom does not hesitste to do everthing she can to help me. For
                      example I suffer from stuttering and Ticks. My mom spends a lot of time reasearching different
                      theraprys and taking me to everywhere. She took me to the Childrens Hospital in Philidalphia for
                      an evaluation. She did that because she wants to help me counter these Ticks.That is one of the
                      big ways my mom helps me in my life. Another way my mom is one of the most important person to me
                      is my test. Right now I have to study for my big test to get into a school. Everyday after a long
                      exhusting day of work my mom spends 30 minutes working with me in order to enhance my skils. My
                      mom will help me until I become great at the test. Once the test comes I will do very well on it
                      because of my moms help. My mom also takes me all around the world so I can learn more about the
                      different countries and cultures. Every year we go on a family vacation. We go somewhere different
                      every summer and we have fun as a family. We also use this experience to learn more about the
                      place we go. Some examples are Greece. We recently went to Greece thus summer and we went to a
                      place called the Parthelon. We learned that the godess Athena was held there.All of these reasons
                      are why my mom is one of the most important person in my life. I am very grateful to have my
                      mother in my life.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {isBilling && (
            <div className="modal-details-fade applyingSchool">
              <div className="modal-details">
                <FeatherIcon className="closemodal" icon="x" onClick={() => setIsBilling(false)} />
                <h3>My Profile</h3>
                <p>We never share your information without your permission!</p>
                <div style={{ borderBottom: '1px solid #d2d2d2', margin: '12px 0 20px 0' }}></div>
                <Form form={form}>
                  <Row>
                    <Col md={12} sm={24} xs={24}>
                      <Form.Item name="grade" label="Which grade are you applying to?">
                        <Select>
                          <Option>9</Option>
                          <Option>10</Option>
                          <Option>11</Option>
                          <Option>12</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={12} sm={24} xs={24}>
                      <Form.Item name="currentlyAttend" label="What school do you currently attend?">
                        <Input placeholder="School Name"></Input>
                      </Form.Item>
                    </Col>
                  </Row>

                  <p className="planningApply">What schools are you planning on applying to?</p>
                  <Row>
                    <Col md={8} sm={24} xs={24}>
                      <Form.Item name="planning">
                        <Input placeholder="School Name"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={8} sm={24} xs={24}>
                      <Form.Item name="planning">
                        <Input placeholder="School Name"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={8} sm={24} xs={24}>
                      <Form.Item name="planning">
                        <Input placeholder="School Name"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={8} sm={24} xs={24}>
                      <Form.Item name="planning">
                        <Input placeholder="School Name"></Input>
                      </Form.Item>
                    </Col>
                    <Col md={8} sm={24} xs={24}>
                      <Form.Item name="planning">
                        <Input placeholder="School Name"></Input>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={24} sm={24} xs={24}>
                      <p className="practice-title">Practice Test Accommodations</p>
                      <p className="practice-sub">
                        Some students are eligible to receive additional time on the official ISEE.
                      </p>
                      <Form.Item name="practice" className="checkboxSchool">
                        <label>
                          <Input type="checkbox" name="school" placeholder="School Name" />
                          No Accommodations
                        </label>
                        <label>
                          <Input type="checkbox" name="school" placeholder="School Name" />
                          Extended time (1.5x)
                        </label>
                        <label>
                          <Input type="checkbox" name="school" placeholder="School Name" />
                          Double time (2x)
                        </label>
                      </Form.Item>
                    </Col>

                    <Col md={24} sm={24} xs={24}>
                      <Form.Item name="date" label="Test Date">
                        <Input type="date" name="school" placeholder="School Name"></Input>
                      </Form.Item>
                    </Col>
                  </Row>
                  <div style={{ borderBottom: '1px solid #d2d2d2', margin: '12px 0 20px 0' }}></div>
                  <Col md={24} sm={24} xs={24}>
                    <Form.Item>
                      <Button htmlType="submit" className="add-address">
                        Save
                      </Button>
                    </Form.Item>
                  </Col>
                </Form>
              </div>
            </div>
          )}
        </div>
      </Main>
    </>
  );
};

export default Analysis;
