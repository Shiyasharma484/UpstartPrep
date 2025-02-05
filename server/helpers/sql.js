const con = require("../models/db");
var SQL = function () {};
let tolist = (packetData) =>
  Object.values(JSON.parse(JSON.stringify(packetData)));

/*********Updated Query ******************************************** */

SQL.addData = async (tablename, data) => {
  var sqlquery = `INSERT INTO ` + tablename + ` SET ?`;
  console.log(sqlquery);
  console.log(data, "data_***********__________");
  return new Promise((resolve, reject) => {
    try {
      const sql = con.query(sqlquery, [data], (error, result) => {
        // console.log(sql, "*******************_)))))))))))))))))");
        if (error) {
          console.error('Error executing SQL query:', error);
          // Handle the error gracefully
          resolve({ error: 'An error occurred while executing the SQL query.' });
        } else {
          resolve(result.insertId);
        }
      });
    } catch (error) {
      console.error('Error executing SQL query:', error);
      // Handle the error gracefully
      resolve({ error: 'An error occurred while executing the SQL query.' });

    }
  });
};
SQL.deleteById = async (tablename, id) => {
  var sqlquery = `DELETE from` + tablename + ` WHERE id=` + id;
  console.log(sqlquery);
  console.log(data, "data_***********__________");
  return new Promise((resolve, reject) => {
    try {
      const sql = con.query(sqlquery, (error, result) => {
        // console.log(sql, "*******************_)))))))))))))))))");
        if (error) {
          console.error('Error executing SQL query:', error);
          // Handle the error gracefully
          resolve({ error: 'An error occurred while executing the SQL query.' });
        } else {
          resolve(result.insertId);
        }
      });
    } catch (error) {
      console.error('Error executing SQL query:', error);
      // Handle the error gracefully
      resolve({ error: 'An error occurred while executing the SQL query.' });

    }
  });
};

// function sanitize(string) {
//   return string.replace("'", "/'");
//   // return string.split(search).join(replace);
// }

SQL.Updatedata = async (tablename, data = {}, ifwhere = null) => {
  var sqlquery = "UPDATE " + tablename + " SET ?";
  var Where = "";

  if (ifwhere != null) {
    var keys = Object.keys(ifwhere);

    keys.forEach((eachkey) => {
      Where += eachkey + "='" + ifwhere[eachkey] + "' AND ";
    });
    Where = Where.substring(0, Where.length - 5);
    Where = " WHERE " + Where;
  }
  console.log(sqlquery + Where);
  return new Promise((resolve, reject) => {
    const sql = con.query(sqlquery + Where, data, (error, result) => {
      if (error) {
        console.error('Error executing SQL query:', error);
        // Handle the error gracefully
        resolve({ error: 'An error occurred while executing the SQL query.' });
      } else {
        console.log(sql);
        resolve(tolist(result));
      }
    });
  });
};

/* (tablename, [], ifwhere = null) */
SQL.gettabledata = async (
  tablename,
  select = [],
  ifwhere = null,
  limit = null
) => {
  var select_values = "*";
  var ID = "id";

  var LIMIT = "";
  if (select.length > 0) {
    select_values = select.toString();
  }
  var sqlquery = "SELECT " + select_values + " FROM " + tablename;
  var Where = "";
  if (limit != null) {
    LIMIT = "LIMIT " + limit;
  }
  if (ifwhere != null) {
    var keys = Object.keys(ifwhere);

    keys.forEach((eachkey) => {
      Where += eachkey + "='" + ifwhere[eachkey] + "' AND ";
    });
    Where = Where.substring(0, Where.length - 5);
    Where = " WHERE " + Where;
    console.log(Where);
  }
  var orderId = " ORDER BY " + ID + " DESC";
  console.log(sqlquery + Where + LIMIT);
  return new Promise((resolve, reject) => {
    try {
      const sql = con.query(
        sqlquery + Where + LIMIT + orderId,
        (error, result) => {
          if (error) {
            console.error('Error executing SQL query:', error);
            // Handle the error gracefully
            resolve({ error: 'An error occurred while executing the SQL query.' });
          } else {
            resolve(tolist(result));
          }
        }
      );
    } catch (error) {
      console.error('Error executing SQL query:', error);
      // Handle the error gracefully
      resolve({ error: 'An error occurred while executing the SQL query.' });

    }
  });
};

SQL.findintabledata = async (
  tablename,
  select = [],
  ifwhere = null,
  limit = null,
  findin = null
) => {
  var select_values = "*";
  var LIMIT = "";
  if (select.length > 0) {
    select_values = select.toString();
  }
  var sqlquery = "SELECT " + select_values + " FROM " + tablename;
  var Where = "";
  if (limit != null) {
    LIMIT = "LIMIT " + limit;
  }
  if (ifwhere != null) {
    var keys = Object.keys(ifwhere);

    keys.forEach((eachkey) => {
      if (findin.find((element) => element == eachkey)) {
        Where += eachkey + " IN (" + ifwhere[eachkey] + ") AND ";
      } else {
        Where += eachkey + "='" + ifwhere[eachkey] + "' AND ";
      }
    });
    Where = Where.substring(0, Where.length - 5);
    Where = " WHERE " + Where;
    console.log(Where);
  }
  console.log(sqlquery + Where + LIMIT);
  return new Promise((resolve, reject) => {
    const sql = con.query(sqlquery + Where + LIMIT, (error, result) => {
      if (error) {
        console.error('Error executing SQL query:', error);
        // Handle the error gracefully
        resolve({ error: 'An error occurred while executing the SQL query.' });
      } else {
        resolve(tolist(result));
      }
    });
  });
};

