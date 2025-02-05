const LinkedIn = require("../models/linkedin");
const Post = require("../models/post");
const { ExtractToken } = require("../ApiMiddleware");
var fs = require("fs");

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
          try {
            const rec_token = payload_data.access_token;
            //const rec_token = compile_data[0].token; //test from db
            const profile_data = await hit_profile_api(rec_token);
            // console.log(profile_data); //h8ypr09Far
            const saveData = {};
            saveData["connect_id"] = connect_id;
            saveData["save_data"] = {
              token: payload_data.access_token,
              token_expires_in: payload_data.expires_in,
              refresh_token: payload_data.refresh_token,
              refresh_token_expires_in: payload_data.refresh_token_expires_in,
              profile_id: profile_data,
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
          platform: "linkedin",
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
  //console.log(data);
  try {
    const validate_data = await check_valid_data_create_post(data);
    try {
      const post_data_resp = await create_post(validate_data);
      try {
        const userId = data.user_id;
        const connect_data = await fetch_connect_by_userId(userId);
        const saveData = {};
        var var_success = 0;
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if (validate_data.images && validate_data.images.length > 0) {
          console.log("Images Exists");
          //Step-1 initialization---------------------starts
          const initialization_data = {
            token: connect_data[0].token,
            profile_id: connect_data[0].profile_id,
          };
          try {
            const initialization_data_resp = await hit_initialization_api(
              initialization_data
            );
            // console.log(initialization_data_resp);
            const uploadUrl = initialization_data_resp.value.uploadUrl;
            //console.log(uploadUrl);
            const imageID = initialization_data_resp.value.image;
            //console.log(imageID); //'urn:li:image:C4D10AQESCi5PRcZZvg'
            // {
            //   value: {
            //     uploadUrlExpiresAt: 1671031388802,
            //     uploadUrl: 'https://www.linkedin.com/dms-uploads/C4D10AQESCi5PRcZZvg/uploaded-image/0?ca=vector_ads&cn=uploads&sync=0&v=beta&ut=3mA2LjK71XYqw1',
            //     image: 'urn:li:image:C4D10AQESCi5PRcZZvg'
            //   }
            // }
            //Step-1 initialization---------------------ends
            //
            //Step-2 upload photo in url received-----------------starts
            const file = fs.readFileSync("./" + validate_data.images);
            //console.log(file);
            const blob = Buffer.from(file);
            //console.log(blob);
            //
            const photo_data = {
              linkedin_upload_url: uploadUrl,
              // image_url: validate_data.images,
              image_url: blob,
              token: connect_data[0].token,
            };
            // console.log(photo_data);
            try {
              const upload_photo_resp = await hit_upload_photo_api(photo_data);
              //console.log(upload_photo_resp); //success
              //Step-2 upload photo in url received-----------------ends
              //step-3 post and see pic--------------------------------------------Starts
              const post_photo_data = {
                imageID: imageID,
                profile_id: connect_data[0].profile_id,
                token: connect_data[0].token,
                message: validate_data.description,
              };
              try {
                const post_photo_resp = await hit_post_photo_api(
                  post_photo_data
                );
                // console.log(post_photo_resp);
                const stringifiedData = JSON.stringify(post_photo_resp);
                saveData["post_id"] = post_data_resp;
                saveData["save_data"] = {
                  linkedin_received_data: stringifiedData,
                };
                // console.log("Everyting Done");
                var_success = 1;
              } catch (err) {
                g_response["status"] = "error";
                g_response["message"] = err.message;
                g_status_code = err.statusCode;
              }
              //step-3 post and see pic--------------------------------------------Ends
            } catch (err) {
              g_response["status"] = "error";
              g_response["message"] = err.message;
              g_status_code = err.statusCode;
            }
            //
          } catch (err) {
            g_response["status"] = "error";
            g_response["message"] = err.message;
            g_status_code = err.statusCode;
          }
        }
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        else {
          console.log("Only Text");
          const compile_data = {
            token: connect_data[0].token,
            message: validate_data.description,
            profile_id: connect_data[0].profile_id,
          };
          try {
            const payload_data = await hit_create_post_api(compile_data);
            // { id: 'urn:li:share:7004109897650860032' }
            const stringifiedData = JSON.stringify(payload_data);
            //console.log(payload_data);
            saveData["post_id"] = post_data_resp;
            saveData["save_data"] = { linkedin_received_data: stringifiedData };
            var_success = 1;
          } catch (err) {
            g_response["status"] = "error";
            g_response["message"] = err.message;
            g_status_code = err.statusCode;
          }
        }
        if (var_success == 1) {
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
    LinkedIn.fetchConnect(id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const fetch_connect_by_userId = (id) => {
  return new Promise((resolve, reject) => {
    LinkedIn.fetchConnectByUserId(id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const trash_connect = (id) => {
  return new Promise((resolve, reject) => {
    LinkedIn.trashConnect(id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const delete_connect = (id) => {
  return new Promise((resolve, reject) => {
    LinkedIn.deleteConnect(id, (err, res) => {
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
    LinkedIn.create_auth_url(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const create_connect = (data) => {
  return new Promise((resolve, reject) => {
    LinkedIn.createConnect(data, (err, res) => {
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
    LinkedIn.updateConnect(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const fetch_connect_data_by_acess_token = (access_token) => {
  return new Promise((resolve, reject) => {
    LinkedIn.fetchConnectByAccessToken(access_token, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const hit_auth_api = (data) => {
  return new Promise((resolve, reject) => {
    LinkedIn.auth_api(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const hit_profile_api = (data) => {
  return new Promise((resolve, reject) => {
    LinkedIn.profile_api(data, (err, res) => {
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
      data.description &&
      data.description.length > 0
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
    LinkedIn.createPost(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const hit_create_post_api = (data) => {
  return new Promise((resolve, reject) => {
    LinkedIn.create_post(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

const hit_initialization_api = (data) => {
  return new Promise((resolve, reject) => {
    LinkedIn.photo_initialization(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const hit_upload_photo_api = (data) => {
  return new Promise((resolve, reject) => {
    LinkedIn.photo_upload(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const hit_post_photo_api = (data) => {
  return new Promise((resolve, reject) => {
    LinkedIn.photo_post(data, (err, res) => {
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
