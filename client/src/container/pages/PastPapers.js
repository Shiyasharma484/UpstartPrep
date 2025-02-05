import React, { useEffect, useState } from 'react';
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
import PenIcon from '../../static/img/auth/pen-icon.png';
import arrow_icon from '../../static/img/auth/arrow-icon.png';
import calender_icon from '../../static/img/auth/calender-icon.png';
import verbal_leaf from '../../static/img/auth/verbal_leaf.png';
import download from '../../static/img/auth/download.png';
import quantitative from '../../static/img/auth/quantitative.png';
import examiner from '../../static/img/auth/examiner.png';
import student_clock from '../../static/img/auth/student-clock.png';
import imageUploadSave from '../../helpers/uploadImage';
import { TextArea } from '@progress/kendo-react-inputs';
import { CChart } from '@coreui/react-chartjs';
import Calendar from 'react-calendar';
import vector from '../../static/img/icon/Vector.png';
import user from '../../static/img/icon/user.png';
import clock from '../../static/img/icon/clock.png';
import eye from '../../static/img/icon/eye.png';
import message from '../../static/img/icon/message.png';
import iconsss from '../../static/img/icon/iconsss.png';
import 'react-calendar/dist/Calendar.css';

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { decodetheid, encrypttheid } = require('../../helpers/encode-decode');
const { decrypt } = require('../../helpers/encryption-decryption');
const PastPapers = () => {
  const [value, onChange] = useState(new Date());
  const [form] = Form.useForm();
  const [imageform] = Form.useForm();
  const [userid, setUserID] = useState();
  const [Images, setImages] = useState([]);
  const [ImageUrl, setImageURL] = useState([]);
  const [Defaultimagedata, setdefaultimagedata] = useState([]);
  const [reRenderPinData, setReRenderPinData] = useState(0);
  const [AllPastPapers, setAllPastPapers] = useState([]);

  useEffect(() => {
    const enc_user_detail = Cookies.get('UserDetail');
    const response = decrypt(enc_user_detail);
    console.log(response);
    const userId = response?.sessdata?.users_id;
    const users_id_enc = response?.sessdata?.users_id_enc;
    setUserID(userId);
    async function pastPaperById() {
      const url = api_url.get_pastpaper_byid + users_id_enc;
      const response = await get_api_request(url, headers);
      console.log(response);
      const Exam = response?.data?.Exams;
      const Practice_Set = response?.data?.Practice_Set;
      const Quiz = response?.data?.Quiz;
      if (Quiz) {
        var new_array = Exam.concat(Practice_Set).concat(Quiz);
        setAllPastPapers(new_array);
      }
    }
    pastPaperById();
    async function getalldefaultImage() {
      const url = api_url.get_defaultimage_byuserid;

      const response = await get_api_request(url, headers);
      if (response.status === 200) {
        const defaultimagedata = response.data.responsedata;
        console.log(defaultimagedata);
        defaultimagedata?.map((item, index) => {
          defaultimagedata[index].image = domainpath + item.image_url;
        });
        console.log(defaultimagedata);
        setdefaultimagedata(defaultimagedata);
      }
    }
    getalldefaultImage();
  }, [reRenderPinData]);

  const url = domainpath + '/images/post';
  const imageHandleChange = async (e, index) => {
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);
    Defaultimagedata[index].image_url = singleimage;
    Defaultimagedata[index].image = singleimage;
    setImages(singleimage);

    await imageUploadSave(vfile, url, headers)
      .then(resp => {
        setImageURL(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };

  const handleSubmit = () => {
    const payload = {};
    payload['image_url'] = ImageUrl.toString();
    async function UpdateData(data) {
      const url = api_url.updatebyuserId_defaultImage;
      const response = await put_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: 'DefaultImage Create Successfully',
        });
        //setReRenderPinData(reRenderPinData + 1);
      }
    }

    UpdateData(payload);
  };

  return (
    <>
      <PageHeader />
      <Main>
        <Row gutter={40} className="progressbar-main">
          <Col md={16} xs={24} className="pad-5">
            <Row>
              <Col md={24} xs={24} className="testMain_div papers-bio-main">
                <div>
                  <h3>Past Papers</h3>
                </div>
                <div className="testinner_div papers-bio">
                  <select className="biology-options">
                    <option>Biology</option>
                    <option>Biology 1</option>
                    <option>Biology 2</option>
                  </select>
                  <FeatherIcon icon="filter" /> <span style={{ fontWeight: '400' }}>Filter By</span>
                  <DatePicker defaultValue={moment('2023:05:01')}></DatePicker>
                  <span>to</span>
                  <DatePicker defaultValue={moment('2023:05:02')}></DatePicker>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={24} xs={24}>
                <div className="papers-download">
                  {AllPastPapers?.map((item, i) => (
                    <div className="papers-download-inner">
                      <div className="flex-left-paper">
                        <div className="inner">
                          <p>{moment(item?.datetime).format('DD-MM-YYYY')}</p>
                          <div className="biology">
                            <div>
                              <img src={verbal_leaf} /> {item?.exam_title}
                            </div>
                            <div>{item?.result}</div>
                          </div>
                        </div>
                        <div className="inner">
                          <p style={{ margin: '0' }}>{item?.total_questions} questions</p>
                        </div>
                      </div>
                      {/* <div className="download-papers">
                        <a>
                          <img src={download} /> Download Now
                        </a>
                      </div> */}
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Col>

          <Col md={8} xs={24} className="student-right-sidebar pad-5">
            <div>
              <Calendar onChange={onChange} value={value} />
            </div>
            <div className="student-sidebar-inner">
              <h1>Upcoming Tests</h1>
              <div className="upcoming-main">
                <div className="inner-main-first">
                  <p className="upcoming-date">7</p>
                  <div className="upcoming-year-main">
                    <p className="upcoming-year">June 2022</p> <p className="upcoming-time">24:00</p>
                  </div>
                </div>
                <hr />
                <div className="inner-main-sec">
                  <p className="title-bio">Biology | Mock Test I</p>
                  <p className="des-bio">Professor Arnold Lorem</p>
                </div>
              </div>

              <div className="upcoming-main">
                <div className="inner-main-first">
                  <p className="upcoming-date" style={{ background: '#F0C19A' }}>
                    7
                  </p>
                  <div className="upcoming-year-main">
                    <p className="upcoming-year">July 2020</p> <p className="upcoming-time">24:00</p>
                  </div>
                </div>
                <hr />
                <div className="inner-main-sec">
                  <p className="title-bio">History | Mock Test II</p>
                  <p className="des-bio">Professor Arnold Lorem</p>
                </div>
              </div>

              <h1>My Test History</h1>
              <div className="upcoming-main">
                <div className="inner-main-first">
                  <p className="upcoming-date" style={{ background: '#898585', padding: '4px 6px 4px 5px' }}>
                    17
                  </p>
                  <div className="upcoming-year-main">
                    <p className="upcoming-year">July 2020</p> <p className="upcoming-time">24:00</p>
                  </div>
                </div>
                <hr />
                <div className="inner-main-sec">
                  <p className="title-bio">Biology | Mock Test II</p>
                  <p className="des-bio">Professor Arnold Lorem</p>
                </div>
              </div>

              <div className="upcoming-main">
                <div className="inner-main-first">
                  <p className="upcoming-date" style={{ background: '#F0C19A' }}>
                    7
                  </p>
                  <div className="upcoming-year-main">
                    <p className="upcoming-year">July 2020</p> <p className="upcoming-time">24:00</p>
                  </div>
                </div>
                <hr />
                <div className="inner-main-sec">
                  <p className="title-bio">History | Mock Test II</p>
                  <p className="des-bio">Professor Arnold Lorem</p>
                </div>
              </div>

              <div className="upcoming-main">
                <div className="inner-main-first">
                  <p className="upcoming-date">7</p>
                  <div className="upcoming-year-main">
                    <p className="upcoming-year">June 2022</p> <p className="upcoming-time">24:00</p>
                  </div>
                </div>
                <hr />
                <div className="inner-main-sec">
                  <p className="title-bio">Biology | Mock Test I</p>
                  <p className="des-bio">Professor Arnold Lorem</p>
                </div>
              </div>

              <div className="upcoming-main">
                <div className="inner-main-first">
                  <p className="upcoming-date">7</p>
                  <div className="upcoming-year-main">
                    <p className="upcoming-year">June 2022</p> <p className="upcoming-time">24:00</p>
                  </div>
                </div>
                <hr />
                <div className="inner-main-sec">
                  <p className="title-bio">Biology | Mock Test I</p>
                  <p className="des-bio">Professor Arnold Lorem</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default PastPapers;
