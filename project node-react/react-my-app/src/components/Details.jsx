
import React from 'react';
import { useParams } from 'react-router-dom';
import { getApartmentById } from '../api';
import { useEffect, useState } from "react";
import "./styles/Details.css"
export const Details = () => {
    const { id } = useParams(); // חילוץ ה-ID מה-URL
    const [list, setList] = useState(null); // אתחול כ-null כדי לציין שאין נתונים עדיין
    const [weater, setWeater] = useState(null); // אתחול כ-null כדי לציין שאין נתונים עדיין
    const [error, setError] = useState(null); // אופציונלי: לטפל בשגיאות
    const [currentImage, setCurrentImage] = useState(0);
    const [positionX, setPositionX] = useState(0);
    const [imageWidth, setImageWidth] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getApartmentById(id);
                console.log(response.data);
                setList(response.data.apartment);
                setWeater(response.data.weather);
            } catch (err) {
                console.error(err);
                setError(err); // אופציונלי: שמירת השגיאה
            }
        };
        fetchData();
    }, [id]);

    if (error) {
        return <p>שגיאה בטעינת המידע: {error.message}</p>;
    }

    if (!list) {
        return <p>טוען נתונים...</p>;
    }
    const handleMouseMove = (e) => {
        const { left, width } = e.target.getBoundingClientRect();
        const positionX = e.clientX - left;
        const clampedPositionX = Math.max(0, Math.min(positionX, width)); // לוודא שהערך בין 0 לרוחב הפס
        const index = Math.floor((clampedPositionX / width) * list.img.length);
        setCurrentImage(index);
        setPositionX(clampedPositionX);
        setImageWidth(width);
    };

    return (
        <div className="details-wrapper">
            {/* Columna izquierda: Detalles */}
            <div className="details-container">
                <p className="my">{list.name}</p>
                <div className="details-info">
                    <div className="details-section">
                        {/* <p>
                            <strong style={{ color: "#131877" }}>שם:</strong> {list.name || "N/A"}
                        </p> */}
                        <p>
                            <strong style={{ color: "#131877" }}>תיאור:</strong> {list.description || "N/A"}
                        </p>
                        <p>
                            <strong style={{ color: "#131877" }}>עיר:</strong> {list.city.name}
                        </p>
                        <p>
                            <strong style={{ color: "#131877" }}>כתובת:</strong> {list.address || "N/A"}
                        </p>
                    </div>
                    <div className="details-section">
                        <p>
                            <strong style={{ color: "#131877" }}>מספר מיטות:</strong> {list.beds || "N/A"}
                        </p>
                        <p>
                            <strong style={{ color: "#131877" }}>הוספות:</strong>{" "}
                            {Array.isArray(list.additives)
                                ? list.additives.join(", ")
                                : list.additives || "N/A"}
                        </p>
                        <p>
                            <strong style={{ color: "#131877" }}>מחיר:</strong>{" "}
                            {list.price ? `${list.price}` : "N/A"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Columna derecha: Imagen y פרטי מפרסם */}
            <div className="left-image-container">
                <div className="card-image2" onMouseMove={handleMouseMove} style={{ height: "100%", width: "100%" }}>
                    <img
                        src={`http://localhost:3001${list.img[currentImage]}`}
                        alt={`${list.name}-${currentImage}`}
                        className="main-image2"
                    />
                    {/* פס תחתון עם כיתוב */}
                    {/* <div className="image-preview-bar">
                        <div
                            className="image-preview-move"
                            style={{
                                left: `${(positionX / imageWidth) * 100}%`, // חישוב מיקום הריבוע הקטן
                            }}
                        />
                        <span className="image-preview-text">
                            {`תמונה ${currentImage + 1} מתוך ${list.img.length}`}
                        </span>
                    </div> */}
                </div>
                <div className="advertiser-details">
                    <h3>פרטי מפרסם</h3>
                    <p>פלאפון: {list?.advertiser.phone || "N/A"}</p>
                    <p>מייל: {list?.advertiser.email || "N/A"}</p>
                </div>
            </div>
        </div>
    );
};  
