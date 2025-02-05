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

export const aboutChallanges = (
  <AddUser>
    <Row>
      <div className="inner-main-schedule">
        <Col md={24}>
          <form>
            <div className="aboutChallanges-title">
              <h3>
                How can we help you? This question is required?
                <span className="required-color">*</span>
              </h3>
              <p>You can elaborate further with the next question?</p>
              <p>You can select as many as you’d like</p>
            </div>
            <div className="aboutChallanges-form">
              <p>Choose as many as you like</p>
              <div class="form-group">
                <input type="checkbox" name="about-course" id="specific-course" />
                <label for="specific-course">
                  Preparing for a standardized exam (ISEE, SSAT, HSPT, ,PSAT, SAT, ACT, GRE, ETC)
                </label>
              </div>

              <div class="form-group">
                <input type="checkbox" name="about-test" id="standardized-test" />
                <label for="standardized-test">Keeping up with a specific course or class</label>
              </div>

              <div class="form-group twolinesTick">
                <input type="checkbox" name="about-motivate" id="motivate" />
                <label for="motivate">Applying to College (BS, BA, and other undergraduate degrees)</label>
              </div>

              <div class="form-group">
                <input type="checkbox" name="about-Apply" id="Applyingclg" />
                <label for="Applyingclg">Applying to a graduate school (Masters, PhD, or Professional schools)</label>
              </div>

              <div class="form-group">
                <input type="checkbox" name="about-graduate" id="graduateSchool" />
                <label for="graduateSchool">Support for ADHD, Autism, Dyslexia, or other learning differences</label>
              </div>

              <div class="form-group">
                <input type="checkbox" name="about-Other" id="Enhancing" />
                <label for="Enhancing">Enhancing organization, motivation, and executive functioning skills</label>
              </div>

              <div class="form-group">
                <input type="checkbox" name="about-Other" id="Other" />
                <label for="Other">Other</label>
              </div>

              <div style={{ textAlign: 'left' }}>
                <button>Next</button>
              </div>
            </div>
          </form>
        </Col>
      </div>
    </Row>
  </AddUser>
);
