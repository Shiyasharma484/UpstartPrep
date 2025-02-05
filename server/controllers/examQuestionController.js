const table = "exam_question";
const { decodetheid, validation } = require("../helpers/common");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const SQL = require("../helpers/sql");
const Model = require("../helpers/instructions");

exports.createExamQuestion = async (req, res) => {
  console.log(req.body);
  const validationRule = {
    exam_id: "required|number",
    questions: "required|number",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;

  try {
    const valid_data = await validation(data, validationRule);

    const create_data = await SQL.addData("exam_question", data);
    g_response["status"] = "success";
    g_response["message"] = `Created ${table} Successfully`;
    g_response["id"] = create_data;
    g_status_code = 201;
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }
  res.status(g_status_code).json(g_response);
};

exports.getExamQuestionByExamID = async (req, res) => {
  console.log(req.params);
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.exam_id && req.params.exam_id.length > 0) {
    ID = req.params.exam_id;

    try {
      const get_data = await SQL.query(
        "SELECT eq.id,eq.exam_id,e.title,eq.questions as question_id,b.description,b.questions,eq.section_id,b.difficulty_level,en.name as level_name,b.options,b.answers FROM exam_question as eq LEFT JOIN exams as e ON e.id=eq.exam_id LEFT JOIN question_bank as b ON b.id=eq.questions LEFT JOIN entity as en ON en.id=b.difficulty_level WHERE eq.exam_id=" +
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
exports.getExamQuestionBySectionID = async (req, res) => {
  console.log(req.params);
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.exam_id && req.params.exam_id.length > 0) {
    ID = req.params.exam_id;

    try {
      const get_data = await SQL.query(
        "SELECT eq.id,eq.exam_id,e.title,eq.questions as question_id,b.description,b.questions,b.difficulty_level,b.options,b.answers FROM exam_question as eq LEFT JOIN exams as e ON e.id=eq.exam_id LEFT JOIN question_bank as b ON b.id=eq.questions WHERE eq.exam_id=" +
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
exports.getExamQuestionByQuestionID = async (req, res) => {
  console.log(req.params);
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.question_id && req.params.question_id.length > 0) {
    ID = req.params.question_id;

    try {
      const get_data = await SQL.query(
        "SELECT eq.id,eq.exam_id,e.title,eq.questions as question_id,b.questions,b.description,b.difficulty_level,b.options,b.answers FROM exam_question as eq LEFT JOIN exams as e ON e.id=eq.exam_id LEFT JOIN question_bank as b ON b.id=eq.questions WHERE eq.questions=" +
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

exports.getAllExamQuestion = async (req, res) => {
  console.log(req.params);
  var ID;
  var g_response = {};
  var g_status_code;

  try {
    const get_data = await SQL.query(
      "SELECT eq.id,eq.exam_id,e.title,eq.questions as question_id,b.questions,b.description,b.difficulty_level,en.name as level_name,b.options,b.answers FROM exam_question as eq LEFT JOIN exams as e ON e.id=eq.exam_id LEFT JOIN question_bank as b ON b.id=eq.questions LEFT JOIN entity as en ON en.id=b.difficulty_level"
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
};

exports.updateByID = async (req, res) => {
  var ID;
  console.log(req.body);
  var data = req.body;
  var g_response = {};
  var g_status_code;
  const validationRule = {
    exam_id: "required|number",
    questions: "required|number",
  };
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const valid_data = await validation(data, validationRule);
      const update_data = await SQL.Updatedata("exam_question", data, {
        id: ID,
      });
      g_response["status"] = "success";
      g_response["responsedata"] = "Question Updated Successfully";
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

  if (
    req.params.exam_id &&
    req.params.exam_id.length > 0 &&
    req.params.question_id &&
    req.params.question_id.length > 0
  ) {
    try {
      var get_delete_id = await SQL.gettabledata("exam_question", ["id"], {
        exam_id: req.params.exam_id,
        questions: req.params.question_id,
      });

      deleteID = get_delete_id[0].id;
      const delete_resp = await questionDelete(deleteID);
      g_response["status"] = "success";
      g_response["message"] = "Question Delete Successfully";
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};
const questionDelete = async (deleteID, result) => {
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
