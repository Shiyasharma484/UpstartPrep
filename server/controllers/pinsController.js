const Modeltable = require("../models/pins");
const { ExtractToken } = require("../ApiMiddleware");
const { decodetheid, validation } = require("../helpers/common");
const SQL = require("../helpers/sql");
const table = "pins";
const {
  Publish_Pins,
  GetPins,
  CreatePins,
  DeletePin,
  UpdatePin,
  GetPinsByID,
} = require("../helpers/pinterest");

const { Get_GPT_Description } = require("../helpers/gpt");

//-------------------------------------------------------------------------------------------------------------

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

exports.Create = async (req, res) => {
  const validationRule = {
    // pinterest_title: "required|string",
    description: "string",
    link: "string",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;
  // var token = req.headers.token;
  // console.log(token);

  try {
    const valid_data = await validation(data, validationRule);
    try {
      // const create_response = await CreatePins(token, data);
      data.user_id = req.headers.user.id;
      const create_response = await create(data);
      g_response["status"] = "success";
      g_response["message"] = `Created ${table} Successfully`;
      g_response["responsedata"] = create_response;
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

exports.GetAllPinterestPins = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  var token = req.headers.token;

  try {
    const get_pins_data = await GetPins(token);
    console.log(get_pins_data);
    // const get_data = await get_by_id(ID);
    g_response["status"] = "success";
    g_response["responsedata"] = get_pins_data.items;
    g_status_code = 200;
    console.log(g_response);
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }
  res.status(g_status_code).json(g_response);
};

exports.GetById = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  var token = req.headers.token;

  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const get_pins_data = await GetPinsByID(token, ID);
      console.log(get_pins_data);
      // const get_data = await get_by_id(ID);
      g_response["status"] = "success";
      g_response["responsedata"] = get_pins_data;
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

exports.GetByBoardId = async (req, res) => {
  console.log(req);
  var boardID;
  var g_response = {};
  var g_status_code;
  const validationRule = {
    id: "required|number",
  };

  if (req.params.board_id && req.params.board_id.length > 0) {
    boardID = decodetheid(req.params.board_id);
    // if (req.params.id == "all") {
    //   boardID = req.params.id;
    // }
    // console.log(boardID);

    try {
      const get_data = await get_by_board_id(boardID);
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

const get_by_board_id = (boardID) => {
  console.log(boardID);
  return new Promise((resolve, reject) => {
    Modeltable.getByBoardId(boardID, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.UpdateById = async (req, res) => {
  console.log(req);
  const validationRule = {
    title: "required|varchar",
    description: "varchar",
    board_id: "required|number",
  };
  var ID;
  var g_response = {};
  var g_status_code;
  var token = req.headers.token;
  const data = req.body;
  console.log(data);
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      const validate_data = await validation(data, validationRule);

      try {
        const update_response = await UpdatePin(token, ID, data);

        g_response["status"] = "success";
        g_response["message"] = `Update ${table} Successfully`;
        g_response["responsedata"] = update_response;

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

exports.UpdateByUserId = async (req, res) => {
  console.log(req);
  const validationRule = {
    pinterest_title: "required|varchar",
  };
  var ID;
  var g_response = {};
  var g_status_code;
  const data = req.body;
  if (req.params.id && req.params.id.length > 0) {
    ID = decodetheid(req.params.id);
    try {
      const validate_data = await validation(data, validationRule);

      const saveData = {};
      saveData["id"] = ID;
      saveData["save_data"] = validate_data;
      try {
        const update_response = await update_byId(saveData);

        g_response["status"] = "success";
        g_response["message"] = `Update ${table} Successfully`;
        g_response["responsedata"] = update_response;

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
  var token = req.headers.token;
  if (req.params.id && req.params.id.length > 0) {
    deleteID = req.params.id;
    try {
      // const delete_resp = await delete_by_id(deleteID);
      const delete_resp = await DeletePin(token, deleteID);
      g_response["status"] = "success";
      g_response["message"] = `PIN Deleted Successfully`;
      g_response["responsedata"] = delete_resp;
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

exports.PublishPins = async (req, res) => {
  const validationRule = {
    title: "required|varchar",
    description: "varchar",
    board_id: "required|number",
    // parent_pin_id: "number",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;
  var token = req.headers.token;
  console.log(token);

  try {
    const valid_data = await validation(data, validationRule);
    try {
      const create_response = await Publish_Pins(token, data);
      // const create_response = await create(data);
      g_response["status"] = "success";
      g_response["message"] = `Created ${table} Successfully`;
      g_response["responsedata"] = create_response;
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

exports.GenerateDescription = async (req, res) => {
  const validationRule = {
    title: "required|varchar",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;
  var token = req.headers.token;
  console.log(token);

  try {
    const valid_data = await validation(data, validationRule);
    try {
      // const create_response = await CreatePins(token, data);
      const create_response = await Get_GPT_Description(data);
      g_response["status"] = "success";
      g_response["Description"] = create_response;
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

const createdescription = (data) => {
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
exports.GetAllPins = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    if (req.params.id == "all") {
      var WHERE = { user_id: req.headers.user.id, scheduled: 0 };
    } else {
      var WHERE = {
        user_id: req.headers.user.id,
        id: req.params.id,
        scheduled: 0,
      };
    }
    try {
      const get_data = await SQL.gettabledata("pins", [], WHERE);
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

exports.DeleteByUserId = async (req, res) => {
  var deleteID;
  var g_response = {};
  var g_status_code;
  var token = req.headers.token;
  if (req.params.id && req.params.id.length > 0) {
    deleteID = req.params.id;
    try {
      const delete_resp = await delete_by_id(deleteID);
      g_response["status"] = "success";
      g_response["message"] = `Pin Deleted Successfully`;
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

const delete_by_id = (deleteID) => {
  return new Promise((resolve, reject) => {
    Modeltable.deletebyid(deleteID, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
