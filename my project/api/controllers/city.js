import City from '../models/city.js';

// פונקציה ליצירת עיר חדשה
export const create = async (req, res) => {
    const { name } = req.body;

    // אם לא נמסר שם עיר
    if (!name) {
        return res.status(400).send({ error: "City name is required" });
    }

    try {
        // יצירת אובייקט עיר חדש
        const newCity = new City({
            name
        });

        // שמירה במסד הנתונים
        const city = await newCity.save();

        // שליחת תשובה חיובית עם ID של העיר שנוצרה
        res.status(200).send({ message: `City created successfully with ID: ${city._id}` });
    } catch (err) {
        // אם קרתה שגיאה
        res.status(500).send({ error: err.message });
    }
};

// פונקציה לשליפת כל הערים
export const getAllCity = async (req, res) => {
    try {
        // שליפת כל הערים מהמסד
        const cities = await City.find();

        // שליחת כל הערים שנמצאו
        res.status(200).send({ cities });
    } catch (err) {
        // אם קרתה שגיאה
        res.status(500).send({ error: err.message });
    }
};

// פונקציה לשליפת עיר לפי ID
export const getById = (req, res) => {
    City.findById(req.params.id)
        .then(city => {
            if (!city) {
                return res.status(404).send({ error: `City not found!` });
            }
            res.status(200).send(city);
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
};
