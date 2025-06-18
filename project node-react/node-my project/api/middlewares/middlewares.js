import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

// בדיקת אימייל תקין
export const checkEmail = (req, res, next) => {
    const { email } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format!' });
    }
    next();
};

export const checkAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Authentication failed, token missing" });
    }

    try {
        if (!process.env.SECRET) {
            throw new Error('SECRET is not defined');
        }

        const decoded = jwt.verify(token, process.env.SECRET); // השתמש ב-SECRET במקום JWT_SECRET
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid token or authentication error" });
    }
};
