import React, { lazy, Suspense, useState, useEffect  } from 'react';
import Axios from 'axios';
import FeatherIcon from 'feather-icons-react';
import { DashboardBaseStyleWrap } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import Palette from '../../components/color-palette/palette';
import config from '../../config/config';
import Heading from '../../components/heading/heading';
import { Route, NavLink, useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { headers } from '../../helpers/variables';
import { Row, Col, Form, Input, Select, notification, Image } from 'antd';
import { Switch } from 'antd';
//import logo from 'http://localhost:3001/static/media/ezmoov_black_1.8ffbba0b.png';

// @Todo console warning from button
const { imageRender } = require('../../helpers/renderImage');
import imageUploadSave from '../../helpers/uploadImage';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const { theme } = config;
const SystemSettings = () => {
  const [form] = Form.useForm();

  const [logoImages, setLogoImages] = useState([]);
  const [logoImageURL, setLogoImageURL] = useState(null);
  const [iconImages, setIconImages] = useState([]);
  const [iconImageURL, setIconImageURL] = useState(null);
  const [badgesImages, setBadgesImages] = useState([]);
  const [badgesImageURL, setBadgesImageURL] = useState(null);

  //const [imageURL, setImageURL] = useState(null);
  const url = domainpath + '/images/storeuser';

  const [invoiceData, setInvoiceData] = useState([]);
  const [invoiceDetail, setInvoiceDetail] = useState([]);
  const params = useParams();


  const imageHandleChange = async e => {
    var fieldsname;
    var vfile;
    fieldsname = e.target.name;
    vfile = e.target.files;
    console.log(fieldsname);
    var updateimg = [];

    var singleimage = imageRender(vfile);

    setLogoImages(singleimage);
    await imageUploadSave(vfile, url)
      .then(resp => {
        console.log(resp, 'resp');
        setLogoImageURL(resp);
      })
      .catch(error => {
        console.log(error);
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };
  const renderPictures = source => {
    return source.map((pictures, index) => {
      return <Image src={pictures} key={pictures} />;
    });
  };  
const handlesubmit = fieldsvalue =>{
  fieldsvalue['logo_images'] = logoImageURL;
  fieldsvalue['icon_images'] = iconImageURL;
  fieldsvalue['bages_images'] = badgesImageURL;
  fieldsvalue['bages_images'] = badgesImageURL;
  console.log(fieldsvalue);
}
const iconHandleChange = async e => {
  var fieldsname;
  var vfile;
  fieldsname = e.target.name;
  vfile = e.target.files;
  console.log(fieldsname);
  var updateimg = [];

  var singleimage = imageRender(vfile);

   setIconImages(singleimage);
      await imageUploadSave(vfile, url)
        .then(resp => {
          console.log(resp, 'resp');
          setIconImageURL(resp);
        })
        .catch(error => {
          console.log(error);
          notification.error({
            message: error?.response?.data?.message,
          });
        });
};
const badgesHandleChange= async e => {
  var fieldsname;
  var vfile;
  fieldsname = e.target.name;
  vfile = e.target.files;
  console.log(fieldsname);
  var updateimg = [];

  var singleimage = imageRender(vfile);
        setBadgesImages(singleimage);
        await imageUploadSave(vfile, url)
          .then(resp => {
            console.log(resp, 'resp');
            setBadgesImageURL(resp);
          })
          .catch(error => {
            console.log(error);
            notification.error({
              message: error?.response?.data?.message,
            });
          });
  
};
useEffect(() => {

}, []);
  return (
    <>
     
    </>
  );
};

export default SystemSettings;