SQL.count = async (tablename, ifwhere = null, notin = null) => {
  var sqlquery = "SELECT COUNT(*)  as count FROM " + tablename;
  var Where = "";

  if (ifwhere != null) {
    var keys = Object.keys(ifwhere);

    keys.forEach((eachkey) => {
      Where += eachkey + "='" + ifwhere[eachkey] + "' AND ";
    });
    if (notin != null) {
      var norkeys = Object.keys(notin);
      norkeys.forEach((each_key) => {
        Where += each_key + "!='" + notin[each_key] + "' AND ";
      });
    }
    Where = Where.substring(0, Where.length - 5);
    Where = " WHERE " + Where;
    console.log(Where);
  }
  console.log(sqlquery + Where);
  return new Promise((resolve, reject) => {
    try {
      const sql = con.query(sqlquery + Where, (error, result) => {
        if (error) {
          console.error('Error executing SQL query:', error);
          // Handle the error gracefully
          resolve({ error: 'An error occurred while executing the SQL query.' });
        } else {
          var c = tolist(result);
          resolve(c[0].count);
        }
      });
    } catch (error) {
      console.error('Error executing SQL query:', error);
      // Handle the error gracefully
      resolve({ error: 'An error occurred while executing the SQL query.' });

    }
  });
};

SQL.search = async (
  search,
  tablename,
  select = [],
  ifwhere = [],
  limit = null
) => {
  var select_values = "*";
  var LIMIT = "";
  if (select.length > 0) {
    select_values = select.toString();
  }
  var sqlquery = "SELECT " + select_values + " FROM " + tablename;
  var Where = "";
  if (limit != null) {
    LIMIT = " LIMIT " + limit;
  }
  if (ifwhere != null) {
    ifwhere.forEach((eachkey) => {
      Where += eachkey + " LIKE '%" + search + "%' OR ";
    });
    Where = Where.substring(0, Where.length - 4);
    Where = " WHERE " + Where;
    console.log(Where);
  }
  console.log(sqlquery + Where + LIMIT);
  return new Promise((resolve, reject) => {
    try {
      const sql = con.query(sqlquery + Where + LIMIT, (error, result) => {
        if (error) {
          console.error('Error executing SQL query:', error);
          // Handle the error gracefully
          resolve({ error: 'An error occurred while executing the SQL query.' });
        } else {
          resolve(tolist(result));
        }
      });
    } catch (error) {
      console.error('Error executing SQL query:', error);
      resolve({ error: 'An error occurred while executing the SQL query.' });

    }
  });
};

SQL.query = async (sqlquery) => {
  return new Promise((resolve, reject) => {
    console.log(sqlquery); // Log the SQL query for debugging purposes
    const sql = con.query(sqlquery, (error, result) => {
      if (error) {
        console.error('Error executing SQL query:', error);
        // Handle the error gracefully
        resolve({ error: 'An error occurred while executing the SQL query.' });
      } else {
        resolve(tolist(result)); // Resolve with the query results
      }
    });
  });
};

SQL.global = async (GlobalName) => {
  var sqlquery =
    "SELECT variable_value FROM global_variables WHERE variable_name='" +
    GlobalName +
    "'";

  return new Promise((resolve, reject) => {
    try {
      const sql = con.query(sqlquery, (error, result) => {
        if (error) {
          console.error('Error executing SQL query:', error);
          // Handle the error gracefully
          resolve({ error: 'An error occurred while executing the SQL query.' });
        } else {
          resolve(tolist(result[0].variable_value));
        }
      });
    } catch (error) {
      console.error('Error executing SQL query:', error);
      // Handle the error gracefully
      resolve({ error: 'An error occurred while executing the SQL query.' });

    }
  });
};

SQL.toArr = async (str) => {
  var arr = str.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
  return arr;
};

SQL.createLargeData = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      var insert_data = con.query(
        "INSERT INTO events SET ?",
        [data],
        (err, result) => {
          var LastID = result.insertId;
          if (err) {
            console.error('Error executing SQL query:', error);
            // Handle the error gracefully
            resolve({ error: 'An error occurred while executing the SQL query.' });z
          }
          resolve(LastID);
        }
      );
    } catch (error) {
      console.error('Error executing SQL query:', error);
      // Handle the error gracefully
      resolve({ error: 'An error occurred while executing the SQL query.' });

    }
  });
};

//-----------------------------------------------------------------
module.exports = SQL;
