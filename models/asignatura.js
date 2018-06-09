const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let AsignaturaSchema = Schema({

    nombre: String

});

module.exports = mongoose.model('Asignatura', AsignaturaSchema);