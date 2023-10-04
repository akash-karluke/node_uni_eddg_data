const { DataTypes } = require("sequelize");
const db = require("../helper/database/db");
const { tables } = require("../helper/utils/tables");
const model = db.sequelize.define(
    "dimRootCause",
    {
        RC_NO: { type: DataTypes.INTEGER },
        Root_Cause: { type: DataTypes.STRING }
    },
    {
        timestamps: false,
        schema: tables["dimRootCause"]["schema"],
        tableName: tables["dimRootCause"]["table"]
    }
);
model.removeAttribute('id');
module.exports = model;