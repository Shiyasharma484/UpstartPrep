const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
//

//LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
const createCustomerFunc = async (req, res) => {
  console.log("Inside createCustomerFunc");
  //console.log(req);

  const customer = await stripe.customers
    .create(req)
    .then((response) => {
      console.log("Inside STRIPE CUSTOMER Response");
      console.log(response);
      if (response) {
        //console.log(response);
        //
        // const Response = {
        //   status: "success",
        //   token: response.id,
        // };
        // res.status(201).json(Response);
        // return response;
        return { status: "success", statusCode: 201, data: response };
      } else {
        const Error = { status: "error", message: "Stripe Error" };
        // return res.status(204).json(Error);
        return { status: "error", statusCode: 204, Error };
      }
    })
    .catch((error) => {
      console.log(error);
      const Error = {
        status: "error",
        type: error.type,
        message: error.raw.message,
      };
      // console.log(error.statusCode);
      // return res.status(error.statusCode).json(Error);
      return { status: "error", statusCode: error.statusCode, Error };
    });
  // console.log(customer);
  return customer;
};
//
//LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
const createTokenFunc = async (req, res) => {
  console.log("Inside createTokenFunc");
  //console.log(req);
  const token = await stripe.tokens
    .create(req)
    .then((response) => {
      console.log("Inside TOKEN Response");
      console.log(response);
      if (response) {
        //console.log(response);
        // str_chargeData.source = response.id;
        return { status: "success", statusCode: 201, data: response };
      } else {
        const Error = { status: "error", message: "Stripe Error" };
        // return res.status(204).json(Error);
        return { status: "error", statusCode: 204, Error };
      }
    })
    .catch((error) => {
      console.log(error);
      const Error = {
        status: "error",
        type: error.type,
        message: error.raw.message,
      };
      // console.log(error.statusCode);
      // return res.status(error.statusCode).json(Error);
      return { status: "error", statusCode: error.statusCode, Error };
    });
  // console.log(token);
  return token;
};
//
//LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
const createChargeFunc = async (req, res) => {
  console.log("Inside createChargeFunc");
  //console.log(req);
  const charge = await stripe.charges
    .create(req)
    .then((response) => {
      console.log("MMMMMMMMMMMMMMMMMMMMMMMMM");
      console.log(req);
      console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMM");
      console.log("Inside Charge Response");
      console.log(response);
      if (response) {
        //console.log(response);
        // str_chargeData.source = response.id;
        return { status: "success", statusCode: 201, data: response };
      } else {
        const Error = { status: "error", message: "Stripe Error" };
        // return res.status(204).json(Error);
        return { status: "error", statusCode: 204, Error };
      }
    })
    .catch((error) => {
      console.log(error);
      const Error = {
        status: "error",
        type: error.type,
        message: error.raw.message,
      };
      // console.log(error.statusCode);
      // return res.status(error.statusCode).json(Error);
      return { status: "error", statusCode: error.statusCode, Error };
    });
  //console.log(charge);
  return charge;
};
//LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
//
//LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
const createRefundFunc = async (req, res) => {
  console.log("Inside createRefundFunc");
  console.log(req);
  //code provided by stript----------------------------starts
  // const stripe = require("stripe")(
  //   "sk_test_51KZBCRSBaHnT8d3XCCAupTjQG2uJiKsvCL97UTJ6qznfMSpT8gDIdNgE3nPTxxImac37JinPx72gn1PTqIcEjBNN00XbTESs6q"
  // );
  // const refund = await stripe.refunds.create({
  //   charge: "ch_3MJ9tU2eZvKYlo2C0ROY1nyB",
  //   amount: 2, //default is entire charge
  //   reason: "duplicate", //duplicate or fraudulent or requested_by_customer
  // }); //other parameters https://stripe.com/docs/api/refunds/create?lang=node
  //code provided by stript----------------------------ends
  //
  //console.log(req);
  const refund = await stripe.refunds
    .create({
      charge: "ch_1MHm4mF504bgxd0AdtPrmzJ9",
      amount: 2,
    })

    //const refund = await stripe.refunds.create
    //.create(req)
    .then((response) => {
      console.log("Inside Refund Response");
      console.log(response);
      if (response) {
        console.log(response);
        // str_chargeData.source = response.id;
        return { status: "success", statusCode: 201, data: response };
      } else {
        const Error = { status: "error", message: "Stripe Error" };
        // return res.status(204).json(Error);
        return { status: "error", statusCode: 204, Error };
      }
    })
    .catch((error) => {
      console.log("Errrrrrrrrrrrrrrrrrrrrrrrrr");
      console.log(error);
      const Error = {
        status: "error",
        type: error.type,
        message: error.raw.message,
      };
      // console.log(error.statusCode);
      // return res.status(error.statusCode).json(Error);
      // return { status: "error", statusCode: error.statusCode, Error };
    });
  //console.log(charge);
  return charge;
};
//LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL

module.exports = {
  createCustomerFunc,
  createTokenFunc,
  createChargeFunc,
  createRefundFunc,
};
