var axios = require("axios");
var qs = require("qs");

const Model = require("../helpers/instructions");
const table = "pinterest";
const table_users = "pinterest_users";
// Plan object constructor
var Modeltable = function () {};

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

Modeltable.get_authurl = async (ID, result) => {
  console.log(ID);

  let sql_query_payload = {
    sql_script: `SELECT CONCAT(auth_url,"&client_id=",client_id,"&redirect_uri=",redirect_uri,"&scope=",scope) as auth_url FROM pinterest `,
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

Modeltable.get_access_token = async (ID, result) => {
  console.log(ID);

  let sql_query_payload = {
    sql_script: `SELECT user_id,refresh_token,token FROM pinterest_users WHERE user_id=${ID} `,

    method: "get",
  };
  // console.log(sql_query_payload);
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
    query_field: "id",
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

Modeltable.updateAccessToken = async (data, result) => {
  let update_payload = {
    table_name: table_users,
    query_field: "user_id",
    query_value: data.id,
    dataToSave: data.save_data,
  };
  console.log(update_payload);
  console.log("KKKKKKKKKKKKKKKKKKK");
  const respSql = await Model.edit_query(update_payload);
  console.log(respSql);
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
