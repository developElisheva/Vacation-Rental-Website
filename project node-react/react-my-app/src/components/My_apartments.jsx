// import React, { useEffect, useState } from "react";
// import "./styles/My_apartments.css";
// import { getApartmentsByAdvertiser, deleteApartment } from "../api";
// import { NavLink, useNavigate, useParams } from "react-router";
// import Card from "./Card";
// import {Apartments} from "./Apartments";

// export const My_apartments = () => {
//         const { id } = useParams();
//     const [list, setList] = useState([]); // סטייט של רשימת הדירות
//     const navigate = useNavigate();
//      useEffect(() => {
//             const fetchApartment = async () => {
//                 try {
//                     const response = await getApartmentsByAdvertiser(id);
//                     const result = response.data;
//                     console.log('Result from API:', result);
//                     setList(result);
//                 } catch (error) {
//                     console.log('Error fetching apartment:', error);
//                 }
//             };
//             fetchApartment();
//         }, [id]);
//     // פונקציה למחיקת דירה
//     const handleDelete = async (id) => {
//         try {
//             // console.log("Deleting apartment with ID:", id, "and advertiser ID:", id1);
//             // const response = await deleteApartment(id, id1); // קריאה למחיקה
//             // console.log("Response from server:", response);

//             // קריאה מחדש כדי לעדכן את הרשימה אחרי מחיקה
//             // fetchApartments();
//         } catch (err) {
//             console.error("Error deleting apartment:", err);
//         }
//     };
    
//     // פונקציה לעריכת דירה
//     const handleEdit = (id) => {
//         // navigate(`/edit/${id}/${id1}`);
//     };

//     const returnHome = () => {
//         navigate("/Home");
//     };
//     const add=()=>{
//         navigate('/My_apartments')  
//     }

//     return <>
//     <Apartments Apartment={list}></Apartments>
//     </>
// };

// export default My_apartments;
import React, { useEffect, useState } from "react";
import { getApartmentsByAdvertiser, deleteApartment } from "../api";
import { useNavigate, useParams } from "react-router";
import { Apartments } from "./Apartments";

export const My_apartments = () => {
  const { id } = useParams();
  const [list, setList] = useState([]); // סטייט של רשימת הדירות
  const [isAdvertiser, setIsAdvertiser] = useState(false); // ניהול מצב של אם המשתמש הוא מפרסם
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const response = await getApartmentsByAdvertiser(id);
        const result = response.data;
        console.log('Result from API:', result);
        setList(result);
        
        // מניחים שישנה אפשרות לבדוק אם המשתמש הוא מפרסם (כמו חיבור לאותנטיקציה)
        setIsAdvertiser(true);  // לשנות בהתאם למידע של המשתמש
      } catch (error) {
        console.log('Error fetching apartment:', error);
      }
    };
    fetchApartment();
  }, [id]);

  // פונקציה למחיקת דירה
  const handleDelete = async (id) => {
    try {
      await deleteApartment(id); // קריאה למחיקה
      setList(list.filter(apartment => apartment._id !== id)); // עדכון הרשימה אחרי מחיקה
    } catch (err) {
      console.error("Error deleting apartment:", err);
    }
  };

  // פונקציה לעריכת דירה
  const handleEdit = (id1) => {
    navigate(`/edit/${id1}/${id}`);
  };

  return (
    <>
      <Apartments 
        apartments={list} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
        isAdvertiser={isAdvertiser} // העברת המידע אם המשתמש הוא מפרסם
      />
    </>
  );
};

export default My_apartments;
