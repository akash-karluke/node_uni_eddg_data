const Sequelize = require("sequelize");
const db = {};
db.schemaName = "app";

const cred = {
    dbName: process.env.SQL_DBNAME,
    userName: process.env.SQL_USERNAME,
    password: process.env.SQL_PWD,
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
};

const picosCred = {
    dbName: process.env.PICOS_SQL_DBNAME,
    userName: process.env.PICOS_SQL_USERNAME,
    password: process.env.PICOS_SQL_PWD,
    host: process.env.PICOS_SQL_HOST,
    port: process.env.PICOS_SQL_PORT,
};

const sequelize = new Sequelize(cred.dbName, cred.userName, cred.password, {
    host: cred.host,
    port: cred.port,
    dialect: "mssql",
    dialectOptions: {
        options: { requestTimeout: 300000 },
    },
    pool: {
        max: 100,
        min: 0,
        aquire: 300000,
        idle: 600000,
    },
    logging: true,
});
sequelize
    .authenticate()
    .then(function (err) {
        console.log("Connection has been established successfully.");
    })
    .catch(function (err) {
        console.log("Unable to connect to the database:", err);
    });

//Picos DB connection
const picosSequelize = new Sequelize(picosCred.dbName, picosCred.userName, picosCred.password, {
    host: picosCred.host,
    port: picosCred.port,
    dialect: "mssql",
    dialectOptions: {
        options: { requestTimeout: 300000 },
    },
    pool: {
        max: 100,
        min: 0,
        aquire: 300000,
        idle: 600000,
    },
    logging: true,
});
picosSequelize
    .authenticate()
    .then(function (err) {
        console.log("Connection has been established successfully for Picos.");
    })
    .catch(function (err) {
        console.log("Unable to connect to the database for Picos:", err);
    });

db.sequelize = sequelize;
db.picosSequelize=picosSequelize
module.exports = db;
