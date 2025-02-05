import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Select, Space, notification, Input, Image, DatePicker } from 'antd';
import loginUpstart from '../../static/img/auth/upstart.png';

const Signupcategory = () => {
  const [form] = Form.useForm();

  const [ActiveParent, setParent] = useState(false);
  const [ActiveStudent, setStudent] = useState(false);
  const [ActiveTeacher, setTeacher] = useState(false);

  const handleclass = e => {
    console.log(e);
    if (e == 1) {
      setParent(current => !current);
      setStudent(false);
      setTeacher(false);
    } else if (e == 2) {
      setStudent(current => !current);
      setTeacher(false);
      setParent(false);
    } else if (e == 3) {
      setTeacher(current => !current);
      setParent(false);
      setStudent(false);
    }
  };

  return (
    <>
      <div className="main-Signup">
        <Row gutter={40} className="rowSpace">
          <Col md={24} xs={24} className="usersCard mobImgCenter">
            <img src={loginUpstart} className="loginUpstart" style={{ width: '200px', marginTop: '40px' }} />
          </Col>
        </Row>

        <Row>
          <Col md={6} xs={24} className="selectCat"></Col>
          <Col md={12} xs={24} className="selectCat">
            <h1>I am a ...</h1>
            <div class="selectCat-Inner">
              <button
                value="1"
                className={ActiveParent ? 'category-Cat' : ''}
                onClick={e => handleclass(e.target.value)}
              >
                Parent
              </button>

              <button
                value="2"
                className={ActiveStudent ? 'category-Cat' : ''}
                onClick={e => handleclass(e.target.value)}
              >
                Student
              </button>

              <button
                value="3"
                className={ActiveTeacher ? 'category-Cat' : ''}
                onClick={e => handleclass(e.target.value)}
              >
                Teacher
              </button>
            </div>
            <div class="selectCat-btn">
              <button>Create my account as a Student</button>
            </div>
          </Col>
          <Col md={6} xs={24} className="selectCat"></Col>
        </Row>
      </div>
    </>
  );
};
export default Signupcategory;
