const express = require('express');
const router = express.Router();
const {
    saveLessonProgress,
    saveQuizAttempt,
    saveExamAttempt,
    getMyLessonProgress,
    getMyQuizAttempts
} = require('../src/controller/progress.controller');

router.post('/lesson', saveLessonProgress);
router.post('/quiz', saveQuizAttempt);
router.post('/exam', saveExamAttempt);

router.get('/lesson', getMyLessonProgress);
router.get('/quiz/:quizId', getMyQuizAttempts);

module.exports = router;