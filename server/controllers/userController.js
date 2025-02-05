var moment = require("moment");
const con = require("../models/db");
const bcrypt = require("bcrypt");
const {
  accesstokencreation,
  refreshtokencreation,
} = require("../helpers/user-token-creation");

const {
  decodetheid,
  validation,
  encrypttheid,
  generateVerificationCodePF,
} = require("../helpers/common");

const {
  UserCreatedOwner,
  UserCreatedClient,
  UserPasswordChangedEmail,
  ExtractToken,
  //
  PasswordVerificationCodeEmail,
  OtpVerified,
  ForgotPasswordVerificationCodeEmail,
  UserResendOtpCodeEmail,
} = require("../helpers/user");
const SQL = require("../helpers/sql");
const Model = require("../helpers/instructions");
const User = require("../models/user");
const Twitter = require("../models/twitter");
const Linkedin = require("../models/linkedin");
const Instagram = require("../models/instagram");
const Facebook = require("../models/facebook");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const table_user = "users";

const table_meta = "user_meta";
//
//-------------------------------------------------------------------------------------------------------------
//Logout User
exports.Logout = async (req, res) => {
  const basic_auth = req.headers.token;
  const access_token = await ExtractToken(basic_auth);
  //
  //STEP-1 UPDATE DB and make ACESSTOKEN, expiry null--------starts
  let update_payload = {
    table_name: table_user,
    query_field: "access_token",
    query_value: access_token,
    dataToSave: {
      access_token: null,
      access_token_expires_in: null,
    },
  };
  async function updateUser(saveData) {
    console.log("Inside updateUser");
    console.log(saveData);
    const respEdit = await Model.edit_query(saveData);
    console.log("Back 1");
    //console.log(respEdit);
    if (respEdit.status == "success") {
      console.log("Success User Updated - Logout");
      const Response = {
        status: "success",
        message: "logout done successfully",
      };
      res.status(200).json(Response);
    } else if (respEdit.status == "error") {
      const err = respEdit.message;
      const respError = await Model.error_query(err);
      console.log("Back 1-E");
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
//-------------------------------------------------------------------------------------------------------------
//USER LOGIN ___________________________________________________ENDS
//
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//
exports.VerificationCode = async (req, res) => {
  console.log("inside VerificationCode");
  //console.log(req);
  //
  const encryptedid = req.params.id;
  const userIdFP = decodetheid(encryptedid); //decrypted id now
  // console.log(userIdFP);
  //
  con.query(
    //"SELECT id, first_Name, last_Name, phone, email FROM users WHERE id=?",
    "SELECT * from users WHERE id=?",
    [userIdFP],
    async (err, response) => {
      if (!err) {
        if (response && response.length > 0) {
          var user_data_comp;
          //array is defined and is not empty
          //console.log(response);
          //
          //removing row data packet-------------STARTS
          var resultArray = Object.values(JSON.parse(JSON.stringify(response)));
          //  console.log(resultArray);
          //removing row data packet-------------ENDS
          //
          user_data_comp = resultArray;
          let resp = await VerificationCodeEmail(user_data_comp);
          console.log(resp);
          if (resp.status == "success") {
            console.log("BACK");
            console.log("Email Sent Successfully");
            res.status(200).json(resp);
          } else if (resp.status == "error") {
            console.log("BACK");
            console.log("Email Sending Failed");
            res.status(400).json(resp);
          }
        } else {
          console.log("ERROR");
          console.log("SQL ERROR - No data Got - Sql Query - User");
          const Error = {
            status: "error",
            message: "No Data",
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
};
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//
//VerifyOtp----------------------------------------------------_STARTS
exports.VerifyOtp1 = async (req, res) => {
  console.log("inside VerifyOtp");
  //console.log(req.body);
  const rec_verification_code = req.body.verification_code;
  //console.log(rec_verification_code);
  //
  const entity = req.body.entity;
  //console.log(entity);
  //
  //
  const encryptedid = req.params.id;
  const userIdFP = decodetheid(encryptedid); //decrypted id now
  // console.log(userIdFP);
  //
  if (
    rec_verification_code &&
    rec_verification_code.length > 0 &&
    userIdFP &&
    userIdFP > 0 &&
    entity &&
    entity.length > 0
  ) {
    console.log("Valid User id and verification code received");
    con.query(
      //"SELECT id, first_Name, last_Name, phone, email FROM users WHERE id=?",
      "SELECT * from users WHERE id=?",
      [userIdFP],
      async (err, response) => {
        if (!err) {
          if (response && response.length > 0) {
            var user_data_comp;
            //array is defined and is not empty
            //console.log(response);
            //
            //removing row data packet-------------STARTS
            var resultArray = Object.values(
              JSON.parse(JSON.stringify(response))
            );
            //  console.log(resultArray);
            //removing row data packet-------------ENDS
            //
            user_data_comp = resultArray;
            //console.log(user_data_comp);
            const db_verification_code = user_data_comp[0].verification_code;
            //console.log(db_verification_code);

            //Step-1--------Chk Otp Expired or Not-------starts
            const uptimevcodesavedindb = user_data_comp[0].updated_at; //TIME wn VCODE was saved in db

            var dateThen = new moment(uptimevcodesavedindb);
            var dateNow = new moment(); //present time
            var difference = moment.duration(dateNow.diff(dateThen));
            //console.log(difference._milliseconds);
            var diffinmilli = difference._milliseconds;
            if (diffinmilli > 300000) {
              console.log("Otp Expired");
              const Error = {
                status: "error",
                message: "OTP Expired!!. Resend New OTP",
              };
              res.status(400).json(Error);
            } else {
              console.log("Otp time Remaining");
              //
              //Step-2++++++++++++++++++++++++++++++++++++++++starts
              //Compare 2 codes===============================STARTS
              //
              if (
                rec_verification_code &&
                rec_verification_code.length > 0 &&
                db_verification_code &&
                db_verification_code.length > 0
              ) {
                console.log("Valid -- BOTH -- Codes");
                //console.log(rec_verification_code);
                //console.log(typeof rec_verification_code);
                //console.log(db_verification_code);
                //console.log(typeof db_verification_code);
                if (rec_verification_code === db_verification_code) {
                  console.log("Matching strings of OTP");
                  //
                  //send email as per entity--starts
                  OtpVerified(userIdFP, entity);
                  //send email as per entity--starts
                  //
                  const Response = {
                    //customer: response,
                    message: "Otp Verification Successful",
                  };
                  res.status(201).json(Response);
                  //
                } else {
                  console.log("Strings do not match");
                  const Error = {
                    status: "error",
                    message: "OTP Mismatch!!. Enter Correct OTP",
                  };
                  res.status(203).json(Error);
                }
              } else {
                console.log("Error in getting both codes");
                const Error = { status: "error", message: "Server Error" };
                res.status(400).json(Error);
              }
              //
              //Compare 2 codes===============================ENDS
              //Step-2++++++++++++++++++++++++++++++++++++++++ends
              //
            }
            //Step-1--------Chk Otp Expired or Not-------ends
            //
          } else {
            console.log("ERROR");
            console.log("SQL ERROR - No data Got - Sql Query - User");
            const Error = {
              status: "error",
              message: "No Data",
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
  } else {
    console.log("Invalid Details");
    const Error = { status: "error", message: "Server Error" };
    res.status(400).json(Error);
  }
};
//VerifyOtp----------------------------------------------------ENDS
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//
//CHECK IF USER ALREADY EXISTS ----WITH PHONE NUMBER/EMAIL FOR ADDING NEW USER----------------------------------------
exports.checkuserexists = (req, res) => {
  console.log("Inside checkuseralready");
  // console.log("inside check user phone and email already");
  // console.log(req.body);
  const phone = req.body.phone; //9999988888
  const email = req.body.email;

  //console.log(phone);
  //console.log(email);
  if ((phone && phone.toString().length > 0) || (email && email.length > 0)) {
    console.log("Valid Details");
    //STEP-1-----------------------------------Check Phone and then email
    if (phone && phone.toString().length > 0) {
      //console.log("checking");
      con.query(
        "SELECT u.id from users as u LEFT JOIN users_role as ur ON u.id=ur.users_id WHERE u.phone=?",
        [phone],
        (err, response) => {
          //console.log(response);
          //console.log(response[0].id);
          //console.log(response.length);
          //----------------------------------------------------------------------------------------------
          if (!err) {
            if (response && response.length > 0) {
              console.log("phone already exists");
              const encryptedid = encrypttheid(response[0].id);
              const Response = {
                userId: encryptedid,
                message: "phone", //User Already Exists with same phone
              };
              res.status(200).json(Response);
            }
            ////////////////////////////////////////////////////////
            else if (email && email.length > 0) {
              //No  PHONE found so now EMAIL check
              con.query(
                "SELECT u.id from users as u LEFT JOIN users_role as ur ON u.id=ur.users_id WHERE u.email=?",
                [email],
                (err, response) => {
                  //console.log(response);
                  if (!err) {
                    if (response && response.length > 0) {
                      console.log("email already exists");
                      const encryptedid = encrypttheid(response[0].id);
                      const Response = {
                        userId: encryptedid,
                        message: "email", //User Already Exists with same email
                      };
                      res.status(200).json(Response);
                    } else {
                      //no email found
                      console.log(" next () - no email no phone found in db");
                      const Response = {
                        message: "itsnewuser", //User Already Exists with same email
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
                message: "itsnewuser", //User Already Exists with same email
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
    }
    //Step-2-------------------------Check Email now as phone variable is empty
    else if (email && email.length > 0) {
      console.log("phone variable is having no length");

      //No  PHONE found so now EMAIL check
      con.query(
        "SELECT u.id from users as u LEFT JOIN users_role as ur ON u.id=ur.users_id WHERE u.email=?",
        [email],
        (err, response) => {
          //console.log(response);
          if (!err) {
            if (response && response.length > 0) {
              console.log("email already exists");
              const encryptedid = encrypttheid(response[0].id);
              const Response = {
                userId: encryptedid,
                message: "email", //User Already Exists with same email
              };
              res.status(200).json(Response);
            } else {
              //no email found
              console.log(" next () - no email no phone found in db");
              const Response = {
                message: "itsnewuser", //User Already Exists with same email
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
  } else {
    console.log("Invalid Details");
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};

//-------------------------------------------------------------------------------------------------------------
//
// GetAllUsersOfAllStores from database table --users-DONE--------------------------------------------------------------
//
//Get a single user by id --DONE-------------------------------------------------------------------------------
exports.GetUserById = async (req, res) => {
  console.log("Inside GetUserById");
  //console.log(req.body.userId);
  const encryptedid = req.params.id;
  const userId = decodetheid(encryptedid);
  // console.log(userId);
  if (userId && userId > 0) {
    //
    var users_data = {};
    var users_data_resp = {};
    //
    var users_roles_data = {};
    var users_roles_data_resp = {};
    //
    //STEP-1 NOW GET Users Details from users table---++++++++++++++starts
    //STEP++++++++++++++++STARTS++++++++++++++++++++++++++
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //
    console.log("STEP-1 STARTS");
    async function getUsersData(userID) {
      console.log("Inside getUsersData");
      return new Promise((resolve, reject) => {
        //   console.log(userID);
        //
        const sql = con.query(
          //mine
          //"SELECT id, CONCAT(first_Name, ' ', last_Name) AS fullname, roles, phone, email,  address_line1, address_line2, city, state, country, postal_code, active,  date_of_birth, gender, created_at from users WHERE id=?",
          //sir
          // "SELECT users.id, users.first_Name, users.last_Name, role.title as roles, users.phone, users.email,  users.address_line1, users.address_line2, users.city, users.state, users.country, users.postal_code, users.active, users.date_of_birth, users.gender, users.created_at, users.updated_at, users.verification_code from users LEFT JOIN users_role ON users_role.users_id = users.id LEFT JOIN role ON users_role.role = role.id WHERE users.id=?",
          //mine
          "SELECT u.id, u.first_Name, u.last_Name, u.nick_name, u.description, u.phone, u.phone_verify, u.email, u.email_verify,  u.address_line1, u.address_line2, u.city, u.state, u.country, u.postal_code,  CONCAT('" +
            domainpath +
            "', u.image) as image, u.gender, u.date_of_birth,  u.active FROM users as u WHERE u.id=?", //DATE_FORMAT(u.date_of_birth, '%d-%m-%Y') AS date_of_birth, u.password,
          [userID],
          (err, response) => {
            if (!err) {
              //console.log(response);
              if (response && response.length > 0) {
                //
                //removing row data packet-------------STARTS
                var resultArray = Object.values(
                  JSON.parse(JSON.stringify(response))
                );
                // console.log(resultArray);
                //removing row data packet-------------ENDS
                //
                //Enc Order id -- STARTS
                let result1 = resultArray.map((item) => {
                  const decOrderId = item.id;
                  item.id = encrypttheid(decOrderId);
                  return item;
                });
                //Enc Order id -- ENDS
                //
                // const Response = {
                //   status: "success",
                //   responsedata: { user: result1 },
                // };
                // res.status(200).json(Response);
                users_data = result1; //data into global variable
                //GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                resolve({
                  result: 1,
                });
              } else {
                console.log("STEP_1 ERROR");
                console.log("SQL ERROR - No data Got - Sql Query - Get user");
                // const Error = {
                //   status: "error",
                //   message: "No Data",
                // };
                // res.status(204).json(Response);
                reject({
                  result: 0,
                });
              }
            } else {
              console.log("STEP_1 ERROR");
              console.log("ERRRRRRRRRRRRRRRRORRRRRRRRRR");
              console.log("Get User sql error");
              console.log(err);
              // const Error = {
              //   status: "error",
              //   message: "Server Error",
              // };
              // res.status(400).json(Error);
              reject({
                result: 0,
              });
            }
          }
        );
        console.log(sql.sql);
        //
      }).catch((error) => console.log(error.message));
    }
    users_data_resp = await getUsersData(userId);
    console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
    // console.log(users_data_resp);
    console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
    //STEP-1 NOW GET Users Details from users table---++++++++++++++ends
    //STEP++++++++++++++++ENDS++++++++++++++++++++++++++
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //
    if (
      users_data_resp &&
      users_data_resp !== undefined &&
      Object.keys(users_data_resp).length != 0 &&
      users_data_resp.result > 0
    ) {
      console.log("STEP-1 DONE SUCCESSFULLY");
      console.log("STEP-2 STARTS");
      //STEP-2 NOW GET Users ROLES from users_role table---++++++++++++++starts
      //STEP++++++++++++++++STARTS++++++++++++++++++++++++++
      //++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      //
      async function getUsersRolesData(userID) {
        console.log("Inside getUsersRolesData");
        return new Promise((resolve, reject) => {
          //   console.log(userID);
          //
          const sql = con.query(
            "SELECT ur.id as users_role_id, ur.store_type as store_type_id, st.name as store_type_name, ur.store_id, s.name as store_name, ur.role as role_id, r.title as role_name, ur.active FROM users_role as ur LEFT JOIN store_type as st ON st.id=ur.store_type LEFT JOIN stores as s ON s.id=ur.store_id LEFT JOIN role as r ON r.id=ur.role WHERE ur.trash = 0 AND ur.users_id=?",
            [userID],
            (err, response) => {
              if (!err) {
                //console.log(response);
                if (response && response.length > 0) {
                  //
                  //removing row data packet-------------STARTS
                  var resultArray = Object.values(
                    JSON.parse(JSON.stringify(response))
                  );
                  // console.log(resultArray);
                  //removing row data packet-------------ENDS
                  //
                  users_roles_data = resultArray; //data into global variable
                  //GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                  resolve({
                    result: 1,
                  });
                } else {
                  console.log("STEP_2 ERROR");
                  console.log(
                    "SQL ERROR - No data Got - Sql Query - Get user ROles"
                  );
                  // const Error = {
                  //   status: "error",
                  //   message: "No Data",
                  // };
                  // res.status(204).json(Response);
                  resolve({
                    result: 2,
                  });
                }
              } else {
                console.log("STEP_2 ERROR");
                console.log("ERRRRRRRRRRRRRRRRORRRRRRRRRR");
                console.log("Get User ROles - sql error");
                console.log(err);
                // const Error = {
                //   status: "error",
                //   message: "Server Error",
                // };
                // res.status(400).json(Error);
                reject({
                  result: 0,
                });
              }
            }
          );
          console.log(sql.sql);
          //
        }).catch((error) => console.log(error.message));
      }
      users_roles_data_resp = await getUsersRolesData(userId);
      console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
      // console.log(users_roles_data_resp);
      console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
      //STEP-2 NOW GET Users ROLES from users_role table---++++++++++++++ends
      //STEP++++++++++++++++ENDS++++++++++++++++++++++++++
      //++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      //
      if (
        users_roles_data_resp &&
        users_roles_data_resp !== undefined &&
        Object.keys(users_roles_data_resp).length != 0 &&
        users_roles_data_resp.result == 1
      ) {
        console.log("STEP-2 DONE SUCCESSFULLY");
        console.log("STEP-3 STARTS");
        //DATA MATCH N COMPILE -------------------STARTS
        console.log(users_data);
        console.log(users_roles_data);
        users_data[0].roles = users_roles_data;
        console.log(users_data);
        const Response = {
          status: "success",
          responsedata: { user: users_data },
        };
        res.status(200).json(Response);
        //DATA MATCH N COMPILE -------------------ENDS
        console.log("STEP-3 ENDS");
      } else if (
        users_roles_data_resp &&
        users_roles_data_resp !== undefined &&
        Object.keys(users_roles_data_resp).length != 0 &&
        users_roles_data_resp.result == 2
      ) {
        console.log("STEP-2 DONE SUCCESSFULLY");
        console.log("STEP-3 STARTS");
        //DATA MATCH N COMPILE -------------------STARTS
        const Response = {
          status: "success",
          responsedata: { user: users_data },
        };
        res.status(200).json(Response);
        //DATA MATCH N COMPILE -------------------ENDS
        console.log("STEP-3 ENDS");
      } else {
        console.log("STEP 2 Error");
        const Error = {
          status: "error",
          message: "Server Error",
        };
        res.status(400).json(Error);
      }
    } else {
      console.log("STEP 1 Error");
      const Error = {
        status: "error",
        message: "Server Error",
      };
      res.status(400).json(Error);
    }
    //
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
//-----------------------------------------------------------------------------------------------------------
//
//USER LOGIN ___________________________________________________STARTS
exports.LoginUser = async (req, res) => {
  console.log(req.body);
  const phoneoremailvalue = req.body.phoneoremailvalue; //9999988888
  const password = req.body.password; //password is password (hashed)

  //validating email address or mobile number
  var checkemailorphone = isValidEmail(phoneoremailvalue); // true
  function isValidEmail(phoneoremailvalue) {
    //console.log(!isNaN(phoneoremailvalue));
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      phoneoremailvalue.match(emailRegex) &&
      typeof phoneoremailvalue === "string"
    ) {
      return "email";
    } else if (!isNaN(phoneoremailvalue)) {
      return "phone";
    }
  }

  if (
    (checkemailorphone == "email" || checkemailorphone == "phone") &&
    checkemailorphone.length > 0
  ) {
    //9-bcz phone num is min 10digits and email is also more than 9 digits
    // console.log(phoneoremailvalue);
    //check for user
    // const sql = con.query(
    con.query(
      "SELECT * FROM users WHERE " + checkemailorphone + " = ?",
      [phoneoremailvalue],
      async (err, result) => {
        if (!err) {
          //console.log(result);
          if (result && result.length > 0) {
            console.log("user exists");
            //console.log(result);
            console.log(result);
            bcrypt.compare(
              password,
              result[0].password,
              async (error, response) => {
                if (!error) {
                  if (response == true) {
                    const userId = result[0].id;
                    const encodedid = encrypttheid(userId);
                    var finalDataCollect = {};
                    var db_globalVariablesData;
                    var global_variables_data_resp = {};
                    var db_rolesData;
                    var getroles_data_resp = {};

                    var db_rolesPermissionsData = [];
                    var getpermissions_data_resp = {};
                    var global_db_user_set_current_store = 0;
                    var stores_db_applications_data = {};
                    //STEP-1 -- Get Global Variables ---STARTS+++++++++++++++++
                    //STEP++++++++++++++++STARTS++++++++++++++++++++++++++
                    async function getglobalvariables() {
                      console.log("Inside getglobalvariables");
                      return new Promise((resolve, reject) => {
                        //
                        const sql = con.query(
                          "SELECT * FROM `global_variables`",
                          async (err, result) => {
                            if (!err) {
                              //  console.log(result);
                              if (result && result.length > 0) {
                                //console.log(result);
                                console.log(
                                  "Data is there in global variables"
                                );
                                //
                                //removing row data packet-------------STARTS
                                var resultGlobalData = Object.values(
                                  JSON.parse(JSON.stringify(result))
                                );
                                //  console.log(resultGlobalData);
                                //removing row data packet-------------ENDS
                                //
                                db_globalVariablesData = resultGlobalData;
                                //GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                resolve({
                                  result: 1,
                                });
                              } else {
                                console.log("No data in global variables");
                                // const Error = {
                                //   status: "error",
                                //   message: "Server Error",
                                // };
                                // res.status(204).json(Error);
                                reject({
                                  result: 0,
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
                    global_variables_data_resp = await getglobalvariables();
                    console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
                    console.log(global_variables_data_resp);
                    console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
                    //STEP++++++++++++++++COMPLETES++++++++++++++++++++++++++
                    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                    //STEP-1 -- Get Global Variables ---ENDS+++++++++++++++++
                    //
                    if (
                      global_variables_data_resp &&
                      global_variables_data_resp !== undefined &&
                      Object.keys(global_variables_data_resp).length != 0 &&
                      global_variables_data_resp.result > 0
                    ) {
                      console.log("Get Global Variables Data Success");
                      //
                      //STEP-2 -- Get ROLE---STARTS=========================
                      async function getroles(userId) {
                        console.log("Inside getroles");
                        return new Promise((resolve, reject) => {
                          //
                          const sql = con.query(
                            "SELECT id FROM `users_role` WHERE users_id=?",
                            [userId],
                            async (err, result) => {
                              if (!err) {
                                //  console.log(result);
                                if (result && result.length > 0) {
                                  //console.log(result);
                                  console.log("Data is there in roles");
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
                      getroles_data_resp = await getroles(userId);
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
                        const sql = con.query(
                          "SELECT ur.role as user_role_id, role.title as user_role, ur.active as user_role_active, ur.trash as user_role_trash, users.first_Name, users.last_Name, users.phone, users.phone_verify, users.email, users.email_verify, users.last_Name, users.image FROM users_role as ur LEFT JOIN users ON users.id= ur.users_id LEFT JOIN role ON role.id = ur.role WHERE ur.active = 1 && ur.trash = 0 && ur.users_id=?", //26  AND stores.status = 2
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
                                async function getrolesPermissions(
                                  usingArraySent
                                ) {
                                  var count = 0;
                                  console.log("Inside getrolesPermissions");
                                  return new Promise((resolve, reject) => {
                                    //
                                    usingArraySent.map((item) => {
                                      //  console.log(item);
                                      item.permissions = [];
                                      const role_id = item.user_role_id;
                                      const sql = con.query(
                                        `SELECT concat('"', UPPER(r.title), '":{"MODULES":{', GROUP_CONCAT(concat('"',m.name,'":"',urp.access,'"') SEPARATOR ','),'}}') as data FROM role_permission as urp LEFT JOIN modules as m ON m.id=urp.module_id LEFT JOIN role as r ON r.id=urp.role_id WHERE urp.role_id=? GROUP BY r.title`,
                                        [role_id],
                                        (err, resp) => {
                                          if (!err) {
                                            if (resp && resp.length > 0) {
                                              //console.log(resp);
                                              //
                                              //removing row data packet-------------STARTS
                                              var resultPermissionsArray =
                                                Object.values(
                                                  JSON.parse(
                                                    JSON.stringify(resp)
                                                  )
                                                );
                                              // console.log(
                                              //   resultPermissionsArray
                                              // );
                                              //
                                              //now add curly braces and make json string---starts
                                              const jsonStringData =
                                                "{" +
                                                resultPermissionsArray[0].data +
                                                "}";
                                              //console.log(jsonStringData);
                                              //now add curly braces and make json string---ends
                                              //nw parse the data-----------------STARTS
                                              const jsonParsedData =
                                                JSON.parse(jsonStringData);
                                              //  console.log(jsonParsedData);
                                              //nw parse the data-----------------ENDS
                                              //
                                              //removing row data packet-------------ENDS
                                              //
                                              item.permissions = jsonParsedData;
                                              //GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                              db_rolesPermissionsData.push(
                                                item
                                              );
                                              //GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                              //
                                              count = count + 1;
                                              if (
                                                count == usingArraySent.length
                                              ) {
                                                console.log("Loop Complete");
                                                resolve({
                                                  result: 1,
                                                });
                                              }
                                              //
                                            } else {
                                              console.log(
                                                "No Permissions for role"
                                              );
                                              item.permissions =
                                                "No Permission for role";
                                              // const Error = {
                                              //   status: "No Permissions",
                                              //   message: "No Data",
                                              // };
                                              // res.status(204).json(Error);
                                              //
                                              //GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                              db_rolesPermissionsData.push(
                                                item
                                              );
                                              //GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                              count = count + 1;
                                              if (
                                                count == usingArraySent.length
                                              ) {
                                                console.log("Loop Complete");
                                                resolve({
                                                  result: 1,
                                                });
                                              }
                                              //
                                            }
                                          } else {
                                            console.log(
                                              "ERRRRRRRRRRRRRRRRORRRRRRRRRR"
                                            );
                                            console.log(
                                              "Get user role permissions sql error"
                                            );
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
                                            if (
                                              count == usingArraySent.length
                                            ) {
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
                                  }).catch((error) =>
                                    console.log(error.message)
                                  );
                                }
                                getpermissions_data_resp =
                                  await getrolesPermissions(
                                    resultUserDataArray
                                  );
                                console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
                                console.log(getpermissions_data_resp);
                                console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
                                //Get THE PERMISSIONS wd MODULES NOW---------------ENDS
                                if (
                                  getpermissions_data_resp &&
                                  getpermissions_data_resp !== undefined &&
                                  Object.keys(getpermissions_data_resp)
                                    .length != 0 &&
                                  getpermissions_data_resp.result > 0
                                ) {
                                  console.log(
                                    "All data collected along wd permissions"
                                  );
                                  //console.log(db_rolesPermissionsData);
                                  //
                                  //creating access token and refresh token ------------STARTS+++++
                                  const accesstoken =
                                    accesstokencreation(userId);
                                  //console.log(accesstoken);
                                  const accesstokenexpiry = moment().add(
                                    1,
                                    "hours"
                                  );
                                  //console.log(accesstokenexpiry);
                                  const refreshtoken =
                                    refreshtokencreation(userId);
                                  // console.log(refreshtoken);
                                  const refreshtokenexpiry = moment().add(
                                    1,
                                    "years"
                                  );
                                  //console.log(refreshtokenexpiry);
                                  //creating access token and refresh token ------------ENDS+++++++
                                  //
                                  let update_payload = {
                                    table_name: table_user,
                                    query_field: "id",
                                    query_value: userId,
                                    dataToSave: {
                                      access_token: accesstoken,
                                      access_token_expires_in:
                                        accesstokenexpiry,
                                      refresh_token: refreshtoken,
                                      refresh_token_expires_in:
                                        refreshtokenexpiry,
                                    },
                                  };
                                  //
                                  //FInal STEP---updateUser----------------STARTS
                                  //------------------------------------------------------
                                  async function updateUser(saveData) {
                                    //  console.log("Inside updateUser");
                                    //   console.log(saveData);
                                    const respEdit = await Model.edit_query(
                                      saveData
                                    );
                                    console.log("Back 1");
                                    //console.log(respEdit);
                                    if (respEdit.status == "success") {
                                      console.log("Success User Updated");
                                      //
                                      //ADDING DATA TO finalDataCollect---------------STARTS*********************************************************************
                                      finalDataCollect["access_token"] =
                                        accesstoken;
                                      finalDataCollect["refresh_token"] =
                                        refreshtoken;
                                      finalDataCollect["users_id"] = encodedid; // gets users_id------------------------1
                                      finalDataCollect["users_id_enc"] = userId; // gets users_id------------------------1
                                      var ip =
                                        req.header("x-forwarded-for") ||
                                        req.connection.remoteAddress;
                                      //console.log("IP ADDRESS-->" + ip);
                                      finalDataCollect["ipaddress"] = ip; // gets ipaddress-----------------------------2
                                      finalDataCollect["login"] = true; // gets login------------------------------------3
                                      finalDataCollect["active"] =
                                        result[0].active; // gets store-----------------------4
                                      finalDataCollect["user"] =
                                        db_rolesPermissionsData; // gets store-----------------------------5
                                      //
                                      //ADDING DATA TO finalDataCollect----------------ENDS*********************************************************************
                                      //console.log(finalDataCollect);

                                      console.log(finalDataCollect);

                                      const sessdata = finalDataCollect;
                                      const Response = {
                                        message: "Welcome Super Admin User",
                                        login: true,
                                        sessdata,
                                        global: db_globalVariablesData,
                                        //  user: db_rolesPermissionsData,
                                        //  permissions: db_rolesPermissionsData,
                                      };
                                      //console.log("loginsuccess");
                                      res.status(200).json(Response);

                                      //
                                    } else if (respEdit.status == "error") {
                                      // console.log("Error");
                                      const err = respEdit.message;
                                      const respError = await Model.error_query(
                                        err
                                      );
                                      console.log("Back 1-E");
                                      //  console.log(respError);
                                      const Error = {
                                        status: "error",
                                        message: respError.message,
                                      };
                                      res
                                        .status(respError.statusCode)
                                        .json(Error);
                                    }
                                  }
                                  await updateUser(update_payload);
                                  //FInal STEP---updateUser----------------ENDS
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
                        console.log(sql.sql);
                        //
                        console.log("ROLE EXISTS-ENDS");
                      } else if (
                        getroles_data_resp &&
                        getroles_data_resp !== undefined &&
                        Object.keys(getroles_data_resp).length != 0 &&
                        getroles_data_resp.result == 2
                      ) {
                        console.log("NO ROLE-STARTS");
                        const Error = {
                          status: "error",
                          message: "Contact Administrator, No Role Assigned!",
                        };
                        res.status(403).json(Error);
                        console.log("NO ROLE-ENDS");
                      } else {
                        console.log("Error in getting roles");
                        const Error = {
                          status: "error",
                          message: "Server Error",
                        };
                        res.status(400).json(Error);
                      }
                    } else {
                      console.log("Get Global Variables Data Error");
                      const Error = {
                        status: "error",
                        message: "Server Error",
                      };
                      res.status(400).json(Error);
                    }
                  } else {
                    const Response = {
                      message: "Wrong username password combination!",
                    };
                    res.status(203).json(Response);
                  }
                } else {
                  console.log("Bcrypt Error");
                  const Error = { status: "error", message: "Server Error" };
                  res.status(400).json(Error);
                }
              }
            );
          } else {
            console.log("no user");
            const Response = {
              message: "Wrong username password combination!",
            };
            res.status(400).json(Response);
          }
        } else {
          console.log(err);
          const Error = { status: "error", message: "Server Error" };
          res.status(400).json(Error);
        }
      }
    );
  } else {
    console.log("Neither email nor Phone");
    const Response = {
      message: "Invalid Details",
    };
    res.status(204).json(Response);
  }
  //
};
//-------------------------------------------------------------------------------------------------------------
//
/*-----------Users------------------------------starts here--------------------*/
exports.Users = async (req, res) => {
  var userId;
  var g_response = {};
  var g_status_code;
  //CASE -1 -------------------------------------------GET BY ID
  if (req.params.id && req.params.id > 0) {
    userId = req.params.id;
    try {
      const post_data = await fetch_single_user(userId);
      g_response["status"] = "success";
      g_response["responsedata"] = { users: post_data };
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = err.statusCode;
    }
    res.status(g_status_code).json(g_response);
  }
  //CASE -2 -------------------------------------------GET ALL
  else if (req.params && Object.keys(req.params).length == 0) {
    try {
      const post_data = await fetch_users();
      g_response["status"] = "success";
      g_response["responsedata"] = { users: post_data };
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = err.statusCode;
    }
    res.status(g_status_code).json(g_response);
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
exports.UsersByToken = async (req, res) => {
  const user_details = JSON.stringify(req.headers.token); //9999988888

  if (user_details.length > 0) {
    con.query(
      "SELECT * FROM users WHERE access_token=" + user_details,
      [user_details],
      async (err, result) => {
        if (!err) {
          if (result && result.length > 0) {
            console.log(result[0].id);

            const userId = result[0].id;
            const encodedid = encrypttheid(userId);
            var finalDataCollect = {};
            var db_globalVariablesData;
            var global_variables_data_resp = {};
            var db_rolesData;
            var getroles_data_resp = {};

            var db_rolesPermissionsData = [];
            var getpermissions_data_resp = {};
            var global_db_user_set_current_store = 0;
            var stores_db_applications_data = {};
            //STEP-1 -- Get Global Variables ---STARTS+++++++++++++++++
            //STEP++++++++++++++++STARTS++++++++++++++++++++++++++
            async function getglobalvariables() {
              console.log("Inside getglobalvariables");
              return new Promise((resolve, reject) => {
                //
                const sql = con.query(
                  "SELECT * FROM `global_variables`",
                  async (err, result) => {
                    if (!err) {
                      //  console.log(result);
                      if (result && result.length > 0) {
                        //console.log(result);
                        console.log("Data is there in global variables");
                        //
                        //removing row data packet-------------STARTS
                        var resultGlobalData = Object.values(
                          JSON.parse(JSON.stringify(result))
                        );
                        //  console.log(resultGlobalData);
                        //removing row data packet-------------ENDS
                        //
                        db_globalVariablesData = resultGlobalData;
                        //GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                        resolve({
                          result: 1,
                        });
                      } else {
                        console.log("No data in global variables");
                        // const Error = {
                        //   status: "error",
                        //   message: "Server Error",
                        // };
                        // res.status(204).json(Error);
                        reject({
                          result: 0,
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
            global_variables_data_resp = await getglobalvariables();
            console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
            console.log(global_variables_data_resp);
            console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
            //STEP++++++++++++++++COMPLETES++++++++++++++++++++++++++
            //++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            //STEP-1 -- Get Global Variables ---ENDS+++++++++++++++++
            //
            if (
              global_variables_data_resp &&
              global_variables_data_resp !== undefined &&
              Object.keys(global_variables_data_resp).length != 0 &&
              global_variables_data_resp.result > 0
            ) {
              console.log("Get Global Variables Data Success");
              //
              //STEP-2 -- Get ROLE---STARTS=========================
              async function getroles(userId) {
                console.log("Inside getroles");
                return new Promise((resolve, reject) => {
                  //
                  const sql = con.query(
                    "SELECT id FROM `users_role` WHERE users_id=?",
                    [userId],
                    async (err, result) => {
                      if (!err) {
                        //  console.log(result);
                        if (result && result.length > 0) {
                          //console.log(result);
                          console.log("Data is there in roles");
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
              getroles_data_resp = await getroles(userId);
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
                const sql = con.query(
                  "SELECT ur.role as user_role_id, role.title as user_role, ur.active as user_role_active, ur.trash as user_role_trash, users.first_Name, users.last_Name, users.phone, users.phone_verify, users.email, users.email_verify, users.last_Name, users.image FROM users_role as ur LEFT JOIN users ON users.id= ur.users_id LEFT JOIN role ON role.id = ur.role WHERE ur.active = 1 && ur.trash = 0 && ur.users_id=?", //26  AND stores.status = 2
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
                                `SELECT concat('"', UPPER(r.title), '":{"MODULES":{', GROUP_CONCAT(concat('"',m.name,'":"',urp.access,'"') SEPARATOR ','),'}}') as data FROM role_permission as urp LEFT JOIN modules as m ON m.id=urp.module_id LEFT JOIN role as r ON r.id=urp.role_id WHERE urp.role_id=? GROUP BY r.title`,
                                [role_id],
                                (err, resp) => {
                                  if (!err) {
                                    if (resp && resp.length > 0) {
                                      //console.log(resp);
                                      //
                                      //removing row data packet-------------STARTS
                                      var resultPermissionsArray =
                                        Object.values(
                                          JSON.parse(JSON.stringify(resp))
                                        );
                                      // console.log(
                                      //   resultPermissionsArray
                                      // );
                                      //
                                      //now add curly braces and make json string---starts
                                      const jsonStringData =
                                        "{" +
                                        resultPermissionsArray[0].data +
                                        "}";
                                      //console.log(jsonStringData);
                                      //now add curly braces and make json string---ends
                                      //nw parse the data-----------------STARTS
                                      const jsonParsedData =
                                        JSON.parse(jsonStringData);
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
                                      item.permissions =
                                        "No Permission for role";
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
                                    console.log(
                                      "Get user role permissions sql error"
                                    );
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
                        if (
                          getpermissions_data_resp &&
                          getpermissions_data_resp !== undefined &&
                          Object.keys(getpermissions_data_resp).length != 0 &&
                          getpermissions_data_resp.result > 0
                        ) {
                          console.log(
                            "All data collected along wd permissions"
                          );
                          //console.log(db_rolesPermissionsData);
                          //
                          //creating access token and refresh token ------------STARTS+++++
                          const accesstoken = accesstokencreation(userId);
                          //console.log(accesstoken);
                          const accesstokenexpiry = moment().add(1, "hours");
                          //console.log(accesstokenexpiry);
                          const refreshtoken = refreshtokencreation(userId);
                          // console.log(refreshtoken);
                          const refreshtokenexpiry = moment().add(1, "years");
                          //console.log(refreshtokenexpiry);
                          //creating access token and refresh token ------------ENDS+++++++
                          //
                          let update_payload = {
                            table_name: table_user,
                            query_field: "id",
                            query_value: userId,
                            dataToSave: {
                              access_token: accesstoken,
                              access_token_expires_in: accesstokenexpiry,
                              refresh_token: refreshtoken,
                              refresh_token_expires_in: refreshtokenexpiry,
                            },
                          };
                          //
                          //FInal STEP---updateUser----------------STARTS
                          //------------------------------------------------------
                          async function updateUser(saveData) {
                            //  console.log("Inside updateUser");
                            //   console.log(saveData);
                            const respEdit = await Model.edit_query(saveData);
                            console.log("Back 1");
                            //console.log(respEdit);
                            if (respEdit.status == "success") {
                              console.log("Success User Updated");
                              //
                              //ADDING DATA TO finalDataCollect---------------STARTS*********************************************************************
                              finalDataCollect["access_token"] = accesstoken;
                              finalDataCollect["refresh_token"] = refreshtoken;
                              finalDataCollect["users_id"] = encodedid; // gets users_id------------------------1
                              var ip =
                                req.header("x-forwarded-for") ||
                                req.connection.remoteAddress;
                              //console.log("IP ADDRESS-->" + ip);
                              finalDataCollect["ipaddress"] = ip; // gets ipaddress-----------------------------2
                              finalDataCollect["login"] = true; // gets login------------------------------------3
                              finalDataCollect["active"] = result[0].active; // gets store-----------------------4
                              finalDataCollect["user"] =
                                db_rolesPermissionsData; // gets store-----------------------------5
                              //
                              //ADDING DATA TO finalDataCollect----------------ENDS*********************************************************************
                              //console.log(finalDataCollect);
                              const sessdata = finalDataCollect;
                              const Response = {
                                message: "Welcome Super Admin User",
                                login: true,
                                sessdata,
                                global: db_globalVariablesData,
                                //  user: db_rolesPermissionsData,
                                //  permissions: db_rolesPermissionsData,
                              };
                              //console.log("loginsuccess");
                              res.status(200).json(Response);

                              //
                            } else if (respEdit.status == "error") {
                              // console.log("Error");
                              const err = respEdit.message;
                              const respError = await Model.error_query(err);
                              console.log("Back 1-E");
                              //  console.log(respError);
                              const Error = {
                                status: "error",
                                message: respError.message,
                              };
                              res.status(respError.statusCode).json(Error);
                            }
                          }
                          await updateUser(update_payload);
                          //FInal STEP---updateUser----------------ENDS
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
                console.log(sql.sql);
                //
                console.log("ROLE EXISTS-ENDS");
              } else if (
                getroles_data_resp &&
                getroles_data_resp !== undefined &&
                Object.keys(getroles_data_resp).length != 0 &&
                getroles_data_resp.result == 2
              ) {
                console.log("NO ROLE-STARTS");
                const Error = {
                  status: "error",
                  message: "Contact Administrator, No Role Assigned!",
                };
                res.status(403).json(Error);
                console.log("NO ROLE-ENDS");
              } else {
                console.log("Error in getting roles");
                const Error = {
                  status: "error",
                  message: "Server Error",
                };
                res.status(400).json(Error);
              }
            } else {
              console.log("Get Global Variables Data Error");
              const Error = {
                status: "error",
                message: "Server Error",
              };
              res.status(400).json(Error);
            }
          }
        } else {
          console.log(err);
          const Error = { status: "error", message: "Server Error" };
          res.status(400).json(Error);
        }
      }
    );
  } else {
    console.log("Neither email nor Phone");
    const Response = {
      message: "Invalid Details",
    };
    res.status(204).json(Response);
  }
  //
};
/*-----------Users------------------------------ends here--------------------*/
//
//
/*-----------DeleteUser---------------------------starts here--------------------*/
exports.DeleteUser = async (req, res) => {
  var userId;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id > 0) {
    userId = req.params.id;
    try {
      const user_delete_data = await delete_user(userId);
      g_response["status"] = "success";
      g_response["message"] = user_delete_data;
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = err.statusCode;
    }
    res.status(g_status_code).json(g_response);
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
/*-----------DeleteUser---------------------------ends here--------------------*/
//
/*-----------TrashUser---------------------------starts here--------------------*/
exports.TrashUser = async (req, res) => {
  var userId;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id > 0) {
    userId = req.params.id;
    try {
      const user_trash_data = await trash_user(userId);
      g_response["status"] = "success";
      g_response["message"] = user_trash_data;
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = err.statusCode;
    }
    res.status(g_status_code).json(g_response);
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
/*-----------TrashUser---------------------------ends here--------------------*/
//
//
/*-----------CreateUser---------------------------starts here--------------------*/
exports.CreateUser = async (req, res) => {
  var g_response = {};
  var g_status_code;
  var new_array = [];
  const data = req.body;
  const data_role = data.role;
  const data_group = data.group_id;
  try {
    delete data.role;
    delete data.group_id;
    const validate_data = await check_valid_data_create_user(data);
    try {
      const check_already_data = await check_user_already(validate_data);
      try {
        const hashed_password = await hash_password(validate_data);
        validate_data["password"] = hashed_password;
        try {
          const user_data_resp = await create_user(validate_data);
          SQL.addData("pinterest_users", { user_id: user_data_resp });
          UserCreatedClient(user_data_resp); //email
          UserCreatedOwner(user_data_resp); //email
          try {
            const saveData = {};
            saveData["users_id"] = user_data_resp;
            saveData["role"] = data_role;
            saveData["active"] = 1;
            const user_role_data_resp = await create_user_role(saveData);
            if (data_group != undefined) {
              const insert_data = await SQL.toArr(data_group);

              insert_data.forEach(async (element) => {
                var insert_group = await SQL.addData("group_users", {
                  user_id: user_data_resp,
                  group_id: element,
                });
              });
            }
            g_response["status"] = "success";
            g_response["responsedata"] = "User Created Successfully";
            g_status_code = 201;
            res.status(g_status_code).json(g_response);
          } catch (err) {
            g_response["status"] = "error";
            g_response["message"] = err.message;
            g_status_code = 400;
            res.status(g_status_code).json(g_response);
          }
        } catch (err) {
          g_response["status"] = "error";
          g_response["message"] = err.message;
          g_status_code = 400;
          res.status(g_status_code).json(g_response);
        }
      } catch (err) {
        g_response["status"] = "error";
        g_response["message"] = err.message;
        g_status_code = 400;
        res.status(g_status_code).json(g_response);
      }
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
      res.status(g_status_code).json(g_response);
    }
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
    res.status(g_status_code).json(g_response);
  }
};
/*-----------CreateUser---------------------------ends here--------------------*/
//
/*-----------UpdateUser---------------------------starts here--------------------*/
exports.UpdateUser = async (req, res) => {
  const data = req.body;
  var g_response = {};
  var g_status_code;
  const data_group = data.group_id;
  delete data.group_id;
  const data_role = data.role;
  delete data.role;
  const data_ins = data.instructor;
  const metaRule = {};
  if (req.params.id && req.params.id.length > 0) {
    const userIDEncrypted = req.params.id;
    try {
      const userId = await decode_the_id(userIDEncrypted);
      var meta_data = data.meta;
      delete data.meta;
      try {
        const validate_data = await check_valid_data_user_update(data);
        const validate_meta = await validation(meta_data, metaRule);
        try {
          if (data_ins == undefined || data_ins == "null") {
            console.log("AAAAAAAAAAAAAAAAAAAA");
            validate_data.instructor = null;
          }

          const saveData = {};
          saveData["user_id"] = userId;
          saveData["save_data"] = validate_data;
          // validate_data.user_id = userId;
          const check_already_data = await check_user_already_update(saveData);
          try {
            const update_data_resp = await SQL.Updatedata(
              "users",
              validate_data,
              { id: userId }
            );
            var update_role = await SQL.Updatedata(
              "users_role",
              { role: data_role },
              { users_id: userId }
            );
            if (data_group != undefined) {
              const insert_data = await SQL.toArr(data_group);

              insert_data.forEach(async (element) => {
                var get_data = await SQL.gettabledata("group_users", ["id"], {
                  user_id: userId,
                });

                if (get_data.length > 0) {
                  get_data.forEach(async (items) => {
                    var deleteID = items.id;
                    const delete_resp = await userDelete(deleteID);
                  });
                }

                var insert_group = await SQL.addData("group_users", {
                  user_id: userId,
                  group_id: element,
                });
              });
            }
            if (meta_data != undefined) {
              const saveMeta = {};
              saveMeta.user_id = userId;
              saveMeta["save_data"] = validate_meta;
              var meta_update = await updatetUserMetaByuserid(saveMeta);
            }
            g_response["status"] = "success";
            g_response["message"] = "User Updated Successfully";
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
        g_response["message"] = "Invalid Details";
        g_status_code = 400;
      }
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = err.statusCode;
    }
    // res.status(g_status_code).json(g_response);
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    // res.status(400).json(Error);
  }
  res.status(g_status_code).json(g_response);
};

const userDelete = async (deleteID, result) => {
  let delete_payload = {
    table_name: "group_users",
    query_field: "id",
    query_value: deleteID,
  };
  const respSql = await Model.delete_query(delete_payload);
  if (respSql.status == "success") {
    return null, respSql.status;
  } else if (respSql.status == "error") {
    const err = respSql.message;
    const respError = await Model.error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    return Error, null;
  }
};
/*-----------UpdateUser---------------------------ends here--------------------*/
//
/*-----------PasswordUpdate---------------------------starts here--------------------*/
exports.PasswordUpdate = async (req, res) => {
  const data = req.body;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    const userIDEncrypted = req.params.id;
    try {
      const userId = await decode_the_id(userIDEncrypted);
      //condition check old password and new password OR only new password
      if (
        data.password &&
        data.password.length > 0 &&
        data.old_password &&
        data.old_password.length > 0
      ) {
        //CASE 1 ---> when old and new passwords are there
        try {
          const validate_data = await check_valid_data_user_password_update(
            data
          );
          // console.log(validate_data); //{ password: 'password1@', old_password: 'password1@' }
          try {
            const payload_chk_old_password = {
              user_id: userId,
              old_password: validate_data.old_password,
            };
            const check_old_password_resp = await check_old_password(
              payload_chk_old_password
            );
            try {
              const password_bcrypt_resp = await password_bcrypt(
                validate_data.password
              );
              try {
                const saveData = {};
                saveData["user_id"] = userId;
                saveData["save_data"] = { password: password_bcrypt_resp };
                const update_data_resp = await update_user(saveData);
                UserPasswordChangedEmail(userId); //email
                g_response["status"] = "success";
                g_response["message"] = "Password Updated Successfully";
                g_status_code = 201;
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
          g_response["message"] = "Invalid Details";
          g_status_code = 400;
        }
      } else {
        //CASE 2 ---> when only new password is there
        //console.log("Only password Update");
        try {
          const password_bcrypt_resp = await password_bcrypt(data.password);
          try {
            const saveData = {};
            saveData["user_id"] = userId;
            saveData["save_data"] = { password: password_bcrypt_resp };
            const update_data_resp = await update_user(saveData);
            UserPasswordChangedEmail(userId); //email
            g_response["status"] = "success";
            g_response["message"] = "Password Updated Successfully";
            g_status_code = 201;
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
      }
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = err.statusCode;
    }
    res.status(g_status_code).json(g_response);
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
/*-----------PasswordUpdate---------------------------ends here--------------------*/
//
/*-----------PasswordForgot---------------------------starts here--------------------*/
exports.PasswordForgot = async (req, res) => {
  const data = req.body;
  console.log(data);
  var g_response = {};
  var g_status_code;
  if (data && data.email && data.email.length > 0) {
    const email = data.email;
    console.log(email);

    var resp_data = await check_email_exists(email);
    console.log(resp_data);
    if (resp_data.status == "error") {
      const Error = { status: "error", message: "Invalid Details" };
      res.status(400).json(Error);
    }
    if (resp_data.status == "success") {
      resp_data = resp_data.data;
      const userID = resp_data[0].id;
      const verificationCode = generateVerificationCodePF();
      const saveData = {};
      saveData["user_id"] = userID;
      saveData["save_data"] = { verification_code: verificationCode };
      const update_data_resp = await update_user(saveData);
      resp_data[0]["verification_code"] = verificationCode;
      let resp = await ForgotPasswordVerificationCodeEmail(resp_data);
      if (resp.status == "success") {
        g_response["status"] = resp.status;
        g_response["message"] = resp.message;
        g_status_code = 200;
      }
      res.status(g_status_code).json(g_response);
    }
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
/*-----------PasswordForgot---------------------------ends here--------------------*/
//
/*-----------VerifyOtp---------------------------starts here--------------------*/
exports.VerifyOtp = async (req, res) => {
  const data = req.body;
  var g_response = {};
  var g_status_code;
  if (
    data &&
    data.verification_code &&
    data.verification_code > 0 &&
    data.entity &&
    data.entity.length > 0
  ) {
    // console.log("Valid Verification Code");
    const verificationCode = data.verification_code;
    try {
      const resp_data = await check_verification_code(verificationCode);
      console.log(resp_data);
      try {
        const resp_data_expired_check = await check_verification_code_expired(
          resp_data
        );
        console.log(resp_data_expired_check);
        const userID = resp_data[0].id;
        if (data.entity == "User Register Verification") {
          try {
            var saveData = {};
            saveData["user_id"] = userID;
            saveData["save_data"] = { active: 1 };
            const update_data_resp = await update_user(saveData);
            console.log(update_data_resp);
            try {
              const encUserId = await encode_the_id(userID);
              var emailPayload = {};
              emailPayload["userData"] = resp_data;
              emailPayload["entity"] = "User Account";
              //SEND EMAIL--------STARTS
              //----------------1------------------------------------
              OtpVerified(emailPayload);
              //----------------2------------------------------------
              //SEND EMAIL--------ENDS
              //
              g_response["status"] = "success";
              g_response["message"] = "OTP Verification Successful";
              g_response["responsedata"] = { user_id: encUserId };
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
        } else {
          var emailPayload = {};
          emailPayload["userData"] = resp_data;
          emailPayload["entity"] = data.entity;
          //SEND EMAIL--------STARTS
          //----------------1------------------------------------
          OtpVerified(emailPayload);
          //----------------2------------------------------------
          //SEND EMAIL--------ENDS
          try {
            const encUserId = await encode_the_id(userID);
            g_response["status"] = "success";
            g_response["message"] = "OTP Verification Successful";
            g_response["responsedata"] = { user_id: encUserId };
            g_status_code = 200;
          } catch (err) {
            g_response["status"] = "error";
            g_response["message"] = err.message;
            g_status_code = err.statusCode;
          }
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
    res.status(g_status_code).json(g_response);
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
/*-----------VerifyOtp---------------------------ends here--------------------*/
//
/*-----------ResendOtp---------------------------starts here--------------------*/
exports.ResendOtp = async (req, res) => {
  //console.log("ResendOtp");
  const data = req.body;
  var g_response = {};
  var g_status_code;
  if (data && data.email && data.email.length > 0) {
    //  console.log("Valid Data");
    const email = data.email;
    try {
      const resp_data = await check_email_exists(email);
      console.log("LLLLPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
      const userID = resp_data[0].id;
      try {
        const verificationCode = await generate_verification_code();
        console.log(generate_verification_code);
        try {
          const saveData = {};
          saveData["user_id"] = userID;
          saveData["save_data"] = { verification_code: verificationCode };
          const update_data_resp = await update_user(saveData);
          resp_data[0]["verification_code"] = verificationCode;
          let resp = await UserResendOtpCodeEmail(resp_data);
          if (resp.status == "success") {
            g_response["status"] = resp.status;
            g_response["message"] = resp.message;
            g_status_code = 200;
          } else if (resp.status == "error") {
            g_response["status"] = resp.status;
            g_response["message"] = resp.message;
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
    res.status(g_status_code).json(g_response);
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
/*-----------ResendOtp---------------------------ends here--------------------*/
//
//----FUNCTIONS----------------------------------------------------------STARTS
const fetch_single_user = (id) => {
  return new Promise((resolve, reject) => {
    User.fetchUser(id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const fetch_users = () => {
  return new Promise((resolve, reject) => {
    User.fetchUsers((err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const trash_user = (id) => {
  return new Promise((resolve, reject) => {
    User.trashUser(id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const delete_user = (id) => {
  return new Promise((resolve, reject) => {
    User.deleteUser(id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const check_valid_data_create_user = (data) => {
  return new Promise((resolve, reject) => {
    if (
      data.first_Name &&
      data.first_Name.length > 0 &&
      data.last_Name &&
      data.last_Name.length > 0 &&
      data.email &&
      data.email.length > 0 &&
      data.password &&
      data.password.length > 0 // &&
      // data.phone &&
      // data.phone > 0
    ) {
      let filteredData = Object.fromEntries(
        Object.entries(data).filter(
          ([_, v]) => v != "null" && v != "" && v != null
        )
      );
      if (
        filteredData &&
        filteredData !== undefined &&
        Object.keys(filteredData).length != 0
      ) {
        if ("active" in data === true) {
          filteredData["active"] = data.active;
        }
        resolve(filteredData);
      } else {
        const Error = { statusCode: 400, message: "Invalid Details" };
        reject(Error);
      }
    } else {
      const Error = { statusCode: 400, message: "Invalid Details" };
      reject(Error);
    }
  });
};
const check_user_already = (data) => {
  return new Promise((resolve, reject) => {
    User.checkUserAlready(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const hash_password = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const password = data.password;
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          const Error = {
            status: "error",
            message: "Server Error",
            statusCode: 400,
          };
          reject(Error);
        } else {
          resolve(hash);
        }
      });
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
const create_user = (data) => {
  return new Promise((resolve, reject) => {
    User.createUser(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const decode_the_id = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const id = decodetheid(data);
      if (id && id > 0) {
        resolve(id);
      } else {
        const Error = {
          status: "error",
          message: "Invalid Details",
          statusCode: 400,
        };
        reject(Error);
      }
    } catch (err) {
      const Error = {
        status: "error",
        message: "Invalid Details",
        statusCode: 400,
      };
      reject(Error);
    }
  });
};
const encode_the_id = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const id = encrypttheid(data);
      if (id && id.length > 0) {
        resolve(id);
      } else {
        const Error = {
          status: "error",
          message: "Invalid Details",
          statusCode: 400,
        };
        reject(Error);
      }
    } catch (err) {
      const Error = {
        status: "error",
        message: "Invalid Details",
        statusCode: 400,
      };
      reject(Error);
    }
  });
};
const check_valid_data_user_update = (data) => {
  return new Promise((resolve, reject) => {
    if (
      //  data.first_Name &&
      //  data.first_Name.length > 0 &&
      //  data.last_Name &&
      // data.last_Name.length > 0 &&
      data.email &&
      data.email.length > 0 &&
      //  data.password &&
      //  data.password.length > 0 // &&
      data.phone &&
      data.phone > 0
    ) {
      let filteredData = Object.fromEntries(
        Object.entries(data).filter(
          ([_, v]) => v != "null" && v != "" && v != null
        )
      );
      if (
        filteredData &&
        filteredData !== undefined &&
        Object.keys(filteredData).length != 0
      ) {
        if ("active" in data === true) {
          filteredData["active"] = data.active;
        }
        resolve(filteredData);
      } else {
        const Error = { statusCode: 400, message: "Invalid Details" };
        reject(Error);
      }
    } else {
      const Error = { statusCode: 400, message: "Invalid Details" };
      reject(Error);
    }
  });
};
const check_user_already_update = (data) => {
  return new Promise((resolve, reject) => {
    User.checkUserAlreadyUpdate(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const update_user = (data) => {
  return new Promise((resolve, reject) => {
    User.updateUser(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

const check_valid_data_user_password_update = (data) => {
  return new Promise((resolve, reject) => {
    if (
      data.password &&
      data.password.length > 0 &&
      data.old_password &&
      data.old_password.length > 0
    ) {
      let filteredData = Object.fromEntries(
        Object.entries(data).filter(
          ([_, v]) => v != "null" && v != "" && v != null
        )
      );
      if (
        filteredData &&
        filteredData !== undefined &&
        Object.keys(filteredData).length != 0
      ) {
        resolve(filteredData);
      } else {
        const Error = { statusCode: 400, message: "Invalid Details" };
        reject(Error);
      }
    } else {
      const Error = { statusCode: 400, message: "Invalid Details" };
      reject(Error);
    }
  });
};
const check_old_password = (data) => {
  return new Promise((resolve, reject) => {
    User.checkOldPassword(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const password_bcrypt = (data) => {
  return new Promise((resolve, reject) => {
    try {
      bcrypt.hash(data, 10, (err, hash) => {
        if (!err) {
          resolve(hash);
        } else {
          reject();
        }
      });
    } catch (err) {
      const Error = {
        statusCode: 400,
        message: "Something went wrong. Try again later",
      };
      reject(Error);
    }
  });
};
const create_user_role = (data) => {
  return new Promise((resolve, reject) => {
    User.createUserRole(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const create_user_fb_connect = (data) => {
  return new Promise((resolve, reject) => {
    Facebook.createConnect(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const create_user_insta_connect = (data) => {
  return new Promise((resolve, reject) => {
    Instagram.createConnect(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const create_user_link_connect = (data) => {
  return new Promise((resolve, reject) => {
    Linkedin.createConnect(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const create_user_twitter_connect = (data) => {
  return new Promise((resolve, reject) => {
    Twitter.createConnect(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const check_email_exists = (email) => {
  console.log(email);
  return new Promise((resolve, reject) => {
    User.fetchUserEmail(email, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const generate_verification_code = generateVerificationCodePF();

const check_verification_code = (email) => {
  return new Promise((resolve, reject) => {
    User.checkVerificationCode(email, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const check_verification_code_expired = (data) => {
  return new Promise((resolve, reject) => {
    try {
      //Step-1--------Chk Otp Expired or Not-------starts
      const uptimevcodesavedindb = data[0].updated_at; //TIME wn VCODE was saved in db

      var dateThen = new moment(uptimevcodesavedindb);
      var dateNow = new moment(); //present time
      var difference = moment.duration(dateNow.diff(dateThen));
      //console.log(difference._milliseconds);
      var diffinmilli = difference._milliseconds;
      if (diffinmilli > 300000) {
        //console.log("Otp Expired");
        const Error = {
          status: "error",
          message: "OTP Expired!!. Resend New OTP",
          statusCode: 400,
        };
        reject(Error);
      } else {
        //console.log("Otp time Remaining, Otp Verification Successful");
        resolve("success");
      }
      //Step-1--------Chk Otp Expired or Not-------ends
    } catch (err) {
      const Error = {
        status: "error",
        message: "Invalid Details",
        statusCode: 400,
      };
      reject(Error);
    }
  });
};
//----FUNCTIONS----------------------------------------------------------ENDS

exports.LoginUserss = async (req, res) => {
  const validationRule = {
    email: "required|string|email",
    // phone: "number",
    password: "required|string",
  };

  var g_response = {};
  var g_status_code;
  var data = req.body;
  try {
    const valid_data = await validation(data, validationRule);
    try {
      const create_response = await login_userss(valid_data);
      g_response["status"] = "success";
      g_response["message"] = "User Login Succesfully";
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }
  res.status(g_status_code).json(g_response);
};

const login_userss = (data) => {
  return new Promise((resolve, reject) => {
    User.loginuserss(data, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.GetUSerByRole = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;

  console.log(req.params);
  if (req.params.role_id && req.params.role_id.length > 0) {
    ID = req.params.role_id;
    try {
      const get_role_data = await SQL.query(
        "SELECT u.* FROM users as u LEFT JOIN users_role as ur ON ur.users_id=u.id WHERE ur.role=" +
          ID
      );
      g_response["status"] = "success";
      g_response["responsedata"] = get_role_data;
      g_status_code = 200;
    } catch {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};
exports.GetUSerByInstructor = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;

  console.log(req.params);
  if (req.params.instructor_id && req.params.instructor_id.length > 0) {
    ID = req.params.instructor_id;
    try {
      const get_student_data = await SQL.query(
        "SELECT u.* FROM users as u LEFT JOIN users_role as ur ON ur.users_id=u.id WHERE FIND_IN_SET('" +
          ID +
          "',u.instructor)"
      );
      g_response["status"] = "success";
      g_response["responsedata"] = get_student_data;
      g_status_code = 200;
    } catch {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

exports.GetAllInstructor = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;

  try {
    var get_role = await SQL.query(
      "SELECT id FROM role WHERE title='instructor' "
    );
    console.log(get_role);
    const get_data = await SQL.query(
      "SELECT u.* FROM users as u LEFT JOIN users_role as ur ON ur.users_id=u.id WHERE FIND_IN_SET('" +
        get_role[0].id +
        "',ur.role)"
    );

    g_response["status"] = "success";
    g_response["responsedata"] = get_data;
    g_status_code = 200;
    res.status(g_status_code).json(g_response);
  } catch {
    g_response["status"] = "error";
    g_response["message"] = "Invalid Details";
    g_status_code = 400;
    res.status(g_status_code).json(g_response);
  }
};

exports.GetAllStudents = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;

  try {
    var get_role = await SQL.query(
      "SELECT id FROM role WHERE title='student' "
    );
    console.log(get_role);
    const get_data = await SQL.query(
      "SELECT u.* FROM users as u LEFT JOIN users_role as ur ON ur.users_id=u.id WHERE ur.role=" +
        get_role[0].id
    );

    g_response["status"] = "success";
    g_response["responsedata"] = get_data;
    g_status_code = 200;
    res.status(g_status_code).json(g_response);
  } catch {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
    res.status(g_status_code).json(g_response);
  }
};

const updatetUserMetaByuserid = async (data, result) => {
  var db_meta_keys = [];
  var meta_update_sql = "";
  var meta_insert_sql = "";
  var sqlquery = "";
  var meta_insert_start =
    "INSERT INTO user_meta (user_id, user_key,value) VALUES ";

  const sql = await con.query(
    `SELECT GROUP_CONCAT(user_key) AS key_name FROM user_meta WHERE user_id=?`,
    [data.user_id],
    (err, response) => {
      if (response) {
        db_keys = Object.values(JSON.parse(JSON.stringify(response)));

        if (db_keys[0].key_name) {
          db_meta_keys = db_keys[0].key_name.split(",");
        }
        var meta_keys = Object.keys(data.save_data);

        meta_keys.forEach((eachkey) => {
          var typeof_data = typeof data.save_data[eachkey];

          console.log(data.save_data[eachkey]);
          data.save_data[eachkey] =
            typeof data.save_data[eachkey] === "object"
              ? JSON.stringify(data.save_data[eachkey])
              : data.save_data[eachkey];

          if (db_meta_keys.includes(eachkey)) {
            meta_update_sql =
              "UPDATE " +
              table_meta +
              " SET value='" +
              data.save_data[eachkey] +
              "' WHERE user_id='" +
              data.user_id +
              "' AND user_key='" +
              eachkey +
              "';";

            var update_store_meta = con.query(
              meta_update_sql,
              (error, sqlresult) => {
                if (error) {
                  const Error = {
                    status: "error",
                    message: error.message,
                  };
                  return Error, null;
                } else {
                  const success = {
                    status: "success",
                  };
                  return null, success;
                }
              }
            );
          } else {
            meta_insert_sql =
              meta_insert_start +
              "('" +
              data.user_id +
              "','" +
              eachkey +
              "','" +
              data.save_data[eachkey] +
              "');";

            var update_store_meta = con.query(
              meta_insert_sql,
              (error, sqlresult) => {
                if (error) {
                  const Error = {
                    status: "error",
                    message: error.message,
                  };
                  return Error, null;
                } else {
                  const success = {
                    status: "success",
                  };
                  return null, success;
                }
              }
            );
          }
        });

        console.log(meta_insert_sql);
        meta_insert_sql = meta_insert_sql.slice(0, -1) + "; ";
        console.log(meta_insert_sql);
        if (meta_insert_sql !== "; ") {
          sqlquery = meta_insert_start + meta_insert_sql + meta_update_sql;
        } else {
          sqlquery = meta_update_sql;
        }
      }
    }
  );
};

exports.getInstructorByStudentID = async (req, res) => {
  var studentID;
  var g_response = {};
  var g_status_code;
  if (req.params.student_id && req.params.student_id.length > 0) {
    studentID = req.params.student_id;
    try {
      var student_rol = await SQL.gettabledata("role", ["id"], {
        title: "student",
      });
      var get_instructors_ID = await SQL.query(
        "SELECT u.instructor FROM users as u LEFT JOIN users_role as r ON u.id=r.users_id WHERE u.id='" +
          studentID +
          "' AND r.role=" +
          student_rol[0].id
      );
      if (get_instructors_ID.length < 1) {
        g_response["sttaus"] = "error";
        g_response["message"] = "Please Enter Valid Student";
        g_status_code = 400;
        res.status(g_status_code).json(g_response);
      } else {
        var instructor_id = get_instructors_ID[0].instructor;
        var instructros_Details = await SQL.query(
          "SELECT id,first_Name,last_Name,CONCAT(first_Name,' ',last_Name)as full_name, phone,email,active FROM users WHERE id IN(" +
            instructor_id +
            ")"
        );
        g_response["status"] = "success";
        g_response["Instructor_data"] = instructros_Details;
        g_status_code = 200;
        res.status(g_status_code).json(g_response);
      }
    } catch {
      g_response["sttaus"] = "error";
      g_response["message"] = "Invalid Details";
      g_status_code = 400;
      res.status(g_status_code).json(g_response);
    }
  }
};
