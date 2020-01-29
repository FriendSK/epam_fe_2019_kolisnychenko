const log = require(INCPATH + '/log')(module);
const express = require('express');
const router = express.Router();
const fs = require('fs');
const ObjectId = require('mongoose').Types.ObjectId;
const db = require(INCPATH + '/mongoose');
const articleModel = require(INCPATH + '/model').ArticleModel;

let list;
fs.readFile('./config/articles.json', 'utf8', (err, data) => {
  if (err) {
    return log.err(err);
  }

  try {
    list = JSON.parse(data);
  } catch (err) {
    log.err(err);
  }
});

router.get('/articles', async (req, res) => {
  log.info('==Get all articles==');
  articleModel.find((err, articles) => {
    if (err) {
      log.err('Error find articles');
    }
    log.info('Articles has found');
    res.json(articles);
  });
});

router.post('/article', async (req, res) => {
  const article = new articleModel(req.body);
  await article.save();
  res.json(article);
});

router.get('/articles/:id', async (req, res) => {
  log.info('==Get article by id==');
  const id = new ObjectId(req.params.id);
  const articleById = await articleModel.find({_id: id});

  if (!articleById) {
    res.sendStatus(404);
  } else {
    res.json(articleById);
  }
});

router.put('/article/:id', async (req, res) => {
  log.info('==Edit article by id==');
  const id = new ObjectId(req.params.id);
  await articleModel.findOneAndUpdate({_id: id}, {descr: req.body});
  res.json(list);
});
router.delete('/list/:id', (req, res) => {
  log.info('==Delete article by id==');
  const id = new ObjectId(req.params.id);
  articleModel.deleteOne({_id: id});
  res.sendStatus(204);
});
router.delete('/list', (req, res) => {
  log.info('==Delete all articles==');
  list.splice(0, list.length);
  res.sendStatus(201);
});

module.exports = router;
