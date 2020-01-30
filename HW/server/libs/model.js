const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const Article = new Schema({
  author: {type: String, default: ''},
  userImg: {type: String, default: ''},
  date: {type: String, default: ''},
  read: {type: String, default: ''},
  comments: {type: String, default: ''},
  title: {type: String, default: ''},
  descr: {type: String, default: ''},
  part1: {type: String, default: ''},
  part2: {type: String, default: ''},
  part3: {type: String, default: ''},
  rating: {type: String, default: ''},
  videoPoster: {type: String, default: ''},
  img:  {type: String, default: ''},
  quote: {type: String, default: ''},
  typeOfPost: {type: String, default: ''},
});

module.exports.ArticleModel = mongoose.model('Articles', Article);