const Twitter = require("../models/twitter");
const Post = require("../models/post");
const { ExtractToken } = require("../ApiMiddleware");
//-------------------------------------------------------------------------------------------------------------
//
/*-----------ConnectsByUserId------------------------------starts here--------------------*/
exports.ConnectsByUserId = async (req, res) => {
  var userId;
  var g_response = {};
  var g_status_code;
  //CASE -1 -------------------------------------------GET BY ID
  if (req.params.id && req.params.id > 0) {
    userId = req.params.id;
    try {
      const connect_data = await fetch_connect_by_userId(userId);
      if (
        connect_data[0].client_id &&
        connect_data[0].client_id.length > 0 &&
        connect_data[0].redirect_uri &&
        connect_data[0].redirect_uri.length > 0
      ) {
        try {
          const auth_url = await create_auth_url(connect_data[0]);
          var final_data = connect_data;
          final_data[0]["auth_url"] = auth_url;
          g_response["status"] = "success";
          g_response["responsedata"] = { connects: final_data };
          g_status_code = 200;
        } catch (err) {
          g_response["status"] = "error";
          g_response["message"] = err.message;
          g_status_code = err.statusCode;
        }
      } else {
        g_response["status"] = "success";
        g_response["responsedata"] = { connects: connect_data };
        g_status_code = 200;
      }
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = err.statusCode;
    }
    res.status(g_status_code).json(g_response);
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
/*-----------ConnectsByUserId------------------------------ends here--------------------*/
//
/*-----------DeleteConnect---------------------------starts here--------------------*/
exports.DeleteConnect = async (req, res) => {
  var connectId;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id > 0) {
    connectId = req.params.id;
    try {
      const connect_delete_data = await delete_connect(connectId);
      g_response["status"] = "success";
      g_response["message"] = connect_delete_data;
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = err.statusCode;
    }
    res.status(g_status_code).json(g_response);
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
/*-----------DeleteConnect---------------------------ends here--------------------*/
//
/*-----------TrashConnect---------------------------starts here--------------------*/
exports.TrashConnect = async (req, res) => {
  var connectId;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id > 0) {
    connectId = req.params.id;
    try {
      const connect_trash_data = await trash_connect(connectId);
      g_response["status"] = "success";
      g_response["message"] = connect_trash_data;
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = err.statusCode;
    }
    res.status(g_status_code).json(g_response);
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
/*-----------TrashConnect---------------------------ends here--------------------*/
//
/*-----------CreateConnect---------------------------starts here--------------------*/
exports.CreateConnect = async (req, res) => {
  var g_response = {};
  var g_status_code;
  const data = req.body;
  try {
    const validate_data = await check_valid_data_create_connect(data);
    try {
      const auth_url = await create_auth_url(validate_data);
      try {
        const connect_data_id = await create_connect(validate_data);
        try {
          const connect_data = await fetch_connect(connect_data_id);
          var final_data = connect_data;
          final_data[0]["auth_url"] = auth_url;
          g_response["status"] = "success";
          g_response["responsedata"] = { connects: final_data };
          g_status_code = 201;
        } catch (err) {
          g_response["status"] = "error";
          g_response["message"] = err.message;
          g_status_code = err.statusCode;
        }
      } catch (err) {
        g_response["status"] = "error";
        g_response["message"] = err.message;
        g_status_code = err.statusCode;
      }
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = err.statusCode;
    }
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = err.statusCode;
  }
  res.status(g_status_code).json(g_response);
};
/*-----------CreateConnect---------------------------ends here--------------------*/
//
/*-----------UpdateConnect---------------------------starts here--------------------*/
exports.UpdateConnect = async (req, res) => {
  const data = req.body;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    const connectId = req.params.id;
    try {
      const update_data = await check_valid_data_connect_update(data);
      const saveData = {};
      saveData["connect_id"] = connectId;
      saveData["save_data"] = update_data;
      try {
        const update_connect_data_resp = await update_connect(saveData);
        g_response["status"] = "success";
        g_response["message"] = "Connect Updated Successfully";
        g_status_code = 200;
      } catch (err) {
        g_response["status"] = "error";
        g_response["message"] = err.message;
        g_status_code = err.statusCode;
      }
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = "Invalid Details";
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
/*-----------UpdateConnect---------------------------ends here--------------------*/
//
/*-----------CodeAuthToken---------------------------starts here--------------------*/
exports.CodeAuthToken = async (req, res) => {
  const basic_auth = req.headers.token;
  const access_token = await ExtractToken(basic_auth);
  var g_response = {};
  var g_status_code;
  const owner_id = 1; //owner db id
  if (req.body.code && req.body.code.length > 0) {
    const code = req.body.code;
    try {
      const connect_data = await fetch_connect(owner_id);
      var compile_data = connect_data;
      compile_data[0]["code"] = code;
      try {
        const user_connect_data_resp = await fetch_connect_data_by_acess_token(
          access_token
        ); //get logged in user id
        const connect_id = user_connect_data_resp[0].id;
        try {
          const payload_data = await hit_auth_api(compile_data);
          // {
          //   token_type: 'bearer',
          //   expires_in: 7200,
          //   access_token: 'Q2haMFhqS1VHalpkYmVPVmxsWmVveGdHUUxYeV9hTF9kVjRJamVBbndhRU55OjE2NzA0Mzk4NjY3MjY6MToxOmF0OjE',
          //   scope: 'tweet.write users.read like.read tweet.read'
          // }
          const saveData = {};
          saveData["connect_id"] = connect_id;
          saveData["save_data"] = {
            token: payload_data.access_token,
            token_expires_in: payload_data.expires_in,
          };
          try {
            const update_connect_data_resp = await update_connect(saveData);
            g_response["status"] = "success";
            //g_response["message"] = "Connect Updated Successfully";
            g_response["responsedata"] = { token: payload_data.access_token };
            g_status_code = 200;
          } catch (err) {
            g_response["status"] = "error";
            g_response["message"] = err.message;
            g_status_code = err.statusCode;
          }
        } catch (err) {
          g_response["status"] = "error";
          g_response["message"] = err.message;
          g_status_code = err.statusCode;
        }
      } catch (err) {
        g_response["status"] = "error";
        g_response["message"] = err.message;
        g_status_code = err.statusCode;
      }
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = err.statusCode;
    }
    res.status(g_status_code).json(g_response);
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
/*-----------CodeAuthToken---------------------------ends here--------------------*/
//
/*-----------AuthUrl---------------------------starts here--------------------*/
exports.AuthUrl = async (req, res) => {
  var g_response = {};
  var g_status_code;
  const owner_id = 1; //owner db id
  try {
    const connect_data = await fetch_connect(owner_id);
    if (
      connect_data[0].client_id &&
      connect_data[0].client_id.length > 0 &&
      connect_data[0].redirect_uri &&
      connect_data[0].redirect_uri.length > 0
    ) {
      try {
        const auth_url = await create_auth_url(connect_data[0]);
        var final_data = {
          platform: "twitter",
          auth_url: auth_url,
        };
        g_response["status"] = "success";
        g_response["responsedata"] = final_data;
        g_status_code = 200;
      } catch (err) {
        g_response["status"] = "error";
        g_response["message"] = err.message;
        g_status_code = err.statusCode;
      }
    } else {
      g_response["status"] = "error";
      g_response["message"] = "Auth Credentials Missing";
      g_status_code = 400;
    }
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = err.statusCode;
  }
  res.status(g_status_code).json(g_response);
};
/*-----------AuthUrl---------------------------ends here--------------------*/
//
/*-----------CreatePost---------------------------starts here--------------------*/
exports.CreatePost = async (req, res) => {
  var g_response = {};
  var g_status_code;
  const data = req.body;
  try {
    const validate_data = await check_valid_data_create_post(data);
    const temp = JSON.stringify(validate_data.description);
    validate_data.description = temp;
    try {
      const post_data_resp = await create_post(validate_data);
      try {
        const userId = data.user_id;
        const connect_data = await fetch_connect_by_userId(userId);
        const compile_data = {
          token: connect_data[0].token,
          message: data.description,
        };
        //    console.log(compile_data);
        try {
          const payload_data = await hit_create_post_api(compile_data);
          // console.log(payload_data);
          // {
          //   data: {
          //     id: '1598429149630443521',
          //     text: 'facdddddebwwwwook qqq post deep link hkhjhk! https://t.co/rgQChqAHna'
          //   }
          // }
          const stringifiedData = JSON.stringify(payload_data);
          const saveData = {};
          saveData["post_id"] = post_data_resp;
          saveData["save_data"] = { twitter_received_data: stringifiedData };
          try {
            const update_post_data_resp = await update_post(saveData);
            g_response["status"] = "success";
            g_response["responsedata"] = "Post Created Successfully";
            g_status_code = 201;
          } catch (err) {
            g_response["status"] = "error";
            g_response["message"] = err.message;
            g_status_code = err.statusCode;
          }
        } catch (err) {
          g_response["status"] = "error";
          g_response["message"] = err.message;
          g_status_code = err.statusCode;
        }
      } catch (err) {
        g_response["status"] = "error";
        g_response["message"] = err.message;
        g_status_code = err.statusCode;
      }
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = err.statusCode;
    }
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = err.statusCode;
  }
  res.status(g_status_code).json(g_response);
};
/*-----------CreatePost---------------------------ends here--------------------*/
//
//----FUNCTIONS----------------------------------------------------------STARTS
const fetch_connect = (id) => {
  return new Promise((resolve, reject) => {
    Twitter.fetchConnect(id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const fetch_connect_by_userId = (id) => {
  return new Promise((resolve, reject) => {
    Twitter.fetchConnectByUserId(id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const trash_connect = (id) => {
  return new Promise((resolve, reject) => {
    Twitter.trashConnect(id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const delete_connect = (id) => {
  return new Promise((resolve, reject) => {
    Twitter.deleteConnect(id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const check_valid_data_create_connect = (data) => {
  return new Promise((resolve, reject) => {
    if (
      data.user_id &&
      data.user_id > 0 &&
      data.client_id &&
      data.client_id.length > 0 &&
      data.client_secret &&
      data.client_secret.length > 0 &&
      data.redirect_uri &&
      data.redirect_uri.length > 0
    ) {
      let filteredData = {};

      filteredData["user_id"] = data.user_id;
      filteredData["client_id"] = data.client_id;
      filteredData["client_secret"] = data.client_secret;
      filteredData["redirect_uri"] = data.redirect_uri;
      resolve(filteredData);
    } else {
      const Error = { statusCode: 400, message: "Invalid Details" };
      reject(Error);
    }
  });
};
const create_auth_url = (data) => {
  return new Promise((resolve, reject) => {
    Twitter.create_auth_url(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const create_connect = (data) => {
  return new Promise((resolve, reject) => {
    Twitter.createConnect(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const check_valid_data_connect_update = (data) => {
  return new Promise((resolve, reject) => {
    if (
      data.user_id &&
      data.user_id > 0 &&
      data.client_id &&
      data.client_id.length > 0 &&
      data.client_secret &&
      data.client_secret.length > 0 &&
      data.redirect_uri &&
      data.redirect_uri.length > 0
    ) {
      let filteredData = Object.fromEntries(
        Object.entries(data).filter(
          ([_, v]) => v != "null" && v != "" && v != null
        )
      );
      if (
        filteredData &&
        filteredData !== undefined &&
        Object.keys(filteredData).length != 0
      ) {
        if ("active" in data === true) {
          filteredData["active"] = data.active;
        }
        resolve(filteredData);
      } else {
        const Error = { statusCode: 400, message: "Invalid Details" };
        reject(Error);
      }
    } else {
      const Error = { statusCode: 400, message: "Invalid Details" };
      reject(Error);
    }
  });
};
const update_connect = (data) => {
  return new Promise((resolve, reject) => {
    Twitter.updateConnect(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const fetch_connect_data_by_acess_token = (access_token) => {
  return new Promise((resolve, reject) => {
    Twitter.fetchConnectByAccessToken(access_token, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const hit_auth_api = (data) => {
  return new Promise((resolve, reject) => {
    Twitter.auth_api(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const check_valid_data_create_post = (data) => {
  return new Promise((resolve, reject) => {
    if (
      data.title &&
      data.title.length > 0 &&
      data.description //&&
      //  data.description.length > 0
    ) {
      let filteredData = Object.fromEntries(
        Object.entries(data).filter(
          ([_, v]) => v != "null" && v != "" && v != null
        )
      );
      if (
        filteredData &&
        filteredData !== undefined &&
        Object.keys(filteredData).length != 0
      ) {
        if ("active" in data === true) {
          filteredData["active"] = data.active;
        }
        resolve(filteredData);
      } else {
        const Error = { statusCode: 400, message: "Invalid Details" };
        reject(Error);
      }
    } else {
      const Error = { statusCode: 400, message: "Invalid Details" };
      reject(Error);
    }
  });
};
const create_post = (data) => {
  return new Promise((resolve, reject) => {
    Twitter.createPost(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const hit_create_post_api = (data) => {
  return new Promise((resolve, reject) => {
    Twitter.create_post(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const update_post = (data) => {
  return new Promise((resolve, reject) => {
    Post.updatePost(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
