const express = require("express");
const router = express.Router();
const controller = require("../controllers/boardsController");
// const { GenuineToken } = require("../ApiMiddleware");

router.post("/", controller.Create);
router.get("/id/:id", controller.GetById);
router.get("/userboards/all", controller.GetAll);

router.put("/:id", controller.UpdateById);
router.delete("/:id", controller.DeleteById);

// router.get("/csv", controller.csvread);
// router.get("/csv/xls", controller.readCSVxls);

// router.post("/accesstoken", GenuineToken, ctrl.CodeAuthToken); //receive code and hit api to get access_token, refresh_token
// router.get("/auth/url", GenuineToken, ctrl.AuthUrl); //check from access token Insta credentials and post auth url in response

module.exports = router;
