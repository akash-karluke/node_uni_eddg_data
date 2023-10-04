const { DataTypes } = require("sequelize");
const db = require("../helper/database/db");
const { tables } = require("../helper/utils/tables");
const model = db.sequelize.define(
    "dimStore",
    {
        StoreID: { type: DataTypes.BIGINT },
        StoreCode: { type: DataTypes.STRING },
        StoreName: { type: DataTypes.STRING }
    },
    {
        timestamps: false,
        schema: tables["dimStore"]["schema"],
        tableName: tables["dimStore"]["table"]
    }
);
model.removeAttribute('id');
module.exports = model;