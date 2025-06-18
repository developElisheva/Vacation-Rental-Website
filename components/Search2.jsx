import { useParams } from 'react-router-dom';
import { getApartmentsByCategory, getApartmentsByBeds } from '../api'
import React, { useState, useEffect } from 'react';
import { Apartments } from './Apartments';
//סינון לפי מספר מיטות וקטגוריה
export const Search2 = () => {
    const { idCategory, beds } = useParams();
    const [apartments, setApartments] = useState([]);
    const [apartmentsBed, setApartmentsBed] = useState([]);

    useEffect(() => {
        const fetchApartment = async () => {
            try {
                const response = await getApartmentsByCategory(idCategory);
                const result = response.data;
                console.log('Result from API:', result);
                setApartments(result);
            } catch (error) {
                console.log('Error fetching apartment:', error);
            }
        };
        fetchApartment();
    }, [idCategory]);

    useEffect(() => {
        const fetchApartment = async () => {
            try {
                const response = await getApartmentsByBeds(beds);
                const result = response.data;
                console.log('Result from API:', result);
                setApartmentsBed(result);
            } catch (error) {
                console.log('Error fetching apartment:', error);
            }
        };
        fetchApartment();
    }, [beds]);
    let result
    if (beds && idCategory)
        result = apartments.filter(x => apartmentsBed.includes(x));
    else if (beds)
        result = apartmentsBed
    else if (idCategory)
        result = apartments

    return <>
        {result.length > 0 ? (
            <Apartments apartments={result} />
        ) : (
            <div>אין דירות זמינות</div>
        )}    </>
}
