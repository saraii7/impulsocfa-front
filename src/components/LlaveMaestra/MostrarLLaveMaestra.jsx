import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLlaveMaestra } from "../../services/auth.service";

export default function MostrarLlaveMaestra() {
    const [llave, setLlave] = useState(null);
    const [error, setError] = useState(null);
    const [copiado, setCopiado] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLlave = async () => {
            try {
                const data = await getLlaveMaestra();
                setLlave(data.llave_maestra);
            } catch (err) {
                console.error(err);
                setError(err.message);
            }
        };
        fetchLlave();
    }, []);

    const handleIrDashboard = () => {
        navigate("/home");
    };

    const handleCopiar = () => {
        navigator.clipboard.writeText(llave);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000);
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80vh",
                background: "#f5f7fa",
                padding: "2rem",
            }}
        >
            <div
                style={{
                    background: "white",
                    borderRadius: "15px",
                    padding: "2.5rem",
                    maxWidth: "500px",
                    textAlign: "center",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                }}
            >
                <h2 style={{ color: "#6816eb", marginBottom: "1rem" }}>
                    🔑 Llave Maestra
                </h2>
                <p style={{ color: "#555", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                    Esta llave se muestra <strong>solo una vez</strong>.
                    Copiala ahora, porque será tu llave para ejecutar funciones dentro de la aplicación, como donar y recibir donaciones.
                </p>

                {error && <p style={{ color: "red" }}>❌ {error}</p>}

                {llave ? (
                    <div>
                        <p
                            style={{
                                fontWeight: "bold",
                                fontSize: "1.2rem",
                                background: "#f0f0f0",
                                padding: "0.8rem",
                                borderRadius: "8px",
                                wordBreak: "break-all",
                            }}
                        >
                            {llave}
                        </p>

                        <button
                            onClick={handleCopiar}
                            style={{
                                marginTop: "1rem",
                                padding: "0.5rem 1rem",
                                borderRadius: "8px",
                                border: "none",
                                backgroundColor: "#00aaff",
                                color: "white",
                                cursor: "pointer",
                                marginRight: "0.5rem",
                            }}
                        >
                            {copiado ? "Copiado ✅" : "Copiar"}
                        </button>

                        <button
                            onClick={handleIrDashboard}
                            style={{
                                marginTop: "1rem",
                                padding: "0.5rem 1rem",
                                borderRadius: "8px",
                                border: "none",
                                backgroundColor: "#6816eb",
                                color: "white",
                                cursor: "pointer",
                            }}
                        >
                            Ir al Dashboard
                        </button>
                    </div>
                ) : (
                    !error && <p>⏳ Cargando...</p>
                )}
            </div>
        </div>
    );
}
