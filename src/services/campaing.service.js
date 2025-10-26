const API_URL = "http://localhost:3000/api/campaigns";

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
// NUEVO: Obtener campañas filtradas por categoría
export async function getCampaignsByCategory(id_categoria) {
  const url = id_categoria
    ? `${API_URL}?id_categoria=${id_categoria}`
    : API_URL; // si no hay categoría, trae todas

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al obtener campañas por categoría");
  return data;
}