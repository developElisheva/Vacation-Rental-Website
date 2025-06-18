import express from "express";
import {
    sign,
    login,
    getAdvertiserById,
    updateAdvertiser,
    deleteAdvertiser,
    getAll
}
    from '../controllers/advertiser.js';
import { checkAuth, checkEmail } from "../middlewares/middlewares.js";

const router = express.Router();

// נתיבים לרשום ולהתחבר
router.get("", getAll);
router.post("/sign", checkEmail, sign);
router.post("/login", login);

// נתיבים לניהול המפרסם (מחייבים אימות)
router.get("/advertiser/:id", checkAuth, getAdvertiserById); // שליפת מפרסם לפי ID
router.put("/advertiser/:id", checkAuth, updateAdvertiser); // עדכון מפרסם
router.delete("/advertiser/:id", checkAuth, deleteAdvertiser); // מחיקת מפרסם

export default router;
