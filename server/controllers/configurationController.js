const Configuration = require("../models/configuration");
const { decodetheid, validation } = require("../helpers/common");
const SQL = require("../helpers/sql");
//----------------------------------------------------------------------------------------------------------------
/*-----------Configurations------------------------------starts here--------------------*/
exports.Configurations = async (req, res) => {
  var configurationId;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id > 0) {
    configurationId = req.params.id;
    try {
      const configuration_data = await fetch_single_configuration(
        configurationId
      );
      try {
        const configuration_data_final = await configuration_data_modify(
          configuration_data
        );
        g_response["status"] = "success";
        g_response["responsedata"] = {
          configurations: configuration_data_final,
        };
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
    res.status(g_status_code).json(g_response);
  } else if (req.params && Object.keys(req.params).length == 0) {
    try {
      const configuration_data = await fetch_configurations();
      try {
        const configuration_data_final = await configuration_data_modify(
          configuration_data
        );
        g_response["status"] = "success";
        g_response["responsedata"] = {
          configurations: configuration_data_final,
        };
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
    res.status(g_status_code).json(g_response);
  } else {
    const Error = { status: "error", message: "Invalid Details" };
    res.status(400).json(Error);
  }
};
/*-----------Configurations------------------------------ends here--------------------*/
//
/*-----------Delete---------------------------starts here--------------------*/
exports.Delete = async (req, res) => {
  var configurationId;
  var g_response = {};
  var g_status_code;
  if (req.params.id && req.params.id > 0) {
    configurationId = req.params.id;
    try {
      const configuration_delete_data = await delete_configuration(
        configurationId
      );
      g_response["status"] = "success";
      g_response["message"] = configuration_delete_data;
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
/*-----------Delete---------------------------ends here--------------------*/
//
/*-----------Create---------------------------starts here--------------------*/
exports.Create = async (req, res) => {
  var g_response = {};
  var g_status_code;
  const data = req.body;
  console.log(data);
  try {
    const validate_data = await check_valid_data(data);
    try {
      const sorted_configuration_data = await create_configuration_data_sort(
        data
      );
      try {
        const configuration_data_resp = await create_configuration(
          sorted_configuration_data
        );
        try {
          const configuration_data = await fetch_configurations();
          g_response["status"] = "success";
          g_response["responsedata"] = { configurations: configuration_data };
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
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = "Invalid Data";
    g_status_code = 400;
  }
  res.status(g_status_code).json(g_response);
};
/*-----------Create---------------------------ends here--------------------*/
//
/*-----------Update---------------------------starts here--------------------*/
exports.Update = async (req, res) => {
  const data = req.body;
  var g_response = {};
  var g_status_code;
  try {
    const check_data = await check_valid_data(data);
    try {
      const configuration_data_db = await fetch_configurations();
      try {
        const sorted_configuration_data = await update_configuration_data_sort(
          data,
          configuration_data_db
        );
        const insertData = sorted_configuration_data.arrNew;
        //console.log(insertData);
        const updateData = sorted_configuration_data.arrUpdate;
        //console.log(updateData);
        if (insertData.length > 0) {
          //CASE-1 Step-1-------------------------------------------------------------------
          try {
            const create_configuration_data_resp = await create_configuration(
              insertData
            );
            if (updateData.length > 0) {
              //CASE-1 Step-2-------------------------------------------------------------------
              try {
                const update_configuration_data_resp =
                  await update_configuration(updateData);
                //CASE-1 Step-3-------------------------------------------------------------------
                try {
                  const fetch_configuration_data = await fetch_configurations();
                  try {
                    const configuration_data_final =
                      await configuration_data_modify(fetch_configuration_data);
                    g_response["status"] = "success";
                    g_response["responsedata"] = {
                      configurations: configuration_data_final,
                    };
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
            } else {
              console.log("Nothing to update");
              try {
                const fetch_configuration_data = await fetch_configurations();
                try {
                  const configuration_data_final =
                    await configuration_data_modify(fetch_configuration_data);
                  g_response["status"] = "success";
                  g_response["responsedata"] = {
                    configurations: configuration_data_final,
                  };
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
            }
          } catch (err) {
            g_response["status"] = "error";
            g_response["message"] = err.message;
            g_status_code = err.statusCode;
          }
        } else {
          console.log("Nothing to Insert");
          if (updateData.length > 0) {
            //CASE-2 Step-1-------------------------------------------------------------------
            try {
              const update_configuration_data_resp = await update_configuration(
                updateData
              );
              //CASE-2 Step-2-------------------------------------------------------------------
              try {
                const fetch_configuration_data = await fetch_configurations();
                try {
                  const configuration_data_final =
                    await configuration_data_modify(fetch_configuration_data);
                  g_response["status"] = "success";
                  g_response["responsedata"] = {
                    configurations: configuration_data_final,
                  };
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
          } else {
            console.log("Nothing to insert or update");
            g_response["status"] = "error";
            g_response["message"] = "Invalid Details";
            g_status_code = 400;
          }
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
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = "Invalid Details";
    g_status_code = 400;
  }
  res.status(g_status_code).json(g_response);
};
/*-----------Update---------------------------ends here--------------------*/
//
//----FUNCTIONS----------------------------------------------------------STARTS
const fetch_single_configuration = (configurationId) => {
  return new Promise((resolve, reject) => {
    Configuration.fetchConfiguration(configurationId, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const fetch_configurations = () => {
  return new Promise((resolve, reject) => {
    Configuration.fetchConfigurations((err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const delete_configuration = (configurationId) => {
  return new Promise((resolve, reject) => {
    Configuration.deleteConfiguration(configurationId, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const check_valid_data = (data) => {
  return new Promise((resolve, reject) => {
    if (data && Object.keys(data).length != 0) {
      resolve();
    } else {
      reject();
    }
  });
};
const create_configuration_data_sort = (data) => {
  return new Promise((resolve, reject) => {
    // { abc: 'def', def: 'ghi', ghi: 22222 }
    var kk = Object.keys(data); //array of keys
    //["colour","size","material"],
    var vv = Object.values(data); //arrays of values
    //[["red","green"],["L","XL"],["rayon"]]
    var arr = [];
    for (let i = 0; i < kk.length; i++) {
      [arr.push([kk[i], vv[i]])];
    }
    //console.log(arr);
    resolve(arr);
  });
};
const create_configuration = (data) => {
  return new Promise((resolve, reject) => {
    Configuration.createConfiguration(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
const update_configuration_data_sort = (reqData, configuration_data_db) => {
  return new Promise((resolve, reject) => {
    //console.log(configuration_data_db);
    // [
    //   { id: 80, config_key: 'contact_person' },
    //   { id: 81, config_key: 'currency' }
    // ]
    var arrUpdate = [];
    var arrNew = [];

    let filteredData = Object.fromEntries(
      Object.entries(reqData).filter(
        ([_, v]) => v != "null" && v != "" && v != null
      )
    );
    //now we have to filter data acc to config keys from configuration table---starts++++++++++++++++++++
    // { abc: 'def', def: 'ghi', ghi: 22222 }
    var kk = Object.keys(filteredData); //array of keys
    //["colour","size","material"],
    var vv = Object.values(filteredData); //arrays of values
    //[["red","green"],["L","XL"],["rayon"]]
    for (let i = 0; i < kk.length; i++) {
      configuration_data_db.map((item) => {
        const a = kk[i];
        const b = item.config_key;
        if (typeof a === "string" || a instanceof String) {
          a.toLowerCase();
        }
        if (typeof b === "string" || b instanceof String) {
          b.toLowerCase();
        }
        if (a == b) {
          //  console.log("Exists");
          [arrUpdate.push([item.id, kk[i], vv[i].toString()])];
          delete kk[i];
          delete vv[i];
        }
      });
    }
    // console.log(arrUpdate); //wd update date
    //NOw del empty elements from key, value arrays and make newdata array--starts
    // console.log(kk);
    const newKK = kk.filter((a) => a);
    // console.log(newKK);
    //
    // console.log(vv);
    const newVV = vv.filter((a) => a);
    // console.log(newVV);
    //
    // var arrNew = [];
    for (let i = 0; i < newKK.length; i++) {
      [arrNew.push([newKK[i], newVV[i].toString()])];
    }
    //console.log(arrNew); //wd new data to be inserted into table
    //NOw del empty elements from key, value arrays and make newdata array--ends
    //now we have to filter data acc to config keys from configuration table---ends++++++++++++++++++++
    const output = {
      arrNew: arrNew,
      arrUpdate: arrUpdate,
    };
    resolve(output);
  });
};
const update_configuration = (data) => {
  return new Promise((resolve, reject) => {
    Configuration.updateConfiguration(data, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

exports.UpdateBykey = async (req, res) => {
  const validationRule = {
    schedule_interval: "string",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;
  try {
    const validate_data = await validation(data, validationRule);
    const create__response = await SQL.Updatedata("configuration", data, {
      config_key: data.config_key,
    });

    g_response["status"] = "success";
    g_response["message"] = `Configuration Updated Successfully`;
    g_status_code = 201;
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }

  res.status(g_status_code).json(g_response);
};

const update_bykey = (data) => {
  return new Promise((resolve, reject) => {
    Configuration.update(data, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const configuration_data_modify = (data) => {
  return new Promise((resolve, reject) => {
    try {
      var arr = [];
      var obj = {};
      data.map((item) => {
        const config_key = item.config_key;
        const config_value = item.config_value;
        obj[config_key] = config_value;
      });
      arr.push(obj);
      resolve(arr);
    } catch (err) {
      const Error = {
        status: "error",
        message: "Server Error",
        statusCode: 400,
      };
      resolve(Error);
    }
  });
};

//----FUNCTIONS----------------------------------------------------------ENDS
