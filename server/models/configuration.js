const Model = require("../helpers/instructions");
const table_configuration = "configuration";
// Plan object constructor
var Configuration = function () {};
//
/*-----------fetchConfiguration------------------------------starts here--------------------*/
Configuration.fetchConfiguration = async (configurationId, result) => {
  let view_payload = {
    table_name: table_configuration,
    dataToGet: "*",
    query_field: "id",
    query_value: configurationId,
  };
  const respSql = await Model.view_query(view_payload);
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
/*-----------fetchConfiguration------------------------------ends here--------------------*/
//
/*-----------fetchConfigurations------------------------------starts here--------------------*/
Configuration.fetchConfigurations = async (result) => {
  let view_payload = {
    table_name: table_configuration,
    dataToGet: "*",
  };
  const respSql = await Model.view_query(view_payload);
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
/*-----------fetchConfigurations------------------------------ends here--------------------*/
//
/*-----------delete------------------------------starts here--------------------*/
Configuration.deleteConfiguration = async (configurationId, result) => {
  let delete_payload = {
    table_name: table_configuration,
    query_field: "id",
    query_value: configurationId,
  };
  const respDelete = await Model.delete_query(delete_payload);
  if (respDelete.status == "success") {
    const message = "Configuration Deleted Successfully";
    result(null, message);
  } else if (respDelete.status == "error") {
    const err = respDelete.message;
    const respError = await Model.error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    result(Error, null);
  }
};
/*-----------delete------------------------------ends here--------------------*/
//
/*-----------createConfiguration------------------------------starts here--------------------*/
Configuration.createConfiguration = async (saveData, result) => {
  //console.log(saveData);
  //stringify data----------------------------------------------------------
  let datastringified = JSON.stringify(saveData);
  //console.log(datastringified);
  //remove first and last characters from string----------------------------
  var result1 = datastringified.substring(1, datastringified.length - 1);
  //console.log(result);
  //replace [, ] symbols from string and replace with (, )------------------
  const str = result1.replace(/\[/g, "(").replace(/\]/g, ")");
  //console.log(str);
  //
  let add_payload = {
    sql_script: `INSERT INTO ${table_configuration} (config_key, config_value) VALUES ${str} `,
  };
  const respAdd = await Model.sql_query(add_payload);
  if (respAdd.status == "success") {
    result(null, respAdd.data);
  } else if (respAdd.status == "error") {
    const err = respAdd.message;
    const respError = await Model.error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    result(Error, null);
  }
};
/*-----------createConfiguration------------------------------ends here--------------------*/
//
/*-----------updateConfiguration------------------------------starts here--------------------*/
Configuration.updateConfiguration = async (updateData, result) => {
  //console.log(updateData);
  //stringify data----------------------------------------------------------
  let datastringified = JSON.stringify(updateData);
  //console.log(datastringified);
  //remove first and last characters from string----------------------------
  var result1 = datastringified.substring(1, datastringified.length - 1);
  //console.log(result);
  //replace [, ] symbols from string and replace with (, )------------------
  const str = result1.replace(/\[/g, "(").replace(/\]/g, ")");
  //console.log(str);
  let update_payload = {
    sql_script: `INSERT INTO ${table_configuration}  (id, config_key, config_value) VALUES ${str} ON DUPLICATE KEY UPDATE config_value=VALUES(config_value)`,
  };
  const respEdit = await Model.sql_query(update_payload);
  if (respEdit.status == "success") {
    const Response = {
      status: "success",
    };
    result(null, Response);
  } else if (respEdit.status == "error") {
    const err = respEdit.message;
    const respError = await Model.error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    result(Error, null);
  }
};

Configuration.update = async (data, result) => {
  console.log(data);
  let update_payload = {
    table_name: table_configuration,
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

/*-----------updateConfiguration------------------------------ends here--------------------*/
//
module.exports = Configuration;
//--------------------------------------------------------------------------------------------------
