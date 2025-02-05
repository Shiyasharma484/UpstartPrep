const Model = require("../helpers/instructions");
const table_post = "posts";
var moment = require("moment");
// Plan object constructor
var Post = function () {};
//
/*-----------fetchPost------------------------------starts here--------------------*/
Post.fetchPost = async (postId, result) => {
  let sql_query_payload = {
    sql_script: `SELECT p.id, p.user_id, p.medium, CONCAT_WS(' ', u.first_Name, u.middle_Name, u.last_Name) as user_name, p.title, p.description, p.images, p.active FROM ${table_post} as p LEFT JOIN users as u ON u.id=p.user_id WHERE p.trash = 0 AND p.id=${postId}`,
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
/*-----------fetchPost------------------------------ends here--------------------*/
//
/*-----------fetchPosts------------------------------starts here--------------------*/
Post.fetchPosts = async (result) => {
  let sql_query_payload = {
    sql_script: `SELECT p.id, p.user_id, p.medium, CONCAT_WS(' ', u.first_Name, u.middle_Name, u.last_Name) as user_name, p.title, p.description, p.images, p.active FROM ${table_post} as p LEFT JOIN users as u ON u.id=p.user_id WHERE p.trash = 0`,
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
/*-----------fetchPosts------------------------------ends here--------------------*/
//
/*-----------fetchPostByUserId------------------------------starts here--------------------*/
Post.fetchPostByUserId = async (userId, result) => {
  let sql_query_payload = {
    sql_script: `SELECT p.id, p.user_id, p.medium, CONCAT_WS(' ', u.first_Name, u.middle_Name, u.last_Name) as user_name, p.title, p.description, p.images, p.active FROM ${table_post} as p LEFT JOIN users as u ON u.id=p.user_id WHERE p.trash = 0 AND p.user_id=${userId}`,
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
/*-----------fetchPostByUserId------------------------------ends here--------------------*/
//
/*-----------deletePost------------------------------starts here--------------------*/
Post.deletePost = async (postId, result) => {
  let delete_payload = {
    table_name: table_post,
    query_field: "id",
    query_value: postId,
  };
  const respDelete = await Model.delete_query(delete_payload);
  if (respDelete.status == "success") {
    const message = "Post Deleted Successfully";
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
/*-----------deletePost------------------------------ends here--------------------*/
//
/*-----------trashPost------------------------------starts here--------------------*/
Post.trashPost = async (postId, result) => {
  let delete_payload = {
    table_name: table_post,
    query_field: "id",
    query_value: postId,
    dataToSave: {
      active: 0,
      trash: 1,
    },
  };
  const respDelete = await Model.trash_query(delete_payload);
  if (respDelete.status == "success") {
    const message = "Post Deleted Successfully";
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
/*-----------trashPost------------------------------ends here--------------------*/
//
/*-----------createPost------------------------------starts here--------------------*/
Post.createPost = async (saveData, result) => {
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
/*-----------updatePost------------------------------starts here--------------------*/
Post.updatePost = async (data, result) => {
  let update_payload = {
    table_name: table_post,
    query_field: "id",
    query_value: data.post_id,
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
/*-----------updatePost------------------------------ends here--------------------*/
//
module.exports = Post;
