const { ExtractToken } = require("../ApiMiddleware");
const Facebook = require("../models/facebook");
const Instagram = require("../models/instagram");
const Linkedin = require("../models/linkedin");
const Twitter = require("../models/twitter");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

//-------------------------------------------------------------------------------------------------------------
//
/*-----------AuthUrl---------------------------starts here--------------------*/
exports.AuthUrl = async (req, res) => {
  var g_response = {};
  var g_status_code;
  const owner_id = 1; //owner db id
  const p1 = new Promise(async (resolve, reject) => {
    try {
      const connect_data = await fetch_connect_data_of_owner_facebook(owner_id);
      var tokenExists = "";
      if (connect_data[0].token && connect_data[0].token.length > 0) {
        tokenExists = true;
      } else {
        tokenExists = false;
      }
      if (
        connect_data[0].client_id &&
        connect_data[0].client_id.length > 0 &&
        connect_data[0].redirect_uri &&
        connect_data[0].redirect_uri.length > 0
      ) {
        try {
          const auth_url = await create_auth_url_facebook(connect_data[0]);
          var final_data = {
            platform: "facebook",
            auth_url: auth_url,
            icon: domainpath + "/uploads/icons/facebook.png",
            access: tokenExists,
          };
          resolve(final_data);
        } catch (err) {
          var final_data = {
            platform: "facebook",
            auth_url: null,
            icon: domainpath + "/uploads/icons/facebook.png",
            access: tokenExists,
          };
          resolve(final_data);
        }
      } else {
        var final_data = {
          platform: "facebook",
          auth_url: null,
          icon: domainpath + "/uploads/icons/facebook.png",
          access: tokenExists,
        };
        resolve(final_data);
      }
    } catch (err) {
      if (
        err.status == "error" &&
        err.message == "NO_DATA" &&
        err.statusCode == 204
      ) {
        var final_data = {
          platform: "facebook",
          auth_url: null,
          icon: domainpath + "/uploads/icons/facebook.png",
          access: tokenExists,
        };
        resolve(final_data);
      } else {
        reject(err);
      }
    }
  });
  const p2 = new Promise(async (resolve, reject) => {
    try {
      const connect_data = await fetch_connect_data_of_owner_instagram(
        owner_id
      );
      var tokenExists = "";
      if (connect_data[0].token && connect_data[0].token.length > 0) {
        tokenExists = true;
      } else {
        tokenExists = false;
      }
      if (
        connect_data[0].client_id &&
        connect_data[0].client_id.length > 0 &&
        connect_data[0].redirect_uri &&
        connect_data[0].redirect_uri.length > 0
      ) {
        try {
          const auth_url = await create_auth_url_instagram(connect_data[0]);
          var final_data = {
            platform: "instagram",
            auth_url: auth_url,
            icon: domainpath + "/uploads/icons/instagram.jpeg",
            access: tokenExists,
          };
          resolve(final_data);
        } catch (err) {
          var final_data = {
            platform: "instagram",
            auth_url: null,
            icon: domainpath + "/uploads/icons/instagram.jpeg",
            access: tokenExists,
          };
          resolve(final_data);
        }
      } else {
        var final_data = {
          platform: "instagram",
          auth_url: null,
          icon: domainpath + "/uploads/icons/instagram.jpeg",
          access: tokenExists,
        };
        resolve(final_data);
      }
    } catch (err) {
      if (
        err.status == "error" &&
        err.message == "NO_DATA" &&
        err.statusCode == 204
      ) {
        var final_data = {
          platform: "instagram",
          auth_url: null,
          icon: domainpath + "/uploads/icons/instagram.jpeg",
          access: tokenExists,
        };
        resolve(final_data);
      } else {
        reject(err);
      }
    }
  });
  const p3 = new Promise(async (resolve, reject) => {
    try {
      const connect_data = await fetch_connect_data_of_owner_linkedIn(owner_id);
      var tokenExists = "";
      if (connect_data[0].token && connect_data[0].token.length > 0) {
        tokenExists = true;
      } else {
        tokenExists = false;
      }
      if (
        connect_data[0].client_id &&
        connect_data[0].client_id.length > 0 &&
        connect_data[0].redirect_uri &&
        connect_data[0].redirect_uri.length > 0
      ) {
        try {
          const auth_url = await create_auth_url_linkedin(connect_data[0]);
          var final_data = {
            platform: "linkedIn",
            auth_url: auth_url,
            icon: domainpath + "/uploads/icons/linkedin.png",
            access: tokenExists,
          };
          resolve(final_data);
        } catch (err) {
          var final_data = {
            platform: "linkedIn",
            auth_url: null,
            icon: domainpath + "/uploads/icons/linkedin.png",
            access: tokenExists,
          };
          resolve(final_data);
        }
      } else {
        var final_data = {
          platform: "linkedIn",
          auth_url: null,
          icon: domainpath + "/uploads/icons/linkedin.png",
          access: tokenExists,
        };
        resolve(final_data);
      }
    } catch (err) {
      if (
        err.status == "error" &&
        err.message == "NO_DATA" &&
        err.statusCode == 204
      ) {
        var final_data = {
          platform: "linkedIn",
          auth_url: null,
          icon: domainpath + "/uploads/icons/linkedin.png",
          access: tokenExists,
        };
        resolve(final_data);
      } else {
        reject(err);
      }
    }
  });
  const p4 = new Promise(async (resolve, reject) => {
    try {
      const connect_data = await fetch_connect_data_of_owner_twitter(owner_id);
      var tokenExists = "";
      if (connect_data[0].token && connect_data[0].token.length > 0) {
        tokenExists = true;
      } else {
        tokenExists = false;
      }
      if (
        connect_data[0].client_id &&
        connect_data[0].client_id.length > 0 &&
        connect_data[0].redirect_uri &&
        connect_data[0].redirect_uri.length > 0
      ) {
        try {
          const auth_url = await create_auth_url_twitter(connect_data[0]);
          var final_data = {
            platform: "twitter",
            auth_url: auth_url,
            icon: domainpath + "/uploads/icons/twitter.jpeg",
            access: tokenExists,
          };
          resolve(final_data);
        } catch (err) {
          var final_data = {
            platform: "twitter",
            auth_url: null,
            icon: domainpath + "/uploads/icons/twitter.jpeg",
            access: tokenExists,
          };
          resolve(final_data);
        }
      } else {
        var final_data = {
          platform: "twitter",
          auth_url: null,
          icon: domainpath + "/uploads/icons/twitter.jpeg",
          access: tokenExists,
        };
        resolve(final_data);
      }
    } catch (err) {
      if (
        err.status == "error" &&
        err.message == "NO_DATA" &&
        err.statusCode == 204
      ) {
        var final_data = {
          platform: "twitter",
          auth_url: null,
          icon: domainpath + "/uploads/icons/twitter.jpeg",
          access: tokenExists,
        };
        resolve(final_data);
      } else {
        reject(err);
      }
    }
  });
  Promise.all([p1, p2, p3, p4])
    .then((values) => {
      //console.log(values);
      g_response["status"] = "success";
      g_response["responsedata"] = values;
      g_status_code = 200;
      res.status(g_status_code).json(g_response);
    })
    .catch((err) => {
      // console.log(err);
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = err.statusCode;
      res.status(g_status_code).json(g_response);
    });
};
/*-----------AuthUrl---------------------------ends here--------------------*/
//
//----FUNCTIONS----------------------------------------------------------STARTS
const create_auth_url_facebook = (data) => {
  return new Promise((resolve, reject) => {
    Facebook.create_auth_url(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const create_auth_url_instagram = (data) => {
  return new Promise((resolve, reject) => {
    Instagram.create_auth_url(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const create_auth_url_linkedin = (data) => {
  return new Promise((resolve, reject) => {
    Linkedin.create_auth_url(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const create_auth_url_twitter = (data) => {
  return new Promise((resolve, reject) => {
    Twitter.create_auth_url(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const fetch_connect_data_of_owner_facebook = (owner_id) => {
  return new Promise((resolve, reject) => {
    Facebook.fetchConnect(owner_id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const fetch_connect_data_of_owner_instagram = (owner_id) => {
  return new Promise((resolve, reject) => {
    Instagram.fetchConnect(owner_id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const fetch_connect_data_of_owner_linkedIn = (owner_id) => {
  return new Promise((resolve, reject) => {
    Linkedin.fetchConnect(owner_id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const fetch_connect_data_of_owner_twitter = (owner_id) => {
  return new Promise((resolve, reject) => {
    Twitter.fetchConnect(owner_id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
