var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

var Asignatura = require('../models/asignatura');
require('../models/usuario.js');
var contactMail = require('../addons/contactMail.js');

var Usuario = mongoose.model('Usuario');
var crypto = require('crypto'), hmac, signature;
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize }   = require('express-validator/filter');


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

router.get('/about', function (req, res) {
    res.render('about', { title: 'Acerca de Academia Lagunensis' });
});

router.get('/contacto', function(req, res, next){
    res.render('contacto', { title: 'Contacto'});
});

/* POST user registration page. */

function isValid(myEmail){

    let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(myEmail);
}

router.post('/contacto', contactMail.sendMyMail);

router.post('/registro', function (req, res) {

    let name = req.body.nombre;
    let last_name = req.body.apellidos;
    let email = req.body.email;
    let password = req.body.password;

    let document = {
            nombre: name,
            apellidos: last_name,
            email: email,
            password: password
    };

    let usuario = new Usuario(document);

    usuario.save(function (error) {

        if (error) {

            // ToDo: Handle error by sending message to client instead of simple throw
            //throw error;
            console.log(error);
        }
        else {

            console.log(usuario);
            console.log("User created successfully");
            res.json({message: "Data saved successfully.", status: "success"});
        }
    });
});

module.exports = router;
