import { useState } from "react";
import styled from "styled-components";
import { createCampaign } from "../../services/campaign.service";

export default function CreateCampaignForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    monto_objetivo: "",
    dias: "",
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

  return (
    <FormStyled onSubmit={handleSubmit}>
      <h2>Crear campaña</h2>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        onChange={handleChange}
        required
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        rows="4"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="monto_objetivo"
        placeholder="Monto objetivo"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="dias"
        placeholder="Días de duración"
        onChange={handleChange}
        min="1"
        required
      />
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

  input, textarea, button {
    width: 100%;
    border-radius: 20px;
    padding: 15px 20px;
    margin-top: 15px;
    font-size: 14px;
    border: none;
    box-shadow: #cff0ff 0px 10px 10px -5px;
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
