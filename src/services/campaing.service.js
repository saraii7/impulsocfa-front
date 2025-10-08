const API_URL = `${import.meta.env.VITE_API_URL}/campaigns`;

// Obtener todas las campañas
export async function getAllCampaigns() {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error al obtener campañas");
  }

  return await res.json();
}

// Obtener campaña por id
export async function getCampaignById(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error al obtener campaña");
  }

  return await res.json();
}