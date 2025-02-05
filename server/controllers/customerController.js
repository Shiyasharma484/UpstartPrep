var moment = require("moment");
const bcrypt = require("bcrypt");
const con = require("../models/db");
const nodemailer = require("nodemailer");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const {
  accesstokencreation,
  refreshtokencreation,
} = require("../helpers/user-token-creation");
const {
  encrypttheid,
  decodetheid,
  generateVerificationCodePF,
} = require("../helpers/common");
const { sendemail } = require("../helpers/email");
const Customer = require("../models/customer");
const { ExtractToken } = require("../helpers/customer");
const table_customer = "customers";
const Model = require("../helpers/instructions");
//
/*-----------Login------------------------------starts here--------------------*/
exports.Login = async (req, res) => {
  const phoneoremailvalue = req.body.phoneoremail; //9999988888
  const password = req.body.password; //password is password (hashed)
  var g_response = {};
  var g_status_code;
  try {
    const validate_data = await check_valid_data(phoneoremailvalue, password);
    try {
      const email_or_phone = await check_email_or_phone(phoneoremailvalue);
      try {
        const data = {
          entity: email_or_phone,
          phoneoremailvalue: phoneoremailvalue,
        };
        const cust_data = await fetch_cust_by_credentials(data);
        try {
          const password_verify = await password_match(
            password,
            cust_data[0].password
          );
          const customer_id = cust_data[0].id;
          try {
            const resp_tokens = await create_tokens(customer_id);
            resp_tokens["customer_id"] = customer_id;
            //  var ip =
            //       req.header("x-forwarded-for") || req.connection.remoteAddress;
            resp_tokens["customer_id"] = customer_id;
            try {
              const resp_update = await update_customer(resp_tokens);
              try {
                const customer_details = await fetch_customer(customer_id);
                customer_details[0]["accesstoken"] = resp_tokens.accesstoken;
                customer_details[0]["refreshtoken"] = resp_tokens.refreshtoken;
                try {
                  const customer_id_enc = await encrypt_the_id(customer_id);
                  customer_details[0]["id"] = customer_id_enc;
                  try {
                    const address_details = await fetch_customer_addresses(
                      customer_id
                    );
                    customer_details[0]["addresses"] = address_details;
                    g_response["status"] = "success";
                    g_response["responsedata"] = customer_details;
                    g_response["message"] = "login success CUSTOMER";
                    g_status_code = 200;
                  } catch (err) {
                    g_response["status"] = "error";
                    g_response["message"] = err.message;
                    g_status_code = err.statusCode;
                  }
                } catch (err) {
                  g_response["status"] = "error";
                  g_response["message"] = err.message;
                  g_status_code = err.statusCode;
                }
              } catch (err) {
                g_response["status"] = "error";
                g_response["message"] = err.message;
                g_status_code = err.statusCode;
              }
            } catch (err) {
              g_response["status"] = "error";
              g_response["message"] = err.message;
              g_status_code = err.statusCode;
            }
          } catch (err) {
            g_response["status"] = "error";
            g_response["message"] = err.message;
            g_status_code = err.statusCode;
          }
        } catch (err) {
          g_response["status"] = "error";
          g_response["message"] = err.message;
          g_status_code = err.statusCode;
        }
      } catch (err) {
        g_response["status"] = "error";
        g_response["message"] = err.message;
        g_status_code = err.statusCode;
      }
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = "Neither email nor Phone";
      g_status_code = 400;
    }
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = "Invalid Details";
    g_status_code = 400;
  }
  res.status(g_status_code).json(g_response);
};
/*-----------Login------------------------------ends here--------------------*/
//
/*-----------Logout------------------------------starts here--------------------*/
exports.Logout = async (req, res) => {
  const basic_auth = req.headers.token;
  const access_token = await ExtractToken(basic_auth);
  //
  //STEP-1 UPDATE DB and make ACESSTOKEN, expiry null--------starts
  let update_payload = {
    table_name: table_customer,
    query_field: "access_token",
    query_value: access_token,
    dataToSave: {
      access_token: null,
      access_token_expires_in: null,
    },
  };
  //console.log(update_payload);
  async function updateUser(saveData) {
    //  console.log("Inside updateUser");
    //   console.log(saveData);
    const respEdit = await Model.edit_query(saveData);
    //console.log("Back 1");
    //console.log(respEdit);
    if (respEdit.status == "success") {
      console.log("Success Customer Updated - Logout");
      const Response = {
        status: "success",
        message: "logout done successfully",
      };
      res.status(200).json(Response);
      //res.status(200).send("DONE");
    } else if (respEdit.status == "error") {
      // console.log("Error");
      const err = respEdit.message;
      const respError = await Model.error_query(err);
      //console.log("Back 1-E");
      //  console.log(respError);
      const Error = {
        status: "error",
        message: respError.message,
      };
      res.status(respError.statusCode).json(Error);
    }
  }
  await updateUser(update_payload);
  //STEP-1 UPDATE DB and make ACESSTOKEN, expiry null--------ends
};
/*-----------Logout------------------------------ends here--------------------*/
/*-----------Login------------------------------starts here--------------------*/
exports.LoginSocial = async (req, res) => {
  const phoneoremailvalue = req.body.phoneoremail; //9999988888
  const password = req.body.password; //password is password (hashed)
  var g_response = {};
  var g_status_code;
  try {
    const validate_data = await check_valid_data(phoneoremailvalue, password);
    try {
      const email_or_phone = await check_email_or_phone(phoneoremailvalue);
      try {
        const data = {
          entity: email_or_phone,
          phoneoremailvalue: phoneoremailvalue,
        };
        const cust_data = await fetch_cust_by_credentials(data);
        try {
          const password_verify = await password_match(
            password,
            cust_data[0].password
          );
          const customer_id = cust_data[0].id;
          try {
            const resp_tokens = await create_tokens(customer_id);
            resp_tokens["customer_id"] = customer_id;
            //  var ip =
            //       req.header("x-forwarded-for") || req.connection.remoteAddress;
            resp_tokens["customer_id"] = customer_id;
            try {
              const resp_update = await update_customer(resp_tokens);
              try {
                const customer_details = await fetch_customer(customer_id);
                customer_details[0]["accesstoken"] = resp_tokens.accesstoken;
                customer_details[0]["refreshtoken"] = resp_tokens.refreshtoken;
                try {
                  const address_details = await fetch_customer_addresses(
                    customer_id
                  );
                  customer_details[0]["addresses"] = address_details;
                  g_response["status"] = "success";
                  g_response["responsedata"] = customer_details;
                  g_response["message"] = "login success CUSTOMER";
                  g_status_code = 200;
                } catch (err) {
                  g_response["status"] = "error";
                  g_response["message"] = err.message;
                  g_status_code = err.statusCode;
                }
              } catch (err) {
                g_response["status"] = "error";
                g_response["message"] = err.message;
                g_status_code = err.statusCode;
              }
            } catch (err) {
              g_response["status"] = "error";
              g_response["message"] = err.message;
              g_status_code = err.statusCode;
            }
          } catch (err) {
            g_response["status"] = "error";
            g_response["message"] = err.message;
            g_status_code = err.statusCode;
          }
        } catch (err) {
          g_response["status"] = "error";
          g_response["message"] = err.message;
          g_status_code = err.statusCode;
        }
      } catch (err) {
        g_response["status"] = "error";
        g_response["message"] = err.message;
        g_status_code = err.statusCode;
      }
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = "Neither email nor Phone";
      g_status_code = 400;
    }
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = "Invalid Details";
    g_status_code = 400;
  }
  res.status(g_status_code).json(g_response);
};
/*-----------Login------------------------------ends here--------------------*/
//
//FUNCTIONS-----------------------------------------------------------------//
const check_valid_data = (phoneoremailvalue, password) => {
  return new Promise((resolve, reject) => {
    if (
      phoneoremailvalue &&
      phoneoremailvalue.length > 0 &&
      password &&
      password.length > 0
    ) {
      resolve();
    } else {
      reject();
    }
  });
};
const check_email_or_phone = (phoneoremailvalue) => {
  return new Promise((resolve, reject) => {
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      phoneoremailvalue.match(emailRegex) &&
      typeof phoneoremailvalue === "string"
    ) {
      resolve("email");
    } else if (!isNaN(phoneoremailvalue)) {
      resolve("phone");
    } else {
      reject();
    }
  });
};
const fetch_cust_by_credentials = (data) => {
  return new Promise((resolve, reject) => {
    Customer.fetchCustomerByCredentials(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const password_match = (entered_password, db_password) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(entered_password, db_password, (error, response) => {
      if (error) {
        const Error = {
          status: "error",
          message: "Server Error",
          statusCode: 400,
        };
        reject(Error);
      }
      if (response == true) {
        resolve(response);
      } else {
        const Error = {
          status: "error",
          message: "Wrong username/password combination!",
          statusCode: 400,
        };
        reject(Error);
      }
    });
  });
};
const create_tokens = (customer_id) => {
  return new Promise((resolve, reject) => {
    //
    //creating access token and refresh token ------------STARTS+++++
    const accesstoken = accesstokencreation(customer_id);
    //console.log(accesstoken);
    const accesstokenexpiry = moment().add(1, "hours");
    //console.log(accesstokenexpiry);
    const refreshtoken = refreshtokencreation(customer_id);
    // console.log(refreshtoken);
    const refreshtokenexpiry = moment().add(1, "years");
    //console.log(refreshtokenexpiry);
    //creating access token and refresh token ------------ENDS+++++++
    //
    const response = {
      accesstoken: accesstoken,
      accesstokenexpiry: accesstokenexpiry,
      refreshtoken: refreshtoken,
      refreshtokenexpiry: refreshtokenexpiry,
    };
    resolve(response);
  });
};
const update_customer = (data) => {
  return new Promise((resolve, reject) => {
    Customer.update(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const fetch_customer = (data) => {
  return new Promise((resolve, reject) => {
    Customer.fetchCustomer(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const fetch_customer_addresses = (data) => {
  return new Promise((resolve, reject) => {
    Customer.fetchCustomerAddresses(data, (err, res) => {
      if (err) {
        resolve(); //bcz if no addresses still no issue so avoiding reject(err) here
      }
      resolve(res);
    });
  });
};
const encrypt_the_id = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const id = encrypttheid(data);
      if (id && id.length > 0) {
        resolve(id);
      } else {
        const Error = {
          status: "error",
          message: "Server Error",
          statusCode: 400,
        };
        reject(Error);
      }
    } catch (err) {
      const Error = {
        status: "error",
        message: "Server Error",
        statusCode: 400,
      };
      reject(Error);
    }
  });
};

//FUNCTIONS-----------------------------------------------------------------//

//NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
//
exports.LoginCustomerSocialMedia = async (req, res) => {
  //console.log(req.session);
  //console.log("Node-inside login ");
  //console.log(req);
  console.log(req.body);
  const media_type = req.body.media_type;
  const token_id = req.body.token_id;
  const email = req.body.email;

  if (
    media_type &&
    token_id &&
    email &&
    media_type.length > 0 &&
    token_id.length > 0 &&
    email.length > 0
  ) {
    // console.log("True");
    //
    const sql = con.query(
      "SELECT id from customers WHERE email=?",
      [email],
      (err, result) => {
        // console.log(result);
        if (err) {
          res.send({ err: err });
        }

        if (result && result.length > 0) {
          // console.log(result);
          console.log("customer exists");

          //create user token start--save that encrypted access token in db n cookie
          const tokencreated = usertokencreation(result);
          // console.log(tokencreated);
          //ends

          //ENCODE ID - userid and save that encoded in cookie
          const customerId = result[0].id;
          const encodedid = encrypttheid(customerId);
          //ends

          var ip =
            req.header("x-forwarded-for") || req.connection.remoteAddress;
          //console.log("IP ADDRESS-->" + ip);
          req.session.customers_id = encodedid;
          req.session.ipaddress = ip;
          // req.session.isAuth = true;
          req.session.accesstoken = tokencreated;
          req.session.login = true;
          // console.log(req.session);
          //save session id and user id in another table or same table
          const sessionID = req.sessionID; //session id used to save data in row
          //console.log(sessionID);
          const CustomeridTokenData = {
            customers_id: customerId,
            access_token: tokencreated,
            ipaddress: ip,
            entity: "Customer",
          };
          //  console.log(CustomeridTokenData);

          //start-11111
          setTimeout(function () {
            //const sql = con.query(
            con.query(
              "UPDATE sessions SET ? WHERE session_id=?",
              [CustomeridTokenData, sessionID],
              (err, result1) => {
                if (!err) {
                  //console.log(result1);
                  console.log("Record Updated wd token n customer id");
                } else {
                  console.log("ERRRRRRRRRRRRRRRRORRRRRRRRRR");
                }
              }
            );
            // console.log(sql.sql);
          }, 1000);

          //ends--11111
          //get details of customer------------STARTS
          const sql = con.query(
            "SELECT s.id, s.role_id, s.is_membership, CONCAT_WS(' ', s.first_Name, s.middle_Name, s.last_Name) as name, s.nick_name, s.description, s.gender, s.date_of_birth, s.phone, CONCAT('" +
              domainpath +
              "', s.image) as image, s.email, s.phone_verify, s.email_verify, from customers as s WHERE s.id=?",
            [customerId],
            async (err, result11) => {
              //  console.log("XXXXXXXXXX");
              //  console.log(result11);
              //  console.log("XXXXXXXXXX");

              if (err) {
                res.send({ err: err });
              } else {
                result11[0].id = encodedid; //customerid
                result11[0].session = sessionID; //session id
                //GET ADDRESSES----------------------------------------STARTS
                const sql = con.query(
                  "SELECT s.id, s.full_name, s.address_type, s.address_line_1, s.address_line_2, s.locality, s.postal_code, s.city, s.state, s.country, s.phone FROM addresses as s WHERE s.customers_id=?",
                  [customerId],
                  (err, response) => {
                    // console.log(response);
                    if (!err) {
                      if (response && response.length > 0) {
                        // console.log(response);
                        //removing row data packet-------------STARTS
                        var resultArray = Object.values(
                          JSON.parse(JSON.stringify(response))
                        );
                        //  console.log(resultArray);
                        //removing row data packet-------------ENDS
                        result11[0].addresses = resultArray;
                        const Response = {
                          status: "success",
                          responsedata: result11,
                          message: "login success CUSTOMER",
                        };
                        res.status(200).json(Response);
                      } else {
                        console.log("no data in address");
                        const Response = {
                          status: "success",
                          responsedata: result11,
                          message: "login success CUSTOMER",
                        };
                        res.status(200).json(Response);
                        // const Response = {
                        //   status: "error",
                        //   message: "no data in database",
                        // };
                        // res.status(203).json(Response);
                      }
                    } else {
                      console.log(err);
                      //console.log(err);
                      const Error = {
                        status: "error",
                        message: "Server Error",
                      };
                      // res.status(203).json(Error);
                    }
                  }
                );
                //  console.log(sql.sql);
                //GET ADDRESSES----------------------------------------ENDS
                // console.log(result11);
                // const Response = {
                //   status: "success",
                //   responsedata: result11,
                //   message: "login success CUSTOMER",
                // };
                // res.status(200).json(Response);
              }
              //console.log("loginsuccess");
            }
          );
          // console.log(sql.sql);
          //get details of customer------------ENDS
        } else {
          console.log("no customer");
          const Response = {
            message: "Customer doesn't exist",
          };
          res.status(203).json(Response);
          // console.log("Now Create new Customer");
          // Create New Customer -- SOCIAL MEDIA -- STARTS*********

          // Create New Customer -- SOCIAL MEDIA -- ENDS***********
        }
      }
    );
    console.log(sql.sql);
    //

    //mysql query ends here{
  } else {
    console.log("Invalid Credentials");
    const Response = {
      message: "Invalid Credentials",
    };
    res.status(203).json(Response);
  }
};
//-------------------------------------------------------------------------------------------------------------SOCIAL MEDIA LOGIN ------ENDS
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//Logout User

//-------------------------------------------------------------------------------------------------------------
//
//NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN

//CHECK IF USER ALREADY EXISTS ----WITH PHONE NUMBER/EMAIL FOR ADDING NEW USER----------------------------------------
exports.checkcustomeralready = (req, res) => {
  //console.log(req.body.postData.phone);
  //console.log(req.body.phone);
  // console.log("inside check user phone and email already");
  //console.log(req.body);
  const phone = req.body.phone; //9999988888
  const email = req.body.email;
  //console.log(phone);
  //console.log(email);

  if (phone && phone.toString().length > 0) {
    //console.log("checking");
    con.query(
      "SELECT id from customers WHERE phone=?",
      [phone],
      (err, response) => {
        //console.log(response);
        //console.log(response[0].id);
        //console.log(response.length);
        //----------------------------------------------------------------------------------------------
        if (!err) {
          if (response && response.length) {
            console.log("phone already exists");
            const encryptedid = encrypttheid(response[0].id);
            const Response = {
              userId: encryptedid,
              message: "phone", //Customer Already Exists with same phone
            };
            res.status(200).json(Response);
          }
          ////////////////////////////////////////////////////////
          else if (email && email.length > 0) {
            //No  PHONE found so now EMAIL check
            con.query(
              "SELECT id from customers WHERE email=?",
              [email],
              (err, response) => {
                //console.log(response);
                if (!err) {
                  if (response && response.length) {
                    console.log("email already exists");
                    const encryptedid = encrypttheid(response[0].id);
                    const Response = {
                      userId: encryptedid,
                      message: "email", //Customer Already Exists with same email
                    };
                    res.status(200).json(Response);
                  } else {
                    //no email found
                    console.log(" next () - no email no phone found in db");
                    const Response = {
                      message: "itsnewcustomer", //Customer Already Exists with same email
                    };
                    res.status(200).json(Response);
                  }
                } else {
                  console.log(err);
                  const Response = {
                    Error: err,
                  };
                  res.status(400).json(Response);
                }
              }
            );
          }
          ////////////////////////////////////////////////////////////////
          else {
            console.log("next2 -  no email no phone found in db");
            const Response = {
              message: "itsnewcustomer", //Customer Already Exists with same email
            };
            res.status(200).json(Response);
          }
        } else {
          console.log(err);
          const Response = {
            Error: err,
          };
          res.status(400).json(Response);
        }
        //-------------------------------------------------------------------------------------------------
      }
    );
  } else if (email && email.length > 0) {
    console.log("phone variable is having no length");

    //No  PHONE found so now EMAIL check
    con.query(
      "SELECT id from customers WHERE email=?",
      [email],
      (err, response) => {
        //console.log(response);
        if (!err) {
          if (response && response.length) {
            console.log("email already exists");
            const encryptedid = encrypttheid(response[0].id);
            const Response = {
              userId: encryptedid,
              message: "email", //Customer Already Exists with same email
            };
            res.status(200).json(Response);
          } else {
            //no email found
            console.log(" next () - no email no phone found in db");
            const Response = {
              message: "itsnewcustomer", //Customer Already Exists with same email
            };
            res.status(200).json(Response);
          }
        } else {
          console.log(err);
          const Response = {
            Error: err,
          };
          res.status(400).json(Response);
        }
      }
    );
  }
};

//--------------------------------------------------------------------------------------------

// Get all customers from database table --customers-DONE--------------------------------------------------------------
exports.GetAllCustomers = (req, res) => {
  con.query(
    "SELECT s.id, s.role_id, s.is_membership, CONCAT(s.first_Name, ' ', s.last_Name) AS fullname, s.nick_name, s.description, s.gender, s.date_of_birth, s.phone, s.image, s.email, s.phone_verify, s.email_verify, s.active, s.ipaddress, s.trash, s.created_at, s.updated_at, CONCAT(st.city,',',st.country) AS location  from customers as s LEFT JOIN addresses as st ON s.id = st.customers_id AND st.trash=0 WHERE s.trash = 0 ORDER BY `s`.`id` DESC",
    (err, response) => {
      if (!err) {
        if (response) {
          const Response = {
            status: "success",
            responsedata: { customers: response },
          };
          res.status(200).json(Response);
        }
      } else {
        console.log(err);
        const Error = { status: "error", message: "Server Error" };
        res.status(400).json(Error);
      }
    }
  );
};
//-------------------------------------------------------------------------------------------------------------
//Get a single customer by id --DONE-------------------------------------------------------------------------------
exports.GetCustomer = (req, res) => {
  // console.log(req.params.id);
  const encryptedid = req.params.id;
  const customerId = decodetheid(encryptedid);
  // const customerId = req.params.id;
  var data;
  const sql = con.query(
    "SELECT s.id, s.role_id, s.is_membership, s.media_type, s.token_id, s.device_id, CONCAT_WS(' ', s.first_Name, s.middle_Name, s.last_Name) as name, s.first_Name, s.middle_Name, s.last_Name, s.nick_name, s.description, s.gender, s.date_of_birth, s.phone, CONCAT('" +
      domainpath +
      "', s.image) as image, s.email, s.phone_verify, s.email_verify, s.verification_code, s.slug, s.active, s.latitude, s.longitude, s.locality, s.city, s.state, s.state, s.country, s.ipaddress, s.trash, s.created_at, s.updated_at from customers as s WHERE s.id=?",
    [customerId],
    (err, response) => {
      // console.log(response);
      if (!err) {
        if (response && response.length > 0) {
          // //removing row data packet-------------STARTS
          var resultArray = Object.values(JSON.parse(JSON.stringify(response)));
          // console.log(resultArray);
          // //removing row data packet-------------ENDS
          data = resultArray;
          // console.log(data);
          //GET ADDRESSES----------------------------------------STARTS
          const sql = con.query(
            "SELECT s.id, s.full_name, s.address_type, s.address_line_1, s.address_line_2, s.locality, s.postal_code, s.city, s.state, s.country, s.phone FROM addresses as s WHERE s.customers_id=?",
            [customerId],
            (err, response1) => {
              //  console.log(response1);
              if (!err) {
                if (response1 && response1.length > 0) {
                  // console.log(response);
                  //removing row data packet-------------STARTS
                  var resultArray1 = Object.values(
                    JSON.parse(JSON.stringify(response1))
                  );
                  console.log(resultArray1);
                  //removing row data packet-------------ENDS
                  data[0].addresses = resultArray1;

                  // console.log(data);
                  // let o = Object.fromEntries(
                  //   Object.entries(data[0]).filter(([_, v]) => v != null)
                  // );
                  const Response = {
                    status: "success",
                    responsedata: { customer: data },
                  };
                  res.status(200).json(Response);
                } else {
                  console.log("no data in address");
                  //so print customer data only
                  // let o = Object.fromEntries(
                  //   Object.entries(data[0]).filter(([_, v]) => v != null)
                  // );
                  const Response = {
                    status: "success",
                    responsedata: { customer: data },
                  };
                  res.status(200).json(Response);
                  // const Response = {
                  //   status: "error",
                  //   message: "no data in database",
                  // };
                  // res.status(203).json(Response);
                }
              } else {
                console.log("Address query error");
                console.log(err);
                //console.log(err);
                const Error = { status: "error", message: "Server Error" };
                // res.status(203).json(Error);
              }
            }
          );
          console.log(sql.sql);
          //GET ADDRESSES----------------------------------------ENDS
        } else {
          const Response = {
            status: "error",
            message: "no data in database",
          };
          res.status(204).json(Response);
        }
      } else {
        console.log(err);
        const Error = { status: "error", message: "Server Error" };
        res.status(400).json(Error);
      }
    }
  );
  console.log(sql.sql);
};
//-----------------------------------------------------------------------------------------------------------
// Add a customer  into database table --users-DONE--------------------------------------------------------------
exports.CreateCustomer = (req, res) => {
  //  console.log("inside createuser node");
  const data = req.body; //FOR BROWSER
  //const data = req.body; //FOR POSTMAN
  //  console.log(data);

  //HASHING password AND STORING all data into db
  const password = data.password;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      const Error = { status: "error", message: "Server Error" };
      res.status(400).json(Error);
    } else {
      //inserting new value into object key passwordHash
      data["password"] = hash;
      //console.log(data);

      let filteredData = Object.fromEntries(
        Object.entries(data).filter(
          ([_, v]) => v != "null" && v != "" && v != null
        )
      );
      //  console.log(filteredData);
      //IF EMAIL IS EMPTY THEN WE HAVE TO MAKE IT NULL BCZ IT IS UNIQUE IN TABLE
      // if (data.email == "") {
      //   delete data.email;
      // }
      //console.log(data);
      con.query(
        "INSERT INTO customers SET ?",
        [filteredData],
        (err, result) => {
          //console.log(err);
          if (!err) {
            // console.log("inside insert");
            //res.json("Registered Successfully");

            //1--finding id of last record inserted and then finding that data from mysql and sending that data to url to show inpostman
            const LastID = result.insertId;
            // console.log(LastID);
            con.query(
              "SELECT id, CONCAT(first_Name, ' ', last_Name) AS fullname, nick_name, description, role_id, phone, email, phone_verify, email_verify, active, created_at from customers WHERE id=?",
              [LastID],
              (err, response) => {
                if (!err) {
                  var customer = {};
                  const encryptedid = encrypttheid(response[0].id);
                  customer["fullname"] = response[0].fullname;
                  customer["encryptedid"] = encryptedid;

                  const Response = {
                    customer: customer,
                    message: "Customer Created Successfully",
                  };
                  //res.append("Warning", "54545545 Miscellaneous warning"); //testing additional custome headers into browser
                  res.status(201).json(Response);
                } else {
                  const Error = { message: err };
                  res.status(400).json(Error);
                }
              }
            );
            //end--1
            //end--1
          } else {
            // console.log("inside error");
            const Error = { message: err };
            res.status(400).json(Error);
          }
        }
      );
    }
  });
};
//-----------------------------------------------------------------------------------------------------------------
// Add a customer  into database table --users-DONE--------------------------------------------------------------
exports.CreateCustomerS = (req, res) => {
  //  console.log("inside createuser node");
  const data = req.body; //FOR BROWSER
  //const data = req.body; //FOR POSTMAN
  //console.log(data);
  const media_type = req.body.media_type;
  const token_id = req.body.token_id;
  const email = req.body.email;
  const first_Name = req.body.first_Name;
  const last_Name = req.body.last_Name;
  const phone = req.body.phone;

  if (
    media_type &&
    token_id &&
    email &&
    first_Name &&
    last_Name &&
    phone &&
    media_type.length > 0 &&
    token_id.length > 0 &&
    email.length > 0 &&
    first_Name.length > 0 &&
    last_Name.length > 0 &&
    phone > 0
  ) {
    //HASHING password AND STORING all data into db
    const password = data.token_id;
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.log(err);
        const Error = { status: "error", message: "Server Error" };
        res.status(400).json(Error);
      } else {
        //inserting new value into object key passwordHash
        data["password"] = hash;
        //console.log(data);

        let filteredData = Object.fromEntries(
          Object.entries(data).filter(
            ([_, v]) => v != "null" && v != "" && v != null
          )
        );
        //  console.log(filteredData);
        //IF EMAIL IS EMPTY THEN WE HAVE TO MAKE IT NULL BCZ IT IS UNIQUE IN TABLE
        // if (data.email == "") {
        //   delete data.email;
        // }
        //console.log(data);
        con.query(
          "INSERT INTO customers SET ?",
          [filteredData],
          (err, result) => {
            //console.log(err);
            if (!err) {
              // console.log("inside insert");
              //res.json("Registered Successfully");

              //1--finding id of last record inserted and then finding that data from mysql and sending that data to url to show inpostman
              const LastID = result.insertId;
              // console.log(LastID);
              con.query(
                "SELECT id, CONCAT(first_Name, ' ', last_Name) AS fullname, nick_name, description, role_id, phone, email, phone_verify, email_verify, media_type, token_id, active from customers WHERE id=?",
                [LastID],
                (err, response) => {
                  if (!err) {
                    var customer = {};
                    const encryptedid = encrypttheid(response[0].id);
                    customer["fullname"] = response[0].fullname;
                    customer["encryptedid"] = encryptedid;

                    const Response = {
                      customer: customer,
                      message: "Customer Created Successfully",
                    };
                    //res.append("Warning", "54545545 Miscellaneous warning"); //testing additional custome headers into browser
                    res.status(201).json(Response);
                  } else {
                    const Error = { message: err };
                    res.status(400).json(Error);
                  }
                }
              );
              //end--1
              //end--1
            } else {
              // console.log("inside error");
              console.log("ERRRRRRRRRRRRRRRRORRRRRRRRRR");
              console.log(err);
              const Error = { message: "Server Error" };
              res.status(400).json(Error);
            }
          }
        );
      }
    });
  } else {
    console.log("Invalid Credentials");
    const Response = {
      message: "Invalid Credentials",
    };
    res.status(203).json(Response);
  }
};
//-----------------------------------------------------------------------------------------------------------------
// UPDATE a customer  in database table --customers)--------------------------
exports.UpdateCustomer = (req, res) => {
  console.log("Inside updatecustomer");
  console.log(req.body);
  const data = req.body;

  const encryptedid = req.params.id;
  const customerId = decodetheid(encryptedid);

  //console.log(data);
  //console.log(customerId);
  let filteredData = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v != "null" && v != "" && v != null)
  );
  //console.log(filteredData);
  //
  const sql = con.query(
    "UPDATE customers SET ? WHERE id=?",
    [filteredData, customerId],
    (err, result) => {
      // console.log(err);
      //console.log("inside query after execution");
      if (!err) {
        console.log("inside query no eror--LLLLLLLLLLLLLL");
        //res.json("Updated Successfully");
        //1--START- FETCHING data by id of record updated
        con.query(
          "SELECT * FROM customers WHERE id=?",
          [customerId],
          (err, response) => {
            if (!err) {
              console.log("no error mysql");
              // if (data.deleted == 1) {
              //   const Response = {
              //     status: "success",
              //     data: { message: "Customer Disabled Successfully" },
              //   };
              //   res.status(200).json(Response);
              // } else {
              const Response = {
                status: "success",
                // responsedata: { customer: response },
              };
              return res.status(200).json(Response); //
              // }
            } else {
              console.log("ERRRRRRRRRRRRRRRRORRRRRRRRRR");
              console.log(err);
              const Error = { status: "error", message: "Server Error" };
              res.status(400).json(Error);
            }
          }
        );
        //end--1
      } else {
        console.log("ERRRRRRRRRRRRRRRRORRRRRRRRRR");
        console.log(err);
        const Error = { status: "error", message: "Server Error" };
        res.status(400).json(Error);
      }
    }
  );
  console.log(sql.sql);
};

