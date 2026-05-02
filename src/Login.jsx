import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";

function Login() {
    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>🎌 Anime Watchlist</h1>
            <p>Sign in to save your watchlist</p>
            <button onClick={handleLogin}>
                Sign in with Google
            </button>
        </div>
    );
}

export default Login;