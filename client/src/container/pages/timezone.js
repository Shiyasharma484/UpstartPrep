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

export const timezone = (
  <AddUser>
    <Row>
      <div className="inner-main-schedule">
        <Col md={24}>
          <form>
            <div className="aboutChallanges-title">
              <h3>In which time zone do you reside?</h3>
              <p>We want to make sure we don’t interrupt your favorite tv show. *Can we provide time and time zones</p>
            </div>

            <div className="aboutChallanges-form">
              <div class="form-group">
                <input type="checkbox" id="Signet-client" />
                <label for="Signet-client">Yes</label>
              </div>

              <div class="form-group">
                <input type="checkbox" id="another-org" />
                <label for="another-org">No</label>
              </div>
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
