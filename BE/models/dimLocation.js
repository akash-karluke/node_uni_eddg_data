const { DataTypes } = require("sequelize");
const db = require("../helper/database/db");
const { tables } = require("../helper/utils/tables");
const model = function () {
    const schema = db.sequelize.define(
        "dimLocation",
        {
            LocationID: { type: DataTypes.BIGINT },
            Address1: { type: DataTypes.STRING },
            Address2: { type: DataTypes.STRING },
            City: { type: DataTypes.STRING },
            State: { type: DataTypes.STRING },
            CountryName: { type: DataTypes.STRING },
            CountryGroup: { type: DataTypes.STRING },
            RegionName: { type: DataTypes.STRING },
            ClusterName: { type: DataTypes.STRING },
            Hash_difference: { type: DataTypes.BIGINT },
            CountryID: { type: DataTypes.BIGINT },
            RegionID: { type: DataTypes.BIGINT }
        },
        {
            timestamps: false,
            schema: tables["dimLoction"]["schema"],
            tableName: tables["dimLoction"]["table"],
        });
    schema.removeAttribute("id");
    return schema;
}
module.exports = model;