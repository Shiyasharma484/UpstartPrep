const table = "question_bank";
const table_meta = "question_meta";
const { decodetheid, validation } = require("../helpers/common");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const SQL = require("../helpers/sql");
const Model = require("../helpers/instructions");
const con = require("../models/db.js");
const GLOBAL = require("../models/global");
exports.createQuestionBank = async (req, res) => {
  console.log(req.body);
  const validationRule = {
    skill: "required|number",
    questions: "required|string",
    options: "required|string",
    answers: "required|string",
  };
  const metaRule = {};

  var g_response = {};
  var g_status_code;
  var data = req.body;

  try {
    var meta_data = data.meta;
    const valid_data = await validation(data, validationRule);
    const validate_meta = await validation(meta_data, metaRule);
    const check_name = data.questions;
    const get_name = await SQL.gettabledata("question_bank", "id", {
      questions: check_name,
    });
    if (get_name[0]) {
      g_response["status"] = "error";
      g_response["message"] = "Question Already Exists";
      g_status_code = 200;
    } else {
      var rv = {};
      const new_data = Object.entries(data).map(([key, value]) => ({
        key,
        value,
      })); // to make array
      var newArray = new_data.filter(function (el) {
        return el.value != "" && el.value != null; // remove null values
      });
      newArray.forEach(async (items) => {
        rv[items.key] = items.value;
      });
      rv.options = JSON.stringify(rv.options);
      rv.answers = JSON.stringify(rv.answers);
      rv.description = JSON.stringify(rv.description);

      const create_data = await con.query(
        "INSERT INTO question_bank SET ?",
        [rv],
        (err, result) => {
          if (!err) {
            if (result && result.affectedRows > 0) {
              const LastID = result.insertId;

              const Response = {
                status: "success",
                message: "Question Created Successfully",
                id: LastID,
              };
              res.status(201).json(Response);
            } else {
              console.log(err);
              const Error = { status: "error", message: "Server Error" };
              res.status(400).json(Error);
            }
          } else if (err.fatal) {
            console.trace("fatal error: " + err.message);
          } else {
            console.log(err);
            const Error = { status: "error", message: "Server Error" };
            res.status(400).json(Error);
          }
        }
      );
      g_response["status"] = "success";
      g_response["message"] = `Question Created Successfully`;
      g_response["responsedata"] = create_data;
      g_status_code = 201;
    }
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }
  res.status(g_status_code).json(g_response);
};

const updatetQuestionMetaByquestionid = async (data, result) => {
  var db_meta_keys = [];
  var meta_update_sql = "";
  var meta_insert_sql = "";
  var sqlquery = "";
  var meta_insert_start =
    "INSERT INTO question_meta (question_id, question_key,value) VALUES ";

  const sql = await con.query(
    `SELECT GROUP_CONCAT(question_key) AS key_name FROM question_meta WHERE question_id=?`,
    [data.question_id],
    (err, response) => {
      if (response) {
        db_keys = Object.values(JSON.parse(JSON.stringify(response)));

        if (db_keys[0].key_name) {
          db_meta_keys = db_keys[0].key_name.split(",");
        }
        var meta_keys = Object.keys(data.save_data);

        meta_keys.forEach((eachkey) => {
          var typeof_data = typeof data.save_data[eachkey];

          console.log(data.save_data[eachkey]);
          data.save_data[eachkey] =
            typeof data.save_data[eachkey] === "object"
              ? JSON.stringify(data.save_data[eachkey])
              : data.save_data[eachkey];

          if (db_meta_keys.includes(eachkey)) {
            meta_update_sql =
              "UPDATE " +
              table_meta +
              " SET value='" +
              data.save_data[eachkey] +
              "' WHERE question_id='" +
              data.question_id +
              "' AND question_key='" +
              eachkey +
              "';";

            var update_store_meta = con.query(
              meta_update_sql,
              (error, sqlresult) => {
                if (error) {
                  const Error = {
                    status: "error",
                    message: error.message,
                  };
                  return Error, null;
                } else {
                  const success = {
                    status: "success",
                  };
                  return null, success;
                }
              }
            );
          } else {
            meta_insert_sql =
              meta_insert_start +
              "('" +
              data.question_id +
              "','" +
              eachkey +
              "','" +
              data.save_data[eachkey] +
              "');";
            console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
            console.log(meta_insert_sql);
            console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
            var update_store_meta = con.query(
              meta_insert_sql,
              (error, sqlresult) => {
                if (error) {
                  const Error = {
                    status: "error",
                    message: error.message,
                  };
                  return Error, null;
                } else {
                  const success = {
                    status: "success",
                  };
                  return null, success;
                }
              }
            );
          }
        });

        console.log(meta_insert_sql);
        meta_insert_sql = meta_insert_sql.slice(0, -1) + "; ";
        console.log(meta_insert_sql);
        if (meta_insert_sql !== "; ") {
          sqlquery = meta_insert_start + meta_insert_sql + meta_update_sql;
        } else {
          sqlquery = meta_update_sql;
        }
      }
    }
  );
};

