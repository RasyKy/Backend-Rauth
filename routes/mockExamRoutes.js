const express = require('express');
const router = express.Router();
const { getExamsByModule } = require('../src/controller/mockexam.controller');

router.get('/module/:moduleName', getExamsByModule);

module.exports = router;