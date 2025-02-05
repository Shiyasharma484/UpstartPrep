const table = "lesson";
const { decodetheid, validation } = require("../helpers/common");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const SQL = require("../helpers/sql");
const Model = require("../helpers/instructions");

exports.createLessons = async (req, res) => {
  console.log(req.body);
  const validationRule = {
    // title: "required|string",
    skill_id: "required|number",
    // topic_id: "required|number",
    // tag_id: "required|number",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;

  try {
    const valid_data = await validation(data, validationRule);

    const check_name = data.title;
    console.log(check_name);
    const get_name = await SQL.gettabledata("lesson", "id", {
      title: check_name,
    });
    if (get_name[0]) {
      g_response["status"] = "error";
      g_response["message"] = "Lesson Already Exists";
      g_status_code = 200;
    } else {
      const create_data = await SQL.addData("lesson", data);
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
  res.status(g_status_code).json(g_response);
};

exports.getLessonssByID = async (req, res) => {
  console.log(req.params);
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const get_tags = await SQL.query(
        "SELECT l.id, l.title,l.description,l.sub_category_id,sc.sub_category_name,l.skill_id,s.skill_name,s.section_id,se.section_name,l.topic_id,t.topic_name,l.tag_id,ta.tag_name,l.difficulty_level,l.read_time,l.paid,l.active FROM lesson as l LEFT JOIN  sub_categories as sc ON sc.id=l.sub_category_id LEFT JOIN skills as s ON s.id = l.skill_id LEFT JOIN topics as t ON t.id=l.topic_id LEFT JOIN tags as ta ON ta.id= l.tag_id LEFT JOIN sections as se ON s.section_id = se.id WHERE l.id=" +
          ID
      );
      g_response["status"] = "success";
      g_response["responsedata"] = get_tags;
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }

    res.status(g_status_code).json(g_response);
  }
};

exports.getAllLessons = async (req, res) => {
  console.log(req.params);
  var ID;
  var g_response = {};
  var g_status_code;

  try {
    const get_tags = await SQL.query(
      "SELECT l.id, l.title,l.description,l.sub_category_id,sc.sub_category_name,l.skill_id,s.skill_name,s.section_id,se.section_name,l.topic_id,t.topic_name,l.tag_id,ta.tag_name,l.difficulty_level,l.read_time,l.paid,l.active FROM lesson as l LEFT JOIN  sub_categories as sc ON sc.id=l.sub_category_id LEFT JOIN skills as s ON s.id = l.skill_id LEFT JOIN topics as t ON t.id=l.topic_id LEFT JOIN tags as ta ON ta.id= l.tag_id LEFT JOIN sections as se ON s.section_id = se.id "
    );
    g_response["status"] = "success";
    g_response["responsedata"] = get_tags;
    g_status_code = 200;
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }

  res.status(g_status_code).json(g_response);
};

exports.updateLessonsByID = async (req, res) => {
  var ID;
  console.log(req.body);
  var data = req.body;
  var g_response = {};
  var g_status_code;
  const validationRule = {
    // title: "required|string",
    skill_id: "required|number",
    // topic_id: "required|number",
    // tag_id: "required|number",
  };
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const valid_data = await validation(data, validationRule);

      const check_name = data.title;
      console.log(check_name);
      const get_name = await SQL.count(
        "lesson",
        { title: check_name },
        { id: ID }
      );

      if (get_name > 0) {
        g_response["status"] = "error";
        g_response["message"] = "Lesson Already Exists";
        g_status_code = 200;
      } else {
        const update_data = await SQL.Updatedata("lesson", data, {
          id: ID,
        });
        g_response["status"] = "success";
        g_response["responsedata"] = "Lesson Updated Successfully";
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
      const delete_resp = await lessonDelete(deleteID);
      g_response["status"] = "success";
      g_response["message"] = "Lesson Delete Successfully";
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};
const lessonDelete = async (deleteID, result) => {
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
