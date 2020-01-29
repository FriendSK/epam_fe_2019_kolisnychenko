const mongoose  = require('mongoose');
const log = require(INCPATH + '/log')(module);
const config = require(INCPATH + '/config');

mongoose.connect(config.get('db'));
const db = mongoose.connection;

db.on('error', (err) => {
    log.error('connection error:', err.message);
});
db.once('open', callback = () => {
    log.info("Connected to DB!");
});

const Schema = mongoose.Schema;

const Article = new Schema({
    author: { type: String, default : '' },
    userImg: { type: String, default : '' },
    date: { type: String, default : '' },
    read: { type: String, default : '' },
    comments: { type: String, default : '' },
    title: { type: String, default : '' },
    descr: { type: String, default : '' },
    part1: { type: String, default : '' },
    part2: { type: String, default : '' },
    part3: { type: String, default : '' },
    rating: { type: String, default : '' },
    postImg: { type: String, default : '' },
    videoPoster: { type: String, default : '' },
    typeOfPost: { type: String, default : '' },
    img: { type: String, default : '' },
});

module.exports.ArticleModel = mongoose.model('Articles', Article);
