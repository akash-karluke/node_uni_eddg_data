const { successResposne } = require("../../../helper/utils/repsonse");

const user = async (req, res) => {
    // #swagger.description = Using MSAL token we can get info of authorized user
    /* #swagger.responses[200] = {
        schema: {
            "status": true,
            "data": {
                "FirstName": "Karuppaiya",
                "MiddleName": null,
                "LastName": "P",
                "EmailID": "karuppaiya.p@unilever.com",
                "UserPersona": "SalesManager"
            }
        }
    } */

    /* #swagger.responses[401] = {
        schema: {
            "status": false,
            "message": "Token Expired"
        }
    } */

    res.status(200).send(successResposne(req.user))
};
module.exports = { user }