const table = "categories";
const { decodetheid, validation } = require("../helpers/common");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const SQL = require("../helpers/sql");
const Model = require("../helpers/instructions");

exports.createCategory = async (req, res) => {
  console.log(req.body);
  var g_response = {};
  var g_status_code;
  var data = req.body;
  const validationRule = {
    category_name: "required|string",
  };

  try {
    const valid_data = await validation(data, validationRule);
    const check_name = data.category_name;
    console.log(check_name);
    const get_category_name = await SQL.gettabledata("categories", "id", {
      category_name: check_name,
    });

    if (get_category_name[0]) {
      g_response["status"] = "error";
      g_response["message"] = "Category Already Exists";
      g_status_code = 200;
    } else {
      const create_data = await SQL.addData("categories", data);

      g_response["status"] = "success";
      g_response["message"] = `Created ${table} Successfully`;
      g_status_code = 201;
    }
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }
  res.status(g_status_code).json(g_response);
};

exports.getCategoryByID = async (req, res) => {
  console.log(req.params);
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const get_categories = await SQL.gettabledata("categories", [], {
        id: ID,
      });
      g_response["status"] = "success";
      g_response["responsedata"] = get_categories;
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }

    res.status(g_status_code).json(g_response);
  }
};

exports.getAllCategories = async (req, res) => {
  console.log(req.params);
  var ID;
  var g_response = {};
  var g_status_code;
  try {
    const get_categories = await SQL.gettabledata("categories", []);
    g_response["status"] = "success";
    g_response["responsedata"] = get_categories;
    g_status_code = 200;
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }

  res.status(g_status_code).json(g_response);
};

exports.updateCategoryByID = async (req, res) => {
  var ID;
  console.log(req.body);
  var data = req.body;
  var g_response = {};
  var g_status_code;
  const validationRule = {
    category_name: "required|string",
  };
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const valid_data = await validation(data, validationRule);

      const check_name = data.category_name;
      console.log(check_name);
      const get_category_name = await SQL.count(
        "categories",
        { category_name: check_name },
        { id: ID }
      );
      if (get_category_name > 0) {
        g_response["status"] = "error";
        g_response["message"] = "Category Already Exists";
        g_status_code = 200;
      } else {
        const update_data = await SQL.Updatedata("categories", data, {
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
  }
  res.status(g_status_code).json(g_response);
};

exports.DeleteById = async (req, res) => {
  var deleteID;
  var g_response = {};
  var g_status_code;

  if (req.params.id && req.params.id.length > 0) {
    deleteID = req.params.id;
    console.log(deleteID);
    try {
      const delete_resp = await categoryDelete(deleteID);
      g_response["status"] = "success";
      g_response["message"] = "Category Delete Successfully";
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};
const categoryDelete = async (deleteID, result) => {
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
