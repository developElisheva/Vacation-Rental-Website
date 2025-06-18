import express from "express";
import { uploadApartmentImages } from "../middlewares/middleewaresPic.js";  // ייבוא המידלוור
import {
    createApartment,
    updateApartment,
    getApartmentById,
    deleteApartment,
    getAllApartments,
    getApartmentsByCategory,
    getApartmentsByCity,
    getApartmentsByPrice,
    getApartmentsByAdvertiser,
    getApartmentsByPriceLarger,
    getApartmentsByBeds
} from "../controllers/apartment.js";
import { checkAuth } from "../middlewares/middlewares.js";

const router = express.Router();

// יצירת דירה חדשה - רק מפרסם מחובר
router.post("/", checkAuth, uploadApartmentImages, createApartment);

// עדכון דירה - רק מפרסם מחובר
router.put("/:id", checkAuth, uploadApartmentImages, updateApartment);

// שליפת דירה לפי ID
router.get("/:id", getApartmentById);

// מחיקת דירה - רק מפרסם מחובר
router.delete("/:id", checkAuth, deleteApartment);

// שליפת כל הדירות
router.get("/", getAllApartments);

// שליפת דירות לפי קוד קטגוריה
router.get("/category/:categoryId", getApartmentsByCategory);

// שליפת דירות לפי קוד עיר
router.get("/city/:cityId", getApartmentsByCity);

// שליפת דירות לפי מחיר
router.get("/price/:price/", getApartmentsByPrice);

// שליפת דירות לפי מפרסם
router.get("/advertiser/:advertiserId", getApartmentsByAdvertiser);

router.get("/priceLarger/:price", getApartmentsByPriceLarger);

router.get("/beds/:beds", getApartmentsByBeds);

export default router;
