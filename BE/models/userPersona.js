const { DataTypes } = require('sequelize');
const db = require('../helper/database/db');
const { tables } = require('../helper/utils/tables');
const model = db.sequelize.define(
    "userPersona",
    {
        UserID: { type: DataTypes.BIGINT },
        FirstName: { type: DataTypes.STRING },
        MiddleName: { type: DataTypes.STRING },
        LastName: { type: DataTypes.STRING },
        EmailID: { type: DataTypes.STRING },
        UserPersona: { type: DataTypes.STRING },
    },
    {
        timestamps: false,
        schema: tables["userPersona"]["schema"],
        tableName: tables["userPersona"]["table"]
    }
);
model.removeAttribute('id');
module.exports = model;
