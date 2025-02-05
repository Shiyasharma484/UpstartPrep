const Model = require("./instructions");
const table_pinterest = "pinterest_users";
var axios = require("axios");
var qs = require("qs");
const schedule = require("node-schedule");

var fs = require("fs");
function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}
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

const GPTInfo = async () => {
  let sql_query_payload = {
    sql_script: "SELECT * FROM gpt WHERE active = 1 LIMIT 1",
    method: "get",
  };

  const respSql = await Model.sql_query(sql_query_payload);
  console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
  console.log(respSql);
  if (respSql.status == "success") {
    return null, respSql.data[0];
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
const Get_GPT_Description = async (payload) => {
  const GptInfo = await GPTInfo();
  console.log(GptInfo);
  var context_data = replaceAll(GptInfo.context, "[TITLE]", payload.title);
  console.log(context_data);

  var data = JSON.stringify({
    model: GptInfo.model,
    prompt: context_data,
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
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

module.exports = {
  GPTInfo,
  Get_GPT_Description,
  Get_GPT_Model,
};
