const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    subjects: {
        type: [{}],
        required: false
    },
    subjectsNext: {
        type: [{}],
        required: false
    },

});

module.exports = mongoose.model('Subject',SubjectSchema);