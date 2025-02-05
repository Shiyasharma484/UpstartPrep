const table = "skills";
const { decodetheid, validation } = require("../helpers/common");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const SQL = require("../helpers/sql");
const Model = require("../helpers/instructions");

exports.createSkills = async (req, res) => {
  console.log(req.body);
  const validationRule = {
    skill_name: "required|string",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;
  try {
    const valid_data = await validation(data, validationRule);

    try {
      const create_skills_data = await SQL.addData("skills", data);

      g_response["status"] = "success";
      g_response["message"] = `Created ${table} Successfully`;
      g_status_code = 201;
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

exports.getSkillsByID = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const get_Skills = await SQL.query(
        "SELECT sk.id,sk.skill_name,sk.section_id,s.section_name,sk.short_description,sk.active FROM skills as sk LEFT JOIN sections as s ON sk.section_id=s.id WHERE sk.id =" +
          ID
      );

      g_response["status"] = "success";
      g_response["responsedata"] = get_Skills;
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

exports.getAllSkills = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;

  try {
    const get_Skills = await SQL.query(
      "SELECT sk.id,sk.skill_name,sk.section_id,s.section_name,sk.short_description,sk.active FROM skills as sk LEFT JOIN sections as s ON sk.section_id=s.id "
    );

    g_response["status"] = "success";
    g_response["responsedata"] = get_Skills;
    g_status_code = 200;
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }
  res.status(g_status_code).json(g_response);
};

exports.updateSkillsByID = async (req, res) => {
  var ID;
  console.log(req.body);
  var data = req.body;
  var g_response = {};
  var g_status_code;
  const validationRule = {
    skill_name: "string",
  };
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const valid_data = await validation(data, validationRule);
      const update_skills_data = await SQL.Updatedata("skills", data, {
        id: ID,
      });

      g_response["status"] = "success";
      g_response["responsedata"] = "Skills Updateded Successfully";
      g_status_code = 201;
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
      const delete_resp = await skillDelete(deleteID);
      g_response["status"] = "success";
      g_response["message"] = "Skills Delete Successfully";
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};
const skillDelete = async (deleteID, result) => {
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
