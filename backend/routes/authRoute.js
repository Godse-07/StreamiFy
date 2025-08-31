const express = require('express');
const { signUpController, loginController, logoutController, onBoardingController } = require('../controllers/authControllers');
const isLoggedIn = require('../middleware/isLoggedIn');

const router = express.Router();

router.post("/signUp", signUpController);
router.post("/login", loginController);
router.post("/logout", logoutController);

router.post("/onboarding", isLoggedIn, onBoardingController)


// check if user is logged in or not
router.get("/me", isLoggedIn, (req, res)=>{
    res.status(200).json({
        success: true,
        user: req.user
    });
})

module.exports = router;