import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Row, Input, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useHistory } from 'react-router-dom';
import { headers } from '../../helpers/variables';
import { Main } from '../styled';
import { Button } from '../../components/buttons/buttons';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import authorizes from '../../../src/static/img/authorized.png';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {
  get_api_request,
  post_api_request,
  put_api_request,
  delete_api_request,
  api_url,
} from '../../helpers/Common.js';
import { Cards } from '../../components/cards/frame/cards-frame';

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

var ModuleName = 'DASHBOARD';
const OverAllReportQuiz = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const params = useParams();
  const id = params.id;

  useEffect(async () => {}, []);

  return (
    <>
      <Main className="Quiz_report">
        <div key="1" className="page-header-actions" style={{ marginTop: '16px', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Fraction 1 - Overall Report</h1>
          <div className="importNewBTN">
            <Button onClick={() => history.push(`../quizDetailed_report/${id}`)} size="small" key="4" type="success">
              <FeatherIcon icon="plus" size={14} />
              Details Report
            </Button>
          </div>
        </div>
        <Cards>
          <div class="grid-container">
            <div class="grid-item">
              <p>Total Attempts</p>
              <b>
                {' '}
                <p>0</p>
              </b>
            </div>
            <div class="grid-item">
              {' '}
              <p>Pass Attempts</p>
              <b>
                {' '}
                <p>0</p>
              </b>
            </div>
            <div class="grid-item">
              <p>Fail Attempts</p>
              <b>
                <p>0</p>
              </b>
            </div>
            <div class="grid-item">
              <p>Unique Test Takers</p>
              <b>
                <p>0</p>
              </b>
            </div>
            <div class="grid-item">
              <p>Avg. Time Spent</p>
              <b>
                <p>0 Sec</p>
              </b>
            </div>
            <div class="grid-item">
              <p>Avg. Score</p>
              <b>
                {' '}
                <p>0/6</p>
              </b>
            </div>
            <div class="grid-item">
              <p>High Score</p>
              <b>
                {' '}
                <p>0</p>
              </b>
            </div>
            <div class="grid-item">
              <p>Low Score</p>
              <b>
                {' '}
                <p>0</p>
              </b>
            </div>
            <div class="grid-item">
              <p>Avg. Percentage</p>
              <b>
                {' '}
                <p>0%</p>
              </b>
            </div>
            <div class="grid-item">
              <p>Avg. Accuracy</p>
              <b>
                {' '}
                <p>0%</p>
              </b>
            </div>
            <div class="grid-item">
              <p>Avg. Speed</p>
              <b>
                {' '}
                <p>0que/hr</p>
              </b>
            </div>
            <div class="grid-item">
              <p>Avg. Questions Answered</p>
              <b>
                {' '}
                <p>0%</p>
              </b>
            </div>
          </div>
        </Cards>
      </Main>
    </>
  );
};

export default OverAllReportQuiz;
