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
import TextArea from 'antd/lib/input/TextArea';
const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

var ModuleName = 'DASHBOARD';
const QuestionsTypes = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  // const [levelsdata, setlevelsData] = useState([]);
  const [Showfulldescription, setShowfulldescription] = useState(false);
  const [rowdescription, setrowdescription] = useState();

  useEffect(() => {
    async function Getallmodules(data) {
      const url = api_url.getall_modules;
      const response = await get_api_request(url, data, headers);
      //console.log(response);
      if (response.status == 200) {
        const Moduledata = response?.data?.responsedata?.modules;
        const getmodules = Moduledata.map(items => {
          // console.log(items);
          if (items.name == 'QUESTION TYPES') {
            const parentdata = items?.parent_id;
            async function getentitybyparentid() {
              const url = api_url.getquestion_type_byparent + parentdata;
              const response = await get_api_request(url, data, headers);
              console.log(response);
              const questiontypedata = response?.data?.responsedata;
              setData(questiontypedata);
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

  const handleView = e => {
    const ids = e.split(',');
    const actionid = ids?.[0];
    const rowid = ids?.[1];
    if (actionid == '1') {
      history.push(`../users/${rowid}/edit-questiontype`);
    } else if (actionid == '2') {
      handleDelete(rowid);
    }
  };

  const handleDelete = id => {
    var deletedrowid = id;
    var column = 'id';
    async function deleteData(id) {
      // const encryptedid = encrypttheid(id);
      // const postID = encryptedid;
      console.log(id);
      const url = api_url.delete_entity_byId + id;
      const response = await delete_api_request(url, headers);
      console.log(response);
      if (response.status === 201) {
        notification.success({
          message: 'Question Deleted Successfully',
        });

        const afterdeletedata = data.filter(item => {
          if (column !== '') {
            return item[column] !== deletedrowid;
          }
          return item;
        });
        setData(afterdeletedata);
      } else if (response.status === 400) {
        alert(response.data.message);
      } else {
        alert('Error');
      }
      // });
    }
    deleteData(id);
  };

  const conditionalRowStyles = [
    {
      when: row => row.cell - 2,
      style: {
        background: 'green',
        border: '1px solid #e3e6ef',
        color: '#000',
        '&:hover': {
          cursor: 'pointer',
          width: '50%!important',
        },
      },
    },
  ];
  const CopyToClipboard = e => {
    navigator.clipboard.writeText(e);
    notification.success({
      message: `Copied Successfully ${e}`,
    });
  };

  const handledescription = e => {
    setrowdescription(e);
    setShowfulldescription(true);
  };

  const columns = [
    {
      name: ' Code',

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

      sortable: true,
      style: {
        background: '#2196F3',
        display: 'inline-flex',
        alignItems: 'center',
        flexGrow: '0',
        marginRight: '13%',
        color: '#fff',
        cursor: 'pointer',
      },
    },

    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },

    {
      name: 'Short Description',
      selector: row =>
        row?.meta?.descripion?.length > 60 ? (
          <Input
            className="description_table"
            type="text"
            name="description"
            value={row?.meta?.descripion}
            minlength="100"
            readOnly
            style={{
              border: 'none',
              textOverflow: 'ellipsis',
              background: 'none',
              cursor: 'pointer',
            }}
            onClick={e => handledescription(row?.meta?.descripion)}
          ></Input>
        ) : (
          row?.meta?.descripion
        ),
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => (
        <>
          <span className={`status ${row.meta.active === '1' ? 'Success' : 'error'}`}>
            {row.meta.active === '1' ? 'Active' : 'Inactive'}
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
            <Option value={1}>Edit</Option>
            <Option value={2}>Delete</Option>
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
          <Button
            className="pull-right btn-animation"
            onClick={() => history.push(`../users/add-questiontype`)}
            size="small"
            key="5"
            type="success"
          >
            <FeatherIcon icon="plus" size={14} />
            Add New Questions
          </Button>
        </div>

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
          <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Questions Types</h1>
        </div>

        <section className="SectionTabsMainTop">
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
          <Cards>
            <DataTable
              columns={columns}
              data={data}
              conditionalRowStyles={conditionalRowStyles}
              //defaultSortField="id"
              defaultSortAsc={false}
              pagination
              highlightOnHover
            />
          </Cards>
          {/* </div> */}

          {Showfulldescription != false ? (
            <div className="Main-headerDiv">
              <div className="inner-headerDiv">
                <div className="headerDiv">
                  <p>View Description</p>
                  <div className="crossIcon">
                    <a onClick={() => setShowfulldescription(false)}>X</a>
                  </div>
                </div>
                <Main>
                  <Cards>
                    <TextArea
                      style={{ height: '250px' }}
                      value={rowdescription}
                      name="full_description"
                      readOnly
                    ></TextArea>
                  </Cards>
                </Main>
              </div>
            </div>
          ) : (
            ''
          )}
        </section>
      </Main>
    </>
  );
};
export default QuestionsTypes;
