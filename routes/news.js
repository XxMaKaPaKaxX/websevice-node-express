const express = require('express');
const router = express.Router();
const News= require('../dbModels/news')

router.get('/', (req, res) => {
  const search = req.query.search || '';

  const findedNews = News.find({title: new RegExp(search.trim(), 'i')})
    .sort({createdDate: 'desc'})
  ;
  findedNews.exec((err, data) => {
    res.render('news', { title: 'News', data, search});
  });  
});

module.exports = router;
