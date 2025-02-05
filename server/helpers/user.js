const con = require("../models/db");
//const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const {
  // encrypttheid,
  decodetheid,
  generateVerificationCodePF,
} = require("../helpers/encode-decode");
const { sendemail } = require("../helpers/email");
const from = process.env.REACT_APP_EMAIL_MAILOPTIONS_FROM;
const support_email = process.env.REACT_APP_EMAIL_SUPPORT_EMAIL;
const owner_email = process.env.REACT_APP_EMAIL_OWNER_EMAIL;
const support_phone = process.env.REACT_APP_EMAIL_SUPPORT_PHONE;
const host = process.env.REACT_APP_EMAIL_TRANSPORTER_HOST;
const Auth_username = process.env.REACT_APP_EMAIL_TRANSPORTER_AUTH_USERNAME;
const Auth_password = process.env.REACT_APP_EMAIL_TRANSPORTER_AUTH_PASSWORD;
//
//VALIDATE ACCESS TOKEN FOR logout URL-------------------------------------------------------------------STARTS
const GenuineTokenLogout = async (req, res, next) => {
  //console.log("Inside GenuineToken middleware");
  //console.log(req.headers);
  const basic_auth = req.headers.token;
  //console.log(basic_auth); //Bearer YzAxMjM0YjEtMTBiMS00NWY4LWFjZGMtYTQ2M2Q2ZTYyMzFjMmRkZDk5ZmE0NGU1NjhiNGI4MmVmM2MzZjNiZTJmMjI=
  const access_token = await ExtractToken(basic_auth);
  //console.log(access_token);
  //STEP-1 -------------------------------CHECK ACCESS TOKEN THERE OR NOT-------------------starts
  if (!access_token) {
    //console.log("No Access Token");
    const Error = {
      error: "Url Forbidden!",
    };
    return res.status(403).json(Error);
  } else {
    next();
  }
  //STEP-1 -------------------------------CHECK ACCESS TOKEN THERE OR NOT-------------------ends
};
//VALIDATE ACCESS TOKEN FOR logout URL-------------------------------------------------------------------ENDS
//
//ExtractToken------STARTS
const ExtractToken = async (req, res) => {
  //console.log("Inside ExtractToken");
  const basic_auth = req;
  //console.log(basic_auth); //Bearer YzAxMjM0YjEtMTBiMS00NWY4LWFjZGMtYTQ2M2Q2ZTYyMzFjMmRkZDk5ZmE0NGU1NjhiNGI4MmVmM2MzZjNiZTJmMjI=
  const basicAuthDataArray = basic_auth.split(" "); //[ 'Bearer', 'YWJjQGdtYWlsLmNvbTpwYXNzd29yZDFA' ]
  //console.log(basicAuthDataArray);
  const access_token = basicAuthDataArray[1]; //YWJjQGdtYWlsLmNvbTpwYXNzd29yZDFA
  //console.log(access_token);
  return access_token;
};
//ExtractToken------ENDS

