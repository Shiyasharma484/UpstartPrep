const Model = require("../helpers/instructions");
const table_module = "modules";
// Plan object constructor
var Modules = function () {};
//
/*-----------fetchModulesNamesAndIds------------------------------starts here--------------------*/
Modules.fetchModulesNamesAndIds = async (result) => {
  let sql_query_payload = {
    sql_script: `SELECT id, name FROM ${table_module} WHERE active = 1 AND trash = 0`,
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
/*-----------fetchModulesNamesAndIds------------------------------ends here--------------------*/
//
module.exports = Modules;
//--------------------------------------------------------------------------------------------------
