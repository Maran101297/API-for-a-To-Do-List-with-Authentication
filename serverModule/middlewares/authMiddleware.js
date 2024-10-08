const jwt = require('jsonwebtoken');

const User = require('../models/user');

require('dotenv').config();

const protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // excluded the password
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }else {
        return res.status(401).json({ message: 'Not authorized, no token' });
      }
}

module.exports = { protect };   