import Apartment from "../models/apartment.js";
import Category from "../models/category.js";
import City from "../models/city.js";
import Advertiser from "../models/advertiser.js";
import { getWeather } from "../weather.js";  // מייבא את הפונקציה שלך

// יצירת דירה חדשה
export const createApartment = async (req, res) => {
    const { id: userId } = req.user; // ה-ID של המשתמש שנשלף מהטוקן
    const { name, description, img, category, city, address, beds, additives, price } = req.body;

    try {
        const newApartment = new Apartment({
            name,
            description,
            img,
            category,
            city,
            address,
            beds,
            additives,
            price,
            advertiser: userId // המשווק הוא ה-userId
        });

        const savedApartment = await newApartment.save();

        // עדכון הקטגוריה, העיר והמשווק
        await Category.findByIdAndUpdate(category, { $push: { apartments: savedApartment._id } });
        await City.findByIdAndUpdate(city, { $push: { apartments: savedApartment._id } });
        await Advertiser.findByIdAndUpdate(userId, { $push: { apartments: savedApartment._id } }); // עדכון המשווק עם ה-userId

        res.status(201).json(savedApartment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// שליפת דירה לפי ID
export const getApartmentById = async (req, res) => {
    // const { id } = req.params;

    try {
        const apartment = await Apartment.findById(req.params.id)
            .populate("category", "name")
            .populate("city", "name")
            .populate("advertiser", "email phone");

        if (!apartment) return res.status(404).send({ message: "Apartment not found!" });

        // שליפת מזג האוויר לעיר
        const cityName = apartment.city.name;  // שם העיר שמתקבל מהדירה
        const weather = await getWeather(cityName);  // שימוש בפונקציה שהגדרת

        res.status(200).json({
            apartment,
            weather  // הוספת נתוני מזג האוויר
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// עדכון דירה
export const updateApartment = async (req, res) => {
    const { id } = req.params;
    const { name, description, img, category, city, address, beds, additives, price } = req.body;

    try {
        const updatedApartment = await Apartment.findByIdAndUpdate(
            id,
            { name, description, img, category, city, address, beds, additives, price },
            { new: true }
        );

        if (!updatedApartment) {
            return res.status(404).json({ message: "Apartment not found!" });
        }

        res.status(200).json(updatedApartment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// מחיקת דירה
export const deleteApartment = async (req, res) => {
    const { id } = req.params;

    try {
        const apartment = await Apartment.findByIdAndDelete(id);

        if (!apartment) {
            return res.status(404).json({ message: "Apartment not found!" });
        }

        // עדכון הקטגוריה, העיר והמשווק
        await Category.findByIdAndUpdate(apartment.category, { $pull: { apartments: id } });
        await City.findByIdAndUpdate(apartment.city, { $pull: { apartments: id } });
        await Advertiser.findByIdAndUpdate(apartment.advertiser, { $pull: { apartments: id } });

        res.status(200).json({ message: "Apartment deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// שליפת כל הדירות
export const getAllApartments = async (req, res) => {
    try {
        const apartments = await Apartment.find()
            .populate("category", "name")
            .populate("city", "name")
            .populate("advertiser", "email phone");

        // בדיקה אם יש מפרסמים חסרים
        const apartmentsWithMissingAdvertisers = apartments.filter(apartment => !apartment.advertiser);
        if (apartmentsWithMissingAdvertisers.length > 0) {
            console.warn("Apartments with missing advertisers:", apartmentsWithMissingAdvertisers);
        }

        // הוספת לוג לפני שליחה
        console.log("All apartments with populated data:", apartments);

        res.status(200).json(apartments);
    } catch (err) {
        console.error("Error fetching apartments:", err.message);
        res.status(500).json({ error: err.message });
    }
};

// שליפת דירות לפי קוד קטגוריה
export const getApartmentsByCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const apartments = await Apartment.find({ category: categoryId })
            .populate("category", "name")
            .populate("city", "name")
            .populate("advertiser", "email phone");

        if (apartments.length === 0) {
            return res.status(404).json({ message: "No apartments found for this category!" });
        }

        res.status(200).json(apartments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// שליפת דירות לפי קוד עיר
export const getApartmentsByCity = async (req, res) => {
    const { cityId } = req.params;

    try {
        const apartments = await Apartment.find({ city: cityId })
            .populate("category", "name")
            .populate("city", "name")
            .populate("advertiser", "email phone");

        if (apartments.length === 0) {
            return res.status(404).json({ message: "No apartments found for this city!" });
        }

        // שליפת מזג האוויר לעיר הספציפית
        const city = apartments[0].city;  // כל הדירות בעיר אחת, לוקחים את העיר הראשונה
        const weather = await getWeather(city.name);  // שימוש בפונקציה שהגדרת

        res.status(200).json({
            apartments,
            weather  // הוספת מזג האוויר לעיר
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// שליפת דירות לפי מספר מיטות
export const getApartmentsByBeds = async (req, res) => {
    const { beds } = req.params;
    try {
        const apartments = await Apartment.find(({ beds: { $gte: Number(beds) } }))
            .populate("category", "name")
            .populate("city", "name")
            .populate("advertiser", "email phone");

        if (apartments.length === 0) {
            return res.status(404).json({ message: "No apartments found with the specified number of beds!" });
        }

        res.status(200).json(apartments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// שליפות דירות לפי מחיר
export const getApartmentsByPrice = async (req, res) => {
    const { price } = req.params;

    try {
        const apartments = await Apartment.find({ price: { $lte: price } }) // דוגמה למחיר קטן או שווה
            .populate("category", "name")
            .populate("city", "name")
            .populate("advertiser", "email phone");

        if (apartments.length === 0) {
            return res.status(404).json({ message: "No apartments found with the specified price!" });
        }

        res.status(200).json(apartments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getApartmentsByPriceLarger = async (req, res) => {
    const { price } = req.params;

    try {
        const apartments = await Apartment.find({ price: { $gte: price } }) // דוגמה למחיר גדול או שווה
            .populate("category", "name")
            .populate("city", "name")
            .populate("advertiser", "email phone");

        if (apartments.length === 0) {
            return res.status(404).json({ message: "No apartments found with the specified price!" });
        }

        res.status(200).json(apartments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// שליפת דירות לפי קוד מפרסם
export const getApartmentsByAdvertiser = async (req, res) => {
    const { advertiserId } = req.params;

    try {
        const apartments = await Apartment.find({ advertiser: advertiserId })
            .populate("category", "name")
            .populate("city", "name")
            .populate("advertiser", "email phone");

        if (apartments.length === 0) {
            return res.status(404).json({ message: "No apartments found for this advertiser!" });
        }

        res.status(200).json(apartments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
