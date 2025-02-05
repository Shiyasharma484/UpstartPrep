var axios = require("axios");
var qs = require("qs");
const Model = require("../helpers/instructions");
const table = "default_links";
// Plan object constructor
var Modeltable = function () {};

Modeltable.create = async (saveData, result) => {
  let add_payload = {
    table_name: table,
    dataToSave: saveData,
  };

  const respSql = await Model.add_query(add_payload);
  if (respSql.status == "success") {
    result(null, respSql.id);
  } else if (respSql.status == "error") {
    const err = respSql.message;
    const respError = await Model.error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    result(Error, null);
  }
};

Modeltable.getById = async (ID, result) => {
  console.log(ID);
  var where = "WHERE user_id=" + ID;
  if (ID == "all") {
    where = "";
  }
  console.log(where);
  let sql_query_payload = {
    sql_script: `SELECT * FROM ${table} ${where}`,

    method: "get",
  };

  const respSql = await Model.sql_query(sql_query_payload);
  console.log(respSql);
  if (respSql.status == "success") {
    result(null, respSql.data);
  } else if (respSql.status == "error") {
    const err = respSql.message;
    const respError = await Model.error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    result(Error, null);
  }
};

Modeltable.update = async (data, result) => {
  let update_payload = {
    table_name: table,
    query_field: "user_id",
    query_value: data.id,
    dataToSave: data.save_data,
  };

  const respSql = await Model.edit_query(update_payload);
  if (respSql.status == "success") {
    result(null, respSql.status);
  } else if (respSql.status == "error") {
    const err = respSql.message;
    const respError = await Model.error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    result(Error, null);
  }
};

module.exports = Modeltable;
