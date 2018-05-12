var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/user/survey/:token', function (req, res, next) {
  res.render('user-survey');
});
router.get('/admin/survey', function (req, res, next) {
  res.render('admin-survey');
});
router.get('/admin/point', function (req, res, next) {
  res.render('admin-point');
});
router.get('/admin/dashboard', function (req, res, next) {
  res.render('admin-dashboard');
});

module.exports = router;
