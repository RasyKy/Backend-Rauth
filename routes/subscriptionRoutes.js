const express = require("express");
const router = express.Router();
// 1. Import middleware
const { checkAuth } = require("../src/middleware/auth.middleware");

const {
  getAllPlans,
  createSubscription,
  getMySubscription,
} = require("../src/controller/subscription.controller");

router.get("/plans", getAllPlans);

router.post("/", checkAuth, createSubscription);
router.get("/mine", checkAuth, getMySubscription);

module.exports = router;
