import { useParams } from 'react-router-dom';
import { getApartmentsByPrice, getApartmentsByPriceLarger } from '../api';
import React, { useState, useEffect } from 'react';
import { Apartments } from './Apartments';

export const Search3 = () => {
    const { price, type } = useParams();
    const [apartment, setApartments] = useState([]); // שמירת הקטגוריות
    let getApartment
    if (type == 1)
        getApartment = getApartmentsByPriceLarger
    else
        getApartment = getApartmentsByPrice
    useEffect(() => {
        const fetchApartment = async () => {
            try {
                const response = await getApartment(price);
                const result = response.data;
                console.log('Result from API:', result);
                setApartments(result);
            } catch (error) {
                console.log('Error fetching categories:', error);
            }
        };
        fetchApartment();
    }, [price]);
    return <>
        <Apartments apartments={apartment}></Apartments>
    </>
}