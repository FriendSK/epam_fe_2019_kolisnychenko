const log = require(INCPATH + '/log')(module);
const express = require('express');
const router = express.Router();
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

module.exports = router;
