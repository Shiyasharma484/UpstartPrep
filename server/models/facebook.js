var axios = require("axios");
var qs = require("qs");
const Model = require("../helpers/instructions");
const { checkrole } = require("./user");
const table_facebook = "facebook";
const table_user = "users";
const table_post = "posts";

const Auth_Url = process.env.REACT_APP_FACEBOOK_AUTH_URL;
const Auth_Scope = process.env.REACT_APP_FACEBOOK_AUTH_SCOPE;
const Authentication = process.env.REACT_APP_FACEBOOK_AUTHENTICATION_URL;
const Create_Post_Text_Url =
  process.env.REACT_APP_FACEBOOK_CREATE_POST_TEXT_URL;
const Create_Post_Photo_Url =
  process.env.REACT_APP_FACEBOOK_CREATE_POST_PHOTO_URL;
// Plan object constructor
var Facebook = function () {};
//
/*-----------fetchConnect------------------------------starts here--------------------*/
Facebook.fetchConnect = async (connectId, result) => {
  let sql_query_payload = {
    sql_script: `SELECT id, user_id, client_id, client_secret, redirect_uri, refresh_token, refresh_token_expires_in, token, token_expires_in, active FROM ${table_facebook} WHERE trash = 0 AND id=${connectId}`,
    method: "get",
  };
  const respSql = await Model.sql_query(sql_query_payload);
  if (respSql.status == "success") {
    result(null, respSql.data);
  } else if (respSql.status == "error") {
    const err = respSql.message;
    const respError = await Model.error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    result(Error, null);
  }
};
/*-----------fetchConnect------------------------------ends here--------------------*/
//

