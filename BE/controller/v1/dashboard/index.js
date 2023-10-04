const CountryMap = require("../../../models/countryMap");
const RootCauseModel= require("../../../models/dimRootCause");
const { successResposne, failedResposne } = require('../../../helper/utils/repsonse');
const Sequelize = require("sequelize");
const countryMap = async (req, res) => {
    // #swagger.description = Details of Country, Languages and Currency
    /* #swagger.responses[200] = {
        schema: {
            "status": true,
            "data": {
                "Country": [
                    {
                        "CountryName": "Belgium",
                        "Abbreviation": "Bel",
                        "CurrencyCode": "EUR"
                    },
                    {
                        "CountryName": "Germany",
                        "Abbreviation": "Deu",
                        "CurrencyCode": "EUR"
                    }
                ],
                Language: [{
                displayName: "English",
                code: "eng"
                }],
                Currency: [{
                    displayName: "Euro",
                    code: "EUR"
                }]
            }
        }
    } */

    /* #swagger.responses[401] = {
        schema: {
            "status": false,
            "message": "Token Expired"
        }
    } */
    try {
        const Country = await CountryMap.findAll({
            attributes: [
                [
                    Sequelize.fn("DISTINCT", Sequelize.col("Abbreviation")),
                    "Abbreviation"
                ],
                "CountryName",
                "CurrencyCode"
            ],
            order: [["CountryName", "ASC"]],
        });
        const rootCauses = await RootCauseModel.findAll({
            order: [["RC_NO", "ASC"]],
        });
        const repsonse = {
            Country: Country,
            Language: [{
                displayName: "English",
                code: "eng"
            }],
            Currency: [{
                displayName: "Euro",
                code: "EUR"
            }],
            RootCause: rootCauses
        }

        res.status(200).send(successResposne(repsonse))
    }
    catch (e) {
        res.status(500).send(failedResposne(e, req.originalUrl))
    }

};

module.exports = { countryMap }