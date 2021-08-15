const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController')
// api/productos
router.post('/', subjectController.createSubject);
router.get('/',subjectController.getSubjects);

router.put('/:id',subjectController.updateSubject);
router.get('/:id',subjectController.getSubject);
router.delete('/:id',subjectController.deleteSubject);


module.exports = router