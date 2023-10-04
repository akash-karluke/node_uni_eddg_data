const { createLogger, transports, format } = require('winston');

// ---- Logging Function ----
const getMonthYearName = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const d = new Date();
    return String(d.getDate()).padStart(2, '0')+"-"+ monthNames[d.getMonth()] + d.getFullYear()
 
}
const logDate = getMonthYearName();
const infoPath = `${__dirname}/logs/info/${logDate}.log`;
const erroPath = `${__dirname}/logs/error/${logDate}.log`;
const logger = createLogger({
    transports: [
        new transports.File({
            filename: infoPath,
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
});
const errorLogger = createLogger({
    transports: [
        new transports.File({
            filename: erroPath,
            level: 'error',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
});


module.exports = { logger, errorLogger };