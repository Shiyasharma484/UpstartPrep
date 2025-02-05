const { response } = require("express");
const {
  decodetheid,
  validation,
  toarray,
  htmlreplace,
} = require("../helpers/common");

const ModelTable = require("../models/contactUS");

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

exports.Create = async (req, res) => {
  const validationRule = {
    email: "required|email",
    subject: "required|string",
    fullname: "string",
    message: "string",
    phone: "number",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;
  try {
    const valid_data = await validation(data, validationRule);
    try {
      const create_response = await create(valid_data);

      g_response["status"] = "success";
      g_response["message"] = "Request Submitted Successfully";
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

const create = (data) => {
  return new Promise((resolve, reject) => {
    ModelTable.create(data, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.GetAll = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;

  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    if (req.params.id == "all") {
      ID = req.params.id;
      console.log(ID);
    }
    try {
      const get_data = await get_by_id(ID);
      g_response["status"] = "success";
      g_response["responsedata"] = get_data;
      g_status_code = 200;
      console.log(g_response);
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

const get_by_id = (ID) => {
  return new Promise((resolve, reject) => {
    ModelTable.getById(ID, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
