const Modeltable = require("../models/pinterest");
const { ExtractToken } = require("../ApiMiddleware");
var querystring = require("querystring");
var axios = require("axios");
var qs = require("qs");

const { decodetheid, validation } = require("../helpers/common");
const {
  CreatePins,
  GetPins,
  GetBoards,
  CreateBoard,
  DeleteBoard,
  AccessTokenByRefreshToken,
  GetTokenByUserToken,
} = require("../helpers/pinterest");
const table = "pinterest";
//-------------------------------------------------------------------------------------------------------------

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

exports.access_token = async (req, res) => {
  // var post_options = {
  //   host: 'closure-compiler.appspot.com',
  //   port: '80',
  //   path: '/compile',
  //   method: 'POST',
  //   headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       'Content-Length': Buffer.byteLength(post_data)
  //   }
  // };

  // Set up the request
  // var post_req = http.request(post_options, function(res) {
  //     res.setEncoding('utf8');
  //     res.on('data', function (chunk) {
  //         console.log('Response: ' + chunk);
  //     });
  // });
  var ID;
  var g_response = {};
  var g_status_code;
  const data = req.body;
  var token = req.headers.token;
  if (req.params.user_id && req.params.user_id.length > 0) {
    ID = decodetheid(req.params.user_id);
    console.log(ID);
    try {
      // const get_user_pins = await CreatePins(ID);

      const PinterestToken = await GetTokenByUserToken(token);
      // const get_data = await Get_access_token(ID);
      g_response["status"] = "success";
      g_response["responsedata"] = { Pinterest_token: PinterestToken };
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

const Get_access_token = (ID) => {
  console.log(ID);
  return new Promise((resolve, reject) => {
    Modeltable.get_access_token(ID, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.GetAuthURL = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;

  console.log(ID);
  console.log("KKKKKKKKK");
  try {
    const get_data = await get_auth_url(ID);
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
};
exports.GetById = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  const validationRule = {
    id: "required|number",
  };

  if (req.params.id && req.params.id.length > 0) {
    ID = decodetheid(req.params.id);
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

const get_auth_url = (ID) => {
  console.log(ID);
  return new Promise((resolve, reject) => {
    Modeltable.get_authurl(ID, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
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

exports.UpdateById = async (req, res) => {
  console.log(req);
  const validationRule = {
    client_id: "required|varchar",
    client_secret: "required|string",
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

exports.update_access_token = async (req, res) => {
  // console.log(req);
  const validationRule = {
    user_id: "required|varchar",
    code: "required|varchar",
  };
  var ID;
  var g_response = {};
  var g_status_code;

  if (req.body.user_id && req.body.user_id.length > 0) {
    ID = decodetheid(req.body.user_id);
    console.log(ID);

    try {
      const validate_data = await validation(req.body, validationRule);
      var query_data = qs.stringify({
        grant_type: "authorization_code",
        code: req.body.code,
        redirect_uri: "http://localhost:3001/admin/users/social_accounts",
      });

      var config = {
        method: "post",
        url: "https://api.pinterest.com/v5/oauth/token",
        headers: {
          Authorization:
            "Basic MTQ4MzUyODo3NTMxODM1MGUwYjUyZGYzMGYyMGNjNjZmNWQxMTMxZmQxYzQ0OTBl",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: query_data,
      };
      axios(config)
        .then(function (response) {
          console.log(response.data);
          const saveData = {};
          saveData["id"] = ID;
          saveData["save_data"] = {
            token: response.data.access_token,
            refresh_token: response.data.refresh_token,
          };
          try {
            console.log(saveData);

            const create__response = update_AccessToken(saveData);

            g_response["status"] = "success";
            g_response["message"] = `AccessToken Updated Successfully`;
            g_status_code = 201;
            res.status(g_status_code).json(g_response);
          } catch (err) {
            g_response["status"] = "error";
            g_response["message"] = err.message;
            g_status_code = 400;
            res.status(g_status_code).json(g_response);
          }
        })
        .catch(function (error) {
          console.log(error);

          g_response["status"] = "error";
          g_response["message"] = error.message;
          g_status_code = 400;
          res.status(g_status_code).json(g_response);
        });
    } catch (err) {
      g_response["status"] = "err";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

const update_AccessToken = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    Modeltable.updateAccessToken(data, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
