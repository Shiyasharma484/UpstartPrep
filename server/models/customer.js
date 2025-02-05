const con = require("./db");
const { encrypttheid, decodetheid } = require("../helpers/encode-decode");
const Model = require("../helpers/instructions");
const table_customer = "customers";
const table_address = "addresses";
// Plan object constructor
var Customer = function () {};
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

//
/*-----------fetchCustomerByCredentials------------------------------starts here--------------------*/
Customer.fetchCustomerByCredentials = async (data, result) => {
  console.log("Inside");
  let sql_query_payload = {
    sql_script: `SELECT id, password FROM ${table_customer} WHERE ${data.entity}='${data.phoneoremailvalue}'`,
    method: "get",
  };
  const respCustomer = await Model.sql_query(sql_query_payload);
  if (respCustomer.status == "success") {
    result(null, respCustomer.data);
  } else if (respCustomer.status == "error") {
    const err = respCustomer.message;
    if (err == "NO_DATA") {
      const Error = {
        status: "error",
        message: "Customer doesn't exist",
        statusCode: 204,
      };
      result(Error, null);
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
/*-----------fetchCustomerByCredentials------------------------------ends here--------------------*/
//
/*-----------update------------------------------starts here--------------------*/
Customer.update = async (data, result) => {
  let update_payload = {
    table_name: table_customer,
    query_field: "id",
    query_value: data.customer_id,
    dataToSave: {
      access_token: data.accesstoken,
      access_token_expires_in: data.accesstokenexpiry,
      refresh_token: data.refreshtoken,
      refresh_token_expires_in: data.refreshtokenexpiry,
    },
  };
  const respCustomer = await Model.edit_query(update_payload);
  if (respCustomer.status == "success") {
    result(null, respCustomer.status);
  } else if (respCustomer.status == "error") {
    const err = respCustomer.message;
    const respError = await Model.error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    result(Error, null);
  }
};
/*-----------update------------------------------ends here--------------------*/
//
/*-----------fetchCustomer------------------------------starts here--------------------*/
Customer.fetchCustomer = async (customer_id, result) => {
  let sql_query_payload = {
    sql_script: `SELECT id, s.is_membership, CONCAT_WS(' ', s.first_Name, s.middle_Name, s.last_Name) as name, s.nick_name, s.description, s.gender, s.date_of_birth, s.phone, CONCAT('${domainpath}', s.image) as image, s.email, s.phone_verify, s.email_verify, s.active from ${table_customer} as s WHERE s.id=${customer_id}`, //s.id,
    method: "get",
  };
  const respCountry = await Model.sql_query(sql_query_payload);
  if (respCountry.status == "success") {
    result(null, respCountry.data);
  } else if (respCountry.status == "error") {
    const err = respCountry.message;
    const respError = await Model.error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    result(Error, null);
  }
};
/*-----------fetchCustomer------------------------------ends here--------------------*/
//
/*-----------fetchCustomerAddresses------------------------------starts here--------------------*/
Customer.fetchCustomerAddresses = async (customer_id, result) => {
  let sql_query_payload = {
    sql_script: `SELECT s.id, s.full_name, s.address_type, s.address_line_1, s.address_line_2, s.locality, s.postal_code, s.city, s.state, s.country, s.phone FROM ${table_address} as s WHERE s.customers_id=${customer_id}`,
    method: "get",
  };
  const respCountry = await Model.sql_query(sql_query_payload);
  if (respCountry.status == "success") {
    result(null, respCountry.data);
  } else if (respCountry.status == "error") {
    const err = respCountry.message;
    const respError = await Model.error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    result(Error, null);
  }
};
/*-----------fetchCustomerAddresses------------------------------ends here--------------------*/
//
///////////////////////////////////MIDDLEWARES//////////////////////////////////////////////////////
//CHECK DB EMPTY------------------------------------------------------------------------------------
// const dbempty = (req, res, next) => {
//   console.log("---check dbempty Middleware---");
//   con.query("SELECT * from customers", (err, response) => {
//     if (!err) {
//       if (response && response.length) {
//         console.log("Middleware Passed");
//         next();
//       } else {
//         console.log("Middleware Failure");
//         const Error = {
//           status: "error",
//           message: "No record in TABLE",
//         };
//         res.status(204).json(Error);
//       }
//     }
//   });
// };
//--------------------------------------------------------------------------------------------------
//
//CHECK IF CUSTOMERID EXISTS OR NOT - --
// const checkcustomer = (req, res, next) => {
//   console.log("---checkcustomer Middleware---");
//   //console.log(req.params.id);
//   const encryptedid = req.params.id;
//   const idvalue = decodetheid(encryptedid);
//   // console.log(idvalue);
//   const checkNum = Number.isInteger(idvalue);
//   //console.log(checkNum);
//   if (checkNum == true) {
//     //if id is integer
//     con.query(
//       "SELECT id from customers WHERE id=?",
//       [idvalue],
//       (err, response) => {
//         console.log(response);
//         if (!err) {
//           if (response && response.length) {
//             console.log("Middleware Passed");
//             next();
//           } else {
//             console.log("Middleware Failure");
//             console.log("No-record-LLLLLLLLLLLLLL");
//             const Error = {
//               status: "error",
//               message: "No such record in Table",
//             };
//             res.status(204).json(Error);
//           }
//         }
//       }
//     );
//   } else {
//     console.log("Middleware Failure");
//     console.log("Invalid Id");
//     const Error = {
//       status: "error",
//       message: "Forbidden",
//     };
//     res.status(403).json(Error);
//   }
// };
//--------------------------------------------------------------------------------------------
//
//CHECK IF CUSTOMER ALREADY EXISTS ---
// const checkcustomeralready = (req, res, next) => {
//   console.log("---checkcustomeralready Middleware---");
//   //
//   const data = req.body;
//   // console.log(data);
//   let filteredData = Object.fromEntries(
//     Object.entries(data).filter(
//       ([_, v]) => v != "null" && v != "" && v != null && v != null
//     )
//   );
//   // console.log(filteredData);
//   //
//   //
//   //---------------------------------------------------------------
//   var gotofunctionality = 0;
//   //check if creating new role or updating role
//   if (req.params.id && req.params.id.length > 0) {
//     console.log("Update Functionality");
//     //
//     if (
//       filteredData.hasOwnProperty("phone") &&
//       filteredData.phone.toString().length > 0 &&
//       filteredData.hasOwnProperty("email") &&
//       filteredData.email.length > 0
//     ) {
//       //
//       gotofunctionality = 1;
//       //
//     } else if (
//       filteredData.hasOwnProperty("phone") &&
//       filteredData.phone.toString().length > 0
//     ) {
//       //
//       gotofunctionality = 2;
//       //
//     } else if (
//       filteredData.hasOwnProperty("email") &&
//       filteredData.email.length > 0
//     ) {
//       //
//       gotofunctionality = 3;
//       //
//     } else {
//       console.log("No check in middleware needed");
//       next();
//     }
//     //
//   } else {
//     console.log("Create Functionality");
//     //
//     gotofunctionality = 1;
//     //
//   }
//   //---------------------------------------------------------------
//   if (gotofunctionality == 1) {
//     //
//     if (
//       filteredData.hasOwnProperty("phone") &&
//       filteredData.phone.toString().length > 0 &&
//       filteredData.hasOwnProperty("email") &&
//       filteredData.email.length > 0
//     ) {
//       console.log("Valid Details Middleware");
//       //
//       const phone = filteredData.phone; //9999988888
//       const email = filteredData.email;
//       //
//       const sql = con.query(
//         "SELECT id from customers WHERE phone=?",
//         [phone],
//         (err, response) => {
//           //console.log(response);
//           //----------------------------------------------------------------------------------------------
//           if (!err) {
//             if (response && response.length > 0) {
//               console.log("Phone already exists");
//               const Error = {
//                 status: "error",
//                 message: "Phone Already Exists",
//               };
//               res.status(400).json(Error);
//             }
//             ////////////////////////////////////////////////////////
//             else {
//               //No  PHONE found so now EMAIL check
//               const sql1 = con.query(
//                 "SELECT id from customers WHERE email=?",
//                 [email],
//                 (err, response) => {
//                   //console.log(response);
//                   if (!err) {
//                     if (response && response.length > 0) {
//                       console.log("Email already exists");
//                       const Error = {
//                         status: "error",
//                         message: "Email Already Exists",
//                       };
//                       res.status(400).json(Error);
//                     } else {
//                       //no email found
//                       console.log(" next () - no email no phone found in db");
//                       console.log("No-record-Middleware");
//                       next();
//                     }
//                   } else {
//                     console.log("Middleware Error");
//                     console.log(err);
//                     const Error = { status: "error", message: "Server Error" };
//                     res.status(400).json(Error);
//                   }
//                 }
//               );
//               console.log(sql1.sql);
//             }
//             ////////////////////////////////////////////////////////////////
//           } else {
//             console.log("Middleware Error");
//             console.log(err);
//             const Error = { status: "error", message: "Server Error" };
//             res.status(400).json(Error);
//           }
//           //-------------------------------------------------------------------------------------------------
//         }
//       );
//       console.log(sql.sql);
//       //
//     } else {
//       console.log("Invalid Details Middleware");
//       const Error = { status: "error", message: "Invalid Details" };
//       res.status(400).json(Error);
//     }
//   } else if (gotofunctionality == 2) {
//     //
//     if (
//       filteredData.hasOwnProperty("phone") &&
//       filteredData.phone.toString().length > 0
//     ) {
//       console.log("Valid Details Middleware");
//       //
//       const phone = filteredData.phone; //9999988888
//       //
//       const sql = con.query(
//         "SELECT id from customers WHERE phone=?",
//         [phone],
//         (err, response) => {
//           //console.log(response);
//           //----------------------------------------------------------------------------------------------
//           if (!err) {
//             if (response && response.length > 0) {
//               console.log("Phone already exists");
//               const Error = {
//                 status: "error",
//                 message: "Phone Already Exists",
//               };
//               res.status(400).json(Error);
//             }
//             ////////////////////////////////////////////////////////
//             else {
//               //No  PHONE found
//               console.log(" next () - no email no phone found in db");
//               console.log("No-record-Middleware");
//               next();
//             }
//             ////////////////////////////////////////////////////////////////
//           } else {
//             console.log("Middleware Error");
//             console.log(err);
//             const Error = { status: "error", message: "Server Error" };
//             res.status(400).json(Error);
//           }
//           //-------------------------------------------------------------------------------------------------
//         }
//       );
//       console.log(sql.sql);
//       //
//     } else {
//       console.log("Invalid Details Middleware");
//       const Error = { status: "error", message: "Invalid Details" };
//       res.status(400).json(Error);
//     }
//   } else if (gotofunctionality == 3) {
//     //
//     if (filteredData.hasOwnProperty("email") && filteredData.email.length > 0) {
//       console.log("Valid Details Middleware");
//       //
//       const email = filteredData.email;
//       //
//       const sql1 = con.query(
//         "SELECT id from customers WHERE email=?",
//         [email],
//         (err, response) => {
//           //console.log(response);
//           if (!err) {
//             if (response && response.length > 0) {
//               console.log("Email already exists");
//               const Error = {
//                 status: "error",
//                 message: "Email Already Exists",
//               };
//               res.status(400).json(Error);
//             } else {
//               //no email found
//               console.log(" next () - no email found in db");
//               console.log("No-record-Middleware");
//               next();
//             }
//           } else {
//             console.log("Middleware Error");
//             console.log(err);
//             const Error = { status: "error", message: "Server Error" };
//             res.status(400).json(Error);
//           }
//         }
//       );
//       console.log(sql1.sql);
//       //
//     } else {
//       console.log("Invalid Details Middleware");
//       const Error = { status: "error", message: "Invalid Details" };
//       res.status(400).json(Error);
//     }
//   }
// };
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
// module.exports = {
//   dbempty,
//   checkcustomer,
//   checkcustomeralready,
// };
module.exports = Customer;
