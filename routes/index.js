var express = require('express');
var router = express.Router();
var Asignatura = require('../models/asignatura');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Academia Lagunensis' });
});

router.get('/asignaturas', function(req, res, next) {
    //res.render('asignaturas', { title: 'Asignaturas' });
    Asignatura.find({}, function (err, asignaturas) {

        if(err)
            res.render("error");
        else
            res.render('asignaturas', {title: 'Asignaturas', asignaturas:asignaturas});
    });
});

router.get('/registro', function(req, res, next) {
    res.render('registro', { title: 'Registrarse' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Iniciar Sesión' });
});

module.exports = router;
