import { useParams } from 'react-router-dom';
import { getAllApartments } from '../api';
import React, { useState, useEffect } from 'react';
import { Apartments } from './Apartments';
export const Search4 = () => {
    const { filter } = useParams();
    const [apartment, setApartments] = useState([]); // שמירת הקטגוריות

    useEffect(() => {
        const fetchApartment = async () => {
            try {
                const response = await getAllApartments();
                const result = response.data;
                console.log('Result from API:', result);
                setApartments(result);
            } catch (error) {
                console.log('Error fetching apartment:', error);
            }
        };
        fetchApartment();
    }, []);
    let a
    if (filter == 'all')
        a = apartment
    else
        a = apartment.filter(x => x.additives.find(o => o == "בריכה"))
    console.log(a);

    return <>
        <Apartments apartments={a}></Apartments >
    </>
}