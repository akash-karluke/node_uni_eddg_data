const { errorLogger } = require("../../winston/logger");
const db = require("../database/db");
const { tables } = require("./tables");
const userPersonna = {
    SalesManager: "SalesManager",
    GlobalUser: "GlobalUser",
    SalesRep: "SalesRep"
}
const isNotNull = (data) => {
    return data != undefined && data.trim() != "";
}
const superTestReq = () => {
    const supertest = require("supertest");
    const request = supertest("http://localhost:8001");
    return request;
}
const getToken = async () => {
    const response = await superTestReq().get('/api/test/token');
    return response.body.data;
}
const getOOSAlertPayload = async () => {
    const response = await superTestReq().get('/api/test/oosAlert');
    return response.body.data;
}
const getOOSAlertStorePayload = async () => {
    const response = await superTestReq().get('/api/test/oosAlert/store');
    return response.body.data;
}

const getCountryId = async (Abb) => {
    try {
        const [CountryID] = await db.sequelize.query(`select  TOP (1) [CountryID] from [${tables.countryMap.schema}].[${tables.countryMap.table}] where Abbreviation='${Abb}'`);
        return CountryID[0].CountryID;
    }
    catch (e) {
        errorLogger.error({ api: "getCountryId", "error": e && e.toString() })
        return "";
    }
}
const changeArrayToMap = (array) => {
    var result = "";
    array.map((item, index) => {
        if (index !== 0) {
            result += ",";
        }
        result += `'${item}'`;
    });
    return `(${result})`;
};
const filterINSQL = (filters, isNotAnd = true) => {
    try {
        var filtersIN = "";
        if (filters && filters.length > 0) {
            filters.forEach((item) => {
                if (item.val.length) {
                    filtersIN += `${item.label} in ${changeArrayToMap(item.val)} AND `;
                }
            });
            filtersIN = isNotNull(filtersIN) ? `${isNotAnd ? ' (' : ' AND ('} ${filtersIN.slice(0, -4)}) ` : '';
        }
        return filtersIN;
    }
    catch (e) {
        errorLogger.error({ api: "filterINSQL", "error": e && e.toString() })
        return '';
    }

};

const paramsToWhere = (params) => {
    try {
        let data = '';
        if (params && Object.keys(params).length) {
            Object.keys(params).forEach((item) => {
                data += ` ${item} = ${params[item]} and`;
            });
            data = data.slice(0, -3);
        }
        return data;
    }
    catch (e) {
        errorLogger.error({ api: "paramsToWhere", "error": e && e.toString() })
        return '';
    }

}

const nullOrAnyFun = (received, expected) => {
    if (received === null) {
        return {
            pass: true,
            message: () => `expected null or instance of ${this.utils.printExpected(expected)}, but received ${this.utils.printReceived(received)}`
        };
    }

    if (expected == String) {
        return {
            pass: typeof received == 'string' || received instanceof String,
            message: () => `expected null or instance of ${this.utils.printExpected(expected)}, but received ${this.utils.printReceived(received)}`
        };
    }

    if (expected == Number) {
        return {
            pass: typeof received == 'number' || received instanceof Number,
            message: () => `expected null or instance of ${this.utils.printExpected(expected)}, but received ${this.utils.printReceived(received)}`
        };
    }

    if (expected == Function) {
        return {
            pass: typeof received == 'function' || received instanceof Function,
            message: () => `expected null or instance of ${this.utils.printExpected(expected)}, but received ${this.utils.printReceived(received)}`
        };
    }

    if (expected == Object) {
        return {
            pass: received !== null && typeof received == 'object',
            message: () => `expected null or instance of ${this.utils.printExpected(expected)}, but received ${this.utils.printReceived(received)}`
        };
    }

    if (expected == Boolean) {
        return {
            pass: typeof received == 'boolean',
            message: () => `expected null or instance of ${this.utils.printExpected(expected)}, but received ${this.utils.printReceived(received)}`
        };
    }

    /* jshint -W122 */
    /* global Symbol */
    if (typeof Symbol != 'undefined' && this.expectedObject == Symbol) {
        return {
            pass: typeof received == 'symbol',
            message: () => `expected null or instance of ${this.utils.printExpected(expected)}, but received ${this.utils.printReceived(received)}`
        };
    }
    /* jshint +W122 */

    return {
        pass: received instanceof expected,
        message: () => `expected null or instance of ${this.utils.printExpected(expected)}, but received ${this.utils.printReceived(received)}`
    };
};

const reduceWithoutNulls = (data, key) => {
    try {
        return data && data.reduce((acc, thing) => {
            if (thing[key] !== null) {
                acc.push(thing[key]);
            }
            return acc;
        }, [])
    } catch {
        errorLogger.error({ api: "reduceWithoutNulls", "error": e && e.toString() })
        return [];
    }
}
const getUserIDQuery = (user) => {
    let where = '';
    if (user && user.UserPersona) {
        console.log(user.UserPersona.toLowerCase() === userPersonna.SalesRep.toLowerCase())
        switch (user.UserPersona.toLowerCase()) {
            case userPersonna.SalesManager.toLowerCase():
                where = ` ManagerID = '${user.UserID}' `;
                break;
            case userPersonna.SalesRep.toLowerCase():
                where = ` SalesRepID = '${user.UserID}' `;
                break;
            default:
                where = `1!=1`;
        }
    }
    return where;
}
const getPage = (page) => {
    return isNaN(Number(page)) ? 1 : Number(page);
}
const getPerPage = (per_page) => {
    return isNaN(Number(per_page)) ? 10 : Number(per_page)
}
module.exports = { isNotNull, getToken, nullOrAnyFun, superTestReq, getOOSAlertPayload, getOOSAlertStorePayload, getCountryId, filterINSQL, paramsToWhere, changeArrayToMap, reduceWithoutNulls, userPersonna, getUserIDQuery, getPage, getPerPage }