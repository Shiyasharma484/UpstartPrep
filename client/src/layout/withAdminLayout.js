/* eslint-disable no-shadow */
import React, { useEffect, useState, Component } from 'react';
import { Layout, Button, Row, Col } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { NavLink, Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import MenueItems from './MenueItems';
import { headers } from '../helpers/variables';

import TopMenu from './TopMenu';
import { Div, SmallScreenAuthInfo, SmallScreenSearch, TopMenuSearch } from './style';
import HeaderSearch from '../components/header-search/header-search';
import { get_api_request, post_api_request, put_api_request, api_url } from '../helpers/Common';
import AuthInfo from '../components/utilities/auth-info/info';
import { changeRtlMode, changeLayoutMode, changeMenuMode } from '../redux/themeLayout/actionCreator';
import Cookies from 'js-cookie';
const { decrypt } = require('../helpers/encryption-decryption');
const { darkTheme } = require('../config/theme/themeVariables');

import dashboardLogo from '../../src/static/img/Home/Dashboard-logo.png';

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { Header, Footer, Sider, Content } = Layout;
// const { darkMode } = config;
const enc_user_detail = Cookies.get('UserDetail');
var userDetail = decrypt(enc_user_detail);
//console.log(userDetail);
var currectUserRoleID = userDetail?.sessdata?.user?.[0]?.user_role;
//console.log(currectUserRoleID);

const ThemeLayout = WrappedComponent => {
  class LayoutComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collapsed: false,
        hide: true,
        searchHide: true,
        activeSearch: false,
        setlogo: '',
        isHemburger: false,
      };
      this.updateDimensions = this.updateDimensions.bind(this);
      this.GetConfiguration();
    }

    componentDidMount() {
      window.addEventListener('resize', this.updateDimensions);
      this.updateDimensions();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions);
      this.GetConfiguration();
    }

    updateDimensions() {
      this.setState({
        collapsed: window.innerWidth <= 1200 && true,
      });
    }
    GetConfiguration = async () => {
      const url = api_url.get_all_configurations;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        var logo = response?.data?.responsedata?.configurations[0]?.site_logo_white;
        this.setState({ setlogo: logo });
        //  console.log(setlogo);
        console.log(logo);
        return logo;
      } else {
        console.log('error');
      }
    };

    render() {
      const { collapsed, hide, searchHide, activeSearch, isHemburger } = this.state;
      const { ChangeLayoutMode, rtl, changeRtl, changeLayout, topMenu, changeMenuMode } = this.props;

      const left = !rtl ? 'left' : 'right';
      const darkMode = ChangeLayoutMode;
      const toggleCollapsed = () => {
        this.setState({
          collapsed: !collapsed,
        });
      };

      const toggleCollapsedMobile = () => {
        if (window.innerWidth <= 990) {
          this.setState({
            collapsed: !collapsed,
          });
        }
      };

      const handleClick = event => {
        this.setState({
          isHemburger: !isHemburger,
        });
      };

      const onShowHide = () => {
        this.setState({
          hide: !hide,
          searchHide: true,
        });
      };

      const toggleSearch = () => {
        this.setState({
          activeSearch: !activeSearch,
        });
      };

      const handleSearchHide = e => {
        e.preventDefault();
        this.setState({
          searchHide: !searchHide,
          hide: true,
        });
      };

      const footerStyle = {
        padding: '20px 30px 18px',
        color: 'rgba(0, 0, 0, 0.65)',
        fontSize: '14px',
        background: 'rgba(255, 255, 255, .90)',
        width: '100%',
        boxShadow: '0 -5px 10px rgba(146,153,184, 0.05)',
      };

      const SideBarStyle = {
        margin: '0 0 0 0',
        padding: '50px 15px 25px',
        overflowY: 'auto',
        height: '100vh',
        position: 'fixed',
        [left]: 0,
        zIndex: 998,
      };

      const renderView = ({ style, ...props }) => {
        const customStyle = {
          marginRight: 'auto',
          [rtl ? 'marginLeft' : 'marginRight']: '-17px',
        };
        return <div {...props} style={{ ...style, ...customStyle }} />;
      };

      const renderThumbVertical = ({ style, ...props }) => {
        const { ChangeLayoutMode } = this.props;
        const thumbStyle = {
          borderRadius: 6,
          backgroundColor: ChangeLayoutMode ? '#ffffff16' : '#F1F2F6',
          [left]: '2px',
        };
        return <div style={{ ...style, ...thumbStyle }} props={props} />;
      };

      const renderTrackVertical = () => {
        const thumbStyle = {
          position: 'absolute',
          width: '6px',
          transition: 'opacity 200ms ease 0s',
          opacity: 0,
          [rtl ? 'left' : 'right']: '2px',
          bottom: '2px',
          top: '2px',
          borderRadius: '3px',
        };
        return <div style={thumbStyle} />;
      };

      const renderThumbHorizontal = ({ style, ...props }) => {
        const { ChangeLayoutMode } = this.props;
        const thumbStyle = {
          borderRadius: 6,
          backgroundColor: ChangeLayoutMode ? '#ffffff16' : '#F1F2F6',
        };
        return <div style={{ ...style, ...thumbStyle }} props={props} />;
      };

      const onRtlChange = () => {
        const html = document.querySelector('html');
        html.setAttribute('dir', 'rtl');
        changeRtl(true);
      };

      const onLtrChange = () => {
        const html = document.querySelector('html');
        html.setAttribute('dir', 'ltr');
        changeRtl(false);
      };

      const modeChangeDark = () => {
        changeLayout(true);
      };

      const modeChangeLight = () => {
        changeLayout(false);
      };

      const modeChangeTopNav = () => {
        changeMenuMode(true);
      };

      const modeChangeSideNav = () => {
        changeMenuMode(false);
      };

      const onEventChange = {
        onRtlChange,
        onLtrChange,
        modeChangeDark,
        modeChangeLight,
        modeChangeTopNav,
        modeChangeSideNav,
      };

      return (
        <Div darkMode={darkMode}>
          <Layout className="layout">
            <Header
              style={{
                position: 'fixed',
                width: '100%',
                top: 0,
                [!rtl ? 'left' : 'right']: 0,
              }}
            >
              <Row>
                <Col lg={!topMenu ? 4 : 3} sm={6} xs={12} className="align-center-v navbar-brand">
                  <div className={this.state.isHemburger ? 'SidemenuIconbtn' : 'menuIconbtn'}>
                    <Link
                      className={topMenu && window.innerWidth > 991 ? 'striking-logo top-menu' : 'striking-logo'}
                      to="/dashboard"
                    >
                      <img
                        src={this.state.setlogo}
                        // src={dashboardLogo}
                        // src={
                        //   !darkMode ? require(`../static/img/logoupstrep.png`) : require(`../static/img/logoupstrep.png`)
                        // }
                        style={{ maxWidth: '170px', width: '70px' }}
                        alt=""
                      />
                    </Link>

                    {!topMenu || window.innerWidth <= 991 ? (
                      <Button
                        type="link"
                        onClick={() => {
                          toggleCollapsed();
                          handleClick();
                        }}
                      >
                        {/* <img src={require(`../static/img/icon/${collapsed ? 'right.svg' : 'left.svg'}`)} alt="menu" /> */}
                        <FeatherIcon icon="menu" />
                      </Button>
                    ) : null}
                  </div>
                </Col>

                <Col lg={!topMenu ? 14 : 15} md={8} sm={0} xs={0}>
                  {/* {topMenu && window.innerWidth > 991 ? <TopMenu /> : <HeaderSearch rtl={rtl} darkMode={darkMode} />} */}
                </Col>

                <Col lg={6} md={10} sm={0} xs={0}>
                  {topMenu && window.innerWidth > 991 ? (
                    <TopMenuSearch>
                      <div className="top-right-wrap d-flex">
                        <Link
                          className={`${activeSearch ? 'search-toggle active' : 'search-toggle'}`}
                          onClick={() => {
                            toggleSearch();
                          }}
                          to="#"
                        >
                          <FeatherIcon icon="search" />
                          <FeatherIcon icon="x" />
                        </Link>
                        <div className={`${activeSearch ? 'topMenu-search-form show' : 'topMenu-search-form'}`}>
                          <form action="">
                            <span className="search-icon">
                              <FeatherIcon icon="search" />
                            </span>
                            <input type="text" name="search" />
                          </form>
                        </div>
                        <AuthInfo />
                      </div>
                    </TopMenuSearch>
                  ) : (
                    <AuthInfo />
                  )}
                </Col>

                <Col md={0} sm={18} xs={12}>
                  <>
                    <div className="mobile-action">
                      <Link className="btn-search" onClick={handleSearchHide} to="#">
                        {searchHide ? <FeatherIcon icon="search" /> : <FeatherIcon icon="x" />}
                      </Link>
                      <Link className="btn-auth" onClick={onShowHide} to="#">
                        <FeatherIcon icon="more-vertical" />
                      </Link>
                    </div>
                  </>
                </Col>
              </Row>
            </Header>
            <div className="header-more">
              <Row>
                <Col md={0} sm={24} xs={24}>
                  <div className="small-screen-headerRight">
                    <SmallScreenSearch hide={searchHide} darkMode={darkMode}>
                      <HeaderSearch rtl={rtl} />
                    </SmallScreenSearch>
                    <SmallScreenAuthInfo hide={hide} darkMode={darkMode}>
                      <AuthInfo rtl={rtl} />
                    </SmallScreenAuthInfo>
                  </div>
                </Col>
              </Row>
            </div>
            {console.log(currectUserRoleID, 'currectUserRoleID')}
            <Layout>
              {!topMenu || window.innerWidth <= 991 ? (
                <ThemeProvider theme={darkTheme}>
                  <Sider
                    className={currectUserRoleID == 'student' ? 'studentSidebar' : ''}
                    // className="studentSidebar"
                    width={280}
                    style={SideBarStyle}
                    collapsed={collapsed}
                    theme={!darkMode ? 'light' : 'dark'}
                  >
                    <Scrollbars
                      className="custom-scrollbar"
                      autoHide
                      autoHideTimeout={500}
                      autoHideDuration={200}
                      renderThumbHorizontal={renderThumbHorizontal}
                      renderThumbVertical={renderThumbVertical}
                      renderView={renderView}
                      renderTrackVertical={renderTrackVertical}
                    >
                      <p className="sidebar-nav-title"></p>
                      <MenueItems
                        topMenu={topMenu}
                        rtl={rtl}
                        toggleCollapsed={toggleCollapsedMobile}
                        darkMode={darkMode}
                        events={onEventChange}
                      />
                    </Scrollbars>
                  </Sider>
                </ThemeProvider>
              ) : null}
              <Layout className="atbd-main-layout">
                <Content>
                  <WrappedComponent {...this.props} />
                  <Footer className="admin-footer" style={footerStyle}>
                    <Row>
                      <Col md={12} xs={24}>
                        <span className="admin-footer__copyright">2023 © AjivaInfotech Pvt Ltd</span>
                      </Col>
                      <Col md={12} xs={24}>
                        <div className="admin-footer__links">
                          {/* <NavLink to="#">About</NavLink>
                          <NavLink to="#">Team</NavLink>
                          <NavLink to="#">Contact</NavLink> */}
                        </div>
                      </Col>
                    </Row>
                  </Footer>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </Div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      ChangeLayoutMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
    };
  };

  const mapStateToDispatch = dispatch => {
    return {
      changeRtl: rtl => dispatch(changeRtlMode(rtl)),
      changeLayout: show => dispatch(changeLayoutMode(show)),
      changeMenuMode: show => dispatch(changeMenuMode(show)),
    };
  };

  LayoutComponent.propTypes = {
    ChangeLayoutMode: propTypes.bool,
    rtl: propTypes.bool,
    topMenu: propTypes.bool,
    changeRtl: propTypes.func,
    changeLayout: propTypes.func,
    changeMenuMode: propTypes.func,
  };

  return connect(mapStateToProps, mapStateToDispatch)(LayoutComponent);
};
export default ThemeLayout;
