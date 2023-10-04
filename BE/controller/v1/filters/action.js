const { successResposne, failedResposne } = require("../../../helper/utils/repsonse");
const db = require("../../../helper/database/db");
const { tables } = require("../../../helper/utils/tables");
const { getCountryId, reduceWithoutNulls } = require("../../../helper/utils/utils");
const aggProductCat = require("../../../models/aggProductCat");
const Sequelize = require("sequelize");
const { getPicosFiltes, getOSAFilters, getAggCatFilters } = require("./utils");
const filter = async (req, res) => {
    try {
        const { end_week, Abbreviation, params } = req.body;
        const CountryID = await getCountryId(Abbreviation);
        const where_OSA = getOSAFilters({ end_week, params });
        const where_PICOS = getPicosFiltes({ CountryID, params });
        const where = getAggCatFilters({ end_week, params });
        const [filtersData] = await db.sequelize.query(
            `[${tables.OSAFilterMappingSP.schema}].[${tables.OSAFilterMappingSP.table}] @tblName = :tblName, @where= :where`,
            {
                replacements: {
                    tblName: Abbreviation,
                    where: where
                },
            }
        );
        const [store] = await db.sequelize.query(
            `[${tables.OSAStoreFilterSP.schema}].[${tables.OSAStoreFilterSP.table}] @tblName = :tblName, @where_OSA= :where_OSA , @where_PICOS = :where_PICOS`,
            {
                replacements: {
                    tblName: Abbreviation,
                    where_OSA: where_OSA,
                    where_PICOS: where_PICOS
                },
            }
        );

        let combinedData = filtersData.reduce((accumulator, current) => {
            accumulator = {
                BG: accumulator.BG && accumulator.BG.length > 0 ? accumulator.BG : [],
                Category: accumulator.Category && accumulator.Category.length > 0 ? accumulator.Category : [],
                Retailer: accumulator.Retailer && accumulator.Retailer.length > 0 ? accumulator.Retailer : [],
                SalesRep: accumulator.SalesRep && accumulator.SalesRep.length > 0 ? accumulator.SalesRep : []
            }
            if (!accumulator.BG.find(d => d.label === current["GlobalDivision"])) {
                const data = filtersData.filter(d => d.BG_ID === current["BG_ID"]);
                accumulator.BG.push({ label: current["GlobalDivision"], BG_ID: current["BG_ID"], CategoryID: [...new Set(data.map((d) => d.CategoryID))], P_Category: [...new Set(reduceWithoutNulls(data, "P_Category"))] })
            }
            if (!accumulator.Category.find(d => d.label === current["ProductCategory"])) {
                const data = filtersData.filter(d => d.ProductCategory === current["ProductCategory"]);
                accumulator.Category.push({ label: current["ProductCategory"], CategoryID: current["CategoryID"], P_Category: [...new Set(reduceWithoutNulls(data, "P_Category"))] })
            }
            if (!accumulator.Retailer.find(d => d.label === current["RetailerName"])) {
                const data = filtersData.filter(d => d.RetailerName === current["RetailerName"]);
                accumulator.Retailer.push({ label: current["RetailerName"], RetailerID: current["RetailerID"], P_Retailer: [...new Set(reduceWithoutNulls(data, "P_Retailer"))] })
            }
            if (!accumulator.SalesRep.find(d => d.label === current["SalesRepFirstName"])) {
                accumulator.SalesRep.push({ label: current["SalesRepFirstName"], SalesRepID: current["SalesRepID"] })
            }
            return accumulator;
        }, []
        )
        const data = {
            BG: combinedData.BG || [],
            Category: combinedData.Category || [],
            Retailer: combinedData.Retailer || [],
            SalesRep: combinedData.SalesRep || [],
            Store: store
        }
        return res.send(successResposne(data))
    }
    catch (e) {
        return res.status(500).send(failedResposne(e, req.originalUrl))
    }
}
const weekFilter = async (req, res) => {
    try {
        const { Abbreviation } = req.body;
        const weeks = await aggProductCat(Abbreviation).findAll({
            attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("weekID")), "label"],],
            order: [["weekID", "DESC"]],
            raw: true
        });
        return res.send(successResposne(weeks))
    }
    catch (e) {
        return res.status(500).send(failedResposne(e, req.originalUrl))
    }
}

module.exports = { filter, weekFilter };