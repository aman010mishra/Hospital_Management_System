const express = require("express");
const router = express.Router();
const hospitalController = require("../controllers/hospitalController");

router.post("/create", hospitalController.createHospital);
router.get("/", hospitalController.getHospitalsByCity);
router.delete("/delete", hospitalController.deleteHospital);
router.put("/update", hospitalController.updateHospital);
router.post("/details", hospitalController.addHospitalDetails);

module.exports = router;
