const table = "practice_sets";
const { decodetheid, validation } = require("../helpers/common");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const SQL = require("../helpers/sql");
const Model = require("../helpers/instructions");
const con = require("../models/db.js");
const table_meta = "practice_set_meta";
exports.createPracticeSets = async (req, res) => {
  console.log(req.body);
  const validationRule = {
    title: "required|string",
    skill_id: "required|number",
    subcategory_id: "required|number",
  };
  var metaRule = {};
  var g_response = {};
  var g_status_code;
  var data = req.body;

  try {
    var metaData = data.meta;
    const valid_data = await validation(data, validationRule);
    const validate_meta = await validation(metaData, metaRule);

    const check_name = data.title;
    console.log(check_name);
    const get_name = await SQL.gettabledata("practice_sets", "id", {
      title: check_name,
    });
    if (get_name[0]) {
      g_response["status"] = "error";
      g_response["message"] = "Practice Set Already Exists";

      g_status_code = 200;
    } else {
      const create_data = await SQL.addData("practice_sets", {
        title: data.title,
        subcategory_id: data.subcategory_id,
        skill_id: data.skill_id,
        free: data.free,
        description: data.description,
        status: data.status,
        created_by: data.created_by,
      });

      // const saveMeta = {};
      // saveMeta.practice_set_id = create_data;
      // saveMeta["save_data"] = validate_meta;

      // var Update_meta_response = await updatetSetMetaBySetid(saveMeta);

      g_response["status"] = "success";
      g_response["message"] = `Created ${table} Successfully`;
      g_response["id"] = create_data;
      g_status_code = 201;
    }
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }
  res.status(g_status_code).json(g_response);
};

const updatetSetMetaBySetid = async (data, result) => {
  var db_meta_keys = [];
  var meta_update_sql = "";
  var meta_insert_sql = "";
  var sqlquery = "";
  var meta_insert_start =
    "INSERT INTO practice_set_meta (practice_set_id, set_key,value) VALUES ";

  const sql = await con.query(
    `SELECT GROUP_CONCAT(set_key) AS key_name FROM practice_set_meta WHERE practice_set_id=?`,
    [data.practice_set_id],
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
              "' WHERE practice_set_id='" +
              data.practice_set_id +
              "' AND set_key='" +
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
              data.practice_set_id +
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

exports.getPracticeSetsByID = async (req, res) => {
  console.log(req.params);
  var ID;
  var meta = {};
  var g_response = {};
  var g_status_code;

  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const get_tags = await SQL.query(
        "SELECT DISTINCT p.id,p.title ,p.created_by, p.subcategory_id,sc.sub_category_name,p.skill_id,s.skill_name,p.free,p.description,p.status FROM practice_sets as p LEFT JOIN sub_categories as sc ON sc.id = p.subcategory_id LEFT JOIN skills as s ON s.id=p.skill_id  WHERE p.id=" +
          ID
      );
      var get_total_questions = await SQL.query(
        "SELECT COUNT(question_id) as total_questions FROM practice_question WHERE practice_set_id=" +
          ID
      );

      get_tags[0].Total_questions = get_total_questions[0].total_questions;
      const get_meta = await SQL.gettabledata(
        "practice_set_meta",
        ["set_key", "value"],
        { practice_set_id: ID }
      );
      if (get_meta.length > 0) {
        var pointsinput = {};
        var keys = Object.values(get_meta);
        keys.forEach(async (item) => {
          if (item.value) {
            // var values = JSON.parse(item.value);
            meta[item.set_key] = item.value;
          }
        });

        get_meta.filter((item) => {
          if (item.set_key == "pointsinput") {
            // var values = JSON.parse(item.value);
            pointsinput[item.set_key] = item.value;
            console.log(pointsinput);
          }
        });
if(typeof pointsinput=="number"){
  if(pointsinput > 1){
    var total_marks =
    pointsinput.pointsinput * get_total_questions[0].total_questions;
    console.log(total_marks);
    get_tags[0].total_marks = total_marks;
}else{
  var total_marks =
  1 * get_total_questions[0].total_questions;
  console.log(total_marks);
  get_tags[0].total_marks = total_marks;
}
  }
}
     

      g_response["status"] = "success";
      g_response["responsedata"] = get_tags;
      g_response["meta"] = meta;
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }

    res.status(g_status_code).json(g_response);
  }
};

