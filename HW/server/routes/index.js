const log = require(INCPATH + '/log')(module);
const express = require('express');
const router = express.Router();
const fs = require("fs");

let list;

fs.readFile("./config/articles.json", "utf8", (err, data) => {
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
    res.json(list);
  })
router.route('/article')
  .post((req, res) => {
    log.info('==Save article==');
    list.push(req.body);
    res.json(list);
  })
router.route('/articles/:id')
  .get((req, res) => {
    log.info('==Get article by id==');
    const articleById = list.find(article => +article.id === +req.params.id);
    if (!articleById) {
        res.sendStatus(404).end();
    }
    res.json(articleById);
  })
router.route('/article/:id')
  .put((req, res) => {
    log.info('==Edit article by id==');
    const index = list.findIndex(article => +article.id === +req.params.id);
    if (index > -1) {
    const articleById = list.find(article => +article.id === +req.params.id);
    const  updatedArticle = {...articleById , ...req.body};
        list[index] = updatedArticle;
    }
    res.json(list);
  })
router.route('/list/:id')
  .delete((req, res) => {
    log.info('==Delete article by id==');
    list = list.filter(article => +article.id !== +req.params.id);
    res.sendStatus(201).end();
  })
router.route('/list')
  .delete((req, res) => {
    log.info('==Delete all articles==');
    list.splice(0, list.length);
    res.sendStatus(201).end();
  });

module.exports = router;
