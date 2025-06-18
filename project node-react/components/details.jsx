import React from 'react';
import { useParams } from 'react-router-dom';
import { getApartmentById } from '../api';
import { useEffect, useState } from "react";

export const Details = () => {
    const { id } = useParams(); // חילוץ ה-ID מה-URL
    const [list, setList] = useState(null); // אתחול כ-null כדי לציין שאין נתונים עדיין
    const [error, setError] = useState(null); // אופציונלי: לטפל בשגיאות

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getApartmentById(id);
                console.log(response);
                setList(response.data);
            } catch (err) {
                console.error(err);
                setError(err); // אופציונלי: שמירת השגיאה
            }
        };
        fetchData();
    }, [id]);

    if (error) {
        return <p>שגיאה בטעינת המידע: {error.message}</p>;
    }

    if (!list) {
        return <p>טוען נתונים...</p>;
    }

    return (
        <>
            <p>{list.apartment?.name || 'אין שם לדירה'}</p>
        </>
    );
};