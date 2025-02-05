import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import 'react-calendar/dist/Calendar.css';
import { useHistory, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import FeatherIcon from 'feather-icons-react';
import { headers } from '../../helpers/variables';
import { get_api_request, post_api_request, api_url, delete_api_request, put_api_request } from '../../helpers/Common';
import { decodetheid } from '../../helpers/encode-decode';
import { notification } from 'antd';

const QuizSuccess = () => {
  const params = useParams();
  const history = useHistory();
  const location = useLocation();
  console.log(location);
  const QuizID = location?.state;

  const RedirectToNextPage = () => {
    console.log(QuizID);
    history.push({
      pathname: `dashboard/Analysis/${QuizID}`,
      state: 'Quiz',
    });
    window.location.reload();
  };
  return (
    <>
      <Main>
        <div className="payment-success-main exam-success">
          <div className="payment-success-inner">
            <div className="payment-tick">
              <FeatherIcon icon="check" />
            </div>
            <div className="payment-text">
              <p className="payment-sucess">Quiz Taken Successfully!</p>
            </div>
            <a
              // href="/Analysis"
              //href="#"
              style={{ marginRight: '200px', fontSize: '20px' }}
              onClick={RedirectToNextPage}
            >
              View Score Card
            </a>
            <a href="/dashboard" style={{ fontSize: '20px' }}>
              Dashboard
            </a>
          </div>
        </div>
      </Main>
    </>
  );
};

export default QuizSuccess;
