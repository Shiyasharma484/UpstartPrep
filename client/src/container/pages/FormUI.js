import React, { useEffect, useState } from 'react';
import { FlowChartWithState, Content, Page, Sidebar, SidebarItem } from 'react-work-flow';
import { Row, Col, Form, notification, Input, Button, Select, DatePicker } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { AddUser } from './style';
import Cookies from 'js-cookie';
import { Main } from '../styled';
import dayjs from 'dayjs';
import 'moment/locale/zh-cn';
import { Cards } from '../../components/cards/frame/cards-frame';
import { get_api_request, post_api_request, put_api_request, api_url } from '../../helpers/Common';
import { headers } from '../../helpers/variables';
import TextArea from 'antd/lib/input/TextArea';
import Header from '../../components/formComponents/Header';
import DateField from '../../components/formComponents/DateField';
import InputForm from '../../components/formComponents/InputForm';
import Paragraph from '../../components/formComponents/Paragraph';
import RadioGroups from '../../components/formComponents/RadioGroups';
import SelectForm from '../../components/formComponents/SelectForm';
import CheckBoxes from '../../components/formComponents/CheckBoxes';
import InputTypeNumber from '../../components/formComponents/InputType Number';
var firstDrop = [];
const FormUI = () => {
  const params = useParams();
  const [form] = Form.useForm();
  const [showSelect, setshowSelect] = useState(false);
  const [DropDiv, setDropDiv] = useState([]);
  const [DivContent, setDivContent] = useState([]);
  var firstDropContent = [];
  const [DropList, setDropList] = useState([]);
  useEffect(() => {
    var rand_string = makeid(5);
    firstDrop[0] = (
      <div
        class={rand_string + ' dropable'}
        onDrop={event => drop(event, 0)}
        onDragOver={event => allowDrop(event)}
        id={rand_string}
        key={rand_string}
      >
        {DivContent}
      </div>
    );
    setDropDiv([...DropDiv, firstDrop]);
  }, []);

  const handleClick = e => {
    setshowSelect(true);
    // 👇️ toggle shown state
    // return <SelectForm />;
    // setIsShown(current => !current);
  };

  const allowDrop = ev => {
    ev.preventDefault();
  };
  const drag = ev => {
    ev.dataTransfer.setData('text', ev.target.id);
    ev.dataTransfer.effectAllowed = 'copy';
  };
  const makeid = length => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  var header = () => {
    var headerdiv = (
      <div id="mainDrop" onClick={e => handleClick(e)}>
        <h1>
          <input type="text" name="title" />
        </h1>
      </div>
    );
    return headerdiv;
  };

  //const element = 'Header';
  // const [element, setelement] = useState('start')
  function get_elements(ev) {
    //let element = e.target.value;
    console.log(ev);
    switch (ev) {
      case 'Header':
        return header();
      // case 'InputForm':
      //   return <InputForm />;
      // case 'DateField':
      //   return <DateField />;
      // case 'Paragraph':
      //   return <Paragraph />;
      // case 'RadioGroups':
      //   return <RadioGroups />;
      // case 'CheckBoxes':
      //   return <CheckBoxes />;
      // case 'SelectForm':
      //   return <SelectForm />;
      // case 'InputTypeNumber':
      //   return <InputTypeNumber />;
      default:
        return null;
    }
  }

  const drop = async ev => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData('text');
    var div_id = ev.target.id;
    // ev.target.appendChild(document.getElementById(data));
    var element = document.getElementById(data);
    var drop_element = element.getAttribute('drop-element');
    var el = get_elements(drop_element);
    firstDropContent = DivContent;
    var index = firstDrop.findIndex(function(item) {
      return item.key == div_id;
    });
    console.log(index);
    console.log(DropDiv);
    firstDropContent[div_id].push(el);

    setDivContent(firstDropContent);
    console.log(DivContent);
    //el.setAttribute('class', drop_element);
    // console.log(el);
    //console.log(drop_element);
    //ev.target.appendChild(DivContent);
  };

  const createdropdiv = e => {
    console.log(e);
    var rand_string = makeid(5);
    var d = DropList;
    d.push(rand_string);
    setDropList(d);
    var i = createdropdiv.length;

    firstDrop[i] = (
      <div
        className={rand_string + ' dropable'}
        onDrop={event => drop(event, i)}
        onDragOver={event => allowDrop(event)}
        id={rand_string}
        key={rand_string}
      >
        {DivContent[rand_string]}
      </div>
    );
    console.log(firstDrop);
    setDropDiv([...DropDiv, firstDrop]);
  };

  return (
    <>
      <PageHeader
        ghost
        // title="Form Builder"
      />

      <Main>
        <div class="dragMain">
          {showSelect == true ? (
            <div class="myForm" id="div">
              <Header />
            </div>
          ) : (
            ''
          )}

          <div id="div1" className="div1" onDrop={event => drop(event)} onDragOver={event => allowDrop(event)}>
            {DropDiv}
            <div class="iconPlus">
              <i class="fa fa-plus" onClick={createdropdiv}></i>
            </div>
          </div>
          <div id="div2" onDrop={event => drop(event)} onDragOver={event => allowDrop(event)}>
            <div
              class="mainBlocks mb"
              id="drag26"
              draggable="true"
              onDragStart={event => drag(event)}
              drop-element="Header"
            >
              <i class="fa fa-header"></i>
              Header Text
            </div>

            <div
              class="mainBlocks mb"
              id="drag2"
              draggable="true"
              onDragStart={event => drag(event)}
              drop-element="Label"
            >
              <h1>A</h1>
              <p>Label</p>
            </div>
            <div class="mainBlocks mb" id="drag3" draggable="true" onDragStart={event => drag(event)}>
              <i class="fa fa-caret-square-o-down"></i>
              <p>Dropdown</p>
            </div>
            <div class="mainBlocks mb" id="drag4" draggable="true" onDragStart={event => drag(event)}>
              <i class="fa fa-tag" aria-hidden="true"></i>
              <p>Tags</p>
            </div>
            <div class="mainBlocks mb" id="drag5" draggable="true" onDragStart={event => drag(event)}>
              <i class="fa fa-arrows-h"></i>
              <p>Line Break</p>
            </div>
            <div class="mainBlocks mb" id="drag6" draggable="true" onDragStart={event => drag(event)}>
              <i class="fa fa-paragraph" aria-hidden="true"></i>
              <p>Paragraph</p>
            </div>
            <div class="mainBlocks mb" id="drag7" draggable="true" onDragStart={event => drag(event)}>
              <i class="fa fa-envelope"></i>
              <p>Email</p>
            </div>
            <div class="mainBlocks mb" id="drag8" draggable="true" onDragStart={event => drag(event)}>
              <i class="fa fa-dot-circle-o"></i>
              <p>Multiple Choice</p>
            </div>
            <div class="mainBlocks mb" id="drag9" draggable="true" onDragStart={event => drag(event)}>
              <i class="fa fa-plus"></i>
              <p>Number Input</p>
            </div>
            <div class="mainBlocks mb" id="drag10" draggable="true" onDragStart={event => drag(event)}>
              <i class="fas fa-phone"></i>
              <p>Phone Number</p>
            </div>
            <div class="mainBlocks mb" id="drag11" draggable="true" onDragStart={event => drag(event)}>
              <i class="fas fa-text-height"></i>
              <p>Multi-Line Input</p>
            </div>
            <div class="mainBlocks mb">
              <h1>A</h1>
              <p>Text Input</p>
            </div>
            <div class="mainBlocks mb" id="drag12" draggable="true" onDragStart={event => drag(event)}>
              <i class="fa fa-columns" aria-hidden="true"></i>
              <p>Two Column Row</p>
            </div>
            <div class="mainBlocks mb" id="drag13" draggable="true" onDragStart={event => drag(event)}>
              <i class="fa-solid fa-columns-3"></i>
              <p>Three Column Row</p>
            </div>
            <div class="mainBlocks mb" id="drag14" draggable="true" onDragStart={event => drag(event)}>
              <i class="fa fa-caret-square-o-down"></i>
              <p>Four Column Row</p>
            </div>
            <div class="mainBlocks mb" id="drag15" draggable="true" onDragStart={event => drag(event)}>
              <i class="fa fa-star"></i>
              <p>Rating</p>
            </div>
            <div class="mainBlocks mb" id="drag16" draggable="true" onDragStart={event => drag(event)}>
              <i class="fa fa-asl-interpreting"></i>
              <p>Website</p>
            </div>
            <div class="mainBlocks mb" id="drag17" draggable="true" onDragStart={event => drag(event)}>
              <i class="fa fa-file-image-o"></i>
              <p>File Attachment</p>
            </div>
            <div class="mainBlocks mb" id="drag18" draggable="true" onDragStart={event => drag(event)}>
              <i class="fa fa-photo"></i>
              <p>Photo</p>
            </div>
            <div class="mainBlocks mb" id="drag19" draggable="true" onDragStart={event => drag(event)}>
              <i class="fa fa-navicon"></i>
              <p>Range</p>
            </div>
            <div class="mainBlocks mb" id="drag20" draggable="true" onDragStart={event => drag(event)}>
              <i class="fa fa-check-square-o" aria-hidden="true"></i>
              <p>CheckBoxes</p>
            </div>
            <div class="mainBlocks mb" id="drag21" draggable="true" onDragStart={event => drag(event)}>
              <i class="fa fa-calendar"></i>
              <p>Date</p>
            </div>
            <div class="mainBlocks mb" id="drag22" draggable="true" onDragStart={event => drag(event)}>
              <i class="fas fa-edit"></i>
              <p>Signature</p>
            </div>
            <div class="mainBlocks mb" id="drag23" draggable="true" onDragStart={event => drag(event)}>
              <i class="fa fa-camera"></i>
              <p>Camera</p>
            </div>
            <div class="mainBlocks mb" id="drag24" draggable="true" onDragStart={event => drag(event)}>
              <i class="fas fa-image"></i>
              <p>Image</p>
            </div>
            <div class="mainBlocks mb" id="drag25" draggable="true" onDragStart={event => drag(event)}>
              <i class="fa fa-file"></i>
              <p>File Upload</p>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export default FormUI;