/*-----------fetchConnectByUserId------------------------------starts here--------------------*/
Facebook.fetchConnectByUserId = async (userId, result) => {
  let sql_query_payload = {
    sql_script: `SELECT id, user_id, client_id, client_secret, redirect_uri, refresh_token, token, active FROM ${table_facebook} WHERE trash = 0 AND user_id=${userId}`,
    method: "get",
  };
  const respSql = await Model.sql_query(sql_query_payload);
  if (respSql.status == "success") {
    result(null, respSql.data);
  } else if (respSql.status == "error") {
    const err = respSql.message;
    const respError = await Model.error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    result(Error, null);
  }
};
/*-----------fetchConnectByUserId------------------------------ends here--------------------*/
//
/*-----------deleteConnect------------------------------starts here--------------------*/
Facebook.deleteConnect = async (connectId, result) => {
  let delete_payload = {
    table_name: table_facebook,
    query_field: "id",
    query_value: connectId,
  };
  const respDelete = await Model.delete_query(delete_payload);
  if (respDelete.status == "success") {
    const message = "Connect Deleted Successfully";
    result(null, message);
  } else if (respDelete.status == "error") {
    const err = respDelete.message;
    const respError = await Model.error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    result(Error, null);
  }
};
/*-----------deleteConnect------------------------------ends here--------------------*/
//
/*-----------trashConnect------------------------------starts here--------------------*/
Facebook.trashConnect = async (connectId, result) => {
  let delete_payload = {
    table_name: table_facebook,
    query_field: "id",
    query_value: connectId,
    dataToSave: {
      active: 0,
      trash: 1,
    },
  };
  const respDelete = await Model.trash_query(delete_payload);
  if (respDelete.status == "success") {
    const message = "Connect Deleted Successfully";
    result(null, message);
  } else if (respDelete.status == "error") {
    const err = respDelete.message;
    const respError = await Model.error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    result(Error, null);
  }
};
/*-----------trashConnect------------------------------ends here--------------------*/
//
/*-----------createConnect------------------------------starts here--------------------*/
Facebook.createConnect = async (saveData, result) => {
  let add_payload = {
    table_name: table_facebook,
    dataToSave: saveData,
  };
  const respAdd = await Model.add_query(add_payload);
  if (respAdd.status == "success") {
    result(null, respAdd.id);
  } else if (respAdd.status == "error") {
    const err = respAdd.message;
    const respError = await Model.error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    result(Error, null);
  }
};
/*-----------createConnect------------------------------ends here--------------------*/
//
/*-----------updateConnect------------------------------starts here--------------------*/
Facebook.updateConnect = async (data, result) => {
  let update_payload = {
    table_name: table_facebook,
    query_field: "id",
    query_value: data.connect_id,
    dataToSave: data.save_data,
  };
  const respCustomer = await Model.edit_query(update_payload);
  if (respCustomer.status == "success") {
    result(null, respCustomer.status);
  } else if (respCustomer.status == "error") {
    const err = respCustomer.message;
    const respError = await Model.error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    result(Error, null);
  }
};
/*-----------updateConnect------------------------------ends here--------------------*/
//
/*-----------fetchConnectByAccessToken------------------------------starts here--------------------*/
Facebook.fetchConnectByAccessToken = async (access_token, result) => {
  let sql_query_payload = {
    sql_script: `SELECT f.id, f.user_id, f.client_id, f.client_secret, f.redirect_uri, f.token FROM ${table_facebook} as f LEFT JOIN ${table_user} as u ON u.id=f.user_id WHERE f.trash = 0 AND u.access_token="${access_token}"`,
    method: "get",
  };
  const respSql = await Model.sql_query(sql_query_payload);
  if (respSql.status == "success") {
    result(null, respSql.data);
  } else if (respSql.status == "error") {
    const err = respSql.message;
    const respError = await Model.error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    result(Error, null);
  }
};
/*-----------fetchConnectByAccessToken------------------------------ends here--------------------*/
//
/*-----------create_auth_url------------------------------starts here--------------------*/
Facebook.create_auth_url = async (data, result) => {
  //
  //needed auth_url sample---------------------------------------------STARTS
  // console.log(
  //   "https://www.facebook.com/v15.0/dialog/oauth?client_id=<YOUR_APP_ID>&redirect_uri=<YOUR_URL>&scope=ads_management"
  // );
  //needed auth_url sample---------------------------------------------ENDS
  //
  var auth_url = `${Auth_Url}`;
  //console.log(auth_url);
  var client_id_url = `client_id=${data.client_id}&`;
  //console.log(client_id_url);
  var redirect_uri_url = `redirect_uri=${data.redirect_uri}&`;
  //console.log(redirect_uri_url);
  var scope_url = `scope=${Auth_Scope}`;
  //console.log(scope_url);
  var final_url = auth_url + client_id_url + redirect_uri_url + scope_url;
  //console.log(final_url);
  result(null, final_url);
};
/*-----------create_auth_url------------------------------ends here--------------------*/
//
/*-----------auth_api------------------------------starts here--------------------*/
Facebook.auth_api = async (compile_data, result) => {
  var data = qs.stringify({
    client_id: compile_data[0].client_id,
    redirect_uri: compile_data[0].redirect_uri,
    client_secret: compile_data[0].client_secret,
    code: compile_data[0].code,
  });
  var config = {
    method: "post",
    url: Authentication,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      //console.log(response);
      console.log(response.data);
      // data: {
      //   access_token: 'EAAGNWU9xoK0BAGPPjAeWBAVGsZBM0Pvc0ZAurj74h0B03I4F0WGNwPV7eVRXbia7f3afIEYo6oZBrSObUgZAYjolsRtXSkpWUzcXHVNjo0m8ZCdZAfJKgvn4lpwO8FEnygE4oNzXOjlhCZBlFB1ZCjbYhtUqeuzuguzSZB2GwyyZBLM0JblZAlZBxMlv2sDT7hq5XIbQisk8KeZChTqSzYz48Weaw0OZBqCQW62kqZAcVCuGERRGgZDZD',
      //   token_type: 'bearer'
      // }
      result(null, response.data);
    })
    .catch(function (error) {
      console.log(error);
      //TESTING ONLY -- STATIC DATA ---STARTS
      // const dd = {
      //   access_token:
      //     "EAAGNWU9xoK0BAGPPjAeWBAVGsZBM0Pvc0ZAurj74h0B03I4F0WGNwPV7eVRXbia7f3afIEYo6oZBrSObUgZAYjolsRtXSkpWUzcXHVNjo0m8ZCdZAfJKgvn4lpwO8FEnygE4oNzXOjlhCZBlFB1ZCjbYhtUqeuzuguzSZB2GwyyZBLM0JblZAlZBxMlv2sDT7hq5XIbQisk8KeZChTqSzYz48Weaw0OZBqCQW62kqZAcVCuGERRGgZDZD",
      //   token_type: "bearer",
      // };
      //result(null, dd);
      //TESTING ONLY -- STATIC DATA ---STARTS
      //
      // console.log("Authentication Error");
      try {
        if (error.response && error.response.status) {
          //case 1 =================================
          console.log(error.response.data);
          var message = "";
          if (error.response.data.error_description) {
            message = error.response.data.error_description;
          } else if (error.response.data.error.message) {
            message = error.response.data.error.message;
          } else if (error.response.data.message) {
            message = error.response.data.message;
          } else if (error.response.data.title) {
            message = error.response.data.title;
          } else if (error.response.data.error_message) {
            message = error.response.data.error_message;
          }
          const Error = {
            statusCode: error.response.status,
            message: message,
          };
          result(Error, null);
        } else if (error.code) {
          const Error = {
            statusCode: 400,
            message: error.code,
          };
          result(Error, null);
        } else {
          const Error = {
            statusCode: 400,
            message: "Something went wrong. Facebook Authorization Error",
          };
          result(Error, null);
        }
      } catch (err) {
        const Error = {
          statusCode: 400,
          message: "Something went wrong. Facebook Authorization Error",
        };
        result(Error, null);
      }
    });
};
/*-----------auth_api------------------------------ends here--------------------*/
//

