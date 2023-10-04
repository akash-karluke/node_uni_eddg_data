const express = require('express');
const router = express.Router();
const userController = require("../../../controller/v1/user")
router.get('/', userController.user);
module.exports = router;