import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { UserTableStyleWrapper } from '../style';
import { TableWrapper } from '../../styled';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';

const ModulesTable = () => {
  const { users } = useSelector(state => {
    return {
      users: state.users,
    };
  });

  const modulesTableData = [];

  users.map(user => {
    const { id, name, designation, img, status } = user;

    return modulesTableData.push({
      key: id,
      user: (
        <div className="user-info">
          <figure>
            <img style={{ width: '40px' }} src={require(`../../../${img}`)} alt="" />
          </figure>
          <figcaption>
            <Heading className="user-name" as="h6">
              {name}
            </Heading>
            <span className="user-designation">San Francisco, CA</span>
          </figcaption>
        </div>
      ),
      email: '55john@gmail.com',
      company: '555Business Development',
      position: designation,
      joinDate: 'January 20, 2020',
      status: <span className={`status-text ${status}`}>{status}</span>,
      action: (
        <div className="table-actions">
          <>
            <Button className="btn-icon" type="primary" to="#" shape="circle">
              <FeatherIcon icon="eye" size={16} />
            </Button>
            <Button className="btn-icon" type="info" to="#" shape="circle">
              <FeatherIcon icon="edit" size={16} />
            </Button>
            <Button className="btn-icon" type="danger" to="#" shape="circle">
              <FeatherIcon icon="trash-2" size={16} />
            </Button>
          </>
        </div>
      ),
    });
  });

  const modulesTableColumns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Store Name',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Store Type',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];

  const rowSelection = {
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <Cards headless>
      <UserTableStyleWrapper>
        <TableWrapper className="table-responsive">
          <Table
            rowSelection={rowSelection}
            dataSource={modulesTableData}
            columns={modulesTableColumns}
            pagination={{
              defaultPageSize: 5,
              total: modulesTableData.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </TableWrapper>
      </UserTableStyleWrapper>
    </Cards>
  );
};

export default ModulesTable;