/*-----------exchange_token_auth_api------------------------------starts here--------------------*/
Facebook.exchange_token_auth_api = async (compile_data, result) => {
  //url create----------------------------------------starts
  const fb_exchange_url =
    "https://graph.facebook.com/v15.0/oauth/access_token? grant_type=fb_exchange_token&";
  //console.log(fb_exchange_url);
  var client_id_url = `client_id=${compile_data[0].client_id}&`;
  //console.log(client_id_url);
  var client_secret_url = `client_secret=${compile_data[0].client_secret}&`;
  //console.log(client_secret_url);
  var exchange_token = `fb_exchange_token=${compile_data[0].exchange_token}&`;
  //console.log(exchange_token);
  var final_url =
    fb_exchange_url + client_id_url + client_secret_url + exchange_token;
  //console.log(final_url);
  //url create----------------------------------------ends
  //
  var config = {
    method: "get",
    url: final_url,
    // headers: {
    //   "Content-Type": "application/x-www-form-urlencoded",
    // },
    // data: data,
  };
  axios(config)
    .then(function (response) {
      //  console.log(response);
      //  console.log(response.data);
      // data: {
      //   access_token: 'EAAGNWU9xoK0BAGPPjAeWBAVGsZBM0Pvc0ZAurj74h0B03I4F0WGNwPV7eVRXbia7f3afIEYo6oZBrSObUgZAYjolsRtXSkpWUzcXHVNjo0m8ZCdZAfJKgvn4lpwO8FEnygE4oNzXOjlhCZBlFB1ZCjbYhtUqeuzuguzSZB2GwyyZBLM0JblZAlZBxMlv2sDT7hq5XIbQisk8KeZChTqSzYz48Weaw0OZBqCQW62kqZAcVCuGERRGgZDZD',
      //   token_type: 'bearer'
      // }
      result(null, response.data);
    })
    .catch(function (error) {
      console.log(error);
      //TESTING ONLY -- STATIC DATA ---STARTS
      // const dd = {
      //   access_token:
      //     "EAAGNWU9xoK0BAGPPjAeWBAVGsZBM0Pvc0ZAurj74h0B03I4F0WGNwPV7eVRXbia7f3afIEYo6oZBrSObUgZAYjolsRtXSkpWUzcXHVNjo0m8ZCdZAfJKgvn4lpwO8FEnygE4oNzXOjlhCZBlFB1ZCjbYhtUqeuzuguzSZB2GwyyZBLM0JblZAlZBxMlv2sDT7hq5XIbQisk8KeZChTqSzYz48Weaw0OZBqCQW62kqZAcVCuGERRGgZDZD",
      //   token_type: "bearer",
      // };
      //result(null, dd);
      //TESTING ONLY -- STATIC DATA ---STARTS
      //
      // console.log("Authentication Error");
      try {
        if (error.response && error.response.status) {
          //case 1 =================================
          console.log(error.response.data);
          var message = "";
          if (error.response.data.error_description) {
            message = error.response.data.error_description;
          } else if (error.response.data.error.message) {
            message = error.response.data.error.message;
          } else if (error.response.data.message) {
            message = error.response.data.message;
          } else if (error.response.data.title) {
            message = error.response.data.title;
          } else if (error.response.data.error_message) {
            message = error.response.data.error_message;
          }
          const Error = {
            statusCode: error.response.status,
            message: message,
          };
          result(Error, null);
        } else if (error.code) {
          const Error = {
            statusCode: 400,
            message: error.code,
          };
          result(Error, null);
        } else {
          const Error = {
            statusCode: 400,
            message: "Something went wrong. Facebook Exchange Token Error",
          };
          result(Error, null);
        }
      } catch (err) {
        const Error = {
          statusCode: 400,
          message: "Something went wrong. Facebook Exchange Token Error",
        };
        result(Error, null);
      }
    });
};
/*-----------exchange_token_auth_api------------------------------ends here--------------------*/
//

