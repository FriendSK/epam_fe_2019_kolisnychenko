const log = require(INCPATH + '/log')(module);
const express = require('express');
const router = express.Router();
const articleModel = require(INCPATH + '/model').ArticleModel;

router.get('/articles', async (req, res) => {
  log.info('==Get all articles==');
  try {
    await articleModel.find((articles) => {
      log.info('Articles have been found');
      res.json(articles);
    });
  } catch (err) {
    log.err('Error find articles');
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
    if (!articleById) {
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
    await articleModel.findOneAndUpdate({_id: req.params.id}, {descr: req.body.descr});
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
router.delete('/list/:id', async (req, res) => {
  log.info('==Delete article by id==');
  try {
    await articleModel.deleteOne({_id: req.params.id});
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
