const con = require("./db");
const Model = require("../helpers/instructions");
const { error_query, sql_query } = require("../helpers/instructions");
const SQL = require("../helpers/sql");
const table = "entity";
const table_meta = "entity_meta";

const Entity = function () {};

Entity.createEntity = async (saveData, result) => {
  let add_payload = {
    table_name: table,
    dataToSave: saveData,
  };

  const respSql = await Model.add_query(add_payload);
  if (respSql.status == "success") {
    result(null, respSql.id);
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

Entity.getById = async (ID, result) => {
  var response_data = [];
  var where = "WHERE e.id=" + ID;
  var meta = {};
  if (ID == "all") {
    where = "";
  }
  let sql_query_payload = {
    sql_script: `SELECT  e.id,e.name,e.module_id,e.parent_id,pe.name as parent_entity,m.name as module_name FROM entity as e LEFT JOIN modules as m ON e.module_id=m.id LEFT JOIN entity as pe ON pe.id=e.parent_id ${where}`,

    method: "get",
  };
  if (ID != "all") {
    let meta_data = await SQL.gettabledata("entity_meta", [], {
      entity_id: ID,
    });
    console.log(meta_data);
    keys = Object.values(meta_data);
    keys.forEach((item) => {
      var values = JSON.parse(JSON.stringify(item.value));
      meta[item.entity_key] = values;
    });
    const respSql = await Model.sql_query(sql_query_payload);
    respSql.data[0].meta = meta;
    console.log(respSql, "respSqlrespSqlrespSqlrespSqlrespSqlrespSql");
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
  } else if (ID == "all") {
    var get_all_entity = await SQL.gettabledata("entity", []);

    var data_res = await get_all_entity.forEach(async (item, i) => {
      var get_meta = await SQL.gettabledata(
        "entity_meta",
        ["entity_key", "value"],
        {
          entity_id: item.id,
        }
      );
      var metadata = {};
      await get_meta.forEach(async (element) => {
        var meta_key = element.entity_key.replace(" ", "_");
        var values = JSON.parse(element.value);
        metadata[meta_key] = values;
      });
      item.meta = metadata;
      response_data[i] = item;
    });
    const respSql = await Model.sql_query(sql_query_payload);
    respSql.data = response_data;

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
  }
};

Entity.getAll = async (result) => {
  let sql_query_payload = {
    sql_script: `SELECT  e.id,e.name,e.module_id,e.parent_id,pe.name as parent_entity,m.name as module_name FROM entity as e LEFT JOIN modules as m ON e.module_id=m.id LEFT JOIN entity as pe ON pe.id=e.parent_id `,

    method: "get",
  };
  const respSql = await Model.sql_query(sql_query_payload);
  console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
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

Entity.getentityByParentId = async (ID, result) => {
  let sql_query_payload = {
    sql_script: `SELECT id,name,module_id,parent_id FROM ${table} WHERE parent_id=${ID}`,
    method: "get",
  };
  console.log(sql_query_payload);
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

Entity.updatetbyid = async (data, result) => {
  let update_payload = {
    table_name: table,
    query_field: "id",
    query_value: data.id,
    dataToSave: data.save_data,
  };
  const respSql = await Model.edit_query(update_payload);
  if (respSql.status == "success") {
    result(null, respSql.status);
  } else if (respSql.status == "error") {
    const err = respSql.message;
    const respError = await error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    result(Error, null);
  }
};

Entity.deletebyid = async (deleteID, result) => {
  let delete_payload = {
    table_name: table,
    query_field: "id",
    query_value: deleteID,
  };
  const respSql = await Model.delete_query(delete_payload);
  if (respSql.status == "success") {
    result(null, respSql.status);
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
Entity.deletemetabyid = async (deleteID, result) => {
  let delete_payload = {
    table_name: table_meta,
    query_field: "entity_id",
    query_value: deleteID,
  };
  const respSql = await Model.delete_query(delete_payload);
  if (respSql.status == "success") {
    result(null, respSql.status);
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
module.exports = Entity;
