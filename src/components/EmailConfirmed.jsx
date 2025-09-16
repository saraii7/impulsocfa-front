import { useEffect, useState } from "react";


export default function EmailConfirmed() {
  const [message, setMessage] = useState("Verificando tu cuenta...");

  useEffect(() => {
    const confirmarEmail = () => {
      try {
        // 🔹 Extraer hash de Supabase (access_token, refresh_token, etc.)
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");

        if (!accessToken) throw new Error("No se recibió token de Supabase");

        // 🔹 Guardar tokens directamente en localStorage
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);

        setMessage("✅ Cuenta confirmada. Redirigiendo...");
        setTimeout(() => {
          window.location.href = "http://localhost:5173/dashboard";
        }, 2000);

      } catch (err) {
        console.error(err);
        setMessage(`❌ Error: ${err.message}`);
      }
    };

    confirmarEmail();
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Confirmación de email</h2>
      <p>{message}</p>
    </div>
  );
}