var axios = require("axios");
var qs = require("qs");
const Model = require("../helpers/instructions");
const table = "gpt";

// Plan object constructor
var Modeltable = function () {};

Modeltable.create = async (saveData, result) => {
  let add_payload = {
    table_name: table,
    dataToSave: saveData,
  };
  console.log(add_payload);
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
  var where = "WHERE id=" + ID;
  if (ID == "all") {
    where = "";
  }
  console.log(where);
  let sql_query_payload = {
    sql_script: `SELECT * FROM ${table} ${where}`,

    method: "get",
  };
  console.log(sql_query_payload);
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
  console.log(data);
  let update_payload = {
    table_name: table,
    query_field: "id",
    query_value: data.id,
    dataToSave: data.save_data,
  };
  console.log(update_payload);
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

Modeltable.deletebyid = async (deleteID, result) => {
  let delete_payload = {
    table_name: table,
    query_field: "id",
    query_value: deleteID,
  };
  const respSql = await Model.delete_query(delete_payload);
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
