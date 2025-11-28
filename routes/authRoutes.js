const express = require("express");
const router = express.Router();
const {
  createProfile,
  getMyProfile,
  getAllUsers,
  setRole,
  forgotPassword,
  resetPassword,
} = require("../src/controller/auth.controller");
const { checkAuth } = require("../src/middleware/auth.middleware");

const {
  createProfile,
  getMyProfile,
  getAllUsers,
  setRole,
  forgotPassword,
  resetPassword,
  updateUser,
} = require("../src/controller/auth.controller");

router.post("/profile", createProfile);

router.put("/profile", checkAuth, updateUser);

router.get("/users", getAllUsers);

router.put("/role", setRole);

// Password reset endpoints
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
