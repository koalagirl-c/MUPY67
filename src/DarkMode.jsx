import { useState, useEffect } from "react";

function DarkMode() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        if (dark) {
            document.body.style.background = "#1a1a1a";
            document.body.style.color = "#ffffff";
        } else {
            document.body.style.background = "#ffffff";
            document.body.style.color = "#000000";
        }
    }, [dark]);

    return (
        <button onClick={() => setDark(!dark)}>
            {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
    );
}

export default DarkMode;