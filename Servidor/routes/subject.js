const express = require('express');
const router = express.Router();
const productoController = require('../controllers/subjectController')
// api/productos
router.post('/', productoController.createSubject);
router.get('/',productoController.getSubjects);


module.exports = router