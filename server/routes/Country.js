const express = require("express");
const router = express.Router();
const countryCtrl = require("../controllers/countryController");
//
router.get("/:id", countryCtrl.Countries); //country by id
router.get("/", countryCtrl.Countries); //all countries
router.get("/:id/state", countryCtrl.States); //all states by country id
router.get("/state/:id/city", countryCtrl.Cities); //All Cities ByStateId

module.exports = router;
