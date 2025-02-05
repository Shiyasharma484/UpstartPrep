const con = require("./db");
const Model = require("../helpers/instructions");
const table_country = "countries";
const table_states = "states";
const table_city = "cities";
// Plan object constructor
var Country = function () {};
//
/*-----------fetchCountry------------------------------starts here--------------------*/
Country.fetchCountry = async (countryId, result) => {
  let sql_query_payload = {
    sql_script: `SELECT id, full_name, capital, currency, timezones, iso2,iso3, numeric_code, phonecode, emoji as flag,region FROM ${table_country} WHERE id=${countryId}`,
    method: "get",
  };
  const respCountry = await Model.sql_query(sql_query_payload);
  if (respCountry.status == "success") {
    result(null, respCountry.data);
  } else if (respCountry.status == "error") {
    const err = respCountry.message;
    const respError = await Model.error_query(err);
    const Error = {
      status: "error",
      message: respError.message,
      statusCode: respError.statusCode,
    };
    result(Error, null);
  }
};
/*-----------fetchCountry------------------------------ends here--------------------*/
//
/*-----------fetchCountries------------------------------starts here--------------------*/
Country.fetchCountries = async (result) => {
  let sql_query_payload = {
    sql_script: `SELECT id, full_name, capital, currency, timezones, iso2,iso3, numeric_code, phonecode, emoji as flag,region FROM ${table_country}`,
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
/*-----------fetchCountries------------------------------ends here--------------------*/
//
/*-----------fetchStatesByCountry------------------------------starts here--------------------*/
Country.fetchStatesByCountry = async (countryId, result) => {
  let sql_query_payload = {
    sql_script: `SELECT id, country_id, country_code, iso2, name, fips_code FROM ${table_states} WHERE country_id=${countryId}`,
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
/*-----------fetchStatesByCountry------------------------------ends here--------------------*/
//
/*-----------fetchCitiesByState------------------------------starts here--------------------*/
Country.fetchCitiesByState = async (stateId, result) => {
  let sql_query_payload = {
    sql_script: `SELECT c.id, c.name, c.state_id, s.name as state_name, c.country_id, co.full_name  as country_name, c.latitude, c.longitude FROM ${table_city} as c LEFT JOIN ${table_states} as s ON s.id=c.state_id LEFT JOIN ${table_country} as co ON co.id=c.country_id WHERE c.state_id=${stateId} `,
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
/*-----------fetchCitiesByState------------------------------ends here--------------------*/
//

module.exports = Country;
