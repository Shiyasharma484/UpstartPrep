const table = "exams";
const { decodetheid, validation } = require("../helpers/common");
const con = require("../models/db.js");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const SQL = require("../helpers/sql");
const Model = require("../helpers/instructions");
const table_meta = "exam_meta";

exports.createExams = async (req, res) => {
  console.log(req.body);
  const validationRule = {
    title: "required|string",
    category_id: "required|number",
    exam_type: "required|number",
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
    const get_exam_title = await SQL.gettabledata("exams", "id", {
      title: check_title,
    });
    if (get_exam_title[0]) {
      g_response["status"] = "error";
      g_response["message"] = "Exam Already Exists";
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
      const create_data = await SQL.addData("exams", data);
      const get_data = await SQL.gettabledata("exams", [], { id: create_data });
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

const updatetExamMetaByExamid = async (data, result) => {
  var db_meta_keys = [];
  var meta_update_sql = "";
  var meta_insert_sql = "";
  var sqlquery = "";
  var meta_insert_start =
    "INSERT INTO exam_meta (exam_id, exam_key,value) VALUES ";

  const sql = await con.query(
    `SELECT GROUP_CONCAT(exam_key) AS key_name FROM exam_meta WHERE exam_id=?`,
    [data.exam_id],
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
              "' WHERE exam_id='" +
              data.exam_id +
              "' AND exam_key='" +
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
              data.exam_id +
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

exports.getExamsByID = async (req, res) => {
  var ID;
  var db_meta_keys = {};
  var g_response = {};
  var g_status_code;
  var SUM = 0;
  var total_marks = 0;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      var get_data = await SQL.query(
        "SELECT e.id,e.title,e.created_by,e.category_id,c.category_name,e.exam_type,en.name as exam_type_name,e.free,e.price,e.description,e.visibility,e.points,e.redeem_points, e.active FROM exams as e LEFT JOIN categories as c ON c.id=e.category_id   LEFT JOIN entity as en ON en.id=e.exam_type WHERE e.id=" +
          ID
      );
      console.log(get_data[0].id);
      var get_section = await SQL.query(
        "SELECT * FROM exam_section WHERE exam_id=" + get_data[0].id
      );
      get_data[0].section = get_section;
      var get_diff_details = await SQL.query(
        "SELECT COUNT(section_id)as section_wise_total_question,exam_id,section_id FROM exam_question WHERE exam_id='" +
          get_data[0].id +
          "' GROUP BY section_id;"
      );
      get_data[0].details = get_diff_details;
      get_data[0].details.forEach(async (element, i) => {
        var total1 = 0;
        SUM += element.section_wise_total_question;

        get_data[0].section.forEach(async (items, index) => {
          var marks = items.marks_for_correct_answers;

          var total =
            element.section_wise_total_question *
            get_data[0].section[i].marks_for_correct_answers;
          total1 =
            element.section_wise_total_question *
            get_data[0].section[i].marks_for_correct_answers;
          get_data[0].section[i].question = element.section_wise_total_question;
          get_data[0].section[i].numbers =
            get_data[0].section[i].marks_for_correct_answers;
          get_data[0].section[i].total_section_marks = total;
          //
        });
        total_marks += total1;
      });

      get_data[0].Total_questions = SUM;
      get_data[0].total_marks = total_marks;

      var meta_data = await SQL.gettabledata(
        "exam_meta",
        ["exam_key", "value"],
        { exam_id: ID }
      );
      var db_keys = Object.values(meta_data);
      db_keys.forEach(async (item) => {
        var values = JSON.parse(item.value);
        db_meta_keys[item.exam_key] = values;
      });
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
exports.getExamsQuestionsByID = async (req, res) => {
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
          "exam_marks_obtained",
          [],
          { exam_id: ID, schedule_id: schedule_id ,student_id:student_id}
        );

        if (get_exam_schedule.length > 0) {
          g_response["success"] = "success";

          g_response["message"] = "Already Attempted";

          g_status_code = 200;
          res.status(g_status_code).json(g_response);
        } else {
          var get_data = await SQL.query(
            `SELECT e.id as exam_id,q.id ,e.created_by,q.questions as question_id,e.title,e.category_id,q.section_id,b.questions,b.description,b.difficulty_level,b.options,e.exam_type,e.free,e.price,e.visibility,e.points,e.points,e.redeem_points,e.active FROM exams as e LEFT JOIN exam_question as q ON q.exam_id=e.id LEFT JOIN question_bank as b ON b.id=q.questions  WHERE e.id=${ID} AND e.active=1 `
          );

          get_data.forEach((item, i) => {
            get_data[i].description = JSON.parse(item.description);
          });

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
            "exam_meta",
            ["exam_key", "value"],
            { exam_id: ID }
          );
          var db_keys = Object.values(meta_data);
          db_keys.forEach(async (item) => {
            var values = JSON.parse(item.value);
            db_meta_keys[item.exam_key] = values;
          });
        }
      }

      console.log(get_duration[0].duration);

      g_response["status"] = "success";
      g_response["message"] = "Exam Data";
      g_response["data"] = get_data;
      g_response["duration"] = get_duration[0].duration
        ? get_duration[0].duration
        : "";
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
exports.getExamsQuestionsAnswersByID = async (req, res) => {
  var ID;
  var db_meta_keys = {};
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      var get_data = await SQL.query(
        `SELECT e.id,e.title,e.created_by,e.category_id,b.questions,b.description,b.difficulty_level,b.answers,e.exam_type,e.free,e.price,e.description,e.visibility,e.points,e.points,e.redeem_points,e.active FROM exams as e LEFT JOIN exam_question as q ON q.exam_id=e.id LEFT JOIN question_bank as b ON b.id=q.questions WHERE e.id=${ID} AND e.active=1`
      );
      get_data.forEach((item, i) => {
        get_data[i].description = JSON.parse(item.description);
      });
      var meta_data = await SQL.gettabledata(
        "exam_meta",
        ["exam_key", "value"],
        { exam_id: ID }
      );
      var db_keys = Object.values(meta_data);
      db_keys.forEach(async (item) => {
        var values = JSON.parse(item.value);
        db_meta_keys[item.exam_key] = values;
      });
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

exports.getAllExams = async (req, res) => {
  var ID;
  var db_meta_keys = {};
  var g_response = {};
  var g_status_code;

  try {
    var get_data = await SQL.query(
      "SELECT e.id,e.title,e.created_by,e.category_id,c.category_name,e.exam_type,en.name as exam_type_name,es.name as section_name,e.free,e.price,e.description,e.visibility,e.points,e.redeem_points, e.active FROM exams as e LEFT JOIN categories as c ON c.id=e.category_id LEFT JOIN entity as en ON en.id=e.exam_type LEFT JOIN exam_section as es ON es.exam_id=e.id"
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
exports.getAllExamsByInstructor = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  var ID;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      var get_data = await SQL.query(
        "SELECT DISTINCT e.id,e.created_by,e.title,e.category_id,c.category_name,e.exam_type,en.name as exam_type_name,es.name as section_name,e.free,e.price,e.description,e.visibility,e.points,e.redeem_points, e.active FROM exams as e LEFT JOIN categories as c ON c.id=e.category_id LEFT JOIN entity as en ON en.id=e.exam_type LEFT JOIN exam_section as es ON es.exam_id=e.id LEFT JOIN users as u ON e.created_by= u.id WHERE FIND_IN_SET('" +
          ID +
          "',u.id ) ORDER BY e.id ASC"
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

exports.updateExamsByID = async (req, res) => {
  var ID;
  const validationRule = {
    title: "required|string",
    category_id: "required|number",
    exam_type: "required|number",
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
        "exams",
        { title: check_name },
        { id: ID }
      );
      if (get_category_name > 0) {
        g_response["status"] = "error";
        g_response["message"] = "Exam Already Exists";
        g_status_code = 200;
      } else {
        const update_data = await SQL.Updatedata("exams", data, {
          id: ID,
        });

        const saveMeta = {};
        saveMeta.exam_id = ID;
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
      const delete_resp = await examDelete(deleteID);
      const delete_meta = await metaDelete(deleteID);
      var get_schedule = await SQL.gettabledata(
        "schedule",
        ["id", "event_id", "event_type"],
        { event_id: deleteID, event_type: "30" }
      );
      console.log(get_schedule);
      if (get_schedule.length > 0) {
        get_schedule.forEach(async (element) => {
          var scheduleID = element.id;
          const delete_schedule = await practiceScheduleDelete(scheduleID);
        });
      }
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
const metaDelete = async (deleteID, result) => {
  let delete_payload = {
    table_name: table_meta,
    query_field: "exam_id",
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

exports.ExamTaken = async (req, res) => {
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
    var submit_answer = await SQL.addData("exam_answers", data);
    data.exam_answer_id = submit_answer;
    var exam_checking = await exam_check(data);

    g_response["success"] = "success";
    g_response["message"] = "Exam Taken Successfully";
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

const exam_check = async (req, res) => {
  var exam_correct = [];
  var exam_incorrect = [];
  var exam_not_attempted = [];
  var exam_attempted = [];
  var exam_marks = [];
  var total_questions = 0;
  var passing_marks = 0;
  var student_answers = [];
  var result;
  var marks_for_correct_answers;
  var exam_id = req.exam_id;
  var exam_answers_table_id = req.exam_answer_id;
  var negative_marks;
  var get_questions = await SQL.query(
    "SELECT e.id as exam_id,b.id as question_id,b.questions,b.description,b.difficulty_level,b.options,es.*,b.answers FROM exams as e LEFT JOIN exam_question as q ON e.id=q.exam_id LEFT JOIN question_bank as b ON b.id=q.questions LEFT JOIN exam_section as es ON es.exam_id=e.id WHERE e.id=" +
      exam_id
  );
  get_questions.forEach((item, i) => {
    get_questions[i].description = JSON.parse(item.description);
  });
  get_questions.forEach(async (element) => {
    var question_id = element.question_id;

    var new_data = JSON.parse(element.options);
    var student_ans = JSON.parse(req.answers);
    student_answers.push(student_ans);
    if (element.marks_for_correct_answers > 1) {
      marks_for_correct_answers = element.marks_for_correct_answers;
    } else {
      marks_for_correct_answers = 1;
    }

    if (element.negative_marks > 0) {
      negative_marks = element.negative_marks;
    } else {
      negative_marks = 0;
    }

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
  });

  total_questions = exam_attempted.length + exam_not_attempted.length;

  console.log(get_questions[0].pass_percentage);

  console.log(total_questions);
  var kk = Number(get_questions[0].pass_percentage) * Number(total_questions);
  console.log(kk);
  passing_marks = kk / 100;

  if (
    passing_marks <=
    exam_correct.length * marks_for_correct_answers -
      negative_marks * exam_incorrect.length
  ) {
    result = "Pass";
  } else {
    result = "Fail";
  }
  var exam_marks_obtained = await SQL.addData("exam_marks_obtained", {
    exam_id: exam_id,
    student_id: req.student_id,
    schedule_id: req.schedule_id,
    exam_attempted: exam_attempted,
    exam_not_attempted: exam_not_attempted,
    correct_answers: exam_correct,
    incorrect_answers: exam_incorrect,
    total_correct: exam_correct.length,
    total_incorrect: exam_incorrect.length,
    answer_id: exam_answers_table_id,
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

exports.GetExamTaken = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      var get_data = await SQL.gettabledata("exam_marks_obtained", [], {
        exam_id: ID,
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

exports.GetExamTakenByExamID = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.exam_id && req.params.exam_id.length > 0) {
    ID = req.params.exam_id;
    try {
      var get_data = await SQL.query(
        "SELECT o.id,o.exam_id,e.title as exam_title,o.schedule_id,s.event_type,m.name as event_name,o.student_id,CONCAT(u.first_Name,u.last_Name) as student_name,o.student_answers,o.correct_answers,o.total_correct,o.incorrect_answers,o.total_incorrect,o.exam_not_attempted,o.total_not_attempted,o.total_attempted,o.exam_attempted,o.negative_marks,o.obtained_marks,o.total_score,o.datetime FROM exam_marks_obtained as o LEFT JOIN exams as e ON e.id=o.exam_id LEFT JOIN users as u ON u.id=o.student_id LEFT JOIN schedule as s ON s.id=o.schedule_id LEFT JOIN modules as m ON m.id=s.event_type WHERE o.exam_id=" +
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
exports.GetExamTakenByScheduleID = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      var get_data = await SQL.query(
        "SELECT o.id,o.exam_id,e.title,e.exam_type,o.schedule_id,s.schedule_type,s.start_date,s.end_date,s.start_time,s.end_time,s.event_id,s.event_type,m.name as event_type_name,o.student_id,CONCAT(u.first_Name,u.last_Name) as student_name,o.student_answers,o.correct_answers,o.total_correct,o.incorrect_answers,o.total_incorrect,o.exam_not_attempted,o.total_not_attempted,o.total_attempted,o.exam_attempted,o.negative_marks,o.obtained_marks,o.total_score,o.datetime FROM exam_marks_obtained as o LEFT JOIN schedule as s ON s.id=o.schedule_id LEFT JOIN exams as e ON e.id=o.schedule_id LEFT JOIN modules as m ON m.id=s.event_type LEFT JOIN users as u ON u.id=o.student_id WHERE o.schedule_id=" +
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

exports.GetExamTakenBySectionID = async (req, res) => {
  var exam_correct = [];
  var exam_incorrect = [];
  var exam_not_attempted = [];
  var exam_attempted = [];
  var exam_marks = [];
  var g_response = {};
  var g_status_code;
  if (req.params.section_id && req.params.section_id.length > 0) {
    section_id = req.params.section_id;
    try {
      var get_questions = await SQL.query(
        "SELECT e.id as exam_id,s.section_id,s.duration,se.section_name FROM exams as e LEFT JOIN exam_section as s ON s.exam_id=e.id LEFT JOIN sections as se ON se.id=s.section_id WHERE s.section_id=" +
          section_id
      );
      var exam_id = get_questions[0].exam_id;
      var get_questions = await SQL.query(
        "SELECT e.id as exam_id,b.id as question_id,b.questions,b.description,b.options,b.difficulty_level,b.answers FROM exams as e LEFT JOIN exam_question as q ON e.id=q.exam_id LEFT JOIN question_bank as b ON b.id=q.questions WHERE e.id=" +
          exam_id
      );
      get_questions.forEach((item, i) => {
        get_questions[i].description = JSON.parse(item.description);
      });
      console.log(get_questions);
      get_questions.forEach(async (element) => {
        var question_id = element.question_id;
        var new_data = JSON.parse(element.options);
        var student_ans = JSON.parse(req.answers);

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
      });
      console.log("exam_attempted" + exam_attempted);
      console.log("exam_correct" + exam_correct);
      console.log("exam_incorrect" + exam_incorrect);
      console.log("exam_not_attempted" + exam_not_attempted);
      g_response["success"] = "success";
      g_response["message"] = get_questions;
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

exports.ExamScoreObtained = async (req, res) => {
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
      "SELECT e.id,e.exam_id,ex.title,e.schedule_id,e.student_id,e.answer_id,CONCAT(u.first_Name,u.last_Name)as student_name,e.correct_answers,e.total_correct,e.incorrect_answers,e.total_incorrect,e.exam_not_attempted,e.total_not_attempted,e.total_attempted,e.exam_attempted,e.negative_marks,e.total_questions,e.total_score,e.obtained_marks,e.result,e.datetime FROM exam_marks_obtained as e LEFT JOIN exams as ex ON ex.id=e.exam_id LEFT JOIN users as u ON u.id=e.student_id " +
        WHERE
    );
    if (req.params.id != "all") {
      var student_id = get_data[0].student_id;
      var schedule_id = get_data[0].schedule_id;
      var exam_id = get_data[0].exam_id;
      var answer_id = get_data[0].answer_id;
      WHERE = 'where e.id="' + req.params.id + '"';
      var get_questions = [];
      if (domainpath == "http://localhost:8000") {
        get_questions = await SQL.query(
          `SELECT e.exam_id,b.*,TRIM(BOTH '"' FROM JSON_EXTRACT(ea.answers, CONCAT("$.",b.id)))  as student_answer,m.value as solution FROM exam_question as e LEFT JOIN question_bank as b ON b.id=e.questions LEFT JOIN exam_answers as ea ON ea.id='` +
            answer_id +
            `' LEFT JOIN question_meta as m ON m.question_id=b.id AND m.question_key='solution' WHERE e.exam_id='` +
            exam_id +
            `' ORDER BY b.id ASC`
        );
      } else if (domainpath == "http://upstartprep.com:5000/") {
        get_questions = await SQL.query(
          `SELECT e.exam_id,b.*,TRIM(BOTH '"' FROM JSON_EXTRACT(ea.answers, CONCAT('$."',b.id,'"'))) as student_answer,m.value as solution FROM exam_question as e LEFT JOIN question_bank as b ON b.id=e.questions LEFT JOIN exam_answers as ea ON ea.id='` +
            answer_id +
            `' LEFT JOIN question_meta as m ON m.question_id=b.id AND m.question_key='solution' WHERE e.exam_id='` +
            exam_id +
            `' ORDER BY b.id ASC`
        );
      } else if (domainpath == "http://localhost:3000") {
        get_questions = await SQL.query(
          `SELECT e.exam_id,b.*,TRIM(BOTH '"' FROM JSON_EXTRACT(ea.answers, CONCAT('$."',b.id,'"'))) as student_answer,m.value as solution FROM exam_question as e LEFT JOIN question_bank as b ON b.id=e.questions LEFT JOIN exam_answers as ea ON ea.id='` +
            answer_id +
            `' LEFT JOIN question_meta as m ON m.question_id=b.id AND m.question_key='solution' WHERE e.exam_id='` +
            exam_id +
            `' ORDER BY b.id ASC`
        );
      }

      get_questions.forEach((item, i) => {
        get_questions[i].description = JSON.parse(item.description);
      });
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
      "SELECT e.id,e.exam_id,ex.title,e.schedule_id,e.student_id,e.answer_id,CONCAT(u.first_Name,u.last_Name)as student_name,e.correct_answers,e.total_correct,e.incorrect_answers,e.total_incorrect,e.exam_not_attempted,e.total_not_attempted,e.total_attempted,e.exam_attempted,e.negative_marks,e.total_questions,e.total_score,e.obtained_marks,e.result,e.datetime FROM exam_marks_obtained as e LEFT JOIN exams as ex ON ex.id=e.exam_id LEFT JOIN users as u ON u.id=e.student_id " +
        WHERE
    );
    if (req.params.id != "all") {
      var student_id = get_data[0].student_id;
      var schedule_id = get_data[0].schedule_id;
      var exam_id = get_data[0].exam_id;
      var answer_id = get_data[0].answer_id;
      WHERE = 'where e.student_id="' + req.params.id + '"';
      var get_questions = [];
      if (domainpath == "http://localhost:8000") {
        get_questions = await SQL.query(
          `SELECT e.exam_id,b.*,TRIM(BOTH '"' FROM JSON_EXTRACT(ea.answers, CONCAT("$.",b.id))) as student_answer,m.value as solution FROM exam_question as e LEFT JOIN question_bank as b ON b.id=e.questions LEFT JOIN exam_answers as ea ON ea.id='` +
            answer_id +
            `' LEFT JOIN question_meta as m ON m.question_id=b.id AND m.question_key='solution' WHERE e.exam_id='` +
            exam_id +
            `'`
        );
      } else if (domainpath == "http://upstartprep.com:5000/") {
        get_questions = await SQL.query(
          `SELECT e.exam_id,b.*,TRIM(BOTH '"' FROM JSON_EXTRACT(ea.answers, CONCAT('$."',b.id,'"'))) as student_answer,m.value as solution FROM exam_question as e LEFT JOIN question_bank as b ON b.id=e.questions LEFT JOIN exam_answers as ea ON ea.id='` +
            answer_id +
            `' LEFT JOIN question_meta as m ON m.question_id=b.id AND m.question_key='solution' WHERE e.exam_id='` +
            exam_id +
            `' ORDER BY b.id ASC`
        );
      }
      get_questions.forEach((item, i) => {
        get_questions[i].description = JSON.parse(item.description);
      });
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
        "SELECT e.id,e.exam_id,ex.title,e.schedule_id,e.student_id,e.answer_id,CONCAT(u.first_Name,u.last_Name)as student_name,e.correct_answers,e.total_correct,e.incorrect_answers,e.total_incorrect,e.exam_not_attempted,e.total_not_attempted,e.total_attempted,e.exam_attempted,e.negative_marks,e.total_questions,e.total_score,e.obtained_marks,e.result,e.datetime FROM exam_marks_obtained as e LEFT JOIN exams as ex ON ex.id=e.exam_id LEFT JOIN users as u ON u.id=e.student_id WHERE  u.instructor IN ('" +
          ID +
          "')"
      );

      if (req.params.id != "all") {
        var student_id = get_data[0].student_id;
        var schedule_id = get_data[0].schedule_id;
        var exam_id = get_data[0].exam_id;
        var answer_id = get_data[0].answer_id;
        WHERE = 'where e.id="' + req.params.id + '"';
        var get_questions = [];
        if (domainpath == "http://localhost:8000") {
          get_questions = await SQL.query(
            `SELECT e.exam_id,b.*,TRIM(BOTH '"' FROM JSON_EXTRACT(ea.answers, CONCAT("$.",b.id))) as student_answer,m.value as solution FROM exam_question as e LEFT JOIN question_bank as b ON b.id=e.questions LEFT JOIN exam_answers as ea ON ea.id='` +
              answer_id +
              `' LEFT JOIN question_meta as m ON m.question_id=b.id AND m.question_key='solution' WHERE e.exam_id='` +
              exam_id +
              `'`
          );
        } else if (domainpath == "http://upstartprep.com:5000/") {
          get_questions = await SQL.query(
            `SELECT e.exam_id,b.*,TRIM(BOTH '"' FROM JSON_EXTRACT(ea.answers, CONCAT('$."',b.id,'"'))) as student_answer,m.value as solution FROM exam_question as e LEFT JOIN question_bank as b ON b.id=e.questions LEFT JOIN exam_answers as ea ON ea.id='` +
              answer_id +
              `' LEFT JOIN question_meta as m ON m.question_id=b.id AND m.question_key='solution' WHERE e.exam_id='` +
              exam_id +
              `'`
          );
        }
        get_questions.forEach((item, i) => {
          get_questions[i].description = JSON.parse(item.description);
        });
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

exports.ExamHistory = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  try {
    var get_data = await SQL.query(
      "SELECT DISTINCT CONCAT(u.first_Name,u.last_Name) as student_name,q.title as exam_title,o.* FROM exam_marks_obtained as o LEFT JOIN users as u ON u.id=o.student_id LEFT JOIN exams as q ON q.id=o.exam_id"
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
exports.getDetailsOfStudent = async (req, res) => {
  var studentID;
  var g_response = {};
  var g_status_code;
  if (req.params.student_id && req.params.student_id.length > 0) {
    studentID = req.params.student_id;
    try {
      var get_exams = await SQL.query(
        "SELECT  CONCAT(u.first_Name,u.last_Name) as student_name,q.title as exam_title,o.* FROM exam_marks_obtained as o LEFT JOIN users as u ON u.id=o.student_id LEFT JOIN exams as q ON q.id=o.exam_id WHERE o.student_id=" +
          studentID
      );
      get_exams.forEach(async (items, i) => {
        var per_score = (items.obtained_marks / items.total_score) * 100;
        get_exams[i].per_score = per_score;
      });
      var get_quiz = await SQL.query(
        "SELECT  CONCAT(u.first_Name,u.last_Name) as student_name,q.title as quiz_title,o.* FROM quiz_marks_obtained as o LEFT JOIN users as u ON u.id=o.student_id LEFT JOIN quiz as q ON q.id=o.quiz_id WHERE o.student_id=" +
          studentID
      );
      get_quiz.forEach(async (items, i) => {
        var per_score = (items.obtained_marks / items.total_score) * 100;
        get_quiz[i].per_score = per_score;
      });
      var get_practice_Set = await SQL.query(
        "SELECT CONCAT(u.first_Name,u.last_Name) as student_name,q.title as practice_title,o.* FROM practice_marks_obtained as o LEFT JOIN users as u ON u.id=o.student_id LEFT JOIN practice_sets as q ON q.id=o.practice_id WHERE o.student_id=" +
          studentID
      );
      get_practice_Set.forEach(async (items, i) => {
        var per_score = (items.obtained_marks / items.total_score) * 100;
        get_practice_Set[i].per_score = per_score;
      });
      g_response["status"] = "success";
      g_response["Exams"] = get_exams;
      g_response["Quiz"] = get_quiz;
      g_response["Practice_Set"] = get_practice_Set;
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


exports.getPastPapersByStudentID = async (req, res) => {
  var studentID;
  var g_response = {};
  var g_status_code;
  if (req.params.student_id && req.params.student_id.length > 0) {
    studentID = req.params.student_id;
    try {
      var get_exams = await SQL.query(
        "SELECT o.id, o.exam_id,o.student_id,CONCAT(u.first_Name,u.last_Name) as student_name,q.title as exam_title,q.*,o.total_questions,o.negative_marks,o.total_score,o.obtained_marks,o.result,o.datetime FROM exam_marks_obtained as o LEFT JOIN users as u ON u.id=o.student_id LEFT JOIN exams as q ON q.id=o.exam_id WHERE o.student_id='" +
          studentID+"' ORDER BY o.id DESC "  
      );

      var get_quiz = await SQL.query(
        "SELECT  o.id, o.quiz_id, CONCAT(u.first_Name,u.last_Name) as student_name,q.title as quiz_title,q.*,o.total_questions,o.negative_marks,o.total_score,o.obtained_marks,o.result,o.datetime FROM quiz_marks_obtained as o LEFT JOIN users as u ON u.id=o.student_id LEFT JOIN quiz as q ON q.id=o.quiz_id   WHERE o.student_id='" +
          studentID+"' ORDER BY o.id DESC "  
      );

      var get_practice_Set = await SQL.query(
        "SELECT o.id, o.practice_id, CONCAT(u.first_Name,u.last_Name) as student_name,q.title as practice_title,q.*,o.total_questions,o.negative_marks,o.total_score,o.obtained_marks,o.result,o.datetime FROM practice_marks_obtained as o LEFT JOIN users as u ON u.id=o.student_id LEFT JOIN practice_sets as q ON q.id=o.practice_id WHERE o.student_id='" +
          studentID+"' ORDER BY o.id DESC "  
      );

      g_response["status"] = "success";
      g_response["Exams"] = get_exams;
      g_response["Quiz"] = get_quiz;
      g_response["Practice_Set"] = get_practice_Set;
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