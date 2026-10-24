const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers["authorization"];

        if (!token) {
            return res.status(401).json({
                message: "token required"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );

        console.log("decoded = ", decoded);
        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "invalid token"
        });
    }
};

module.exports = authMiddleware;