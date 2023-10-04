const axios = require("axios");

const generateEmbedToken = async (auth_token, payload) => {
    try {
        const config = { headers: { Authorization: `Bearer ${auth_token}`, 'Content-Type': "application/json" } };
        const body = {
            "datasets": [{ "id": payload.datasets }],
            "reports": [{ "id": payload.reportId }]
        };
        const { data } = await axios.post(
            `https://api.powerbi.com/v1.0/myorg/GenerateToken`,
            body,
            config
        );
        return data.token;
    } catch (error) {
        return { status: false, error: "generateEmbedToken" + error.toString() };
    }
};
const generateAuthToken = async (payload) => {
    try {
        const CLIENT_ID = process.env.CLIENT_ID;
        const CLIENT_SECRET = process.env.CLIENT_SECRET;
        const TENANT_ID = process.env.TENANT_ID;
        const config = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");
        params.append("client_id", CLIENT_ID);
        params.append("client_secret", CLIENT_SECRET);
        params.append("scope", "https://analysis.windows.net/powerbi/api/.default");
        params.append("resource", "https://analysis.windows.net/powerbi/api");
        const { data } = await axios.post(
            `https://login.microsoftonline.com/${TENANT_ID}/oauth2/token`,
            params,
            config
        );
        AUTH_TOKEN = data?.access_token;
        return await generateEmbedToken(AUTH_TOKEN, payload);
    } catch (error) {
        return { status: false, error: "generateAuthToken :" + error.toString() };
    }
};

module.exports = { generateAuthToken };