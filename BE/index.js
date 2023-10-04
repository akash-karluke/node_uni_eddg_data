//Read Environment Varaiables
require('dotenv').config();

//Router
const {app} = require("./routes");

//Swagger
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

//Start Server
const port = process.env.PORT || 2000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});