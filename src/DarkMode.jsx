import { useState, useEffect } from "react";

function DarkMode() {
    const [dark, setDark] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    useEffect(() => {
        localStorage.setItem("darkMode", dark);
        if (dark) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [dark]);

    // Apply saved preference on first load
    useEffect(() => {
        const saved = localStorage.getItem("darkMode") === "true";
        if (saved) document.body.classList.add("dark");
    }, []);

    return (
        <button onClick={() => setDark(!dark)}>
            {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
    );
}

export default DarkMode;
