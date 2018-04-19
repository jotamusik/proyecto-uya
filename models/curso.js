const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let CursoSchema = Schema({

    nombre: String,
    asignaturas: {
        type: [Schema.Types.ObjectId],
        ref: 'Asignatura'
    }

});

module.exports = mongoose.model('Curso', CursoSchema);