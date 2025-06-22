const express = require('express');
const { signUpController, loginController, logoutController } = require('../controllers/authControllers');
const isLoggedIn = require('../middleware/isLoggedIn');

const router = express.Router();

router.post("/signUp", signUpController);
router.post("/login", isLoggedIn, loginController);
router.post("/logout", isLoggedIn, logoutController);

module.exports = router;