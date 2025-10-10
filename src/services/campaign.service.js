import { supabase } from "../supabaseClient";
const API_URL = 'http://localhost:3000/api/campaigns';

export async function createCampaign(campaignData) {
    const token = localStorage.getItem("access_token");

    if (!token) {
        throw new Error("No estás autenticado");
    }

    const res = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(campaignData),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Error al crear campaña");
    }

    return data;
}
// Editar campaña
export async function updateCampaign(id, campaignData) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No estás autenticado");

  // Si imagen no existe como columna, no la envíes
  const dataToSend = { ...campaignData };
  delete dataToSend.imagen;

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dataToSend),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al editar campaña");

  return data;
}

// Obtener campañas del usuario logueado
export async function getUserCampaigns(userId) {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No estás autenticado");

    const res = await fetch(`${API_URL}?id_usuario=${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al obtener campañas");

    return data;
}

// Suspender campaña
export async function suspendCampaign(id) {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No estás autenticado");

    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al suspender campaña");

    return data;
}

// Obtener usuario logueado desde Supabase
export async function getCurrentUser() {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No estás autenticado");

    const { data, error } = await supabase.auth.getUser(token);
    if (error) throw new Error(error.message);

    return data.user;
}