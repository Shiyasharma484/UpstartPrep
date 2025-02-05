import React, { useEffect, useState } from 'react';
import { Row, Col, Form, notification, Input, Button, Select, Switch, Spin } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { AddUser } from './style';
import Cookies from 'js-cookie';
import { Main } from '../styled';
import 'moment/locale/zh-cn';
import { Cards } from '../../components/cards/frame/cards-frame';
import { get_api_request, post_api_request, put_api_request, api_url } from '../../helpers/Common';
import { headers } from '../../helpers/variables';
import TextArea from 'antd/lib/input/TextArea';
// import { encrypttheid } from '../../helpers/encode-decode';
import StaticImage from './../../static/img/video-lessons.png';
import StaticImageIcon1 from './../../static/img/video-lessons.png';
import StaticImageIcon2 from './../../static/img/video-lessons.png';
import StaticImageIcon3 from './../../static/img/video-lessons.png';
import StaticImageIcon4 from './../../static/img/video-lessons.png';
import imageUploadSave from '../../helpers/uploadImage';
import FormItem from 'antd/lib/form/FormItem';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const url = domainpath + '/images/logo';
const { imageRender } = require('../../helpers/renderImage');
const { decrypt } = require('../../helpers/encryption-decryption');

const HomePageSetting = () => {
  const [form] = Form.useForm();
  const [loading, setloading] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [Images, setImages] = useState([]);
  const [HeroimageURL, setHeroImageURL] = useState(null);
  const [loginLogoimageURL, setloginLogoImageURL] = useState(null);
  const [HeroImages, setHeroImages] = useState([]);
  const [loginLogoImages, setloginLogoImages] = useState([]);
  const [IconImages, setIconImages] = useState([]);
  const [IconImageURL, setIconImageURL] = useState(null);
  const [IconImages2, setIconImages2] = useState([]);
  const [IconImageURL2, setIconImageURL2] = useState(null);
  const [IconImages3, setIconImages3] = useState([]);
  const [IconImageURL3, setIconImageURL3] = useState(null);
  const [IconImages4, setIconImages4] = useState([]);
  const [IconImageURL4, setIconImageURL4] = useState(null);
  const [IconImages5, setIconImages5] = useState([]);
  const [IconImageURL5, setIconImageURL5] = useState(null);
  const [IconImages6, setIconImages6] = useState([]);
  const [IconImageURL6, setIconImageURL6] = useState(null);
  const [FeatureIcon1Images, setFeatureIcon1Images] = useState([]);
  const [FeatureIcon1URL, setFeatureIcon1URL] = useState(null);
  const [FeatureIcon2Images, setFeatureIcon2Images] = useState([]);
  const [FeatureIcon2URL, setFeatureIcon2URL] = useState(null);
  const [FeatureIcon3Images, setFeatureIcon3Images] = useState([]);
  const [FeatureIcon3URL, setFeatureIcon3URL] = useState(null);

  const [Feature2Icon1Images, setFeature2Icon1Images] = useState([]);
  const [Feature2Icon1URL, setFeature2Icon1URL] = useState(null);
  const [Feature2Icon2Images, setFeature2Icon2Images] = useState([]);
  const [Feature2Icon2URL, setFeature2Icon2URL] = useState(null);
  const [Feature2Icon3Images, setFeature2Icon3Images] = useState([]);
  const [Feature2Icon3URL, setFeature2Icon3URL] = useState(null);

  const [Feature3Icon1Images, setFeature3Icon1Images] = useState([]);
  const [Feature3Icon1URL, setFeature3Icon1URL] = useState(null);
  const [Feature3Icon2Images, setFeature3Icon2Images] = useState([]);
  const [Feature3Icon2URL, setFeature3Icon2URL] = useState(null);
  const [Feature3Icon3Images, setFeature3Icon3Images] = useState([]);
  const [Feature3Icon3URL, setFeature3Icon3URL] = useState(null);

  const [TestMonials1, setTestMonials1] = useState([]);
  const [TestmonialImageURL1, setTestmonialImageURL1] = useState(null);
  const [TestMonials2, setTestMonials2] = useState([]);
  const [TestmonialImageURL2, setTestmonialImageURL2] = useState(null);
  const [formData, setformData] = useState({
    active1: '',
    feature_tagline: '',
    meta_title: '',
    meta_subtitle: '',
    meta_keyword: '',
    active2: '',
    active3: '',
    active4: '',
    active5: '',
    active6: '',
    active7: '',
    message: '',
    github: '',
    linkedin: '',
    instagram: '',
    youtube: '',
    twitter: '',
    facebook: '',
    button_text: '',
    button_link: '',
    title_login: '',
    sub_title_login: '',
    title: '',
    sub_title: '',
    cta_text: '',
    cta_text2: '',
    cta_description: '',
    cta_link: '',
    image: '',
    title_1: '',
    subtitle_1: '',
    caption_1: '',
    description: '',
    icon_url: '',
    caption_2: '',
    description_2: '',
    icon_url_2: '',
    caption_3: '',
    description_3: '',
    icon_url_3: '',
    caption_4: '',
    description_4: '',
    icon_url_4: '',
    caption_5: '',
    description_5: '',
    icon_url_5: '',
    caption_6: '',
    description_6: '',
    icon_url_6: '',
    title_category: '',
    subtitle_category: '',
    item_limit: '',
    title_statistics: '',
    subtitle_statistics: '',
    statistic1_name: '',
    statistic1_count: '',
    statistic2_name: '',
    statistic2_count: '',
    statistic3_name: '',
    statistic4_name: '',
    statistic3_count: '',
    statistic4_count: '',
    testimonial_title: '',
    testimonial_subtitle: '',
    testimonial1_name: '',
    testimonial1_designation: '',
    testimonial1_message: '',
    testimonial1_image: '',
    testimonial2_name: '',
    testimonial2_designation: '',
    testimonial2_message: '',
    testimonial2_image: '',
    cta_title: '',
    cta_subtitle: '',
    cta_button_text: '',
    cta_button_link: '',
    copyright: '',
    enable_footer: '',
    enable_social_link: '',
    footerlink_text1: '',
    footerlink_link1: '',
    footerlink_text2: '',
    footerlink_link2: '',
    footerlink_text3: '',
    footerlink_link3: '',
    footerlink_text4: '',
    footerlink_link4: '',
    footerlink_text5: '',
    footerlink_link5: '',
    footerlink_text6: '',
    footerlink_link6: '',
    githubLink: '',
    linkedinLink: '',
    instagramLink: '',
    youTubeLink: '',
    twitterLink: '',
    facebookLink: '',
    typing_animationtext: '',
    typing_animationtext2: '',
    typing_animationtext3: '',
    welcome_text_2: '',
    welcome_text_1: '',
    title_line2: '',
    our_program_title: '',
    our_program_subtitle: '',
    program1_title: '',
    program1_subtitle: '',
    program1_feture_text1: '',
    program1_feture_text2: '',
    program1_feture_text3: '',
    program1_feture_icon1: '',
    program1_feture_icon2: '',
    program1_feture_icon3: '',
    program2_title: '',
    program2_subtitle: '',
    program2_feture_text1: '',
    program2_feture_text2: '',
    program2_feture_text3: '',
    program2_feture_icon1: '',
    program2_feture_icon2: '',
    program2_feture_icon3: '',
    program3_title: '',
    program3_subtitle: '',
    program3_feture_text1: '',
    program3_feture_text2: '',
    program3_feture_text3: '',
    program3_feture_icon1: '',
    program3_feture_icon2: '',
    program3_feture_icon3: '',
    subtitle_instrcutor: '',
    title_main_instructor: '',
    title_instructor: '',
  });

  useEffect(() => {
    setloading(true);
    async function getconfig() {
      const url = api_url.get_config;
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const configdata = response?.data?.responsedata?.configurations?.[0];
        console.log(configdata);
        console.log(configdata?.footerlink_link1);
        console.log(configdata?.active1);
        //setImages(require('../../static/img' + configdata?.image));
        // const gg = {('../../static/img' + configdata?.image)};
        setImages(configdata?.image);
        setloginLogoImages(configdata?.login_logo);
        setIconImages(configdata?.icon_url);
        setIconImages2(configdata?.icon_url_2);
        setIconImages3(configdata?.icon_url_3);
        setIconImages4(configdata?.icon_url_4);
        setIconImages5(configdata?.icon_url_5);
        setIconImages6(configdata?.icon_url_6);
        setTestMonials1(configdata?.testimonial1_image);
        setTestMonials2(configdata?.testimonial2_image);
        setHeroImages(configdata?.hero_image);
        setFeatureIcon1Images(configdata?.program1_feture_icon1);
        setFeatureIcon2Images(configdata?.program1_feture_icon2);
        setFeatureIcon3Images(configdata?.program1_feture_icon3);
        setFeature2Icon1Images(configdata?.program2_feture_icon1);
        setFeature2Icon2Images(configdata?.program2_feture_icon2);
        setFeature2Icon3Images(configdata?.program2_feture_icon3);
        setFeature3Icon1Images(configdata?.program3_feture_icon1);
        setFeature3Icon2Images(configdata?.program3_feture_icon2);
        setFeature3Icon3Images(configdata?.program3_feture_icon3);
        form.setFieldsValue({
          button_link: configdata?.button_link,
          button_text: configdata?.button_text,
          caption_1: configdata?.caption_1,
          caption_2: configdata?.caption_2,
          caption_3: configdata?.caption_3,
          caption_4: configdata?.caption_4,
          config_key: configdata?.config_key,
          config_value: configdata?.config_value,
          copyright: configdata?.copyright,
          enable_social_link: configdata?.enable_social_link,
          cta_button_link: configdata?.cta_button_link,
          cta_button_text: configdata?.cta_button_text,
          cta_link: configdata?.cta_link,
          cta_subtitle: configdata?.cta_subtitle,
          cta_text: configdata?.cta_text,
          cta_text2: configdata?.cta_text2,
          cta_description: configdata?.cta_description,
          image: configdata?.image,
          title_login: configdata?.title_login,
          sub_title_login: configdata?.sub_title_login,
          cta_title: configdata?.cta_title,
          description: configdata?.description,
          description_2: configdata?.description_2,
          description_3: configdata?.description_3,
          description_4: configdata?.description_4,
          description_4: configdata?.description_4,
          enable_footer: configdata?.enable_footer,
          footerlink_link1: configdata?.footerlink_link1,
          footerlink_link2: configdata?.footerlink_link2,
          footerlink_link3: configdata?.footerlink_link3,
          footerlink_link4: configdata?.footerlink_link4,
          footerlink_link5: configdata?.footerlink_link5,
          footerlink_link6: configdata?.footerlink_link6,
          footerlink_text1: configdata?.footerlink_text1,
          footerlink_text2: configdata?.footerlink_text2,
          footerlink_text3: configdata?.footerlink_text3,
          footerlink_text4: configdata?.footerlink_text4,
          footerlink_text5: configdata?.footerlink_text5,
          footerlink_text6: configdata?.footerlink_text6,
          icon_url: configdata?.icon_url,
          icon_url_2: configdata?.icon_url_2,
          icon_url_3: configdata?.icon_url_3,
          icon_url_4: configdata?.icon_url_4,
          item_limit: configdata?.item_limit,
          localization_default_direction: configdata?.localization_default_direction,
          localization_default_timezone: configdata?.localization_default_timezone,
          localization_locale: configdata?.localization_locale,
          message: configdata?.message,
          schedule_interval: configdata?.schedule_interval,
          site_description: configdata?.site_description,
          site_favicon: configdata?.site_favicon,
          site_logo: configdata?.site_logo,
          site_logo_white: configdata?.site_logo_white,
          site_name: configdata?.site_name,
          site_tagline: configdata?.site_tagline,
          statistic1_count: configdata?.statistic1_count,
          statistic1_name: configdata?.statistic1_name,
          statistic2_name: configdata?.statistic2_name,
          statistic3_count: configdata?.statistic3_count,
          statistic3_name: configdata?.statistic3_name,
          statistic4_count: configdata?.statistic4_count,
          statistic4_name: configdata?.statistic4_name,
          sub_title: configdata?.sub_title,
          statistic2_count: configdata?.statistic2_count,
          subtitle_1: configdata?.subtitle_1,
          subtitle_category: configdata?.subtitle_category,
          testimonial1_designation: configdata?.testimonial1_designation,
          subtitle_statistics: configdata?.subtitle_statistics,
          testimonial1_image: configdata?.testimonial1_image,
          testimonial1_message: configdata?.testimonial1_message,
          testimonial1_name: configdata?.testimonial1_name,
          testimonial2_designation: configdata?.testimonial2_designation,
          testimonial2_image: configdata?.testimonial2_image,
          testimonial2_message: configdata?.testimonial2_message,
          testimonial2_name: configdata?.testimonial2_name,
          testimonial_subtitle: configdata?.testimonial_subtitle,
          testimonial_title: configdata?.testimonial_title,
          title: configdata?.title,
          title_1: configdata?.title_1,
          title_category: configdata?.title_category,
          title_statistics: configdata?.title_statistics,
          githubLink: configdata?.githubLink,
          linkedinLink: configdata?.linkedinLink,
          instagramLink: configdata?.instagramLink,
          youTubeLink: configdata?.youTubeLink,
          twitterLink: configdata?.twitterLink,
          facebookLink: configdata?.facebookLink,
          github: configdata?.github,
          linkedin: configdata?.linkedin,
          instagram: configdata?.instagram,
          youtube: configdata?.youtube,
          twitter: configdata?.twitter,
          facebook: configdata?.facebook,
          description_5: configdata?.description_5,
          description_6: configdata?.description_6,
          caption_5: configdata?.caption_5,
          caption_6: configdata?.caption_6,
          typing_animationtext: configdata?.typing_animationtext,
          typing_animationtext2: configdata?.typing_animationtext2,
          typing_animationtext3: configdata?.typing_animationtext3,
          welcome_text_1: configdata?.welcome_text_1,
          welcome_text_2: configdata?.welcome_text_2,
          title_line2: configdata?.title_line2,
          title_line3: configdata?.title_line3,
          feature_tagline: configdata?.feature_tagline,
          meta_title: configdata?.meta_title,
          meta_subtitle: configdata?.meta_subtitle,
          meta_keyword: configdata?.meta_keyword,
          our_program_title: configdata?.our_program_title,
          our_program_subtitle: configdata?.our_program_subtitle,
          program1_title: configdata?.program1_title,
          program1_subtitle: configdata?.program1_subtitle,
          program1_feture_text1: configdata?.program1_feture_text1,
          program1_feture_text2: configdata?.program1_feture_text2,
          program1_feture_text3: configdata?.program1_feture_text3,
          program2_title: configdata?.program2_title,
          program2_subtitle: configdata?.program2_subtitle,
          program2_feture_text1: configdata?.program2_feture_text1,
          program2_feture_text2: configdata?.program2_feture_text2,
          program2_feture_text3: configdata?.program2_feture_text3,
          program3_title: configdata?.program3_title,
          program3_subtitle: configdata?.program3_subtitle,
          program3_feture_text1: configdata?.program3_feture_text1,
          program3_feture_text2: configdata?.program3_feture_text2,
          program3_feture_text3: configdata?.program3_feture_text3,
          subtitle_instrcutor: configdata?.subtitle_instrcutor,
          title_main_instructor: configdata?.title_main_instructor,
          title_instructor: configdata?.title_instructor,
        });
        setformData({
          active1: configdata?.active1 == 1 ? true : false,
          active2: configdata?.active2 == 1 ? true : false,
          active3: configdata?.active3 == 1 ? true : false,
          active4: configdata?.active4 == 1 ? true : false,
          active5: configdata?.active5 == 1 ? true : false,
          active6: configdata?.active6 == 1 ? true : false,
          active7: configdata?.active7 == 1 ? true : false,
          github: configdata?.github == 1 ? true : false,
          linkedin: configdata?.linkedin == 1 ? true : false,
          instagram: configdata?.instagram == 1 ? true : false,
          youtube: configdata?.youtube == 1 ? true : false,
          twitter: configdata?.twitter == 1 ? true : false,
          facebook: configdata?.facebook == 1 ? true : false,
          enable_footer: configdata?.enable_footer == 1 ? true : false,
          enable_social_link: configdata?.enable_social_link == 1 ? true : false,
          button_link: configdata?.button_link,
          button_text: configdata?.button_text,
          caption_1: configdata?.caption_1,
          caption_2: configdata?.caption_2,
          caption_3: configdata?.caption_3,
          image: configdata?.image,
          caption_4: configdata?.caption_4,
          caption_5: configdata?.caption_5,
          caption_6: configdata?.caption_6,
          config_key: configdata?.config_key,
          config_value: configdata?.config_value,
          copyright: configdata?.copyright,
          cta_button_link: configdata?.cta_button_link,
          cta_button_text: configdata?.cta_button_text,
          cta_link: configdata?.cta_link,
          cta_subtitle: configdata?.cta_subtitle,
          cta_text: configdata?.cta_text,
          cta_text2: configdata?.cta_text2,
          cta_description: configdata?.cta_description,
          cta_title: configdata?.cta_title,
          description: configdata?.description,
          description_2: configdata?.description_2,
          description_3: configdata?.description_3,
          description_4: configdata?.description_4,
          description_5: configdata?.description_5,
          description_6: configdata?.description_6,
          footerlink_link1: configdata?.footerlink_link1,
          footerlink_link2: configdata?.footerlink_link2,
          footerlink_link3: configdata?.footerlink_link3,
          footerlink_link4: configdata?.footerlink_link4,
          footerlink_link5: configdata?.footerlink_link5,
          footerlink_link6: configdata?.footerlink_link6,
          footerlink_text1: configdata?.footerlink_text1,
          footerlink_text2: configdata?.footerlink_text2,
          footerlink_text3: configdata?.footerlink_text3,
          footerlink_text4: configdata?.footerlink_text4,
          footerlink_text5: configdata?.footerlink_text5,
          footerlink_text6: configdata?.footerlink_text6,
          icon_url: IconImageURL,
          icon_url_2: IconImageURL2,
          statistic2_count: formData?.statistic2_count,
          icon_url_3: IconImageURL3,
          icon_url_4: IconImageURL4,
          item_limit: configdata?.item_limit,
          localization_default_direction: configdata?.localization_default_direction,
          localization_default_timezone: configdata?.localization_default_timezone,
          localization_locale: configdata?.localization_locale,
          message: configdata?.message,
          schedule_interval: configdata?.schedule_interval,
          site_description: configdata?.site_description,
          site_favicon: configdata?.site_favicon,
          site_logo: configdata?.site_logo,
          site_logo_white: configdata?.site_logo_white,
          site_name: configdata?.site_name,
          site_tagline: configdata?.site_tagline,
          statistic1_count: configdata?.statistic1_count,
          statistic1_name: configdata?.statistic1_name,
          statistic2_name: configdata?.statistic2_name,
          statistic3_count: configdata?.statistic3_count,
          statistic3_name: configdata?.statistic3_name,
          sub_title: configdata?.sub_title,
          subtitle_1: configdata?.subtitle_1,
          subtitle_category: configdata?.subtitle_category,
          testimonial1_designation: configdata?.testimonial1_designation,
          subtitle_statistics: configdata?.subtitle_statistics,
          testimonial1_image: configdata?.testimonial1_image,
          testimonial1_message: configdata?.testimonial1_message,
          testimonial1_name: configdata?.testimonial1_name,
          testimonial2_designation: configdata?.testimonial2_designation,
          testimonial2_image: configdata?.testimonial2_image,
          testimonial2_message: configdata?.testimonial2_message,
          testimonial2_name: configdata?.testimonial2_name,
          testimonial_subtitle: configdata?.testimonial_subtitle,
          testimonial_title: configdata?.testimonial_title,
          title: configdata?.title,
          title_1: configdata?.title_1,
          title_category: configdata?.title_category,
          title_statistics: configdata?.title_statistics,
          githubLink: configdata?.githubLink,
          linkedinLink: configdata?.linkedinLink,
          instagramLink: configdata?.instagramLink,
          youTubeLink: configdata?.youTubeLink,
          twitterLink: configdata?.twitterLink,
          facebookLink: configdata?.facebookLink,
          statistic4_count: configdata?.statistic4_count,
          statistic4_name: configdata?.statistic4_name,
          typing_animationtext: configdata?.typing_animationtext,
          typing_animationtext2: configdata?.typing_animationtext2,
          typing_animationtext3: configdata?.typing_animationtext3,
          title_login: configdata?.title_login,
          sub_title_login: configdata?.sub_title_login,
          welcome_text_1: configdata?.welcome_text_1,
          welcome_text_2: configdata?.welcome_text_2,
          title_line2: configdata?.title_line2,
          title_line3: configdata?.title_line3,
          feature_tagline: configdata?.feature_tagline,
          meta_title: configdata?.meta_title,
          meta_subtitle: configdata?.meta_subtitle,
          meta_keyword: configdata?.meta_keyword,
          our_program_title: configdata?.our_program_title,
          our_program_subtitle: configdata?.our_program_subtitle,
          program1_title: configdata?.program1_title,
          program1_subtitle: configdata?.program1_subtitle,
          program1_feture_text1: configdata?.program1_feture_text1,
          program1_feture_text2: configdata?.program1_feture_text2,
          program1_feture_text3: configdata?.program1_feture_text3,
          program2_title: configdata?.program2_title,
          program2_subtitle: configdata?.program2_subtitle,
          program2_feture_text1: configdata?.program2_feture_text1,
          program2_feture_text2: configdata?.program2_feture_text2,
          program2_feture_text3: configdata?.program2_feture_text3,
          program3_title: configdata?.program3_title,
          program3_subtitle: configdata?.program3_subtitle,
          program3_feture_text1: configdata?.program3_feture_text1,
          program3_feture_text2: configdata?.program3_feture_text2,
          program3_feture_text3: configdata?.program3_feture_text3,
          subtitle_instrcutor: configdata?.subtitle_instrcutor,
          title_main_instructor: configdata?.title_main_instructor,
          title_instructor: configdata?.title_instructor,
        });
        setTimeout(() => {
          setloading(false);
        }, 200);
      }
    }
    getconfig();
  }, []);
  const imageHandleChange = async e => {
    e.preventDefault();
    // var vfile;
    var vfile = e.target.files;
    var singleimage = imageRender(vfile);

    // setImages(singleimage);
    console.log(singleimage);
    console.log(vfile);
    await imageUploadSave(vfile, url)
      .then(resp => {
        console.log(resp);
        console.log(url);
        // console.log('../../static/img' + resp);
        // var gg = require('../../static/img' + resp);
        setImages(resp);
        // setImageURL(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
    // e.preventDefault();
  };
  const imageHandleChange2 = async e => {
    console.log(e);
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);

    setIconImages(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        console.log(resp);
        setIconImageURL(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };
  const imageHandleChange3 = async e => {
    console.log(e);
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);

    setIconImages2(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        console.log(resp);
        setIconImageURL2(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };
  const imageHandleChange4 = async e => {
    console.log(e);
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);

    setIconImages3(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        console.log(resp);
        setIconImageURL3(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };
  const imageHandleChange5 = async e => {
    console.log(e);
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);

    setIconImages4(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        console.log(resp);
        setIconImageURL4(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };
  const imageHandleChange6 = async e => {
    console.log(e);
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);

    setIconImages5(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        console.log(resp);
        setIconImageURL5(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };
  const imageHandleChange7 = async e => {
    console.log(e);
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);

    setIconImages6(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        console.log(resp);
        setIconImageURL6(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };
  const imageHandleChange8 = async e => {
    console.log(e);
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);
    setTestMonials1(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        console.log(resp);
        setTestmonialImageURL1(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };
  const imageHandleChange9 = async e => {
    console.log(e);
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);

    setTestMonials2(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        console.log(resp);
        setTestmonialImageURL2(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };
  const imageHandleChange10 = async e => {
    console.log(e);
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);

    setHeroImages(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        console.log(resp);
        setHeroImageURL(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };
  const imageHandleChange11 = async e => {
    console.log(e);
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);

    setloginLogoImages(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        console.log(resp);
        //setloginLogoImages('../../static/img' + resp);
        setloginLogoImageURL(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };
  const imageHandleChange12 = async e => {
    console.log(e);
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);

    setFeatureIcon1Images(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        console.log(resp);
        setFeatureIcon1URL(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };
  const imageHandleChange13 = async e => {
    console.log(e);
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);

    setFeatureIcon2Images(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        console.log(resp);
        setFeatureIcon2URL(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };
  const imageHandleChange14 = async e => {
    console.log(e);
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);

    setFeatureIcon3Images(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        console.log(resp);
        setFeatureIcon3URL(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };

  const imageHandleChange15 = async e => {
    console.log(e);
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);

    setFeature2Icon1Images(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        console.log(resp);
        setFeature2Icon1URL(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };
  const imageHandleChange16 = async e => {
    console.log(e);
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);

    setFeature2Icon2Images(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        console.log(resp);
        setFeature2Icon2URL(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };
  const imageHandleChange17 = async e => {
    console.log(e);
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);

    setFeature2Icon3Images(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        console.log(resp);
        setFeature2Icon3URL(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };
  const imageHandleChange18 = async e => {
    console.log(e);
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);

    setFeature3Icon1Images(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        console.log(resp);
        setFeature3Icon1URL(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };
  const imageHandleChange19 = async e => {
    console.log(e);
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);

    setFeature3Icon2Images(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        console.log(resp);
        setFeature3Icon2URL(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };
  const imageHandleChange20 = async e => {
    console.log(e);
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);

    setFeature3Icon3Images(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        console.log(resp);
        setFeature3Icon3URL(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };
  const AddSettings = fieldsvalue => {
    var EditSettings = {
      active1: formData?.active1 == true ? '1' : '0',
      active2: formData?.active2 == true ? '1' : '0',
      active3: formData?.active3 == true ? '1' : '0',
      active4: formData?.active4 == true ? '1' : '0',
      active5: formData?.active5 == true ? '1' : '0',
      active6: formData?.active6 == true ? '1' : '0',
      active7: formData?.active7 == true ? '1' : '0',
      github: formData?.github == true ? '1' : '0',
      linkedin: formData?.linkedin == true ? '1' : '0',
      instagram: formData?.instagram == true ? '1' : '0',
      youtube: formData?.youtube == true ? '1' : '0',
      twitter: formData?.twitter == true ? '1' : '0',
      facebook: formData?.facebook == true ? '1' : '0',
      enable_footer: formData?.enable_footer == true ? '1' : '0',
      enable_social_link: formData?.enable_social_link == true ? '1' : '0',
      message: formData?.message,
      button_text: formData?.button_text,
      button_link: formData?.button_link,
      title: formData?.title,
      sub_title: formData?.sub_title,
      cta_text: formData?.cta_text,
      cta_text2: formData?.cta_text2,
      cta_description: formData?.cta_description,
      cta_link: formData?.cta_link,
      image: Images,
      title_1: formData?.title_1,
      subtitle_1: formData?.subtitle_1,
      caption_1: formData?.caption_1,
      description: formData?.description,
      icon_url: IconImageURL,
      caption_2: formData?.caption_2,
      description_2: formData?.description_2,
      caption_2: formData?.caption_2,
      description_2: formData?.description_2,
      caption_5: formData?.caption_5,
      description_5: formData?.description_5,
      caption_6: formData?.caption_6,
      description_6: formData?.description_6,
      icon_url_2: IconImageURL2,
      caption_3: formData?.caption_3,
      description_3: formData?.description_3,
      icon_url_3: IconImageURL3,
      icon_url_4: IconImageURL4,
      icon_url_5: IconImageURL5,
      icon_url_6: IconImageURL6,
      caption_4: formData?.caption_4,
      description_4: formData?.description_4,
      //icon_url_4: formData?.icon_url_4,
      title_category: formData?.title_category,
      subtitle_category: formData?.subtitle_category,
      item_limit: formData?.item_limit,
      title_statistics: formData?.title_statistics,
      subtitle_statistics: formData?.subtitle_statistics,
      statistic1_name: formData?.statistic1_name,
      statistic1_count: formData?.statistic1_count,
      statistic2_name: formData?.statistic2_name,
      statistic2_count: formData?.statistic2_count,
      statistic3_name: formData?.statistic3_name,
      statistic3_count: formData?.statistic3_count,
      statistic4_name: formData?.statistic4_name,
      statistic4_count: formData?.statistic4_count,
      testimonial_title: formData?.testimonial_title,
      testimonial_subtitle: formData?.testimonial_subtitle,
      testimonial1_name: formData?.testimonial1_name,
      testimonial1_designation: formData?.testimonial1_designation,
      testimonial1_message: formData?.testimonial1_message,
      testimonial1_image: TestmonialImageURL1,
      testimonial2_name: formData?.testimonial2_name,
      testimonial2_designation: formData?.testimonial2_designation,
      testimonial2_message: formData?.testimonial2_message,
      testimonial2_image: TestmonialImageURL2,
      cta_title: formData?.cta_title,
      cta_subtitle: formData?.cta_subtitle,
      cta_button_text: formData?.cta_button_text,
      cta_button_link: formData?.cta_button_link,
      copyright: formData?.copyright,
      footerlink_text1: formData?.footerlink_text1,
      footerlink_link1: formData?.footerlink_link1,
      footerlink_text2: formData?.footerlink_text2,
      footerlink_link2: formData?.footerlink_link2,
      footerlink_text3: formData?.footerlink_text3,
      footerlink_link3: formData?.footerlink_link3,
      footerlink_text4: formData?.footerlink_text4,
      footerlink_link4: formData?.footerlink_link4,
      footerlink_text5: formData?.footerlink_text5,
      footerlink_link5: formData?.footerlink_link5,
      footerlink_text6: formData?.footerlink_text6,
      footerlink_link6: formData?.footerlink_link6,
      githubLink: formData?.githubLink,
      linkedinLink: formData?.linkedinLink,
      instagramLink: formData?.instagramLink,
      youTubeLink: formData?.youTubeLink,
      twitterLink: formData?.twitterLink,
      facebookLink: formData?.facebookLink,
      typing_animationtext: formData?.typing_animationtext,
      typing_animationtext2: formData?.typing_animationtext2,
      typing_animationtext3: formData?.typing_animationtext3,
      sub_title_login: formData?.sub_title_login,
      title_login: formData?.title_login,
      welcome_text_2: formData?.welcome_text_2,
      welcome_text_1: formData?.welcome_text_1,
      hero_image: HeroimageURL,
      login_logo: loginLogoimageURL,
      title_line2: formData?.title_line2,
      title_line3: formData?.title_line3,
      feature_tagline: formData?.feature_tagline,
      meta_title: formData?.meta_title,
      meta_subtitle: formData?.meta_subtitle,
      meta_keyword: formData?.meta_keyword,
      our_program_title: formData?.our_program_title,
      our_program_subtitle: formData?.our_program_subtitle,
      program1_title: formData?.program1_title,
      program1_subtitle: formData?.program1_subtitle,
      program1_feture_text1: formData?.program1_feture_text1,
      program1_feture_text2: formData?.program1_feture_text2,
      program1_feture_text3: formData?.program1_feture_text3,
      program2_title: formData?.program2_title,
      program2_subtitle: formData?.program2_subtitle,
      program2_feture_text1: formData?.program2_feture_text1,
      program2_feture_text2: formData?.program2_feture_text2,
      program2_feture_text3: formData?.program2_feture_text3,
      program3_title: formData?.program3_title,
      program3_subtitle: formData?.program3_subtitle,
      program3_feture_text1: formData?.program3_feture_text1,
      program3_feture_text2: formData?.program3_feture_text2,
      program3_feture_text3: formData?.program3_feture_text3,
      program1_feture_icon1: FeatureIcon1URL,
      program1_feture_icon2: FeatureIcon2URL,
      program1_feture_icon3: FeatureIcon3URL,
      program2_feture_icon1: Feature2Icon1URL,
      program2_feture_icon2: Feature2Icon2URL,
      program2_feture_icon3: Feature2Icon3URL,
      program3_feture_icon1: Feature3Icon1URL,
      program3_feture_icon2: Feature3Icon2URL,
      program3_feture_icon3: Feature3Icon3URL,
      subtitle_instrcutor: formData?.subtitle_instrcutor,
      title_main_instructor: formData?.title_main_instructor,
      title_instructor: formData?.title_instructor,
    };
    console.log(EditSettings);
    async function Updateconfig() {
      const url = api_url.get_config;
      const response = await put_api_request(url, EditSettings, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: 'Settings Updated Successfully',
        });
      } else {
        notification.error({
          message: response.status,
        });
      }
    }
    Updateconfig();
  };

  return (
    <>
      <PageHeader ghost title="" />
      <Spin spinning={loading} delay={200}>
        <Main className="SettingForm">
          <Row gutter={30}>
            <Col md={24}>
              <div
                data-aos="fade-down"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Home Page Settings</h1>
              </div>
            </Col>
            <Col md={24}>
              <div
                data-aos="fade-up"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <Cards>
                  <Form
                    name="sDash_validation-form GeneralsettingsForm"
                    id="Formid"
                    //className="AddForm contactForm"
                    form={form}
                    layout="vertical"
                    onFinish={AddSettings}
                  >
                    <Row gutter={30} className="togglefield settingsform ">
                      <Col md={16} xs={24} className="togglefield settingsToggle">
                        <div className="homeToggle">
                          <Form.Item
                            name="active1"
                            initialValue=""
                            label="Enable Top Bar (Enabled)
"
                          >
                            {' '}
                          </Form.Item>
                          <Switch
                            name="active1"
                            className="homeswitch"
                            checked={formData?.active1}
                            onChange={e => setformData({ ...formData, active1: e })}
                          />
                        </div>
                      </Col>
                      <Col md={16} xs={24} className="togglefield settingsToggle">
                        <div className="homeToggle">
                          <Form.Item
                            name="active2"
                            initialValue=""
                            label="Enable Features (Enabled)
"
                          ></Form.Item>
                          <Switch
                            checked={formData?.active2}
                            name="active2"
                            className="homeswitch"
                            onChange={e => setformData({ ...formData, active2: e })}
                          />
                        </div>
                      </Col>
                      <Col md={16} xs={24} className="togglefield settingsToggle">
                        <div className="homeToggle">
                          <Form.Item
                            name="active3"
                            initialValue=""
                            label="Enable Categories  (Enabled)
"
                          ></Form.Item>
                          <Switch
                            checked={formData?.active3}
                            name="active3"
                            className="homeswitch"
                            onChange={e => setformData({ ...formData, active3: e })}
                          />
                        </div>
                      </Col>
                      <Col md={16} xs={24} className="togglefield settingsToggle">
                        <div className="homeToggle">
                          <Form.Item
                            name="active4"
                            initialValue=""
                            label="Enable Stats  (Enabled)
"
                          ></Form.Item>
                          <Switch
                            checked={formData?.active4}
                            name="active4"
                            className="homeswitch"
                            onChange={e => setformData({ ...formData, active4: e })}
                          />
                        </div>
                      </Col>
                      <Col md={16} xs={24} className="togglefield settingsToggle">
                        <div className="homeToggle">
                          <Form.Item
                            name="active5"
                            initialValue=""
                            label="Enable Testimonials  (Enabled)
"
                          ></Form.Item>
                          <Switch
                            checked={formData?.active5}
                            name="active5"
                            className="homeswitch"
                            onChange={e => setformData({ ...formData, active5: e })}
                          />
                        </div>
                      </Col>
                      <Col md={16} xs={24} className="togglefield settingsToggle">
                        <div className="homeToggle">
                          <Form.Item
                            name="active6"
                            initialValue=""
                            label="Enable CTA   (Enabled)
"
                          ></Form.Item>
                          <Switch
                            checked={formData?.active6}
                            name="active6"
                            className="homeswitch"
                            onChange={e => setformData({ ...formData, active6: e })}
                          />
                        </div>
                      </Col>
                      <Col md={16} xs={24} className="togglefield settingsToggle">
                        <div className="homeToggle">
                          <Form.Item
                            name="active7"
                            initialValue=""
                            label="Enable Footer   (Enabled)
"
                          ></Form.Item>
                          <Switch
                            checked={formData?.active7}
                            name="active7"
                            className="homeswitch"
                            onChange={e => setformData({ ...formData, active7: e })}
                            //checked={editASwitch} onChange={() => seteditASwitch(!editASwitch)}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row gutter={30}>
                      <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                        <Button
                          htmlType="submit"
                          type="success"
                          size="default"
                          className="btn-animation"
                          // onClick={AddSettings}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Cards>
              </div>
            </Col>
          </Row>
          <Row gutter={30} className="mtop">
            <Col md={24}>
              <div
                data-aos="fade-down"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Top Bar Settings</h1>
              </div>
            </Col>
            <Col md={24}>
              <div
                data-aos="fade-up"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <Cards>
                  <Form
                    name="sDash_validation-form GeneralsettingsForm"
                    id="Formid"
                    //className="AddForm contactForm"
                    form={form}
                    layout="vertical"
                    onFinish={AddSettings}
                  >
                    <Row gutter={30} className="togglefield settingsform">
                      <Col md={16} xs={24} className="mb-space">
                        <Form.Item name="message" label="Message">
                          <TextArea
                            name="message"
                            onChange={e => setformData({ ...formData, message: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={16} xs={24} className="mb-space">
                        <Form.Item name="button_text" label="Button Text">
                          <Input
                            name="button_text"
                            onChange={e => setformData({ ...formData, button_text: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>
                      <Col md={16} xs={24} className="mb-space">
                        <Form.Item name="button_link" label="Button Link">
                          <Input
                            name="button_link"
                            onChange={e => setformData({ ...formData, button_link: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={30}>
                      <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                        <Button
                          htmlType="submit"
                          type="success"
                          size="default"
                          className="btn-animation"
                          //onClick={AddSettings}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Cards>
              </div>
            </Col>
          </Row>

          <Row gutter={30} className="mtop">
            <Col md={24}>
              <div
                data-aos="fade-down"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Hero Settings</h1>
              </div>
            </Col>
            <Col md={24}>
              <div
                data-aos="fade-up"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <Cards>
                  <Form
                    name="sDash_validation-form GeneralsettingsForm"
                    id="Formid"
                    //className="AddForm contactForm"
                    form={form}
                    layout="vertical"
                    onFinish={AddSettings}
                  >
                    <Row gutter={30} className="togglefield settingsform">
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="title" label="Title">
                          <Input
                            name="title"
                            onChange={e => setformData({ ...formData, title: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="title_line2" label="Title Line 2">
                          <Input
                            name="title_line2"
                            onChange={e => setformData({ ...formData, title_line2: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="title_line3" label="Title Line 3">
                          <Input
                            name="title_line3"
                            onChange={e => setformData({ ...formData, title_line3: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="sub_title" label="Subtitle">
                          <TextArea
                            name="sub_title"
                            onChange={e => setformData({ ...formData, sub_title: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={12} xs={24} className="mb-space">
                        <Form.Item name="cta_text" label="CTA Text">
                          <Input
                            name="cta_text"
                            onChange={e => setformData({ ...formData, cta_text: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>
                      <Col md={12} xs={24} className="mb-space">
                        <Form.Item name="cta_link" label="CTA Link">
                          <Input
                            name="cta_link"
                            onChange={e => setformData({ ...formData, cta_link: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>

                      <Col md={12} xs={24} className="mb-space">
                        <Form.Item name="cta_text2" label="CTA Text2">
                          <Input
                            name="cta_text2"
                            onChange={e => setformData({ ...formData, cta_text2: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>
                      <Col md={12} xs={24} className="mb-space">
                        <Form.Item name="cta_link2" label="CTA Link2">
                          <Input
                            name="cta_link2"
                            onChange={e => setformData({ ...formData, cta_link2: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="cta_description" label="CTA Description">
                          <Input
                            name="cta_description"
                            onChange={e => setformData({ ...formData, cta_description: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>
                      <Col md={8} xs={24} className="mb-space">
                        <Form.Item name="typing_animationtext" label="Typing Text Animation1">
                          <Input
                            name="typing_animationtext"
                            onChange={e => setformData({ ...formData, typing_animationtext: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={8} xs={24} className="mb-space">
                        <Form.Item name="typing_animationtext2" label="Typing Text Animation2">
                          <Input
                            name="typing_animationtext2"
                            onChange={e => setformData({ ...formData, typing_animationtext2: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={8} xs={24} className="mb-space">
                        <Form.Item name="typing_animationtext3" label="Typing Text Animation3">
                          <Input
                            name="typing_animationtext3"
                            onChange={e => setformData({ ...formData, typing_animationtext3: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item
                          name="image"
                          label="Image"
                          rules={[
                            {
                              required: false,
                              message: 'Please select Store Featured Image!',
                            },
                          ]}
                        >
                          <div className="overly-container">
                            <label for="file-input2" style={{ position: 'relative' }}>
                              <div className="addpageupload categoryEditResult ">
                                {/* {renderPictures(Images)} */}
                                {Images?.length > 0 ? (
                                  <img className="imgse renderCategoryEdit  " src={Images} style={{ width: '35%' }} />
                                ) : (
                                  <img className="imgse staticImagewid" src={StaticImage} />
                                )}
                              </div>
                              {/* <div class="overlaytext">
                          <div class="text">Change Image</div>
                        </div> */}
                            </label>
                            <Input
                              style={{ opacity: '0', height: '25%' }}
                              name="image"
                              label="Image"
                              type="file"
                              // datafield={image + '-' + i}
                              onChange={e => imageHandleChange(e)}
                              id="file-input2"
                            />
                            {/* <div class="overlay">
                        <div className="text"></div>
                      </div> */}
                          </div>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={30}>
                      <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                        <Button
                          htmlType="submit"
                          type="success"
                          size="default"
                          className="btn-animation"
                          //onClick={AddSettings}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Cards>
              </div>
            </Col>
          </Row>

          <Row gutter={30} className="mtop">
            <Col md={24}>
              <div
                data-aos="fade-down"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Login & Registration Settings</h1>
              </div>
            </Col>
            <Col md={24}>
              <div
                data-aos="fade-up"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <Cards>
                  <Form
                    name="sDash_validation-form GeneralsettingsForm"
                    id="Formid"
                    //className="AddForm contactForm"
                    form={form}
                    layout="vertical"
                    onFinish={AddSettings}
                  >
                    <Row gutter={30} className="togglefield settingsform">
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item
                          name="login_logo"
                          label="Logo"
                          rules={[
                            {
                              required: false,
                              message: 'Please select Store Logo!',
                            },
                          ]}
                        >
                          <div className="overly-container">
                            <label for="file-input12" style={{ position: 'relative' }}>
                              <div className="addpageupload categoryEditResult ">
                                {/* {renderPictures(Images)} */}
                                {loginLogoImages?.length > 0 ? (
                                  <img
                                    className="imgse renderCategoryEdit  "
                                    src={loginLogoImages}
                                    style={{ width: '35%' }}
                                  />
                                ) : (
                                  <img className="imgse staticImagewid" src={StaticImage} />
                                )}
                              </div>
                              {/* <div class="overlaytext">
                          <div class="text">Change Image</div>
                        </div> */}
                            </label>
                            <Input
                              style={{ opacity: '0', height: '25%' }}
                              name="image"
                              label="Image"
                              type="file"
                              // datafield={image + '-' + i}
                              onChange={e => imageHandleChange11(e)}
                              id="file-input12"
                            />
                            {/* <div class="overlay">
                        <div className="text"></div>
                      </div> */}
                          </div>
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="welcome_text_1" label="Welcome Title">
                          <Input
                            name="welcome_text_1"
                            onChange={e => setformData({ ...formData, welcome_text_1: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="welcome_text_2" label="Welcome Subtitle">
                          <TextArea
                            name="welcome_text_2"
                            onChange={e => setformData({ ...formData, welcome_text_2: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="title_login" label="Title">
                          <Input
                            name="title_login"
                            onChange={e => setformData({ ...formData, title_login: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="sub_title_login" label="Subtitle">
                          <TextArea
                            name="sub_title_login"
                            onChange={e => setformData({ ...formData, sub_title_login: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item
                          name="hero_image"
                          label="Image"
                          rules={[
                            {
                              required: false,
                              message: 'Please select Store Featured Image!',
                            },
                          ]}
                        >
                          <div className="overly-container">
                            <label for="file-input11" style={{ position: 'relative' }}>
                              <div className="addpageupload categoryEditResult ">
                                {/* {renderPictures(Images)} */}
                                {HeroImages?.length > 0 ? (
                                  <img
                                    className="imgse renderCategoryEdit  "
                                    src={HeroImages}
                                    style={{ width: '35%' }}
                                  />
                                ) : (
                                  <img className="imgse staticImagewid" src={StaticImage} />
                                )}
                              </div>
                              {/* <div class="overlaytext">
                          <div class="text">Change Image</div>
                        </div> */}
                            </label>
                            <Input
                              style={{ opacity: '0', height: '25%' }}
                              name="image"
                              label="Image"
                              type="file"
                              // datafield={image + '-' + i}
                              onChange={e => imageHandleChange10(e)}
                              id="file-input11"
                            />
                            {/* <div class="overlay">
                        <div className="text"></div>
                      </div> */}
                          </div>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={30}>
                      <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                        <Button
                          htmlType="submit"
                          type="success"
                          size="default"
                          className="btn-animation"
                          //onClick={AddSettings}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Cards>
              </div>
            </Col>
          </Row>

          <Row gutter={30} className="mtop">
            <Col md={24}>
              <div
                data-aos="fade-down"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Our Programs Section</h1>
              </div>
            </Col>
            <Col md={24}>
              <div
                data-aos="fade-up"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <Cards>
                  <Form
                    name="sDash_validation-form GeneralsettingsForm"
                    id="Formid"
                    //className="AddForm contactForm"
                    form={form}
                    layout="vertical"
                    onFinish={AddSettings}
                  >
                    <Row gutter={30} className="togglefield settingsform">
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="our_program_title" label="Our Programs Title">
                          <Input
                            name="our_program_title"
                            onChange={e => setformData({ ...formData, our_program_title: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>

                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="our_program_subtitle" label="Our Programs Sub Title">
                          <TextArea
                            name="our_program_subtitle"
                            onChange={e => setformData({ ...formData, our_program_subtitle: e.target.value })}
                          />
                        </Form.Item>
                      </Col>

                      <p style={{ fontSize: '20px', margin: '10px 27px' }}>1st Program Cards details:-</p>

                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="program1_title" label="Program 1 Title">
                          <Input
                            name="program1_title"
                            onChange={e => setformData({ ...formData, program1_title: e.target.value })}
                          />
                        </Form.Item>
                      </Col>

                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="program1_subtitle" label="Program 1 Sub Title">
                          <TextArea
                            name="program1_subtitle"
                            onChange={e => setformData({ ...formData, program1_subtitle: e.target.value })}
                          />
                        </Form.Item>
                      </Col>

                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="program1_feture_text1" label="Program Feature Text 1">
                          <Input
                            name="program1_feture_text1"
                            onChange={e => setformData({ ...formData, program1_feture_text1: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item
                          name="program1_feture_icon1"
                          label="Our Program Feature Icon"
                          rules={[
                            {
                              required: false,
                              message: 'Please select program1_feture_icon1',
                            },
                          ]}
                        >
                          <div className="overly-container">
                            <label for="file-input13" style={{ position: 'relative' }}>
                              <div className="addpageupload categoryEditResult ">
                                {/* {renderPictures(Images)} */}
                                {FeatureIcon1Images?.length > 0 ? (
                                  <img
                                    className="imgse renderCategoryEdit  "
                                    src={FeatureIcon1Images}
                                    style={{ width: '35%' }}
                                  />
                                ) : (
                                  <img className="imgse staticImagewid" src={StaticImage} />
                                )}
                              </div>
                              {/* <div class="overlaytext">
                          <div class="text">Change Image</div>
                        </div> */}
                            </label>
                            <Input
                              style={{ opacity: '0', height: '25%' }}
                              name="image"
                              label="Image"
                              type="file"
                              // datafield={image + '-' + i}
                              onChange={e => imageHandleChange12(e)}
                              id="file-input13"
                            />
                            {/* <div class="overlay">
                        <div className="text"></div>
                      </div> */}
                          </div>
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="program1_feture_text2" label="Program Feature Text 2">
                          <Input
                            name="program1_feture_text2"
                            onChange={e => setformData({ ...formData, program1_feture_text2: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item
                          name="program1_feture_icon2"
                          label="Our Program Feature Icon2"
                          rules={[
                            {
                              required: false,
                              message: 'Please select program1_feture_icon2',
                            },
                          ]}
                        >
                          <div className="overly-container">
                            <label for="file-input14" style={{ position: 'relative' }}>
                              <div className="addpageupload categoryEditResult ">
                                {/* {renderPictures(Images)} */}
                                {FeatureIcon2Images?.length > 0 ? (
                                  <img
                                    className="imgse renderCategoryEdit  "
                                    src={FeatureIcon2Images}
                                    style={{ width: '35%' }}
                                  />
                                ) : (
                                  <img className="imgse staticImagewid" src={StaticImage} />
                                )}
                              </div>
                              {/* <div class="overlaytext">
                          <div class="text">Change Image</div>
                        </div> */}
                            </label>
                            <Input
                              style={{ opacity: '0', height: '25%' }}
                              name="image"
                              label="Image"
                              type="file"
                              // datafield={image + '-' + i}
                              onChange={e => imageHandleChange13(e)}
                              id="file-input14"
                            />
                            {/* <div class="overlay">
                        <div className="text"></div>
                      </div> */}
                          </div>
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="program1_feture_text3" label="Program Feature Text 3">
                          <Input
                            name="program1_feture_text3"
                            onChange={e => setformData({ ...formData, program1_feture_text3: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item
                          name="program1_feture_icon3"
                          label="Our Program Feature Icon3"
                          rules={[
                            {
                              required: false,
                              message: 'Please select program1_feture_icon1',
                            },
                          ]}
                        >
                          <div className="overly-container">
                            <label for="file-input15" style={{ position: 'relative' }}>
                              <div className="addpageupload categoryEditResult ">
                                {/* {renderPictures(Images)} */}
                                {FeatureIcon3Images?.length > 0 ? (
                                  <img
                                    className="imgse renderCategoryEdit  "
                                    src={FeatureIcon3Images}
                                    style={{ width: '35%' }}
                                  />
                                ) : (
                                  <img className="imgse staticImagewid" src={StaticImage} />
                                )}
                              </div>
                              {/* <div class="overlaytext">
                          <div class="text">Change Image</div>
                        </div> */}
                            </label>
                            <Input
                              style={{ opacity: '0', height: '25%' }}
                              name="image"
                              label="Image"
                              type="file"
                              // datafield={image + '-' + i}
                              onChange={e => imageHandleChange14(e)}
                              id="file-input15"
                            />
                            {/* <div class="overlay">
                        <div className="text"></div>
                      </div> */}
                          </div>
                        </Form.Item>
                      </Col>

                      <p style={{ fontSize: '20px', margin: '10px 27px' }}>2nd Program Cards details:-</p>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="program2_title" label="Program 2 Title">
                          <Input
                            name="program2_title"
                            onChange={e => setformData({ ...formData, program2_title: e.target.value })}
                          />
                        </Form.Item>
                      </Col>

                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="program2_subtitle" label="Program 2 Sub Title">
                          <TextArea
                            name="program2_subtitle"
                            onChange={e => setformData({ ...formData, program2_subtitle: e.target.value })}
                          />
                        </Form.Item>
                      </Col>

                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="program2_feture_text1" label="Program Feature Text 1">
                          <Input
                            name="program2_feture_text1"
                            onChange={e => setformData({ ...formData, program2_feture_text1: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item
                          name="program2_feture_icon1"
                          label="Our Program Feature Icon"
                          rules={[
                            {
                              required: false,
                              message: 'Please select program1_feture_icon1',
                            },
                          ]}
                        >
                          <div className="overly-container">
                            <label for="file-input16" style={{ position: 'relative' }}>
                              <div className="addpageupload categoryEditResult ">
                                {/* {renderPictures(Images)} */}
                                {Feature2Icon1Images?.length > 0 ? (
                                  <img
                                    className="imgse renderCategoryEdit  "
                                    src={Feature2Icon1Images}
                                    style={{ width: '35%' }}
                                  />
                                ) : (
                                  <img className="imgse staticImagewid" src={StaticImage} />
                                )}
                              </div>
                              {/* <div class="overlaytext">
                          <div class="text">Change Image</div>
                        </div> */}
                            </label>
                            <Input
                              style={{ opacity: '0', height: '25%' }}
                              name="image"
                              label="Image"
                              type="file"
                              // datafield={image + '-' + i}
                              onChange={e => imageHandleChange15(e)}
                              id="file-input16"
                            />
                            {/* <div class="overlay">
                        <div className="text"></div>
                      </div> */}
                          </div>
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="program2_feture_text2" label="Program Feature Text 2">
                          <Input
                            name="program2_feture_text2"
                            onChange={e => setformData({ ...formData, program2_feture_text2: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item
                          name="program2_feture_icon2"
                          label="Our Program Feature Icon2"
                          rules={[
                            {
                              required: false,
                              message: 'Please select program2_feture_icon2',
                            },
                          ]}
                        >
                          <div className="overly-container">
                            <label for="file-input17" style={{ position: 'relative' }}>
                              <div className="addpageupload categoryEditResult ">
                                {/* {renderPictures(Images)} */}
                                {Feature2Icon2Images?.length > 0 ? (
                                  <img
                                    className="imgse renderCategoryEdit  "
                                    src={Feature2Icon2Images}
                                    style={{ width: '35%' }}
                                  />
                                ) : (
                                  <img className="imgse staticImagewid" src={StaticImage} />
                                )}
                              </div>
                              {/* <div class="overlaytext">
                          <div class="text">Change Image</div>
                        </div> */}
                            </label>
                            <Input
                              style={{ opacity: '0', height: '25%' }}
                              name="image"
                              label="Image"
                              type="file"
                              // datafield={image + '-' + i}
                              onChange={e => imageHandleChange16(e)}
                              id="file-input17"
                            />
                            {/* <div class="overlay">
                        <div className="text"></div>
                      </div> */}
                          </div>
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="program2_feture_text3" label="Program Feature Text 3">
                          <Input
                            name="program2_feture_text3"
                            onChange={e => setformData({ ...formData, program2_feture_text3: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item
                          name="program2_feture_icon3"
                          label="Our Program Feature Icon3"
                          rules={[
                            {
                              required: false,
                              message: 'Please select program1_feture_icon1',
                            },
                          ]}
                        >
                          <div className="overly-container">
                            <label for="file-input18" style={{ position: 'relative' }}>
                              <div className="addpageupload categoryEditResult ">
                                {/* {renderPictures(Images)} */}
                                {Feature2Icon3Images?.length > 0 ? (
                                  <img
                                    className="imgse renderCategoryEdit  "
                                    src={Feature2Icon3Images}
                                    style={{ width: '35%' }}
                                  />
                                ) : (
                                  <img className="imgse staticImagewid" src={StaticImage} />
                                )}
                              </div>
                              {/* <div class="overlaytext">
                          <div class="text">Change Image</div>
                        </div> */}
                            </label>
                            <Input
                              style={{ opacity: '0', height: '25%' }}
                              name="image"
                              label="Image"
                              type="file"
                              // datafield={image + '-' + i}
                              onChange={e => imageHandleChange17(e)}
                              id="file-input18"
                            />
                            {/* <div class="overlay">
                        <div className="text"></div>
                      </div> */}
                          </div>
                        </Form.Item>
                      </Col>

                      <p style={{ fontSize: '20px', margin: '10px 27px' }}>3rd Program Cards details:-</p>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="program3_title" label="Program 3 Title">
                          <Input
                            name="program3_title"
                            onChange={e => setformData({ ...formData, program3_title: e.target.value })}
                          />
                        </Form.Item>
                      </Col>

                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="program3_subtitle" label="Program 3 Sub Title">
                          <TextArea
                            name="program3_subtitle"
                            onChange={e => setformData({ ...formData, program3_subtitle: e.target.value })}
                          />
                        </Form.Item>
                      </Col>

                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="program3_feture_text1" label="Program Feature Text 1">
                          <Input
                            name="program3_feture_text1"
                            onChange={e => setformData({ ...formData, program3_feture_text1: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item
                          name="program3_feture_icon1"
                          label="Our Program Feature Icon"
                          rules={[
                            {
                              required: false,
                              message: 'Please select program1_feture_icon1',
                            },
                          ]}
                        >
                          <div className="overly-container">
                            <label for="file-input19" style={{ position: 'relative' }}>
                              <div className="addpageupload categoryEditResult ">
                                {/* {renderPictures(Images)} */}
                                {Feature3Icon1Images?.length > 0 ? (
                                  <img
                                    className="imgse renderCategoryEdit  "
                                    src={Feature3Icon1Images}
                                    style={{ width: '35%' }}
                                  />
                                ) : (
                                  <img className="imgse staticImagewid" src={StaticImage} />
                                )}
                              </div>
                              {/* <div class="overlaytext">
                          <div class="text">Change Image</div>
                        </div> */}
                            </label>
                            <Input
                              style={{ opacity: '0', height: '25%' }}
                              name="image"
                              label="Image"
                              type="file"
                              // datafield={image + '-' + i}
                              onChange={e => imageHandleChange18(e)}
                              id="file-input19"
                            />
                            {/* <div class="overlay">
                        <div className="text"></div>
                      </div> */}
                          </div>
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="program3_feture_text2" label="Program Feature Text 2">
                          <Input
                            name="program3_feture_text2"
                            onChange={e => setformData({ ...formData, program3_feture_text2: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item
                          name="program3_feture_icon2"
                          label="Our Program Feature Icon2"
                          rules={[
                            {
                              required: false,
                              message: 'Please select program3_feture_icon2',
                            },
                          ]}
                        >
                          <div className="overly-container">
                            <label for="file-input20" style={{ position: 'relative' }}>
                              <div className="addpageupload categoryEditResult ">
                                {/* {renderPictures(Images)} */}
                                {Feature3Icon2Images?.length > 0 ? (
                                  <img
                                    className="imgse renderCategoryEdit  "
                                    src={Feature3Icon2Images}
                                    style={{ width: '35%' }}
                                  />
                                ) : (
                                  <img className="imgse staticImagewid" src={StaticImage} />
                                )}
                              </div>
                              {/* <div class="overlaytext">
                          <div class="text">Change Image</div>
                        </div> */}
                            </label>
                            <Input
                              style={{ opacity: '0', height: '25%' }}
                              name="image"
                              label="Image"
                              type="file"
                              // datafield={image + '-' + i}
                              onChange={e => imageHandleChange19(e)}
                              id="file-input20"
                            />
                            {/* <div class="overlay">
                        <div className="text"></div>
                      </div> */}
                          </div>
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="program3_feture_text3" label="Program Feature Text 3">
                          <Input
                            name="program3_feture_text3"
                            onChange={e => setformData({ ...formData, program3_feture_text3: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item
                          name="program3_feture_icon3"
                          label="Our Program Feature Icon3"
                          rules={[
                            {
                              required: false,
                              message: 'Please select program1_feture_icon1',
                            },
                          ]}
                        >
                          <div className="overly-container">
                            <label for="file-input21" style={{ position: 'relative' }}>
                              <div className="addpageupload categoryEditResult ">
                                {/* {renderPictures(Images)} */}
                                {Feature3Icon3Images?.length > 0 ? (
                                  <img
                                    className="imgse renderCategoryEdit  "
                                    src={Feature3Icon3Images}
                                    style={{ width: '35%' }}
                                  />
                                ) : (
                                  <img className="imgse staticImagewid" src={StaticImage} />
                                )}
                              </div>
                              {/* <div class="overlaytext">
                          <div class="text">Change Image</div>
                        </div> */}
                            </label>
                            <Input
                              style={{ opacity: '0', height: '25%' }}
                              name="image"
                              label="Image"
                              type="file"
                              // datafield={image + '-' + i}
                              onChange={e => imageHandleChange20(e)}
                              id="file-input21"
                            />
                            {/* <div class="overlay">
                        <div className="text"></div>
                      </div> */}
                          </div>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={30}>
                      <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                        <Button
                          htmlType="submit"
                          type="success"
                          size="default"
                          className="btn-animation"
                          //onClick={AddSettings}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Cards>
              </div>
            </Col>
          </Row>

          <Row gutter={30} className="mtop">
            <Col md={24}>
              <div
                data-aos="fade-down"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Feature Settings</h1>
              </div>
            </Col>
            <Col md={24}>
              <div
                data-aos="fade-up"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <Cards>
                  <Form
                    name="sDash_validation-form GeneralsettingsForm"
                    id="Formid"
                    //className="AddForm contactForm"
                    form={form}
                    layout="vertical"
                    onFinish={AddSettings}
                  >
                    <Row gutter={30} className="togglefield settingsform">
                      <Col md={16} xs={24} className="mb-space">
                        <Form.Item name="title_1" label="Title">
                          <Input
                            name="title_1"
                            onChange={e => setformData({ ...formData, title_1: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>
                      <Col md={16} xs={24} className="mb-space">
                        <Form.Item name="feature_tagline" label="Title">
                          <Input
                            name="feature_tagline"
                            onChange={e => setformData({ ...formData, feature_tagline: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="subtitle_1" label="Subtitle">
                          <TextArea
                            name="subtitle_1"
                            onChange={e => setformData({ ...formData, subtitle_1: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={23} xs={24} className="mb-space" style={{ margin: '0 auto' }}>
                        <div className="homepSetting ">
                          <p className="border-b">
                            <b>Feature 1</b>
                          </p>
                          <Col md={24} xs={24} className="mb-space featureSection">
                            <Form.Item name="caption_1" label="Caption">
                              <Input
                                name="caption_1"
                                onChange={e => setformData({ ...formData, caption_1: e.target.value })}
                              ></Input>
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            <Form.Item name="description" label="Description">
                              <TextArea
                                name="description"
                                onChange={e => setformData({ ...formData, description: e.target.value })}
                              />
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            {/* <Form.Item name="icon_url" label="Icon URL (100x100)">
                            <Input
                              name="icon_url"
                              onChange={e => setformData({ ...formData, icon_url: e.target.value })}
                            />
                          </Form.Item> */}
                            <Form.Item
                              name="icon_url"
                              label="Image"
                              rules={[
                                {
                                  required: false,
                                  message: 'Please select Store Featured Image!',
                                },
                              ]}
                            >
                              <div className="overly-container">
                                <label for="file-input3" style={{ position: 'relative' }}>
                                  <div className="addpageupload categoryEditResult ">
                                    {/* {renderPictures(Images)} */}
                                    {IconImages?.length > 0 ? (
                                      <img
                                        className="imgse renderCategoryEdit  "
                                        src={IconImages}
                                        style={{ width: '35%' }}
                                      />
                                    ) : (
                                      <img className="imgse staticImagewid" src={StaticImageIcon1} />
                                    )}
                                  </div>
                                  {/* <div class="overlaytext">
                          <div class="text">Change Image</div>
                        </div> */}
                                </label>
                                <Input
                                  style={{ opacity: '0', height: '25%' }}
                                  name="image"
                                  label="Image"
                                  type="file"
                                  // datafield={image + '-' + i}
                                  onChange={e => imageHandleChange2(e)}
                                  id="file-input3"
                                />
                                {/* <div class="overlay">
                        <div className="text"></div>
                      </div> */}
                              </div>
                            </Form.Item>
                          </Col>
                        </div>
                      </Col>
                      <br></br>
                      <Col md={23} xs={24} className="mb-space" style={{ margin: '0 auto' }}>
                        <div className="homepSetting ">
                          <p className="border-b">
                            <b>Feature 2</b>
                          </p>
                          <Col md={24} xs={24} className="mb-space featureSection">
                            <Form.Item name="caption_2" label="Caption">
                              <Input
                                name="caption_2"
                                onChange={e => setformData({ ...formData, caption_2: e.target.value })}
                              ></Input>
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            <Form.Item name="description_2" label="Description">
                              <TextArea
                                name="description_2"
                                onChange={e => setformData({ ...formData, description_2: e.target.value })}
                              />
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            {/* <Form.Item name="icon_url_2" label="Icon URL (100x100)">
                            <Input
                              name="icon_url_2"
                              onChange={e => setformData({ ...formData, icon_url_2: e.target.value })}
                            />
                          </Form.Item> */}
                            <Form.Item
                              name="icon_url_2"
                              label="Image"
                              rules={[
                                {
                                  required: false,
                                  message: 'Please select Store Featured Image!',
                                },
                              ]}
                            >
                              <div className="overly-container">
                                <label for="file-input4" style={{ position: 'relative' }}>
                                  <div className="addpageupload categoryEditResult ">
                                    {/* {renderPictures(Images)} */}
                                    {IconImages2?.length > 0 ? (
                                      <img
                                        className="imgse renderCategoryEdit  "
                                        src={IconImages2}
                                        style={{ width: '35%' }}
                                      />
                                    ) : (
                                      <img className="imgse staticImagewid" src={StaticImageIcon2} />
                                    )}
                                  </div>
                                  {/* <div class="overlaytext">
                          <div class="text">Change Image</div>
                        </div> */}
                                </label>
                                <Input
                                  style={{ opacity: '0', height: '25%' }}
                                  name="image"
                                  label="Image"
                                  type="file"
                                  // datafield={image + '-' + i}
                                  onChange={e => imageHandleChange3(e)}
                                  id="file-input4"
                                />
                                {/* <div class="overlay">
                        <div className="text"></div>
                      </div> */}
                              </div>
                            </Form.Item>
                          </Col>
                        </div>
                      </Col>
                      <Col md={23} xs={24} className="mb-space" style={{ margin: '0 auto' }}>
                        <div className="homepSetting ">
                          <p className="border-b">
                            <b>Feature 3</b>
                          </p>
                          <Col md={24} xs={24} className="mb-space featureSection">
                            <Form.Item name="caption_3" label="Caption">
                              <Input
                                name="caption_3"
                                onChange={e => setformData({ ...formData, caption_3: e.target.value })}
                              ></Input>
                            </Form.Item>
                          </Col>

                          <Col md={24} xs={24} className="mb-space">
                            <Form.Item name="description_3" label="Description">
                              <TextArea
                                name="description_3"
                                onChange={e => setformData({ ...formData, description_3: e.target.value })}
                              />
                            </Form.Item>
                          </Col>

                          <Col md={24} xs={24} className="mb-space">
                            {/* <Form.Item name="icon_url_3" label="Icon URL (100x100)">
                            <Input
                              name="icon_url_3"
                              onChange={e => setformData({ ...formData, icon_url_3: e.target.value })}
                            />
                          </Form.Item> */}
                            <Form.Item
                              name="icon_url_3"
                              label="Image"
                              rules={[
                                {
                                  required: false,
                                  message: 'Please select Store Featured Image!',
                                },
                              ]}
                            >
                              <div className="overly-container">
                                <label for="file-input5" style={{ position: 'relative' }}>
                                  <div className="addpageupload categoryEditResult ">
                                    {/* {renderPictures(Images)} */}
                                    {IconImages3?.length > 0 ? (
                                      <img
                                        className="imgse renderCategoryEdit  "
                                        src={IconImages3}
                                        style={{ width: '35%' }}
                                      />
                                    ) : (
                                      <img className="imgse staticImagewid" src={StaticImageIcon3} />
                                    )}
                                  </div>
                                  {/* <div class="overlaytext">
                          <div class="text">Change Image</div>
                        </div> */}
                                </label>
                                <Input
                                  style={{ opacity: '0', height: '25%' }}
                                  name="image"
                                  label="Image"
                                  type="file"
                                  // datafield={image + '-' + i}
                                  onChange={e => imageHandleChange4(e)}
                                  id="file-input5"
                                />
                                {/* <div class="overlay">
                        <div className="text"></div>
                      </div> */}
                              </div>
                            </Form.Item>
                          </Col>
                        </div>
                      </Col>
                      <Col md={23} xs={24} className="mb-space" style={{ margin: '0 auto' }}>
                        <div className="homepSetting ">
                          <p className="border-b">
                            <b>Feature 4</b>
                          </p>
                          <Col md={24} xs={24} className="mb-space featureSection">
                            <Form.Item name="caption_4" label="Caption">
                              <Input
                                name="caption_4"
                                onChange={e => setformData({ ...formData, caption_4: e.target.value })}
                              ></Input>
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            <Form.Item name="description_4" label="Description">
                              <TextArea
                                name="description_4"
                                onChange={e => setformData({ ...formData, description_4: e.target.value })}
                              />
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            {/* <Form.Item name="icon_url_4" label="Icon URL (100x100)">
                            <Input
                              name="icon_url_4"
                              onChange={e => setformData({ ...formData, icon_url_4: e.target.value })}
                            />
                          </Form.Item> */}
                            <Form.Item
                              name="icon_url_4"
                              label="Image"
                              rules={[
                                {
                                  required: false,
                                  message: 'Please select Store Featured Image!',
                                },
                              ]}
                            >
                              <div className="overly-container">
                                <label for="file-input6" style={{ position: 'relative' }}>
                                  <div className="addpageupload categoryEditResult ">
                                    {/* {renderPictures(Images)} */}
                                    {IconImages4?.length > 0 ? (
                                      <img
                                        className="imgse renderCategoryEdit  "
                                        src={IconImages4}
                                        style={{ width: '35%' }}
                                      />
                                    ) : (
                                      <img className="imgse staticImagewid" src={StaticImageIcon4} />
                                    )}
                                  </div>
                                  {/* <div class="overlaytext">
                          <div class="text">Change Image</div>
                        </div> */}
                                </label>
                                <Input
                                  style={{ opacity: '0', height: '25%' }}
                                  name="image"
                                  label="Image"
                                  type="file"
                                  // datafield={image + '-' + i}
                                  onChange={e => imageHandleChange5(e)}
                                  id="file-input6"
                                />
                                {/* <div class="overlay">
                        <div className="text"></div>
                      </div> */}
                              </div>
                            </Form.Item>
                          </Col>
                        </div>
                      </Col>
                      <Col md={23} xs={24} className="mb-space" style={{ margin: '0 auto' }}>
                        <div className="homepSetting ">
                          <p className="border-b">
                            <b>Feature 5</b>
                          </p>
                          <Col md={24} xs={24} className="mb-space featureSection">
                            <Form.Item name="caption_5" label="Caption">
                              <Input
                                name="caption_5"
                                onChange={e => setformData({ ...formData, caption_5: e.target.value })}
                              ></Input>
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            <Form.Item name="description_5" label="Description">
                              <TextArea
                                name="description_5"
                                onChange={e => setformData({ ...formData, description_5: e.target.value })}
                              />
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            {/* <Form.Item name="icon_url_4" label="Icon URL (100x100)">
                            <Input
                              name="icon_url_4"
                              onChange={e => setformData({ ...formData, icon_url_4: e.target.value })}
                            />
                          </Form.Item> */}
                            <Form.Item
                              name="icon_url_5"
                              label="Image"
                              rules={[
                                {
                                  required: false,
                                  message: 'Please select Store Featured Image!',
                                },
                              ]}
                            >
                              <div className="overly-container">
                                <label for="file-input7" style={{ position: 'relative' }}>
                                  <div className="addpageupload categoryEditResult ">
                                    {/* {renderPictures(Images)} */}
                                    {IconImages5?.length > 0 ? (
                                      <img
                                        className="imgse renderCategoryEdit  "
                                        src={IconImages5}
                                        style={{ width: '35%' }}
                                      />
                                    ) : (
                                      <img className="imgse staticImagewid" src={StaticImageIcon4} />
                                    )}
                                  </div>
                                  {/* <div class="overlaytext">
                          <div class="text">Change Image</div>
                        </div> */}
                                </label>
                                <Input
                                  style={{ opacity: '0', height: '25%' }}
                                  name="image"
                                  label="Image"
                                  type="file"
                                  // datafield={image + '-' + i}
                                  onChange={e => imageHandleChange6(e)}
                                  id="file-input7"
                                />
                                {/* <div class="overlay">
                        <div className="text"></div>
                      </div> */}
                              </div>
                            </Form.Item>
                          </Col>
                        </div>
                      </Col>
                      <Col md={23} xs={24} className="mb-space" style={{ margin: '0 auto' }}>
                        <div className="homepSetting ">
                          <p className="border-b">
                            <b>Feature 6</b>
                          </p>
                          <Col md={24} xs={24} className="mb-space featureSection">
                            <Form.Item name="caption_6" label="Caption">
                              <Input
                                name="caption_6"
                                onChange={e => setformData({ ...formData, caption_6: e.target.value })}
                              ></Input>
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            <Form.Item name="description_6" label="Description">
                              <TextArea
                                name="description_6"
                                onChange={e => setformData({ ...formData, description_6: e.target.value })}
                              />
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            {/* <Form.Item name="icon_url_4" label="Icon URL (100x100)">
                            <Input
                              name="icon_url_4"
                              onChange={e => setformData({ ...formData, icon_url_4: e.target.value })}
                            />
                          </Form.Item> */}
                            <Form.Item
                              name="icon_url_6"
                              label="Image"
                              rules={[
                                {
                                  required: false,
                                  message: 'Please select Store Featured Image!',
                                },
                              ]}
                            >
                              <div className="overly-container">
                                <label for="file-input8" style={{ position: 'relative' }}>
                                  <div className="addpageupload categoryEditResult ">
                                    {/* {renderPictures(Images)} */}
                                    {IconImages6?.length > 0 ? (
                                      <img
                                        className="imgse renderCategoryEdit  "
                                        src={IconImages6}
                                        style={{ width: '35%' }}
                                      />
                                    ) : (
                                      <img className="imgse staticImagewid" src={StaticImageIcon4} />
                                    )}
                                  </div>
                                  {/* <div class="overlaytext">
                          <div class="text">Change Image</div>
                        </div> */}
                                </label>
                                <Input
                                  style={{ opacity: '0', height: '25%' }}
                                  name="image"
                                  label="Image"
                                  type="file"
                                  // datafield={image + '-' + i}
                                  onChange={e => imageHandleChange7(e)}
                                  id="file-input8"
                                />
                                {/* <div class="overlay">
                        <div className="text"></div>
                      </div> */}
                              </div>
                            </Form.Item>
                          </Col>
                        </div>
                      </Col>
                    </Row>
                    <Row gutter={30}>
                      <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                        <Button
                          htmlType="submit"
                          type="success"
                          size="default"
                          className="btn-animation"
                          // onClick={AddSettings}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Cards>
              </div>
            </Col>
          </Row>

          <Row gutter={30} className="mtop">
            <Col md={24}>
              <div
                data-aos="fade-down"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Category Settings</h1>
              </div>
            </Col>
            <Col md={24}>
              <div
                data-aos="fade-up"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <Cards>
                  <Form
                    name="sDash_validation-form GeneralsettingsForm"
                    id="Formid"
                    //className="AddForm contactForm"
                    form={form}
                    layout="vertical"
                    onFinish={AddSettings}
                  >
                    <Row gutter={30} className="togglefield settingsform">
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="title_category" label="Title">
                          <Input
                            name="title_category"
                            onChange={e => setformData({ ...formData, title_category: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>
                      <Col md={16} xs={24} className="mb-space">
                        <Form.Item name="subtitle_category" label="Subtitle">
                          <TextArea
                            name="subtitle_category"
                            onChange={e => setformData({ ...formData, subtitle_category: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="item_limit" label="Item Limit">
                          <Input
                            type="number"
                            name="item_limit"
                            onChange={e => setformData({ ...formData, item_limit: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={30}>
                      <Col md={24} xs={24} style={{ textAlign: 'right' }}>
                        <Button
                          htmlType="submit"
                          type="success"
                          size="default"
                          className="btn-animation"
                          //onClick={AddSettings}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Cards>
              </div>
            </Col>
          </Row>
          <Row gutter={30} className="mtop">
            <Col md={24}>
              <div
                data-aos="fade-down"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Instructor Settings</h1>
              </div>
            </Col>
            <Col md={24}>
              <div
                data-aos="fade-up"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <Cards>
                  <Form
                    name="sDash_validation-form GeneralsettingsForm"
                    id="Formid"
                    //className="AddForm contactForm"
                    form={form}
                    layout="vertical"
                    onFinish={AddSettings}
                  >
                    <Row gutter={30} className="togglefield settingsform">
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="title_instructor" label="Instructor Title">
                          <Input onChange={e => setformData({ ...formData, title_instructor: e.target.value })}></Input>
                        </Form.Item>
                      </Col>
                      <Col md={24} xs={24} className="mb-space">
                        <Form.Item name="title_main_instructor" label="Instructor Title Main">
                          <Input
                            onChange={e => setformData({ ...formData, title_main_instructor: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>
                      <Col md={16} xs={24} className="mb-space">
                        <Form.Item name="subtitle_instrcutor" label="Instructor Subtitle">
                          <TextArea
                            name="subtitle_instrcutor"
                            onChange={e => setformData({ ...formData, subtitle_instrcutor: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={30}>
                      <Col md={24} xs={24} style={{ textAlign: 'right' }}>
                        <Button
                          htmlType="submit"
                          type="success"
                          size="default"
                          className="btn-animation"
                          //onClick={AddSettings}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Cards>
              </div>
            </Col>
          </Row>

          <Row gutter={30} className="mtop">
            <Col md={24}>
              <div
                data-aos="fade-down"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Statistics Settings</h1>
              </div>
            </Col>
            <Col md={24}>
              <div
                data-aos="fade-up"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <Cards>
                  <Form
                    name="sDash_validation-form GeneralsettingsForm"
                    id="Formid"
                    //className="AddForm contactForm"
                    form={form}
                    layout="vertical"
                    onFinish={AddSettings}
                  >
                    <Row gutter={30} className="togglefield settingsform">
                      <Col md={16} xs={24} className="mb-space">
                        <Form.Item name="title_statistics" label="Title">
                          <Input
                            name="title_statistics"
                            onChange={e => setformData({ ...formData, title_statistics: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>
                      <Col md={16} xs={24} className="mb-space">
                        <Form.Item name="subtitle_statistics" label="Subtitle">
                          <TextArea
                            name="subtitle_statistics"
                            onChange={e => setformData({ ...formData, subtitle_statistics: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={23} xs={24} className="mb-space" style={{ margin: '0 auto' }}>
                        <div className="homepSetting ">
                          <p className="border-b">
                            <b>Statistic 1</b>
                          </p>
                          <Col md={24} xs={24} className="mb-space featureSection">
                            <Form.Item name="statistic1_name" label="Name">
                              <Input
                                name="statistic1_name"
                                onChange={e => setformData({ ...formData, statistic1_name: e.target.value })}
                              ></Input>
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            <Form.Item name="statistic1_count" label="Count">
                              <Input
                                name="statistic1_count"
                                onChange={e => setformData({ ...formData, statistic1_count: e.target.value })}
                              ></Input>
                            </Form.Item>
                          </Col>
                        </div>
                      </Col>
                      <Col md={23} xs={24} className="mb-space" style={{ margin: '0 auto' }}>
                        <div className="homepSetting ">
                          <p className="border-b">
                            <b>Statistic 2</b>
                          </p>
                          <Col md={24} xs={24} className="mb-space featureSection">
                            <Form.Item name="statistic2_name" label="Name">
                              <Input
                                name="statistic2_name"
                                onChange={e => setformData({ ...formData, statistic2_name: e.target.value })}
                              ></Input>
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            <Form.Item name="statistic2_count" label="Count">
                              <Input
                                name="statistic2_count"
                                onChange={e => setformData({ ...formData, statistic2_count: e.target.value })}
                              ></Input>
                            </Form.Item>
                          </Col>
                        </div>
                      </Col>
                      <Col md={23} xs={24} className="mb-space" style={{ margin: '0 auto' }}>
                        <div className="homepSetting ">
                          <p className="border-b">
                            <b>Statistic 3</b>
                          </p>
                          <Col md={24} xs={24} className="mb-space featureSection">
                            <Form.Item name="statistic3_name" label="Name">
                              <Input
                                name="statistic3_name"
                                onChange={e => setformData({ ...formData, statistic3_name: e.target.value })}
                              ></Input>
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            <Form.Item name="statistic3_count" label="Count">
                              <Input
                                name="statistic3_count"
                                onChange={e => setformData({ ...formData, statistic3_count: e.target.value })}
                              ></Input>
                            </Form.Item>
                          </Col>
                        </div>
                      </Col>
                      <Col md={23} xs={24} className="mb-space" style={{ margin: '0 auto' }}>
                        <div className="homepSetting ">
                          <p className="border-b">
                            <b>Statistic 4</b>
                          </p>
                          <Col md={24} xs={24} className="mb-space featureSection">
                            <Form.Item name="statistic4_name" label="Name">
                              <Input
                                name="statistic4_name"
                                onChange={e => setformData({ ...formData, statistic4_name: e.target.value })}
                              ></Input>
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            <Form.Item name="statistic4_count" label="Count">
                              <Input
                                name="statistic4_count"
                                onChange={e => setformData({ ...formData, statistic4_count: e.target.value })}
                              ></Input>
                            </Form.Item>
                          </Col>
                        </div>
                      </Col>
                    </Row>
                    <Row gutter={30}>
                      <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                        <Button
                          htmlType="submit"
                          type="success"
                          size="default"
                          className="btn-animation"
                          //onClick={AddSettings}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Cards>
              </div>
            </Col>
          </Row>

          <Row gutter={30} className="mtop">
            <Col md={24}>
              <div
                data-aos="fade-down"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Testimonial Settings</h1>
              </div>
            </Col>
            <Col md={24}>
              <div
                data-aos="fade-up"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <Cards>
                  <Form
                    name="sDash_validation-form GeneralsettingsForm"
                    id="Formid"
                    //className="AddForm contactForm"
                    form={form}
                    layout="vertical"
                    onFinish={AddSettings}
                  >
                    <Row gutter={30} className="togglefield settingsform">
                      <Col md={16} xs={24} className="mb-space">
                        <Form.Item name="testimonial_title" label="Title">
                          <Input
                            name="testimonial_title"
                            onChange={e => setformData({ ...formData, testimonial_title: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>
                      <Col md={16} xs={24} className="mb-space">
                        <Form.Item name="testimonial_subtitle" label="Subtitle">
                          <TextArea
                            name="testimonial_subtitle"
                            onChange={e => setformData({ ...formData, testimonial_subtitle: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={23} xs={24} className="mb-space" style={{ margin: '0 auto' }}>
                        <div className="homepSetting ">
                          <p className="border-b">
                            <b>Testimonial 1</b>
                          </p>
                          <Col md={24} xs={24} className="mb-space featureSection">
                            <Form.Item name="testimonial1_name" label="Name">
                              <Input
                                name="testimonial1_name"
                                onChange={e => setformData({ ...formData, testimonial1_name: e.target.value })}
                              ></Input>
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            <Form.Item name="testimonial1_designation" label="Designation">
                              <Input
                                name="testimonial1_designation"
                                onChange={e => setformData({ ...formData, testimonial1_designation: e.target.value })}
                              ></Input>
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            <Form.Item name="testimonial1_message" label="Message">
                              <TextArea
                                name="testimonial1_message"
                                onChange={e => setformData({ ...formData, testimonial1_message: e.target.value })}
                              />
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            {/* <Form.Item name="testimonial1_image" label="Image">
                            <Input
                              name="testimonial1_image"
                              onChange={e => setformData({ ...formData, testimonial1_image: e.target.value })}
                            ></Input>
                          </Form.Item> */}
                            <Form.Item
                              name="testimonial1_image"
                              label="Image"
                              rules={[
                                {
                                  required: false,
                                  message: 'Please select Store Featured Image!',
                                },
                              ]}
                            >
                              <div className="overly-container">
                                <label for="file-input9" style={{ position: 'relative' }}>
                                  <div className="addpageupload categoryEditResult ">
                                    {/* {renderPictures(Images)} */}
                                    {TestMonials1?.length > 0 ? (
                                      <img
                                        className="imgse renderCategoryEdit  "
                                        src={TestMonials1}
                                        style={{ width: '35%' }}
                                      />
                                    ) : (
                                      <img className="imgse staticImagewid" src={StaticImageIcon4} />
                                    )}
                                  </div>
                                  {/* <div class="overlaytext">
                          <div class="text">Change Image</div>
                        </div> */}
                                </label>
                                <Input
                                  style={{ opacity: '0', height: '25%' }}
                                  name="image"
                                  label="Image"
                                  type="file"
                                  // datafield={image + '-' + i}
                                  onChange={e => imageHandleChange8(e)}
                                  id="file-input9"
                                />
                                {/* <div class="overlay">
                        <div className="text"></div>
                      </div> */}
                              </div>
                            </Form.Item>
                          </Col>
                        </div>
                      </Col>
                      <Col md={23} xs={24} className="mb-space" style={{ margin: '0 auto' }}>
                        <div className="homepSetting ">
                          <p className="border-b">
                            <b>Testimonial 2</b>
                          </p>
                          <Col md={24} xs={24} className="mb-space featureSection">
                            <Form.Item name="testimonial2_name" label="Name">
                              <Input
                                name="testimonial2_name"
                                onChange={e => setformData({ ...formData, testimonial2_name: e.target.value })}
                              ></Input>
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            <Form.Item name="testimonial2_designation" label="Designation">
                              <Input
                                name="testimonial2_designation"
                                onChange={e => setformData({ ...formData, testimonial2_designation: e.target.value })}
                              ></Input>
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            <Form.Item name="testimonial2_message" label="Message">
                              <TextArea
                                name="testimonial2_message"
                                onChange={e => setformData({ ...formData, testimonial2_message: e.target.value })}
                              />
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            {/* <Form.Item name="testimonial2_image" label="Image">
                            <Input
                              name="testimonial2_image"
                              onChange={e => setformData({ ...formData, testimonial2_image: e.target.value })}
                            ></Input>
                          </Form.Item> */}
                            <Form.Item
                              name="testimonial2_image"
                              label="Image"
                              rules={[
                                {
                                  required: false,
                                  message: 'Please select Store Featured Image!',
                                },
                              ]}
                            >
                              <div className="overly-container">
                                <label for="file-input10" style={{ position: 'relative' }}>
                                  <div className="addpageupload categoryEditResult ">
                                    {/* {renderPictures(Images)} */}
                                    {TestMonials2?.length > 0 ? (
                                      <img
                                        className="imgse renderCategoryEdit  "
                                        src={TestMonials2}
                                        style={{ width: '35%' }}
                                      />
                                    ) : (
                                      <img className="imgse staticImagewid" src={StaticImageIcon4} />
                                    )}
                                  </div>
                                  {/* <div class="overlaytext">
                          <div class="text">Change Image</div>
                        </div> */}
                                </label>
                                <Input
                                  style={{ opacity: '0', height: '25%' }}
                                  name="image"
                                  label="Image"
                                  type="file"
                                  // datafield={image + '-' + i}
                                  onChange={e => imageHandleChange9(e)}
                                  id="file-input10"
                                />
                                {/* <div class="overlay">
                        <div className="text"></div>
                      </div> */}
                              </div>
                            </Form.Item>
                          </Col>
                        </div>
                      </Col>
                    </Row>
                    <Row gutter={30}>
                      <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                        <Button
                          htmlType="submit"
                          type="success"
                          size="default"
                          className="btn-animation"
                          //onClick={AddSettings}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Cards>
              </div>
            </Col>
          </Row>

          <Row gutter={30} className="mtop">
            <Col md={24}>
              <div
                data-aos="fade-down"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>CTA Settings</h1>
              </div>
            </Col>
            <Col md={24}>
              <div
                data-aos="fade-up"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <Cards>
                  <Form
                    name="sDash_validation-form GeneralsettingsForm"
                    id="Formid"
                    //className="AddForm contactForm"
                    form={form}
                    layout="vertical"
                    onFinish={AddSettings}
                  >
                    <Row gutter={30} className="togglefield settingsform">
                      <Col md={16} xs={24} className="mb-space">
                        <Form.Item name="cta_title" label="Title ">
                          <Input
                            name="cta_title"
                            onChange={e => setformData({ ...formData, cta_title: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>

                      <Col md={16} xs={24} className="mb-space">
                        <Form.Item name="cta_subtitle" label="Subtitle">
                          <TextArea
                            name="cta_subtitle"
                            onChange={e => setformData({ ...formData, cta_subtitle: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={16} xs={24} className="mb-space">
                        <Form.Item name="cta_button_text" label="Button Text">
                          <Input
                            name="cta_button_text"
                            onChange={e => setformData({ ...formData, cta_button_text: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>

                      <Col md={16} xs={24} className="mb-space">
                        <Form.Item name="cta_button_link" label="Button Link">
                          <Input
                            name="cta_button_link"
                            onChange={e => setformData({ ...formData, cta_button_link: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={30}>
                      <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                        <Button
                          htmlType="submit"
                          type="success"
                          size="default"
                          className="btn-animation"
                          // onClick={AddSettings}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Cards>
              </div>
            </Col>
          </Row>

          <Row gutter={30} className="mtop">
            <Col md={24}>
              <div
                data-aos="fade-down"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>SEO Settings</h1>
              </div>
            </Col>
            <Col md={24}>
              <div
                data-aos="fade-up"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <Cards>
                  <Form
                    name="sDash_validation-form GeneralsettingsForm"
                    id="Formid"
                    //className="AddForm contactForm"
                    form={form}
                    layout="vertical"
                    onFinish={AddSettings}
                  >
                    <Row gutter={30} className="togglefield settingsform">
                      <Col md={16} xs={24} className="mb-space">
                        <Form.Item name="cta_title" label="Meta Title ">
                          <Input
                            name="cta_title"
                            onChange={e => setformData({ ...formData, meta_title: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>

                      <Col md={16} xs={24} className="mb-space">
                        <Form.Item name="cta_subtitle" label="Meta Subtitle">
                          <TextArea
                            name="cta_subtitle"
                            onChange={e => setformData({ ...formData, meta_subtitle: e.target.value })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={16} xs={24} className="mb-space">
                        <Form.Item name="cta_button_text" label="Meta Keyword">
                          <Input
                            name="cta_button_text"
                            onChange={e => setformData({ ...formData, meta_keyword: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={30}>
                      <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                        <Button
                          htmlType="submit"
                          type="success"
                          size="default"
                          className="btn-animation"
                          // onClick={AddSettings}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Cards>
              </div>
            </Col>
          </Row>

          <Row gutter={30} className="mtop">
            <Col md={24}>
              <div
                data-aos="fade-down"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Footer Settings</h1>
              </div>
            </Col>
            <Col md={24}>
              <div
                data-aos="fade-up"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <Cards>
                  <Form
                    name="sDash_validation-form GeneralsettingsForm"
                    id="Formid"
                    //className="AddForm contactForm"
                    form={form}
                    layout="vertical"
                    onFinish={AddSettings}
                  >
                    <Row gutter={30} className="togglefield settingsform">
                      <Col md={16} xs={24} className="mb-space">
                        <Form.Item name="copyright" label="Copyright Text">
                          <Input
                            name="copyright"
                            onChange={e => setformData({ ...formData, copyright: e.target.value })}
                          ></Input>
                        </Form.Item>
                      </Col>
                      <Col md={16} xs={24} className="togglefield settingsToggle">
                        <div className="homeToggle">
                          <Form.Item
                            name="enable_footer"
                            initialValue=""
                            label="Enable Footer Links (Enabled)"
                          ></Form.Item>
                          <Switch
                            checked={formData?.enable_footer}
                            name="enable_footer"
                            className="homeswitch"
                            onChange={e => setformData({ ...formData, enable_footer: e })}
                          />
                        </div>
                      </Col>
                      <Col md={16} xs={24} className="mb-space">
                        <div className="homepSetting ">
                          <p className="border-b">
                            <b>Link 1</b>
                          </p>
                          <Col md={24} xs={24} className="mb-space featureSection">
                            <Form.Item name="footerlink_text1" label="Link Text">
                              <Input
                                name="footerlink_text1"
                                onChange={e => setformData({ ...formData, footerlink_text1: e.target.value })}
                              />
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            <Form.Item name="footerlink_link1" label="Link">
                              <Input
                                name="footerlink_link1"
                                onChange={e => setformData({ ...formData, footerlink_link1: e.target.value })}
                              />
                            </Form.Item>
                          </Col>
                        </div>
                      </Col>
                      <Col md={16} xs={24} className="mb-space">
                        <div className="homepSetting ">
                          <p className="border-b">
                            <b>Link 2</b>
                          </p>
                          <Col md={24} xs={24} className="mb-space featureSection">
                            <Form.Item name="footerlink_text2" label="Link Text">
                              <Input
                                name="footerlink_text2"
                                onChange={e => setformData({ ...formData, footerlink_text2: e.target.value })}
                              />
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            <Form.Item name="footerlink_link2" label="Link">
                              <Input
                                name="footerlink_link2"
                                onChange={e => setformData({ ...formData, footerlink_link2: e.target.value })}
                              />
                            </Form.Item>
                          </Col>
                        </div>
                      </Col>
                      <Col md={16} xs={24} className="mb-space">
                        <div className="homepSetting ">
                          <p className="border-b">
                            <b>Link 3</b>
                          </p>
                          <Col md={24} xs={24} className="mb-space featureSection">
                            <Form.Item name="footerlink_text3" label="Link Text">
                              <Input
                                name="footerlink_text3"
                                onChange={e => setformData({ ...formData, footerlink_text3: e.target.value })}
                              />
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            <Form.Item name="footerlink_link3" label="Link">
                              <Input
                                name="footerlink_link3"
                                onChange={e => setformData({ ...formData, footerlink_link3: e.target.value })}
                              />
                            </Form.Item>
                          </Col>
                        </div>
                      </Col>
                      <Col md={16} xs={24} className="mb-space">
                        <div className="homepSetting ">
                          <p className="border-b">
                            <b>Link 4</b>
                          </p>
                          <Col md={24} xs={24} className="mb-space featureSection">
                            <Form.Item name="footerlink_text4" label="Link Text">
                              <Input
                                name="footerlink_text4"
                                onChange={e => setformData({ ...formData, footerlink_text4: e.target.value })}
                              />
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            <Form.Item name="footerlink_link4" label="Link">
                              <Input
                                name="footerlink_link4"
                                onChange={e => setformData({ ...formData, footerlink_link4: e.target.value })}
                              />
                            </Form.Item>
                          </Col>
                        </div>
                      </Col>
                      <Col md={16} xs={24} className="mb-space">
                        <div className="homepSetting ">
                          <p className="border-b">
                            <b>Link 5</b>
                          </p>
                          <Col md={24} xs={24} className="mb-space featureSection">
                            <Form.Item name="footerlink_text5" label="Link Text">
                              <Input
                                name="footerlink_text5"
                                onChange={e => setformData({ ...formData, footerlink_text5: e.target.value })}
                              />
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            <Form.Item name="footerlink_link5" label="Link">
                              <Input
                                name="footerlink_link5"
                                onChange={e => setformData({ ...formData, footerlink_link5: e.target.value })}
                              />
                            </Form.Item>
                          </Col>
                        </div>
                      </Col>
                      <Col md={16} xs={24} className="mb-space">
                        <div className="homepSetting ">
                          <p className="border-b">
                            <b>Link 6</b>
                          </p>
                          <Col md={24} xs={24} className="mb-space featureSection">
                            <Form.Item name="footerlink_text6" label="Link Text">
                              <Input
                                name="footerlink_text6"
                                onChange={e => setformData({ ...formData, footerlink_text6: e.target.value })}
                              />
                            </Form.Item>
                          </Col>
                          <Col md={24} xs={24} className="mb-space">
                            <Form.Item name="footerlink_link6" label="Link">
                              <Input
                                name="footerlink_link6"
                                onChange={e => setformData({ ...formData, footerlink_link6: e.target.value })}
                              />
                            </Form.Item>
                          </Col>
                        </div>
                      </Col>
                      <Col md={16} xs={24} className="togglefield settingsToggle">
                        <div className="homeToggle">
                          <Form.Item
                            name="enable_social_link"
                            initialValue=""
                            label="Enable Footer Links (Enabled)
"
                          ></Form.Item>
                          <Switch
                            checked={formData?.enable_social_link}
                            name="enable_social_link"
                            className="socialswitch_main"
                            onChange={e => setformData({ ...formData, enable_social_link: e })}
                            //checked={editASwitch} onChange={() => seteditASwitch(!editASwitch)}
                          />
                        </div>
                      </Col>
                      <Col md={16} xs={24} className="togglefield settingsToggle">
                        <div className="homefooterDiv">
                          <div className="facbookDiv">
                            <p>Facebook</p>
                            <Switch
                              checked={formData?.facebook}
                              className="homeswitch"
                              name="facebook"
                              onChange={e => setformData({ ...formData, facebook: e })}
                              //checked={editASwitch} onChange={() => seteditASwitch(!editASwitch)}
                            />
                          </div>
                          <div className="inPutfooter">
                            <FormItem name="facebookLink">
                              <Input
                                name="facebookLink"
                                onChange={e => setformData({ ...formData, facebookLink: e.target.value })}
                              />
                            </FormItem>
                          </div>
                        </div>
                      </Col>
                      <Col md={16} xs={24} className="togglefield settingsToggle">
                        <div className="homefooterDiv">
                          <div className="facbookDiv">
                            <p>Twitter</p>
                            <Switch
                              checked={formData?.twitter}
                              className="homeswitch"
                              name="twitter"
                              onChange={e => setformData({ ...formData, twitter: e })}
                              //checked={editASwitch} onChange={() => seteditASwitch(!editASwitch)}
                            />
                          </div>
                          <div className="inPutfooter">
                            <FormItem name="twitterLink">
                              <Input
                                name="twitterLink"
                                onChange={e => setformData({ ...formData, twitterLink: e.target.value })}
                              />
                            </FormItem>
                          </div>
                        </div>
                      </Col>
                      <Col md={16} xs={24} className="togglefield settingsToggle">
                        <div className="homefooterDiv">
                          <div className="facbookDiv">
                            <p>Youtube</p>
                            <Switch
                              checked={formData?.youtube}
                              className="homeswitch"
                              name="youtube"
                              onChange={e => setformData({ ...formData, youtube: e })}
                              //checked={editASwitch} onChange={() => seteditASwitch(!editASwitch)}
                            />
                          </div>
                          <div className="inPutfooter">
                            <FormItem name="youTubeLink">
                              <Input
                                name="youTubeLink"
                                onChange={e => setformData({ ...formData, youTubeLink: e.target.value })}
                              />
                            </FormItem>
                          </div>
                        </div>
                      </Col>
                      <Col md={16} xs={24} className="togglefield settingsToggle">
                        <div className="homefooterDiv">
                          <div className="facbookDiv">
                            <p>Instagram</p>

                            <Switch
                              checked={formData?.instagram}
                              className="homeswitch"
                              name="instagram"
                              onChange={e => setformData({ ...formData, instagram: e })}
                              //checked={editASwitch} onChange={() => seteditASwitch(!editASwitch)}
                            />
                          </div>
                          <div className="inPutfooter">
                            <FormItem name="instagramLink">
                              <Input
                                name="instagramLink"
                                onChange={e => setformData({ ...formData, instagramLink: e.target.value })}
                              />
                            </FormItem>
                          </div>
                        </div>
                      </Col>
                      <Col md={16} xs={24} className="togglefield settingsToggle">
                        <div className="homefooterDiv">
                          <div className="facbookDiv">
                            <p>Linkedin</p>
                            <Switch
                              className="homeswitch"
                              name="linkedin"
                              checked={formData?.linkedin}
                              onChange={e => setformData({ ...formData, linkedin: e })}
                              //checked={editASwitch} onChange={() => seteditASwitch(!editASwitch)}
                            />
                          </div>
                          <div className="inPutfooter">
                            <FormItem name="linkedinLink">
                              <Input
                                name="linkedinLink"
                                onChange={e => setformData({ ...formData, linkedinLink: e.target.value })}
                              />
                            </FormItem>
                          </div>
                        </div>
                      </Col>
                      <Col md={16} xs={24} className="togglefield settingsToggle">
                        <div className="homefooterDiv">
                          <div className="facbookDiv">
                            <p>Github </p>
                            <Switch
                              className="homeswitch"
                              name="github"
                              checked={formData?.github}
                              onChange={e => setformData({ ...formData, github: e })}
                              //checked={editASwitch} onChange={() => seteditASwitch(!editASwitch)}
                            />
                          </div>
                          <div className="inPutfooter">
                            <FormItem name="githubLink">
                              <Input
                                name="githubLink"
                                onChange={e => setformData({ ...formData, githubLink: e.target.value })}
                              />
                            </FormItem>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row gutter={30}>
                      <Col md={24} xs={24} style={{ textAlign: 'right' }} className="mainteneceBtn">
                        <Button htmlType="submit" type="success" size="default" className="btn-animation">
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Cards>
              </div>
            </Col>
          </Row>
        </Main>
        ;
      </Spin>
    </>
  );
};

export default HomePageSetting;
