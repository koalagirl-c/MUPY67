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

// บันทึกอนิเมะ
export async function addBookmark(anime) {
    const user = auth.currentUser;
    await addDoc(collection(db, "bookmarks"), {
        uid: user.uid,
        malId: anime.mal_id,
        title: anime.title,
        image: anime.images.jpg.image_url,
        score: anime.score,
    });
}

// ดึงรายการ bookmark ของ user
export async function getBookmarks() {
    const user = auth.currentUser;
    const q = query(collection(db, "bookmarks"), where("uid", "==", user.uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ลบ bookmark
export async function removeBookmark(id) {
    await deleteDoc(doc(db, "bookmarks", id));
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