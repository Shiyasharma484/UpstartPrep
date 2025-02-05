import React, { useEffect, useState } from 'react';
import { Row, Col, Form, notification, Input, Button, Select, DatePicker, Spin } from 'antd';
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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-build-classic-mathtype';
import { CChart } from '@coreui/react-chartjs';

const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const VerbalReasoning = props => {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [CategoryData, setCategoryData] = useState({});
  const [PlansData, setPlansData] = useState([]);
  const [featurearraydata, setfeaturearraydata] = useState([]);
  const [ConfigData, setConfigData] = useState([]);
  const [Message, setMessage] = useState();

  const [showlogo, setshowlogo] = useState();
  const [CategoryID, setCategoryID] = useState();
  const [ShowTest, setShowTest] = useState(false);

  const [SingleQuestion, setSingleQuestion] = useState();
  const [QuestionIndex, setQuestionIndex] = useState(0);
  const [loading, setloading] = useState(true);
  const [render, setrender] = useState(0);

  console.log(props?.data, '222222222222222222222222');

  useEffect(() => {
    const enc_user_detail = Cookies.get('UserDetail');

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
    setTimeout(() => {
      setloading(false);
    }, 500);
  }, []);
  useState(() => {}, [render]);

  const HandleAnswers = () => {
    setShowTest(true);
  };
  const GetQuestionByIndex = (e, index) => {
    setQuestionIndex(index);
    setSingleQuestion(e);
    setrender(render + 1);
  };
  const HandleNext = index => {
    setloading(true);
    const next_index = index + 1;
    const match_index = index + 2;
    if (match_index <= props?.data?.details?.length) {
      const next_indexValue = props?.data?.details?.[next_index];
      GetQuestionByIndex(next_indexValue, next_index);
    }
    setTimeout(() => {
      setloading(false);
    }, 800);
  };
  const HandlePrevious = index => {
    setloading(true);
    const next_index = index - 1;
    if (next_index >= 0) {
      const next_indexValue = props?.data?.details?.[next_index];
      GetQuestionByIndex(next_indexValue, next_index);
    }
    setTimeout(() => {
      setloading(false);
    }, 800);
  };

  return (
    <>
      {ShowTest == true ? (
        ''
      ) : (
        <Main className="viewResult">
          <div className="MainResult">
            <div className="firstRowResult">
              <h1>Verbal Reasoning Summary</h1>
              <Button onClick={HandleAnswers}>
                View Your Answers
                <FeatherIcon icon="chevron-right" />
              </Button>
            </div>
          </div>
          <div>
            <h2>How You did, By Difficulty</h2>
          </div>
          <Row>
            <Col md={8}>
              <h1 className="pieTitle">Easy</h1>
              <CChart
                className="piechartdesign"
                type="doughnut"
                data={{
                  labels: ['Incorrect', 'Correct', 'Unanswered'],
                  datasets: [
                    {
                      backgroundColor: ['red', 'green', '#efab58'],
                      data: [50, 30, 20],
                    },
                  ],
                }}
              />
            </Col>
            <Col md={8}>
              <h1 className="pieTitle">Medium</h1>
              <CChart
                className="piechartdesign"
                type="polarArea"
                data={{
                  labels: ['Incorrect', 'Correct', 'Unanswered'],
                  datasets: [
                    {
                      data: [30, 50, 20],
                      backgroundColor: ['red', 'green', '#efab58'],
                    },
                  ],
                }}
              />
            </Col>
            <Col md={8}>
              <h1 className="pieTitle">Hard</h1>
              <CChart
                className="piechartdesign"
                type="doughnut"
                data={{
                  labels: ['Incorrect', 'Correct', 'Unanswered'],
                  datasets: [
                    {
                      backgroundColor: ['red', 'green', '#efab58'],
                      data: [40, 20, 40],
                    },
                  ],
                }}
              />
            </Col>
          </Row>

          <Row className="RowHeading">
            <div style={{ marginTop: '20px' }}>
              <h2>How You did, By Subtype:</h2>
            </div>
            <Col md={24}>
              <CChart
                type="bar"
                data={{
                  labels: ['Sentence Completion', 'Synonmys', 'Two Blank Sentence Completion'],
                  datasets: [
                    {
                      label: 'Subtype',
                      backgroundColor: '#f87979',
                      data: [8, 7, 3],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                      ],
                      borderColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)'],
                      borderWidth: 1,
                    },
                  ],
                }}
                labels="months"
              />
            </Col>
          </Row>

          <Row>
            <div style={{ marginTop: '20px' }}>
              <h2>How you allocated your time:</h2>
            </div>
            <Col md={24}>
              <CChart
                type="bubble"
                data={{
                  datasets: [
                    {
                      label: 'Time Minutes',
                      data: [
                        {
                          x: 0,
                          y: 0,
                          r: 20,
                        },
                        {
                          x: 10,
                          y: 10,
                          r: 20,
                        },
                        {
                          x: 20,
                          y: 20,
                          r: 20,
                        },
                        {
                          x: 30,
                          y: 30,
                          r: 20,
                        },
                        {
                          x: 40,
                          y: 40,
                          r: 20,
                        },
                        {
                          x: 50,
                          y: 50,
                          r: 20,
                        },
                        {
                          x: 60,
                          y: 60,
                          r: 20,
                        },
                        {
                          x: 70,
                          y: 70,
                          r: 20,
                        },
                      ],
                      backgroundColor: 'rgb(255, 99, 132)',
                    },
                  ],
                }}
              />
            </Col>
          </Row>
        </Main>
      )}
      {ShowTest == true ? (
        <Main className="examQuestionPage" style={{ width: '100%' }}>
          <Spin spinning={loading}>
            <Row className="biotestMain">
              <div
                className="firstRowResult pull-right"
                style={{ width: '100%', display: 'unset', marginBottom: '10px' }}
              >
                <Button className="pull-right" onClick={e => setShowTest(false)}>
                  View Your Summary
                  <FeatherIcon icon="chevron-right" />
                </Button>
              </div>
              <Col md={8} xs={24} style={{ margin: '0 auto' }}>
                <Cards>
                  <div style={{ margin: '0 auto' }}>
                    <h1>{props?.data?.title ? props?.data?.title : ''}</h1>
                  </div>
                </Cards>
              </Col>
              <Col md={24} style={{ display: 'flex' }}>
                {props?.data?.details?.map((item, i) => (
                  <Col md={1} className="mainColQ">
                    <div className="mainqDiv">
                      <div
                        className={
                          QuestionIndex == i
                            ? 'inner-qdiv inner-grey'
                            : (props?.data?.incorrect_answers).includes(item.id)
                            ? 'inner-qdiv-wrong-answer'
                            : (props?.data?.exam_attempted).includes(item.id)
                            ? 'inner-qdivchecked'
                            : 'inner-qdiv active-number'
                        }
                        onClick={e => GetQuestionByIndex(item, i)}
                      >
                        {i + 1}
                      </div>
                    </div>
                  </Col>
                ))}
              </Col>
            </Row>

            <Row className="quizQRow">
              <Col md={17} style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                <Row>
                  <Col md={3} className="QuestioniBTN" style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                    <div className="Q-inner">
                      <Button className="question-count" style={{ padding: ' 9px 7px 40px 7px' }}>
                        Q{QuestionIndex + 1}
                      </Button>
                    </div>
                  </Col>

                  <Col md={21} className="qusetionp" style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                    <p>{props?.data?.details[QuestionIndex]?.questions}</p>
                    <br />
                    <br />

                    <CKEditor
                      editor={ClassicEditor}
                      contentStyle={{
                        height: 430,
                      }}
                      config={{
                        toolbar: {
                          shouldNotGroupWhenFull: true,
                          items: [
                            // 'heading',
                          ],
                        },
                      }}
                      data={
                        props?.data?.details[QuestionIndex]?.description != null
                          ? props?.data?.details[QuestionIndex]?.description
                          : ''
                      }
                      style={{ pointerEvents: 'none' }}
                    />
                    <br />
                    <br />
                    <br />

                    <p>{props?.data?.details[QuestionIndex]?.solution ? 'Solution:-' : ''}</p>
                    {/* <p> {props?.data?.details[QuestionIndex]?.solution?.replace(/<(.|\n)*?>/g, '')}</p> */}
                    <CKEditor
                      editor={ClassicEditor}
                      contentStyle={{
                        height: 430,
                      }}
                      config={{
                        toolbar: {
                          shouldNotGroupWhenFull: true,
                          items: [
                            // 'heading',
                          ],
                        },
                      }}
                      data={
                        props?.data?.details[QuestionIndex]?.solution != null
                          ? props?.data?.details[QuestionIndex]?.solution
                          : ''
                      }
                      style={{ pointerEvents: 'none' }}
                    />
                  </Col>
                </Row>
              </Col>
              {props?.data?.details?.length > 0 ? (
                <Col md={7} className="quest_Btns tabs_yourans" style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                  <div className="quest_Btns_pre_nxt">
                    <Button
                      className="previousbtn"
                      onClick={() => {
                        HandlePrevious(QuestionIndex);
                        setloading(true);
                      }}
                    >
                      <div className="chevron-left">
                        <FeatherIcon icon="chevron-left" size={14} />
                        <FeatherIcon icon="chevron-left" size={14} />
                      </div>
                      Prev
                    </Button>
                    <Button
                      className="nextbtn"
                      onClick={() => {
                        HandleNext(QuestionIndex);
                        setloading(true);
                      }}
                    >
                      Next
                      <div className="chevron-right">
                        <FeatherIcon icon="chevron-right" size={14} />
                        <FeatherIcon icon="chevron-right" size={14} />
                      </div>
                    </Button>
                  </div>
                  <div className="QusetionHeadings">
                    <h1>Choose the best option</h1>
                  </div>
                  {props?.data?.details?.[QuestionIndex]?.options
                    ? props?.data?.details?.[QuestionIndex]?.options?.map((item, index) => (
                        <div
                          className={
                            item?.checked == true
                              ? 'QusetionHeadings-inner store-view-ans'
                              : props?.data?.details[QuestionIndex]?.student_answer == item?.key
                              ? 'QusetionHeadings-inner wrongans'
                              : 'QusetionHeadings-inner'
                          }
                        >
                          <Button
                            id={'qust' + index}
                            className={item?.checked == true ? 'radio-btnn-crctans' : 'bg-white-radio'}
                          >
                            {index + 1}
                          </Button>
                          {/* <span>{item?.value}</span> */}
                          <CKEditor
                            editor={ClassicEditor}
                            contentStyle={{
                              height: 430,
                            }}
                            config={{
                              toolbar: {
                                shouldNotGroupWhenFull: true,
                                items: [
                                  // 'heading',
                                ],
                              },
                            }}
                            data={item?.value}
                            style={{ pointerEvents: 'none' }}
                          />
                        </div>
                      ))
                    : ''}
                </Col>
              ) : (
                ''
              )}
            </Row>
          </Spin>
        </Main>
      ) : (
        ''
      )}
    </>
  );
};

export default VerbalReasoning;
