const con = require("./db");
const bcrypt = require("bcrypt");
const SQL = require("../helpers/sql");
const { encrypttheid, decodetheid } = require("../helpers/encode-decode");
const Model = require("../helpers/instructions");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const table_user = "users";
const table_user_role = "users_role";
const table_role = "role";
const table_store = "stores";
const table_storetype = "store_type";
const table_status = "status";

var User = function () {};
//
//CHECK DB EMPTY------------------------------------------------------------------------------------
User.dbempty = (req, res, next) => {
  console.log("---check dbempty Middleware---");
  con.query("SELECT id from users", (err, response) => {
    if (!err) {
      if (response && response.length) {
        console.log("Middleware Passed");
        next();
      } else {
        console.log("Middleware Failure");
        const Error = {
          status: "error",
          message: "No record in TABLE",
        };
        res.status(204).json(Error);
      }
    }
  });
};
//--------------------------------------------------------------------------------------------------
//
//CHECK IF USERID EXISTS OR NOT - --
User.checkuser = (req, res, next) => {
  console.log("---CheckUser Middleware---");
  const encryptedid = req.params.id;
  const idvalue = decodetheid(encryptedid);
  const checkNum = Number.isInteger(idvalue);
  if (checkNum == true) {
    con.query("SELECT id from users WHERE id=?", [idvalue], (err, response) => {
      console.log(response);
      if (!err) {
        if (response && response.length) {
          console.log("Middleware Passed");
          next();
        } else {
          console.log("Middleware Failure");
          console.log("No-record-LLLLLLLLLLLLLL");
          const Error = {
            status: "error",
            message: "No such record in Table",
          };
          res.status(204).json(Error);
        }
      }
    });
  } else {
    console.log("Middleware Failure");
    console.log("Invalid Id");
    const Error = {
      status: "error",
      message: "Invalid Details",
    };
    res.status(403).json(Error);
  }
};
//--------------------------------------------------------------------------------------------
//
//CHECK IF role EXISTS OR NOT - --
User.checkrole = (req, res, next) => {
  console.log("---checkrole Middleware---");
  //console.log(req.params.id);
  const encryptedid = req.params.id;
  console.log("PPPPPPPPPPPPPPPPPPPPPPP");
  const idvalue = decodetheid(encryptedid);
  // console.log(idvalue);
  const checkNum = Number.isInteger(idvalue);
  console.log("PPPPPPPPPPPPPPPPPPPPPPP");
  console.log(checkNum);
  if (checkNum == true) {
    //if id is integer
    con.query("SELECT id from role WHERE id=?", [idvalue], (err, response) => {
      if (!err) {
        if (response && response.length) {
          console.log("Middleware Passed");
          next();
        } else {
          console.log("Middleware Failure");
          console.log("No-record-LLLLLLLLLLLLLL");
          const Error = {
            status: "error",
            message: "No such record in Table",
          };
          res.status(204).json(Error);
        }
      }
    });
  } else {
    console.log("Middleware Failure");
    console.log("Invalid Id");
    const Error = {
      status: "error",
      message: "Forbidden",
    };
    res.status(403).json(Error);
  }
};
//--------------------------------------------------------------------------------------------
//
//CHECK IF users role EXISTS OR NOT - --
User.checkusersrole = (req, res, next) => {
  console.log("---checkusersrole Middleware---");
  //console.log(req.params.id);
  const encryptedid = req.params.id;
  const idvalue = decodetheid(encryptedid);
  // console.log(idvalue);
  const checkNum = Number.isInteger(idvalue);
  //console.log(checkNum);
  if (checkNum == true) {
    //if id is integer
    con.query(
      "SELECT id from users_role WHERE id=?",
      [idvalue],
      (err, response) => {
        if (!err) {
          if (response && response.length) {
            console.log("Middleware Passed");
            next();
          } else {
            console.log("Middleware Failure");
            console.log("No-record-LLLLLLLLLLLLLL");
            const Error = {
              status: "error",
              message: "No such record in Table",
            };
            res.status(204).json(Error);
          }
        }
      }
    );
  } else {
    console.log("Middleware Failure");
    console.log("Invalid Id");
    const Error = {
      status: "error",
      message: "Forbidden",
    };
    res.status(403).json(Error);
  }
};
//--------------------------------------------------------------------------------------------
//
//checkrolealready -------------------------------------------------------------------- - --
User.checkrolealready = (req, res, next) => {
  console.log("---checkrolealready Middleware---");
  //
  const data = req.body;
  console.log("LLLLLLLLLLLLLLLLLLLLLL");
  console.log(data);
  let filteredData = Object.fromEntries(
    Object.entries(data).filter(
      ([_, v]) => v != "null" && v != "" && v != null && v != null
    )
  );
  // console.log(filteredData);
  //
  //---------------------------------------------------------------
  var gotofunctionality = 0;
  //check if creating new role or updating role
  if (req.params.id && req.params.id.length > 0) {
    console.log("Update Functionality");
    //
    if (filteredData.hasOwnProperty("title")) {
      //
      gotofunctionality = 1;
      //
    } else {
      next();
    }
    //
  } else {
    console.log("Create Functionality");
    //
    gotofunctionality = 1;
    //
  }
  //---------------------------------------------------------------
  if (gotofunctionality == 1) {
    //
    if (filteredData.title && filteredData.title.length > 0) {
      console.log("Valid Details Middleware");
      //
      var title = filteredData.title;
      var sqll;
      var paramss;
      //
      if (filteredData.store_type == 4) {
        // case 1 -admin creating role
        //storetype=4, title, trash =0
        console.log("Super Admin Creating Role");
        sqll = "SELECT id from role WHERE  AND title=? AND trash = 0";
        paramss = [title];
      } else {
        // case 2 -store creating role
        //storeid, title, trash =0
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++
        const title = filteredData.title; //super_admin

        //+++++++++++++++++++++++++++++++++++++++++++++++++++++
        sqll = "SELECT id from role WHERE title=? AND trash = 0";
        paramss = [title];
      }
      //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      con.query(sqll, paramss, (err, response) => {
        if (!err) {
          if (response && response.length > 0) {
            // console.log(response);
            console.log("Title Already Exists");
            const Error = {
              status: "error",
              message: "Title Already Exists",
            };
            res.status(400).json(Error);
          } else {
            console.log("No-record-Middleware");
            next();
          }
        } else {
          console.log("Middleware Error");
          console.log(err);
          const Error = { status: "error", message: "Server Error" };
          res.status(400).json(Error);
        }
      });
      //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    } else {
      console.log("Invalid Details Middleware");
      const Error = { status: "error", message: "Invalid Details" };
      res.status(400).json(Error);
    }
    //
  }
};
//--------------------------------------------------------------------------------------------
//
//checkusersrolealready -------------------------------------------------------------------- - --
User.checkusersrolealready = (req, res, next) => {
  console.log("---checkusersrolealready Middleware---");
  //
  const data = req.body;
  // console.log(data);
  let filteredData = Object.fromEntries(
    Object.entries(data).filter(
      ([_, v]) => v != "null" && v != "" && v != null && v != null
    )
  );
  // console.log(filteredData);
  //
  //---------------------------------------------------------------
  var gotofunctionality = 0;
  //check if creating new users_role or updating users_role
  if (req.params.id && req.params.id.length > 0) {
    console.log("Update Functionality");
    //
    if (
      (filteredData.hasOwnProperty("users_id") &&
        filteredData.users_id > 0 &&
        filteredData.hasOwnProperty("store_type") &&
        filteredData.store_type > 0 &&
        filteredData.hasOwnProperty("role") &&
        filteredData.role > 0 &&
        filteredData.hasOwnProperty("store_id") &&
        filteredData.store_id > 0) ||
      (filteredData.hasOwnProperty("users_id") &&
        filteredData.users_id > 0 &&
        filteredData.hasOwnProperty("store_type") &&
        filteredData.store_type > 0 &&
        filteredData.hasOwnProperty("role") &&
        filteredData.role > 0)
    ) {
      gotofunctionality = 1;
    } else {
      console.log("Invalid Details Middleware");
      const Error = { status: "error", message: "Invalid Details" };
      res.status(400).json(Error);
    }
    //
  } else {
    console.log("Create Functionality");
    gotofunctionality = 1;
  }
  //---------------------------------------------------------------
  if (gotofunctionality == 1) {
    const userID = filteredData.users_id;
    // console.log(userID);
    const storetypeID = filteredData.store_type;
    // console.log(storetypeID);
    const roleID = filteredData.role;
    // console.log(roleID);
    const storeID = filteredData.store_id;
    // console.log(storeID);

    if (
      userID &&
      userID > 0 &&
      storetypeID &&
      storetypeID > 0 &&
      roleID &&
      roleID > 0 &&
      storeID &&
      storeID > 0
    ) {
      console.log("Valid Details Middleware");
      //-------------------------1----------------------------
      con.query(
        "SELECT id from users_role WHERE users_id=? AND store_type=? AND role=? AND store_id=? AND trash = 0",
        [userID, storetypeID, roleID, storeID],
        (err, response) => {
          if (!err) {
            if (response && response.length > 0) {
              // console.log(response);
              console.log("Users Role Already Exists");
              const Error = {
                status: "error",
                message: "Users Role Already Exists",
              };
              res.status(400).json(Error);
            } else {
              console.log("No-record-Middleware");
              next();
            }
          } else {
            console.log("Middleware Error");
            console.log(err);
            const Error = { status: "error", message: "Server Error" };
            res.status(400).json(Error);
          }
        }
      );
      //-------------------------1----------------------------
    } else if (
      userID &&
      userID > 0 &&
      storetypeID &&
      storetypeID > 0 &&
      roleID &&
      roleID > 0
    ) {
      console.log("Valid Details Middleware");
      //-------------------------1----------------------------
      con.query(
        "SELECT id from users_role WHERE users_id=? AND store_type=? AND role=? AND trash = 0",
        [userID, storetypeID, roleID],
        (err, response) => {
          if (!err) {
            if (response && response.length > 0) {
              // console.log(response);
              console.log("Users Role Already Exists");
              const Error = {
                status: "error",
                message: "Users Role Already Exists",
              };
              res.status(400).json(Error);
            } else {
              console.log("No-record-Middleware");
              next();
            }
          } else {
            console.log("Middleware Error");
            console.log(err);
            const Error = { status: "error", message: "Server Error" };
            res.status(400).json(Error);
          }
        }
      );
      //-------------------------1----------------------------
    } else {
      console.log("Invalid Details Middleware");
      const Error = { status: "error", message: "Invalid Details" };
      res.status(400).json(Error);
    }
    //
  }
};
//--------------------------------------------------------------------------------------------
//
//checkuseralready -------------------------------------------------------------------- - --
User.checkuseralready = (req, res, next) => {
  console.log("---checkuseralready Middleware---");
  //
  const data = req.body;
  // console.log(data);
  let filteredData = Object.fromEntries(
    Object.entries(data).filter(
      ([_, v]) => v != "null" && v != "" && v != null && v != null
    )
  );
  // console.log(filteredData);
  //
  //
  //---------------------------------------------------------------
  var gotofunctionality = 0;
  //check if creating new role or updating role
  if (req.params.id && req.params.id.length > 0) {
    console.log("Update Functionality");
    //
    if (
      filteredData.hasOwnProperty("phone") &&
      filteredData.phone.toString().length > 0 &&
      filteredData.hasOwnProperty("email") &&
      filteredData.email.length > 0
    ) {
      //
      gotofunctionality = 1;
      //
    } else if (
      filteredData.hasOwnProperty("phone") &&
      filteredData.phone.toString().length > 0
    ) {
      //
      gotofunctionality = 2;
      //
    } else if (
      filteredData.hasOwnProperty("email") &&
      filteredData.email.length > 0
    ) {
      //
      gotofunctionality = 3;
      //
    } else {
      console.log("No check in middleware needed");
      next();
    }
    //
  } else {
    console.log("Create Functionality");
    //
    gotofunctionality = 1;
    //
  }
  //---------------------------------------------------------------
  if (gotofunctionality == 1) {
    //
    if (
      filteredData.hasOwnProperty("phone") &&
      filteredData.phone.toString().length > 0 &&
      filteredData.hasOwnProperty("email") &&
      filteredData.email.length > 0
    ) {
      console.log("Valid Details Middleware");
      //
      const phone = filteredData.phone; //9999988888
      const email = filteredData.email;
      //
      const sql = con.query(
        "SELECT u.id from users as u LEFT JOIN users_role as ur ON u.id=ur.users_id WHERE u.phone=?",
        [phone],
        (err, response) => {
          //console.log(response);
          //----------------------------------------------------------------------------------------------
          if (!err) {
            if (response && response.length > 0) {
              console.log("Phone already exists");
              const Error = {
                status: "error",
                message: "Phone Already Exists",
              };
              res.status(400).json(Error);
            }
            ////////////////////////////////////////////////////////
            else {
              //No  PHONE found so now EMAIL check
              const sql1 = con.query(
                "SELECT u.id from users as u LEFT JOIN users_role as ur ON u.id=ur.users_id WHERE u.email=?",
                [email],
                (err, response) => {
                  //console.log(response);
                  if (!err) {
                    if (response && response.length > 0) {
                      console.log("Email already exists");
                      const Error = {
                        status: "error",
                        message: "Email Already Exists",
                      };
                      res.status(400).json(Error);
                    } else {
                      //no email found
                      console.log(" next () - no email no phone found in db");
                      console.log("No-record-Middleware");
                      next();
                    }
                  } else {
                    console.log("Middleware Error");
                    console.log(err);
                    const Error = { status: "error", message: "Server Error" };
                    res.status(400).json(Error);
                  }
                }
              );
              console.log(sql1.sql);
            }
            ////////////////////////////////////////////////////////////////
          } else {
            console.log("Middleware Error");
            console.log(err);
            const Error = { status: "error", message: "Server Error" };
            res.status(400).json(Error);
          }
          //-------------------------------------------------------------------------------------------------
        }
      );
      console.log(sql.sql);
      //
    } else {
      console.log("Invalid Details Middleware");
      const Error = { status: "error", message: "Invalid Details" };
      res.status(400).json(Error);
    }
  } else if (gotofunctionality == 2) {
    //
    if (
      filteredData.hasOwnProperty("phone") &&
      filteredData.phone.toString().length > 0
    ) {
      console.log("Valid Details Middleware");
      //
      const phone = filteredData.phone; //9999988888
      //
      const sql = con.query(
        "SELECT u.id from users as u LEFT JOIN users_role as ur ON u.id=ur.users_id WHERE u.phone=?",
        [phone],
        (err, response) => {
          //console.log(response);
          //----------------------------------------------------------------------------------------------
          if (!err) {
            if (response && response.length > 0) {
              console.log("Phone already exists");
              const Error = {
                status: "error",
                message: "Phone Already Exists",
              };
              res.status(400).json(Error);
            }
            ////////////////////////////////////////////////////////
            else {
              //No  PHONE found
              console.log(" next () - no email no phone found in db");
              console.log("No-record-Middleware");
              next();
            }
            ////////////////////////////////////////////////////////////////
          } else {
            console.log("Middleware Error");
            console.log(err);
            const Error = { status: "error", message: "Server Error" };
            res.status(400).json(Error);
          }
          //-------------------------------------------------------------------------------------------------
        }
      );
      console.log(sql.sql);
      //
    } else {
      console.log("Invalid Details Middleware");
      const Error = { status: "error", message: "Invalid Details" };
      res.status(400).json(Error);
    }
  } else if (gotofunctionality == 3) {
    //
    if (filteredData.hasOwnProperty("email") && filteredData.email.length > 0) {
      console.log("Valid Details Middleware");
      //
      const email = filteredData.email;
      //
      const sql1 = con.query(
        "SELECT u.id from users as u LEFT JOIN users_role as ur ON u.id=ur.users_id WHERE u.email=?",
        [email],
        (err, response) => {
          //console.log(response);
          if (!err) {
            if (response && response.length > 0) {
              console.log("Email already exists");
              const Error = {
                status: "error",
                message: "Email Already Exists",
              };
              res.status(400).json(Error);
            } else {
              //no email found
              console.log(" next () - no email found in db");
              console.log("No-record-Middleware");
              next();
            }
          } else {
            console.log("Middleware Error");
            console.log(err);
            const Error = { status: "error", message: "Server Error" };
            res.status(400).json(Error);
          }
        }
      );
      console.log(sql1.sql);
      //
    } else {
      console.log("Invalid Details Middleware");
      const Error = { status: "error", message: "Invalid Details" };
      res.status(400).json(Error);
    }
  }
};
//--------------------------------------------------------------------------------------------
//
/*-----------fetchUser------------------------------starts here--------------------*/
User.fetchUser = async (userId, result) => {
  var resp_data = {};
  let sql_query_payload = {
    sql_script: `  SELECT u.id, CONCAT_WS(' ', u.first_Name, u.middle_Name, u.last_Name) AS user_name, u.first_Name, u.instructor,
        u.middle_Name, u.last_Name, u.nick_name, r.id AS role, r.title AS role_name, GROUP_CONCAT(lg.id) AS group_id,
        GROUP_CONCAT(lg.group_name) AS group_name, u.phone, u.email, u.email_verify, u.address_line1, u.address_line2,
        u.city, u.state, u.country, u.postal_code, CONCAT('${domainpath}', u.image) AS image, u.gender, u.date_of_birth,
        u.ipaddress, u.slug, u.active, u.description FROM ${table_user} AS u LEFT JOIN ${table_user_role} AS ur ON
        ur.users_id = u.id LEFT JOIN ${table_role} AS r ON r.id = ur.role LEFT JOIN group_users AS gu ON gu.user_id =
        u.id LEFT JOIN la_groups AS lg ON gu.group_id = lg.id WHERE u.trash = 0 AND u.id = ${userId}
        GROUP BY u.id, user_name, u.first_Name, u.instructor, u.middle_Name, u.last_Name, u.nick_name, r.id, r.title,
        u.phone, u.email, u.email_verify, u.address_line1, u.address_line2, u.city, u.state, u.country, u.postal_code,
        u.gender, u.date_of_birth, u.ipaddress, u.slug, u.active, u.description`,
    // sql_script:
    //   `SELECT u.id, CONCAT_WS(' ', u.first_Name, u.middle_Name, u.last_Name) as user_name, u.first_Name,u.instructor, u.middle_Name, u.last_Name, u.nick_name,r.id as role,r.title as role_name,group_concat(lg.id) as group_id , group_concat(lg.group_name) as group_name , u.phone, u.email,u.email_verify, u.address_line1, u.address_line2, u.city, u.state, u.country, u.postal_code, CONCAT(` +
    //   '"' +
    //   domainpath +
    //   '"' +
    //   `, u.image) as image, u.gender, u.date_of_birth, u.ipaddress, u.slug, u.active,  u.description FROM ${table_user} as u LEFT JOIN ${table_user_role} as ur ON  ur.users_id= u.id LEFT JOIN ${table_role} as r ON r.id= ur.role LEFT JOIN group_users as gu ON gu.user_id=u.id LEFT JOIN la_groups as lg ON gu.group_id=lg.id WHERE u.trash = 0 AND u.id=${userId}`,
    method: "get",
  };
  var get_meta = await SQL.gettabledata("user_meta", ["user_key", "value"], {
    user_id: userId,
  });
  if (get_meta.length > 0) {
    get_meta.forEach((items) => {
      var values = JSON.parse(items.value);
      resp_data[items.user_key] = values;
    });
  }

  const respSql = await Model.sql_query(sql_query_payload);
  respSql.data[0].meta = resp_data;

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
/*-----------fetchUser------------------------------ends here--------------------*/
//
/*-----------fetchUsers------------------------------starts here--------------------*/
User.fetchUsers = async (result) => {
  let sql_query_payload = {
    sql_script: `SELECT u.id, CONCAT_WS(' ', u.first_Name, u.middle_Name, u.last_Name) AS user_name, u.first_Name, u.middle_Name,
        u.last_Name, u.nick_name, r.id AS role, r.title AS role_name, GROUP_CONCAT(lg.id) AS group_id,
        GROUP_CONCAT(lg.group_name) AS group_name, u.phone, u.email, u.email_verify, u.address_line1, u.address_line2,
        u.city, u.state, u.country, u.postal_code, CONCAT('${domainpath}', u.image) AS image, u.gender, u.date_of_birth,
        u.ipaddress, u.slug, u.active, u.description FROM ${table_user} AS u LEFT JOIN ${table_user_role} AS ur ON
        ur.users_id = u.id LEFT JOIN ${table_role} AS r ON r.id = ur.role LEFT JOIN group_users AS gu ON gu.user_id =
        u.id LEFT JOIN la_groups AS lg ON gu.group_id = lg.id WHERE u.id != 1 AND u.trash = 0 GROUP BY u.id, user_name,
        u.first_Name, u.middle_Name, u.last_Name, u.nick_name, r.id, r.title, u.phone, u.email, u.email_verify,
        u.address_line1, u.address_line2, u.city, u.state, u.country, u.postal_code, CONCAT('${domainpath}', u.image),
        u.gender, u.date_of_birth, u.ipaddress, u.slug, u.active, u.description`,
    method: "get",
  };

  console.log(sql_query_payload);
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
/*-----------fetchUsers------------------------------ends here--------------------*/
//
/*-----------deleteUser------------------------------starts here--------------------*/
User.deleteUser = async (userId, result) => {
  let delete_payload = {
    table_name: table_user,
    query_field: "id",
    query_value: userId,
  };
  const respDelete = await Model.delete_query(delete_payload);
  if (respDelete.status == "success") {
    const message = "User Deleted Successfully";
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
/*-----------deleteUser------------------------------ends here--------------------*/
//
/*-----------trashUser------------------------------starts here--------------------*/
User.trashUser = async (userId, result) => {
  let delete_payload = {
    table_name: table_user,
    query_field: "id",
    query_value: userId,
    dataToSave: {
      active: 0,
      trash: 1,
    },
  };
  const respDelete = await Model.trash_query(delete_payload);
  if (respDelete.status == "success") {
    const message = "Post Deleted Successfully";
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
/*-----------trashUser------------------------------ends here--------------------*/
//
//
/*-----------checkUserAlready------------------------------starts here--------------------*/
User.checkUserAlready = async (data, result) => {
  const email = data.email;
  const phone = data.phone;
  var sql = "";
  if ("email" in data === true && "phone" in data === true) {
    sql =
      `SELECT id from ${table_user} WHERE email=` +
      '"' +
      `${email}` +
      '"' +
      ` OR phone=` +
      '"' +
      `${phone}` +
      '"';
  } else if ("email" in data === true) {
    sql = `SELECT id from ${table_user} WHERE email=` + '"' + `${email}` + '"';
  } else if ("phone" in data === true) {
    sql = `SELECT id from ${table_user} WHERE phone=` + '"' + `${phone}` + '"';
  }
  let sql_query_payload = {
    sql_script: sql,
    method: "get",
  };
  const respSql = await Model.sql_query(sql_query_payload);
  if (respSql.status == "success") {
    const Error = {
      status: "error",
      message: "Account Already Exists",
      statusCode: 400,
    };
    result(Error, null); //as same exist so error
  } else if (respSql.status == "error") {
    const err = respSql.message;
    if (err == "NO_DATA") {
      result(null, "itsnewuser"); //as no same exists so its fine
    } else {
      const respError = await Model.error_query(err);
      const Error = {
        status: "error",
        message: respError.message,
        statusCode: respError.statusCode,
      };
      result(Error, null);
    }
  }
};
/*-----------checkUserAlready------------------------------ends here--------------------*/
//
/*-----------createUser------------------------------starts here--------------------*/
User.createUser = async (saveData, result) => {
  let add_payload = {
    table_name: table_user,
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
/*-----------createUser------------------------------ends here--------------------*/
//
/*-----------checkUserAlreadyUpdate------------------------------starts here--------------------*/
User.checkUserAlreadyUpdate = async (data, result) => {
  const dataUpdate = data.save_data;
  const email = dataUpdate.email;
  const phone = dataUpdate.phone;
  const userId = data.user_id;
  var sql = "";
  if ("email" in dataUpdate === true && "phone" in dataUpdate === true) {
    sql =
      `SELECT id from ${table_user} WHERE id != ${userId} AND (email=` +
      '"' +
      `${email}` +
      '"' +
      ` OR phone=` +
      '"' +
      `${phone}` +
      '"' +
      `)`;
  } else if ("email" in dataUpdate === true) {
    sql =
      `SELECT id from ${table_user} WHERE id != ${userId} AND email=` +
      '"' +
      `${email}` +
      '"';
  } else if ("phone" in dataUpdate === true) {
    sql =
      `SELECT id from ${table_user} WHERE id != ${userId} AND phone=` +
      '"' +
      `${phone}` +
      '"';
  }
  let sql_query_payload = {
    sql_script: sql,
    method: "get",
  };
  const respSql = await Model.sql_query(sql_query_payload);
  if (respSql.status == "success") {
    const Error = {
      status: "error",
      message: "Account Already Exists",
      statusCode: 400,
    };
    result(Error, null); //as same exist so error
  } else if (respSql.status == "error") {
    const err = respSql.message;
    if (err == "NO_DATA") {
      result(null, "itsnewuser"); //as no same exists so its fine
    } else {
      const respError = await Model.error_query(err);
      const Error = {
        status: "error",
        message: respError.message,
        statusCode: respError.statusCode,
      };
      result(Error, null);
    }
  }
};
/*-----------checkUserAlreadyUpdate------------------------------ends here--------------------*/
//
/*-----------updateUser------------------------------starts here--------------------*/
User.updateUser = async (data, result) => {
  let update_payload = {
    table_name: table_user,
    query_field: "id",
    query_value: data.user_id,
    dataToSave: data.save_data,
  };
  const respUser = await Model.edit_query(update_payload);
  console.log(respUser);
  if (respUser.status == "success") {
    result(null, respUser.status);
  } else if (respUser.status == "error") {
    const err = respUser.message;
    const respError = await Model.error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    result(Error, null);
  }
};
/*-----------updateUser------------------------------ends here--------------------*/
//
/*-----------checkOldPassword------------------------------starts here--------------------*/
User.checkOldPassword = async (data, result) => {
  console.log(data);
  const userId = data.user_id;
  const old_password = data.old_password;
  let sql_query_payload = {
    sql_script: `SELECT id, password FROM ${table_user} WHERE id=${userId}`,
    method: "get",
  };
  const respSql = await Model.sql_query(sql_query_payload);
  console.log(respSql);
  if (respSql.status == "success") {
    //compare old password -------------------------STARTS
    try {
      bcrypt.compare(
        old_password,
        respSql.data[0].password,
        (error, response) => {
          if (response == true) {
            result(null, "password matched");
          } else {
            const Error = {
              status: "error",
              message: "Old Password Incorrect",
              statusCode: 400,
            };
            result(Error, null);
          }
        }
      );
    } catch (err) {
      const Error = {
        status: "error",
        message: "Something went wrong. Try again later",
        statusCode: 400,
      };
      result(Error, null);
    }
    //compare old password -------------------------ENDS
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
/*-----------checkOldPassword------------------------------ends here--------------------*/
//
/*-----------createUserRole------------------------------starts here--------------------*/
User.createUserRole = async (saveData, result) => {
  let add_payload = {
    table_name: table_user_role,
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
/*-----------createUserRole------------------------------ends here--------------------*/
//
/*-----------fetchUserEmail------------------------------starts here--------------------*/
User.fetchUserEmail = async (email, result) => {
  let sql_query_payload = {
    sql_script:
      `SELECT * FROM ${table_user} WHERE trash = 0 AND email=` +
      '"' +
      `${email}` +
      '"',
    method: "get",
  };

  const respSql = await Model.sql_query(sql_query_payload);
  if (respSql.status == "success") {
    result(null, respSql);
  } else if (respSql.status == "error") {
    const Error = {
      status: "error",
      message: "Invalid Account Details",
      statusCode: 204,
    };
    result(null, Error);
  }
};
/*-----------fetchUserEmail------------------------------ends here--------------------*/
//
/*-----------checkVerificationCode------------------------------starts here--------------------*/
User.checkVerificationCode = async (verification_code, result) => {
  let sql_query_payload = {
    sql_script:
      `SELECT * FROM ${table_user} WHERE trash = 0 AND verification_code=` +
      '"' +
      `${verification_code}` +
      '"',
    method: "get",
  };
  const respSql = await Model.sql_query(sql_query_payload);
  if (respSql.status == "success") {
    result(null, respSql.data);
  } else if (respSql.status == "error") {
    //{ status: 'error', message: 'NO_DATA' }
    if (respSql.message == "NO_DATA") {
      const Error = {
        status: "error",
        message: "Incorrect Otp",
        statusCode: 204,
      };
      result(Error, null);
    } else {
      const err = respSql.message;
      const respError = await Model.error_query(err);
      const Error = {
        status: "error",
        message: respError.message,
        statusCode: respError.statusCode,
      };
      result(Error, null);
    }
  }
};
/*-----------checkVerificationCode------------------------------ends here--------------------*/
//
//
module.exports = User;
