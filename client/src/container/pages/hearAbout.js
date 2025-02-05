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

export const hearAbout = (
  <AddUser>
    <Row>
      <div className="inner-main-schedule">
        <Col md={24}>
          <form>
            <div className="aboutChallanges-title">
              <h3>This is great, how did you hear about us?</h3>
            </div>

            <div className="aboutChallanges-form">
              <div class="form-group">
                <input type="checkbox" id="Signet-client" />
                <label for="Signet-client">From an Upstart Prep Client</label>
              </div>

              <div class="form-group">
                <input type="checkbox" id="Online-org" />
                <label for="Online-org">Online</label>
              </div>

              <div class="form-group">
                <input type="checkbox" id="Returning-org" />
                <label for="Returning-org">Returning Upstart Prep Client</label>
              </div>

              <div class="form-group">
                <input type="checkbox" id="speaking-org" />
                <label for="speaking-org">From a speaking event</label>
              </div>

              <div class="form-group">
                <input type="checkbox" id="staff-org" />
                <label for="staff-org">From a staff member</label>
              </div>

              <div class="form-group">
                <input type="checkbox" id="organization" />
                <label for="organization">From a organization</label>
              </div>

              <div class="form-group">
                <input type="checkbox" id="Other" />
                <label for="Other">Other</label>
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
