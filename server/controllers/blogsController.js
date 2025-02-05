const table = "blogs";
const { decodetheid, validation } = require("../helpers/common");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const SQL = require("../helpers/sql");
const Model = require("../helpers/instructions");
exports.CreateBlogs = async (req, res) => {
  var g_response = {};
  var g_status_code;
  var data = req.body;
  var validationRule = {
    user_id: "required|number",
    title: "required|string",
    html: "required|string",
  };
  try {
    const valid_data = await validation(data, validationRule);
    var add_data = await SQL.addData("blogs", data);
    g_response["status"] = "success";
    g_response["responsedata"] = "Blog created successfully";
    g_status_code = 201;
    res.status(g_status_code).json(g_response);
  } catch {
    g_response["status"] = "error";
    g_response["message"] = "Invalid Details";
    g_status_code = 400;
    res.status(g_status_code).json(g_response);
  }
};

exports.GetBlogByID = async (req, res) => {
  var g_response = {};
  var g_status_code;
  var ID;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      var Get_data = await SQL.gettabledata("blogs", [], { id: ID });
      g_response["status"] = "success";
      g_response["responsedata"] = Get_data;
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
exports.GetAllBlog = async (req, res) => {
  var g_response = {};
  var g_status_code;
  var ID;

  try {
    var Get_data = await SQL.gettabledata("blogs", []);
    g_response["status"] = "success";
    g_response["responsedata"] = Get_data;
    g_status_code = 200;
    res.status(g_status_code).json(g_response);
  } catch {
    g_response["status"] = "error";
    g_response["message"] = "Invalid Details";
    g_status_code = 400;
    res.status(g_status_code).json(g_response);
  }
};

exports.UpdateByBlogId = async (req, res) => {
  var ID;
  var data = req.body;
  var g_response = {};
  var g_status_code;
  var validationRule = {
    user_id: "required|number",
    title: "required|string",
    html: "required|string",
  };
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const valid_data = await validation(data, validationRule);
      const update_data = await SQL.Updatedata("blogs", data, {
        id: ID,
      });

      g_response["status"] = "success";
      g_response["responsedata"] = "Blogs Updated Successfully";
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
      var check = await SQL.gettabledata("blogs", ["id"], { id: deleteID });

      if (check < 1) {
        g_response["status"] = "error";
        g_response["message"] = "No Data";
        g_status_code = 200;
      } else {
        const delete_resp = await Delete(deleteID);
        g_response["status"] = "success";
        g_response["message"] = "Blogs Delete Successfully";
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
