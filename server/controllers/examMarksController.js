const table = " exam_marks";
const { decodetheid, validation } = require("../helpers/common");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const SQL = require("../helpers/sql");
const Model = require("../helpers/instructions");

exports.createexamMarks = async (req, res) => {
  console.log(req.body);
  const validationRule = {
    exam_id: "required|number",
    question_id: "required|number",
    answers: "required|string",
    student_id: "required|number",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;

  try {
    const valid_data = await validation(data, validationRule);

    try {
      const create_data = await SQL.addData("exam_marks_obtained", data);

      g_response["status"] = "success";
      g_response["message"] = `Created ${table} Successfully`;
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }
  res.status(g_status_code).json(g_response);
};

exports.getexamMarksByExamID = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.exam_id && req.params.exam_id.length > 0) {
    ID = req.params.exam_id;
    try {
      const get_data = await SQL.query(
        "SELECT em.id,em.exam_id,e.title as exam_title,em.schedule_id,s.schedule_type,q.description,em.question_id,q.questions,q.difficulty_level,em.answers,em.student_id FROM exam_marks_obtained as em LEFT JOIN exams as e ON e.id=em.exam_id LEFT JOIN schedule as s ON s.id=em.schedule_id LEFT JOIN question_bank as q ON q.id=em.question_id WHERE em.exam_id=" +
          ID
      );
      g_response["status"] = "success";
      g_response["responsedata"] = get_data;
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};
exports.getexamMarksByScheduleID = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.schedule_id && req.params.schedule_id.length > 0) {
    ID = req.params.schedule_id;
    try {
      const get_data = await SQL.query(
        "SELECT em.id,em.exam_id,e.title as exam_title,em.schedule_id,s.schedule_type,em.question_id,q.description,q.questions,q.difficulty_level,em.answers,em.student_id FROM exam_marks_obtained as em LEFT JOIN exams as e ON e.id=em.exam_id LEFT JOIN schedule as s ON s.id=em.schedule_id LEFT JOIN question_bank as q ON q.id=em.question_id WHERE em.schedule_id=" +
          ID
      );
      g_response["status"] = "success";
      g_response["responsedata"] = get_data;
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};
exports.getexamMarksByStudentID = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.student_id && req.params.student_id.length > 0) {
    ID = req.params.student_id;
    try {
      const get_data = await SQL.query(
        "SELECT em.id,em.exam_id,e.title as exam_title,em.schedule_id,s.schedule_type,em.question_id,q.description,q.questions,q.difficulty_level,em.answers,em.student_id FROM exam_marks_obtained as em LEFT JOIN exams as e ON e.id=em.exam_id LEFT JOIN schedule as s ON s.id=em.schedule_id LEFT JOIN question_bank as q ON q.id=em.question_id WHERE em.student_id=" +
          ID
      );
      g_response["status"] = "success";
      g_response["responsedata"] = get_data;
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

exports.getAllExamMarks = async (req, res) => {
  var g_response = {};
  var g_status_code;

  try {
    const get_data =
      "SELECT em.id,em.exam_id,e.title as exam_title,em.schedule_id,s.schedule_type,q.description,q.questions,q.difficulty_level,em.answers,em.student_id FROM exam_marks_obtained as em LEFT JOIN exams as e ON e.id=em.exam_id LEFT JOIN schedule as s ON s.id=em.schedule_id LEFT JOIN question_bank as q ON q.id=em.question_id";
    const get_list = await SQL.query(get_data);
    g_response["status"] = "success";
    g_response["responsedata"] = get_list;
    g_status_code = 200;
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }
  res.status(g_status_code).json(g_response);
};

exports.updateByID = async (req, res) => {
  var ID;
  console.log(req.body);
  var data = req.body;
  var g_response = {};
  var g_status_code;
  const validationRule = {
    exam_id: "required|number",
    question_id: "required|number",
    answers: "required|string",
    student_id: "required|number",
  };
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const valid_data = await validation(data, validationRule);
      const update_topics_data = await SQL.Updatedata("exam_marks", data, {
        id: ID,
      });

      g_response["status"] = "success";
      g_response["responsedata"] = "Exam Marks Updated Successfully";
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

exports.DeleteById = async (req, res) => {
  var deleteID;
  var g_response = {};
  var g_status_code;

  if (req.params.id && req.params.id.length > 0) {
    deleteID = req.params.id;
    console.log(deleteID);
    try {
      const delete_resp = await marksDelete(deleteID);
      g_response["status"] = "success";
      g_response["message"] = "Topics Delete Successfully";
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};
const marksDelete = async (deleteID, result) => {
  let delete_payload = {
    table_name: table,
    query_field: "id",
    query_value: deleteID,
  };
  const respSql = await Model.delete_query(delete_payload);
  if (respSql.status == "success") {
    return null, respSql.status;
  } else if (respSql.status == "error") {
    const err = respSql.message;
    const respError = await Model.error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    return Error, null;
  }
};
