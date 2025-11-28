const express = require("express");
const router = express.Router();
const { checkAuth } = require("../src/middleware/auth.middleware");

const {
  saveLessonProgress,
  saveQuizAttempt,
  saveExamAttempt,
  getMyLessonProgress,
  getMyQuizAttempts,
  getMyExamAttempts,
  getAllMyQuizAttempts,
  getAllMyExamAttempts,
} = require("../src/controller/progress.controller");

router.post("/lesson", checkAuth, saveLessonProgress);
router.post("/quiz", checkAuth, saveQuizAttempt);
router.post("/exam", checkAuth, saveExamAttempt);

router.get("/lesson", checkAuth, getMyLessonProgress);
router.get("/quiz/all", checkAuth, getAllMyQuizAttempts);
router.get("/quiz/:quizId", checkAuth, getMyQuizAttempts);
router.get("/exam/all", checkAuth, getAllMyExamAttempts);
router.get("/exam/:examId", checkAuth, getMyExamAttempts);

module.exports = router;
