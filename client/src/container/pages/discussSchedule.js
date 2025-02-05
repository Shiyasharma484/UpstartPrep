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

export const discussSchedule = (
  <AddUser>
    <Row>
      <div className="inner-main-schedule" style={{ marginTop: '80px', marginBottom: '100px' }}>
        <Col md={24}>
          <h2>Hello, Answer a few Questions and we’ll get in touch with you shortly.</h2>
          <button>Schedule a Free Call</button>
        </Col>
      </div>
    </Row>
  </AddUser>
);
