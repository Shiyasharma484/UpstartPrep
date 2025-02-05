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

const InputForm = ({ data, Dragger }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div id="myDIV">
        <div class="reqField mt">
          <div class="leftTitle">
            <h4>Required</h4>
          </div>
          <div class="typeFields">
            <input type="checkbox" id="topping" name="topping" readOnly checked={true} />
          </div>
        </div>

        <div class="reqField mt">
          <div class="leftTitle">
            <h4>Label</h4>
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
            <h4>Class</h4>
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
              <option value="h1">h1</option>
              <option value="h2">h2</option>
              <option value="h3">h3</option>
              <option value="h4">h4</option>
              <option value="h5">h5</option>
              <option value="h6">h6</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputForm;
