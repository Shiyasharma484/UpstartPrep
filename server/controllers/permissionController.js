const con = require("../models/db");
//const moment = require("moment");
const {
  encrypttheid,
  decodetheid,
  generateVerificationCodePF,
} = require("../helpers/common");

// Get all permissions from database table --role_permission-DONE--------------------------------------------------------------
const GetAllPermissions = (req, res) => {
  const sql = con.query(
    `SELECT concat('"', UPPER(r.title), '":{"MODULES":{', GROUP_CONCAT(concat('"',m.name,'":"',urp.access,'"') SEPARATOR ','),'}}') as data FROM role_permission as urp LEFT JOIN modules as m ON m.id=urp.module_id LEFT JOIN role as r ON r.id=urp.role_id  GROUP BY r.title ORDER BY r.id`,
    (err, resp) => {
      if (!err) {
        if (resp && resp.length > 0) {
          //console.log(resp);
          //
          //removing row data packet-------------STARTS
          var resultPermissionsArray = Object.values(
            JSON.parse(JSON.stringify(resp))
          );
          console.log(resultPermissionsArray);
          //removing row data packet-------------ENDS
          //
          var permissions = [];
          resultPermissionsArray.map((item) => {
            //now add curly braces and make json string---starts
            const jsonStringData = "{" + item.data + "}";
            //console.log(jsonStringData);
            //now add curly braces and make json string---ends
            //
            //nw parse the data-----------------STARTS
            const jsonParsedData = JSON.parse(jsonStringData);
            //  console.log(jsonParsedData);
            //nw parse the data-----------------ENDS
            //
            permissions.push(jsonParsedData);
          });

          const Response = {
            status: "success",
            permissions: permissions,
          };
          //console.log("loginsuccess");
          res.status(200).json(Response);
        } else {
          console.log("No Permissions for role");
          const Error = {
            status: "No Permissions",
            message: "No Data",
          };
          res.status(204).json(Error);
        }
      } else {
        console.log("Get user role permissions sql error");
        console.log(err);
        const Error = {
          status: "error",
          message: "Server Error",
        };
        res.status(400).json(Error);
      }
    }
  );
  console.log(sql.sql);
};
//-----------------------------------------------------------------------------------------------------------------
//GetRoleModulesPermissionsByRoleId --DONE-------------------------------------------------------------------------------
const GetRoleModulesPermissionsByRoleId = (req, res) => {
  console.log("Inside GetRoleModulesPermissionsByRoleId");
  //
  const roleId = req.params.id;
  console.log(roleId);
  //
  if (roleId && roleId > 0) {
    console.log("Valid Role ID");
    //
    const sql = con.query(
      // "SELECT urp.id, urp.role_id, urp.module_id, m.name as module_name, urp.access FROM role_permission as urp LEFT JOIN modules as m ON m.id=urp.module_id WHERE urp.role_id=?",
      `SELECT concat('"', UPPER(r.title), '":{"MODULES":{', GROUP_CONCAT(concat('"',m.name,'":"',urp.access,'"') SEPARATOR ','),'}}') as data FROM role_permission as urp LEFT JOIN modules as m ON m.id=urp.module_id LEFT JOIN role as r ON r.id=urp.role_id WHERE urp.role_id=? GROUP BY r.title`,
      [roleId],
      (err, resp) => {
        if (!err) {
          if (resp && resp.length > 0) {
            //console.log(resp);
            //
            //removing row data packet-------------STARTS
            var resultPermissionsArray = Object.values(
              JSON.parse(JSON.stringify(resp))
            );
            // console.log(
            //   resultPermissionsArray
            // );
            //removing row data packet-------------ENDS
            //
            //now add curly braces and make json string---starts
            const jsonStringData = "{" + resultPermissionsArray[0].data + "}";
            //console.log(jsonStringData);
            //now add curly braces and make json string---ends
            //
            //nw parse the data-----------------STARTS
            const jsonParsedData = JSON.parse(jsonStringData);
            //  console.log(jsonParsedData);
            //nw parse the data-----------------ENDS
            //
            const Response = {
              status: "success",
              permissions: jsonParsedData,
            };
            //console.log("loginsuccess");
            res.status(200).json(Response);
          } else {
            console.log("No Permissions for role");
            const Error = {
              status: "No Permissions",
              message: "No Data",
            };
            res.status(204).json(Error);
          }
        } else {
          console.log("ERRRRRRRRRRRRRRRRORRRRRRRRRR");
          console.log("Get user role permissions sql error");
          console.log(err);
          const Error = {
            status: "error",
            message: "Server Error",
          };
          res.status(400).json(Error);
        }
      }
    );
    console.log(sql.sql);
    //
  } else {
    console.log("Invalid Role Id");
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
//-----------------------------------------------------------------------------------------------------------
//GetRolesModulesPermissionsByUserId --DONE-------------------------------------------------------------------------------
const GetRolesModulesPermissionsByUserId = async (req, res) => {
  console.log("Inside GetRolesModulesPermissionsByUserId");
  //
  const userId = req.params.id;
  console.log(userId);
  //
  if (userId && userId > 0) {
    console.log("Valid User ID");
    //
    //GGGGGGGGGGGGGGGGGGGGGGGGGGG
    var db_rolesData = [];
    var getroles_data_resp = {};
    //
    var db_rolesPermissionsData = [];
    var getpermissions_data_resp = {};
    //GGGGGGGGGGGGGGGGGGGGGGGGGGG
    //STEP-1 -- Get ROLE---STARTS=========================
    async function getroles(userId) {
      console.log("Inside getroles");
      return new Promise((resolve, reject) => {
        //
        const sql = con.query(
          "SELECT role FROM `users_role` WHERE users_id=?",
          [userId],
          async (err, result) => {
            if (!err) {
              //  console.log(result);
              if (result && result.length > 0) {
                //console.log(result);
                console.log("Role/Roles is there for user");
                //
                //removing row data packet-------------STARTS
                var resultRolesData = Object.values(
                  JSON.parse(JSON.stringify(result))
                );
                //  console.log(resultRolesData);
                //removing row data packet-------------ENDS
                //
                db_rolesData = resultRolesData;
                //GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                resolve({
                  result: 1,
                });
              } else {
                console.log("No roles for user");
                // const Error = {
                //   status: "error",
                //   message: "Server Error",
                // };
                // res.status(204).json(Error);
                resolve({
                  result: 2,
                });
              }
            } else {
              console.log(err);
              // const Error = { status: "error", message: "Server Error" };
              // res.status(400).json(Error);
              reject({
                result: 0,
              });
            }
          }
        );
        //console.log(sql);
      }).catch((error) => console.log(error.message));
    }
    getroles_data_resp = await getroles(userId);
    console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
    console.log(getroles_data_resp);
    console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
    //STEP-1 -- Get ROLE---ENDS=========================
    if (
      getroles_data_resp &&
      getroles_data_resp !== undefined &&
      Object.keys(getroles_data_resp).length != 0 &&
      getroles_data_resp.result == 1
    ) {
      console.log("ROLE EXISTS-STARTS");
      //
      const sql = con.query(
        "SELECT ur.role as user_role_id, role.title as user_role, ur.active as user_role_active, ur.trash as user_role_trash, users.first_Name, users.last_Name, users.email, users.email_verify, users.last_Name FROM users_role as ur LEFT JOIN users ON users.id= ur.users_id LEFT JOIN role ON role.id = ur.role WHERE ur.active = 1 && ur.trash = 0 && ur.users_id=?", //16
        [userId],
        async (err, result1) => {
          //   console.log(result1);
          if (!err) {
            if (result1 && result1.length > 0) {
              //    console.log(result1);
              //
              //removing row data packet-------------STARTS
              var resultUserDataArray = Object.values(
                JSON.parse(JSON.stringify(result1))
              );
              //  console.log(resultUserDataArray);
              //removing row data packet-------------ENDS
              //
              //Get THE PERMISSIONS wd MODULES NOW---------------STARTS
              async function getrolesPermissions(usingArraySent) {
                var count = 0;
                console.log("Inside getrolesPermissions");
                return new Promise((resolve, reject) => {
                  //
                  usingArraySent.map((item) => {
                    //  console.log(item);
                    item.permissions = [];
                    const role_id = item.user_role_id;
                    const sql = con.query(
                      // "SELECT urp.id, urp.role_id, urp.module_id, m.name as module_name, urp.access FROM role_permission as urp LEFT JOIN modules as m ON m.id=urp.module_id WHERE urp.role_id=?",
                      `SELECT concat('"', UPPER(r.title), '":{"MODULES":{', GROUP_CONCAT(concat('"',m.name,'":"',urp.access,'"') SEPARATOR ','),'}}') as data FROM role_permission as urp LEFT JOIN modules as m ON m.id=urp.module_id LEFT JOIN role as r ON r.id=urp.role_id WHERE urp.role_id=? GROUP BY r.title`,
                      [role_id],
                      (err, resp) => {
                        if (!err) {
                          if (resp && resp.length > 0) {
                            //console.log(resp);
                            //
                            //removing row data packet-------------STARTS
                            var resultPermissionsArray = Object.values(
                              JSON.parse(JSON.stringify(resp))
                            );
                            // console.log(
                            //   resultPermissionsArray
                            // );
                            //
                            //now add curly braces and make json string---starts
                            const jsonStringData =
                              "{" + resultPermissionsArray[0].data + "}";
                            //console.log(jsonStringData);
                            //now add curly braces and make json string---ends
                            //nw parse the data-----------------STARTS
                            const jsonParsedData = JSON.parse(jsonStringData);
                            //  console.log(jsonParsedData);
                            //nw parse the data-----------------ENDS
                            //
                            //removing row data packet-------------ENDS
                            //
                            item.permissions = jsonParsedData;
                            //GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                            db_rolesPermissionsData.push(item);
                            //GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                            //
                            count = count + 1;
                            if (count == usingArraySent.length) {
                              console.log("Loop Complete");
                              resolve({
                                result: 1,
                              });
                            }
                            //
                          } else {
                            console.log("No Permissions for role");
                            item.permissions = "No Permission for role";
                            // const Error = {
                            //   status: "No Permissions",
                            //   message: "No Data",
                            // };
                            // res.status(204).json(Error);
                            //
                            //GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                            db_rolesPermissionsData.push(item);
                            //GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                            count = count + 1;
                            if (count == usingArraySent.length) {
                              console.log("Loop Complete");
                              resolve({
                                result: 1,
                              });
                            }
                            //
                          }
                        } else {
                          console.log("ERRRRRRRRRRRRRRRRORRRRRRRRRR");
                          console.log("Get user role permissions sql error");
                          console.log(err);
                          item.permissions = "Error";
                          //GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                          db_rolesPermissionsData.push(item);
                          //GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                          // const Error = {
                          //   status: "error",
                          //   message: "Server Error",
                          // };
                          // res.status(400).json(Error);
                          //
                          count = count + 1;
                          if (count == usingArraySent.length) {
                            console.log("Loop Complete");
                            resolve({
                              result: 1,
                            });
                          }
                          //
                        }
                      }
                    );
                    console.log(sql.sql);
                  });
                  //console.log(sql);
                }).catch((error) => console.log(error.message));
              }
              getpermissions_data_resp = await getrolesPermissions(
                resultUserDataArray
              );
              console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
              console.log(getpermissions_data_resp);
              console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
              //Get THE PERMISSIONS wd MODULES NOW---------------ENDS
              //
              if (
                getpermissions_data_resp &&
                getpermissions_data_resp !== undefined &&
                Object.keys(getpermissions_data_resp).length != 0 &&
                getpermissions_data_resp.result > 0
              ) {
                console.log("All data collected along wd permissions");
                // console.log(db_rolesPermissionsData);
                //
                const Response = {
                  message: "success",
                  responsedata: db_rolesPermissionsData,
                };
                //console.log("loginsuccess");
                res.status(200).json(Response);
                //
                //
              } else {
                console.log("This Case should never work");
                const Error = {
                  status: "error",
                  message: "Server Error",
                };
                res.status(400).json(Error);
              }
              //
            } else {
              // console.log(err);
              console.log("Get User Role Data Error");
              const Error = {
                status: "Error",
                message: "No Data",
              };
              res.status(204).json(Error);
            }
          } else {
            console.log(err);
            console.log("Get data error");
            const Error = {
              status: "error",
              message: "Server Error",
            };
            res.status(400).json(Error);
          }
        }
      );

      //
      console.log("ROLE EXISTS-ENDS");
    } else if (
      getroles_data_resp &&
      getroles_data_resp !== undefined &&
      Object.keys(getroles_data_resp).length != 0 &&
      getroles_data_resp.result == 2
    ) {
      console.log("NO ROLE-STARTS");
      //
      console.log("No roles for user");
      const Error = {
        status: "error",
        message: "No Roles for User",
      };
      res.status(204).json(Error);
      //
      console.log("NO ROLE-ENDS");
    } else {
      console.log("Error in getting roles");
      const Error = {
        status: "error",
        message: "Server Error",
      };
      res.status(400).json(Error);
    }
    //
  } else {
    console.log("Invalid User Id");
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
//-----------------------------------------------------------------------------------------------------------
// GetStoreUserRoleModulesPermissions ---STARTS-----------------------------------------------------------
const GetStoreUserRoleModulesPermissions = async (req, res) => {
  console.log("Inside GetStoreUserRoleModulesPermissions");
  const data = req.body;
  //console.log(data);
  let filteredData = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v != "null" && v != "" && v != null)
  );
  //  console.log(filteredData);
  //
  if (
    filteredData.users_id &&
    filteredData.users_id.length > 0 &&
    filteredData.store_id &&
    filteredData.store_id > 0
  ) {
    console.log("Valid Details");
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //
    //get user id from request----------------------+decode+int id
    const req_user_id = filteredData.users_id;
    const req_user_id_decoded = decodetheid(req_user_id);
    // console.log(req_user_id_decoded);//26
    //get user id from session----------------------+decode+int id
    //
    const req_store_id = filteredData.store_id;
    //console.log(req_store_id);//39
    //
    //GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
    var db_rolesData;
    var getroles_data_resp = {};
    //
    var db_rolesPermissionsData;
    var getpermissions_data_resp = {};
    //
    //GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
    //
    //STEP-2 -- Get ROLE---STARTS=========================
    async function getroles(userId, storeId) {
      console.log("Inside getroles");
      return new Promise((resolve, reject) => {
        //
        const sql = con.query(
          "SELECT role as role_id FROM `users_role` WHERE users_id=? AND store_id=? AND active = 1 AND trash = 0",
          [userId, storeId],
          async (err, result) => {
            if (!err) {
              console.log(result);
              if (result && result.length > 0) {
                //console.log(result);
                console.log("Data is there in roles");
                //
                //removing row data packet-------------STARTS
                var resultRolesData = Object.values(
                  JSON.parse(JSON.stringify(result))
                );
                // console.log(resultRolesData);
                //removing row data packet-------------ENDS
                //
                db_rolesData = resultRolesData;
                //GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                resolve({
                  result: 1,
                });
              } else {
                console.log("No data in roles");
                // const Error = {
                //   status: "error",
                //   message: "Server Error",
                // };
                // res.status(204).json(Error);
                resolve({
                  result: 2,
                });
              }
            } else {
              console.log(err);
              // const Error = { status: "error", message: "Server Error" };
              // res.status(400).json(Error);
              reject({
                result: 0,
              });
            }
          }
        );
        //console.log(sql);
      }).catch((error) => console.log(error.message));
    }
    getroles_data_resp = await getroles(req_user_id_decoded, req_store_id);
    console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
    console.log(getroles_data_resp);
    console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
    //STEP-2 -- Get ROLE---ENDS=========================
    if (
      getroles_data_resp &&
      getroles_data_resp !== undefined &&
      Object.keys(getroles_data_resp).length != 0 &&
      getroles_data_resp.result == 1
    ) {
      console.log("ROLE EXISTS-STARTS");
      //
      //Get THE PERMISSIONS wd MODULES NOW---------------STARTS
      async function getrolesPermissions(roleIdData) {
        console.log("Inside getrolesPermissions");
        return new Promise((resolve, reject) => {
          //
          //console.log(roleIdData);
          const role_id = roleIdData[0].role_id;
          const sql = con.query(
            // "SELECT urp.id, urp.role_id, urp.module_id, m.name as module_name, urp.access FROM role_permission as urp LEFT JOIN modules as m ON m.id=urp.module_id WHERE urp.role_id=?",
            `SELECT concat('"', UPPER(r.title), '":{"MODULES":{', GROUP_CONCAT(concat('"',m.name,'":"',urp.access,'"') SEPARATOR ','),'}}') as data FROM role_permission as urp LEFT JOIN modules as m ON m.id=urp.module_id LEFT JOIN role as r ON r.id=urp.role_id WHERE urp.role_id=? GROUP BY r.title`,
            [role_id],
            (err, resp) => {
              if (!err) {
                if (resp && resp.length > 0) {
                  //console.log(resp);
                  //
                  //removing row data packet-------------STARTS
                  var resultPermissionsArray = Object.values(
                    JSON.parse(JSON.stringify(resp))
                  );
                  // console.log(
                  //   resultPermissionsArray
                  // );
                  //removing row data packet-------------ENDS
                  //
                  //now add curly braces and make json string---starts
                  const jsonStringData =
                    "{" + resultPermissionsArray[0].data + "}";
                  //console.log(jsonStringData);
                  //now add curly braces and make json string---ends
                  //
                  //nw parse the data-----------------STARTS
                  const jsonParsedData = JSON.parse(jsonStringData);
                  //  console.log(jsonParsedData);
                  //nw parse the data-----------------ENDS
                  //
                  //GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                  db_rolesPermissionsData = jsonParsedData;
                  //GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                  //
                  resolve({
                    result: 1,
                  });
                  //
                } else {
                  console.log("No Permissions for role");
                  // const Error = {
                  //   status: "No Permissions",
                  //   message: "No Data",
                  // };
                  // res.status(204).json(Error);
                  //
                  resolve({
                    result: 2,
                  });
                  //
                }
              } else {
                console.log("ERRRRRRRRRRRRRRRRORRRRRRRRRR");
                console.log("Get user role permissions sql error");
                console.log(err);
                // const Error = {
                //   status: "error",
                //   message: "Server Error",
                // };
                // res.status(400).json(Error);
                //
                reject({
                  result: 0,
                });
                //
              }
            }
          );
          console.log(sql.sql);
        }).catch((error) => console.log(error.message));
      }
      getpermissions_data_resp = await getrolesPermissions(db_rolesData);
      console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
      console.log(getpermissions_data_resp);
      console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
      //Get THE PERMISSIONS wd MODULES NOW---------------ENDS
      if (
        getpermissions_data_resp &&
        getpermissions_data_resp !== undefined &&
        Object.keys(getpermissions_data_resp).length != 0 &&
        getpermissions_data_resp.result == 1
      ) {
        console.log("Role Permissions get Successful");
        //console.log(db_rolesPermissionsData);
        //
        const Response = {
          status: "success",
          permissions: db_rolesPermissionsData,
        };
        //console.log("loginsuccess");
        res.status(200).json(Response);
        //
      } else if (
        getpermissions_data_resp &&
        getpermissions_data_resp !== undefined &&
        Object.keys(getpermissions_data_resp).length != 0 &&
        getpermissions_data_resp.result == 2
      ) {
        console.log("No Permissions for this user's role");
        const Error = {
          status: "error",
          message: "No Permissions for this user's role",
        };
        res.status(204).json(Error);
        //
      } else {
        console.log("This Case should never work");
        console.log("getrolesPermissions STEP ERROR");
        const Error = {
          status: "error",
          message: "Server Error",
        };
        res.status(400).json(Error);
      }
      //
      console.log("ROLE EXISTS-ENDS");
      //
    } else if (
      getroles_data_resp &&
      getroles_data_resp !== undefined &&
      Object.keys(getroles_data_resp).length != 0 &&
      getroles_data_resp.result == 2
    ) {
      //
      // const Error = {
      //   status: "Error",
      //   message: "No User/Role",
      // };
      // res.status(204).json(Error);
      //
      console.log("Invalid Details");
      const Error = { status: "error", message: "Invalid Details" };
      res.status(400).json(Error);
      //
    } else {
      console.log("Error in getting role-permissions");
      const Error = {
        status: "error",
        message: "Server Error",
      };
      res.status(400).json(Error);
      //
    }
    //
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  } else {
    console.log("Invalid Details");
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
//-----------------------------------------------------------------------------------------------------------------
module.exports = {
  GetRoleModulesPermissionsByRoleId,
  GetRolesModulesPermissionsByUserId,
  GetStoreUserRoleModulesPermissions,
  GetAllPermissions,
};
