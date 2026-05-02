import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from "./Login";
import Bookmark from "./Bookmark";
import DarkMode from "./DarkMode";
import { Toaster } from "react-hot-toast";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  if (!user) return <Login />;

  return (
    <div style={{ padding: "20px" }}>
      <Toaster position="top-right" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px" }}>
        <h1>🎌 Anime Watchlist</h1>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("bookmark")}>My Watchlist</button>
          <button onClick={() => signOut(auth)}>Sign Out</button>
          <span>👤 {user.displayName}</span>
          <DarkMode />
        </div>
      </div>

      {page === "home" && <p>Search feature coming soon...</p>}
      {page === "bookmark" && <Bookmark />}
    </div>
  );
}

export default App;