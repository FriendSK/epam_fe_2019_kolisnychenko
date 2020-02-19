const mongoose = require('../libs/mongoose');
const Schema = mongoose.Schema;

const Article = new Schema({
  author: {
    type: String,
    default: '',
  },
  userImg: {
    type: String,
    default: '',
  },
  date: {
    type: String,
    default: new Date(),
  },
  read: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    default: '',
  },
  descr: {
    type: String,
    default: '',
  },
  part1: {
    type: String,
    default: '',
  },
  part2: {
    type: String,
    default: '',
  },
  part3: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    default: 0,
  },
  videoPoster: {
    type: String,
    default: '',
  },
  img: {
    type: String,
    default: '',
  },
  quote: {
    type: String,
    default: '',
  },
  typeOfPost: {
    type: String,
    default: '',
  },
});

module.exports.ArticleModel = mongoose.model('Articles', Article);
