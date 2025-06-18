import Advertiser from '../models/advertiser.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// פונקציה להרשמה
export const sign = async (req, res) => {
    const { email, password, phone, addPhone, apartments } = req.body;

    try {
        const existingAdvertiser = await Advertiser.findOne({ email });
        if (existingAdvertiser) {
            return res.status(400).json({ error: 'Email already exists!' });
        }

        // הצפנת סיסמה
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdvertiser = new Advertiser({
            email,
            password: hashedPassword,
            phone,
            addPhone,
            apartments
        });

        const savedAdvertiser = await newAdvertiser.save();

        // יצירת טוקן
        const token = jwt.sign(
            { email: savedAdvertiser.email, id: savedAdvertiser._id },
            process.env.SECRET,
            { }
        );

        res.status(200).json({ advertiser: savedAdvertiser, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// פונקציה להתחברות
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const advertiser = await Advertiser.findOne({ email });
        if (!advertiser) {
            return res.status(404).json({ error: 'Email not found!' });
        }

        const isPasswordValid = await bcrypt.compare(password, advertiser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid password!' });
        }

        const token = jwt.sign(
            { email: advertiser.email, id: advertiser._id },
            process.env.SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ advertiser, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// פונקציה לקבלת מפרסם לפי ID
export const getAdvertiserById = async (req, res) => {
    try {
        const advertiser = await Advertiser.findById(req.params.id)
            .populate('apartments')
            .exec();

        if (!advertiser) {
            return res.status(404).json({ error: 'Advertiser not found!' });
        }

        res.status(200).json(advertiser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// פונקציה לעדכון מפרסם
export const updateAdvertiser = async (req, res) => {
    const { email, phone, addPhone } = req.body;
    try {
        const advertiser = await Advertiser.findByIdAndUpdate(
            req.params.id,
            { email, phone, addPhone },
            { new: true }
        );

        if (!advertiser) {
            return res.status(404).json({ error: 'Advertiser not found!' });
        }

        res.status(200).json(advertiser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// פונקציה למחוק מפרסם
export const deleteAdvertiser = async (req, res) => {
    try {
        const advertiser = await Advertiser.findByIdAndDelete(req.params.id);

        if (!advertiser) {
            return res.status(404).json({ error: 'Advertiser not found!' });
        }

        res.status(200).json({ message: 'Advertiser deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAll = (req, res) => {
    Advertiser.find()
        .then(advertiser => {
            res.status(200).send(advertiser)
        })
        .catch(error => {
            res.status(500).sand({ error: error.massage })
        })
}
