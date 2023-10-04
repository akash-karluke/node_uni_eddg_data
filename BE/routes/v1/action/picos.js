const express = require("express");
const router = express.Router();
const picosController = require("../../../controller/v1/action/picos");
const { picosTables } = require("../../../helper/utils/tables");
const { isNotNull } = require("../../../helper/utils/utils");
const { failedResposne } = require("../../../helper/utils/repsonse");
const validation = (req, res, next) => {
    const { Abbreviation } = req.body;
    if (!isNotNull(Abbreviation)) {
        return res.status(400).send(failedResposne("Country Abbreviation Required", req.originalUrl))
    }
    if (!Object.keys(picosTables).includes(Abbreviation)) {
        return res.status(400).send(failedResposne("Country Not Available", req.originalUrl))
    }
    next();
}


const picosValidation = (req, res, next) => {
    const { params } = req.body;
    if (!params.hasOwnProperty("StoreName")) {
        return res.status(400).send(failedResposne("StoreName Needed", req.originalUrl))
    }
    if (!params.hasOwnProperty("Country")) {
        return res.status(400).send(failedResposne("Country Needed", req.originalUrl))
    }
    if (!params.hasOwnProperty("Category")) {
        return res.status(400).send(failedResposne("Category Needed", req.originalUrl))
    }
    if (!params.VisitWeek) {
        return res.status(400).send(failedResposne("VisitWeek Needed", req.originalUrl))
    }

    next();
}


router.post("/getGrowthPotentialDetails", picosValidation, picosController.getGrowthPotentialDetails);
router.post("/logBook", validation, picosController.logBookData);
router.post("/store", validation, picosController.storeData);
module.exports = router;