const { DataTypes } = require("sequelize");
const db = require("../../helper/database/db");
const { picosTables } = require("../../helper/utils/tables");
const model = function (Abbreviation) {
    return db.picosSequelize.define(
        "vwKpiBannerImage",
        {
            id: { type: DataTypes.INTEGER, primaryKey: true },
            CountryID: { type: DataTypes.INTEGER },
            CategoryID: { type: DataTypes.INTEGER },
            Category: { type: DataTypes.STRING },
            KpiCategory: { type: DataTypes.STRING },
            Store_Code: { type: DataTypes.STRING },
            Store_Name: { type: DataTypes.STRING },
            RetailerID: { type: DataTypes.INTEGER },
            Retailer: { type: DataTypes.STRING },
            ChannelID: { type: DataTypes.INTEGER },
            Channel: { type: DataTypes.STRING },
            Region: { type: DataTypes.STRING },
            Visit_Date: { type: DataTypes.DATE },
            Visit: { type: DataTypes.INTEGER },
            Image_Url: { type: DataTypes.STRING }
        },
        {
            timestamps: false,
            schema: picosTables[Abbreviation]["vwKpiBannerImage"]["schema"],
            tableName: picosTables[Abbreviation]["vwKpiBannerImage"]["table"]
        }
    );
}
module.exports = model;