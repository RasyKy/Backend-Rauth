const express = require("express");
const router = express.Router();
const { checkAuth } = require("../src/middleware/auth.middleware");
const {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  getQuizzesByModule,
  updateQuiz,
  deleteQuiz,
} = require("../src/controller/quiz.controller");

// ✅ PUBLIC
router.get("/", getAllQuizzes);
router.get("/:id", getQuizById);
router.get("/module/:moduleName", getQuizzesByModule);

// 🔒 PROTECTED
router.post("/", checkAuth, createQuiz);
router.put("/:id", checkAuth, updateQuiz);
router.delete("/:id", checkAuth, deleteQuiz);

module.exports = router;
