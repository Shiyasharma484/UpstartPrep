const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/globalController");
const { GenuineToken } = require("../ApiMiddleware");

router.get("/auth/url", GenuineToken, ctrl.AuthUrl); //check from access token credentials and post auth url in response

module.exports = router;
