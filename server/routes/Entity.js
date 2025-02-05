const express = require("express");
const router = express.Router();
const Controller = require("../controllers/entityController");

router.post("/", Controller.CreateEntity); //Done

router.get("/:id", Controller.GetAllEntities);
router.get("/all", Controller.GetAllEntities);
router.get("/parent/:parent_id", Controller.GetEntityByParentId);

router.put("/:id", Controller.UpdateById);
router.delete("/:id", Controller.DeleteById);

module.exports = router;
