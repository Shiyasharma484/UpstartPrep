const { response } = require("express");
const {
  decodetheid,
  validation,
  toarray,
  htmlreplace,
} = require("../helpers/common");
const ModelTable = require("../models/pages");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

exports.Create = async (req, res) => {
  const validationRule = {
    title: "required|string",
    html: "required|string",
    enable: "number",
    message: "string",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;
  try {
    const valid_data = await validation(data, validationRule);
    console.log(valid_data);
    try {
      const create_response = await create(valid_data);

      var active = valid_data.enable;

      g_response["status"] = "success";
      g_response["message"] = { active: active };
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

exports.GetPageBySlug = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;

  if (req.params.slug && req.params.slug.length > 0) {
    ID = decodetheid(req.params.slug);

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

exports.UpdateById = async (req, res) => {
  const validationRule = {
    title: "required|string",
    html: "required|string",
    enable: "integer",
    message: "string",
    phone: "integer",
  };
  var ID;
  var g_response = {};
  var g_status_code;
  const data = req.body;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      const validate_data = await validation(data, validationRule);
      const saveData = {};
      saveData["id"] = ID;
      saveData["save_data"] = validate_data;
      try {
        const create_response = await update_byId(saveData);
        g_response["status"] = "success";
        g_response["message"] = " Page Updated Successfully";
        g_status_code = 201;
      } catch (err) {
        g_response["status"] = "error";
        g_response["message"] = err.message;
        g_status_code = 400;
      }
    } catch (err) {
      g_response["status"] = "err";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

const update_byId = (data) => {
  return new Promise((resolve, reject) => {
    ModelTable.updatetbyid(data, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.DeleteById = async (req, res) => {
  var deleteID;
  var g_response = {};
  var g_status_code;

  if (req.params.id && req.params.id.length > 0) {
    deleteID = req.params.id;
    try {
      const delete_resp = await delete_by_id(deleteID);
      g_response["status"] = "success";
      g_response["message"] = `PAGE Delete Successfully`;
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

const delete_by_id = (faqdeleteID) => {
  return new Promise((resolve, reject) => {
    ModelTable.deletebyid(faqdeleteID, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
