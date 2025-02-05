const table = "subscription";
const table_plan = "plans";
const con = require("../models/db");
const table_meta = "user_meta";
const { decodetheid, validation } = require("../helpers/common");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const SQL = require("../helpers/sql");
const Axios = require("axios");
const { headers } = require("../helpers/variables");
const {
  createCustomerFunc,
  createTokenFunc,
  createChargeFunc,
} = require("../helpers/stripe-payment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Model = require("../helpers/instructions");

exports.createSubscription = async (req, res) => {
  console.log(req.body);
  const validationRule = {
    user_id: "required|number",
    plan_id: "required|number",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;

  try {
    const valid_data = await validation(data, validationRule);

    try {
      const create_data = await SQL.addData("subscription", data);

      g_response["status"] = "success";
      g_response["message"] = `Created ${table} Successfully`;
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

exports.paySubscription = async (req, res) => {
  var response_data = {};
  var str_customerData = {};
  var str_chargeData = {};
  var transaction_id;
  var dataOrderTable = {};
  var cardsave = {};
  var card_save_chk = 0;
  var errorSend = {};
  var card = {};
  var amount_add = 0;
  const validationRule = {
    user_id: "required|string",
    plan_id: "required|string",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;
  try {
    const valid_data = await validation(data, validationRule);

    str_customerData.customer = decodetheid(data.user_id);
    str_customerData.address = {};

    if (data.billing_info) {
      // var parse_data = JSON.parse(data.billing_info);
      if (data.billing_info.name) {
        str_customerData.name = data.billing_info.name;
      }
      if (data.billing_info.email_id) {
        str_customerData.email = data.billing_info.email_id;
      }
      if (data.billing_info.phone) {
        str_customerData.phone = data.billing_info.phone;
      }
      if (data.billing_info.billing_city) {
        str_customerData.address.city = data.billing_info.billing_city;
      }
      if (data.billing_info.billing_state) {
        str_customerData.address.state = data.billing_info.billing_state;
      }
      if (data.billing_info.billing_country) {
        str_customerData.address.country = data.billing_info.billing_country;
      }
      if (data.billing_info.billing_address_line1) {
        str_customerData.address.line1 =
          data.billing_info.billing_address_line1;
      }
      if (data.billing_info.billing_address_line2) {
        str_customerData.address.line2 =
          data.billing_info.billing_address_line2;
      }
      if (data.billing_info.billing_zipcode) {
        str_customerData.address.postal_code =
          data.billing_info.billing_zipcode;
      }
    }
    dataOrderTable.total = data.total * 100;
    // delete dataOrderMetaTable.total;
    str_chargeData.amount = dataOrderTable.total;

    // card_save_chk = filteredData.save_card;
    card.card = {};
    // var card_info = JSON.parse(data.card_info);
    card.card.number = data.card_info.card_number;
    cardsave.card_number = Number(data.card_info.card_number);

    card.card.cvc = data.card_info.cvv;

    card.card.exp_month = data.card_info.exp_month;
    cardsave.expiry_month = Number(data.card_info.exp_month);

    card.card.exp_year = data.card_info.exp_year;
    cardsave.expiry_year = Number(data.card_info.exp_year);

    if (data.card_info.card_holder_name) {
      card.card.name = data.card_info.card_holder_name;
      cardsave.card_holder_name = data.card_info.card_holder_name;
    }
    const response = response_data;
    if (data.card_info) {
      const customer = await createCustomerFunc(str_customerData).then(
        (response) => {
          if (response.status == "success") {
            console.log("Success Customer");
            return { customerresult: 1 };
          } else if (response.status == "error") {
            console.log("Error Customer");
            errorSend = response.Error;
            return { customerresult: 0 };
          } else {
            console.log("Server Customer Error");
            errorSend = response.Error;
            return { customerresult: 0 };
          }
        }
      );
      if (customer && customer !== undefined && customer.customerresult > 0) {
        console.log("Customer Created, Now Create Token");
        const token = await createTokenFunc(card).then((response) => {
          if (response.status == "success") {
            console.log("Success Token");
            str_chargeData.source = response.data.id;
            if (card_save_chk > 0) {
              //save card --------------------------------STEP_1------STARTS
              if (response.data.card) {
                cardsave.card_id_payment = response.data.card.id;
                if (cardsave.card_id_payment.length > 0) {
                  console.log("Inside Save start api - MODE CARD");
                  //SAVE CARD --API------------------starts
                  console.log("NODE API CARD SAVE TESTING STARTS");

                  async function saveCARD() {
                    await Axios.post(domainpath + "/customercard/", cardsave, {
                      headers,
                    })
                      .then((response) => {
                        console.log("Node API response");
                        if (
                          response.status === 201 &&
                          response.data.status == "success"
                        ) {
                          console.log("Card Saved Successfully");
                        } else if (
                          response.status === 400 &&
                          response.data.status == "error"
                        ) {
                          console.log("Card Save Failed!!!!!!!");
                          console.log(response.data.message);
                        }
                      })
                      .catch((err) => {
                        console.log("Card Not Saved");
                      });
                  }
                  saveCARD();
                  console.log("API TESTING ENDS");
                  //SAVE CARD --API------------------ends
                  //save card --------------------------------STEP_1------ENDS
                } else {
                  console.log("Card not saved");
                }
              } else {
                console.log("Card not saved");
              }
            } else {
              console.log("Card need not to be saved");
            }

            return { tokenresult: 1 };
          } else if (response.status == "error") {
            console.log("Error Token");
            errorSend = response.Error; //GGGGGGGGGGGGGGGGGGGGGGGGGGGGG
            return { tokenresult: 0 };
          } else {
            console.log("Server Token Error");
            errorSend = json(response.Error); //GGGGGGGGGGGGGGGGGGGGGGGGGGGGG
            return { tokenresult: 0 };
          }
        });

        if (token && token !== undefined && token.tokenresult > 0) {
          console.log("Token Created, Now Create Charge");
          str_chargeData.currency = "inr";
          const charge = await createChargeFunc(str_chargeData).then(
            (response) => {
              if (response.status == "success") {
                console.log("Success Charge");
                amount_add = response.data.amount;
                transaction_id = response.data.id;

                return { chargeresult: 1 };
              } else if (response.status == "error") {
                console.log("Error Charge");
                errorSend = response.Error; //GGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                return { chargeresult: 0 };
              } else {
                console.log("Server Charge Error");
                errorSend = response.Error; //GGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                return { chargeresult: 0 };
              }
            }
          );
          //INTEGRATING PAYMENT AND ORDER----STARTS------STEP-1
          // console.log("INTEGRATION________________________________STEP_1");
          // console.log(transaction_id);
          // console.log("INTEGRATION________________________________STEP_1");
          if (
            charge &&
            charge !== undefined &&
            charge.chargeresult > 0 &&
            transaction_id &&
            transaction_id.length > 0
          ) {
            console.log("INTEGRATION -- Payment Success");
            dataOrderTable.status = "PROCESSING";
          } else if (
            errorSend &&
            errorSend !== undefined &&
            Object.keys(errorSend).length != 0
          ) {
            console.log("INTEGRATION -- Payment Error");
            dataOrderTable.status = "FAILED";
          }
          //INTEGRATING PAYMENT AND ORDER----ENDS------STEP-1
        } else {
          console.log("INTEGRATION -- Payment Error");
          dataOrderTable.status = "FAILED";
        }
      } else {
        console.log("INTEGRATION -- Payment Error");
        dataOrderTable.status = "FAILED";
      }
    } else {
      console.log("Card Details error/missing");
    }
    if (
      errorSend &&
      errorSend !== undefined &&
      Object.keys(errorSend).length != 0
      // &&
      //errorSend.result > 0
      //errorSend.hasOwnProperty("Error") &&
    ) {
      response[0] = "PAYMENT FAILED";
      response[0].transaction_error = errorSend;
      //send email--starts

      const resp = { response };
      // console.log("NODE API TESTING STARTS");
      async function sendEMAIL() {
        await Axios.post(
          domainpath + "/email/customer/order/payment/failure/", //order id
          resp,
          { headers }
        )
          .then((response) => {
            console.log("Node API response");
            // console.log(response);
            if (response.status === 200 && response.data.status == "success") {
              console.log(response.data);
              console.log(response.data.responsedata.message);
            } else if (response.data.status == "error") {
              console.log("Email Not Sent");
              console.log(response.data.message);
              console.log(response.data);
            }
          })
          .catch((err) => {
            console.log("Email Not Sent");
          });
      }
      sendEMAIL();
    } else if (transaction_id && transaction_id.length > 0) {
      console.log("INTEGRATION -- Payment Success");
      response[0] = "PAYMENT SUCCESS";

      const resp = { response };
      console.log("Customer Email - NODE API TESTING STARTS");
      async function sendEMAIL() {
        await Axios.post(
          domainpath + "/email/order/customer/payment/success/",
          resp,
          {
            headers,
          }
        )
          .then((response) => {
            console.log("Node API response");
            if (response.status === 200 && response.data.status == "success") {
              console.log(response.data.responsedata.message);
            } else if (response.data.status == "error") {
              console.log("Customer Email Not Sent");
              console.log(response.data.message);
            }
          })
          .catch((err) => {
            console.log("Customer Email Not Sent");
            // console.log(err);
          });
      }
      sendEMAIL();
    }
    data.user_id = decodetheid(data.user_id);
    var plan_id = decodetheid(data.plan_id);

    var plan_Details = await SQL.gettabledata("plans", [], {
      id: plan_id,
    });
    console.log(plan_Details);

    if (plan_Details[0].active == 1) {
      if (amount_add / 100 == plan_Details[0].price) {
        data.billing_info = JSON.stringify(data.billing_info);
        data.card_info = JSON.stringify(data.card_info);

        delete data.plan_id;
        data.transaction_id = transaction_id;

        const create_data = await SQL.addData("payments", data);

        var get_subs = await SQL.gettabledata("subscription", [], {
          user_id: data.user_id,
        });

        var newDa = new Date();
        var mo = newDa.getMonth();
        var d = newDa.getDate();
        var y = newDa.getFullYear();
        var m = mo + 1;
        var renew = y + "-" + m + "-" + d;

        //************************************************************************************************************** */
        var newDate = new Date();
        newDate.setDate(newDate.getDate() + plan_Details[0].duration);

        var month = newDate.getMonth();
        var day = newDate.getDate();
        var year = newDate.getFullYear();
        var m = month + 1;
        var expire_date = year + "-" + m + "-" + day;
        var renew_date = expire_date;

        console.log(expire_date);
        if (get_subs.length < 1) {
          const create_data_sub = await SQL.addData("subscription", {
            plan_id: plan_id,
            user_id: data.user_id,
            end_date: expire_date,
            renew_date: renew,
            status: 1,
          });
        } else if (get_subs.length == 1 && plan_id == get_subs[0].plan_id) {
          console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
          if (get_subs[0].status == 1) {
            var newDate = new Date(get_subs[0].end_date);
            newDate.setDate(newDate.getDate() + plan_Details[0].duration);

            var month = newDate.getMonth();
            var day = newDate.getDate();
            var year = newDate.getFullYear();
            var m = month + 1;
            var expire_date = year + "-" + m + "-" + day;
            var renew_date = expire_date;

            console.log(expire_date);
          } else {
            var newDate = new Date();

            newDate.setDate(newDate.getDate() + plan_Details[0].duration);

            var month = newDate.getMonth();
            var day = newDate.getDate();
            var year = newDate.getFullYear();
            var m = month + 1;
            var expire_date = year + "-" + m + "-" + day;
            var renew_date = expire_date;
          }

          const update_data_sub = await SQL.Updatedata(
            "subscription",
            {
              plan_id: plan_id,
              user_id: data.user_id,
              end_date: expire_date,
              renew_date: renew,
              status: 1,
            },
            { user_id: data.user_id, plan_id: plan_id }
          );
        } else {
          const update_data_sub = await SQL.Updatedata(
            "subscription",
            {
              plan_id: plan_id,
              user_id: data.user_id,
              end_date: expire_date,
              renew_date: renew,
              status: 1,
            },
            { user_id: data.user_id }
          );
        }
        g_response["status"] = "success";

        g_response["message"] = "Subscription Done Successfully";
        g_response["transaction_id"] = transaction_id;

        res.status(201).json(g_response);
      }
    } else {
      g_response["status"] = "error";
      g_response["message"] = "There is some issue in plan selected";
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
exports.payCourseSubscription = async (req, res) => {
  var response_data = {};
  var str_customerData = {};
  var str_chargeData = {};
  var transaction_id;
  var dataOrderTable = {};
  var cardsave = {};
  var card_save_chk = 0;
  var errorSend = {};
  var card = {};
  var amount_add = 0;
  const validationRule = {
    user_id: "required|string",
    course_id: "required|string",
  };

  var g_response = {};
  var g_status_code;
  var data = req.body;
  var meta_data = data.meta;
  try {
    delete data.meta;
    const valid_data = await validation(data, validationRule);

    str_customerData.customer = decodetheid(data.user_id);
    str_customerData.address = {};

    if (data.billing_info) {
      // var parse_data = JSON.parse(data.billing_info);
      if (data.billing_info.name) {
        str_customerData.name = data.billing_info.name;
      }
      if (data.billing_info.email_id) {
        str_customerData.email = data.billing_info.email_id;
      }
      if (data.billing_info.phone) {
        str_customerData.phone = data.billing_info.phone;
      }
      if (data.billing_info.billing_city) {
        str_customerData.address.city = data.billing_info.billing_city;
      }
      if (data.billing_info.billing_state) {
        str_customerData.address.state = data.billing_info.billing_state;
      }
      if (data.billing_info.billing_country) {
        str_customerData.address.country = data.billing_info.billing_country;
      }
      if (data.billing_info.billing_address_line1) {
        str_customerData.address.line1 =
          data.billing_info.billing_address_line1;
      }
      if (data.billing_info.billing_address_line2) {
        str_customerData.address.line2 =
          data.billing_info.billing_address_line2;
      }
      if (data.billing_info.billing_zipcode) {
        str_customerData.address.postal_code =
          data.billing_info.billing_zipcode;
      }
    }
    dataOrderTable.total = data.total * 100;
    // delete dataOrderMetaTable.total;
    str_chargeData.amount = dataOrderTable.total;

    // card_save_chk = filteredData.save_card;
    card.card = {};
    // var card_info = JSON.parse(data.card_info);
    card.card.number = data.card_info.card_number;
    cardsave.card_number = Number(data.card_info.card_number);

    card.card.cvc = data.card_info.cvv;

    card.card.exp_month = data.card_info.exp_month;
    cardsave.expiry_month = Number(data.card_info.exp_month);

    card.card.exp_year = data.card_info.exp_year;
    cardsave.expiry_year = Number(data.card_info.exp_year);

    if (data.card_info.card_holder_name) {
      card.card.name = data.card_info.card_holder_name;
      cardsave.card_holder_name = data.card_info.card_holder_name;
    }
    const response = response_data;
    if (data.card_info) {
      const customer = await createCustomerFunc(str_customerData).then(
        (response) => {
          if (response.status == "success") {
            console.log("Success Customer");
            return { customerresult: 1 };
          } else if (response.status == "error") {
            console.log("Error Customer");
            errorSend = response.Error;
            return { customerresult: 0 };
          } else {
            console.log("Server Customer Error");
            errorSend = response.Error;
            return { customerresult: 0 };
          }
        }
      );
      if (customer && customer !== undefined && customer.customerresult > 0) {
        console.log("Customer Created, Now Create Token");
        const token = await createTokenFunc(card).then((response) => {
          if (response.status == "success") {
            console.log("Success Token");
            str_chargeData.source = response.data.id;
            if (card_save_chk > 0) {
              //save card --------------------------------STEP_1------STARTS
              if (response.data.card) {
                cardsave.card_id_payment = response.data.card.id;
                if (cardsave.card_id_payment.length > 0) {
                  console.log("Inside Save start api - MODE CARD");
                  //SAVE CARD --API------------------starts
                  console.log("NODE API CARD SAVE TESTING STARTS");

                  async function saveCARD() {
                    await Axios.post(domainpath + "/customercard/", cardsave, {
                      headers,
                    })
                      .then((response) => {
                        console.log("Node API response");
                        if (
                          response.status === 201 &&
                          response.data.status == "success"
                        ) {
                          console.log("Card Saved Successfully");
                        } else if (
                          response.status === 400 &&
                          response.data.status == "error"
                        ) {
                          console.log("Card Save Failed!!!!!!!");
                          console.log(response.data.message);
                        }
                      })
                      .catch((err) => {
                        console.log("Card Not Saved");
                      });
                  }
                  saveCARD();
                  console.log("API TESTING ENDS");
                  //SAVE CARD --API------------------ends
                  //save card --------------------------------STEP_1------ENDS
                } else {
                  console.log("Card not saved");
                }
              } else {
                console.log("Card not saved");
              }
            } else {
              console.log("Card need not to be saved");
            }

            return { tokenresult: 1 };
          } else if (response.status == "error") {
            console.log("Error Token");
            errorSend = response.Error; //GGGGGGGGGGGGGGGGGGGGGGGGGGGGG
            return { tokenresult: 0 };
          } else {
            console.log("Server Token Error");
            errorSend = json(response.Error); //GGGGGGGGGGGGGGGGGGGGGGGGGGGGG
            return { tokenresult: 0 };
          }
        });

        if (token && token !== undefined && token.tokenresult > 0) {
          console.log("Token Created, Now Create Charge");
          str_chargeData.currency = "inr";
          const charge = await createChargeFunc(str_chargeData).then(
            (response) => {
              if (response.status == "success") {
                console.log("Success Charge");
                amount_add = response.data.amount;
                transaction_id = response.data.id;

                return { chargeresult: 1 };
              } else if (response.status == "error") {
                console.log("Error Charge");
                errorSend = response.Error; //GGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                return { chargeresult: 0 };
              } else {
                console.log("Server Charge Error");
                errorSend = response.Error; //GGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                return { chargeresult: 0 };
              }
            }
          );
          //INTEGRATING PAYMENT AND ORDER----STARTS------STEP-1
          // console.log("INTEGRATION________________________________STEP_1");
          // console.log(transaction_id);
          // console.log("INTEGRATION________________________________STEP_1");
          if (
            charge &&
            charge !== undefined &&
            charge.chargeresult > 0 &&
            transaction_id &&
            transaction_id.length > 0
          ) {
            console.log("INTEGRATION -- Payment Success");
            dataOrderTable.status = "PROCESSING";
          } else if (
            errorSend &&
            errorSend !== undefined &&
            Object.keys(errorSend).length != 0
          ) {
            console.log("INTEGRATION -- Payment Error");
            dataOrderTable.status = "FAILED";
          }
          //INTEGRATING PAYMENT AND ORDER----ENDS------STEP-1
        } else {
          console.log("INTEGRATION -- Payment Error");
          dataOrderTable.status = "FAILED";
        }
      } else {
        console.log("INTEGRATION -- Payment Error");
        dataOrderTable.status = "FAILED";
      }
    } else {
      console.log("Card Details error/missing");
    }
    if (
      errorSend &&
      errorSend !== undefined &&
      Object.keys(errorSend).length != 0
      // &&
      //errorSend.result > 0
      //errorSend.hasOwnProperty("Error") &&
    ) {
      response[0] = "PAYMENT FAILED";
      response[0].transaction_error = errorSend;
      //send email--starts

      const resp = { response };
      // console.log("NODE API TESTING STARTS");
      async function sendEMAIL() {
        await Axios.post(
          domainpath + "/email/customer/order/payment/failure/", //order id
          resp,
          { headers }
        )
          .then((response) => {
            console.log("Node API response");
            // console.log(response);
            if (response.status === 200 && response.data.status == "success") {
              console.log(response.data);
              console.log(response.data.responsedata.message);
            } else if (response.data.status == "error") {
              console.log("Email Not Sent");
              console.log(response.data.message);
              console.log(response.data);
            }
          })
          .catch((err) => {
            console.log("Email Not Sent");
          });
      }
      sendEMAIL();
    } else if (transaction_id && transaction_id.length > 0) {
      console.log("INTEGRATION -- Payment Success");
      response[0] = "PAYMENT SUCCESS";

      const resp = { response };
      console.log("Customer Email - NODE API TESTING STARTS");
      async function sendEMAIL() {
        await Axios.post(
          domainpath + "/email/order/customer/payment/success/",
          resp,
          {
            headers,
          }
        )
          .then((response) => {
            console.log("Node API response");
            if (response.status === 200 && response.data.status == "success") {
              console.log(response.data.responsedata.message);
            } else if (response.data.status == "error") {
              console.log("Customer Email Not Sent");
              console.log(response.data.message);
            }
          })
          .catch((err) => {
            console.log("Customer Email Not Sent");
            // console.log(err);
          });
      }
      sendEMAIL();
    }
    data.user_id = decodetheid(data.user_id);
    var course_id = decodetheid(data.course_id);
    var exam_id = decodetheid(data.exam_id);
    console.log(exam_id);

    var course_Details = await SQL.gettabledata("course", [], {
      id: course_id,
    });

    var exam_Details = await SQL.gettabledata("exams", [], {
      id: exam_id,
    });
    if (exam_Details[0].active == 1) {
      console.log(amount_add);
      if (amount_add / 100 == exam_Details[0].price) {
        data.billing_info = JSON.stringify(data.billing_info);
        data.card_info = JSON.stringify(data.card_info);

        delete data.course_id;
        data.transaction_id = transaction_id;
        delete data.exam_id;
        const create_data = await SQL.addData("payments", data);
        const saveMeta = {};
        saveMeta.user_id = data.user_id;
        saveMeta["save_data"] = meta_data;
        var meta_update = await updatetUserMetaByuserid(saveMeta);

        //************************************************************************************************************** */

        g_response["status"] = "success";

        g_response["message"] = "Subscription Done Successfully";
        g_response["transaction_id"] = transaction_id;

        res.status(201).json(g_response);
      }
    } else {
      g_response["status"] = "error";
      g_response["message"] = "There is some issue in plan selected";
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

exports.getSubscription = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const get_sub_categories = await SQL.query(
        "SELECT s.id,s.user_id,CONCAT(u.first_Name,u.last_Name) as username,s.plan_id,p.plan_name,s.status,e.name as status_title,s.starts_at,s.end_date FROM subscription as s LEFT JOIN users as u ON u.id=s.user_id LEFT JOIN plans as p ON p.id= s.plan_id LEFT JOIN entity as e ON e.id = s.status WHERE s.status=1 AND s.id=" +
          ID
      );
      g_response["status"] = "success";
      g_response["responsedata"] = get_sub_categories;
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }

    res.status(g_status_code).json(g_response);
  }
};

exports.getAllSubscription = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;

  try {
    const get_sub_categories = await SQL.query(
      "SELECT s.id,s.user_id,CONCAT(u.first_Name,u.last_Name) as username,s.plan_id,p.plan_name,s.status,e.name as status_title,s.starts_at,s.end_date FROM subscription as s LEFT JOIN users as u ON u.id=s.user_id LEFT JOIN plans as p ON p.id= s.plan_id LEFT JOIN entity as e ON e.id = s.status WHERE  s.status=1  "
    );
    g_response["status"] = "success";
    g_response["responsedata"] = get_sub_categories;
    g_status_code = 200;
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }

  res.status(g_status_code).json(g_response);
};

exports.cancelSubscriptionByID = async (req, res) => {
  var ID;
  var data = req.body;
  var g_response = {};
  var g_status_code;
  const validationRule = {
    user_id: "required|number",
    plan_id: "required|number",
  };
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const valid_data = await validation(data, validationRule);
      const update_data = await SQL.Updatedata(
        "subscription",
        { status: "0" },
        {
          id: ID,
        }
      );

      g_response["status"] = "success";
      g_response["responsedata"] = "Subscription Cancelled Successfully";
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

exports.updateSubscription = async (req, res) => {
  var ID;
  var data = req.body;
  var g_response = {};
  var g_status_code;
  const validationRule = {
    user_id: "required|number",
    plan_id: "required|number",
  };
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const valid_data = await validation(data, validationRule);
      const update_data = await SQL.Updatedata("subscription", data, {
        id: ID,
      });

      g_response["status"] = "success";
      g_response["responsedata"] = "Subscription Updated Successfully";
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

exports.DeleteById = async (req, res) => {
  var deleteID;
  var g_response = {};
  var g_status_code;

  if (req.params.id && req.params.id.length > 0) {
    deleteID = req.params.id;
    console.log(deleteID);
    try {
      const delete_resp = await subscriptionDelete(deleteID);
      g_response["status"] = "success";
      g_response["message"] = "Subscription Delete Successfully";
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};
const subscriptionDelete = async (deleteID, result) => {
  let delete_payload = {
    table_name: table,
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

exports.createSubscriptionPlan = async (req, res) => {
  const validationRule = {
    category_id: "required|number",
    plan_name: "required|string",
    duration: "required|number",
    price: "required|number",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;

  try {
    const valid_data = await validation(data, validationRule);

    try {
      const create_data = await SQL.addData("plans", data);

      g_response["status"] = "success";
      g_response["message"] = `Created ${table_plan} Successfully`;
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

exports.getSubscriptionPlan = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const get_plans = await SQL.query(
        "SELECT p.id, p.plan_name,p.category_id,c.category_name , p.duration, p.price, p.discount,p.discount_perc ,p.feature_access,p.feature,GROUP_CONCAT(e.name) as feature_name, p.short_description, p.description, p.sort_order, p.popular , p.active FROM plans as p LEFT JOIN categories as c ON p.category_id = c.id INNER JOIN entity as e ON FIND_IN_SET(e.id, p.feature) WHERE p.id=" +
          ID
      );

      // console.log(get_plans);
      // get_plans.forEach(async (element) => {
      //   console.log(element);
      //   var feature_name = await SQL.query(
      //     "SELECT * FROM entity WHERE FIND_IN_SET('" +
      //       element.feature +
      //       "',	features"
      //   );
      //   console.log(feature_name);
      // });

      g_response["status"] = "success";
      g_response["responsedata"] = get_plans;
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }

    res.status(g_status_code).json(g_response);
  }
};
exports.getSubscriptionPlanByCategoryID = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const get_plans = await SQL.query(
        "SELECT p.id, p.plan_name,p.category_id,c.category_name , p.duration, p.price, p.discount,p.discount_perc ,p.feature_access,p.feature,e.name as feature_name, p.short_description, p.description, p.sort_order, p.popular , p.active FROM plans as p LEFT JOIN categories as c ON p.category_id = c.id LEFT JOIN entity as e ON e.id=p.feature WHERE p.category_id= " +
          ID
      );
      g_response["status"] = "success";
      g_response["responsedata"] = get_plans;
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }

    res.status(g_status_code).json(g_response);
  }
};

exports.getAllSubscriptionPlan = async (req, res) => {
  var g_response = {};
  var g_status_code;

  try {
    const get_plans = await SQL.query(
      "SELECT p.id, p.plan_name,p.category_id,c.category_name , p.duration, p.price, p.discount,p.discount_perc ,p.feature_access,p.feature,e.name as feature_name, p.short_description, p.description, p.sort_order, p.popular , p.active FROM plans as p LEFT JOIN categories as c ON p.category_id = c.id LEFT JOIN entity as e ON e.id=p.feature"
    );
    g_response["status"] = "success";
    g_response["responsedata"] = get_plans;
    g_status_code = 200;
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }

  res.status(g_status_code).json(g_response);
};

exports.getAllActiveSubscriptionPlan = async (req, res) => {
  var g_response = {};
  var g_status_code;

  try {
    const get_plans = await SQL.query(
      "SELECT p.id, p.plan_name,p.category_id,c.category_name , p.duration, p.price, p.discount,p.discount_perc ,p.feature_access,p.feature,e.name as feature_name, p.short_description, p.description, p.sort_order, p.popular , p.active FROM plans as p LEFT JOIN categories as c ON p.category_id = c.id LEFT JOIN entity as e ON e.id=p.feature WHERE p.active='1'"
    );
    g_response["status"] = "success";
    g_response["responsedata"] = get_plans;
    g_status_code = 200;
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }

  res.status(g_status_code).json(g_response);
};

exports.updateSubscriptionPlan = async (req, res) => {
  var ID;
  console.log(req.body);
  var data = req.body;
  var g_response = {};
  var g_status_code;
  const validationRule = {
    category_id: "required|number",
    plan_name: "required|string",
    duration: "required|number",
    price: "required|number",
  };
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const valid_data = await validation(data, validationRule);
      const update_data = await SQL.Updatedata("plans", data, {
        id: ID,
      });

      g_response["status"] = "success";
      g_response["responsedata"] = "Plans Updated Successfully";
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

exports.DeletePlanById = async (req, res) => {
  var deleteID;
  var g_response = {};
  var g_status_code;

  if (req.params.id && req.params.id.length > 0) {
    deleteID = req.params.id;
    console.log(deleteID);
    try {
      const delete_resp = await plansDelete(deleteID);
      g_response["status"] = "success";
      g_response["message"] = "Plan Delete Successfully";
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};
const plansDelete = async (deleteID, result) => {
  let delete_payload = {
    table_name: table_plan,
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
