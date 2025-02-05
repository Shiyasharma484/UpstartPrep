const table = "quiz";
const { decodetheid, validation } = require("../helpers/common");
const con = require("../models/db.js");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const SQL = require("../helpers/sql");
const Model = require("../helpers/instructions");
const table_meta = "quiz_meta";

exports.createQuiz = async (req, res) => {
  console.log(req.body);
  const validationRule = {
    title: "required|string",
    category_id: "required|number",
    quiz_type: "required|number",
  };
  const metaRule = {};
  var g_response = {};
  var g_status_code;
  var data = req.body;
  var metadata = data.meta;
  var in_price = data.price;
  try {
    const valid_data = await validation(data, validationRule);

    const check_title = data.title;
    console.log(check_title);
    const get_exam_title = await SQL.gettabledata("quiz", "id", {
      title: check_title,
    });
    if (get_exam_title[0]) {
      g_response["status"] = "error";
      g_response["message"] = "Quiz Already Exists";
      g_status_code = 200;
    } else {
      if (data.points != 1) {
        delete data.redeem_points;
      }
      if (data.free == 1) {
        data.price = Number(in_price);
      } else {
        delete data.price;
      }
      const create_data = await SQL.addData("quiz", data);
      const get_Add_data = await SQL.gettabledata("quiz", [], {
        id: create_data,
      });
      g_response["status"] = "success";
      g_response["message"] = `Quiz Created  Successfully`;
      g_response["data"] = get_Add_data;
      g_status_code = 201;
    }
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = "Invalid Details";
    g_status_code = 400;
  }
  res.status(g_status_code).json(g_response);
};

