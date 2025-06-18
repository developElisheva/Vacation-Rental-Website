import React, { useState } from "react";
import "./styles/Card.css";

const Card = ({ name, description, img, category, apartmentDetails }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [positionX, setPositionX] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);

  const handleMouseMove = (e) => {
    const { left, width } = e.target.getBoundingClientRect();
    const positionX = e.clientX - left;
    const clampedPositionX = Math.max(0, Math.min(positionX, width)); // לוודא שהערך בין 0 לרוחב הפס
    const index = Math.floor((clampedPositionX / width) * img.length);
    setCurrentImage(index);
    setPositionX(clampedPositionX);
    setImageWidth(width);
  };

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-image" onMouseMove={handleMouseMove}>
          <img
            src={`http://localhost:3001${img[currentImage]}`}
            alt={`${name}-${currentImage}`}
            className="main-image"
          />
          {/* פס תחתון עם כיתוב */}
          <div className="image-preview-bar">
            <div
              className="image-preview-move"
              style={{
                left: `${(positionX / imageWidth) * 100}%`, // חישוב מיקום הריבוע הקטן
              }}
            />
            <span className="image-preview-text">
              {`תמונה ${currentImage + 1} מתוך ${img.length}`}
            </span>
          </div>
        </div>
        <div className="card-text">
          <h3 className="card-title">{name}</h3>
          <p className="card-category">קטגוריה: {category}</p>
          <p className="card-description">{description}</p>
          <button className="card-button">פרטים נוספים</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
