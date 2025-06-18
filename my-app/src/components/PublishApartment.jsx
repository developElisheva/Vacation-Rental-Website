import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createApartment,
  getAllCategory,
  getAllCity,
  createCity,
  createCategory,
} from "../api";
import Swal from 'sweetalert2'; // ייבוא SweetAlert2
import "./styles/PublishApartment.css";

export const PublishApartment = ({ user }) => {
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
    additives: "",
  });
  const [newCity, setNewCity] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isOtherCity, setIsOtherCity] = useState(false);
  const [isOtherCategory, setIsOtherCategory] = useState(false);
  const [images, setImages] = useState([]);

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
    const setOther = type === "city" ? setIsOtherCity : setIsOtherCategory;
    setOther(value === "other");
    setNewApartment((prevState) => ({
      ...prevState,
      [type]: value === "other" ? "" : value,
    }));
  };

  const handleNewInputChange = (e, type) => {
    type === "city"
      ? setNewCity(e.target.value)
      : setNewCategory(e.target.value);
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let finalCity = newApartment.city;
    let finalCategory = newApartment.category;

    try {
      if (isOtherCity && newCity.trim()) {
        const response = await createCity({ name: newCity });
        if (response.data && response.data.message) {
          const cityId = response.data.message.split("ID: ")[1];
          finalCity = cityId;
        } else {
          throw new Error("שגיאה בהוספת העיר.");
        }
      }

      if (isOtherCategory && newCategory.trim()) {
        const response = await createCategory({ name: newCategory });
        if (response.data && response.data.message) {
          const categoryId = response.data.message.split("ID: ")[1];
          finalCategory = categoryId;
        } else {
          throw new Error("שגיאה בהוספת הקטגוריה.");
        }
      }

      const formData = new FormData();
      formData.append("name", newApartment.name);
      formData.append("description", newApartment.description);
      formData.append("price", newApartment.price);
      formData.append("beds", newApartment.beds);
      formData.append("category", finalCategory);
      formData.append("city", finalCity);
      formData.append("address", newApartment.address);
      formData.append("additives", newApartment.additives);

      // הוספת ה-ID של המפרסם מה-props (אם קיים)
      if (user && user._id) {
        formData.append("advertiserId", user._id);  // שלח את ה-ID של המפרסם
      }

      Array.from(images).forEach((image) => {
        formData.append("images", image);
      });

      const createApartmentResponse = await createApartment(formData);
      Swal.fire({
        icon: 'success',
        title: 'הדירה נוספה בהצלחה!',
        showConfirmButton: true,
      });
      navigate("/");
    } catch (error) {
      console.error("שגיאה בהוספת הדירה:", error.message);
      Swal.fire({
        icon: 'error',
        title: 'שגיאה בהוספת הדירה',
        text: "אנא בדקי את הנתונים ונסי שוב.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="create-apartment-page">
      <form
        onSubmit={handleSubmit}
        className="create-apartment-form"
        encType="multipart/form-data"
      >
        <div className="form-image"></div>
        <h2>הוסף דירה</h2>
        <div>
          <label className="label">שם הדירה</label>
          <input className="input"
            type="text"
            name="name"
            value={newApartment.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="label">תיאור</label>
          <textarea className="textarea"
            name="description"
            value={newApartment.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="label">מחיר</label>
          <input className="input"
            type="number"
            name="price"
            value={newApartment.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="label">מספר מיטות</label>
          <input className="input"
            type="number"
            name="beds"
            value={newApartment.beds}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="label">קטגוריה</label>
          {isOtherCategory ? (
            <input className="input"
              type="text"
              value={newCategory}
              onChange={(e) => handleNewInputChange(e, "category")}
              placeholder="הזן קטגוריה חדשה"
              required
            />
          ) : (
            <select className="select"
              name="category"
              value={newApartment.category}
              onChange={(e) => handleSelectChange(e, "category")}
              required
            >
              <option value="" disabled hidden>
                בחר קטגוריה
              </option>
              {categories.length ? (
                categories.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option disabled>אין קטגוריות זמינות</option>
              )}
              <option value="other">אחר</option>
            </select>
          )}
        </div>
        <div>
          <label className="label">עיר</label>
          {isOtherCity ? (
            <input className="input"
              type="text"
              value={newCity}
              onChange={(e) => handleNewInputChange(e, "city")}
              placeholder="הזן עיר חדשה"
              required
            />
          ) : (
            <select className="select"
              name="city"
              value={newApartment.city}
              onChange={(e) => handleSelectChange(e, "city")}
              required
            >
              <option value="" disabled hidden>
                בחר עיר
              </option>
              {cities.length ? (
                cities.map((city, index) => (
                  <option key={index} value={city._id}>
                    {city.name}
                  </option>
                ))
              ) : (
                <option disabled>אין ערים זמינות</option>
              )}
              <option value="other">אחר</option>
            </select>
          )}
        </div>
        <div>
          <label className="label">כתובת</label>
          <input
          className="input"
            type="text"
            name="address"
            value={newApartment.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="label">תוספים</label>
          <textarea className="textarea"
            name="additives"
            value={newApartment.additives}
            onChange={handleInputChange}
            placeholder="הזן תוספים (למשל: גינה, בריכה)"
          />
        </div>
        <div>
          <label className="label">העלאת תמונות</label>
          <input className="input" type="file" multiple onChange={handleImageChange} />
        </div>
        <button type="submit" className="button-submit">שלח דירה</button>
      </form>
    </div>
  );
};