const updatetExamMetaByExamid = async (data, result) => {
  var db_meta_keys = [];
  var meta_update_sql = "";
  var meta_insert_sql = "";
  var sqlquery = "";
  var meta_insert_start =
    "INSERT INTO quiz_meta (quiz_id, quiz_key,value) VALUES ";

  const sql = await con.query(
    `SELECT GROUP_CONCAT(quiz_key) AS key_name FROM quiz_meta WHERE quiz_id=?`,
    [data.quiz_id],
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
              "' WHERE quiz_id='" +
              data.quiz_id +
              "' AND quiz_key='" +
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
              data.quiz_id +
              "','" +
              eachkey +
              "','" +
              data.save_data[eachkey] +
              "');";

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

exports.getQuizByID = async (req, res) => {
  var ID;
  var db_meta_keys = {};
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      var get_data = await SQL.query(
        "SELECT DISTINCT q.id,q.created_by, q.title,q.category_id,s.category_name,q.quiz_type,e.name as quiz_name,q.price,q.free,q.description,q.points,q.redeem_points,q.visibility,q.active FROM quiz as q LEFT JOIN categories as s ON s.id = q.category_id LEFT JOIN entity as e ON e.id= q.quiz_type  WHERE q.id=" +
          ID
      );
      var get_total_questions = await SQL.query(
        "SELECT COUNT(questions) as total_questions FROM quiz_question WHERE quiz_id=" +
          ID
      );

      get_data[0].Total_questions = get_total_questions[0].total_questions;
      var meta_data = await SQL.gettabledata(
        "quiz_meta",
        ["quiz_key", "value"],
        { quiz_id: ID }
      );
      if (meta_data.length > 0) {
        var db_keys = Object.values(meta_data);
        db_keys.forEach(async (item) => {
          var values = JSON.parse(item.value);
          db_meta_keys[item.quiz_key] = values;
        });
        var single_quest_score;
        if (db_meta_keys.settings.marksforCorrectAnswer == undefined) {
          single_quest_score = 1;
        } else {
          single_quest_score = db_meta_keys.settings.marksforCorrectAnswer;
        }

        var total_marks =
          single_quest_score * get_total_questions[0].total_questions;
        console.log(total_marks);
      }

      get_data[0].total_marks = total_marks;
      g_response["status"] = "success";
      g_response["data"] = get_data;
      g_response["meta"] = db_meta_keys;
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

exports.getAllQuiz = async (req, res) => {
  var ID;
  var db_meta_keys = {};
  var g_response = {};
  var g_status_code;

  try {
    var get_data = await SQL.query(
      "SELECT DISTINCT q.id, q.title,q.category_id,s.category_name,q.quiz_type,e.name as quiz_name,q.price,q.free,q.description,q.points,q.redeem_points,q.visibility,q.active FROM quiz as q LEFT JOIN categories as s ON s.id = q.category_id LEFT JOIN entity as e ON e.id= q.quiz_type "
    );

    console.log(get_data);
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



exports.getAllQuizByInstructor = async (req, res) => {
  var ID;
  var db_meta_keys = {};
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      var get_data = await SQL.query(
        "SELECT DISTINCT q.id,q.created_by, q.title,q.category_id,s.category_name,q.quiz_type,e.name as quiz_name,q.free,q.price,q.description,q.points,q.redeem_points,q.visibility,q.active FROM quiz as q LEFT JOIN categories as s ON s.id = q.category_id LEFT JOIN entity as e ON e.id= q.quiz_type LEFT JOIN users as u ON q.created_by= u.id WHERE FIND_IN_SET('" +
          ID +
          "',u.id ) ORDER BY q.id ASC"
      );

      console.log(get_data);
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

exports.updateQuizByID = async (req, res) => {
  var ID;
  const validationRule = {
    title: "required|string",
    category_id: "required|number",
    quiz_type: "required|number",
  };
  const metaRule = {};
  var g_response = {};
  var g_status_code;
  var data = req.body;
  var metadata = data.meta;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      if (data.points != 1) {
        delete data.redeem_points;
      }
      if (data.free == 1) {
        data.price = Number(data.price);
      } else {
        delete data.price;
      }
      delete data.meta;
      const valid_data = await validation(data, validationRule);

      const validate_meta = await validation(metadata, metaRule);

      const check_name = data.title;
      console.log(check_name);
      const get_category_name = await SQL.count(
        "quiz",
        { title: check_name },
        { id: ID }
      );
      if (get_category_name > 0) {
        g_response["status"] = "error";
        g_response["message"] = "Quiz Already Exists";
        g_status_code = 200;
      } else {
        const update_data = await SQL.Updatedata("quiz", data, {
          id: ID,
        });

        const saveMeta = {};
        saveMeta.quiz_id = ID;
        saveMeta["save_data"] = validate_meta;
        var Update_meta_response = await updatetExamMetaByExamid(saveMeta);

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
      const delete_resp = await QuizDelete(deleteID);
      const delete_meta = await metaDelete(deleteID);
      var get_schedule = await SQL.gettabledata(
        "schedule",
        ["id", "event_id", "event_type"],
        { event_id: deleteID, event_type: "29" }
      );
      console.log(get_schedule);
      if (get_schedule.length > 0) {
        get_schedule.forEach(async (element) => {
          var scheduleID = element.id;
          const delete_schedule = await practiceScheduleDelete(scheduleID);
        });
      }
      g_response["status"] = "success";
      g_response["message"] = "Quiz Delete Successfully";
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};
const QuizDelete = async (deleteID, result) => {
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
const metaDelete = async (deleteID, result) => {
  let delete_payload = {
    table_name: table_meta,
    query_field: "quiz_id",
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

const practiceScheduleDelete = async (id, result) => {
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

exports.getQuizQuestionsByID = async (req, res) => {
  var ID;
  var db_meta_keys = {};
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      if (req.body.schedule_id && req.body.schedule_id != undefined) {
        var schedule_id = req.body.schedule_id;
        var student_id = req.body.student_id;
        var get_exam_schedule = await SQL.gettabledata(
          "quiz_marks_obtained",
          [],
          { quiz_id: ID, schedule_id: schedule_id,student_id:student_id }
        );
        console.log(get_exam_schedule.length);
        if (get_exam_schedule.length >= 1) {
          g_response["success"] = "success";

          g_response["message"] = "Already Attempted";

          g_status_code = 201;
          res.status(g_status_code).json(g_response);
        } else {
          var get_data = await SQL.query(
            `SELECT q.id as quiz_id,qu.id,qu.questions as question_id,q.title,q.category_id,q.free,q.quiz_type,b.description,b.questions,b.difficulty_level,b.options,q.points,q.redeem_points,q.visibility,q.active FROM quiz as q LEFT JOIN quiz_question as qu ON qu.quiz_id=q.id LEFT JOIN question_bank as b ON b.id=qu.questions WHERE q.id=${ID} AND q.active=1 `
          );
          get_data.forEach((item,i)=>{
            get_data[i].description = JSON.parse(item.description);
          })
        
          var get_duration = await SQL.gettabledata(
            "exam_section",
            ["duration"],
            {
              exam_id: ID,
            }
          );
          get_data.forEach(async (element, index) => {
            const changedOptions = JSON.parse(element.options);
            changedOptions.forEach((items, i) => {
              items["checked"] = false;

              const changedObject = JSON.stringify(items);

              changedOptions[i] = items;

              const changedelement = JSON.stringify(changedOptions);
              get_data[index].options = changedOptions;
            });
          });

          var meta_data = await SQL.gettabledata(
            "quiz_meta",
            ["quiz_key", "value"],
            { quiz_id: ID }
          );
          var db_keys = Object.values(meta_data);
          db_keys.forEach(async (item) => {
            var values = JSON.parse(item.value);
            db_meta_keys[item.quiz_key] = values;
          });
        }
      }

      g_response["status"] = "success";
      g_response["message"] = "Quiz Data";
      g_response["data"] = get_data;
      if (get_duration.length > 0) {
        g_response["duration"] = get_duration[0].duration;
      } else {
        g_response["duration"] = 240;
      }

      g_response["meta"] = db_meta_keys;
      g_status_code = 200;
      res.status(g_status_code).json(g_response);
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
      res.status(g_status_code).json(g_response);
    }
  }
};
exports.QuizTaken = async (req, res) => {
  var data = req.body;
  var token = req.headers.token;
  var g_response = {};
  var g_status_code;
  try {
    var get_student_id = await SQL.gettabledata("users", ["id"], {
      access_token: token,
    });
    var student_id = req.body.student_id;
    data.student_id = student_id;
    data.answers = JSON.stringify(data.answers);
    var create_data = await SQL.addData("quiz_answers", data);
    console.log(create_data);
    data.quiz_answer_id = create_data;
    var exam_checking = await quiz_check(data);
    console.log(exam_checking);
    g_response["success"] = "success";
    g_response["message"] = "Quiz Taken Successfully";
    g_response["marks_obtained_id"] = exam_checking;
    g_status_code = 201;
    res.status(g_status_code).json(g_response);
  } catch {
    g_response["status"] = "error";
    g_response["message"] = "Invalid Details";
    g_status_code = 400;
    res.status(g_status_code).json(g_response);
  }
};

const quiz_check = async (req, res) => {
  var exam_correct = [];
  var exam_incorrect = [];
  var exam_not_attempted = [];
  var exam_attempted = [];
  var exam_marks = [];
  var student_answers = [];
  var total_questions = 0;
  var passing_marks = 0;
  var resp_data = [];
  var result;
  var pass_percentage1;
  var marks_for_correct_answers;
  var negative_marks;
  var quiz_id = req.quiz_id;
  var quiz_answers_table_id = req.quiz_answer_id;
  var get_questions = await SQL.query(
    "SELECT q.id as quiz_id,b.id as question_id,b.questions,b.description,b.difficulty_level,b.options,b.answers FROM quiz as q LEFT JOIN quiz_question as qq ON q.id=qq.quiz_id LEFT JOIN question_bank as b ON b.id=qq.questions WHERE q.id=" +
      quiz_id
  );

  get_questions.forEach(async (element) => {
    var question_id = element.question_id;
    var new_data = JSON.parse(element.options);
    var student_ans = JSON.parse(req.answers);

    student_answers.push(student_ans);

    if (student_ans[question_id] != undefined) {
      exam_attempted.push(question_id);
      var exam_ans = JSON.parse(element.answers);
      console.log(exam_ans.key + "==========" + student_ans[question_id]);
      if (exam_ans.key == student_ans[question_id]) {
        exam_correct.push(question_id);
      } else {
        exam_incorrect.push(question_id);
      }
    } else {
      exam_not_attempted.push(question_id);
    }
    //=========================================================================================//
  });

  var get_meta = await SQL.gettabledata("quiz_meta", ["quiz_key", "value"], {
    quiz_id: quiz_id,
  });
  get_meta.forEach(async (items) => {
    resp_data[items.quiz_key] = JSON.parse(items.value);
  });

  
  if(resp_data.settings.negativMarks.length > 0){
    var negative_marks1 = resp_data.settings.negativMarks;

    if (negative_marks1 > 0) {
      negative_marks = negative_marks1;
    } else {
      negative_marks = 0;
    }
  }



  console.log(negative_marks1);
  var marksforCorrectAnswer1 = resp_data.settings.marksforCorrectAnswer;
  console.log(marksforCorrectAnswer1);
  pass_percentage1 = resp_data.settings.pass_percentage;

  if (marksforCorrectAnswer1 >= 1) {
    marks_for_correct_answers = marksforCorrectAnswer1;
  } else {
    marks_for_correct_answers = 1;
  }

  total_questions = exam_attempted.length + exam_not_attempted.length;

  var kk = Number(pass_percentage1[0]) * Number(total_questions);

  passing_marks = kk / 100;
  console.log(passing_marks);

  if (
    passing_marks <=
    exam_correct.length * marks_for_correct_answers -
      negative_marks * exam_incorrect.length
  ) {
    result = "Pass";
  } else {
    result = "Fail";
  }
  console.log("PPPPPPPPPPPPPPPPPPPPPPPP");
  console.log(exam_correct.length);
  console.log(marks_for_correct_answers);
  console.log(negative_marks);
  console.log(exam_incorrect.length);

  console.log("PPPPPPPPPPPPPPPPPPPPPPPP");
  var exam_marks_obtained = await SQL.addData("quiz_marks_obtained", {
    quiz_id: quiz_id,
    student_id: req.student_id,
    schedule_id: req.schedule_id,
    answer_id: quiz_answers_table_id,
    student_answers: JSON.stringify(student_answers),
    exam_attempted: exam_attempted,
    exam_not_attempted: exam_not_attempted,
    correct_answers: exam_correct,
    incorrect_answers: exam_incorrect,
    total_correct: exam_correct.length,
    total_incorrect: exam_incorrect.length,
    total_not_attempted: exam_not_attempted.length,
    total_attempted: exam_attempted.length,
    negative_marks: negative_marks,
    total_questions: total_questions,
    obtained_marks:
      exam_correct.length * marks_for_correct_answers -
      negative_marks * exam_incorrect.length,
    total_score: total_questions * marks_for_correct_answers,
    result: result,
  });
  return exam_marks_obtained;
};

exports.getQuizzesByLevel = async (req, res) => {
  var ID;
  var level;
  var resp_data = [];
  var g_response = {};
  var g_status_code;
  if (req.params.quiz_id && req.params.quiz_id.length > 0) {
    level = req.params.quiz_id;

    try {
      var get_diffi_level = await SQL.query(
        "SELECT DISTINCT q.id as quiz_id,GROUP_CONCAT(b.id) as question_id,b.difficulty_level,e.name as level_name,GROUP_CONCAT(b.questions) as questions,b.description,b.section,b.active,o.schedule_id,o.student_id,o.student_answers,o.correct_answers,o.total_correct,o.incorrect_answers,o.total_incorrect,o.exam_not_attempted,o.total_not_attempted,o.total_attempted,o.exam_attempted,o.negative_marks,o.obtained_marks,o.total_score,o.datetime FROM quiz as q LEFT JOIN quiz_question as qq ON qq.quiz_id=q.id LEFT JOIN question_bank as b ON FIND_IN_SET(qq.questions,b.id) LEFT JOIN entity as e ON e.id=b.difficulty_level LEFT JOIN quiz_marks_obtained as o ON o.quiz_id= q.id WHERE b.difficulty_level=" +
          level
      );
      console.log(get_diffi_level);
      // get_diffi_level.forEach(async (element) => {
      //   var difficulty_level = element.difficulty_level;
      //   console.log(difficulty_level);
      //   var section = element.section;
      //   console.log(section);
      // });
      // try {
      // var get_data = await SQL.query(
      //   "SELECT DISTINCT q.id as quiz_id,qq.questions as question_id,o.*,b.difficulty_level,b.section,e.name as level_name,b.questions,b.questions,b.options,b.answers,b.active FROM quiz as q LEFT JOIN quiz_question as qq ON qq.quiz_id=q.id LEFT JOIN question_bank as b ON b.id=qq.questions LEFT JOIN entity as e ON e.id=b.difficulty_level LEFT JOIN quiz_marks_obtained as o ON o.quiz_id= q.id WHERE q.id='" +
      //     quiz_id +
      //     "' AND b.difficulty_level='" +
      //     level +
      //     "'"
      // );
      // get_data.forEach(async (element, i) => {
      //   element.options = JSON.parse(element.options);
      //   element.answers = JSON.parse(element.answers);
      //   resp_data[i] = element;
      // });
      g_response["status"] = "success";
      g_response["data"] = get_diffi_level;
      g_status_code = 200;
      res.status(g_status_code).json(g_response);
      // } catch {
      //   g_response["status"] = "error";
      //   g_response["message"] = get_diffi_level;
      //   g_status_code = 400;
      //   res.status(g_status_code).json(g_response);
      // }
    } catch {
      g_response["status"] = "error";
      g_response["message"] = "Invalid Details";
      g_status_code = 400;
      res.status(g_status_code).json(g_response);
    }
  }
};

exports.GetQuizTaken = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      var get_data = await SQL.gettabledata("quiz_marks_obtained", [], {
        id: ID,
      });
      g_response["success"] = "success";
      g_response["message"] = get_data;
      g_status_code = 200;
      res.status(g_status_code).json(g_response);
    } catch {
      g_response["status"] = "error";
      g_response["message"] = "Invalid Details";
      g_status_code = 400;
      res.status(g_status_code).json(g_response);
    }
  }
};

exports.GetQuizTakenByQuizID = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.quiz_id && req.params.quiz_id.length > 0) {
    ID = req.params.quiz_id;

    try {
      var get_data = await SQL.query(
        "SELECT o.id,o.quiz_id,e.title as quiz_title,o.schedule_id,s.event_type,m.name as event_name,o.student_id,CONCAT(u.first_Name,u.last_Name) as student_name,o.student_answers,o.correct_answers,o.total_correct,o.incorrect_answers,o.total_incorrect,o.exam_not_attempted,o.total_not_attempted,o.total_attempted,o.exam_attempted,o.negative_marks,o.obtained_marks,o.total_score,o.datetime FROM quiz_marks_obtained as o LEFT JOIN quiz as e ON e.id=o.quiz_id LEFT JOIN users as u ON u.id=o.student_id LEFT JOIN schedule as s ON s.id=o.schedule_id LEFT JOIN modules as m ON m.id=s.event_type WHERE o.quiz_id=" +
          ID
      );

      g_response["success"] = "success";
      g_response["message"] = get_data;
      g_status_code = 200;
      res.status(g_status_code).json(g_response);
    } catch {
      g_response["status"] = "error";
      g_response["message"] = "Invalid Details";
      g_status_code = 400;
      res.status(g_status_code).json(g_response);
    }
  }
};
exports.GetQuizTakenByScheduleID = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      var get_data = await SQL.query(
        "SELECT o.id,o.quiz_id,e.title,e.exam_type,o.schedule_id,s.schedule_type,s.start_date,s.end_date,s.start_time,s.end_time,s.event_id,s.event_type,m.name as event_type_name,o.student_id,CONCAT(u.first_Name,u.last_Name) as student_name,o.student_answers,o.correct_answers,o.total_correct,o.incorrect_answers,o.total_incorrect,o.exam_not_attempted,o.total_not_attempted,o.total_attempted,o.exam_attempted,o.negative_marks,o.obtained_marks,o.total_score,o.datetime FROM quiz_marks_obtained as o LEFT JOIN schedule as s ON s.id=o.schedule_id LEFT JOIN exams as e ON e.id=o.schedule_id LEFT JOIN modules as m ON m.id=s.event_type LEFT JOIN users as u ON u.id=o.student_id WHERE o.schedule_id=" +
          ID
      );

      g_response["success"] = "success";
      g_response["message"] = get_data;
      g_status_code = 200;
      res.status(g_status_code).json(g_response);
    } catch {
      g_response["status"] = "error";
      g_response["message"] = "Invalid Details";
      g_status_code = 400;
      res.status(g_status_code).json(g_response);
    }
  }
};
exports.GetQuizTakenByStudentID = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      var get_data = await SQL.query(
        "SELECT o.id,o.quiz_id,o.schedule_id,o.student_id,CONCAT(u.first_Name,' ',u.last_Name) as student_name,o.student_answers,o.correct_answers,o.total_correct,o.incorrect_answers,o.total_incorrect,o.exam_not_attempted,o.total_not_attempted,o.total_attempted,o.exam_attempted,o.negative_marks,o.obtained_marks,o.total_score,o.datetime FROM quiz_marks_obtained as o LEFT JOIN users as u ON u.id=o.student_id WHERE o.student_id=" +
          ID
      );
      g_response["success"] = "success";
      g_response["message"] = get_data;
      g_status_code = 200;
      res.status(g_status_code).json(g_response);
    } catch {
      g_response["status"] = "error";
      g_response["message"] = "Invalid Details";
      g_status_code = 400;
      res.status(g_status_code).json(g_response);
    }
  }
};

