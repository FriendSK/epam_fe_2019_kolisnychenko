const log = require(INCPATH + '/log')(module);
const express = require('express');
const router = express.Router();
const path = require('path'); //helps to establish the right ways
const fs = require("fs");
// const UserModel = require(INCPATH + '/mongoose').UserModel;

// router.get('/some-request', function (req, res) {
//   const user = UserModel({
//     name: 'test'
//   });

//   UserModel.find((err, users) => {
//     if (err) {
//       log.error('Error find users in Mongo');
//     }
//     log.info('Users finds');
//     res.end(JSON.stringify(users));
//   });
// });

let list;

fs.readFile("./config/articles.json", "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }
  list = data;
  list = JSON.parse(list);
});

router.route('/')
  //getting static file
  .get(function (req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
  })
router.route('/articles')
  .get(function (req, res) {
    log.info('==Get all list articles==');
    res.end(JSON.stringify(list));
  })
router.route('/articles')
  .post(function (req, res) {
    log.info('==Save article==');
    list.push(req.body);
    res.end(JSON.stringify(list));
  })
router.route('/articles/:id')
  .get(function (req, res) {
    log.info('==Get article by id==');
    const articleById = list.find(article => +article.id === +req.params.id);
    res.end(JSON.stringify(articleById));
  })
router.route('/articles/:id')
  .patch(function (req, res) {
    log.info('==Edit article by id==');
    const index = list.findIndex(article => +article.id === +req.params.id);
    if (index > -1) {
    const articleById = list.find(article => +article.id === +req.params.id);
    const  updatedArticle = {...articleById , ...req.body};
        list[index] = updatedArticle;
    }
    res.end(JSON.stringify(list));
  })
router.route('/articles/:id')
  .delete(function (req, res) {
    log.info('==Delete article by id==');
    list = list.filter(article => +article.id !== +req.params.id);
    res.end(JSON.stringify(list));
  })
router.route('/articles')
  .delete(function (req, res) {
    log.info('==Delete all articles==');
    list.splice(0, list.length);
    res.end(JSON.stringify(list));
  });

module.exports = router;
