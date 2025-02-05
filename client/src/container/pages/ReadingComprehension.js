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
import { CChart } from '@coreui/react-chartjs';

const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const ReadingComprehension = () => {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [CategoryData, setCategoryData] = useState({});
  const [PlansData, setPlansData] = useState([]);
  const [featurearraydata, setfeaturearraydata] = useState([]);
  const [ConfigData, setConfigData] = useState([]);
  const [Message, setMessage] = useState();
  const [ShowTest, setShowTest] = useState(false);
  console.log(CategoryData?.plan_name);
  const [showlogo, setshowlogo] = useState();
  const [CategoryID, setCategoryID] = useState();
  const [AllQuestion, setAllQuestion] = useState([]);
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
    const url = api_url.get_plans;
    const response = await get_api_request(url, headers);
    console.log(response);
    if (response.status == 200) {
      const categorydata = response?.data?.responsedata;
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
    history.push(`../../checkout/${id}`);
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
              <h1>Reading Comprehension Summary</h1>
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
                    'Inference',
                    'Main idea',
                    'Organization/logic',
                    'Supporting idea',
                    'Tone/Style/Figurative Language',
                    'Vocabulary',
                  ],
                  datasets: [
                    {
                      label: 'Subtype',
                      backgroundColor: '#f87979',
                      data: [3, 3, 1, 3, 1, 4],
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
          {/* <Row className="exam-logo">
            <Col md={24} xs={24}>
              <NavLink className="pass-link" to="/">
                <img src={domainpath + showlogo} />
              </NavLink>
            </Col>
          </Row> */}

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
                    //onClick={e => GetQuestionByIndex(item, index)}
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
                    //onClick={e => GetQuestionByIndex(item, index)}
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
            <Col md={12}>
              <div className="manage-table">
                <table className="readingcomp">
                  <tr className="comprehension-tr">
                    <td className="number-compre">1</td>
                    <td>In Siberia in the mid-1800s, Dmitri</td>
                  </tr>

                  <tr className="comprehension-tr">
                    <td className="number-compre">2</td>
                    <td>Ivanovich Mendeleev, first author of the</td>
                  </tr>

                  <tr className="comprehension-tr">
                    <td className="number-compre">3</td>
                    <td>periodic table of the elements, was born</td>
                  </tr>

                  <tr className="comprehension-tr">
                    <td className="number-compre">4</td>
                    <td>to poor parents, the youngest of at least</td>
                  </tr>

                  <tr className="comprehension-tr">
                    <td className="number-compre">5</td>
                    <td>eleven children. Mendeleev’s mother</td>
                  </tr>

                  <tr className="comprehension-tr">
                    <td className="number-compre">6</td>
                    <td>saw his potential from an early age. A</td>
                  </tr>

                  <tr className="comprehension-tr">
                    <td className="number-compre">7</td>
                    <td>year after his father’s death, when he</td>
                  </tr>

                  <tr className="comprehension-tr">
                    <td className="number-compre">8</td>
                    <td>was fourteen and all of his siblings had</td>
                  </tr>

                  <tr className="comprehension-tr">
                    <td className="number-compre">9</td>
                    <td>moved away, Mendeleev and his mother</td>
                  </tr>

                  <tr className="comprehension-tr">
                    <td className="number-compre">10</td>
                    <td>left home to get him into a university.</td>
                  </tr>

                  <tr className="comprehension-tr">
                    <td className="number-compre">11</td>
                    <td>After being rejected multiple times</td>
                  </tr>

                  <tr className="comprehension-tr">
                    <td className="number-compre">12</td>
                    <td>Mendeleev was eventually accepted to,</td>
                  </tr>

                  <tr className="comprehension-tr">
                    <td className="number-compre">13</td>
                    <td>and graduated from, the same university</td>
                  </tr>

                  <tr className="comprehension-tr">
                    <td className="number-compre">14</td>
                    <td>as his father, who had been an</td>
                  </tr>

                  <tr className="comprehension-tr">
                    <td className="number-compre">15</td>
                    <td>accomplished chemist. The 1,600 mile</td>
                  </tr>

                  <tr className="comprehension-tr">
                    <td className="number-compre">16</td>
                    <td>journey over the Ural Mountains to</td>
                  </tr>
                </table>
              </div>
            </Col>

            <Col md={12} className="quest_Btns" style={{ paddingLeft: '5px', paddingRight: '5px' }}>
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
              <Row>
                <Col md={3} className="QuestioniBTN" style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                  <div className="Q-inner">
                    <Button className="question-count" style={{ padding: ' 9px 7px 40px 7px' }}>
                      Q1
                    </Button>
                  </div>

                  <span>1 out of {AllQuestion?.length}</span>
                </Col>

                <Col md={21} className="qusetionp" style={{ paddingLeft: '12px', paddingRight: '5px' }}>
                  <p>{'Find Largest Number?'}</p>
                  <p> {'(Single Choice Question)'?.replace(/<(.|\n)*?>/g, '')}</p>
                </Col>
              </Row>
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
          {/* </Spin> */}
        </Main>
      ) : (
        ''
      )}
    </>
  );
};

export default ReadingComprehension;
