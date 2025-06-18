import Category from "../models/category.js";

// פונקציה ליצירת קטגוריה חדשה
export const create = async (req, res) => {
    const { name } = req.body;

    // אם לא נמסר שם קטגוריה
    if (!name) {
        return res.status(400).send({ error: "Category name is required" });
    }

    try {
        // יצירת אובייקט קטגוריה חדש
        const newCategory = new Category({
            name
        });

        // שמירה במסד הנתונים
        const category = await newCategory.save();

        // שליחת תשובה חיובית עם ID של הקטגוריה שנוצרה
        res.status(200).send({ message: `Category created successfully with ID: ${category._id}` });
    } catch (err) {
        // אם קרתה שגיאה
        res.status(500).send({ error: err.message });
    }
};

// פונקציה לשליפת כל הקטגוריות
export const getAllCategory = async (req, res) => {
    try {
        // שליפת כל הקטגוריות מהמסד
        const categories = await Category.find();

        // שליחת כל הקטגוריות שנמצאו
        res.status(200).send({ categories });
    } catch (err) {
        // אם קרתה שגיאה
        res.status(500).send({ error: err.message });
    }
};

// פונקציה לשליפת קטגוריה לפי ID
export const getById = async (req, res) => {
    const { id } = req.params;

    try {
        // שליפת הקטגוריה לפי ID
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).send({ error: "Category not found!" });
        }

        // שליחת הקטגוריה שנמצאה
        res.status(200).send(category);
    } catch (err) {
        // אם קרתה שגיאה
        res.status(500).send({ error: err.message });
    }
};
