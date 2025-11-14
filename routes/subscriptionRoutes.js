const express = require('express');
const router = express.Router();
const {
    getAllPlans,
    createSubscription,
    getMySubscription
} = require('../src/controller/subscription.controller');

router.get('/plans', getAllPlans);

router.post('/', createSubscription);

router.get('/mine', getMySubscription);

module.exports = router;