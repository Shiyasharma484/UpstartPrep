const express = require("express");
const router = express.Router();
const controller = require("../controllers/pinsController");
// const { GenuineToken } = require("../ApiMiddleware");

router.post("/", controller.Create);
router.get("/pinterestpins/:id", controller.GetById); //dynamic
router.get("/pinterestpins/", controller.GetAllPinterestPins); //dynamic

router.get("/board/:board_id", controller.GetByBoardId);

router.put("/:id", controller.UpdateById);

router.delete("/:id", controller.DeleteById);

router.delete("/userpins/:id", controller.DeleteByUserId);
router.put("/userpins/:id", controller.UpdateByUserId);

router.post("/publish/", controller.PublishPins);
router.post("/generatediscription/", controller.GenerateDescription);
// router.post("/accesstoken", GenuineToken, ctrl.CodeAuthToken); //receive code and hit api to get access_token, refresh_token
// router.get("/auth/url", GenuineToken, ctrl.AuthUrl); //check from access token Insta credentials and post auth url in response
router.get("/userpins/:id", controller.GetAllPins);
module.exports = router;
