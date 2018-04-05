var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Academia Lagunensis' });
});

router.get('/asignaturas', function(req, res, next) {
    res.render('asignaturas', { title: 'Asignaturas' });
});

module.exports = router;
