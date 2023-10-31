const express = require('express');
const router = express.Router();
const authActions = require('../controllers/auth.controller');

router.post("/register", authActions.createUserAction);
router.post("/login", authActions.loginUserAction);

module.exports = router;
