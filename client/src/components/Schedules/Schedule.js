import '../Styles/Board.css';

import React, { Component } from 'react';
import { Row, Col, Form, Select, Space, notification, Input, Image, DatePicker } from 'antd';

import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Lists from './Lists';
import CalenderList from './ScheduleList';

const weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class Schedule extends Component {
  state = {
    addingList: false,
  };

  toggleAddingList = () => this.setState({ addingList: !this.state.addingList });

  handleDragEnd = ({ source, destination, type }) => {
    // dropped outside the allowed zones
    if (!destination) return;

    const { dispatch } = this.props;
    // Move list
    if (type === 'COLUMN') {
      //Prevent update if nothing has changed
      if (source.index !== destination.index) {
        dispatch({
          type: 'MOVE_LIST',
          payload: {
            // oldListIndex: source.index,
            // newListIndex: destination.index
          },
        });
      }
      return;
    }

    // Move card
    if (source.index !== destination.index || source.droppableId !== destination.droppableId) {
      dispatch({
        type: 'MOVE_CARD',
        payload: {
          sourceListId: source.droppableId,
          destListId: destination.droppableId,
          oldCardIndex: source.index,
          newCardIndex: destination.index,
        },
      });
    }
  };
  handleChange1 = event => {
    this.setState({ selectedYear: event.target.value });
  };

  render() {
    const { board } = this.props;
    const { addingList } = this.state;
    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <div>
          <CalenderList />
        </div>
        <div className="weeksName">
          {weekNames.map(weekName => (
            <div className="weeksDays">{weekName}</div>
          ))}
        </div>

        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided, _snapshot) => (
            <div className="Board padding-10" ref={provided.innerRef}>
              <Row>
                {board?.lists?.map((listId, index) => {
                  return <Lists listId={listId} key={listId} index={index} />;
                })}
                {provided.placeholder}

                <div className="Add-List">
                  {addingList ? '' : ''
                  // <div
                  //   onClick={this.toggleAddingList}
                  //   className="Add-List-Button schedule-btnAdd"
                  // >
                  //   <ion-icon name="add" /> Add a list
                  //   {/* <Upload {...props}>
                  //       <Button icon={<UploadOutlined />}>Upload</Button>
                  //   </Upload> */}
                  // </div>
                  }
                </div>
              </Row>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({ board: state.board });

export default connect(mapStateToProps)(Schedule);
