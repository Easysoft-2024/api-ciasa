const express = require('express');
const router = express.Router();
const {putCompleted} = require('../controllers/putCompleted.controller');

router.put('/:folio/complete',putCompleted);

module.exports = router;