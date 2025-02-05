import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Select, Space, notification, Input, Image, DatePicker } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import moment from 'moment';
import Cookies from 'js-cookie';
import { headers } from '../../helpers/variables';
import { get_api_request, post_api_request, api_url, delete_api_request, put_api_request } from '../../helpers/Common';
import { imageRender } from '../../helpers/renderImage';
import verbal_leaf from '../../static/img/auth/verbal_leaf.png';
import imageUploadSave from '../../helpers/uploadImage';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { decodetheid, encrypttheid } = require('../../helpers/encode-decode');
const { decrypt } = require('../../helpers/encryption-decryption');
const AllCourses = () => {
  const [value, onChange] = useState(new Date());
  const [form] = Form.useForm();
  const [imageform] = Form.useForm();
  const [userid, setUserID] = useState();
  const [Images, setImages] = useState([]);
  const [ImageUrl, setImageURL] = useState([]);
  const [Defaultimagedata, setdefaultimagedata] = useState([]);
  const [reRenderPinData, setReRenderPinData] = useState(0);
  const [AllCourses, setAllCourses] = useState([]);

  useEffect(() => {
    const enc_user_detail = Cookies.get('UserDetail');
    const response = decrypt(enc_user_detail);
    const userId = response?.sessdata?.users_id;
    setUserID(userId);

    async function getallCourse() {
      const url = api_url.get_allcourse_byuserid;
      const response = await get_api_request(url, headers);
      console.log(response);
      const course = response?.data?.data;
      setAllCourses(course);
    }
    getallCourse();

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
                <div className="allcourses-Title">
                  <p>All Course</p>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={24} xs={24}>
                <div className="papers-download">
                  {AllCourses?.map((item, i) => (
                    <div className="papers-download-inner">
                      <div className="flex-left-paper">
                        <div className="inner">
                          <p>{item?.skill_name}</p>
                          <div className="biology">
                            <div>
                              <img src={verbal_leaf} /> {item?.title}
                            </div>
                            <div>{item?.skills}</div>
                          </div>
                        </div>
                        <div className="inner">
                          <p style={{ margin: '0' }}>{item?.topics} chapters</p>
                        </div>
                      </div>

                      <div className="download-papers"></div>
                    </div>
                  ))}

                  {/* 
                  <div className="papers-download-inner">
                    <div className="flex-left-paper">
                      <div className="inner">
                        <p>Professor Richardson</p>
                        <div className="biology">
                          <div>
                            <img src={verbal_leaf} /> Biology
                          </div>
                          <div>401</div>
                        </div>
                      </div>
                      <div className="inner">
                        <p style={{ margin: '0' }}>13 chapters</p>
                      </div>
                    </div>

                    <div className="download-papers"></div>
                  </div> */}

                  {/* <div className="papers-download-inner">
                    <div className="flex-left-paper">
                      <div className="inner">
                        <p>Professor Richardson</p>
                        <div className="biology">
                          <div>
                            <img src={verbal_leaf} /> Biology
                          </div>
                          <div>401</div>
                        </div>
                      </div>
                      <div className="inner">
                        <p style={{ margin: '0' }}>13 chapters</p>
                      </div>
                    </div>

                    <div className="download-papers"></div>
                  </div>

                  <div className="papers-download-inner">
                    <div className="flex-left-paper">
                      <div className="inner">
                        <p>Professor Richardson</p>
                        <div className="biology">
                          <div>
                            <img src={verbal_leaf} /> Biology
                          </div>
                          <div>401</div>
                        </div>
                      </div>
                      <div className="inner">
                        <p style={{ margin: '0' }}>13 chapters</p>
                      </div>
                    </div>

                    <div className="download-papers"></div>
                  </div>

                  <div className="allcourses-Title-select">
                    <div className="allcourses-Title">
                      <p>Find Courses</p>
                    </div>

                    <div className="allcourses-Title">
                      <select className="biology-options">
                        <option>Biology</option>
                        <option>Biology 1</option>
                        <option>Biology 2</option>
                      </select>
                    </div>
                  </div>

                  <div className="papers-download-inner">
                    <div className="flex-left-paper">
                      <div className="inner">
                        <p>Professor Richardson</p>
                        <div className="biology">
                          <div>
                            <img src={verbal_leaf} /> Biology
                          </div>
                          <div>401</div>
                        </div>
                      </div>
                      <div className="inner">
                        <p style={{ margin: '0' }}>13 chapters</p>
                      </div>
                    </div>

                    <div className="download-papers"></div>
                  </div> */}
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

export default AllCourses;
