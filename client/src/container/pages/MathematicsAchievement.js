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
import DialogContentText from '@material-ui/core/DialogContentText';
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
import { CChart } from '@coreui/react-chartjs';
// import { encrypttheid } from '../../helpers/encode-decode';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const MathematicsAchievement = () => {
  const history = useHistory();

  const [AllQuestion, setAllQuestion] = useState([]);
  const [ShowTest, setShowTest] = useState(false);
  const [Showplayer, setShowplayer] = useState(true);
  useEffect(() => {}, []);

  const HandleVideoplayer = () => {
    setShowplayer(false);
    setShowplayer(!Showplayer);
  };

  const HandleAnswers = () => {
    setShowTest(true);
  };
  const enc_user_detail = Cookies.get('UserDetail');
  return (
    <>
      {ShowTest == true ? (
        ''
      ) : (
        <Main className="viewResult">
          <div className="MainResult">
            <div className="firstRowResult">
              <h1>Mathematics Achievement Summary</h1>
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
                  labels: [
                    'Algebraic Concepts',
                    'Data Analysis & Probability',
                    'Geometry',
                    'Measurement',
                    'Number Sense',
                    'Number Sense And Operations',
                  ],
                  datasets: [
                    {
                      label: 'Subtype',
                      backgroundColor: '#f87979',
                      data: [5, 3, 1, 1, 5, 1],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                      ],
                      borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                      ],
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
            <Col md={24} xs={24} style={{ margin: '0 auto' }}>
              <Cards>
                <div style={{ margin: '0 auto' }}>
                  <h1>{'Boilogy Test'}</h1>
                </div>
              </Cards>
            </Col>
            <Col md={24} style={{ display: 'flex' }}>
              <Col md={1} className="mainColQ">
                {/* {AllQuestion?.map((item, index) => ( */}
                <div className="mainqDiv">
                  <div
                    className={'inner-qdiv'}
                    // onClick={e => GetQuestionByIndex(item, index)}
                  >
                    {1}
                  </div>
                </div>
                {/* ))} */}
              </Col>

              <Col md={1} className="mainColQ">
                <div className="mainqDiv">
                  <div
                    className="inner-qdivchecked"

                    //onClick={e => GetQuestionByIndex(item, index)}
                  >
                    {2}
                  </div>
                </div>
              </Col>

              <Col md={1} className="mainColQ">
                <div className="mainqDiv">
                  <div
                    className="inner-qdiv-comebacklater"
                    //onClick={e => GetQuestionByIndex(item, index)}\
                  >
                    {3}
                  </div>
                </div>
              </Col>

              <Col md={1} className="mainColQ">
                <div className="mainqDiv">
                  <div
                    className="inner-qdiv inner-grey"
                    //onClick={e => GetQuestionByIndex(item, index)}
                  >
                    {4}
                  </div>
                </div>
              </Col>
            </Col>
          </Row>

          <Row className="quizQRow">
            <Col md={17} style={{ paddingLeft: '5px', paddingRight: '5px' }}>
              <Row>
                <Col md={3} className="QuestioniBTN" style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                  <div className="Q-inner">
                    <Button className="question-count" style={{ padding: ' 9px 7px 40px 7px' }}>
                      Q1
                    </Button>
                  </div>

                  <span>1 out of {AllQuestion?.length}</span>
                </Col>

                <Col md={21} className="qusetionp" style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                  <p>{'Find Largest Number?'}</p>
                  <img src="https://assets.testinnovators.com/isee/01-grid.png"></img>
                  <p> {'(Single Choice Question)'?.replace(/<(.|\n)*?>/g, '')}</p>
                </Col>
              </Row>
            </Col>
            <Col md={7} className="quest_Btns" style={{ paddingLeft: '5px', paddingRight: '5px' }}>
              <div className="quest_Btns_pre_nxt">
                <Button
                  className="previousbtn"
                  //onClick={() => HandlePrevious('QuestionIndex')}
                >
                  <div className="chevron-left">
                    <FeatherIcon icon="chevron-left" size={14} />
                    <FeatherIcon icon="chevron-left" size={14} />
                  </div>
                  Prev
                </Button>
                <Button
                  className="nextbtn"
                  //onClick={() => HandleNext('QuestionIndex')}
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
              {/* {AllQuestion['QuestionIndex']?.options?.map((item, index) => (  'radio-btnn-btnn'  QusetionHeadings-inner activeAnswer' : */}
              <div
                className="QusetionHeadings-inner"
                // onClick={() => {
                //   HandleAnswer(AllQuestion["QuestionIndex"]?.options, index);
                // }}
              >
                {/* <img src={eye} /> */}
                <Button
                  id={1}
                  className="bg-white-radio"
                  // onClick={() => {
                  //   HandleAnswer(AllQuestion[QuestionIndex]?.options, index);
                  // }}
                >
                  {1}
                </Button>
                <span>{1}</span>
              </div>

              <div className="QusetionHeadings-inner">
                <Button id={2} className="bg-white-radio">
                  {2}
                </Button>
                <span>{2}</span>
              </div>
              <div className="QusetionHeadings-inner activeAnswer">
                <Button id={3} className="radio-btnn-btnn">
                  {3}
                </Button>
                <span>{3}</span>
              </div>

              <div className="text-left">
                <Button
                  className="BackButton"
                  onClick={() =>
                    // HandleNext(QuestionIndex)
                    HandleComeBackLater()
                  }
                >
                  Come Back Later
                </Button>
              </div>
            </Col>
          </Row>
          <div className="solution_arrow"></div>
          <div className="solutionbox">
            <h1 style={{ color: '#fff' }}>Solution</h1>
            <p>The correct answer to the question is answer choice (A), 40 40 cm 2 2 .</p>
            <p>Each grid square is 5 cm 2 5cm 2 . Since the shaded region is made from 8 8 grid squares,</p>
            <p>the area of the shaded region is 5 cm 2 × 8 = 40 cm 2 5cm 2 ×8=40cm 2 .</p>
            <a style={{ color: '#fff' }} onClick={HandleVideoplayer}>
              <i className="fa fa-play" /> Video Explanation
            </a>
            <br />
            {Showplayer == true ? (
              <video controls="controls" muted>
                <source
                  id="Mp4Iframe"
                  // src="http://localhost:8000/uploads/video/mp4Video.mp4"
                  type="video/mp4"
                />
              </video>
            ) : (
              ''
            )}
          </div>
          <div className="card-main" style={{ display: 'flex' }}>
            <div className="maths-cards">
              <div className="icon-card">
                <i className="fa fa-clock-o" style={{ fontSize: '30px' }}></i>
              </div>
              <div className="icon-title">
                <p>
                  Your Time:<span>96 sec</span>
                </p>
                <p>
                  Other's Time (avg):<span>20 sec</span>
                </p>
              </div>
            </div>

            <div className="maths-cards">
              <div className="icon-card">
                <i className="fa fa-hashtag" style={{ fontSize: '30px' }}></i>
              </div>
              <div className="icon-title">
                <p>
                  Your Time:<span>96 sec</span>
                </p>
                <p>
                  Other's Time (avg):<span>20 sec</span>
                </p>
              </div>
            </div>

            <div className="maths-cards">
              <div className="icon-card">
                <i className="fa fa-tachometer" style={{ fontSize: '30px' }}></i>
              </div>
              <div className="icon-title">
                <p>
                  Your Time:<span>96 sec</span>
                </p>
                <p>
                  Other's Time (avg):<span>20 sec</span>
                </p>
              </div>
            </div>
          </div>
        </Main>
      ) : (
        ''
      )}
    </>
  );
};

export default MathematicsAchievement;
