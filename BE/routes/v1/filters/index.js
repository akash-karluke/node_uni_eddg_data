const express = require("express");
const router = express.Router();
router.use("/action", require("./action"))
module.exports = router;
