const { response } = require("express");
const { decodetheid, validation } = require("../helpers/common");
const Entity = require("../models/entity");
const SQL = require("../helpers/sql");
const table_meta = "entity_meta";
const con = require("../models/db");
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

exports.CreateEntity = async (req, res) => {
  const validationRule = {
    name: "required|string",
    module_id: "required|number",
    parent_id: "required|number",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;
  const metaRule = {};
  try {
    var meta_data = data.meta;
    delete data.meta;
    const valid_data = await validation(data, validationRule);
    const validate_meta = await validation(meta_data, metaRule);
    try {
      const create_response = await create(valid_data);
      if (meta_data) {
        const saveMeta = {};
        saveMeta.entity_id = create_response;
        saveMeta["save_data"] = validate_meta;
        var Update_meta_response = await updatetEntityMetaByentityid(saveMeta);
      }
      g_response["status"] = "success";
      g_response["message"] = " Entity Created Successfully";
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

const create = (data) => {
  return new Promise((resolve, reject) => {
    Entity.createEntity(data, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const updatetEntityMetaByentityid = async (data, result) => {
  var db_meta_keys = [];
  var meta_update_sql = "";
  var meta_insert_sql = "";
  var sqlquery = "";
  var meta_insert_start =
    "INSERT INTO entity_meta (entity_id, entity_key,value) VALUES ";

  const sql = await con.query(
    `SELECT GROUP_CONCAT(entity_key) AS key_name FROM entity_meta WHERE entity_id=?`,
    [data.entity_id],
    (err, response) => {
      if (response) {
        db_keys = Object.values(JSON.parse(JSON.stringify(response)));

        if (db_keys[0].key_name) {
          db_meta_keys = db_keys[0].key_name.split(",");
        }
        var meta_keys = Object.keys(data.save_data);

        meta_keys.forEach((eachkey) => {
          var typeof_data = typeof data.save_data[eachkey];

          console.log(data.save_data[eachkey]);
          data.save_data[eachkey] =
            typeof data.save_data[eachkey] === "object"
              ? JSON.stringify(data.save_data[eachkey])
              : data.save_data[eachkey];

          if (db_meta_keys.includes(eachkey)) {
            meta_update_sql =
              "UPDATE " +
              table_meta +
              " SET value='" +
              data.save_data[eachkey] +
              "' WHERE entity_id='" +
              data.entity_id +
              "' AND entity_key='" +
              eachkey +
              "';";

            var update_store_meta = con.query(
              meta_update_sql,
              (error, sqlresult) => {
                if (error) {
                  const Error = {
                    status: "error",
                    message: error.message,
                  };
                  return Error, null;
                } else {
                  const success = {
                    status: "success",
                  };
                  return null, success;
                }
              }
            );
          } else {
            meta_insert_sql =
              meta_insert_start +
              "('" +
              data.entity_id +
              "','" +
              eachkey +
              "','" +
              data.save_data[eachkey] +
              "');";

            var update_store_meta = con.query(
              meta_insert_sql,
              (error, sqlresult) => {
                if (error) {
                  const Error = {
                    status: "error",
                    message: error.message,
                  };
                  return Error, null;
                } else {
                  const success = {
                    status: "success",
                  };
                  return null, success;
                }
              }
            );
          }
        });

        console.log(meta_insert_sql);
        meta_insert_sql = meta_insert_sql.slice(0, -1) + "; ";
        console.log(meta_insert_sql);
        if (meta_insert_sql !== "; ") {
          sqlquery = meta_insert_start + meta_insert_sql + meta_update_sql;
        } else {
          sqlquery = meta_update_sql;
        }
      }
    }
  );
};

exports.GetAllEntities = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    if (req.params.id == "all") {
      ID = req.params.id;
    }
    try {
      const get_data = await get_by_id(ID);
      g_response["status"] = "success";
      g_response["responsedata"] = get_data;
      g_status_code = 200;
      // console.log(g_response);
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

const get_by_id = (ID) => {
  return new Promise((resolve, reject) => {
    Entity.getById(ID, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.GetEntityByParentId = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;

  if (req.params.parent_id && req.params.parent_id.length > 0) {
    ID = req.params.parent_id;
    console.log(ID);
    try {
      const get_data = await get_by_parent_id(ID);
      g_response["status"] = "success";
      g_response["responsedata"] = get_data;
      g_status_code = 200;
      console.log(g_response);
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};
const get_by_parent_id = (ID) => {
  console.log(ID);
  return new Promise((resolve, reject) => {
    Entity.getentityByParentId(ID, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.UpdateById = async (req, res) => {
  const validationRule = {
    name: "required|string",
    module_id: "required|number",
    parent_id: "required|number",
  };
  var metaRule = {};
  var ID;
  var g_response = {};
  var g_status_code;
  const data = req.body;
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      var meta_data = data.meta;
      delete data.meta;
      const validate_data = await validation(data, validationRule);
      const validate_meta = await validation(meta_data, metaRule);
      try {
        const create_response = await SQL.Updatedata("entity", data, {
          id: ID,
        });
        const saveMeta = {};
        saveMeta.entity_id = ID;
        saveMeta["save_data"] = validate_meta;
        var Update_meta_response = await updatetEntityMetaByentityid(saveMeta);
        g_response["status"] = "success";
        g_response["message"] = "Update Entity Successfully";
        g_status_code = 201;
      } catch (err) {
        g_response["status"] = "error";
        g_response["message"] = err.message;
        g_status_code = 400;
      }
    } catch (err) {
      g_response["status"] = "err";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

const update_byId = (data) => {
  return new Promise((resolve, reject) => {
    Entity.updatetbyid(data, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.DeleteById = async (req, res) => {
  var deleteID;
  var g_response = {};
  var g_status_code;

  if (req.params.id && req.params.id.length > 0) {
    deleteID = req.params.id;
    try {
      const delete_resp = await delete_by_id(deleteID);
      const delete_meta = await delete_meta_id(deleteID);
      g_response["status"] = "success";
      g_response["message"] = `ENTITY Delete Successfully`;
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

const delete_by_id = (faqdeleteID) => {
  return new Promise((resolve, reject) => {
    Entity.deletebyid(faqdeleteID, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const delete_meta_id = (faqdeleteID) => {
  return new Promise((resolve, reject) => {
    Entity.deletemetabyid(faqdeleteID, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
