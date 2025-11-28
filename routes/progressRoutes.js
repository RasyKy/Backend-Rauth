const express = require("express");
const router = express.Router();
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

// Save progress/attempts
router.post("/lesson", saveLessonProgress);
router.post("/quiz", saveQuizAttempt);
router.post("/exam", saveExamAttempt);

// Get progress/attempts
router.get("/lesson", getMyLessonProgress);
router.get("/quiz/all", getAllMyQuizAttempts);
router.get("/quiz/:quizId", getMyQuizAttempts);
router.get("/exam/all", getAllMyExamAttempts);
router.get("/exam/:examId", getMyExamAttempts);

module.exports = router;
