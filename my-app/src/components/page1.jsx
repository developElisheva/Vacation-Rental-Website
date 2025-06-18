import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme, backgroundImage }) => ({
    backgroundImage: `url(${backgroundImage})`, // Set backgroundImage as a style property
    backgroundSize: 'cover',
    ...theme.typography.body2,
    fontSize: '1.5rem',
    padding: theme.spacing(1),
    height: '200px',
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export function BasicGrid() {
    const navigate = useNavigate();
    const handleClick = (value, type = null) => {
        if (typeof value === 'number') {
            navigate(`/price/${value}/${type}`);
        } else {
            navigate(`/filter/${value}`);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Item backgroundImage={`${process.env.PUBLIC_URL}/187m.jpg`} onClick={() => handleClick('all')}>צימרים פנויים</Item>
                </Grid>
                <Grid item xs={4}>
                    <Item backgroundImage={`${process.env.PUBLIC_URL}/unnamed.png`} onClick={() => handleClick('בריכה')}>צימר עם בריכה</Item>
                </Grid>
                <Grid item xs={4}>
                    <Item backgroundImage={`${process.env.PUBLIC_URL}/187m.jpg`} onClick={() => handleClick(1500, 1)}> צימרים יוקרתיים החל מ-1,000</Item>
                </Grid>
                <Grid item xs={8}>
                    <Item backgroundImage={`${process.env.PUBLIC_URL}/187m.jpg`} onClick={() => handleClick(1500, 0)}>598 צימרים מתחייבים למחיר הטוב ביותר</Item>
                </Grid>
            </Grid>
        </Box>
    );
}

const Item1 = styled(Paper)(({ theme, backgroundImage }) => ({
    backgroundColor: '#fff',
    backgroundImage: `url(${backgroundImage})`, // הוספת תמונת הרקע
    backgroundSize: 'cover', // כדי למלא את כל האזור
    ...theme.typography.body2,
    textAlign: 'center',
    fontSize: '2rem', // או גודל אחר שתרצה
    fontWeight: 'bold', // הוספת הדגשה
    backdropFilter: 'blur(5px)', // טשטוש רקע
    margin: theme.spacing(1.175), // הוספת רווח סביב כל ריבוע
    color: theme.palette.text.primary, // צבע כהה יותר מתוך הפלטה
    height: '130px', // הגדרת גובה
    display: 'flex', // הוספת flex
    alignItems: 'center', // מרכז את התוכן אנכית
    justifyContent: 'center', // מרכז את התוכן אופקית
    ...theme.applyStyles('dark', {
        backgroדundColor: '#1A2027',
    }),
}));

export function RowAndColumnSpacing() {
    const navigate = useNavigate();
    const handleClick = (destination) => {
        navigate(`/searchh/${destination}`);
    };
    return (
        <Box sx={{ flexGrow: 1, borderRadius: '8px', padding: '16px', width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="flex-start">
                <Grid item xs={6}>
                    <BasicGrid></BasicGrid>
                </Grid>
                <Grid item1 xs={6}>
                    <Item1
                        backgroundImage={`${process.env.PUBLIC_URL}/צפון.jpg`}
                        onClick={() => handleClick("טבריה")}>
                        צימרים בטבריה
                    </Item1>
                    <Item1
                        backgroundImage={`${process.env.PUBLIC_URL}/מרכז.jpg`}
                        onClick={() => handleClick("תל אביב")}>
                        צימרים בתל אביב
                    </Item1>
                    <Item1
                        backgroundImage={`${process.env.PUBLIC_URL}/דרום.jpg`}
                        onClick={() => handleClick("אילת")}>
                        צימרים באילת
                    </Item1>
                </Grid>
            </Grid>
        </Box>
    );
}
