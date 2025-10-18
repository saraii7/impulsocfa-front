import { supabase } from "../../supabaseClient";
import toast from "react-hot-toast";

export default function GoogleRegistrarseButton() {
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: import.meta.env.VITE_GOOGLE_REDIRECT, // la ruta a la que vuelve
      },
    });

    if (error) {
      console.error("Error en login con Google:", error.message);
      toast.error("Error al iniciar sesión con Google 😕", {
        style: {
          background: "#1e1e2f",
          color: "#e2e8f0",
          border: "1px solid rgba(139,92,246,0.4)",
          borderRadius: "12px",
          padding: "12px 16px",
        },
        iconTheme: {
          primary: "#a78bfa",
          secondary: "#1e1e2f",
        },
      });
      return;
    }

    toast.loading("Redirigiendo a Google...", {
      style: {
        background: "#1e1e2f",
        color: "#e2e8f0",
        border: "1px solid rgba(139,92,246,0.4)",
        borderRadius: "12px",
        padding: "12px 16px",
      },
    });
  };

  return (
    <button
      onClick={loginWithGoogle}
      className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-slate-800/50 border border-violet-500/30 rounded-lg text-slate-200 font-semibold hover:bg-slate-800/70 hover:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-105"
    >
      <svg
        className="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 488 512"
        fill="currentColor"
      >
        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
      </svg>
      Continuar con Google
    </button>
  );
}
