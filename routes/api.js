const express = require('express');
const router = express.Router();
const News= require('../dbModels/news')

router.get('/', (req, res) => {
  const search = req.query.search || '';

  const findedNews = News
    .find({title: new RegExp(search.trim(), 'i')})
    .sort({createdDate: 'desc'});

  findedNews.exec((err, data) => {
    res.json(data);
  });  
});

router.get('/:id', (req, res) => {
    const findedNews = News.findById(req.params.id);  
    findedNews.exec((err, data) => {
      res.json(data);
    });  
});

module.exports = router;
