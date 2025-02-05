const express = require("express");
const router = express.Router();
const taxCtrl = require("../controllers/taxesController");
//
router.get("/", taxCtrl.Taxes); //GetAllTaxes
router.get("/:id", taxCtrl.Taxes); //GetSingleTaxById
router.get("/country/:id", taxCtrl.CountryTaxes); //GetAllTaxesByCountry
//
router.delete("/trash/:id", taxCtrl.TrashTax);
router.delete("/:id", taxCtrl.DeleteTax);
//
router.post("/", taxCtrl.CreateTax);
router.put("/:id", taxCtrl.UpdateTax);

module.exports = router;
