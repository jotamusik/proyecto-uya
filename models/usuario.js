const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let validateEmail = function (email) {

    let regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regEx.test(email)
};

var usuarioSchema = new Schema({

    nombre: { type: String,  required: [true, 'Name must be provided'] },
    apellidos: {type: String, required: [true, 'Last name must be provided']},
    email:    {

        type: String,
        Required:  'Email address cannot be left blank.',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        index: {unique: true, dropDups: true}

    },

    password: { type: String , required: [true,  'Password cannot be left blank']},

});

module.exports = mongoose.model('Usuario', usuarioSchema);