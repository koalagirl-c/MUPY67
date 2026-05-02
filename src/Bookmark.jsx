import { useState, useEffect } from "react";
import { db } from "./firebase";
import { auth } from "./firebase";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    query,
    where,
} from "firebase/firestore";
import toast from "react-hot-toast";

// บันทึกอนิเมะ
export async function addBookmark(anime) {
    const user = auth.currentUser;

    // เช็คว่ามีอยู่แล้วไหม
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
    });
    toast.success("✅ Added to Watchlist!");
}

// ลบ bookmark
export async function removeBookmark(id) {
    await deleteDoc(doc(db, "bookmarks", id));
    toast.error("🗑️ Removed from Watchlist!");
}

// ดึงรายการ bookmark ของ user
export async function getBookmarks() {
    const user = auth.currentUser;
    const q = query(collection(db, "bookmarks"), where("uid", "==", user.uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// หน้าแสดง Watchlist
function Bookmark() {
    const [list, setList] = useState([]);

    useEffect(() => {
        getBookmarks().then(setList);
    }, []);

    const handleDelete = async (id) => {
        await removeBookmark(id);
        setList(list.filter((item) => item.id !== id));
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>My Watchlist 🔖</h2>
            {list.length === 0 && <p>No bookmarks yet!</p>}
            {list.map((item) => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <img src={item.image} alt={item.title} width={50} />
                    <span>{item.title}</span>
                    <span>⭐ {item.score}</span>
                    <button onClick={() => handleDelete(item.id)}>Remove</button>
                </div>
            ))}
        </div>
    );
}

export default Bookmark;