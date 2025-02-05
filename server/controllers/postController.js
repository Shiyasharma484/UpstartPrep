const Facebook = require("../models/facebook");
const LinkedIn = require("../models/linkedin");
const Instagram = require("../models/instagram");
const Twitter = require("../models/twitter");
var fs = require("fs");

const Post = require("../models/post");
//-------------------------------------------------------------------------------------------------------------
//
/*-----------Posts------------------------------starts here--------------------*/
exports.Posts = async (req, res) => {
  var postId;
  var g_response = {};
  var g_status_code;
  //CASE -1 -------------------------------------------GET BY ID
  if (req.params.id && req.params.id > 0) {
    postId = req.params.id;
    try {
      const post_data = await fetch_single_post(postId);
      g_response["status"] = "success";
      g_response["responsedata"] = { posts: post_data };
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = err.statusCode;
    }
    res.status(g_status_code).json(g_response);
  }
  //CASE -2 -------------------------------------------GET ALL
  else if (req.params && Object.keys(req.params).length == 0) {
    try {
      const post_data = await fetch_posts();
      g_response["status"] = "success";
      g_response["responsedata"] = { posts: post_data };
      g_status_code = 200;
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
/*-----------Posts------------------------------ends here--------------------*/
//
/*-----------PostsByUserId------------------------------starts here--------------------*/
exports.PostsByUserId = async (req, res) => {
  var userId;
  var g_response = {};
  var g_status_code;
  //CASE -1 -------------------------------------------GET BY ID
  if (req.params.id && req.params.id > 0) {
    userId = req.params.id;
    try {
      const post_data = await fetch_post_by_userId(userId);
      g_response["status"] = "success";
      g_response["responsedata"] = { posts: post_data };
      g_status_code = 200;
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
/*-----------PostsByUserId------------------------------ends here--------------------*/
//
/*-----------DeletePost---------------------------starts here--------------------*/
exports.DeletePost = async (req, res) => {
  var postId;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id > 0) {
    postId = req.params.id;
    try {
      const post_delete_data = await delete_post(postId);
      g_response["status"] = "success";
      g_response["message"] = post_delete_data;
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
/*-----------DeletePost---------------------------ends here--------------------*/
//
/*-----------TrashPost---------------------------starts here--------------------*/
exports.TrashPost = async (req, res) => {
  var postId;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id > 0) {
    postId = req.params.id;
    try {
      const post_trash_data = await trash_post(postId);
      g_response["status"] = "success";
      g_response["message"] = post_trash_data;
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
/*-----------TrashPost---------------------------ends here--------------------*/
//
/*-----------UpdatePost---------------------------starts here--------------------*/
exports.UpdatePost = async (req, res) => {
  const data = req.body;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    const postId = req.params.id;
    try {
      const update_data = await check_valid_data_post_update(data);
      const saveData = {};
      saveData["post_id"] = postId;
      saveData["save_data"] = update_data;
      try {
        const update_post_data_resp = await update_post(saveData);
        g_response["status"] = "success";
        g_response["message"] = "Post Updated Successfully";
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
/*-----------UpdatePost---------------------------ends here--------------------*/
//
/*-----------CreatePost---------------------------starts here--------------------*/
exports.CreatePost = async (req, res) => {
  var g_response = {};
  var g_status_code;
  const data = req.body;
  var final_array = [];
  console.log(data);
  if (data.active == 0 || data.active == 1) {
    if (data.active == 0) {
      console.log("Draft");
      try {
        const validate_data = await check_valid_data_create_post(data);
        try {
          const post_data_resp = await create_post(validate_data);
          g_response["status"] = "success";
          g_response["responsedata"] = "Post Saved Successfully";
          g_status_code = 201;
        } catch (err) {
          final_array.push({
            facebook: {
              status: "error",
              message: err.message,
              statusCode: err.statusCode,
            },
          });
          resolve("done");
        }
      } catch (err) {
        g_response["status"] = "error";
        g_response["message"] = err.message;
        g_status_code = err.statusCode;
      }
      res.status(g_status_code).json(g_response);
    } else {
      console.log("Publish");
      var postID;
      //check post already there inactive--> to publish or not---------starts
      var checkPostAlready = 0;
      if (data.id && data.id > 0) {
        console.log("Update Old Post");
        checkPostAlready = 1;
        postID = data.id;
      } else {
        console.log("Create New Post");
      }
      //check post already there inactive--> to publish or not---------ends
      try {
        const validate_data = await check_valid_data_create_post(data);
        //create post
        try {
          if (checkPostAlready == 0) {
            const post_data_resp = await create_post(validate_data);
            // console.log(post_data_resp);
            postID = post_data_resp;
            console.log("Post Saved Successfully");
          }
          //
          //
          const p1 = new Promise(async (resolve, reject) => {
            try {
              const userId = data.user_id;
              const connect_data = await fb_fetch_connect_by_userId(userId);
              const withImage = 0;
              var compile_data = {};
              if (validate_data.images && validate_data.images.length > 0) {
                const withImage = 1;
                console.log("Images Exists");
                compile_data = {
                  token: connect_data[0].token,
                  message: validate_data.description,
                  images: validate_data.images,
                };
              } else {
                console.log("No Images");
                compile_data = {
                  token: connect_data[0].token,
                  message: validate_data.description,
                };
              }
              try {
                const payload_data = await fb_hit_create_post_api(compile_data);
                //{ id: '110502371870299_121701730750363' }
                const stringifiedData = JSON.stringify(payload_data);
                //console.log(payload_data);
                const saveData = {};
                saveData["post_id"] = postID;
                saveData["save_data"] = {
                  facebook_received_data: stringifiedData,
                };
                try {
                  const update_post_data_resp = await update_post(saveData);
                  console.log("Facebook Post Created Successfully");
                  final_array.push({ facebook: "success" });
                  resolve("done");
                } catch (err) {
                  final_array.push({
                    facebook: {
                      status: "error",
                      message: err.message,
                      statusCode: err.statusCode,
                    },
                  });
                  resolve("done");
                }
              } catch (err) {
                final_array.push({
                  facebook: {
                    status: "error",
                    message: err.message,
                    statusCode: err.statusCode,
                  },
                });
                resolve("done");
              }
            } catch (err) {
              final_array.push({
                facebook: {
                  status: "error",
                  message: err.message,
                  statusCode: err.statusCode,
                },
              });
              resolve("done");
            }
          });
          const p2 = new Promise(async (resolve, reject) => {
            try {
              const userId = data.user_id;
              const connect_data = await linkedin_fetch_connect_by_userId(
                userId
              );
              const saveData = {};
              var var_success = 0;
              if (validate_data.images && validate_data.images.length > 0) {
                console.log("Images Exists");
                //Step-1 initialization---------------------starts
                const initialization_data = {
                  token: connect_data[0].token,
                  profile_id: connect_data[0].profile_id,
                };
                try {
                  const initialization_data_resp =
                    await linkedin_hit_initialization_api(initialization_data);
                  //  console.log(initialization_data_resp);
                  const uploadUrl = initialization_data_resp.value.uploadUrl;
                  // console.log(uploadUrl);
                  const imageID = initialization_data_resp.value.image;
                  //  console.log(imageID);//'urn:li:image:C4D10AQESCi5PRcZZvg'
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
                  try {
                    const upload_photo_resp =
                      await linkedin_hit_upload_photo_api(photo_data);
                    //console.log(upload_photo_resp);//success
                    //Step-2 upload photo in url received-----------------ends
                    //step-3 post and see pic--------------------------------------------Starts
                    const post_photo_data = {
                      imageID: imageID,
                      profile_id: connect_data[0].profile_id,
                      token: connect_data[0].token,
                      message: validate_data.description,
                    };
                    try {
                      const post_photo_resp = await linkedin_hit_post_photo_api(
                        post_photo_data
                      );
                      //  console.log(post_photo_resp);
                      const stringifiedData = JSON.stringify(post_photo_resp);
                      saveData["post_id"] = postID;
                      saveData["save_data"] = {
                        linkedin_received_data: stringifiedData,
                      };
                      // console.log("Everyting Done");
                      var_success = 1;
                    } catch (err) {
                      final_array.push({
                        linkedin: {
                          status: "error",
                          message: err.message,
                          statusCode: err.statusCode,
                        },
                      });
                      resolve("done");
                    }
                    //step-3 post and see pic--------------------------------------------Ends
                  } catch (err) {
                    final_array.push({
                      linkedin: {
                        status: "error",
                        message: err.message,
                        statusCode: err.statusCode,
                      },
                    });
                    resolve("done");
                  }
                  //
                } catch (err) {
                  final_array.push({
                    linkedin: {
                      status: "error",
                      message: err.message,
                      statusCode: err.statusCode,
                    },
                  });
                  resolve("done");
                }
              } else {
                console.log("Only Text");
                const compile_data = {
                  token: connect_data[0].token,
                  message: validate_data.description,
                  profile_id: connect_data[0].profile_id,
                };
                try {
                  const payload_data = await linkedin_hit_create_post_api(
                    compile_data
                  );
                  // { id: 'urn:li:share:7004109897650860032' }
                  const stringifiedData = JSON.stringify(payload_data);
                  //console.log(payload_data);
                  saveData["post_id"] = postID;
                  saveData["save_data"] = {
                    linkedin_received_data: stringifiedData,
                  };
                  var_success = 1;
                } catch (err) {
                  final_array.push({
                    linkedin: {
                      status: "error",
                      message: err.message,
                      statusCode: err.statusCode,
                    },
                  });
                  resolve("done");
                }
              }
              if (var_success == 1) {
                try {
                  const update_post_data_resp = await update_post(saveData);
                  console.log("LinkedIn Post Created Successfully");
                  final_array.push({ linkedin: "success" });
                  resolve("done");
                } catch (err) {
                  final_array.push({
                    linkedin: {
                      status: "error",
                      message: err.message,
                      statusCode: err.statusCode,
                    },
                  });
                  resolve("done");
                }
              }
            } catch (err) {
              final_array.push({
                linkedin: {
                  status: "error",
                  message: err.message,
                  statusCode: err.statusCode,
                },
              });
              resolve("done");
            }
          });
          const p3 = new Promise(async (resolve, reject) => {
            try {
              const userId = data.user_id;
              const connect_data = await instagram_fetch_connect_by_userId(
                userId
              );
              // console.log(connect_data);
              // g_response["status"] = "success";
              // g_response["responsedata"] = { fbconnects: connect_data };
              // g_status_code = 200;
              const compile_data = {
                token: connect_data[0].token,
                message: validate_data.description,
              };
              try {
                const payload_data = await instagram_hit_create_post_api(
                  compile_data
                );
                // console.log(payload_data);
                // {
                //   data: {
                //     id: '1598429149630443521',
                //     text: 'facdddddebwwwwook qqq post deep link hkhjhk! https://t.co/rgQChqAHna'
                //   }
                // }
                const stringifiedData = JSON.stringify(payload_data);
                //console.log(payload_data);
                const saveData = {};
                saveData["post_id"] = postID;
                saveData["save_data"] = {
                  instagram_received_data: stringifiedData,
                };
                try {
                  const update_post_data_resp = await update_post(saveData);
                  console.log("Instagram Post Created Successfully");
                  final_array.push({ instagram: "success" });
                  resolve("done");
                } catch (err) {
                  final_array.push({
                    instagram: {
                      status: "error",
                      message: err.message,
                      statusCode: err.statusCode,
                    },
                  });
                  resolve("done");
                }
              } catch (err) {
                final_array.push({
                  instagram: {
                    status: "error",
                    message: err.message,
                    statusCode: err.statusCode,
                  },
                });
                resolve("done");
              }
            } catch (err) {
              final_array.push({
                instagram: {
                  status: "error",
                  message: err.message,
                  statusCode: err.statusCode,
                },
              });
              resolve("done");
            }
          });
          const p4 = new Promise(async (resolve, reject) => {
            try {
              const userId = data.user_id;
              const connect_data = await twitter_fetch_connect_by_userId(
                userId
              );
              // {
              //   token: 'Q2haMFhqS1VHalpkYmVPVmxsWmVveGdHUUxYeV9hTF9kVjRJamVBbndhRU55OjE2NzA0Mzk4NjY3MjY6MToxOmF0OjE',
              //   message: {
              //     text: 'Tweeting a DM deep lidddddddddncddcck!',
              //     direct_message_deep_link: 'https://twitter.com/messages/compose?recipient_id=1593424514246791168'
              //   }
              // }
              const incoDescription = validate_data.description;
              const makeObj = {};
              if (incoDescription.text && incoDescription.text.length > 0) {
                makeObj["text"] = incoDescription.text;
              }
              if (incoDescription.text && incoDescription.text.length > 0) {
                makeObj["direct_message_deep_link"] =
                  incoDescription.direct_message_deep_link;
              }
              if (Object.keys(makeObj).length > 0) {
              } else {
                makeObj["text"] = incoDescription;
              }
              const compile_data = {
                token: connect_data[0].token,
                message: makeObj,
              };
              try {
                const payload_data = await twitter_hit_create_post_api(
                  compile_data
                );
                // console.log(payload_data);
                // {
                //   data: {
                //     id: '1598429149630443521',
                //     text: 'facdddddebwwwwook qqq post deep link hkhjhk! https://t.co/rgQChqAHna'
                //   }
                // }
                const stringifiedData = JSON.stringify(payload_data);
                //console.log(payload_data);
                const saveData = {};
                saveData["post_id"] = postID;
                saveData["save_data"] = {
                  twitter_received_data: stringifiedData,
                };
                try {
                  const update_post_data_resp = await update_post(saveData);
                  console.log("Twitter Post Created Successfully");
                  final_array.push({ twitter: "success" });
                  resolve("done");
                } catch (err) {
                  final_array.push({
                    twitter: {
                      status: "error",
                      message: err.message,
                      statusCode: err.statusCode,
                    },
                  });
                  resolve("done");
                }
              } catch (err) {
                final_array.push({
                  twitter: {
                    status: "error",
                    message: err.message,
                    statusCode: err.statusCode,
                  },
                });
                resolve("done");
              }
            } catch (err) {
              final_array.push({
                twitter: {
                  status: "error",
                  message: err.message,
                  statusCode: err.statusCode,
                },
              });
              resolve("done");
            }
          });
          Promise.all([p1, p2, p3, p4])
            .then((values) => {
              //console.log(values);
              //final_array.push({ twitter: "Permissions Issue" });
              console.log(final_array);
              g_response["status"] = "success";
              g_response["responsedata"] = final_array;
              g_status_code = 200;
              res.status(g_status_code).json(g_response);
            })
            .catch((err) => {
              console.log(err);
              g_response["status"] = "error";
              //   g_response["message"] = err.message;
              g_response["message"] = "Something Went Wrong try again later";
              //  g_status_code = err.statusCode;
              g_status_code = 400;
              res.status(g_status_code).json(g_response);
            });
        } catch (err) {
          final_array.push({
            facebook: {
              status: "error",
              message: err.message,
              statusCode: err.statusCode,
            },
          });
          resolve("done");
        }
      } catch (err) {
        g_response["status"] = "error";
        g_response["message"] = err.message;
        g_status_code = err.statusCode;
        res.status(g_status_code).json(g_response);
      }
    }
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
/*-----------CreatePost---------------------------ends here--------------------*/
//
//----FUNCTIONS----------------------------------------------------------STARTS
const fetch_single_post = (id) => {
  return new Promise((resolve, reject) => {
    Post.fetchPost(id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const fetch_posts = () => {
  return new Promise((resolve, reject) => {
    Post.fetchPosts((err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const fetch_post_by_userId = (id) => {
  return new Promise((resolve, reject) => {
    Post.fetchPostByUserId(id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const trash_post = (id) => {
  return new Promise((resolve, reject) => {
    Post.trashPost(id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const delete_post = (id) => {
  return new Promise((resolve, reject) => {
    Post.deletePost(id, (err, res) => {
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
    Post.createPost(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const check_valid_data_post_update = (data) => {
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
///////////////////////////facebook///////////////////////////////STARTS
const fb_create_post = (data) => {
  return new Promise((resolve, reject) => {
    Facebook.createPost(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const fb_fetch_connect_by_userId = (id) => {
  return new Promise((resolve, reject) => {
    Facebook.fetchConnectByUserId(id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const fb_hit_create_post_api = (data) => {
  return new Promise((resolve, reject) => {
    Facebook.create_post(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const fb_update_post = (data) => {
  return new Promise((resolve, reject) => {
    Post.updatePost(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
///////////////////////////facebook///////////////////////////////ENDS
const linkedin_create_post = (data) => {
  return new Promise((resolve, reject) => {
    LinkedIn.createPost(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const linkedin_hit_create_post_api = (data) => {
  return new Promise((resolve, reject) => {
    LinkedIn.create_post(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const linkedin_update_post = (data) => {
  return new Promise((resolve, reject) => {
    Post.updatePost(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const linkedin_fetch_connect_by_userId = (id) => {
  return new Promise((resolve, reject) => {
    LinkedIn.fetchConnectByUserId(id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

const linkedin_hit_initialization_api = (data) => {
  return new Promise((resolve, reject) => {
    LinkedIn.photo_initialization(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const linkedin_hit_upload_photo_api = (data) => {
  return new Promise((resolve, reject) => {
    LinkedIn.photo_upload(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const linkedin_hit_post_photo_api = (data) => {
  return new Promise((resolve, reject) => {
    LinkedIn.photo_post(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

///////////////instagram////////////////////
const instagram_fetch_connect_by_userId = (id) => {
  return new Promise((resolve, reject) => {
    Instagram.fetchConnectByUserId(id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const instagram_create_post = (data) => {
  return new Promise((resolve, reject) => {
    Instagram.createPost(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const instagram_hit_create_post_api = (data) => {
  return new Promise((resolve, reject) => {
    Instagram.create_post(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const instagram_update_post = (data) => {
  return new Promise((resolve, reject) => {
    Post.updatePost(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
///////////////instagram////////////////////
//////////////twitter//////////////////////////starts
const twitter_create_post = (data) => {
  return new Promise((resolve, reject) => {
    Twitter.createPost(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const twitter_hit_create_post_api = (data) => {
  return new Promise((resolve, reject) => {
    Twitter.create_post(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const twitter_update_post = (data) => {
  return new Promise((resolve, reject) => {
    Post.updatePost(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const twitter_fetch_connect_by_userId = (id) => {
  return new Promise((resolve, reject) => {
    Twitter.fetchConnectByUserId(id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
//////////////twitter//////////////////////////ends
