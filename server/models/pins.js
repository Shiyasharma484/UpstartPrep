var axios = require("axios");
var qs = require("qs");
const Model = require("../helpers/instructions");
const table = "pins";
const table_boards = "boards";
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
  var where = "WHERE id=" + ID + " && 	scheduled=0";
  if (ID == "all") {
    where = "WHERE scheduled=0";
  }
  console.log(where);
  let sql_query_payload = {
    sql_script: `SELECT id,pinterest_id,board_id,media_url,link,description,pinterest_title,scheduled FROM ${table}  ${where} ORDER BY id DESC`,

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

Modeltable.getByBoardId = async (boardID, result) => {
  console.log(boardID);

  let sql_query_payload = {
    //SELECT p.id,p.pinterest_id,p.pinterest_title,p.board_id,p.description,p.scheduled_date FROM pins as p
    // LEFT JOIN boards as s ON p.board_id= s.id
    // WHERE p.board_id=8;

    sql_script: `SELECT p.id,p.pinterest_id,p.pinterest_title as title,b.title as board_title,p.link,p.board_id,p.description,p.scheduled_date FROM ${table} as p LEFT JOIN ${table_boards} as b ON p.board_id= b.id WHERE FIND_IN_SET(${boardID},p.board_id)`,

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
