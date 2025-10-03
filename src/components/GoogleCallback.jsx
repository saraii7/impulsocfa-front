import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleCallback } from "../services/auth.service";

export default function GoogleCallback() {
    const [message, setMessage] = useState("Iniciando sesión con Google...");
    const navigate = useNavigate();

    useEffect(() => {
        const handleGoogleLogin = async () => {
            try {
                const hash = window.location.hash.substring(1);
                const params = new URLSearchParams(hash);

                const accessToken = params.get("access_token");
                const refreshToken = params.get("refresh_token");

                if (!accessToken) throw new Error("No se recibió token de Google");

                const data = await googleCallback(accessToken, refreshToken);

                setMessage("✅ Sesión iniciada. Redirigiendo...");

                setTimeout(() => {
                    // Redirigir según si es usuario nuevo o existente
                    if (data.isNewUser) {
                        window.location.href =  import.meta.env.VITE_REDIRECT_NEWUSER;
                    } else {
                        window.location.href = import.meta.env.VITE_REDIRECT_EXISTINGUSER;
                    }
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
