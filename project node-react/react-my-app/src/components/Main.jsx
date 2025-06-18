import React from 'react';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import { BrowserRouter } from "react-router-dom";
import { Routing } from "./Routing.jsx";

export const Main = () => {
    return (
        <BrowserRouter>
            <div style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}>
                <header>
                    <Nav />
                </header>
                <main style={{ flex: 1 }}>
                    <Routing />
                </main>
                
                    {/* <Footer /> */}
            </div>
        </BrowserRouter>
    );
};
