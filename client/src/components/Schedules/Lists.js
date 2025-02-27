import '../Styles/List.css';
import { Row, Col, Form, Select, Space, notification, Input, Image, DatePicker } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Card from './Card';
import CardEditor from './CardEditor';
import ListEditor from './ListEditor';

import shortid from 'shortid';

class Lists extends Component {
  state = {
    editingTitle: false,
    title: this.props.list.title,
    addingCard: false,
  };

  toggleAddingCard = () => this.setState({ addingCard: !this.state.addingCard });

  addCard = async cardText => {
    const { listId, dispatch } = this.props;

    this.toggleAddingCard();

    const cardId = shortid.generate();

    dispatch({
      type: 'ADD_CARD',
      payload: { cardText, cardId, listId },
    });
  };

  toggleEditingTitle = () => this.setState({ editingTitle: !this.state.editingTitle });

  handleChangeTitle = e => this.setState({ title: e.target.value });

  editListsTitle = async () => {
    const { listId, dispatch } = this.props;
    //const { title } = this.state;

    this.toggleEditingTitle();

    dispatch({
      type: 'CHANGE_LIST_TITLE',
      payload: { listId, listTitle: title },
    });
  };

  deleteList = async () => {
    const { listId, list, dispatch } = this.props;

    if (window.confirm('Are you sure to delete this list?')) {
      dispatch({
        type: 'DELETE_LIST',
        payload: { listId, cards: list.cards },
      });
    }
  };

  render() {
    const { list, index } = this.props;
    const { editingTitle, addingCard, title } = this.state;
    const pinid = list.cards[0];
    return (
      <Draggable draggableId={list._id} index={index}>
        {(provided, snapshot) => (
          <Col
            md={4}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="List custmSevenCol"
          >
            {editingTitle ? (
              <ListEditor
                list={list}
                title={title}
                handleChangeTitle={this.handleChangeTitle}
                saveList={this.editListTitle}
                onClickOutside={this.editListTitle}
                deleteList={this.deleteList}
              />
            ) : (
              <div className="List-Title">{list.title}</div>
            )}

            <Droppable droppableId={list._id}>
              {(provided, _snapshot) => (
                <div ref={provided.innerRef} className="Lists-Cards">
                  {list.cards &&
                    list.cards.map((cardId, index) => (
                      <Card key={cardId} cardId={cardId} index={index} listId={list._id} />
                    ))}

                  {provided.placeholder}

                  {addingCard ? <CardEditor onSave={this.addCard} onCancel={this.toggleAddingCard} adding /> : ''}
                </div>
              )}
            </Droppable>
          </Col>
        )}
      </Draggable>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  list: state.listsById[ownProps.listId],
});

export default connect(mapStateToProps)(Lists);
