import { useState } from "react";
import styled from "styled-components";
import { createCampaign } from "../../../services/campaign.service";

export default function CreateCampaignForm() {
    const [formData, setFormData] = useState({
        id_categoria: 26,    
        titulo: "",
        descripcion: "",
        monto_objetivo: "",
        tiempo_objetivo: "",
        imagen: null,
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createCampaign(formData);
            alert("✅ Campaña creada con éxito!");
        } catch (error) {
            console.error(error);
            alert("❌ Error al crear la campaña: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Fecha mínima (hoy) para no permitir fechas anteriores
    const today = new Date().toISOString().split("T")[0];

    return (
        <FormStyled onSubmit={handleSubmit}>
            <h2>Crear campaña</h2>

            <label>Nombre</label>
            <input
                type="text"
                name="titulo"
                placeholder="Nombre de la campaña"
                onChange={handleChange}
                required
            />

            <label>Descripción</label>
            <textarea
                name="descripcion"
                placeholder="Descripción de la campaña"
                rows="4"
                onChange={handleChange}
                required
            />

            <label>Monto objetivo</label>
            <input
                type="number"
                name="monto_objetivo"
                placeholder="Monto objetivo"
                onChange={handleChange}
                required
            />

            <label>Fecha de finalización de campaña</label>
            <input
                type="date"
                name="tiempo_objetivo"
                min={today}
                onChange={handleChange}
                required
            />

            <label>Imagen de la campaña</label>
            <input
                type="file"
                name="imagen"
                accept="image/*"
                onChange={handleChange}
            />

            <button type="submit" disabled={loading}>
                {loading ? "Creando..." : "Crear campaña"}
            </button>
        </FormStyled>
    );
}

const FormStyled = styled.form`
  max-width: 500px;
  margin: 40px auto;
  padding: 30px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    font-weight: bold;
  }

  label {
    font-weight: 600;
    margin-top: 15px;
    display: block;
    color: #444;
  }

  input,
  textarea,
  button {
    width: 100%;
    border-radius: 20px;
    padding: 15px 20px;
    margin-top: 8px;
    font-size: 14px;
    border: none;
    box-shadow: #cff0ff 0px 10px 10px -5px;
  }

  textarea {
    resize: none;
  }

  input::placeholder,
  textarea::placeholder {
    color: rgb(170, 170, 170);
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-inline: 2px solid #12b1d1;
  }

  button {
    margin-top: 20px;
    background: linear-gradient(
      45deg,
      rgba(107, 16, 211, 1) 0%,
      rgb(18, 177, 209) 100%
    );
    color: white;
    font-weight: bold;
    cursor: pointer;
    box-shadow: rgba(133, 189, 215, 0.87) 0px 20px 10px -15px;
    transition: all 0.2s ease-in-out;
    border: none;
  }

  button:hover {
    transform: scale(1.03);
    box-shadow: rgba(133, 189, 215, 0.87) 0px 23px 10px -20px;
  }

  button:active {
    transform: scale(0.95);
    box-shadow: rgba(133, 189, 215, 0.87) 0px 15px 10px -10px;
  }
`;
