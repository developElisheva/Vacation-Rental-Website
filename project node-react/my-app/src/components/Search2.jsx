import { useParams } from 'react-router-dom';
import { getApartmentsByCategory, getApartmentsByBeds } from '../api'
import React, { useState, useEffect } from 'react';
import { Apartments } from './Apartments';
//סינון לפי מספר מיטות וקטגוריה
export const Search2 = () => {
    const { idCategory, beds } = useParams(); // חיבור לפרמטרים של ה-URL
    const [apartments, setApartments] = useState([]); // דירות לפי קטגוריה
    const [apartmentsBed, setApartmentsBed] = useState([]); // דירות לפי מיטות

    // קריאה ל-API לקבלת דירות לפי קטגוריה
    useEffect(() => {
        if (idCategory!=0) { // ביצוע קריאה רק אם יש idCategory
            const fetchApartment = async () => {
                try {
                    const response = await getApartmentsByCategory(idCategory);
                    const result = response.data;
                    console.log('Result from API (Category):', result);
                    setApartments(result);
                } catch (error) {
                    console.log('Error fetching apartments by category:', error);
                }
            };
            fetchApartment();
        }
    }, [idCategory]);

    // קריאה ל-API לקבלת דירות לפי מספר מיטות
    useEffect(() => {
        if (beds) { // ביצוע קריאה רק אם יש beds
            const fetchApartment = async () => {
                try {
                    const response = await getApartmentsByBeds(beds);
                    const result = response;
                    console.log('Result from API (Beds):', result.data);
                    setApartmentsBed(result.data);
                } catch (error) {
                    console.log('Error fetching apartments by beds:', error);
                }
            };
            fetchApartment();
        }
    }, [beds]);

    // תוצאה סופית של הדירות על פי הקטגוריה או המיטות
    let result;
    if (idCategory!=0 && beds) {
        // אם יש גם קטגוריה וגם מיטות, ממזגים את הדירות המתאימות לשני הקריטריונים
        result = apartments.filter(apartment =>
            apartmentsBed.some(bedApartment => bedApartment.id === apartment.id)
        );
            } else if (beds) {
        // אם יש רק מיטות, הצג את הדירות לפי מיטות
        result = apartmentsBed;
    } else if (idCategory) {
        // אם יש רק קטגוריה, הצג את הדירות לפי קטגוריה
        result = apartments;
    }

    // החזרת התוצאה או הודעה אם אין דירות זמינות
    return (
        <>
            {result && result.length > 0 ? (
                <Apartments apartments={result} />
            ) : (
                <div>אין דירות זמינות</div>
            )}
        </>
    );
};
