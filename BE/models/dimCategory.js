const { DataTypes } = require("sequelize");
const db = require("../helper/database/db");
const { tables } = require("../helper/utils/tables");
const model = function () {
    const schema = db.sequelize.define(
        "dimCategory",
        {
            CategoryID: { type: DataTypes.BIGINT },
            ProductCategory: { type: DataTypes.STRING },
            GlobalCategory: { type: DataTypes.STRING },
            GlobalBrand: { type: DataTypes.STRING },
            GlobalDivision: { type: DataTypes.STRING },
            Hash_difference: { type: DataTypes.BIGINT },
            BG_ID: { type: DataTypes.BIGINT }
        },
        {
            timestamps: false,
            schema: tables["dimCategory"]["schema"],
            tableName: tables["dimCategory"]["table"],
        });
    schema.removeAttribute("id");
    return schema;
}
module.exports = model;