const winston = require('winston');

function getLogger(module) {
  let path = module.filename.split('/\/').slice(-1).join('/');

  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        level: 'debug',
        label: path,
      }),
    ],
  });
}

module.exports = getLogger;
