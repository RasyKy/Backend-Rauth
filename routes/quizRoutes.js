const express = require("express");
const router = express.Router();
const {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  getQuizzesByModule,
  updateQuiz,
  deleteQuiz,
} = require("../src/controller/quiz.controller");

router.post("/", createQuiz);
router.get("/", getAllQuizzes);
router.get("/:id", getQuizById);
router.get("/module/:moduleName", getQuizzesByModule);
router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);

module.exports = router;
