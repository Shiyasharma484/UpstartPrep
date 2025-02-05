const Model = require("../helpers/instructions");
const table_tax = "taxes";
const table_country = "countries";
// Plan object constructor
var Tax = function () {};
//
/*-----------fetchTax------------------------------starts here--------------------*/
Tax.fetchTax = async (taxId, result) => {
  let sql_query_payload = {
    sql_script: `SELECT t.id, t.tax_name, t.tax_value, t.country as country_id, c.full_name as country_name, t.active from ${table_tax} as t LEFT JOIN ${table_country} as c ON c.id=t.country WHERE t.trash = 0 AND t.id=${taxId} ORDER BY t.id DESC`, //CONCAT(t.tax_value,' %') as tax_value
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
/*-----------fetchTax------------------------------ends here--------------------*/
//
/*-----------fetchTaxes------------------------------starts here--------------------*/
Tax.fetchTaxes = async (result) => {
  let sql_query_payload = {
    sql_script: `SELECT t.id, t.tax_name, t.tax_value, t.country as country_id, c.full_name as country_name, t.active from ${table_tax} as t LEFT JOIN ${table_country} as c ON c.id=t.country WHERE t.trash = 0 ORDER BY t.id DESC`, //CONCAT(t.tax_value,' %') as tax_value
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
/*-----------fetchTaxes------------------------------ends here--------------------*/
//
/*-----------fetchCountryTaxes------------------------------starts here--------------------*/
Tax.fetchCountryTaxes = async (countryId, result) => {
  //   sql_script: `SELECT id, CONCAT(tax_name,' - ', tax_value,' %') as tax_name, CONCAT(tax_value,' %') as tax_value FROM taxes WHERE country=${countryId} AND trash = 0 AND active = 1`,
  let sql_query_payload = {
    sql_script: `SELECT t.id, CONCAT(tax_name,' - ', tax_value,' %') as tax_name, tax_value, t.country as country_id, c.full_name as country_name, t.active from ${table_tax} as t LEFT JOIN ${table_country} as c ON c.id=t.country WHERE t.trash = 0 AND t.active=1 AND t.country=${countryId} ORDER BY t.id DESC`, //CONCAT(t.tax_value,' %') as tax_value,
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
/*-----------fetchCountryTaxes------------------------------ends here--------------------*/
//
/*-----------delete_tax------------------------------starts here--------------------*/
Tax.deleteTax = async (taxId, result) => {
  let delete_payload = {
    table_name: table_tax,
    query_field: "id",
    query_value: taxId,
  };
  const respDelete = await Model.delete_query(delete_payload);
  if (respDelete.status == "success") {
    const message = "Tax Deleted Successfully";
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
/*-----------delete_tax------------------------------ends here--------------------*/
//
/*-----------trashTax------------------------------starts here--------------------*/
Tax.trashTax = async (taxId, result) => {
  let delete_payload = {
    table_name: table_tax,
    query_field: "id",
    query_value: taxId,
    dataToSave: {
      active: 0,
      trash: 1,
    },
  };
  const respDelete = await Model.trash_query(delete_payload);
  if (respDelete.status == "success") {
    const message = "Tax Deleted Successfully";
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
/*-----------trashTax------------------------------ends here--------------------*/
//
/*-----------createTax------------------------------starts here--------------------*/
Tax.createTax = async (saveData, result) => {
  let add_payload = {
    table_name: table_tax,
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
/*-----------createTax------------------------------ends here--------------------*/
//
/*-----------updateTax------------------------------starts here--------------------*/
Tax.updateTax = async (data, result) => {
  let update_payload = {
    table_name: table_tax,
    query_field: "id",
    query_value: data.tax_id,
    dataToSave: data.save_data,
  };
  const resp = await Model.edit_query(update_payload);
  if (resp.status == "success") {
    result(null, resp.data);
  } else if (resp.status == "error") {
    const err = resp.message;
    const respError = await Model.error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    result(Error, null);
  }
};
/*-----------updateTax------------------------------ends here--------------------*/
//
/*-----------checkTaxAlready------------------------------starts here--------------------*/
Tax.checkTaxAlready = async (data, result) => {
  const taxname = data.tax_name;
  const country = data.country;
  let sql_query_payload = {
    sql_script:
      `SELECT id from ${table_tax} WHERE tax_name=` +
      "'" +
      taxname +
      "'" +
      ` AND country=${country} AND trash = 0`,
    method: "get",
  };
  const respSql = await Model.sql_query(sql_query_payload);
  if (respSql.status == "success") {
    const Error = {
      status: "error",
      message: "Tax Already Exists",
      statusCode: 400,
    };
    result(Error, null); //as same exist so error
  } else if (respSql.status == "error") {
    const err = respSql.message;
    if (err == "NO_DATA") {
      result(null, "itsnewtax"); //as no same exists so its fine
    } else {
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
/*-----------checkTaxAlready------------------------------ends here--------------------*/
//
/*-----------checkTaxAlreadyUpdate------------------------------starts here--------------------*/
Tax.checkTaxAlreadyUpdate = async (data, result) => {
  const taxname = data.save_data.tax_name;
  // const country = data.save_data.country;
  const taxId = data.tax_id;
  let sql_query_payload = {
    sql_script:
      `SELECT id from ${table_tax} WHERE tax_name=` +
      "'" +
      taxname +
      "'" +
      `  AND id !=${taxId} AND trash = 0`,
    method: "get",
    //   `SELECT id from ${table_tax} WHERE tax_name=` +
    //   "'" +
    //   taxname +
    //   "'" +
    //   ` AND country=${country} AND id !=${taxId} AND trash = 0`,
    // method: "get",
  };
  const respSql = await Model.sql_query(sql_query_payload);
  if (respSql.status == "success") {
    const Error = {
      status: "error",
      message: "Tax Already Exists",
      statusCode: 400,
    };
    result(Error, null); //as same exist so error
  } else if (respSql.status == "error") {
    const err = respSql.message;
    if (err == "NO_DATA") {
      result(null, "itsnewtax"); //as no same exists so its fine
    } else {
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
/*-----------checkTaxAlreadyUpdate------------------------------ends here--------------------*/
//
module.exports = Tax;
//--------------------------------------------------------------------------------------------------
