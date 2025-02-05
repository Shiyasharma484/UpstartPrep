import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, Select, Space, notification, Input, Image, DatePicker } from 'antd';
import ListEditor from './ListEditor';
import shortid from 'shortid';
import EditButtons from './EditButtons';
import { headers } from '../../helpers/variables';
import '../../BoardStyles/AddList.css';
import { get_api_request, post_api_request, api_url } from '../../helpers/Common';

const AddList = ({ toggleAddingList, dispatch }) => {
  const [title, setTitle] = useState('');
  const [arrayDataBoard, setarrayDataBoard] = useState([]);

  const handleChangeTitle = e => setTitle(e.target.value);
  const handleSubmit = (e, feildsValue) => {
    var payload = {};
    payload['pinterest_board_id'] = 3;
    payload['name'] = title;
    payload['description'] = 'kkkkkkkkkkkkkkk';
    async function getallBoards() {
      const url = api_url.get_board_all;
      const response = await get_api_request(url, headers);
      if (response.status === 200) {
        const boardData = response.data.responsedata;
        const dataArray = boardData.map(item => {
          return { id: item.id, name: item.title };
        });
        setarrayDataBoard(dataArray);
      }
    }

    async function createBoard(data) {
      const url = api_url.create_board;
      const response = await post_api_request(url, data, headers);
      if (response.status === 201) {
        notification.success({
          message: 'Boards Created Successfully',
        });
        getallBoards();
      }
    }
    createBoard(payload);
  };

  return (
    <div className="Add-List-Editor">
      <ListEditor
        title={title}
        handleChangeTitle={handleChangeTitle}
        onClickOutside={toggleAddingList}
        //saveList={createList}
        onClick={handleSubmit}
      />

      <EditButtons handleSave={handleSubmit} saveLabel={'Add list'} handleCancel={toggleAddingList} />
    </div>
  );
};

export default connect()(AddList);
