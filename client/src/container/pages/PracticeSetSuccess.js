import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import 'react-calendar/dist/Calendar.css';
import { useLocation, useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import FeatherIcon from 'feather-icons-react';

const PracticeSetSuccess = () => {
  const params = useParams();
  const history = useHistory();
  const location = useLocation();
  const RedirectToNextPage = () => {
    const ID = location?.state;
    history.push({
      pathname: `dashboard/Analysis/${ID}`,
      state: 'Practice',
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
              <p className="payment-sucess">Practice Set Taken Successfully!</p>
            </div>
            <a style={{ marginRight: '200px', fontSize: '20px' }} onClick={RedirectToNextPage}>
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

export default PracticeSetSuccess;
