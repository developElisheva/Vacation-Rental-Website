// import React, { useState, useEffect } from "react";
// import Card from "./Card.jsx"; // קומפוננטת כרטיס
// import { getAllApartments } from "../api.js"; // פונקציית API לשליפת הדירות

// export const Apartments = () => {
//     const [apartments, setApartments] = useState([]); // שמירת נתוני הדירות
//     const [loading, setLoading] = useState(true); // ניהול מצב טעינה

//     // שליפת נתונים מה-API בעת טעינת הקומפוננטה
//     useEffect(() => {
//         const fetchApartments = async () => {
//             try {
//                 const data = await getAllApartments(); // שליפת הדירות מה-API
//                 console.log("Data from API:", data.data); // בדוק מה הנתונים שמתקבלים
//                 setApartments(data.data); // שמירת הדירות בסטייט
//             } catch (error) {
//                 console.error("שגיאה בשליפת הדירות:", error);
//             } finally {
//                 setLoading(false); // סיום מצב הטעינה
//             }
//         };

//         fetchApartments(); // קריאה לפונקציה
//     }, []);

//     // בזמן טעינה, מציג הודעה
//     if (loading) {
//         return <h1 className="loading" >...טוען דירות</h1>;
//     }

//     return (
//         <div className="apartments-container">
//             {apartments.map((apartment) => (
//                 <Card
//                     key={apartment._id}
//                     name={apartment.name}
//                     description={apartment.description}
//                     img={Array.isArray(apartment.img) ? apartment.img : []} // וידוא שזה מערך
//                     category={apartment.category.name}
//                     apartmentDetails={apartment} // מעבירים את כל האובייקט לפרטים נוספים
//                 />
//             ))}
//         </div>
//     );
// };
import React from "react";
import Card from "./Card.jsx"; // קומפוננטת כרטיס

export const Apartments = ({ apartments, onEdit, onDelete, isAdvertiser }) => {
  return (
    <div className="apartments-container">
      {apartments.map((apartment) => (
        <Card
          key={apartment._id}
          id={apartment._id}
          name={apartment.name}
          description={apartment.description}
          img={Array.isArray(apartment.img) ? apartment.img : []} // וידוא שזה מערך
          category={apartment.category.name}
          apartmentDetails={apartment} // מעבירים את כל האובייקט לפרטים נוספים
          onEdit={onEdit}
          onDelete={onDelete}
          isAdvertiser={isAdvertiser} // מעבירים את המידע האם המשתמש הוא מפרסם
        />
      ))}
    </div>
  );
};
