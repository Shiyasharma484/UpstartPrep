const table = "practice_question";
const { decodetheid, validation } = require("../helpers/common");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const SQL = require("../helpers/sql");
const Model = require("../helpers/instructions");

exports.createPracticeQuestion = async (req, res) => {
  console.log(req.body);
  const validationRule = {
    practice_set_id: "required|number",
    question_id: "required|number",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;

  try {
    const valid_data = await validation(data, validationRule);
    var get_question = await SQL.gettabledata("question_bank", ["id"], {
      id: data.question_id,
    });
    if (get_question.length < 1) {
      g_response["status"] = "error";
      g_response["message"] = "Please Enter A Valid Question";
      g_status_code = 400;
      res.status(g_status_code).json(g_response);
    }
    var get_practice_question = await SQL.gettabledata(
      "practice_question",
      [],
      { practice_set_id: data.practice_set_id, question_id: data.question_id }
    );
    console.log(get_practice_question);
    if (get_practice_question.length > 0) {
      g_response["status"] = "error";
      g_response["message"] = "Already Exists";
      g_status_code = 400;
      res.status(g_status_code).json(g_response);
    } else {
      const create_data = await SQL.addData("practice_question", data);
      g_response["status"] = "success";
      g_response["message"] = `Created ${table} Successfully`;
      g_response["id"] = create_data;
      g_status_code = 201;
      res.status(g_status_code).json(g_response);
    }
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
    res.status(g_status_code).json(g_response);
  }
};

exports.getPracticeQuestionBySetID = async (req, res) => {
  console.log(req.params);
  var ID;
  var resp_data = [];
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const get_data = await SQL.query(
        "SELECT eq.id as practice_question_id,eq.practice_set_id,e.title,eq.question_id ,b.description,b.questions,b.difficulty_level,et.name as level_name,b.options,b.answers FROM practice_question as eq LEFT JOIN practice_sets as e ON e.id=eq.practice_set_id LEFT JOIN question_bank as b ON b.id=eq.question_id LEFT JOIN entity as et ON et.id=b.difficulty_level WHERE eq.practice_set_id=" +
          ID
      );
      get_data.forEach((element, i) => {
        var options = JSON.parse(element.options);
        var answers = JSON.parse(element.answers);

        element.options = options;
        element.answers = answers;
        resp_data[i] = element;
      });

      g_response["status"] = "success";
      g_response["responsedata"] = resp_data;
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }

    res.status(g_status_code).json(g_response);
  }
};
exports.getPracticeQuestionByQuestionID = async (req, res) => {
  var ID;
  var resp_data = [];
  var g_response = {};
  var g_status_code;
  if (req.params.question_id && req.params.question_id.length > 0) {
    ID = req.params.question_id;

    try {
      const get_data = await SQL.query(
        "SELECT eq.id,eq.practice_set_id,e.title,eq.question_id,b.questions,b.options,b.description,b.difficulty_level,b.answers FROM practice_question as eq LEFT JOIN practice_sets as e ON e.id=eq.practice_set_id LEFT JOIN question_bank as b ON b.id=eq.question_id WHERE eq.question_id=" +
          ID
      );
      get_data.forEach(async (element, i) => {
        var answers = JSON.parse(element.answers);
        var options = JSON.parse(element.options);
        element.options = options;
        element.answers = answers;
        resp_data[i] = element;
      });
      g_response["status"] = "success";
      g_response["responsedata"] = resp_data;
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }

    res.status(g_status_code).json(g_response);
  }
};

exports.getAllPracticeQuestion = async (req, res) => {
  console.log(req.params);
  var ID;
  var g_response = {};
  var g_status_code;
  var resp_data = [];
  try {
    const get_data = await SQL.query(
      "SELECT eq.id,eq.practice_set_id,e.title,eq.question_id,b.questions,b.description,b.difficulty_level,et.name as level_name,b.options,b.answers FROM practice_question as eq LEFT JOIN practice_sets as e ON e.id=eq.practice_set_id LEFT JOIN question_bank as b ON b.id=eq.question_id LEFT JOIN entity as et ON et.id=b.difficulty_level"
    );
    get_data.forEach(async (element, i) => {
      var answers = JSON.parse(element.answers);
      var options = JSON.parse(element.options);
      element.options = options;
      element.answers = answers;
      resp_data[i] = element;
    });
    g_response["status"] = "success";
    g_response["responsedata"] = resp_data;
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
    practice_set_id: "required|number",
    question_id: "required|number",
  };
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const valid_data = await validation(data, validationRule);
      var get_question = await SQL.gettabledata("question_bank", ["id"], {
        id: data.question_id,
      });
      if (get_question.length < 1) {
        g_response["status"] = "error";
        g_response["message"] = "Please Enter A Valid Question";
        g_status_code = 400;
        res.status(g_status_code).json(g_response);
      }
      var get_practice_question = await SQL.gettabledata(
        "practice_question",
        [],
        { practice_set_id: data.practice_set_id, question_id: data.question_id }
      );
      console.log(get_practice_question);
      if (get_practice_question.length > 0) {
        g_response["status"] = "error";
        g_response["message"] = "Already Exists";
        g_status_code = 400;
        res.status(g_status_code).json(g_response);
      } else {
        const update_data = await SQL.Updatedata("practice_question", data, {
          id: ID,
        });
        g_response["status"] = "success";
        g_response["responsedata"] = "Practice Question Updated Successfully";
        g_status_code = 201;
        res.status(g_status_code).json(g_response);
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

  if (
    req.params.practice_set_id &&
    req.params.practice_set_id.length > 0 &&
    req.params.question_id &&
    req.params.question_id.length > 0
  ) {
    try {
      var get_practice_question = await SQL.gettabledata(
        "practice_question",
        ["id"],
        {
          practice_set_id: req.params.practice_set_id,
          question_id: req.params.question_id,
        }
      );
      if (get_practice_question.length > 0) {
        deleteID = get_practice_question[0].id;
        const delete_resp = await questionDelete(deleteID);
        g_response["status"] = "success";
        g_response["message"] = "Practice Question Delete Successfully";
        g_status_code = 201;
      } else {
        g_response["status"] = "error";
        g_response["message"] = "No Data";
        g_status_code = 400;
      }
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
