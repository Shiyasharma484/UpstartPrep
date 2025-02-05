const table = "contents";
const { decodetheid, validation } = require("../helpers/common");
const con = require("../models/db.js");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const SQL = require("../helpers/sql");
const Model = require("../helpers/instructions");

exports.createContent = async (req, res) => {
  const validationRule = {
    title: "required|string",
  };
  const metaRule = {};
  var g_response = {};
  var g_status_code;
  var data = req.body;
  try {
    const valid_data = await validation(data, validationRule);

    const check_title = data.title;
    console.log(check_title);
    const get_title = await SQL.gettabledata(" contents", "id", {
      title: check_title,
    });
    if (get_title[0]) {
      g_response["status"] = "error";
      g_response["message"] = "Already Exists";
      g_status_code = 200;
    } else {
      if (data.points != 1) {
        delete data.redeem_points;
      }
      const create_data = await SQL.addData("contents", data);
      const get_Add_data = await SQL.gettabledata("contents", [], {
        id: create_data,
      });
      g_response["status"] = "success";
      g_response["message"] = `Content Created  Successfully`;
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

exports.getContentByID = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      var get_data = await SQL.query("SELECT * FROM contents WHERE id=" + ID);

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

exports.getAllContent = async (req, res) => {
  var g_response = {};
  var g_status_code;

  try {
    var get_data = await SQL.query("SELECT * FROM contents ");

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

exports.updateByID = async (req, res) => {
  var ID;
  const validationRule = {
    title: "required|string",
    topics: "required|number",
    skills: "required|number",
  };

  var g_response = {};
  var g_status_code;
  var data = req.body;

  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      delete data.meta;
      const valid_data = await validation(data, validationRule);

      const check_name = data.title;
      console.log(check_name);
      const get_name = await SQL.count(
        "course",
        { title: check_name },
        { id: ID }
      );
      if (get_name > 0) {
        g_response["status"] = "error";
        g_response["message"] = "Course Already Exists";
        g_status_code = 200;
      } else {
        const update_data = await SQL.Updatedata("course", data, {
          id: ID,
        });

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
      var get_data = await SQL.gettabledata("course", ["id"], { id: deleteID });
      if (get_data.length < 1) {
        g_response["status"] = "error";
        g_response["message"] = "No Data";
        g_status_code = 204;
        res.status(g_status_code).json(g_response);
      }
      const delete_resp = await courseDelete(deleteID);

      g_response["status"] = "success";
      g_response["message"] = "Course Deleted Successfully";
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
const courseDelete = async (deleteID, result) => {
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
