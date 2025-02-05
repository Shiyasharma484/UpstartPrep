const Modeltable = require("../models/gpt");
const { decodetheid, validation } = require("../helpers/common");
const table = "gpt";

//-------------------------------------------------------------------------------------------------------------

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

exports.Create = async (req, res) => {
  const validationRule = {
    model: "required|string",
    context: "required|string",
    active: "number",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;
  console.log(data);
  try {
    const valid_data = await validation(data, validationRule);
    console.log("LLLLLLLLLLLLLLLLLVVVVVVVVVVVVVVVVVVVVVVVVVVVVVLLLLLLLLLLLLLL");
    console.log(valid_data.active);
    try {
      const create_response = await create(data);
      console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
      console.log(create_response);
      g_response["status"] = "success";
      g_response["message"] = `Created ${table} Successfully`;
      g_response["responsedata"] = { valid_data };
      g_response["active"] = { active: valid_data.active };

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
  console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKK");
  var ID;
  var g_response = {};
  var g_status_code;
  console.log(req.params);

  if (req.params.id && req.params.id.length > 0) {
    ID = decodetheid(req.params.id);
    console.log(ID);
    if (req.params.id == "all") {
      ID = req.params.id;
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
  console.log("JJJJJJJJJJJJJJJJJJJJJJJJJ");
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

exports.UpdateGPTByID = async (req, res) => {
  console.log(req);
  const validationRule = {
    model: "required|string",
    context: "required|string",
    active: "number",
  };
  var ID;
  var g_response = {};
  var g_status_code;

  const data = req.body;
  console.log(data);
  if (req.params.id && req.params.id.length > 0) {
    ID = decodetheid(req.params.id);

    try {
      const validate_data = await validation(data, validationRule);

      const saveData = {};
      saveData["id"] = ID;
      saveData["save_data"] = validate_data;

      try {
        const create__response = await update_byId(saveData);

        g_response["status"] = "success";
        g_response["message"] = `Update ${table} Successfully`;
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
    Modeltable.update(data, (err, res) => {
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
    deleteID = decodetheid(req.params.id);
    try {
      const delete_resp = await delete_by_id(deleteID);
      g_response["status"] = "success";
      g_response["message"] = `${table} Delete Successfully`;
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
    Modeltable.deletebyid(faqdeleteID, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
