import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createApartment, getAllCategory, getAllCity, createCity, createCategory } from "../api";
import "./styles/PublishApartment.css";

export const PublishApartment = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [newApartment, setNewApartment] = useState({
        name: "",
        description: "",
        price: "",
        beds: "",
        category: "",
        city: "",
        address: "",
        additives: ""  // הוספת שדה תוספים
    });
    const [newCity, setNewCity] = useState(""); // הוספת state חדש לעיר
    const [newCategory, setNewCategory] = useState(""); // הוספת state חדש לקטגוריה
    const [isOtherCity, setIsOtherCity] = useState(false);
    const [isOtherCategory, setIsOtherCategory] = useState(false);
    const [images, setImages] = useState([]); // לאחסן את התמונות

    useEffect(() => {
        const fetchData = async () => {
            const categoryData = await getAllCategory();
            const cityData = await getAllCity();
            setCategories(categoryData.data.categories);
            setCities(cityData.data.cities);
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewApartment((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSelectChange = (e, type) => {
        const value = e.target.value;
        const setOther = type === 'city' ? setIsOtherCity : setIsOtherCategory;
        setOther(value === "other");
        setNewApartment((prevState) => ({ ...prevState, [type]: value === "other" ? "" : value }));
    };

    const handleNewInputChange = (e, type) => {
        type === 'city' ? setNewCity(e.target.value) : setNewCategory(e.target.value);
    };

    // פונקציה לטיפול בתמונות שהעלו המשתמשים
    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let finalCity = newApartment.city;
        let finalCategory = newApartment.category;

        try {
            // אם העיר החדשה לא קיימת במערכת, אנחנו צריכים להוסיף אותה
            if (isOtherCity && newCity.trim()) {
                const response = await createCity({ name: newCity });
                console.log("Response from createCity:", response);
                if (response.data && response.data.message) {
                    const cityId = response.data.message.split('ID: ')[1];  // שליפה של ה-ID מתוך ההודעה
                    finalCity = cityId; // עדכון ה-ID של העיר החדשה
                    console.log("עיר חדשה נוספה:", response.data.city);
                } else {
                    throw new Error("שגיאה בהוספת העיר.");
                }
            }

            // אם הקטגוריה החדשה לא קיימת במערכת, אנחנו צריכים להוסיף אותה
            if (isOtherCategory && newCategory.trim()) {
                const response = await createCategory({ name: newCategory });
                console.log("Response from createCategory:", response);
                if (response.data && response.data.message) {
                    // שליפת ה-ID מתוך ההודעה שהתקבלה
                    const categoryId = response.data.message.split('ID: ')[1];  // שליפה של ה-ID מתוך ההודעה
                    finalCategory = categoryId; // עדכון ה-ID של הקטגוריה החדשה
                    console.log("קטגוריה חדשה נוספה:", categoryId);
                } else {
                    throw new Error("שגיאה בהוספת הקטגוריה.");
                }
            }

            // הדפסת הנתונים לפני שליחתם לשרת
            console.log("Sending data to create apartment:", { finalCity, finalCategory, newApartment });

            const formData = new FormData();
            formData.append("name", newApartment.name);
            formData.append("description", newApartment.description);
            formData.append("price", newApartment.price);
            formData.append("beds", newApartment.beds);
            formData.append("category", finalCategory);  // השתמש ב-ID המעודכן של הקטגוריה
            formData.append("city", finalCity);  // השתמש ב-ID המעודכן של העיר
            formData.append("address", newApartment.address);
            formData.append("additives", newApartment.additives);

            Array.from(images).forEach((image) => {
                formData.append("images", image);
            });

            // הדפסת ה-FormData לפני שליחה
            formData.forEach((value, key) => {
                console.log(key, value);
            });

            // שליחה של הדירה
            const createApartmentResponse = await createApartment(formData);
            console.log("Apartment creation response:", createApartmentResponse);

            alert("הדירה נוספה בהצלחה!");
            navigate("/");

        } catch (error) {
            console.error("שגיאה בהוספת הדירה:", error.message);
            alert("שגיאה בהוספת הדירה. אנא בדקי את הנתונים ונסי שוב.");
        }
    };

    return (
        <div className="create-apartment-page">
            <form onSubmit={handleSubmit} className="create-apartment-form" encType="multipart/form-data">
                <div className="form-image"></div> {/* כאן אני משאיר את המיקום של התמונה */}
                <h2>הוסף דירה</h2>
                <div>
                    <label>שם הדירה</label>
                    <input type="text" name="name" value={newApartment.name} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>תיאור</label>
                    <textarea name="description" value={newApartment.description} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>מחיר</label>
                    <input type="number" name="price" value={newApartment.price} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>מספר מיטות</label>
                    <input type="number" name="beds" value={newApartment.beds} onChange={handleInputChange} required />
                </div>

                {/* Category Section */}
                <div>
                    <label>קטגוריה</label>
                    {isOtherCategory ? (
                        <input type="text" value={newCategory} onChange={(e) => handleNewInputChange(e, 'category')} placeholder="הזן קטגוריה חדשה" required />
                    ) : (
                        <select name="category" value={newApartment.category} onChange={(e) => handleSelectChange(e, 'category')} required>
                            <option value="" disabled hidden>בחר קטגוריה</option>
                            {categories.length ? categories.map((category, index) => (
                                <option key={index} value={category._id}> {category.name}</option>
                            )) : <option disabled>אין קטגוריות זמינות</option>}
                            <option value="other">אחר</option>
                        </select>
                    )}
                </div>

                {/* City Section */}
                <div>
                    <label>עיר</label>
                    {isOtherCity ? (
                        <input type="text" value={newCity} onChange={(e) => handleNewInputChange(e, 'city')} placeholder="הזן עיר חדשה" required />
                    ) : (
                        <select name="city" value={newApartment.city} onChange={(e) => handleSelectChange(e, 'city')} required>
                            <option value="" disabled hidden>בחר עיר</option>
                            {cities.length ? cities.map((city, index) => (
                                <option key={index} value={city._id}> {city.name}</option>
                            )) : <option disabled>אין ערים זמינות</option>}
                            <option value="other">אחר</option>
                        </select>
                    )}
                </div>

                {/* Address Section */}
                <div>
                    <label>כתובת</label>
                    <input type="text" name="address" value={newApartment.address} onChange={handleInputChange} required />
                </div>

                {/* Additives Section */}
                <div>
                    <label>תוספים</label>
                    <textarea name="additives" value={newApartment.additives} onChange={handleInputChange} placeholder="הזן תוספים (למשל: גינה, בריכה)" />
                </div>

                {/* File Upload Section */}
                <div>
                    <label>העלאת תמונות</label>
                    <input type="file" multiple onChange={handleImageChange} />
                </div>

                <button type="submit">שלח דירה</button>
            </form>
        </div>
    );
};