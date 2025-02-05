const SQL = require("./helpers/sql");
var moment = require("moment");
const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES; //8000

const table_name = "users";
const ValidateToken = async (req, res, next) => {
  if (req.headers.token == undefined) {
    console.log("No Access Token");
    const Error = {
      error: "Url Forbidden!",
    };
    return res.status(403).json(Error);
  }
  const auth_token = req.headers.token;
  const access_token_data = await SQL.gettabledata(table_name, [], {
    access_token: auth_token,
  });
  console.log(access_token_data);
  if (access_token_data.length < 1) {
    console.log("No Access Token");
    const Error = {
      error: "Url Forbidden!",
    };
    return res.status(403).json(Error);
  } else {
    var rv = {};
    const new_data = Object.entries(req.body).map(([key, value]) => ({
      key,
      value,
    })); // to make array
    var newArray = new_data.filter(function (el) {
      return el.value != ""; // remove null values
    });
    newArray.forEach(async (items) => {
      rv[items.key] = items.value;
    });
    req.body = rv;

    req.headers.user = access_token_data[0];
    next();
  }
  //STEP-1 -------------------------------CHECK ACCESS TOKEN THERE OR NOT-------------------ends
};

module.exports = { ValidateToken };
//--------------------------------------------------------------------------------------------
