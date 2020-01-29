const mongoose = require('mongoose');
const log = require(INCPATH + '/log')(module);
const config = require(INCPATH + '/config');

mongoose.connect(config.get('db'));
const db = mongoose.connection;

db.on('error', (err) => {
  log.error('connection error:', err.message);
});
db.once('open', callback = () => {
  log.info('Connected to DB!');
});

module.exports = db;
