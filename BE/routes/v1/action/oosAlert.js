const express = require("express");
const router = express.Router();
const oosAlertController = require("../../../controller/v1/action/oosAlert");
const { failedResposne } = require("../../../helper/utils/repsonse");
const { isNotNull } = require("../../../helper/utils/utils");
const actionValidation = (req, res, next) => {
    const { Abbreviation, end_week } = req.body;
    if (!isNotNull(Abbreviation)) {
        return res.status(400).send(failedResposne("Country Abbreviation Required", req.originalUrl))
    }
    if (isNaN(end_week)) {
        return res.status(400).send(failedResposne("End Week is needed", req.originalUrl))
    }
    next();
}
const storeRequiredValidation = (req, res, next) => {
    const { params } = req.body;
    if (!params.hasOwnProperty("SalesRepID")) {
        return res.status(400).send(failedResposne("SalesRepID Needed", req.originalUrl))
    }
    if (!params.hasOwnProperty("StoreID")) {
        return res.status(400).send(failedResposne("StoreID Needed", req.originalUrl))
    }
    if (!params.hasOwnProperty("CategoryID")) {
        return res.status(400).send(failedResposne("CategoryID Needed", req.originalUrl))
    }
    next();
}
const storeUpdateValidation = (req, res, next) => {
    const { store, availability, Abbreviation } = req.body;
    if (!isNotNull(Abbreviation)) {
        return res.status(400).send(failedResposne("Country Abbreviation Required", req.originalUrl))
    }
    if ((store && store.length) || availability) {
        if (availability) {
            if (!availability.hasOwnProperty("AGG_PROD_ID")) {
                return res.status(400).send(failedResposne("In Availability AGG_PROD_ID Required", req.originalUrl))
            }
        }
        if (store && store.length) {
            let isMissing = false;
            store.forEach((item) => {
                if (!(item.hasOwnProperty("Factless_Fact_ID"))) {
                    return isMissing = true;
                }
            });
            if (isMissing) {
                return res.status(400).send(failedResposne("In Store Factless_Fact_ID Required", req.originalUrl))
            }
        }
    }
    else {
        return res.status(400).send(failedResposne("Store Details or Availability Details Required", req.originalUrl))
    }
    next();
}
router.post("/", actionValidation, oosAlertController.oosAlert);
router.post("/download", actionValidation, oosAlertController.oosAlertDownload);
router.post("/store", actionValidation, storeRequiredValidation, oosAlertController.storeData);
router.put("/store", storeUpdateValidation, oosAlertController.updateStoreData);
router.post("/logBook", actionValidation, oosAlertController.logBookData);
module.exports = router;