import React, { useEffect, useState } from 'react';
import { Row, Col, Form, notification, Input, Button, Select, DatePicker } from 'antd';
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
import hero_BG from '../../static/img/auth/home-hero-img.png';
import features from '../../static/img/auth/48x48.png';
import videoLessons from '../../static/img/video-lessons.png';
import QuestionBank from '../../static/img/Question-bank.png';
import PrivateTutoring from '../../static/img/Private-Tutoring.png';
import MockTests from '../../static/img/Mock-Tests.png';
import { encrypttheid } from '../../helpers/encode-decode';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const ActivePlan = () => {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [CategoryData, setCategoryData] = useState({});
  const [PlansData, setPlansData] = useState([]);
  const [featurearraydata, setfeaturearraydata] = useState([]);
  const [ConfigData, setConfigData] = useState([]);
  const [Message, setMessage] = useState();
  const [showlogo, setshowlogo] = useState();
  const [CategoryID, setCategoryID] = useState();
  useEffect(() => {
    const enc_user_detail = Cookies.get('UserDetail');
    async function GetAllUsers() {
      const url = api_url.get_category;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const usersdata = response?.data?.responsedata;
        const dataArray = usersdata.map(item => {
          return { id: item.id, name: item.category_name };
        });
        // setCategoryID(dataArray?.[0]?.id);
        getCategoryId(dataArray?.[0]?.id);
        setData(dataArray);
      } else {
        console.log('error');
      }
    }
    GetAllUsers();

    async function GetConfiguration() {
      const url = api_url.get_all_configurations;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const configdata = response?.data?.responsedata?.configurations[0].message;
        setMessage(configdata);
        const configData = response?.data?.responsedata?.configurations[0];
        setConfigData(configData);
        const show_logo = response?.data?.responsedata?.configurations[0]?.site_logo;
        setshowlogo(show_logo);
      } else {
        console.log('error');
      }
    }
    GetConfiguration();

    async function Getallmodules(data) {
      const url = api_url.getall_modules;
      const response = await get_api_request(url, data, headers);
      console.log(response);
      if (response.status == 200) {
        const Moduledata = response?.data?.responsedata?.modules;
        const getmodules = Moduledata.map(items => {
          if (items.name == 'PLANS') {
            const parentdata = items?.parent_id;
            async function getentitybyparentid() {
              const url = '/entity/parent/' + parentdata;
              const response = await get_api_request(url, data, headers);
              const questiontypedata = response?.data?.responsedata;
              //setData(questiontypedata);
              // const DataArray = questiontypedata.map(item => {
              //   return { id: item.id, name: item.name };
              // });
              setfeaturearraydata(questiontypedata);
            }
            getentitybyparentid();
          }
        });
      } else {
        console.log('error');
      }
    }
    Getallmodules();
  }, []);
  async function GetUserPlansDataByID(id) {
    console.log(id);
    const url = api_url.get_plans;
    const response = await get_api_request(url, headers);
    console.log(response);
    if (response.status == 200) {
      const categorydata = response?.data?.responsedata;
      const categoryIddata = response?.data?.responsedata;
      var changed_array = categoryIddata?.map(item => {
        var featureddata = [];
        if (item?.feature) {
          var feature_array = (item?.feature).match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
          featureddata = feature_array?.map(item => {
            return Number(item);
          });
        }

        item.feature = featureddata;
        return item;
      });
      setCategoryData(categorydata);
      setPlansData(changed_array);
      console.log(categorydata);
    } else {
      console.log('error');
    }
  }
  const getCategoryId = e => {
    console.log(e);
    GetUserPlansDataByID(e);
    setCategoryID(e);
  };
  const GoCheckout = e => {
    console.log(e);
    var id = encrypttheid(e);
    history.push(`../../checkout/${id}`);
    window.location.reload();
  };

  const HandleSubmitForm = (feildsvalue, e) => {
    var payload = {};
    payload['fullname'] = feildsvalue.fullname;
    payload['email'] = feildsvalue.email;
    payload['phone'] = feildsvalue.phone;
    payload['subject'] = feildsvalue.subject;
    async function CreateSection(data) {
      const url = `/contactus/`;
      const response = await post_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.message,
        });
        setTimeout(() => {
          //window.location.reload();
        }, 1000);
        // history.push('../users/customer-list');
      } else
        notification.error({
          message: 'Server Error',
        });
    }
    CreateSection(payload);
  };
  const enc_user_detail = Cookies.get('UserDetail');
  return (
    <>
      <Main className="mainSpace">
        <Row gutter={15} style={{ background: '#fff' }}>
          <Col xs={24}>
            <div className="features-main-line pricingPageFooter">
              <div className="features-main-size">
                <div className="features-main">
                  <div className="features-left">
                    <h1>{CategoryData?.plan_name} Subscription Plans</h1>
                    <p className="site-des">To be paid as a one-time payment.</p>
                  </div>

                  <div
                    className="pricingSection"
                    // data-aos="fade-up"
                    // data-aos-offset="10"
                    // data-aos-delay="50"
                    // data-aos-duration="1500"
                    // data-aos-easing="ease-in-out"
                    // data-aos-mirror="true"
                    // data-aos-once="true"
                    // data-aos-anchor-placement="top-center"
                  >
                    <div className="price-main">
                      <div className="price-inner">
                        <div className="price-inner-top">
                          <p className="pricing-pop">MOST POPULAR</p>
                          <p className="pricing-gold">ISEE Free</p>
                          <p className="pricing-price">
                            $100 <span>/month</span>
                          </p>

                          <p className="site-des">To be paid $300 for 4 months</p>
                          <p className="current-plan">Current Plan</p>

                          <Button className="pass-link buyPlan" id="UnSubscribe">
                            UnSubscribe
                          </Button>
                        </div>
                        <div className="price-inner-top">
                          <p className="site-des">Month Unlimited Access To</p>
                          {featurearraydata?.map((item1, index) => (
                            <p className="site-des">
                              <svg
                                className="flex-shrink-0 h-5 w-5 text-green-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>

                              {item1.name}
                            </p>
                          ))}
                        </div>{' '}
                      </div>
                    </div>
                    {PlansData?.map((item, index) => (
                      <div className="price-main">
                        <div className="price-inner">
                          <div className="price-inner-top">
                            <p className="pricing-pop">MOST POPULAR</p>
                            <p className="pricing-gold">{item?.plan_name}</p>
                            <p className="pricing-price">
                              ${item?.price} <span>/month</span>
                            </p>
                            <p className="site-des">To be paid $300 for 4 months</p>
                            <Button className="pass-link buyPlan" onClick={() => GoCheckout(item.id)}>
                              Buy Plan
                            </Button>
                          </div>
                          <div className="price-inner-top">
                            <p className="site-des">{item?.duration} Month Unlimited Access To</p>
                            {featurearraydata?.map((item1, index) => (
                              <p className="site-des">
                                {item['feature'].includes(item1?.id) ? (
                                  <svg
                                    className="flex-shrink-0 h-5 w-5 text-green-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                ) : (
                                  <svg
                                    style={{ color: 'rgba(239, 68, 68)' }}
                                    className="flex-shrink-0 h-5 w-5 text-red-500"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                  </svg>
                                )}
                                {item1.name}
                              </p>
                            ))}
                          </div>{' '}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default ActivePlan;
