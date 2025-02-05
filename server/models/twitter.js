var axios = require("axios");
var qs = require("qs");
const { base64encode, base64decode } = require("nodejs-base64");

const Model = require("../helpers/instructions");
const table_twitter = "twitter";
const table_user = "users";
const table_post = "posts";

const Auth_Url = process.env.REACT_APP_TWITTER_AUTH_URL;
const Auth_Scope = process.env.REACT_APP_TWITTER_AUTH_SCOPE;
const Auth_Response_Type = process.env.REACT_APP_TWITTER_AUTH_RESPONSE_TYPE;
const Auth_State = process.env.REACT_APP_TWITTER_AUTH_STATE;
const Auth_Code_Challenge = process.env.REACT_APP_TWITTER_AUTH_CODE_CHALLENGE;
const Auth_Code_Challenge_Method =
  process.env.REACT_APP_TWITTER_AUTH_CODE_CHALLENGE_METHOD;
const Authentication = process.env.REACT_APP_TWITTER_AUTHENTICATION_URL;
const Create_Post_Url = process.env.REACT_APP_TWITTER_CREATE_POST_URL;

// Plan object constructor
var Twitter = function () {};
//
/*-----------fetchConnect------------------------------starts here--------------------*/
Twitter.fetchConnect = async (connectId, result) => {
  let sql_query_payload = {
    sql_script: `SELECT id, user_id, client_id, client_secret, redirect_uri, refresh_token, refresh_token_expires_in, token, token_expires_in, active FROM ${table_twitter} WHERE trash = 0 AND id=${connectId}`,
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
Twitter.fetchConnectByUserId = async (userId, result) => {
  let sql_query_payload = {
    sql_script: `SELECT id, user_id, client_id, client_secret, redirect_uri, refresh_token, token, active FROM ${table_twitter} WHERE trash = 0 AND user_id=${userId}`,
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
Twitter.deleteConnect = async (connectId, result) => {
  let delete_payload = {
    table_name: table_twitter,
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
Twitter.trashConnect = async (connectId, result) => {
  let delete_payload = {
    table_name: table_twitter,
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
Twitter.createConnect = async (saveData, result) => {
  let add_payload = {
    table_name: table_twitter,
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
Twitter.updateConnect = async (data, result) => {
  let update_payload = {
    table_name: table_twitter,
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
Twitter.fetchConnectByAccessToken = async (access_token, result) => {
  let sql_query_payload = {
    sql_script: `SELECT f.id, f.user_id, f.client_id, f.client_secret, f.redirect_uri, f.token, f.token_expires_in FROM ${table_twitter} as f LEFT JOIN ${table_user} as u ON u.id=f.user_id WHERE f.trash = 0 AND u.access_token="${access_token}"`,
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
Twitter.create_auth_url = async (data, result) => {
  //
  //needed auth_url sample---------------------------------------------STARTS
  // console.log(
  //   "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=".$this->client_id."&redirect_uri=".$this->redirect_uri."&scope=tweet.write users.read tweet.read like.read&state=state&code_challenge=challenge&code_challenge_method=plain"
  // );
  //needed auth_url sample---------------------------------------------ENDS
  //
  var auth_url = `${Auth_Url}`;
  //console.log(auth_url);
  var response_type = `response_type=${Auth_Response_Type}&`;
  //console.log(response_type);
  var client_id_url = `client_id=${data.client_id}&`;
  //console.log(client_id_url);
  var redirect_uri_url = `redirect_uri=${data.redirect_uri}&`;
  //console.log(redirect_uri_url);
  var scope_url = `scope=${Auth_Scope}&`;
  //console.log(scope_url);
  var state = `state=${Auth_State}&`;
  //console.log(state);
  var code_challenge = `code_challenge=${Auth_Code_Challenge}&`;
  //console.log(state);
  var code_challenge_method = `code_challenge_method=${Auth_Code_Challenge_Method}`;
  //console.log(state);
  var final_url =
    auth_url +
    response_type +
    client_id_url +
    redirect_uri_url +
    scope_url +
    state +
    code_challenge +
    code_challenge_method;
  //console.log(final_url);
  result(null, final_url);
};
/*-----------create_auth_url------------------------------ends here--------------------*/
//
/*-----------auth_api------------------------------starts here--------------------*/
Twitter.auth_api = async (compile_data, result) => {
  //create basic----------------------------starts+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const client_id1 = compile_data[0].client_id;
  const client_secret1 = compile_data[0].client_secret;
  let strJoin = client_id1.concat(":", client_secret1);
  //console.log(strJoin);
  const encoded = base64encode(strJoin);
  //  console.log(encoded);
  const basicStr = "Basic";
  let basicFinal = basicStr.concat(" ", encoded);
  //console.log(basicFinal);
  //create basic----------------------------ends+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  var data = qs.stringify({
    code: compile_data[0].code,
    grant_type: "authorization_code",
    client_id: compile_data[0].client_id,
    redirect_uri: compile_data[0].redirect_uri,
    code_verifier: Auth_Code_Challenge, //"challenge",
  });
  var config = {
    method: "post",
    url: Authentication,
    headers: {
      Authorization: basicFinal,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      //console.log(response);
      //  console.log(response.data);
      // {
      //   token_type: 'bearer',
      //   expires_in: 7200,
      //   access_token: 'Q2haMFhqS1VHalpkYmVPVmxsWmVveGdHUUxYeV9hTF9kVjRJamVBbndhRU55OjE2NzA0Mzk4NjY3MjY6MToxOmF0OjE',
      //   scope: 'tweet.write users.read like.read tweet.read'
      // }
      result(null, response.data);
    })
    .catch(function (error) {
      //  console.log(error);
      //TESTING ONLY -- STATIC DATA ---STARTS
      // const dd =  {
      //     "token_type": "bearer",
      //     "expires_in": 7200,
      //     "access_token": "bGlkVlN3Yzc3TEM1R01xel9pcnUzSm16eEFjNGt6U20zNUNLTzNjeS1ianJaOjE2Njk5MjM5MjU2MTE6MToxOmF0OjE",
      //     "scope": "tweet.write users.read like.read tweet.read"
      // }
      //result(null, dd);
      //TESTING ONLY -- STATIC DATA ---STARTS
      //
      console.log("Authentication Error");
      //console.log(error);
      try {
        if (error.response && error.response.status) {
          //case 1 =================================
          //console.log(error.response.status);
          console.log(error.response.data);
          // data: {
          //   error: 'invalid_request',
          //   error_description: 'Unable to retrieve access token: appid/redirect uri/code verifier does not match authorization code. Or authorization code expired. Or external member binding exists'
          // }
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
          //case 2 =================================
          // {
          //   code: "ERR_INVALID_ARG_TYPE";
          // }      console.log("Authentication Error");
          //console.log(error.code); //"ERR_INVALID_ARG_TYPE"
          const Error = {
            statusCode: 400,
            message: error.code,
          };
          result(Error, null);
        } else {
          const Error = {
            statusCode: 400,
            message: "Something went wrong. Twitter Authorization Error",
          };
          result(Error, null);
        }
      } catch (err) {
        const Error = {
          statusCode: 400,
          message: "Something went wrong. Twitter Authorization Error",
        };
        result(Error, null);
      }
    });
};
/*-----------auth_api------------------------------ends here--------------------*/
//
/*-----------createPost------------------------------starts here--------------------*/
Twitter.createPost = async (saveData, result) => {
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
Twitter.create_post = async (compile_data, result) => {
  //const recipient_id = "1593424514246791168";
  // {
  //   token: 'Q2haMFhqS1VHalpkYmVPVmxsWmVveGdHUUxYeV9hTF9kVjRJamVBbndhRU55OjE2NzA0Mzk4NjY3MjY6MToxOmF0OjE',
  //   message: {
  //     text: 'demsds c c cdsd d d d d 555 555 555  55 d sdss dsdsd sdsdso',
  //or
  //     direct_message_deep_link: 'https://twitter.com/messages/compose?recipient_id=1593424514246791168'
  //   }
  // }
  var data = JSON.stringify(compile_data.message);
  var config = {
    method: "post",
    url: Create_Post_Url,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + compile_data.token,
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
      //console.log(error);
      console.log(error.response.data);
      //in case no token available--- test it -----------------starts
      // const data ={ id: 'urn:li:share:7004109897650860032' };
      // result(null, data);
      //in case no token available--- test it -----------------ends
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
            message: "Something went wrong. Twitter Post Error",
          };
          result(Error, null);
        }
      } catch (err) {
        const Error = {
          statusCode: 400,
          message: "Something went wrong. Twitter Post Error",
        };
        result(Error, null);
      }
    });
};
/*-----------create_post------------------------------ends here--------------------*/
//
module.exports = Twitter;
