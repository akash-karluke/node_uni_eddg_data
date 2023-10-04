const { powerBI } = require("../../../helper/utils/powerBI");
const { successResposne, failedResposne } = require("../../../helper/utils/repsonse");
const { generateAuthToken } = require("./utils");
const getPowerBIAccessToken = async (req, res) => {
    // #swagger.description = PowerBI Embed Token
    try {
        const { page } = req.params;
        const data = powerBI[page];
        if (!data) {
            res.status(404).send(failedResposne("Page Not Found", req.originalUrl));
        } else {
            const response = await generateAuthToken(data);
            if (response.status === false) {
                res.status(500).send(failedResposne(response.error, req.originalUrl));
            }
            else {
                res.status(200).json(successResposne({
                    token: response,
                    data,
                }));
            }
        }
    } catch (e) {
        res.status(500).send(failedResposne(e, req.originalUrl));
    }
}
module.exports = { getPowerBIAccessToken };
