const express = require("express");
const router = express.Router();
const powerBIController = require("../../../controller/v1/powerBI")
router.get("/accessToken/:page", powerBIController.getPowerBIAccessToken);
module.exports = router;
