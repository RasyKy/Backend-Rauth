const express = require('express');
const router = express.Router();
const { getQuizzesByModule } = require('../src/controller/quiz.controller');

router.get('/module/:moduleName', getQuizzesByModule);

module.exports = router;