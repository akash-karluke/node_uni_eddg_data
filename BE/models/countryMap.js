const { DataTypes } = require("sequelize");
const db = require("../helper/database/db");
const { tables } = require("../helper/utils/tables");
const model = db.sequelize.define(
    "countryMap",
    {
        CountryName: { type: DataTypes.STRING },
        Abbreviation: { type: DataTypes.STRING },
        CurrencyCode: { type: DataTypes.STRING }
    },
    {
        timestamps: false,
        schema: tables["countryMap"]["schema"],
        tableName: tables["countryMap"]["table"]
    }
);
model.removeAttribute('id');
module.exports = model;