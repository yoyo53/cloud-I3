const express = require('express');
const router = express.Router();
const userActions = require('../controllers/user.controller');
const securityMiddleware = require('../middlewares/security')

router.get("/profile", userActions.getUserAction);
router.put("/update", userActions.updateUserAction);
router.delete("/delete", userActions.deleteUserAction);

module.exports = router;
