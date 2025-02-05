import React, { useState, useEffect } from 'react';

import { Form, notification, Select, Col, Row, Input, Switch, Space } from 'antd';
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
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

var ModuleName = 'DASHBOARD';
const ImportantQuestions = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [levelsdata, setlevelsData] = useState([]);
  const [skillsdataarray, setskillsdataarray] = useState();
  const [formData, setformData] = useState({
    skills: '',
  });
  useEffect(() => {
    async function getallskills() {
      const url = api_url.get_skills;
      const response = await get_api_request(url, headers);
      //console.log(response);
      if (response.status == 200) {
        const skillsdata = response?.data?.responsedata;
        // console.log(skillsdata);
        const skillsarray = skillsdata.map(items => {
          //console.log(items);
          return { id: items.id, name: items.skill_name };
        });
        setskillsdataarray(skillsarray);
      } else {
        notification.error({ message: response?.message });
      }
    }
    getallskills();
    var Questionsdata = [
      {
        id: '1',
        value: 'Multiple Choice Single Answer',
        code: 'MSA',
      },
      {
        id: '2',
        value: ' Multiple Choice Multi Answer',
        code: 'MMA',
      },
      {
        id: '3',
        value: 'True or False',
        code: 'TQF',
      },
      {
        id: '4',
        value: 'Short Answer',
        code: 'SQA',
      },
      {
        id: '5',
        value: 'Match the Following',
        code: 'MTF',
      },
      {
        id: '6',
        value: 'Ordering/Sequence',
        code: 'ORD',
      },
      {
        id: '7',
        value: 'Fill the Blanks',
        code: 'FIB',
      },
    ];
    setData(Questionsdata);

    async function Getallmodules(data) {
      const url = api_url.getall_modules;
      const response = await get_api_request(url, data, headers);
      //console.log(response);
      if (response.status == 200) {
        const Moduledata = response?.data?.responsedata?.modules;
        const getmodules = Moduledata.map(items => {
          // console.log(items);
          if (items.name == 'Levels') {
            const parentdata = items?.parent_id;
            async function getentitybyparentid() {
              const url = api_url.get_entity_byparentid + parentdata;
              const response = await get_api_request(url, data, headers);
              console.log(response);
              const questiontypedata = response?.data?.responsedata;
              setlevelsData(questiontypedata);
            }

            getentitybyparentid();
          } else if (items.name == 'QUESTION TYPES') {
            //console.log(items);
            const parentdata = items?.parent_id;
            async function getquestiontype_entitybyparentid() {
              const url = api_url.get_entity_byparentid + parentdata;
              const response = await get_api_request(url, data, headers);
              console.log(response);
              const questiontypedata = response?.data?.responsedata;
              setData(questiontypedata);
            }

            getquestiontype_entitybyparentid();
          }
        });
      } else {
        console.log('error');
      }
    }
    Getallmodules();
  }, []);

  const CopyToClipboard = e => {
    navigator.clipboard.writeText(e);
    notification.success({
      message: `Copied Successfully ${e}`,
    });
  };

  const columns1 = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Acceptable Code',
      selector: row => (
        <>
          {row.code ? (
            <p onClick={() => CopyToClipboard(row.code)}>
              <i class="fa fa-files-o" aria-hidden="true"></i> {row.code}
            </p>
          ) : (
            ''
          )}
        </>
      ),
      style: {
        background: '#2196F3',
        display: 'inline-flex',
        alignItems: 'center',
        flexGrow: '0.2',
        marginRight: '37%',
        color: '#fff',
        cursor: 'pointer',
      },
      sortable: true,
    },
  ];

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Acceptable Code',
      selector: row => (
        <>
          <p onClick={() => CopyToClipboard(row.code)}>
            <i class="fa fa-files-o" aria-hidden="true"></i> {row.code}
          </p>
        </>
      ),
      sortable: true,
      style: {
        background: '#2196F3',
        display: 'inline-flex',
        alignItems: 'center',
        flexGrow: '0.2',
        marginRight: '37%',
        color: '#fff',
        cursor: 'pointer',
      },
    },
  ];

  const tableData = {
    columns,
    data,
  };
  return (
    <>
      <Main>
        <div
          data-aos="fade-down"
          data-aos-offset="10"
          data-aos-delay="50"
          data-aos-duration="1500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="center"
        >
          <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Import Questions</h1>
        </div>
        <section className="SectionTabsMainTop">
          <Cards>
            <Col md={24} xs={24}>
              <div
                data-aos="fade-up"
                data-aos-offset="10"
                data-aos-delay="50"
                data-aos-duration="1500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="center"
              >
                <Form.Item name="skills" rules={[{ message: 'Please Select your Skills!' }]}>
                  <label>Choose Skills</label>
                  <Select
                    onChange={selectedValue => {
                      setformData({ ...formData, skill: selectedValue });
                    }}
                  >
                    {skillsdataarray?.map(item => (
                      <Option value={item?.id}>{item.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </Col>
            <div
              data-aos="fade-up"
              data-aos-offset="10"
              data-aos-delay="50"
              data-aos-duration="1500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="center"
            >
              <Col md={8} xs={24}>
                <Form.Item name="file">
                  <Input style={{ border: 'none' }} type="file"></Input>
                </Form.Item>
              </Col>
            </div>
            <Col md={16} xs={24}></Col>

            <div
              data-aos="fade-left"
              data-aos-offset="10"
              data-aos-delay="50"
              data-aos-duration="1500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="center"
            >
              <Col md={24} xs={24}>
                <Button type="success" size="default" className="btn-animation pull-right">
                  Upload File
                </Button>
              </Col>
            </div>
            <br />
            <br />
            <hr></hr>
            <div
              data-aos="fade-left"
              data-aos-offset="10"
              data-aos-delay="50"
              data-aos-duration="1500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="center"
            >
              <Button
                className="pull-right btn-animation"
                onClick={() => history.push(`../users/add-questiontype`)}
                size="small"
                key="5"
                type="success"
              >
                <FeatherIcon icon="plus" size={14} />
                Add Questions Type
              </Button>
              <h2>Questions Types</h2>
            </div>
            {/* <div
              data-aos="fade-up"
              data-aos-offset="10"
              data-aos-delay="50"
              data-aos-duration="1500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="center"
            > */}
            <DataTable
              columns={columns}
              data={data}
              //defaultSortField="id"
              defaultSortAsc={false}
              pagination
              highlightOnHover
            />
            {/* </div> */}

            <div
              data-aos="fade-left"
              data-aos-offset="10"
              data-aos-delay="50"
              data-aos-duration="1500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="center"
            >
              <Button
                className="pull-right btn-animation"
                onClick={() => history.push(`../users/add-difficultylevel`)}
                size="small"
                key="5"
                type="success"
              >
                <FeatherIcon icon="plus" size={14} />
                Add Difficulty Level
              </Button>
              <h2>Difficulty Levels</h2>
            </div>
            {/* <div
              data-aos="fade-up"
              data-aos-offset="10"
              data-aos-delay="50"
              data-aos-duration="1500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="center"
            > */}
            <DataTable
              columns={columns1}
              data={levelsdata}
              //defaultSortField="id"
              defaultSortAsc={false}
              pagination
              highlightOnHover
            />
            {/* </div> */}
          </Cards>
        </section>
      </Main>
    </>
  );
};
export default ImportantQuestions;
