const con = require("./db");
const Model = require("../helpers/instructions");
const { error_query, sql_query } = require("../helpers/instructions");

const table = "contact_us";

const ContactUs = function () {};

ContactUs.create = async (saveData, result) => {
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

ContactUs.getById = async (ID, result) => {
  var where = "WHERE id=" + ID;
  if (ID == "all") {
    where = "";
  }
  let sql_query_payload = {
    sql_script: `SELECT id,fullname ,email, subject, message, phone, seen FROM ${table}  ${where}`,

    method: "get",
  };
  const respSql = await Model.sql_query(sql_query_payload);
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

ContactUs.getAll = async (result) => {
  let sql_query_payload = {
    sql_script: `SELECT id,fullname ,email, subject, message, phone, seen FROM ${table} `,

    method: "get",
  };
  const respSql = await Model.sql_query(sql_query_payload);
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

module.exports = ContactUs;
