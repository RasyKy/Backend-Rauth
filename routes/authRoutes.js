const express = require('express');
const router = express.Router();
const { createProfile, getMyProfile, getAllUsers, setRole } = require('../src/controller/auth.controller');

router.post('/profile', createProfile);

router.get('/profile', getMyProfile);

router.get('/users', getAllUsers);

router.put('/role', setRole);

module.exports = router;
