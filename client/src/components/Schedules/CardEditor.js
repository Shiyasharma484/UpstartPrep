import '../Styles/CardEditor.css';
import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import EditButtons from './EditButtons';

const CardEditor = ({ text: initialText = '', onSave, onCancel, onDelete, adding }) => {
  const [text, setText] = useState(initialText);

  const hours = [
    '00 hh',
    '01 hh',
    '02 hh',
    '03 hh',
    '04 hh',
    '05 hh',
    '06 hh',
    '07 hh',
    '08 hh',
    '09 hh',
    '10 hh',
    '11 hh',
    '12 hh',
    '13 hh',
    '14 hh',
    '15 hh',
    '16 hh',
    '17 hh',
    '18 hh',
    '19 hh',
    '20 hh',
    '21 hh',
    '22 hh',
    '23 hh',
  ];
  const minutes = [
    '00 mm',
    '01 mm',
    '02 mm',
    '03 mm',
    '04 mm',
    '05 mm',
    '06 mm',
    '07 mm',
    '08 mm',
    '09 mm',
    '10 mm',
    '11 mm',
    '12 mm',
    '13 mm',
    '14 mm',
    '15 mm',
    '16 mm',
    '17 mm',
    '18 mm',
    '19 mm',
    '20mm',
    '21 mm',
    '22 mm',
    '23 mm',
    '24 mm',
    '25 mm',
    '26 mm',
    '27 mm',
    '28 mm',
    '29 mm',
    '30 mm',
    '31 mm',
    '32 mm',
    '33 mm',
    '34 mm',
    '35 mm',
    '36 mm',
    '37 mm',
    '38 mm',
    '39 mm',
    '40 mm',
    '41 mm',
    '42 mm',
    '43 mm',
    '44 mm',
    '45 mm',
    '46 mm',
    '47 mm',
    '48 mm',
    '49 mm',
    '50 mm',
    '51 mm',
    '52 mm',
    '53 mm',
    '54 mm',
    '55 mm',
    '56 mm',
    '57 mm',
    '58 mm',
    '59 mm',
  ];

  const handleChangeText = event => setText(event.target.value);

  const onEnter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onSave(text);
    }
  };
  const handleSave = (e, feildsValue) => {
    var Payload = {};
    Payload['time'] = feildsValue.time;
    async function updateschedule(data) {
      const url = api_url.update_schedulebyId + id;
      const response = await put_api_request(url, data, headers);
      if (response.status === 201) {
        notification.success({
          message: 'Schedule Upadated Successfully',
        });
      }
    }
    updateschedule(Payload);
  };

  return (
    <div className="Edit-Card">
      <div className="Card editcard">
        {/* <TextareaAutosize
          autoFocus
          className="Edit-Card-Textarea"
          placeholder="Enter the text for this card..."
          value={text}
          onChange={handleChangeText}
          onKeyDown={onEnter}
        /> */}
        <div style={{ marginRight: '10px' }}>
          <select name="hours">
            {hours.map(hours => (
              <option value={hours}>{hours}</option>
            ))}
          </select>
        </div>

        <div>
          <select name="minutes">
            {minutes.map(minute => (
              <option value={minute}>{minute}</option>
            ))}
          </select>
        </div>
      </div>
      <EditButtons
        handleSave={handleSave}
        saveLabel={adding ? 'Add Event' : 'Save'}
        handleDelete={onDelete}
        handleCancel={onCancel}
      />
    </div>
  );
};

export default CardEditor;