exports.getPracticeQuestionByID = async (req, res) => {
  var ID;
  var db_meta_keys = {};
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      if (req.body.schedule_id && req.body.schedule_id != undefined) {
        var schedule_id = req.body.schedule_id;
        // var get_exam_schedule = await SQL.gettabledata(
        //   "practice_marks_obtained",
        //   [],
        //   { practice_id: ID, schedule_id: schedule_id }
        // );

        // if (get_exam_schedule.length > 0) {
        //   g_response["success"] = "success";

        //   g_response["message"] = "Already Attempted";

        //   g_status_code = 200;
        //   res.status(g_status_code).json(g_response);
        // } else {
        var get_data = await SQL.query(
          `SELECT e.id as practice_id,e.created_by,q.id ,q.question_id,e.title,b.description,b.questions,b.difficulty_level,b.options FROM practice_sets as e LEFT JOIN practice_question as q ON q.practice_set_id=e.id LEFT JOIN question_bank as b ON b.id=q.question_id WHERE e.id=${ID} `
        );
        var get_duration = await SQL.gettabledata(
          "exam_section",
          ["duration"],
          {
            exam_id: ID,
          }
        );
        get_data.forEach((item, i) => {
          get_data[i].description = JSON.parse(item.description);
        });
        get_data.forEach(async (element, index) => {
          const changedOptions = element.options?JSON.parse(element.options):[];

          changedOptions.map((item, i) => {
            console.log(item);
            console.log(item);
            item["checked"] = false;
            // const changedObject = JSON.stringify(item);
            changedOptions[i] = item;
            // const changedelement = JSON.stringify(changedOptions);
            get_data[index].options = changedOptions;
          });

          // changedOptions.forEach((item, i) => {
          //   console.log(items);
          //   // items["checked"] = false;

          //   // const changedObject = JSON.stringify(items);

          //   // changedOptions[i] = items;

          //   // const changedelement = JSON.stringify(changedOptions);
          //   // get_data[index].options = changedOptions;
          // });
        });

        var meta_data = await SQL.gettabledata(
          "practice_set_meta",
          ["set_key", "value"],
          { practice_set_id: ID }
        );
        var db_keys = Object.values(meta_data);
        db_keys.forEach(async (item) => {
          // var values = JSON.parse(item.value);
          db_meta_keys[item.exam_key] = item.value;
        });
      }
      // }

      g_response["status"] = "success";
      g_response["message"] = "Exam Data";
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

exports.getAllPracticeSets = async (req, res) => {
  console.log(req.params);
  var ID;
  var g_response = {};
  var g_status_code;

  try {
    const get_tags = await SQL.query(
      "SELECT DISTINCT p.id,p.created_by,p.title , p.subcategory_id,sc.sub_category_name,p.skill_id,s.skill_name,p.free,p.description,p.status FROM practice_sets as p LEFT JOIN sub_categories as sc ON sc.id = p.subcategory_id LEFT JOIN skills as s ON s.id=p.skill_id "
    );
    g_response["status"] = "success";
    g_response["responsedata"] = get_tags;
    g_status_code = 200;
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }

  res.status(g_status_code).json(g_response);
};
exports.getAllPracticeSetsByInstructor = async (req, res) => {
  console.log(req.params);
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      const get_tags = await SQL.query(
        "SELECT DISTINCT p.id,p.created_by,p.title , p.subcategory_id,sc.sub_category_name,p.skill_id,s.skill_name,p.free,p.description,p.status FROM practice_sets as p LEFT JOIN sub_categories as sc ON sc.id = p.subcategory_id LEFT JOIN skills as s ON s.id=p.skill_id LEFT JOIN users as u ON p.created_by= u.id WHERE FIND_IN_SET('" +
          ID +
          "',u.id ) ORDER BY p.id ASC "
      );
      g_response["status"] = "success";
      g_response["responsedata"] = get_tags;
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }

    res.status(g_status_code).json(g_response);
  }
};

