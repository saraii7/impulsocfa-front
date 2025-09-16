import { useEffect, useState } from "react";
import { googleCallback } from "../services/auth.service";

export default function GoogleCallback() {
    const [message, setMessage] = useState("Iniciando sesión con Google...");

    useEffect(() => {
        const handleGoogleLogin = async () => {
            try {
                const hash = window.location.hash.substring(1);
                const params = new URLSearchParams(hash);

                const accessToken = params.get("access_token");
                const refreshToken = params.get("refresh_token");

                if (!accessToken) throw new Error("No se recibió token de Google");

                await googleCallback(accessToken, refreshToken);

                setMessage("✅ Sesión iniciada con Google. Redirigiendo...");
                setTimeout(() => {
                    window.location.href = "http://localhost:5173/dashboard";
                }, 2000);
            } catch (err) {
                console.error(err);
                setMessage(`❌ Error: ${err.message}`);
            }
        };

        handleGoogleLogin();
    }, []);

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h2>Login con Google</h2>
            <p>{message}</p>
        </div>
    );
}