/*-----------createPost------------------------------starts here--------------------*/
Facebook.createPost = async (saveData, result) => {
  let add_payload = {
    table_name: table_post,
    dataToSave: saveData,
  };
  const respAdd = await Model.add_query(add_payload);
  if (respAdd.status == "success") {
    result(null, respAdd.id);
  } else if (respAdd.status == "error") {
    const err = respAdd.message;
    const respError = await Model.error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    result(Error, null);
  }
};
/*-----------createPost------------------------------ends here--------------------*/
//
/*-----------create_post------------------------------starts here--------------------*/
Facebook.create_post = async (compile_data, result) => {
  //console.log(compile_data);
  if (compile_data.hasOwnProperty("images") && compile_data.images.length > 0) {
    var data = qs.stringify({
      url: compile_data.images,
      published: "true",
      access_token: compile_data.token,
      message: compile_data.message,
    });
    var config = {
      method: "post",
      url: Create_Post_Photo_Url,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        //Authorization: "Bearer " + compile_data.token,
      },
      data: data,
    };
  } else {
    var data = qs.stringify({
      access_token: compile_data.token,
      message: compile_data.message,
    });
    var config = {
      method: "post",
      url: Create_Post_Text_Url,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        //        Authorization: "Bearer " + compile_data.token,
      },
      data: data,
    };
  }
  console.log(data);
  console.log(config);
  axios(config)
    .then(function (response) {
      // data: { id: '110502371870299_121701730750363' }
      //console.log(response);
      //console.log(response.data);
      result(null, response.data);
    })
    .catch(function (error) {
      // console.log(error);
      //in case no token available--- test it -----------------starts
      // const data = { id: "110502371870299_121701730750363" };
      // result(null, data);
      //in case no token available--- test it -----------------ends
      // console.log(error);
      //console.log(error.response.status);
      console.log("Authentication Error");

      try {
        if (error.response && error.response.status) {
          console.log(error.response.data);

          var message = "";
          if (error.response.data.error_description) {
            message = error.response.data.error_description;
          } else if (error.response.data.error.message) {
            message = error.response.data.error.message;
          } else if (error.response.data.message) {
            message = error.response.data.message;
          } else if (error.response.data.title) {
            message = error.response.data.title;
          } else if (error.response.data.error_message) {
            message = error.response.data.error_message;
          }
          const Error = {
            statusCode: error.response.status,
            message: message,
          };
          result(Error, null);
        } else if (error.code) {
          const Error = {
            statusCode: 400,
            message: error.code,
          };
          result(Error, null);
        } else {
          const Error = {
            statusCode: 400,
            message: "Something went wrong. Facebook Post Error",
          };
          result(Error, null);
        }
      } catch (err) {
        const Error = {
          statusCode: 400,
          message: "Something went wrong. Facebook Post Error",
        };
        result(Error, null);
      }
    });
};
/*-----------create_post------------------------------ends here--------------------*/
//
module.exports = Facebook;
