import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { googleCallback } from "../services/auth.service";

export default function GoogleCallback() {
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

        // Redirigir automáticamente
        if (data.isNewUser) {
          navigate("/mostrarllavemaestra");
        } else {
          navigate("/home");
        }
      } catch (err) {
        // Mostrar solo un warning simple
        alert(`Error al iniciar sesión: ${err.message}`);
        navigate("/login"); // opcional: volver al login
      }
    };

    handleGoogleLogin();
  }, [navigate]);

  return null; // No renderiza nada
}
