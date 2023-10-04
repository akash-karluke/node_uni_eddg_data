const { DataTypes } = require("sequelize");
const db = require("../helper/database/db");
const { tables } = require("../helper/utils/tables");
const model = function (countryCode, isDownload = false) {
    const viewColumns = {
        Priority: { type: DataTypes.STRING },
        StoreID: { type: DataTypes.BIGINT },
        LocationID: { type: DataTypes.BIGINT },
        CategoryID: { type: DataTypes.BIGINT },
        AGG_PROD_ID: { type: DataTypes.BIGINT },
        ActionRequired: { type: DataTypes.INTEGER },
        RC_ID: { type: DataTypes.INTEGER },
        SalesRepID: { type: DataTypes.BIGINT },
        ActionStatus: { type: DataTypes.STRING },
        Due_date: { type: DataTypes.DATE },
        OSAPercentage: { type: DataTypes.FLOAT },
    };
    const downloadColumns = {
        ...viewColumns,
        WeekID: { type: DataTypes.BIGINT },
        RetailerID: { type: DataTypes.BIGINT },
        ManagerID: { type: DataTypes.BIGINT },
        ActualSalesValue: { type: DataTypes.FLOAT },
        LostSalesValue: { type: DataTypes.FLOAT },
        COREActualSalesValue: { type: DataTypes.FLOAT },
        CORELostSalesValue: { type: DataTypes.FLOAT },
        COREOSAPercentage: { type: DataTypes.FLOAT },
        NPDActualSalesValue: { type: DataTypes.FLOAT },
        NPDLostSalesValue: { type: DataTypes.FLOAT },
        NPDOSAPercentage: { type: DataTypes.FLOAT },
        SKU_Count: { type: DataTypes.INTEGER },
        CORE_SKU_Count: { type: DataTypes.INTEGER },
        NPD_SKU_Count: { type: DataTypes.INTEGER },
        SalesUplift: { type: DataTypes.FLOAT },
        SalesUpliftCORE: { type: DataTypes.FLOAT },
        SalesUpliftNPD: { type: DataTypes.FLOAT },
        Action: { type: DataTypes.STRING },
        AssignedTo: { type: DataTypes.STRING },
        TransferedTo: { type: DataTypes.STRING },
        CompleatedBy: { type: DataTypes.STRING },
        ActionCompleted: { type: DataTypes.INTEGER },
        ActionPerformed: { type: DataTypes.STRING },
        Hash_difference: { type: DataTypes.BIGINT },
        CompleatedDate: { type: DataTypes.DATE }
    };
    const schema = db.sequelize.define(
        "aggProductCat",
        isDownload ? downloadColumns : viewColumns,
        {
            timestamps: false,
            schema: tables["aggProductCatDb"]["schema"],
            tableName: tables["aggProductCatDb"]["table"] + countryCode
        });
    schema.removeAttribute('id');
    return schema
}
module.exports = model;