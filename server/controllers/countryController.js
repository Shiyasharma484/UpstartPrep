const Country = require("../models/country");
const SQL = require("../helpers/sql");
//
/*-----------Countries------------------------------starts here--------------------*/
exports.Countries = async (req, res) => {
  var countryId;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id > 0) {
    countryId = req.params.id;
    try {
      const country_data = await fetch_single_country(countryId);
      g_response["status"] = "success";
      g_response["responsedata"] = { country: country_data };
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = err.statusCode;
    }
    res.status(g_status_code).json(g_response);
  } else if (req.params && Object.keys(req.params).length == 0) {
    try {
      const country_data = await fetch_countries();
      g_response["status"] = "success";
      g_response["responsedata"] = { countries: country_data };
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
/*-----------Countries------------------------------ends here--------------------*/
//
/*-----------States------------------------------starts here--------------------*/
exports.States = async (req, res) => {
  var countryId;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id > 0) {
    countryId = req.params.id;
    try {
      const state_data = await fetch_states_by_country(countryId);
      g_response["status"] = "success";
      g_response["responsedata"] = { states: state_data };
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
/*-----------States------------------------------ends here--------------------*/
//
/*-----------Cities------------------------------starts here--------------------*/
exports.Cities = async (req, res) => {
  console.log("Inside Get Cities by State ID");
  console.log(req.params);
  var stateId;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id > 0) {
    stateId = req.params.id;
    try {
      const cities_data = await fetch_cities_by_state(stateId);
      g_response["status"] = "success";
      g_response["responsedata"] = { cities: cities_data };
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
/*-----------Cities------------------------------ends here--------------------*/
//
//----FUNCTIONS----------------------------------------------------------STARTS
const fetch_single_country = (countryId) => {
  return new Promise((resolve, reject) => {
    Country.fetchCountry(countryId, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const fetch_countries = () => {
  return new Promise((resolve, reject) => {
    Country.fetchCountries((err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const fetch_states_by_country = (countryId) => {
  return new Promise((resolve, reject) => {
    Country.fetchStatesByCountry(countryId, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const fetch_cities_by_state = (countryId) => {
  return new Promise((resolve, reject) => {
    Country.fetchCitiesByState(countryId, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

//----FUNCTIONS----------------------------------------------------------ENDS
//-----------------------------------------------------------------------------------------------------------------
