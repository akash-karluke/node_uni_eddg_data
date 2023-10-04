const express = require("express");
const router = express.Router();
const actionFilter = require("../../../controller/v1/filters/action");
const { isNotNull } = require("../../../helper/utils/utils");
const { failedResposne } = require("../../../helper/utils/repsonse");
const validation = (req, res, next) => {
    const { Abbreviation, end_week } = req.body;
    if (!isNotNull(Abbreviation)) {
        return res.status(400).send(failedResposne("Country Abbreviation Required", req.originalUrl))
    }
    if (!isNotNull(end_week)) {
        return res.status(400).send(failedResposne("End Week Required", req.originalUrl))
    }
    next();
}
const weekValidation = (req, res, next) => {
    const { Abbreviation } = req.body;
    if (!isNotNull(Abbreviation)) {
        return res.status(400).send(failedResposne("Country Abbreviation Required", req.originalUrl))
    }
    next();
}
router.post("/", validation, actionFilter.filter);
router.post("/week", weekValidation, actionFilter.weekFilter);
module.exports = router;
