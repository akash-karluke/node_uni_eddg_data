const express = require("express");
const router = express.Router();
router.use(
    "/user",
    // #swagger.tags = ["User"]
    require("./user")
);
router.use(
    "/dashboard",
    // #swagger.tags = ["Dashboard"]
    require("./dashboard")
);
router.use(
    "/action",
    // #swagger.tags = ["Actions"]
    require("./action")
);
router.use(
    "/powerBI",
    // #swagger.tags = ["DeepDive"]
    require("./powerBI")
);
router.use(
    "/filter",
    // #swagger.tags = ["Filters"]
    require("./filters")
);
module.exports = router
