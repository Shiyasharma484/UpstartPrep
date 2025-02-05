const express = require("express");
const router = express.Router();
const controller = require("../controllers/scheduleController");
// const { GenuineToken } = require("../ApiMiddleware");

router.post("/", controller.Create);
router.get("/:id", controller.GetById);
router.get("/board/:board_id", controller.GetByBoardId);

router.put("/:id", controller.UpdateById);
router.get("/scheduler/run", controller.RunScheduler);
router.delete("/:id", controller.DeleteById);
// router.post("/accesstoken", GenuineToken, ctrl.CodeAuthToken); //receive code and hit api to get access_token, refresh_token
// router.get("/auth/url", GenuineToken, ctrl.AuthUrl); //check from access token Insta credentials and post auth url in response

module.exports = router;
