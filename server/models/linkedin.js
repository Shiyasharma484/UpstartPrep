var axios = require("axios");
var qs = require("qs");
const Model = require("../helpers/instructions");
const table_linkedin = "linkedin";
const table_user = "users";
const table_post = "posts";

const Auth_Url = process.env.REACT_APP_LINKEDIN_AUTH_URL;
const Auth_Scope = process.env.REACT_APP_LINKEDIN_AUTH_SCOPE;
const Auth_State = process.env.REACT_APP_LINKEDIN_AUTH_STATE;
const Auth_Response_Type = process.env.REACT_APP_LINKEDIN_AUTH_RESPONSE_TYPE;
const Auth_Prompt = process.env.REACT_APP_LINKEDIN_AUTH_PROMPT;
const Auth_Access_Type = process.env.REACT_APP_LINKEDIN_AUTH_ACCESS_TYPE;
const Authentication = process.env.REACT_APP_LINKEDIN_AUTHENTICATION_URL;
const Create_Post_Url = process.env.REACT_APP_LINKEDIN_CREATE_POST_URL;
const Profile_Url = process.env.REACT_APP_LINKEDIN_PROFILE_URL;
const Photo_Initialize_Url =
  process.env.REACT_APP_LINKEDIN_PHOTO_INITIALIZATION_URL;
