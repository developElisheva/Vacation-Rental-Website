import React from "react";
import { Facebook, Height, Instagram, WhatsApp } from "@mui/icons-material"; // ייבוא אייקונים
import { height, margin } from "@mui/system";

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <p style={styles.text}>Created by Elisheva Cohen Bloch & Dasi Moreh</p>
                <div style={styles.icons}>
                    <a href="#" style={styles.iconLink}>
                        <Facebook />
                    </a>
                    <a href="#" style={styles.iconLink}>
                        <Instagram />
                    </a>
                    <a href="#" style={styles.iconLink}>
                        <WhatsApp />
                    </a>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: " rgb(66, 66, 199)",
        color: "#ffffff",
        padding: "10px 0",
        textAlign: "center",
    },
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
    },
    text: {
        margin: 0,
        fontSize: "14px",
    },
    icons: {
        display: "flex",
        gap: "15px",
    },
    iconLink: {
        color: "#ffffff",
        fontSize: "18px",
        // textDecoration: "none",
    },
};

export default Footer;