import { useParams } from 'react-router-dom';
import { getApartmentsByCity, getAllCity } from '../api';
import React, { useState, useEffect } from 'react';
import { Apartments } from './Apartments';
//סינון לפי שם העיר
export const Search1 = () => {
    const { name } = useParams();
    const [apartments, setApartments] = useState([]);
    const [cities, setCities] = useState([]);
    console.log(name);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await getAllCity();
                const result = response.data.cities; // ודא שאתה ניגש לנתונים הנכונים
                console.log('Result from APIaaaaaa:', result);
                setCities(result);
            } catch (error) {
                console.log('Error fetching cities:', error);
            }
        };
        fetchCities();
    }, []);

    useEffect(() => {
        const idCity = cities.find(x => x.name === name);
        console.log(idCity);

        if (idCity) {
            const fetchApartments = async () => {
                try {
                    const response = await getApartmentsByCity(idCity._id);
                    const result = response.data.apartments; // ודא שאתה ניגש לנתונים הנכונים
                    console.log('Result from APIaaaaaa:', result);
                    setApartments(result);
                } catch (error) {
                    console.log('Error fetching apartments:', error);
                }
            };
            fetchApartments();
        }
    }, [cities, name]);
    return (
        <div>
            <Apartments apartments={apartments} />
        </div>
    );
}
