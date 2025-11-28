const express = require("express");
const router = express.Router();
const { checkAuth } = require("../src/middleware/auth.middleware");

// Import controllers ONCE (cleaned up duplicates)
const {
  createProfile,
  getMyProfile,
  getAllUsers,
  setRole,
  forgotPassword,
  resetPassword,
  updateUser,
} = require("../src/controller/auth.controller");

router.post("/profile", checkAuth, createProfile);

router.put("/profile", checkAuth, updateUser);

router.get("/profile", checkAuth, getMyProfile);

router.put("/role", checkAuth, setRole);

router.get("/users", getAllUsers);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
