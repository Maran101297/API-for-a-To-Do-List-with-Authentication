const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const path = require('path')
const SMTP = require('../SMTP/emailVerification');
// Generate JWT token for authentication
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = {
    // GET Signup form
    signupForm: async (req, res) => {
      res.render(path.join(process.cwd(), global.config.Form.Register), {body:"",errors: []});
    },
    // POST /signup
Register: async (req, res) => {
    const { username, email, password} = req.body;

    try {
        // Check if the user already exists by email
        const userExistsByEmail = await User.findOne({ email });
        if (userExistsByEmail) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Check if the username already exists
        const userExistsByUsername = await User.findOne({ username });
        if (userExistsByUsername) {
            return res.status(400).json({ message: 'Username is already taken' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = await createOTP();

        const sendOtp = await SMTP.SendOTP(email, otp);


        // Create the user
        const user = new User({
            username,
            email,
            password: hashedPassword,
            otp: otp
        });

        const newUser = await user.save();

        // Generate JWT for the new user
        // const token = generateToken(newUser._id);
        // console.log(token);
        // Send response with the token
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                phone: newUser.phone,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
},
OtpForm: async (req, res)=>{
 res.render(path.join(process.cwd(), global.config.Form.otpForm), {body: ""});
},

//GET otp verification
verifyOtp: async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
          }

          user.otp = null; // Clear the OTP field
          user.isVerified = true; // Optional: Mark the user as verified
          await user.save();

          res.status(200).json({ message: 'OTP verified successfully. User is now verified.' });

    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error: error.message });
    }
},
signInForm: function(res, res){
    res.render(path.join(process.cwd(), global.config.Form.Login), {body:"",errors: []});
},

    // POST /login
    loginForm: async (req, res) => {
        const { email, password } = req.body;
    
        try {
            // Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
    
            // Compare provided password with stored hash
            const isMatch = await bcrypt.compare(password, user.password);
           
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
    
            // Generate JWT token for authentication
            const token = generateToken(user._id);
            // Send response with the token and user data
            res.json({
                message: 'Login successful',
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                },
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
    
};

function createOTP(){
    return Math.floor(100000 + Math.random()* 900000).toString();
}
