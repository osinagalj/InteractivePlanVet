const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    subjects: {
        type: [{}],
        required: false
    },
    subjects2: {
        type: [{}],
        required: false
    },
    subjects3: {
        type: [{}],
        required: false
    },
    quarter: {
        type: Number,
        required: false
    }

});

module.exports = mongoose.model('Subject',SubjectSchema);