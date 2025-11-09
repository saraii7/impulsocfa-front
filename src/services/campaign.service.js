// se usa para editar, crear, obtener y suspender campañas

import { supabase } from "../supabaseClient";
const API_URL = 'http://localhost:3000/api/campaigns';

export async function createCampaign(campaignData) {
    const token = localStorage.getItem("access_token");

    if (!token) {
        throw new Error("No estás autenticado");
    }

    const formData = new FormData();
    formData.append("id_categoria", campaignData.id_categoria);
    formData.append("titulo", campaignData.titulo);
    formData.append("descripcion", campaignData.descripcion);
    formData.append("monto_objetivo", campaignData.monto_objetivo);
    formData.append("tiempo_objetivo", campaignData.tiempo_objetivo);

    if (campaignData.foto1) formData.append("foto1", campaignData.foto1);
    if (campaignData.foto2) formData.append("foto2", campaignData.foto2);
    if (campaignData.foto3) formData.append("foto3", campaignData.foto3);

    const res = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,

        },
        body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al crear campaña");

    return data;
}
// Editar campaña
export async function updateCampaign(id, campaignData) {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No estás autenticado");

    const formData = new FormData();
    if (campaignData.titulo) formData.append("titulo", campaignData.titulo);
    if (campaignData.descripcion) formData.append("descripcion", campaignData.descripcion);
    if (campaignData.monto_objetivo) formData.append("monto_objetivo", campaignData.monto_objetivo);
    if (campaignData.tiempo_objetivo) formData.append("tiempo_objetivo", campaignData.tiempo_objetivo);

    if (campaignData.foto1) formData.append("foto1", campaignData.foto1);
    if (campaignData.foto2) formData.append("foto2", campaignData.foto2);
    if (campaignData.foto3) formData.append("foto3", campaignData.foto3);
    
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
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
// Obtener campañas pendientes del usuario
export async function getUserPendingCampaigns() {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No estás autenticado");

    const res = await fetch(`${API_URL}/pending/user`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al obtener campañas pendientes");
    return data;
}
// Obtener campañas rechazadas del usuario
export async function getUserRejectedCampaigns() {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No estás autenticado");

    const res = await fetch(`${API_URL}/rejected/user`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al obtener campañas rechazadas");
    return data;
}
// Obtener campaña por ID (incluye hasDonations)
export async function getCampaignById(id) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No estás autenticado");

  const res = await fetch(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al obtener campaña");

  return data; // este data incluye hasDonations desde el backend
}

export async function getLatestDonations(id, token) {
  const res = await fetch(`${API_URL}/latest/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al obtener las últimas donaciones");
  return await res.json();
}
// Obtener todas las donaciones de una campaña específica
export async function getDonationsByCampaignId(id) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No estás autenticado");

  const res = await fetch(`${API_URL}/donation/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al obtener las donaciones");

  return data;
}