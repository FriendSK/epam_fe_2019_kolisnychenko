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
    return log.err(err);
  }

  try {
    list = JSON.parse(data);
  } catch (err) {
    log.err(err);
  }
});

router.route('/articles')
  .get((req, res) => {
    log.info('==Get all list articles==');
    res.end(res.json(list));
  })
router.route('/article')
  .post((req, res) => {
    log.info('==Save article==');
    list.push(req.body);
    res.end(res.json(list));
  })
router.route('/articles/:id')
  .get((req, res) => {
    log.info('==Get article by id==');
    const articleById = list.find(article => +article.id === +req.params.id);
    if (!articleById) {
        res.sendStatus(404);
    }
    res.end(res.json(articleById));
  })
router.route('/articles/:id')
  .put((req, res) => {
    log.info('==Edit article by id==');
    const index = list.findIndex(article => +article.id === +req.params.id);
    if (index > -1) {
    const articleById = list.find(article => +article.id === +req.params.id);
    const  updatedArticle = {...articleById , ...req.body};
        list[index] = updatedArticle;
    }
    res.end(res.json(list));
  })
router.route('/articles/:id')
  .delete((req, res) => {
    log.info('==Delete article by id==');
    list = list.filter(article => +article.id !== +req.params.id);
    res.end(res.json(list));
  })
router.route('/articles')
  .delete((req, res) => {
    log.info('==Delete all articles==');
    list.splice(0, list.length);
    res.sendStatus(201);
  });

module.exports = router;
