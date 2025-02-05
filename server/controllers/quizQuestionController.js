const table = "quiz_question";
const { decodetheid, validation } = require("../helpers/common");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const SQL = require("../helpers/sql");
const Model = require("../helpers/instructions");

exports.createQuizQuestion = async (req, res) => {
  console.log(req.body);
  const validationRule = {
    quiz_id: "required|number",
    questions: "required|number",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;

  try {
    const valid_data = await validation(data, validationRule);

    // const check_questions = data.questions;
    // console.log(check_questions);
    // const get_quiz = await SQL.gettabledata("quiz_question", "id", {
    //   questions: check_questions,
    // });
    // if (get_quiz[0]) {
    //   g_response["status"] = "error";
    //   g_response["message"] = "Question Already Exists";
    //   g_status_code = 200;
    // } else {
    const create_data = await SQL.addData("quiz_question", data);
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

exports.getQuizQuestionByQuizID = async (req, res) => {
  console.log(req.params);
  var ID;

  var response_data = [];
  var g_response = {};
  var g_status_code;
  if (req.params.quiz_id && req.params.quiz_id.length > 0) {
    ID = req.params.quiz_id;
    console.log(ID);
    try {
      const get_data =
        "SELECT eq.id,eq.quiz_id,e.title,eq.questions as question_id,b.skill,s.skill_name,b.topic,t.topic_name,b.type,en.name as question_type,b.questions,b.description,b.difficulty_level,et.name as level_name,b.options,b.answers,b.active FROM quiz_question as eq LEFT JOIN quiz as e ON e.id=eq.quiz_id LEFT JOIN question_bank as b ON b.id=eq.questions LEFT JOIN skills as s ON s.id=b.skill LEFT JOIN topics as t ON t.id=b.topic LEFT JOIN entity as en ON en.id=b.type LEFT JOIN entity as et ON et.id=b.difficulty_level WHERE eq.quiz_id=" +
        ID;
      console.log(get_data);
      var main_data = await SQL.query(get_data);
      console.log(main_data);
      var data_res = await main_data.forEach(async (item, i) => {
        var get_meta = await SQL.gettabledata(
          "question_meta",
          ["question_key", "value"],
          {
            question_id: item.question_id,
          }
        );
        var metadata = {};
        await get_meta.forEach(async (element) => {
          var meta_key = element.question_key.replace(" ", "_");
          var values = JSON.parse(element.value);
          metadata[meta_key] = values;
        });
        item.meta = metadata;
        response_data[i] = item;
      });

      setTimeout(function () {
        g_response["status"] = "success";
        g_response["responsedata"] = response_data;
        g_status_code = 200;
        res.status(g_status_code).json(g_response);
      }, 500);
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
      res.status(g_status_code).json(g_response);
    }
  }
};
exports.getQuizQuestionByQuestionID = async (req, res) => {
  console.log(req.params);
  var ID;
  var meta = {};
  var response_data = [];
  var g_response = {};
  var g_status_code;
  if (req.params.question_id && req.params.question_id.length > 0) {
    ID = req.params.question_id;

    try {
      const get_data = await SQL.query(
        "SELECT eq.id,eq.quiz_id,e.title,eq.questions as question_id,b.skill,s.skill_name,b.topic,t.topic_name,b.type,en.name as question_type,b.description,b.questions,b.difficulty_level,b.options,b.answers,b.active FROM quiz_question as eq LEFT JOIN quiz as e ON e.id=eq.quiz_id LEFT JOIN question_bank as b ON b.id=eq.questions LEFT JOIN skills as s ON s.id=b.skill LEFT JOIN topics as t ON t.id=b.topic LEFT JOIN entity as en ON en.id=b.type WHERE eq.questions=" +
          ID
      );
      get_data.forEach(async (item, i) => {
        const get_meta = await SQL.gettabledata(
          "question_meta",
          ["question_key", "value"],
          { question_id: item.question_id }
        );
        var metadata = {};
        await get_meta.forEach(async (element) => {
          var meta_key = element.question_key.replace(" ", "_");
          var values = JSON.parse(element.value);
          metadata[meta_key] = values;
        });
        item.meta = metadata;
        response_data[i] = item;
      });

      setTimeout(function () {
        g_response["status"] = "success";
        g_response["responsedata"] = response_data;
        g_status_code = 200;
        res.status(g_status_code).json(g_response);
      }, 500);

      // g_response["status"] = "success";
      // g_response["responsedata"] = get_data;
      // g_response["meta"] = meta;
      // g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;

      res.status(g_status_code).json(g_response);
    }
  }
};

exports.getAllQuizQuestion = async (req, res) => {
  console.log(req.params);
  var ID;
  var g_response = {};
  var g_status_code;

  try {
    const get_data = await SQL.query(
      "SELECT eq.id,eq.quiz_id,e.title,eq.questions as question_id,b.skill,s.skill_name,b.topic,t.topic_name,b.type,en.name as question_type,b.questions,b.description,b.difficulty_level,et.name as level_name,b.options,b.answers,b.active FROM quiz_question as eq LEFT JOIN quiz as e ON e.id=eq.quiz_id LEFT JOIN question_bank as b ON b.id=eq.questions LEFT JOIN skills as s ON s.id=b.skill LEFT JOIN topics as t ON t.id=b.topic LEFT JOIN entity as en ON en.id=b.type LEFT JOIN entity as et ON et.id=b.difficulty_level "
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
    quiz_id: "required|number",
    questions: "required|number",
  };
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const valid_data = await validation(data, validationRule);
      const update_data = await SQL.Updatedata("quiz_question", data, {
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
    req.params.quiz_id &&
    req.params.quiz_id.length > 0 &&
    req.params.question_id &&
    req.params.question_id.length > 0
  ) {
    try {
      var get_delete_id = await SQL.gettabledata("quiz_question", ["id"], {
        quiz_id: req.params.quiz_id,
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