exports.QuizScoreObtained = async (req, res) => {
  var ID;
  var level;
  var resp_data = [];
  var g_response = {};
  var g_status_code;
  var WHERE = "";
  if (req.params.id != "all") {
    WHERE = 'where e.id="' + req.params.id + '"';
  }
  try {
    var get_data = await SQL.query(
      "SELECT e.id,e.quiz_id,ex.title,e.schedule_id,e.student_id,e.answer_id,CONCAT(u.first_Name,u.last_Name)as student_name,e.correct_answers,e.total_correct,e.incorrect_answers,e.total_incorrect,e.exam_not_attempted,e.total_not_attempted,e.total_attempted,e.exam_attempted,e.negative_marks,e.total_questions,e.total_score,e.obtained_marks,e.result,e.datetime FROM quiz_marks_obtained as e LEFT JOIN quiz as ex ON ex.id=e.quiz_id LEFT JOIN users as u ON u.id=e.student_id " +
        WHERE
    );
    if (req.params.id != "all") {
      var student_id = get_data[0].student_id;
      var schedule_id = get_data[0].schedule_id;
      var quiz_id = get_data[0].quiz_id;
      var answer_id = get_data[0].answer_id;

      WHERE = 'where e.id="' + req.params.id + '"';
      var get_questions = [];
      if (domainpath == "http://localhost:8000") {
        get_questions = await SQL.query(
          `SELECT e.quiz_id,b.*,TRIM(BOTH '"' FROM JSON_EXTRACT(a.answers, CONCAT("$.",b.id)))  as student_answer,m.value as solution FROM quiz_question as e LEFT JOIN question_bank as b ON b.id=e.questions LEFT JOIN quiz_answers as a ON  a.id='` +
            answer_id +
            `' LEFT JOIN question_meta as m ON m.question_id=b.id AND m.question_key='solution' WHERE e.quiz_id='` +
            quiz_id +
            `' ORDER by b.id ASC`
        );

      } else if (domainpath == "http://upstartprep.com:5000/") {
        get_questions = await SQL.query( `SELECT e.quiz_id,b.*,TRIM(BOTH '"' FROM JSON_EXTRACT(a.answers, CONCAT('$."',b.id,'"')))   as student_answer,m.value as solution FROM quiz_question as e LEFT JOIN question_bank as b ON b.id=e.questions LEFT JOIN quiz_answers as a ON  a.id='` +
          answer_id +
          `' LEFT JOIN question_meta as m ON m.question_id=b.id AND m.question_key='solution' WHERE e.quiz_id='` +
          quiz_id +
          `' ORDER by b.id ASC`);
      }
      get_questions.forEach((item,i)=>{
        get_questions[i].description = JSON.parse(item.description);
      })
      get_data[0]["details"] = get_questions;
    }

    g_response["message"] = "success";
    g_response["data"] = get_data;
    g_status_code = 200;
    res.status(g_status_code).json(g_response);
  } catch {
    g_response["status"] = "error";
    g_response["message"] = "Invalid Details";
    g_status_code = 400;
    res.status(g_status_code).json(g_response);
  }
};

