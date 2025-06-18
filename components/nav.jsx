import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { getAllCategory } from '../api';
import './my.css';
import { useNavigate } from "react-router";
export const Nav = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBeds, setSelectedBeds] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null); // למעקב אחרי מיקום התפריט
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategory();
                const result = response.categories;
                console.log('Result from API:', result);
                const newData = result.map(item => ({
                    id: item._id,
                    label: item.name,
                }));
                setCategories(newData);
            } catch (error) {
                console.log('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const [beds] = useState([
        { id: 2, label: 'זוגי' },
        { id: 8, label: 'משפחתי' },
        { id: 20, label: 'קבוצתי' },
    ]);

    const Search = () => {
        console.log(selectedCategory);
        console.log(selectedBeds);
        if (selectedCategory && selectedBeds)
            navigate(`/Search/${selectedCategory.id}/${selectedBeds.id}`);
        else if (selectedCategory)
            navigate(`/Search/${selectedCategory.id}`);
        else if (selectedBeds)
            navigate(`/Search/null/${selectedBeds.id}`);
        else
            navigate(`/filter/${'all'}`);
    };

    const search = (id) => {
        navigate(`/Search/${id}`);
    };
    const openLogin = () => {
        navigate(`/login`);
    }
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget); // פותח את התפריט כאשר לוחצים על הכפתור
    };

    const handleMenuClose = () => {
        setAnchorEl(null); // סוגר את התפריט
    };

    return (
        <>
            <div id="navA">
                <div id="logo">
                    <img src={`${process.env.PUBLIC_URL}/צילום מסך 2024-12-17 010735.jpg`} alt="Logo" />
                </div>
                <ComboBox
                    name="חפש קטגוריה"
                    value={categories}
                    selectedValue={selectedCategory}
                    onChange={(event, newValue) => setSelectedCategory(newValue)}
                />
                <ComboBox
                    name="חפש סוג"
                    value={beds}
                    selectedValue={selectedBeds}
                    onChange={(event, newValue) => setSelectedBeds(newValue)}
                />
                <Button
                    variant="outlined"
                    sx={{
                        borderColor: 'white',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'white',
                            color: 'blue',
                        },
                    }}
                    onClick={Search}
                >
                    מצא לי צימר
                </Button>
                <Button
                    className="publish-button"
                    variant="outlined"
                    sx={{
                        borderColor: 'white',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'white',
                            color: 'blue',
                        },
                    }}
                    onClick={openLogin}
                >
                    פרסמו באתר
                </Button>
                <Button
                    className="publish-button"
                    variant="outlined"
                    sx={{
                        borderColor: 'white',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'white',
                            color: 'blue',
                        },
                    }}
                    onClick={handleMenuOpen} // פתיחת התפריט
                >
                    לאזור האישי
                </Button>
                {/* תפריט חדש עם אפשרויות */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)} // בודק אם התפריט פתוח
                    onClose={handleMenuClose} // סגירת התפריט
                >
                    <MenuItem onClick={() => { navigate('/my-apartments'); handleMenuClose(); }}>דירות שלי</MenuItem>
                    <MenuItem onClick={() => { navigate('/personal-details'); handleMenuClose(); }}>פרטים אישיים</MenuItem>
                </Menu>
                <div id="profile"></div>
            </div>
            <div id="navB">
                <button className="nav-button" onClick={() => search("6762d75015802100f9e79999")}>צימרים</button>
                <button className="nav-button" onClick={() => search("6762d76115802100f9e7999f")}>לופטים</button>
                <button className="nav-button" onClick={() => search("6762d75815802100f9e7999b")}>מלונות</button>
            </div>
        </>
    );
};

export default Nav;

export const ComboBox = ({ name, value, selectedValue, onChange }) => {
    return (
        <Autocomplete
            disablePortal
            className="combo-box"
            id="size-small-standard"
            size="small"
            options={value || []}
            value={selectedValue}
            onChange={onChange}
            sx={{
                width: 200,
                '& .MuiInputBase-input': {
                    color: 'white',
                },
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                },
                '& .MuiFormLabel-root': {
                    color: 'white',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: 'white',
                },
            }}
            renderInput={(params) => <TextField {...params} label={name} />}
        />
    );
};
