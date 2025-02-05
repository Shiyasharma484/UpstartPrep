import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../formComponents/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Cards } from '../cards/frame/cards-frame';
import { Dropdown } from '../dropdown/dropdown';
import { Bullet } from '../../container/note/style';
import { noteDeleteData, onStarUpdate, onLabelUpdate } from '../../redux/note/actionCreator';

const Paragraph = ({ data, Dragger }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div id="myDIV">
        <div class="reqField mt">
          <div class="leftTitle">
            <h4>Content</h4>
          </div>
          <div class="typeFields">
            <textarea rows="4" cols="31"></textarea>
          </div>
        </div>

        <div class="reqField mt">
          <div class="leftTitle">
            <h4>Class</h4>
          </div>
          <div class="typeFields">
            <input type="text" />
          </div>
        </div>
        <div class="reqField mt">
          <div class="leftTitle">
            <h4>Help Text</h4>
          </div>
          <div class="typeFields">
            <input type="text" />
          </div>
        </div>
        <div class="reqField mt">
          <div class="leftTitle">
            <h4>Type</h4>
          </div>
          <div class="typeFields">
            <select>
              <option value="p">p</option>
              <option value="address">address</option>
              <option value="blockquote">blockquote</option>
              <option value="canvas">canvas</option>
              <option value="output">output</option>
            </select>
          </div>
        </div>
        <div class="reqField mt">
          <div class="leftTitle">
            <h4>Access</h4>
          </div>
          <div class="typeFields">
            <input type="checkbox" readOnly checked={true} />
            Limit access to one or more of the following roles:
          </div>
        </div>
      </div>
    </>
  );
};

export default Paragraph;
