const con = require("../models/db");
var Model = function () {};
let tolist = (packetData) =>
  Object.values(JSON.parse(JSON.stringify(packetData)));
Model.sql_query = (sql_query_payload) => {
  //console.log("Inside sql_query HELPER");-----onlyScript
  /*----------------payload example--------------------------
  let sql_query_payload = {
    sql_script:
      "INSERT INTO configuration (config_key, config_value) VALUES ?",
      method:"get"//etc
  };
  ----------------payload example--------------------------*/
  const method = sql_query_payload.method;
  if (sql_query_payload.sql_script && sql_query_payload.sql_script.length > 0) {
    var sqlquery = sql_query_payload.sql_script;
    const promise1 = new Promise((resolve, reject) => {
      const sql = con.query(sqlquery, (error, result) => {
        if (error) {
          console.log("Query Error - sql_query HELPER");
          reject(error);
        }
        //console.log(result);
        if (method == "get") {
          if (result && result.length > 0) {
            console.log("Query Success - sql_query HELPER");
            const Response = {
              status: "success",
              data: tolist(result),
            };
            resolve(Response);
          } else {
            // console.log("Nothing Done - sql_query HELPER ");
            reject("NO_DATA");
          }
        } else {
          if (
            result
            //&& result.length > 0
          ) {
            console.log("Query Success - sql_query HELPER");
            const Response = {
              status: "success",
              data: tolist(result),
            };
            resolve(Response);
          } else {
            // console.log("Nothing Done - sql_query HELPER ");
            reject();
          }
        }
      });
      // console.log(sql.sql);
    });
    const response_promise = promise1
      .then((value) => {
        console.log("promise done - sql_query HELPER");
        //console.log(value);
        return value;
      })
      .catch((error) => {
        console.log("Catch Error - sql_query HELPER");
        console.log(error);
        const Error = {
          status: "error",
          message: error,
        };
        return Error;
      });
    return response_promise;
    //
  } else {
    console.log("Invalid Details");
    const Error = {
      code: "INVALID_SQL_PARAMS",
      sqlMessage: "Invalid Sql Params",
    };
    return Error;
  }
};
//-----------------------------------------------------------------
//
//-----------------------------------------------------------------
Model.add_query = (add_payload) => {
  //console.log("Inside add_query HELPER");
  /*----------------payload example--------------------------
let add_payload = {
    table_name: table_name,
    query_field: "id",
    query_value: id,
    dataToSave: {
      trash: 1,
    },
  };
  };
  ----------------payload example--------------------------*/
  //console.log(add_payload);
  if (
    add_payload.table_name &&
    add_payload.table_name.length > 0 &&
    add_payload.dataToSave &&
    add_payload.dataToSave !== undefined &&
    Object.keys(add_payload.dataToSave).length != 0
  ) {
    const promise1 = new Promise((resolve, reject) => {
      var sqlquery;
      var params;

      sqlquery = "INSERT INTO " + [add_payload.table_name] + " SET ?";
      params = [add_payload.dataToSave];
      const sql = con.query(sqlquery, params, (error, result) => {
        if (error) {
          // console.log("Query Error - add_query HELPER");
          reject(error);
        }
        //  console.log(result);
        if (result && result.affectedRows > 0) {
          //console.log("Query Success - add_query HELPER");
          const LLastID = result.insertId;
          const Response = {
            status: "success",
            id: LLastID,
          };
          resolve(Response);
        } else {
          //console.log("Nothing Updated - add_query HELPER ");
          reject();
        }
      });
      //console.log(sql.sql);
    });
    const response_promise = promise1
      .then((value) => {
        //console.log("promise done - add_query HELPER");
        //console.log(value);
        return value;
      })
      .catch((error) => {
        //console.log("Catch Error - add_query HELPER");
        // console.log(error);
        const Error = {
          status: "error",
          message: error,
        };
        return Error;
      });
    return response_promise;
  } else {
    //console.log("Invalid Details");
    const Error = {
      code: "INVALID_SQL_PARAMS",
      sqlMessage: "Invalid Sql Params",
    };
    return Error;
  }
};
//-----------------------------------------------------------------
//
//-----------------------------------------------------------------
Model.view_query = (view_payload) => {
  //console.log("Inside view_query HELPER");
  /*----------------payload example--------------------------
   let view_payload = {
    table_name: table_name,
    query_field: "id",
    query_value: id,
    dataToGet: {
      trash: 1,
    },
  };
  ----------------payload example--------------------------*/
  // console.log(view_payload);
  const promise1 = new Promise((resolve, reject) => {
    var sqlquery;
    var nameAndGet = 0;
    var queryAndValue = 0;
    if (
      view_payload.table_name &&
      view_payload.table_name.length > 0 &&
      view_payload.dataToGet &&
      view_payload.dataToGet.length > 0
    ) {
      nameAndGet = 1;
      if (
        view_payload.query_field &&
        view_payload.query_field.length > 0 &&
        view_payload.query_value
      ) {
        queryAndValue = 1;
      }
    } else {
      const Error = {
        code: "INVALID_SQL_PARAMS",
        sqlMessage: "Invalid Sql Params",
      };
      reject(Error);
    }

    if (queryAndValue == 1) {
      sqlquery = "SELECT " + [view_payload.dataToGet] + " FROM ?? WHERE ?? = ?";
      params = [
        view_payload.table_name,
        view_payload.query_field,
        view_payload.query_value,
      ];
    } else if (nameAndGet == 1) {
      sqlquery = "SELECT " + [view_payload.dataToGet] + " FROM ??";
      params = [view_payload.table_name];
    }

    const sql = con.query(sqlquery, params, (error, result) => {
      if (error) {
        //console.log("Query Error - view_query HELPER");
        reject(error);
      }
      //  console.log(result);

      if (result && result.length > 0) {
        //console.log("Query Success - view_query HELPER");
        //array is defined and is not empty
        //
        //removing row data packet-------------STARTS
        var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
        //  console.log(resultArray);
        //removing row data packet-------------ENDS
        //
        const Response = {
          status: "success",
          data: tolist(resultArray),
        };
        resolve(Response);
      } else {
        //console.log("No Data - view_query HELPER ");
        const Error = {
          code: "NO_DATA",
          sqlMessage: "No Data",
        };
        reject(Error);
      }
    });
    //console.log(sql.sql);
  });
  const response_promise = promise1
    .then((value) => {
      //console.log("promise done - view_query HELPER");
      //console.log(value);
      return value;
    })
    .catch((error) => {
      //console.log("Catch Error - view_query HELPER");
      // console.log(error);
      const Error = {
        status: "error",
        message: error,
      };
      return Error;
    });
  return response_promise;
};
//-----------------------------------------------------------------
//
//-----------------------------------------------------------------
Model.edit_query = (update_payload) => {
  //console.log("Inside edit_query HELPER");
  /*----------------payload example--------------------------
     let update_payload = {
      table_name = 'users',
      query_field = 'email',
      query_value = 'j.smith.old@example.com',
      dataToSave = {
        username: 'j.smith',
        user_type: 'job_seeker',
        name: 'john smith',
        email: 'j.smith.new@example.com',
        password: 'keyboard_cat_new',
        resume: true,
        resume_date_time: '2109-01-01',
        salary_expectation: 100000
      }
    };
  ----------------payload example--------------------------*/
  // console.log(update_payload);
  if (
    update_payload.table_name &&
    update_payload.dataToSave &&
    update_payload.query_field &&
    update_payload.query_value
  ) {
    //console.log("Valid Details");

    const promise1 = new Promise((resolve, reject) => {
      const sql = con.query(
        "UPDATE ?? SET ? WHERE ?? = ? ",
        [
          update_payload.table_name,
          update_payload.dataToSave,
          update_payload.query_field,
          update_payload.query_value,
        ],
        (error, result) => {
          if (error) {
            // console.log("Query Error - edit_query HELPER");
            reject(error);
          }
          //  console.log(result);
          if (result && result.changedRows > 0) {
            //console.log("Query Success - edit_query HELPER");
            const Response = {
              status: "success",
            };
            resolve(Response);
          } else if (result && result.affectedRows > 0) {
            //console.log("Query Success - trash_query");
            const Error = {
              code: "NOTHING_UPDATED",
              sqlMessage: "Nothing Updated",
            };
            reject(Error);
          } else {
            //console.log("Nothing Updated - edit_query HELPER ");
            const Error = {
              code: "RECORD_DOESNOT_EXISTS",
              sqlMessage: "Record doesnot exists",
            };
            reject(Error);
          }
        }
      );
      //console.log(sql.sql);
    });
    const response_promise = promise1
      .then((value) => {
        //console.log("promise done - edit_query HELPER");
        //console.log(value);
        return value;
      })
      .catch((error) => {
        //console.log("Catch Error - edit_query HELPER");
        // console.log(error);
        const Error = {
          status: "error",
          message: error,
        };
        return Error;
      });
    return response_promise;
  } else {
    //console.log("Invalid Details");
    const Error = {
      code: "INVALID_SQL_PARAMS",
      sqlMessage: "Invalid Sql Params",
    };
    return Error;
  }
};
//-----------------------------------------------------------------
//
//-----------------------------------------------------------------
Model.trash_query = (trash_payload) => {
  //console.log("Inside trash_query HELPER");
  /*----------------payload example--------------------------
    let trash_payload = {
    table_name: table_name,
    query_field: "id",
    query_value: id,
  dataToSave: {
    active: 0,
    trash: 1,
  },
  };
  ----------------payload example--------------------------*/
  // console.log(trash_payload);
  if (
    trash_payload.table_name &&
    trash_payload.dataToSave &&
    trash_payload.query_field &&
    trash_payload.query_value
  ) {
    //console.log("Valid Details");
    const promise1 = new Promise((resolve, reject) => {
      const sql = con.query(
        "UPDATE ?? SET ? WHERE ?? = ? ",
        [
          trash_payload.table_name,
          trash_payload.dataToSave,
          trash_payload.query_field,
          trash_payload.query_value,
        ],
        (error, result) => {
          if (error) {
            // console.log("Query Error - trash_query HELPER");
            reject(error);
          }
          if (result && result.changedRows > 0) {
            //console.log("Query Success - trash_query");
            const Response = {
              status: "success",
            };
            resolve(Response);
          } else if (result && result.affectedRows > 0) {
            //console.log("Query Success - trash_query");
            const Error = {
              code: "NOTHING_UPDATED",
              sqlMessage: "Nothing Updated",
            };
            reject(Error);
          } else {
            const Error = {
              code: "RECORD_DOESNOT_EXISTS",
              sqlMessage: "No such record",
            };
            reject(Error);
          }
        }
      );
      // console.log(sql.sql);
    });
    const response_promise = promise1
      .then((value) => {
        //console.log("promise done - trash_query");
        //console.log(value);
        return value;
      })
      .catch((error) => {
        //console.log("Catch Error - trash_query");
        // console.log(error);
        const Error = {
          status: "error",
          message: error,
        };
        return Error;
      });
    return response_promise;
  } else {
    //console.log("Invalid Details");
    const Error = {
      code: "INVALID_SQL_PARAMS",
      sqlMessage: "Invalid Sql Params",
    };
    return Error;
  }
};
//-----------------------------------------------------------------
//
Model.delete_query = (delete_payload) => {
  //console.log("Inside delete_query");
  /*----------------payload example--------------------------
  console.log(delete_payload);
  let delete_payload = {
    table_name: table_name,
    query_field: "id",
    query_value: id,
  };
  ----------------payload example--------------------------*/
  //console.log(delete_payload);
  if (
    delete_payload.table_name &&
    delete_payload.query_field &&
    delete_payload.query_value
  ) {
    //console.log("Valid Details");
    const promise1 = new Promise((resolve, reject) => {
      const sql = con.query(
        "DELETE FROM ?? WHERE ?? = ?",
        [
          delete_payload.table_name,
          delete_payload.query_field,
          delete_payload.query_value,
        ],
        (error, result) => {
          // console.log(result);
          if (error) {
            // console.log("Query Error - delete_query HELPER");
            reject(error);
          }
          if (typeof result === "undefined") {
            //console.log("Not Permitted to Delete");
            const Error = {
              code: "NOT_PERMITTED_TO_DELETE",
              sqlMessage: "Not Permitted to Delete",
            };
            reject(Error);
          }
          if (result && result.affectedRows > 0) {
            //console.log("Query Success - trash_query");
            const Response = {
              status: "success",
            };
            resolve(Response);
          } else {
            const Error = {
              code: "RECORD_DOESNOT_EXISTS",
              sqlMessage: "No such record",
            };
            reject(Error);
          }
        }
      );
      // console.log(sql.sql);
    });
    const response_promise = promise1
      .then((value) => {
        //console.log("promise done - delete_query");
        //console.log(value);
        return value;
      })
      .catch((error) => {
        //console.log("Catch Error - delete_query");
        //console.log(error);
        const Error = {
          status: "error",
          message: error,
        };
        return Error;
      });
    return response_promise;
  } else {
    //console.log("Invalid Details");
    const Error = {
      code: "INVALID_SQL_PARAMS",
      sqlMessage: "Invalid Sql Params",
    };
    return Error;
  }
};
//-----------------------------------------------------------------
//
Model.error_query = async (error) => {
  //console.log("Inside Error Helper");
  //console.log(error);
  var messageERR;
  var code;
  var f;

  if (error && error !== undefined && Object.keys(error).length != 0) {
    //
    if (error.code == "NOTHING_UPDATED") {
      messageERR = error.sqlMessage;
      code = 400;
    } else if (error.code == "RECORD_DOESNOT_EXISTS") {
      messageERR = error.sqlMessage;
      code = 400;
    } else if (error == "NO_DATA" || error.code == "NO_DATA") {
      messageERR = error;
      code = 204;
    } else if (error.code == "INVALID_SQL_PARAMS") {
      messageERR = error.sqlMessage;
      code = 400;
    } else if (error.code == "ER_EMPTY_QUERY") {
      messageERR = error.sqlMessage;
      code = 400;
    } else if (error.code == "NOT_PERMITTED_TO_DELETE") {
      messageERR = error.sqlMessage;
      code = 400;
    } else if (error.code == "ER_BAD_FIELD_ERROR") {
      messageERR = error.sqlMessage;
      code = 400;
    } else if (error.code == "ER_NO_DEFAULT_FOR_FIELD") {
      messageERR = error.sqlMessage;
      code = 400;
    } else if (error.code == "ER_DUP_ENTRY") {
      //console.log(error);
      //get key from error--------------------------------Starts
      let strArray = error.sqlMessage.split(" ");
      //console.log(strArray);
      //  const keyErr = strArray[strArray.length - 1];
      const keyErr = strArray[2];
      //console.log(keyErr);
      //get key from error--------------------------------Ends
      //
      //remove quotes--------------------------------------------starts
      const withoutQuotes = keyErr.replace(/'/g, "");
      //console.log(withoutQuotes);
      //remove quotes--------------------------------------------ends
      //capitalize first letter--------------------------starts
      async function capitalizeFirstLetter(string) {
        return string[0].toUpperCase() + string.slice(1);
      }
      const finalKey = await capitalizeFirstLetter(withoutQuotes);
      //console.log(finalKey);
      //capitalize first letter--------------------------ends
      //
      messageERR = finalKey + " already exists";
      //messageERR = "Keys entered is already taken";
      code = 400;
    } else {
      //console.log(error.code);
      if (error.sqlMessage) {
        messageERR = error.sqlMessage;
      } else {
        messageERR = "Sql Error";
      }
      code = 400;
    }
    f = { message: messageERR, statusCode: code };
    return f;
  } else {
    messageERR = "Sql Error";
    code = 400;
    f = { message: messageERR, statusCode: code };
    return f;
  }
};
//-----------------------------------------------------------------
module.exports = Model;
