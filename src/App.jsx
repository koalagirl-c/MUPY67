import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from "./Login";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  if (!user) return <Login />;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎌 Anime Watchlist</h1>
      <p>Welcome, {user.displayName}!</p>
      <button onClick={() => signOut(auth)}>
        Sign Out
      </button>
    </div>
  );
}

export default App;