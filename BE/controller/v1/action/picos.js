const { failedResposne, successResposne } = require("../../../helper/utils/repsonse");
const { getPage, getPerPage } = require("../../../helper/utils/utils");
const { getGrowthPotentialQuery } = require("./utils");
const vwTopOsaDashboardModel = require("../../../models/Bel/vwTopOsaDashboard");
const vwKpiBannerImageModel = require("../../../models/Bel/vwKpiBannerImage");
const db = require("../../../helper/database/db");

const getGrowthPotentialDetails = async (req, res) => {
    // #swagger.description = Picos Growth Potential Details
    try {
        let { page, per_page, params } = req.body;
        page = getPage(page);
        per_page = getPerPage(per_page);
        const query = getGrowthPotentialQuery(params)
        const [result] = await db.picosSequelize.query(`select * from (${query}) B Order by [Achieved] asc OFFSET ${(page - 1) * per_page} ROWS FETCH NEXT ${per_page} ROWS ONLY`);
        const [count] = await db.picosSequelize.query(`select count(*) as count from (${query}) B`);
        return res.send(successResposne({ count: count[0].count, rows: result }));
    }
    catch (e) {
        return res.status(500).send(failedResposne(e, req.originalUrl))
    }
};
const logBookData = async (req, res) => {
    // #swagger.description = Picos Log Book Details
    try {
        return res.send(successResposne("Pico logBookData"));
    }
    catch (e) {
        return res.status(500).send(failedResposne(e, req.originalUrl))
    }
};
const storeData = async (req, res) => {
    // #swagger.description = Picos Store Details
    try {
        const { Abbreviation } = req.body;
        const data = await vwTopOsaDashboardModel(Abbreviation).findAndCountAll();
        const availability = await vwTopOsaDashboardModel(Abbreviation).count({
            attributes: ["Status"],
            group: ["Status"]
        });
        const banner = await vwKpiBannerImageModel(Abbreviation).findAll({
            attributes: ["Image_Url"],
            group: ["Image_Url"]
        });
        return res.send(successResposne({ count: data.count, store: data.rows, availability, banner }));
    }
    catch (e) {
        return res.status(500).send(failedResposne(e, req.originalUrl))
    }
};
module.exports = { getGrowthPotentialDetails, logBookData, storeData };