exports.updatePracticeSetsByID = async (req, res) => {
  var ID;
  console.log(req.body);
  var data = req.body;
  var g_response = {};
  var g_status_code;
  const validationRule = {
    title: "required|string",
    skill_id: "required|number",
  };
  var metaRule = {};
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      var metadata = data.meta;
      const valid_data = await validation(data, validationRule);
      const validate_meta = await validation(metadata, metaRule);

      const check_name = data.title;
      console.log(check_name);
      const get_name = await SQL.count(
        "practice_sets",
        { title: check_name },
        { id: ID }
      );

      if (get_name > 0) {
        g_response["status"] = "error";
        g_response["message"] = "Practice Set Already Exists";
        g_status_code = 200;
      } else {
        const update_data = await SQL.Updatedata(
          "practice_sets",
          {
            title: data.title,
            subcategory_id: data.subcategory_id,
            skill_id: data.skill_id,
            free: data.free,
            description: data.description,
            status: data.status,
            created_by: data.created_by,
          },
          {
            id: ID,
          }
        );

        const saveMeta = {};
        saveMeta.practice_set_id = ID;
        saveMeta["save_data"] = validate_meta;

        var Update_meta_response = await updatetSetMetaBySetid(saveMeta);
        g_response["status"] = "success";
        g_response["responsedata"] = "Practice Set Updated Successfully";
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
    console.log(deleteID);
    try {
      var get_data = await SQL.gettabledata("practice_sets", ["id"], {
        id: deleteID,
      });

      if (get_data.length < 1) {
        g_response["status"] = "error";
        g_response["message"] = "No Data";
        g_status_code = 200;
        res.status(g_status_code).json(g_response);
      }
      const delete_resp = await practicesetsDelete(deleteID);
      const delete_meta = await metaDelete(deleteID);
      var get_schedule = await SQL.gettabledata(
        "schedule",
        ["id", "event_id", "event_type"],
        { event_id: deleteID, event_type: "34" }
      );
      console.log(get_schedule);
      if (get_schedule.length > 0) {
        get_schedule.forEach(async (element) => {
          var scheduleID = element.id;
          const delete_schedule = await practiceScheduleDelete(scheduleID);
        });
      }

      g_response["status"] = "success";
      g_response["message"] = "Practice Set Deleted Successfully";
      g_status_code = 201;
      res.status(g_status_code).json(g_response);
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
      res.status(g_status_code).json(g_response);
    }
  }
};
const practicesetsDelete = async (deleteID, result) => {
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
    query_field: "practice_set_id",
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

exports.PracticeSetTaken = async (req, res) => {
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
    var create_data = await SQL.addData("practice_answers", data);
    data.set_answer_id = create_data;
    var set_checking = await set_check(data);

    g_response["success"] = "success";
    g_response["message"] = "Practice Set Taken Successfully";
    g_response["Practice_set_taken_id"] = set_checking;
    g_status_code = 201;
    res.status(g_status_code).json(g_response);
  } catch {
    g_response["status"] = "error";
    g_response["message"] = "Invalid Details";
    g_status_code = 400;
    res.status(g_status_code).json(g_response);
  }
};