exports.ExamScoreObtainedByStudentID = async (req, res) => {
  var ID;
  var level;
  var resp_data = [];
  var g_response = {};
  var g_status_code;
  var WHERE = "";
  if (req.params.id != "all") {
    WHERE = 'where e.student_id="' + req.params.id + '"';
  }
  try {
    var get_data = await SQL.query(
      "SELECT e.id,e.quiz_id,ex.title,e.schedule_id,e.student_id,e.answer_id,CONCAT(u.first_Name,u.last_Name)as student_name,e.correct_answers,e.total_correct,e.incorrect_answers,e.total_incorrect,e.exam_not_attempted,e.total_not_attempted,e.total_attempted,e.exam_attempted,e.negative_marks,e.total_questions,e.total_score,e.obtained_marks,e.result,e.datetime FROM quiz_marks_obtained as e LEFT JOIN quiz as ex ON ex.id=e.quiz_id LEFT JOIN users as u ON u.id=e.student_id " +
        WHERE
    );
    if (req.params.id != "all") {
      var student_id = get_data[0].student_id;
      var schedule_id = get_data[0].schedule_id;
      var quiz_id = get_data[0].quiz_id;
      var answer_id = get_data[0].answer_id;
      WHERE = 'where e.student_id="' + req.params.id + '"';
      var get_questions = [];
      if (domainpath == "http://localhost:8000") {
        get_questions = await SQL.query(
          `SELECT e.quiz_id,b.*,TRIM(BOTH '"' FROM JSON_EXTRACT(ea.answers, CONCAT("$.",b.id))) as student_answer,m.value as solution FROM quiz_question as e LEFT JOIN question_bank as b ON b.id=e.questions LEFT JOIN quiz_answers as ea ON ea.id='` +
            answer_id +
            `' LEFT JOIN question_meta as m ON m.question_id=b.id AND m.question_key='solution' WHERE e.quiz_id='` +
            quiz_id +
            `'`
        );
      } else if (domainpath == "http://upstartprep.com:5000/") {
        get_questions = await SQL.query(
          `SELECT e.quiz_id,b.*,TRIM(BOTH '"' FROM JSON_EXTRACT(ea.answers, CONCAT('$."',b.id,'"'))) as student_answer,m.value as solution FROM quiz_question as e LEFT JOIN question_bank as b ON b.id=e.questions LEFT JOIN quiz_answers as ea ON ea.id='` +
            answer_id +
            `' LEFT JOIN question_meta as m ON m.question_id=b.id AND m.question_key='solution' WHERE e.quiz_id='` +
            quiz_id +
            `'`
        );
      }

      get_data[0]["details"] = get_questions;
    }

    g_response["message"] = "success";
    g_response["data"] = get_data;
    g_status_code = 200;
    res.status(g_status_code).json(g_response);
  } catch {
    g_response["status"] = "error";
    g_response["message"] = "Invalid Details";
    g_status_code = 400;
    res.status(g_status_code).json(g_response);
  }
};
exports.ExamScoreObtainedByInstructorID = async (req, res) => {
  var ID;
  var level;
  var resp_data = [];
  var g_response = {};
  var g_status_code;
  var WHERE = "";
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      var get_data = await SQL.query(
        "SELECT e.id,e.quiz_id,ex.title,e.schedule_id,e.student_id,e.answer_id,CONCAT(u.first_Name,u.last_Name)as student_name,e.correct_answers,e.total_correct,e.incorrect_answers,e.total_incorrect,e.exam_not_attempted,e.total_not_attempted,e.total_attempted,e.exam_attempted,e.negative_marks,e.total_questions,e.total_score,e.obtained_marks,e.result,e.datetime FROM quiz_marks_obtained as e LEFT JOIN quiz as ex ON ex.id=e.quiz_id LEFT JOIN users as u ON u.id=e.student_id WHERE  u.instructor IN ('" +
          ID +
          "')"
      );

      if (req.params.id != "all") {
        var student_id = get_data[0].student_id;
        var schedule_id = get_data[0].schedule_id;
        var quiz_id = get_data[0].quiz_id;
        var answer_id = get_data[0].answer_id;
        WHERE = 'where e.id="' + req.params.id + '"';
        var get_questions = [];
        if (domainpath == "http://localhost:8000") {
          get_questions = await SQL.query(
            `SELECT e.quiz_id,b.*,TRIM(BOTH '"' FROM JSON_EXTRACT(ea.answers, CONCAT("$.",b.id))) as student_answer,m.value as solution FROM quiz_question as e LEFT JOIN question_bank as b ON b.id=e.questions LEFT JOIN quiz_answers as ea ON ea.id='` +
              answer_id +
              `' LEFT JOIN question_meta as m ON m.question_id=b.id AND m.question_key='solution' WHERE e.quiz_id='` +
              quiz_id +
              `'`
          );
        } else if (domainpath == "http://upstartprep.com:5000/") {
          get_questions = await SQL.query(
            `SELECT e.quiz_id,b.*,TRIM(BOTH '"' FROM JSON_EXTRACT(ea.answers, CONCAT('$."',b.id,'"'))) as student_answer,m.value as solution FROM quiz_question as e LEFT JOIN question_bank as b ON b.id=e.questions LEFT JOIN quiz_answers as ea ON ea.id='` +
              answer_id +
              `' LEFT JOIN question_meta as m ON m.question_id=b.id AND m.question_key='solution' WHERE e.quiz_id='` +
              quiz_id +
              `'`
          );
        }

        get_data[0]["details"] = get_questions;
      }

      g_response["message"] = "success";
      g_response["data"] = get_data;
      g_status_code = 200;
      res.status(g_status_code).json(g_response);
    } catch {
      g_response["status"] = "error";
      g_response["message"] = "Invalid Details";
      g_status_code = 400;
      res.status(g_status_code).json(g_response);
    }
  }
};

exports.QuizHistory = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  try {
    var get_data = await SQL.query(
      "SELECT DISTINCT CONCAT(u.first_Name,u.last_Name) as student_name,q.title as quiz_title,o.* FROM quiz_marks_obtained as o LEFT JOIN users as u ON u.id=o.student_id LEFT JOIN quiz as q ON q.id=o.quiz_id"
    );
    get_data.forEach(async (items, i) => {
      var per_score = (items.obtained_marks / items.total_score) * 100;
      get_data[i].per_score = per_score;
    });

    g_response["message"] = "success";
    g_response["data"] = get_data;
    g_status_code = 200;
    res.status(g_status_code).json(g_response);
  } catch {
    g_response["status"] = "error";
    g_response["message"] = "Invalid Details";
    g_status_code = 400;
    res.status(g_status_code).json(g_response);
  }
};
