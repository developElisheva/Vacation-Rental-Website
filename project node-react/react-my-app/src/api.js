import axios from "axios";

// קבוע עבור baseUrl
const baseUrl = "http://localhost:3001";

// פונקציה לקבלת כותרת עם הטוקן
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return {
            Authorization: `Bearer ${token}`,
        };
    }
    return {};
};

// שליפה של כל הדירות
export const getAllApartments = () => {
    return axios.get(`${baseUrl}/apartment`);
};

// שליפה דירה לפי ID
export const getApartmentById = (id) => {
    return axios.get(`${baseUrl}/apartment/${id}`);
};

// יצירת דירה חדשה - רק מפרסם מחובר
export const createApartment = (newA) => {
    return axios.post(`${baseUrl}/apartment/`, newA, { headers: getAuthHeaders() });
};

// עדכון דירה - רק מפרסם מחובר
export const updateApartment = (id, updatedA) => {
    return axios.put(`${baseUrl}/apartment/${id}`, updatedA, { headers: getAuthHeaders() });
};

// מחיקת דירה - רק מפרסם מחובר
export const deleteApartment = (id) => {
    return axios.delete(`${baseUrl}/apartment/${id}`, { headers: getAuthHeaders() });
};

// שליפת דירות לפי קוד קטגוריה
export const getApartmentsByCategory = (id) => {
    return axios.get(`${baseUrl}/apartment/category/${id}`);
};

// שליפת דירות לפי קוד עיר
export const getApartmentsByCity = (id) => {
    return axios.get(`${baseUrl}/apartment/city/${id}`).object;
};

// שליפת דירות לפי מספר מיטות
export const getApartmentsByBeds = (beds) => {    
   return axios.get(`${baseUrl}/apartment/beds/${beds}`);
};

// שליפת דירות לפי מחיר
export const getApartmentsByPrice = (price) => {
    return axios.get(`${baseUrl}/apartment/price/${price}`);
};

export const getApartmentsByPriceLarger = (price) => {
    return axios.get(`${baseUrl}/apartment/priceLarger/${price}`);
}

// שליפת דירות לפי מפרסם
export const getApartmentsByAdvertiser = (id) => {
    return axios.get(`${baseUrl}/apartment/advertiser/${id}`);
};

// שליפת כל המפרסמים
export const getAllAdvertiser = () => {
    return axios.get(`${baseUrl}/advertiser`);
};

// הרשמה
export const sign = (newA) => {
    return axios.post(`${baseUrl}/advertiser/sign`, newA)
        .then((response) => {
            // במקרה של הצלחה, שמור את הטוקן ב-localStorage
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response;
        })
        .catch((error) => {
            console.error("Error during signup:", error);
            throw error;  // החזרת שגיאה אם הייתה
        });
};

// התחברות
export const login = (newA) => {
    return axios.post(`${baseUrl}/advertiser/login`, newA)
        .then((response) => {
            // במקרה של הצלחה, שמור את הטוקן ב-localStorage
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response;
        })
        .catch((error) => {
            console.error("Error during login:", error);
            throw error;  // החזרת שגיאה אם הייתה
        });
};

// שליפת מפרסם לפי ID
export const getAdvertiserById = (id) => {
    return axios.get(`${baseUrl}/advertiser/${id}`, { headers: getAuthHeaders() });
};

// עדכון מפרסם
export const updateAdvertiser = (id, newA) => {
    return axios.put(`${baseUrl}/advertiser/${id}`, newA, { headers: getAuthHeaders() });
};

// מחיקת מפרסם
export const deleteAdvertiser = (id) => {
    return axios.delete(`${baseUrl}/advertiser/${id}`, { headers: getAuthHeaders() });
};

// יצירת קטגוריה חדשה - רק מפרסם מחובר
export const createCategory = (newC) => {
    const headers = getAuthHeaders(); // קבלת ה-Headers
    console.log("Sending headers:", headers); // הדפסת ה-Headers

    if (!headers.Authorization) {
        console.error("No Authorization token found.");
        throw new Error("No Authorization token found.");
    }

    return axios.post(`${baseUrl}/category`, newC, { headers })
        .then((response) => {
            console.log("Category created:", response);
            return response;
        })
        .catch((error) => {
            console.error("Error creating category:", error.response);
            if (error.response && error.response.status === 401) {
                console.log("Unauthorized: Check if the token is valid.");
            }
            throw error; // החזרת שגיאה אם הייתה
        });
};

// שליפת כל הקטגוריות
export const getAllCategory = () => {
    return axios.get(`${baseUrl}/category`);
};

// שליפת קטגוריה לפי ID
export const getByIdCategory = (id) => {
    return axios.get(`${baseUrl}/category/${id}`);
};

// יצירת עיר חדשה
export const createCity = (city) => {
    return axios.post(`${baseUrl}/city`, city, { headers: getAuthHeaders() });
};

// שליפת כל הערים
export const getAllCity = () => {
    return axios.get(`${baseUrl}/city`);
};

// שליפת עיר לפי ID
export const getCityByID = (id) => {
    return axios.get(`${baseUrl}/city/${id}`);
};
