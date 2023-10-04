const express = require('express');
const { successResposne } = require('../../helper/utils/repsonse');
const router = express.Router();
router.get('/token', (req, res) => {
    token = "--token--";
    res.status(200).send(successResposne(token))
});
router.get('/oosAlert', (req, res) => {
    const payload = {
        "Abbreviation": "Bel",
        "end_week": "202309",
        "page": "1",
        "per_page": "10"
    };
    res.status(200).send(successResposne(payload))

});
router.get('/oosAlert/store', (req, res) => {
    const payload = {
        "Abbreviation": "Bel",
        "end_week": "202305",
        "params": {
            "SalesRepID": "-8647013355212559084",
            "StoreID": "-1322800610005450656",
            "CategoryID": "-3523848635234750647"
        }

    };
    res.status(200).send(successResposne(payload))

})
module.exports = router;