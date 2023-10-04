const express = require("express");
const router = express.Router();
router.use("/oosAlert", require('./oosAlert'));
router.use("/picos", require('./picos'));
module.exports = router;