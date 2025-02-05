import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Form, Select, Space, notification, Spin, Input, Image, DatePicker } from 'antd';
import { useHistory, NavLink } from 'react-router-dom';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import moment from 'moment';
import dayjs from 'dayjs';
import FeatherIcon from 'feather-icons-react';
import Cookies from 'js-cookie';
import authorizes from '../../../src/static/img/authorized.png';
import { headers } from '../../helpers/variables';
import { get_api_request, post_api_request, api_url, delete_api_request, put_api_request } from '../../helpers/Common';
import { imageRender } from '../../helpers/renderImage';
import PenIcon from '../../static/img/auth/pen-icon.png';
import arrow_icon from '../../static/img/auth/arrow-icon.png';
import calender_icon from '../../static/img/auth/calender-icon.png';
import verbal_leaf from '../../static/img/auth/verbal_leaf.png';
import quantitative from '../../static/img/auth/quantitative.png';
import examiner from '../../static/img/auth/examiner.png';
import student_clock from '../../static/img/auth/student-clock.png';
import imageUploadSave from '../../helpers/uploadImage';
import { TextArea } from '@progress/kendo-react-inputs';
import { CChart } from '@coreui/react-chartjs';
import Calendar from 'react-calendar';
import vector from '../../static/img/icon/Vector.png';
import user from '../../static/img/icon/user.png';
import clock from '../../static/img/icon/clock.png';
import eye from '../../static/img/icon/eye.png';
import message from '../../static/img/icon/message.png';
import iconsss from '../../static/img/icon/iconsss.png';
import 'react-calendar/dist/Calendar.css';
import { Redirect, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Editor, EditorTools } from '@progress/kendo-react-editor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-build-classic-mathtype';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { decodetheid, encrypttheid } = require('../../helpers/encode-decode');
const { decrypt } = require('../../helpers/encryption-decryption');
const PracticeSet = () => {
  const params = useParams();
  const history = useHistory();
  const [showlogo, setshowlogo] = useState();
  const [form] = Form.useForm();
  const [Message, setMessage] = useState();
  const [imageform] = Form.useForm();
  const [userid, setUserID] = useState();
  const [Images, setImages] = useState([]);
  const [ImageUrl, setImageURL] = useState([]);
  const [Defaultimagedata, setdefaultimagedata] = useState([]);
  const [ConfigData, setConfigData] = useState([]);
  const [reRenderPinData, setReRenderPinData] = useState(0);
  const [AllQuestion, setAllQuestion] = useState([]);
  const [SingleQuestion, setSingleQuestion] = useState();
  const [render, setrender] = useState(0);
  const [QuestionIndex, setQuestionIndex] = useState();
  const [isBilling, setIsBilling] = useState(false);
  //
  const paramsID = params?.id;
  const splitedID = paramsID.split('+');
  const encoded_eventID = splitedID[0];
  const encoded_scheduleID = splitedID[1];
  const EventId = encoded_eventID ? decodetheid(encoded_eventID) : '';
  const ScheduleId = encoded_scheduleID ? decodetheid(encoded_scheduleID) : '';
  const location = useLocation();
  const [timer, setTimer] = useState(); // Initial timer value in seconds
  const [SpentTime, setSpentTime] = useState(0); // Initial timer value in seconds
  const [ShowSubmitButton, setShowSubmitButton] = useState(false);
  const [AllQuestionIds, setAllQuestionIds] = useState({});
  const [SingleQuestionId, setSingleQuestionId] = useState();
  const [loading, setloading] = useState(true);
  const [AutoSubmitExam, setAutoSubmitExam] = useState([]);
  const [overView, setoverView] = useState({
    total: '',
    attempted: '',
    not_attmptd: '',
  });
  useEffect(() => {
    const enc_user_detail = Cookies.get('UserDetail');
    const response = decrypt(enc_user_detail);
    const userId = response?.sessdata?.users_id;
    setUserID(userId);
    //
    const question_data = Cookies.get(userId + 'questionPractice');
    const time_data = Cookies.get(userId + 'dataPractice');
    const questionIDs_data = Cookies.get(userId + 'AllQuestionIdsPractice');
    const Shuffled_Array = Cookies.get(userId + 'shuffle_arrayPractice');
    async function GetQuestionByExamID() {
      const url = api_url?.get_practicequestion_byID + EventId;
      console.log(url);
      var request = { schedule_id: ScheduleId };
      const response = await post_api_request(url, request, headers);
      console.log(response);
      if (response?.status == 200) {
        const suffleQuestion = response?.data?.meta?.settings?.suffleQuestionAuto; //
        const time_duration = response?.data?.duration ? Number(response?.data?.duration) : 60;
        const time_inSeconds = time_duration * 60;
        var all_questions_data = response?.data?.data;
        var all_questions = [];
        console.log(all_questions_data);

        if (suffleQuestion == true) {
          /**SHUFFLE ARRAY==================================================STARTS **/

          if (Shuffled_Array) {
            const parse_data = JSON.parse(Shuffled_Array);
            all_questions_data?.map((item, index) => {
              parse_data?.map((value, i) => {
                if (value - 1 == index) {
                  all_questions[i] = item;
                }
              });
            });
          } else {
            const LEN = all_questions_data.length;
            const arr = [];
            for (let i = 0; i < LEN; i++) {
              arr.push(i + 1);
            }
            const ShuffledArray = shuffleArray(arr);
            Cookies.set(userId + 'shuffle_arrayPractice', ShuffledArray);
            all_questions_data?.map((item, index) => {
              ShuffledArray?.map((value, i) => {
                if (value - 1 == index) {
                  all_questions[i] = item;
                }
              });
            });
            console.log(all_questions);
          }

          /**SHUFFLE ARRAY==================================================ENDS **/
        } else {
          all_questions = all_questions_data;
        }
        console.log(all_questions);

        // all_questions?.map((item, index) => {
        //   const ChangedOptions = item?.options ? JSON.parse(item?.options) : '';
        //   all_questions[index].options = ChangedOptions;
        // });
        all_questions?.map(item => {
          AllQuestionIds[item.question_id] = 0;
        });

        if (question_data) {
          const Parse_question_data = JSON.parse(question_data);
          //

          all_questions?.map((item, index) => {
            Parse_question_data?.map((value, index1) => {
              if (item?.question_id == value?.question_id) {
                all_questions[index].answer_checked = true;
                item?.options?.map((option, index2) => {
                  if (value.key == option.value) {
                    all_questions[index].options[index2].checked = true;
                    setShowSubmitButton(true);
                  }
                });
              }
            });
          });

          setAllQuestion(all_questions);
          setTimeout(() => {
            setloading(false);
          }, 500);
        } else {
          setAllQuestion(all_questions);
          setSingleQuestion(all_questions[0]);
          setQuestionIndex(0);
          SeparateQuestionTimer(all_questions[0].question_id);
          setTimer(time_inSeconds);
          setSingleQuestionId(all_questions[0].question_id);
          setTimeout(() => {
            setloading(false);
          }, 500);
        }
        if (time_data) {
          const Parse_time_data = JSON.parse(time_data);
          const timeData = Parse_time_data?.time;
          const index = Parse_time_data?.question_index;
          const questionID = all_questions[index].question_id;
          setTimer(20);
          setSingleQuestion(all_questions[index]);
          setQuestionIndex(index);
          setSingleQuestionId(questionID);

          if (questionIDs_data) {
            console.log(questionIDs_data);
            const data = JSON.parse(questionIDs_data);
            const questin_time = data[questionID];
            setAllQuestionIds(data);
            setSpentTime(questin_time);
          }
        }
      }
    }
    GetQuestionByExamID();
    async function getalldefaultImage() {
      const url = api_url.get_defaultimage_byuserid;
      const response = await get_api_request(url, headers);
      if (response.status === 200) {
        const defaultimagedata = response.data.responsedata;
        console.log(defaultimagedata);
        defaultimagedata?.map((item, index) => {
          defaultimagedata[index].image = domainpath + item.image_url;
        });
        console.log(defaultimagedata);
        setdefaultimagedata(defaultimagedata);
      }
    }
    getalldefaultImage();
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
    console.log(reRenderPinData);
  }, [reRenderPinData + 1]);

  /**SHUFFLE ARRAY==============================================================STARTS **/

  function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
      // Generate random number
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  /**SHUFFLE ARRAY==============================================================ENDS **/

  /**TIME COUNTER==============================================================STARTS **/
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = time => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    var FinalData = {
      question_index: QuestionIndex,
      time: time,
      userid: userid,
    };
    const StringFinalData = JSON.stringify(FinalData);
    Cookies.set(userid + 'dataPractice', StringFinalData);
    // GetSingleQuestionTime(SpentTime);
    //SingleQuestionId

    SeparateQuestionTimer();

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}  `;
  };
  /**TIME COUNTER==============================================================ENDS **/

  /**Spent Timer ==============================================================STARTS **/
  useEffect(() => {
    const interval = setInterval(() => {
      setSpentTime(prevTimer => prevTimer + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const SeparateQuestionTimer = id => {
    if (SingleQuestionId != undefined) {
      AllQuestionIds[SingleQuestionId] = SpentTime;
    }
    Cookies.set(userid + 'AllQuestionIdsPractice', AllQuestionIds);
  };

  const GetSingleQuestionTimeFormat = time => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}  `;
  };
  /**Spent Timer ==============================================================ENDS **/

  /**SET COOKIES==============================================================START **/
  const SetCookies = () => {
    var getQuestionID = [];
    var FinalQuestionArray = [];
    var questionData = {};
    var FinalData = {
      question_index: QuestionIndex,
      time: timer,
      userid: userid,
    };

    AllQuestion?.map((item, index) => {
      questionData = {
        question_id: item?.question_id,
        options: item?.options,
      };
      getQuestionID.push(questionData);
    });

    getQuestionID?.map(item =>
      item.options?.filter(value => {
        if (value.checked == true) {
          var kk = {
            question_id: item?.question_id,
            key: value?.value,
          };
          FinalQuestionArray.push(kk);
        }
      }),
    );
    console.log(FinalQuestionArray);
    const StringFinalQuestionArray = JSON.stringify(FinalQuestionArray);
    const StringFinalData = JSON.stringify(FinalData);
    //

    Cookies.set(userid + 'questionPractice', StringFinalQuestionArray);
    Cookies.set(userid + 'dataPractice', StringFinalData);
  };
  /**SET COOKIES==============================================================ENDS **/

  useState(() => {
    console.log(timer);
  }, [render]);
  const GetQuestionByIndex = (e, index) => {
    setloading(true);
    console.log(e);
    console.log(index);
    const Qusetion_id = AllQuestion?.[index]?.question_id;
    const qust_time = AllQuestionIds[Qusetion_id];
    setTimeout(() => {
      setSpentTime(qust_time);
      setloading(false);
    }, 500);
    setSingleQuestionId(Qusetion_id);
    setQuestionIndex(index);
    setSingleQuestion(e);
    setrender(render + 1);
  };
  const HandleNext = index => {
    setloading(true);
    console.log('next');
    const next_index = index + 1;
    const match_index = index + 2;
    if (match_index <= AllQuestion?.length) {
      const next_indexValue = AllQuestion?.[next_index];
      GetQuestionByIndex(next_indexValue, next_index);
    }
    setloading(false);
    //setSpentTime(AllQuestionIds[index]);
    setTimeout(() => {
      setloading(false);
    }, 500);
  };
  const HandlePrevious = index => {
    setloading(true);
    console.log('HandlePrevious');
    const next_index = index - 1;

    if (next_index >= 0) {
      const next_indexValue = AllQuestion?.[next_index];
      GetQuestionByIndex(next_indexValue, next_index);
    }
    setTimeout(() => {
      setloading(false);
    }, 500);
  };

  const HandleAnswer = (option_data, option_index, g) => {
    const update_data = AllQuestion[QuestionIndex]?.options?.map((value, i) => {
      option_index == i
        ? Object.assign(value, { ['checked']: value.checked == false ? true : false })
        : (value.checked = false);

      if (value.checked == true && option_index == i) {
        AllQuestion[QuestionIndex].answer_checked = true;
      } else if (value.checked == false && option_index == i) {
        AllQuestion[QuestionIndex].answer_checked = false;
      }
      return value;
    });

    AllQuestion[QuestionIndex].options = update_data;
    // AllQuestion[QuestionIndex].answer_checked = AllQuestion[QuestionIndex].answer_checked == true ? false : true;

    SetCookies();
    setShowSubmitButton(true);
    setrender(render + 1);
    setloading(true);
    setTimeout(() => {
      HandleNext(QuestionIndex);
    }, 200);
  };
  const HandleComeBackLater = () => {
    const update_data = AllQuestion[QuestionIndex]?.options?.map((value, i) => {
      value.checked = false;
      return value;
    });
    console.log(update_data);
    AllQuestion[QuestionIndex].options = update_data;
    AllQuestion[QuestionIndex].come_back_later = true;
    AllQuestion[QuestionIndex].answer_checked = false;
    // HandleNext(QuestionIndex);
    //setrender(render + 1);
    setloading(true);
    setTimeout(() => {
      HandleNext(QuestionIndex);
    }, 200);
  };

  const RedirectToHomePage = () => {
    history.push('/');
    window.location.reload();
  };

  const HandleSubmit = () => {
    var getQuestionID = [];
    var answerData = [];

    AllQuestion?.map((item, index) => {
      var questionData = {
        question_id: item?.question_id,
        options: item?.options,
      };
      getQuestionID.push(questionData);
    });

    getQuestionID?.map(item =>
      item.options?.filter(value => {
        if (value.checked == true) {
          answerData.push(value?.key);
        }
      }),
    );
    var allquest = AllQuestion.length;
    var attmptd = answerData.length;
    var notattmptd = allquest - attmptd;
    setoverView({
      total: allquest,
      attempted: attmptd,
      not_attmptd: notattmptd,
    });
    setIsBilling(true);
  };

  const HandleExam = () => {
    var FinalQuestionSpentTime = {};
    const SpentTime = Object.entries(AllQuestionIds).map(([key, value]) => ({ key, value }));
    console.log(SpentTime);
    SpentTime?.map(item => {
      console.log(GetSingleQuestionTimeFormat(item.value));

      const time = GetSingleQuestionTimeFormat(item.value);
      FinalQuestionSpentTime[item.key] = time;
    });
    console.log(FinalQuestionSpentTime);
    //GetSingleQuestionTimeFormat('200');

    var getQuestionID = [];
    var answerData = {};

    AllQuestion?.map((item, index) => {
      var questionData = {
        question_id: item?.question_id,
        options: item?.options,
      };
      getQuestionID.push(questionData);
    });

    getQuestionID?.map(item =>
      item.options?.filter(value => {
        if (value.checked == true) {
          // var kk = {
          //   question_id: item?.question_id,
          //   key: value?.value,
          // };
          answerData[item?.question_id] = value?.key;
          // FinalQuestionArray.push(kk);
        }
      }),
    );

    var payload = {
      student_id: decodetheid(userid),
      schedule_id: ScheduleId,
      practice_id: EventId,
      answers: answerData,
    };
    const stringifyData = JSON.stringify(payload);
    console.log(stringifyData);
    async function SubmitExam() {
      const url = api_url.practice_set_taken;
      const response = await post_api_request(url, stringifyData, headers);

      console.log(response);
      if (response.status == 201) {
        const marks_obtained_id = response?.data?.Practice_set_taken_id;
        const encryptedID = encrypttheid(marks_obtained_id);
        setIsBilling(false);
        notification.success({
          message: 'Practice Set Submitted Successfully!',
        });
        AutoSubmitExam.push(AutoSubmitExam + 1);
        Cookies.remove(userid + 'questionPractice');
        Cookies.remove(userid + 'dataPractice');
        Cookies.remove(userid + 'AllQuestionIdsPractice');
        Cookies.remove(userid + 'shuffle_arrayPractice');
        history.push({
          pathname: '/practice-sets-success',
          state: encryptedID ? encryptedID : 'No Data',
        });
        //
        //  history.push('/practice-sets-success');
      } else {
        notification.error({
          message: response?.message?.data?.message,
        });
      }
    }
    SubmitExam();
  };

  if (timer == 0 && AutoSubmitExam.length == 0) {
    console.log(AutoSubmitExam);
    HandleExam();
  }

  return (
    <>
      <PageHeader />
      <Main className="examQuestionPage">
        <Row className="exam-logo">
          <Col md={12} xs={24}>
            <NavLink
              className="pass-link"
              to="#"
              onClick={() => {
                RedirectToHomePage();
              }}
            >
              <img src={domainpath + showlogo} />
            </NavLink>
          </Col>
          <Col md={12} xs={24}>
            <a
              href="/dashboard"
              style={{
                fontSize: '20px',
                background: '#f97316',
                color: '#fff',
                padding: '5px 15px',
                borderRadius: '4px',
                fontWeight: '600',
              }}
            >
              Dashboard
            </a>
          </Col>
        </Row>

        <Row className="biotestMain">
          <Col md={24} xs={24}>
            <Cards>
              <div>
                <h1>{AllQuestion?.[0]?.title}</h1>
                {/* <span>Professor Richarson</span> */}
              </div>
            </Cards>
          </Col>
          <Col md={24}>
            <div className="tymremain">
              {ShowSubmitButton == true ? (
                <Button
                  type="success"
                  style={{ color: '#585353', borderRadius: '20px', fontSize: '12px' }}
                  //className="BackButton"
                  onClick={() => HandleSubmit()}
                >
                  Finish
                </Button>
              ) : (
                ''
              )}{' '}
              {timer > 0 ? (
                <>
                  <img src={clock} />
                  <span>{formatTime(timer)} Time Remaining</span>
                </>
              ) : (
                <>
                  <img src={clock} />
                  <span>00:00:00 Time Remaining</span>
                </>
              )}
            </div>
          </Col>

          <Col md={24} className="mainColQ">
            {AllQuestion?.map((item, index) => (
              <div className="mainqDiv">
                <div
                  className={
                    QuestionIndex == index
                      ? 'inner-qdiv'
                      : item?.answer_checked == true
                      ? 'inner-qdivchecked'
                      : item?.come_back_later == true
                      ? 'inner-qdiv-comebacklater'
                      : 'inner-qdiv inner-grey'
                  }
                  onClick={e => GetQuestionByIndex(item, index)}
                >
                  {index + 1}
                </div>
              </div>
            ))}

            {/* <div className="mainqDiv">
              <div className="inner-qdiv-comebacklater">15</div>
            </div> */}
          </Col>
        </Row>
        <Spin spinning={loading}>
          <Row className="quizQRow">
            <Col md={17} style={{ paddingLeft: '5px', paddingRight: '5px' }}>
              <Row>
                <Col md={3} className="QuestioniBTN" style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                  <div className="Q-inner">
                    <Button>Q{QuestionIndex + 1}</Button>
                  </div>

                  <span>
                    {' '}
                    {QuestionIndex + 1} out of {AllQuestion?.length}
                  </span>
                </Col>
                {/* <Spin spinning={loading} delay={200}> */}
                <Col md={21} className="qusetionp" style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                  <p>{SingleQuestion?.questions}</p>
                  {SingleQuestion?.description ? (
                    // <Editor
                    //   name="description"
                    //   id="question-editor"
                    //   value={SingleQuestion?.description ? SingleQuestion?.description : ''}
                    //   className="question-editor addedpointer"
                    //   contentStyle={{
                    //     height: 430,
                    //   }}
                    //   disabled
                    // />
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
                      data={SingleQuestion?.description ? SingleQuestion?.description : ''}
                      // style={{ pointerEvents: 'none' }}
                    />
                  ) : (
                    ''
                  )}
                  {/* <p> {SingleQuestion?.description?.replace(/<(.|\n)*?>/g, '')}</p> */}
                </Col>
                {/* </Spin> */}
              </Row>
            </Col>
            <Col md={7} className="quest_Btns" style={{ paddingLeft: '5px', paddingRight: '5px' }}>
              <div className="quest_Btns_pre_nxt">
                <Button className="previousbtn" onClick={() => HandlePrevious(QuestionIndex)}>
                  <div className="chevron-left">
                    <FeatherIcon icon="chevron-left" size={14} />
                    <FeatherIcon icon="chevron-left" size={14} />
                  </div>
                  Prev
                </Button>

                <Button
                  className="nextbtn"
                  onClick={() =>
                    QuestionIndex + 1 == AllQuestion?.length ? HandleSubmit() : HandleNext(QuestionIndex)
                  }
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
              {AllQuestion[QuestionIndex]?.options?.map((item, index) => (
                <div
                  className={item?.checked == true ? 'QusetionHeadings-inner activeAnswer' : 'QusetionHeadings-inner'}
                  onClick={() => {
                    HandleAnswer(AllQuestion[QuestionIndex]?.options, index);
                  }}
                >
                  {/* <img src={eye} /> */}
                  <Button
                    id={'qust' + index}
                    className={item?.checked == true ? 'radio-btnn-btnn' : 'bg-white-radio'}
                    // onClick={() => {
                    //   HandleAnswer(AllQuestion[QuestionIndex]?.options, index);
                    // }}
                  >
                    {index + 1}
                  </Button>
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
              ))}

              <div className="text-center">
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
        </Spin>
        {isBilling && (
          <div className="modal-details-fade">
            <div className="modal-details ">
              <FeatherIcon className="closemodal" icon="x" onClick={() => setIsBilling(false)} style={{ top: '7px' }} />
              <div style={{ borderBottom: '1px solid #d2d2d2', margin: '22px 0px 14px' }}></div>
              <div className="main-modal-exam">
                <h3>Are you sure you want to submit this exam?</h3>
                <table>
                  <tr>
                    <th>Total Question:</th>
                    <td>{overView?.total}</td>
                  </tr>
                  <tr>
                    <th>Attempted:</th>
                    <td>{overView?.attempted}</td>
                  </tr>
                  <tr>
                    <th>Not Attempted:</th>
                    <td>{overView?.not_attmptd}</td>
                  </tr>
                </table>
                <div className="main-btn-exam">
                  <button className="btn-exam-yes" onClick={HandleExam}>
                    Yes
                  </button>
                  <button className="btn-exam-no" onClick={() => setIsBilling(false)}>
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Main>
    </>
  );
};

export default PracticeSet;
