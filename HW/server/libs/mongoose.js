const mongoose    = require('mongoose');
const log = require(INCPATH + '/log')(module);
const config = require(INCPATH + '/config');
const Q = require('q');

mongoose.connect(config.get('db'));
const db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

const Schema = mongoose.Schema;

const User = new Schema({
    name: { type: String, default : '' }
});

module.exports.UserModel = mongoose.model('User', User);
