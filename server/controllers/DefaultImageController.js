const Modeltable = require("../models/defaultimage");
const { ExtractToken } = require("../ApiMiddleware");
const { decodetheid, validation } = require("../helpers/common");
const SQL = require("../helpers/sql");
const table = "default_links";
//-------------------------------------------------------------------------------------------------------------

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

exports.Create = async (req, res) => {
  const validationRule = {
    // user_id: "required|integer",
    image_url: "required|varchar",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;

  try {
    const valid_data = await validation(data, validationRule);
    try {
      const create_response = await create(valid_data);
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

const create = (data) => {
  return new Promise((resolve, reject) => {
    Modeltable.create(data, (err, res) => {
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

  if (req.headers.user.id > 0) {
    var WHERE = {
      user_id: req.headers.user.id,
    };
    try {
      const get_data = await SQL.gettabledata(
        "default_links",
        ["image_url", "link"],
        WHERE
      );
      console.log(get_data);
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
  console.log(ID);
  return new Promise((resolve, reject) => {
    Modeltable.getById(ID, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.UpdateByUserId = async (req, res) => {
  const data = req.body;
  var g_response = {};
  var g_status_code;
  console.log(req.headers.user);
  if (req.body) {
    try {
      var update_data = await SQL.Updatedata("default_links", data, {
        user_id: req.headers.user.id,
      });
      g_response["status"] = "success";
      g_response["message"] = `${table} Updated Successfully`;
      g_status_code = 201;
      res.status(g_status_code).json(g_response);
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
      res.status(g_status_code).json(g_response);
    }
  }
};

const update_byId = (data) => {
  return new Promise((resolve, reject) => {
    Modeltable.update(data, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
