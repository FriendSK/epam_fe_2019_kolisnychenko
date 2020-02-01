const nconf = require('nconf');
nconf.argv()
  .env()
  .file({file: ABSPATH + '/config/config.json'});

module.exports = nconf;