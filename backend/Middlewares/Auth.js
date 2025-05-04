const jwt = require('jsonwebtoken');
const config = require('../config');

const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401)
            .json({ success: false, message: 'Access denied. No token provided.' });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.startsWith('Bearer ') ? 
                  authHeader.substring(7, authHeader.length) : 
                  authHeader;

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403)
            .json({ success: false, message: 'Invalid or expired token.' });
    }
}

module.exports = ensureAuthenticated;