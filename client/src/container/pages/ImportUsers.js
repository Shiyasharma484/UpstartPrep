import React, { useState, useEffect } from 'react';

import { Form, notification, Select, Col, Row, Input, Switch, Space, Images } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useHistory } from 'react-router-dom';
import { headers } from '../../helpers/variables';
import { Main } from '../styled';
import { Button } from '../../components/buttons/buttons';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import authorizes from '../../../src/static/img/authorized.png';
import Cookies from 'js-cookie';
import {
  get_api_request,
  post_api_request,
  put_api_request,
  delete_api_request,
  api_url,
} from '../../helpers/Common.js';
import { Cards } from '../../components/cards/frame/cards-frame';
const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
import { imageRender } from '../../helpers/renderImage';
import imageUploadSave from '../../helpers/uploadImage';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const url = domainpath + '/attachment/upload/doc';

var ModuleName = 'MANAGE USERS';
const ImportUsers = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [RoleData, setRoleData] = useState([]);
  const [imageURL, setImageURL] = useState(null);
  const [Images, setImages] = useState([]);
  const [skillsdataarray, setskillsdataarray] = useState();
  const [formData, setformData] = useState({
    skills: '',
  });
  useEffect(() => {
    async function GetAllRoles() {
      const url = api_url.get_roles;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        console.log(response);
        const roledata = response?.data?.responsedata?.roles;
        setRoleData(roledata);
      } else {
        console.log('error');
      }
    }
    GetAllRoles();
    console.log(RoleData);
  }, []);

  const CopyToClipboard = e => {
    navigator.clipboard.writeText(e);
    notification.success({
      message: `Copied Successfully ${e}`,
    });
  };
  const imageHandleChange = async (e, index) => {
    var vfile;
    vfile = e.target.files;
    console.log(vfile);

    //var singleimage = imageRender(vfile);
    //setImages(singleimage);
    await imageUploadSave(vfile, url, headers)
      .then(resp => {
        //setImageURL(resp);
        console.log(resp);
      })
      .catch(error => {
        console.log(error);
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };
  return (
    <>
      <Main className="UsersForm">
        <div
          data-aos="fade-down"
          data-aos-offset="10"
          data-aos-delay="50"
          data-aos-duration="1500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="center"
        ></div>
        <div className="HeadingUsers">
          <h3 style={{ fontSize: '22px', color: 'rgb(20 19 19)' }}>Import Users</h3>
        </div>
        <Cards>
          <Row gutter={25}>
            <Col md={24} xl={24} className="downloadHeading">
              <div className="download-innerdiv">
                <svg height="27" viewBox="0 0 48 54.2" width="24" xmlns="http://www.w3.org/2000/svg">
                  <g id="xlsx" transform="translate(-24.36 5)">
                    <path
                      d="M76.323,19.387h-1.3v-6.28a1.041,1.041,0,0,0-.011-.119,1.043,1.043,0,0,0-.253-.688L64.307.363S64.3.359,64.3.356a1.046,1.046,0,0,0-.212-.178c-.023-.015-.046-.028-.069-.041a1.116,1.116,0,0,0-.21-.088c-.02-.005-.037-.013-.057-.018A1.056,1.056,0,0,0,63.507,0H37.825A2.128,2.128,0,0,0,35.7,2.126V19.387H34.4a3.038,3.038,0,0,0-3.038,3.038v15.8A3.039,3.039,0,0,0,34.4,41.26h1.3V52.075A2.127,2.127,0,0,0,37.825,54.2H72.9a2.128,2.128,0,0,0,2.125-2.125V41.26h1.3a3.038,3.038,0,0,0,3.038-3.038v-15.8A3.037,3.037,0,0,0,76.323,19.387ZM37.825,2.126h24.62V13a1.063,1.063,0,0,0,1.063,1.063H72.9v5.324H37.825Zm21.532,28.98c-2.088-.727-3.451-1.883-3.451-3.711,0-2.145,1.79-3.786,4.756-3.786a7.693,7.693,0,0,1,3.207.634l-.634,2.293a5.982,5.982,0,0,0-2.629-.6c-1.231,0-1.828.56-1.828,1.213,0,.8.709,1.156,2.331,1.772,2.219.821,3.263,1.977,3.263,3.749,0,2.108-1.623,3.9-5.073,3.9a8.217,8.217,0,0,1-3.562-.765l.578-2.35a7.261,7.261,0,0,0,3.152.784c1.307,0,2-.541,2-1.362C61.464,32.094,60.867,31.646,59.357,31.105ZM54.547,34v2.388H46.694V23.812h2.855V34ZM37.576,36.384H34.331l3.637-6.361-3.507-6.211h3.264l1.1,2.294c.373.765.653,1.379.952,2.089h.036c.3-.8.541-1.362.858-2.089l1.063-2.294h3.245l-3.544,6.135,3.731,6.436H41.883l-1.138-2.276c-.465-.875-.764-1.529-1.119-2.256h-.037c-.261.727-.578,1.381-.97,2.256ZM72.9,51.5H37.825V41.26H72.9V51.5Zm.019-15.116-1.138-2.276c-.466-.876-.764-1.529-1.119-2.256h-.036c-.262.728-.579,1.38-.971,2.256l-1.043,2.276H65.361L69,30.022l-3.506-6.211h3.264l1.1,2.294c.373.765.652,1.379.951,2.089h.037c.3-.8.54-1.362.857-2.089l1.063-2.294h3.246l-3.544,6.135,3.73,6.436H72.915Z"
                      data-name="main"
                      fill="#1d6f42"
                      id="main"
                      transform="translate(-7 -5)"
                    ></path>
                  </g>
                </svg>
                <p>Download Sample Excel</p>
              </div>
            </Col>
            <Col md={24} xl={24} className="upload_file">
              <Input
                //style={{ opacity: '0' }}
                name="image"
                label="Image"
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                // datafield={image + '-' + i}
                onChange={e => imageHandleChange(e)}
                id="file-input2"
                //value={index[0]}
              />
            </Col>
            <Col md={24} xl={24} className="downloadHeading">
              <Button className="buttonUpload" htmlType="submit" type="success">
                Upload File
              </Button>
            </Col>
            <Col md={24} xl={24} className="instructiondiv">
              <h3>Instructions</h3>
              <ul>
                <li>Password must be 8 characters.</li>
                <li>
                  Accepted values for Email Verified are{' '}
                  <span className="copyinstruction">
                    <i class="fa fa-files-o" aria-hidden="true"></i> yes
                  </span>{' '}
                  <span className="copyinstruction">
                    <i class="fa fa-files-o" aria-hidden="true"></i> no
                  </span>
                </li>
              </ul>
            </Col>
            <Col md={24} xl={24} className="userRole">
              <h3> User Roles</h3>
            </Col>
            <Col md={24} xl={24} className="userRole">
              <table className="userRole-Table" style={{ width: '100%' }}>
                <tr>
                  <th>Name</th>
                  <th>Acceptable Code</th>
                </tr>
                {RoleData?.map((item, index) => (
                  <tr>
                    <td>{item.title}</td>
                    <td>
                      <span className="copyinstruction" onClick={() => CopyToClipboard(item.title)}>
                        <i class="fa fa-files-o" aria-hidden="true"></i> {item.title}
                      </span>
                    </td>
                  </tr>
                ))}
              </table>
            </Col>
          </Row>
        </Cards>
      </Main>
    </>
  );
};
export default ImportUsers;
