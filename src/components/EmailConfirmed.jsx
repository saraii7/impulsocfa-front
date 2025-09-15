import { useEffect, useState } from "react";
import { getLlaveMaestra } from "../services/auth.service";

export default function EmailConfirmed() {
  const [llave, setLlave] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Leer token desde el hash de la URL (#access_token=...)
    const hash = window.location.hash; 
    const params = new URLSearchParams(hash.replace("#", "?"));
    const access_token = params.get("access_token");

    if (access_token) {
      // Guardar en localStorage
      localStorage.setItem("access_token", access_token);

      // Obtener llave maestra
      getLlaveMaestra()
        .then((data) => setLlave(data.llave_maestra))
        .catch((err) => setError(err.message));
    } else {
      setError("No se encontró access_token en la URL");
    }
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Confirmación de email</h2>
      {llave ? (
        <p>
          ✅ Tu email fue confirmado.  
          Esta es tu <strong>llave maestra</strong>: {llave}
        </p>
      ) : error ? (
        <p style={{ color: "red" }}>❌ {error}</p>
      ) : (
        <p>Verificando tu cuenta...</p>
      )}
    </div>
  );
}
