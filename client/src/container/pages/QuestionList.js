import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Row, Input, Switch } from 'antd';
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
const client_domain = process.env.REACT_APP_DOMAIN;
var ModuleName = 'DASHBOARD';
const QuestionList = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [form] = Form.useForm();
  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);
  const [render, setrender] = useState(0);
  const [ShowUserGroup, setShowUserGroup] = useState(false);
  const [addnewoptions, setaddnewoptions] = useState(false);
  const [Questiontypedataarray, setQuestiontypedataarray] = useState();
  const [sidebaroptions, setsidebaroptions] = useState(false);
  const [optiondata, setoptiondata] = useState();
  const access_token = Cookies.get('access_token');
  useEffect(() => {
    async function Getallmodules() {
      const url = api_url.getall_modules;

      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const Moduledata = response?.data?.responsedata?.modules;
        const getmodules = Moduledata.map(items => {
          if (items.name == 'QUESTION TYPES') {
            const parentdata = items?.parent_id;

            async function getquestiontype() {
              const url = api_url.getquestion_type_byparent + parentdata;
              const response = await get_api_request(url, headers);

              if (response.status == 200) {
                const Questiontypedata = response?.data?.responsedata;

                const questiontypelist = Questiontypedata?.map(items => {
                  return { id: items.id, name: items.name };
                });

                setoptiondata(questiontypelist);
              } else {
                console.log('error');
              }
            }
            getquestiontype();
          }
        });
      } else {
        console.log('error');
      }
    }
    Getallmodules();

    async function getallquestion() {
      const url = api_url.getallquestions;
      console.log(url);
      const response = await get_api_request(url, headers);
      console.log(response);
      if (response.status == 200) {
        const usersdata = response?.data?.responsedata;

        setData(usersdata);
      } else {
        console.log('error');
      }
    }
    getallquestion();
    console.log(render);
  }, [render]);

  /*HANDLE VIEW=================================START */
  const handleView = e => {
    const ids = e.split(',');
    const actionid = ids?.[0];
    const rowid = ids?.[1];
    const encryptedID = encrypttheid(rowid);
    if (actionid == '1') {
      setShowUserGroup(true);
    } else if (actionid == '2') {
      history.push(`../library/edit-questions/${encryptedID}`);
    } else if (actionid == '3') {
      handleDelete(rowid);
    }
  };
  const handleaddnew = e => {
    setaddnewoptions(!addnewoptions);

    // {
    //   addnewoptions == true ? setaddnewoptions(false) : '';
    // }
  };
  const handlequestions = e => {
    console.log(e);
    const redirectids = e.split(',');
    const name = redirectids?.[0];
    const id = redirectids?.[1];
    const encryptedID = encrypttheid(id);
    if (name == 'Short Answer') {
      history.push(`../library/add-shortquestions/${encryptedID}`);
    } else if (name == 'Match the Following') {
      history.push(`../library/add-matchquestions/${encryptedID}`);
    } else if (name == 'Ordering Sequence') {
      history.push(`../library/add-squence-questions/${encryptedID}`);
    } else if (name == 'Fill the Blanks') {
      history.push(`../library/add-fillblanks/${encryptedID}`);
    } else if (name == 'Multi Choice Multi Answer') {
      history.push(`../library/add-muliple-questions/${encryptedID}`);
    } else {
      history.push(`../library/add-singlequestion/${encryptedID}`);
    }
  };

  const handleDelete = id => {
    var deletedrowid = id;
    var column = 'id';
    async function deleteData(id) {
      console.log(id);
      const url = api_url.delete_questionby_id + id;
      const response = await delete_api_request(url, headers);
      console.log(response);
      if (response.status === 201) {
        notification.success({
          message: 'Question Deleted Successfully',
        });
        console.log(data);

        const afterdeletedata = data.filter(item => {
          if (column !== '') {
            return item[column] !== deletedrowid;
          }
          return item;
        });
        console.log(afterdeletedata);
        setData(afterdeletedata);
        setrender(render + 1);
      } else if (response.status === 400) {
        alert(response.data.message);
      } else {
        alert('Error');
      }
      // });
    }
    deleteData(id);
  };
  const CopyToClipboard = e => {
    const id = encrypttheid(e);
    console.log(e);
    navigator.clipboard.writeText(`${client_domain}/dashboard/library/edit-questions/${id}`);
    notification.success({
      message: `Copied Successfully ${client_domain}/dashboard/library/edit-questions/${id}`,
    });
  };

  const columns = [
    {
      name: 'CODE',
      selector: row => (
        <>
          <p onClick={() => CopyToClipboard(row.id)}>
            <i class="fa fa-files-o" aria-hidden="true"></i> {encrypttheid(row.id)}
          </p>
        </>
      ),
      style: {
        background: '#2196F3',
        display: 'inline-flex',
        alignItems: 'center',
        flexGrow: '0',
        marginRight: '13%',
        color: '#fff',
        cursor: 'pointer',
      },
      sortable: true,
    },
    {
      name: 'Question',

      selector: row => row?.questions.replace(/(<p[^>]+?>|<p>|<\/p>)/gim, ''),
      sortable: true,
    },
    {
      name: 'Type',
      selector: row => row?.question_type,
      sortable: true,
    },
    {
      name: 'Section',
      selector: row => row?.section_name,
      sortable: true,
    },
    {
      name: 'Skill',
      selector: row => row?.skill_name,
      sortable: true,
    },
    {
      name: 'Topic',
      selector: row => row?.topic_name,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => (
        <>
          <span className={`status ${row.active === 1 ? 'Success' : 'error'}`}>
            {row.active === 1 ? 'Active' : 'Inactive'}
          </span>
        </>
      ),
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className="datatable-actions">
          <Select
            className="Quizz_actions"
            defaultValue="Actions"
            onSelect={e => {
              handleView(e + ',' + row?.id);
              //console.log(row?.id);
              // setrowid(row?.id);
            }}
          >
            <Option value={1}>Preview</Option>
            <Option value={2}>Edit</Option>
            <Option value={3}>Delete</Option>
          </Select>
        </div>
      ),
    },
  ];

  const tableData = {
    columns,
    data,
  };

  return (
    <>
      <Main>
        <div key="1" className="page-header-actions">
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
            <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Questions</h1>
          </div>
          <div className="importNewBTN">
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
              <Button
                className="btn-animation"
                onClick={() => history.push(`../users/import-questions`)}
                size="small"
                key="4"
                type="dark"
              >
                Import Questions
              </Button>
            </div>
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
              <Button className="btn-animation" onClick={e => handleaddnew(e)} size="small" key="5" type="success">
                <FeatherIcon icon="plus" size={14} />
                New Questions
              </Button>
            </div>
          </div>
          {addnewoptions != false ? (
            <div className="questions_type">
              <Cards>
                {optiondata?.map(items => (
                  <a
                    onClick={e => handlequestions(items?.name + ',' + items?.id)}
                    value={items?.id}
                    className="options_value"
                  >
                    {items?.name}
                  </a>
                ))}
              </Cards>
            </div>
          ) : (
            ''
          )}
        </div>
        {/* <div
          data-aos="fade-up"
          data-aos-offset="10"
          data-aos-delay="50"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="center"
        > */}
        <DataTableExtensions {...tableData}>
          <DataTable
            className="tableHeading"
            columns={columns}
            data={data}
            defaultSortField="id"
            defaultSortAsc={false}
            pagination
            highlightOnHover
          />
        </DataTableExtensions>
        {/* </div> */}
      </Main>
      {ShowUserGroup != false ? (
        <div className="Main-headerDiv">
          <div className="inner-headerDiv">
            <div className="headerDiv">
              <p>Question Preview</p>
              <div className="crossIcon">
                <a onClick={() => setShowUserGroup(false)}>X</a>
              </div>
            </div>
            <Main>
              <Cards>
                <p
                  className="examtype"
                  style={{ color: 'rgb(81 157 119', background: '#a4f7ce', width: 'fit-content' }}
                >
                  Reading
                </p>
                <p>sdc</p>
                {sidebaroptions != true ? (
                  <a className="options-text" onClick={() => setsidebaroptions(true)}>
                    View Options
                  </a>
                ) : (
                  ''
                )}
                <br />
                {sidebaroptions != false ? (
                  <>
                    <input style={{ Width: '100%' }} defaultValue="test" readOnly /> <br />
                    <a className="options-text" onClick={() => setsidebaroptions(false)}>
                      Hide Options
                    </a>
                  </>
                ) : (
                  ''
                )}
                <p>
                  <b>Questions Type:</b>Multiple Choice Answer
                </p>
                <p>
                  <b>Marks/Points:</b>1 XP
                </p>
                <p>
                  <b>Attachments:</b>No Attachments
                </p>
              </Cards>
            </Main>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default QuestionList;
