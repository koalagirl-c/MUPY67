import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from "./Login";
import Bookmark, { addBookmark } from "./Bookmark";
import DarkMode from "./DarkMode";
import { Toaster } from "react-hot-toast";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");

  const [anime, setAnime] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    fetchTopAnime();

    return () => unsub();
  }, []);

  // Top anime when page opens
  const fetchTopAnime = async () => {
    setLoading(true);

    const res = await fetch("https://api.jikan.moe/v4/top/anime");
    const data = await res.json();

    setAnime(data.data);
    setLoading(false);
  };

  // Search anime
  const searchAnime = async () => {
    if (search.trim() === "") {
      fetchTopAnime();
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    setLoading(true);
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}`);
    const data = await res.json();
    setAnime(data.data);
    setLoading(false);
  };

  if (!user) return <Login />;

  return (
    <div style={{ padding: "20px" }}>
      <Toaster position="top-right" />

      {/* Header */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
        <h1>🎌 Anime Watchlist</h1>

        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("bookmark")}>My Watchlist</button>
        <button onClick={() => signOut(auth)}>Sign Out</button>

        <span>👤 {user.displayName}</span>

        <DarkMode />
      </div>

      {/* HOME PAGE */}
      {page === "home" && (
        <div>
          {/* Search */}
          <div style={{ margin: "20px 0" }}>
            <input
              type="text"
              placeholder="Search anime..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "8px",
                width: "250px",
                marginRight: "10px"
              }}
            />

            <button onClick={searchAnime}>Search</button>
          </div>

          {!isSearching && <h2 style={{ margin: "20px 0 10px" }}>⭐ Top Anime (By Rating)</h2>}
          {/* Loading */}
          {loading && <p>Loading...</p>}

          {/* Anime Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "15px"
            }}
          >
            {anime.map((item) => (
              <div
                key={item.mal_id}
                style={{
                  border: "1px solid gray",
                  borderRadius: "10px",
                  padding: "10px"
                }}
              >
                <img
                  src={item.images.jpg.image_url}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "10px"
                  }}
                />

                <h3>{item.title}</h3>

                <p>⭐ {item.score || "N/A"}</p>

                <button
                  style={{ width: "100%" }}
                  onClick={() => addBookmark(item)}
                >
                  🔖 Add to Watchlist
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOOKMARK PAGE */}
      {page === "bookmark" && <Bookmark />}
    </div>
  );
}

export default App;