//USER EMAIL ___________________________________________________STARTS
//
// PASSWORD CHANGED SUCCESSFULLY - SEND EMAIL TO NOTIFY=========================================================
const UserPasswordChangedEmail = (params) => {
  console.log("Inside UserPasswordChangedEmail");
  const userIdFP = params;
  con.query(
    "SELECT id, first_Name, last_Name, phone, email FROM users WHERE id=?",
    [userIdFP],
    async (err, response) => {
      if (!err) {
        //DATA
        const fulname = response[0].first_Name + " " + response[0].last_Name;
        const emailto = response[0].email;
        //const emailto = testEmail; //testing
        const output = `
<p>Hello, ${fulname},
you have changed your Password Successfully.</p>
<h3>If you are not aware of this change. Please contact our support team on below details:</h3>
<h3>Contact: ${support_phone}</h3> 
<h3>Email: ${support_email}</h3>
<p>This is a auto-generated email. Please do not reply to this email.</p>
`;

        var email_helper_data = [
          {
            mailOptions: {
              to: emailto, // list of receivers
              subject: "Password Changed Successfully ", // Subject line
              text: "", // plain text body
              html: output, // html body
            },
          },
        ];
        sendemail(email_helper_data);
        //
        //send email starts-----------------------------------------
        //send email ends -----------------------------------------
      } else {
        console.log(err);
        console.log("Email Failure");
      }
    }
  );
};
//=============================================================================================================
//
//NEW USER CREATED-->Client- SEND EMAIL*********************************************************************************
const UserCreatedClient = (params) => {
  console.log("email UserCreatedClient");
  const userIdFP = params;
  con.query(
    "SELECT id, first_Name, last_Name, phone, email FROM users WHERE id=?",
    [userIdFP],
    async (err, response) => {
      if (!err) {
        //DATA
        //
        const fulname = response[0].first_Name + " " + response[0].last_Name;
        const emailto = response[0].email;
        //const emailto = testEmail; //testing
        //
        const output = `
  <p>Hello, ${fulname},
  your account has been created Successfully.</p>
  <h3>If you are not aware of this change. Please contact our support team on below details:</h3>
<h3>Contact: ${support_phone}</h3> 
<h3>Email: ${support_email}</h3>
  <p>This is a auto-generated email. Please do not reply to this email.</p>
  `;
        //
        let mailOptions = {
          from: from, //   from: '"MPI " <khushvirsingh@ajivainfotech.com>', //sender address
          to: emailto, // list of receivers
          subject: "Intimation Account Creation", // Subject line
          text: "Account Created Successfully", // plain text body
          html: output, // html body
        };
        //
        let transporter = nodemailer.createTransport({
          host: "ajivainfotech.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: Auth_username, // generated ethereal user
            pass: Auth_password, // generated ethereal password
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
        //
        var email_helper_data = [];
        var temp = {};
        temp["mailOptions"] = mailOptions;
        temp["transporter"] = transporter;
        email_helper_data.push(temp);
        // console.log(email_helper_data);
        //
        //send email starts-----------------------------------------
        async function check() {
          let resp = await sendemail(email_helper_data);
          if (resp == "success") {
            console.log("Email Successfully Sent");
          } else if (resp == "failure") {
            console.log(err);
            console.log("Email Failure");
          }
        }
        check();
        //send email ends -----------------------------------------
      } else {
        console.log(err);
        console.log("Email Failure");
      }
    }
  );
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//
//NEW USER CREATED-->Owner- SEND EMAIL*********************************************************************************
const UserCreatedOwner = (params) => {
  console.log("email UserCreatedOwner");
  const userIdFP = params;
  con.query(
    "SELECT id, first_Name, last_Name, phone, email FROM users WHERE id=?",
    [userIdFP],
    async (err, response) => {
      if (!err) {
        //DATA
        //
        const fulname = response[0].first_Name + " " + response[0].last_Name;
        const emailto = owner_email; //owner
        //const emailto = testEmail; //testing
        //
        const output = `
   <p>Hello OWNER, Client ${fulname},
    account has been created Successfully.</p>
   <h3>If you are not aware of this change. Please take immediate action or contact your support team on below details:</h3>
 <h3>Contact: ${support_phone}</h3> 
 <h3>Email: ${support_email}</h3>
   <p>This is a auto-generated email. Please do not reply to this email.</p>
   `;
        //
        let mailOptions = {
          from: from, //   from: '"MPI " <khushvirsingh@ajivainfotech.com>', //sender address
          to: emailto, // list of receivers
          subject: "Intimation Client Account Creation", // Subject line
          text: "Client Account Created Successfully", // plain text body
          html: output, // html body
        };
        //
        let transporter = nodemailer.createTransport({
          host: "ajivainfotech.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: Auth_username, // generated ethereal user
            pass: Auth_password, // generated ethereal password
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
        //
        var email_helper_data = [];
        var temp = {};
        temp["mailOptions"] = mailOptions;
        temp["transporter"] = transporter;
        email_helper_data.push(temp);
        // console.log(email_helper_data);
        //
        //send email starts-----------------------------------------
        async function check() {
          let resp = await sendemail(email_helper_data);
          if (resp == "success") {
            console.log("Email Successfully Sent");
          } else if (resp == "failure") {
            console.log(err);
            console.log("Email Failure");
          }
        }
        check();
        //send email ends -----------------------------------------
      } else {
        console.log(err);
        console.log("Email Failure");
      }
    }
  );
  //
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//
// ACCOUNT VERIFICATION CODE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const UserAccountVerificationCodeEmail = async (user_data) => {
  console.log("inside UserAccountVerificationCodeEmail");
  const user_id = user_data[0].id;
  const fulname = user_data[0].first_Name + " " + user_data[0].last_Name;
  // const phone = user_data[0].phone;
  const emailto = user_data[0].email;
  //const emailto = testEmail; //testing
  //
  //collect data for email--------------------------------------------------2--starts
  const output = `
        <p>Hello, ${fulname},
        you have requested for Account Verification and following that you are sent this email.</p>
        <h3>Below is the Details of 6 digit pin you can use to verify your account</h3>
        <h3>Carefully read the otp and enter on the screen from where you asked for Account Verificaton</h3>
        <p>${verificationcode}</p>
        <p>This is a auto-generated email. Please do not reply to this email.</p>
        `;
  //
  let mailOptions = {
    from: from, //   from: '"MPI " <khushvirsingh@ajivainfotech.com>', //sender address
    to: emailto, // [emailto, owner_email], // list of receivers
    subject: "Intimation Account Settings", // Subject line
    text: "Account Verification Request", // plain text body
    html: output, // html body
  };
  //
  let transporter = nodemailer.createTransport({
    host: host,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: Auth_username, // generated ethereal user
      pass: Auth_password, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  //
  //  response[0]["mailOptions"] = mailOptions;
  //  response[0]["transporter"] = transporter;
  var email_helper_data = [];
  var temp = {};
  temp["mailOptions"] = mailOptions;
  temp["transporter"] = transporter;
  email_helper_data.push(temp);
  // console.log(email_helper_data);
  //collect data for email--------------------------------------------------2--ends
  //

  const respp = await check(email_helper_data);
  // console.log(respp);
  return respp;

  //
  //send email starts-----------------------------------------4--starts
  async function check(data) {
    // console.log("before waiting");
    //await testAsync();
    let resp = await sendemail(data);
    //console.log(resp);
    // console.log("After waiting");
    if (resp == "success") {
      const Response = {
        status: "success",
        responsedata: {
          message: "Email Successfully Sent",
          // verification_code: verificationcode,
        },
      };
      return Response;
    } else if (resp == "failure") {
      console.log(err);
      const Error = { status: "error", message: "Email Sending Failed" };
      return Error;
    }
  }
  //send email ends -----------------------------------------4--ends
  //

  //
};
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// PASSWORD FORGOT - SEND EMAIL - WITH VERIFICATION CODE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const ForgotPasswordVerificationCodeEmail = async (user_data) => {
  console.log("inside ForgotPasswordVerificationCodeEmail");
  //const user_id = user_data[0].id;
  const fulname = user_data[0].first_Name + " " + user_data[0].last_Name;
  //const phone = user_data[0].phone;
  const emailto = user_data[0].email;
  const verificationcode = user_data[0].verification_code;

  //collect data for email--------------------------------------------------1--starts
  const output = `
    <p>Hello, ${fulname},
    you have requested for Forgot Password, and following that you are sent this email.</p>
    <h3>Below is the Details of 6 digit pin you can use to rest your password</h3>
    <h3>Carefully read the otp and enter on the screen from where you asked for forgot password option</h3>
    <p>${verificationcode}</p>
    <p>This is a auto-generated email. Please do not reply to this email.</p>
    `;
  let mailOptions = {
    to: emailto, // [emailto, owner_email], // list of receivers
    subject: "OTP Verify", // Subject line
    text: "Password Change Request", // plain text body
    html: output, // html body
  };
  var email_helper_data = [];
  var temp = {};
  temp["mailOptions"] = mailOptions;
  email_helper_data.push(temp);
  return sendemail(email_helper_data);
};
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//
const PasswordVerificationCodeEmail = async (data) => {
  console.log("inside PasswordVerificationCodeEmail");
  const user_data = data;
  // console.log(user_data);
  //
  const user_id = user_data[0].id;
  const fulname = user_data[0].first_Name + " " + user_data[0].last_Name;
  const emailto = user_data[0].email;
  // const emailto = testEmail; //testing
  //
  //generate otp using function starts---------------------------1--starts
  const verificationcode = generateVerificationCodePF();
  //generate otp using function ends-----------------------------1--ends
  //
  if (verificationcode && verificationcode > 0) {
    console.log("Valid Code");
    //
    //collect data for email--------------------------------------------------2--starts
    const output = `
    <p>Hello, ${fulname},
    you have requested for Forgot Password which requires otp verification and following that you are sent this email.</p>
    <h3>Below is the Details of 6 digit pin you can use to verify</h3>
    <h3>Carefully read the otp and enter on the screen from where you asked for the service</h3>
    <p>${verificationcode}</p>https://prnt.sc/eYyJ28RzIM0m
    <p>This is a auto-generated email. Please do not reply to this email.</p>
    `;

    let mailOptions = {
      from: from, //   from: '"MPI " <khushvirsingh@ajivainfotech.com>', //sender address
      to: emailto, // [emailto, owner_email], // list of receivers
      subject: "Intimation Account Settings", // Subject line
      text: "Verification Request", // plain text body
      html: output, // html body
    };

    let transporter = nodemailer.createTransport({
      host: host,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: Auth_username, // generated ethereal user
        pass: Auth_password, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    //
    //  response[0]["mailOptions"] = mailOptions;
    //  response[0]["transporter"] = transporter;
    var email_helper_data = [];
    var temp = {};
    temp["mailOptions"] = mailOptions;
    temp["transporter"] = transporter;
    email_helper_data.push(temp);
    // console.log(email_helper_data);
    //collect data for email--------------------------------------------------2--ends
    //
    //save verification_code into db-----------------------3--starts
    var save_Data = {};
    var user_data_resp;
    save_Data["verification_code"] = verificationcode;
    //
    async function updateUser(userID, saveData) {
      console.log("Inside updateUser");
      return new Promise((resolve, reject) => {
        //   console.log(userID);
        //   console.log(saveData);
        //
        const sql = con.query(
          "UPDATE users SET ? WHERE id=?",
          [saveData, userID],
          (err, result) => {
            if (!err) {
              console.log(result);
              //   console.log(result.affectedRows);
              if (result.affectedRows > 0) {
                console.log("STEP-1 --> Updated user successful");
                resolve({
                  result: 1,
                });
              } else {
                console.log("NOTHING UPDATED - case shouldn't work");
                messageERR = "Invalid Details";
                // const Error = { status: "error", message: "Invalid Details" };
                // res.status(400).json(Error);
                reject({
                  result: 0,
                });
              }
            } else {
              console.log("UPDATE SLQ ERRRRRRRRRRRRRRRRORRRRRRRRRR");
              console.log(err);
              messageERR = "Server Error";
              //  const Error = { status: "error", message: "Server Error" };
              //   res.status(400).json(Error);
              reject({
                result: 0,
              });
            }
          }
        );
        // console.log(sql.sql);
        //
        //
      }).catch((error) => console.log(error.message));
    }
    user_data_resp = await updateUser(user_id, save_Data);
    console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
    console.log(user_data_resp);
    console.log("XXXXXXXXXXXXXXXXXXXXXXXX");

    if (
      user_data_resp &&
      user_data_resp !== undefined &&
      Object.keys(user_data_resp).length != 0 &&
      user_data_resp.result > 0
    ) {
      console.log("STEP-1 DONE SUCCESSFULLY-----------------------");
      console.log("STEP-2 STARTS");
      const respp = await check(email_helper_data);
      // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkk");
      // console.log(respp);
      // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkk");
      return respp;
    } else {
      console.log("STEP 1 Error- save verification code failed ");
      // const Error = {
      //   status: "error",
      //   message: "Server Error",
      // };
      // res.status(400).json(Error);
    }
    //save verification_code into db-----------------------3--ends
    //
    //send email starts-----------------------------------------4--starts
    async function check(data) {
      // console.log("before waiting");
      //await testAsync();
      let resp = await sendemail(data);
      //console.log(resp);
      // console.log("After waiting");
      if (resp == "success") {
        const Response = {
          status: "success",
          responsedata: {
            message: "Email Successfully Sent",
            // verification_code: verificationcode,
          },
        };
        return Response;
      } else if (resp == "failure") {
        console.log(err);
        const Error = { status: "error", message: "Email Sending Failed" };
        return Error;
      }
    }
    //send email ends -----------------------------------------4--ends
    //
  } else {
    console.log("Invalid verification code");
    const Error = { status: "error", message: "Server Error" };
    return Error;
  }
  //
};
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// OtpVerified SUCCESSFULLY - SEND EMAIL TO NOTIFY=========================================================
const OtpVerified = (data) => {
  console.log("inside OtpVerified successfully");
  const user_data = data.userData;
  // console.log(user_data);
  const entity = data.entity;
  // console.log(entity);
  //
  const fulname = user_data[0].first_Name + " " + user_data[0].last_Name;
  const emailto = user_data[0].email;

  const output = `
<p>Hello, ${fulname},
you have successfully verified OTP for ${entity}.</p>
<h3>If you are not aware of this. Please contact our support team on below details:</h3>
<h3>Contact: ${support_phone}</h3>
<h3>Email: ${support_email}</h3>
<p>This is a auto-generated email. Please do not reply to this email.</p>
`;

  let mailOptions = {
    from: from, //   from: '"MPI " <khushvirsingh@ajivainfotech.com>', //sender address
    to: emailto, // list of receivers
    subject: "Intimation Account Settings", // Subject line
    text: `Verified OTP Successfully for ${entity}`, // plain text body
    html: output, // html body
  };

  let transporter = nodemailer.createTransport({
    host: host,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: Auth_username, // generated ethereal user
      pass: Auth_password, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  //
  //response[0]["mailOptions"] = mailOptions;
  //response[0]["transporter"] = transporter;
  var email_helper_data = [];
  var temp = {};
  temp["mailOptions"] = mailOptions;
  temp["transporter"] = transporter;
  email_helper_data.push(temp);
  // console.log(email_helper_data);
  //send email starts-----------------------------------------
  async function check(email_helper_data) {
    // console.log("before waiting");
    let resp = await sendemail(email_helper_data);
    //console.log(resp);
    // console.log("After waiting");
    if (resp == "success") {
      console.log("Email Successfully Sent");
    } else if (resp == "failure") {
      console.log(err);
      console.log("Email Failure");
    }
  }
  check(email_helper_data);
  //send email ends -----------------------------------------
};
//
// UserResendOtpCodeEmail - SEND EMAIL - WITH VERIFICATION CODE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const UserResendOtpCodeEmail = async (user_data) => {
  console.log("inside UserResendOtpCodeEmail");
  //const user_id = user_data[0].id;
  const fulname = user_data[0].first_Name + " " + user_data[0].last_Name;
  //const phone = user_data[0].phone;
  const emailto = user_data[0].email;
  const verificationcode = user_data[0].verification_code;

  //collect data for email--------------------------------------------------1--starts
  const output = `
    <p>Hello, ${fulname},
    you have requested for otp, and following that you are sent this email.</p>
    <h3>Below is the Details of 6 digit pin you can use to verify youself</h3>
    <h3>Carefully read the otp and enter on the screen from where you entered your account details.</h3>
    <p>${verificationcode}</p>
    <p>This is a auto-generated email. Please do not reply to this email.</p>
    `;
  let mailOptions = {
    to: emailto, // [emailto, owner_email], // list of receivers
    subject: "OTP Verify", // Subject line
    text: "Verification Request", // plain text body
    html: output, // html body
  };
  console.log(mailOptions);
  var email_helper_data = [];
  var temp = {};
  temp["mailOptions"] = mailOptions;
  email_helper_data.push(temp);
  return sendemail(email_helper_data);
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//USER EMAIL ___________________________________________________ENDS
//
module.exports = {
  GenuineTokenLogout,
  ExtractToken,
  //
  UserPasswordChangedEmail,
  UserCreatedClient,
  UserCreatedOwner,
  //
  UserAccountVerificationCodeEmail,
  PasswordVerificationCodeEmail,
  OtpVerified,
  //
  ForgotPasswordVerificationCodeEmail,
  UserResendOtpCodeEmail,
  //
};
