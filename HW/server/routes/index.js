const log = require(INCPATH + '/log')(module);
const express = require('express');
const router = express.Router();
const articleModel = require(INCPATH + '/model').ArticleModel;

router.get('/articles', async (req, res) => {
  log.info('==Get all articles==');
  try {
    const result = await articleModel.find();
    if (!result) {
      res.sendStatus(404);
    } else {
      log.info('Articles have been found');
      res.json(result);
    }
  } catch (err) {
    log.info('Error find articles');
    res.status(500).send(err.message);
  }
});

router.post('/article', async (req, res) => {
  log.info('==Post article==');
  try {
    const article = new articleModel(req.body);
    await article.save();
    res.json(article);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/articles/:id', async (req, res) => {
  log.info('==Get article by id==');
  try {
    const articleById = await articleModel.find({_id: req.params.id});
    if (!articleById.length) {
      res.sendStatus(404);
    } else {
      res.json(articleById);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/article/:id', async (req, res) => {
  log.info('==Edit article by id==');
  try {
    const result = await articleModel.findOneAndUpdate({_id: req.params.id}, {descr: req.body.descr});
    if (!result) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/list/:id', async (req, res) => {
  log.info('==Delete article by id==');
  try {
    const result = await articleModel.deleteOne({_id: req.params.id});
    if (!result) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/latest', async (req, res) => {
  log.info('==Get latest article==');
  try {
    const article = [];
    const articles = await articleModel.find();
    article.push(articles[articles.length - 1]);
    if (!articles.length) {
      res.sendStatus(404);
    } else {
      res.json(article);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
