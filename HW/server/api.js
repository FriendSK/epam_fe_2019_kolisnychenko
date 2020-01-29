const log = require( INCPATH + '/log')(module);
const express = require('express');
const router = express.Router();
const ArticleModel = require(INCPATH + '/mongoose').ArticleModel;

router.get("/some", async (req, res) => {

    const art = await ArticleModel.find((err, articles) => {
        if(err) {
            log.error('Error find users in Mongo');
        }
        log.info('Users finds');
        res.end(JSON.stringify(articles));
    });
});

router.post('/articles', async (req, res) => {
    const article = new ArticleModel({
        author: 'test'
    });
    console.log(req.body);
    await article.save();
    res.end();
});
module.exports = router;

