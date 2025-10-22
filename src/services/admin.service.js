const API_URL = `${import.meta.env.VITE_API_URL}/admin`;
const CAMPAIGN_URL = `${import.meta.env.VITE_API_URL}/campaigns`;

export async function getAdmins() {
  const token = localStorage.getItem("access_token");

  const res = await fetch(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error al obtener los administradores");
  return await res.json();
}

export async function getUsers() {
  const token = localStorage.getItem("access_token");

  const res = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error al obtener los usuarios");
  return await res.json();
}

export async function createAdmin(adminData) {
  const token = localStorage.getItem("access_token");

  const res = await fetch(`${API_URL}/create-admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(adminData),
  });

  if (!res.ok) throw new Error("Error al crear el administrador");
  return await res.json();
}

export async function updateAdmin(id, updateData) {
  const token = localStorage.getItem("access_token");

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });

  if (!res.ok) throw new Error("Error al actualizar el administrador");
  return await res.json();
}

export async function disableAdmin(id) {
  const token = localStorage.getItem("access_token");

  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error al deshabilitar el administrador");
  return await res.json();
}

export async function changeUserState(id, newState) {
  const token = localStorage.getItem("access_token");

  const res = await fetch(`${API_URL}/user/${id}/state`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ estado_cuenta: newState }),
  });

  if (!res.ok) throw new Error("Error al cambiar el estado del usuario");
  return await res.json();
}
// Obtener campañas pendientes
export async function getPendingCampaigns() {
  const token = localStorage.getItem("access_token");

  const res = await fetch(`${CAMPAIGN_URL}/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error al obtener campañas pendientes");
  }

  return await res.json();
}

// Aprobar o rechazar campaña
export async function approveCampaign(campaignId, estado) {
  if (!['aprobada', 'rechazada'].includes(estado)) {
    throw new Error("Estado inválido");
  }

  const token = localStorage.getItem("access_token");

  const res = await fetch(`${CAMPAIGN_URL}/${campaignId}/approve`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ estado }), // ⚠️ ahora envía "estado", no "approved"
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al actualizar estado de campaña");

  return data;
}