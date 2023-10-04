const { DataTypes } = require("sequelize");
const db = require("../helper/database/db");
const { tables } = require("../helper/utils/tables");
const model = function (countryCode, isDownload = false) {
    const schema = db.sequelize.define(
        "dimFactlessFact",
        {
            Factless_Fact_ID: { type: DataTypes.BIGINT },
            LocationID: { type: DataTypes.BIGINT },
            WeekID: { type: DataTypes.BIGINT },
            ProductID: { type: DataTypes.BIGINT },
            CategoryID: { type: DataTypes.BIGINT },
            RetailerID: { type: DataTypes.BIGINT },
            StoreID: { type: DataTypes.BIGINT },
            SalesRepID: { type: DataTypes.BIGINT },
            ManagerID: { type: DataTypes.BIGINT },
            COTCFlag: { type: DataTypes.INTEGER },
            AvailabilityStatus: { type: DataTypes.INTEGER },
            RecordedStatus: { type: DataTypes.INTEGER },
            RC_ID: { type: DataTypes.INTEGER },
            UserComments: { type: DataTypes.STRING },
            RootCauseOthers: { type: DataTypes.STRING },
            writeback: { type: DataTypes.STRING },
            Hash_difference: { type: DataTypes.BIGINT },
            RootCause: { type: DataTypes.STRING }
        },
        {
            timestamps: false,
            schema: tables["dimFactlessFact"]["schema"],
            tableName: tables["dimFactlessFact"]["table"] + countryCode
        });
    schema.removeAttribute('id');
    return schema
}
module.exports = model;