const table = "sub_categories";
const { decodetheid, validation } = require("../helpers/common");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const SQL = require("../helpers/sql");
const Model = require("../helpers/instructions");

exports.createSubCategory = async (req, res) => {
  console.log(req.body);
  const validationRule = {
    sub_category_name: "required|string",
    category_id: "required|number",
    type: "required|number",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;

  try {
    const valid_data = await validation(data, validationRule);
    const check_name = data.sub_category_name;
    console.log(check_name);
    const get_category_name = await SQL.gettabledata("sub_categories", "id", {
      sub_category_name: check_name,
    });

    if (get_category_name[0]) {
      g_response["status"] = "error";
      g_response["message"] = "Sub Category Already Exists";
      g_status_code = 200;
    } else {
      const create_data = await SQL.addData("sub_categories", data);

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

exports.getSubCategoryByID = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const get_sub_categories = await SQL.query(
        "SELECT sc.id,sc.sub_category_name,sc.category_id,sc.section_id,c.category_name,sc.type,e.name as sub_category_type,sc.short_description,sc.description, sc.active FROM sub_categories as sc LEFT JOIN categories as c ON sc.category_id=c.id LEFT JOIN entity as e ON e.id=sc.type WHERE sc.id=" +
          ID
      );
      g_response["status"] = "success";
      g_response["responsedata"] = get_sub_categories;
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }

    res.status(g_status_code).json(g_response);
  }
};

exports.getAllSubCategory = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;

  try {
    const get_sub_categories = await SQL.query(
      "SELECT sc.id,sc.sub_category_name,sc.category_id,sc.section_id,c.category_name,sc.type,e.name as sub_category_type,sc.short_description,sc.description, sc.active FROM sub_categories as sc LEFT JOIN categories as c ON sc.category_id=c.id LEFT JOIN entity as e ON e.id=sc.type"
    );
    g_response["status"] = "success";
    g_response["responsedata"] = get_sub_categories;
    g_status_code = 200;
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }

  res.status(g_status_code).json(g_response);
};

exports.updateSubCategoryByID = async (req, res) => {
  var ID;
  console.log(req.body);
  var data = req.body;
  var g_response = {};
  var g_status_code;
  const validationRule = {
    sub_category_name: "string",
    category_id: "number",
    type: "number",
  };
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const valid_data = await validation(data, validationRule);
      const check_name = data.sub_category_name;
      console.log(check_name);
      const get_category_name = await SQL.count(
        "sub_categories",
        { sub_category_name: check_name },
        { id: ID }
      );
      if (get_category_name > 0) {
        g_response["status"] = "error";
        g_response["message"] = "Sub Category Already Exists";
        g_status_code = 200;
      } else {
        const update_data = await SQL.Updatedata("sub_categories", data, {
          id: ID,
        });

        g_response["status"] = "success";
        g_response["responsedata"] = "Sub Category Updated Successfully";
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
      const delete_resp = await subcategoryDelete(deleteID);
      g_response["status"] = "success";
      g_response["message"] = "Sub Category Delete Successfully";
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};
const subcategoryDelete = async (deleteID, result) => {
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
