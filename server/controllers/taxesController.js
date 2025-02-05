const Tax = require("../models/tax");
const {
  encrypttheid,
  decodetheid,
  generateVerificationCodePF,
} = require("../helpers/encode-decode");
//-------------------------------------------------------------------------------------------------------------
//
/*-----------Taxes------------------------------starts here--------------------*/
exports.Taxes = async (req, res) => {
  var taxId;
  var g_response = {};
  var g_status_code;
  //CASE -1 -------------------------------------------GET BY ID
  if (req.params.id && req.params.id > 0) {
    taxId = req.params.id;
    try {
      const tax_data = await fetch_single_tax(taxId);
      g_response["status"] = "success";
      g_response["responsedata"] = { taxes: tax_data };
      g_status_code = 200;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = err.statusCode;
    }
    res.status(g_status_code).json(g_response);
  }
  //CASE -2 -------------------------------------------GET ALL
  else if (req.params && Object.keys(req.params).length == 0) {
    try {
      const tax_data = await fetch_taxes();
      g_response["status"] = "success";
      g_response["responsedata"] = { taxes: tax_data };
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
/*-----------Taxes------------------------------ends here--------------------*/
//
/*-----------CountryTaxes------------------------------starts here--------------------*/
exports.CountryTaxes = async (req, res) => {
  var countryId;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id > 0) {
    countryId = req.params.id;
    try {
      const tax_data = await fetch_country_taxes(countryId);
      g_response["status"] = "success";
      g_response["responsedata"] = { taxes: tax_data };
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
/*-----------CountryTaxes------------------------------ends here--------------------*/
//
/*-----------DeleteTax---------------------------starts here--------------------*/
exports.DeleteTax = async (req, res) => {
  var taxId;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id > 0) {
    taxId = req.params.id;
    try {
      const tax_delete_data = await delete_tax(taxId);
      g_response["status"] = "success";
      g_response["message"] = tax_delete_data;
      g_status_code = 201;
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
/*-----------DeleteTax---------------------------ends here--------------------*/
//
/*-----------TrashTax---------------------------starts here--------------------*/
exports.TrashTax = async (req, res) => {
  var taxId;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id > 0) {
    taxId = req.params.id;
    try {
      const tax_trash_data = await trash_tax(taxId);
      g_response["status"] = "success";
      g_response["message"] = tax_trash_data;
      g_status_code = 201;
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
/*-----------TrashTax---------------------------ends here--------------------*/
//
/*-----------CreateTax---------------------------starts here--------------------*/
exports.CreateTax = async (req, res) => {
  var g_response = {};
  var g_status_code;
  const data = req.body;
  try {
    const validate_data = await check_valid_data_create_tax(data);
    try {
      const check_already_data = await check_tax_already(validate_data);
      try {
        const tax_data_resp = await create_tax(validate_data);
        g_response["status"] = "success";
        g_response["responsedata"] = "Tax Created Successfully";
        g_status_code = 201;
      } catch (err) {
        g_response["status"] = "error";
        g_response["message"] = err.message;
        g_status_code = err.statusCode;
      }
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = err.statusCode;
    }
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = err.statusCode;
  }
  res.status(g_status_code).json(g_response);
};
/*-----------CreateTax---------------------------ends here--------------------*/
//
/*-----------UpdateTax---------------------------starts here--------------------*/
exports.UpdateTax = async (req, res) => {
  const data = req.body;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id.length > 0) {
    const taxIDEncrypted = req.params.id;
    try {
      const taxId = await decode_the_id(taxIDEncrypted);
      try {
        const validate_data = await check_valid_data_tax_update(data);
        try {
          const saveData = {};
          saveData["tax_id"] = taxId;
          saveData["save_data"] = validate_data;
          const check_already_data = await check_tax_already_update(saveData);
          try {
            const update_tax_data_resp = await update_tax(saveData);
            g_response["status"] = "success";
            g_response["message"] = "Tax Updated Successfully";
            g_status_code = 200;
          } catch (err) {
            g_response["status"] = "error";
            g_response["message"] = err.message;
            g_status_code = err.statusCode;
          }
        } catch (err) {
          g_response["status"] = "error";
          g_response["message"] = err.message;
          g_status_code = err.statusCode;
        }
      } catch (err) {
        g_response["status"] = "error";
        g_response["message"] = "Invalid Details";
        g_status_code = 400;
      }
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
/*-----------UpdateTax---------------------------ends here--------------------*/
//
//----FUNCTIONS----------------------------------------------------------STARTS
const fetch_single_tax = (id) => {
  return new Promise((resolve, reject) => {
    Tax.fetchTax(id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const fetch_taxes = () => {
  return new Promise((resolve, reject) => {
    Tax.fetchTaxes((err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const fetch_country_taxes = (id) => {
  return new Promise((resolve, reject) => {
    Tax.fetchCountryTaxes(id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const trash_tax = (id) => {
  return new Promise((resolve, reject) => {
    Tax.trashTax(id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const delete_tax = (id) => {
  return new Promise((resolve, reject) => {
    Tax.deleteTax(id, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const check_valid_data_create_tax = (data) => {
  return new Promise((resolve, reject) => {
    if (
      data.tax_name &&
      data.tax_name.length > 0 &&
      data.tax_value &&
      data.tax_value > 0 &&
      data.country &&
      data.country > 0
    ) {
      let filteredData = Object.fromEntries(
        Object.entries(data).filter(
          ([_, v]) => v != "null" && v != "" && v != null
        )
      );
      if (
        filteredData &&
        filteredData !== undefined &&
        Object.keys(filteredData).length != 0
      ) {
        if ("active" in data === true) {
          filteredData["active"] = data.active;
        }
        if ("trash" in data === true) {
          filteredData["trash"] = data.trash;
        }
        resolve(filteredData);
      } else {
        const Error = { statusCode: 400, message: "Invalid Details" };
        reject(Error);
      }
    } else {
      const Error = { statusCode: 400, message: "Invalid Details" };
      reject(Error);
    }
  });
};
const create_tax = (data) => {
  return new Promise((resolve, reject) => {
    Tax.createTax(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const decode_the_id = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const id = decodetheid(data);
      if (id && id > 0) {
        resolve(id);
      } else {
        const Error = {
          status: "error",
          message: "Invalid Details",
          statusCode: 400,
        };
        reject(Error);
      }
    } catch (err) {
      const Error = {
        status: "error",
        message: "Invalid Details",
        statusCode: 400,
      };
      reject(Error);
    }
  });
};
const check_valid_data_tax_update = (data) => {
  return new Promise((resolve, reject) => {
    if (
      data.tax_name &&
      data.tax_name.length > 0 &&
      data.tax_value &&
      data.tax_value > 0
      // data.country &&
      // data.country > 0
    ) {
      let filteredData = Object.fromEntries(
        Object.entries(data).filter(
          ([_, v]) => v != "null" && v != "" && v != null
        )
      );
      if (
        filteredData &&
        filteredData !== undefined &&
        Object.keys(filteredData).length != 0
      ) {
        if ("active" in data === true) {
          filteredData["active"] = data.active;
        }
        if ("trash" in data === true) {
          filteredData["trash"] = data.trash;
        }
        resolve(filteredData);
      } else {
        const Error = { statusCode: 400, message: "Invalid Details" };
        reject(Error);
      }
    } else {
      const Error = { statusCode: 400, message: "Invalid Details" };
      reject(Error);
    }
  });
};
const update_tax = (data) => {
  return new Promise((resolve, reject) => {
    Tax.updateTax(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const check_tax_already = (data) => {
  return new Promise((resolve, reject) => {
    Tax.checkTaxAlready(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const check_tax_already_update = (data) => {
  return new Promise((resolve, reject) => {
    Tax.checkTaxAlreadyUpdate(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
//----FUNCTIONS----------------------------------------------------------ENDS