exports.getQuestionBankByID = async (req, res) => {
  var ID;
  var meta = {};
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const get_data = await SQL.query(
        "SELECT DISTINCT q.id,q.skill as skill_id ,s.skill_name,q.difficulty_level,q.section ,q.description,se.section_name,q.topic , t.topic_name,q.questions,q.type,e.name as question_type,q.options, q.answers,q.active FROM question_bank as q LEFT JOIN skills as s ON s.id= q.skill LEFT JOIN sections as se ON se.id = q.section LEFT JOIN topics as t ON t.id=q.topic LEFT JOIN entity as e ON e.id= q.type WHERE  q.id=" +
          ID
      );

      console.log(JSON.parse(get_data[0].description));
      get_data[0].description = JSON.parse(get_data[0].description);
      get_data[0].options = JSON.parse(get_data[0].options);
      get_data[0].answers = JSON.parse(get_data[0].answers);

      get_data.forEach(async (item) => {
        const get_meta = await SQL.gettabledata(
          "question_meta",
          ["question_key", "value"],
          { question_id: item.id }
        );

        get_meta.forEach(async (item) => {
          meta[item.question_key] = item.value;
        });
      });
      setTimeout(function () {
        g_response["status"] = "success";
        g_response["responsedata"] = get_data;
        g_response["meta"] = meta;
        g_status_code = 200;
        res.status(g_status_code).json(g_response);
      }, 500);
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }

    res.status(g_status_code).json(g_response);
  }
};

exports.getAllQuestionBank = async (req, res) => {
  console.log(req.params);
  var ID;
  var total_counts = 0;
  var adminRole;
  var role;
  var user_id;
  var g_response = {};
  var g_status_code;
  var response_data = [];
  if (req.headers.token && req.headers.token.length > 0) {
    token = req.headers.token;
    try {
      var get_user_id = await SQL.gettabledata("users", [], {
        access_token: token,
      });
      console.log(get_user_id);
      var user_id = get_user_id[0].id;
      var get_role = await SQL.gettabledata("role", []);
      get_role.forEach((items) => {
        if (items.title == "super_admin") {
          adminRole = items.id;
        } else if (items.title == "instructor") {
          role = items.id;
        }
      });
      var get_Admin_data = await SQL.query(
        "SELECT * FROM users_role WHERE role='" +
          adminRole +
          "' AND users_id=" +
          user_id
      );

      if (get_Admin_data.length > 0) {
        const get_data = await SQL.query(
          "SELECT DISTINCT q.id,q.skill as skill_id ,s.skill_name,q.section ,q.description,q.difficulty_level,en.name as level_name,se.section_name,q.topic , t.topic_name,q.questions,q.type,e.name as question_type,q.options, q.answers,q.active FROM question_bank as q LEFT JOIN skills as s ON s.id= q.skill LEFT JOIN sections as se ON se.id = q.section LEFT JOIN topics as t ON t.id=q.topic LEFT JOIN entity as e ON e.id= q.type LEFT JOIN entity as en ON en.id=q.difficulty_level"
        );
        // get_data[0].answers = JSON.parse(get_data[0].answers);
        // get_data[0].description = JSON.parse(get_data[0].description);
        // get_data[0].options = JSON.parse(get_data[0].options);
        var data_res = await get_data.forEach(async (item, i) => {
          var get_meta = await SQL.gettabledata(
            "question_meta",
            ["question_key", "value"],
            {
              question_id: item.id,
            }
          );
          var metadata = {};
          await get_meta.forEach(async (element) => {
            if (element.value) {
              var meta_key = element.question_key.replace(" ", "_");
              // var values = JSON.parse(element.value);
              metadata[meta_key] = element.value;
            }
          });
          item.meta = metadata;
          response_data[i] = item;
          total_counts = response_data.length;
        });
      } else {
        var get_instructor = await SQL.query(
          `SELECT u.*,TRIM(BOTH '"' FROM JSON_EXTRACT(value, '$.skill_id')) as user_skill FROM users_role as u LEFT JOIN user_meta as m ON m.user_key='profileSettings'
           AND m.user_id=u.users_id WHERE u.users_id='${user_id}' AND u.role='${role}'`
        );

        get_instructor.forEach(async (items) => {
          var get_question_data = await SQL.query(
            "SELECT DISTINCT q.id,q.skill as skill_id ,s.skill_name,q.section ,q.description,q.difficulty_level,en.name as level_name,se.section_name,q.topic , t.topic_name,q.questions,q.type,e.name as question_type,q.options, q.answers,q.active FROM question_bank as q LEFT JOIN skills as s ON s.id= q.skill LEFT JOIN sections as se ON se.id = q.section LEFT JOIN topics as t ON t.id=q.topic LEFT JOIN entity as e ON e.id= q.type LEFT JOIN entity as en ON en.id=q.difficulty_level WHERE q.skill IN (" +
              items.user_skill +
              ") OR q.created_by='" +
              user_id +
              "'"
          );
          console.log("PPPPPPPPPPPPPPPPPPPPP");
          console.log(get_question_data.length);
          console.log("PPPPPPPPPPPPPPPPPPPPP");
          var data_res = await get_question_data.forEach(async (item, i) => {
            var get_meta = await SQL.gettabledata(
              "question_meta",
              ["question_key", "value"],
              {
                question_id: item.id,
              }
            );
            var metadata = {};
            await get_meta.forEach(async (element) => {
              if (element.value) {
                var meta_key = element.question_key.replace(" ", "_");
                var values = JSON.parse(element.value);
                metadata[meta_key] = values;
              }
            });
            item.meta = metadata;
            response_data[i] = item;
            total_counts = response_data.length;
          });

          // get_question_data.map((element) => {
          //   response_data.push(element);
          // });
        });
      }

      setTimeout(function () {
        g_response["status"] = "success";
        g_response["Total_Counts"] = total_counts;
        g_response["responsedata"] = response_data;
        g_status_code = 200;
        res.status(g_status_code).json(g_response);
      }, 500);

      // g_response["status"] = "success";
      // g_response["responsedata"] = get_tags;
      // g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;

      res.status(g_status_code).json(g_response);
    }
  }
};

