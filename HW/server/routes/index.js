const log = require(INCPATH + '/log')(module);
const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const ObjectId = require('mongoose').Types.ObjectId;
const articleModel = require(INCPATH + '/model').ArticleModel;

router.get('/articles', async (req, res) => {
  log.info('==Get all articles==');
  await articleModel.find((err, articles) => {
    if (err) {
      log.err('Error find articles');
    }
    log.info('Articles have been found');
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
  await articleModel.findOneAndUpdate({_id: id}, {descr: req.body.descr});
  res.sendStatus(202);
});
router.delete('/list/:id', async (req, res) => {
  log.info('==Delete article by id==');
  const id = new ObjectId(req.params.id);
  await articleModel.deleteOne({_id: id});
  res.sendStatus(204);
});
=======
const fs = require("fs");

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

router.get('/articles', (req, res) => {
    log.info('==Get all list articles==');
    res.json(list);
  })
router.post('/article', (req, res) => {
    log.info('==Save article==');
    list.push(req.body);
    res.json(list);
  })
router.get('/articles/:id', (req, res) => {
    log.info('==Get article by id==');
    const articleById = list.find(article => +article.id === +req.params.id);
    if (!articleById) {
        res.sendStatus(404);
    } else {
      res.json(articleById);
    }
  })
router.put('/article/:id', (req, res) => {
    log.info('==Edit article by id==');
    const index = list.findIndex(article => +article.id === +req.params.id);
    if (index > -1) {
    const articleById = list.find(article => +article.id === +req.params.id);
    const  updatedArticle = {...articleById , ...req.body};
        list[index] = updatedArticle;
    }
    res.json(list);
  })
router.delete('/list/:id', (req, res) => {
    log.info('==Delete article by id==');
    list = list.filter(article => +article.id !== +req.params.id);
    res.sendStatus(204);
  })
router.delete('/list', (req, res) => {
    log.info('==Delete all articles==');
    list.splice(0, list.length);
    res.sendStatus(201)
  });
>>>>>>> 034f284344dfea54d3d60a7e56d866303e307789

module.exports = router;
