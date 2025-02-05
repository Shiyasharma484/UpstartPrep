const table = "schedule";
const { decodetheid, validation } = require("../helpers/common");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const SQL = require("../helpers/sql");
const Model = require("../helpers/instructions");

exports.createSchedule = async (req, res) => {
  console.log(req.body);
  const validationRule = {
    schedule_type: "required|string",
    start_date: "required|string",
    start_time: "required|string",
    grace_period_to_join: "number",
    // schedule_to_individual: "required",
    // schedule_to_group: "required",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;

  try {
    const valid_data = await validation(data, validationRule);

    try {
      if (data.schedule_to_group) {
        data.schedule_to_group = data.schedule_to_group.join(",");
      }
      const create_data = await SQL.addData("schedule", data);

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

exports.getScheduleByID = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      var get_data = await SQL.query(
        "SELECT s.*,m.name as event_type_name FROM schedule as s LEFT JOIN modules as m ON m.id=s.event_type WHERE s.id=" +
          ID
      );
      get_data[0].schedule_to_group = Array.from(
        get_data[0].schedule_to_group.split(","),
        Number
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

exports.getScheduleByUserID = async (req, res) => {
  var ID;
  var response_data = [];
  var g_response = {};
  var g_status_code;
  var free;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    console.log(ID);
    try {
      var user_available = await SQL.gettabledata("users", [], { id: ID });
      if (user_available.length < 1) {
        g_response["status"] = "error";
        g_response["message"] = "Not A Valid User";
        g_status_code = 200;
        res.status(g_status_code).json(g_response);
      } else {
        var get_group_id = await SQL.gettabledata("group_users", ["group_id"], {
          user_id: ID,
        });
        console.log(get_group_id.length);
        if (get_group_id.length < 1) {
          g_response["status"] = "error";
          g_response["message"] = "No Data";
          g_status_code = 200;
          res.status(g_status_code).json(g_response);
        } else {
          var get_group_id = await SQL.gettabledata(
            "group_users",
            ["group_id"],
            {
              user_id: ID,
            }
          );
          console.log(get_group_id);
          if (get_group_id.length > 0) {
            get_group_id.forEach(async (element) => {
              var get_group_data = await SQL.query(
                "SELECT DISTINCT s.id as schedule_id,s.event_id,e.title as EXAM_TITLE,e.free as exam_free,q.title as QUIZZES_TITLE,q.free as quiz_free,p.title as PRACTICE_SETS_TITLE,p.free as practice_set_free,ob.student_id,s.schedule_type,l.group_name,l.active,s.event_id,s.event_type,m.name as event_type_name,s.start_date,s.end_date,s.start_time,s.end_time,s.grace_period_to_join,s.schedule_to_group,s.schedule_to_individual,s.status,l.group_name,ob.obtained_marks as exam_marks_obtained,ob.result as exam_result,ob.datetime as exam_date,qb.obtained_marks as quiz_marks_obtained,qb.result as quiz_result,qb.datetime as quiz_date,pb.obtained_marks as practice_marks_obtained,pb.datetime as practice_date FROM schedule as s LEFT JOIN la_groups as l ON l.id=s.schedule_to_group LEFT JOIN exam_marks_obtained as ob ON ob.schedule_id=s.id AND ob.student_id='" +
                  ID +
                  "' LEFT JOIN quiz_marks_obtained as qb ON qb.schedule_id=s.id AND qb.student_id='" +
                  ID +
                  "' LEFT JOIN practice_marks_obtained as pb ON pb.schedule_id=s.id AND pb.student_id='" +
                  ID +
                  "' LEFT JOIN exams as e ON e.id=s.event_id AND s.event_type='30' LEFT JOIN quiz as q ON q.id=s.event_id AND s.event_type='29'  LEFT JOIN practice_sets as p ON p.id=s.event_id AND s.event_type='34'   LEFT JOIN modules as m ON m.id=s.event_type WHERE FIND_IN_SET('" +
                  element.group_id +
                  "',s.schedule_to_group) AND s.status=1 AND s.start_date >= CURRENT_DATE()  AND !FIND_IN_SET('" +
                  ID +
                  "',s.schedule_to_individual ) OR !FIND_IN_SET('" +
                  element.group_id +
                  "',s.schedule_to_group)  AND s.status=1 AND s.start_date >= CURRENT_DATE() AND FIND_IN_SET('" +
                  ID +
                  "',s.schedule_to_individual )"
              );

              // var rv = {};
              // const new_data = Object.entries(get_group_data).map(
              //   ([key, value]) => ({
              //     key,
              //     value,
              //   })
              // ); // to make array
              // var newArray = new_data.filter(function (el) {
              //   return el.value != null; // remove null values
              // });
              // newArray.forEach(async (items) => {
              //   rv[items.key] = items.value;
              // });
              get_group_data.forEach(async (item, i) => {
                if (item.exam_free != null) {
                  get_group_data[i].free = item.exam_free;
                } else if (item.quiz_free != null) {
                  get_group_data[i].free = item.quiz_free;
                } else if (item.practice_set_free != null) {
                  get_group_data[i].free = item.practice_set_free;
                }
              });
              response_data = get_group_data;
            });
          }
          setTimeout(function () {
            g_response["status"] = "success";
            // g_response["data"] = get_user_data;
            g_response["data"] = response_data;
            g_status_code = 200;
            res.status(g_status_code).json(g_response);
          }, 500);
        }
      }
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = "Error";
      g_status_code = 400;
      res.status(g_status_code).json(g_response);
    }
  }
};

exports.bulkScore = async (req, res) => {
  var ID;
  var response_data = [];
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    console.log(ID);
    try {
      var user_available = await SQL.gettabledata("users", [], { id: ID });
      if (user_available.length < 1) {
        g_response["status"] = "error";
        g_response["message"] = "Not A Valid User";
        g_status_code = 200;
        res.status(g_status_code).json(g_response);
      } else {
        var get_group_id = await SQL.gettabledata("group_users", ["group_id"], {
          user_id: ID,
        });
        console.log(get_group_id.length);
        if (get_group_id.length < 1) {
          g_response["status"] = "error";
          g_response["message"] = "No Data";
          g_status_code = 200;
          res.status(g_status_code).json(g_response);
        } else {
          var get_group_id = await SQL.gettabledata(
            "group_users",
            ["group_id"],
            {
              user_id: ID,
            }
          );
          console.log(get_group_id);
          if (get_group_id.length > 0) {
            get_group_id.forEach(async (element) => {
              var get_group_data = await SQL.query(
                "SELECT DISTINCT s.id as schedule_id,s.event_id,e.title as EXAM_TITLE,q.title as QUIZZES_TITLE,p.title as PRACTICE_SETS_TITLE,ob.student_id as exam_student,qb.student_id as quiz_student,pb.student_id as practice_student,s.schedule_type,l.group_name,l.active,s.event_id,s.event_type,m.name as event_type_name,s.start_date,s.end_date,s.start_time,s.end_time,s.grace_period_to_join,s.schedule_to_group,s.schedule_to_individual,s.status,l.group_name,ob.obtained_marks as exam_marks_obtained,ob.result as exam_result,ob.datetime as exam_date,qb.obtained_marks as quiz_marks_obtained,qb.result as quiz_result,qb.datetime as quiz_date,pb.obtained_marks as practice_marks_obtained,pb.datetime as practice_date FROM schedule as s LEFT JOIN la_groups as l ON l.id=s.schedule_to_group LEFT JOIN exam_marks_obtained as ob ON ob.schedule_id=s.id AND ob.student_id='" +
                  ID +
                  "' LEFT JOIN quiz_marks_obtained as qb ON qb.schedule_id=s.id AND qb.student_id='" +
                  ID +
                  "' LEFT JOIN practice_marks_obtained as pb ON pb.schedule_id=s.id AND pb.student_id='" +
                  ID +
                  "' LEFT JOIN exams as e ON e.id=s.event_id AND s.event_type='30' LEFT JOIN quiz as q ON q.id=s.event_id AND s.event_type='29'  LEFT JOIN practice_sets as p ON p.id=s.event_id AND s.event_type='34'   LEFT JOIN modules as m ON m.id=s.event_type WHERE FIND_IN_SET('" +
                  element.group_id +
                  "',s.schedule_to_group) AND s.status=1 AND s.start_date >= CURRENT_DATE()  AND !FIND_IN_SET('" +
                  ID +
                  "',s.schedule_to_individual ) OR !FIND_IN_SET('" +
                  element.group_id +
                  "',s.schedule_to_group) AND s.status=1 AND FIND_IN_SET('" +
                  ID +
                  "',s.schedule_to_individual ) AND s.start_date >= CURRENT_DATE()"
              );

              // var rv = {};
              // const new_data = Object.entries(get_group_data).map(
              //   ([key, value]) => ({
              //     key,
              //     value,
              //   })
              // ); // to make array
              // var newArray = new_data.filter(function (el) {
              //   return el.value != null; // remove null values
              // });
              // newArray.forEach(async (items) => {
              //   rv[items.key] = items.value;
              // });

              response_data = get_group_data;
            });
          }
        }
      }
      setTimeout(function () {
        g_response["status"] = "success";
        // g_response["data"] = get_user_data;
        g_response["data"] = response_data;
        g_status_code = 200;
        res.status(g_status_code).json(g_response);
      }, 500);
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = "Error";
      g_status_code = 400;
      res.status(g_status_code).json(g_response);
    }
  }
};

exports.getAllSchedule = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  var newArray = [];

  try {
    if (req.params.id && req.params.id.length > 0) {
      ID = req.params.id;
      var get_student_schedule = await SQL.gettabledata(
        "exam_marks_obtained",
        ["student_id", "exam_id", "schedule_id"],
        { student_id: ID }
      );
      if (get_student_schedule.length > 0) {
        get_student_schedule.forEach(async (element, i) => {
          var get_data = await SQL.query(
            "SELECT DISTINCT s.*,m.name as event_type_name,o.student_id FROM schedule as s LEFT JOIN modules as m ON m.id=s.event_type LEFT JOIN exam_marks_obtained as o ON o.schedule_id=s.id WHERE o.student_id='" +
              element.student_id +
              "' AND o.schedule_id='" +
              element.schedule_id +
              "' AND o.exam_id='" +
              element.exam_id +
              "' ORDER BY s.id DESC"
          );

          newArray.push(get_data[0]);
        });

        setTimeout(function () {
          g_response["status"] = "success";
          g_response["data"] = newArray;
          g_status_code = 200;
          res.status(g_status_code).json(g_response);
        }, 500);
      } else {
        g_response["error"] = "error";
        g_response["message"] = "No Data";
        g_status_code = 201;
        res.status(g_status_code).json(g_response);
      }
    } else {
      var get_data = await SQL.query(
        "SELECT s.*,m.name as event_type_name FROM schedule as s LEFT JOIN modules as m ON m.id=s.event_type"
      );
      g_response["status"] = "success";
      g_response["data"] = get_data;
      g_status_code = 200;
      res.status(g_status_code).json(g_response);
    }
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
    res.status(g_status_code).json(g_response);
  }
};

exports.updateScheduleByID = async (req, res) => {
  var ID;
  console.log(req.body);
  var data = req.body;
  var g_response = {};
  var g_status_code;
  const validationRule = {
    // tag_name: "string",
    // schedule_to_individual: "required",
    // schedule_to_group: "required",
  };
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const valid_data = await validation(data, validationRule);
      const update_data = await SQL.Updatedata("schedule", data, {
        id: ID,
      });

      g_response["status"] = "success";
      g_response["responsedata"] = "Schedule Updated Successfully";
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

    try {
      const delete_resp = await scheduleDelete(deleteID);
      g_response["status"] = "success";
      g_response["message"] = "Schedule Delete Successfully";
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};
const scheduleDelete = async (deleteID, result) => {
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

exports.getScheduleByEventID = async (req, res) => {
  var ID;
  var g_response = {};
  var data = req.params;
  var g_status_code;
  if (req.params.event_id && req.params.event_id.length > 0) {
    ID = req.params.event_id;
    try {
      var get_data = await SQL.gettabledata("schedule", [], {
        event_id: ID,
        event_type: data.event_type,
      });
      get_data[0].schedule_to_group = Array.from(
        get_data[0].schedule_to_group.split(","),
        Number
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

exports.getScheduleByEvent = async (req, res) => {
  var ID;
  var g_response = {};
  var data = req.body;
  var g_status_code;
  if (req.params.event_type && req.params.event_type.length > 0) {
    ID = req.params.event_type;
    try {
      var get_data = await SQL.gettabledata("schedule", [], {
        event_type: ID,
      });
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

exports.getScheduleByCurrentdate = async (req, res) => {
  console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC");
  var current_date;
  var g_response = {};
  var data = req.body;
  var g_status_code;
  let today = new Date();
  let dd = today.getDate();

  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }
  today = `${yyyy}-${mm}-${dd}`;

  try {
    var get_data = await SQL.gettabledata("schedule", [], {
      start_date: today,
    });
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

exports.getScheduleByGroup = async (req, res) => {
  var ID;
  var g_response = {};
  var data = req.body;
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      var get_data = await SQL.gettabledata("schedule", [], {
        schedule_to_group: ID,
      });
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

exports.getScheduleByIndividual = async (req, res) => {
  var ID;
  var g_response = {};
  var data = req.body;
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      var get_data = await SQL.query(
        `SELECT * FROM schedule WHERE FIND_IN_SET(${ID},	schedule_to_individual)`
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
