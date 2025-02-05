import React, { useEffect, useState } from 'react';
import { Row, Col, Form, notification, Input, Button, Select, DatePicker } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { AddUser } from './style';
import Cookies from 'js-cookie';
import { Main } from '../styled';
import dayjs from 'dayjs';
import 'moment/locale/zh-cn';
import { get_api_request, post_api_request, put_api_request, api_url } from '../../helpers/Common';
import { headers } from '../../helpers/variables';
import shapes from '../../static/img/shape.png';
import FeatherIcon from 'feather-icons-react';
import PrivateTutoring from '../../static/img/Private-Tutoring.png';
import instructor from '../../static/img/instructor1.jpg';
import { shape } from 'prop-types';
import { createGlobalStyle } from 'styled-components';
import SiteHeader from '../../container/dashboard/SiteHeader';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { decrypt, encrypt } = require('../../helpers/encryption-decryption');

const findInstructor = () => {
  const params = useParams();
  const history = useHistory();
  const [form] = Form.useForm();
  const [userid, setUserID] = useState();
  const [CategoryData, setCategoryData] = useState([]);
  const [arrayDataModels, setarrayDataModels] = useState([]);
  const [ShowPlus, setShowPlus] = useState(false);
  const [ShowMinus, setShowMinus] = useState(true);
  const [isIcon, setisIcon] = useState(false);
  const [InstructorData, setInstructorData] = useState([]);
  const [ShowPricePlus, setShowPricePlus] = useState(false);
  const [ShowPriceMinus, setShowPriceMinus] = useState(true);

  const [ShowGenderPlus, setShowGenderPlus] = useState(false);
  const [ShowGenderMinus, setShowGenderMinus] = useState(true);

  const [ShowInstructorPlus, setShowInstructorPlus] = useState(false);
  const [ShowInstructorMinus, setShowInstructorMinus] = useState(true);

  const [ShowRatingPlus, setShowRatingPlus] = useState(false);
  const [ShowRatingMinus, setShowRatingMinus] = useState(true);

  const [ShowTutorPlus, setShowTutorPlus] = useState(false);
  const [ShowTutorMinus, setShowTutorMinus] = useState(true);

  const [ShowMiscePlus, setShowMiscePlus] = useState(false);
  const [ShowMisceMinus, setShowMisceMinus] = useState(true);

  const [ShowTuitionPlus, setShowTuitionPlus] = useState(false);
  const [ShowTuitionMinus, setShowTuitionMinus] = useState(true);

  const [ShowlocationPlus, setShowlocationPlus] = useState(false);
  const [ShowTuitionDiv, setShowTuitionDiv] = useState(false);
  const [ShowTuitionDiv2, setShowTuitionDiv2] = useState(false);
  const [ShowlocationMinus, setShowlocationMinus] = useState(true);

  const [isActive, setIsActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [chooosemenu, setchooosemenu] = useState(false);
  const [testprepmenu, settestprepmenu] = useState(false);
  const [Academicmenu, setAcademicmenu] = useState(false);
  const [Strategiesmenu, setStrategiesmenu] = useState(false);
  const [Resourcesmenu, setResourcesmenu] = useState(false);

  const [config, setconfig] = useState([]);
  const [ConfigData, setConfigData] = useState([]);
  const [showlogo, setshowlogo] = useState();
  const [Message, setMessage] = useState();
  const [PagesData, setPagesData] = useState([]);

  const [formData, setformData] = useState({
    updtaecontext: '',
    updtaemodel: '',
  });

  const enc_user_detail = Cookies.get('UserDetail');

  useEffect(() => {
    const enc_user_detail = Cookies.get('UserDetail');
    const response = decrypt(enc_user_detail);
    const userId = response?.sessdata?.users_id;
    setUserID(userId);

    // async function getallConfiguration() {
    //   const Ids = '245';
    //   const url = api_url.get_all_configurations_byid + Ids;
    //   const response = await get_api_request(url, headers);
    //   if (response.status === 200) {
    //     const configdata = response.data.responsedata.configurations[0].config_value;
    //     setconfig(configdata);
    //     form.setFieldsValue({
    //       schedule_interval: configdata,
    //     });
    //   }
    // }
    // getallConfiguration();
    async function GetConfiguration() {
      const url = api_url.get_all_configurations;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const configdata = response?.data?.responsedata?.configurations[0].message;
        const configData = response?.data?.responsedata?.configurations[0];
        setConfigData(configData);
        setMessage(configdata);
        const show_logo = response?.data?.responsedata?.configurations[0]?.site_logo;
        setshowlogo(show_logo);
      } else {
        console.log('error');
      }
    }
    GetConfiguration();

    // async function GetAllSubcategory() {
    //   const url = api_url.get_subcategory;
    //   const response = await get_api_request(url, headers);
    //   if (response.status == 200) {
    //     console.log(response);
    //     const usersdata = response?.data?.responsedata;
    //     setCategoryData(usersdata);
    //   } else {
    //     console.log('error');
    //   }
    // }
    // GetAllSubcategory();

    // async function GetAllPages() {
    //   const url = api_url.getallpages;
    //   const response = await get_api_request(url, headers);
    //   console.log(response);
    //   if (response.status == 200) {
    //     const PageData = response?.data?.responsedata;
    //     setPagesData(PageData);
    //     console.log(PageData);
    //   } else {
    //     console.log('error');
    //   }
    // }
    // GetAllPages();
    async function GetAllInstructor() {
      const url = api_url.get_allInstructor;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const instructordata = response?.data?.responsedata;
        setInstructorData(instructordata);
        console.log(instructordata);
      } else {
        console.log('error');
      }
    }
    GetAllInstructor();
    setIsActive(true);
  }, []);
  const disabledDate = current => {
    return current && current < dayjs().endOf('day');
  };
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
  });

  //
  // const HandleSubmitForm = (feildsvalue, e) => {
  //   var payload = {};
  //   payload['fullname'] = feildsvalue.fullname;
  //   payload['email'] = feildsvalue.email;
  //   payload['phone'] = feildsvalue.phone;
  //   payload['subject'] = feildsvalue.subject;
  //   async function CreateSection(data) {
  //     const url = `/contactus/`;
  //     const response = await post_api_request(url, data, headers);
  //     console.log(response);
  //     if (response.status == 201) {
  //       notification.success({
  //         message: response?.data?.message,
  //       });
  //       setTimeout(() => {
  //         //window.location.reload();
  //       }, 1000);
  //       // history.push('../users/customer-list');
  //     } else
  //       notification.error({
  //         message: 'Server Error',
  //       });
  //   }
  //   CreateSection(payload);
  // };

  // const handleClick = event => {
  //   setIsActive1(current => !current);
  // };
  const handleClick = event => {
    setisIcon(current => !current);
  };
  const showNextDiv = e => {
    console.log(e);
    console.log(e.target.checked);
    var checkvalue = e.target.checked;
    console.log(checkvalue);
    if (checkvalue == true) {
      setShowTuitionDiv(true);
    } else if (checkvalue == false) {
      setShowTuitionDiv(false);
    }
    //setShowTuitionDiv(true);
  };
  const showNextDiv2 = e => {
    console.log(e);
    console.log(e.target.checked);
    var checkvalue = e.target.checked;
    console.log(checkvalue);
    if (checkvalue == true) {
      setShowTuitionDiv2(true);
    } else if (checkvalue == false) {
      setShowTuitionDiv2(false);
    }
    //setShowTuitionDiv(true);
  };
  const RedirectToDashboard = () => {
    //to="/dashboard"
    history.push(`/dashboard`);
    window.location.reload();
  };
  return (
    <>
      <Main className="mainSpace">
        {/*  */}
        <SiteHeader />
        <div className="container">
          <Row>
            <Col md={24} className="Main-findMain">
              <div className="findMain">
                <div className="firstdivFindPage">
                  <h2>46 search results found</h2>
                </div>
                <div className="seconddivFindPage" id="seconddivFindPage">
                  <Select defaultValue="Price high to low">
                    <Option value={1}>Price high to low</Option>
                    <Option value={2}>Price high to High</Option>
                  </Select>
                  <FeatherIcon icon="list" />
                  <FeatherIcon icon="grid" />
                </div>
              </div>
              <div className="mainSearch">
                <div className="searchFind-inner1">
                  <div className="first-search">
                    <FeatherIcon icon="search" />
                    <input placeholder="What are you looking for?" />
                  </div>
                  <div className="second-search">
                    <FeatherIcon icon="layers" />
                    <Select defaultValue="Select category" showSearch>
                      <Option value={1}>category1</Option>
                      <Option value={2}>category1</Option>
                    </Select>
                    <Button>Search Now</Button>
                  </div>
                </div>
                <div className="searchFind-inner2">
                  <img src={shapes}></img>
                  <span> Start from here </span>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="space-instuctor">
            <Col md={7} className="sideFirstWrapper">
              {/* <aside className={isActive1 ? 'tu-asidedetail bg-salmon' : 'tu-asidedetail'}>
                <a href="javascript:void(0)" class="tu-dbmenu" onClick={handleClick}>
                  <FeatherIcon icon="chevron-left" />
                </a> */}
              <div className="sideFirstWrapper-inner">
                <div className="headingSubject">
                  <h2>Subject & Level</h2>

                  {ShowMinus ? (
                    <FeatherIcon
                      icon="minus"
                      onClick={() => {
                        setShowPlus(true);
                        setShowMinus(false);
                      }}
                    />
                  ) : (
                    ''
                  )}
                  {ShowPlus ? (
                    <FeatherIcon
                      icon="plus"
                      onClick={() => {
                        setShowMinus(true);
                        setShowPlus(false);
                      }}
                    />
                  ) : (
                    ''
                  )}
                </div>
                {ShowMinus == true ? (
                  <Select defaultValue="Select category" showSearch>
                    <Option value={1}>category1</Option>
                    <Option value={2}>category1</Option>
                  </Select>
                ) : (
                  ''
                )}

                <div className="priceRange">
                  <div className="priceRange-inner1">
                    <h2>Price range</h2>

                    {ShowPriceMinus ? (
                      <FeatherIcon
                        icon="minus"
                        onClick={() => {
                          setShowPricePlus(true);
                          setShowPriceMinus(false);
                        }}
                      />
                    ) : (
                      ''
                    )}
                    {ShowPricePlus ? (
                      <FeatherIcon
                        icon="plus"
                        onClick={() => {
                          setShowPriceMinus(true);
                          setShowPricePlus(false);
                        }}
                      />
                    ) : (
                      ''
                    )}
                  </div>

                  {ShowPriceMinus == true ? (
                    <div className="priceRange-inner2">
                      <input type="number" defaultValue={1} min={1} />
                      <input type="number" defaultValue={5000} />
                    </div>
                  ) : (
                    ''
                  )}
                </div>

                <div className="genderSection">
                  <div className="headingGender">
                    <h2>Gender</h2>

                    {ShowGenderMinus ? (
                      <FeatherIcon
                        icon="minus"
                        onClick={() => {
                          setShowGenderPlus(true);
                          setShowGenderMinus(false);
                        }}
                      />
                    ) : (
                      ''
                    )}
                    {ShowGenderPlus ? (
                      <FeatherIcon
                        icon="plus"
                        onClick={() => {
                          setShowGenderMinus(true);
                          setShowGenderPlus(false);
                        }}
                      />
                    ) : (
                      ''
                    )}
                  </div>

                  {ShowGenderMinus == true ? (
                    <Select defaultValue="Both" showSearch style={{ width: '100%' }}>
                      <Option value={1}>Male</Option>
                      <Option value={2}>Female</Option>
                      <Option value={3}>Both</Option>
                    </Select>
                  ) : (
                    ''
                  )}

                  <div className="headingAvality">
                    <h2>Instructor availability</h2>

                    {ShowInstructorMinus ? (
                      <FeatherIcon
                        icon="minus"
                        onClick={() => {
                          setShowInstructorPlus(true);
                          setShowInstructorMinus(false);
                        }}
                      />
                    ) : (
                      ''
                    )}
                    {ShowInstructorPlus ? (
                      <FeatherIcon
                        icon="plus"
                        onClick={() => {
                          setShowInstructorMinus(true);
                          setShowInstructorPlus(false);
                        }}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </div>

                {ShowInstructorMinus == true ? (
                  <>
                    <div className="timeCheckbox">
                      <h2>Time of day</h2>
                      <div className="timeCheckbox-inner">
                        <div className="timeCheckbox-inner1">
                          <label class="check-container">
                            <span>
                              {' '}
                              <FeatherIcon icon="sunrise" /> PRE 12PM
                            </span>
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                          </label>
                        </div>
                        <div className="timeCheckbox-inner1">
                          <label class="check-container">
                            <span>
                              {' '}
                              <FeatherIcon icon="sun" /> 12PM-5PM
                            </span>
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                          </label>
                        </div>
                        <div className="timeCheckbox-inner1">
                          <label class="check-container">
                            <span>
                              <FeatherIcon icon="sunset" /> AFTER 5PM
                            </span>
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="dayCheckbox">
                      <h2>Day of week</h2>
                      <div className="timeCheckbox-inner">
                        <div className="timeCheckbox-inner1">
                          <label class="check-container">
                            <span>Mon</span>
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                          </label>
                        </div>
                        <div className="timeCheckbox-inner1">
                          <label class="check-container">
                            <span>Tue</span>
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                          </label>
                        </div>
                        <div className="timeCheckbox-inner1">
                          <label class="check-container">
                            <span>Wed</span>
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                          </label>
                        </div>
                        <div className="timeCheckbox-inner1">
                          <label class="check-container">
                            <span>Thu</span>
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                          </label>
                        </div>
                        <div className="timeCheckbox-inner1">
                          <label class="check-container">
                            <span>Fri</span>
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  ''
                )}

                <div className="ratingMainDiv">
                  <div className="headingAvality">
                    <h2>Rating</h2>

                    {ShowRatingMinus ? (
                      <FeatherIcon
                        icon="minus"
                        onClick={() => {
                          setShowRatingPlus(true);
                          setShowRatingMinus(false);
                        }}
                      />
                    ) : (
                      ''
                    )}
                    {ShowRatingPlus ? (
                      <FeatherIcon
                        icon="plus"
                        onClick={() => {
                          setShowRatingMinus(true);
                          setShowRatingPlus(false);
                        }}
                      />
                    ) : (
                      ''
                    )}
                  </div>

                  {ShowRatingMinus == true ? (
                    <>
                      <div className="timeCheckbox-inner1">
                        <label class="check-container">
                          <span>
                            <FeatherIcon icon="star" className="yellowStar" />
                            <FeatherIcon icon="star" className="yellowStar" />
                            <FeatherIcon icon="star" className="yellowStar" />
                            <FeatherIcon icon="star" className="yellowStar" />
                            <FeatherIcon icon="star" className="yellowStar" />
                            5.0/5.0
                          </span>
                          <input type="checkbox" />
                          <span class="checkmark"></span>
                        </label>
                      </div>

                      <div className="timeCheckbox-inner1">
                        <label class="check-container">
                          <span>
                            <FeatherIcon icon="star" className="yellowStar" />
                            <FeatherIcon icon="star" className="yellowStar" />
                            <FeatherIcon icon="star" className="yellowStar" />
                            <FeatherIcon icon="star" className="yellowStar" />
                            <FeatherIcon icon="star" className="lightstar" />
                            4.0/5.0
                          </span>
                          <input type="checkbox" />
                          <span class="checkmark"></span>
                        </label>
                      </div>

                      <div className="timeCheckbox-inner1">
                        <label class="check-container">
                          <span>
                            <FeatherIcon icon="star" className="yellowStar" />
                            <FeatherIcon icon="star" className="yellowStar" />
                            <FeatherIcon icon="star" className="yellowStar" />
                            <FeatherIcon icon="star" className="lightstar" />
                            <FeatherIcon icon="star" className="lightstar" />
                            3.0/5.0
                          </span>
                          <input type="checkbox" />
                          <span class="checkmark"></span>
                        </label>
                      </div>

                      <div className="timeCheckbox-inner1">
                        <label class="check-container">
                          <span>
                            <FeatherIcon icon="star" className="yellowStar" />
                            <FeatherIcon icon="star" className="yellowStar" />
                            <FeatherIcon icon="star" className="lightstar" />
                            <FeatherIcon icon="star" className="lightstar" />
                            <FeatherIcon icon="star" className="lightstar" />
                            2.0/5.0
                          </span>
                          <input type="checkbox" />
                          <span class="checkmark"></span>
                        </label>
                      </div>

                      <div className="timeCheckbox-inner1">
                        <label class="check-container">
                          <span>
                            <FeatherIcon icon="star" className="yellowStar" />
                            <FeatherIcon icon="star" className="lightstar" />
                            <FeatherIcon icon="star" className="lightstar" />
                            <FeatherIcon icon="star" className="lightstar" />
                            <FeatherIcon icon="star" className="lightstar" />
                            1.0/5.0
                          </span>
                          <input type="checkbox" />
                          <span class="checkmark"></span>
                        </label>
                      </div>
                    </>
                  ) : (
                    ''
                  )}
                </div>

                <div className="tutorLocationMain">
                  <div className="tutorLocationMain-inner">
                    <div className="headingAvality">
                      <h2>Tutor location</h2>

                      {ShowTutorMinus ? (
                        <FeatherIcon
                          icon="minus"
                          onClick={() => {
                            setShowTutorPlus(true);
                            setShowTutorMinus(false);
                          }}
                        />
                      ) : (
                        ''
                      )}
                      {ShowTutorPlus ? (
                        <FeatherIcon
                          icon="plus"
                          onClick={() => {
                            setShowTutorMinus(true);
                            setShowTutorPlus(false);
                          }}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>

                  {ShowTutorMinus == true ? (
                    <>
                      <Select defaultValue="India" showSearch style={{ width: '100%', marginBottom: '10px' }}>
                        <Option value={1}>India</Option>
                        <Option value={2}>US</Option>
                        <Option value={3}>Japan</Option>
                      </Select>
                      <Select
                        defaultValue="Himachal Pardesh"
                        showSearch
                        style={{ width: '100%', marginBottom: '10px' }}
                      >
                        <Option value={1}>Himachal Pardesh</Option>
                        <Option value={2}>Punjab</Option>
                        <Option value={3}>Delhi</Option>
                      </Select>
                      <Select defaultValue="Kangra" showSearch style={{ width: '100%', marginBottom: '10px' }}>
                        <Option value={1}>Kangra</Option>
                        <Option value={2}>Mandi</Option>
                        <Option value={3}>Hamirpur</Option>
                      </Select>
                      <div className="sidebar-fields">
                        <input type="email" placeholder="Enter address or zipcode" />
                      </div>
                      <div className="sidebar-fields-range">
                        <div className="sidebar-fields-inner">
                          <p>Radius in miles</p>
                          <p>2m</p>
                        </div>
                        <div className="range">
                          <input type="range" min="1" max="100" />
                        </div>
                      </div>
                    </>
                  ) : (
                    ''
                  )}
                </div>

                <div className="MiscellaneousDiv">
                  <div className="headingAvality">
                    <h2>Miscellaneous</h2>

                    {ShowMisceMinus ? (
                      <FeatherIcon
                        icon="minus"
                        onClick={() => {
                          setShowMiscePlus(true);
                          setShowMisceMinus(false);
                        }}
                      />
                    ) : (
                      ''
                    )}
                    {ShowMiscePlus ? (
                      <FeatherIcon
                        icon="plus"
                        onClick={() => {
                          setShowMisceMinus(true);
                          setShowMiscePlus(false);
                        }}
                      />
                    ) : (
                      ''
                    )}
                  </div>

                  {ShowMisceMinus == true ? (
                    <>
                      <div className="timeCheckbox-inner1">
                        <label class="check-container">
                          <span>Online</span>
                          <input type="checkbox" />
                          <span class="checkmark"></span>
                        </label>
                      </div>

                      <div className="timeCheckbox-inner1">
                        <label class="check-container">
                          <span>Offline</span>
                          <input type="checkbox" onChange={e => showNextDiv(e)} />
                          <span class="checkmark"></span>
                        </label>
                      </div>
                    </>
                  ) : (
                    ''
                  )}
                </div>
                {ShowTuitionDiv == true ? (
                  <>
                    {' '}
                    <div className="tutorLocationMain">
                      <div className="headingAvality">
                        <h2>Tuition place</h2>

                        {ShowTuitionMinus ? (
                          <FeatherIcon
                            icon="minus"
                            onClick={() => {
                              setShowTuitionPlus(true);
                              setShowTuitionMinus(false);
                            }}
                          />
                        ) : (
                          ''
                        )}
                        {ShowTuitionPlus ? (
                          <FeatherIcon
                            icon="plus"
                            onClick={() => {
                              setShowTuitionMinus(true);
                              setShowTuitionPlus(false);
                            }}
                          />
                        ) : (
                          ''
                        )}
                      </div>

                      {ShowTuitionMinus == true ? (
                        <>
                          <div className="timeCheckbox-inner1">
                            <label class="check-container">
                              <span>Student place</span>
                              <input type="checkbox" />
                              <span class="checkmark"></span>
                            </label>
                          </div>
                          <div className="timeCheckbox-inner1">
                            <label class="check-container">
                              <span>Tutor place</span>
                              <input type="checkbox" onChange={e => showNextDiv2(e)} />
                              <span class="checkmark"></span>
                            </label>
                          </div>
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                    {ShowTuitionDiv2 == true ? (
                      <div className="tutorLocationMain">
                        <div className="tutorLocationMain-inner">
                          <div className="headingAvality">
                            <h2>Tuition location</h2>
                            {ShowlocationMinus ? (
                              <FeatherIcon
                                icon="minus"
                                onClick={() => {
                                  setShowlocationPlus(true);
                                  setShowlocationMinus(false);
                                }}
                              />
                            ) : (
                              ''
                            )}
                            {ShowlocationPlus ? (
                              <FeatherIcon
                                icon="plus"
                                onClick={() => {
                                  setShowlocationMinus(true);
                                  setShowlocationPlus(false);
                                }}
                              />
                            ) : (
                              ''
                            )}
                          </div>
                        </div>

                        {ShowlocationMinus == true ? (
                          <>
                            <Select defaultValue="India" showSearch style={{ width: '100%', marginBottom: '10px' }}>
                              <Option value={1}>India</Option>
                              <Option value={2}>US</Option>
                              <Option value={3}>Japan</Option>
                            </Select>
                            <Select
                              defaultValue="Himachal Pardesh"
                              showSearch
                              style={{ width: '100%', marginBottom: '10px' }}
                            >
                              <Option value={1}>Himachal Pardesh</Option>
                              <Option value={2}>Punjab</Option>
                              <Option value={3}>Delhi</Option>
                            </Select>
                            <Select defaultValue="Kangra" showSearch style={{ width: '100%', marginBottom: '10px' }}>
                              <Option value={1}>Kangra</Option>
                              <Option value={2}>Mandi</Option>
                              <Option value={3}>Hamirpur</Option>
                            </Select>
                          </>
                        ) : (
                          ''
                        )}
                      </div>
                    ) : (
                      ''
                    )}
                  </>
                ) : (
                  ''
                )}
                <div className="filterbuttonDiv">
                  <Button className="applyBtn">Apply Filters</Button>
                  <Button className="clearbtn">Clear All Filters</Button>
                </div>
              </div>
              {/* </aside> */}
            </Col>

            <Col md={16} className="sideSecondWrapper">
              {InstructorData?.map((item, index) => (
                <div className="instructorMainDiv">
                  <div className="divinstructor">
                    <div className="instructorMainDiv-first">
                      <img src={instructor}></img>
                      <Button
                        onClick={() =>
                          history.push({
                            pathname: '/instructor-detail',
                            id: item?.id,
                          })
                        }
                      >
                        View Profile
                      </Button>
                    </div>

                    <div className="instMainDiv-second">
                      <div className="HalfDiv">
                        <div className="instructorMainDiv-second">
                          <div className="instructorMainDiv-second2">
                            <img src="https://demos.wp-guppy.com/tuturnp/wp-content/uploads/2022/03/placeholder-100x100.png"></img>
                            <div className="instructorMainDivsecond-inner">
                              <div className="HeadingInstructName">
                                <div className="Heading-title">
                                  <h2>{item?.first_Name} </h2>
                                  <FeatherIcon icon="check-circle" />
                                </div>
                                <div className="Heading-address">
                                  <div className="Heading-addr-inner">
                                    <FeatherIcon icon="map-pin" />
                                    <span>Charlotte, OK</span>
                                  </div>
                                  <div className="Heading-addr-inner">
                                    <span> 5.0</span> <FeatherIcon icon="star" className="yellowStar" />
                                    <span> (06)</span>
                                  </div>
                                  <div className="Heading-addr-inner">
                                    <FeatherIcon icon="heart" />
                                    <span>Save</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="feeDiv">
                          <div className="feeDiv-inner">
                            <p>Starting from:</p>
                            <span>$69.00/hr</span>
                          </div>
                        </div>
                      </div>

                      <div className="inst-inner">
                        <p>Availability </p>
                        <ul class="tu-dayslist">
                          <li class="tu-days">
                            <span class="ti-day-name tu-greenv2">Mon</span>
                          </li>
                          <li class="tu-days">
                            <span class="ti-day-name tu-greenv2">Tue</span>
                          </li>
                          <li class="tu-days">
                            <span class="ti-day-name tu-greenv2">Wed</span>
                          </li>
                          <li class="tu-days">
                            <span class="ti-day-name tu-greenv2">Thu</span>
                          </li>
                          <li class="tu-days">
                            <span class="ti-day-name tu-greenv2">Fri</span>
                          </li>
                          <li class="tu-days">
                            <span class="ti-day-name ">Sat</span>
                          </li>
                          <li class="tu-days">
                            <span class="ti-day-name ">Sun</span>
                          </li>
                        </ul>
                      </div>
                      <div class="tu-instructors_service">
                        <p> You can get teaching service direct at </p>
                        <ul class="tu-instructors_service-list">
                          <li>
                            <FeatherIcon icon="video" />
                            <span>Online </span>
                          </li>
                          <li>
                            <FeatherIcon icon="map-pin" className="offlinesvg" />
                            <span>Offline</span>
                          </li>
                          <li>
                            <FeatherIcon icon="map-pin" />
                            <span>Student place</span>
                          </li>
                          <li>
                            <FeatherIcon icon="map-pin" />
                            <span>Tutor place</span>
                          </li>
                        </ul>
                      </div>

                      <p className="tu-listinginfo_description">
                        On the other hand, we denounce with righteous indignation and dislike men who are so beguiled
                        and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot
                        foresee the pain and trouble
                      </p>
                      <div className="SkiilsDiv">
                        <ul class="tu-serviceslist">
                          <li>
                            <Button>Arts, crafts &amp; music</Button>
                          </li>
                          <li>
                            <Button>Graduation</Button>
                          </li>
                          <li>
                            <Button>Health, fitness, sports</Button>
                          </li>
                          <li>
                            <Button>IT</Button>
                          </li>
                          <li>
                            <Button
                              class="tu-showmore tu-tooltip-tags"
                              href="javascript:void(0);"
                              data-tippy-trigger="click"
                              data-template="tu-industrypro"
                              data-tippy-interactive="true"
                              data-tippy-placement="top-start"
                            >
                              ...
                            </Button>
                            {/* <div id="tu-industrypro" class="tu-tippytooltip d-none">
                            <div class="tu-selecttagtippy tu-tooltip ">
                              <ul class="tu-posttag tu-posttagv2">
                                <li>
                                  <Button>Languages</Button>
                                </li>
                                <li>
                                  <Button>O-level</Button>
                                </li>
                                <li>
                                  <Button>Prmary</Button>
                                </li>
                                <li>
                                  <Button>Short courses</Button>
                                </li>
                              </ul>
                            </div>
                          </div> */}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Col>
            {/* <div className="container_fluid contact">
              <aside className={isActive ? 'tu-asidedetail bg-salmon' : 'tu-asidedetail'}>
                <a href="javascript:void(0)" class="tu-dbmenu" onClick={handleClick}>
                  <i class="fa fa-headphones" aria-hidden="true"></i>
                </a>
                <div class="tu-asidebar">
                  <div class="tu-asideinfo text-center">
                    <h6>I would like to get teaching service direct at</h6>
                  </div>
                  <ul class="tu-featureinclude">
                    <li>
                      <span class="icon icon-home tu-colorgreen">
                        {' '}
                        <i>My home</i>{' '}
                      </span>
                      <em class="fa fa-check-circle tu-colorgreen"></em>
                    </li>
                    <li>
                      <span class="icon icon-map-pin tu-colorblue">
                        {' '}
                        <i>Teacher's home</i>{' '}
                      </span>
                      <em class="fa fa-check-circle tu-colorgreen"></em>
                    </li>

                    <li>
                      <span class="icon icon-video tu-colororange">
                        {' '}
                        <i>Online</i>{' '}
                      </span>
                      <em class="fa fa-check-circle tu-colorgreen"></em>
                    </li>
                  </ul>
                  <div class="tu-contactbox">
                    <h6>Contact details</h6>
                    <ul class="tu-listinfo">
                      <li>
                        <span class="tu-bg-maroon">
                          <i class="fa fa-phone" aria-hidden="true"></i>
                        </span>
                        <h6>
                          0800 - 27<span>*** - ***</span>
                        </h6>
                      </li>

                      <li>
                        <span class="tu-bg-voilet">
                          <i class="fa fa-envelope-o" aria-hidden="true"></i>
                        </span>
                        <h6>
                          sarah@<span>*****</span>.com
                        </h6>
                      </li>
                      <li>
                        <span class="tu-bg-blue">
                          <i class="fa fa-skype" aria-hidden="true"></i>
                        </span>
                        <h6>
                          sara<span>********</span>
                        </h6>
                      </li>
                      <li>
                        <span class="tu-bg-green">
                          <i class="fa fa-whatsapp" aria-hidden="true"></i>
                        </span>
                        <h6>
                          1324 - 14<span>*** - ***</span>
                        </h6>
                      </li>
                      <li>
                        <span class="tu-bg-orange">
                          <i class="fa fa-print" aria-hidden="true"></i>
                        </span>
                        <a>
                          <span>******</span>.com
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="tu-unlockfeature text-center">
                    <h6>Click the button below to login &amp; unlock the contact details </h6>
                    <a href="https://demos.wp-guppy.com/tuturnp/login/" class="tu-primbtn tu-btngreen">
                      <span>Unlock feature</span>
                      <i class="icon icon-lock"></i>
                    </a>
                  </div>
                </div>
              </aside>
            </div> */}
          </Row>
        </div>

        <div className="footersection">
          <div className="container">
            <Row gutter={30} className="howItWorkRowFooter">
              <Col md={24}>
                <p>© AjivaInfotech 2023 All Rights Reserved.</p>
              </Col>
            </Row>
          </div>
        </div>
      </Main>
    </>
  );
};

export default findInstructor;
