const { isNotNull, changeArrayToMap } = require("../../../helper/utils/utils");

const getOSAFilters = ({ end_week, params }) => {
    let salesRepID = '';
    let StoreID = '';
    let CategoryID = '';
    let RetailerID = '';
    if (params) {
        if (params.hasOwnProperty("salesRepID")) {
            if (params.salesRepID.length) {
                salesRepID = ` salesRepID in ${changeArrayToMap(params.salesRepID)} OR `;
            }
        }
        if (params.hasOwnProperty("StoreID")) {
            if (params.StoreID.length) {
                StoreID = ` A.StoreID in ${changeArrayToMap(params.StoreID)} OR `;
            }
        }
        if (params.hasOwnProperty("CategoryID")) {
            if (params.CategoryID.length) {
                CategoryID = ` CategoryID in ${changeArrayToMap(params.CategoryID)} OR `;
            }
        }
        if (params.hasOwnProperty("RetailerID")) {
            if (params.RetailerID.length) {
                RetailerID = ` RetailerID in ${changeArrayToMap(params.RetailerID)} OR `;
            }
        }
    }
    let filterIN = salesRepID + StoreID + CategoryID + RetailerID;
    filterIN = isNotNull(filterIN) ? ` AND ( ${filterIN.slice(0, -3)} )` : '';
    return `where weekId= ${end_week} ${filterIN}`;
}
const getPicosFiltes = ({ CountryID, params }) => {
    let CategoryID = '';
    let RetailerID = '';
    if (params) {
        if (params.hasOwnProperty("CategoryID")) {
            if (params.CategoryID.length) {
                CategoryID = ` OSA_CategoryID in ${changeArrayToMap(params.CategoryID)} OR `;
            }
        }
        if (params.hasOwnProperty("RetailerID")) {
            if (params.RetailerID.length) {
                RetailerID = ` OSA_RetailerID in ${changeArrayToMap(params.RetailerID)} OR `;
            }
        }
    }
    let filterIN = CategoryID + RetailerID;
    filterIN = isNotNull(filterIN) ? ` AND ( ${filterIN.slice(0, -3)} )` : '';
    return `where [OSA_CountryID] in (${CountryID}) ${filterIN}  order by StoreCode`
}
const getAggCatFilters = ({ end_week, params }) => {
    let salesRepID = '';
    let StoreID = '';
    let CategoryID = '';
    let RetailerID = '';
    if (params) {
        if (params.hasOwnProperty("salesRepID")) {
            if (params.salesRepID.length) {
                salesRepID = ` A.SalesRepID in ${changeArrayToMap(params.salesRepID)} OR `;
            }
        }
        if (params.hasOwnProperty("StoreID")) {
            if (params.StoreID.length) {
                StoreID = ` A.StoreID in ${changeArrayToMap(params.StoreID)} OR `;
            }
        }
        if (params.hasOwnProperty("CategoryID")) {
            if (params.CategoryID.length) {
                CategoryID = ` A.CategoryID in ${changeArrayToMap(params.CategoryID)} OR `;
            }
        }
        if (params.hasOwnProperty("RetailerID")) {
            if (params.RetailerID.length) {
                RetailerID = ` A.RetailerID in ${changeArrayToMap(params.RetailerID)} OR `;
            }
        }
    }
    let filterIN = salesRepID + StoreID + CategoryID + RetailerID;
    filterIN = isNotNull(filterIN) ? ` AND ( ${filterIN.slice(0, -3)} )` : '';
    return `where weekId= ${end_week} ${filterIN}`;
}
module.exports = { getOSAFilters, getPicosFiltes, getAggCatFilters };