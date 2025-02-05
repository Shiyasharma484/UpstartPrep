import '../Styles/Card.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { Row, Col, Form, Select, Space, notification, Input, Image, DatePicker } from 'antd';

import CardEditor from './CardEditor';
import { headers } from '../../helpers/variables';
import { get_api_request, post_api_request, api_url, delete_api_request, put_api_request } from '../../helpers/Common';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { decodetheid, encrypttheid } = require('../../helpers/encode-decode');

const Card = ({ card, index, dispatch }) => {
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(card.text);

  const startHover = () => setHover(true);
  const endHover = () => setHover(false);

  const startEditing = () => {
    setHover(false);
    setEditing(true);
  };

  const endEditing = () => {
    setHover(false);
    setEditing(false);
  };

  const editCard = async text => {
    endEditing();

    dispatch({
      type: 'CHANGE_CARD_TEXT',
      payload: { cardId: card._id, cardText: text },
    });
  };

  const deleteCard = async () => {
    if (window.confirm('Are you sure to delete this card?')) {
      dispatch({
        type: 'DELETE_CARD',
        payload: { cardId: card._id, listId },
      });
    }
  };
  const handleDelete = e => {
    deleteData(e);
  };

  async function deleteData(deleteId) {
    const id = deleteId.split('_');
    const delete_id = id[0];
    const url = api_url.delete_scheduleby_id + encrypttheid(delete_id);
    const response = await delete_api_request(url, headers);
    if (response.status == 201) {
      notification.success({
        message: 'Schedule Deleted Successfully',
      });
      dispatch({
        type: 'DELETE_CARD',
        payload: { cardId: card._id, listId: card.list_Id },
      });
      //setReRenderPinData(reRenderPinData +1)
    }
  }

  if (!editing) {
    return (
      <div className="scedule_card">
        <Draggable draggableId={card._id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="Card"
              onMouseEnter={startHover}
              onMouseLeave={endHover}
            >
              {hover && (
                <div className="Card-Icons">
                  {/* <div className="Card-Icon" onClick={startEditing}>
                    <ion-icon name="create" />
                    <i class="fa fa-edit"></i>
                  </div> */}
                  <div className="Card-Icon" onClick={e => handleDelete(card._id)}>
                    <i
                      className="fa fa-trash-o"
                      style={{
                        fontSize: '20px',
                        color: 'red',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                </div>
              )}
              <div className="sceduleimg">
                <img
                  src={domainpath + card.Image}
                  title={card.text + ' ' + card.Date + ' - ' + card.Time}
                  alt={card.text}
                />
              </div>
            </div>
          )}
        </Draggable>
      </div>
    );
  } else {
    return <CardEditor text={text} onSave={editCard} onCancel={endEditing} />;
  }
};

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId],
});

export default connect(mapStateToProps)(Card);
