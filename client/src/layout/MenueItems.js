import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import iconDashboard from './../static/img/Home/icon-dashboard.png';
import icontutoring from './../static/img/Home/icon-tutoring.png';
import iconcourses from './../static/img/Home/icon-courses.png';
import iconanalysis from './../static/img/Home/icon-analysis.png';

const { decrypt } = require('../helpers/encryption-decryption');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const { SubMenu } = Menu;
var UserRole = [];

const MenuItems = ({ darkMode, toggleCollapsed, topMenu }) => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');
  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );
  const [RoleName, setRoleName] = useState();
  const [userRoleName, setUserRoleName] = useState();
  var LoginAsChild = Cookies.get('LoginAsChild');
  const SuperAdminDetails = Cookies.get('SuperAdminDetails');
  useEffect(() => {
    var enc_userDetail = Cookies.get('UserDetail');
    var response = decrypt(enc_userDetail);
    console.log(response);
    if (response?.login == true) {
      const UserInfo = response?.sessdata?.user?.[0];
      const GetRole = UserInfo?.user_role?.toUpperCase();
      setUserRoleName(GetRole);
      setRoleName(GetRole);
      if (UserInfo?.permissions != 'No Permission for role') {
        const modules = UserInfo?.permissions?.[GetRole].MODULES;
        UserRole = modules;
        console.log(UserRole);
      }
    }
  }, []);

  const onOpenChange = keys => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = item => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  const LoginAsSuperAdmin = () => {
    if (SuperAdminDetails != undefined) {
      Cookies.set('UserDetail', SuperAdminDetails);
      Cookies.remove('LoginAsChild');
      Cookies.remove('SuperAdminDetails');
      Cookies.remove('ChildByParent');
      // history.push(`../dashboard`);

      setTimeout(() => {
        history.push(`dashboard/admin`);
        window.location.reload();
      }, 500);
    }
  };

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      theme={darkMode && 'dark'}
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
      gutter={30}
      className="custmblock"
    >
      {UserRole != undefined ? (
        <>
          {/* {UserRole['POSTS'] !== undefined ? (
          <Menu.Item
            icon={
              !topMenu && (
                <NavLink className="menuItem-iocn" to={`${path}/pin-list`}>
                  <i class="fa fa-thumb-tack" style={{ fontSize: '20px', rotate: '30deg' }}></i>
                </NavLink>
              )
            }
            key="pins"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/add-pins`}>
              Pins
            </NavLink>
          </Menu.Item>
        ) : (
          ''
        )} */}
          {SuperAdminDetails != undefined ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={'/dashboard'}>
                    <FeatherIcon icon="check-square" />
                  </NavLink>
                )
              }
              key="Continue_As_Dashboard"
            >
              <NavLink
                onClick={
                  LoginAsSuperAdmin
                  // toggleCollapsed();
                }
                //to={`${path}/admin`}
                to={''}
              >
                Continue As Dashboard
              </NavLink>
            </Menu.Item>
          ) : (
            ''
          )}
          {UserRole['DASHBOARD'] !== undefined ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink
                    className="menuItem-iocn"
                    // to={`${path}/customer-lislt`}
                    to={'/dashboard'}
                  >
                    {/* <FeatherIcon icon="home" /> */}
                    <img src={iconDashboard} />
                  </NavLink>
                )
              }
              key="h_dashboard"
            >
              {RoleName == 'TEACHER' ? (
                <NavLink onClick={toggleCollapsed} to={`${path}/teacher`}>
                  Dashboard
                </NavLink>
              ) : RoleName == 'STUDENT' ? (
                <NavLink onClick={toggleCollapsed} to={`${path}/studenthome`}>
                  Dashboard
                </NavLink>
              ) : (
                <NavLink onClick={toggleCollapsed} to={`${path}/admin`}>
                  Dashboard
                </NavLink>
              )}
            </Menu.Item>
          ) : (
            ''
          )}
          {/* {UserRole['SETTINGS'] !== undefined ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={`${path}/customer-listl`}>
                    <FeatherIcon icon="file-text" />
                  </NavLink>
                )
              }
              key="file_manager"
            >
              <NavLink onClick={toggleCollapsed} to={`${path}/customer-listl`}>
                File Manager
              </NavLink>
            </Menu.Item>
          ) : (
            ''
          )} */}
          {UserRole['BLOG'] != undefined ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={`${path}/blog`}>
                    <FeatherIcon icon="message-square" />
                  </NavLink>
                )
              }
              key="blog"
            >
              <NavLink onClick={toggleCollapsed} to={`${path}/blog`}>
                Blog
              </NavLink>
            </Menu.Item>
          ) : (
            ''
          )}
          {UserRole['STUDENT'] !== undefined ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={`${path}/students`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="flex-shrink-0 w-5 h-5 ltr:mr-2 rtl:ml-2 transition"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                      ></path>
                    </svg>
                  </NavLink>
                )
              }
              key="students"
            >
              <NavLink onClick={toggleCollapsed} to={`${path}/students`}>
                Students
              </NavLink>
            </Menu.Item>
          ) : (
            ''
          )}
          {/* /************************ */}
          {/* {UserRole['DASHBOARD HOME'] !== undefined ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={`${path}/pin-listgg`}>
                    <FeatherIcon icon="layers" />
                  </NavLink>
                )
              }
              key="s_dashboard"
            >
              <NavLink onClick={toggleCollapsed} to={`${path}/studenthome`}>
                Dashboard
              </NavLink>
            </Menu.Item>
          ) : (
            ''
          )} */}
          {/* {RoleName == 'STUDENT' ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={`${path}/pin-listgg`}>
                    <FeatherIcon icon="file-text" />
                  </NavLink>
                )
              }
              key="Exam"
            >
              <NavLink onClick={toggleCollapsed} to={`${path}/exam`}>
                Exams
              </NavLink>
            </Menu.Item>
          ) : (
            ''
          )} */}

          {UserRole['STUDENT'] !== undefined ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={`${path}/parents`}>
                    <i class="fa fa-male" style={{ fontSize: '16px' }}></i>
                  </NavLink>
                )
              }
              key="parents"
            >
              <NavLink onClick={toggleCollapsed} to={`${path}/parents`}>
                Parents
              </NavLink>
            </Menu.Item>
          ) : (
            ''
          )}
          {UserRole['CONSULTATION REQUESTS'] != undefined ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={`${path}/consultation`}>
                    <FeatherIcon icon="check-square" />
                  </NavLink>
                )
              }
              key="consultation"
            >
              <NavLink onClick={toggleCollapsed} to={`${path}/consultation`}>
                Consultation Requests
              </NavLink>
            </Menu.Item>
          ) : (
            ''
          )}
          {UserRole['TUTORING'] != undefined ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={`${path}/tutoring`}>
                    {/* <FeatherIcon icon="file-plus" /> */}
                    <img src={icontutoring} />
                  </NavLink>
                )
              }
              key="tutoring"
            >
              <NavLink onClick={toggleCollapsed} to={`${path}/tutoring`}>
                Tutoring
              </NavLink>
            </Menu.Item>
          ) : (
            ''
          )}
          {UserRole['COURSES'] != undefined ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={`${path}/AllCourses`}>
                    {/* <FeatherIcon icon="file-plus" /> */}
                    <img src={iconcourses} />
                  </NavLink>
                )
              }
              key="AllCourses"
            >
              <NavLink onClick={toggleCollapsed} to={`${path}/AllCourses`}>
                All Courses
              </NavLink>
            </Menu.Item>
          ) : (
            ''
          )}
          {UserRole['ACTIVE PLAN'] != undefined ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={`${path}/activeplan`}>
                    <FeatherIcon icon="file-plus" />
                  </NavLink>
                )
              }
              key="activeplan"
            >
              <NavLink onClick={toggleCollapsed} to={`${path}/activeplan`}>
                Active Plan
              </NavLink>
            </Menu.Item>
          ) : (
            ''
          )}
          {UserRole['PAST PAPERS'] != undefined ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={`${path}/PastPapers`}>
                    <FeatherIcon icon="file-text" />
                  </NavLink>
                )
              }
              key="past_paper"
            >
              <NavLink onClick={toggleCollapsed} to={`${path}/PastPapers`}>
                Past Papers
              </NavLink>
            </Menu.Item>
          ) : (
            ''
          )}
          {/* {RoleName == 'STUDENT' ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={`${path}/pin-listgg`}>
                    <FeatherIcon icon="file-text" />
                  </NavLink>
                )
              }
              key="result"
            >
              <NavLink onClick={toggleCollapsed} to={`${path}/ViewResults`}>
                View Results
              </NavLink>
            </Menu.Item>
          ) : (
            ''
          )} */}
          {/* {RoleName == 'STUDENT' ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={`${path}/pin-listgg`}>
                    <FeatherIcon icon="file-text" />
                  </NavLink>
                )
              }
              key="Analysis"
            >
              <NavLink onClick={toggleCollapsed} to={`${path}/Analysis`}>
                Analysis
              </NavLink>
            </Menu.Item>
          ) : (
            ''
          )} */}
          {UserRole['ANALYSIS'] != undefined ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={`${path}/Analysis`}>
                    {/* <FeatherIcon icon="file-text" /> */}
                    <img src={iconanalysis} />
                  </NavLink>
                )
              }
              key="result"
            >
              <NavLink onClick={toggleCollapsed} to={`${path}/Analysis`}>
                Analysis
              </NavLink>
            </Menu.Item>
          ) : (
            ''
          )}
          {/* {UserRole['DASHBOARD HOME'] !== undefined ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={`${path}/pin-listgg`}>
                    <FeatherIcon icon="help-circle" />
                  </NavLink>
                )
              }
              key="quizzes"
            >
              <NavLink onClick={toggleCollapsed} to={`${path}/studenthome`}>
                Quizzes
              </NavLink>
            </Menu.Item>
          ) : (
            ''
          )} */}
          {/* {UserRole['DASHBOARD HOME'] !== undefined ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={`${path}/pin-listgg`}>
                    <FeatherIcon icon="bar-chart" />
                  </NavLink>
                )
              }
              key="progress"
            >
              <NavLink onClick={toggleCollapsed} to={`${path}/studenthome`}>
                My Progress
              </NavLink>
            </Menu.Item>
          ) : (
            ''
          )} */}
          {UserRole['TEACHER'] != undefined ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={`${path}/teachers`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="flex-shrink-0 w-5 h-5 ltr:mr-2 rtl:ml-2 transition"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2Z"></path>
                      <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783.059-.187.09-.386.09-.593V4a2 2 0 0 0-2-2H2Z"></path>
                    </svg>
                  </NavLink>
                )
              }
              key="teachers"
            >
              <NavLink onClick={toggleCollapsed} to={`${path}/teachers`}>
                Teachers
              </NavLink>
            </Menu.Item>
          ) : (
            ''
          )}
          {UserRole['CLASS WORK'] != undefined ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={`${path}/class-work`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="flex-shrink-0 w-5 h-5 ltr:mr-2 rtl:ml-2 transition"
                      enable-background="new 0 0 24 24"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="currentColor"
                    >
                      <g>
                        <rect fill="none" height="24" width="24"></rect>
                      </g>
                      <g>
                        <g>
                          <path d="M17.66,17.66l-1.06,1.06l-0.71-0.71l1.06-1.06l-1.94-1.94l-1.06,1.06l-0.71-0.71l1.06-1.06l-1.94-1.94l-1.06,1.06 l-0.71-0.71l1.06-1.06L9.7,9.7l-1.06,1.06l-0.71-0.71l1.06-1.06L7.05,7.05L5.99,8.11L5.28,7.4l1.06-1.06L4,4v14c0,1.1,0.9,2,2,2 h14L17.66,17.66z M7,17v-5.76L12.76,17H7z"></path>
                        </g>
                      </g>
                    </svg>
                  </NavLink>
                )
              }
              key="classwork"
            >
              <NavLink onClick={toggleCollapsed} to={`${path}/class-work`}>
                Class Work
              </NavLink>
            </Menu.Item>
          ) : (
            ''
          )}

          {RoleName != 'STUDENT' && RoleName != 'PARENT' ? (
            <div className="keysss">
              <p>ENGAGE</p>
            </div>
          ) : (
            ''
          )}
          {/* {UserRole['POSTS'] !== undefined ? (
          <Menu.Item
            icon={
              !topMenu && (
                <NavLink className="menuItem-iocn" to={`${path}/Board`}>
                  <FeatherIcon icon="layers" />
                </NavLink>
              )
            }
            key="trelloboard"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/Board`}>
              Board
            </NavLink>
            
          </Menu.Item>
        ) : (
          ''
        )} */}
          {/* {UserRole['POSTS'] !== undefined ? (
          <Menu.Item
            icon={
              !topMenu && (
                <NavLink className="menuItem-iocn" to={`${path}/Schedule`}>
                  <i class="fa fa-calendar" aria-hidden="true"></i>
                </NavLink>
              )
            }
            key="schedule"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/Schedule`}>
              Schedule
            </NavLink>
          
          </Menu.Item>
        ) : (
          ''
        )} */}
          {/* {UserRole['POSTS'] !== undefined ? (
          <Menu.Item
            icon={
              !topMenu && (
                <NavLink className="menuItem-iocn" to={`${path}/form-builder`}>
                  <i class="fa fa-gears" aria-hidden="true"></i>
                </NavLink>
              )
            }
            key="form-builder"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/form-builder`}>
              Form UI
            </NavLink>
          </Menu.Item>
        ) : (
          ''
        )} */}
          {UserRole['MANAGE TEST'] != undefined ? (
            // {(UserRole['MANAGE TEST'] != undefined && userRole == 'SUPER_ADMIN') || userRole == 'CLIENT' ? (
            <SubMenu key="manage_test" icon={!topMenu && <FeatherIcon icon="airplay" />} title="Manage Tests">
              {/* {userRole == 'CLIENT' || userRole == 'SUPER_ADMIN' ? ( */}
              <>
                {UserRole['QUIZZES'] != undefined ? (
                  <Menu.Item key="quizzes">
                    <NavLink onClick={toggleCollapsed} to={`${path}/engage/quizzes`}>
                      Quizzes
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['EXAM'] != undefined ? (
                  <Menu.Item key="exams">
                    <NavLink onClick={toggleCollapsed} to={`${path}/engage/exams`}>
                      Exams
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['QUIZ TYPES'] != undefined ? (
                  <Menu.Item key="quiz_types">
                    <NavLink onClick={toggleCollapsed} to={`${path}/engage/quiz-type`}>
                      Quiz Types
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['EXAM TYPES'] != undefined ? (
                  <Menu.Item key="exam_types">
                    <NavLink onClick={toggleCollapsed} to={`${path}/engage/exam-type`}>
                      Exam Types
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
              </>
              {/* ) : (
                ''
              )} */}
            </SubMenu>
          ) : (
            ''
          )}
          {UserRole['MANAGE LEARNING'] != undefined ? (
            // {(UserRole['MANAGE LEARNING'] !== undefined && userRole == 'SUPER_ADMIN') || userRole == 'CLIENT' ? (
            <SubMenu key="manage_learning" icon={!topMenu && <FeatherIcon icon="award" />} title="Manage Learning">
              {/* {userRole == 'CLIENT' || userRole == 'SUPER_ADMIN' ? ( */}
              <>
                {UserRole['PRACTICE SETS'] != undefined ? (
                  <Menu.Item key="practicesets">
                    <NavLink onClick={toggleCollapsed} to={`${path}/engage/practice-sets`}>
                      Practice Sets
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['COURSES'] != undefined ? (
                  <Menu.Item key="allcourses">
                    <NavLink onClick={toggleCollapsed} to={`${path}/engage/courses`}>
                      Courses
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['LESSONS BANK'] != undefined ? (
                  <Menu.Item key="lessons">
                    <NavLink onClick={toggleCollapsed} to={`${path}/engage/configure-lessons`}>
                      Lessons
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['VIDEOS'] != undefined ? (
                  <Menu.Item key="videos">
                    <NavLink onClick={toggleCollapsed} to={`${path}/engage/configure-videos`}>
                      Videos
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
              </>
              {/* ) : (
                ''
              )} */}
            </SubMenu>
          ) : (
            ''
          )}
          {UserRole['MANAGE EVENTS'] != undefined ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={`${path}/engage/schedule`}>
                    <FeatherIcon icon="calendar" />
                  </NavLink>
                )
              }
              key="schedule"
            >
              <NavLink onClick={toggleCollapsed} to={`${path}/engage/schedule`}>
                Manage Events
              </NavLink>
            </Menu.Item>
          ) : (
            ''
          )}
          {UserRole['BOARDS'] != undefined ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={`${path}/engage/Board`}>
                    <FeatherIcon icon="layout" />
                  </NavLink>
                )
              }
              key="board"
            >
              <NavLink onClick={toggleCollapsed} to={`${path}/engage/Board`}>
                Boards
              </NavLink>
            </Menu.Item>
          ) : (
            ''
          )}
          {RoleName != 'STUDENT' && RoleName != 'PARENT' ? (
            <div className="keysss">
              <p>LIBRARY</p>
            </div>
          ) : (
            ''
          )}
          {UserRole['QUESTION BANK'] != undefined ? (
            // {(UserRole['QUESTION BANK'] !== undefined && userRole == 'SUPER_ADMIN') || userRole == 'CLIENT' ? (
            <SubMenu key="question_bank" icon={!topMenu && <FeatherIcon icon="help-circle" />} title="Question Bank">
              {/* {userRole == 'CLIENT' || userRole == 'SUPER_ADMIN' ? ( */}
              <>
                {UserRole['QUESTIONS'] != undefined ? (
                  <Menu.Item key="questions">
                    <NavLink onClick={toggleCollapsed} to={`${path}/library/question`}>
                      Questions
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['IMPORTANT QUESTIONS'] != undefined ? (
                  <Menu.Item key="imp_questions">
                    <NavLink onClick={toggleCollapsed} to={`${path}/library/import-questions`}>
                      Import Questions
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['COMPREHENSIONS'] != undefined ? (
                  <Menu.Item key="comprehensions">
                    <NavLink onClick={toggleCollapsed} to={`${path}/library/comprehension`}>
                      Comprehensions
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['QUESTION TYPES'] != undefined ? (
                  <Menu.Item key="questions_type">
                    <NavLink onClick={toggleCollapsed} to={`${path}/library/question-types`}>
                      Question Types
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
              </>
              {/* ) : (
                ''
              )} */}
            </SubMenu>
          ) : (
            ''
          )}
          {UserRole['LESSONS BANK'] != undefined ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={`${path}/library/lessons`}>
                    <FeatherIcon icon="file" />
                  </NavLink>
                )
              }
              key="lesson_bank"
            >
              <NavLink onClick={toggleCollapsed} to={`${path}/library/lessons`}>
                Lessons Bank
              </NavLink>
            </Menu.Item>
          ) : (
            ''
          )}
          {UserRole['VIDEO BANK'] != undefined ? (
            <Menu.Item
              icon={
                !topMenu && (
                  <NavLink className="menuItem-iocn" to={`${path}/library/videos`}>
                    <FeatherIcon icon="play-circle" />
                  </NavLink>
                )
              }
              key="video_bank"
            >
              <NavLink onClick={toggleCollapsed} to={`${path}/library/videos`}>
                Video Bank
              </NavLink>
            </Menu.Item>
          ) : (
            ''
          )}
          {RoleName != 'STUDENT' && RoleName != 'PARENT' ? (
            <div className="keysss">
              <p>CONFIGURATION</p>
            </div>
          ) : (
            ''
          )}
          {UserRole['MONETIZATION'] != undefined ? (
            // {(UserRole['MONETIZATION'] !== undefined && userRole == 'SUPER_ADMIN') || userRole == 'CLIENT' ? (
            <SubMenu key="monetization" icon={!topMenu && <FeatherIcon icon="dollar-sign" />} title="Monetization">
              {/* {userRole == 'CLIENT' || userRole == 'SUPER_ADMIN' ? ( */}
              <>
                {UserRole['PLANS'] !== undefined ? (
                  <Menu.Item key="plans">
                    <NavLink onClick={toggleCollapsed} to={`${path}/configuration/plans`}>
                      Plans
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['SUBSCRIPTIONS'] !== undefined ? (
                  <Menu.Item key="subsriptions">
                    <NavLink onClick={toggleCollapsed} to={`${path}/configuration/subscriptions`}>
                      Subsriptions
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['PAYMENTS'] != undefined ? (
                  <Menu.Item key="payments">
                    <NavLink onClick={toggleCollapsed} to={`${path}/configuration/payments`}>
                      Payments
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
              </>
              {/* ) : (
                ''
              )} */}
            </SubMenu>
          ) : (
            ''
          )}
          {UserRole['MANAGE USERS'] != undefined ? (
            // {(UserRole['MANAGE USERS'] !== undefined && userRole == 'SUPER_ADMIN') || userRole == 'CLIENT' ? (
            <SubMenu key="manage_users" icon={!topMenu && <FeatherIcon icon="users" />} title="Manage Users">
              {/* {userRole == 'CLIENT' || userRole == 'SUPER_ADMIN' ? ( */}
              <>
                {UserRole['USERS'] !== undefined ? (
                  <Menu.Item key="users">
                    <NavLink onClick={toggleCollapsed} to={`${path}/configuration/users`}>
                      Users
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['USER GROUPS'] != undefined ? (
                  <Menu.Item key="user_groups">
                    <NavLink onClick={toggleCollapsed} to={`${path}/configuration/usergroup`}>
                      User Groups
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['ROLES & PERMISSIONS'] != undefined ? (
                  <Menu.Item key="roles">
                    <NavLink onClick={toggleCollapsed} to={`${path}/configuration/roles-permissions`}>
                      Roles & Permissions
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['IMPORT USERS'] != undefined ? (
                  <Menu.Item key="import_users">
                    <NavLink onClick={toggleCollapsed} to={`${path}/configuration/import-users`}>
                      Import Users
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
              </>
              {/* ) : (
                ''
              )} */}
            </SubMenu>
          ) : (
            ''
          )}
          {UserRole['MANAGE CATEGORIES'] != undefined ? (
            // {(UserRole['MANAGE CATEGORIES'] !== undefined && userRole == 'SUPER_ADMIN') || userRole == 'CLIENT' ? (
            <SubMenu key="manage_categories" icon={!topMenu && <FeatherIcon icon="layers" />} title="Manage Categories">
              {/* {userRole == 'CLIENT' || userRole == 'SUPER_ADMIN' ? ( */}
              <>
                {UserRole['CATEGORIES'] !== undefined ? (
                  <Menu.Item key="categories">
                    <NavLink onClick={toggleCollapsed} to={`${path}/configuration/categorieslist`}>
                      Categories
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['SUB CATEGORIES'] != undefined ? (
                  <Menu.Item key="sub_categories">
                    <NavLink onClick={toggleCollapsed} to={`${path}/configuration/sub-category`}>
                      Sub Categories
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['TAGS'] != undefined ? (
                  <Menu.Item key="tags">
                    <NavLink onClick={toggleCollapsed} to={`${path}/configuration/tags`}>
                      Tags
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
              </>
              {/* ) : (
                ''
              )} */}
            </SubMenu>
          ) : (
            ''
          )}
          {UserRole['MANAGE SUBJECTS'] != undefined ? (
            // {(UserRole['MANAGE SUBJECTS'] !== undefined && userRole == 'SUPER_ADMIN') || userRole == 'CLIENT' ? (
            <SubMenu key="manage_subjects" icon={!topMenu && <FeatherIcon icon="book-open" />} title="Manage Subjects">
              {/* {userRole == 'CLIENT' || userRole == 'SUPER_ADMIN' ? ( */}
              <>
                {UserRole['SECTIONS'] != undefined ? (
                  <Menu.Item key="sections">
                    <NavLink onClick={toggleCollapsed} to={`${path}/configuration/sectionlist`}>
                      Sections
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['SKILLS'] != undefined ? (
                  <Menu.Item key="skills">
                    <NavLink onClick={toggleCollapsed} to={`${path}/configuration/skill-list`}>
                      Skills
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['TOPICS'] != undefined ? (
                  <Menu.Item key="topics">
                    <NavLink onClick={toggleCollapsed} to={`${path}/configuration/topiclist`}>
                      Topics
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
              </>
              {/* ) : (
                ''
              )} */}
            </SubMenu>
          ) : (
            ''
          )}
          {UserRole['SETTINGS'] != undefined ? (
            // {(UserRole['SETTINGS'] !== undefined && userRole == 'SUPER_ADMIN') || userRole == 'CLIENT' ? (
            <SubMenu key="settings" icon={!topMenu && <FeatherIcon icon="settings" />} title="Settings">
              {/* {userRole == 'CLIENT' || userRole == 'SUPER_ADMIN' ? ( */}
              <>
                {UserRole['GENERAL SETTINGS'] != undefined ? (
                  <Menu.Item key="g_settings">
                    <NavLink onClick={toggleCollapsed} to={`${path}/configuration/general-settings`}>
                      General Settings
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['LOCALIZATION SETTINGS'] != undefined ? (
                  <Menu.Item key="localization_settings">
                    <NavLink onClick={toggleCollapsed} to={`${path}/configuration/local-settings`}>
                      Localization Settings
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['HOME PAGE SETTINGS'] != undefined ? (
                  <Menu.Item key="hpage_settings">
                    <NavLink onClick={toggleCollapsed} to={`${path}/configuration/home-settings`}>
                      Home Page Settings
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['EMAIL SETTINGS'] != undefined ? (
                  <Menu.Item key="e_settings">
                    <NavLink onClick={toggleCollapsed} to={`${path}/configuration/email-settings`}>
                      Email Settings
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['PAYMENT SETTINGS'] != undefined ? (
                  <Menu.Item key="p_settings">
                    <NavLink onClick={toggleCollapsed} to={`${path}/configuration/payment-settings`}>
                      Payment Settings
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['BILLING & TAX SETTINGS'] != undefined ? (
                  <Menu.Item key="b_t_settings">
                    <NavLink onClick={toggleCollapsed} to={`${path}/configuration/billandtax-settings`}>
                      Billing & Tax Settings
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['THEME SETTINGS'] != undefined ? (
                  <Menu.Item key="t_settings">
                    <NavLink onClick={toggleCollapsed} to={`${path}/configuration/theme-settings`}>
                      Theme Settings
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {UserRole['PAGES'] != undefined ? (
                  <Menu.Item key="t_pages">
                    <NavLink onClick={toggleCollapsed} to={`${path}/configuration/pages`}>
                      Pages
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )}
                {/* {UserRole['MAINTENANCE SETTINGS'] !== undefined ? (
                  <Menu.Item key="m_settings">
                    <NavLink onClick={toggleCollapsed} to={`${path}/configuration/maintenance-settings`}>
                      Maintenance Settings
                    </NavLink>
                  </Menu.Item>
                ) : (
                  ''
                )} */}
              </>
              {/* ) : (
                ''
              )} */}
            </SubMenu>
          ) : (
            ''
          )}
          {/* <Menu.Item
          icon={
            !topMenu && (
              <NavLink className="menuItem-iocn" to={`${path}/social_accounts`}>
                <i class="fa fa-pinterest" style={{ color: '#ff0000' }}></i>
              </NavLink>
            )
          }
          key="social_accounts2"
        >
          <NavLink onClick={toggleCollapsed} to={`${path}/social_accounts`}>
            Pinterest
          </NavLink>
        </Menu.Item> */}
        </>
      ) : (
        ''
      )}
    </Menu>
  );
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
