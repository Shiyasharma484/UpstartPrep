const table = "parent_stu";
const { decodetheid, validation } = require("../helpers/common");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const SQL = require("../helpers/sql");
const Model = require("../helpers/instructions");
const bcrypt = require("bcrypt");

exports.createParent = async (req, res) => {
  console.log(req.body);
  const validationRuleUser = {
    first_name: "required|string",
    last_name: "required|string",
    email: "required|email",
    password: "required|string",
  };
  const validationRuleParent = {
    // user_id: "required|number",
    student_id: "required",

    relation: "required|string",
    status: "required",
  };

  var g_response = {};
  var g_status_code;
  var data = req.body;
  var data_role = data.role;
  try {
    delete data.role;
    const valid_data_User = await validation(data, validationRuleUser);
    const valid_data_Parent = await validation(data, validationRuleParent);

    try {
      var check_email = await SQL.gettabledata("users", ["id"], {
        email: data.email,
      });
      if (check_email.length > 0) {
        g_response["status"] = "error";
        g_response["message"] = "Email Already Exist";
        g_status_code = 200;
      } else {
        const hashed_password = await hash_password(valid_data_User);
        var password = hashed_password;

        const create_data_User = await SQL.addData("users", {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password: password,
          phone: data.phone,
        });
        const craete_data_role = await SQL.addData("users_role", {
          users_id: create_data_User,
          role: data_role,
          active: data.status,
        });
        const create_data = await SQL.addData("parent_stu", {
          parent_user_id: create_data_User,
          student_id: data.student_id,
          relation: data.relation,
          status: data.status,
        });

        g_response["status"] = "success";
        g_response["message"] = `Created ${table} Successfully`;
        g_response["id"] = create_data;
        g_status_code = 201;
      }
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }
  res.status(g_status_code).json(g_response);
};

exports.getParentByID = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const get_data = await SQL.query(
        "SELECT p.id,p.parent_user_id,CONCAT(u.first_Name,' ',u.last_Name) as parent_name,p.student_id, u.phone,u.email,p.relation,p.status FROM parent_stu as p LEFT JOIN users as u ON u.id=p.user_id WHERE p.id=" +
          ID
      );

      g_response["status"] = "success";
      g_response["responsedata"] = get_data;
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};
exports.getAllChildByParent = async (req, res) => {
  var ID;
  var get_data;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      var get_child = await SQL.gettabledata("parent_stu", ["student_id"], {
        parent_user_id: ID,
      });
      // console.log(get_child[0].child_id);
      // var array_childID = get_child[0].child_id.split(",");
      // get_child.forEach(async (element) => {

      // get_data = await SQL.query(
      //   "SELECT p.id,p.user_id,p.child_id,CONCAT(us.first_Name,us.last_Name)as child_name,us.email as child_email,us.phone as child_phone FROM parent_stu as p LEFT JOIN users as us ON  us.id=p.child_id WHERE us.id IN(" +
      //     get_child[0].child_id +
      //     ") "
      // );
      var get_child1 = await SQL.query(
        "SELECT u.id,CONCAT(u.first_Name,' ',u.last_Name)as child_name,u.email as child_email,u.phone as child_phone FROM users as u WHERE u.id IN(" +
          get_child[0].student_id +
          ")"
      );
      console.log(get_child1);

      g_response["status"] = "success";
      g_response["responsedata"] = get_child1;
      g_status_code = 200;
      res.status(g_status_code).json(g_response);
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
      res.status(g_status_code).json(g_response);
    }
  }
};

exports.getAllParent = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;

  try {
    const get_data = await SQL.query(
      "SELECT p.id,p.parent_user_id,CONCAT(u.first_Name,' ',u.last_Name) as parent_name,p.student_id, u.phone,u.email,p.relation,p.status FROM parent_stu as p LEFT JOIN users as u ON u.id=p.parent_user_id"
    );

    g_response["status"] = "success";
    g_response["responsedata"] = get_data;
    g_status_code = 200;
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }
  res.status(g_status_code).json(g_response);
};

exports.updateByID = async (req, res) => {
  var ID;
  const validationRuleUser = {
    first_name: "required|string",
    last_name: "required|string",
    email: "required|email",
    password: "required|string",
  };
  const validationRuleParent = {
    // user_id: "required|number",
    student_id: "required",

    relation: "required|string",
    status: "required",
  };

  var g_response = {};
  var g_status_code;
  var data = req.body;
  var data_role = data.role;

  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      delete data.role;
      const valid_data_User = await validation(data, validationRuleUser);
      const valid_data_Parent = await validation(data, validationRuleParent);

      const user_id = data.parent_user_id;
      console.log(user_id);
      const get_user_id = await SQL.count(
        "parent_stu",
        { parent_user_id: user_id },
        { id: ID }
      );
      if (get_user_id > 0) {
        g_response["status"] = "error";
        g_response["message"] = "Already Exists";
        g_status_code = 200;
      } else {
        const hashed_password = await hash_password(valid_data_User);
        var password = hashed_password;

        const create_data_User = await SQL.Updatedata(
          "users",
          {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: password,
            phone: data.phone,
          },
          { id: ID }
        );
        const craete_data_role = await SQL.Updatedata(
          "users_role",
          {
            users_id: data.user_id,
            role: data_role,
          },
          { id: ID }
        );
        const create_data = await SQL.Updatedata(
          "parent_stu",
          {
            parent_user_id: data.user_id,
            student_id: data.student_id,
            relation: data.relation,
            status: data.status,
          },
          { id: ID }
        );

        g_response["status"] = "success";
        g_response["responsedata"] = "Parent Details Updated Successfully";
        g_status_code = 201;
      }
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

exports.DeleteById = async (req, res) => {
  var deleteID;
  var g_response = {};
  var g_status_code;

  if (req.params.id && req.params.id.length > 0) {
    deleteID = req.params.id;
    console.log(deleteID);
    try {
      var get_details = await SQL.gettabledata("parent_stu", [], {
        id: deleteID,
      });

      console.log(get_details.length);
      if (get_details.length < 1) {
        g_response["status"] = "error";
        g_response["message"] = "No Data";
        g_status_code = 200;
      } else {
        const delete_resp = await Delete(deleteID);
        g_response["status"] = "success";
        g_response["message"] = "Parent Details Deleted Successfully";
        g_status_code = 201;
      }
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};
const Delete = async (deleteID, result) => {
  let delete_payload = {
    table_name: table,
    query_field: "id",
    query_value: deleteID,
  };
  const respSql = await Model.delete_query(delete_payload);
  if (respSql.status == "success") {
    return null, respSql.status;
  } else if (respSql.status == "error") {
    const err = respSql.message;
    const respError = await Model.error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    return Error, null;
  }
};
const hash_password = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const password = data.password;
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          const Error = {
            status: "error",
            message: "Server Error",
            statusCode: 400,
          };
          reject(Error);
        } else {
          resolve(hash);
        }
      });
    } catch (err) {
      const Error = {
        status: "error",
        message: "Server Error",
        statusCode: 400,
      };
      reject(Error);
    }
  });
};
