const nodemailer = require("nodemailer");
const from = process.env.REACT_APP_EMAIL_MAILOPTIONS_FROM;
const support_email = process.env.REACT_APP_EMAIL_SUPPORT_EMAIL;
const owner_email = process.env.REACT_APP_EMAIL_OWNER_EMAIL;
const support_phone = process.env.REACT_APP_EMAIL_SUPPORT_PHONE;
const host = process.env.REACT_APP_EMAIL_TRANSPORTER_HOST;
const Auth_username = process.env.REACT_APP_EMAIL_TRANSPORTER_AUTH_USERNAME;
const Auth_password = process.env.REACT_APP_EMAIL_TRANSPORTER_AUTH_PASSWORD; //

function notify_sendemail(req) {
  return new Promise((resolve, reject) => {
    console.log("send mail starts from here ");
    req[0].mailOptions.from = from;
    let mailOptions = req[0].mailOptions;

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

    transporter.sendMail(mailOptions, (error, info) => {
      console.log();
      if (error) {
        console.log(error);

        reject("failure");
      } else {
        //console.log("1");

        console.log("Message sent: %s", info.messageId);
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        resolve("success");
      }
    });
  });
}
//notify_sendemail------STARTS
async function sendemail(email_helper_data) {
  console.log("1111111111111111111111");
  let resp = await notify_sendemail(email_helper_data);
  if (resp == "success") {
    const Response = {
      status: "success",
      message: "Email Successfully Sent",
    };
    return Response;
  }
}
/* notify_sendemail------ENDS */

module.exports = { sendemail };
