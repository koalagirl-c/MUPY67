import { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc,
    query,
    where,
} from "firebase/firestore";
import toast from "react-hot-toast";

const STATUS_OPTIONS = ["Plan to Watch", "Watching", "Already Watched", "Completed", "Dropped"];

const STATUS_COLORS = {
    "Plan to Watch": "#6c757d",
    "Watching": "#0d6efd",
    "Already Watched": "#6f42c1",
    "Completed": "#198754",
    "Dropped": "#dc3545",
};

// Add anime to watchlist
export async function addBookmark(anime) {
    const user = auth.currentUser;

    // Check if already bookmarked
    const q = query(
        collection(db, "bookmarks"),
        where("uid", "==", user.uid),
        where("malId", "==", anime.mal_id)
    );
    const existing = await getDocs(q);

    if (!existing.empty) {
        toast("⚠️ Already in your Watchlist!", { icon: "📋" });
        return;
    }

    await addDoc(collection(db, "bookmarks"), {
        uid: user.uid,
        malId: anime.mal_id,
        title: anime.title,
        image: anime.images.jpg.image_url,
        score: anime.score,
        status: "Plan to Watch",   // default status
    });
    toast.success("✅ Added to Watchlist!");
}

// Remove anime from watchlist
export async function removeBookmark(id) {
    await deleteDoc(doc(db, "bookmarks", id));
    toast.error("🗑️ Removed from Watchlist!");
}

// Fetch user's bookmarks
export async function getBookmarks() {
    const user = auth.currentUser;
    const q = query(collection(db, "bookmarks"), where("uid", "==", user.uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Update status of a bookmark
export async function updateBookmarkStatus(id, newStatus) {
    await updateDoc(doc(db, "bookmarks", id), { status: newStatus });
    toast.success(`📝 Status updated to "${newStatus}"!`);
}

// Watchlist page component
function Bookmark() {
    const [list, setList] = useState([]);

    useEffect(() => {
        getBookmarks().then(setList);
    }, []);

    const handleDelete = async (id) => {
        await removeBookmark(id);
        setList((prev) => prev.filter((item) => item.id !== id));
    };

    const handleStatusChange = async (id, newStatus) => {
        await updateBookmarkStatus(id, newStatus);
        setList((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, status: newStatus } : item
            )
        );
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>My Watchlist 🔖</h2>

            {list.length === 0 && <p>No bookmarks yet! Go add some anime.</p>}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "16px",
                    marginTop: "16px",
                }}
            >
                {list.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            padding: "12px",
                            display: "flex",
                            gap: "12px",
                            alignItems: "flex-start",
                        }}
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            style={{
                                width: "60px",
                                height: "80px",
                                objectFit: "cover",
                                borderRadius: "6px",
                                flexShrink: 0,
                            }}
                        />

                        <div style={{ flex: 1 }}>
                            <p style={{ fontWeight: "bold", marginBottom: "4px" }}>
                                {item.title}
                            </p>
                            <p style={{ fontSize: "13px", marginBottom: "8px" }}>
                                ⭐ {item.score || "N/A"}
                            </p>

                            {/* Status Badge */}
                            <span
                                style={{
                                    display: "inline-block",
                                    padding: "2px 10px",
                                    borderRadius: "999px",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    color: "#fff",
                                    backgroundColor: STATUS_COLORS[item.status] || "#6c757d",
                                    marginBottom: "8px",
                                }}
                            >
                                {item.status || "Plan to Watch"}
                            </span>

                            {/* Status Dropdown */}
                            <select
                                value={item.status || "Plan to Watch"}
                                onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                style={{
                                    display: "block",
                                    width: "100%",
                                    padding: "4px 6px",
                                    borderRadius: "6px",
                                    border: "1px solid #ccc",
                                    fontSize: "13px",
                                    marginBottom: "8px",
                                    cursor: "pointer",
                                    background: "inherit",
                                    color: "inherit",
                                }}
                            >
                                {STATUS_OPTIONS.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>

                            <button
                                onClick={() => handleDelete(item.id)}
                                style={{
                                    width: "100%",
                                    padding: "4px 8px",
                                    borderRadius: "6px",
                                    border: "1px solid #dc3545",
                                    color: "#dc3545",
                                    background: "transparent",
                                    cursor: "pointer",
                                    fontSize: "13px",
                                }}
                            >
                                🗑️ Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Bookmark;
