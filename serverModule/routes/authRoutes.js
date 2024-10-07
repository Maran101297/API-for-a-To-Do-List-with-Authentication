    const express = require('express');
    
    const AuthController = require('../controllers/authController');
    const { protect } = require('../middlewares/authMiddleware');
    const router = express.Router();
    const path = require('path')
    router.get('/todo-app', AuthController.signupForm);

    router.post('/signup', AuthController.Register);

    router.get('/OtpForm', AuthController.OtpForm)

    router.get('/signIn', AuthController.signInForm);

    router.post('/login', AuthController.loginForm);

    router.post('/verifyOtp', AuthController.verifyOtp);


    // Protected route
router.get('/protected-route', protect, (req, res) => {

    // res.json({ message: `Hello ${req.user.username}, you have accessed a protected route!` });
    res.json({
        username: req.user.username,
        email: req.user.email,
        phoneNumber: req.user.phone
    })

});

router.get('/dashboard', (req, res) => {

    res.render(path.join(process.cwd(), global.config.task.dashboard),  {body:"",errors: []})
});



    module.exports = router;
