var axios = require("axios");
var qs = require("qs");
const Model = require("../helpers/instructions");
const table_instagram = "instagram";
const table_user = "users";
const table_post = "posts";

const Auth_Scope = process.env.REACT_APP_INSTAGRAM_AUTH_SCOPE;
const Auth_Url = process.env.REACT_APP_INSTAGRAM_AUTH_URL;
const Auth_Response_Type = process.env.REACT_APP_INSTAGRAM_AUTH_RESPONSE_TYPE;
const Authentication = process.env.REACT_APP_INSTAGRAM_AUTHENTICATION_URL;
const Create_Post_Url = process.env.REACT_APP_INSTAGRAM_CREATE_POST_URL;

// Plan object constructor
var Instagram = function () {};
//
/*-----------fetchConnect------------------------------starts here--------------------*/
Instagram.fetchConnect = async (connectId, result) => {
  let sql_query_payload = {
    sql_script: `SELECT id, user_id, client_id, client_secret, redirect_uri, refresh_token, refresh_token_expires_in, token, token_expires_in, active FROM ${table_instagram} WHERE trash = 0 AND id=${connectId}`,
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
Instagram.fetchConnectByUserId = async (userId, result) => {
  let sql_query_payload = {
    sql_script: `SELECT id, user_id, client_id, client_secret, redirect_uri, refresh_token, token, active FROM ${table_instagram} WHERE trash = 0 AND user_id=${userId}`,
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
Instagram.deleteConnect = async (connectId, result) => {
  let delete_payload = {
    table_name: table_instagram,
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
Instagram.trashConnect = async (connectId, result) => {
  let delete_payload = {
    table_name: table_instagram,
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
Instagram.createConnect = async (saveData, result) => {
  let add_payload = {
    table_name: table_instagram,
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
Instagram.updateConnect = async (data, result) => {
  let update_payload = {
    table_name: table_instagram,
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
Instagram.fetchConnectByAccessToken = async (access_token, result) => {
  let sql_query_payload = {
    sql_script: `SELECT f.id, f.user_id, f.client_id, f.client_secret, f.redirect_uri, f.token FROM ${table_instagram} as f LEFT JOIN ${table_user} as u ON u.id=f.user_id WHERE f.trash = 0 AND u.access_token="${access_token}"`,
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
Instagram.create_auth_url = async (data, result) => {
  //
  //needed auth_url sample---------------------------------------------STARTS
  // console.log(
  //   "https://www.instagram.com/oauth/authorize?client_id=".$this->client_id."&redirect_uri=".$this->redirect_uri."&scope=user_profile,Cuser_media&response_type=code"
  // );
  //needed auth_url sample---------------------------------------------ENDS
  //
  var auth_url = `${Auth_Url}`;
  //console.log(auth_url);
  var client_id_url = `client_id=${data.client_id}&`;
  //console.log(client_id_url);
  var redirect_uri_url = `redirect_uri=${data.redirect_uri}&`;
  //console.log(redirect_uri_url);
  var scope_url = `scope=${Auth_Scope}&`;
  //console.log(scope_url);
  var response_type = `response_type=${Auth_Response_Type}`;
  //console.log(response_type);
  var final_url =
    auth_url + client_id_url + redirect_uri_url + scope_url + response_type;
  //console.log(final_url);
  result(null, final_url);
};
/*-----------create_auth_url------------------------------ends here--------------------*/
//
/*-----------auth_api------------------------------starts here--------------------*/
Instagram.auth_api = async (compile_data, result) => {
  var data = qs.stringify({
    code: compile_data[0].code,
    client_id: compile_data[0].client_id,
    client_secret: compile_data[0].client_secret,
    redirect_uri: compile_data[0].redirect_uri,
    grant_type: "authorization_code", //
    prompt: "consent", //
  });

  var config = {
    method: "post",
    // url: "https://api.instagram.com/oauth/access_token",
    url: Authentication,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      //console.log(response);
      //console.log(response.data);
      //   {
      //     "access_token": "IGQVJWX1hmYmhJd25JQ2JLbkdLNjlGVEZAvOGM4Ml9LaHJDczkyRjNhRk1rTklYenh2M2ppcmlxN0ZADUDFzX0t1U2RvMjF3ekJQRFFnV0FKLWRXdW1MZAVg3X21lTUVLUDhtNzdHaHhXZAWJzamt2MmdVNjA2NUw4R2xMR2ZAB",
      //     "user_id": 17841409725289936
      // }
      result(null, response.data);
    })
    .catch(function (error) {
      console.log(error);
      //TESTING ONLY -- STATIC DATA ---STARTS
      // const dd = {
      //   access_token:
      //     "IGQVJWX1hmYmhJd25JQ2JLbkdLNjlGVEZAvOGM4Ml9LaHJDczkyRjNhRk1rTklYenh2M2ppcmlxN0ZADUDFzX0t1U2RvMjF3ekJQRFFnV0FKLWRXdW1MZAVg3X21lTUVLUDhtNzdHaHhXZAWJzamt2MmdVNjA2NUw4R2xMR2ZAB",
      //   user_id: 17841409725289936,
      // };
      // result(null, dd);
      //TESTING ONLY -- STATIC DATA ---STARTS
      //
      console.log("Authentication Error");
      try {
        if (error.response && error.response.status) {
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
            message: "Something went wrong. Instagram Authorization Error",
          };
          result(Error, null);
        }
      } catch (err) {
        const Error = {
          statusCode: 400,
          message: "Something went wrong. Instagram Authorization Error",
        };
        result(Error, null);
      }
    });
};
/*-----------auth_api------------------------------ends here--------------------*/
//
/*-----------createPost------------------------------starts here--------------------*/
Instagram.createPost = async (saveData, result) => {
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
Instagram.create_post = async (compile_data, result) => {
  var fields_url = "fields=ClAbjNCpxVA,caption&";
  //console.log(scope_url);
  // var access_token = "Bearer " + compile_data.token;
  var access_token = compile_data.token;
  //console.log(response_type);
  var final_url = Create_Post_Url + fields_url + access_token;
  //console.log(final_url);
  var data = qs.stringify({ text: compile_data.message });
  var config = {
    method: "post",
    url: final_url,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };
  //console.log(config);
  axios(config)
    .then(function (response) {
      //console.log(response);
      //console.log(response.data);
      // data:{ id: 'urn:li:share:7004109897650860032' }
      result(null, response.data);
    })
    .catch(function (error) {
      console.log(error);
      console.log("Authentication Error");
      //in case no token available--- test it -----------------starts
      // const data ={ id: 'urn:li:share:7004109897650860032' };
      // result(null, data);
      //in case no token available--- test it -----------------ends
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
          } else if (error.response.data && error.response.data.length) {
            message = error.response.data;
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
            message: "Something went wrong. Instagram Post Error",
          };
          result(Error, null);
        }
      } catch (err) {
        const Error = {
          statusCode: 400,
          message: "Something went wrong. Instagram Post Error",
        };
        result(Error, null);
      }
    });
};
/*-----------create_post------------------------------ends here--------------------*/
//
module.exports = Instagram;
