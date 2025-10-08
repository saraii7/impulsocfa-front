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
          window.location.href = import.meta.env.VITE_REDIRECT_AFTER_CONFIRM;
        }, 2000);

      } catch (err) {
        console.error(err);
        setMessage(`❌ Error: ${err.message}`);
      }
    };

    confirmarEmail();
  }, []);

  return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 relative overflow-hidden">
      {/* Patrón de fondo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-20" />
      
      {/* Esferas de luz animadas */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 bg-slate-900/50 backdrop-blur-xl shadow-[0_0_40px_rgba(139,92,246,0.3)] rounded-2xl p-8 w-full max-w-md text-center border border-violet-500/30">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent mb-6 drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]">
          Confirmación de Email
        </h2>
        <p
          className={`text-lg ${
            message.startsWith("✅")
              ? "text-green-400"
              : message.startsWith("❌")
              ? "text-red-400"
              : "text-slate-300"
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
}