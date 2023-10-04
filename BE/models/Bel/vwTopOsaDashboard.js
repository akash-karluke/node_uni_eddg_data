const { DataTypes } = require("sequelize");
const db = require("../../helper/database/db");
const { picosTables } = require("../../helper/utils/tables");
const model = function (Abbreviation) {
    return db.picosSequelize.define(
        "vwTopOsaDashboard",
        {
            id: { type: DataTypes.INTEGER, primaryKey: true },
            CountryID: { type: DataTypes.INTEGER },
            CategoryID: { type: DataTypes.INTEGER },
            Category: { type: DataTypes.STRING },
            Store_Code: { type: DataTypes.STRING },
            Store_Name: { type: DataTypes.STRING },
            RetailerID: { type: DataTypes.INTEGER },
            Retailer: { type: DataTypes.STRING },
            ChannelID: { type: DataTypes.INTEGER },
            Channel: { type: DataTypes.STRING },
            Region: { type: DataTypes.STRING },
            Visit_Date: { type: DataTypes.DATE },
            Visit: { type: DataTypes.INTEGER },
            TOP_OSA_EAN: { type: DataTypes.STRING },
            TOP_EAN_Description: { type: DataTypes.STRING },
            Status: { type: DataTypes.STRING },
            Cluster_Type: { type: DataTypes.STRING }
        },
        {
            timestamps: false,
            schema: picosTables[Abbreviation]["vwTopOsaDashboard"]["schema"],
            tableName: picosTables[Abbreviation]["vwTopOsaDashboard"]["table"]
        }
    );
}
module.exports = model;