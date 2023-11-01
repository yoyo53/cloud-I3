const express = require('express');
const router = express.Router();
const authActions = require('../controllers/auth.controller');
const securityMiddleware = require('../middlewares/security')

router.post("/register", authActions.createUserAction);
router.post("/login", authActions.loginUserAction);
router.get("/verifyToken", securityMiddleware.verifyToken, authActions.verifyTokenAction);

module.exports = router;
