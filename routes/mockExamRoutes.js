const express = require("express");
const router = express.Router();
const {
  createExam,
  getAllExams,
  getExamById,
  getExamsByModule,
  updateExam,
  deleteExam,
} = require("../src/controller/mockexam.controller");

router.post("/", createExam);
router.get("/", getAllExams);
router.get("/:id", getExamById);
router.get("/module/:moduleName", getExamsByModule);
router.put("/:id", updateExam);
router.delete("/:id", deleteExam);

module.exports = router;
