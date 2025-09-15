import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getLlaveMaestra } from "../services/auth.service";
import styled from "styled-components";

export default function MostrarLlave() {

  const [llave, setLlave] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLlave = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("No se encontró un token válido.");
        return;
      }

      try {
        const data = await getLlaveMaestra(); //token de localStorage
        setLlave(data.llave_maestra);
      } catch (err) {
        console.error(err);
        setError("No se pudo obtener la llave maestra.");
      }
    };

    fetchLlave();
  }, []);

  return (
    <Wrapper>
      <h2>Esta es tu llave maestra única</h2>
      {error && <Error>{error}</Error>}
      {llave && <Llave>{llave}</Llave>}
      <p>
        ¡Anótala y guárdala en un lugar seguro! Recordá que esta misma te va a servir
        para futuras acciones.
      </p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Llave = styled.div`
  background: #f0f8ff;
  padding: 20px;
  border-radius: 15px;
  font-weight: bold;
  margin: 20px 0;
`;

const Error = styled.div`
  color: red;
  margin: 20px 0;
`;