const set_check = async (req, res) => {
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
  var practice_id = req.practice_id;
  var set_answers_table_id = req.set_answer_id;
  var negative_marks;
  var get_questions = await SQL.query(
    "SELECT p.id as practice_set_id,b.id as question_id,b.questions,b.description,b.difficulty_level,b.options,b.answers FROM practice_sets as p LEFT JOIN practice_question as q ON p.id=q.practice_set_id LEFT JOIN question_bank as b ON b.id=q.question_id WHERE p.id=" +
      practice_id
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
  });

  var get_meta = await SQL.gettabledata("practice_set_meta", [], {
    practice_set_id: practice_id,
  });
 
  var pointsinput = {};

  get_meta.filter((item) => {
    if (item.set_key == "pointsinput") {
      // var values = JSON.parse(item.value);
      pointsinput[item.set_key] = item.value;
      // console.log(pointsinput);
    }
  });
  if (pointsinput > 1) {
    marks_for_correct_answers = pointsinput;
  } else {
    marks_for_correct_answers = 1;
  }

  total_questions = exam_attempted.length + exam_not_attempted.length;

  console.log(total_questions);
  // console.log(get_questions)

  // var kk = Number(get_questions[0].pass_percentage) * Number(total_questions);
  // console.log(kk);
  // passing_marks = kk / 100;
  if (
    passing_marks <=
    exam_correct.length * marks_for_correct_answers -
      negative_marks * exam_incorrect.length
  ) {
    result = "Pass";
  } else {
    result = "Fail";
  }
  var practice_marks_obtained = await SQL.addData("practice_marks_obtained", {
    practice_id: practice_id,
    student_id: req.student_id,
    schedule_id: req.schedule_id,
    exam_attempted: exam_attempted,
    exam_not_attempted: exam_not_attempted,
    correct_answers: exam_correct,
    answer_id: set_answers_table_id,
    incorrect_answers: exam_incorrect,
    total_correct: exam_correct.length,
    total_incorrect: exam_incorrect.length,
    total_not_attempted: exam_not_attempted.length,
    total_attempted: exam_attempted.length,
    total_questions: total_questions,
    obtained_marks:
      exam_correct.length * marks_for_correct_answers - exam_incorrect.length,
    total_score:
      exam_correct.length * marks_for_correct_answers + exam_incorrect.length,
    // result: result,
  });

  return practice_marks_obtained;
};

exports.GetPracticeTaken = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      var get_data = await SQL.gettabledata("practice_marks_obtained", [], {
        id: ID,
      });

      // var question = await SQL.count();

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

exports.getPracticeSetScore = async (req, res) => {
  var ID;
  var level;
  var resp_data = [];
  var g_response = {};
  var g_status_code;
  var WHERE = "";
  console.log(req.params.id);
  if (req.params.id != "all") {
    WHERE = 'where e.id="' + req.params.id + '"';
  }
  try {
    var get_data = await SQL.query(
      "SELECT e.id,e.practice_id, ex.title, e.schedule_id,e.answer_id, e.student_id, CONCAT(u.first_Name, u.last_Name) as student_name, e.correct_answers, e.total_correct, e.incorrect_answers, e.total_incorrect, e.exam_not_attempted, e.total_not_attempted, e.total_attempted, e.exam_attempted, e.negative_marks, e.total_score, e.obtained_marks, e.datetime FROM practice_marks_obtained as e LEFT JOIN practice_sets as ex ON ex.id = e.practice_id LEFT JOIN users as u ON u.id = e.student_id " +
        WHERE
    );
    console.log("hi-----");
    console.log(req.params.id);
    if (req.params.id != "all") {
      var student_id = get_data[0].student_id;
      var schedule_id = get_data[0].schedule_id;
      var practice_id = get_data[0].practice_id;
      var answer_id = get_data[0].answer_id;

      WHERE = 'where e.id="' + req.params.id + '"';

      var get_score = [];
      if (domainpath == "http://localhost:8000") {
        get_score = await SQL.query(
          `SELECT e.practice_set_id,b.*,TRIM(BOTH '"' FROM JSON_EXTRACT(ea.answers, CONCAT("$.",b.id)))  as student_answer,m.value as solution FROM practice_question as e LEFT JOIN question_bank as b ON b.id=e.question_id LEFT JOIN practice_answers as ea ON ea.id='` +
            answer_id +
            `' LEFT JOIN question_meta as m ON m.question_id=b.id AND m.question_key='solution' WHERE e.practice_set_id='` +
            practice_id +
            `' ORDER BY b.id ASC`
        );
      } else if (domainpath == "http://upstartprep.com:5000/") {
        get_score = await SQL.query(
          `SELECT e.practice_set_id,b.*,TRIM(BOTH '"' FROM JSON_EXTRACT(ea.answers, CONCAT('$."',b.id,'"')))  as student_answer,m.value as solution FROM practice_question as e LEFT JOIN question_bank as b ON b.id=e.question_id LEFT JOIN practice_answers as ea ON ea.id='` +
            answer_id +
            `' LEFT JOIN question_meta as m ON m.question_id=b.id AND m.question_key='solution' WHERE e.practice_set_id='` +
            practice_id +
            `' ORDER BY b.id ASC`
        );
      }
      // get_score.forEach((item,i)=>{
      //   get_score[i].description = JSON.parse(item.description);
      // })
      get_data[0]["details"] = get_score;
    }

    console.log(get_score);
    g_response["message"] = "success";
    g_response["data"] = get_data;
    g_status_code = 200;
    res.status(g_status_code).json(g_response);
  } catch {
    g_response["status"] = "error";
    g_response["message"] = "Invalid Details";
    g_status_code = 400;
    // console.log(get_score);
    res.status(g_status_code).json(g_response);
  }
};

