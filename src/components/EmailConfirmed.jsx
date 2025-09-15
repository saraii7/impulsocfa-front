import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmailConfirmed() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simular pequeño delay para UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <p>Procesando confirmación de email...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Email confirmado ✅</h2>
      <p>¡Tu email fue confirmado correctamente!</p>
      <p>Ahora, inicia sesión para ver tu llave maestra.</p>
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#6b10d3",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => navigate("/confirmarinicioform")}
      >
        Ir a Login
      </button>
    </div>
  );
}
