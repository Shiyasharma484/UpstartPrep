const table = "user_logs";
const { decodetheid, validation } = require("../helpers/common");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const SQL = require("../helpers/sql");
const Model = require("../helpers/instructions");

exports.createUserLogs = async (req, res) => {
  console.log(req.body);
  const validationRule = {
    user_id: "required|number",
    date: "required",
    start_time: "required",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;

  try {
    const valid_data = await validation(data, validationRule);

    try {
      const create_data = await SQL.addData("user_logs", data);

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

exports.getUserLogsByUserID = async (req, res) => {
  console.log(req.params);
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const get_date = await SQL.gettabledata("user_logs", [], { user_id: ID });
      console.log(get_date);
      g_response["status"] = "success";
      g_response["responsedata"] = get_date;
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }

    res.status(g_status_code).json(g_response);
  }
};

exports.getUserLogsByDate = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  let today = new Date();
  console.log(today);
  let dd = today.getDate();
  console.log(dd);
  let mm = today.getMonth() + 1;
  console.log(mm);
  const yyyy = today.getFullYear();
  console.log(yyyy);
  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }
  today = `${yyyy}-${mm}-${dd}`;
  try {
    const get_data = await SQL.gettabledata("user_logs", [], { date: today });
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
