import { useState, useEffect } from "react";

function DarkMode() {
    const [dark, setDark] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    useEffect(() => {
        localStorage.setItem("darkMode", dark);
        document.body.style.background = dark ? "#1a1a1a" : "#ffffff";
        document.body.style.color = dark ? "#ffffff" : "#000000";
    }, [dark]);

    // Apply saved preference on first load
    useEffect(() => {
        const saved = localStorage.getItem("darkMode") === "true";
        document.body.style.background = saved ? "#1a1a1a" : "#ffffff";
        document.body.style.color = saved ? "#ffffff" : "#000000";
    }, []);

    return (
        <button onClick={() => setDark(!dark)}>
            {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
    );
}

export default DarkMode;
