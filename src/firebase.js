import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    // วางค่าจากหน้า Firebase Console ตรงนี้
    apiKey: "AIzaSyBMnEm0GQjVJqO7e8KOyl-cIcn5-8t2R1I",
    authDomain: "anime-watchlist-362e3.firebaseapp.com",
    projectId: "anime-watchlist-362e3",
    storageBucket: "anime-watchlist-362e3.firebasestorage.app",
    messagingSenderId: "977309395445",
    appId: "1:977309395445:web:ed16de08041a608425d8bc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();