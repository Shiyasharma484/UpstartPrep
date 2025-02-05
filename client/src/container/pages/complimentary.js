import React, { useEffect, useState } from 'react';
import { Row, Col, notification, Input, Select, DatePicker, Button } from 'antd';
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

export const complimentary = (
  <AddUser>
    <Row>
      <div className="inner-main-schedule">
        <Col md={24}>
          <form>
            <div className="aboutChallanges-title">
              <h3>What’s the best way for us to get in touch for your complimentary consultation. </h3>
              <p>
                By sharing your number, you’re kindly giving us permission to call you about the service you requested.
              </p>
            </div>

            <div className="aboutChallanges-form">
              <input type="number" placeholder="number" className="tellUsabout-input" />
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