const Photo_Post_Url = process.env.REACT_APP_LINKEDIN_PHOTO_POST_URL;
// Plan object constructor
var Linkedin = function () {};
//
/*-----------fetchConnect------------------------------starts here--------------------*/
Linkedin.fetchConnect = async (connectId, result) => {
  let sql_query_payload = {
    sql_script: `SELECT id, user_id, client_id, client_secret, redirect_uri, refresh_token, refresh_token_expires_in, token, token_expires_in, active FROM ${table_linkedin} WHERE trash = 0 AND id=${connectId}`,
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
Linkedin.fetchConnectByUserId = async (userId, result) => {
  let sql_query_payload = {
    sql_script: `SELECT id, user_id, client_id, client_secret, redirect_uri, profile_id, refresh_token, token, active FROM ${table_linkedin} WHERE trash = 0 AND user_id=${userId}`,
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
Linkedin.deleteConnect = async (connectId, result) => {
  let delete_payload = {
    table_name: table_linkedin,
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
Linkedin.trashConnect = async (connectId, result) => {
  let delete_payload = {
    table_name: table_linkedin,
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
Linkedin.createConnect = async (saveData, result) => {
  let add_payload = {
    table_name: table_linkedin,
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
Linkedin.updateConnect = async (data, result) => {
  let update_payload = {
    table_name: table_linkedin,
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
Linkedin.fetchConnectByAccessToken = async (access_token, result) => {
  let sql_query_payload = {
    sql_script: `SELECT f.id, f.user_id, f.client_id, f.client_secret, f.redirect_uri, f.token FROM ${table_linkedin} as f LEFT JOIN ${table_user} as u ON u.id=f.user_id WHERE f.trash = 0 AND u.access_token="${access_token}"`,
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
Linkedin.create_auth_url = async (data, result) => {
  //
  //needed auth_url sample---------------------------------------------STARTS
  // console.log(
  //   "https://www.linkedin.com/oauth/v2/authorization?scope=r_liteprofile%20r_emailaddress%20w_member_social&client_id=77byp1fm8bb1wt&state=9ed2d8b9-49d1-89c4-fd6c-712cd69591fe&response_type=code&redirect_uri=https://ajivatech.com/linkedin/index.php"&prompt=consent&access_type=offline"
  // );
  //needed auth_url sample---------------------------------------------ENDS
  //
  var auth_url = `${Auth_Url}`;
  //console.log(auth_url);
  var scope_url = `scope=${Auth_Scope}&`;
  //console.log(scope_url);
  var client_id_url = `client_id=${data.client_id}&`;
  //console.log(client_id_url);
  var state = `state=${Auth_State}&`;
  //console.log(state);
  var response_type = `response_type=${Auth_Response_Type}&`;
  //console.log(response_type);
  var redirect_uri_url = `redirect_uri=${data.redirect_uri}&`;
  //console.log(redirect_uri_url);
  var prompt = `prompt=${Auth_Prompt}&`;
  //console.log(prompt);
  var access_type = `access_type=${Auth_Access_Type}`;
  //console.log(access_type);
  var final_url =
    auth_url +
    scope_url +
    client_id_url +
    state +
    response_type +
    redirect_uri_url +
    prompt +
    access_type;
  //console.log(final_url);
  result(null, final_url);
};
/*-----------create_auth_url------------------------------ends here--------------------*/
//
/*-----------auth_api------------------------------starts here--------------------*/
Linkedin.auth_api = async (compile_data, result) => {
  console.log(compile_data);
  var data = qs.stringify({
    grant_type: "authorization_code",
    code: compile_data[0].code,
    client_id: compile_data[0].client_id,
    //client_id: "77byp1fm8bb1wt",
    client_secret: compile_data[0].client_secret,
    // client_secret: "n7kELheixQ70mAD1",
    redirect_uri: compile_data[0].redirect_uri,
    //redirect_uri: "https://localhost:3000/admin/ecommerce/linkedin",
  });
  var config = {
    method: "post",
    url: Authentication,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };
  //console.log(config);
  axios(config)
    .then(function (response) {
      //  console.log(response);
      //console.log(response.data);
      // {
      //   access_token: 'AQV88WZ8IckwRr1zvmigzi7-cQmAAF-EBofOSc7ZFrqRGtzNoTXk1GO2TwqMJ7RqWWGhq6KeCsHRM8swVO5wiGNSj0mRtLn5iNbqrRcOMXCzUe1LGSVqtbbIHYfUbGAHgzPgBC9JYEWJa2WSHYi5bK6ABzD6RHiLj8uwIXVbx2-mhQmDvSBORUzkGUZ-1l1FGCeTvIKV358pA7vddi4pEqYIr3UYvR1zrkRhEA7ql9G8PFELtWoMqUaU7mg0_338mWLjT5IzuHyERvnnIbdY6WOAbtRg1QKbozB5W84CIG0V52oVzzEfrSRePywYxNv0cdfjE7XDd2e9LlycfHv8YR4BYFaeqg',
      //   expires_in: 5183999,
      //   refresh_token: 'AQVuYjYIYZA7e0zrteYxL8fka_srpUI_XyeplpiebGSwMqkZuk9mvjiYy3OtCGCUQzIlVZi5n57sU0V9GyrHY48OiyfUNgit0r4gXlW7WITOyciYiu8q5kGGtMB0zwBPJNq72B920dFRJtvX_QNVGMzLRNXdrMRlGLP5hmH1Nb5_Zc0niEscIw60piP6BWPGe9A0OQlW_dl4USCDeS1LV65agGW6jo1qeQHfOKFmdDHCxiuOgFHfF8NgJrOpcBm8i_-8FXfhN2A4u0ZFl3byj3vd3bsrIOfKoWeJiBevs-4jdP1arsaegSoGY1YmwC48eLLX0y0a89Rj8BcafwaC3d9kJDGyUQ',
      //   refresh_token_expires_in: 31535999,
      //   scope: 'r_basicprofile,r_emailaddress,r_liteprofile,r_organization_social,w_member_social'
      // }
      result(null, response.data);
    })
    .catch(function (error) {
      console.log(error);
      //TESTING ONLY -- STATIC DATA ---STARTS
      // const dd =    {
      //   access_token: 'AQV88WZ8IckwRr1zvmigzi7-cQmAAF-EBofOSc7ZFrqRGtzNoTXk1GO2TwqMJ7RqWWGhq6KeCsHRM8swVO5wiGNSj0mRtLn5iNbqrRcOMXCzUe1LGSVqtbbIHYfUbGAHgzPgBC9JYEWJa2WSHYi5bK6ABzD6RHiLj8uwIXVbx2-mhQmDvSBORUzkGUZ-1l1FGCeTvIKV358pA7vddi4pEqYIr3UYvR1zrkRhEA7ql9G8PFELtWoMqUaU7mg0_338mWLjT5IzuHyERvnnIbdY6WOAbtRg1QKbozB5W84CIG0V52oVzzEfrSRePywYxNv0cdfjE7XDd2e9LlycfHv8YR4BYFaeqg',
      //   expires_in: 5183999,
      //   refresh_token: 'AQVuYjYIYZA7e0zrteYxL8fka_srpUI_XyeplpiebGSwMqkZuk9mvjiYy3OtCGCUQzIlVZi5n57sU0V9GyrHY48OiyfUNgit0r4gXlW7WITOyciYiu8q5kGGtMB0zwBPJNq72B920dFRJtvX_QNVGMzLRNXdrMRlGLP5hmH1Nb5_Zc0niEscIw60piP6BWPGe9A0OQlW_dl4USCDeS1LV65agGW6jo1qeQHfOKFmdDHCxiuOgFHfF8NgJrOpcBm8i_-8FXfhN2A4u0ZFl3byj3vd3bsrIOfKoWeJiBevs-4jdP1arsaegSoGY1YmwC48eLLX0y0a89Rj8BcafwaC3d9kJDGyUQ',
      //   refresh_token_expires_in: 31535999,
      //   scope: 'r_basicprofile,r_emailaddress,r_liteprofile,r_organization_social,w_member_social'
      // }
      //result(null, dd);
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
            message: "Something went wrong. LinkedIn Authorization Error",
          };
          result(Error, null);
        }
      } catch (err) {
        const Error = {
          statusCode: 400,
          message: "Something went wrong. LinkedIn Authorization Error",
        };
        result(Error, null);
      }
    });
};
/*-----------auth_api------------------------------ends here--------------------*/
//
/*-----------profile_api------------------------------starts here--------------------*/
Linkedin.profile_api = async (compile_data, result) => {
  var config = {
    method: "get",
    url: Profile_Url,
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + compile_data,
    },
  };
  //console.log(config);
  axios(config)
    .then(function (response) {
      //  console.log(response);
      //    console.log(response.data);
      // {
      //   localizedLastName: 'Katoch',
      //   firstName: {
      //     localized: { en_US: 'Sanjay' },
      //     preferredLocale: { country: 'US', language: 'en' }
      //   },
      //   vanityName: 'sanjay-katoch-386320217',
      //   lastName: {
      //     localized: { en_US: 'Katoch' },
      //     preferredLocale: { country: 'US', language: 'en' }
      //   },
      //   localizedHeadline: '--',
      //   id: 'h8ypr09Far',
      //   headline: {
      //     localized: { en_US: '--' },
      //     preferredLocale: { country: 'US', language: 'en' }
      //   },
      //   localizedFirstName: 'Sanjay'
      // }
      result(null, response.data.id);
    })
    .catch(function (error) {
      //console.log(error);
      //TESTING ONLY -- STATIC DATA ---STARTS
      // const dd =    // {
      //   localizedLastName: 'Katoch',
      //   firstName: {
      //     localized: { en_US: 'Sanjay' },
      //     preferredLocale: { country: 'US', language: 'en' }
      //   },
      //   vanityName: 'sanjay-katoch-386320217',
      //   lastName: {
      //     localized: { en_US: 'Katoch' },
      //     preferredLocale: { country: 'US', language: 'en' }
      //   },
      //   localizedHeadline: '--',
      //   id: 'h8ypr09Far',
      //   headline: {
      //     localized: { en_US: '--' },
      //     preferredLocale: { country: 'US', language: 'en' }
      //   },
      //   localizedFirstName: 'Sanjay'
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
          //console.log(error.response.data);
          // data: {
          //   error: 'invalid_request',
          //   error_description: 'Unable to retrieve access token: appid/redirect uri/code verifier does not match authorization code. Or authorization code expired. Or external member binding exists'
          // }
          const Error = {
            statusCode: error.response.status,
            message: error.response.data.error_description,
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
            message: "Something went wrong. LinkedIn Profile Get Error",
          };
          result(Error, null);
        }
      } catch (err) {
        const Error = {
          statusCode: 400,
          message: "Something went wrong. LinkedIn Profile Get Error",
        };
        result(Error, null);
      }
    });
};
/*-----------profile_api------------------------------ends here--------------------*/
//

/*-----------createPost------------------------------starts here--------------------*/
Linkedin.createPost = async (saveData, result) => {
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
Linkedin.create_post = async (compile_data, result) => {
  // console.log(compile_data);
  var data = JSON.stringify({
    author: "urn:li:person:" + compile_data.profile_id, //"urn:li:person:h8ypr09Far"
    commentary: compile_data.message,
    visibility: "PUBLIC",
    distribution: {
      feedDistribution: "MAIN_FEED",
      targetEntities: [],
      thirdPartyDistributionChannels: [],
    },
    lifecycleState: "PUBLISHED",
    isReshareDisabledByAuthor: false,
  });

  var config = {
    method: "post",
    url: Create_Post_Url,
    headers: {
      Authorization: "Bearer " + compile_data.token,
      "Content-Type": "application/json",
      "x-li-format": "json",
      "LinkedIn-Version": "202210",
      "x-restli-protocol-version": "2.0.0",
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
      console.log("Authentication Error");
      //in case no token available--- test it -----------------starts
      // const data ={ id: 'urn:li:share:7004109897650860032' };
      // result(null, data);
      //in case no token available--- test it -----------------ends
      // console.log(error);
      try {
        if (error.response && error.response.status) {
          console.log(error.response.data);

          //console.log(error.response.data.message);
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
            message: "Something went wrong. LinkedIn Post Error",
          };
          result(Error, null);
        }
      } catch (err) {
        const Error = {
          statusCode: 400,
          message: "Something went wrong. LinkedIn Post Error",
        };
        result(Error, null);
      }
    });
};
/*-----------create_post------------------------------ends here--------------------*/
//
/*-----------photo_initialization------------------------------starts here--------------------*/
Linkedin.photo_initialization = async (compile_data, result) => {
  //  console.log(compile_data);
  var data = JSON.stringify({
    initializeUploadRequest: {
      owner: "urn:li:person:" + compile_data.profile_id, //"urn:li:person:h8ypr09Far"
    },
  });
  var config = {
    method: "post",
    url: Photo_Initialize_Url,
    headers: {
      authorization: "Bearer " + compile_data.token,
      "LinkedIn-Version": "202210",
      "X-RestLi-Protocol-Version": "2.0.0",
      "Content-Type": "application/json",
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
      console.log("Initialization Error");
      //in case no token available--- test it -----------------starts
      // const data ={ id: 'urn:li:share:7004109897650860032' };
      // result(null, data);
      //in case no token available--- test it -----------------ends
      // console.log(error);
      try {
        if (error.response && error.response.status) {
          console.log(error.response.data);

          //console.log(error.response.data.message);
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
            message: "Something went wrong. LinkedIn Initialization Error",
          };
          result(Error, null);
        }
      } catch (err) {
        const Error = {
          statusCode: 400,
          message: "Something went wrong. LinkedIn Initialization Error",
        };
        result(Error, null);
      }
    });
};
/*-----------photo_initialization------------------------------ends here--------------------*/
//
//
/*-----------photo_upload------------------------------starts here--------------------*/
Linkedin.photo_upload = async (compile_data, result) => {
  //console.log(compile_data);
  var data = compile_data.image_url;
  var linkedin_provided_url = compile_data.linkedin_upload_url;
  var config = {
    method: "post",
    url: linkedin_provided_url,
    headers: {
      authorization: "Bearer " + compile_data.token,
      "LinkedIn-Version": "202210",
      "X-RestLi-Protocol-Version": "2.0.0",
      "Content-Type": "image/png",
    },
    data: data,
  };
  //console.log(config);

  axios(config)
    .then(function (response) {
      //  console.log(response);
      //  console.log(response.status);
      //  console.log(response.statusText);
      result(null, "Success");
    })
    .catch(function (error) {
      //console.log(error);
      console.log("Photo Upload Error");
      //in case no token available--- test it -----------------starts
      // const data ={ id: 'urn:li:share:7004109897650860032' };
      // result(null, data);
      //in case no token available--- test it -----------------ends
      // console.log(error);
      try {
        if (error.response && error.response.status) {
          console.log(error.response.data);

          //console.log(error.response.data.message);
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
            message: "Something went wrong. LinkedIn Photo Upload Error",
          };
          result(Error, null);
        }
      } catch (err) {
        const Error = {
          statusCode: 400,
          message: "Something went wrong. LinkedIn Photo Upload Error",
        };
        result(Error, null);
      }
    });
};
/*-----------photo_upload------------------------------ends here--------------------*/
//
//
/*-----------photo_post------------------------------starts here--------------------*/
Linkedin.photo_post = async (compile_data, result) => {
  //console.log(compile_data);

  var data = JSON.stringify({
    author: "urn:li:person:" + compile_data.profile_id, //"urn:li:person:h8ypr09Far"
    // commentary: "Sample Post",
    commentary: compile_data.message,
    visibility: "PUBLIC",
    distribution: {
      feedDistribution: "MAIN_FEED",
      targetEntities: [],
      thirdPartyDistributionChannels: [],
    },
    content: {
      media: {
        altText: "testing for alt tags",
        //    id: "urn:li:image:C4D10AQG3cF9AGoxugw",
        id: compile_data.imageID,
      },
    },
    lifecycleState: "PUBLISHED",
    isReshareDisabledByAuthor: false,
  });

  var config = {
    method: "post",
    url: Photo_Post_Url,
    headers: {
      authorization: "Bearer " + compile_data.token,
      "LinkedIn-Version": "202210",
      "X-RestLi-Protocol-Version": "2.0.0",
      "Content-Type": "application/json",
    },
    data: data,
  };
  //console.log(config);

  axios(config)
    .then(function (response) {
      //    console.log(response);
      //  console.log(response.status);
      //  console.log(response.statusText);
      //console.log(response.headers);
      const headddd = response.headers;
      // {
      //   location: '/posts/urn%3Ali%3Ashare%3A7008476557501427712',
      //   'x-restli-id': 'urn:li:share:7008476557501427712',
      //    }
      const idd = headddd["x-restli-id"];
      //console.log(idd);
      //result(null, "success");
      result(null, idd);
    })
    .catch(function (error) {
      //console.log(error);
      console.log("Photo Post Error");
      //in case no token available--- test it -----------------starts
      // const data ={ id: 'urn:li:share:7004109897650860032' };
      // result(null, data);
      //in case no token available--- test it -----------------ends
      // console.log(error);
      try {
        if (error.response && error.response.status) {
          console.log(error.response.data);
          //console.log(error.response.data.message);
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
            message: "Something went wrong. LinkedIn Photo Post Error",
          };
          result(Error, null);
        }
      } catch (err) {
        const Error = {
          statusCode: 400,
          message: "Something went wrong. LinkedIn Photo Post Error",
        };
        result(Error, null);
      }
    });
};
/*-----------photo_post------------------------------ends here--------------------*/
//

module.exports = Linkedin;
