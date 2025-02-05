const table = "group_users";
const { decodetheid, validation } = require("../helpers/common");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const SQL = require("../helpers/sql");
const Model = require("../helpers/instructions");
// const console = require("../util/logger").console;

exports.createGroupUser = async (req, res) => {
  console.log(req.body);
  const validationRule = {};
  var g_response = {};
  var g_status_code;
  var data = req.body;
  try {
    const valid_data = await validation(data, validationRule);
    // var errorLog = await console;
    // console.log("LLLLLLLLLLLLLLLLLLL");
    // console.log(errorLog);
    // console.log("LLLLLLLLLLLLLLLLLLL");
    var get_group = await SQL.gettabledata("la_groups", [], {
      id: data.group_id,
    });
    var get_user = await SQL.gettabledata("users", [], {
      id: data.user_id,
    });
    var get_group_user = await SQL.gettabledata("group_users", [], {
      group_id: data.group_id,
      user_id: data.user_id,
    });

    if (get_group.length > 0 && get_user.length > 0) {
      if (get_group_user.length < 1) {
        const create_data = await SQL.addData("group_users", data);
        g_response["status"] = "success";
        g_response["message"] = `Created ${table} Successfully`;

        g_status_code = 201;
        res.status(g_status_code).json(g_response);
      } else {
        g_response["status"] = "error";
        g_response["message"] = "Already Exist";
        g_status_code = 400;
        res.status(g_status_code).json(g_response);
      }
    } else if (get_user.length < 1) {
      g_response["status"] = "error";
      g_response["message"] = "INVALID User ID";
      g_status_code = 400;
      res.status(g_status_code).json(g_response);
    } else if (get_group.length < 1) {
      g_response["status"] = "error";
      g_response["message"] = "INVALID Group ID";
      g_status_code = 403;
      res.status(g_status_code).json(g_response);
    } else {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
      res.status(g_status_code).json(g_response);
    }
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
    res.status(g_status_code).json(g_response);
  }
};

exports.getVideoBankByID = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const get_VideoBank = await SQL.query(
        "SELECT DISTINCT b.id,b.video_title,b.video_type,b.video_link,b.video_thumbnail,b.description,b.sub_category_id,sc.sub_category_name,b.skill_id,s.skill_name,b.topic_id,t.topic_name,b.tags_id,ta.tag_name,b.difficulty_level,e.name as difficulty_name,b.watch_time,b.paid,b.active FROM video_bank as b LEFT JOIN skills as s ON s.id=b.skill_id LEFT JOIN topics as t ON t.id=b.topic_id LEFT JOIN tags as ta ON ta.id=b.tags_id LEFT JOIN sub_categories as sc ON sc.id= b.sub_category_id LEFT JOIN entity as e ON e.id=b.difficulty_level WHERE b.id=" +
          ID
      );

      g_response["status"] = "success";
      g_response["responsedata"] = get_VideoBank;
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

exports.getAllVideoBank = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;

  try {
    const get_video_bank = await SQL.query(
      "SELECT DISTINCT b.id,b.video_title,b.video_type,b.video_link,b.video_thumbnail,b.description,b.sub_category_id,sc.sub_category_name,b.skill_id,s.skill_name,b.topic_id,t.topic_name,b.tags_id,ta.tag_name,b.difficulty_level,e.name as difficulty_name,b.watch_time,b.paid,b.active FROM video_bank as b LEFT JOIN skills as s ON s.id=b.skill_id LEFT JOIN topics as t ON t.id=b.topic_id LEFT JOIN tags as ta ON ta.id=b.tags_id LEFT JOIN sub_categories as sc ON sc.id= b.sub_category_id LEFT JOIN entity as e ON e.id=b.difficulty_level"
    );

    g_response["status"] = "success";
    g_response["responsedata"] = get_video_bank;
    g_status_code = 200;
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }
  res.status(g_status_code).json(g_response);
};

exports.updateVideoBankByID = async (req, res) => {
  var ID;
  console.log(req.body);
  var data = req.body;
  var g_response = {};
  var g_status_code;
  const validationRule = {
    video_title: "required|string",
    video_type: "required|number",
    video_link: "required|string",
    video_thumbnail: "required|string",
  };
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const valid_data = await validation(data, validationRule);
      const update_data = await SQL.Updatedata("video_bank", data, {
        id: ID,
      });

      g_response["status"] = "success";
      g_response["responsedata"] = "video_bank Updated Successfully";
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
    console.log(deleteID);
    try {
      const delete_resp = await Delete(deleteID);
      g_response["status"] = "success";
      g_response["message"] = "video_bank Delete Successfully";
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};
const Delete = async (deleteID, result) => {
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
