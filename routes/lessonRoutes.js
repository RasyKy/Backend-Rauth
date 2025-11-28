const express = require("express");
const router = express.Router();
const {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
} = require("../src/controller/lesson.controller");

router.post("/", createLesson);
router.get("/", getAllLessons);
router.get("/:id", getLessonById);
router.put("/:id", updateLesson);
router.delete("/:id", deleteLesson);

module.exports = router;
