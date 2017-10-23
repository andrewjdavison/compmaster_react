var winston = require('winston');
winston.emitErrs = true;

var customLevels = {
  levels: {
    silly: 0,
    debug: 1,
    verbose: 2,
    info: 3,
    alert: 4,
    warn: 5,
    error: 6,
    critical: 7,
    fatal: 8
  },
  colors: {
    silly: 'blue',
    debug: 'green',
    verbose: 'green',
    info: 'green',
    alert: 'yellow',
    warn: 'yellow',
    error: 'red',
    critical: 'red',
    fatal: 'red'
  }
};


var logger = new winston.Logger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './logs/all-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880,
      maxFiles: 5,
      colorize: false,
      timestamp: function(){
        var d = new Date();
        return d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear()+' ' + d.getHours()+':'+
          d.getMinutes()+':'+d.getSeconds();
      }
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

winston.addColors(customLevels.colors);

module.exports = logger;
module.exports.stream = {
  write: function(message, encoding) {
//    logger.info(message);
  }
};
