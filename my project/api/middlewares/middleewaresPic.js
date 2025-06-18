import multer from "multer";
import path from "path";
import fs from "fs";

// הגדרת Storage לתמונות
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const apartmentName = req.body.name; // קבלת שם הדירה
        if (!apartmentName) {
            return cb(new Error('Apartment name is required'), false); // אם שם הדירה לא הוזן
        }
        
        const directoryPath = path.join("pictures", apartmentName); // יצירת תיקייה לפי שם הדירה

        // אם התיקייה לא קיימת, ניצור אותה
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        cb(null, directoryPath); // מיקום שמירת התמונות
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + path.extname(file.originalname); // שם קובץ ייחודי
        cb(null, fileName);
    }
});

// סינון קבצים: רק תמונות
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/gif"
    ) {
        cb(null, true); // אישור קובץ
    } else {
        cb(new Error("Only image files are allowed!"), false); // דחיית קובץ
    }
};

// העלאת מספר קבצים
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).array("images", 100); // עד 100 תמונות בשדה "images"

// המידלוואר שמעלה את התמונות ומעדכן את רשומת הדירה במסד נתונים
export const uploadApartmentImages = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send({ message: err.message });
        }

        // עדכון שדה התמונות במודלים במסד הנתונים
        const images = req.files.map(file => `/pictures/${req.body.name}/${file.filename}`);
        req.body.img = images;

        next();
    });
};
