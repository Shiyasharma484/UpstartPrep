const Model = require("../helpers/instructions");
const table_role = "role";
const table_role_permission = "role_permission";
// Plan object constructor
var Role = function () {};
//
/*-----------createRole------------------------------starts here--------------------*/
Role.createRole = async (saveData, result) => {
  let add_payload = {
    table_name: table_role,
    dataToSave: saveData,
  };
  const respAdd = await Model.add_query(add_payload);
  if (respAdd.status == "success") {
    result(null, respAdd.id);
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
/*-----------createRole------------------------------ends here--------------------*/
//
/*-----------createRolePermissionsByStoreType------------------------------starts here--------------------*/
Role.createRolePermissionsByStoreType = async (data, result) => {
  //console.log(data);
  //[ [ 50, 1, '1,1,1,1' ] ]
  //[ [ 50, 1, '1,1,1,1' ], [ 50, 2, '1,1,1,1' ] ]
  //
  //stringify data----------------------------------------------------------
  let datastringified = JSON.stringify(data);
  //console.log(datastringified);
  //remove first and last characters from string----------------------------
  var result1 = datastringified.substring(1, datastringified.length - 1);
  //console.log(result);
  //replace [, ] symbols from string and replace with (, )------------------
  const str = result1.replace(/\[/g, "(").replace(/\]/g, ")");
  //console.log(str);
  let insert_payload = {
    sql_script: `INSERT INTO ${table_role_permission} (role_id, module_id, access) VALUES ${str}`,
  };
  //console.log(insert_payload);
  const respAdd = await Model.sql_query(insert_payload);
  if (respAdd.status == "success") {
    result(null, "success");
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
/*-----------createRolePermissionsByStoreType------------------------------ends here--------------------*/
//
module.exports = Role;
//--------------------------------------------------------------------------------------------------
