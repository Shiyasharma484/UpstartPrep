var axios = require("axios");
var qs = require("qs");
const con = require("../models/db");
const Model = require("../helpers/instructions");
const table = "schedule";

// Plan object constructor
var Modeltable = function () {};

Modeltable.create = async (payload, result) => {
  const respSql = con.query(payload, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
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
  var where = "WHERE s.id=" + ID;
  if (ID == "all") {
    where = "";
  }
  console.log(where);
  let sql_query_payload = {
    sql_script: `SELECT s.id,p.media_url,p.pinterest_title as title,s.date,s.month,s.year,s.pin_id,s.time FROM ${table} as s LEFT JOIN pins as p ON p.id = s.pin_id ${where}`,

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

Modeltable.getByBoardId = async (boardID, result) => {
  console.log(boardID);

  let sql_query_payload = {
    sql_script: `SELECT * FROM ${table} as s  WHERE s.board_id=${boardID}`,
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

Modeltable.getintervalById = async (data, result) => {
  let sql_query_payload = {
    sql_script: `SELECT config_value as schedule_interval FROM configuration  WHERE config_key="schedule_interval"`,
    method: "get",
  };

  const respSql = await Model.sql_query(sql_query_payload);

  if (respSql.status == "success") {
    result(null, respSql.data[0]);
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
