import { useEffect, useState } from "react";

export default function EmailConfirmed() {
  const [message, setMessage] = useState("Verificando tu cuenta...");

  useEffect(() => {
    const confirmarEmail = async () => {
      try {
        // 🔹 Extraer hash de Supabase (access_token, refresh_token, etc.)
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");

        if (!accessToken) throw new Error("No se recibió token de Supabase");

        // 🔹 Enviar al backend
        const res = await fetch("http://localhost:3000/api/auth/confirm-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token: accessToken, refresh_token: refreshToken }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error al generar sesión");

        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);

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