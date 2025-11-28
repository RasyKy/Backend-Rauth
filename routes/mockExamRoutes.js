const express = require("express");
const router = express.Router();
const { checkAuth } = require("../src/middleware/auth.middleware");
const {
  createExam,
  getAllExams,
  getExamById,
  getExamsByModule,
  updateExam,
  deleteExam,
} = require("../src/controller/mockexam.controller");

// ✅ PUBLIC
router.get("/", getAllExams);
router.get("/:id", getExamById);
router.get("/module/:moduleName", getExamsByModule);

// 🔒 PROTECTED
router.post("/", checkAuth, createExam);
router.put("/:id", checkAuth, updateExam);
router.delete("/:id", checkAuth, deleteExam);

module.exports = router;
