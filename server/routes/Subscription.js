const express = require("express");
const router = express.Router();
const controller = require("../controllers/subscriptionController");

router.post("/", controller.createSubscription);
router.post("/pay", controller.paySubscription);
router.post("/course", controller.payCourseSubscription);
router.get("/:id", controller.getSubscription);
router.get("/get/all", controller.getAllSubscription);
router.put("/cancel/:id", controller.cancelSubscriptionByID);

router.put("/:id", controller.updateSubscription);
router.delete("/:id", controller.DeleteById);

router.post("/plan", controller.createSubscriptionPlan);
router.get("/plan/:id", controller.getSubscriptionPlan);
router.get("/category/:id", controller.getSubscriptionPlanByCategoryID);
router.get("/plan/get/all", controller.getAllSubscriptionPlan);
router.get("/plan/active/all", controller.getAllActiveSubscriptionPlan);
router.put("/plan/:id", controller.updateSubscriptionPlan);
router.delete("/plan/:id", controller.DeletePlanById);

module.exports = router;
