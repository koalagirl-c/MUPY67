import { useState, useEffect } from "react";

function DarkMode() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        document.body.style.background = dark ? "#1a1a1a" : "#ffffff";
        document.body.style.color = dark ? "#ffffff" : "#000000";
    }, [dark]);

    return (
        <button onClick={() => setDark(!dark)}>
            {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
    );
}

export default DarkMode;