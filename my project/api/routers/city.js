import express from "express";
import {
    create,
    getAllCity,
    getById
}
    from "../controllers/city.js";
import { checkAuth } from "../middlewares/middlewares.js";

const router = express.Router();

router.post('', checkAuth, create);  // יצירת עיר חדשה
router.get('', getAllCity);    // שליפת כל הערים
router.get('/:id', getById); // שליפת עיר לפי ID

export default router;
