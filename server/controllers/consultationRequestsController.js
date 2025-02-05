const table = "consultation_requests";
const { decodetheid, validation } = require("../helpers/common");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const SQL = require("../helpers/sql");
const Model = require("../helpers/instructions");

exports.createConsultationRequests = async (req, res) => {
  console.log(req.body);
  const validationRule = {};
  var g_response = {};
  var g_status_code;
  var data = req.body;
  try {
    const valid_data = await validation(data, validationRule);

    try {
      data.data = JSON.stringify(data.data);
      const create_data = await SQL.addData("consultation_requests", data);

      g_response["status"] = "success";
      g_response["message"] = `Created ${table} Successfully`;
      g_response["id"] = create_data;
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

exports.getConsultationRequestsID = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const get_data = await SQL.gettabledata("consultation_requests", [], {
        id: ID,
      });
      get_data.forEach(async (items) => {
        console.log(items);
        items.data = JSON.parse(items.data);
      });
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

exports.getAllConsultationRequests = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;

  try {
    const get_data = await SQL.gettabledata("consultation_requests", []);
    get_data.forEach(async (items, i) => {
      items.data = JSON.parse(items.data);
      get_data[i] = items;
    });
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

exports.updateConsultationRequestsByID = async (req, res) => {
  var ID;
  console.log(req.body);
  var data = req.body;
  var g_response = {};
  var g_status_code;
  const validationRule = {};
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;

    try {
      const valid_data = await validation(data, validationRule);
      data.data = JSON.stringify(data.data);
      const update_data = await SQL.Updatedata("consultation_requests", data, {
        id: ID,
      });

      g_response["status"] = "success";
      g_response["responsedata"] = "Consultation Requests Updated Successfully";
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

// exports.DeleteById = async (req, res) => {
//   var deleteID;
//   var g_response = {};
//   var g_status_code;

//   if (req.params.id && req.params.id.length > 0) {
//     deleteID = req.params.id;
//     console.log(deleteID);
//     try {
//       const delete_resp = await Delete(deleteID);
//       g_response["status"] = "success";
//       g_response["message"] = "video_bank Delete Successfully";
//       g_status_code = 201;
//     } catch (err) {
//       g_response["status"] = "error";
//       g_response["message"] = err.message;
//       g_status_code = 400;
//     }
//     res.status(g_status_code).json(g_response);
//   }
// };
// const Delete = async (deleteID, result) => {
//   let delete_payload = {
//     table_name: table,
//     query_field: "id",
//     query_value: deleteID,
//   };
//   const respSql = await Model.delete_query(delete_payload);
//   if (respSql.status == "success") {
//     return null, respSql.status;
//   } else if (respSql.status == "error") {
//     const err = respSql.message;
//     const respError = await Model.error_query(err);
//     const Error = {
//       status: "error",
//       message: respError.message,
//       statusCode: respError.statusCode,
//     };
//     return Error, null;
//   }
// };
