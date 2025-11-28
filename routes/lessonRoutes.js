const express = require("express");
const router = express.Router();
// Import checkAuth, but ONLY use it for modifying data
const { checkAuth } = require("../src/middleware/auth.middleware");
const {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
} = require("../src/controller/lesson.controller");

router.get("/", getAllLessons);
router.get("/:id", getLessonById);

router.post("/", checkAuth, createLesson);
router.put("/:id", checkAuth, updateLesson);
router.delete("/:id", checkAuth, deleteLesson);

module.exports = router;
