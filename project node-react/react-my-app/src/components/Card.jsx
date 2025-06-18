// // import React, { useState } from "react";
// // import "./styles/Card.css";

// // const Card = ({ name, description, img, category, apartmentDetails }) => {
// //   const [currentImage, setCurrentImage] = useState(0);
// //   const [positionX, setPositionX] = useState(0);
// //   const [imageWidth, setImageWidth] = useState(0);

// //   const handleMouseMove = (e) => {
// //     const { left, width } = e.target.getBoundingClientRect();
// //     const positionX = e.clientX - left;
// //     const clampedPositionX = Math.max(0, Math.min(positionX, width)); // לוודא שהערך בין 0 לרוחב הפס
// //     const index = Math.floor((clampedPositionX / width) * img.length);
// //     setCurrentImage(index);
// //     setPositionX(clampedPositionX);
// //     setImageWidth(width);
// //   };
// //   return (
// //     <div className="card-container">
// //       <div className="card">
// //         <div className="card-image" onMouseMove={handleMouseMove}>
// //           <img
// //             src={`http://localhost:3001${img[currentImage]}`}
// //             alt={`${name}-${currentImage}`}
// //             className="main-image"
// //           />
// //           {/* פס תחתון עם כיתוב */}
// //           <div className="image-preview-bar">
// //             <div
// //               className="image-preview-move"
// //               style={{
// //                 left: `${(positionX / imageWidth) * 100}%`, // חישוב מיקום הריבוע הקטן
// //               }}
// //             />
// //             <span className="image-preview-text">
// //               {`תמונה ${currentImage + 1} מתוך ${img.length}`}
// //             </span>
// //           </div>
// //         </div>
// //         <div className="card-text">
// //           <h3 className="card-title">{name}</h3>
// //           <p className="card-category">קטגוריה: {category}</p>
// //           <p className="card-description">{description}</p>
// //           <button className="card-button">פרטים נוספים</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Card;
// import React, { useState } from "react";
// import { Edit, Delete } from "@mui/icons-material"; // אייקונים של עריכה ומחיקה
// import "./styles/Card.css";

// const Card = ({ name, description, img, category, apartmentDetails, onEdit, onDelete, isAdvertiser }) => {
//   const [currentImage, setCurrentImage] = useState(0);
//   const [positionX, setPositionX] = useState(0);
//   const [imageWidth, setImageWidth] = useState(0);

//   const handleMouseMove = (e) => {
//     const { left, width } = e.target.getBoundingClientRect();
//     const positionX = e.clientX - left;
//     const clampedPositionX = Math.max(0, Math.min(positionX, width)); // לוודא שהערך בין 0 לרוחב הפס
//     const index = Math.floor((clampedPositionX / width) * img.length);
//     setCurrentImage(index);
//     setPositionX(clampedPositionX);
//     setImageWidth(width);
//   };

//   return (
//     <div className="card-container">
//       <div className="card">
//         <div className="card-image" onMouseMove={handleMouseMove}>
//           <img
//             src={`http://localhost:3001${img[currentImage]}`}
//             alt={`${name}-${currentImage}`}
//             className="main-image"
//           />
//           <div className="image-preview-bar">
//             <div
//               className="image-preview-move"
//               style={{
//                 left: `${(positionX / imageWidth) * 100}%`, // חישוב מיקום הריבוע הקטן
//               }}
//             />
//             <span className="image-preview-text">
//               {`תמונה ${currentImage + 1} מתוך ${img.length}`}
//             </span>
//           </div>
//         </div>
//         <div className="card-text">
//           <h3 className="card-title">{name}</h3>
//           <p className="card-category">קטגוריה: {category}</p>
//           <p className="card-description">{description}</p>
//           <button className="card-button">פרטים נוספים</button>
//         </div>
        
//         {/* הצגת כפתורי עריכה ומחיקה רק אם המשתמש הוא מפרסם */}
//         {isAdvertiser && (
//           <div className="card-actions">
//             <button onClick={() => onEdit(apartmentDetails._id)} className="card-edit-btn">
//               <Edit /> {/* אייקון עריכה */}
//             </button>
//             <button onClick={() => onDelete(apartmentDetails._id)} className="card-delete-btn">
//               <Delete /> {/* אייקון מחיקה */}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Card;
import { useNavigate } from "react-router";
import React, { useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { EditOutlined, DeleteOutline } from "@mui/icons-material"; // אייקונים מעודכנים לעריכה ומחיקה
import "./styles/Card.css";

const Card = ({ id ,name, description, img, category, apartmentDetails, onEdit, onDelete, isAdvertiser }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [positionX, setPositionX] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const navigate = useNavigate();

const click=(id) => {
  navigate(`/Details/${id}`)
}
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
          <button className="card-button" onClick={()=>click(id)}>פרטים נוספים</button>
        </div>
        
        {/* הצגת כפתורי עריכה ומחיקה רק אם המשתמש הוא מפרסם */}
        {isAdvertiser && (
          <div className="card-actions">
            <button onClick={() => onEdit(apartmentDetails._id)} className="card-edit-btn">
              <EditOutlined /> {/* אייקון עריכה מעודכן */}
            </button>
            <button onClick={() => onDelete(apartmentDetails._id)} className="card-delete-btn">
              <DeleteForeverIcon /> {/* אייקון מחיקה מעודכן */}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
