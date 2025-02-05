const Modeltable = require("../models/schedule");
const con = require("../models/db");
const { ExtractToken } = require("../ApiMiddleware");
const { decodetheid, validation } = require("../helpers/common");
const Model = require("../helpers/instructions");
const table = "schedule";
var cron = require("node-cron");
const SQL = require("../helpers/sql");
const {
  Publish_Pins,
  GetPins,
  CreatePins,
  DeletePin,
  UpdatePin,
  GetPinsByID,
  GetToken,
} = require("../helpers/pinterest");

//-------------------------------------------------------------------------------------------------------------
function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const addHours = (date, hours) => {
  date.setHours(date.getHours() + hours);

  return date;
};
exports.Create = async (req, res) => {
  const validationRule = {
    pin_id: "required",
    date: "required|string",
    time: "required|string",
    board_id: "required",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;
  console.log(data);
  var token = req.headers.token;
  console.log(token);
  try {
    const valid_data = await validation(data, validationRule);

    const schedule_interval = await get_interval();
    var interval = schedule_interval.schedule_interval;
    // console.log(schedule_interval);
    var board_list = data.board_id.split(",");
    var pin_list = data.pin_id.split(",");
    var get_user_id = req.headers.user.id;
    var meta_insert_start =
      "INSERT INTO schedule (pin_id, date,month,year,time,board_id,user_id) VALUES ";
    var meta_insert_sql = "";

    const month_list = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var schedule_date_time = data.date + "T" + data.time;
    board_list.forEach(async (board_id, i) => {
      if (i == 0) {
        const date = new Date(schedule_date_time);
        var month = date.getMonth();
        month = month_list[month];
        var year = date.getFullYear();
        pin_list.forEach(async (pin_id, i) => {
          meta_insert_sql =
            meta_insert_sql +
            "('" +
            pin_id +
            "','" +
            data.date +
            "','" +
            month +
            "','" +
            year +
            "','" +
            data.time +
            "','" +
            board_id +
            "','" +
            get_user_id +
            "'),";
          var updatepin = await SQL.Updatedata(
            "pins",
            { scheduled: 1 },
            { id: pin_id }
          );
        });
      } else {
        const date = new Date(schedule_date_time);

        const newDate = addHours(date, interval * i);
        var new_sch_date = newDate.toISOString();
        new_sch_date = new_sch_date.split("T");
        var month = newDate.getMonth();
        var day = newDate.getDate();
        var hours = newDate.getHours();
        var minutes = newDate.getMinutes();
        var year = newDate.getFullYear();
        var m = month + 1;
        var schedule_date = year + "-" + m + "-" + day;
        var schedule_time = hours + ":" + minutes;
        month = month_list[month];
        pin_list.forEach((pin_id, i) => {
          meta_insert_sql =
            meta_insert_sql +
            "('" +
            pin_id +
            "','" +
            new_sch_date[0] +
            "','" +
            month +
            "','" +
            year +
            "','" +
            new_sch_date[1].replace(".000Z", "") +
            "','" +
            board_id +
            "','" +
            get_user_id +
            "'),";
          con;
        });
      }
    });
    var sql_query =
      meta_insert_start +
      meta_insert_sql.substring(0, meta_insert_sql.length - 1);
    console.log(sql_query);
    try {
      const create_response = await create(sql_query);
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

const create = (sqlquery) => {
  return new Promise((resolve, reject) => {
    const sql = con.query(sqlquery, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

exports.GetById = async (req, res) => {
  var date_time = new Date();

  var ID;
  var g_response = {};
  var g_status_code;
  var user_id = req.headers.user.id;
  if (req.params.id && req.params.id.length > 0) {
    ID = decodetheid(req.params.id);
    if (req.params.id == "all") {
      var WHERE = { user_id: req.headers.user.id };
    } else {
      var WHERE = { user_id: req.headers.user.id, id: req.params.id };
      ID = req.params.id;
    }
    try {
      let sql_query_payload = `SELECT s.id,p.media_url,p.pinterest_title as title,s.date,s.month,s.year,s.pin_id,s.time FROM schedule as s LEFT JOIN pins as p ON p.id = s.pin_id where s.user_id=${user_id}`;
      console.log(sql_query_payload);

      // const get_data = await SQL.gettabledata("schedule", [], WHERE);
      const get_data = await SQL.query(sql_query_payload);

      console.log(get_data);
      g_response["status"] = "success";
      g_response["responsedata"] = get_data;
      g_status_code = 200;
      console.log(g_response);
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

const get_by_id = (ID) => {
  console.log(ID);
  return new Promise((resolve, reject) => {
    Modeltable.getById(ID, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.GetByBoardId = async (req, res) => {
  var boardID;
  var g_response = {};
  var g_status_code;

  if (req.params.board_id && req.params.board_id.length > 0) {
    boardID = decodetheid(req.params.board_id);
    try {
      const get_data = await get_by_board_id(boardID);
      g_response["status"] = "success";
      g_response["responsedata"] = get_data;
      g_status_code = 200;
      console.log(g_response);
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

const get_by_board_id = (boardID) => {
  console.log(boardID);
  return new Promise((resolve, reject) => {
    Modeltable.getByBoardId(boardID, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.UpdateById = async (req, res) => {
  console.log(req);
  const validationRule = {
    // pin_id: "required|number",
    // date: "string",
    // month: "string",
    // year: "number",
    // time: "required|string",
    // board_id: "required|number",
  };
  var ID;
  var g_response = {};
  var g_status_code;

  const data = req.body;
  console.log(data);
  if (req.params.id && req.params.id.length > 0) {
    ID = decodetheid(req.params.id);

    try {
      const validate_data = await validation(data, validationRule);

      const saveData = {};
      saveData["id"] = ID;
      saveData["save_data"] = validate_data;

      try {
        const create__response = await update_byId(saveData);

        g_response["status"] = "success";
        g_response["message"] = `Update ${table} Successfully`;
        g_status_code = 201;
      } catch (err) {
        g_response["status"] = "error";
        g_response["message"] = err.message;
        g_status_code = 400;
      }
    } catch (err) {
      g_response["status"] = "err";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

const update_byId = (data) => {
  return new Promise((resolve, reject) => {
    Modeltable.update(data, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const get_interval = (data) => {
  return new Promise((resolve, reject) => {
    Modeltable.getintervalById(data, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const GetUserID = async (token) => {
  let sql_query_payload = {
    sql_script: "SELECT id FROM users  WHERE  access_token='" + token + "'",
    method: "get",
  };
  const respSql = await Model.sql_query(sql_query_payload);

  if (respSql.status == "success") {
    return respSql.data[0];
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

exports.RunScheduler = async (req, res) => {
  // var date_time = new Date();
  // console.log(date_time);
  //cron .schedule("*/2 * * * *", () => {
  //   console.log("running a task every two minutes");
  // });

  var ID;
  var g_response = {};
  var g_status_code;
  let nz_date_string = new Date().toLocaleString("en-US", {
    timeZone: "Europe/Moscow",
  });
  let date_nz = new Date(nz_date_string);
  let year = date_nz.getFullYear();
  let month = ("0" + (date_nz.getMonth() + 1)).slice(-2);
  let date = ("0" + date_nz.getDate()).slice(-2);
  let hours = ("0" + date_nz.getHours()).slice(-2);
  let minutes = ("0" + date_nz.getMinutes()).slice(-2);
  let sch_date = year + "-" + month + "-" + date;
  let sch_time = hours + ":" + minutes;

  try {
    var sql_query =
      'SELECT s.*,s.id as schedule_id,p.* FROM schedule as s LEFT JOIN pins as p ON p.id = s.pin_id WHERE s.date="' +
      sch_date +
      '"  AND s.time LIKE "%' +
      sch_time +
      '%"';
    console.log(sql_query);
    const pins_data = await SQL.query(sql_query);
    console.log(pins_data);
    var tokens = {};
    pins_data.forEach(async (element) => {
      if (tokens[element.user_id] == null) {
        tokens[element.user_id] = await GetToken(element.user_id);
      }
      var user_token = tokens[element.user_id];

      var payload = {
        link: element.link,
        title: element.pinterest_title,
        description: element.description,
        dominant_color: "#6E7874",
        alt_text: element.pinterest_title,
        board_id: element.board_id,
        media_source: {
          source_type: "image_url",
          url: "https://api.pinner.myprocreator.com/" + element.media_url,
          // source_type: "image_base64",
          // content_type: "image/jpeg",
          // data: "/uploads/posts/5944738760a6.jpeg",
          // data: element.media_url,
        },
      };
      var publish_pin_data = await Publish_Pins(
        user_token,
        payload,
        user_token
      );
      var update_pin = await SQL.Updatedata(
        "schedule",
        (data = {
          job_status: 1,
          pinterest_pin: publish_pin_data.id,
          response: replaceAll(JSON.stringify(publish_pin_data), "'", "`"),
        }),
        { id: element.schedule_id }
      );

      // console.log(publish_pin_data);
    });
    console.log(sch_date, sch_time, pins_data);
    g_response["status"] = "success";
    g_response["responsedata"] = pins_data;
    g_status_code = 200;
    console.log(g_response);
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }
  // res.status(g_status_code).json(g_response);
};

exports.DeleteById = async (req, res) => {
  var deleteID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    deleteID = decodetheid(req.params.id);
    try {
      // const delete_resp = await delete_by_id(deleteID);
      const delete_resp = await delete_by_id(deleteID);
      g_response["status"] = "success";
      g_response["message"] = `Schedule Deleted Successfully`;
      g_response["responsedata"] = delete_resp;
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

const delete_by_id = (deleteID) => {
  return new Promise((resolve, reject) => {
    Modeltable.deletebyid(deleteID, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
