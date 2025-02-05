import React, { useEffect, useState } from 'react';
import { Row, Col, Form, notification, Input, Button, Select, Switch } from 'antd';
import { useHistory, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { headers } from '../../helpers/variables';
import { Main } from '../styled';
import Cookies from 'js-cookie';
import student_clock from '../../static/img/auth/student-clock.png';
import verbal_leaf from '../../static/img/auth/verbal_leaf.png';
import examiner from '../../static/img/auth/examiner.png';
import { get_api_request, post_api_request, api_url, delete_api_request, put_api_request } from '../../helpers/Common';
const { decodetheid, encrypttheid } = require('../../helpers/encode-decode');
const { decrypt } = require('../../helpers/encryption-decryption');
const OverViewQuiz = () => {
  const params = useParams();
  const history = useHistory();
  const paramsID = params?.id;
  console.log(paramsID);
  const splitedID = paramsID.split('+');
  const encoded_eventID = splitedID[0];
  const encoded_scheduleID = splitedID[1];
  const EventId = encoded_eventID ? decodetheid(encoded_eventID) : '';
  const ScheduleId = encoded_scheduleID ? decodetheid(encoded_scheduleID) : '';
  const [OverViewData, setOverViewData] = useState();
  const enc_user_detail = Cookies.get('UserDetail');
  const response = decrypt(enc_user_detail);
  console.log(response);
  const user_id = response?.sessdata?.users_id;
  const decoded_UserID = decodetheid(user_id);
  console.log(decoded_UserID);

  useEffect(() => {
    async function GetAllScheduleByUserID() {
      const url1 = api_url.get_allschedules_byuserID + decoded_UserID;
      const response = await get_api_request(url1, headers);
      console.log(response);
      // const url = api_url.get_schedules_learn;
      // const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const all_schedules = response?.data?.data;
        console.log(all_schedules);
        //setScheduledsData(all_schedules);
      } else {
        console.log('error');
        //window.location.reload();
      }
    }
    GetAllScheduleByUserID();
    // async function GetQuestionByQuizID() {
    //   const url = api_url?.getquizquestion_by_quizID + EventId;
    //   var request = { schedule_id: ScheduleId };
    //   console.log(url);
    //   const response = await post_api_request(url, request, headers);
    //   if (response.status === 200) {
    //     const overViewData = response?.data?.data[0];
    //     setOverViewData(overViewData);
    //     console.log(overViewData);
    //   }
    //   console.log(response);
    // }
    // GetQuestionByQuizID();
  }, []);
  return (
    <Main>
      <div class="container">
        {/* <Row>
          <Col md={24}>
            <div className="OverViewQuizMain">
              <div className="OverViewQuizMain-first">
                <h1>Exam IIt</h1>
                <h3>Exam </h3>
              </div>
              <div className="OverViewQuizMain-second">
                <p>Date Time:-</p>
              </div>
              <div>
                <p>Total Questions:-</p>
              </div>
              <div>
                <p>Total Marks:-</p>
              </div>
            </div>
          </Col>
          <Col md={24}>
            <div className="OverViewQuizMain"></div>
          </Col>
        </Row> */}
        <Row className="nearest-main">
          <Col md={24} xs={24}>
            <div className="nearest-innerMain">
              <h1>{OverViewData?.title}</h1>
              <div className="nearest-inner">
                <div className="nearest-inner-first">
                  <p className="nearest-date">Date</p>
                  <p className="nearest-month">{OverViewData?.title}</p>
                  {/* <p className="nearest-year">2019</p> */}
                </div>

                <div className="nearest-inner-sec">
                  <p className="nearest-date-sec">Start Time</p>
                  <div className="nearest-month-sec">
                    <p className="nearest-month-sec-time">{OverViewData?.title}</p>
                    <div class="sec-clock">
                      <img src={student_clock} /> <p class="half-mint-sec">30 Minutes</p>
                    </div>
                  </div>
                  <p className="nearest-year-sec">25 Questions</p>
                </div>

                <div className="nearest-inner-third">
                  <p className="nearest-date-third">Subject</p>
                  <p className="verbal">
                    <img src={verbal_leaf} /> Verbal Reasoning
                  </p>
                </div>

                <div className="nearest-inner-for">
                  <p className="nearest-date-for">Examiner</p>
                  <div className="nearest-img-for">
                    <img src={examiner} />
                    <div>
                      <p className="nearest-name-for">Elizabeth Cruz</p>
                      <p className="nearest-desig-for">Professor</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={24}>
            <div className="overquizSecondMain"></div>
            <div className="negativemarks">Negative Marks:-</div>
          </Col>
          <Col md={24}>
            <div className="terms&condition"></div>
          </Col>
        </Row>
      </div>
      <div>
        <b>OverViewQuiz</b>
        <Button onClick={() => history.push(`/quiz/${paramsID}`)}>Start</Button>
      </div>
    </Main>
  );
};

export default OverViewQuiz;
