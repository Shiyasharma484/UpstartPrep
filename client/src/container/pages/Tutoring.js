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
const Linkedin = () => {
  const [form] = Form.useForm();
  const [imageform] = Form.useForm();
  const [userid, setUserID] = useState();
  const [Images, setImages] = useState([]);
  const [ImageUrl, setImageURL] = useState([]);
  const [Defaultimagedata, setdefaultimagedata] = useState([]);
  const [reRenderPinData, setReRenderPinData] = useState(0);

  useEffect(() => {
    const enc_user_detail = Cookies.get('UserDetail');
    const response = decrypt(enc_user_detail);
    const userId = response?.sessdata?.users_id;
    setUserID(userId);

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
  // async function UpdateData(data) {
  //   const url = api_url.updatebyuserId_defaultImage + userid;
  //   const response = await put_api_request(url, data, { headers });
  //   if (response.status == 201) {
  //     notification.success({
  //       message: 'DefaultImage updated Successfully',
  //     });
  //     setReRenderPinData(reRenderPinData + 1);
  //   }
  // }

  return (
    <>
      <PageHeader />
      <Main>
        <Row gutter={15}>
          <Col md={16} xs={24} className="pad-5">
            <Row className="bio-prof-btns">
              <Col md={24}>
                <div className="bio-prof-inner">
                  <a>Tutors</a>
                  <a className="active">Active</a>
                </div>

                <div className="bio-prof-inner">
                  <a>Past</a>
                </div>
              </Col>
            </Row>

            <Row className="bio-prof-btns2">
              <Col md={24}>
                <div className="bio-prof-bg">
                  <p>Professor Richardson</p>
                  <p className="verbal">
                    <img src={verbal_leaf} /> Biology
                  </p>
                </div>

                <div className="bio-prof-bg">
                  <p>Professor Richardson</p>
                  <p className="verbal">
                    <img src={verbal_leaf} /> Biology
                  </p>
                </div>
              </Col>
            </Row>

            <Row className="bio-prof-btns2">
              <Col md={24}>
                <div className="bio-prof-bg">
                  <p>Professor Richardson</p>
                  <p className="verbal">
                    <img src={verbal_leaf} /> Biology
                  </p>
                </div>

                <div className="bio-prof-bg">
                  <p>Professor Richardson</p>
                  <p className="verbal">
                    <img src={verbal_leaf} /> Biology
                  </p>
                </div>
              </Col>
            </Row>

            <Row className="bio-prof-btns2">
              <Col md={24}>
                <div className="bio-prof-bg">
                  <p>Professor Richardson</p>
                  <p className="verbal">
                    <img src={verbal_leaf} /> Biology
                  </p>
                </div>
              </Col>
            </Row>
          </Col>

          <Col md={8} xs={24} className="student-right-sidebar pad-5"></Col>
        </Row>
      </Main>
    </>
  );
};

export default Linkedin;
