const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { failedResposne } = require("../helper/utils/repsonse");
const { logger } = require("../winston/logger");
const User = require("../models/userPersona");
const { isNotNull } = require("../helper/utils/utils");
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const authorization = async (req, res, next) => {
    try {
        let token = '';
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(" ")[1]
        }
        const decoded = jwt.decode(token);
        if (!isNotNull((decoded && decoded.unique_name) || "")) {
            return res.status(401).send(failedResposne("Invalid Token", req.originalUrl))
        }
        if (decoded.exp < Date.now() / 1000) {
            return res.status(401).send(failedResposne("Token Expired", req.originalUrl))
        }
        const result = await User.findAll({ where: { EmailID: decoded.unique_name }, raw: true });
        if (!result.length) {
            return res.status(403).send(failedResposne("User Not Found", req.originalUrl))
        }
        req.user = { ...result[0] };
        logger.info({
            api: req.originalUrl, user: {
                email: decoded.unique_name,
                role: result[0].UserPersona
            }
        });
    }
    catch (e) {
        return res.status(500).send(failedResposne(e, req.originalUrl))
    }
    next();
}
app.use("/api/v1", authorization, require("./v1/"));
app.use("/api/test",
    // #swagger.tags = ['test']
    require("./v1/testDoc"));
module.exports = { app }
