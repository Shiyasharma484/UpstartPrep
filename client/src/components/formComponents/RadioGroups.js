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

const RadioGroups = ({ data, Dragger }) => {
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
            <h4>Placeholder</h4>
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
            <h4>Name</h4>
          </div>
          <div class="typeFields">
            <input type="text" />
          </div>
        </div>
        <div class="reqField mt">
          <div class="leftTitle">
            <h4>Value</h4>
          </div>
          <div class="typeFields">
            <input type="text" />
          </div>
        </div>
        <div class="reqField mt">
          <div class="leftTitle">
            <h4>Options</h4>
          </div>
          <div class="typeFields">
            <div class="typeFields" id="myList">
              <div class="optionValue" style="margin-top: 0;">
                <div class="optionCheck">
                  <input type="radio" value="" />
                </div>
                <div class="optionInput1">
                  <input type="text" value="" />
                </div>
                <div class="optionInput2">
                  <input type="text" value="" />
                </div>
              </div>
            </div>
          </div>
          <a onclick="addOption()" class="fa fa-plus-circle" href="#"></a>
        </div>
      </div>
    </>
  );
};

export default RadioGroups;
