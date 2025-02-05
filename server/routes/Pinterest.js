const express = require("express");
const router = express.Router();
const controller = require("../controllers/pinterestController");
// const { GenuineToken } = require("../ApiMiddleware");

router.get("/auth/:id", controller.GetById);
router.get("/auth_url/", controller.GetAuthURL);
router.get("/access_token/:user_id", controller.access_token);
router.put("/access_token/", controller.update_access_token);
router.put("/auth/:id", controller.UpdateById);

module.exports = router;
