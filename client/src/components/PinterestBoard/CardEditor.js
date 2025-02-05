import React, { useEffect, useState, Component } from 'react';
import '../../BoardStyles/CardEditor.css';
import TextareaAutosize from 'react-textarea-autosize';
import { Row, Col, Form, Select, Space, notification, Input, Image, DatePicker } from 'antd';
import { Cards } from '../../components/cards/frame/cards-frame';
import EditButtons from './EditButtons';

//const [arrayDataBoard, setarrayDataBoard] = useState([]);

class CardEditor extends Component {
  state = {
    text: this.props.text || '',
  };

  handleChangeText = event => this.setState({ text: event.target.value });

  onEnter = e => {
    const { text } = this.state;

    if (e.keyCode === 13) {
      e.preventDefault();
      this.props.onSave(text);
    }
  };

  render() {
    const { text } = this.state;
    const { onSave, onCancel, onDelete, adding } = this.props;

    return (
      <div className="Edit-Card">
        <div className="Card">
          <TextareaAutosize
            autoFocus
            className="Edit-Card-Textarea"
            placeholder="Enter the text for this card..."
            value={text}
            onChange={this.handleChangeText}
            onKeyDown={this.onEnter}
          />
        </div>

        <EditButtons
          handleSave={() => onSave(text)}
          saveLabel={adding ? 'Add Event' : 'Save'}
          handleDelete={onDelete}
          handleCancel={onCancel}
        />
      </div>
    );
  }
}

export default CardEditor;
