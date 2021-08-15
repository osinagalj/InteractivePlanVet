const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    subjects: {
        type: [{}],
        required: false
    }

});

module.exports = mongoose.model('Subject',SubjectSchema);