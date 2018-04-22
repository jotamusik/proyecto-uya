var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var Asignatura = require('../models/asignatura');
require('../models/usuario.js');

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

/* POST user registration page. */

function isValid(myEmail){

    let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(myEmail);
}

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

/*
router.post('/registro',[


    check('first_name','Name cannot be left blank')
        .isLength({ min: 1 }),
    check('last_name','Name cannot be left blank')
        .isLength({ min: 1 }),
    check('email')
        .isEmail().withMessage('Please enter a valid email address')
        .trim()
        .normalizeEmail()
        .custom(value => {
            return findUserByEmail(value).then(User => {
                //if user email already exists throw an error
            })
        }),


    check('password')
        .isLength({ min: 5 }).withMessage('Password must be at least 5 chars long')
        .matches(/\d/).withMessage('Password must contain one number')
        .custom((value,{req, loc, path}) => {
            if (value !== req.body.cpassword) {
                // throw error if passwords do not match
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        }),



], function(req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        res.json({status : "error", message : errors.array()});
        console.log("Ha habido un error");

    } else {

        hmac = crypto.createHmac("sha1", 'auth secret');
        var encpassword = '';

        if(req.body.password){
            hmac.update(req.body.password);
            encpassword = hmac.digest("hex");
        }
        var document = {
            nombre:      req.body.nombre,
            apellidos:   req.body.apellidos,
            email:       req.body.email,
            password:    encpassword
        };

        var usuario = new Usuario(document);
        usuario.save(function(error){
            console.log(usuario);
            if(error){
                throw error;
            }
            console.log("User created successfully");
            res.json({message : "Data saved successfully.", status : "success"});
        });
    }
});

function findUserByEmail(email){

    if(email){
        return new Promise((resolve, reject) => {
            User.findOne({ email: email })
                .exec((err, doc) => {
                    if (err) return reject(err);
                    if (doc) return reject(new Error('This email already exists. Please enter another email.'));
                    else return resolve(email)
                })
        })
    }
}

*/

module.exports = router;
