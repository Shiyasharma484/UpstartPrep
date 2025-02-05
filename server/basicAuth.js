const { sign, verify } = require("jsonwebtoken");
const con = require("./models/db");

//receive response in user variable and returning token
const createTokens = (user) => {
  global.userdataresponse = user;
  const accessToken = sign(
    { username: user.first_Name, id: user.id },
    "jwtsecretplschange" //secretORprivatekey
  );
  return accessToken;
};

//validate token
const validateToken = (req, res, next) => {
  // console.log(req);
  //console.log(req.headers.cookie);
  const cookiepresent = req.headers.cookie; //var to receive cookies to check cookie present or not in next if condition
  if (cookiepresent) {
    const cookiearray = cookiepresent.split(";"); //receiving cookie object and making it array
    //console.log(cookieobject);

    const splitcookiearray = cookiearray[0].split("="); //splitting cookie in array
    const accessToken = splitcookiearray[1]; //cookies value in accessToken of 1st position of array
    // console.log("*******************");
    // console.log(splitcookie);
    // console.log(accessToken);
    // console.log("*******************");

    if (!accessToken) {
      return res.status(400).json({ error: "User not Authenticated!" });
    }
    try {
      const validToken = verify(accessToken, "jwtsecretplschange");
      //console.log(validToken);
      if (validToken) {
        req.authenticated = true;
        return next();
      }
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  } else {
    return res.status(401).json({
      error: "Not Authorised to Vist This Link, Login First , No Cookie Found",
    });
  }
};

const validateRole = (req, res, next) => {
  console.log(userdataresponse);
  return next();
};

module.exports = { createTokens, validateToken, validateRole };
