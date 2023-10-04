require('dotenv').config()
const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index'];
const doc = {
    info: {
        version: "1.0.0",
        title: "Eddgie Unified Web App",
        description: "Documentation"
    },
    host: process.env.HOST,
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "User",
            "description": "Info"
        }
    ],
    securityDefinitions: {
        bearerAuth: {
            name: "Authorization",
            in: "header",
            type: "apiKey",
            description: "Add Bearer along with jwt token"
        }
    },
    security: [{ "bearerAuth": [] }]
};
swaggerAutogen(outputFile, endpointsFiles, doc)