exports.updateQuestionBankByID = async (req, res) => {
  var ID;
  console.log(req.body);
  var data = req.body;
  var g_response = {};
  var g_status_code;
  const validationRule = {
    skill: "required|number",
    questions: "required|string",
    options: "required|string",
    answers: "required|string",
  };
  const metaRule = {};
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      var meta_data = data.meta;
      delete data.meta;
      const valid_data = await validation(data, validationRule);
      const validate_meta = await validation(meta_data, metaRule);
      const check_name = data.questions;
      console.log(check_name);
      const get_name = await SQL.count(
        "question_bank",
        { questions: check_name },
        { id: ID }
      );

      if (get_name > 0) {
        g_response["status"] = "error";
        g_response["message"] = "Question Already Exists";
        g_status_code = 200;
      } else {
        var rv = {};
        const new_data = Object.entries(data).map(([key, value]) => ({
          key,
          value,
        })); // to make array
        var newArray = new_data.filter(function (el) {
          return el.value != ""; // remove null values
        });
        newArray.forEach(async (items) => {
          rv[items.key] = items.value;
        });
        delete data.meta;

        rv.options = JSON.stringify(rv.options);
        rv.answers = JSON.stringify(rv.answers);
        rv.description = JSON.stringify(rv.description);
        const update_data = await con.query(
          "UPDATE question_bank SET ? WHERE id=?", //only update variable trash n hide
          [rv, ID],
          (err, response) => {
            if (!err) {
              const Response = {
                status: "success",
              };
            } else {
              console.log(err);
              const Error = { status: "error", message: "Server Error" };
              res.status(400).json(Error);
            }
          }
        );

        const saveMeta = {};
        saveMeta.question_id = ID;

        saveMeta["save_data"] = validate_meta;

        var update_meta = updatetQuestionMetaByquestionid(saveMeta);
        g_response["status"] = "success";
        g_response["responsedata"] = "Question Updated Successfully";

        g_status_code = 201;
        res.status(g_status_code).json(g_response);
      }
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
      res.status(g_status_code).json(g_response);
    }
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
      const delete_resp = await QuestionDelete(deleteID);

      const meta_resp = await metaDelete(deleteID);
      var get_schedule = await SQL.gettabledata(
        "schedule",
        ["id", "event_id", "event_type"],
        { event_id: deleteID, event_type: "37" }
      );
      if (get_schedule.length > 0) {
        console.log(get_schedule);
        var scheduleID = get_schedule[0].id;
        console.log(scheduleID);
        console.log(deleteID);
        const delete_schedule = await questionScheduleDelete(scheduleID);
      }

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
const QuestionDelete = async (deleteID, result) => {
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
const questionScheduleDelete = async (id, result) => {
  let delete_payload = {
    table_name: "schedule",
    query_field: "id",
    query_value: id,
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

const metaDelete = async (deleteID, result) => {
  let delete_payload = {
    table_name: table_meta,
    query_field: "question_id",
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

exports.getQuestionTypesByParentID = async (req, res) => {
  console.log(req.params);
  var ID;

  var g_response = {};
  var g_status_code;

  if (req.params.parent_id && req.params.parent_id.length > 0) {
    ID = req.params.parent_id;
    var response_data = [];
    try {
      var get_data = await SQL.query(
        "SELECT  id,name,module_id,parent_id FROM entity  WHERE parent_id=" + ID
      );
      var data_res = await get_data.forEach(async (item, i) => {
        var get_meta = await SQL.gettabledata(
          "entity_meta",
          ["entity_key", "value"],
          {
            entity_id: item.id,
          }
        );
        var metadata = {};
        await get_meta.forEach(async (element) => {
          var meta_key = element.entity_key.replace(" ", "_");
          metadata[meta_key] = element.value;
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

exports.searchQuestions = async (req, res) => {
  var g_response = {};
  var g_status_code;
  var get_question_type = [];
  if (req.body && req.body.length != "undefined") {
    var search = req.body;

    try {
      if (search.length != "undefined") {
        var rv = {};
        const new_data = Object.entries(search).map(([key, value]) => ({
          key,
          value,
        })); // to make array
        var newArray = new_data.filter(function (el) {
          return el.value != ""; // remove null values
        });
        newArray.forEach(async (items) => {
          rv[items.key] = items.value;
        });

        var data = await SQL.findintabledata("question_bank", [], rv, null, [
          "type",
          "difficulty_level",
        ]);
      }
      data.forEach(async (element) => {
        var question_id = element.id;
        console.log(question_id);
        var get_question_type1 = await SQL.query(
          "SELECT DISTINCT q.id,q.skill as skill_id ,s.skill_name,q.section ,q.description,se.section_name,q.topic ,q.difficulty_level,en.name as level_name, t.topic_name,q.questions,q.type,e.name as question_type,q.difficulty_level,en.name as difficulty_level_name,q.options, q.answers,q.active FROM question_bank as q LEFT JOIN skills as s ON s.id= q.skill LEFT JOIN sections as se ON se.id = q.section LEFT JOIN topics as t ON t.id=q.topic LEFT JOIN entity as e ON e.id= q.type LEFT JOIN entity as en ON en.id= q.difficulty_level WHERE  q.id=" +
            question_id
        );

        get_question_type.push(get_question_type1[0]);
      });

      setTimeout(function () {
        g_response["status"] = "success";
        g_response["data"] = get_question_type;

        g_status_code = 200;

        res.status(g_status_code).json(g_response);
      }, 300);
    } catch {
      g_response["status"] = "error";
      g_response["message"] = "No Results found";
      g_status_code = 400;
      res.status(g_status_code).json(g_response);
    }
  }
};

exports.getQuestionBySectionID = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const get_data = await SQL.query(
        "SELECT DISTINCT q.id,q.skill as skill_id ,s.skill_name,q.description,q.difficulty_level,q.section ,se.section_name,q.topic , t.topic_name,q.questions,q.type,e.name as question_type,q.options, q.answers,q.active FROM question_bank as q LEFT JOIN skills as s ON s.id= q.skill LEFT JOIN sections as se ON se.id = q.section LEFT JOIN topics as t ON t.id=q.topic LEFT JOIN entity as e ON e.id= q.type WHERE q.section=" +
          ID
      );

      g_response["status"] = "success";
      g_response["responsedata"] = get_data;

      g_status_code = 200;
      res.status(g_status_code).json(g_response);
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }

    res.status(g_status_code).json(g_response);
  }
};

exports.getQuestionBankBySkills = async (req, res) => {
  var g_response = {};
  var g_status_code;
  var token;
  var new_array = [];
  if (req.headers.token && req.headers.token.length > 0) {
    token = req.headers.token;
    try {
      var get_user_id = await SQL.gettabledata("users", [], {
        access_token: token,
      });
      console.log(get_user_id);
      var user_id = get_user_id[0].id;
      var get_role = await SQL.gettabledata("role", ["id"], {
        title: "instructor",
      });
      var role = get_role[0].id;
      var get_instructor = await SQL.query(
        `SELECT u.*,TRIM(BOTH '"' FROM JSON_EXTRACT(value, '$.skill_id')) as user_skill FROM users_role as u LEFT JOIN user_meta as m ON m.user_key='profileSettings'
         AND m.user_id=u.users_id WHERE u.users_id='${user_id}' AND u.role='${role}'`
      );

      get_instructor.forEach(async (items) => {
        var get_question_data = await SQL.query(
          "SELECT * FROM question_bank WHERE skill IN (" +
            items.user_skill +
            ") OR created_by='" +
            user_id +
            "'"
        );

        get_question_data.map((element) => {
          new_array.push(element);
        });
      });

      setTimeout(function () {
        g_response["status"] = "success";
        g_response["responsedata"] = new_array;
        g_status_code = 200;
        res.status(g_status_code).json(g_response);
      }, 200);
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
      res.status(g_status_code).json(g_response);
    }
  }
};
