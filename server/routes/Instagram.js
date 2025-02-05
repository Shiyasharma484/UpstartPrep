const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/instagramController");
const { GenuineToken } = require("../ApiMiddleware");
//
//posts----------------------------starts-----------------------------------
router.get("/user/:id", ctrl.ConnectsByUserId);
//
router.delete("/trash/:id", ctrl.TrashConnect);
router.delete("/:id", ctrl.DeleteConnect);
//
router.put("/:id", ctrl.UpdateConnect);
//Oauth 2.0 --------------------------------------------STARTS
router.post("/", ctrl.CreateConnect); //insert and give data plus auth_url
router.post("/accesstoken", GenuineToken, ctrl.CodeAuthToken); //receive code and hit api to get access_token, refresh_token
router.get("/auth/url", GenuineToken, ctrl.AuthUrl); //check from access token Insta credentials and post auth url in response
router.post("/post", GenuineToken, ctrl.CreatePost);

//Oauth 2.0 --------------------------------------------STARTS
//posts++++++++++++++++++++++++ENDS+++++++++++++++++++++
//
module.exports = router;
