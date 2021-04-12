const express = require('express');
const News = require('../dbModels/news.js');
const router = express.Router();

router.all('*', (req, res, next) => {
  if (!req.session.admin) {
    res.redirect('login');
    return;
  }

  next();
})

router.get('/', (req, res) => {
  News.find({}, (err, news) => {    
    res.render('admin/index', { title: 'Admin', news});
  })
});

router.get('/news/add', (req, res) => {
  res.render('admin/news-form', { title: 'Dodaj news' });
});

router.post('/news/add', (req, res) => {
  const {title, description} = req.body;
  const newsData = new News({
    title,
    description
  })

  const errors = newsData.validateSync();

  newsData.save((err) => {
    if (err) {
      res.render('admin/news-form', {title: 'Dodaj news', errors});
      return;
    }

    res.redirect('/admin');
  })
})

router.get('/news/delete/:newsID', (req, res) => {
  const id = (req.params.newsID);
  
  News.findByIdAndDelete(id, (err) => {
    res.redirect('/admin');
  })

  
})



module.exports = router;