//-----------------------------------------------------------------------------------------------------------------
//
// DELETE a customer in database table --customers--------------------------------------------------
exports.DeleteCustomer = (req, res) => {
  //console.log("inside del customer");
  //console.log(req);

  const encryptedid = req.params.id;
  const customerId = decodetheid(encryptedid);
  // console.log(customerId);

  //con.query("DELETE FROM customers WHERE id=?",[customerId], //del permanently
  con.query(
    "UPDATE customers SET trash = 1 WHERE id=?", //only update variable trash n hide
    [customerId],
    (err, response) => {
      if (!err) {
        const Response = {
          status: "success",
          data: { message: "customer deleted permanently" },
        };
        res.status(200).json(Response);
      } else {
        console.log(err);
        const Error = { status: "error", message: "Server Error" };
        res.status(400).json(Error);
      }
    }
  );
};
//-----------------------------------------------------------------------------------------------------------------

// Add a customer  into database table --customers-DONE--------------------------------------------------------------
exports.PasswordUpdate = (req, res) => {
  //  console.log("inside password update node");
  //console.log(req);
  // console.log("XXX---Data coming from request---XXX");
  // console.log(req.params.id);
  // console.log("XXX---Data coming from request---XXX");
  const encryptedid = req.params.id;
  //console.log(req.body.data.password);
  const password = req.body.password;
  if (
    encryptedid &&
    encryptedid.length > 0 &&
    password &&
    password.length > 0
  ) {
    const customerIdUFP = decodetheid(encryptedid); //decrypted id now
    if (customerIdUFP && customerIdUFP > 0) {
      var data = {};
      //HASHING password AND STORING all data into db

      bcrypt.hash(password, 10, (err, hash) => {
        if (!err) {
          //inserting new value into object key passwordHash
          data["password"] = hash;
          //console.log(data);

          //var sql = con.query(
          con.query(
            "UPDATE customers SET ? WHERE id=?",
            [data, customerIdUFP],
            (err, result) => {
              //console.log(err);
              if (!err) {
                if (result && result.affectedRows > 0) {
                  // console.log("inside insert");
                  //res.json("Password Updated Successfully");
                  // console.log(response);
                  const Response = {
                    //customer: response,
                    message: "Password Updated Successfully",
                  };
                  res.status(201).json(Response);
                } else {
                  console.log(err);
                  const Error = { status: "error", message: "Server Error" };
                  res.status(400).json(Error);
                }
              } else {
                console.log(err);
                const Error = { status: "error", message: "Server Error" };
                res.status(400).json(Error);
              }
            }
          );
          //console.log(sql.sql);
        } else {
          console.log(err);
          const Error = { status: "error", message: "Server Error" };
          res.status(400).json(Error);
        }
      });
    } else {
      const Error = { status: "error", message: "Invalid Details" };
      res.status(400).json(Error);
    }
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
//-----------------------------------------------------------------------------------------------------------------
//CHECK OLD PASSWORD++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
exports.CheckOldPassword = async (req, res) => {
  console.log("Inside CheckOldPassword Node");
  //console.log(req);
  // console.log("XXX---Data coming from request---XXX");
  // console.log(req.params.id);
  // console.log("XXX---Data coming from request---XXX");
  const encryptedid = req.params.id;
  //console.log(req.body.data.password);
  const password = req.body.password;
  if (
    encryptedid &&
    encryptedid.length > 0 &&
    password &&
    password.length > 0
  ) {
    const customerIdUFP = decodetheid(encryptedid); //decrypted id now
    if (customerIdUFP && customerIdUFP > 0) {
      //
      con.query(
        "SELECT id, password FROM customers WHERE id=?",
        [customerIdUFP],
        (err, result) => {
          //console.log(result);
          if (!err) {
            if (result && result.length > 0) {
              //console.log("user exists");
              //console.log(result);
              bcrypt.compare(
                password,
                result[0].password,
                (error, response) => {
                  //console.log(response);
                  if (response == true) {
                    //console.log(response); //true
                    //console.log(req.body);
                    const encryptedid = encrypttheid(result[0].id);
                    const Response = {
                      customerid: encryptedid,
                      message: "Old Password Correct",
                    };
                    //console.log("loginsuccess");
                    res.status(200).json(Response);
                  } else {
                    const Response = {
                      message: "!!!!!Old Password Incorrect",
                    };
                    res.status(203).json(Response);
                  }
                }
              );
            } else {
              //console.log("password not found - customer dont exists");
              const Error = {
                status: "error",
                message: "Password not found - Customer doesn't exist",
              };
              res.status(204).json(Error);
            }
          } else {
            console.log(err);
            const Error = { status: "error", message: "Server Error" };
            res.status(400).json(Error);
          }
        }
      );
    } else {
      const Error = { status: "error", message: "Invalid Details" };
      res.status(400).json(Error);
    }
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
  //////////////////////////////////////////////check for id in url or not-----------------------------
  // async function getcustomerid(encryptedid) {
  //   if (encryptedid === "null") {
  //     console.log("no id sent now fetch from session");
  //     //console.log(req.session.users_id);
  //     const customerid = req.session.customers_id;
  //     const customerIdUFP = decodetheid(customerid); //decrypted id now
  //     return customerIdUFP;
  //     //console.log(customerIdUFP);
  //   } else {
  //     console.log("id sent in url");
  //     const customerIdUFP = decodetheid(encryptedid); //decrypted id now
  //     //console.log(customerIdUFP);
  //     return customerIdUFP;
  //   }
  // }
  // //////////////////////////////////////////////ENDS----------------------------------------------------
};
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//
//-----------------------------------------------------------------------------------------------------------
//VerifyCodeAccountVerification++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++STARTS
exports.VerifyCodeAccountVerification = async (req, res) => {
  console.log("Inside VerifyCodeAccountVerification");
  //console.log(req);

  const encryptedid = req.params.id;
  const customerId = decodetheid(encryptedid);
  console.log(customerId);
  const enteredOTP = req.body.otpcode;
  console.log(enteredOTP);

  //1-st Get Customer Data-----------------------------------------------------------------------STARTS
  con.query(
    "SELECT verification_code, updated_at from customers WHERE id=?",
    [customerId],
    (err, response) => {
      //   console.log(response);
      if (!err) {
        if (response && response.length > 0) {
          const uptimevcodesavedindb = response[0].updated_at; //TIME wn VCODE was generated and saved in db
          //  console.log(uptimevcodesavedindb);

          const verificationcode = response[0].verification_code;
          // console.log(verificationcode);
          // var dateThen = moment(uptimevcodesavedindb).format('DD/MM/YY HH:mm:ss');
          var dateThen = new moment(uptimevcodesavedindb);
          // console.log(moment(uptimevcodesavedindb).format('DD/MM/YY HH:mm:ss'));
          //var dateNow = moment().format('DD/MM/YY HH:mm:ss');
          var dateNow = new moment();
          // console.log(moment().format('DD/MM/YY HH:mm:ss')); //CURRENT TIME
          //CALCULATE DIFF bw two timestamps
          var difference = moment.duration(dateNow.diff(dateThen));
          //console.log(difference._milliseconds);
          var diffinmilli = difference._milliseconds;

          //&&&&&&&&&&&&&&&&&&&&&&----check for valid otp---&&&&&&&&&&&&&&&&&&&&&&&&&---STARTS
          if (verificationcode == enteredOTP) {
            //++++++++++++++check 5min time++++++++++++++++++++++++++++++++STARTS
            if (diffinmilli < 300000) {
              console.log("Otp Verified now set active");
              // const Response = {
              //   status: "success",
              //   message:
              //     "OTP Validation Successful. Proceeding to Dashboard Page",
              // };
              // res.status(200).json(Response);
              //set active=1 in db+++++++++++++++++++++++++++++++++++++++++++STARTS
              var updateActiveData = {};
              updateActiveData["active"] = 1;
              const sql = con.query(
                "UPDATE customers SET ? WHERE id=?",
                [updateActiveData, customerId],
                (err, result) => {
                  // console.log(err);
                  //console.log("inside query after execution");
                  if (!err) {
                    if (result && result.affectedRows > 0) {
                      console.log("inside query no eror--LLLLLLLLLLLLLL");
                      console.log("resp bck --set active done in db");
                      const Response = {
                        status: "success",
                        message:
                          "OTP Validation Successful. Account is Verified Now.",
                      };
                      res.status(200).json(Response); //
                      //end--1
                    } else {
                      console.log(err);
                      const Error = {
                        status: "error",
                        message: "Server Error",
                      };
                      res.status(400).json(Error);
                    }
                  } else {
                    console.log(err);
                    const Error = { status: "error", message: "Server Error" };
                    res.status(400).json(Error);
                  }
                }
              );
              console.log(sql.sql);
              //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ENDS
            } else {
              const Error = {
                status: "error",
                message: "OTP Expired!!. Resend New OTP",
              };
              res.status(400).json(Error);
            }
            //++++++++++check 5min time++++++++++++++++++++++++++++++++++++++ENDS
          } else {
            const Error = {
              status: "error",
              message: "Invalid OTP entered.",
            };
            res.status(400).json(Error);
          }
          //&&&&&&&&&&&&&&&&&&&&&&----check for valid otp---&&&&&&&&&&&&&&&&&&&&&&&&&---ENDS
        } else {
          const Response = {
            status: "error",
            message: "no data in database",
          };
          res.status(204).json(Response);
        }
      } else {
        console.log(err);
        const Error = { status: "error", message: "Server Error" };
        res.status(400).json(Error);
      }
    }
  );
  //1-st Get Customer Data-----------------------------------------------------------------------ENDS
};
//VerifyCodeAccountVerification++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ENDS
//VerifyCodeForgotPassword++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++STARTS
exports.VerifyCodeForgotPassword = async (req, res) => {
  console.log("Inside VerifyCodeForgotPassword");
  //console.log(req);

  const encryptedid = req.params.id;
  const customerId = decodetheid(encryptedid);
  console.log(customerId);
  const enteredOTP = req.body.otpcode;
  console.log(enteredOTP);

  //1-st Get Customer Data-----------------------------------------------------------------------STARTS
  con.query(
    "SELECT verification_code, updated_at from customers WHERE id=?",
    [customerId],
    (err, response) => {
      //   console.log(response);
      if (!err) {
        if (response && response.length > 0) {
          const uptimevcodesavedindb = response[0].updated_at; //TIME wn VCODE was generated and saved in db
          //  console.log(uptimevcodesavedindb);

          const verificationcode = response[0].verification_code;
          // console.log(verificationcode);
          // var dateThen = moment(uptimevcodesavedindb).format('DD/MM/YY HH:mm:ss');
          var dateThen = new moment(uptimevcodesavedindb);
          // console.log(moment(uptimevcodesavedindb).format('DD/MM/YY HH:mm:ss'));
          //var dateNow = moment().format('DD/MM/YY HH:mm:ss');
          var dateNow = new moment();
          // console.log(moment().format('DD/MM/YY HH:mm:ss')); //CURRENT TIME
          //CALCULATE DIFF bw two timestamps
          var difference = moment.duration(dateNow.diff(dateThen));
          //console.log(difference._milliseconds);
          var diffinmilli = difference._milliseconds;

          //&&&&&&&&&&&&&&&&&&&&&&----check for valid otp---&&&&&&&&&&&&&&&&&&&&&&&&&---STARTS
          if (verificationcode == enteredOTP) {
            //++++++++++++++check 5min time++++++++++++++++++++++++++++++++STARTS
            if (diffinmilli < 300000) {
              console.log("Otp Verified now set active = 1");
              const Response = {
                status: "success",
                message: "OTP Validation Successful.",
              };
              res.status(200).json(Response);
              // //set active=1 in db+++++++++++++++++++++++++++++++++++++++++++STARTS
              // var updateActiveData = {};
              // updateActiveData["active"] = 1;
              // const sql = con.query(
              //   "UPDATE customers SET ? WHERE id=?",
              //   [updateActiveData, customerId],
              //   (err, result) => {
              //     // console.log(err);
              //     //console.log("inside query after execution");
              //     if (!err) {
              //       if (result && result.affectedRows > 0) {
              //         console.log("inside query no eror--LLLLLLLLLLLLLL");
              //         console.log("resp bck --set active done in db");
              //         const Response = {
              //           status: "success",
              //           message:
              //             "OTP Validation Successful. Account is Verified Now.",
              //         };
              //         res.status(200).json(Response); //
              //         //end--1
              //       } else {
              //         console.log(err);
              //         const Error = {
              //           status: "error",
              //           message: "Server Error",
              //         };
              //         res.status(400).json(Error);
              //       }
              //     } else {
              //       console.log(err);
              //       const Error = { status: "error", message: "Server Error" };
              //       res.status(400).json(Error);
              //     }
              //   }
              // );
              // console.log(sql.sql);
              // //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ENDS
            } else {
              const Error = {
                status: "error",
                message: "OTP Expired!!. Resend New OTP",
              };
              res.status(400).json(Error);
            }
            //++++++++++check 5min time++++++++++++++++++++++++++++++++++++++ENDS
          } else {
            const Error = {
              status: "error",
              message: "Invalid OTP entered.",
            };
            res.status(400).json(Error);
          }
          //&&&&&&&&&&&&&&&&&&&&&&----check for valid otp---&&&&&&&&&&&&&&&&&&&&&&&&&---ENDS
        } else {
          const Response = {
            status: "error",
            message: "no data in database",
          };
          res.status(204).json(Response);
        }
      } else {
        console.log(err);
        const Error = { status: "error", message: "Server Error" };
        res.status(400).json(Error);
      }
    }
  );
  //1-st Get Customer Data-----------------------------------------------------------------------ENDS
};
//VerifyCodeForgotPassword++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ENDS
//
//
// PASSWORD FORGOT - SEND EMAIL - WITH VERIFICATION CODE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
exports.CustomerVerificationCodeEmail = (req, res) => {
  console.log("inside customer verification code send email");
  //console.log(req);

  const encryptedid = req.params.id;
  const userIdFP = decodetheid(encryptedid); //decrypted id now
  // console.log(userIdFP);

  con.query(
    "SELECT id, first_Name, last_Name, nick_name, phone, email FROM customers WHERE id=?",
    [userIdFP],
    async (err, response) => {
      if (!err) {
        //DATA
        // console.log(response);
        //generate otp using function starts---------------------------
        const verificationcode = generateVerificationCodePF();
        //generate otp using function ends---------------------------

        const fulname = response[0].first_Name + " " + response[0].last_Name;
        const emailto = response[0].email;

        const output = `
        <p>Hello, ${fulname},
        you have requested for Forgot Password, and following that you are sent this email.</p>
        <h3>Below is the Details of 6 digit pin you can use to rest your password</h3>
        <h3>Carefully read the otp and enter on the screen from where you asked for forgot password option</h3>
        <p>${verificationcode}</p>
        <p>This is a auto-generated email. Please do not reply to this email.</p>
        `;

        let mailOptions = {
          from: '"EZMOOV " <khushvirsingh@ajivainfotech.com>', // sender address
          to: emailto, // list of receivers
          subject: "Intimation Account Settings", // Subject line
          text: "Password Change Request", // plain text body
          html: output, // html body
        };

        let transporter = nodemailer.createTransport({
          host: "ajivainfotech.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: "khushvirsingh@ajivainfotech.com", // generated ethereal user
            pass: "Welcome@12", // generated ethereal password
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
        //

        response[0]["mailOptions"] = mailOptions;
        response[0]["transporter"] = transporter;

        //send email starts-----------------------------------------
        async function check() {
          // console.log("before waiting");
          //await testAsync();
          let resp = await sendemail(response);
          //console.log(resp);
          // console.log("After waiting");
          if (resp == "success") {
            const Response = {
              status: "success",
              responsedata: {
                message: "Email Successfully Sent",
                verification_code: verificationcode,
              },
            };
            return res.status(200).json(Response);
          } else if (resp == "failure") {
            console.log(err);
            const Error = { status: "error", message: "Server Error" };
            return res.status(400).json(Error);
          }
        }
        check();
        //send email ends -----------------------------------------
      } else {
        console.log(err);
        const Error = { status: "error", message: "Server Error" };
        res.status(400).json(Error);
      }
    }
  );
};
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ACCOUNT VERIFICATION CODE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
exports.CustomerAccountVerificationCodeEmail = (req, res) => {
  console.log("inside customer account verification code send email");
  //console.log(req);

  const encryptedid = req.params.id;
  const userIdFP = decodetheid(encryptedid); //decrypted id now
  // console.log(userIdFP);

  con.query(
    "SELECT id, first_Name, last_Name, nick_name, phone, email FROM customers WHERE id=?",
    [userIdFP],
    async (err, response) => {
      if (!err) {
        //DATA
        // console.log(response);
        //generate otp using function starts---------------------------
        const verificationcode = generateVerificationCodePF();
        //generate otp using function ends---------------------------

        const fulname = response[0].first_Name + " " + response[0].last_Name;
        const emailto = response[0].email;

        const output = `
        <p>Hello, ${fulname},
        you have requested for Account Verification and following that you are sent this email.</p>
        <h3>Below is the Details of 6 digit pin you can use to verify your account</h3>
        <h3>Carefully read the otp and enter on the screen from where you asked for Account Verificaton</h3>
        <p>${verificationcode}</p>
        <p>This is a auto-generated email. Please do not reply to this email.</p>
        `;

        let mailOptions = {
          from: '"EZMOOV " <khushvirsingh@ajivainfotech.com>', // sender address
          to: emailto, // list of receivers
          subject: "Intimation Account Settings", // Subject line
          text: "Account Verification Request", // plain text body
          html: output, // html body
        };

        let transporter = nodemailer.createTransport({
          host: "ajivainfotech.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: "khushvirsingh@ajivainfotech.com", // generated ethereal user
            pass: "Welcome@12", // generated ethereal password
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
        //

        response[0]["mailOptions"] = mailOptions;
        response[0]["transporter"] = transporter;

        //send email starts-----------------------------------------
        async function check() {
          // console.log("before waiting");
          //await testAsync();
          let resp = await sendemail(response);
          //console.log(resp);
          // console.log("After waiting");
          if (resp == "success") {
            const Response = {
              status: "success",
              responsedata: {
                message: "Email Successfully Sent",
                verification_code: verificationcode,
              },
            };
            return res.status(200).json(Response);
          } else if (resp == "failure") {
            console.log(err);
            const Error = { status: "error", message: "Server Error" };
            return res.status(400).json(Error);
          }
        }
        check();
        //send email ends -----------------------------------------
      } else {
        console.log(err);
        const Error = { status: "error", message: "Server Error" };
        res.status(400).json(Error);
      }
    }
  );
};
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// PASSWORD CHANGED SUCCESSFULLY - SEND EMAIL TO NOTIFY=========================================================
exports.CustomerPasswordChangedEmail = (req, res) => {
  console.log("inside password changed successfully");
  //console.log(req);

  const encryptedid = req.params.id;
  const customerIdFP = decodetheid(encryptedid); //decrypted id now
  // console.log(userIdFP);

  con.query(
    "SELECT id, first_Name, last_Name, nick_name, phone, email FROM customers WHERE id=?",
    [customerIdFP],
    async (err, response) => {
      if (!err) {
        //DATA
        //console.log(response);
        const fulname = response[0].first_Name + " " + response[0].last_Name;
        const emailto = response[0].email;

        const output = `
<p>Hello, ${fulname},
you have changed your Password Successfully.</p>
<h3>If you are not aware of this change. Please contact our support team on below details:</h3>
<h3>Contact: +91-9898989898</h3>
<h3>Email: care@ezmoov.com</h3>
<p>This is a auto-generated email. Please do not reply to this email.</p>
`;

        let mailOptions = {
          from: '"EZMOOV " <khushvirsingh@ajivainfotech.com>', // sender address
          to: emailto, // list of receivers
          subject: "Intimation Account Settings", // Subject line
          text: "Password Changed Successfully", // plain text body
          html: output, // html body
        };

        let transporter = nodemailer.createTransport({
          host: "ajivainfotech.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: "khushvirsingh@ajivainfotech.com", // generated ethereal user
            pass: "Welcome@12", // generated ethereal password
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
        //

        response[0]["mailOptions"] = mailOptions;
        response[0]["transporter"] = transporter;

        //send email starts-----------------------------------------
        async function check() {
          // console.log("before waiting");
          //await testAsync();
          let resp = await sendemail(response);
          //console.log(resp);
          // console.log("After waiting");
          if (resp == "success") {
            const Response = {
              status: "success",
              responsedata: {
                message: "Email Successfully Sent",
              },
            };
            return res.status(200).json(Response);
          } else if (resp == "failure") {
            console.log(err);
            const Error = { status: "error", message: "Server Error" };
            return res.status(400).json(Error);
          }
        }
        check();
        //send email ends -----------------------------------------
      } else {
        console.log(err);
        const Error = { status: "error", message: "Server Error" };
        res.status(400).json(Error);
      }
    }
  );
};
//=============================================================================================================

//NEW CUSTOMER CREATED - SEND EMAIL*********************************************************************************
exports.CustomerCreated = (req, res) => {
  console.log("email customer - new account created successfully");
  //console.log(req);

  const encryptedid = req.params.id;
  const userIdFP = decodetheid(encryptedid); //decrypted id now
  //console.log(userIdFP);

  con.query(
    "SELECT id, first_Name, last_Name, nick_name, phone, email FROM customers WHERE id=?",
    [userIdFP],
    async (err, response) => {
      if (!err) {
        //DATA
        // console.log(response);
        const fulname = response[0].first_Name + " " + response[0].last_Name;
        const emailto = response[0].email;

        const output = `
<p>Hello, ${fulname},
your account has been created Successfully.</p>
<p>You are welcomed to our Foodapp Family</p>
<h3>If you are not aware of this change. Please contact our support team on below details:</h3>
<h3>Contact: +91-9898989898</h3>
<h3>Email: care@ezmoov.com</h3>
<p>This is a auto-generated email. Please do not reply to this email.</p>
`;

        let mailOptions = {
          from: '"EZMOOV " <khushvirsingh@ajivainfotech.com>', // sender address
          to: emailto, // list of receivers
          //to: "khushvirsgl@gmail.com",   //for checking purpose only
          subject: "Intimation Account Creation", // Subject line
          text: "Account Created Successfully", // plain text body
          html: output, // html body
        };

        let transporter = nodemailer.createTransport({
          host: "ajivainfotech.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: "khushvirsingh@ajivainfotech.com", // generated ethereal user
            pass: "Welcome@12", // generated ethereal password
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
        //

        response[0]["mailOptions"] = mailOptions;
        response[0]["transporter"] = transporter;

        //send email starts-----------------------------------------
        async function check() {
          // console.log("before waiting");
          //await testAsync();
          let resp = await sendemail(response);
          //console.log(resp);
          // console.log("After waiting");
          if (resp == "success") {
            const Response = {
              status: "success",
              responsedata: {
                message: "Email Successfully Sent",
              },
            };
            return res.status(200).json(Response);
          } else if (resp == "failure") {
            console.log(err);
            const Error = { status: "error", message: "Server Error" };
            return res.status(400).json(Error);
          }
        }
        check();
        //send email ends -----------------------------------------
      } else {
        console.log(err);
        const Error = { status: "error", message: "Server Error" };
        res.status(400).json(Error);
      }
    }
  );
};
//*************************************************************************************************************
//
//NEW OrderSuccessCustomer - SEND EMAIL*********************************************************************************
exports.OrderSuccessCustomer = (req, res) => {
  console.log("inside - email OrderSuccess");
  console.log(req.body);
  const response = req.body.response;

  const order_id = response[0].order_id;
  const order_status = response[0].order_status;
  //const payment_status = response[0].transaction_status;
  //receiver details---starts+++++++++++++++++++++++++++++
  const name = response[0].receiver_info.name;
  const email_id = response[0].receiver_info.email_id;
  //receiver details---ends+++++++++++++++++++++++++++++++
  //shipping data---starts---------------------------------------------------------------
  var shipping_1;
  if (response[0].shipping_info.hasOwnProperty("shipping_address_line2")) {
    shipping_1 = `${response[0].shipping_info.shipping_address_line1}, ${response[0].shipping_info.shipping_address_line2}`;
  } else {
    shipping_1 = response[0].shipping_info.shipping_address_line1;
  }
  const shipping_2 = `${response[0].shipping_info.shipping_locality}, ${response[0].shipping_info.shipping_city}, ${response[0].shipping_info.shipping_state}`;

  const shipping_3 = `${response[0].shipping_info.shipping_country}, ${response[0].shipping_info.shipping_zipcode}`;
  //shipping data---ends-----------------------------------------------------------------

  const store_type = response[0].store[0].store_type;
  //
  const subtotal = response[0].subtotal;
  const total = response[0].total;
  //
  const items_len = response[0].store[0].items.length;
  const items = response[0].store[0].items;
  //optional
  if (
    store_type &&
    store_type > 0 &&
    order_id &&
    order_id > 0 &&
    name &&
    name.length > 0 &&
    email_id &&
    email_id.length > 0 &&
    shipping_1 &&
    shipping_1.length > 0 &&
    shipping_2 &&
    shipping_2.length > 0 &&
    shipping_3 &&
    shipping_3.length > 0 &&
    order_status &&
    order_status.length > 0 &&
    subtotal &&
    subtotal > 0 &&
    total &&
    total > 0 &&
    items_len &&
    items_len > 0
  ) {
    //DATA
    if (store_type == 1) {
      console.log("Restaurant Email Template");
      // const emailto = "khushvirajiva@gmail.com"; //comment after testing and email_id uncommentdown
      const store_name = response[0].store[0].store_name;
      const store_address = response[0].store[0].store_address;

      //
      var output = `<html>
      <head>
      <title>order</title>
      <style>
      body {
        margin:0;
        padding:0;
      }
      @media (max-width: 900px) {
      table {
          width: 90%!important;
          padding: 0 20px 0 20px;
      }
      }
      </style>
      </head>
      <body>
      <table style="width:100%;background:#f6f6f6;">
        <tr>
          <td>
            <div class="container"style="width:900px;margin:0px auto;">
              <img style="max-width: 480px;margin-left: 289px;margin-bottom: 40px;margin-top: 40px;" src="http://ezmoov.com:3000/static/media/ezmoov_white.new.41092f9f.png">
                <hr>
                <p style="text-align:left;font-size:20px;color:#717a8a;">Thanks For Choosing Ezmoov, ${name}! Your Payment for order succeded for which details are below</p1>
              <div class="column"style="display:flex">
                <h2 style="text-align:left;">Order No:<br>${order_id}</h2>
                <h2 style="text-align:center;margin-left:70px;">Restaurant<br>${store_name}</h2>
              </div>
             <p style="text-align:left;">Order summary</p>
             <p style="text-align:left;">Order No:${order_id}</p>
              <p style="text-align:left;">Order Status:${order_status}</p><br>
              <p style="text-align:left;color:#717a8a;">Order From:<h3>${store_name}</h3></p>
          
              <p style="text-align:left;font-family: sans-serif;color:#717a8a;">${store_address}</p>
              <p style="text-align:left;color:#717a8a;">Delivery To:</p>
              <h3 style="text-align:left;">${name}</h3>
              <p style="text-align:left;color:#717a8a;">${shipping_1}, ${shipping_2} <br>${shipping_3}</p>
            </div>
          </td>
        </tr>
      </table>`;
      output += `<table style="width:100%;background:#f6f6f6;">
      <tr>
        <td>
          <div class="container"style="width:900px;margin:0px auto;">
            <div style="display:flex; background:#e9e9e9;padding: 10px 10px 10px 10px;"> 
              <div style="width: 30%;"> 
                <b>Item Name</b>
              </div>
              <div style="width: 30%;text-align: center;">
                <b>Quantity</b>
              </div>
              <div style="width: 40%;text-align: right;">
                <b>price</b>
              </div>
            </div>`;
      //loop the items here-----------------STARTS
      items.map((item) => {
        var p_name;
        if (item.hasOwnProperty("variant")) {
          p_name = item.name + " [ " + item.variant + " ]";
        } else {
          p_name = item.name;
        }
        p_quantity = item.quantity;
        p_price = item.sub_total;
        output += ` <div style="display:flex;padding: 2px 10px 2px 10px;border-bottom: 1px solid #e9e9e9;"> 
        <div style="width: 30%;">
          <p>${p_name}</p>
        </div>
        <div style="width: 30%;text-align: center;">
          <p>${p_quantity}</p>
        </div>
        <div style="width: 40%;text-align: right;">
          <p>₹ ${p_price}</p>
        </div>
      </div>`;
      });

      //loop the items here-----------------STARTS
      //
      output += `
            <div style="display:flex;"> 
              <div style="width: 100%;text-align: right;">
                <p>Item Total:</p>
              </div>
              <div style="width: 50%;text-align: right;">
                <p>₹ ${subtotal}</p>
              </div>
            </div>`;
      //
      const discount = response[0].discount;
      if (discount && discount > 0) {
        output += `
        <div style="display:flex;"> 	
          <div style="width: 100%;text-align: right;">
            <p>Store Discount:</p>
          </div>
          <div style="width: 50%;text-align: right;">
            <p>- ₹ ${discount}</p>
          </div> 	
        </div> 	`;
      }
      //
      const delivery_charges = response[0].delivery_charges;
      if (delivery_charges && delivery_charges > 0) {
        output += `
        <div style="display:flex;"> 	
          <div style="width: 100%;text-align: right;">
            <p>Delivery Partner Fee:</p>
          </div>
          <div style="width: 50%;text-align: right;">
            <p>₹ ${delivery_charges}</p>
          </div> 	
        </div> 	`;
      }
      //
      const packing_charges = response[0].packing_charges;
      if (packing_charges && packing_charges > 0) {
        output += `
        <div style="display:flex;"> 	
          <div style="width: 100%;text-align: right;">
            <p>Packing Charges:</p>
          </div>
          <div style="width: 50%;text-align: right;">
            <p>₹ ${packing_charges}</p>
          </div> 	
        </div> 	`;
      }
      //
      //
      const coupon = response[0].coupon;
      const coupon_discount = response[0].coupon_discount;
      if (
        coupon &&
        coupon.length > 0 &&
        coupon_discount &&
        coupon_discount > 0
      ) {
        output += `
      <div style="display:flex;"> 
              <div style="width: 100%;text-align: right;">
                <p>Coupon Applied (${coupon}):</p>
              </div> 
              <div style="width: 50%;text-align: right;">
                <p>- ₹ ${coupon_discount}</p>
              </div> 
            </div> 
              `;
      }
      //
      const tip = response[0].tip;
      if (tip && tip > 0) {
        output += `
        <div style="display:flex;"> 	
          <div style="width: 100%;text-align: right;">
            <p>Delivery Partner Tip:</p>
          </div>
          <div style="width: 50%;text-align: right;">
            <p>₹ ${tip}</p>
          </div> 	
        </div> 	`;
      }
      //
      const tax_amount = response[0].tax_amount;
      if (tax_amount && tax_amount > 0) {
        output += `
        <div style="display:flex;"> 	
          <div style="width: 100%;text-align: right;">
            <p>Taxes:</p>
          </div>
          <div style="width: 50%;text-align: right;">
            <p>₹ ${tax_amount}</p>
          </div> 	
        </div> 	`;
      }
      //
      output += `
            <div style="display:flex;"> 
              <div style="width: 100%;text-align: right;">
                <p style="color:5daf3f;">Order Total:</p>
              </div>
              <div style="width: 50%;text-align: right;">
                <p style="color:5daf3f;">₹ ${total}</p>
              </div>
            </div>
            </div>
          </div>
        </td>
      </tr>
      </table>
      
      <table style="width:100%;background:#f6f6f6;">
      <tr>
      <td>
        <div class="container" style="width:900px;margin:0px auto;border-bottom: 1px solid #a7a7a7;padding-bottom: 10px;">
          <p><b>Disclaimer:</b> This is an acknowledgement of Failed Payment of the Order. Details mentioned above including the menu prices and taxes (as applicable) are as provided by the Restaurant to Ezmoov. Responsibility of charging (or not charging) taxes lies with the Restaurant and Ezmoov disclaims any liability that may arise in this respect.</p>
        </div>
      </td>
      </tr>
      </table>
      
      <table style="width:100%;background:#f6f6f6;">
      <tr>
      <td>
      <div class="container"style="width:900px;margin:0px auto;">
        <p>©2021 EZMOOV. All rights Reserved</p>
        <p>EZMOOV Tower D, 9th floor, ABC, Kartra Park, Mohali, 115533</p>
      </div>
      </td>
      </tr>
      </table>
      
      </body>
      </html>`;

      let mailOptions = {
        from: '"EZMOOV " <khushvirsingh@ajivainfotech.com>', // sender address
        //to: "khushvirajiva@gmail.com", //emailto, //for testing purpose only
        to: email_id, //for real use
        subject: `Your Ezmoov order payment succeeded for order no. ${order_id}`,
        // subject: `Intimation ${store_type_name} Application Submission`, // Subject line
        text: `Order Payment Success`, // plain text body
        html: output, // html body
      };

      let transporter = nodemailer.createTransport({
        host: "ajivainfotech.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "khushvirsingh@ajivainfotech.com", // generated ethereal user
          pass: "Welcome@12", // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      //

      response[0]["mailOptions"] = mailOptions;
      response[0]["transporter"] = transporter;

      //send email starts-----------------------------------------
      async function check() {
        // console.log("before waiting");
        //await testAsync();
        let resp = await sendemail(response);
        //console.log(resp);
        // console.log("After waiting");
        if (resp == "success") {
          const Response = {
            status: "success",
            responsedata: {
              message: "Email Successfully Sent",
            },
          };
          return res.status(200).json(Response);
        } else if (resp == "failure") {
          console.log(err);
          const Error = { status: "error", message: "Server Error" };
          return res.status(400).json(Error);
        }
      }
      check();
      //send email ends -----------------------------------------
    } else if (store_type == 2) {
      console.log("Grocery Email Template");
      //const emailto = "khushvirajiva@gmail.com";
      //grocery - multiple store -- items--starts
      const storeGrocery = response[0].store;
      //  var itemsGro;
      var itemsAll = [];
      storeGrocery.map((item) => {
        const itemsGro = item.items;
        itemsGro.map((item1) => {
          itemsAll.push(item1);
        });
      });
      //console.log(itemsAll);
      //grocery - multiple store -- items--ends
      //
      var output = `<html>
      <head>
      <title>order</title>
      <style>
      body {
        margin:0;
        padding:0;
      }
      @media (max-width: 900px) {
      table {
          width: 90%!important;
          padding: 0 20px 0 20px;
      }
      }
      </style>
      </head>
      <body>
      <table style="width:100%;background:#f6f6f6;">
        <tr>
          <td>
            <div class="container"style="width:900px;margin:0px auto;">
              <img style="max-width: 480px;margin-left: 289px;margin-bottom: 40px;margin-top: 40px;" src="http://ezmoov.com:3000/static/media/ezmoov_white.new.41092f9f.png">
                <hr>
                <p style="text-align:left;font-size:20px;color:#717a8a;">Thanks For Choosing Ezmoov, ${name}! Your Payment for order succeded for which details are below</p1>
              <div class="column"style="display:flex">
                <h2 style="text-align:left;">Order No:<br>${order_id}</h2>
              </div>
             <p style="text-align:left;">Order summary</p>
             <p style="text-align:left;">Order No:${order_id}</p>
              <p style="text-align:left;">Order Status:${order_status}</p><br>
              <p style="text-align:left;color:#717a8a;">Delivery To:</p>
              <h3 style="text-align:left;">${name}</h3>
              <p style="text-align:left;color:#717a8a;">${shipping_1}, ${shipping_2} <br>${shipping_3}</p>
            </div>
          </td>
        </tr>
      </table>`;
      output += `<table style="width:100%;background:#f6f6f6;">
      <tr>
        <td>
          <div class="container"style="width:900px;margin:0px auto;">
            <div style="display:flex; background:#e9e9e9;padding: 10px 10px 10px 10px;"> 
              <div style="width: 30%;"> 
                <b>Item Name</b>
              </div>
              <div style="width: 30%;text-align: center;">
                <b>Quantity</b>
              </div>
              <div style="width: 40%;text-align: right;">
                <b>price</b>
              </div>
            </div>`;
      //loop the items here-----------------STARTS
      itemsAll.map((item) => {
        var p_name;
        if (item.hasOwnProperty("variant")) {
          p_name = item.name + " [ " + item.variant + " ]";
        } else {
          p_name = item.name;
        }
        p_quantity = item.quantity;
        p_price = item.sub_total;
        output += ` <div style="display:flex;padding: 2px 10px 2px 10px;border-bottom: 1px solid #e9e9e9;"> 
        <div style="width: 30%;">
          <p>${p_name}</p>
        </div>
        <div style="width: 30%;text-align: center;">
          <p>${p_quantity}</p>
        </div>
        <div style="width: 40%;text-align: right;">
          <p>₹ ${p_price}</p>
        </div>
      </div>`;
      });

      //loop the items here-----------------STARTS
      //
      output += `
            <div style="display:flex;"> 
              <div style="width: 100%;text-align: right;">
                <p>Item Total:</p>
              </div>
              <div style="width: 50%;text-align: right;">
                <p>₹ ${subtotal}</p>
              </div>
            </div>`;
      //
      const discount = response[0].discount;
      if (discount && discount > 0) {
        output += `
        <div style="display:flex;"> 	
          <div style="width: 100%;text-align: right;">
            <p>Store Discount:</p>
          </div>
          <div style="width: 50%;text-align: right;">
            <p>- ₹ ${discount}</p>
          </div> 	
        </div> 	`;
      }
      //
      const delivery_charges = response[0].delivery_charges;
      if (delivery_charges && delivery_charges > 0) {
        output += `
        <div style="display:flex;"> 	
          <div style="width: 100%;text-align: right;">
            <p>Delivery Partner Fee:</p>
          </div>
          <div style="width: 50%;text-align: right;">
            <p>₹ ${delivery_charges}</p>
          </div> 	
        </div> 	`;
      }
      //
      const packing_charges = response[0].packing_charges;
      if (packing_charges && packing_charges > 0) {
        output += `
        <div style="display:flex;"> 	
          <div style="width: 100%;text-align: right;">
            <p>Packing Charges:</p>
          </div>
          <div style="width: 50%;text-align: right;">
            <p>₹ ${packing_charges}</p>
          </div> 	
        </div> 	`;
      }
      //
      //
      const coupon = response[0].coupon;
      const coupon_discount = response[0].coupon_discount;
      if (
        coupon &&
        coupon.length > 0 &&
        coupon_discount &&
        coupon_discount > 0
      ) {
        output += `
      <div style="display:flex;"> 
              <div style="width: 100%;text-align: right;">
                <p>Coupon Applied (${coupon}):</p>
              </div> 
              <div style="width: 50%;text-align: right;">
                <p>- ₹ ${coupon_discount}</p>
              </div> 
            </div> 
              `;
      }
      //
      const tip = response[0].tip;
      if (tip && tip > 0) {
        output += `
        <div style="display:flex;"> 	
          <div style="width: 100%;text-align: right;">
            <p>Delivery Partner Tip:</p>
          </div>
          <div style="width: 50%;text-align: right;">
            <p>₹ ${tip}</p>
          </div> 	
        </div> 	`;
      }
      //
      const tax_amount = response[0].tax_amount;
      if (tax_amount && tax_amount > 0) {
        output += `
        <div style="display:flex;"> 	
          <div style="width: 100%;text-align: right;">
            <p>Taxes:</p>
          </div>
          <div style="width: 50%;text-align: right;">
            <p>₹ ${tax_amount}</p>
          </div> 	
        </div> 	`;
      }
      //
      output += `
            <div style="display:flex;"> 
              <div style="width: 100%;text-align: right;">
                <p style="color:5daf3f;">Order Total:</p>
              </div>
              <div style="width: 50%;text-align: right;">
                <p style="color:5daf3f;">₹ ${total}</p>
              </div>
            </div>
            </div>
          </div>
        </td>
      </tr>
      </table>
      
      <table style="width:100%;background:#f6f6f6;">
      <tr>
      <td>
        <div class="container" style="width:900px;margin:0px auto;border-bottom: 1px solid #a7a7a7;padding-bottom: 10px;">
          <p><b>Disclaimer:</b> This is an acknowledgement of Failed Payment of the Order. Details mentioned above including the menu prices and taxes (as applicable) are as provided by the Restaurant to Ezmoov. Responsibility of charging (or not charging) taxes lies with the Restaurant and Ezmoov disclaims any liability that may arise in this respect.</p>
        </div>
      </td>
      </tr>
      </table>
      
      <table style="width:100%;background:#f6f6f6;">
      <tr>
      <td>
      <div class="container"style="width:900px;margin:0px auto;">
        <p>©2021 EZMOOV. All rights Reserved</p>
        <p>EZMOOV Tower D, 9th floor, ABC, Kartra Park, Mohali, 115533</p>
      </div>
      </td>
      </tr>
      </table>
      
      </body>
      </html>`;

      let mailOptions = {
        from: '"EZMOOV " <khushvirsingh@ajivainfotech.com>', // sender address
        to: email_id, //emailto, //list of receivers
        //to: "khushvirsgl@gmail.com",   //for checking purpose only
        subject: `Your Ezmoov order payment succeeded for order no. ${order_id}`,
        // subject: `Intimation ${store_type_name} Application Submission`, // Subject line
        text: `Order Payment Success`, // plain text body
        html: output, // html body
      };

      let transporter = nodemailer.createTransport({
        host: "ajivainfotech.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "khushvirsingh@ajivainfotech.com", // generated ethereal user
          pass: "Welcome@12", // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      //

      response[0]["mailOptions"] = mailOptions;
      response[0]["transporter"] = transporter;

      //send email starts-----------------------------------------
      async function check() {
        // console.log("before waiting");
        //await testAsync();
        let resp = await sendemail(response);
        //console.log(resp);
        // console.log("After waiting");
        if (resp == "success") {
          const Response = {
            status: "success",
            responsedata: {
              message: "Email Successfully Sent",
            },
          };
          return res.status(200).json(Response);
        } else if (resp == "failure") {
          console.log(err);
          const Error = { status: "error", message: "Server Error" };
          return res.status(400).json(Error);
        }
      }
      check();
      //send email ends -----------------------------------------
    }
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
//*************************************************************************************************************
//NEW OrderFailureCustomer - SEND EMAIL*********************************************************************************
exports.OrderFailureCustomer = async (req, res) => {
  console.log("inside - email OrderFailure");
  console.log(req.body);
  const response = req.body.response;

  const order_id = response[0].order_id;
  const order_status = response[0].order_status;

  //receiver details---starts+++++++++++++++++++++++++++++
  const name = response[0].receiver_info.name;
  const email_id = response[0].receiver_info.email_id;
  //receiver details---ends+++++++++++++++++++++++++++++++
  //shipping data---starts---------------------------------------------------------------
  var shipping_1;
  if (response[0].shipping_info.hasOwnProperty("shipping_address_line2")) {
    shipping_1 = `${response[0].shipping_info.shipping_address_line1}, ${response[0].shipping_info.shipping_address_line2}`;
  } else {
    shipping_1 = response[0].shipping_info.shipping_address_line1;
  }
  const shipping_2 = `${response[0].shipping_info.shipping_locality}, ${response[0].shipping_info.shipping_city}, ${response[0].shipping_info.shipping_state}`;

  const shipping_3 = `${response[0].shipping_info.shipping_country}, ${response[0].shipping_info.shipping_zipcode}`;
  //shipping data---ends-----------------------------------------------------------------

  const store_type = response[0].store[0].store_type;
  //
  const subtotal = response[0].subtotal;
  const total = response[0].total;
  //
  const items_len = response[0].store[0].items.length;
  const items = response[0].store[0].items;
  //
  //optional
  if (
    store_type &&
    store_type > 0 &&
    order_id &&
    order_id > 0 &&
    name &&
    name.length > 0 &&
    email_id &&
    email_id.length > 0 &&
    shipping_1 &&
    shipping_1.length > 0 &&
    shipping_2 &&
    shipping_2.length > 0 &&
    shipping_3 &&
    shipping_3.length > 0 &&
    order_status &&
    order_status.length > 0 &&
    subtotal &&
    subtotal > 0 &&
    total &&
    total > 0 &&
    items_len &&
    items_len > 0
  ) {
    //DATA
    if (store_type == 1) {
      console.log("Restaurant Email Template");
      // const emailto = "khushvirajiva@gmail.com"; //comment after testing and email_id uncommentdown
      const store_name = response[0].store[0].store_name;
      const store_address = response[0].store[0].store_address;

      //
      var output = `<html>
      <head>
      <title>order</title>
      <style>
      body {
        margin:0;
        padding:0;
      }
      @media (max-width: 900px) {
      table {
          width: 90%!important;
          padding: 0 20px 0 20px;
      }
      }
      </style>
      </head>
      <body>
      <table style="width:100%;background:#f6f6f6;">
        <tr>
          <td>
            <div class="container"style="width:900px;margin:0px auto;">
              <img style="max-width: 480px;margin-left: 289px;margin-bottom: 40px;margin-top: 40px;" src="http://ezmoov.com:3000/static/media/ezmoov_white.new.41092f9f.png">
                <hr>
                <p style="text-align:left;font-size:20px;color:#717a8a;">Thanks For Choosing Ezmoov, ${name}! Your Payment for order failed for which details are below</p1>
              <div class="column"style="display:flex">
                <h2 style="text-align:left;">Order No:<br>${order_id}</h2>
                <h2 style="text-align:center;margin-left:70px;">Restaurant<br>${store_name}</h2>
              </div>
             <p style="text-align:left;">Order summary</p>
             <p style="text-align:left;">Order No:${order_id}</p>
              <p style="text-align:left;">Order Status:${order_status}</p><br>
              <p style="text-align:left;color:#717a8a;">Order From:<h3>${store_name}</h3></p>
          
              <p style="text-align:left;font-family: sans-serif;color:#717a8a;">${store_address}</p>
              <p style="text-align:left;color:#717a8a;">Delivery To:</p>
              <h3 style="text-align:left;">${name}</h3>
              <p style="text-align:left;color:#717a8a;">${shipping_1}, ${shipping_2} <br>${shipping_3}</p>
            </div>
          </td>
        </tr>
      </table>`;
      output += `<table style="width:100%;background:#f6f6f6;">
      <tr>
        <td>
          <div class="container"style="width:900px;margin:0px auto;">
            <div style="display:flex; background:#e9e9e9;padding: 10px 10px 10px 10px;"> 
              <div style="width: 30%;"> 
                <b>Item Name</b>
              </div>
              <div style="width: 30%;text-align: center;">
                <b>Quantity</b>
              </div>
              <div style="width: 40%;text-align: right;">
                <b>price</b>
              </div>
            </div>`;
      //loop the items here-----------------STARTS
      items.map((item) => {
        var p_name;
        if (item.hasOwnProperty("variant")) {
          p_name = item.name + " [ " + item.variant + " ]";
        } else {
          p_name = item.name;
        }
        p_quantity = item.quantity;
        p_price = item.sub_total;
        output += ` <div style="display:flex;padding: 2px 10px 2px 10px;border-bottom: 1px solid #e9e9e9;"> 
        <div style="width: 30%;">
          <p>${p_name}</p>
        </div>
        <div style="width: 30%;text-align: center;">
          <p>${p_quantity}</p>
        </div>
        <div style="width: 40%;text-align: right;">
          <p>₹ ${p_price}</p>
        </div>
      </div>`;
      });

      //loop the items here-----------------STARTS
      //
      output += `
            <div style="display:flex;"> 
              <div style="width: 100%;text-align: right;">
                <p>Item Total:</p>
              </div>
              <div style="width: 50%;text-align: right;">
                <p>₹ ${subtotal}</p>
              </div>
            </div>`;
      //
      const discount = response[0].discount;
      if (discount && discount > 0) {
        output += `
        <div style="display:flex;"> 	
          <div style="width: 100%;text-align: right;">
            <p>Store Discount:</p>
          </div>
          <div style="width: 50%;text-align: right;">
            <p>- ₹ ${discount}</p>
          </div> 	
        </div> 	`;
      }
      //
      const delivery_charges = response[0].delivery_charges;
      if (delivery_charges && delivery_charges > 0) {
        output += `
        <div style="display:flex;"> 	
          <div style="width: 100%;text-align: right;">
            <p>Delivery Partner Fee:</p>
          </div>
          <div style="width: 50%;text-align: right;">
            <p>₹ ${delivery_charges}</p>
          </div> 	
        </div> 	`;
      }
      //
      const packing_charges = response[0].packing_charges;
      if (packing_charges && packing_charges > 0) {
        output += `
        <div style="display:flex;"> 	
          <div style="width: 100%;text-align: right;">
            <p>Packing Charges:</p>
          </div>
          <div style="width: 50%;text-align: right;">
            <p>₹ ${packing_charges}</p>
          </div> 	
        </div> 	`;
      }
      //
      //
      const coupon = response[0].coupon;
      const coupon_discount = response[0].coupon_discount;
      if (
        coupon &&
        coupon.length > 0 &&
        coupon_discount &&
        coupon_discount > 0
      ) {
        output += `
      <div style="display:flex;"> 
              <div style="width: 100%;text-align: right;">
                <p>Coupon Applied (${coupon}):</p>
              </div> 
              <div style="width: 50%;text-align: right;">
                <p>- ₹ ${coupon_discount}</p>
              </div> 
            </div> 
              `;
      }
      //
      const tip = response[0].tip;
      if (tip && tip > 0) {
        output += `
        <div style="display:flex;"> 	
          <div style="width: 100%;text-align: right;">
            <p>Delivery Partner Tip:</p>
          </div>
          <div style="width: 50%;text-align: right;">
            <p>₹ ${tip}</p>
          </div> 	
        </div> 	`;
      }
      //
      const tax_amount = response[0].tax_amount;
      if (tax_amount && tax_amount > 0) {
        output += `
        <div style="display:flex;"> 	
          <div style="width: 100%;text-align: right;">
            <p>Taxes:</p>
          </div>
          <div style="width: 50%;text-align: right;">
            <p>₹ ${tax_amount}</p>
          </div> 	
        </div> 	`;
      }
      //
      output += `
            <div style="display:flex;"> 
              <div style="width: 100%;text-align: right;">
                <p style="color:5daf3f;">Order Total:</p>
              </div>
              <div style="width: 50%;text-align: right;">
                <p style="color:5daf3f;">₹ ${total}</p>
              </div>
            </div>
            </div>
          </div>
        </td>
      </tr>
      </table>
      
      <table style="width:100%;background:#f6f6f6;">
      <tr>
      <td>
        <div class="container" style="width:900px;margin:0px auto;border-bottom: 1px solid #a7a7a7;padding-bottom: 10px;">
          <p><b>Disclaimer:</b> This is an acknowledgement of Failed Payment of the Order. Details mentioned above including the menu prices and taxes (as applicable) are as provided by the Restaurant to Ezmoov. Responsibility of charging (or not charging) taxes lies with the Restaurant and Ezmoov disclaims any liability that may arise in this respect.</p>
        </div>
      </td>
      </tr>
      </table>
      
      <table style="width:100%;background:#f6f6f6;">
      <tr>
      <td>
      <div class="container"style="width:900px;margin:0px auto;">
        <p>©2021 EZMOOV. All rights Reserved</p>
        <p>EZMOOV Tower D, 9th floor, ABC, Kartra Park, Mohali, 115533</p>
      </div>
      </td>
      </tr>
      </table>
      
      </body>
      </html>`;

      let mailOptions = {
        from: '"EZMOOV " <khushvirsingh@ajivainfotech.com>', // sender address
        //to: "khushvirajiva@gmail.com", //emailto, //for testing purpose only
        to: email_id, //for real use
        subject: `Your Ezmoov order payment failed for order no. ${order_id}`,
        // subject: `Intimation ${store_type_name} Application Submission`, // Subject line
        text: `Order Payment Failed`, // plain text body
        html: output, // html body
      };

      let transporter = nodemailer.createTransport({
        host: "ajivainfotech.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "khushvirsingh@ajivainfotech.com", // generated ethereal user
          pass: "Welcome@12", // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      //

      response[0]["mailOptions"] = mailOptions;
      response[0]["transporter"] = transporter;

      //send email starts-----------------------------------------
      async function check() {
        // console.log("before waiting");
        //await testAsync();
        let resp = await sendemail(response);
        //console.log(resp);
        // console.log("After waiting");
        if (resp == "success") {
          const Response = {
            status: "success",
            responsedata: {
              message: "Email Successfully Sent",
            },
          };
          return res.status(200).json(Response);
        } else if (resp == "failure") {
          console.log(err);
          const Error = { status: "error", message: "Server Error" };
          return res.status(400).json(Error);
        }
      }
      check();
      //send email ends -----------------------------------------
    } else if (store_type == 2) {
      console.log("Grocery Email Template");
      //const emailto = "khushvirajiva@gmail.com";
      //grocery - multiple store -- items--starts
      const storeGrocery = response[0].store;
      //  var itemsGro;
      var itemsAll = [];
      storeGrocery.map((item) => {
        const itemsGro = item.items;
        itemsGro.map((item1) => {
          itemsAll.push(item1);
        });
      });
      //console.log(itemsAll);
      //grocery - multiple store -- items--ends
      //
      var output = `<html>
      <head>
      <title>order</title>
      <style>
      body {
        margin:0;
        padding:0;
      }
      @media (max-width: 900px) {
      table {
          width: 90%!important;
          padding: 0 20px 0 20px;
      }
      }
      </style>
      </head>
      <body>
      <table style="width:100%;background:#f6f6f6;">
        <tr>
          <td>
            <div class="container"style="width:900px;margin:0px auto;">
              <img style="max-width: 480px;margin-left: 289px;margin-bottom: 40px;margin-top: 40px;" src="http://ezmoov.com:3000/static/media/ezmoov_white.new.41092f9f.png">
                <hr>
                <p style="text-align:left;font-size:20px;color:#717a8a;">Thanks For Choosing Ezmoov, ${name}! Your Payment for order failed for which details are below</p1>
              <div class="column"style="display:flex">
                <h2 style="text-align:left;">Order No:<br>${order_id}</h2>
              </div>
             <p style="text-align:left;">Order summary</p>
             <p style="text-align:left;">Order No:${order_id}</p>
              <p style="text-align:left;">Order Status:${order_status}</p><br>
              <p style="text-align:left;color:#717a8a;">Delivery To:</p>
              <h3 style="text-align:left;">${name}</h3>
              <p style="text-align:left;color:#717a8a;">${shipping_1}, ${shipping_2} <br>${shipping_3}</p>
            </div>
          </td>
        </tr>
      </table>`;
      output += `<table style="width:100%;background:#f6f6f6;">
      <tr>
        <td>
          <div class="container"style="width:900px;margin:0px auto;">
            <div style="display:flex; background:#e9e9e9;padding: 10px 10px 10px 10px;"> 
              <div style="width: 30%;"> 
                <b>Item Name</b>
              </div>
              <div style="width: 30%;text-align: center;">
                <b>Quantity</b>
              </div>
              <div style="width: 40%;text-align: right;">
                <b>price</b>
              </div>
            </div>`;
      //loop the items here-----------------STARTS
      itemsAll.map((item) => {
        var p_name;
        if (item.hasOwnProperty("variant")) {
          p_name = item.name + " [ " + item.variant + " ]";
        } else {
          p_name = item.name;
        }
        p_quantity = item.quantity;
        p_price = item.sub_total;
        output += ` <div style="display:flex;padding: 2px 10px 2px 10px;border-bottom: 1px solid #e9e9e9;"> 
        <div style="width: 30%;">
          <p>${p_name}</p>
        </div>
        <div style="width: 30%;text-align: center;">
          <p>${p_quantity}</p>
        </div>
        <div style="width: 40%;text-align: right;">
          <p>₹ ${p_price}</p>
        </div>
      </div>`;
      });

      //loop the items here-----------------STARTS
      //
      output += `
            <div style="display:flex;"> 
              <div style="width: 100%;text-align: right;">
                <p>Item Total:</p>
              </div>
              <div style="width: 50%;text-align: right;">
                <p>₹ ${subtotal}</p>
              </div>
            </div>`;
      //
      const discount = response[0].discount;
      if (discount && discount > 0) {
        output += `
        <div style="display:flex;"> 	
          <div style="width: 100%;text-align: right;">
            <p>Store Discount:</p>
          </div>
          <div style="width: 50%;text-align: right;">
            <p>- ₹ ${discount}</p>
          </div> 	
        </div> 	`;
      }
      //
      const delivery_charges = response[0].delivery_charges;
      if (delivery_charges && delivery_charges > 0) {
        output += `
        <div style="display:flex;"> 	
          <div style="width: 100%;text-align: right;">
            <p>Delivery Partner Fee:</p>
          </div>
          <div style="width: 50%;text-align: right;">
            <p>₹ ${delivery_charges}</p>
          </div> 	
        </div> 	`;
      }
      //
      const packing_charges = response[0].packing_charges;
      if (packing_charges && packing_charges > 0) {
        output += `
        <div style="display:flex;"> 	
          <div style="width: 100%;text-align: right;">
            <p>Packing Charges:</p>
          </div>
          <div style="width: 50%;text-align: right;">
            <p>₹ ${packing_charges}</p>
          </div> 	
        </div> 	`;
      }
      //
      //
      const coupon = response[0].coupon;
      const coupon_discount = response[0].coupon_discount;
      if (
        coupon &&
        coupon.length > 0 &&
        coupon_discount &&
        coupon_discount > 0
      ) {
        output += `
      <div style="display:flex;"> 
              <div style="width: 100%;text-align: right;">
                <p>Coupon Applied (${coupon}):</p>
              </div> 
              <div style="width: 50%;text-align: right;">
                <p>- ₹ ${coupon_discount}</p>
              </div> 
            </div> 
              `;
      }
      //
      const tip = response[0].tip;
      if (tip && tip > 0) {
        output += `
        <div style="display:flex;"> 	
          <div style="width: 100%;text-align: right;">
            <p>Delivery Partner Tip:</p>
          </div>
          <div style="width: 50%;text-align: right;">
            <p>₹ ${tip}</p>
          </div> 	
        </div> 	`;
      }
      //
      const tax_amount = response[0].tax_amount;
      if (tax_amount && tax_amount > 0) {
        output += `
        <div style="display:flex;"> 	
          <div style="width: 100%;text-align: right;">
            <p>Taxes:</p>
          </div>
          <div style="width: 50%;text-align: right;">
            <p>₹ ${tax_amount}</p>
          </div> 	
        </div> 	`;
      }
      //
      output += `
            <div style="display:flex;"> 
              <div style="width: 100%;text-align: right;">
                <p style="color:5daf3f;">Order Total:</p>
              </div>
              <div style="width: 50%;text-align: right;">
                <p style="color:5daf3f;">₹ ${total}</p>
              </div>
            </div>
            </div>
          </div>
        </td>
      </tr>
      </table>
      
      <table style="width:100%;background:#f6f6f6;">
      <tr>
      <td>
        <div class="container" style="width:900px;margin:0px auto;border-bottom: 1px solid #a7a7a7;padding-bottom: 10px;">
          <p><b>Disclaimer:</b> This is an acknowledgement of Failed Payment of the Order. Details mentioned above including the menu prices and taxes (as applicable) are as provided by the Restaurant to Ezmoov. Responsibility of charging (or not charging) taxes lies with the Restaurant and Ezmoov disclaims any liability that may arise in this respect.</p>
        </div>
      </td>
      </tr>
      </table>
      
      <table style="width:100%;background:#f6f6f6;">
      <tr>
      <td>
      <div class="container"style="width:900px;margin:0px auto;">
        <p>©2021 EZMOOV. All rights Reserved</p>
        <p>EZMOOV Tower D, 9th floor, ABC, Kartra Park, Mohali, 115533</p>
      </div>
      </td>
      </tr>
      </table>
      
      </body>
      </html>`;

      let mailOptions = {
        from: '"EZMOOV " <khushvirsingh@ajivainfotech.com>', // sender address
        to: email_id, //emailto, //list of receivers
        //to: "khushvirsgl@gmail.com",   //for checking purpose only
        subject: `Your Ezmoov order payment failed for order no. ${order_id}`,
        // subject: `Intimation ${store_type_name} Application Submission`, // Subject line
        text: `Order Payment Failed`, // plain text body
        html: output, // html body
      };

      let transporter = nodemailer.createTransport({
        host: "ajivainfotech.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "khushvirsingh@ajivainfotech.com", // generated ethereal user
          pass: "Welcome@12", // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      //

      response[0]["mailOptions"] = mailOptions;
      response[0]["transporter"] = transporter;

      //send email starts-----------------------------------------
      async function check() {
        // console.log("before waiting");
        //await testAsync();
        let resp = await sendemail(response);
        //console.log(resp);
        // console.log("After waiting");
        if (resp == "success") {
          const Response = {
            status: "success",
            responsedata: {
              message: "Email Successfully Sent",
            },
          };
          return res.status(200).json(Response);
        } else if (resp == "failure") {
          console.log(err);
          const Error = { status: "error", message: "Server Error" };
          return res.status(400).json(Error);
        }
      }
      check();
      //send email ends -----------------------------------------
    }
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
//*************************************************************************************************************
//
// module.exports = {
//   checkcustomeralready,
//   GetAllCustomers,
//   GetCustomer,
//   CreateCustomer,
//   CreateCustomerS,
//   UpdateCustomer,
//   DisableCustomer,
//   DeleteCustomer,
//   PasswordUpdate,
//   CheckOldPassword,
//   VerifyCodeAccountVerification,
//   VerifyCodeForgotPassword,
//   //
//   CustomerVerificationCodeEmail,
//   CustomerAccountVerificationCodeEmail,
//   CustomerPasswordChangedEmail,
//   CustomerCreated,
//   //
//   OrderSuccessCustomer,
//   OrderFailureCustomer,
//   //
// };
