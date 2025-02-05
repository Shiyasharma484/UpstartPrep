const Model = require("../helpers/instructions");
const table_pinterest = "pinterest_users";
var axios = require("axios");
var qs = require("qs");
const schedule = require("node-schedule");
const SQL = require("../helpers/sql");
var fs = require("fs");

// var imageAsBase64 = fs.readFileSync("./your-image.png", "base64");

const getBasicHeaders = () => {
  return {
    headers: {
      Authorization:
        "Basic MTQ4MzUyODo3NTMxODM1MGUwYjUyZGYzMGYyMGNjNjZmNWQxMTMxZmQxYzQ0OTBl",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
};

const getHeaders = (token) => {
  return {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
};

// HTTP GET Request - Returns Resolved or Rejected Promise
const AccessTokenByRefreshToken = async (refresh_token) => {
  var url = "https://api.pinterest.com/v5/oauth/token";
  var data = qs.stringify({
    grant_type: "refresh_token",
    refresh_token: refresh_token,
  });
  try {
    const response = await axios.post(`${url}`, data, getBasicHeaders());
    return response.data.access_token;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const GetTokenByUserToken = async (token) => {
  let sql_query_payload =
    "SELECT u.*,pu.user_id,pu.refresh_token,pu.token as pinterest_token FROM users as u INNER JOIN pinterest_users as pu ON pu.user_id= u.id WHERE  u.access_token='" +
    token +
    "'";
  console.log(sql_query_payload);
  const respSql = await SQL.query(sql_query_payload);
  console.log(respSql[0].refresh_token);
  if (respSql != null) {
    var refresh_token = respSql[0].refresh_token;
    var get_access_token = await AccessTokenByRefreshToken(refresh_token);
    return get_access_token;
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

const GetToken = async (user_id) => {
  let sql_query_payload = {
    sql_script: `SELECT id,user_id,refresh_token,token FROM pinterest_users WHERE user_id = ${user_id}`,
    method: "get",
  };

  const respSql = await Model.sql_query(sql_query_payload);
  if (respSql.status == "success") {
    var refresh_token = respSql.data[0].refresh_token;
    var get_access_token = await AccessTokenByRefreshToken(refresh_token);
    return get_access_token;
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

const Publish_Pins = async (user_token, payload, pinterest_token = null) => {
  var media = payload.media_source.data;
  // var imageAsBase64 = fs.readFileSync("." + media, "base64");
  // payload.media_source.data = imageAsBase64;
  if (pinterest_token != null) {
    var token = pinterest_token;
    console.log(token);
  } else {
    var token = await GetTokenByUserToken(user_token);
  }

  var data = JSON.stringify(payload);
  var config = {
    method: "post",
    url: "https://api.pinterest.com/v5/pins",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    const response = await axios(config);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};
const UpdatePin = async (user_token, ID, payload) => {
  const token = await GetTokenByUserToken(user_token);
  console.log(token);
  var data = JSON.stringify(payload);
  var config = {
    method: "patch",
    url: "https://api.pinterest.com/v5/pins/" + ID,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    const response = await axios(config);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

const DeletePin = async (user_token, pin_id) => {
  const token = await GetTokenByUserToken(user_token);
  var config = {
    method: "delete",
    url: "https://api.pinterest.com/v5/pins/" + pin_id,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios(config);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

const GetPins = async (user_token) => {
  // var date_ob = new Date();
  // var day = ("0" + date_ob.getDate()).slice(-2);
  // var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // var year = date_ob.getFullYear();

  // var date = year + "-" + month + "-" + day;
  // console.log(date);

  // var hours = date_ob.getHours();
  // var minutes = date_ob.getMinutes();
  // var seconds = date_ob.getSeconds();

  // var dateTime =
  //   year +
  //   "-" +
  //   month +
  //   "-" +
  //   day +
  //   " " +
  //   hours +
  //   ":" +
  //   minutes +
  //   ":" +
  //   seconds;
  // console.log(dateTime);
  var mainObj = {
    dayOfWeek: [1, 2, 3, 4, 5],
    minute: 50,
    hour: 12,
  };

  var message = schedule.scheduleJob("Announcement1", mainObj, function () {
    console.log("hi");
  });
  const job = schedule.scheduleJob("25 * * * *", function () {
    console.log("The answer to life, the universe, and everything!");
  });
  var list = schedule.scheduledJobs;
  console.log("Scheduled list");
  console.log(list);
  const token = await GetTokenByUserToken(user_token);
  if (token != null) {
    var url = "https://api.pinterest.com/v5/pins";

    try {
      const response = await axios.get(`${url}`, getHeaders(token));
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
};

const GetPinsByID = async (user_token, pin_id) => {
  var payload = [];
  var respSql = {};

  const token = await GetTokenByUserToken(user_token);
  if (token != null) {
    var url = "https://api.pinterest.com/v5/pins/" + pin_id;

    try {
      const response = await axios.get(`${url}`, getHeaders(token));
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
};

const GetBoardByID = async (user_token, board_id) => {
  var payload = [];
  var respSql = {};
  const token = await GetTokenByUserToken(user_token);
  console.log(token);
  if (token != null) {
    var url = "https://api.pinterest.com/v5/boards/" + board_id;

    try {
      const response = await axios.get(`${url}`, getHeaders(token));
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
};

const GetBoards = async (user_token) => {
  var payload = [];
  var respSql = {};
  const token = await GetTokenByUserToken(user_token);
  if (token != null) {
    var url = "https://api.pinterest.com/v5/boards";

    try {
      const response = await axios.get(`${url}`, getHeaders(token));
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
};

const CreateBoard = async (user_token, payload) => {
  const token = await GetTokenByUserToken(user_token);
  var data = JSON.stringify({
    name: payload.name,
    description: payload.description,
    privacy: "PUBLIC",
  });
  var config = {
    method: "post",
    url: "https://api.pinterest.com/v5/boards",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    const response = await axios(config);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

const UpdateBoard = async (user_token, ID, payload) => {
  const token = await GetTokenByUserToken(user_token);
  var data = JSON.stringify({
    name: payload.name,
    description: payload.description,
    privacy: "PUBLIC",
  });
  var config = {
    method: "patch",
    url: "https://api.pinterest.com/v5/boards/" + ID,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    const response = await axios(config);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

const DeleteBoard = async (user_token, board_id) => {
  const token = await GetTokenByUserToken(user_token);
  var config = {
    method: "delete",
    url: "https://api.pinterest.com/v5/boards/" + board_id,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios(config);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

const Get_GPT_Model = async () => {
  // const token = await GetTokenByUserToken(user_token);
  var config = {
    method: "get",
    url: "https://api.openai.com/v1/models",
    headers: {
      Authorization:
        "Bearer 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",
    },
  };
  try {
    const response = await axios(config);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};
const Get_GPT_Description = async () => {
  // const token = await GetTokenByUserToken(user_token);
  var data = JSON.stringify({
    model: "text-davinci-003",
    prompt:
      "Write a keyword-rich and engaging Pinterest description for an image about Stay fit that gets people to click on the link to visit website and ranks high on pinterest. Complete the description with 10 high-volume, relevant hashtags to increase visibility and improve pins statistics",
    max_tokens: 7,
    temperature: 0,
  });
  var config = {
    method: "post",
    url: "https://api.openai.com/v1/completions",
    headers: {
      Authorization:
        "Bearer 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",
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    const response = await axios(config);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

module.exports = {
  AccessTokenByRefreshToken,
  Publish_Pins,
  UpdatePin,
  DeletePin,
  GetPins,
  CreateBoard,
  UpdateBoard,
  DeleteBoard,
  GetBoards,
  GetToken,
  GetTokenByUserToken,
  GetPinsByID,
  GetBoardByID,
  Get_GPT_Description,
  Get_GPT_Model,
};
