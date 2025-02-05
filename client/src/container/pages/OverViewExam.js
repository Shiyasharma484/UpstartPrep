import React, { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { headers } from '../../helpers/variables';
import { get_api_request, post_api_request, api_url, delete_api_request, put_api_request } from '../../helpers/Common';
import { Button } from 'antd';
const { decodetheid, encrypttheid } = require('../../helpers/encode-decode');

const OverViewExam = () => {
  const params = useParams();
  const history = useHistory();
  const paramsID = params?.id;
  const splitedID = paramsID.split('+');
  const encoded_eventID = splitedID[0];
  const encoded_scheduleID = splitedID[1];
  const EventId = encoded_eventID ? decodetheid(encoded_eventID) : '';
  const ScheduleId = encoded_scheduleID ? decodetheid(encoded_scheduleID) : '';

  useEffect(() => {
    async function GetQuestionByQuizID() {
      const url = api_url?.getquizquestion_by_quizID + EventId;
      var request = { schedule_id: ScheduleId };
      console.log(url);
      const response = await post_api_request(url, request, headers);
      console.log(response);
    }
    GetQuestionByQuizID();
  }, []);
  return (
    <div>
      <b>OverViewQuiz</b>
      <Button onClick={() => history.push(`/exam/${paramsID}`)}>Start</Button>
    </div>
  );
};

export default OverViewExam;
