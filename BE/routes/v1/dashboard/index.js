const express = require('express');
const router = express.Router();
const dashboardController = require("../../../controller/v1/dashboard")
router.get('/', dashboardController.countryMap);
module.exports = router;