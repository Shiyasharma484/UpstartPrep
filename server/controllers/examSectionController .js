const table = "exam_section";
const { decodetheid, validation } = require("../helpers/common");
const con = require("../models/db.js");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const SQL = require("../helpers/sql");
const Model = require("../helpers/instructions");

exports.createExamSection = async (req, res) => {
  const validationRule = {
    name: "required|string",
    section_id: "required|number",
    section_order: "required|number",
  };

  var g_response = {};
  var g_status_code;
  var data = req.body;
  try {
    const valid_data = await validation(data, validationRule);

    const check_title = data.name;
    console.log(check_title);
    const get_exam_title = await SQL.gettabledata("exam_section", "id", {
      name: check_title,
    });
    if (get_exam_title[0]) {
      g_response["status"] = "error";
      g_response["message"] = "Exam Section Already Exists";
      g_status_code = 200;
    } else {
      const create_data = await SQL.addData("exam_section", data);
      const get_data = await SQL.gettabledata("exam_section", [], {
        id: create_data,
      });
      g_response["status"] = "success";
      g_response["message"] = `Created ${table} Successfully`;
      g_response["data"] = get_data;
      g_status_code = 201;
    }
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }
  res.status(g_status_code).json(g_response);
};

exports.getExamSectionByExamID = async (req, res) => {
  var ID;
  var db_meta_keys = {};
  var g_response = {};
  var g_status_code;
  if (req.params.exam_id && req.params.exam_id.length > 0) {
    ID = req.params.exam_id;
    try {
      var get_data = await SQL.query(
        "SELECT es.id,es.name,es.exam_id,e.title as exam_title,es.section_id,s.section_name,es.duration,es.marks_for_correct_answers,es.negative_marks_type,es.negative_marks,es.pass_percentage,es.section_order,es.active FROM exam_section as es LEFT JOIN exams as e ON e.id=es.exam_id LEFT JOIN sections as s ON s.id=es.section_id WHERE es.exam_id=" +
          ID
      );

      g_response["status"] = "success";
      g_response["data"] = get_data;
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

exports.getExamSectionBySectionID = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.section_id && req.params.section_id.length > 0) {
    ID = req.params.section_id;
    try {
      var get_data = await SQL.query(
        "SELECT es.id,es.name,es.exam_id,e.title as exam_title,es.section_id,s.section_name,es.duration,es.marks_for_correct_answers,es.negative_marks_type,es.negative_marks,es.pass_percentage,es.section_order,es.active FROM exam_section as es LEFT JOIN exams as e ON e.id=es.exam_id LEFT JOIN sections as s ON s.id=es.section_id WHERE es.section_id=" +
          ID
      );

      g_response["status"] = "success";
      g_response["data"] = get_data;
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};
exports.getExamSectionByID = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      var get_data = await SQL.query(
        "SELECT es.id,es.name,es.exam_id,e.title as exam_title,es.section_id,s.section_name,es.duration,es.marks_for_correct_answers,es.negative_marks_type,es.negative_marks,es.pass_percentage,es.section_order,es.active FROM exam_section as es LEFT JOIN exams as e ON e.id=es.exam_id LEFT JOIN sections as s ON s.id=es.section_id WHERE es.id=" +
          ID
      );

      g_response["status"] = "success";
      g_response["data"] = get_data;
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

exports.getAllExamSection = async (req, res) => {
  var g_response = {};
  var g_status_code;

  try {
    var get_data = await SQL.query(
      "SELECT es.id,es.name,es.exam_id,e.title as exam_title,es.section_id,s.section_name,es.duration,es.marks_for_correct_answers,es.negative_marks_type,es.negative_marks,es.pass_percentage,es.section_order,es.active FROM exam_section as es LEFT JOIN exams as e ON e.id=es.exam_id LEFT JOIN sections as s ON s.id=es.section_id "
    );
    g_response["status"] = "success";
    g_response["data"] = get_data;
    g_status_code = 200;
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }
  res.status(g_status_code).json(g_response);
};

exports.updateExamSectionByID = async (req, res) => {
  var ID;
  const validationRule = {
    name: "required|string",
    section_id: "required|number",
    section_order: "required|number",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;

  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      const valid_data = await validation(data, validationRule);

      const check_name = data.name;
      console.log(check_name);
      const get_category_name = await SQL.count(
        "exam_section",
        { name: check_name },
        { id: ID }
      );
      if (get_category_name > 0) {
        g_response["status"] = "error";
        g_response["message"] = "Exam Section Already Exists";
        g_status_code = 200;
      } else {
        const update_data = await SQL.Updatedata("exam_section", data, {
          id: ID,
        });

        g_response["status"] = "success";
        g_response["message"] = `Updated ${table} Successfully`;
        g_status_code = 201;
      }
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
    try {
      const delete_resp = await examDelete(deleteID);
      g_response["status"] = "success";
      g_response["message"] = "Exam Delete Successfully";
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};
const examDelete = async (deleteID, result) => {
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
