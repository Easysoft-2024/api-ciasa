const express = require('express');
const router = express.Router();
const {putCancelled} = require('../controllers/putCancelled.controller');
const respuesta = require ('../red/respuestas');

router.put('/:folio/cancel',putCancelled);

module.exports = router;