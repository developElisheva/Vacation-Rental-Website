import express from "express";
import {
    create,
    getAllCategory,
    getById
} from "../controllers/category.js";
import { checkAuth } from "../middlewares/middlewares.js";

const router = express.Router();

// יצירת קטגוריה חדשה - רק מפרסם מחובר
router.post("/", checkAuth, create);

// שליפת כל הקטגוריות
router.get("/", getAllCategory);

// שליפת קטגוריה לפי ID
router.get("/:id", getById);

export default router;
