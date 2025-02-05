import React, { useEffect, useState } from 'react';
import { Row, Col, notification, Input, Select, DatePicker } from 'antd';
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
import Text from 'antd/lib/typography/Text';

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

export const yourname = (
  <AddUser>
    <Row>
      <div className="inner-main-schedule" style={{ marginTop: '80px', marginBottom: '100px' }}>
        <Col md={24}>
          <form>
            <div className="aboutChallanges-title yourname">
              <h3>
                Thank you, could you share more about the specific hurdles you’re encountering?
                <span className="required-color">*</span>
              </h3>
              <p>Share as much information as you’d like. We will ask all the technical details later</p>
            </div>
            <div className="aboutChallanges-form">
              <input type="text" placeholder="Type your answer here..." className="tellUsabout-input" />
            </div>

            <div style={{ textAlign: 'left' }}>
              <button>Next</button>
            </div>
          </form>
        </Col>
      </div>
    </Row>
  </AddUser>
);