exports.PracticeSetScoreObtainedByStudentID = async (req, res) => {
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
    var get_user_valid = await SQL.gettabledata("users", ["id"], {
      id: req.params.id,
    });
    console.log(get_user_valid);
    if (get_user_valid.length < 1) {
      g_response["error"] = "error";
      g_response["message"] = "INVALID STUDENT";
      g_status_code = 404;
      res.status(g_status_code).json(g_response);
    } else {
      var get_data = await SQL.query(
        "SELECT e.id,e.practice_id,ex.title,e.schedule_id,e.student_id,e.answer_id,CONCAT(u.first_Name,u.last_Name)as student_name,e.correct_answers,e.total_correct,e.incorrect_answers,e.total_incorrect,e.exam_not_attempted,e.total_not_attempted,e.total_attempted,e.exam_attempted,e.negative_marks,e.total_questions,e.total_score,e.obtained_marks,e.result,e.datetime FROM practice_marks_obtained as e LEFT JOIN practice_sets as ex ON ex.id=e.practice_id LEFT JOIN users as u ON u.id=e.student_id " +
          WHERE
      );
      if (req.params.id != "all") {
        var student_id = get_data[0].student_id;
        var schedule_id = get_data[0].schedule_id;
        var practice_id = get_data[0].practice_id;
        var answer_id = get_data[0].answer_id;
        WHERE = 'where e.student_id="' + req.params.id + '"';
        var get_questions = [];
        if (domainpath == "http://localhost:8000") {
          get_questions = await SQL.query(
            `SELECT e.practice_set_id,b.*,TRIM(BOTH '"' FROM JSON_EXTRACT(ea.answers, CONCAT("$.",b.id))) as student_answer,m.value as solution FROM practice_question as e LEFT JOIN question_bank as b ON b.id=e.question_id LEFT JOIN practice_answers as ea ON ea.id='` +
              answer_id +
              `' LEFT JOIN question_meta as m ON m.question_id=b.id AND m.question_key='solution' WHERE e.practice_set_id='` +
              practice_id +
              `'`
          );
        } else if (domainpath == "http://upstartprep.com:5000/") {
          get_questions = await SQL.query(
            `SELECT e.practice_set_id,b.*,TRIM(BOTH '"' FROM JSON_EXTRACT(ea.answers, CONCAT('$."',b.id,'"'))) as student_answer,m.value as solution FROM practice_question as e LEFT JOIN question_bank as b ON b.id=e.question_id LEFT JOIN practice_answers as ea ON ea.id='` +
              answer_id +
              `' LEFT JOIN question_meta as m ON m.question_id=b.id AND m.question_key='solution' WHERE e.practice_set_id='` +
              practice_id +
              `'`
          );
        }

        get_data[0]["details"] = get_questions;
      }

      g_response["message"] = "success";
      g_response["data"] = get_data;
      g_status_code = 200;
      res.status(g_status_code).json(g_response);
    }
  } catch {
    g_response["status"] = "error";
    g_response["message"] = "Invalid Details";
    g_status_code = 400;
    res.status(g_status_code).json(g_response);
  }
};
exports.PracticeSetScoreObtainedByInstructorID = async (req, res) => {
  var ID;
  var level;
  var resp_data = [];
  var g_response = {};
  var g_status_code;
  var WHERE = "";
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      var get_user_valid = await SQL.gettabledata("users", ["id"], {
        id: req.params.id,
      });
      console.log(get_user_valid);
      if (get_user_valid.length < 1) {
        g_response["error"] = "error";
        g_response["message"] = "INVALID USER";
        g_status_code = 200;
        res.status(g_status_code).json(g_response);
      }
      var get_data = await SQL.query(
        "SELECT DISTINCT e.id,e.practice_id,ex.title,e.schedule_id,e.student_id,e.answer_id,CONCAT(u.first_Name,u.last_Name)as student_name,e.correct_answers,e.total_correct,e.incorrect_answers,e.total_incorrect,e.exam_not_attempted,e.total_not_attempted,e.total_attempted,e.exam_attempted,e.negative_marks,e.total_questions,e.total_score,e.obtained_marks,e.result,e.datetime FROM practice_marks_obtained as e LEFT JOIN practice_sets as ex ON ex.id=e.practice_id LEFT JOIN users as u ON u.id=e.student_id WHERE  FIND_IN_SET('" +
          ID +
          "',u.instructor)"
      );

      if (req.params.id != "all") {
        var student_id = get_data[0].student_id;
        var schedule_id = get_data[0].schedule_id;
        var practice_id = get_data[0].practice_id;
        var answer_id = get_data[0].answer_id;
        WHERE = 'where e.id="' + req.params.id + '"';
        var get_questions = [];
        if (domainpath == "http://localhost:8000") {
          get_questions = await SQL.query(
            `SELECT e.practice_set_id,b.*,TRIM(BOTH '"' FROM JSON_EXTRACT(ea.answers, CONCAT("$.",b.id))) as student_answer,m.value as solution FROM practice_question as e LEFT JOIN question_bank as b ON b.id=e.question_id LEFT JOIN practice_answers as ea ON ea.id='` +
              answer_id +
              `' LEFT JOIN question_meta as m ON m.question_id=b.id AND m.question_key='solution' WHERE e.practice_set_id='` +
              practice_id +
              `'`
          );
        } else if (domainpath == "http://upstartprep.com:5000/") {
          get_questions = await SQL.query(
            `SELECT e.practice_set_id,b.*,TRIM(BOTH '"' FROM JSON_EXTRACT(ea.answers, CONCAT('$."',b.id,'"'))) as student_answer,m.value as solution FROM practice_question as e LEFT JOIN question_bank as b ON b.id=e.question_id LEFT JOIN practice_answers as ea ON ea.id='` +
              answer_id +
              `' LEFT JOIN question_meta as m ON m.question_id=b.id AND m.question_key='solution' WHERE e.practice_set_id='` +
              practice_id +
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

exports.PracticeSetHistory = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  try {
    var get_data = await SQL.query(
      "SELECT DISTINCT CONCAT(u.first_Name,u.last_Name) as student_name,q.title as quiz_title,o.* FROM practice_marks_obtained as o LEFT JOIN users as u ON u.id=o.student_id LEFT JOIN practice_sets as q ON q.id=o.practice_id"
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
