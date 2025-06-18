import { Apartments } from './Apartments';
import { RowAndColumnSpacing } from './page1';
import './styles/Home.css';
import { getAllApartments } from '../api'
import React, { useState, useEffect } from 'react';

export const Home = () => {
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
    return (
        <>
            <img src={`${process.env.PUBLIC_URL}/691.jpg`} alt="Description" id="pic" />
            <div id="RowAndColumnSpacing">
                <RowAndColumnSpacing></RowAndColumnSpacing>
            </div>
            <Apartments apartments={apartment}></Apartments>
        </>
    );
}
