import React, { useEffect, useState, useContext } from 'react';
// import { Context } from '../../App';
import { Row, Col, Form, Select, Space, notification, Input, Image, DatePicker } from 'antd';
import { useHistory } from 'react-router-dom';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import moment from 'moment';
import dayjs from 'dayjs';
import FeatherIcon from 'feather-icons-react';
import Cookies from 'js-cookie';
import authorizes from '../../../src/static/img/authorized.png';
import { headers } from '../../helpers/variables';
import { get_api_request, post_api_request, api_url, delete_api_request, put_api_request } from '../../helpers/Common';
import { imageRender } from '../../helpers/renderImage';
import StaticImage from '../../static/img/default_image.jpg';
import imageUploadSave from '../../helpers/uploadImage';
import { TextArea } from '@progress/kendo-react-inputs';

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { decodetheid, encrypttheid } = require('../../helpers/encode-decode');
const { decrypt } = require('../../helpers/encryption-decryption');
var ModuleName = 'POSTS';
const { RangePicker } = DatePicker;
const AddPins = () => {
  const history = useHistory(); //redirects in pages
  const [form] = Form.useForm();
  const [QuizeData, setQuizData] = useState([]);
  const [PrcaticeData, setPrcaticeData] = useState([]);
  const [data, setData] = useState([]);
  const [QuestionData, setQuestionData] = useState([]);
  const SuperAdminDetails = Cookies.get('SuperAdminDetails');

  /**GET RANDOM STRING COOKIES DATA ==================STARTS **/
  //  const userName = useContext(Context);

  /**GET RANDOM STRING COOKIES DATA ==================ENDS **/
  useEffect(() => {
    // if (SuperAdminDetails != undefined) {
    //   Cookies.set('UserDetail', SuperAdminDetails);
    //   Cookies.remove('LoginAsChild');
    //   Cookies.remove('SuperAdminDetails');
    //   // history.push(`../dashboard`);

    //   // setTimeout(() => {
    //   window.location.reload();
    //   // }, 500);
    // }
    async function GetAllUsers() {
      const url = api_url.get_all_users;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const usersdata = response?.data?.responsedata?.users;
        setData(usersdata);
      } else {
        console.log('error');
      }
    }
    GetAllUsers();
    async function GetAllQuizees() {
      const url = api_url.get_all_quiz;
      console.log(url);
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const QuizeeData = response?.data?.data;
        console.log(QuizeeData);
        setQuizData(QuizeeData);
      } else {
        console.log('error');
      }
    }
    GetAllQuizees();
    async function GetAllPractice() {
      const url = api_url.get_practice;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const practicedata = response?.data?.responsedata;
        setPrcaticeData(practicedata);
      } else {
        console.log('error');
      }
    }
    GetAllPractice();

    async function getallquestion() {
      const url = api_url.getallquestions;
      console.log(url);
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const questiondata = response?.data?.responsedata;

        setQuestionData(questiondata);
      } else {
        console.log('error');
      }
    }
    getallquestion();
  }, []);

  return (
    <>
      <Form name="sDash_validation-form" form={form} layout="vertical">
        <Main className="removeCardSpace">
          <Row gutter={40}>
            <Col md={6} xs={24} className="usersCard">
              <div className="zoom-animate">
                <div
                  data-aos="fade-up"
                  data-aos-offset="10"
                  data-aos-delay="50"
                  data-aos-duration="500"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="false"
                  data-aos-anchor-placement="top-center"
                >
                  <Cards>
                    <div className="secondcarddiv">
                      <h3>Total Users</h3>
                      <span style={{ color: 'rgb(34 55 78)' }}>{data?.length}</span>
                    </div>
                  </Cards>
                </div>
              </div>
            </Col>
            <Col md={6} xs={24} className="usersCard">
              <div className="zoom-animate">
                <div
                  data-aos="fade-up"
                  data-aos-offset="10"
                  data-aos-delay="50"
                  data-aos-duration="500"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="false"
                  data-aos-anchor-placement="top-center"
                >
                  <Cards>
                    <div className="secondcarddiv">
                      <h3>Total Questions</h3>
                      <span style={{ color: 'rgb(34 55 78)' }}>{QuestionData?.length}</span>
                    </div>
                  </Cards>
                </div>
              </div>
            </Col>
            <Col md={6} xs={24} className="usersCard">
              <div className="zoom-animate">
                <div
                  data-aos="fade-up"
                  data-aos-offset="10"
                  data-aos-delay="50"
                  data-aos-duration="500"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="false"
                  data-aos-anchor-placement="top-center"
                >
                  <Cards>
                    <div className="secondcarddiv">
                      <h3>Total Quizzes</h3>
                      <span style={{ color: 'rgb(34 55 78)' }}>{QuizeData?.length}</span>
                    </div>
                  </Cards>
                </div>
              </div>
            </Col>
            <Col md={6} xs={24} className="usersCard">
              <div className="zoom-animate">
                <div
                  data-aos="fade-up"
                  data-aos-offset="10"
                  data-aos-delay="50"
                  data-aos-duration="500"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="false"
                  data-aos-anchor-placement="top-center"
                >
                  <Cards>
                    <div className="secondcarddiv">
                      <h3>Total Practice Sets</h3>
                      <span style={{ color: 'rgb(34 55 78)' }}>{PrcaticeData?.length}</span>
                    </div>
                  </Cards>
                </div>
              </div>
            </Col>
          </Row>
          <Row gutter={40}>
            <Col md={12} xs={24} className="Card12div">
              <div
                data-aos="flip-down"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <Cards>
                  <div className="greenCard">
                    <div className="greenCard-inner">
                      <h3>To Teach is To Learn Twice Over</h3>
                      <p>
                        To get most of your account, checkout our docs to understand how this app can serve you and your
                        team.
                      </p>
                      <div className="Viewdocbtn ">
                        <Button className="btn-animation2 zoom-in-out">View Docs</Button>
                      </div>
                    </div>
                  </div>
                </Cards>
              </div>
            </Col>
            <Col md={12} xs={24} className="quicklink">
              <div
                data-aos="flip-down"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <Cards>
                  <div className="WhiteCard">
                    <div className="WhiteCard-inner">
                      <h3>QUICK LINKS</h3>

                      <div>
                        <p>
                          <a href="../dashboard/engage/create">New Quiz Schedule</a>
                        </p>
                      </div>

                      <div>
                        <p>
                          <a href="../dashboard/engage/create">Create New Quiz</a>
                        </p>
                      </div>
                      <div>
                        <p>
                          <a href="../dashboard/engage/createpractice">Create Practice Set</a>
                        </p>
                      </div>
                      <div>
                        <p>
                          <a>View Quizzes</a>
                        </p>
                      </div>
                      <div>
                        <p>
                          <a>View Practice Sets</a>
                        </p>
                      </div>
                    </div>

                    <div className="WhiteCard-inner">
                      <div>
                        <h3></h3>
                        <p>
                          <a href="../dashboard/library/question">Create New Question</a>
                        </p>
                      </div>

                      <div>
                        <p>
                          <a href="../dashboard/library/import-questions">Import Questions</a>
                        </p>
                      </div>
                      <div>
                        <p>
                          <a href="../dashboard/library/comprehension">Create New Comprehension</a>
                        </p>
                      </div>
                      <div>
                        <p>
                          <a href="../dashboard/configuration/skill-list">Create New Skill</a>
                        </p>
                      </div>
                      <div>
                        <p>
                          <a href="../dashboard/configuration/topiclist">Create New Topic</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </Cards>
              </div>
            </Col>
          </Row>
        </Main>
      </Form>
    </>
  );
};

export default AddPins;
